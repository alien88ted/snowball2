/**
 * RPC Manager Module
 *
 * Manages multiple RPC endpoints with:
 * - Automatic failover
 * - Load balancing
 * - Health monitoring
 * - Request routing
 * - Performance tracking
 */

import { Connection, ConnectionConfig } from '@solana/web3.js'
import { RPC_CONFIG, RATE_LIMIT_CONFIG, MONITORING_CONFIG } from '../config'
import { createRateLimiter, IRateLimiter } from '../utils/rate-limiter'

/**
 * RPC endpoint configuration
 */
export interface RPCEndpoint {
  name: string
  url: string
  wsUrl?: string
  priority: number // Lower = higher priority
  rateLimit: number // requests per second
  healthy: boolean
  lastHealthCheck: number
  failureCount: number
  successCount: number
  averageLatency: number
}

/**
 * RPC request options
 */
export interface RPCRequestOptions {
  preferredEndpoint?: string
  maxRetries?: number
  timeout?: number
  skipRateLimiter?: boolean
}

/**
 * RPC health status
 */
export interface RPCHealthStatus {
  endpoint: string
  healthy: boolean
  latency: number
  blockHeight: number
  timestamp: number
  error?: string
}

/**
 * RPC Manager for handling multiple endpoints
 */
export class RPCManager {
  private endpoints: Map<string, RPCEndpoint> = new Map()
  private connections: Map<string, Connection> = new Map()
  private rateLimiters: Map<string, IRateLimiter> = new Map()
  private currentEndpoint: string
  private healthCheckTimer?: NodeJS.Timeout
  private requestLog: Array<{
    endpoint: string
    timestamp: number
    duration: number
    success: boolean
  }> = []

  constructor() {
    // Initialize endpoints
    this.setupEndpoints()
    this.currentEndpoint = 'quicknode'

    // Start health monitoring if enabled
    if (MONITORING_CONFIG.ENABLE_DIAGNOSTICS) {
      this.startHealthMonitoring()
    }
  }

  /**
   * Setup RPC endpoints
   */
  private setupEndpoints(): void {
    // Helius Secure endpoint (highest priority - fastest)
    this.addEndpoint({
      name: 'helius-secure',
      url: RPC_CONFIG.HELIUS_SECURE_URL,
      wsUrl: undefined, // Helius secure doesn't provide WSS
      priority: 1,
      rateLimit: RPC_CONFIG.HELIUS_SECURE_RATE_LIMIT, // 100 req/sec
      healthy: true,
      lastHealthCheck: Date.now(),
      failureCount: 0,
      successCount: 0,
      averageLatency: 0,
    })

    // Helius standard endpoint (second priority)
    this.addEndpoint({
      name: 'helius',
      url: RPC_CONFIG.HELIUS_URL,
      wsUrl: undefined, // Will use HTTP polling
      priority: 2,
      rateLimit: RPC_CONFIG.HELIUS_RATE_LIMIT, // 50 req/sec
      healthy: true,
      lastHealthCheck: Date.now(),
      failureCount: 0,
      successCount: 0,
      averageLatency: 0,
    })

    // QuickNode endpoint (third priority)
    this.addEndpoint({
      name: 'quicknode',
      url: RPC_CONFIG.QUICKNODE_URL,
      wsUrl: RPC_CONFIG.QUICKNODE_WSS,
      priority: 3,
      rateLimit: RPC_CONFIG.QUICKNODE_RATE_LIMIT, // 15 req/sec
      healthy: true,
      lastHealthCheck: Date.now(),
      failureCount: 0,
      successCount: 0,
      averageLatency: 0,
    })

    // Public endpoint (lowest priority - backup)
    this.addEndpoint({
      name: 'public',
      url: RPC_CONFIG.PUBLIC_RPC_URL,
      wsUrl: RPC_CONFIG.PUBLIC_WSS_URL,
      priority: 4,
      rateLimit: RPC_CONFIG.PUBLIC_RATE_LIMIT, // 5 req/sec
      healthy: true,
      lastHealthCheck: Date.now(),
      failureCount: 0,
      successCount: 0,
      averageLatency: 0,
    })
  }

