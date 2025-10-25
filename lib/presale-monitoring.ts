import { 
  Connection, 
  PublicKey, 
  LAMPORTS_PER_SOL,
  ParsedTransactionWithMeta,
  ConfirmedSignatureInfo
} from "@solana/web3.js"
import { QUICKNODE_RPC_URL, QUICKNODE_WSS_URL, fetchWalletBalances, fetchSolUsdPrice } from "./solana"

// Coffee presale address as default
export const COFFEE_PRESALE_ADDRESS = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s"

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
}

export interface PresaleMetrics {
  wallet: PresaleWalletInfo
  totalRaised: {
    sol: number
    usdc: number
    totalUSD: number
  }
  recentTransactions: PresaleTransaction[]
  dailyVolume: number
  weeklyVolume: number
  transactionCount: {
    total: number
    deposits: number
    withdrawals: number
  }
  uniqueContributors: number
  averageContribution: number
  largestContribution: number
}

class PresaleMonitoringService {
  private connection: Connection
  private wsConnection: any = null
  private subscriptionId: number | null = null
  private presaleAddress: PublicKey
  private listeners: Map<string, (data: any) => void> = new Map()
  private transactionCache: Map<string, PresaleTransaction> = new Map()
  private metricsCache: PresaleMetrics | null = null
  private lastMetricsUpdate: number = 0
  private readonly CACHE_TTL = 10000 // 10 seconds

  constructor(presaleAddress: string = COFFEE_PRESALE_ADDRESS, rpcUrl?: string, wssUrl?: string) {
    this.connection = new Connection(rpcUrl || QUICKNODE_RPC_URL, {
      commitment: "confirmed",
      confirmTransactionInitialTimeout: 60000,
      wsEndpoint: wssUrl || QUICKNODE_WSS_URL
    })
    this.presaleAddress = new PublicKey(presaleAddress)
  }

  /**
   * Get real-time wallet balance and info
   */
  async getWalletInfo(): Promise<PresaleWalletInfo> {
    try {
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
    } catch (error) {
      console.error("Error fetching wallet info:", error)
      throw error
    }
  }

  /**
   * Fetch recent transactions for the presale wallet
   */
  async getRecentTransactions(limit: number = 50): Promise<PresaleTransaction[]> {
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        this.presaleAddress,
        { limit }
      )

      const transactions: PresaleTransaction[] = []
      const solPrice = await fetchSolUsdPrice()

      // Process transactions in batches for efficiency
      const batchSize = 10
      for (let i = 0; i < signatures.length; i += batchSize) {
        const batch = signatures.slice(i, i + batchSize)
        const txPromises = batch.map(sig => this.parseTransaction(sig, solPrice))
        const batchResults = await Promise.allSettled(txPromises)
        
        for (const result of batchResults) {
          if (result.status === 'fulfilled' && result.value) {
            transactions.push(result.value)
            this.transactionCache.set(result.value.signature, result.value)
          }
        }
      }

