"use client"

import React, { FC, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css'

interface SolanaWalletProviderProps {
  children: React.ReactNode
}

export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
  // Use mainnet for production
  const network = WalletAdapterNetwork.Mainnet

  // Use QuickNode RPC if available, fallback to public RPC
  const endpoint = useMemo(() => {
    const quickNodeUrl = process.env.NEXT_PUBLIC_QUICKNODE_RPC_URL || 
                        'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/'
    return quickNodeUrl || clusterApiUrl(network)
  }, [network])

  // Initialize wallets - these will auto-detect if installed
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
