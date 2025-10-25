"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowLeft, MapPin, Calendar, TrendingUp, Users, Coins, Clock, 
  Copy, Check, Shield, Wallet, Activity, Circle, Square, X,
  CheckCircle2, DollarSign, Zap, ArrowUpRight, ChevronRight, Dot
} from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { usePresale } from "@/hooks/use-presale"
import { usePrivy } from "@privy-io/react-auth"

interface ProjectDetailMatchedProps {
  project: Project
}

export function ProjectDetailMatched({ project }: ProjectDetailMatchedProps) {
  const [mounted, setMounted] = useState(false)
  const { data: presaleData, loading } = usePresale(project.id, project.presaleAddress)
  const [copied, setCopied] = useState(false)
  const [investAmount, setInvestAmount] = useState(1)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const { ready, authenticated, user, login, logout } = usePrivy()

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate metrics
  const actualRaised = presaleData?.currentBalance?.totalUSD || presaleData?.raised || 0
  const progressPercentage = actualRaised > 0 ? (actualRaised / project.fundingGoal) * 100 : 0
  const contributors = presaleData?.contributors || 0
  const tokensReceived = investAmount / project.price
  const daysLeft = Math.ceil((new Date('2025-01-01').getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Background Pattern - matching explorer */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/paper-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92" />
      </div>

      {/* Split Screen Layout */}
      <div className="flex h-screen relative z-10">
        {/* Left Side - Investment Panel - REBIRTH Brutalist Style */}
        <div className="w-[480px] bg-black text-white h-screen fixed left-0 top-0 overflow-y-auto border-r-8 border-[#DC143C]">
          {/* Header */}
          <div className="p-8 border-b-4 border-[#DC143C]">
            <Link href="/explorer" className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-black uppercase tracking-wider mb-8">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              BACK TO EXPLORER
            </Link>
            
            <div className="space-y-6">
              <div>
                <div className="text-6xl font-black uppercase">${Math.floor(actualRaised / 1000)}K</div>
                <div className="text-white/60 text-xs font-black uppercase tracking-wider mt-2">
                  RAISED OF ${project.fundingGoal / 1000}K TARGET
                </div>
              </div>
              
              {/* Live Status */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC143C] rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider">PRESALE LIVE</span>
              </div>
            </div>
          </div>

          {/* Stats Grid - Brutalist */}
          <div className="p-8 grid grid-cols-2 gap-4 border-b-4 border-[#DC143C]">
            <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all">
              <div className="text-3xl font-black">{contributors}</div>
              <div className="text-[10px] font-black uppercase tracking-wider mt-1">CONTRIBUTORS</div>
            </div>
            <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all">
              <div className="text-3xl font-black">{daysLeft}</div>
              <div className="text-[10px] font-black uppercase tracking-wider mt-1">DAYS LEFT</div>
            </div>
            <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all">
              <div className="text-3xl font-black">{progressPercentage.toFixed(0)}%</div>
              <div className="text-[10px] font-black uppercase tracking-wider mt-1">FUNDED</div>
            </div>
            <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all">
              <div className="text-3xl font-black">${project.price}</div>
              <div className="text-[10px] font-black uppercase tracking-wider mt-1">PER TOKEN</div>
            </div>
          </div>

          {/* Investment Calculator - Brutalist Style */}
          <div className="p-8 space-y-6">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#DC143C] mb-4">
                INVESTMENT AMOUNT (SOL)
              </div>
              <div className="border-4 border-white bg-black">
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-4xl font-black p-4 focus:outline-none text-center"
                />
              </div>
              
              {/* Quick amounts */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[0.5, 1, 2, 5, 10].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setInvestAmount(amt)}
                    className={`border-2 border-white p-2 font-black text-xs hover:bg-white hover:text-black transition-all ${
                      investAmount === amt ? 'bg-white text-black' : ''
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* You Get - Brutalist Card */}
            <div className="border-4 border-[#DC143C] bg-[#DC143C] p-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider mb-2">YOU RECEIVE</div>
                  <div className="text-4xl font-black">{tokensReceived.toLocaleString()}</div>
                </div>
                <div className="text-2xl font-black uppercase">{project.symbol}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-white">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider">OWNERSHIP</span>
                  <div className="text-sm font-black mt-1">{((tokensReceived / 100000000) * 100).toFixed(4)}%</div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider">PROFIT SHARE</span>
                  <div className="text-sm font-black mt-1">{project.revenueShare}%</div>
                </div>
              </div>
            </div>

            {/* CTA Button - Brutalist */}
            <Button className="w-full h-14 bg-white hover:bg-gray-100 text-black font-black uppercase tracking-[0.2em] transition-all border-4 border-white">
              <Wallet className="w-5 h-5 mr-2" />
              CONNECT WALLET
            </Button>
            
            {/* Contract Address */}
            <button
              onClick={copyAddress}
              className="w-full py-3 border-2 border-white/40 hover:border-white text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {project.presaleAddress.slice(0, 10)}...{project.presaleAddress.slice(-8)}
            </button>
          </div>

          {/* Trust Indicators - Brutalist */}
          <div className="p-8 border-t-4 border-[#DC143C] space-y-3">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#DC143C]" />
              <span>CONTRACT AUDITED</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#DC143C]" />
              <span>MULTI-SIG SECURED</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#DC143C]" />
              <span>TEAM DOXXED</span>
            </div>
          </div>
        </div>

        {/* Right Side - Content Area - REBIRTH Style */}
        <div className="flex-1 ml-[480px] overflow-y-auto">
          {/* Header - matching explorer */}
          <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-3xl font-black font-serif uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                  REBIRTH
                </Link>
                {ready && authenticated ? (
                  <div className="group flex items-center gap-3 px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all">
                    <Wallet className="h-4 w-4" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider">
                      {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                    </span>
                    <button
                      onClick={logout}
                      className="text-[11px] font-black uppercase tracking-wider hover:text-[#DC143C]"
                    >
                      SIGN OUT
                    </button>
                  </div>
                ) : (
                  <Button 
                    onClick={login}
                    className="bg-[#DC143C] hover:bg-black text-white font-black uppercase tracking-[0.2em]"
                  >
                    CONNECT WALLET
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div className="p-8">
            {/* Project Header - Brutalist Card */}
            <div className="border-4 border-black bg-white p-8 mb-8 hover:bg-black hover:text-white transition-all group">
              <div className="flex items-start gap-8">
                <div className="w-24 h-24 border-4 border-black group-hover:border-white bg-white group-hover:bg-black p-3">
                  {mounted && (
                    <img
                      src={generateProjectIcon(project.symbol)}
                      alt={project.name}
                      className="w-full h-full object-contain group-hover:invert"
                    />
                  )}
                </div>
                <div>
                  <h1 className="text-5xl font-black uppercase mb-2">{project.name}</h1>
                  <p className="text-lg mb-4">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-[#DC143C] text-white text-xs font-black uppercase">{project.symbol}</span>
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.opening}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar - Brutalist Style */}
            <div className="border-4 border-black bg-white p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black uppercase">FUNDING PROGRESS</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#DC143C] animate-pulse" />
                  <span className="text-xs font-black uppercase">LIVE</span>
                </div>
              </div>
              <div className="h-8 bg-gray-200 border-4 border-black mb-4">
                <div 
                  className="h-full bg-[#DC143C] transition-all duration-1000"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm font-black uppercase">
                <span>${actualRaised.toLocaleString()} RAISED</span>
                <span>{progressPercentage.toFixed(1)}%</span>
                <span>${project.fundingGoal.toLocaleString()} GOAL</span>
              </div>
            </div>

            {/* Live Wallet Balance - Brutalist Grid */}
            {presaleData?.currentBalance && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="border-4 border-black bg-white p-6 hover:bg-black hover:text-white transition-all group">
                  <div className="text-3xl font-black mb-2">
                    {presaleData.currentBalance.sol.toFixed(2)}
                  </div>
                  <div className="text-xs font-black uppercase">SOL BALANCE</div>
                  <div className="text-xs mt-2 opacity-60">
                    ≈ ${(presaleData.currentBalance.sol * (presaleData.solPrice || 100)).toFixed(0)}
                  </div>
                </div>
                <div className="border-4 border-black bg-white p-6 hover:bg-black hover:text-white transition-all group">
                  <div className="text-3xl font-black mb-2">
                    {(presaleData.currentBalance.usdc / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs font-black uppercase">USDC BALANCE</div>
                  <div className="text-xs mt-2 opacity-60">
                    ${presaleData.currentBalance.usdc.toFixed(0)}
                  </div>
                </div>
                <div className="border-4 border-[#DC143C] bg-[#DC143C] text-white p-6">
                  <div className="text-3xl font-black mb-2">
                    ${(actualRaised / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs font-black uppercase">TOTAL VALUE</div>
                  <div className="text-xs mt-2">
                    LIVE <Circle className="w-2 h-2 inline animate-pulse" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}

            {/* Content Cards - Brutalist Accordions */}
            <div className="space-y-4">
              {/* What You Get */}
              <details className="group border-4 border-black bg-white">
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-black hover:text-white transition-all">
                  <h2 className="text-xl font-black uppercase">WHAT YOU GET</h2>
                  <div className="text-2xl group-open:rotate-45 transition-transform">+</div>
                </summary>
                <div className="p-6 border-t-4 border-black">
                  <div className="grid grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-all">
                        <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5" />
                        <span className="text-sm font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>

              {/* Token Distribution */}
              <details className="group border-4 border-black bg-white">
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-black hover:text-white transition-all">
                  <h2 className="text-xl font-black uppercase">TOKEN DISTRIBUTION</h2>
                  <div className="text-2xl group-open:rotate-45 transition-transform">+</div>
                </summary>
                <div className="p-6 border-t-4 border-black">
                  <div className="space-y-4">
                    {[
                      { label: 'PRESALE', value: project.tokenomics.presale, color: 'bg-[#DC143C]' },
                      { label: 'LIQUIDITY', value: project.tokenomics.liquidity, color: 'bg-blue-500' },
                      { label: 'TREASURY', value: project.tokenomics.treasury, color: 'bg-green-500' },
                      { label: 'TEAM', value: project.tokenomics.team, color: 'bg-purple-500' }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black uppercase">{item.label}</span>
                          <span className="text-2xl font-black">{item.value}%</span>
                        </div>
                        <div className="h-6 bg-gray-200 border-2 border-black">
                          <div 
                            className={`h-full ${item.color} transition-all duration-700`}
                            style={{ 
                              width: mounted ? `${item.value}%` : '0%',
                              transitionDelay: `${index * 100}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>

              {/* Timeline */}
              <details className="group border-4 border-black bg-white">
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-black hover:text-white transition-all">
                  <h2 className="text-xl font-black uppercase">PROJECT TIMELINE</h2>
                  <div className="text-2xl group-open:rotate-45 transition-transform">+</div>
                </summary>
                <div className="p-6 border-t-4 border-black">
                  <div className="space-y-4">
                    {[
                      { date: 'Q4 2024', title: 'TOKEN PRESALE', status: 'active', desc: 'RAISING INITIAL CAPITAL' },
                      { date: 'Q1 2025', title: 'DEX LAUNCH', status: 'upcoming', desc: 'LAUNCH ON RAYDIUM' },
                      { date: 'Q2 2025', title: 'CONSTRUCTION', status: 'upcoming', desc: 'BUILD PHYSICAL LOCATION' },
                      { date: 'Q3 2025', title: 'GRAND OPENING', status: 'upcoming', desc: 'BEGIN OPERATIONS' }
                    ].map((item, index) => (
                      <div key={index} className={`flex gap-4 ${item.status !== 'active' ? 'opacity-50' : ''}`}>
                        <div className={`w-12 h-12 border-2 border-black ${item.status === 'active' ? 'bg-[#DC143C] text-white' : 'bg-white'} flex items-center justify-center font-black text-xl`}>
                          {item.status === 'active' ? '•' : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-black uppercase">{item.title}</div>
                          <div className="text-xs uppercase tracking-wider opacity-60 mt-1">{item.desc}</div>
                          <div className="text-xs font-black uppercase mt-2">{item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
