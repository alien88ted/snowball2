"use client"

import { useUnifiedWallet } from '@/hooks/use-unified-wallet'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from './ui/button'
import { Wallet } from 'lucide-react'

// Conditionally import Privy to avoid errors when not configured
let usePrivy: any = () => ({
  ready: true,
  authenticated: false,
  user: null,
  login: async () => {}
})

try {
  const privyModule = require('@privy-io/react-auth')
  if (privyModule.usePrivy) {
    usePrivy = privyModule.usePrivy
  }
} catch (e) {
  // Privy not available, use default
}

interface WalletConnectButtonProps {
  className?: string
  variant?: 'default' | 'brutalist'
}

export function WalletConnectButton({ className = '', variant = 'brutalist' }: WalletConnectButtonProps) {
  const wallet = useUnifiedWallet()
  const { ready: privyReady, authenticated: privyAuthenticated } = usePrivy()
  
  // If no Privy or not authenticated with Privy, show Solana wallet button
  const showSolanaButton = !process.env.NEXT_PUBLIC_PRIVY_APP_ID || 
                          (privyReady && !privyAuthenticated)
  
  if (showSolanaButton) {
    // Custom styled Solana wallet button for brutalist design
    if (variant === 'brutalist') {
      return (
        <div className={`solana-wallet-button-wrapper ${className}`}>
          <style jsx global>{`
            .solana-wallet-button-wrapper .wallet-adapter-button {
              background-color: white !important;
              color: black !important;
              border: 2px solid black !important;
              border-radius: 0 !important;
              font-weight: 900 !important;
              font-size: 12px !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              padding: 8px 16px !important;
              transition: all 0.2s !important;
            }
            
            .solana-wallet-button-wrapper .wallet-adapter-button:hover {
              background-color: black !important;
              color: white !important;
            }
            
            .solana-wallet-button-wrapper .wallet-adapter-button-trigger {
              background-color: white !important;
              color: black !important;
              border: 2px solid black !important;
              border-radius: 0 !important;
            }
            
            .wallet-adapter-modal-wrapper {
              background-color: rgba(0, 0, 0, 0.9) !important;
            }
            
            .wallet-adapter-modal {
              background-color: white !important;
              border: 4px solid black !important;
              border-radius: 0 !important;
            }
            
            .wallet-adapter-modal-title {
              font-weight: 900 !important;
              text-transform: uppercase !important;
              color: black !important;
            }
            
            .wallet-adapter-modal-list li {
              border: 2px solid black !important;
              border-radius: 0 !important;
              margin-bottom: 8px !important;
              transition: all 0.2s !important;
            }
            
            .wallet-adapter-modal-list li:hover {
              background-color: black !important;
            }
            
            .wallet-adapter-modal-list li:hover button {
              color: white !important;
            }
          `}</style>
          <WalletMultiButton />
        </div>
      )
    } else {
      return <WalletMultiButton className={className} />
    }
  }
  
  // Show custom button for connected wallet
  if (wallet.connected && wallet.address) {
    return (
      <Button
        onClick={() => wallet.disconnect()}
        className={
          variant === 'brutalist' 
            ? `px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${className}`
            : className
        }
      >
        <Wallet className="w-4 h-4" />
        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
      </Button>
    )
  }
  
  // Show connect button
  return (
    <Button
      onClick={() => wallet.connect()}
      disabled={wallet.connecting}
      className={
        variant === 'brutalist'
          ? `px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${className}`
          : className
      }
    >
      <Wallet className="w-4 h-4" />
      {wallet.connecting ? 'CONNECTING...' : 'CONNECT WALLET'}
    </Button>
  )
}
