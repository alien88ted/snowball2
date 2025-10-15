import { Connection, PublicKey, ParsedTransactionWithMeta, LAMPORTS_PER_SOL } from "@solana/web3.js"

export interface PresaleContribution {
  signature: string
  from: string
  amount: number // in SOL
  timestamp: number
  blockTime: number
}

export interface PresaleStats {
  totalRaised: number // in SOL
  totalRaisedUSD: number // assuming SOL price
  contributors: number
  transactions: number
  contributions: PresaleContribution[]
}

// Solana RPC endpoint (you can use public endpoints or get your own from Helius/QuickNode)
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"

/**
 * Fetch all transactions for a presale address
 */
export async function fetchPresaleTransactions(
  presaleAddress: string,
  limit: number = 1000
): Promise<PresaleContribution[]> {
  try {
    const connection = new Connection(RPC_ENDPOINT, "confirmed")
    const publicKey = new PublicKey(presaleAddress)

    // Get transaction signatures
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit })

    const contributions: PresaleContribution[] = []

    // Fetch transaction details in batches
    for (const sig of signatures) {
      try {
        const tx = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        })

        if (tx && tx.meta && tx.blockTime) {
          // Parse transaction to find SOL transfers to presale address
          const amount = parseTransactionAmount(tx, presaleAddress)

          if (amount > 0) {
            contributions.push({
              signature: sig.signature,
              from: extractSender(tx),
              amount: amount / LAMPORTS_PER_SOL,
              timestamp: tx.blockTime * 1000,
              blockTime: tx.blockTime
            })
          }
        }
      } catch (err) {
        console.error(`Error fetching transaction ${sig.signature}:`, err)
      }
    }

    return contributions.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error("Error fetching presale transactions:", error)
    return []
  }
}

/**
 * Get presale statistics
 */
export async function getPresaleStats(
  presaleAddress: string,
  solPriceUSD: number = 100
): Promise<PresaleStats> {
  const contributions = await fetchPresaleTransactions(presaleAddress)

  const totalRaised = contributions.reduce((sum, c) => sum + c.amount, 0)
  const uniqueContributors = new Set(contributions.map(c => c.from)).size

  return {
    totalRaised,
    totalRaisedUSD: totalRaised * solPriceUSD,
    contributors: uniqueContributors,
    transactions: contributions.length,
    contributions
  }
}

/**
 * Parse transaction to extract amount sent to presale address
 */
function parseTransactionAmount(tx: ParsedTransactionWithMeta, presaleAddress: string): number {
  if (!tx.meta) return 0

  const preBalances = tx.meta.preBalances
  const postBalances = tx.meta.postBalances
  const accountKeys = tx.transaction.message.accountKeys

  // Find presale address index
  const presaleIndex = accountKeys.findIndex(
    key => key.pubkey.toString() === presaleAddress
  )

  if (presaleIndex === -1) return 0

  // Calculate balance change
  const balanceChange = postBalances[presaleIndex] - preBalances[presaleIndex]

  return balanceChange > 0 ? balanceChange : 0
}

/**
 * Extract sender address from transaction
 */
function extractSender(tx: ParsedTransactionWithMeta): string {
  // First account key is usually the fee payer (sender)
  return tx.transaction.message.accountKeys[0]?.pubkey.toString() || "Unknown"
}

/**
 * Get SOL price in USD (you can integrate with a price API)
 */
export async function getSolPrice(): Promise<number> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
    const data = await response.json()
    return data.solana?.usd || 100
  } catch (error) {
    console.error("Error fetching SOL price:", error)
    return 100 // Fallback price
  }
}

/**
 * Real-time tracking - poll for new transactions
 */
export function watchPresaleAddress(
  presaleAddress: string,
  onNewContribution: (contribution: PresaleContribution) => void,
  intervalMs: number = 10000
): () => void {
  let lastSignature: string | null = null

  const checkForNew = async () => {
    try {
      const connection = new Connection(RPC_ENDPOINT, "confirmed")
      const publicKey = new PublicKey(presaleAddress)

      const signatures = await connection.getSignaturesForAddress(publicKey, {
        limit: 10,
        until: lastSignature || undefined
      })

      if (signatures.length === 0) return

      // Update last signature
      if (!lastSignature) {
        lastSignature = signatures[0].signature
        return
      }

      // Process new transactions
      for (const sig of signatures.reverse()) {
        const tx = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        })

        if (tx && tx.meta && tx.blockTime) {
          const amount = parseTransactionAmount(tx, presaleAddress)

          if (amount > 0) {
            onNewContribution({
              signature: sig.signature,
              from: extractSender(tx),
              amount: amount / LAMPORTS_PER_SOL,
              timestamp: tx.blockTime * 1000,
              blockTime: tx.blockTime
            })
          }
        }
      }

      lastSignature = signatures[0].signature
    } catch (error) {
      console.error("Error watching presale address:", error)
    }
  }

  const interval = setInterval(checkForNew, intervalMs)
  checkForNew() // Initial check

  return () => clearInterval(interval)
}
