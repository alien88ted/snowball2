/**
 * Cache Manager Module
 *
 * Provides efficient caching with:
 * - LRU eviction policy
 * - TTL support
 * - Size limits
 * - Performance metrics
 * - Serialization support
 */

import { CACHE_CONFIG } from '../config'

/**
 * Cache entry with metadata
 */
interface CacheEntry<T> {
  value: T
  timestamp: number
  ttl: number
  size: number
  hits: number
}

/**
 * Cache statistics
 */
export interface CacheStats {
  size: number
  maxSize: number
  hits: number
  misses: number
  evictions: number
  hitRate: number
  averageAge: number
  memoryUsage: number
}

/**
 * LRU Cache with TTL support
 */
export class LRUCache<K, V> {
  private cache: Map<K, CacheEntry<V>> = new Map()
  private readonly maxSize: number
  private readonly defaultTTL: number

  // Statistics
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  }

  constructor(maxSize: number, defaultTTL?: number) {
    this.maxSize = maxSize
    this.defaultTTL = defaultTTL || 0 // 0 = no expiration
  }

  /**
   * Get value from cache
   */
  get(key: K): V | undefined {
    const entry = this.cache.get(key)

    if (!entry) {
      this.stats.misses++
      return undefined
    }

    // Check TTL
    if (entry.ttl > 0 && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      this.stats.misses++
      return undefined
    }

    // Update stats and move to end (most recently used)
    this.stats.hits++
    entry.hits++

    // Move to end by deleting and re-adding
    this.cache.delete(key)
    this.cache.set(key, entry)

    return entry.value
  }

  /**
   * Set value in cache
   */
  set(key: K, value: V, ttl?: number): void {
    // Remove if exists to update position
    const existingEntry = this.cache.get(key)
    if (existingEntry) {
      this.cache.delete(key)
    }

    const entry: CacheEntry<V> = {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTTL,
      size: this.estimateSize(value),
      hits: 0,
    }

    this.cache.set(key, entry)

    // Evict if over size limit
    while (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
      this.stats.evictions++
    }
  }

  /**
   * Check if key exists (without affecting LRU order)
   */
  has(key: K): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    // Check TTL
    if (entry.ttl > 0 && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  /**
   * Delete entry from cache
   */
  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.cache.clear()
    this.stats = { hits: 0, misses: 0, evictions: 0 }
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const entries = Array.from(this.cache.values())
    const now = Date.now()

    const totalAge = entries.reduce((sum, entry) => sum + (now - entry.timestamp), 0)
    const totalMemory = entries.reduce((sum, entry) => sum + entry.size, 0)

    const totalRequests = this.stats.hits + this.stats.misses

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.stats.hits,
      misses: this.stats.misses,
      evictions: this.stats.evictions,
      hitRate: totalRequests > 0 ? this.stats.hits / totalRequests : 0,
      averageAge: entries.length > 0 ? totalAge / entries.length : 0,
      memoryUsage: totalMemory,
    }
  }

  /**
   * Prune expired entries
   */
  prune(): number {
    const now = Date.now()
    let pruned = 0

    for (const [key, entry] of this.cache) {
      if (entry.ttl > 0 && now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
        pruned++
      }
    }

    return pruned
  }

  /**
   * Estimate size of value in bytes
   */
  private estimateSize(value: any): number {
    if (value === null || value === undefined) return 0
    if (typeof value === 'string') return value.length * 2 // Unicode
    if (typeof value === 'number') return 8
    if (typeof value === 'boolean') return 4
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value).length * 2
      } catch {
        return 1024 // Default estimate
      }
    }
    return 256 // Default
  }

  /**
   * Get all keys
   */
  keys(): K[] {
    return Array.from(this.cache.keys())
  }

  /**
   * Get all values
   */
  values(): V[] {
    return Array.from(this.cache.values()).map(entry => entry.value)
  }

  /**
   * Get entries sorted by most recently used
   */
  getMRUEntries(limit?: number): Array<[K, V]> {
    const entries = Array.from(this.cache.entries())
      .map(([key, entry]) => [key, entry.value] as [K, V])
      .reverse() // Most recent first

    return limit ? entries.slice(0, limit) : entries
  }

  /**
   * Get entries sorted by least recently used
   */
  getLRUEntries(limit?: number): Array<[K, V]> {
    const entries = Array.from(this.cache.entries())
      .map(([key, entry]) => [key, entry.value] as [K, V])

    return limit ? entries.slice(0, limit) : entries
  }
}