      return transactions.sort((a, b) => b.timestamp - a.timestamp)
    } catch (error) {
      console.error("Error fetching transactions:", error)
      return []
    }
  }

  /**
   * Parse a transaction to extract relevant info
   */
  private async parseTransaction(
    sigInfo: ConfirmedSignatureInfo,
    solPrice: number
  ): Promise<PresaleTransaction | null> {
    try {
      // Check cache first
      const cached = this.transactionCache.get(sigInfo.signature)
      if (cached) return cached

      const tx = await this.connection.getParsedTransaction(sigInfo.signature, {
        maxSupportedTransactionVersion: 0
      })

      if (!tx || !tx.meta) return null

      const presaleIndex = tx.transaction.message.accountKeys.findIndex(
        key => key.pubkey.toString() === this.presaleAddress.toString()
      )

      if (presaleIndex === -1) return null

      // Determine transaction type and amount
      const preBalance = tx.meta.preBalances[presaleIndex] || 0
      const postBalance = tx.meta.postBalances[presaleIndex] || 0
      const balanceChange = postBalance - preBalance
      
      const type: 'deposit' | 'withdrawal' | 'unknown' = 
        balanceChange > 0 ? 'deposit' : 
        balanceChange < 0 ? 'withdrawal' : 
        'unknown'

      const amount = Math.abs(balanceChange) / LAMPORTS_PER_SOL

      // Find sender/recipient
      const from = tx.transaction.message.accountKeys[0]?.pubkey.toString() || "Unknown"
      const to = type === 'deposit' ? 
        this.presaleAddress.toString() : 
        tx.transaction.message.accountKeys[1]?.pubkey.toString() || "Unknown"

      // Check if it's USDC transaction (SPL token transfer)
      let token: 'SOL' | 'USDC' | 'OTHER' = 'SOL'
      let tokenAmount = amount

      if (tx.meta.innerInstructions?.length > 0) {
        for (const inner of tx.meta.innerInstructions) {
          for (const ix of inner.instructions) {
            const parsed = (ix as any).parsed
            if (parsed?.type === 'transfer' && parsed?.info?.mint) {
              // Check if it's USDC
              const mintAddress = parsed.info.mint
              if (mintAddress.includes("EPjFWdd5") || mintAddress.includes("Es9vMFrz")) {
                token = 'USDC'
                tokenAmount = parseFloat(parsed.info.tokenAmount?.uiAmount || "0")
              }
            }
          }
        }
      }

      const transaction: PresaleTransaction = {
        signature: sigInfo.signature,
        type,
        amount: tokenAmount,
        token,
        from,
        to,
        timestamp: (tx.blockTime || 0) * 1000,
        status: tx.meta.err ? 'failed' : 'success',
        usdValue: token === 'USDC' ? tokenAmount : tokenAmount * solPrice
      }

      return transaction
    } catch (error) {
      console.error(`Error parsing transaction ${sigInfo.signature}:`, error)
      return null
    }
  }

  /**
   * Get comprehensive presale metrics
   */
  async getMetrics(forceRefresh: boolean = false): Promise<PresaleMetrics> {
    // Check cache
    if (!forceRefresh && this.metricsCache && 
        Date.now() - this.lastMetricsUpdate < this.CACHE_TTL) {
      return this.metricsCache
    }

    try {
      // ONLY fetch wallet info to avoid rate limits - disabled transaction history
      const [walletInfo, solPrice] = await Promise.all([
        this.getWalletInfo(),
        // this.getRecentTransactions(1000), // DISABLED - causes rate limit errors
        fetchSolUsdPrice()
      ])

      // Use empty transactions array to avoid errors
      const transactions: PresaleTransaction[] = []

      // Calculate metrics
      const now = Date.now()
      const oneDayAgo = now - 86400000
      const oneWeekAgo = now - 604800000

      const deposits = transactions.filter(tx => tx.type === 'deposit' && tx.status === 'success')
      const withdrawals = transactions.filter(tx => tx.type === 'withdrawal' && tx.status === 'success')
      
      const dailyTransactions = transactions.filter(tx => tx.timestamp > oneDayAgo)
      const weeklyTransactions = transactions.filter(tx => tx.timestamp > oneWeekAgo)

      const uniqueContributors = new Set(deposits.map(tx => tx.from)).size
      
      const totalRaisedSOL = deposits
        .filter(tx => tx.token === 'SOL')
        .reduce((sum, tx) => sum + tx.amount, 0)
      
      const totalRaisedUSDC = deposits
        .filter(tx => tx.token === 'USDC')
        .reduce((sum, tx) => sum + tx.amount, 0)

      const contributions = deposits.map(tx => tx.usdValue)
      const averageContribution = contributions.length > 0 ? 
        contributions.reduce((a, b) => a + b, 0) / contributions.length : 0
      
      const largestContribution = contributions.length > 0 ? 
        Math.max(...contributions) : 0

      const metrics: PresaleMetrics = {
        wallet: walletInfo,
        totalRaised: {
          sol: totalRaisedSOL,
          usdc: totalRaisedUSDC,
          totalUSD: totalRaisedSOL * solPrice + totalRaisedUSDC
        },
        recentTransactions: transactions.slice(0, 20), // Most recent 20
        dailyVolume: dailyTransactions.reduce((sum, tx) => sum + tx.usdValue, 0),
        weeklyVolume: weeklyTransactions.reduce((sum, tx) => sum + tx.usdValue, 0),
        transactionCount: {
          total: transactions.length,
          deposits: deposits.length,
          withdrawals: withdrawals.length
        },
        uniqueContributors,
        averageContribution,
        largestContribution
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
   * Start real-time monitoring via WebSocket
   */
  async startRealtimeMonitoring(
    onUpdate: (update: { type: string; data: any }) => void
  ): Promise<void> {
    try {
      // Subscribe to account changes
      this.subscriptionId = this.connection.onAccountChange(
        this.presaleAddress,
        (accountInfo) => {
          this.handleAccountUpdate(accountInfo, onUpdate)
        },
        "confirmed"
      )

      // Also subscribe to logs for the account to catch transactions
      this.connection.onLogs(
        this.presaleAddress,
        (logs) => {
          this.handleLogs(logs, onUpdate)
        },
        "confirmed"
      )

      console.log("Started real-time monitoring for", this.presaleAddress.toString())
    } catch (error) {
      console.error("Error starting realtime monitoring:", error)
      throw error
    }
  }

  /**
   * Handle account balance updates
   */
  private async handleAccountUpdate(accountInfo: any, onUpdate: (update: any) => void) {
    try {
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
    } catch (error) {
      console.error("Error handling account update:", error)
    }
  }

  /**
   * Handle transaction logs
   */
  private async handleLogs(logs: any, onUpdate: (update: any) => void) {
    try {
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
        }
      }
    } catch (error) {
      console.error("Error handling logs:", error)
    }
  }

  /**
   * Stop real-time monitoring
   */
  stopRealtimeMonitoring(): void {
    if (this.subscriptionId !== null) {
      this.connection.removeAccountChangeListener(this.subscriptionId)
      this.subscriptionId = null
    }
    console.log("Stopped real-time monitoring")
  }

  /**
   * Get historical analysis for a date range
   */
  async getHistoricalAnalysis(days: number = 30): Promise<{
    dailyVolumes: { date: string; volume: number }[]
    cumulativeRaised: { date: string; total: number }[]
    topContributors: { address: string; total: number; count: number }[]
  }> {
    try {
      const limit = Math.min(days * 100, 5000) // Estimate transactions per day
      const transactions = await this.getRecentTransactions(limit)
      
      const now = Date.now()
      const startDate = now - (days * 86400000)
      
      // Filter to date range and successful deposits only
      const relevantTxs = transactions.filter(
        tx => tx.timestamp >= startDate && tx.type === 'deposit' && tx.status === 'success'
      )

      // Daily volumes
      const dailyMap = new Map<string, number>()
      relevantTxs.forEach(tx => {
        const date = new Date(tx.timestamp).toISOString().split('T')[0]
        dailyMap.set(date, (dailyMap.get(date) || 0) + tx.usdValue)
      })

      const dailyVolumes = Array.from(dailyMap.entries())
        .map(([date, volume]) => ({ date, volume }))
        .sort((a, b) => a.date.localeCompare(b.date))

      // Cumulative raised
      let cumulative = 0
      const cumulativeRaised = dailyVolumes.map(({ date, volume }) => {
        cumulative += volume
        return { date, total: cumulative }
      })

      // Top contributors
      const contributorMap = new Map<string, { total: number; count: number }>()
      relevantTxs.forEach(tx => {
        const existing = contributorMap.get(tx.from) || { total: 0, count: 0 }
        contributorMap.set(tx.from, {
          total: existing.total + tx.usdValue,
          count: existing.count + 1
        })
      })

      const topContributors = Array.from(contributorMap.entries())
        .map(([address, data]) => ({ address, ...data }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 20) // Top 20

      return {
        dailyVolumes,
        cumulativeRaised,
        topContributors
      }
    } catch (error) {
      console.error("Error getting historical analysis:", error)
      throw error
    }
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.stopRealtimeMonitoring()
    this.listeners.clear()
    this.transactionCache.clear()
  }
}

// Export singleton instance for default coffee presale
export const coffeePresaleMonitor = new PresaleMonitoringService(COFFEE_PRESALE_ADDRESS)

// Export class for custom instances
export { PresaleMonitoringService }
