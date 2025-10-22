"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { ChevronLeft, CheckCircle2, ArrowRight, Activity, BarChart3, TrendingUp, TrendingDown, Moon, Sun, Sparkles, Users, MapPin, Calendar, DollarSign, Target, TrendingUp as Trend, Building2, Coins, Coffee, Clock, Gift } from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"
import { usePrivy } from "@privy-io/react-auth"

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
      </div>
    </div>
  )
}

export default function ExplorerPremium() {
  const [projects, setProjects] = useState<Project[]>([])
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState("1000")
  const [isDark, setIsDark] = useState(false)
  const [recentTrades, setRecentTrades] = useState<any[]>([])
  const [solPrice, setSolPrice] = useState(142.38)
  const [solChange, setSolChange] = useState(2.4)
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [expandAnimation, setExpandAnimation] = useState(false)

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

  // Simulate SOL price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSolPrice(prev => prev + (Math.random() - 0.5) * 2)
      setSolChange(prev => prev + (Math.random() - 0.5) * 0.5)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const data = getAllProjects()
    setProjects(data)
  }, [])

  const handleProjectClick = (project: Project) => {
    setExpandAnimation(true)
    setTimeout(() => {
      setExpandedProject(project)
      setExpandAnimation(false)
    }, 100)
  }

  const handleBack = () => {
    setExpandAnimation(true)
    setTimeout(() => {
      setExpandedProject(null)
      setExpandAnimation(false)
    }, 100)
  }

  // Investment calculations based on tokenomics
  const investmentValue = parseFloat(investmentAmount) || 0
  const tokensReceived = investmentValue / 0.15 // $0.15 per token from tokenomics
  const ownershipPercentage = (tokensReceived / (expandedProject?.totalSupply || 100_000_000)) * 100

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} relative transition-colors pb-16`}>
      {/* Aurora Background */}
      <AuroraBackground isDark={isDark} />

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
                  $now.fun
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-1">
                {["Trade", "Portfolio", "Referrals", "Leaderboard"].map((item) => {
                  const isActive = item === "Trade"
                  return (
                    <a
                      key={item}
                      href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
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
        {/* If a project is expanded, show expanded view */}
        {expandedProject ? (
          <div className={`${expandAnimation ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'animate-in fade-in-0 slide-in-from-bottom-2'} duration-300`}>
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`mb-8 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back to all projects</span>
            </button>

            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Hero Card - Honest Approach */}
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
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
                            <MapPin className="w-3 h-3" />
                            {expandedProject.location}
                          </span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
                            <Calendar className="w-3 h-3" />
                            {expandedProject.opening}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right`}>
                      <div className="text-2xl font-bold text-emerald-500">
                        {expandedProject.revenueShare}%
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Profit Share</div>
                    </div>
                  </div>

                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-8`}>{expandedProject.description}</p>

                  {/* Funding Progress - The Main Focus */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/30 border border-gray-700' : 'bg-gray-50/70 border border-gray-200'} mb-6`}>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Funding Progress
                      </span>
                      <span className={`text-lg font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${expandedProject.raised.toLocaleString()} / ${expandedProject.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-500 relative" 
                           style={{ width: `${(expandedProject.raised / expandedProject.fundingGoal) * 100}%` }}
                      >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold">
                          {((expandedProject.raised / expandedProject.fundingGoal) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.investors || 89}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Investors</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          ${expandedProject.minInvestment}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Min. Investment</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {Math.ceil((expandedProject.fundingGoal - expandedProject.raised) / (expandedProject.raised / (expandedProject.investors || 89)))}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Spots Left</div>
                      </div>
                    </div>
                  </div>

                  {/* What You Get */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Coins className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-500'} mx-auto mb-2`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {expandedProject.revenueShare}% Profit Share
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Monthly distributions
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Gift className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-500'} mx-auto mb-2`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        Customer Rewards
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Free coffee & perks
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Users className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-500'} mx-auto mb-2`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        Governance
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Vote on decisions
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Journey */}
                <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-6`}>
                  <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>The Journey</h3>
                  
                  <div className="space-y-4">
                    {[
                      { phase: 'Phase 1', title: 'Token Presale', status: 'active', desc: `Raise $${(expandedProject.fundingGoal/1000).toFixed(0)}k at $0.15 per token`, progress: (expandedProject.raised / expandedProject.fundingGoal) * 100 },
                      { phase: 'Phase 2', title: 'Launch on DEX', status: 'upcoming', desc: 'Add liquidity, enable trading on Raydium/Orca', progress: 0 },
                      { phase: 'Phase 3', title: 'Build Store', status: 'upcoming', desc: 'Secure location, construct, hire team', progress: 0 },
                      { phase: 'Phase 4', title: 'Open & Operate', status: 'upcoming', desc: 'Grand opening, start operations', progress: 0 },
                      { phase: 'Phase 5', title: 'Profit Distribution', status: 'upcoming', desc: '33% monthly profits to all token holders', progress: 0 }
                    ].map((item, i) => (
                      <div key={i} className={`flex items-start gap-4 ${item.status === 'active' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === 'active' 
                            ? 'bg-emerald-500 text-white' 
                            : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {item.status === 'active' ? (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          ) : i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.phase}</span>
                            {item.status === 'active' && <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-500 rounded">In Progress</span>}
                          </div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</div>
                          {item.progress > 0 && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How The Token Works */}
                <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-6`}>
                  <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>How The Token Works</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Token Allocation</h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Presale', value: expandedProject.tokenomics.presale, desc: 'Raise capital ($0.15)' },
                          { label: 'DEX Liquidity', value: expandedProject.tokenomics.liquidity, desc: 'Trading on Raydium' },
                          { label: 'Rewards', value: expandedProject.rewards || 25, desc: 'Customer loyalty' },
                          { label: 'Treasury', value: expandedProject.tokenomics.treasury, desc: 'Operations' },
                          { label: 'Team', value: expandedProject.tokenomics.team, desc: '24-month vesting' }
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between">
                            <div>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                              <span className={`text-xs block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</span>
                            </div>
                            <span className={`text-sm font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Token Benefits</h4>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'}`}>
                        <div className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-3`}>DUAL EARNING POTENTIAL</div>
                        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-3`}>
                          <div>
                            <div className="font-medium mb-1">1. Token Trading</div>
                            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              • Buy at $0.15 presale<br/>
                              • Trade on DEX after launch<br/>
                              • Price discovery by market
                            </div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">2. Profit Sharing</div>
                            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              • {expandedProject.revenueShare}% of store profits<br/>
                              • Monthly distributions<br/>
                              • Forever, as long as you hold
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Promise */}
                <div className={`rounded-xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/30 bg-emerald-50'} p-6`}>
                  <div className={`text-lg font-serif font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Our Promise
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    We're not promising specific returns or guaranteed profits. We're promising to work hard, be transparent, 
                    and share 33% of whatever profits we make with our token holders. If we succeed, we all succeed together.
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="sticky top-[113px] space-y-6">
                  {/* Investment Calculator */}
                  <div className={`rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-6`}>
                    <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Invest Now</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>Investment Amount (USD)</label>
                        <div className="relative">
                          <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>$</span>
                          <input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            className={`w-full pl-8 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white/50 border-gray-300'} backdrop-blur-sm focus:ring-2 focus:ring-emerald-500`}
                            placeholder="1000"
                          />
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} backdrop-blur-sm space-y-3`}>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tokens You'll Get</span>
                          <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {tokensReceived.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Your Ownership</span>
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {ownershipPercentage.toFixed(6)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Token Price</span>
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            $0.15
                          </span>
                        </div>
                        <div className="pt-3 border-t border-gray-700/50">
                          <div className="text-center">
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>You'll receive</div>
                            <div className="text-2xl font-mono font-bold text-emerald-500">
                              {expandedProject.revenueShare}%
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-2`}>of monthly profits</div>
                            <div className={`text-xs ${isDark ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>
                              + Token tradeable on DEX
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className={`w-full py-3.5 ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2`}>
                        Invest ${investmentAmount || '0'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} text-center`}>
                        Minimum investment: ${expandedProject.minInvestment}
                      </p>
                    </div>
                  </div>

                  {/* Trust Factors */}
                  <div className={`rounded-xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm p-4`}>
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Why Trust Us?</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Founder investing $50k personally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>5-year commitment to operate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly transparency reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Smart contract secured funds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Projects Grid - Honest Cards */}
            <div className="grid grid-cols-3 gap-6">
              {projects.map((project: any) => {
                const Icon = getProjectIcon(project.category)
                const fundingPercent = (project.raised / project.fundingGoal) * 100
                
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className={`group rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30 hover:bg-gray-800/50' : 'border-gray-200 bg-white/70 hover:bg-white/90'} backdrop-blur-sm transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl ${
                      expandAnimation ? 'animate-out fade-out-0 slide-out-to-top-2' : ''
                    }`}
                  >
                    <div className="p-6">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-500">{project.revenueShare}%</div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Profit Share</div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
                          <Clock className="w-3 h-3" />
                          {project.opening}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                        {project.description}
                      </p>

                      {/* Funding Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-2">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ${(project.raised / 1000).toFixed(0)}k raised
                          </span>
                          <span className={`${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            of ${(project.fundingGoal / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500 relative" 
                               style={{ width: `${fundingPercent}%` }}
                          >
                            {fundingPercent > 20 && (
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-white font-bold">
                                {fundingPercent.toFixed(0)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Key Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} text-center`}>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Min. Investment</div>
                          <div className={`text-sm font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ${project.minInvestment}
                          </div>
                        </div>
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/70'} text-center`}>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Investors</div>
                          <div className={`text-sm font-mono font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {project.investors || 89}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className={`px-6 py-3 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'} flex items-center justify-between`}>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.status === 'presale' 
                          ? `${Math.ceil((project.fundingGoal - project.raised) / (project.minInvestment || 100))} spots left`
                          : 'Coming soon'}
                      </div>
                      <span className={`text-xs px-2 py-0.5 ${
                        project.status === 'presale' 
                          ? 'bg-emerald-500/20 text-emerald-500' 
                          : 'bg-amber-500/20 text-amber-500'
                      } rounded font-medium`}>
                        {project.status === 'presale' ? 'Open' : project.status === 'funded' ? 'Funded' : 'Soon'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>

      {/* Fixed Bottom Stats Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Solana Price */}
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'
                }`}>
                  <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>◎</span>
                </div>
                <div>
                  <div className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${solPrice.toFixed(2)}
                  </div>
                  <div className={`text-xs ${solChange > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {solChange > 0 ? '+' : ''}{solChange.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-8 w-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

              {/* Active Projects */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Projects</div>
                  <div className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{projects.length} Live</div>
                </div>
              </div>

              {/* Total Raised */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Total Raised</div>
                  <div className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${((projects.reduce((acc, p) => acc + p.raised, 0) || 0) / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>

              {/* Total Investors */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Investors</div>
                  <div className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {projects.reduce((acc, p) => acc + (p.investors || 89), 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Network:</span>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Solana</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
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