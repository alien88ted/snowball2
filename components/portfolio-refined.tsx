"use client"

import { useState, useEffect, useMemo } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { useTheme } from "@/components/app-theme-provider"
import { usePrivy } from "@privy-io/react-auth"
import {
  TrendingUp, DollarSign, Activity, ArrowUp, ArrowDown,
  Eye, EyeOff, Download, RefreshCw, Settings,
  Clock, Shield, Percent, Target, ChevronRight,
  ArrowUpRight, ArrowDownRight, Sun, Moon, Monitor,
  Menu, X, Snowflake, Sparkles, Wallet
} from "lucide-react"
import { getProjectIcon } from "@/lib/project-icons"
import { getAllProjects, type Project } from "@/lib/projects"

type TimeRange = "24h" | "7d" | "30d" | "all"
type ViewMode = "overview" | "holdings" | "activity"

function CornerFrame({ className = "" }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-300 dark:border-gray-700 ${className}`} />
    </>
  )
}

// Mock portfolio data
const mockPortfolio = {
  totalValue: 45234.67,
  totalInvested: 35000,
  totalReturns: 10234.67,
  change24h: 1342.15,
  changePercent24h: 3.05,
  monthlyIncome: 384.23,
  holdings: [
    {
      id: "coffee",
      projectId: "1",
      name: "$COFFEE",
      symbol: "COFFEE",
      tokens: 12500,
      value: 15625,
      invested: 12500,
      profit: 3125,
      profitPercent: 25,
      apy: 42.5,
      monthlyReturn: 145.50
    },
    {
      id: "market",
      projectId: "2", 
      name: "$MARKET",
      symbol: "MARKET",
      tokens: 8333,
      value: 12499.50,
      invested: 10000,
      profit: 2499.50,
      profitPercent: 24.99,
      apy: 38.2,
      monthlyReturn: 128.40
    },
    {
      id: "fashion",
      projectId: "3",
      name: "$FASHION",
      symbol: "FASHION",
      tokens: 5000,
      value: 8750,
      invested: 7500,
      profit: 1250,
      profitPercent: 16.67,
      apy: 35.8,
      monthlyReturn: 89.25
    }
  ]
}

const recentActivity = [
  { id: 1, type: 'buy', project: '$COFFEE', amount: 2500, tokens: 2500, time: '2 hours ago' },
  { id: 2, type: 'reward', project: '$MARKET', amount: 125.50, time: '1 day ago' },
  { id: 3, type: 'distribution', project: '$FASHION', amount: 89.25, time: '3 days ago' },
  { id: 4, type: 'buy', project: '$FOOD', amount: 1000, tokens: 1000, time: '5 days ago' }
]

function PortfolioContent() {
  const [showValues, setShowValues] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [viewMode, setViewMode] = useState<ViewMode>("overview")
  const { theme, setTheme } = useTheme()
  const { ready, authenticated, user, login } = usePrivy()
  const projects = getAllProjects()

  const formatValue = (value: number | string, hidden = false) => {
    if (!showValues && hidden) return "••••••"
    return typeof value === "number" ? value.toLocaleString() : value
  }

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50 text-gray-900 dark:text-gray-100">
      {/* Enhanced Header with Landing Page Style */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="group">
                <span className="text-xl font-bold font-serif tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent transition-opacity hover:opacity-70 duration-200">
                  $now.fun
                </span>
              </a>

              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: "/explorer", label: "Trade" },
                  { href: "/portfolio", label: "Portfolio", active: true },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                      item.active
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                    {item.active && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full" />
                    )}
                    {!item.active && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    )}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "light" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Sun className={`w-4 h-4 ${theme === "light" ? "text-amber-500" : "text-gray-500"}`} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "system" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Monitor className={`w-4 h-4 ${theme === "system" ? "text-blue-500" : "text-gray-500"}`} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "dark" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Moon className={`w-4 h-4 ${theme === "dark" ? "text-indigo-500" : "text-gray-500"}`} />
                </button>
              </div>

              {ready && authenticated ? (
                <div className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Subtle Background Pattern */}
      <main className="max-w-[1400px] mx-auto px-6 py-8 relative">
        {/* Subtle dot pattern like landing page */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Page Header with Serif Font */}
        <div className="flex items-start justify-between mb-8 relative">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">Portfolio</h1>
            <button
              onClick={() => setShowValues(!showValues)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              {showValues ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
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
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Portfolio Stats with Corner Frames */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
              <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-serif">
              ${formatValue(mockPortfolio.totalValue, true)}
            </div>
            <div className={`text-xs mt-1 flex items-center gap-1 ${mockPortfolio.changePercent24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {mockPortfolio.changePercent24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {mockPortfolio.changePercent24h >= 0 ? '+' : ''}{mockPortfolio.changePercent24h}% today
            </div>
          </div>

          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Profit</div>
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold font-serif text-green-600 dark:text-green-400">
              +${formatValue(mockPortfolio.totalReturns, true)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {((mockPortfolio.totalReturns / mockPortfolio.totalInvested) * 100).toFixed(1)}% ROI
            </div>
          </div>

          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</div>
              <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-serif">
              ${formatValue(mockPortfolio.monthlyIncome, true)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              From {mockPortfolio.holdings.length} projects
            </div>
          </div>

          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Holdings</div>
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-serif">{mockPortfolio.holdings.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Active positions
            </div>
          </div>
        </div>

        {/* View Tabs with Pill Style */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'holdings', label: 'Holdings' },
            { id: 'activity', label: 'Activity' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as ViewMode)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                viewMode === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {viewMode === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold">Holdings</h2>
              {mockPortfolio.holdings.map(holding => {
                const project = projects.find(p => p.symbol === holding.symbol)
                const Icon = getProjectIcon(project?.category || 'coffee')
                
                return (
                  <div key={holding.id} className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-all group">
                    <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{holding.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatValue(holding.tokens)} tokens</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">
                          ${formatValue(holding.value, true)}
                        </div>
                        <div className={`text-sm ${
                          holding.profitPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Invested</span>
                        <p className="font-semibold">${formatValue(holding.invested)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">APY</span>
                        <p className="font-semibold text-green-600 dark:text-green-400">{holding.apy}%</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Monthly</span>
                        <p className="font-semibold">+${formatValue(holding.monthlyReturn)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'buy' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      activity.type === 'reward' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    }`}>
                      {activity.type === 'buy' ? <ArrowDown className="w-4 h-4" /> :
                       activity.type === 'reward' ? <TrendingUp className="w-4 h-4" /> :
                       <DollarSign className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.type === 'buy' ? `Bought ${activity.tokens} ${activity.project}` :
                         activity.type === 'reward' ? `Reward from ${activity.project}` :
                         `Distribution from ${activity.project}`}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {activity.type === 'buy' ? '-' : '+'}${activity.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'holdings' && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">Asset</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Tokens</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Value</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Cost</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">P/L</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">APY</th>
                </tr>
              </thead>
              <tbody>
                {mockPortfolio.holdings.map(holding => {
                  const project = projects.find(p => p.symbol === holding.symbol)
                  const Icon = getProjectIcon(project?.category || 'coffee')
                  return (
                    <tr key={holding.id} className="border-t border-gray-200 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          </div>
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{holding.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm">
                        {formatValue(holding.tokens)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm font-bold">
                        ${formatValue(holding.value, true)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm text-gray-600 dark:text-gray-400">
                        ${formatValue(holding.invested)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className={`font-mono text-sm font-bold ${
                          holding.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {holding.profit >= 0 ? '+' : ''}${formatValue(holding.profit)}
                        </div>
                        <div className={`text-xs ${
                          holding.profitPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent}%
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm text-green-600 dark:text-green-400 font-bold">
                        {holding.apy}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === 'activity' && (
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'buy' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    activity.type === 'reward' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  }`}>
                    {activity.type === 'buy' ? <ArrowDown className="w-5 h-5" /> :
                     activity.type === 'reward' ? <TrendingUp className="w-5 h-5" /> :
                     <DollarSign className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium">
                      {activity.type === 'buy' ? `Bought ${activity.tokens?.toLocaleString() || '0'} ${activity.project}` :
                       activity.type === 'reward' ? `Rewards from ${activity.project}` :
                       `Distribution from ${activity.project}`}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">
                    {activity.type === 'buy' ? '-' : '+'}${activity.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function PortfolioRefined() {
  return (
    <AppThemeProvider>
      <PortfolioContent />
    </AppThemeProvider>
  )
}