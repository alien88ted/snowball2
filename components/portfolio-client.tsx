"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { Card } from "@/components/ui/card"
import {
  TrendingUp, DollarSign, PieChart, Activity, Calendar, ArrowUp, ArrowDown,
  ChevronDown, Eye, EyeOff, Copy, ExternalLink, Download, RefreshCw,
  Wallet, BarChart3, Clock, Trophy, Zap, Info, Settings, History,
  ArrowUpRight, Shield, Percent, Gift, Users, Target, ChevronRight
} from "lucide-react"
import { generateProjectIcon } from "@/lib/projects"

type TimeRange = "24h" | "7d" | "30d" | "all"
type ViewMode = "overview" | "holdings" | "history" | "rewards"

// Mock portfolio data
const mockPortfolio = {
  totalValue: 12543.67,
  totalInvested: 10000,
  totalReturns: 2543.67,
  change24h: 342.15,
  changePercent24h: 2.8,
  monthlyIncome: 84.23,
  holdings: [
    {
      id: "coffee",
      name: "$COFFEE",
      symbol: "COFFEE",
      tokens: 6666,
      avgPrice: 0.15,
      currentPrice: 0.19,
      value: 1266.54,
      cost: 1000,
      profit: 266.54,
      profitPercent: 26.65,
      allocation: 10.1,
      monthlyReturn: 13.20
    },
    {
      id: "market",
      name: "$MARKET",
      symbol: "MARKET",
      tokens: 13333,
      avgPrice: 0.15,
      currentPrice: 0.17,
      value: 2266.61,
      cost: 2000,
      profit: 266.61,
      profitPercent: 13.33,
      allocation: 18.1,
      monthlyReturn: 26.40
    }
  ],
  recentActivity: [
    { type: "buy", project: "$COFFEE", amount: 500, tokens: 3333, time: "2 hours ago", txHash: "5xY9..." },
    { type: "reward", project: "$COFFEE", tokens: 50, value: 9.50, time: "1 day ago", txHash: "3aB7..." },
    { type: "distribution", project: "$MARKET", amount: 26.40, time: "3 days ago", txHash: "8cD2..." },
    { type: "buy", project: "$MARKET", amount: 1000, tokens: 6666, time: "1 week ago", txHash: "2fE9..." }
  ],
  distributions: {
    total: 543.67,
    thisMonth: 84.23,
    lastMonth: 79.45,
    average: 90.61
  },
  rewards: {
    total: 1250,
    pending: 125,
    claimed: 1125,
    nextClaim: "2024-02-01"
  }
}

