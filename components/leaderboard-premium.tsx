"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Trophy, Medal, Crown, TrendingUp, Users, DollarSign, Award, ChevronUp, ChevronDown, Star, ArrowRight } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Aurora Background Component - Premium Version (same as portfolio)
function AuroraBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base - More vibrant */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20'
      }`} />
      
      {/* Aurora gradient orbs - More vivid */}
      <div className="absolute inset-0">
        {/* Primary orb */}
        <div
          className={`absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent' 
              : 'bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-transparent'
          } blur-3xl animate-float-slow`}
          style={{ animationDelay: '0s', animationDuration: '20s' }}
        />
        
        {/* Secondary orb */}
        <div
          className={`absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent' 
              : 'bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent'
          } blur-3xl animate-float-medium`}
          style={{ animationDelay: '5s', animationDuration: '25s' }}
        />
        
        {/* Accent orb */}
        <div
          className={`absolute top-3/4 left-1/3 w-[600px] h-[600px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-transparent' 
              : 'bg-gradient-to-br from-pink-400/10 via-rose-400/10 to-transparent'
          } blur-3xl animate-float-fast`}
          style={{ animationDelay: '10s', animationDuration: '15s' }}
        />
      </div>
      
      {/* Mesh gradient overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-30'}`}
        style={{
          backgroundImage: `radial-gradient(at 40% 40%, ${
            isDark ? 'rgb(147, 51, 234)' : 'rgb(192, 132, 252)'
          } 0, transparent 50%),
          radial-gradient(at 80% 80%, ${
            isDark ? 'rgb(34, 211, 238)' : 'rgb(125, 211, 252)'
          } 0, transparent 50%),
          radial-gradient(at 20% 80%, ${
            isDark ? 'rgb(251, 113, 133)' : 'rgb(251, 146, 160)'
          } 0, transparent 50%)`
        }}
      />
    </div>
  )
}

