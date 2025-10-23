"use client"

import { useState, useEffect } from "react"
import { 
  Moon, Sun, ArrowUpRight, ArrowDownRight, ArrowRight, MoreVertical, 
  TrendingUp, Activity, DollarSign, Clock,
  Coffee, Building2, MapPin, Calendar, Users,
  CircleDollarSign, Target, ChevronRight, ExternalLink
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

// Aurora Orbs (subtle)
function AuroraOrbs({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full ${
        isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'
      } blur-[100px] animate-float`} />
      <div className={`absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full ${
        isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'
      } blur-[100px] animate-float`} style={{ animationDelay: '3s' }} />
    </div>
  )
}

export default function PortfolioUltimate() {
  const [isDark, setIsDark] = useState(false)
  const [selectedView, setSelectedView] = useState('holdings')
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Handle authentication state changes with smooth transitions
  useEffect(() => {
    if (authenticated) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, 1200)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [authenticated])

  // Handle wallet connection
  const handleConnect = async () => {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      setIsLoading(false)
    }
  }
  
  // Portfolio summary - realistic for tokenized stores
  const summary = {
    totalInvested: 38500,
    currentValue: 41234.56, // Slight appreciation from trading
    totalProfitShare: 1456.78, // 33% profit share received so far
    monthlyProfitShare: 234.56,
    holdings: 4,
    avgProfitShare: 33
  }

  // Actual store investments
  const holdings = [
    {
      id: 1,
      name: "Bean & Brew Miami",
      location: "Miami, FL",
      symbol: "COFFEE",
      tokens: 8333, // Amount of tokens owned
      invested: 12500, // Initial investment at $1.50 presale
      currentValue: 13750, // Current value at $1.65 on DEX
      profitShare: 456.78, // Monthly profit share received
      profitShareRate: 33,
      status: "Live", // Store is operational
      openDate: "Jan 2024",
      monthlyRevenue: 45000, // Store's monthly revenue
      investors: 234,
      dexPrice: 1.65,
      presalePrice: 1.50,
      priceChange: 10.0
    },
    {
      id: 2,
      name: "Urban Market LA",
      location: "Los Angeles, CA",
      symbol: "MARKET",
      tokens: 5000,
      invested: 10000,
      currentValue: 9500,
      profitShare: 0, // Not operational yet
      profitShareRate: 33,
      status: "Funding",
      openDate: "Mar 2024",
      monthlyRevenue: 0,
      investors: 156,
      dexPrice: 1.90,
      presalePrice: 2.00,
      priceChange: -5.0
    },
    {
      id: 3,
      name: "Style House NYC",
      location: "New York, NY",
      symbol: "FASHION",
      tokens: 6667,
      invested: 10000,
      currentValue: 11334,
      profitShare: 678.90,
      profitShareRate: 33,
      status: "Live",
      openDate: "Dec 2023",
      monthlyRevenue: 67000,
      investors: 345,
      dexPrice: 1.70,
      presalePrice: 1.50,
      priceChange: 13.3
    },
    {
      id: 4,
      name: "Fresh Bites Chicago",
      location: "Chicago, IL",
      symbol: "FOOD",
      tokens: 4000,
      invested: 6000,
      currentValue: 6800,
      profitShare: 321.10,
      profitShareRate: 33,
      status: "Live",
      openDate: "Jan 2024",
      monthlyRevenue: 38000,
      investors: 198,
      dexPrice: 1.70,
      presalePrice: 1.50,
      priceChange: 13.3
    }
  ]

  // Recent profit distributions
  const distributions = [
    { date: "Jan 15, 2024", project: "Bean & Brew Miami", amount: 156.78, type: "Monthly Profit" },
    { date: "Jan 15, 2024", project: "Style House NYC", amount: 234.56, type: "Monthly Profit" },
    { date: "Jan 15, 2024", project: "Fresh Bites Chicago", amount: 98.76, type: "Monthly Profit" },
    { date: "Dec 15, 2023", project: "Bean & Brew Miami", amount: 145.67, type: "Monthly Profit" },
    { date: "Dec 15, 2023", project: "Style House NYC", amount: 223.45, type: "Monthly Profit" }
  ]

  // Recent trading activity
  const trades = [
    { date: "2 days ago", action: "Buy", project: "Fresh Bites Chicago", amount: 1000, tokens: 588, price: 1.70 },
    { date: "1 week ago", action: "Sell", project: "Bean & Brew Miami", amount: 500, tokens: 303, price: 1.65 },
    { date: "2 weeks ago", action: "Buy", project: "Style House NYC", amount: 2000, tokens: 1176, price: 1.70 }
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative transition-colors">
      {/* REBIRTH Brutalist Background */}
      <div className="fixed inset-0">
        {/* Paper texture */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/paper-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92" />
        
        {/* Subtle red accent orbs */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC143C]/[0.03] to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-black/[0.02] to-transparent blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        
        {/* Halftone pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Header - REBIRTH Brutalist Style */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className="text-3xl font-black font-serif text-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                  REBIRTH
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-4">
                {["PORTFOLIO"].map((item) => {
                  const isActive = item === "PORTFOLIO"
                  return (
                    <a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                        isActive
                          ? "bg-black text-white"
                          : "text-black hover:bg-[#DC143C] hover:text-white"
                      }`}
                    >
                      {item}
                    </a>
                  )
                })}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {ready && authenticated && showContent ? (
                <>
                  <span className="text-sm text-black font-mono font-black uppercase">
                    {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-xs font-black uppercase tracking-[0.2em] border-2 border-black bg-white hover:bg-black hover:text-white transition-all"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                !isLoading && (
                  <button
                    onClick={handleConnect}
                    disabled={!ready}
                    className="px-6 py-3 bg-[#DC143C] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    CONNECT WALLET
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Wallet Gate - Show when not authenticated */}
        {!authenticated && !isLoading && (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
              {/* Hero Content */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-[#DC143C] text-white">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">
                    SECURE PORTFOLIO ACCESS
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
                  TRACK YOUR<br />
                  <span className="text-[#DC143C]">
                    INVESTMENT PORTFOLIO
                  </span>
                </h1>

                <p className="text-lg text-gray-700 max-w-2xl mx-auto uppercase tracking-wide font-bold">
                  Connect your wallet to view your tokenized store holdings, profit distributions, and trading activity all in one place.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleConnect}
                disabled={!ready}
                className="group relative px-8 py-4 text-sm font-black uppercase tracking-[0.2em] bg-[#DC143C] text-white hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  CONNECT WALLET TO VIEW PORTFOLIO
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {/* Preview Cards - Blurred */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  { icon: TrendingUp, label: 'TOTAL VALUE', value: '$41.2K' },
                  { icon: CircleDollarSign, label: 'PROFIT SHARE', value: '$1.4K' },
                  { icon: Target, label: 'HOLDINGS', value: '4 PROJECTS' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative p-6 border-4 border-black bg-white"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      filter: 'blur(4px)',
                      opacity: 0.6
                    }}
                  >
                    <item.icon className="w-8 h-8 mb-3 text-[#DC143C]" />
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      {item.label}
                    </div>
                    <div className="text-2xl font-black uppercase text-black">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="pt-8 flex items-center justify-center gap-8 text-xs font-black uppercase tracking-wider text-gray-700">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#DC143C]" />
                  <span>REAL-TIME TRACKING</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#DC143C]" />
                  <span>PROFIT DISTRIBUTIONS</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#DC143C]" />
                  <span>PERFORMANCE ANALYTICS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center space-y-6 animate-in fade-in duration-500">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } border-t-emerald-500 animate-spin mx-auto`} />
                <DollarSign className={`w-8 h-8 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-500'
                } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
              </div>
              <div className="space-y-2">
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Loading your portfolio
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fetching your holdings and activity...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Content - Show when authenticated */}
        {authenticated && showContent && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Portfolio Summary - REBIRTH Brutalist */}
        <div className="border-4 border-black bg-white p-8 mb-6">
          <h1 className="text-4xl font-black uppercase tracking-wider text-black mb-6">
            YOUR PORTFOLIO
          </h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border-2 border-black bg-white">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                TOTAL INVESTED
              </div>
              <div className="text-2xl font-black text-black">
                ${(summary.totalInvested / 1000).toFixed(1)}K
              </div>
            </div>
            <div className="p-4 border-2 border-black bg-white">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                CURRENT VALUE
              </div>
              <div className="text-2xl font-black text-black">
                ${(summary.currentValue / 1000).toFixed(1)}K
              </div>
              <div className={`text-xs font-black uppercase mt-1 ${
                summary.currentValue > summary.totalInvested ? 'text-[#DC143C]' : 'text-black'
              }`}>
                {summary.currentValue > summary.totalInvested ? '+' : ''}
                {((summary.currentValue - summary.totalInvested) / summary.totalInvested * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-4 border-2 border-[#DC143C] bg-[#DC143C]/10">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#DC143C] mb-1">
                TOTAL PROFIT SHARE
              </div>
              <div className="text-2xl font-black text-[#DC143C]">
                ${summary.totalProfitShare.toFixed(0)}
              </div>
              <div className="text-xs font-black uppercase text-[#DC143C] mt-1">
                ${summary.monthlyProfitShare}/MO
              </div>
            </div>
            <div className="p-4 border-2 border-black bg-white">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                HOLDINGS
              </div>
              <div className="text-2xl font-black text-black">
                {summary.holdings}
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mt-1">
                PROJECTS
              </div>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2">
            {['HOLDINGS', 'DISTRIBUTIONS', 'ACTIVITY'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view.toLowerCase())}
                className={`px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  selectedView === view.toLowerCase()
                    ? 'bg-black text-white'
                    : 'text-black hover:bg-[#DC143C] hover:text-white border-2 border-black'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {selectedView === 'holdings' && (
          <div className="grid gap-6">
            {holdings.map((holding) => (
              <div key={holding.id} className="border-4 border-black bg-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Coffee className="w-5 h-5 text-[#DC143C]" />
                      <h3 className="text-xl font-black uppercase tracking-wider text-black">
                        {holding.name}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${
                        holding.status === 'Live' 
                          ? 'bg-[#DC143C] text-white' 
                          : 'bg-black text-white'
                      }`}>
                        {holding.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wide text-gray-600 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#DC143C]" />
                        {holding.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#DC143C]" />
                        {holding.investors} INVESTORS
                      </span>
                      {holding.status === 'Live' && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#DC143C]" />
                          OPENED {holding.openDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      TOKENS OWNED
                    </div>
                    <div className="font-black text-black">
                      {holding.tokens.toLocaleString()}
                    </div>
                    <div className="text-xs font-black uppercase text-gray-600">
                      ${holding.symbol}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      INVESTED
                    </div>
                    <div className="font-black text-black">
                      ${holding.invested.toLocaleString()}
                    </div>
                    <div className="text-xs font-black uppercase text-gray-600">
                      @${holding.presalePrice}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      CURRENT VALUE
                    </div>
                    <div className="font-black text-black">
                      ${holding.currentValue.toLocaleString()}
                    </div>
                    <div className={`text-xs font-black uppercase ${
                      holding.priceChange >= 0 ? 'text-[#DC143C]' : 'text-black'
                    }`}>
                      {holding.priceChange >= 0 ? '+' : ''}{holding.priceChange}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      DEX PRICE
                    </div>
                    <div className="font-black text-black">
                      ${holding.dexPrice}
                    </div>
                    <div className="text-xs font-black uppercase text-gray-600">
                      RAYDIUM
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-1">
                      PROFIT SHARE
                    </div>
                    <div className={`font-black ${
                      holding.profitShare > 0 ? 'text-[#DC143C]' : 'text-gray-400'
                    }`}>
                      {holding.profitShare > 0 ? `$${holding.profitShare}` : '—'}
                    </div>
                    <div className="text-xs font-black uppercase text-gray-600">
                      {holding.profitShareRate}% MONTHLY
                    </div>
                  </div>
                </div>

                {holding.status === 'Live' && (
                  <div className="mt-4 pt-4 border-t-2 border-black flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-wider text-gray-600">
                      STORE REVENUE: ${(holding.monthlyRevenue / 1000).toFixed(0)}K/MO
                    </div>
                    <a href={`/explorer/${holding.id}`} className="text-xs font-black uppercase tracking-[0.2em] text-[#DC143C] hover:text-black transition-colors flex items-center gap-1">
                      VIEW DETAILS <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedView === 'distributions' && (
          <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Profit Distributions
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {distributions.map((dist, i) => (
                <div key={i} className={`p-6 hover:${isDark ? 'bg-gray-800/30' : 'bg-gray-50'} transition-colors`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CircleDollarSign className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dist.project}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {dist.type} • {dist.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-emerald-500">
                        +${dist.amount}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        33% profit share
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'activity' && (
          <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Trading Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {trades.map((trade, i) => (
                <div key={i} className={`p-6 hover:${isDark ? 'bg-gray-800/30' : 'bg-gray-50'} transition-colors`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {trade.action === 'Buy' ? (
                        <ArrowDownRight className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {trade.action} {trade.project}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {trade.tokens} tokens @ ${trade.price} • {trade.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${trade.amount.toLocaleString()}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        Total
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        )}
      </main>
    </div>
  )
}
