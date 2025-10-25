"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { SolanaWalletProvider } from './solana-wallet-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  // Check if we have a Privy app ID - if not, use Solana wallets only
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  
  // If no Privy app ID, just use Solana wallet provider
  if (!privyAppId) {
    return (
      <SolanaWalletProvider>
        {children}
      </SolanaWalletProvider>
    )
  }
  
  // Otherwise, use both Privy (for auth) and Solana (for wallet)
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#DC143C', // Use the red accent from the design
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <SolanaWalletProvider>
        {children}
      </SolanaWalletProvider>
    </PrivyProvider>
  )
}
