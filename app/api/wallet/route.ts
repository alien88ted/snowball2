import { NextResponse } from "next/server"
import { fetchWalletBalances, fetchSolUsdPrice, DEFAULT_RPC_URL } from "@/lib/solana"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get("address")
    if (!address) {
      return NextResponse.json({ error: "address query param required" }, { status: 400 })
    }

    const rpcUrl = process.env.SOLANA_RPC_URL || DEFAULT_RPC_URL

    // Fetch with graceful fallbacks so the route never 500s due to external errors
    const [balancesResult, priceResult] = await Promise.allSettled([
      fetchWalletBalances(address, rpcUrl),
      fetchSolUsdPrice(),
    ])

    const balances = balancesResult.status === 'fulfilled' ? balancesResult.value : { sol: 0, usdc: 0 }
    const solPrice = priceResult.status === 'fulfilled' ? priceResult.value : 0
    const totalUsd = balances.usdc + balances.sol * (solPrice || 0)

    return NextResponse.json(
      {
        address,
        sol: balances.sol,
        usdc: balances.usdc,
        solPrice,
        totalUsd,
        updatedAt: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  } catch (e) {
    console.error('[api/wallet] error', e)
    return NextResponse.json({ error: "failed to fetch wallet info" }, { status: 200 })
  }
}
