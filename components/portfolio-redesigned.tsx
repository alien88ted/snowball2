"use client"

import { useState, useEffect, useMemo } from "react"
import { AppHeaderPerfect } from "@/components/app-header-perfect"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { ProjectDetailModal } from "@/components/project-detail-modal" 
import { Card } from "@/components/ui/card"
import {
  TrendingUp, DollarSign, PieChart, Activity, Calendar, ArrowUp, ArrowDown,
  Eye, EyeOff, Download, RefreshCw, Info, Settings, Gift,
  Clock, Trophy, Zap, Shield, Percent, Target, ChevronRight,
  ArrowUpRight, ArrowDownRight, Sparkles
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"

type TimeRange = "24h" | "7d" | "30d" | "all"
type ViewMode = "overview" | "holdings" | "activity" | "analytics"

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
    },
    {
      id: "food",
      projectId: "4",
      name: "$FOOD",
      symbol: "FOOD",
      tokens: 3000,
      value: 8360,
      invested: 5000,
      profit: 3360,
      profitPercent: 67.2,
      apy: 48.5,
      monthlyReturn: 21.08
    }
  ]
}

const recentActivity = [
  { id: 1, type: 'buy', project: '$COFFEE', amount: 2500, tokens: 2500, time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'reward', project: '$MARKET', amount: 125.50, time: '1 day ago', status: 'completed' },
  { id: 3, type: 'distribution', project: '$FASHION', amount: 89.25, time: '3 days ago', status: 'completed' },
  { id: 4, type: 'buy', project: '$FOOD', amount: 1000, tokens: 1000, time: '5 days ago', status: 'completed' },
  { id: 5, type: 'reward', project: '$COFFEE', amount: 145.50, time: '1 week ago', status: 'completed' }
]

export default function PortfolioRedesigned() {
  const [showValues, setShowValues] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [viewMode, setViewMode] = useState<ViewMode>("overview")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = getAllProjects()

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setSelectedProject(project)
    }
  }

  const formatValue = (value: number | string, hidden = false) => {
    if (!showValues && hidden) return "••••••"
    return typeof value === "number" ? value.toLocaleString() : value
  }

  return (
    <AppThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 transition-colors duration-500">
        <AppHeaderPerfect />

      {/* Portfolio Header */}
      <div className="pt-20 pb-10 bg-gradient-to-b from-white via-white to-gray-50/50 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Portfolio</h1>
                <button
                  onClick={() => setShowValues(!showValues)}
                  className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all group"
                >
                  {showValues ? <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <EyeOff className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                </button>
              </div>
              <p className="text-gray-600 text-lg">
                Track and manage your investments
              </p>
            </div>

            <div className="flex items-center gap-3">
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
              
              <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Portfolio Value Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Value</span>
                <DollarSign className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ${formatValue(mockPortfolio.totalValue, true)}
              </div>
              <div className={`text-sm mt-2 flex items-center gap-1 ${mockPortfolio.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {mockPortfolio.changePercent24h >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {mockPortfolio.changePercent24h >= 0 ? '+' : ''}{mockPortfolio.changePercent24h}% today
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Profit</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600">
                +${formatValue(mockPortfolio.totalReturns, true)}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {((mockPortfolio.totalReturns / mockPortfolio.totalInvested) * 100).toFixed(1)}% ROI
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Monthly Income</span>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ${formatValue(mockPortfolio.monthlyIncome, true)}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                From {mockPortfolio.holdings.length} projects
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Holdings</span>
                <PieChart className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{mockPortfolio.holdings.length}</div>
              <div className="text-sm text-gray-600 mt-2">
                Diversified portfolio
              </div>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-2 mt-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'holdings', label: 'Holdings', icon: PieChart },
              { id: 'activity', label: 'Activity', icon: Clock },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as ViewMode)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Holdings List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Holdings</h2>
              {mockPortfolio.holdings.map(holding => {
                const project = projects.find(p => p.symbol === holding.symbol)
                const Icon = getProjectIcon(project?.category || 'coffee')
                
                return (
                  <div
                    key={holding.id}
                    onClick={() => project && handleProjectClick(project.id)}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{holding.name}</h3>
                          <p className="text-sm text-gray-500">{formatValue(holding.tokens)} tokens</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ${formatValue(holding.value, true)}
                        </div>
                        <div className={`text-sm flex items-center justify-end gap-1 ${
                          holding.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.profitPercent >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Invested</span>
                        <p className="font-semibold text-gray-900">${formatValue(holding.invested)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">APY</span>
                        <p className="font-semibold text-green-600">{holding.apy}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Monthly</span>
                        <p className="font-semibold text-gray-900">+${formatValue(holding.monthlyReturn)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Activity Feed */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                {recentActivity.slice(0, 5).map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'buy' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'reward' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'buy' ? <ArrowDown className="w-4 h-4" /> :
                       activity.type === 'reward' ? <Gift className="w-4 h-4" /> :
                       <DollarSign className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'buy' ? `Bought ${activity.tokens} ${activity.project}` :
                         activity.type === 'reward' ? `Reward from ${activity.project}` :
                         `Distribution from ${activity.project}`}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {activity.type === 'buy' ? '-' : '+'}${activity.amount}
                      </p>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'holdings' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Asset</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Tokens</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Cost Basis</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Profit/Loss</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">APY</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {mockPortfolio.holdings.map(holding => {
                  const project = projects.find(p => p.symbol === holding.symbol)
                  const Icon = getProjectIcon(project?.category || 'coffee')
                  return (
                    <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{holding.name}</div>
                            <div className="text-xs text-gray-500">{holding.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                        {formatValue(holding.tokens)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm font-bold text-gray-900">
                        ${formatValue(holding.value, true)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-gray-600">
                        ${formatValue(holding.invested)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`font-mono text-sm font-bold ${
                          holding.profit >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.profit >= 0 ? '+' : ''}${formatValue(holding.profit)}
                        </div>
                        <div className={`text-xs ${
                          holding.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-green-600 font-bold">
                        {holding.apy}%
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                        +${formatValue(holding.monthlyReturn)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === 'activity' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === 'buy' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'reward' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
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
                      {activity.type === 'buy' ? '-' : '+'}${activity.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.status === 'completed' ? 
                        <span className="text-green-600">Completed</span> : 
                        <span className="text-yellow-600">Pending</span>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      </main>
    </AppThemeProvider>
  )
}
