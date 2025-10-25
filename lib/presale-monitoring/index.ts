/**
 * Presale Monitoring System - Main Export
 *
 * Exports the MongoDB-enhanced monitoring service and utilities
 */

import { PresaleMonitoringServiceMongoDB } from './core/monitoring-service-mongodb'
import { PresaleMonitoringOptions } from './types'

function isPromise<T = unknown>(value: any): value is Promise<T> {
  return !!value && typeof value.then === 'function'
}

// Core service with MongoDB caching
export { PresaleMonitoringServiceMongoDB }
export { PresaleMonitoringServiceMongoDB as PresaleMonitoringService }

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
  CONTRIBUTOR_CONFIG,
  MONITORING_CONFIG,
  TOKEN_CONFIG,
  PRESALE_ADDRESSES,
  FEATURES
} from './config'

// Types
export * from './types'

// Helper function to create a monitoring service with MongoDB
type MonitorFactoryOptions = {
  cacheTTL?: number
  enableMongoDB?: boolean
  serviceOptions?: Partial<Omit<PresaleMonitoringOptions, 'presaleAddress'>>
}

type MonitorRegistryOptions = MonitorFactoryOptions & {
  reuseExisting?: boolean
}

export async function createPresaleMonitor(
  walletAddress: string,
  options: MonitorFactoryOptions = {}
) {
  const serviceOptions: PresaleMonitoringOptions = {
    presaleAddress: walletAddress,
    ...(options.serviceOptions ?? {})
  }

  const service = new PresaleMonitoringServiceMongoDB(
    walletAddress,
    options.cacheTTL,
    serviceOptions
  )

  // Wait for MongoDB to connect if enabled
  if (options.enableMongoDB !== false) {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Give MongoDB time to connect
  }

  return service
}

type MonitorRegistryEntry = {
  service: PresaleMonitoringServiceMongoDB
  lastAccess: number
}

const monitorRegistry = new Map<string, MonitorRegistryEntry>()
const monitorPromises = new Map<string, Promise<PresaleMonitoringServiceMongoDB>>()

/**
 * Get (or create) a presale monitor instance that is cached per wallet address.
 * Useful for API routes to reuse the in-memory metrics cache between requests.
 */
export async function getPresaleMonitor(
  walletAddress: string,
  options: MonitorRegistryOptions = {}
) {
  const normalizedAddress = walletAddress.trim()
  const reuseExisting = options.reuseExisting ?? true

  if (!reuseExisting) {
    return createPresaleMonitor(normalizedAddress, options)
  }

  const existing = monitorRegistry.get(normalizedAddress)
  if (existing) {
    existing.lastAccess = Date.now()
    return existing.service
  }

  let creation = monitorPromises.get(normalizedAddress)
  if (!creation) {
    creation = createPresaleMonitor(normalizedAddress, options)
    monitorPromises.set(normalizedAddress, creation)
  }

  const service = await creation

  monitorRegistry.set(normalizedAddress, {
    service,
    lastAccess: Date.now()
  })
  monitorPromises.delete(normalizedAddress)

  return service
}

/**
 * Release a cached monitor, optionally disposing it.
 */
export async function releasePresaleMonitor(walletAddress: string) {
  const normalizedAddress = walletAddress.trim()
  const entry = monitorRegistry.get(normalizedAddress)

  if (!entry) return

  monitorRegistry.delete(normalizedAddress)

  const disposeResult = entry.service.dispose?.()
  if (isPromise(disposeResult)) {
    await disposeResult
  }
}

/**
 * Prune cached monitors that have been idle longer than the provided TTL.
 * Returns the wallet addresses that were removed.
 */
export async function pruneIdlePresaleMonitors(maxIdleMs: number = 5 * 60 * 1000) {
  const now = Date.now()
  const removed: string[] = []
  const disposals: Promise<any>[] = []

  for (const [address, entry] of monitorRegistry) {
    if (now - entry.lastAccess > maxIdleMs) {
      monitorRegistry.delete(address)
      removed.push(address)

      const disposeResult = entry.service.dispose?.()
      if (isPromise(disposeResult)) {
        disposals.push(disposeResult)
      }
    }
  }

  if (disposals.length > 0) {
    await Promise.allSettled(disposals)
  }

  return removed
}
