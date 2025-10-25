/**
 * MongoDB Cache Service
 *
 * Provides persistent caching for presale monitoring data using MongoDB.
 * Improves performance by reducing RPC calls and storing processed data.
 */

import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb'
import { PresaleTransaction, PresaleMetrics, ContributorInfo } from '../types'
import { CACHE_CONFIG } from '../config'

/**
 * MongoDB connection configuration
 */
const MONGODB_CONFIG = {
  // Connection string with credentials
  CONNECTION_STRING: process.env.MONGODB_URI ||
    'mongodb+srv://rebirth:d9YdLQY3514ovKux@cluster1.yufwx.mongodb.net/?appName=Cluster1',

  // Database and collection names
  DATABASE_NAME: 'presale_monitoring',
  COLLECTIONS: {
    TRANSACTIONS: 'transactions',
    CONTRIBUTORS: 'contributors',
    METRICS: 'metrics',
    WALLET_SNAPSHOTS: 'wallet_snapshots',
    CACHE_METADATA: 'cache_metadata'
  },

  // Connection options
  OPTIONS: {
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 60000,
    serverSelectionTimeoutMS: 5000,
  } as MongoClientOptions
}

/**
 * Cache entry interface with TTL support
 */
interface CacheEntry<T> {
  key: string
  value: T
  createdAt: Date
  expiresAt: Date
  accessCount: number
  lastAccessed: Date
  metadata?: Record<string, any>
}

/**
 * MongoDB Cache Service
 */
export class MongoDBCacheService {
  private client: MongoClient | null = null
  private db: Db | null = null
  private isConnected: boolean = false
  private connectionPromise: Promise<void> | null = null

  // Collection references
  private transactions: Collection<CacheEntry<PresaleTransaction>> | null = null
  private contributors: Collection<CacheEntry<ContributorInfo>> | null = null
  private metrics: Collection<CacheEntry<PresaleMetrics>> | null = null
  private walletSnapshots: Collection<any> | null = null
  private cacheMetadata: Collection<any> | null = null

  constructor() {
    // Initialize connection on first use
  }

  /**
   * Connect to MongoDB
   */
  async connect(): Promise<void> {
    // Return existing connection if already connected
    if (this.isConnected && this.client) {
      return
    }

    // Return existing connection promise if connecting
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    // Create new connection
    this.connectionPromise = this.performConnect()
    return this.connectionPromise
  }

  /**
   * Perform the actual connection
   */
  private async performConnect(): Promise<void> {
    try {
      console.log('🔗 Connecting to MongoDB...')

      // Create client
      this.client = new MongoClient(MONGODB_CONFIG.CONNECTION_STRING, MONGODB_CONFIG.OPTIONS)

      // Connect to MongoDB with timeout
      const connectPromise = this.client.connect()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 3000)
      )
      await Promise.race([connectPromise, timeoutPromise])

      // Get database
      this.db = this.client.db(MONGODB_CONFIG.DATABASE_NAME)

      // Initialize collections
      this.transactions = this.db.collection<CacheEntry<PresaleTransaction>>(
        MONGODB_CONFIG.COLLECTIONS.TRANSACTIONS
      )
      this.contributors = this.db.collection<CacheEntry<ContributorInfo>>(
        MONGODB_CONFIG.COLLECTIONS.CONTRIBUTORS
      )
      this.metrics = this.db.collection<CacheEntry<PresaleMetrics>>(
        MONGODB_CONFIG.COLLECTIONS.METRICS
      )
      this.walletSnapshots = this.db.collection(
        MONGODB_CONFIG.COLLECTIONS.WALLET_SNAPSHOTS
      )
      this.cacheMetadata = this.db.collection(
        MONGODB_CONFIG.COLLECTIONS.CACHE_METADATA
      )

      // Create indexes for efficient queries
      await this.createIndexes()

