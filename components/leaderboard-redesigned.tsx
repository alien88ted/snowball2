"use client"

import { useState } from "react"
import { AppHeaderPerfect } from "@/components/app-header-perfect"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  DollarSign,
  Zap,
  Target,
  Award,
  Star,
  Flame,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  Activity,
  Users
} from "lucide-react"

type TimeRange = "24h" | "7d" | "30d" | "all"
type LeaderboardCategory = "profit" | "volume" | "referrals" | "streak"

interface LeaderboardEntry {
  rank: number
  previousRank: number
  address: string
  username?: string
  profit: number
  profitPercent: number
  volume: number
  trades: number
  winRate: number
  streak: number
  referrals: number
  badges: string[]
}

// Mock leaderboard data
const generateLeaderboardData = (): LeaderboardEntry[] => {
  const usernames = [
    "whale.eth", "degen_master", "crypto_king", "moon_rider", "diamond_hands",
    "profit_machine", "sol_trader", "defi_guru", "alpha_hunter", "yield_farmer"
  ]
  
  return Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    previousRank: i + 1 + Math.floor(Math.random() * 5) - 2,
    address: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    username: i < 10 ? usernames[i] : undefined,
    profit: Math.max(100000 - (i * 1000) + Math.random() * 5000, 100),
    profitPercent: Math.max(500 - (i * 5) + Math.random() * 50, 5),
    volume: Math.max(1000000 - (i * 10000) + Math.random() * 50000, 1000),
    trades: Math.floor(Math.max(1000 - (i * 10) + Math.random() * 100, 10)),
    winRate: Math.max(85 - (i * 0.5) + Math.random() * 10, 45),
    streak: Math.max(20 - Math.floor(i / 5), 0),
    referrals: Math.max(100 - i, 0),
    badges: i < 3 ? ["verified", "og", "whale"] : i < 10 ? ["verified", "active"] : i < 30 ? ["active"] : []
  }))
}

export default function LeaderboardRedesigned() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const [category, setCategory] = useState<LeaderboardCategory>("profit")
  const [searchTerm, setSearchTerm] = useState("")
  
  const leaderboardData = generateLeaderboardData()
  
  const filteredData = leaderboardData.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getRankChange = (current: number, previous: number) => {
    const diff = previous - current
    if (diff > 0) return <span className="text-green-600 text-xs flex items-center gap-0.5"><ArrowUp className="w-3 h-3" />+{diff}</span>
    if (diff < 0) return <span className="text-red-600 text-xs flex items-center gap-0.5"><ArrowDown className="w-3 h-3" />{diff}</span>
    return <Minus className="w-3 h-3 text-gray-400" />
  }

  return (
    <AppThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 transition-colors duration-500">
        <AppHeaderPerfect />

      {/* Header */}
      <div className="pt-20 pb-10 bg-gradient-to-b from-white via-white to-gray-50/50 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-3">
                Leaderboard
              </h1>
              <p className="text-gray-600 text-lg">
                Top performers and traders
              </p>
            </div>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Top 3 Podium */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <div 
                key={entry.rank}
                className={`relative ${
                  index === 0 ? 'lg:scale-105' : ''
                }`}
              >
                <div className={`p-6 bg-gradient-to-br ${
                  index === 0 ? 'from-yellow-50 to-amber-50 border-yellow-200' :
                  index === 1 ? 'from-gray-50 to-slate-50 border-gray-200' :
                  'from-orange-50 to-red-50 border-orange-200'
                } rounded-xl border shadow-lg hover:shadow-xl transition-all`}>
                  {/* Rank Badge */}
                  <div className={`absolute -top-3 -right-3 w-14 h-14 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-yellow-400 to-amber-600' :
                    index === 1 ? 'from-gray-400 to-slate-600' :
                    'from-orange-400 to-red-600'
                  } flex items-center justify-center shadow-lg`}>
                    {index === 0 ? <Crown className="w-7 h-7 text-white" /> :
                     index === 1 ? <Medal className="w-6 h-6 text-white" /> :
                     <Medal className="w-6 h-6 text-white" />}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      index === 0 ? 'from-yellow-500 to-amber-600' :
                      index === 1 ? 'from-gray-500 to-slate-600' :
                      'from-orange-500 to-red-600'
                    } flex items-center justify-center text-white font-bold text-lg`}>
                      {entry.username ? entry.username[0].toUpperCase() : '?'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {entry.username || entry.address}
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.username && entry.address}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit</span>
                      <span className="font-bold text-green-600">
                        ${entry.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ROI</span>
                      <span className="font-bold text-gray-900">
                        +{entry.profitPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Win Rate</span>
                      <span className="font-bold text-gray-900">
                        {entry.winRate.toFixed(1)}%
                      </span>
                    </div>
                    {entry.streak > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Streak</span>
                        <span className="font-bold text-orange-600 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          {entry.streak}
                        </span>
                      </div>
                    )}
                  </div>

                  {entry.badges.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {entry.badges.map(badge => (
                        <span key={badge} className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          badge === 'verified' ? 'bg-blue-100 text-blue-700' :
                          badge === 'og' ? 'bg-purple-100 text-purple-700' :
                          badge === 'whale' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2">
            {[
              { value: 'profit', label: 'Top Profit', icon: DollarSign },
              { value: 'volume', label: 'Volume', icon: TrendingUp },
              { value: 'referrals', label: 'Referrals', icon: Users },
              { value: 'streak', label: 'Hot Streak', icon: Flame }
            ].map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value as LeaderboardCategory)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    category === cat.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Trader</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Profit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">ROI %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Volume</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Win Rate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Streak</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(3, 30).map(entry => (
                <tr key={entry.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-600">#{entry.rank}</span>
                      {getRankChange(entry.rank, entry.previousRank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {entry.username ? entry.username[0].toUpperCase() : '?'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {entry.username || entry.address}
                          {entry.badges.includes('verified') && <Star className="w-3.5 h-3.5 text-blue-600 fill-current" />}
                        </div>
                        {entry.username && (
                          <div className="text-xs text-gray-500">{entry.address}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono text-sm font-bold text-green-600">
                      ${entry.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-mono text-sm ${
                      entry.profitPercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.profitPercent > 0 ? '+' : ''}{entry.profitPercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                    ${(entry.volume / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-mono text-sm ${
                      entry.winRate >= 70 ? 'text-green-600' :
                      entry.winRate >= 50 ? 'text-gray-900' :
                      'text-red-600'
                    }`}>
                      {entry.winRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {entry.streak > 0 ? (
                      <span className="flex items-center justify-end gap-1 text-orange-600 font-bold text-sm">
                        <Flame className="w-3.5 h-3.5" />
                        {entry.streak}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </AppThemeProvider>
  )
}
