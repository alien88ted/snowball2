import { NextRequest, NextResponse } from "next/server"
import { PresaleMonitoringService, COFFEE_PRESALE_ADDRESS } from "@/lib/presale-monitoring"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Cache for monitoring instances
const monitoringInstances = new Map<string, PresaleMonitoringService>()

function getMonitor(address: string): PresaleMonitoringService {
  if (!monitoringInstances.has(address)) {
    monitoringInstances.set(address, new PresaleMonitoringService(address))
  }
  return monitoringInstances.get(address)!
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get("address") || COFFEE_PRESALE_ADDRESS
    const action = searchParams.get("action") || "info"
    const refresh = searchParams.get("refresh") === "true"

    const monitor = getMonitor(address)

    switch (action) {
      case "info":
        // Get current wallet info
        const walletInfo = await monitor.getWalletInfo()
        return NextResponse.json(walletInfo, {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          }
        })

      case "metrics":
        // Get comprehensive metrics
        const metrics = await monitor.getMetrics(refresh)
        return NextResponse.json(metrics, {
          headers: {
            "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
          }
        })

      case "transactions":
        // Get recent transactions
        const limit = parseInt(searchParams.get("limit") || "50")
        const transactions = await monitor.getRecentTransactions(Math.min(limit, 500))
        return NextResponse.json({
          address,
          transactions,
          count: transactions.length,
          timestamp: Date.now()
        }, {
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
          }
        })

      case "historical":
        // Get historical analysis
        const days = parseInt(searchParams.get("days") || "30")
        const history = await monitor.getHistoricalAnalysis(Math.min(days, 90))
        return NextResponse.json({
          address,
          period: `${days} days`,
          ...history,
          timestamp: Date.now()
        }, {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          }
        })

      case "summary":
        // Get a quick summary (lighter than full metrics)
        const [wallet, recentTxs] = await Promise.all([
          monitor.getWalletInfo(),
          monitor.getRecentTransactions(10)
        ])

        const deposits = recentTxs.filter(tx => tx.type === 'deposit')
        const totalRecentDeposits = deposits.reduce((sum, tx) => sum + tx.usdValue, 0)

        return NextResponse.json({
          address,
          currentBalance: {
            sol: wallet.solBalance,
            usdc: wallet.usdcBalance,
            totalUSD: wallet.totalValueUSD
          },
          solPrice: wallet.solPrice,
          recentActivity: {
            transactions: recentTxs.length,
            deposits: deposits.length,
            totalDepositedUSD: totalRecentDeposits
          },
          lastTransaction: recentTxs[0] || null,
          timestamp: Date.now()
        }, {
          headers: {
            "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
          }
        })

      default:
        return NextResponse.json(
          { error: `Invalid action: ${action}. Use: info, metrics, transactions, historical, or summary` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("[api/presale/wallet-monitor] error:", error)
    return NextResponse.json(
      { 
        error: "Failed to fetch wallet data",
        message: error instanceof Error ? error.message : "Unknown error",
        address: COFFEE_PRESALE_ADDRESS,
        timestamp: Date.now()
      },
      { status: 500 }
    )
  }
}

// WebSocket endpoint for real-time monitoring (POST request to start)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { address = COFFEE_PRESALE_ADDRESS, action = "start" } = body

    if (action === "start") {
      // Note: For proper WebSocket support, you'd need a WebSocket server
      // This endpoint returns instructions for client-side WebSocket connection
      return NextResponse.json({
        success: true,
        message: "Use WebSocket client to connect for real-time updates",
        wsEndpoint: process.env.NEXT_PUBLIC_SOLANA_WSS_URL || "wss://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/",
        address,
        instructions: {
          connect: "Create WebSocket connection to the endpoint",
          subscribe: `Send: { "jsonrpc": "2.0", "id": 1, "method": "accountSubscribe", "params": ["${address}", { "encoding": "jsonParsed", "commitment": "confirmed" }] }`,
          listen: "Listen for accountNotification messages for balance updates"
        }
      })
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'start' to get WebSocket connection info" },
      { status: 400 }
    )
  } catch (error) {
    console.error("[api/presale/wallet-monitor] POST error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