  /**
   * Add an RPC endpoint
   */
  addEndpoint(endpoint: RPCEndpoint): void {
    this.endpoints.set(endpoint.name, endpoint)

    // Create connection
    const config: ConnectionConfig = {
      commitment: RPC_CONFIG.COMMITMENT,
      confirmTransactionInitialTimeout: RPC_CONFIG.TIMEOUT,
      wsEndpoint: endpoint.wsUrl,
    }
    this.connections.set(endpoint.name, new Connection(endpoint.url, config))

    // Create rate limiter for this endpoint
    this.rateLimiters.set(endpoint.name, createRateLimiter('token-bucket', endpoint.rateLimit))
  }

  /**
   * Get the best available endpoint
   */
  private getBestEndpoint(preferredEndpoint?: string): string {
    // Use preferred if healthy
    if (preferredEndpoint) {
      const preferred = this.endpoints.get(preferredEndpoint)
      if (preferred?.healthy) {
        return preferredEndpoint
      }
    }

    // Find best healthy endpoint by priority
    const healthyEndpoints = Array.from(this.endpoints.entries())
      .filter(([_, ep]) => ep.healthy)
      .sort((a, b) => a[1].priority - b[1].priority)

    if (healthyEndpoints.length > 0) {
      return healthyEndpoints[0][0]
    }

    // Fallback to any endpoint
    return this.currentEndpoint
  }

  /**
   * Get connection with automatic failover
   */
  async getConnection(options?: RPCRequestOptions): Promise<Connection> {
    const endpointName = this.getBestEndpoint(options?.preferredEndpoint)
    const connection = this.connections.get(endpointName)

    if (!connection) {
      throw new Error(`No connection available for endpoint: ${endpointName}`)
    }

    // Apply rate limiting unless skipped
    if (!options?.skipRateLimiter) {
      const rateLimiter = this.rateLimiters.get(endpointName)
      if (rateLimiter) {
        await rateLimiter.throttle()
      }
    }

    return connection
  }

  /**
   * Execute RPC request with retry and failover
   */
  async executeWithRetry<T>(
    operation: (connection: Connection) => Promise<T>,
    options?: RPCRequestOptions
  ): Promise<T> {
    const maxRetries = options?.maxRetries ?? RATE_LIMIT_CONFIG.MAX_RETRIES
    let lastError: any
    let attempts = 0

    // Try each endpoint
    const endpointNames = this.getSortedEndpoints()

    for (const endpointName of endpointNames) {
      if (attempts >= maxRetries) break

      const endpoint = this.endpoints.get(endpointName)
      if (!endpoint || !endpoint.healthy) continue

      try {
        const startTime = Date.now()
        const connection = await this.getConnection({
          ...options,
          preferredEndpoint: endpointName,
        })

        const result = await operation(connection)

        // Track success
        this.trackRequest(endpointName, Date.now() - startTime, true)
        endpoint.successCount++

        return result
      } catch (error: any) {
        lastError = error
        attempts++

        // Track failure
        this.trackRequest(endpointName, 0, false)
        endpoint!.failureCount++

        // Mark unhealthy if too many failures
        if (endpoint!.failureCount > 5) {
          this.markUnhealthy(endpointName, error.message)
        }

        // Special handling for rate limit errors
        if (error?.message?.includes('429') || error?.response?.status === 429) {
          console.log(`Rate limited on ${endpointName}, trying next endpoint...`)
          await new Promise(r => setTimeout(r, 2000))
        }
      }
    }

    throw lastError || new Error('All RPC endpoints failed')
  }

  /**
   * Get sorted endpoints by priority and health
   */
  private getSortedEndpoints(): string[] {
    return Array.from(this.endpoints.entries())
      .sort((a, b) => {
        // Prefer healthy endpoints
        if (a[1].healthy !== b[1].healthy) {
          return a[1].healthy ? -1 : 1
        }
        // Then by priority
        return a[1].priority - b[1].priority
      })
      .map(([name]) => name)
  }

  /**
   * Track request for diagnostics
   */
  private trackRequest(endpoint: string, duration: number, success: boolean): void {
    // Log request
    if (MONITORING_CONFIG.ENABLE_REQUEST_LOGGING) {
      this.requestLog.push({
        endpoint,
        timestamp: Date.now(),
        duration,
        success,
      })

      // Keep only last 1000 requests
      if (this.requestLog.length > 1000) {
        this.requestLog = this.requestLog.slice(-1000)
      }
    }

    // Update endpoint latency
    const ep = this.endpoints.get(endpoint)
    if (ep && success && duration > 0) {
      // Moving average
      ep.averageLatency = ep.averageLatency * 0.9 + duration * 0.1
    }
  }

