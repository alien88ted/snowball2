"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, TrendingUp, TrendingDown, Activity, DollarSign, Wallet, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, Sparkles, ArrowRight } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Aurora Background Component - Premium Version
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

export default function PortfolioPremium() {
  const [isDark, setIsDark] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W')
  const [portfolio, setPortfolio] = useState({
    totalValue: 45678.90,
    totalChange: 12.5,
    totalChangeAmount: 5078.90
  })
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Mock holdings data
  const holdings = [
    {
      id: 1,
      name: "$COFFEE",
      symbol: "COFFEE",
      balance: 1250.5,
      value: 12567.45,
      change: 15.2,
      price: 10.05,
      allocation: 27.5
    },
    {
      id: 2,
      name: "$MARKET",
      symbol: "MARKET",
      balance: 890.0,
      value: 8901.23,
      change: -3.4,
      price: 10.00,
      allocation: 19.5
    },
    {
      id: 3,
      name: "$FASHION",
      symbol: "FASHION",
      balance: 2100.0,
      value: 15678.90,
      change: 8.7,
      price: 7.47,
      allocation: 34.3
    },
    {
      id: 4,
      name: "$FOOD",
      symbol: "FOOD",
      balance: 450.75,
      value: 8531.32,
      change: 22.1,
      price: 18.93,
      allocation: 18.7
    }
  ]

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      type: 'buy',
      token: '$COFFEE',
      amount: 250,
      value: 2512.50,
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'sell',
      token: '$MARKET',
      amount: 100,
      value: 1000.00,
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'buy',
      token: '$FASHION',
      amount: 500,
      value: 3735.00,
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'receive',
      token: '$FOOD',
      amount: 50,
      value: 946.50,
      time: '2 days ago'
    }
  ]

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
        {/* Portfolio Header */}
        <div className={`rounded-3xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-serif font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Your Portfolio
              </h1>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Track your investments across all $NOW stores
              </p>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', 'ALL'].map((timeframe) => (
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

          {/* Total Value */}
          <div className="flex items-baseline gap-6 mb-6">
            <div className={`text-5xl font-serif font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center gap-2 text-lg font-medium ${portfolio.totalChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {portfolio.totalChange >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              {Math.abs(portfolio.totalChange)}%
              <span className="text-sm">
                (${Math.abs(portfolio.totalChangeAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Invested', value: '$38,500', change: '+12.5%' },
              { label: 'Total Returns', value: '$7,178.90', change: '+18.6%' },
              { label: 'Best Performer', value: '$FOOD', change: '+22.1%' },
              { label: 'Holdings', value: '4 Tokens', change: null }
            ].map((stat) => (
              <div key={stat.label} className={`p-4 rounded-xl ${
                isDark 
                  ? 'bg-slate-800/30 border border-purple-500/10' 
                  : 'bg-purple-50/30 border border-purple-200/20'
              } backdrop-blur-sm`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                {stat.change && (
                  <div className="text-xs text-emerald-400 mt-1">{stat.change}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Holdings */}
          <div className="col-span-2">
            <div className={`rounded-2xl border ${
              isDark 
                ? 'border-purple-500/20 bg-slate-900/40' 
                : 'border-purple-200/30 bg-white/60'
            } backdrop-blur-xl shadow-xl`}>
              <div className="p-6 border-b border-purple-500/10">
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Holdings
                </h2>
              </div>
              
              <div className="divide-y divide-purple-500/10">
                {holdings.map((holding) => (
                  <div key={holding.id} className="p-6 hover:bg-purple-500/5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${
                          isDark 
                            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20' 
                            : 'bg-gradient-to-br from-purple-100 to-blue-100'
                        } backdrop-blur-sm flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                            ${holding.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {holding.name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {holding.balance.toLocaleString()} tokens
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          ${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className={`text-sm flex items-center justify-end gap-1 ${
                          holding.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {holding.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(holding.change)}%
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          ${holding.price.toFixed(2)} / token
                        </div>
                        <div className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                          {holding.allocation}% of portfolio
                        </div>
                      </div>

                      <button className={`p-2 rounded-lg ${
                        isDark ? 'hover:bg-slate-800/50' : 'hover:bg-purple-50'
                      } transition-all`}>
                        <MoreVertical className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-2xl border ${
            isDark 
              ? 'border-purple-500/20 bg-slate-900/40' 
              : 'border-purple-200/30 bg-white/60'
          } backdrop-blur-xl shadow-xl h-fit`}>
            <div className="p-6 border-b border-purple-500/10">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Recent Activity
              </h2>
            </div>
            
            <div className="divide-y divide-purple-500/10">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'buy' 
                          ? 'bg-emerald-500/10' 
                          : activity.type === 'sell'
                          ? 'bg-rose-500/10'
                          : 'bg-blue-500/10'
                      }`}>
                        {activity.type === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : activity.type === 'sell' ? (
                          <ArrowDownRight className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Wallet className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {activity.type === 'buy' ? 'Bought' : activity.type === 'sell' ? 'Sold' : 'Received'} {activity.token}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ${activity.value.toLocaleString()}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                        {activity.amount} tokens
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-purple-500/10">
              <button className={`w-full text-sm font-medium ${
                isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
              } transition-all`}>
                View All Activity →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
