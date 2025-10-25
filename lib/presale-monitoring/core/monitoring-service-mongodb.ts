/**
 * Enhanced Presale Monitoring Service with MongoDB Caching
 *
 * Integrates MongoDB for persistent caching to reduce RPC calls
 * and improve performance significantly.
 */

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  ConfirmedSignatureInfo
} from '@solana/web3.js'
import {
  PresaleWalletInfo,
  PresaleTransaction,
  PresaleMetrics,
  ContributorInfo,
  PresaleMonitoringOptions,
  RealtimeUpdate,
  HistoricalAnalysis
} from '../types'
import { rpcManager } from '../services/rpc-manager'
import { mongoCache } from '../services/mongodb-cache'
import { globalRateLimiter } from '../utils/rate-limiter'
import { CACHE_CONFIG, RPC_CONFIG, MONITORING_CONFIG, TOKEN_CONFIG, CONTRIBUTOR_CONFIG } from '../config'
import { diagnosticsManager } from '../diagnostics'

/**
 * Enhanced Presale Monitoring Service with MongoDB
 */
export class PresaleMonitoringServiceMongoDB {
  private presaleAddress: PublicKey
  private presaleWallet: string
  private cacheTTL: number
  private metricsCache: PresaleMetrics | null = null
  private lastMetricsUpdate: number = 0
  private isDisposed: boolean = false
  private subscriptions: Map<string, number> = new Map()
  private listeners: Map<string, (data: any) => void> = new Map()

  private mongoInitPromise: Promise<void> | null = null

  constructor(
    presaleWalletAddress: string,
    cacheTTL: number = CACHE_CONFIG.METRICS_CACHE_TTL,
    options: PresaleMonitoringOptions = {}
  ) {
    this.presaleAddress = new PublicKey(presaleWalletAddress)
    this.presaleWallet = presaleWalletAddress
    this.cacheTTL = cacheTTL

    // Connect to MongoDB on initialization
    this.mongoInitPromise = this.initializeMongoDB()
  }

  /**
   * Initialize MongoDB connection
   */
  private async initializeMongoDB(): Promise<void> {
    try {
      await mongoCache.connect()
      console.log('✅ MongoDB cache initialized for presale monitoring')

      // Check for cached metrics immediately
      const cachedMetrics = await mongoCache.getMetrics(this.presaleWallet)
      if (cachedMetrics) {
        this.metricsCache = cachedMetrics
        this.lastMetricsUpdate = cachedMetrics.lastUpdated || Date.now()
        console.log('📦 Loaded cached metrics from MongoDB')
      }
    } catch (error) {
      console.error('Failed to initialize MongoDB:', error)
      // Continue without MongoDB - fallback to RPC only
    }
  }

  /**
   * Get wallet info with caching
   */
  async getWalletInfo(): Promise<PresaleWalletInfo> {
    const startTime = Date.now()

    try {
      // Try to get from recent metrics cache first
      if (this.metricsCache &&
          Date.now() - this.lastMetricsUpdate < 10000) { // 10 second cache
        return this.metricsCache.wallet
      }

      // Fetch fresh data
      const connection = await rpcManager.getConnection()

      // Get balances
      const [solBalance, tokenAccounts, solPrice] = await Promise.all([
        connection.getBalance(this.presaleAddress),
        connection.getParsedTokenAccountsByOwner(this.presaleAddress, {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
        }),
        this.fetchSolPrice()
      ])

      // Calculate USDC balance
      let usdcBalance = 0
      const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

      for (const account of tokenAccounts.value) {
        const parsed = account.account.data as any
        if (parsed.parsed?.info?.mint === USDC_MINT) {
          usdcBalance += parseFloat(parsed.parsed.info.tokenAmount.uiAmount || '0')
        }
      }

      const walletInfo: PresaleWalletInfo = {
        address: this.presaleWallet,
        solBalance: solBalance / LAMPORTS_PER_SOL,
        usdcBalance,
        totalValueUSD: (solBalance / LAMPORTS_PER_SOL) * solPrice + usdcBalance,
        solPrice,
        lastUpdated: Date.now()
      }

      // Record performance
      diagnosticsManager.recordPerformance('getWalletInfo', Date.now() - startTime)

      return walletInfo
    } catch (error) {
      diagnosticsManager.recordError('RPC_ERROR', error)
      throw error
    }
  }

