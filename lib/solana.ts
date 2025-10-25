import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

// Helius RPC endpoints (PRIMARY - HIGH PERFORMANCE)
export const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=d2ca47fa-dd6f-4fdc-8abf-8e4fb5444c57"
export const HELIUS_SECURE_RPC_URL = "https://meridith-gjai0w-fast-mainnet.helius-rpc.com"

// QuickNode RPC endpoints (SECONDARY)
export const QUICKNODE_RPC_URL = "https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/"
export const QUICKNODE_WSS_URL = "wss://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/"

// Public Solana RPC endpoints (backup - has rate limits)
export const PUBLIC_RPC_URL = "https://api.mainnet-beta.solana.com"
export const PUBLIC_WSS_URL = "wss://api.mainnet-beta.solana.com"

// Use Helius as default for better performance
export const DEFAULT_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || process.env.SOLANA_RPC_URL || HELIUS_RPC_URL
export const DEFAULT_WSS_URL = process.env.NEXT_PUBLIC_SOLANA_WSS_URL || process.env.SOLANA_WSS_URL || QUICKNODE_WSS_URL

// USDC Mint Addresses
export const USDC_MINT_LEGACY = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") // USDC Token Mint

function getConfiguredUsdcMints(): PublicKey[] {
  // Only use the verified USDC mint address
  // Ignoring environment variables to prevent invalid addresses
  return [USDC_MINT_LEGACY]
}

export type WalletBalances = {
  sol: number // in SOL
  usdc: number // in USDC units
}

export async function fetchWalletBalances(walletAddress: string, rpcUrl: string = DEFAULT_RPC_URL): Promise<WalletBalances> {
  const connection = new Connection(rpcUrl, {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 60000
  })
  
  try {
    const owner = new PublicKey(walletAddress)

    // Fetch SOL balance
    const lamports = await connection.getBalance(owner)
    const sol = lamports / LAMPORTS_PER_SOL

    // Fetch USDC balances across all configured mints
    let usdc = 0
    const mints = getConfiguredUsdcMints()
    
    for (const mint of mints) {
      try {
        const parsed = await connection.getParsedTokenAccountsByOwner(owner, { mint })
        for (const acc of parsed.value) {
          const info: any = acc.account.data.parsed?.info
          const tokenAmount = info?.tokenAmount
          const uiAmount = tokenAmount?.uiAmount
          if (typeof uiAmount === "number") {
            usdc += uiAmount
            console.log(`Found ${uiAmount} USDC in mint ${mint.toString()}`)
          }
        }
      } catch (e) {
        console.warn(`Error fetching token accounts for mint ${mint.toString()}:`, e)
      }
    }

    return { sol, usdc }
  } catch (e) {
    console.error(`Error fetching balances for ${walletAddress}:`, e)
    throw e
  }
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
