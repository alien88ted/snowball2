"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { ChevronLeft, CheckCircle2, ArrowRight, Activity, BarChart3, TrendingUp, TrendingDown, Moon, Sun, Sparkles, Users, MapPin, Calendar, DollarSign, Target, TrendingUp as Trend, Building2, Coins, Coffee, Clock, Gift, Globe, Vote, Rocket, Shield, Wallet } from "lucide-react"
import { getAllProjects, type Project, type Franchise } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"
import { usePrivy } from "@privy-io/react-auth"

// Brutalist Paper Background Component - REBIRTH Edition
function BrutalistBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Paper texture base */}
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
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC143C]/[0.03] to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-black/[0.02] to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '3s' }}
        />
      </div>
      
      {/* Halftone pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
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
        token: ['$COFFEE', '$FASHION', '$FOOD', '$LOCAL'][Math.floor(Math.random() * 4)],
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
    <div className="min-h-screen bg-[#FAF8F5] relative transition-colors pb-16">
      {/* Brutalist Background */}
      <BrutalistBackground isDark={isDark} />

      {/* Header - REBIRTH Brutalist Style */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-12">
              <a href="/" className="group">
                <span className="text-3xl font-black font-serif text-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                  REBIRTH
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              {ready && authenticated ? (
                <>
                  {/* Combined Wallet/Portfolio Button - Brutalist */}
                  <div className="group relative flex items-center gap-3 px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200">
                    <Wallet className="h-4 w-4" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider">
                      {user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4) || user?.email?.address}
                    </span>
                    <div className="h-4 w-[1px] bg-black group-hover:bg-white" />
                    <a 
                      href="/portfolio" 
                      className="text-[11px] font-black uppercase tracking-wider hover:text-[#DC143C] transition-colors"
                    >
                      Portfolio
                    </a>
                    <div className="h-4 w-[1px] bg-black group-hover:bg-white" />
                    <button
                      onClick={logout}
                      className="text-[11px] font-black uppercase tracking-wider hover:text-[#DC143C] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={login}
                  disabled={!ready}
                  className="group relative px-6 py-3 bg-[#DC143C] text-white font-black text-[12px] uppercase tracking-[0.2em] hover:bg-black transition-all duration-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Connect Wallet
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Recent Trades Ticker - REBIRTH Brutalist */}
      <div className="sticky top-[73px] z-40 bg-black border-b-2 border-[#DC143C]">
        <div className="relative h-10 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center h-full animate-scroll-left">
            <div className="flex items-center gap-8 px-6 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#DC143C] animate-pulse" />
                <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#DC143C]">REBIRTH CHAIN</span>
              </div>
              
              {/* Double the trades for continuous scroll */}
              {[...recentTrades, ...recentTrades].map((trade, i) => (
                <div key={`${trade.id}-${i}`} className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-[#DC143C]" />
                  <span className="text-xs font-mono text-gray-400 uppercase">
                    {trade.address}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-wider ${trade.type === 'buy' ? 'text-white' : 'text-[#DC143C]'}`}>
                    {trade.type === 'buy' ? 'BOUGHT' : 'SOLD'}
                  </span>
                  <span className="text-xs font-black text-white">
                    ${trade.amount}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#DC143C] font-black">
                    {trade.token}
                  </span>
                  <span className="text-xs text-gray-500 uppercase">
                    {trade.time} AGO
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 pb-20 sm:pb-16">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="col-span-1 lg:col-span-2 space-y-6">
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
                      <div className="text-2xl font-bold" style={{ color: '#DC143C' }}>
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
                      <div className="h-3 rounded-full transition-all duration-500 relative" style={{ background: 'linear-gradient(to right, #DC143C, #FF1744)', width: `${(expandedProject.raised / expandedProject.fundingGoal) * 100}%` }}
                      >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold">
                          {((expandedProject.raised / expandedProject.fundingGoal) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Coins className={`w-6 h-6 ${isDark ? 'text-[#FF4444]' : 'text-[#DC143C]'} mx-auto mb-2`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {expandedProject.revenueShare}% Profit Share
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Monthly distributions
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Gift className={`w-6 h-6 ${isDark ? 'text-[#FF4444]' : 'text-[#DC143C]'} mx-auto mb-2`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        Customer Rewards
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Free coffee & perks
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50/70'} border text-center`}>
                      <Users className={`w-6 h-6 ${isDark ? 'text-[#FF4444]' : 'text-[#DC143C]'} mx-auto mb-2`} />
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
                            ? 'bg-[#DC143C] text-white' 
                            : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {item.status === 'active' ? (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          ) : i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.phase}</span>
                            {item.status === 'active' && <span className="text-xs px-2 py-0.5 bg-[#DC143C]/20 text-[#DC143C] rounded">In Progress</span>}
                          </div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</div>
                          {item.progress > 0 && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                <div className="bg-[#DC143C] h-1 rounded-full" style={{ width: `${item.progress}%` }} />
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className={`text-xs font-medium ${isDark ? 'text-[#FF4444]' : 'text-[#B01030]'} mb-3`}>DUAL EARNING POTENTIAL</div>
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

                {/* Franchise System - Enhanced Clean Design */}
                {expandedProject.franchiseEnabled && (
                  <div className={`relative rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-white/70'} backdrop-blur-sm overflow-hidden`}>
                    {/* Subtle gradient header */}
                    <div className={`px-6 pt-6 pb-4 ${isDark ? 'bg-gradient-to-b from-gray-800/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-transparent'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                            <h3 className={`text-lg font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Franchise Expansion
                            </h3>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Bring {expandedProject.name} to your city
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                          isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          FRANCHISE
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {/* Revenue Model - Visual Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className={`relative p-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-[#DC143C]/10 to-emerald-500/5 border border-[#DC143C]/20' : 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200'}`}>
                          <div className={`text-xs font-medium ${isDark ? 'text-[#FF4444]' : 'text-[#8B0000]'} mb-1`}>
                            You Keep
                          </div>
                          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {90 - (expandedProject.parentRevShare || 10)}%
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            of net profits
                          </div>
                        </div>
                        
                        <div className={`relative p-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200'}`}>
                          <div className={`text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-700'} mb-1`}>
                            Parent Gets
                          </div>
                          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {expandedProject.parentRevShare || 10}%
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            revenue share
                          </div>
                        </div>
                      </div>

                      {/* CTA Section */}
                      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} mb-4`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                              Ready to expand globally?
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Join our franchise network today
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-xs ${isDark ? 'text-[#FF4444]' : 'text-[#B01030]'} font-medium`}>
                              ✓ Proven model
                            </span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              ✓ Full support
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => window.location.href = `/franchise/apply?parent=${expandedProject.symbol}`}
                          className={`w-full py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] ${
                            isDark 
                              ? 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg' 
                              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                          }`}
                        >
                          Start Franchise Application →
                        </button>
                      </div>

                      {/* Franchise List or Empty State */}
                      {expandedProject.franchises && expandedProject.franchises.length > 0 ? (
                        <div className="space-y-3">
                          <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                            Active Franchises
                          </h4>
                          {expandedProject.franchises.map((franchise: Franchise) => (
                            <div
                              key={franchise.id}
                              className={`relative p-4 rounded-xl transition-all hover:shadow-md cursor-pointer group ${
                                isDark ? 'bg-gray-900/30 hover:bg-gray-900/50' : 'bg-white hover:bg-gray-50'
                              } border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                      {franchise.name || `${expandedProject.name} ${franchise.location}`}
                                    </h4>
                                    {franchise.status === 'voting' && (
                                      <span className="px-2 py-0.5 text-[10px] bg-blue-500/10 text-blue-500 rounded font-bold">
                                        VOTING
                                      </span>
                                    )}
                                    {franchise.status === 'approved' && (
                                      <span className="px-2 py-0.5 text-[10px] bg-[#DC143C]/10 text-[#DC143C] rounded font-bold">
                                        APPROVED
                                      </span>
                                    )}
                                    {franchise.status === 'live' && (
                                      <span className="px-2 py-0.5 text-[10px] bg-green-500/10 text-green-500 rounded font-bold animate-pulse">
                                        LIVE
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs">
                                    <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
                                      <MapPin className="w-3 h-3" />
                                      {franchise.location}
                                    </span>
                                    {franchise.opening && (
                                      <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
                                        <Calendar className="w-3 h-3" />
                                        {franchise.opening}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className={`px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    ${(franchise.fundingGoal / 1000).toFixed(0)}k
                                  </div>
                                  <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                    Target
                                  </div>
                                </div>
                              </div>
                              
                              {franchise.description && (
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                                  {franchise.description}
                                </p>
                              )}
                              
                              {/* Progress Bar */}
                              {(franchise.status === 'approved' || franchise.status === 'live') && (
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Funding</span>
                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                      ${(franchise.raised / 1000).toFixed(0)}k / ${(franchise.fundingGoal / 1000).toFixed(0)}k
                                    </span>
                                  </div>
                                  <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                                    <div 
                                      className="bg-gradient-to-r from-[#DC143C] to-[#FF1744] h-2 rounded-full transition-all group-hover:shadow-lg" 
                                      style={{ width: `${(franchise.raised / franchise.fundingGoal) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Voting Status */}
                              {franchise.status === 'voting' && franchise.votes && (
                                <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'} mt-3`}>
                                  <div className="flex items-center gap-4">
                                    <div>
                                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>Yes</p>
                                      <p className={`font-mono font-bold text-[#DC143C]`}>
                                        {franchise.votes.yes.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-1`}>No</p>
                                      <p className={`font-mono font-bold text-red-500`}>
                                        {franchise.votes.no.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <button className={`px-3 py-1.5 text-xs rounded-full ${isDark ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'} transition-colors font-medium flex items-center gap-1`}>
                                    <Vote className="w-3 h-3" />
                                    Vote
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30' : 'bg-gradient-to-br from-gray-50 to-white'} p-6`}>
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                            <Globe className="w-full h-full text-blue-500" />
                          </div>
                          
                          <div className="relative">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                                <Globe className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                                  No Active Franchises
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                                  Be a pioneer! Expand {expandedProject.name} to your city and join the global network.
                                </p>
                                <div className={`inline-flex items-center gap-4 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    First mover advantage
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Full support
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* The Promise */}
                <div className={`rounded-xl border ${isDark ? 'border-[#DC143C]/20 bg-[#DC143C]/5' : 'border-[#DC143C]/30 bg-emerald-50'} p-6`}>
                  <div className={`text-lg font-serif font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Our Promise
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    We're not promising specific returns or guaranteed profits. We're promising to work hard, be transparent, 
                    and share {expandedProject.revenueShare}% of whatever profits we make with our token holders. If we succeed, we all succeed together.
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-1 space-y-6">
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
                            <div className="text-2xl font-mono font-bold text-[#DC143C]">
                              {expandedProject.revenueShare}%
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-2`}>of monthly profits</div>
                            <div className={`text-xs ${isDark ? 'text-[#FF4444]/60' : 'text-[#B01030]/60'}`}>
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
                        <CheckCircle2 className="w-3 h-3 text-[#DC143C] flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Founder investing $50k personally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#DC143C] flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>5-year commitment to operate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#DC143C] flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly transparency reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#DC143C] flex-shrink-0" />
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
            {/* Projects Grid - REBIRTH Brutalist Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Real Projects First */}
              {projects.map((project: any) => {
                const Icon = getProjectIcon(project.category)
                const fundingPercent = (project.raised / project.fundingGoal) * 100
                
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className={`group border-4 border-black bg-white hover:bg-[#DC143C] hover:text-white transition-all cursor-pointer ${
                      expandAnimation ? 'animate-out fade-out-0 slide-out-to-top-2' : ''
                    }`}
                  >
                    <div className="p-6">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 border-2 border-black group-hover:border-white bg-[#DC143C] group-hover:bg-white flex items-center justify-center transition-all">
                            <Icon className="w-6 h-6 text-white group-hover:text-[#DC143C]" />
                          </div>
                          {project.franchiseEnabled && (
                            <div className="px-2 py-1 bg-black group-hover:bg-white text-white group-hover:text-black flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              <span className="text-[10px] font-black uppercase tracking-wider">FRANCHISE</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-[#DC143C] group-hover:text-white">{project.revenueShare}%</div>
                          <div className="text-xs uppercase tracking-wider font-black text-gray-600 group-hover:text-white/80">Profit Share</div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <h3 className="text-xl font-black uppercase tracking-wider text-black group-hover:text-white mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-gray-600 group-hover:text-white/80 flex items-center gap-1 uppercase">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </span>
                        <span className="text-xs text-gray-600 group-hover:text-white/80 flex items-center gap-1 uppercase">
                          <Clock className="w-3 h-3" />
                          {project.opening}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 group-hover:text-white/90 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Funding Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-black uppercase text-black group-hover:text-white">
                            ${(project.raised / 1000).toFixed(0)}K RAISED
                          </span>
                          <span className="text-gray-600 group-hover:text-white/80 uppercase">
                            OF ${(project.fundingGoal / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 group-hover:bg-white/20 h-2 border border-black group-hover:border-white">
                          <div className="bg-[#DC143C] group-hover:bg-white h-full transition-all duration-500 relative" 
                               style={{ width: `${fundingPercent}%` }}
                          >
                            {fundingPercent > 20 && (
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-white group-hover:text-[#DC143C] font-black">
                                {fundingPercent.toFixed(0)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Key Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 border-2 border-black group-hover:border-white bg-white group-hover:bg-transparent text-center">
                          <div className="text-[10px] uppercase tracking-wider font-black text-gray-600 group-hover:text-white/80">MIN. INVEST</div>
                          <div className="text-sm font-mono font-black text-black group-hover:text-white">
                            ${project.minInvestment}
                          </div>
                        </div>
                        <div className="p-2 border-2 border-black group-hover:border-white bg-white group-hover:bg-transparent text-center">
                          <div className="text-[10px] uppercase tracking-wider font-black text-gray-600 group-hover:text-white/80">INVESTORS</div>
                          <div className="text-sm font-mono font-black text-black group-hover:text-white">
                            {project.investors || 89}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 py-3 border-t-2 border-black group-hover:border-white flex items-center justify-between">
                      <div className="text-xs uppercase font-black tracking-wider text-gray-600 group-hover:text-white/80">
                        {project.status === 'presale' 
                          ? `${Math.ceil((project.fundingGoal - project.raised) / (project.minInvestment || 100))} SPOTS LEFT`
                          : 'COMING SOON'}
                      </div>
                      <span className={`text-xs px-2 py-1 font-black uppercase tracking-wider ${
                        project.status === 'presale' 
                          ? 'bg-[#DC143C] text-white' 
                          : 'bg-black text-white group-hover:bg-white group-hover:text-black'
                      }`}>
                        {project.status === 'presale' ? 'OPEN' : project.status === 'funded' ? 'FUNDED' : 'SOON'}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Launch Your Project Card - Second */}
              <div
                onClick={() => window.location.href = '/franchise/apply'}
                className="group border-4 border-dashed border-black hover:border-solid bg-white hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4 py-8">
                    <div className="w-16 h-16 border-2 border-black group-hover:border-white bg-[#DC143C] group-hover:bg-white flex items-center justify-center transition-all">
                      <Sparkles className="w-8 h-8 text-white group-hover:text-[#DC143C]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wider text-black group-hover:text-white mb-2">
                        LAUNCH YOUR PROJECT
                      </h3>
                      <p className="text-sm text-gray-700 group-hover:text-white/90 mb-4 leading-relaxed">
                        Have a business idea? Get funded by the community. We help you tokenize and launch.
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 group-hover:text-white/80 flex items-center justify-center gap-2 uppercase font-black tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-[#DC143C] group-hover:text-white" />
                          67% OWNERSHIP
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-white/80 flex items-center justify-center gap-2 uppercase font-black tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-[#DC143C] group-hover:text-white" />
                          COMMUNITY FUNDING
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-white/80 flex items-center justify-center gap-2 uppercase font-black tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-[#DC143C] group-hover:text-white" />
                          SMART CONTRACT
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-[#DC143C] group-hover:bg-white text-white group-hover:text-black hover:scale-105 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                      APPLY NOW
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Single Coming Soon Card - Last */}
              <div
                className="group border-4 border-black bg-gray-100 transition-all relative overflow-hidden opacity-60"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 border-2 border-black bg-gray-300 flex items-center justify-center animate-pulse">
                      <Clock className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs px-2 py-1 bg-black text-white font-black uppercase tracking-wider">
                      SOON
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase tracking-wider text-gray-500 mb-2">
                    COMING SOON
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-gray-300 border border-black animate-pulse" />
                    <div className="h-2 w-3/4 bg-gray-300 border border-black animate-pulse" />
                  </div>
                  
                  <div className="pt-4 border-t-2 border-black">
                    <p className="text-xs text-gray-600 text-center font-black uppercase tracking-wider">
                      NEW PROJECTS MONTHLY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Fixed Bottom Stats Bar - REBIRTH Brutalist */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t-4 border-[#DC143C] hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Solana Price */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#DC143C] flex items-center justify-center">
                  <span className="text-xs font-black text-white">◎</span>
                </div>
                <div>
                  <div className="text-sm font-mono font-black text-white uppercase">
                    ${solPrice.toFixed(2)}
                  </div>
                  <div className={`text-xs font-black uppercase ${solChange > 0 ? 'text-[#DC143C]' : 'text-white/60'}`}>
                    {solChange > 0 ? '+' : ''}{solChange.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-[2px] bg-[#DC143C]" />

              {/* Active Projects */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#DC143C]" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-black tracking-wider">PROJECTS</div>
                  <div className="text-sm font-mono font-black text-white">{projects.length} LIVE</div>
                </div>
              </div>

              {/* Total Raised */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#DC143C]" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-black tracking-wider">RAISED</div>
                  <div className="text-sm font-mono font-black text-white">
                    ${((projects.reduce((acc, p) => acc + p.raised, 0) || 0) / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>

              {/* Total Investors */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DC143C]" />
                <div>
                  <div className="text-xs text-gray-400 uppercase font-black tracking-wider">INVESTORS</div>
                  <div className="text-sm font-mono font-black text-white">
                    {projects.reduce((acc, p) => acc + (p.investors || 89), 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase font-black tracking-wider">NETWORK:</span>
              <span className="text-xs font-black uppercase text-[#DC143C]">REBIRTH CHAIN</span>
              <div className="w-2 h-2 bg-[#DC143C] rounded-full animate-pulse" />
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