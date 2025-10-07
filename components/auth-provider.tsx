"use client"

import type React from "react"
import { PrivyProvider } from "@privy-io/react-auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""
  return (
    <PrivyProvider appId={appId}>
      {children}
    </PrivyProvider>
  )
}


