import { NextResponse } from "next/server"
import { PresaleMonitoringService } from "@/lib/presale-monitoring"
import { projects } from "@/lib/projects"

// Coffee presale address constant
const COFFEE_PRESALE_ADDRESS = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s"

export const dynamic = "force-dynamic"

// Cache for presale data to avoid hitting RPC too often
const responseCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 30000 // 30 seconds - increased for better performance

// Monitor instances cache to reuse across requests
const monitorCache = new Map<string, { monitor: PresaleMonitoringService; timestamp: number }>()

function getCacheKey(projectId: string | null, address: string | null) {
  return `${projectId ?? "default"}::${address ?? "none"}`
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const projectIdRaw = searchParams.get("projectId")
    const projectId = projectIdRaw?.trim() || null
    let presaleAddress = searchParams.get("address")?.trim() || null

    // Map project ID to presale address
    if (!presaleAddress && projectId === "coffee") {
      presaleAddress = COFFEE_PRESALE_ADDRESS
    }

    const cacheKey = getCacheKey(projectId, presaleAddress)
    const cachedResponse = responseCache.get(cacheKey)

    // Check cache
    if (
      cachedResponse &&
      Date.now() - cachedResponse.timestamp < CACHE_DURATION
    ) {
      return NextResponse.json(cachedResponse.data, {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      })
    }

    // Use real monitoring service for actual addresses
    if (presaleAddress) {
      try {
        const startTime = Date.now()

        // Try to reuse existing monitor instance for better performance
        let monitor: PresaleMonitoringService
        const monitorEntry = monitorCache.get(presaleAddress)

        if (monitorEntry && Date.now() - monitorEntry.timestamp < 60000) { // Reuse for 1 minute
          console.log(`[API] Reusing existing monitor for ${presaleAddress}`)
          monitor = monitorEntry.monitor
        } else {
          console.log(`[API] Creating new monitor for ${presaleAddress}`)
          monitor = new PresaleMonitoringService(presaleAddress)
          monitorCache.set(presaleAddress, { monitor, timestamp: Date.now() })
        }

        console.log(`[API] Fetching metrics...`)
        const metrics = await monitor.getMetrics()
        console.log(`[API] Metrics fetched in ${Date.now() - startTime}ms`)

        // Use actual wallet balance as the raised amount (current balance)
        const actualRaised = metrics.wallet.totalValueUSD || (
          metrics.wallet.solBalance * (metrics.wallet.solPrice || 195) +
          metrics.wallet.usdcBalance
        )

        const responseData = {
          raised: actualRaised, // Use actual wallet balance
          raisedSOL: metrics.wallet.solBalance, // Current SOL balance
          raisedUSDC: metrics.wallet.usdcBalance, // Current USDC balance
          currentBalance: {
            sol: metrics.wallet.solBalance,
            usdc: metrics.wallet.usdcBalance,
            totalUSD: actualRaised
          },
          contributors: metrics.uniqueContributors,
          transactions: metrics.transactionCount.total,
          deposits: metrics.transactionCount.deposits,
          withdrawals: metrics.transactionCount.withdrawals,
          target: projectId === "coffee" ? 300000 : 500000, // Project-specific targets
          hardCap: projectId === "coffee" ? 500000 : 1000000,
          solPrice: metrics.wallet.solPrice || 195, // Default to $195 if price fetch fails
          averageContribution: metrics.averageContribution,
          largestContribution: metrics.largestContribution,
          dailyVolume: metrics.dailyVolume,
          weeklyVolume: metrics.weeklyVolume,
          recentContributions: metrics.recentTransactions
            .filter(tx => tx.type === 'deposit')
            .slice(0, 10)
            .map(tx => ({
              address: tx.from.slice(0, 4) + "..." + tx.from.slice(-4),
              amount: tx.token === 'SOL' ? tx.amount : 0,
              amountUSDC: tx.token === 'USDC' ? tx.amount : 0,
              amountUSD: tx.usdValue,
              timestamp: tx.timestamp,
              tx: tx.signature,
              token: tx.token
            })),
          updatedAt: Date.now(),
          walletAddress: presaleAddress,
          source: "live"
        }

        responseCache.set(cacheKey, { data: responseData, timestamp: Date.now() })

        return NextResponse.json(responseData, {
          headers: {
            "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
          },
        })
      } catch (e) {
        console.error('[api/presale/stats] Real data error, falling back to demo', e)
        // Fall through to demo data if real fetch fails
      }
    }

    // Demo/fallback data
    const demoData = {
      raised: 287543,
      raisedSOL: 1437.715,
      raisedUSDC: 150000,
      currentBalance: {
        sol: 1437.715,
        usdc: 150000,
        totalUSD: 287543
      },
      contributors: 89,
      transactions: 156,
      deposits: 142,
      withdrawals: 14,
      target: projectId === "coffee" ? 300000 : 500000,
      hardCap: projectId === "coffee" ? 500000 : 1000000,
      solPrice: 195,
      averageContribution: 3230.59,
      largestContribution: 25000,
      dailyVolume: 45230,
      weeklyVolume: 185420,
      recentContributions: [
        {
          address: "8xKj...3nM2",
          amount: 5,
          amountUSDC: 0,
          amountUSD: 975,
          timestamp: Date.now() - 300000,
          tx: "5XYZ...abc1",
          token: "SOL"
        },
        {
          address: "2mB7...xK9p",
          amount: 0,
          amountUSDC: 2500,
          amountUSD: 2500,
          timestamp: Date.now() - 600000,
          tx: "5XYZ...abc2",
          token: "USDC"
        },
        {
          address: "7kL2...5mN9",
          amount: 10,
          amountUSDC: 0,
          amountUSD: 1950,
          timestamp: Date.now() - 900000,
          tx: "5XYZ...abc3",
          token: "SOL"
        }
      ],
      updatedAt: Date.now(),
      walletAddress: presaleAddress || "demo",
      source: "demo"
    }

    // Cache the demo data
    responseCache.set(cacheKey, { data: demoData, timestamp: Date.now() })

    return NextResponse.json(demoData, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
      },
    })
  } catch (e) {
    console.error('[api/presale/stats] error', e)
    return NextResponse.json({ error: "Failed to fetch presale stats" }, { status: 500 })
  }
}