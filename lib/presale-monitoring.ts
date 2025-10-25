import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  ParsedTransactionWithMeta,
  ConfirmedSignatureInfo,
  ParsedAccountData
} from "@solana/web3.js"
import {
  QUICKNODE_RPC_URL,
  QUICKNODE_WSS_URL,
  HELIUS_RPC_URL,
  fetchWalletBalances,
  fetchSolUsdPrice,
  USDC_MINT_LEGACY
} from "./solana"

// Coffee presale address as default
export const COFFEE_PRESALE_ADDRESS = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s"

// USDC Token Program IDs
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"

export interface PresaleWalletInfo {
  address: string
  solBalance: number
  usdcBalance: number
  totalValueUSD: number
  solPrice: number
  lastUpdated: number
}

export interface PresaleTransaction {
  signature: string
  type: 'deposit' | 'withdrawal' | 'unknown'
  amount: number
  token: 'SOL' | 'USDC' | 'OTHER'
  from: string
  to: string
  timestamp: number
  status: 'success' | 'failed'
  usdValue: number
  blockSlot?: number
}

export interface PresaleMetrics {
  wallet: PresaleWalletInfo
  totalRaised: {
    sol: number
    usdc: number
    totalUSD: number
  }
  recentTransactions: PresaleTransaction[]
  dailyVolume: number  // Actual 24h volume
  weeklyVolume: number // Actual 7d volume
  monthlyVolume: number // Actual 30d volume
  transactionCount: {
    total: number
    deposits: number
    withdrawals: number
    last24h: number
    last7d: number
  }
  uniqueContributors: number
  averageContribution: number
  medianContribution: number
  largestContribution: number
  smallestContribution: number
  contributionDistribution: {
    under100: number
    from100to500: number
    from500to1000: number
    from1000to5000: number
    from5000to10000: number
    above10000: number
  }
}

export interface ContributorInfo {
  address: string
  totalContributed: number
  transactionCount: number
  firstContribution: number
  lastContribution: number
  averageAmount: number
}

// LRU Cache implementation for memory management
class LRUCache<K, V> {
  private maxSize: number
  private cache: Map<K, V>

