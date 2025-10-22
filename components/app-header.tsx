"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { 
  ChevronDown, 
  Activity, 
  Wallet, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/explorer", label: "Trade", icon: TrendingUp },
  { href: "/portfolio", label: "Portfolio", icon: Activity },
  { href: "/referrals", label: "Referrals" },
  { href: "/leaderboard", label: "Leaderboard" }
]

export function AppHeader() {
  const pathname = usePathname()
  const { ready, authenticated, user, login, logout } = usePrivy()

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold font-serif text-white group-hover:text-gray-300 transition-colors">
                now.fun
              </span>
            </Link>
            
            {/* Main Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon
                
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                      isActive 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {item.label}
                  </Link>
                )
              })}
              
              {/* More Dropdown */}
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-1">
                More
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </nav>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Network Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-400">Solana</span>
            </div>
            
            {/* Wallet Connection */}
            {ready && authenticated ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium text-gray-300">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 
                     user?.email?.address || 'Connected'}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg font-medium transition-all"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                disabled={!ready}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-1.5 group"
              >
                Connect Wallet
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
