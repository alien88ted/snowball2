/**
 * Presale Monitoring System - Main Export
 *
 * Exports the MongoDB-enhanced monitoring service and utilities
 */

// Core service with MongoDB caching
export { PresaleMonitoringServiceMongoDB } from './core/monitoring-service-mongodb'
export { PresaleMonitoringServiceMongoDB as PresaleMonitoringService } from './core/monitoring-service-mongodb'

// MongoDB cache service
export { mongoCache, MongoDBCacheService } from './services/mongodb-cache'

// RPC Manager
export { rpcManager, RPCManager } from './services/rpc-manager'

// Rate Limiter
export {
  globalRateLimiter,
  createRateLimiter,
  TokenBucketRateLimiter,
  SlidingWindowRateLimiter
} from './utils/rate-limiter'

// Cache Manager (in-memory)
export {
  cacheManager,
  transactionCache,
  contributorCache,
  metricsCache
} from './utils/cache-manager'

// Diagnostics
export { diagnosticsManager } from './diagnostics'

// Configuration
export {
  RPC_CONFIG,
  RATE_LIMIT_CONFIG,
  CACHE_CONFIG,
  TRANSACTION_CONFIG,
  MONITORING_CONFIG,
  TOKEN_CONFIG,
  PRESALE_ADDRESSES,
  FEATURES
} from './config'

// Types
export * from './types'

// Helper function to create a monitoring service with MongoDB
export async function createPresaleMonitor(
  walletAddress: string,
  options?: {
    cacheTTL?: number
    enableMongoDB?: boolean
  }
) {
  const service = new PresaleMonitoringServiceMongoDB(
    walletAddress,
    options?.cacheTTL
  )

  // Wait for MongoDB to connect if enabled
  if (options?.enableMongoDB !== false) {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Give MongoDB time to connect
  }

  return service
}