  constructor(maxSize: number) {
    this.maxSize = maxSize
    this.cache = new Map()
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    this.cache.delete(key)
    this.cache.set(key, value)

    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// Rate limiter to prevent 429 errors with token bucket algorithm
class RateLimiter {
  private tokens: number
  private lastRefill: number = Date.now()
  private readonly maxTokens: number
  private readonly refillRate: number

  constructor(maxRequestsPerSecond: number = 10) {
    this.maxTokens = maxRequestsPerSecond
    this.tokens = maxRequestsPerSecond
    this.refillRate = maxRequestsPerSecond // tokens per second
  }

  async throttle(): Promise<void> {
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000 // in seconds

    // Refill tokens based on time passed
    this.tokens = Math.min(this.maxTokens, this.tokens + (timePassed * this.refillRate))
    this.lastRefill = now

    // If no tokens available, calculate wait time
    if (this.tokens < 1) {
      const waitTime = ((1 - this.tokens) / this.refillRate) * 1000
      await new Promise(resolve => setTimeout(resolve, Math.ceil(waitTime)))

      // Refill after waiting
      const afterWait = Date.now()
      const waitedTime = (afterWait - now) / 1000
      this.tokens = Math.min(this.maxTokens, this.tokens + (waitedTime * this.refillRate))
      this.lastRefill = afterWait
    }

    // Consume a token
    this.tokens -= 1
  }

  // Get current token count for debugging
  getAvailableTokens(): number {
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000
    return Math.min(this.maxTokens, this.tokens + (timePassed * this.refillRate))
  }
}

// Global rate limiter instance - 50 requests per second with Helius
const rateLimiter = new RateLimiter(50) // Helius standard supports 50 req/s

// Retry utility with exponential backoff and rate limit handling
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any

  for (let i = 0; i < maxRetries; i++) {
    try {
      // Apply rate limiting before each request
      await rateLimiter.throttle()
      return await fn()
    } catch (error: any) {
      lastError = error

      // Special handling for rate limit errors
      if (error?.message?.includes('429') || error?.response?.status === 429) {
        console.log(`Rate limited (429). Waiting longer before retry ${i + 1}/${maxRetries}...`)
        // For rate limits, use a longer delay
        const delay = Math.min(initialDelay * Math.pow(3, i), 30000) // Max 30 seconds
        await new Promise(resolve => setTimeout(resolve, delay))
      } else if (i < maxRetries - 1) {
        // Regular exponential backoff for other errors
        const delay = initialDelay * Math.pow(2, i)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

class PresaleMonitoringService {
  private connection: Connection
  private presaleAddress: PublicKey
  private subscriptions: Map<string, number> = new Map()
  private transactionCache: LRUCache<string, PresaleTransaction>
  private contributorCache: LRUCache<string, ContributorInfo>
  private metricsCache: PresaleMetrics | null = null
  private lastMetricsUpdate: number = 0
  private readonly CACHE_TTL = 30000 // 30 seconds
  private readonly MAX_TRANSACTION_CACHE = 10000
  private readonly MAX_CONTRIBUTOR_CACHE = 5000
  private isDisposed: boolean = false
  private reconnectTimer: NodeJS.Timeout | null = null
  private listeners: Map<string, (data: any) => void> = new Map()

  constructor(presaleAddress: string = COFFEE_PRESALE_ADDRESS, rpcUrl?: string, wssUrl?: string) {
    // Use Helius as default for better performance (50 req/sec)
    this.connection = new Connection(rpcUrl || HELIUS_RPC_URL, {
      commitment: "confirmed",
      confirmTransactionInitialTimeout: 60000,
      wsEndpoint: wssUrl || QUICKNODE_WSS_URL // Keep QuickNode for WebSocket since Helius doesn't provide WSS
    })
    this.presaleAddress = new PublicKey(presaleAddress)
    this.transactionCache = new LRUCache(this.MAX_TRANSACTION_CACHE)
    this.contributorCache = new LRUCache(this.MAX_CONTRIBUTOR_CACHE)
  }

  /**
   * Get real-time wallet balance and info
   */
  async getWalletInfo(): Promise<PresaleWalletInfo> {
    return retryWithBackoff(async () => {
      const [balances, solPrice] = await Promise.all([
        fetchWalletBalances(this.presaleAddress.toString()),
        fetchSolUsdPrice()
      ])

      const totalValueUSD = balances.sol * solPrice + balances.usdc

      return {
        address: this.presaleAddress.toString(),
        solBalance: balances.sol,
        usdcBalance: balances.usdc,
        totalValueUSD,
        solPrice,
        lastUpdated: Date.now()
      }
    })
  }

  /**
   * Fetch and process all transactions with proper pagination
   */
  async getAllTransactions(limit?: number): Promise<PresaleTransaction[]> {
    const transactions: PresaleTransaction[] = []
    let before: string | undefined = undefined
    let fetchedCount = 0
    const targetLimit = limit || 1000

    try {
      const solPrice = await fetchSolUsdPrice()

      while (fetchedCount < targetLimit) {
        const batchLimit = Math.min(1000, targetLimit - fetchedCount)

        const signatures = await retryWithBackoff(() =>
          this.connection.getSignaturesForAddress(
            this.presaleAddress,
            {
              limit: batchLimit,
              before
            }
          )
        )

        if (signatures.length === 0) break

        // Process in larger batches - utilizing Helius 50 req/sec limit
        // Larger batches = more efficient with higher rate limit
        const batchSize = 40 // Increased for Helius capacity

        for (let i = 0; i < signatures.length; i += batchSize) {
          const batch = signatures.slice(i, i + batchSize)
          const batchTxs = await this.processBatch(batch, solPrice)
          transactions.push(...batchTxs)

          // No additional delay needed - processBatch handles rate limiting
        }

        fetchedCount += signatures.length

        // Set before to the last signature for pagination
        if (signatures.length === batchLimit) {
          before = signatures[signatures.length - 1].signature
        } else {
          break // No more transactions
        }
      }

      return transactions.sort((a, b) => b.timestamp - a.timestamp)
    } catch (error) {
      console.error("Error fetching all transactions:", error)
      throw error
    }
  }

  /**
   * Process a batch of signatures with PROPER rate limiting
   * Sequential processing to respect rate limits
   */
  private async processBatch(
    signatures: ConfirmedSignatureInfo[],
    solPrice: number
  ): Promise<PresaleTransaction[]> {
    const transactions: PresaleTransaction[] = []

    // Process sequentially to respect rate limits
    // With 15 req/sec, we need ~67ms between requests
    for (const sig of signatures) {
      try {
        const tx = await this.parseTransaction(sig, solPrice)
        if (tx) {
          transactions.push(tx)
          this.transactionCache.set(tx.signature, tx)
        }
      } catch (error) {
        console.error(`Failed to parse transaction ${sig.signature}:`, error)
      }

      // Delay to maintain rate limit (1000ms / 50 = 20ms per request)
      // Reduced to 10ms for Helius's 50 req/sec capacity
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    return transactions
  }

  /**
   * Enhanced transaction parser with comprehensive token detection
   */
  private async parseTransaction(
    sigInfo: ConfirmedSignatureInfo,
    solPrice: number
  ): Promise<PresaleTransaction | null> {
    try {
      // Check cache first
      const cached = this.transactionCache.get(sigInfo.signature)
      if (cached) return cached

      const tx = await retryWithBackoff(() =>
        this.connection.getParsedTransaction(sigInfo.signature, {
          maxSupportedTransactionVersion: 0,
          commitment: 'confirmed'
        })
      )

      if (!tx || !tx.meta) return null

      // Find presale account in the transaction
      const presaleIndex = tx.transaction.message.accountKeys.findIndex(
        key => key.pubkey.toString() === this.presaleAddress.toString()
      )

      if (presaleIndex === -1) return null

      // Analyze balance changes for SOL
      const preBalance = tx.meta.preBalances[presaleIndex] || 0
      const postBalance = tx.meta.postBalances[presaleIndex] || 0
      const solBalanceChange = (postBalance - preBalance) / LAMPORTS_PER_SOL

      // Initialize transaction details
      let type: 'deposit' | 'withdrawal' | 'unknown' = 'unknown'
      let amount = 0
      let token: 'SOL' | 'USDC' | 'OTHER' = 'SOL'
      let from = "Unknown"
      let to = "Unknown"
      let usdValue = 0

      // Check for SPL token transfers (USDC)
      let usdcTransferFound = false

      if (tx.meta.innerInstructions) {
        for (const innerGroup of tx.meta.innerInstructions) {
          for (const ix of innerGroup.instructions) {
            if ('parsed' in ix && ix.parsed) {
              const parsed = ix.parsed

              // Check for token transfers
              if (parsed.type === 'transfer' || parsed.type === 'transferChecked') {
                const info = parsed.info

                // Verify it's USDC by checking the mint or program
                if (ix.programId.toString() === TOKEN_PROGRAM_ID ||
                    ix.programId.toString() === TOKEN_2022_PROGRAM_ID) {

                  // For transferChecked, we have the mint directly
                  if (info.mint === USDC_MINT_LEGACY.toString()) {
                    usdcTransferFound = true
                    token = 'USDC'

                    // Determine direction
                    if (info.destination === this.presaleAddress.toString() ||
                        info.to === this.presaleAddress.toString()) {
                      type = 'deposit'
                      from = info.source || info.from || info.authority || from
                      to = this.presaleAddress.toString()
                      amount = parseFloat(info.tokenAmount?.uiAmount || info.amount || "0")
                    } else if (info.source === this.presaleAddress.toString() ||
                               info.from === this.presaleAddress.toString()) {
                      type = 'withdrawal'
                      from = this.presaleAddress.toString()
                      to = info.destination || info.to || to
                      amount = parseFloat(info.tokenAmount?.uiAmount || info.amount || "0")
                    }

                    usdValue = amount // USDC is 1:1 with USD
                  }
                }
              }
            }
          }
        }
      }

      // If no USDC transfer found, analyze SOL transfer
      if (!usdcTransferFound && Math.abs(solBalanceChange) > 0.0001) {
        amount = Math.abs(solBalanceChange)
        token = 'SOL'

        if (solBalanceChange > 0) {
          type = 'deposit'
          // Find the sender (usually the fee payer)
          from = tx.transaction.message.accountKeys[0]?.pubkey.toString() || from
          to = this.presaleAddress.toString()
        } else {
          type = 'withdrawal'
          from = this.presaleAddress.toString()
          // Find the recipient (usually the second account for simple transfers)
          to = tx.transaction.message.accountKeys[1]?.pubkey.toString() || to
        }

        usdValue = amount * solPrice
      }

      // Only return meaningful transactions
      if (type === 'unknown' || amount === 0) {
        return null
      }

      const transaction: PresaleTransaction = {
        signature: sigInfo.signature,
        type,
        amount,
        token,
        from,
        to,
        timestamp: (tx.blockTime || 0) * 1000,
        status: tx.meta.err ? 'failed' : 'success',
        usdValue,
        blockSlot: tx.slot
      }

      return transaction
    } catch (error) {
      console.error(`Error parsing transaction ${sigInfo.signature}:`, error)
      return null
    }
  }

  /**
   * Get comprehensive presale metrics with real data
   */
  async getMetrics(forceRefresh: boolean = false): Promise<PresaleMetrics> {
    // Check cache
    if (!forceRefresh && this.metricsCache &&
        Date.now() - this.lastMetricsUpdate < this.CACHE_TTL) {
      return this.metricsCache
    }

    try {
      // Fetch wallet info and transactions - increased limit with 15 req/sec available
      const [walletInfo, allTransactions] = await Promise.all([
        this.getWalletInfo(),
        this.getAllTransactions(2000) // Increased to 2000 with better rate limiting
      ])

      // Filter successful deposits only for contributor analysis
      const successfulDeposits = allTransactions.filter(
        tx => tx.type === 'deposit' && tx.status === 'success'
      )

      // Calculate unique contributors and their stats
      const contributorMap = new Map<string, ContributorInfo>()

      for (const tx of successfulDeposits) {
        const existing = contributorMap.get(tx.from) || {
          address: tx.from,
          totalContributed: 0,
          transactionCount: 0,
          firstContribution: tx.timestamp,
          lastContribution: tx.timestamp,
          averageAmount: 0
        }

        existing.totalContributed += tx.usdValue
        existing.transactionCount += 1
        existing.firstContribution = Math.min(existing.firstContribution, tx.timestamp)
        existing.lastContribution = Math.max(existing.lastContribution, tx.timestamp)
        existing.averageAmount = existing.totalContributed / existing.transactionCount

        contributorMap.set(tx.from, existing)
        this.contributorCache.set(tx.from, existing)
      }

      const uniqueContributors = contributorMap.size
      const contributorStats = Array.from(contributorMap.values())

      // Calculate real volume metrics
      const now = Date.now()
      const day = 86400000
      const week = day * 7
      const month = day * 30

      const last24h = successfulDeposits.filter(tx => now - tx.timestamp < day)
      const last7d = successfulDeposits.filter(tx => now - tx.timestamp < week)
      const last30d = successfulDeposits.filter(tx => now - tx.timestamp < month)

      const dailyVolume = last24h.reduce((sum, tx) => sum + tx.usdValue, 0)
      const weeklyVolume = last7d.reduce((sum, tx) => sum + tx.usdValue, 0)
      const monthlyVolume = last30d.reduce((sum, tx) => sum + tx.usdValue, 0)

      // Calculate contribution statistics
      const contributions = contributorStats.map(c => c.totalContributed).sort((a, b) => a - b)
      const totalContributions = contributions.reduce((sum, c) => sum + c, 0)

      const averageContribution = uniqueContributors > 0 ?
        totalContributions / uniqueContributors : 0

      const medianContribution = contributions.length > 0 ?
        contributions.length % 2 === 0 ?
          (contributions[Math.floor(contributions.length / 2) - 1] +
           contributions[Math.floor(contributions.length / 2)]) / 2 :
          contributions[Math.floor(contributions.length / 2)] :
        0

      const largestContribution = contributions.length > 0 ?
        contributions[contributions.length - 1] : 0

      const smallestContribution = contributions.length > 0 ?
        contributions[0] : 0

      // Calculate contribution distribution
      const distribution = {
        under100: contributorStats.filter(c => c.totalContributed < 100).length,
        from100to500: contributorStats.filter(c =>
          c.totalContributed >= 100 && c.totalContributed < 500).length,
        from500to1000: contributorStats.filter(c =>
          c.totalContributed >= 500 && c.totalContributed < 1000).length,
        from1000to5000: contributorStats.filter(c =>
          c.totalContributed >= 1000 && c.totalContributed < 5000).length,
        from5000to10000: contributorStats.filter(c =>
          c.totalContributed >= 5000 && c.totalContributed < 10000).length,
        above10000: contributorStats.filter(c => c.totalContributed >= 10000).length
      }

      // Count transaction types
      const deposits = allTransactions.filter(tx => tx.type === 'deposit').length
      const withdrawals = allTransactions.filter(tx => tx.type === 'withdrawal').length

      const metrics: PresaleMetrics = {
        wallet: walletInfo,
        totalRaised: {
          sol: walletInfo.solBalance,
          usdc: walletInfo.usdcBalance,
          totalUSD: walletInfo.totalValueUSD
        },
        recentTransactions: allTransactions.slice(0, 50), // Last 50 transactions
        dailyVolume,
        weeklyVolume,
        monthlyVolume,
        transactionCount: {
          total: allTransactions.length,
          deposits,
          withdrawals,
          last24h: last24h.length,
          last7d: last7d.length
        },
        uniqueContributors,
        averageContribution,
        medianContribution,
        largestContribution,
        smallestContribution,
        contributionDistribution: distribution
      }

      // Update cache
      this.metricsCache = metrics
      this.lastMetricsUpdate = now

      return metrics
    } catch (error) {
      console.error("Error calculating metrics:", error)
      throw error
    }
  }

  /**
   * Get top contributors with detailed stats
   */
  async getTopContributors(limit: number = 20): Promise<ContributorInfo[]> {
    try {
      const transactions = await this.getAllTransactions(2000)
      const successfulDeposits = transactions.filter(
        tx => tx.type === 'deposit' && tx.status === 'success'
      )

      const contributorMap = new Map<string, ContributorInfo>()

      for (const tx of successfulDeposits) {
        const existing = this.contributorCache.get(tx.from) || contributorMap.get(tx.from) || {
          address: tx.from,
          totalContributed: 0,
          transactionCount: 0,
          firstContribution: tx.timestamp,
          lastContribution: tx.timestamp,
          averageAmount: 0
        }

        existing.totalContributed += tx.usdValue
        existing.transactionCount += 1
        existing.firstContribution = Math.min(existing.firstContribution, tx.timestamp)
        existing.lastContribution = Math.max(existing.lastContribution, tx.timestamp)
        existing.averageAmount = existing.totalContributed / existing.transactionCount

        contributorMap.set(tx.from, existing)
      }

      return Array.from(contributorMap.values())
        .sort((a, b) => b.totalContributed - a.totalContributed)
        .slice(0, limit)
    } catch (error) {
      console.error("Error getting top contributors:", error)
      throw error
    }
  }

  /**
   * Start real-time monitoring with auto-reconnect
   */
  async startRealtimeMonitoring(
    onUpdate: (update: { type: string; data: any }) => void
  ): Promise<void> {
    if (this.isDisposed) {
      throw new Error("Service has been disposed")
    }

    try {
      // Store the callback
      this.listeners.set('main', onUpdate)

      // Subscribe to account changes
      const accountSubId = this.connection.onAccountChange(
        this.presaleAddress,
        async (accountInfo) => {
          try {
            await this.handleAccountUpdate(accountInfo, onUpdate)
          } catch (error) {
            console.error("Error handling account update:", error)
          }
        },
        "confirmed"
      )
      this.subscriptions.set('account', accountSubId)

      // Subscribe to logs for transactions
      const logsSubId = this.connection.onLogs(
        this.presaleAddress,
        async (logs) => {
          try {
            await this.handleLogs(logs, onUpdate)
          } catch (error) {
            console.error("Error handling logs:", error)
          }
        },
        "confirmed"
      )
      this.subscriptions.set('logs', logsSubId)

      // Set up reconnection monitoring
      this.setupReconnection(onUpdate)

      console.log("Started real-time monitoring for", this.presaleAddress.toString())
    } catch (error) {
      console.error("Error starting realtime monitoring:", error)
      throw error
    }
  }

  /**
   * Setup WebSocket reconnection logic
   */
  private setupReconnection(onUpdate: (update: any) => void): void {
    // Clear any existing timer
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer)
    }

    // Check connection health every 30 seconds
    this.reconnectTimer = setInterval(async () => {
      try {
        // Try a simple RPC call to check connection
        await this.connection.getSlot()
      } catch (error) {
        console.log("Connection lost, attempting to reconnect...")

        // Clear existing subscriptions
        this.clearSubscriptions()

        // Attempt to reconnect
        try {
          await this.startRealtimeMonitoring(onUpdate)
          console.log("Successfully reconnected")
        } catch (reconnectError) {
          console.error("Failed to reconnect:", reconnectError)
        }
      }
    }, 30000)
  }

  /**
   * Handle account balance updates
   */
  private async handleAccountUpdate(accountInfo: any, onUpdate: (update: any) => void) {
    const walletInfo = await this.getWalletInfo()
    onUpdate({
      type: 'balance_update',
      data: walletInfo
    })

    // Refresh metrics on balance change
    const metrics = await this.getMetrics(true)
    onUpdate({
      type: 'metrics_update',
      data: metrics
    })
  }

  /**
   * Handle transaction logs
   */
  private async handleLogs(logs: any, onUpdate: (update: any) => void) {
    if (logs.signature) {
      // Fetch and parse the new transaction
      const solPrice = await fetchSolUsdPrice()
      const sigInfo: ConfirmedSignatureInfo = {
        signature: logs.signature,
        slot: logs.slot,
        err: logs.err,
        memo: null,
        blockTime: null,
        confirmationStatus: 'confirmed'
      }

      const transaction = await this.parseTransaction(sigInfo, solPrice)
      if (transaction) {
        onUpdate({
          type: 'new_transaction',
          data: transaction
        })

        // Update metrics after new transaction
        const metrics = await this.getMetrics(true)
        onUpdate({
          type: 'metrics_update',
          data: metrics
        })
      }
    }
  }

  /**
   * Clear all subscriptions
   */
  private clearSubscriptions(): void {
    for (const [key, subId] of this.subscriptions.entries()) {
      if (key === 'account') {
        this.connection.removeAccountChangeListener(subId)
      } else if (key === 'logs') {
        // Note: Solana web3.js doesn't have removeOnLogsListener yet
        // This is a known limitation - subscription will timeout eventually
      }
    }
    this.subscriptions.clear()
  }

  /**
   * Stop real-time monitoring
   */
  stopRealtimeMonitoring(): void {
    this.clearSubscriptions()

    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer)
      this.reconnectTimer = null
    }

    this.listeners.clear()
    console.log("Stopped real-time monitoring")
  }

  /**
   * Get historical analysis with accurate data
   */
  async getHistoricalAnalysis(days: number = 30): Promise<{
    dailyVolumes: { date: string; volume: number; transactions: number }[]
    cumulativeRaised: { date: string; total: number }[]
    topContributors: ContributorInfo[]
    hourlyActivity: { hour: number; avgTransactions: number; avgVolume: number }[]
  }> {
    try {
      const limit = Math.min(days * 200, 10000) // Estimate transactions
      const transactions = await this.getAllTransactions(limit)

      const now = Date.now()
      const startDate = now - (days * 86400000)

      // Filter to date range and successful deposits
      const relevantTxs = transactions.filter(
        tx => tx.timestamp >= startDate && tx.type === 'deposit' && tx.status === 'success'
      )

      // Daily volumes and transaction counts
      const dailyMap = new Map<string, { volume: number; count: number }>()
      const hourlyMap = new Map<number, { totalVolume: number; count: number }>()

      relevantTxs.forEach(tx => {
        const date = new Date(tx.timestamp).toISOString().split('T')[0]
        const hour = new Date(tx.timestamp).getHours()

        const daily = dailyMap.get(date) || { volume: 0, count: 0 }
        daily.volume += tx.usdValue
        daily.count += 1
        dailyMap.set(date, daily)

        const hourly = hourlyMap.get(hour) || { totalVolume: 0, count: 0 }
        hourly.totalVolume += tx.usdValue
        hourly.count += 1
        hourlyMap.set(hour, hourly)
      })

      const dailyVolumes = Array.from(dailyMap.entries())
        .map(([date, data]) => ({
          date,
          volume: data.volume,
          transactions: data.count
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      // Cumulative raised
      let cumulative = 0
      const cumulativeRaised = dailyVolumes.map(({ date, volume }) => {
        cumulative += volume
        return { date, total: cumulative }
      })

      // Hourly activity patterns
      const daysInRange = Math.min(days, relevantTxs.length > 0 ?
        (now - Math.min(...relevantTxs.map(tx => tx.timestamp))) / 86400000 : 1)

      const hourlyActivity = Array.from({ length: 24 }, (_, hour) => {
        const data = hourlyMap.get(hour) || { totalVolume: 0, count: 0 }
        return {
          hour,
          avgTransactions: data.count / Math.max(daysInRange, 1),
          avgVolume: data.totalVolume / Math.max(daysInRange, 1)
        }
      })

      // Get top contributors
      const topContributors = await this.getTopContributors(20)

      return {
        dailyVolumes,
        cumulativeRaised,
        topContributors,
        hourlyActivity
      }
    } catch (error) {
      console.error("Error getting historical analysis:", error)
      throw error
    }
  }

  /**
   * Get transaction history for a specific contributor
   */
  async getContributorHistory(address: string): Promise<{
    info: ContributorInfo | null
    transactions: PresaleTransaction[]
  }> {
    try {
      const allTransactions = await this.getAllTransactions(2000)

      const contributorTxs = allTransactions.filter(
        tx => tx.from === address && tx.type === 'deposit' && tx.status === 'success'
      )

      if (contributorTxs.length === 0) {
        return { info: null, transactions: [] }
      }

      const info: ContributorInfo = {
        address,
        totalContributed: contributorTxs.reduce((sum, tx) => sum + tx.usdValue, 0),
        transactionCount: contributorTxs.length,
        firstContribution: Math.min(...contributorTxs.map(tx => tx.timestamp)),
        lastContribution: Math.max(...contributorTxs.map(tx => tx.timestamp)),
        averageAmount: 0
      }

      info.averageAmount = info.totalContributed / info.transactionCount

      return {
        info,
        transactions: contributorTxs
      }
    } catch (error) {
      console.error("Error getting contributor history:", error)
      throw error
    }
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.isDisposed = true
    this.stopRealtimeMonitoring()
    this.transactionCache.clear()
    this.contributorCache.clear()
    this.listeners.clear()
    this.metricsCache = null
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStats(): {
    transactionCacheSize: number
    contributorCacheSize: number
    lastMetricsUpdate: number
    cacheHitRate: number
  } {
    return {
      transactionCacheSize: this.transactionCache.size(),
      contributorCacheSize: this.contributorCache.size(),
      lastMetricsUpdate: this.lastMetricsUpdate,
      cacheHitRate: 0 // Would need to track hits/misses for this
    }
  }
}

// Export singleton instance for default coffee presale
export const coffeePresaleMonitor = new PresaleMonitoringService(COFFEE_PRESALE_ADDRESS)

// Export class for custom instances
export { PresaleMonitoringService }