"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Hide header on app-like pages
  const hideHeaderPaths = [
    '/explorer',
    '/portfolio',
    '/referrals',
    '/leaderboard',
    '/apy',
    '/governance'
  ]
  const shouldHideHeader = hideHeaderPaths.some(path => pathname.startsWith(path))
  
  if (shouldHideHeader) {
    return null
  }
  
  return <Header />
}
