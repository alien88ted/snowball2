"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Search, TrendingUp, Clock, Users, Zap, Target, ArrowRight, Grid, List, ChevronLeft, CheckCircle2, ArrowUpRight, Activity, BarChart3, TrendingDown, Moon, Sun, Sparkles } from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"

const sortOptions = [
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "gainers", label: "Top Gainers", icon: TrendingUp },
  { value: "losers", label: "Top Losers", icon: TrendingDown },
  { value: "volume", label: "Volume", icon: BarChart3 },
  { value: "newest", label: "Recently Added", icon: Clock },
  { value: "apy", label: "Highest APY", icon: Zap }
]

// Aurora Background Component - App Version
function AuroraBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950' 
          : 'bg-gradient-to-br from-white via-gray-50/50 to-white'
      }`} />
      
      {/* Aurora gradient orbs */}
      <div className="absolute inset-0">
        {/* Primary orb */}
        <div
          className={`absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent' 
              : 'bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-transparent'
          } blur-3xl animate-float-slow`}
          style={{ animationDelay: '0s', animationDuration: '20s' }}
        />
        
        {/* Secondary orb */}
        <div
          className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-900/15 via-teal-900/10 to-transparent' 
              : 'bg-gradient-to-br from-emerald-100/25 via-teal-100/15 to-transparent'
          } blur-3xl animate-float-medium`}
          style={{ animationDelay: '5s', animationDuration: '25s' }}
        />
        
        {/* Accent orb */}
        <div
          className={`absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-transparent' 
              : 'bg-gradient-to-br from-purple-100/20 via-pink-100/10 to-transparent'
          } blur-3xl animate-float-fast`}
          style={{ animationDelay: '10s', animationDuration: '15s' }}
        />
      </div>
      
      {/* Subtle shimmer overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark ? 'opacity-[0.015]' : 'opacity-[0.02]'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${
            isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          } 0%, transparent 70%)`
        }}
      />
    </div>
  )
}

// Floating Dollar Sign Background Component - Enhanced
function FloatingDollars({ isDark }: { isDark: boolean }) {
  const [dollars, setDollars] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; opacity: number }>>([])
  
  useEffect(() => {
    const newDollars = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      opacity: isDark ? 0.02 : 0.04
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
              ? 'text-blue-400/20' 
              : 'bg-gradient-to-br from-gray-200 to-gray-300 bg-clip-text text-transparent'
          }`}
          style={{
            left: `${dollar.x}%`,
            top: `${dollar.y}%`,
            transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
            fontSize: `${4 + dollar.scale * 2}rem`,
            opacity: dollar.opacity,
            animation: `float-slow ${25 + Math.random() * 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            filter: isDark ? 'blur(0.5px)' : 'blur(0.3px)'
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

// Generate mock data for price changes and volume
function generateMockData(project: Project) {
  const change24h = -10 + Math.random() * 20 // -10% to +10%
  const volume24h = Math.floor(50000 + Math.random() * 500000)
  const holders = Math.floor(100 + Math.random() * 5000)
  const liquidity = Math.floor(100000 + Math.random() * 2000000)
  const marketCap = Math.floor((project.fundingGoal || 500000) * (0.5 + Math.random()))
  
  return {
    change24h,
    volume24h,
    holders,
    liquidity,
    marketCap,
    priceHistory: Array.from({ length: 7 }, () => Math.random() * 100)
  }
}

export default function ExplorerPremium() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState("100")
  const [isDark, setIsDark] = useState(false)
  const [recentTrades, setRecentTrades] = useState<any[]>([])

  // Generate recent trades
  useEffect(() => {
    const generateTrades = () => {
      const trades = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        type: Math.random() > 0.5 ? 'buy' : 'sell',
        amount: Math.floor(100 + Math.random() * 5000),
        token: ['$COFFEE', '$MARKET', '$FASHION', '$FOOD', '$LOCAL'][Math.floor(Math.random() * 5)],
        time: `${Math.floor(Math.random() * 59)}s`,
        address: `${Math.random().toString(36).slice(2, 6).toUpperCase()}...${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      }))
      setRecentTrades(trades)
    }
    
    generateTrades()
    const interval = setInterval(generateTrades, 5000) // Update every 5 seconds
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const data = getAllProjects().map(p => ({
      ...p,
      ...generateMockData(p)
    }))
    setProjects(data as any)
    setFilteredProjects(data as any)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterAndSort(query, sortBy)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    filterAndSort(searchQuery, sort)
  }

  const filterAndSort = (query: string, sort: string) => {
    let filtered = [...projects]
    
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.symbol.toLowerCase().includes(query.toLowerCase())
      )
    }

    switch (sort) {
      case "trending":
        filtered.sort((a, b) => ((b as any).volume24h || 0) - ((a as any).volume24h || 0))
        break
      case "gainers":
        filtered.sort((a, b) => ((b as any).change24h || 0) - ((a as any).change24h || 0))
        break
      case "losers":
        filtered.sort((a, b) => ((a as any).change24h || 0) - ((b as any).change24h || 0))
        break
      case "volume":
        filtered.sort((a, b) => ((b as any).volume24h || 0) - ((a as any).volume24h || 0))
        break
      case "newest":
        // Sort by ID or random for now since we don't have launch dates
        filtered.sort(() => Math.random() - 0.5)
        break
      case "apy":
        filtered.sort((a, b) => (b.apy || 0) - (a.apy || 0))
        break
    }
    
    setFilteredProjects(filtered)
  }

  const expectedReturns = parseFloat(investmentAmount) * (1 + ((expandedProject?.apy || 0) / 100))

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} relative transition-colors`}>
      {/* Aurora Background */}
      <AuroraBackground isDark={isDark} />
      
      {/* Floating Dollar Signs */}
      <FloatingDollars isDark={isDark} />

      {/* Header - Clean and Minimal */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  $now.fun
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-8">
                {["Trade", "Portfolio", "Analytics", "Leaderboard"].map((item) => (
                  <a
                    key={item}
                    href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors ${
                      item === "Trade"
                        ? isDark ? "text-white" : "text-gray-900"
                        : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              >
                {isDark ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button className={`px-5 py-2.5 text-sm font-medium ${isDark ? 'text-gray-300 border-gray-700 hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:bg-gray-50'} border rounded-xl transition-colors flex items-center gap-2`}>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Recent Trades Ticker */}
      <div className={`sticky top-[73px] z-40 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="relative h-10 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-current to-transparent z-10 pointer-events-none" 
               style={{ color: isDark ? '#111827' : '#ffffff' }} />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-current to-transparent z-10 pointer-events-none"
               style={{ color: isDark ? '#111827' : '#ffffff' }} />
          
          <div className="flex items-center h-full animate-scroll-left">
            <div className="flex items-center gap-8 px-6 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>SOLANA</span>
              </div>
              
              {/* Double the trades for continuous scroll */}
              {[...recentTrades, ...recentTrades].map((trade, i) => (
                <div key={`${trade.id}-${i}`} className="flex items-center gap-2">
                  <Sparkles className={`w-3 h-3 ${trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'}`} />
                  <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {trade.address}
                  </span>
                  <span className={`text-xs font-bold ${trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {trade.type === 'buy' ? 'bought' : 'sold'}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${trade.amount}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {trade.token}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    {trade.time} ago
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Market Stats Bar */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Volume (24h)</span>
              <Activity className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$2.4M</div>
            <div className="text-xs text-emerald-500 font-medium mt-1">+12.5%</div>
          </div>
          <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Liquidity</span>
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$18.7M</div>
            <div className="text-xs text-emerald-500 font-medium mt-1">+3.2%</div>
          </div>
          <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Projects</span>
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>127</div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>23 launching</div>
          </div>
          <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Holders</span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>45.2K</div>
            <div className="text-xs text-emerald-500 font-medium mt-1">+892 today</div>
          </div>
          <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Network</span>
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-teal-500" />
            </div>
            <div className={`text-xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Solana</div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Mainnet</div>
          </div>
        </div>

        {/* If a project is expanded, show expanded view */}
        {expandedProject ? (
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            {/* Back Button */}
            <button
              onClick={() => setExpandedProject(null)}
              className={`mb-8 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back to all projects</span>
            </button>

            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Hero Card with Live Data */}
                <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-8`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {(() => {
                        const Icon = getProjectIcon(expandedProject.category)
                        return (
                          <div className={`w-14 h-14 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} backdrop-blur-sm flex items-center justify-center`}>
                            <Icon className={`w-7 h-7 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                          </div>
                        )
                      })()}
                      <div>
                        <h1 className={`text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{expandedProject.name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>${expandedProject.symbol}</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>📍 {expandedProject.location}</span>
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-400 rounded-full font-medium">
                            Solana
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${(expandedProject as any).change24h > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      <div className="text-2xl font-bold">
                        {(expandedProject as any).change24h > 0 ? '+' : ''}{(expandedProject as any).change24h?.toFixed(2)}%
                      </div>
                      <div className="text-xs opacity-70">24h change</div>
                    </div>
                  </div>

                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-8`}>{expandedProject.description}</p>

                  {/* Live Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border backdrop-blur-sm`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Market Cap</span>
                        <span className="text-xs text-emerald-500 font-medium">Live</span>
                      </div>
                      <div className={`text-xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${((expandedProject as any).marketCap || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border backdrop-blur-sm`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>24h Volume</span>
                        <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                      </div>
                      <div className={`text-xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${((expandedProject as any).volume24h || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border backdrop-blur-sm`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Total Liquidity</span>
                      </div>
                      <div className={`text-xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${((expandedProject as any).liquidity || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border backdrop-blur-sm`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Holders</span>
                      </div>
                      <div className={`text-xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {((expandedProject as any).holders || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className={`text-center p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm`}>
                      <div className="text-2xl font-serif font-bold text-emerald-500">{expandedProject.apy}%</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mt-1`}>APY</div>
                    </div>
                    <div className={`text-center p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm`}>
                      <div className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{expandedProject.progress}%</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mt-1`}>Funded</div>
                    </div>
                    <div className={`text-center p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm`}>
                      <div className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{expandedProject.investors}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mt-1`}>Investors</div>
                    </div>
                    <div className={`text-center p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm`}>
                      <div className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>${expandedProject.minInvestment}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mt-1`}>Min Invest</div>
                    </div>
                  </div>
                </div>

                {/* Revenue & Analytics */}
                <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-6`}>
                  <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Revenue Projections & Analytics</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { year: "Year 1", amount: 450000, percentage: 45 },
                      { year: "Year 2", amount: 780000, percentage: 78 },
                      { year: "Year 3", amount: 1200000, percentage: 100 }
                    ].map((item) => (
                      <div key={item.year}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.year}</span>
                          <span className={`font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${item.amount.toLocaleString()}</span>
                        </div>
                        <div className={`h-2 ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-full overflow-hidden backdrop-blur-sm`}>
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mini chart placeholder */}
                  <div className={`h-32 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm flex items-center justify-center`}>
                    <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>7-Day Price Chart</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="sticky top-[113px] space-y-6">
                  {/* Investment Widget */}
                  <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-6`}>
                    <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Quick Invest</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>Investment Amount (SOL)</label>
                        <div className="relative">
                          <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>◎</span>
                          <input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            className={`w-full pl-8 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white/50 border-gray-300'} backdrop-blur-sm focus:ring-2 focus:ring-emerald-500`}
                            placeholder="100"
                          />
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm space-y-2`}>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Returns</span>
                          <span className="font-mono font-bold text-emerald-500">◎ {expectedReturns.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>APY</span>
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{expandedProject.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Network</span>
                          <span className="text-purple-500 font-medium">Solana</span>
                        </div>
                      </div>

                      <button className={`w-full py-3.5 ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2`}>
                        Invest Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Recent Activity</h4>
                    <div className="space-y-2">
                      {recentTrades.slice(0, 3).map((trade) => (
                        <div key={trade.id} className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-mono">{trade.address}</span>
                          <span className={trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'}>
                            {trade.type === 'buy' ? '+' : '-'}◎{(trade.amount/100).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search and Sort */}
            <div className="mb-8 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or ticker..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800/30 border-gray-700 text-white' : 'bg-white/70 border-gray-200'} backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 transition-all`}
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800/30 border-gray-700 text-white' : 'bg-white/70 border-gray-200'} backdrop-blur-sm focus:ring-2 focus:ring-emerald-500`}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className={`flex gap-1 p-1 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/70'} backdrop-blur-sm`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? isDark ? "bg-gray-700/50" : "bg-white shadow-sm"
                      : isDark ? "hover:bg-gray-700/30" : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? isDark ? "bg-gray-700/50" : "bg-white shadow-sm"
                      : isDark ? "hover:bg-gray-700/30" : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Projects Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-3 gap-6">
                {filteredProjects.map((project: any) => {
                  const Icon = getProjectIcon(project.category)
                  
                  return (
                    <div
                      key={project.id}
                      onClick={() => setExpandedProject(project)}
                      className={`group rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30 hover:bg-gray-800/50' : 'border-gray-200 bg-white/70 hover:bg-white/90'} backdrop-blur-sm p-6 transition-all cursor-pointer hover:scale-[1.02]`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                        </div>
                        <div className={`text-right ${project.change24h > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          <div className="text-sm font-bold">
                            {project.change24h > 0 ? '+' : ''}{project.change24h?.toFixed(2)}%
                          </div>
                          <div className="text-xs opacity-70">24h</div>
                        </div>
                      </div>

                      <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {project.name}
                      </h3>
                      <div className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>${project.symbol}</div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>APY</span>
                          <span className="font-mono font-bold text-emerald-500">{project.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Volume</span>
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>${(project.volume24h / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Liquidity</span>
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>${(project.liquidity / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>

                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'} flex items-center justify-between`}>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.holders} holders</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded font-medium">
                          Solana
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project: any) => {
                  const Icon = getProjectIcon(project.category)
                  
                  return (
                    <div
                      key={project.id}
                      onClick={() => setExpandedProject(project)}
                      className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30 hover:bg-gray-800/50' : 'border-gray-200 bg-white/70 hover:bg-white/90'} backdrop-blur-sm p-6 transition-all cursor-pointer`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} backdrop-blur-sm flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-baseline gap-3">
                            <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {project.name}
                            </h3>
                            <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>${project.symbol}</span>
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded font-medium">
                              Solana
                            </span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className={`text-xl font-serif font-bold ${project.change24h > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                              {project.change24h > 0 ? '+' : ''}{project.change24h?.toFixed(1)}%
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>24h</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-serif font-bold text-emerald-500">{project.apy}%</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>APY</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-xl font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>${(project.volume24h / 1000).toFixed(0)}K</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Volume</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.holders}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Holders</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </div>
  )
}