  /**
   * Get all transactions with MongoDB caching
   */
  async getAllTransactions(limit: number = 1000): Promise<PresaleTransaction[]> {
    const startTime = Date.now()

    try {
      // First, try to get cached transactions
      const cachedTransactions = await mongoCache.getCachedTransactions(
        this.presaleWallet,
        limit
      )

      if (cachedTransactions.length >= limit * 0.8) {
        console.log(`📦 Using ${cachedTransactions.length} cached transactions from MongoDB`)
        diagnosticsManager.recordCacheHit('transactions')
        return cachedTransactions.slice(0, limit)
      }

      console.log('🔍 Fetching fresh transactions from blockchain...')
      diagnosticsManager.recordCacheMiss('transactions')

      const transactions: PresaleTransaction[] = []
      let before: string | undefined = undefined
      let fetchedCount = 0

      const connection = await rpcManager.getConnection()
      const solPrice = await this.fetchSolPrice()

      while (fetchedCount < limit) {
        const batchLimit = Math.min(1000, limit - fetchedCount)

        // Apply rate limiting
        await globalRateLimiter.throttle()

        const signatures = await connection.getSignaturesForAddress(
          this.presaleAddress,
          { limit: batchLimit, before }
        )

        if (signatures.length === 0) break

        // Process in batches
        const batchSize = 40 // Optimized for Helius
        const newTransactions: PresaleTransaction[] = []

        for (let i = 0; i < signatures.length; i += batchSize) {
          const batch = signatures.slice(i, i + batchSize)

          // Process batch with caching
          const batchTxs = await this.processBatchWithCache(batch, solPrice)
          newTransactions.push(...batchTxs)
          transactions.push(...batchTxs)
        }

        // Cache new transactions in MongoDB
        if (newTransactions.length > 0) {
          await mongoCache.cacheTransactionsBatch(newTransactions)
        }

        fetchedCount += signatures.length

        if (signatures.length === batchLimit) {
          before = signatures[signatures.length - 1].signature
        } else {
          break
        }
      }

      // Record performance
      diagnosticsManager.recordPerformance('getAllTransactions', Date.now() - startTime)
      console.log(`✅ Fetched and cached ${transactions.length} transactions`)

      return transactions
    } catch (error) {
      diagnosticsManager.recordError('TRANSACTION_FETCH_ERROR', error)
      throw error
    }
  }

  /**
   * Process batch with MongoDB cache checking
   */
  private async processBatchWithCache(
    signatures: ConfirmedSignatureInfo[],
    solPrice: number
  ): Promise<PresaleTransaction[]> {
    const transactions: PresaleTransaction[] = []

    for (const sig of signatures) {
      try {
        // Check MongoDB cache first
        const cached = await mongoCache.getTransaction(sig.signature)
        if (cached) {
          transactions.push(cached)
          continue
        }

        // Not in cache, fetch from RPC
        await globalRateLimiter.throttle()
        const tx = await this.parseTransaction(sig, solPrice)

        if (tx) {
          transactions.push(tx)
          // Cache immediately
          await mongoCache.cacheTransaction(tx)
        }
      } catch (error) {
        console.error(`Failed to process transaction ${sig.signature}:`, error)
      }
    }

    return transactions
  }

  /**
   * Parse transaction from RPC
   */
  private async parseTransaction(
    sigInfo: ConfirmedSignatureInfo,
    solPrice: number
  ): Promise<PresaleTransaction | null> {
    const connection = await rpcManager.getConnection()

    const tx = await connection.getParsedTransaction(sigInfo.signature, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed'
    })

    if (!tx || !tx.meta) return null

    // Find presale account in the transaction
    const presaleIndex = tx.transaction.message.accountKeys.findIndex(
      key => key.pubkey.toString() === this.presaleWallet
    )

    if (presaleIndex === -1) return null

    // Analyze balance changes
    const preBalance = tx.meta.preBalances[presaleIndex] || 0
    const postBalance = tx.meta.postBalances[presaleIndex] || 0
    const solBalanceChange = (postBalance - preBalance) / LAMPORTS_PER_SOL

    let type: 'deposit' | 'withdrawal' | 'unknown' = 'unknown'
    let amount = 0
    let token: 'SOL' | 'USDC' | 'OTHER' = 'SOL'
    let from = 'Unknown'
    let to = 'Unknown'
    let usdValue = 0

    // Check for token transfers (simplified)
    if (Math.abs(solBalanceChange) > 0.0001) {
      amount = Math.abs(solBalanceChange)
      token = 'SOL'

      if (solBalanceChange > 0) {
        type = 'deposit'
        from = tx.transaction.message.accountKeys[0]?.pubkey.toString() || from
        to = this.presaleWallet
      } else {
        type = 'withdrawal'
        from = this.presaleWallet
        to = tx.transaction.message.accountKeys[1]?.pubkey.toString() || to
      }

      usdValue = amount * solPrice
    }

