"use client"

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'

// Conditionally import Privy to avoid errors when not configured
let usePrivy: any = () => ({
  ready: false,
  authenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {}
})

try {
  const privyModule = require('@privy-io/react-auth')
  if (privyModule.usePrivy) {
    usePrivy = privyModule.usePrivy
  }
} catch (e) {
  // Privy not available, use default
}

interface UnifiedWallet {
  // Common properties
  address: string | null
  publicKey: PublicKey | null
  connected: boolean
  connecting: boolean
  ready: boolean
  
  // Actions
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  
  // Provider info
  provider: 'privy' | 'solana' | null
  walletName: string | null
}

export function useUnifiedWallet(): UnifiedWallet {
  // Try Privy first
  const { 
    ready: privyReady, 
    authenticated: privyAuthenticated, 
    user: privyUser,
    login: privyLogin,
    logout: privyLogout 
  } = usePrivy()
  
  // Then try Solana wallet adapter
  const {
    publicKey: solanaPublicKey,
    connected: solanaConnected,
    connecting: solanaConnecting,
    connect: solanaConnect,
    disconnect: solanaDisconnect,
    wallet: solanaWallet
  } = useSolanaWallet()
  
  return useMemo(() => {
    // If we have a Solana wallet connected, prefer that
    if (solanaConnected && solanaPublicKey) {
      return {
        address: solanaPublicKey.toString(),
        publicKey: solanaPublicKey,
        connected: true,
        connecting: false,
        ready: true,
        connect: async () => {
          if (!solanaConnected) {
            await solanaConnect()
          }
        },
        disconnect: async () => {
          await solanaDisconnect()
        },
        provider: 'solana',
        walletName: solanaWallet?.adapter?.name || null
      }
    }
    
    // Check if Privy has a Solana wallet
    if (privyReady && privyAuthenticated && privyUser?.wallet?.address) {
      // Check if the address looks like a Solana address (base58, 32-44 chars)
      const isSolanaAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(privyUser.wallet.address)
      
      let publicKey: PublicKey | null = null
      if (isSolanaAddress) {
        try {
          publicKey = new PublicKey(privyUser.wallet.address)
        } catch {
          // Invalid Solana address
        }
      }
      
      return {
        address: privyUser.wallet.address,
        publicKey,
        connected: true,
        connecting: false,
        ready: privyReady,
        connect: async () => {
          if (!privyAuthenticated) {
            await privyLogin()
          }
        },
        disconnect: async () => {
          await privyLogout()
        },
        provider: 'privy',
        walletName: 'Privy Wallet'
      }
    }
    
    // Not connected
    return {
      address: null,
      publicKey: null,
      connected: false,
      connecting: solanaConnecting,
      ready: privyReady || true,
      connect: async () => {
        // Try Solana wallet first
        try {
          await solanaConnect()
        } catch {
          // If Solana wallet fails and Privy is available, try Privy
          if (privyReady && !privyAuthenticated) {
            await privyLogin()
          }
        }
      },
      disconnect: async () => {
        if (solanaConnected) {
          await solanaDisconnect()
        }
        if (privyAuthenticated) {
          await privyLogout()
        }
      },
      provider: null,
      walletName: null
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyUser,
    privyLogin,
    privyLogout,
    solanaPublicKey,
    solanaConnected,
    solanaConnecting,
    solanaConnect,
    solanaDisconnect,
    solanaWallet
  ])
}
