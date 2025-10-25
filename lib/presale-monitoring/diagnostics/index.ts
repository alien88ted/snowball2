/**
 * Diagnostics and Monitoring Module
 *
 * Provides comprehensive diagnostics, monitoring, and debugging capabilities
 * for the presale monitoring system
 */

import {
  ServiceStatus,
  PerformanceMetrics,
  DiagnosticsReport,
  ErrorType,
} from '../types'
import { rpcManager } from '../services/rpc-manager'
import { cacheManager } from '../utils/cache-manager'
import { globalRateLimiter } from '../utils/rate-limiter'
import { getConfigSummary, validateConfig } from '../config'

/**
 * Performance tracker for monitoring latencies
 */
class PerformanceTracker {
  private latencies: number[] = []
  private errors: Map<ErrorType, { count: number; lastOccurrence: number; sample: string }> = new Map()
  private startTime: number = Date.now()
  private requestCount: number = 0

  /**
   * Record a request latency
   */
  recordLatency(latency: number): void {
    this.latencies.push(latency)
    this.requestCount++

    // Keep only last 1000 latencies
    if (this.latencies.length > 1000) {
      this.latencies = this.latencies.slice(-1000)
    }
  }

  /**
   * Record an error
   */
  recordError(type: ErrorType, error: Error): void {
    const existing = this.errors.get(type) || {
      count: 0,
      lastOccurrence: 0,
      sample: '',
    }

    this.errors.set(type, {
      count: existing.count + 1,
      lastOccurrence: Date.now(),
      sample: error.message,
    })
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    if (this.latencies.length === 0) {
      return {
        requestsPerSecond: 0,
        averageLatency: 0,
        p95Latency: 0,
        p99Latency: 0,
        errorRate: 0,
        cacheHitRate: cacheManager.getOverallHitRate(),
        memoryUsage: process.memoryUsage().heapUsed,
      }
    }

    const sorted = [...this.latencies].sort((a, b) => a - b)
    const uptime = (Date.now() - this.startTime) / 1000

    const totalErrors = Array.from(this.errors.values()).reduce(
      (sum, e) => sum + e.count,
      0
    )

    return {
      requestsPerSecond: this.requestCount / uptime,
      averageLatency: sorted.reduce((a, b) => a + b, 0) / sorted.length,
      p95Latency: sorted[Math.floor(sorted.length * 0.95)] || 0,
      p99Latency: sorted[Math.floor(sorted.length * 0.99)] || 0,
      errorRate: totalErrors / Math.max(this.requestCount, 1),
      cacheHitRate: cacheManager.getOverallHitRate(),
      memoryUsage: process.memoryUsage().heapUsed,
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats(): Array<{
    type: ErrorType
    count: number
    lastOccurrence: number
    sample: string
  }> {
    return Array.from(this.errors.entries()).map(([type, stats]) => ({
      type,
      ...stats,
    }))
  }

  /**
   * Reset statistics
   */
  reset(): void {
    this.latencies = []
    this.errors.clear()
    this.startTime = Date.now()
    this.requestCount = 0
  }
}

/**
 * Main diagnostics manager
 */
export class DiagnosticsManager {
  private performanceTracker = new PerformanceTracker()
  private isMonitoring = false
  private monitoringInterval?: NodeJS.Timeout

  /**
   * Start monitoring
   */
  startMonitoring(intervalMs: number = 60000): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.monitoringInterval = setInterval(() => {
      this.logDiagnostics()
    }, intervalMs)

    console.log('Diagnostics monitoring started')
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = undefined
    }
    this.isMonitoring = false
    console.log('Diagnostics monitoring stopped')
  }

  /**
   * Record a performance measurement
   */
  recordPerformance(operation: string, latency: number): void {
    this.performanceTracker.recordLatency(latency)

    // Log slow operations
    if (latency > 5000) {
      console.warn(`Slow operation detected: ${operation} took ${latency}ms`)
    }
  }

  /**
   * Record an error
   */
  recordError(type: ErrorType, error: Error): void {
    this.performanceTracker.recordError(type, error)
    console.error(`[${type}] ${error.message}`)
  }

  /**
   * Get current service status
   */
  getServiceStatus(): ServiceStatus {
    const uptime = process.uptime()
    const rateLimiterStats = globalRateLimiter.getStats()
    const cacheStats = cacheManager.getAllStats()
    const rpcDiagnostics = rpcManager.getDiagnostics()

    // Calculate overall cache stats
    let totalHits = 0
    let totalMisses = 0
    for (const stats of Object.values(cacheStats)) {
      totalHits += stats.hits
      totalMisses += stats.misses
    }

    return {
      healthy: true, // TODO: Add health checks
      uptime,
      requestsProcessed: rateLimiterStats.totalRequests,
      errors: this.performanceTracker.getErrorStats().reduce((sum, e) => sum + e.count, 0),
      cacheStats: {
        hits: totalHits,
        misses: totalMisses,
        hitRate: totalHits / Math.max(totalHits + totalMisses, 1),
      },
      rpcStats: {
        endpoint: rpcDiagnostics.currentEndpoint,
        latency: rpcDiagnostics.requestStats.averageLatency,
        rateLimit: 15, // TODO: Get from config
        requestsRemaining: rateLimiterStats.currentTokens,
      },
    }
  }