  /**
   * Mark endpoint as unhealthy
   */
  private markUnhealthy(endpoint: string, reason: string): void {
    const ep = this.endpoints.get(endpoint)
    if (ep) {
      ep.healthy = false
      console.error(`RPC endpoint ${endpoint} marked unhealthy: ${reason}`)

      // Schedule health check
      setTimeout(() => this.checkEndpointHealth(endpoint), 30000)
    }
  }

  /**
   * Check endpoint health
   */
  async checkEndpointHealth(endpointName: string): Promise<RPCHealthStatus> {
    const endpoint = this.endpoints.get(endpointName)
    const connection = this.connections.get(endpointName)

    if (!endpoint || !connection) {
      return {
        endpoint: endpointName,
        healthy: false,
        latency: -1,
        blockHeight: -1,
        timestamp: Date.now(),
        error: 'Endpoint not found',
      }
    }

    try {
      const startTime = Date.now()
      const blockHeight = await connection.getBlockHeight()
      const latency = Date.now() - startTime

      // Update endpoint status
      endpoint.healthy = true
      endpoint.lastHealthCheck = Date.now()
      endpoint.failureCount = 0
      endpoint.averageLatency = latency

      return {
        endpoint: endpointName,
        healthy: true,
        latency,
        blockHeight,
        timestamp: Date.now(),
      }
    } catch (error: any) {
      endpoint.healthy = false
      endpoint.lastHealthCheck = Date.now()

      return {
        endpoint: endpointName,
        healthy: false,
        latency: -1,
        blockHeight: -1,
        timestamp: Date.now(),
        error: error.message,
      }
    }
  }

  /**
   * Check health of all endpoints
   */
  async checkAllEndpoints(): Promise<RPCHealthStatus[]> {
    const checks = Array.from(this.endpoints.keys()).map(name =>
      this.checkEndpointHealth(name)
    )

    return Promise.all(checks)
  }

  /**
   * Start health monitoring
   */
  private startHealthMonitoring(): void {
    // Initial health check
    this.checkAllEndpoints()

    // Schedule periodic checks
    this.healthCheckTimer = setInterval(
      () => this.checkAllEndpoints(),
      MONITORING_CONFIG.HEALTH_CHECK_INTERVAL
    )
  }

  /**
   * Stop health monitoring
   */
  stopHealthMonitoring(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer)
      this.healthCheckTimer = undefined
    }
  }

  /**
   * Get diagnostics information
   */
  getDiagnostics(): {
    endpoints: Record<string, any>
    currentEndpoint: string
    requestStats: {
      total: number
      successful: number
      failed: number
      averageLatency: number
    }
  } {
    const endpoints: Record<string, any> = {}

    for (const [name, ep] of this.endpoints) {
      const rateLimiter = this.rateLimiters.get(name)
      endpoints[name] = {
        ...ep,
        rateLimiterStats: rateLimiter?.getStats(),
      }
    }

    // Calculate request stats
    const successful = this.requestLog.filter(r => r.success).length
    const failed = this.requestLog.filter(r => !r.success).length
    const avgLatency =
      this.requestLog
        .filter(r => r.success && r.duration > 0)
        .reduce((sum, r) => sum + r.duration, 0) / (successful || 1)

    return {
      endpoints,
      currentEndpoint: this.currentEndpoint,
      requestStats: {
        total: this.requestLog.length,
        successful,
        failed,
        averageLatency: Math.round(avgLatency),
      },
    }
  }

  /**
   * Reset all statistics
   */
  resetStats(): void {
    this.requestLog = []

    for (const [name, ep] of this.endpoints) {
      ep.failureCount = 0
      ep.successCount = 0
      ep.averageLatency = 0

      const rateLimiter = this.rateLimiters.get(name)
      rateLimiter?.reset()
    }
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.stopHealthMonitoring()
    this.connections.clear()
    this.endpoints.clear()
    this.rateLimiters.clear()
    this.requestLog = []
  }
}

// Export singleton instance
export const rpcManager = new RPCManager()

// Export helper function for getting connection
export async function getConnection(options?: RPCRequestOptions): Promise<Connection> {
  return rpcManager.getConnection(options)
}

// Export helper function for executing with retry
export async function executeWithRetry<T>(
  operation: (connection: Connection) => Promise<T>,
  options?: RPCRequestOptions
): Promise<T> {
  return rpcManager.executeWithRetry(operation, options)
}