    if (type === 'unknown' || amount === 0) {
      const preBalances = tx.meta.preTokenBalances ?? []
      const postBalances = tx.meta.postTokenBalances ?? []

      type TokenBalanceChange = {
        owner: string
        mint: string
        delta: number
        accountIndex: number
      }

      const balanceMap = new Map<number, TokenBalanceChange>()
      const accountKeys = tx.transaction.message.accountKeys

      for (const balance of preBalances) {
        const accountIndex = balance.accountIndex
        const owner =
          balance.owner ||
          accountKeys[accountIndex]?.pubkey.toString() ||
          'Unknown'

        balanceMap.set(accountIndex, {
          owner,
          mint: balance.mint,
          delta: -(balance.uiTokenAmount?.uiAmount ?? 0),
          accountIndex
        })
      }

      for (const balance of postBalances) {
        const accountIndex = balance.accountIndex
        const owner =
          balance.owner ||
          accountKeys[accountIndex]?.pubkey.toString() ||
          'Unknown'

        const existing = balanceMap.get(accountIndex)
        const amountChange = balance.uiTokenAmount?.uiAmount ?? 0

        if (existing) {
          existing.delta += amountChange
        } else {
          balanceMap.set(accountIndex, {
            owner,
            mint: balance.mint,
            delta: amountChange,
            accountIndex
          })
        }
      }

      const balanceChanges = Array.from(balanceMap.values()).filter(change =>
        Math.abs(change.delta) > 1e-6
      )

      const presaleChange = balanceChanges.find(change => change.owner === this.presaleWallet)

      if (presaleChange && Math.abs(presaleChange.delta) > 1e-6) {
        type = presaleChange.delta > 0 ? 'deposit' : 'withdrawal'
        amount = Math.abs(presaleChange.delta)
        token = presaleChange.mint === TOKEN_CONFIG.USDC_MINT ? 'USDC' : 'OTHER'
        from = type === 'deposit' ? this.findTokenCounterparty(balanceChanges, presaleChange) : this.presaleWallet
        to = type === 'deposit' ? this.presaleWallet : this.findTokenCounterparty(balanceChanges, presaleChange)
        usdValue = token === 'USDC' ? amount : 0
      }
    }

    if (type === 'unknown' || amount === 0) {
      return null
    }