      this.isConnected = true
      console.log('✅ Connected to MongoDB successfully')
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error)
      this.isConnected = false
      this.connectionPromise = null
      throw error
    }
  }

  /**
   * Create indexes for efficient queries
   */
  private async createIndexes(): Promise<void> {
    if (!this.transactions || !this.contributors || !this.metrics) return

    try {
      // Transaction indexes
      await this.transactions.createIndexes([
        { key: { key: 1 }, unique: true },
        { key: { expiresAt: 1 }, expireAfterSeconds: 0 }, // TTL index
        { key: { 'value.signature': 1 } },
        { key: { 'value.from': 1 } },
        { key: { 'value.timestamp': -1 } }
      ])

      // Contributor indexes
      await this.contributors.createIndexes([
        { key: { key: 1 }, unique: true },
        { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
        { key: { 'value.address': 1 } },
        { key: { 'value.totalContributed': -1 } }
      ])

      // Metrics indexes
      await this.metrics.createIndexes([
        { key: { key: 1 }, unique: true },
        { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
        { key: { createdAt: -1 } }
      ])

      // Wallet snapshots indexes
      await this.walletSnapshots?.createIndexes([
        { key: { walletAddress: 1, timestamp: -1 } },
        { key: { timestamp: -1 } }
      ])

      console.log('📑 MongoDB indexes created successfully')
    } catch (error) {
      console.error('Failed to create indexes:', error)
    }
  }

  /**
   * Get cached transaction
   */
  async getTransaction(signature: string): Promise<PresaleTransaction | null> {
    await this.connect()
    if (!this.transactions) return null

    try {
      const entry = await this.transactions.findOneAndUpdate(
        {
          key: signature,
          expiresAt: { $gt: new Date() }
        },
        {
          $inc: { accessCount: 1 },
          $set: { lastAccessed: new Date() }
        },
        { returnDocument: 'after' }
      )

      return entry?.value || null
    } catch (error) {
      console.error('Error getting transaction from cache:', error)
      return null
    }
  }

  /**
   * Cache transaction
   */
  async cacheTransaction(
    transaction: PresaleTransaction,
    ttl: number = CACHE_CONFIG.TRANSACTION_CACHE_TTL
  ): Promise<void> {
    await this.connect()
    if (!this.transactions) return

    try {
      const now = new Date()
      const entry: CacheEntry<PresaleTransaction> = {
        key: transaction.signature,
        value: transaction,
        createdAt: now,
        expiresAt: new Date(now.getTime() + ttl),
        accessCount: 0,
        lastAccessed: now,
        metadata: {
          presaleAddress: transaction.to,
          token: transaction.token,
          type: transaction.type
        }
      }

      await this.transactions.replaceOne(
        { key: transaction.signature },
        entry,
        { upsert: true }
      )
    } catch (error) {
      console.error('Error caching transaction:', error)
    }
  }

  /**
   * Cache multiple transactions in batch
   */
  async cacheTransactionsBatch(
    transactions: PresaleTransaction[],
    ttl: number = CACHE_CONFIG.TRANSACTION_CACHE_TTL
  ): Promise<void> {
    await this.connect()
    if (!this.transactions || transactions.length === 0) return

    try {
      const now = new Date()
      const bulkOps = transactions.map(tx => ({
        replaceOne: {
          filter: { key: tx.signature },
          replacement: {
            key: tx.signature,
            value: tx,
            createdAt: now,
            expiresAt: new Date(now.getTime() + ttl),
            accessCount: 0,
            lastAccessed: now,
            metadata: {
              presaleAddress: tx.to,
              token: tx.token,
              type: tx.type
            }
          } as CacheEntry<PresaleTransaction>,
          upsert: true
        }
      }))

      const result = await this.transactions.bulkWrite(bulkOps)
      console.log(`📦 Cached ${result.upsertedCount + result.modifiedCount} transactions`)
    } catch (error) {
      console.error('Error batch caching transactions:', error)
    }
  }

  /**
   * Get cached contributor
   */
  async getContributor(address: string): Promise<ContributorInfo | null> {
    await this.connect()
    if (!this.contributors) return null

    try {
      const entry = await this.contributors.findOneAndUpdate(
        {
          key: address,
          expiresAt: { $gt: new Date() }
        },
        {
          $inc: { accessCount: 1 },
          $set: { lastAccessed: new Date() }
        },
        { returnDocument: 'after' }
      )

      return entry?.value || null
    } catch (error) {
      console.error('Error getting contributor from cache:', error)
      return null
    }
  }

  /**
   * Cache contributor
   */
  async cacheContributor(
    contributor: ContributorInfo,
    ttl: number = CACHE_CONFIG.METRICS_CACHE_TTL
  ): Promise<void> {
    await this.connect()
    if (!this.contributors) return

    try {
      const now = new Date()
      const entry: CacheEntry<ContributorInfo> = {
        key: contributor.address,
        value: contributor,
        createdAt: now,
        expiresAt: new Date(now.getTime() + ttl),
        accessCount: 0,
        lastAccessed: now,
        metadata: {
          totalUSD: contributor.totalContributed,
          txCount: contributor.transactionCount
        }
      }

      await this.contributors.replaceOne(
        { key: contributor.address },
        entry,
        { upsert: true }
      )
    } catch (error) {
      console.error('Error caching contributor:', error)
    }
  }

  /**
   * Get cached metrics
   */
  async getMetrics(walletAddress: string): Promise<PresaleMetrics | null> {
    // Try to connect but don't fail if MongoDB is down
    try {
      await this.connect()
    } catch (error) {
      console.warn('MongoDB connection failed, skipping cache:', error)
      return null
    }

    if (!this.metrics) return null

    try {
      const entry = await this.metrics.findOneAndUpdate(
        {
          key: walletAddress,
          expiresAt: { $gt: new Date() }
        },
        {
          $inc: { accessCount: 1 },
          $set: { lastAccessed: new Date() }
        },
        { returnDocument: 'after' }
      )

      return entry?.value || null
    } catch (error) {
      console.error('Error getting metrics from cache:', error)
      return null
    }
  }

  /**
   * Cache metrics
   */
  async cacheMetrics(
    walletAddress: string,
    metrics: PresaleMetrics,
    ttl: number = CACHE_CONFIG.METRICS_CACHE_TTL
  ): Promise<void> {
    await this.connect()
    if (!this.metrics) return

    try {
      const now = new Date()
      const entry: CacheEntry<PresaleMetrics> = {
        key: walletAddress,
        value: metrics,
        createdAt: now,
        expiresAt: new Date(now.getTime() + ttl),
        accessCount: 0,
        lastAccessed: now,
        metadata: {
          totalRaisedUSD: metrics.totalRaised.totalUSD,
          contributors: metrics.uniqueContributors,
          lastTransaction: metrics.recentTransactions[0]?.timestamp
        }
      }

      await this.metrics.replaceOne(
        { key: walletAddress },
        entry,
        { upsert: true }
      )

      // Also save a snapshot for historical tracking
      await this.saveWalletSnapshot(walletAddress, metrics)
    } catch (error) {
      console.error('Error caching metrics:', error)
    }
  }

  /**
   * Save wallet snapshot for historical tracking
   */
  private async saveWalletSnapshot(
    walletAddress: string,
    metrics: PresaleMetrics
  ): Promise<void> {
    if (!this.walletSnapshots) return

    try {
      await this.walletSnapshots.insertOne({
        walletAddress,
        timestamp: new Date(),
        totalRaised: metrics.totalRaised,
        uniqueContributors: metrics.uniqueContributors,
        transactionCount: metrics.transactionCount,
        dailyVolume: metrics.dailyVolume,
        weeklyVolume: metrics.weeklyVolume,
        monthlyVolume: metrics.monthlyVolume
      })
    } catch (error) {
      // Ignore duplicate key errors for snapshots
      if (!error.message?.includes('duplicate key')) {
        console.error('Error saving wallet snapshot:', error)
      }
    }
  }

  /**
   * Get transactions for a wallet from cache
   */
  async getCachedTransactions(
    walletAddress: string,
    limit: number = 1000
  ): Promise<PresaleTransaction[]> {
    await this.connect()
    if (!this.transactions) return []

    try {
      const entries = await this.transactions
        .find({
          $or: [
            { 'value.from': walletAddress },
            { 'value.to': walletAddress }
          ],
          expiresAt: { $gt: new Date() }
        })
        .sort({ 'value.timestamp': -1 })
        .limit(limit)
        .toArray()

      // Update access counts
      if (entries.length > 0) {
        const keys = entries.map(e => e.key)
        await this.transactions.updateMany(
          { key: { $in: keys } },
          {
            $inc: { accessCount: 1 },
            $set: { lastAccessed: new Date() }
          }
        )
      }

      return entries.map(e => e.value)
    } catch (error) {
      console.error('Error getting cached transactions:', error)
      return []
    }
  }

  /**
   * Get top contributors from cache
   */
  async getCachedTopContributors(
    limit: number = 20
  ): Promise<ContributorInfo[]> {
    await this.connect()
    if (!this.contributors) return []

    try {
      const entries = await this.contributors
        .find({ expiresAt: { $gt: new Date() } })
        .sort({ 'value.totalContributed': -1 })
        .limit(limit)
        .toArray()

      return entries.map(e => e.value)
    } catch (error) {
      console.error('Error getting cached contributors:', error)
      return []
    }
  }

  /**
   * Clear expired cache entries
   */
  async pruneExpiredEntries(): Promise<void> {
    await this.connect()

    try {
      const now = new Date()

      // MongoDB's TTL index will handle this automatically,
      // but we can also manually remove expired entries
      const results = await Promise.all([
        this.transactions?.deleteMany({ expiresAt: { $lt: now } }),
        this.contributors?.deleteMany({ expiresAt: { $lt: now } }),
        this.metrics?.deleteMany({ expiresAt: { $lt: now } })
      ])

      const total = results.reduce((sum, r) => sum + (r?.deletedCount || 0), 0)
      if (total > 0) {
        console.log(`🧹 Pruned ${total} expired cache entries`)
      }
    } catch (error) {
      console.error('Error pruning cache:', error)
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    transactions: number
    contributors: number
    metrics: number
    snapshots: number
    totalSize: number
  }> {
    await this.connect()

    try {
      const [txCount, contribCount, metricsCount, snapshotCount] = await Promise.all([
        this.transactions?.countDocuments() || 0,
        this.contributors?.countDocuments() || 0,
        this.metrics?.countDocuments() || 0,
        this.walletSnapshots?.countDocuments() || 0
      ])

      // Get database stats for size
      const stats = await this.db?.stats()

      return {
        transactions: txCount,
        contributors: contribCount,
        metrics: metricsCount,
        snapshots: snapshotCount,
        totalSize: stats?.dataSize || 0
      }
    } catch (error) {
      console.error('Error getting cache stats:', error)
      return {
        transactions: 0,
        contributors: 0,
        metrics: 0,
        snapshots: 0,
        totalSize: 0
      }
    }
  }

  /**
   * Clear all cache
   */
  async clearCache(): Promise<void> {
    await this.connect()

    try {
      await Promise.all([
        this.transactions?.deleteMany({}),
        this.contributors?.deleteMany({}),
        this.metrics?.deleteMany({})
      ])

      console.log('🧹 Cache cleared successfully')
    } catch (error) {
      console.error('Error clearing cache:', error)
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      this.isConnected = false
      this.connectionPromise = null
      console.log('🔌 Disconnected from MongoDB')
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.connect()
      await this.db?.admin().ping()
      return true
    } catch (error) {
      console.error('MongoDB health check failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const mongoCache = new MongoDBCacheService()

// Export helper functions
export async function getCachedTransaction(signature: string): Promise<PresaleTransaction | null> {
  return mongoCache.getTransaction(signature)
}

export async function cacheTransaction(transaction: PresaleTransaction): Promise<void> {
  return mongoCache.cacheTransaction(transaction)
}

export async function getCachedMetrics(walletAddress: string): Promise<PresaleMetrics | null> {
  return mongoCache.getMetrics(walletAddress)
}

export async function cacheMetrics(walletAddress: string, metrics: PresaleMetrics): Promise<void> {
  return mongoCache.cacheMetrics(walletAddress, metrics)
}
