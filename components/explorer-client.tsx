"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { Card } from "@/components/ui/card"
import { 
  ArrowRight, TrendingUp, Users, Clock, MapPin, Filter, Search, Sparkles, 
  DollarSign, Zap, Shield, Grid3x3, List, ChevronDown, Star, Flame, 
  ArrowUpRight, Activity, Target, Eye, Heart, Info, ChevronRight,
  Banknote, PiggyBank, Trophy, AlertCircle, CheckCircle2, Rocket,
  Calculator, BarChart3, Percent, Calendar, X, Plus, Minus, 
  TrendingDown, ArrowDown, ArrowUp, Layers, BookOpen, Bell
} from "lucide-react"
import { getAllProjects, generateProjectIcon } from "@/lib/projects"

type SortOption = "marketcap" | "volume" | "apy" | "progress" | "newest" | "momentum"
type FilterStatus = "all" | "presale" | "live" | "funded" | "coming_soon"
type TimeRange = "24h" | "7d" | "30d" | "all"

// Mock real-time data generator
function generateMockActivity() {
  const actions = ["invested", "joined", "claimed rewards"]
  const amounts = [100, 250, 500, 1000, 2500]
  const projects = ["$COFFEE", "$MARKET", "$FASHION"]
  
  return {
    action: actions[Math.floor(Math.random() * actions.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    project: projects[Math.floor(Math.random() * projects.length)],
    time: `${Math.floor(Math.random() * 59) + 1}m ago`,
    user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`
  }
}

export default function ExplorerClient() {
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table" | "analytics">("cards")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("marketcap")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [timeRange, setTimeRange] = useState<TimeRange>("24h")
  const [showCalculator, setShowCalculator] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [liveActivity, setLiveActivity] = useState(generateMockActivity())
  
  const projects = getAllProjects()
  const [totals, setTotals] = useState<Record<string, { 
    sol: number; 
    usdc: number; 
    totalUsd: number; 
    updatedAt?: number;
    change24h?: number; // Mock 24h change
    volume24h?: number; // Mock 24h volume
  }>>({})

  // Investment calculator state
  const [calcAmount, setCalcAmount] = useState(1000)
  const [calcProject, setCalcProject] = useState(projects[0]?.id)

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchlist')
    if (saved) setWatchlist(JSON.parse(saved))
  }, [])

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  // Mock live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActivity(generateMockActivity())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMounted(true)
    async function load() {
      try {
        const results = await Promise.all(
          projects.map(async (p) => {
            const res = await fetch(`/api/wallet?address=${p.presaleAddress}`, { cache: "no-store" })
            if (!res.ok) return [p.id, { 
              sol: 0, 
              usdc: 0, 
              totalUsd: 0, 
              updatedAt: Date.now(),
              change24h: Math.random() * 40 - 10, // Mock -10% to +30%
              volume24h: Math.random() * 50000 // Mock volume
            }] as const
            const data = await res.json()
            return [p.id, { 
              sol: data.sol ?? 0, 
              usdc: data.usdc ?? 0, 
              totalUsd: data.totalUsd ?? 0, 
              updatedAt: data.updatedAt ?? Date.now(),
              change24h: Math.random() * 40 - 10,
              volume24h: Math.random() * 50000
            }] as const
          })
        )
        const map: Record<string, typeof results[0][1]> = {}
        for (const [id, val] of results) map[id] = val
        setTotals(map)
      } catch {}
    }
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [projects])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('#search-input')?.focus()
      }
      // Cmd/Ctrl + / for calculator
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setShowCalculator(prev => !prev)
      }
      // Numbers 1-3 for view modes
      if (e.key === '1') setViewMode('cards')
      if (e.key === '2') setViewMode('table')
      if (e.key === '3') setViewMode('analytics')
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(p => p.status === filterStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aTotal = totals[a.id]?.totalUsd ?? 0
      const bTotal = totals[b.id]?.totalUsd ?? 0
      const aProgress = aTotal > 0 ? (aTotal / a.fundingGoal) * 100 : 0
      const bProgress = bTotal > 0 ? (bTotal / b.fundingGoal) * 100 : 0
      const aChange = totals[a.id]?.change24h ?? 0
      const bChange = totals[b.id]?.change24h ?? 0
      const aVolume = totals[a.id]?.volume24h ?? 0
      const bVolume = totals[b.id]?.volume24h ?? 0

      switch (sortBy) {
        case "marketcap":
          return bTotal - aTotal
        case "volume":
          return bVolume - aVolume
        case "apy":
          // Calculate estimated APY
          const aAPY = (a.revenueShare / 100) * 60000 / a.fundingGoal * 100
          const bAPY = (b.revenueShare / 100) * 60000 / b.fundingGoal * 100
          return bAPY - aAPY
        case "progress":
          return bProgress - aProgress
        case "momentum":
          return bChange - aChange
        case "newest":
        default:
          return projects.indexOf(b) - projects.indexOf(a)
      }
    })

    return filtered
  }, [projects, searchQuery, filterStatus, sortBy, totals])

  // Calculate aggregate stats
  const aggregateStats = useMemo(() => {
    const totalRaised = Object.values(totals).reduce((sum, t) => sum + t.totalUsd, 0)
    const totalVolume = Object.values(totals).reduce((sum, t) => sum + (t.volume24h ?? 0), 0)
    const avgChange = Object.values(totals).reduce((sum, t) => sum + (t.change24h ?? 0), 0) / Object.values(totals).length
    const activeProjects = projects.filter(p => p.status === "presale" || p.status === "live").length
    const totalInvestors = Math.floor(totalRaised / 250)
    
    return { totalRaised, totalVolume, avgChange, activeProjects, totalInvestors }
  }, [totals, projects])

  const calculateReturns = (project: any, amount: number) => {
    const tokens = amount / project.price
    const yearlyProfit = 60000 * (project.revenueShare / 100)
    const monthlyReturn = (yearlyProfit * (tokens / project.totalSupply)) / 12
    const apy = (monthlyReturn * 12 / amount * 100)
    return { tokens, monthlyReturn, apy, roi: apy / 100 * amount }
  }

  const toggleWatchlist = (projectId: string) => {
    setWatchlist(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const toggleCompare = (projectId: string) => {
    if (!compareMode) {
      setCompareMode(true)
      setSelectedForCompare([projectId])
    } else {
      setSelectedForCompare(prev => 
        prev.includes(projectId)
          ? prev.filter(id => id !== projectId)
          : prev.length < 3 ? [...prev, projectId] : prev
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <AppHeader />

      {/* Live Ticker */}
      <div className="bg-gray-900 text-white py-2 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-hidden">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-green-400 animate-pulse" />
              <span className="text-gray-400">Live</span>
            </div>
            
            {/* Market Stats Ticker */}
            <div className="flex items-center gap-6 animate-scroll">
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Total Raised:</span>
                <span className="font-mono font-bold">${(aggregateStats.totalRaised / 1000).toFixed(1)}K</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-gray-400">24h Volume:</span>
                <span className="font-mono font-bold">${(aggregateStats.totalVolume / 1000).toFixed(1)}K</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Avg Change:</span>
                <span className={`font-mono font-bold ${aggregateStats.avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {aggregateStats.avgChange >= 0 ? '+' : ''}{aggregateStats.avgChange.toFixed(1)}%
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Active Projects:</span>
                <span className="font-mono font-bold">{aggregateStats.activeProjects}</span>
              </span>
            </div>
          </div>

          {/* Live Activity */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">{liveActivity.user}</span>
            <span className="text-gray-400">{liveActivity.action}</span>
            <span className="text-green-400 font-bold">${liveActivity.amount}</span>
            <span className="text-gray-400">in</span>
            <span className="text-white font-bold">{liveActivity.project}</span>
            <span className="text-gray-500">{liveActivity.time}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Investment Hub</h1>
              
              {/* View Mode Tabs */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'cards' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'table' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'analytics' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="24h">24H</option>
                <option value="7d">7D</option>
                <option value="30d">30D</option>
                <option value="all">All</option>
              </select>

              {/* Compare Mode */}
              <button
                onClick={() => {
                  setCompareMode(!compareMode)
                  setSelectedForCompare([])
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  compareMode 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  Compare
                  {selectedForCompare.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-xs">
                      {selectedForCompare.length}
                    </span>
                  )}
                </span>
              </button>

              {/* Calculator */}
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  showCalculator 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Calculator
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Search */}
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search projects... (⌘K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-2">
                {[
                  { value: "all", label: "All", count: projects.length },
                  { value: "presale", label: "Presale", count: projects.filter(p => p.status === "presale").length },
                  { value: "live", label: "Live", count: projects.filter(p => p.status === "live").length },
                  { value: "funded", label: "Funded", count: projects.filter(p => p.status === "funded").length }
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterStatus(filter.value as FilterStatus)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filterStatus === filter.value
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {filter.label}
                    <span className={`ml-1.5 ${
                      filterStatus === filter.value ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="marketcap">Market Cap</option>
                <option value="volume">Volume</option>
                <option value="apy">APY</option>
                <option value="progress">Progress</option>
                <option value="momentum">Momentum</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Watchlist Filter */}
            {watchlist.length > 0 && (
              <button className="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg border border-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500" />
                Watchlist ({watchlist.length})
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${showCalculator ? 'mr-80' : ''}`}>
          {viewMode === 'analytics' ? (
            // Analytics View
            <div className="p-6">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Market Overview Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Total Market Cap</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono">${(aggregateStats.totalRaised / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-green-600 mt-1">+12.5% (24h)</div>
                  </Card>

                  <Card className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">24h Volume</span>
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono">${(aggregateStats.totalVolume / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600 mt-1">1,234 trades</div>
                  </Card>

                  <Card className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Active Investors</span>
                      <Users className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono">{aggregateStats.totalInvestors}</div>
                    <div className="text-xs text-purple-600 mt-1">+89 this week</div>
                  </Card>

                  <Card className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Avg APY</span>
                      <Percent className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono">8.2%</div>
                    <div className="text-xs text-amber-600 mt-1">Est. returns</div>
                  </Card>
                </div>

                {/* Top Performers */}
                <Card className="p-6 bg-white">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Top Performers ({timeRange})
                  </h3>
                  <div className="space-y-3">
                    {filteredProjects.slice(0, 5).map(project => {
                      const change = totals[project.id]?.change24h ?? 0
                      const volume = totals[project.id]?.volume24h ?? 0
                      const progress = ((totals[project.id]?.totalUsd ?? 0) / project.fundingGoal) * 100
                      
                return (
                        <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                        {mounted && (
                                <img src={generateProjectIcon(project.symbol)} alt={project.name} className="w-full h-full object-contain p-1.5" />
                        )}
                      </div>
                            <div>
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-xs text-gray-500">{project.symbol}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-right">
                              <div className="font-mono font-medium">${project.price}</div>
                              <div className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono text-gray-600">${(volume / 1000).toFixed(1)}K</div>
                              <div className="text-xs text-gray-500">Volume</div>
                            </div>
                            <div className="w-20">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">{progress.toFixed(0)}%</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                      </div>
                </Card>

                {/* Compare Projects */}
                {selectedForCompare.length >= 2 && (
                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-bold mb-4">Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 text-sm font-medium text-gray-700">Metric</th>
                            {selectedForCompare.map(id => {
                              const project = projects.find(p => p.id === id)
                              return (
                                <th key={id} className="text-center py-2 text-sm font-medium text-gray-700">
                                  {project?.name}
                                </th>
                              )
                            })}
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 text-sm text-gray-600">Price</td>
                            {selectedForCompare.map(id => {
                              const project = projects.find(p => p.id === id)
                              return (
                                <td key={id} className="text-center py-2 font-mono text-sm">
                                  ${project?.price}
                                </td>
                              )
                            })}
                          </tr>
                          <tr>
                            <td className="py-2 text-sm text-gray-600">Market Cap</td>
                            {selectedForCompare.map(id => {
                              const total = totals[id]?.totalUsd ?? 0
                              return (
                                <td key={id} className="text-center py-2 font-mono text-sm">
                                  ${(total / 1000).toFixed(1)}K
                                </td>
                              )
                            })}
                          </tr>
                          <tr>
                            <td className="py-2 text-sm text-gray-600">24h Change</td>
                            {selectedForCompare.map(id => {
                              const change = totals[id]?.change24h ?? 0
                              return (
                                <td key={id} className={`text-center py-2 font-mono text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                                </td>
                              )
                            })}
                          </tr>
                          <tr>
                            <td className="py-2 text-sm text-gray-600">APY</td>
                            {selectedForCompare.map(id => {
                              const project = projects.find(p => p.id === id)
                              const apy = calculateReturns(project, 1000).apy
                              return (
                                <td key={id} className="text-center py-2 font-mono text-sm text-green-600">
                                  {apy.toFixed(1)}%
                                </td>
                              )
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          ) : viewMode === 'table' ? (
            // Table View
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 uppercase">Project</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Price</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">24h</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Market Cap</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Volume</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">Progress</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase">APY</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-700 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredProjects.map(project => {
                          const total = totals[project.id]?.totalUsd ?? 0
                          const change = totals[project.id]?.change24h ?? 0
                          const volume = totals[project.id]?.volume24h ?? 0
                          const progress = (total / project.fundingGoal) * 100
                          const returns = calculateReturns(project, 1000)
                          const isWatched = watchlist.includes(project.id)
                          const isComparing = selectedForCompare.includes(project.id)
                          
                          return (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {compareMode && (
                                    <input
                                      type="checkbox"
                                      checked={isComparing}
                                      onChange={() => toggleCompare(project.id)}
                                      className="rounded border-gray-300"
                                    />
                                  )}
                                  <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden">
                                    {mounted && (
                                      <img src={generateProjectIcon(project.symbol)} alt={project.name} className="w-full h-full object-contain p-1" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                      {project.name}
                                      {progress > 80 && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                                    </div>
                                    <div className="text-xs text-gray-500">{project.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-sm">
                                ${project.price}
                              </td>
                              <td className={`py-3 px-4 text-right font-mono text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                <span className="flex items-center justify-end gap-1">
                                  {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                  {Math.abs(change).toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-sm font-medium">
                                ${(total / 1000).toFixed(1)}K
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-sm text-gray-600">
                                ${(volume / 1000).toFixed(1)}K
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        progress > 80 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                                      }`}
                                      style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-mono text-gray-700 w-12 text-right">{progress.toFixed(0)}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-sm text-green-600 font-medium">
                                {returns.apy.toFixed(1)}%
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => toggleWatchlist(project.id)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                      isWatched 
                                        ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    }`}
                                  >
                                    <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
                                  </button>
                                  <Link href={`/explorer/${project.id}`}>
                                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                      <ArrowUpRight className="w-4 h-4" />
                                    </button>
                  </Link>
                                </div>
                              </td>
                            </tr>
                )
              })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            // Cards View
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                {/* Quick Stats */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <Card className="p-4 bg-white border-l-4 border-blue-500">
                    <div className="text-xs text-gray-500 mb-1">Total Raised</div>
                    <div className="text-xl font-bold font-mono">${(aggregateStats.totalRaised / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-green-600">↑ 12.5%</div>
                  </Card>
                  <Card className="p-4 bg-white border-l-4 border-purple-500">
                    <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                    <div className="text-xl font-bold font-mono">${(aggregateStats.totalVolume / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">1.2K trades</div>
                  </Card>
                  <Card className="p-4 bg-white border-l-4 border-green-500">
                    <div className="text-xs text-gray-500 mb-1">Avg APY</div>
                    <div className="text-xl font-bold font-mono">8.2%</div>
                    <div className="text-xs text-green-600">Est. returns</div>
                  </Card>
                  <Card className="p-4 bg-white border-l-4 border-amber-500">
                    <div className="text-xs text-gray-500 mb-1">Hot Projects</div>
                    <div className="text-xl font-bold font-mono">{filteredProjects.filter(p => ((totals[p.id]?.totalUsd ?? 0) / p.fundingGoal) > 0.75).length}</div>
                    <div className="text-xs text-orange-600">&gt;75% funded</div>
                  </Card>
                  <Card className="p-4 bg-white border-l-4 border-gray-500">
                    <div className="text-xs text-gray-500 mb-1">Total Investors</div>
                    <div className="text-xl font-bold font-mono">{aggregateStats.totalInvestors}+</div>
                    <div className="text-xs text-gray-600">Growing</div>
                  </Card>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map(project => {
                    const total = totals[project.id]?.totalUsd ?? 0
                    const change = totals[project.id]?.change24h ?? 0
                    const volume = totals[project.id]?.volume24h ?? 0
                    const progress = (total / project.fundingGoal) * 100
                    const returns = calculateReturns(project, 1000)
                    const isHot = progress > 75
                    const isWatched = watchlist.includes(project.id)
                    const isComparing = selectedForCompare.includes(project.id)

                return (
                      <Card 
                        key={project.id} 
                        className={`relative overflow-hidden bg-white transition-all hover:shadow-lg ${
                          isComparing ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        {/* Header */}
                        <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 overflow-hidden shadow-sm">
                              {mounted && (
                                  <img src={generateProjectIcon(project.symbol)} alt={project.name} className="w-full h-full object-contain p-2" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                  {project.name}
                                  {isHot && <Flame className="w-4 h-4 text-orange-500" />}
                                </h3>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-500">{project.symbol}</span>
                                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                                    project.status === "presale" 
                                      ? "bg-green-100 text-green-700" 
                                      : project.status === "live"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                  }`}>
                                    {project.status === "presale" ? "Presale" : project.status === "live" ? "Live" : "Soon"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleWatchlist(project.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isWatched 
                                    ? 'text-amber-500 bg-amber-50' 
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                              >
                                <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
                              </button>
                              {compareMode && (
                                <button
                                  onClick={() => toggleCompare(project.id)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isComparing 
                                      ? 'text-blue-600 bg-blue-50' 
                                      : 'text-gray-400 hover:bg-gray-100'
                                  }`}
                                >
                                  <Layers className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Price & Change */}
                          <div className="flex items-baseline justify-between">
                            <div>
                              <div className="text-2xl font-bold font-mono">${project.price}</div>
                              <div className={`text-sm flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {Math.abs(change).toFixed(1)}% (24h)
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Volume</div>
                              <div className="font-mono font-medium">${(volume / 1000).toFixed(1)}K</div>
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="p-4 border-b">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-mono font-bold">{progress.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                isHot 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
                              }`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                          <div className="flex justify-between text-xs">
                            <span className="font-mono text-gray-700">${(total / 1000).toFixed(1)}K raised</span>
                            <span className="text-gray-500">of ${(project.fundingGoal / 1000).toFixed(0)}K</span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="p-4 grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">APY</div>
                            <div className="font-mono font-bold text-green-600">{returns.apy.toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Investors</div>
                            <div className="font-mono font-bold">{Math.floor(total / 250)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Days Left</div>
                            <div className="font-mono font-bold">28</div>
                          </div>
                        </div>

                        {/* Action */}
                        <Link href={`/explorer/${project.id}`}>
                          <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm transition-colors border-t flex items-center justify-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calculator Sidebar */}
        {showCalculator && (
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 shadow-xl z-40 overflow-y-auto">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Investment Calculator</h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Estimate your potential returns</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Project Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Select Project</label>
                <select
                  value={calcProject}
                  onChange={(e) => setCalcProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                  ))}
                </select>
              </div>

              {/* Investment Amount */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Investment Amount</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Math.max(100, parseInt(e.target.value) || 100))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <button
                    onClick={() => setCalcAmount(calcAmount - 100)}
                    disabled={calcAmount <= 100}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCalcAmount(calcAmount + 100)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000, 2500, 5000, 10000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setCalcAmount(amount)}
                    className={`py-1.5 text-sm rounded-lg border transition-colors ${
                      calcAmount === amount 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    ${amount >= 1000 ? `${amount/1000}K` : amount}
                  </button>
                ))}
              </div>

              {/* Results */}
              {(() => {
                const project = projects.find(p => p.id === calcProject)
                if (!project) return null
                const returns = calculateReturns(project, calcAmount)
                
                return (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-gray-900">Estimated Returns</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Tokens Received</span>
                        <span className="font-mono font-bold">{returns.tokens.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Monthly Income</span>
                        <span className="font-mono font-bold text-green-600">${returns.monthlyReturn.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Annual Income</span>
                        <span className="font-mono font-bold text-green-600">${(returns.monthlyReturn * 12).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">APY</span>
                        <span className="font-mono font-bold text-green-600">{returns.apy.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">5 Year Total</span>
                        <span className="font-mono font-bold text-blue-600">${(returns.roi * 5).toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                      <p className="font-medium mb-1">Note:</p>
                      <p>Returns based on current profit projections. Actual returns depend on store performance.</p>
                    </div>

                    <Link href={`/explorer/${calcProject}`}>
                      <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        Invest in {project.name}
                      </button>
                  </Link>
                  </div>
                )
              })()}
            </div>
            </div>
          )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-600">⌘K</kbd>
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-600">⌘/</kbd>
          <span>Calculator</span>
        </div>
      </div>
    </div>
  )
}