export default function PortfolioClient() {
  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [viewMode, setViewMode] = useState<ViewMode>("overview")
  const [showValues, setShowValues] = useState(true)
  const [selectedHolding, setSelectedHolding] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = useMemo(() => {
    const totalProfitPercent = ((mockPortfolio.totalValue - mockPortfolio.totalInvested) / mockPortfolio.totalInvested) * 100
    const annualizedReturn = mockPortfolio.monthlyIncome * 12
    const apy = (annualizedReturn / mockPortfolio.totalInvested) * 100
    
    return {
      totalProfitPercent,
      annualizedReturn,
      apy,
      avgHoldingPeriod: "3.5 months"
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      {/* Portfolio Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
                <button
                  onClick={() => setShowValues(!showValues)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showValues ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-sm text-gray-600">Track your investments and returns across all projects</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="24h">24H</option>
                <option value="7d">7D</option>
                <option value="30d">30D</option>
                <option value="all">All</option>
              </select>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            {[
              { value: "overview", label: "Overview", icon: PieChart },
              { value: "holdings", label: "Holdings", icon: Wallet },
              { value: "history", label: "History", icon: History },
              { value: "rewards", label: "Rewards", icon: Gift }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.value}
                  onClick={() => setViewMode(tab.value as ViewMode)}
                  className={`py-3 px-1 -mb-px text-sm font-medium transition-all relative flex items-center gap-2 ${
                    viewMode === tab.value
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {viewMode === "overview" ? (
          <div className="space-y-6">
            {/* Portfolio Value Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Total Value</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold font-mono">
                  {showValues ? `$${mockPortfolio.totalValue.toLocaleString()}` : "****"}
                </div>
                <div className={`text-xs mt-1 flex items-center gap-1 ${mockPortfolio.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mockPortfolio.changePercent24h >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(mockPortfolio.changePercent24h)}% (24h)
                </div>
              </Card>

              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Total Profit</span>
                  <DollarSign className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-green-600">
                  {showValues ? `+$${mockPortfolio.totalReturns.toLocaleString()}` : "****"}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  +{stats.totalProfitPercent.toFixed(2)}% all-time
                </div>
              </Card>

              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Monthly Income</span>
                  <Calendar className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold font-mono">
                  {showValues ? `$${mockPortfolio.monthlyIncome.toFixed(2)}` : "****"}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {stats.apy.toFixed(2)}% APY
                </div>
              </Card>

              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Active Positions</span>
                  <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono">
                  {mockPortfolio.holdings.length}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {stats.avgHoldingPeriod} avg
                </div>
              </Card>
            </div>

            {/* Portfolio Allocation */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4">Portfolio Allocation</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="space-y-3">
                    {mockPortfolio.holdings.map(holding => (
                      <div key={holding.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden">
                            {mounted && (
                              <img src={generateProjectIcon(holding.symbol)} alt={holding.name} className="w-full h-full object-contain p-1" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{holding.name}</div>
                            <div className="text-xs text-gray-500">{holding.tokens.toLocaleString()} tokens</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium">
                            {showValues ? `$${holding.value.toFixed(2)}` : "****"}
                          </div>
                          <div className="text-xs text-gray-500">{holding.allocation}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  {/* Simple allocation chart */}
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                    {mockPortfolio.holdings.map((holding, i) => (
                      <div
                        key={holding.id}
                        className={`h-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-amber-500'}`}
                        style={{ width: `${holding.allocation}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Best Performer</div>
                      <div className="font-medium text-gray-900">$COFFEE</div>
                      <div className="text-sm text-green-600">+26.65%</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Distributions</div>
                      <div className="font-medium text-gray-900">This Month</div>
                      <div className="text-sm font-mono">${mockPortfolio.distributions.thisMonth}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recent Activity</h3>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {mockPortfolio.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'buy' ? 'bg-green-100 text-green-600' :
                        activity.type === 'reward' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'buy' ? <ArrowDown className="w-4 h-4" /> :
                         activity.type === 'reward' ? <Gift className="w-4 h-4" /> :
                         <DollarSign className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {activity.type === 'buy' ? 'Bought' :
                           activity.type === 'reward' ? 'Earned Rewards' :
                           'Distribution Received'}
                        </div>
                        <div className="text-xs text-gray-500">{activity.project} · {activity.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">
                        {activity.type === 'buy' ? `-$${activity.amount}` :
                         activity.type === 'reward' ? `+${activity.tokens} tokens` :
                         `+$${activity.amount}`}
                      </div>
                      <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                        {activity.txHash}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : viewMode === "holdings" ? (
          <div className="space-y-4">
            {/* Holdings Table */}
            <Card className="overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 uppercase">Asset</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Balance</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Avg Price</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Current Price</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Value</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Profit/Loss</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Monthly Return</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockPortfolio.holdings.map(holding => (
                      <tr key={holding.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden">
                              {mounted && (
                                <img src={generateProjectIcon(holding.symbol)} alt={holding.name} className="w-full h-full object-contain p-1" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{holding.name}</div>
                              <div className="text-xs text-gray-500">{holding.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm">
                          {holding.tokens.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm">
                          ${holding.avgPrice}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm">
                          ${holding.currentPrice}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm font-medium">
                          {showValues ? `$${holding.value.toFixed(2)}` : "****"}
                        </td>
                        <td className={`py-3 px-4 text-right font-mono text-sm font-medium ${holding.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {showValues ? `${holding.profit >= 0 ? '+' : ''}$${holding.profit.toFixed(2)}` : "****"}
                          <div className="text-xs">{holding.profitPercent.toFixed(2)}%</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm">
                          ${holding.monthlyReturn.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <Link href={`/explorer/${holding.id}`}>
                              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                              </button>
                            </Link>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        ) : viewMode === "history" ? (
          <div>
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4">Transaction History</h3>
              <div className="space-y-3">
                {mockPortfolio.recentActivity.concat(mockPortfolio.recentActivity).map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'buy' ? 'bg-green-100 text-green-600' :
                        activity.type === 'reward' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'buy' ? <ArrowDown className="w-5 h-5" /> :
                         activity.type === 'reward' ? <Gift className="w-5 h-5" /> :
                         <DollarSign className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {activity.type === 'buy' ? `Bought ${activity.tokens?.toLocaleString() || '0'} ${activity.project}` :
                           activity.type === 'reward' ? `Rewards from ${activity.project}` :
                           `Distribution from ${activity.project}`}
                        </div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-gray-900">
                        {activity.type === 'buy' ? `-$${activity.amount}` :
                         activity.type === 'reward' ? `+${activity.tokens} tokens` :
                         `+$${activity.amount}`}
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 ml-auto">
                        View on Explorer
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          // Rewards View
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2 p-6 bg-white">
              <h3 className="text-lg font-bold mb-4">Rewards Overview</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Total Earned</div>
                  <div className="text-2xl font-bold font-mono">{mockPortfolio.rewards.total}</div>
                  <div className="text-xs text-gray-500">tokens</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Pending</div>
                  <div className="text-2xl font-bold font-mono text-amber-600">{mockPortfolio.rewards.pending}</div>
                  <div className="text-xs text-gray-500">tokens</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Claimed</div>
                  <div className="text-2xl font-bold font-mono text-green-600">{mockPortfolio.rewards.claimed}</div>
                  <div className="text-xs text-gray-500">tokens</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Rewards by Project</h4>
                {mockPortfolio.holdings.map(holding => (
                  <div key={holding.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden">
                        {mounted && (
                          <img src={generateProjectIcon(holding.symbol)} alt={holding.name} className="w-full h-full object-contain p-1" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{holding.name}</div>
                        <div className="text-xs text-gray-500">Customer rewards program</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">625 tokens</div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Claim Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Distribution</h3>
              <div className="text-3xl font-bold font-mono text-purple-700 mb-2">
                6 days
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Monthly distributions are processed on the 1st of each month
              </p>
              <div className="p-3 bg-white/80 rounded-lg mb-4">
                <div className="text-xs text-gray-600 mb-1">Estimated Next Payment</div>
                <div className="text-xl font-bold font-mono text-gray-900">
                  ${stats.annualizedReturn.toFixed(2)}
                </div>
              </div>
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Set Up Notifications
              </button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Add Plus import at the top
import { Plus } from "lucide-react"