// Floating Dollar Signs - Premium
function FloatingDollars({ isDark }: { isDark: boolean }) {
  const [dollars, setDollars] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; opacity: number }>>([])
  
  useEffect(() => {
    const newDollars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      opacity: isDark ? 0.015 : 0.025
    }))
    setDollars(newDollars)
  }, [isDark])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dollars.map((dollar) => (
        <div
          key={dollar.id}
          className={`absolute font-serif font-bold ${
            isDark 
              ? 'text-purple-400/30' 
              : 'bg-gradient-to-br from-purple-200 to-blue-200 bg-clip-text text-transparent'
          }`}
          style={{
            left: `${dollar.x}%`,
            top: `${dollar.y}%`,
            transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
            fontSize: `${4 + dollar.scale * 2}rem`,
            opacity: dollar.opacity,
            animation: `float-slow ${25 + Math.random() * 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            filter: 'blur(1px)'
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

export default function LeaderboardPremium() {
  const [isDark, setIsDark] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('investors')
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Mock leaderboard data
  const leaderboard = [
    {
      rank: 1,
      previousRank: 2,
      user: "0xCrypto...King",
      avatar: "👑",
      totalInvested: 245680,
      totalProfit: 45680,
      profitPercent: 22.8,
      holdings: 8,
      streak: 45,
      badges: ['whale', 'og', 'diamond']
    },
    {
      rank: 2,
      previousRank: 1,
      user: "0xDegen...Lord",
      avatar: "🚀",
      totalInvested: 189500,
      totalProfit: 32450,
      profitPercent: 20.6,
      holdings: 6,
      streak: 38,
      badges: ['whale', 'og']
    },
    {
      rank: 3,
      previousRank: 3,
      user: "0xMoon...Shot",
      avatar: "🌙",
      totalInvested: 156780,
      totalProfit: 28900,
      profitPercent: 22.6,
      holdings: 7,
      streak: 29,
      badges: ['og', 'diamond']
    },
    {
      rank: 4,
      previousRank: 5,
      user: "0xDiamond...Hands",
      avatar: "💎",
      totalInvested: 134560,
      totalProfit: 24560,
      profitPercent: 22.3,
      holdings: 5,
      streak: 25,
      badges: ['diamond']
    },
    {
      rank: 5,
      previousRank: 4,
      user: "0xYield...Farm",
      avatar: "🌾",
      totalInvested: 98700,
      totalProfit: 18900,
      profitPercent: 23.6,
      holdings: 4,
      streak: 21,
      badges: []
    },
    {
      rank: 6,
      previousRank: 7,
      user: "0xSolana...Maxi",
      avatar: "☀️",
      totalInvested: 87650,
      totalProfit: 15670,
      profitPercent: 21.8,
      holdings: 5,
      streak: 18,
      badges: []
    }
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />
    return <span className="text-purple-400 font-bold">#{rank}</span>
  }

  const getRankChange = (current: number, previous: number) => {
    const change = previous - current
    if (change > 0) return <ChevronUp className="w-4 h-4 text-emerald-400" />
    if (change < 0) return <ChevronDown className="w-4 h-4 text-rose-400" />
    return <span className="w-4 h-4 text-slate-500">-</span>
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-white'} relative transition-colors`}>
      {/* Aurora Background */}
      <AuroraBackground isDark={isDark} />
      
      {/* Floating Dollar Signs */}
      <FloatingDollars isDark={isDark} />

      {/* Header - Clean Landing Page Style */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200/60'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className={`text-xl font-bold font-serif tracking-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'
                } transition-opacity hover:opacity-70 duration-200`}>
                  REBIRTH
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-1">
                {["Trade", "Portfolio", "Referrals", "Leaderboard"].map((item) => {
                  const isActive = item === "Leaderboard"
                  return (
                    <a
                      key={item}
                      href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
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
                  <span className="text-[13px] text-gray-500 font-medium">
                    {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className={`h-8 px-4 text-[13px] font-medium rounded-full ${
                      isDark 
                        ? 'border border-gray-700 hover:bg-gray-800 text-gray-300' 
                        : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } transition-all`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  disabled={!ready}
                  className={`group h-8 px-4 text-[13px] font-medium rounded-full shadow-sm transition-all ${
                    isDark
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Sign In
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Leaderboard Header */}
        <div className={`rounded-3xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-serif font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Leaderboard
              </h1>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Top performers in the $NOW ecosystem
              </p>
            </div>
            <div className="flex gap-2">
              {['24H', '7D', '30D', 'ALL'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : isDark 
                        ? 'bg-slate-800/50 text-slate-400 hover:text-purple-300'
                        : 'bg-purple-50 text-slate-600 hover:text-purple-600'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'investors', label: 'Top Investors', icon: Trophy },
              { id: 'profitable', label: 'Most Profitable', icon: TrendingUp },
              { id: 'active', label: 'Most Active', icon: Users }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-400 border border-purple-500/30'
                    : isDark 
                      ? 'bg-slate-800/30 text-slate-400 hover:text-purple-300 border border-slate-700/30'
                      : 'bg-purple-50/30 text-slate-600 hover:text-purple-600 border border-purple-200/20'
                } backdrop-blur-sm`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {leaderboard.slice(0, 3).map((user, index) => (
              <div key={user.rank} className={`rounded-2xl p-6 ${
                user.rank === 1 
                  ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30'
                  : user.rank === 2
                  ? 'bg-gradient-to-br from-slate-500/10 to-slate-400/10 border border-slate-500/30'
                  : 'bg-gradient-to-br from-orange-500/10 to-orange-400/10 border border-orange-500/30'
              } backdrop-blur-sm ${
                user.rank === 1 ? 'scale-105' : ''
              } transition-all hover:scale-110`}>
                <div className="text-center">
                  <div className="mb-3">{getRankIcon(user.rank)}</div>
                  <div className="text-4xl mb-2">{user.avatar}</div>
                  <div className={`font-mono text-sm mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {user.user}
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ${(user.totalInvested / 1000).toFixed(1)}K
                  </div>
                  <div className={`text-sm font-medium ${
                    user.profitPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    +{user.profitPercent}%
                  </div>
                  <div className="flex justify-center gap-1 mt-3">
                    {user.badges.map((badge) => (
                      <span key={badge} className="text-xs">
                        {badge === 'whale' ? '🐋' : badge === 'og' ? '⭐' : '💎'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className={`rounded-2xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl shadow-xl`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDark ? 'bg-slate-800/20' : 'bg-purple-50/20'} border-b border-purple-500/10`}>
                <tr>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Rank</th>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>User</th>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Total Invested</th>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Profit</th>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Holdings</th>
                  <th className={`text-left px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {leaderboard.map((user) => (
                  <tr key={user.rank} className="hover:bg-purple-500/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8">{getRankIcon(user.rank)}</div>
                        {getRankChange(user.rank, user.previousRank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className={`font-mono text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {user.user}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {user.badges.map((badge) => (
                              <span key={badge} className="text-xs">
                                {badge === 'whale' ? '🐋' : badge === 'og' ? '⭐' : '💎'}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      ${user.totalInvested.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-bold ${
                        user.profitPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        ${user.totalProfit.toLocaleString()}
                      </div>
                      <div className={`text-xs ${
                        user.profitPercent >= 0 ? 'text-emerald-400/70' : 'text-rose-400/70'
                      }`}>
                        +{user.profitPercent}%
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {user.holdings} tokens
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {user.streak}
                        </span>
                        <span className="text-xs">🔥</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Position */}
        <div className={`mt-8 rounded-2xl border ${
          isDark 
            ? 'border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5' 
            : 'border-purple-200/30 bg-gradient-to-br from-purple-50/30 to-blue-50/30'
        } backdrop-blur-xl p-6 shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your Position
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    #42
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <ChevronUp className="w-4 h-4" />
                    <span>+8 positions this week</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  $12.5K
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Invested
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  +18.5%
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Returns
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  12 🔥
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Streak
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
