"use client"

import { useState } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { useTheme } from "@/components/app-theme-provider"
import { usePrivy } from "@privy-io/react-auth"
import {
  Trophy, Medal, Award, TrendingUp, DollarSign,
  Crown, Sun, Moon, Monitor, ChevronUp, ChevronDown
} from "lucide-react"

type TimeRange = "24h" | "7d" | "30d" | "all"
type LeaderboardType = "investors" | "volume" | "referrals" | "returns"

const mockLeaderboardData = {
  investors: [
    { rank: 1, address: "0xA4e5...8B21", value: 125000, change: 15.2, projects: 23 },
    { rank: 2, address: "0x7F3d...1C42", value: 98500, change: 12.8, projects: 19 },
    { rank: 3, address: "0x9E2a...5D67", value: 87200, change: -2.1, projects: 17 },
    { rank: 4, address: "0xB2c4...3F89", value: 76100, change: 8.4, projects: 15 },
    { rank: 5, address: "0xD5e6...2A10", value: 65400, change: 5.7, projects: 12 }
  ],
  volume: [
    { rank: 1, address: "0x3F8a...1B45", value: 450000, trades: 342, avgSize: 1315 },
    { rank: 2, address: "0x8C2d...7E91", value: 380000, trades: 289, avgSize: 1314 },
    { rank: 3, address: "0x1A5f...4C23", value: 295000, trades: 198, avgSize: 1489 }
  ],
  yourPosition: {
    rank: 42,
    percentile: 5,
    value: 12500,
    change: 3.2
  }
}

function LeaderboardContent() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("investors")
  const { theme, setTheme } = useTheme()
  const { ready, authenticated, user, login } = usePrivy()

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 font-bold text-lg">$</span>
                </div>
                <span className="text-xl font-bold">now.fun</span>
              </a>

              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: "/explorer", label: "Trade" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      item.href === "/leaderboard"
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded ${theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded ${theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded ${theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              {ready && authenticated ? (
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <span className="text-sm font-medium">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Top performers on the platform
          </p>
        </div>

        {/* Your Position Card */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Your Position</h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold">#{mockLeaderboardData.yourPosition.rank}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Overall Rank</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Top {mockLeaderboardData.yourPosition.percentile}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Percentile</div>
            </div>
            <div>
              <div className="text-2xl font-bold">${mockLeaderboardData.yourPosition.value.toLocaleString()}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Invested</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                mockLeaderboardData.yourPosition.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {mockLeaderboardData.yourPosition.change >= 0 ? '+' : ''}{mockLeaderboardData.yourPosition.change}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">30d Change</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'investors', label: 'Top Investors' },
              { id: 'volume', label: 'Trading Volume' },
              { id: 'referrals', label: 'Referrals' },
              { id: 'returns', label: 'Returns' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setLeaderboardType(type.id as LeaderboardType)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  leaderboardType === type.id
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none"
          >
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">Address</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
                  {leaderboardType === 'investors' ? 'Invested' :
                   leaderboardType === 'volume' ? 'Volume' :
                   leaderboardType === 'referrals' ? 'Referrals' : 'Returns'}
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Change</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
                  {leaderboardType === 'investors' ? 'Projects' :
                   leaderboardType === 'volume' ? 'Trades' :
                   leaderboardType === 'referrals' ? 'Active' : 'APY'}
                </th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboardData.investors.map((user, index) => (
                <tr key={user.rank} className={`border-t border-gray-200 dark:border-gray-800 ${
                  index < 3 ? 'bg-gray-50/50 dark:bg-gray-900/50' : ''
                }`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.rank)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm">{user.address}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-bold">
                    ${user.value.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className={`text-sm font-bold flex items-center justify-end gap-1 ${
                      user.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {user.change >= 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      {Math.abs(user.change)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    {user.projects}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default function LeaderboardRefined() {
  return (
    <AppThemeProvider>
      <LeaderboardContent />
    </AppThemeProvider>
  )
}