    return {
      signature: sigInfo.signature,
      type,
      amount,
      token,
      from,
      to,
      timestamp: (sigInfo.blockTime || 0) * 1000,
      status: tx.meta.err ? 'failed' : 'success',
      usdValue,
      blockSlot: sigInfo.slot
    }
  }

  /**
   * Get comprehensive metrics with MongoDB caching
   */
  async getMetrics(forceRefresh: boolean = false): Promise<PresaleMetrics> {
    const startTime = Date.now()

    // Ensure MongoDB is initialized (but don't wait more than 1 second)
    if (this.mongoInitPromise) {
      try {
        await Promise.race([
          this.mongoInitPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('MongoDB init timeout')), 1000))
        ])
      } catch (error) {
        console.warn('MongoDB initialization timeout, continuing without cache')
      }
    }

    // Check cache validity
    if (!forceRefresh &&
        this.metricsCache &&
        this.metricsCache.contributorSummary &&
        Date.now() - this.lastMetricsUpdate < this.cacheTTL) {
      console.log('📦 Returning cached metrics from memory')
      return this.metricsCache
    }

    // Check MongoDB cache
    if (!forceRefresh) {
      const cachedMetrics = await mongoCache.getMetrics(this.presaleWallet)
      if (cachedMetrics &&
          cachedMetrics.contributorSummary &&
          Date.now() - (cachedMetrics.lastUpdated || 0) < this.cacheTTL) {
        console.log('📦 Returning cached metrics from MongoDB')
        this.metricsCache = cachedMetrics
        this.lastMetricsUpdate = cachedMetrics.lastUpdated || Date.now()
        return cachedMetrics
      }
    }

    console.log('📊 Calculating fresh metrics...')

    try {
      // Fetch wallet info and transactions in parallel
      const [wallet, transactions] = await Promise.all([
        this.getWalletInfo(),
        this.getAllTransactions(5000) // Get more for better metrics
      ])

      // Filter deposits only
      const deposits = transactions.filter(tx =>
        tx.type === 'deposit' && tx.status === 'success'
      )

      // Calculate total raised
      const totalRaised = deposits.reduce((acc, tx) => {
        if (tx.token === 'SOL') {
          acc.sol += tx.amount
          acc.totalUSD += tx.usdValue
        } else if (tx.token === 'USDC') {
          acc.usdc += tx.amount
          acc.totalUSD += tx.usdValue
        }
        return acc
      }, { sol: 0, usdc: 0, totalUSD: 0 })

      // Time-based calculations
      const now = Date.now()
      const day = 24 * 60 * 60 * 1000
      const week = 7 * day
      const month = 30 * day

      const recentDeposits = deposits.filter(tx => tx.timestamp > now - month)

      const dailyVolume = recentDeposits
        .filter(tx => tx.timestamp > now - day)
        .reduce((sum, tx) => sum + tx.usdValue, 0)

      const weeklyVolume = recentDeposits
        .filter(tx => tx.timestamp > now - week)
        .reduce((sum, tx) => sum + tx.usdValue, 0)

      const monthlyVolume = recentDeposits
        .reduce((sum, tx) => sum + tx.usdValue, 0)

      // Unique contributors
      const contributors = new Map<string, ContributorInfo>()

      for (const tx of deposits) {
        const existing = contributors.get(tx.from) || {
          address: tx.from,
          totalContributed: 0,
          transactionCount: 0,
          firstContribution: tx.timestamp,
          lastContribution: tx.timestamp,
          averageAmount: 0
        }

        existing.totalContributed += tx.usdValue
        existing.transactionCount += 1
        existing.lastContribution = Math.max(existing.lastContribution, tx.timestamp)
        existing.firstContribution = Math.min(existing.firstContribution, tx.timestamp)
        existing.averageAmount = existing.totalContributed / existing.transactionCount

        contributors.set(tx.from, existing)
      }

      const contributorList = Array.from(contributors.values())
      const totalContributorUSD = contributorList.reduce(
        (sum, contributor) => sum + contributor.totalContributed,
        0
      )

      const thresholdUSD = CONTRIBUTOR_CONFIG.MIN_USD_THRESHOLD
      const significantContributors = contributorList.filter(
        contributor => contributor.totalContributed >= thresholdUSD
      )

      const significantTotalUSD = significantContributors.reduce(
        (sum, contributor) => sum + contributor.totalContributed,
        0
      )

      const significantList = significantContributors
        .sort((a, b) => b.totalContributed - a.totalContributed)
        .slice(0, CONTRIBUTOR_CONFIG.MAX_LEADERBOARD_SIZE)
        .map(contributor => ({
          address: contributor.address,
          totalUSD: contributor.totalContributed,
          transactionCount: contributor.transactionCount,
          firstContribution: contributor.firstContribution,
          lastContribution: contributor.lastContribution,
        }))

      // Cache top contributors (full list) for quick lookups
      const topContributors = contributorList
        .sort((a, b) => b.totalContributed - a.totalContributed)
        .slice(0, 100)

      for (const contributor of topContributors) {
        await mongoCache.cacheContributor(contributor)
      }

      // Calculate distribution
      const amounts = deposits.map(tx => tx.usdValue).sort((a, b) => a - b)

      const metrics: PresaleMetrics = {
        wallet,
        totalRaised,
        recentTransactions: transactions.slice(0, 100),
        dailyVolume,
        weeklyVolume,
        monthlyVolume,
        transactionCount: {
          total: transactions.length,
          deposits: deposits.length,
          withdrawals: transactions.filter(tx => tx.type === 'withdrawal').length,
          last24h: transactions.filter(tx => tx.timestamp > now - day).length,
          last7d: transactions.filter(tx => tx.timestamp > now - week).length,
          last30d: transactions.filter(tx => tx.timestamp > now - month).length
        },
        uniqueContributors: contributorList.length,
        averageContribution: deposits.length > 0 ?
          totalRaised.totalUSD / deposits.length : 0,
        medianContribution: amounts.length > 0 ?
          amounts[Math.floor(amounts.length / 2)] : 0,
        largestContribution: amounts.length > 0 ?
          amounts[amounts.length - 1] : 0,
        smallestContribution: amounts.length > 0 ?
          amounts[0] : 0,
        contributionDistribution: this.calculateDistribution(amounts),
        contributorSummary: {
          totalContributors: contributorList.length,
          totalUSD: totalContributorUSD,
          thresholdUSD,
          filteredContributors: significantList,
          filteredTotalContributors: significantContributors.length,
          filteredTotalUSD: significantTotalUSD,
        },
        lastUpdated: Date.now()
      }

      // Cache metrics
      this.metricsCache = metrics
      this.lastMetricsUpdate = Date.now()
      await mongoCache.cacheMetrics(this.presaleWallet, metrics)

      // Record performance
      diagnosticsManager.recordPerformance('getMetrics', Date.now() - startTime)
      console.log(`✅ Metrics calculated and cached (${Date.now() - startTime}ms)`)

      return metrics
    } catch (error) {
      diagnosticsManager.recordError('METRICS_ERROR', error)
      throw error
    }
  }

  /**
   * Get top contributors with MongoDB caching
   */
  async getTopContributors(
    limit: number = 20,
    minUsd: number = CONTRIBUTOR_CONFIG.MIN_USD_THRESHOLD
  ): Promise<ContributorInfo[]> {
    // Try MongoDB cache first
    const cached = await mongoCache.getCachedTopContributors(limit)
    if (cached.length > 0) {
      console.log(`📦 Using ${cached.length} cached contributors from MongoDB`)
      return cached.filter(contributor => contributor.totalContributed >= minUsd)
    }

    // Calculate fresh if not cached
    const metrics = await this.getMetrics()
    const transactions = await this.getAllTransactions(5000)

    const deposits = transactions.filter(tx =>
      tx.type === 'deposit' && tx.status === 'success'
    )

    const contributors = new Map<string, ContributorInfo>()

    for (const tx of deposits) {
      const existing = contributors.get(tx.from) || {
        address: tx.from,
        totalContributed: 0,
        transactionCount: 0,
        firstContribution: tx.timestamp,
        lastContribution: tx.timestamp,
        averageAmount: 0
      }

      existing.totalContributed += tx.usdValue
      existing.transactionCount += 1
      existing.lastContribution = Math.max(existing.lastContribution, tx.timestamp)
      existing.firstContribution = Math.min(existing.firstContribution, tx.timestamp)
      existing.averageAmount = existing.totalContributed / existing.transactionCount

      contributors.set(tx.from, existing)
    }

    const topContributors = Array.from(contributors.values())
      .filter(contributor => contributor.totalContributed >= minUsd)
      .sort((a, b) => b.totalContributed - a.totalContributed)
      .slice(0, limit)

    // Cache contributors
    for (const contributor of topContributors) {
      await mongoCache.cacheContributor(contributor)
    }

    return topContributors
  }

  /**
   * Calculate contribution distribution
   */
  private findTokenCounterparty(
    changes: Array<{ owner: string; mint: string; delta: number }>,
    presaleChange: { owner: string; mint: string; delta: number }
  ): string {
    const desiredSign = presaleChange.delta > 0 ? -1 : 1

    const candidates = changes
      .filter(change => change.mint === presaleChange.mint && change.owner !== presaleChange.owner)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))

    const matching = candidates.find(change => change.delta * desiredSign > 0)

    return matching?.owner || candidates[0]?.owner || 'Unknown'
  }

  /**
   * Calculate contribution distribution
   */
  private calculateDistribution(amounts: number[]) {
    return {
      under100: amounts.filter(a => a < 100).length,
      from100to500: amounts.filter(a => a >= 100 && a < 500).length,
      from500to1000: amounts.filter(a => a >= 500 && a < 1000).length,
      from1000to5000: amounts.filter(a => a >= 1000 && a < 5000).length,
      from5000to10000: amounts.filter(a => a >= 5000 && a < 10000).length,
      above10000: amounts.filter(a => a >= 10000).length
    }
  }

  /**
   * Fetch SOL price
   */
  private async fetchSolPrice(): Promise<number> {
    try {
      const response = await fetch('https://price.jup.ag/v6/price?ids=SOL')
      const data = await response.json()
      return data?.data?.SOL?.price || 0
    } catch {
      return 0
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    const mongoStats = await mongoCache.getStats()
    return {
      mongodb: mongoStats,
      memory: {
        hasMetrics: !!this.metricsCache,
        lastUpdate: this.lastMetricsUpdate,
        age: Date.now() - this.lastMetricsUpdate
      }
    }
  }

  /**
   * Clear all caches
   */
  async clearCache() {
    this.metricsCache = null
    this.lastMetricsUpdate = 0
    await mongoCache.clearCache()
    console.log('🧹 All caches cleared')
  }

  /**
   * Cleanup resources
   */
  async dispose() {
    this.isDisposed = true
    this.subscriptions.clear()
    this.listeners.clear()
    await mongoCache.disconnect()
    console.log('🔌 Service disposed')
  }
}
