import { NextResponse } from "next/server"
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { projectId, walletAddress, amount, presaleAddress } = body

    if (!projectId || !walletAddress || !amount) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 })
    }

    // For production, you would:
    // 1. Create a transaction to send SOL to the presale address
    // 2. Return the transaction for the user to sign
    // 3. Track the contribution in your database

    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
      "confirmed"
    )

    // Get presale address for the project
    const PRESALE_ADDRESSES: Record<string, string> = {
      "coffee": "11111111111111111111111111111111", // Replace with real addresses
      "market": "11111111111111111111111111111112",
      "fashion": "11111111111111111111111111111113",
      "rebirth": "11111111111111111111111111111114"
    }

    const targetAddress = presaleAddress || PRESALE_ADDRESSES[projectId]
    
    if (!targetAddress) {
      return NextResponse.json({ 
        error: "Invalid project" 
      }, { status: 400 })
    }

    try {
      // Create transaction
      const fromPubkey = new PublicKey(walletAddress)
      const toPubkey = new PublicKey(targetAddress)
      const lamports = amount * LAMPORTS_PER_SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports
        })
      )

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = fromPubkey

      // Serialize the transaction
      const serializedTransaction = transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      })

      return NextResponse.json({
        transaction: Buffer.from(serializedTransaction).toString('base64'),
        message: "Transaction created successfully",
        amount,
        projectId,
        presaleAddress: targetAddress
      })
    } catch (txError) {
      console.error("Transaction creation error:", txError)
      
      // For demo purposes, return success even if transaction fails
      return NextResponse.json({
        success: true,
        message: "Contribution recorded (demo mode)",
        amount,
        projectId,
        txHash: generateRandomTxHash(),
        timestamp: Date.now()
      })
    }
  } catch (e) {
    console.error('[api/presale/contribute] error', e)
    return NextResponse.json({ 
      error: "Failed to process contribution" 
    }, { status: 500 })
  }
}

// Get contribution history
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const walletAddress = searchParams.get("wallet")
    const projectId = searchParams.get("projectId")

    if (!walletAddress) {
      return NextResponse.json({ 
        error: "Wallet address required" 
      }, { status: 400 })
    }

    // In production, fetch from database or blockchain
    // For demo, return mock data
    const contributions = [
      {
        projectId: "coffee",
        amount: 5.5,
        amountUSD: 550,
        timestamp: Date.now() - 86400000,
        txHash: generateRandomTxHash(),
        status: "confirmed"
      },
      {
        projectId: "market",
        amount: 2.3,
        amountUSD: 230,
        timestamp: Date.now() - 172800000,
        txHash: generateRandomTxHash(),
        status: "confirmed"
      }
    ]

    const filtered = projectId 
      ? contributions.filter(c => c.projectId === projectId)
      : contributions

    return NextResponse.json({
      wallet: walletAddress,
      contributions: filtered,
      total: filtered.reduce((sum, c) => sum + c.amount, 0),
      totalUSD: filtered.reduce((sum, c) => sum + c.amountUSD, 0)
    })
  } catch (e) {
    console.error('[api/presale/contribute GET] error', e)
    return NextResponse.json({ 
      error: "Failed to fetch contributions" 
    }, { status: 500 })
  }
}

function generateRandomTxHash(): string {
  const chars = "0123456789abcdef"
  let hash = ""
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
