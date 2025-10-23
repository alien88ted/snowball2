"use client"

import { useState, useEffect } from "react"
import { 
  Moon, Sun, Trophy, Medal, Crown, TrendingUp, 
  Users, DollarSign, ChevronUp, ChevronDown, 
  Star, Target, Activity, Flame, Coffee, Building2,
  ArrowUpRight, ArrowDownRight, Clock, MapPin
} from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Floating Dollar Background (from Trade page)
function FloatingDollars({ isDark }: { isDark: boolean }) {
  const [dollars, setDollars] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; opacity: number }>>([])
  
  useEffect(() => {
    const newDollars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100, 
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      opacity: isDark ? 0.03 : 0.05
    }))
    setDollars(newDollars)
  }, [isDark])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dollars.map((dollar) => (
        <div
          key={dollar.id}
          className="absolute font-serif font-bold text-gray-400"
          style={{
            left: `${dollar.x}%`,
            top: `${dollar.y}%`,
            transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
            fontSize: '4rem',
            opacity: dollar.opacity,
            animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

export default function LeaderboardUltimate() {
  const [isDark, setIsDark] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('investors')
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Top 3 investors
  const topThree = [
    {
      rank: 1,
      wallet: "0xCryp...King",
      totalInvested: 245680,
      projectsInvested: 12,
      avgReturn: 22.8,
      profitShare: 8234.56,
      bestInvestment: "Bean & Brew Miami",
      joinedDays: 120
    },
    {
      rank: 2,
      wallet: "0xDegen...Lord",
      totalInvested: 189500,
      projectsInvested: 8,
      avgReturn: 20.6,
      profitShare: 6453.21,
      bestInvestment: "Style House NYC",
      joinedDays: 98
    },
    {
      rank: 3,
      wallet: "0xMoon...Shot",
      totalInvested: 156780,
      projectsInvested: 10,
      avgReturn: 18.4,
      profitShare: 5234.87,
      bestInvestment: "Urban Market LA",
      joinedDays: 87
    }
  ]

  // Full leaderboard - realistic data for tokenized stores
  const leaderboard = [
    ...topThree,
    {
      rank: 4,
      wallet: "0xDiam...Hands",
      totalInvested: 134560,
      projectsInvested: 6,
      avgReturn: 15.3,
      profitShare: 4123.45,
      bestInvestment: "Fresh Bites Chicago",
      joinedDays: 76,
      change: 'up'
    },
    {
      rank: 5,
      wallet: "0xYield...Farm",
      totalInvested: 98700,
      projectsInvested: 5,
      avgReturn: 16.8,
      profitShare: 3234.56,
      bestInvestment: "Bean & Brew Miami",
      joinedDays: 65,
      change: 'down'
    },
    {
      rank: 6,
      wallet: "0xSol...Maxi",
      totalInvested: 87650,
      projectsInvested: 7,
      avgReturn: 14.2,
      profitShare: 2876.54,
      bestInvestment: "Urban Market LA",
      joinedDays: 54,
      change: 'up'
    },
    {
      rank: 7,
      wallet: "0xWeb3...Build",
      totalInvested: 76540,
      projectsInvested: 4,
      avgReturn: 17.9,
      profitShare: 2543.21,
      bestInvestment: "Style House NYC",
      joinedDays: 43,
      change: 'same'
    },
    {
      rank: 8,
      wallet: "0xToken...Trade",
      totalInvested: 65430,
      projectsInvested: 3,
      avgReturn: 12.5,
      profitShare: 1987.65,
      bestInvestment: "Fresh Bites Chicago",
      joinedDays: 32,
      change: 'up'
    },
    {
      rank: 9,
      wallet: "0xCoffee...Love",
      totalInvested: 54320,
      projectsInvested: 5,
      avgReturn: 19.2,
      profitShare: 1765.43,
      bestInvestment: "Bean & Brew Miami",
      joinedDays: 28,
      change: 'up'
    },
    {
      rank: 10,
      wallet: "0xProfit...Max",
      totalInvested: 43210,
      projectsInvested: 2,
      avgReturn: 11.8,
      profitShare: 1234.56,
      bestInvestment: "Urban Market LA",
      joinedDays: 21,
      change: 'down'
    }
  ]

  // Categories for leaderboard
  const categories = [
    { id: 'investors', label: 'Top Investors', description: 'By total invested' },
    { id: 'profitable', label: 'Most Profitable', description: 'By profit share earned' },
    { id: 'active', label: 'Most Active', description: 'By projects invested' }
  ]

  // Platform stats
  const platformStats = [
    { label: 'Total Raised', value: '$2.4M', icon: DollarSign },
    { label: 'Active Investors', value: '847', icon: Users },
    { label: 'Avg. Profit Share', value: '33%', icon: TrendingUp },
    { label: 'Live Projects', value: '12', icon: Target }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} relative transition-colors`}>
      {/* Background */}
      <FloatingDollars isDark={isDark} />

      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className={`text-xl font-bold font-serif tracking-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                } group-hover:opacity-80 transition-opacity`}>
                  Snowball
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-1">
                {["Trade", "Portfolio", "Referrals", "Leaderboard"].map((item) => {
                  const isActive = item === "Leaderboard"
                  return (
                    <a
                      key={item}
                      href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? isDark ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                          : isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </a>
                  )
                })}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              >
                {isDark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </button>
              {ready && authenticated ? (
                <>
                  <span className="text-sm text-gray-500">
                    {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className={`px-3 py-1.5 text-sm rounded-full border ${
                      isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
                    } transition-all`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  disabled={!ready}
                  className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-all"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-8 mb-6`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Leaderboard
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Top investors in the $NOW ecosystem
              </p>
            </div>
            <div className="flex items-center gap-2">
              {['7D', '30D', 'ALL'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    selectedTimeframe === tf
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
                      : isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((stat) => (
              <div key={stat.label} className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
                <stat.icon className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-2`} />
                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {topThree.map((user) => (
            <div key={user.rank} className={`rounded-2xl ${
              isDark ? 'bg-gray-900/50' : 'bg-white'
            } backdrop-blur-sm border ${
              user.rank === 1 
                ? 'border-yellow-500/50' 
                : user.rank === 2 
                  ? 'border-gray-400/50' 
                  : 'border-orange-500/50'
            } p-6 ${user.rank === 1 ? 'scale-105' : ''} transition-all hover:scale-110 cursor-pointer`}>
              {/* Rank Icon */}
              <div className="flex justify-center mb-4">
                {user.rank === 1 && <Crown className="w-8 h-8 text-yellow-500" />}
                {user.rank === 2 && <Medal className="w-8 h-8 text-gray-400" />}
                {user.rank === 3 && <Medal className="w-8 h-8 text-orange-500" />}
              </div>
              
              {/* Wallet */}
              <div className={`text-center font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                {user.wallet}
              </div>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Invested</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${(user.totalInvested / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Profit Share</span>
                  <span className="text-sm font-bold text-emerald-500">
                    ${(user.profitShare / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Projects</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user.projectsInvested}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}>
          {/* Category Tabs */}
          <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'} flex items-center gap-4`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Rank</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Investor</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Total Invested</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Profit Share</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Projects</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Best Investment</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Member Since</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-100'}`}>
                {leaderboard.map((user) => (
                  <tr key={user.rank} className={`hover:${isDark ? 'bg-gray-800/30' : 'bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          user.rank <= 3 
                            ? user.rank === 1 ? 'text-yellow-500' : user.rank === 2 ? 'text-gray-400' : 'text-orange-500'
                            : isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          #{user.rank}
                        </span>
                        {'change' in user && (
                          user.change === 'up' ? <ChevronUp className="w-3 h-3 text-emerald-500" /> :
                          user.change === 'down' ? <ChevronDown className="w-3 h-3 text-red-500" /> :
                          <span className="w-3 h-3" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.wallet}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${(user.totalInvested / 1000).toFixed(1)}k
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-emerald-500">
                        ${user.profitShare.toLocaleString()}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {user.avgReturn}% avg
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.projectsInvested}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.bestInvestment}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {user.joinedDays} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Position */}
        {authenticated && (
          <div className={`mt-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50' : 'bg-gradient-to-r from-gray-50 to-gray-100/50'} border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  YOUR POSITION
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  #42
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Invested</div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$12.5k</div>
                </div>
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Profit Share</div>
                  <div className="text-lg font-bold text-emerald-500">$456</div>
                </div>
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Projects</div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
