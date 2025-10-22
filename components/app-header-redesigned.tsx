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
  Sparkles,
  Trophy,
  Users,
  Grid3x3,
  Settings,
  LogOut,
  User,
  Bell,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { href: "/explorer", label: "Trade", icon: TrendingUp },
  { href: "/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/referrals", label: "Referrals", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy }
]

export function AppHeaderRedesigned() {
  const pathname = usePathname()
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold font-serif bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                now.fun
              </span>
            </Link>
            
            {/* Main Navigation */}
            <nav className="flex items-center">
              <div className="flex items-center bg-gray-100/80 rounded-full p-1">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  const Icon = item.icon
                  
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                        isActive 
                          ? "bg-white text-gray-900 shadow-sm" 
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Bell className="w-4 h-4" />
            </button>

            {/* Create Button */}
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl font-medium text-sm transition-all">
              <Plus className="w-4 h-4" />
              Create
            </button>
            
            {/* Wallet Connection */}
            {ready && authenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 rounded-xl border border-gray-200 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.wallet?.address ? formatAddress(user.wallet.address) : 
                       user?.email?.address || 'Connected'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Connected Wallet</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {user?.wallet?.address ? formatAddress(user.wallet.address) : user?.email?.address}
                      </p>
                    </div>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button 
                        onClick={() => {
                          logout()
                          setShowProfileMenu(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={login}
                disabled={!ready}
                className="group px-5 py-2.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 text-white text-sm rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                Connect Wallet
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