/**
 * Multi-tier cache manager
 */
export class CacheManager {
  private caches: Map<string, LRUCache<any, any>> = new Map()

  constructor() {
    this.initializeCaches()
  }

  /**
   * Initialize default caches
   */
  private initializeCaches(): void {
    // Transaction cache
    this.createCache(
      'transactions',
      CACHE_CONFIG.MAX_TRANSACTION_CACHE,
      0 // No TTL for transactions
    )

    // Contributor cache
    this.createCache(
      'contributors',
      CACHE_CONFIG.MAX_CONTRIBUTOR_CACHE,
      0 // No TTL for contributors
    )

    // Metrics cache
    this.createCache(
      'metrics',
      100,
      CACHE_CONFIG.METRICS_CACHE_TTL
    )

    // Wallet info cache
    this.createCache(
      'wallets',
      100,
      CACHE_CONFIG.WALLET_CACHE_TTL
    )

    // Temporary cache for short-lived data
    this.createCache(
      'temp',
      1000,
      60000 // 1 minute TTL
    )
  }

  /**
   * Create a new cache
   */
  createCache<K, V>(name: string, maxSize: number, defaultTTL?: number): LRUCache<K, V> {
    const cache = new LRUCache<K, V>(maxSize, defaultTTL)
    this.caches.set(name, cache)
    return cache
  }

  /**
   * Get a cache by name
   */
  getCache<K, V>(name: string): LRUCache<K, V> | undefined {
    return this.caches.get(name)
  }

  /**
   * Get or create cache
   */
  getOrCreateCache<K, V>(
    name: string,
    maxSize: number = 1000,
    defaultTTL?: number
  ): LRUCache<K, V> {
    let cache = this.caches.get(name)
    if (!cache) {
      cache = this.createCache<K, V>(name, maxSize, defaultTTL)
    }
    return cache
  }

  /**
   * Clear all caches
   */
  clearAll(): void {
    for (const cache of this.caches.values()) {
      cache.clear()
    }
  }

  /**
   * Prune all expired entries
   */
  pruneAll(): number {
    let totalPruned = 0
    for (const cache of this.caches.values()) {
      totalPruned += cache.prune()
    }
    return totalPruned
  }

  /**
   * Get statistics for all caches
   */
  getAllStats(): Record<string, CacheStats> {
    const stats: Record<string, CacheStats> = {}
    for (const [name, cache] of this.caches) {
      stats[name] = cache.getStats()
    }
    return stats
  }

  /**
   * Get total memory usage
   */
  getTotalMemoryUsage(): number {
    let total = 0
    for (const cache of this.caches.values()) {
      total += cache.getStats().memoryUsage
    }
    return total
  }

  /**
   * Get overall hit rate
   */
  getOverallHitRate(): number {
    let totalHits = 0
    let totalMisses = 0

    for (const cache of this.caches.values()) {
      const stats = cache.getStats()
      totalHits += stats.hits
      totalMisses += stats.misses
    }

    const total = totalHits + totalMisses
    return total > 0 ? totalHits / total : 0
  }

  /**
   * Dispose and cleanup
   */
  dispose(): void {
    this.clearAll()
    this.caches.clear()
  }
}

// Export singleton cache manager
export const cacheManager = new CacheManager()

// Export specific caches for convenience
export const transactionCache = cacheManager.getCache<string, any>('transactions')!
export const contributorCache = cacheManager.getCache<string, any>('contributors')!
export const metricsCache = cacheManager.getCache<string, any>('metrics')!
export const walletCache = cacheManager.getCache<string, any>('wallets')!