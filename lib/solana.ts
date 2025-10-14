import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

export const DEFAULT_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
export const USDC_MINT_LEGACY = new PublicKey("EPjFWdd5AufqSSqeM2qTN6JPj1Y7FbEee7n3bHb2XcCc")

function getConfiguredUsdcMints(): PublicKey[] {
  const env = process.env.SOLANA_USDC_MINTS || process.env.NEXT_PUBLIC_SOLANA_USDC_MINTS
  const list = [USDC_MINT_LEGACY]
  if (env) {
    for (const raw of env.split(",")) {
      const v = raw.trim()
      if (!v) continue
      try {
        const mint = new PublicKey(v)
        if (!list.find((p) => p.equals(mint))) list.push(mint)
      } catch {}
    }
  }
  return list
}

export type WalletBalances = {
  sol: number // in SOL
  usdc: number // in USDC units
}

export async function fetchWalletBalances(walletAddress: string, rpcUrl: string = DEFAULT_RPC_URL): Promise<WalletBalances> {
  const connection = new Connection(rpcUrl, "confirmed")
  const owner = new PublicKey(walletAddress)

  const lamports = await connection.getBalance(owner)
  const sol = lamports / LAMPORTS_PER_SOL

  // USDC via parsed token accounts across configured mints (legacy + optional token-2022 mint)
  let usdc = 0
  const mints = getConfiguredUsdcMints()
  for (const mint of mints) {
    try {
      const parsed = await connection.getParsedTokenAccountsByOwner(owner, { mint })
      for (const acc of parsed.value) {
        const info: any = acc.account.data.parsed?.info
        const tokenAmount = info?.tokenAmount
        const uiAmount = tokenAmount?.uiAmount
        if (typeof uiAmount === "number") usdc += uiAmount
      }
    } catch {}
  }

  return { sol, usdc }
}

export async function fetchSolUsdPrice(): Promise<number> {
  // Try Jupiter first
  try {
    const j = await fetch("https://price.jup.ag/v6/price?ids=SOL", { cache: "no-store" })
    if (j.ok) {
      const data = await j.json()
      const p = data?.data?.SOL?.price
      if (typeof p === "number") return p
    }
  } catch {}

  // Fallback to CoinGecko
  try {
    const cg = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd", { cache: "no-store" })
    if (cg.ok) {
      const data = await cg.json()
      const p = data?.solana?.usd
      if (typeof p === "number") return p
    }
  } catch {}

  return 0
}