  /**
   * Generate comprehensive diagnostics report
   */
  generateReport(): DiagnosticsReport {
    const config = getConfigSummary()
    const configValidation = validateConfig()
    const status = this.getServiceStatus()
    const performance = this.performanceTracker.getMetrics()
    const errors = this.performanceTracker.getErrorStats()

    // Generate recommendations
    const recommendations: string[] = []

    if (performance.errorRate > 0.1) {
      recommendations.push('High error rate detected. Check RPC endpoints and network connectivity.')
    }

    if (performance.averageLatency > 2000) {
      recommendations.push('High average latency. Consider using a closer RPC endpoint.')
    }

    if (status.cacheStats.hitRate < 0.5) {
      recommendations.push('Low cache hit rate. Consider increasing cache size or TTL.')
    }

    if (!configValidation.valid) {
      recommendations.push(...configValidation.errors.map(e => `Config error: ${e}`))
    }

    if (performance.memoryUsage > 500 * 1024 * 1024) {
      recommendations.push('High memory usage. Consider reducing cache sizes.')
    }

    return {
      timestamp: Date.now(),
      version: '1.0.0',
      config,
      status,
      performance,
      errors,
      recommendations,
    }
  }

  /**
   * Log current diagnostics
   */
  private logDiagnostics(): void {
    const report = this.generateReport()

    console.log('\n========== DIAGNOSTICS REPORT ==========')
    console.log(`Timestamp: ${new Date(report.timestamp).toISOString()}`)
    console.log(`Uptime: ${Math.floor(report.status.uptime / 60)}m`)
    console.log(`Health: ${report.status.healthy ? '✅' : '❌'}`)

    console.log('\nPerformance:')
    console.log(`  RPS: ${report.performance.requestsPerSecond.toFixed(2)}`)
    console.log(`  Avg Latency: ${report.performance.averageLatency.toFixed(0)}ms`)
    console.log(`  P95 Latency: ${report.performance.p95Latency.toFixed(0)}ms`)
    console.log(`  Error Rate: ${(report.performance.errorRate * 100).toFixed(2)}%`)
    console.log(`  Cache Hit Rate: ${(report.performance.cacheHitRate * 100).toFixed(2)}%`)

    console.log('\nRPC:')
    console.log(`  Endpoint: ${report.status.rpcStats.endpoint}`)
    console.log(`  Latency: ${report.status.rpcStats.latency}ms`)
    console.log(`  Tokens: ${report.status.rpcStats.requestsRemaining}/${report.status.rpcStats.rateLimit}`)

    if (report.errors.length > 0) {
      console.log('\nErrors:')
      for (const error of report.errors) {
        console.log(`  ${error.type}: ${error.count} occurrences`)
      }
    }

    if (report.recommendations.length > 0) {
      console.log('\nRecommendations:')
      for (const rec of report.recommendations) {
        console.log(`  ⚠️  ${rec}`)
      }
    }

    console.log('========================================\n')
  }

  /**
   * Export diagnostics to file
   */
  async exportDiagnostics(filepath: string): Promise<void> {
    const report = this.generateReport()
    const { writeFileSync } = await import('fs')
    writeFileSync(filepath, JSON.stringify(report, null, 2))
    console.log(`Diagnostics exported to ${filepath}`)
  }

  /**
   * Reset all statistics
   */
  reset(): void {
    this.performanceTracker.reset()
    rpcManager.resetStats()
    cacheManager.clearAll()
    globalRateLimiter.reset()
  }

  /**
   * Run health check
   */
  async healthCheck(): Promise<{
    healthy: boolean
    checks: Record<string, { status: string; message?: string }>
  }> {
    const checks: Record<string, { status: string; message?: string }> = {}

    // Check config
    const configValidation = validateConfig()
    checks.config = configValidation.valid
      ? { status: 'ok' }
      : { status: 'error', message: configValidation.errors.join(', ') }

    // Check RPC endpoints
    try {
      const healthStatuses = await rpcManager.checkAllEndpoints()
      const healthyCount = healthStatuses.filter(s => s.healthy).length
      checks.rpc = healthyCount > 0
        ? { status: 'ok', message: `${healthyCount}/${healthStatuses.length} endpoints healthy` }
        : { status: 'error', message: 'No healthy RPC endpoints' }
    } catch (error: any) {
      checks.rpc = { status: 'error', message: error.message }
    }

    // Check cache
    const cacheStats = cacheManager.getAllStats()
    const totalMemory = cacheManager.getTotalMemoryUsage()
    checks.cache = totalMemory < 100 * 1024 * 1024 // 100MB limit
      ? { status: 'ok', message: `Memory: ${(totalMemory / 1024 / 1024).toFixed(2)}MB` }
      : { status: 'warning', message: 'High memory usage' }

    // Check rate limiter
    const rateLimiterStats = globalRateLimiter.getStats()
    checks.rateLimiter = rateLimiterStats.currentTokens > 0
      ? { status: 'ok', message: `Tokens: ${rateLimiterStats.currentTokens}` }
      : { status: 'warning', message: 'Rate limit exhausted' }

    const healthy = Object.values(checks).every(c => c.status !== 'error')

    return { healthy, checks }
  }
}

// Export singleton diagnostics manager
export const diagnosticsManager = new DiagnosticsManager()

// Convenience exports
export const recordPerformance = (operation: string, latency: number) =>
  diagnosticsManager.recordPerformance(operation, latency)

export const recordError = (type: ErrorType, error: Error) =>
  diagnosticsManager.recordError(type, error)

export const getServiceStatus = () => diagnosticsManager.getServiceStatus()

export const generateReport = () => diagnosticsManager.generateReport()

export const healthCheck = () => diagnosticsManager.healthCheck()