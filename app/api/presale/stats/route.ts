import { NextResponse } from "next/server"
import { getPresaleStats, getSolPrice } from "@/lib/solana-tracking"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const dynamic = "force-dynamic"

// Cache for presale data to avoid hitting RPC too often
let cache: { data: any; timestamp: number } | null = null
const CACHE_DURATION = 10000 // 10 seconds

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get("projectId")
    const presaleAddress = searchParams.get("address")
    
    if (!projectId && !presaleAddress) {
      return NextResponse.json({ error: "projectId or address required" }, { status: 400 })
    }

    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      })
    }

    // For demo purposes, use a real address if provided, otherwise use demo data
    if (presaleAddress) {
      const solPrice = await getSolPrice()
      const stats = await getPresaleStats(presaleAddress, solPrice)
      
      const responseData = {
        raised: stats.totalRaisedUSD,
        raisedSOL: stats.totalRaised,
        contributors: stats.contributors,
        transactions: stats.transactions,
        target: 500000, // Default target
        hardCap: 1000000, // Default hard cap
        solPrice,
        recentContributions: stats.contributions.slice(0, 10).map(c => ({
          address: c.from.slice(0, 4) + "..." + c.from.slice(-4),
          amount: c.amount,
          amountUSD: c.amount * solPrice,
          timestamp: c.timestamp,
          tx: c.signature
        })),
        updatedAt: Date.now()
      }

      cache = { data: responseData, timestamp: Date.now() }
      
      return NextResponse.json(responseData, {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      })
    }

    // Demo data based on projectId
    const demoProjects: Record<string, any> = {
      "coffee": {
        raised: 287543,
        raisedSOL: 2875.43,
        contributors: 342,
        transactions: 421,
        target: 300000,
        hardCap: 500000,
        solPrice: 100,
        status: "active",
        startTime: Date.now() - 86400000 * 3, // 3 days ago
        endTime: Date.now() + 86400000 * 4, // 4 days from now
        tokenPrice: 0.15,
        tokenSymbol: "$COFFEE",
        allocation: {
          presale: 30,
          liquidity: 30,
          rewards: 25,
          treasury: 10,
          team: 5
        }
      },
      "market": {
        raised: 156234,
        raisedSOL: 1562.34,
        contributors: 189,
        transactions: 234,
        target: 200000,
        hardCap: 400000,
        solPrice: 100,
        status: "active",
        startTime: Date.now() - 86400000 * 2,
        endTime: Date.now() + 86400000 * 5,
        tokenPrice: 0.12,
        tokenSymbol: "$MARKET",
        allocation: {
          presale: 35,
          liquidity: 25,
          rewards: 20,
          treasury: 15,
          team: 5
        }
      },
      "fashion": {
        raised: 89234,
        raisedSOL: 892.34,
        contributors: 98,
        transactions: 112,
        target: 250000,
        hardCap: 500000,
        solPrice: 100,
        status: "active",
        startTime: Date.now() - 86400000,
        endTime: Date.now() + 86400000 * 6,
        tokenPrice: 0.18,
        tokenSymbol: "$FASHION",
        allocation: {
          presale: 25,
          liquidity: 35,
          rewards: 22,
          treasury: 13,
          team: 5
        }
      },
      "rebirth": {
        raised: 0,
        raisedSOL: 0,
        contributors: 0,
        transactions: 0,
        target: 1000000,
        hardCap: 2000000,
        solPrice: 100,
        status: "upcoming",
        startTime: Date.now() + 86400000 * 2, // Starts in 2 days
        endTime: Date.now() + 86400000 * 9,
        tokenPrice: 0.10,
        tokenSymbol: "$REBIRTH",
        allocation: {
          presale: 15,
          openMarket: 51,
          treasury: 31.5,
          team: 2.5
        },
        taxRate: 13,
        taxAllocation: "100% to franchise funding"
      }
    }

    const projectData = demoProjects[projectId || "coffee"] || demoProjects.coffee

    // Generate realistic recent contributions
    const recentContributions = []
    if (projectData.transactions > 0) {
      for (let i = 0; i < Math.min(10, projectData.transactions); i++) {
        const randomAmount = Math.random() * 10 + 0.5 // 0.5-10.5 SOL
        recentContributions.push({
          address: generateRandomAddress(),
          amount: randomAmount,
          amountUSD: randomAmount * projectData.solPrice,
          timestamp: Date.now() - Math.floor(Math.random() * 3600000), // Within last hour
          tx: generateRandomTxHash()
        })
      }
    }

    const responseData = {
      ...projectData,
      recentContributions,
      updatedAt: Date.now()
    }

    cache = { data: responseData, timestamp: Date.now() }

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
      },
    })
  } catch (e) {
    console.error('[api/presale/stats] error', e)
    return NextResponse.json({ 
      error: "Failed to fetch presale stats",
      raised: 0,
      contributors: 0,
      transactions: 0,
      target: 500000,
      solPrice: 100
    }, { status: 200 })
  }
}

function generateRandomAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let address = ""
  for (let i = 0; i < 8; i++) {
    address += chars[Math.floor(Math.random() * chars.length)]
  }
  return address.slice(0, 4) + "..." + address.slice(-4)
}

function generateRandomTxHash(): string {
  const chars = "0123456789abcdef"
  let hash = ""
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
