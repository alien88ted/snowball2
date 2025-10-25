import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "@/hooks/use-toast"

export interface WalletInfo {
  address: string
  solBalance: number
  usdcBalance: number
  totalValueUSD: number
  solPrice: number
  lastUpdated: number
}

export interface PresaleMetrics {
  wallet: WalletInfo
  totalRaised: {
    sol: number
    usdc: number
    totalUSD: number
  }
  recentTransactions: any[]
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

export interface PresaleSummary {
  address: string
  currentBalance: {
    sol: number
    usdc: number
    totalUSD: number
  }
  solPrice: number
  recentActivity: {
    transactions: number
    deposits: number
    totalDepositedUSD: number
  }
  lastTransaction: any | null
  timestamp: number
}

interface UsePresaleMonitorOptions {
  address?: string
  refreshInterval?: number
  enableRealtime?: boolean
}

export function usePresaleMonitor(options: UsePresaleMonitorOptions = {}) {
  const {
    address = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s", // Coffee presale default
    refreshInterval = 10000, // 10 seconds
    enableRealtime = false
  } = options

  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [metrics, setMetrics] = useState<PresaleMetrics | null>(null)
  const [summary, setSummary] = useState<PresaleSummary | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const wsRef = useRef<WebSocket | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch wallet info
  const fetchWalletInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/presale/wallet-monitor?address=${address}&action=info`)
      if (!response.ok) throw new Error("Failed to fetch wallet info")
      const data = await response.json()
      setWalletInfo(data)
      return data
    } catch (err) {
      console.error("Error fetching wallet info:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch wallet info")
      return null
    }
  }, [address])

  // Fetch full metrics
  const fetchMetrics = useCallback(async (refresh = false) => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/presale/wallet-monitor?address=${address}&action=metrics${refresh ? '&refresh=true' : ''}`
      )
      if (!response.ok) throw new Error("Failed to fetch metrics")
      const data = await response.json()
      setMetrics(data)
      setError(null)
      return data
    } catch (err) {
      console.error("Error fetching metrics:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch metrics")
      return null
    } finally {
      setLoading(false)
    }
  }, [address])

  // Fetch summary (lighter than full metrics)
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`/api/presale/wallet-monitor?address=${address}&action=summary`)
      if (!response.ok) throw new Error("Failed to fetch summary")
      const data = await response.json()
      setSummary(data)
      return data
    } catch (err) {
      console.error("Error fetching summary:", err)
      return null
    }
  }, [address])

  // Fetch transactions
  const fetchTransactions = useCallback(async (limit = 50) => {
    try {
      const response = await fetch(
        `/api/presale/wallet-monitor?address=${address}&action=transactions&limit=${limit}`
      )
      if (!response.ok) throw new Error("Failed to fetch transactions")
      const data = await response.json()
      setTransactions(data.transactions || [])
      return data.transactions
    } catch (err) {
      console.error("Error fetching transactions:", err)
      return []
    }
  }, [address])

  // Fetch historical analysis
  const fetchHistoricalAnalysis = useCallback(async (days = 30) => {
    try {
      const response = await fetch(
        `/api/presale/wallet-monitor?address=${address}&action=historical&days=${days}`
      )
      if (!response.ok) throw new Error("Failed to fetch historical data")
      return await response.json()
    } catch (err) {
      console.error("Error fetching historical analysis:", err)
      return null
    }
  }, [address])

  // Setup WebSocket for real-time updates
  const setupWebSocket = useCallback(() => {
    if (!enableRealtime) return

    try {
      const wsUrl = process.env.NEXT_PUBLIC_SOLANA_WSS_URL || 
        "wss://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/"
      
      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log("WebSocket connected for presale monitoring")
        // Subscribe to account changes
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "accountSubscribe",
            params: [
              address,
              {
                encoding: "jsonParsed",
                commitment: "confirmed"
              }
            ]
          }))
        }
      }

      wsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.method === "accountNotification") {
            // Balance changed, refresh data
            await fetchSummary()
            toast({
              title: "Wallet Update",
              description: "Presale wallet balance has changed"
            })
          }
        } catch (err) {
          console.error("WebSocket message error:", err)
        }
      }

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error)
      }

      wsRef.current.onclose = () => {
        console.log("WebSocket disconnected")
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (enableRealtime) {
            setupWebSocket()
          }
        }, 5000)
      }
    } catch (err) {
      console.error("Failed to setup WebSocket:", err)
    }
  }, [address, enableRealtime, fetchSummary])

  // Cleanup WebSocket
  const cleanupWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  // Initial load and setup
  useEffect(() => {
    // Initial fetch
    fetchSummary()
    fetchWalletInfo()

    // Setup periodic refresh
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchSummary()
      }, refreshInterval)
    }

    // Setup WebSocket for real-time updates
    if (enableRealtime) {
      setupWebSocket()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      cleanupWebSocket()
    }
  }, [address, refreshInterval, enableRealtime, fetchSummary, fetchWalletInfo, setupWebSocket, cleanupWebSocket])

  return {
    // Data
    walletInfo,
    metrics,
    summary,
    transactions,
    loading,
    error,

    // Actions
    fetchWalletInfo,
    fetchMetrics,
    fetchSummary,
    fetchTransactions,
    fetchHistoricalAnalysis,
    refresh: async () => {
      await Promise.all([
        fetchWalletInfo(),
        fetchMetrics(true),
        fetchSummary(),
        fetchTransactions()
      ])
    },

    // Computed values
    currentBalance: summary?.currentBalance || walletInfo ? {
      sol: walletInfo?.solBalance || summary?.currentBalance?.sol || 0,
      usdc: walletInfo?.usdcBalance || summary?.currentBalance?.usdc || 0,
      totalUSD: walletInfo?.totalValueUSD || summary?.currentBalance?.totalUSD || 0
    } : null,
    
    isActive: summary?.recentActivity?.transactions ? 
      summary.recentActivity.transactions > 0 : false,
    
    latestDeposit: transactions.find(tx => tx.type === 'deposit'),
    
    dailyVolume: metrics?.dailyVolume || 0,
    weeklyVolume: metrics?.weeklyVolume || 0,
    totalRaised: metrics?.totalRaised || null,
    contributors: metrics?.uniqueContributors || 0
  }
}
