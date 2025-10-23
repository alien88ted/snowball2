"use client"

import { useState, useEffect } from "react"
import { 
  Moon, Sun, ArrowUpRight, ArrowDownRight, MoreVertical, 
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
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} relative transition-colors`}>
      {/* Background Effects */}
      <FloatingDollars isDark={isDark} />
      <AuroraOrbs isDark={isDark} />

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
                  REBIRTH
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-1">
                {["Portfolio"].map((item) => {
                  const isActive = item === "Portfolio"
                  return (
                    <a
                      key={item}
                      href={`/${item.toLowerCase()}`}
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
              {ready && authenticated && showContent ? (
                <>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-mono`}>
                    {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border ${
                      isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                    } transition-all`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                !isLoading && (
                  <button
                    onClick={handleConnect}
                    disabled={!ready}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                      isDark
                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg hover:shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Connect Wallet
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
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
                } backdrop-blur-sm`}>
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Secure Portfolio Access
                  </span>
                </div>

                <h1 className={`text-5xl md:text-6xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                  Track Your<br />
                  <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Investment Portfolio
                  </span>
                </h1>

                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                  Connect your wallet to view your tokenized store holdings, profit distributions, and trading activity all in one place.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleConnect}
                disabled={!ready}
                className={`group relative px-8 py-4 text-lg font-semibold rounded-2xl transition-all transform hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-2xl shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  Connect Wallet to View Portfolio
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {/* Preview Cards - Blurred */}
              <div className="grid md:grid-cols-3 gap-4 mt-16">
                {[
                  { icon: TrendingUp, label: 'Total Value', value: '$41.2k' },
                  { icon: CircleDollarSign, label: 'Profit Share', value: '$1.4k' },
                  { icon: Target, label: 'Holdings', value: '4 Projects' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`relative p-6 rounded-2xl backdrop-blur-sm ${
                      isDark ? 'bg-gray-900/30 border border-gray-800' : 'bg-white/50 border border-gray-200'
                    }`}
                    style={{
                      animationDelay: `${i * 100}ms`,
                      filter: 'blur(4px)',
                      opacity: 0.6
                    }}
                  >
                    <item.icon className={`w-8 h-8 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                      {item.label}
                    </div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className={`pt-8 flex items-center justify-center gap-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Profit distributions</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Performance analytics</span>
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
        {/* Portfolio Summary */}
        <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-8 mb-6`}>
          <h1 className={`text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Your Portfolio
          </h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Total Invested
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ${(summary.totalInvested / 1000).toFixed(1)}k
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Current Value
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ${(summary.currentValue / 1000).toFixed(1)}k
              </div>
              <div className={`text-xs ${
                summary.currentValue > summary.totalInvested ? 'text-emerald-500' : 'text-red-500'
              } mt-1`}>
                {summary.currentValue > summary.totalInvested ? '+' : ''}
                {((summary.currentValue - summary.totalInvested) / summary.totalInvested * 100).toFixed(1)}%
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
              <div className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>
                Total Profit Share
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ${summary.totalProfitShare.toFixed(0)}
              </div>
              <div className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mt-1`}>
                ${summary.monthlyProfitShare}/mo
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Holdings
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {summary.holdings}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                Projects
              </div>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2">
            {['holdings', 'distributions', 'activity'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                  selectedView === view
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                    : isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {selectedView === 'holdings' && (
          <div className="grid gap-4">
            {holdings.map((holding) => (
              <div key={holding.id} className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Coffee className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {holding.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        holding.status === 'Live' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {holding.status}
                      </span>
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-4`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {holding.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {holding.investors} investors
                      </span>
                      {holding.status === 'Live' && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Opened {holding.openDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                    <MoreVertical className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                      Tokens Owned
                    </div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {holding.tokens.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      ${holding.symbol}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                      Invested
                    </div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${holding.invested.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      @${holding.presalePrice}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                      Current Value
                    </div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${holding.currentValue.toLocaleString()}
                    </div>
                    <div className={`text-xs ${
                      holding.priceChange >= 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {holding.priceChange >= 0 ? '+' : ''}{holding.priceChange}%
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                      DEX Price
                    </div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${holding.dexPrice}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      Raydium
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                      Profit Share
                    </div>
                    <div className={`font-medium ${
                      holding.profitShare > 0 ? 'text-emerald-500' : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {holding.profitShare > 0 ? `$${holding.profitShare}` : '—'}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      {holding.profitShareRate}% monthly
                    </div>
                  </div>
                </div>

                {holding.status === 'Live' && (
                  <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between`}>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Store Revenue: ${(holding.monthlyRevenue / 1000).toFixed(0)}k/mo
                    </div>
                    <a href={`/explorer/${holding.id}`} className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                      View Details <ChevronRight className="w-3 h-3" />
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
