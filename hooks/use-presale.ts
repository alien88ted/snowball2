import { useState, useEffect, useCallback } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { toast } from "@/hooks/use-toast"

export interface PresaleData {
  raised: number
  raisedSOL: number
  contributors: number
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
    amountUSD: number
    timestamp: number
    tx: string
  }>
  updatedAt: number
}

export interface ContributionResult {
  success: boolean
  txHash?: string
  error?: string
}

export function usePresale(projectId: string, presaleAddress?: string) {
  const { user } = usePrivy()
  const [data, setData] = useState<PresaleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contributing, setContributing] = useState(false)

  // Fetch presale data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ projectId })
      if (presaleAddress) {
        params.append("address", presaleAddress)
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

      setData({ ...result, status })
      setError(null)
    } catch (err) {
      console.error("Error fetching presale data:", err)
      setError(err instanceof Error ? err.message : "Failed to load presale data")
      // Set default data on error
      setData({
        raised: 0,
        raisedSOL: 0,
        contributors: 0,
        transactions: 0,
        target: 500000,
        hardCap: 1000000,
        solPrice: 100,
        status: "active",
        recentContributions: [],
        updatedAt: Date.now()
      })
    } finally {
      setLoading(false)
    }
  }, [projectId, presaleAddress])

  // Contribute to presale
  const contribute = useCallback(async (amount: number): Promise<ContributionResult> => {
    if (!user?.wallet?.address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to contribute",
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
          walletAddress: user.wallet.address,
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
  }, [user, projectId, presaleAddress, fetchData])

  // Get user's contributions
  const getUserContributions = useCallback(async () => {
    if (!user?.wallet?.address) return []

    try {
      const response = await fetch(
        `/api/presale/contribute?wallet=${user.wallet.address}&projectId=${projectId}`
      )
      if (!response.ok) throw new Error("Failed to fetch contributions")
      
      const result = await response.json()
      return result.contributions || []
    } catch (err) {
      console.error("Error fetching user contributions:", err)
      return []
    }
  }, [user, projectId])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
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
    percentageRaised: data ? (data.raised / data.target) * 100 : 0,
    percentageToHardCap: data ? (data.raised / data.hardCap) * 100 : 0,
    isActive: data?.status === "active",
    canContribute: data?.status === "active" && data.raised < data.hardCap
  }
}
