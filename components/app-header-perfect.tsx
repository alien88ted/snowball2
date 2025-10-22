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
  Trophy,
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  Plus,
  Circle,
  Sun,
  Moon,
  Monitor
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useTheme } from "./app-theme-provider"

const navItems = [
  { href: "/explorer", label: "Trade", icon: TrendingUp },
  { href: "/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/referrals", label: "Referrals", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy }
]

export function AppHeaderPerfect() {
  const pathname = usePathname()
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, actualTheme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm" 
        : "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/30 dark:border-gray-800/30"
    )}>
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 pointer-events-none" />
        
        <div className="relative">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                    <span className="text-white dark:text-gray-900 font-bold text-xl">$</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold font-serif bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                    now.fun
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1">Trade Real Business</span>
                </div>
              </Link>
              
              {/* Main Navigation */}
              <nav className="hidden lg:flex items-center">
                <div className="relative flex items-center bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1 shadow-inner">
                  {/* Active indicator background */}
                  <div 
                    className="absolute h-9 bg-white dark:bg-gray-700 rounded-xl shadow-sm transition-all duration-300 ease-out"
                    style={{
                      width: '100px',
                      transform: `translateX(${navItems.findIndex(item => pathname.startsWith(item.href)) * 100}px)`
                    }}
                  />
                  
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon
                    
                    return (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className={cn(
                          "relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 group",
                          isActive 
                            ? "text-gray-900 dark:text-white" 
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        )}
                      >
                        <Icon className={cn(
                          "w-3.5 h-3.5 transition-all",
                          isActive ? "scale-110" : "group-hover:scale-110"
                        )} />
                        {item.label}
                        {isActive && (
                          <Circle className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 fill-current" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Switcher */}
              <div className="flex items-center bg-gray-100/60 dark:bg-gray-800/60 rounded-xl p-1">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "light" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  )}
                >
                  <Sun className={cn("w-4 h-4", theme === "light" ? "text-amber-500" : "text-gray-500 dark:text-gray-400")} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "system" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  )}
                >
                  <Monitor className={cn("w-4 h-4", theme === "system" ? "text-blue-500" : "text-gray-500 dark:text-gray-400")} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    theme === "dark" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  )}
                >
                  <Moon className={cn("w-4 h-4", theme === "dark" ? "text-indigo-500" : "text-gray-500 dark:text-gray-400")} />
                </button>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all group">
                <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Create Button */}
              <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300/80 dark:hover:from-gray-700 dark:hover:to-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow group">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                Create
              </button>
              
              {/* Wallet Connection */}
              {ready && authenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl border border-gray-200/60 dark:border-gray-700/60 transition-all shadow-sm hover:shadow group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur animate-pulse" />
                        <div className="relative w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user?.wallet?.address ? formatAddress(user.wallet.address) : 
                         user?.email?.address || 'Connected'}
                      </span>
                    </div>
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                      showProfileMenu ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <>
                      <div className="fixed inset-0" onClick={() => setShowProfileMenu(false)} />
                      <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden animate-in fade-in slide-in-from-top-2">
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700 dark:to-gray-800/50">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Connected Wallet</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {user?.wallet?.address ? formatAddress(user.wallet.address) : user?.email?.address}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                              Active
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                              Tier 2
                            </span>
                          </div>
                        </div>
                        <div className="p-1">
                          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-xl flex items-center gap-3 transition-colors">
                            <User className="w-4 h-4" />
                            Profile
                          </button>
                          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-xl flex items-center gap-3 transition-colors">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                        </div>
                        <div className="border-t border-gray-200/60 dark:border-gray-700/60 p-1">
                          <button 
                            onClick={() => {
                              logout()
                              setShowProfileMenu(false)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-3 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  onClick={login}
                  disabled={!ready}
                  className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm rounded-xl font-medium transition-all shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Connect Wallet
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
