import { useState, useEffect, useCallback } from "react"
import { useUnifiedWallet } from "./use-unified-wallet"
import { toast } from "@/hooks/use-toast"

// Conditionally import Privy to avoid errors when not configured
let usePrivy: any = () => ({
  ready: true,
  authenticated: false,
  user: null,
  login: async () => {}
})

try {
  const privyModule = require('@privy-io/react-auth')
  if (privyModule.usePrivy) {
    usePrivy = privyModule.usePrivy
  }
} catch (e) {
  // Privy not available, use default
}

export interface PresaleData {
  raised: number
  raisedSOL: number
  raisedUSDC?: number
  currentBalance?: {
    sol: number
    usdc: number
    totalUSD: number
  }
  contributors: number
  contributorSummary?: {
    totalContributors: number
    totalUSD: number
    thresholdUSD: number
    filteredTotalContributors: number
    filteredTotalUSD: number
    filteredContributors: Array<{
      address: string
      totalUSD: number
      transactionCount: number
      firstContribution: number
      lastContribution: number
    }>
  }
  significantContributors?: {
    thresholdUSD: number
    totalUSD: number
    totalContributors: number
    list: Array<{
      address: string
      totalUSD: number
    }>
  }
  transactions: number
  target: number
  hardCap: number
  solPrice: number
  status: "upcoming" | "active" | "ended" | "filled"
  startTime?: number
  endTime?: number
  tokenPrice?: number
  tokenSymbol?: string
  allocation?: Record<string, number>
  taxRate?: number
  taxAllocation?: string
  recentContributions: Array<{
    address: string
    amount: number
    amountUSDC?: number
    amountUSD: number
    timestamp: number
    tx: string | null
  }>
  updatedAt: number
  source?: "live" | "wallet" | "project" | string
}

export interface ContributionResult {
  success: boolean
  txHash?: string
  error?: string
}

function buildDefaultPresaleData(): PresaleData {
  return {
    raised: 0,
    raisedSOL: 0,
    contributors: 0,
    contributorSummary: {
      totalContributors: 0,
      totalUSD: 0,
      thresholdUSD: 100,
      filteredTotalContributors: 0,
      filteredTotalUSD: 0,
      filteredContributors: []
    },
    significantContributors: {
      thresholdUSD: 100,
      totalUSD: 0,
      totalContributors: 0,
      list: []
    },
    transactions: 0,
    target: 500000,
    hardCap: 1000000,
    solPrice: 100,
    status: "active",
    recentContributions: [],
    updatedAt: Date.now()
  }
}

export function usePresale(projectId: string, presaleAddress?: string) {
  const { user } = usePrivy()
  const wallet = useUnifiedWallet()
  const [data, setData] = useState<PresaleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contributing, setContributing] = useState(false)

  // Fetch presale data
  const fetchData = useCallback(async () => {
    const trimmedProjectId = projectId?.trim()
    const trimmedAddress = presaleAddress?.trim()

    if (!trimmedProjectId && !trimmedAddress) {
      setData(prev => prev ?? buildDefaultPresaleData())
      setError(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (trimmedProjectId) {
        params.append("projectId", trimmedProjectId)
      }
      if (trimmedAddress) {
        params.append("address", trimmedAddress)
      }

      const response = await fetch(`/api/presale/stats?${params}`)
      if (!response.ok) throw new Error("Failed to fetch presale data")
      
      const result = await response.json()
      
      // Calculate status based on time and amount raised
      let status = result.status || "active"
      const now = Date.now()
      
      if (result.startTime && now < result.startTime) {
        status = "upcoming"
      } else if (result.endTime && now > result.endTime) {
        status = "ended"
      } else if (result.raised >= result.hardCap) {
        status = "filled"
      }

      const contributorSummary = result.contributorSummary ?? {
        totalContributors: result.contributors ?? 0,
        totalUSD: result.raised ?? 0,
        thresholdUSD: 100,
        filteredTotalContributors: 0,
        filteredTotalUSD: 0,
        filteredContributors: []
      }

      const significantContributors = result.significantContributors ?? {
        thresholdUSD: contributorSummary.thresholdUSD,
        totalUSD: contributorSummary.filteredTotalUSD,
        totalContributors: contributorSummary.filteredTotalContributors,
        list: contributorSummary.filteredContributors.map(({ address, totalUSD }) => ({ address, totalUSD }))
      }

      setData({ ...result, contributorSummary, significantContributors, status })
      setError(null)
    } catch (err) {
      console.error("Error fetching presale data:", err)
      setError(err instanceof Error ? err.message : "Failed to load presale data")
      setData(prev => prev) // keep previous data; allow UI to surface error state
    } finally {
      setLoading(false)
    }
  }, [projectId, presaleAddress])

  // Contribute to presale
  const contribute = useCallback(async (amount: number): Promise<ContributionResult> => {
    if (!wallet.connected || !wallet.address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your Solana wallet to contribute",
        variant: "destructive"
      })
      return { success: false, error: "Wallet not connected" }
    }

    try {
      setContributing(true)

      const response = await fetch("/api/presale/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          walletAddress: wallet.address,
          amount,
          presaleAddress
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Contribution failed")
      }

      // Handle transaction signing (in production, you'd use wallet adapter)
      if (result.transaction) {
        // This would trigger wallet signature
        toast({
          title: "Transaction Created",
          description: "Please sign the transaction in your wallet"
        })
      }

      toast({
        title: "Contribution Successful!",
        description: `You contributed ${amount} SOL to the presale`
      })

      // Refresh presale data
      await fetchData()

      return {
        success: true,
        txHash: result.txHash || result.message
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Contribution failed"
      toast({
        title: "Contribution Failed",
        description: errorMessage,
        variant: "destructive"
      })
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setContributing(false)
    }
  }, [wallet, projectId, presaleAddress, fetchData])

  // Get user's contributions
  const getUserContributions = useCallback(async () => {
    if (!wallet.connected || !wallet.address) return []

    try {
      const response = await fetch(
        `/api/presale/contribute?wallet=${wallet.address}&projectId=${projectId}`
      )
      if (!response.ok) throw new Error("Failed to fetch contributions")
      
      const result = await response.json()
      return result.contributions || []
    } catch (err) {
      console.error("Error fetching user contributions:", err)
      return []
    }
  }, [wallet, projectId])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const shouldFetch = Boolean(projectId?.trim() || presaleAddress?.trim())

    if (!shouldFetch) {
      setLoading(false)
      setData(prev => prev ?? buildDefaultPresaleData())
      return
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    contributing,
    contribute,
    getUserContributions,
    refresh: fetchData,
    percentageRaised: data ? ((data.currentBalance?.totalUSD || data.raised) / data.target) * 100 : 0,
    percentageToHardCap: data ? ((data.currentBalance?.totalUSD || data.raised) / data.hardCap) * 100 : 0,
    isActive: data?.status === "active",
    canContribute: data?.status === "active" && (data.currentBalance?.totalUSD || data.raised) < data.hardCap
  }
}
