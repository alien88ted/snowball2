"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowLeft, MapPin, Calendar, TrendingUp, Users, Coins, Clock, 
  Copy, Check, Shield, Wallet, Activity, Circle, Square,
  CheckCircle2, DollarSign, Zap, ArrowRight, ChevronRight,
  Star, Info, Award, Target, Sparkles
} from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { usePresale } from "@/hooks/use-presale"
import { usePrivy } from "@privy-io/react-auth"

interface ProjectDetailPerfectProps {
  project: Project
}

export function ProjectDetailPerfect({ project }: ProjectDetailPerfectProps) {
  const [mounted, setMounted] = useState(false)
  const { data: presaleData, loading } = usePresale(project.id, project.presaleAddress)
  const [copied, setCopied] = useState(false)
  const [investAmount, setInvestAmount] = useState(1)
  const [activeTab, setActiveTab] = useState<'overview' | 'tokenomics' | 'timeline'>('overview')
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
  const solBalance = presaleData?.currentBalance?.sol || 0
  const usdcBalance = presaleData?.currentBalance?.usdc || 0

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Background Pattern */}
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

      {/* Split Layout */}
      <div className="flex h-screen relative z-10">
        
        {/* LEFT PANEL - Investment (Fixed) */}
        <div className="w-[420px] bg-black text-white h-screen fixed left-0 top-0 flex flex-col border-r-4 border-[#DC143C]">
          
          {/* Back Button */}
          <div className="p-6 border-b border-white/10">
            <Link href="/explorer" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Back to Explorer</span>
            </Link>
          </div>

          {/* Investment Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-5xl font-black mb-2">
                  ${Math.floor(actualRaised / 1000)}K
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  of ${project.fundingGoal / 1000}K goal
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#DC143C] transition-all duration-1000"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="mt-2 text-sm font-bold">
                  {progressPercentage.toFixed(0)}% Funded
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-black">{contributors}</div>
                  <div className="text-[10px] text-white/60 uppercase">Backers</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-black">{daysLeft}</div>
                  <div className="text-[10px] text-white/60 uppercase">Days Left</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-black">${project.price}</div>
                  <div className="text-[10px] text-white/60 uppercase">Per Token</div>
                </div>
              </div>
            </div>

            {/* Investment Calculator */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#DC143C]">
                Calculate Investment
              </h3>
              
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-[10px] text-white/60 uppercase tracking-wider">
                  Amount (SOL)
                </label>
                <div className="bg-white/5 border border-white/20 rounded-lg p-3 focus-within:border-[#DC143C] transition-colors">
                  <input
                    type="number"
                    min="0.1"
                    max="100"
                    step="0.1"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-2xl font-bold focus:outline-none text-center"
                  />
                </div>
                
                {/* Quick Amounts */}
                <div className="grid grid-cols-4 gap-1">
                  {[0.5, 1, 5, 10].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setInvestAmount(amt)}
                      className={`p-2 text-xs font-bold rounded transition-all ${
                        investAmount === amt 
                          ? 'bg-[#DC143C] text-white' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="bg-[#DC143C]/20 border border-[#DC143C] rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">You Get</span>
                  <span className="text-xl font-black">{tokensReceived.toLocaleString()} {project.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Ownership</span>
                  <span className="font-bold">{((tokensReceived / 100000000) * 100).toFixed(4)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Revenue Share</span>
                  <span className="font-bold">{project.revenueShare}% of profits</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full h-12 bg-[#DC143C] hover:bg-[#FF1744] text-white font-black uppercase tracking-wider transition-all"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect & Invest
            </Button>

            {/* Contract Address */}
            <button
              onClick={copyAddress}
              className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {project.presaleAddress.slice(0, 8)}...{project.presaleAddress.slice(-6)}
            </button>

            {/* Trust Badges */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span className="text-white/80">Contract Audited</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-white/80">Multi-Sig Wallet</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Users className="w-3 h-3 text-green-400" />
                <span className="text-white/80">Team Doxxed</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Content (Scrollable) */}
        <div className="flex-1 ml-[420px] overflow-y-auto">
          
          {/* Header */}
          <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-2 border-black">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                  REBIRTH
                </Link>
                <div className="flex items-center gap-6">
                  <Link href="/explorer" className="text-sm hover:underline">Explorer</Link>
                  <Link href="/portfolio" className="text-sm hover:underline">Portfolio</Link>
                  {ready && authenticated ? (
                    <button
                      onClick={logout}
                      className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all text-xs font-bold uppercase"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={login}
                      className="px-4 py-2 bg-[#DC143C] hover:bg-black text-white transition-all text-xs font-bold uppercase"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-4xl mx-auto">
            
            {/* Project Hero */}
            <div className="mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 border-4 border-black bg-white p-2 flex-shrink-0">
                  {mounted && (
                    <img
                      src={generateProjectIcon(project.symbol)}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-black uppercase mb-2">{project.name}</h1>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-[#DC143C] text-white text-xs font-bold uppercase">
                      {project.symbol}
                    </span>
                    <span className="px-3 py-1 border-2 border-black text-xs font-bold uppercase">
                      {project.category}
                    </span>
                    <span className="text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span className="text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Opens {project.opening}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Status Banner */}
              {presaleData?.currentBalance && (
                <div className="bg-black text-white p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Circle className="w-2 h-2 text-[#DC143C] animate-pulse" fill="currentColor" />
                      <span className="text-xs font-bold uppercase tracking-wider">Live Wallet Balance</span>
                    </div>
                    <span className="text-xs opacity-60">Real-time blockchain data</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{solBalance.toFixed(2)}</div>
                      <div className="text-xs opacity-60">SOL</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{(usdcBalance / 1000).toFixed(1)}K</div>
                      <div className="text-xs opacity-60">USDC</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#DC143C]">${(actualRaised / 1000).toFixed(0)}K</div>
                      <div className="text-xs opacity-60">Total USD</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-1 mb-6 border-b-2 border-black">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-bold uppercase text-sm transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tokenomics')}
                className={`px-6 py-3 font-bold uppercase text-sm transition-all ${
                  activeTab === 'tokenomics' 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Tokenomics
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-6 py-3 font-bold uppercase text-sm transition-all ${
                  activeTab === 'timeline' 
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Timeline
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Key Benefits */}
                  <div className="border-4 border-black bg-white p-6">
                    <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#DC143C]" />
                      What You Get
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Invest */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all">
                      <div className="text-2xl font-black mb-2">{project.revenueShare}%</div>
                      <div className="text-xs uppercase">Revenue Share</div>
                      <div className="text-xs opacity-60 mt-1">Monthly distributions</div>
                    </div>
                    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all">
                      <div className="text-2xl font-black mb-2">{project.apy}%</div>
                      <div className="text-xs uppercase">Est. APY</div>
                      <div className="text-xs opacity-60 mt-1">Projected returns</div>
                    </div>
                    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all">
                      <div className="text-2xl font-black mb-2">5yr</div>
                      <div className="text-xs uppercase">Commitment</div>
                      <div className="text-xs opacity-60 mt-1">Long-term operation</div>
                    </div>
                  </div>

                  {/* Trust Section */}
                  <div className="bg-green-50 border-2 border-green-600 p-6">
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Why Trust This Project
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Founder investing $50,000 of personal funds</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Contract audited by CertiK security firm</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Multi-signature wallet (3 of 5 required)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Monthly transparency reports published on-chain</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Team fully doxxed with LinkedIn profiles</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'tokenomics' && (
                <>
                  {/* Token Distribution */}
                  <div className="border-4 border-black bg-white p-6">
                    <h2 className="text-xl font-black uppercase mb-6">Token Distribution</h2>
                    <div className="space-y-6">
                      {[
                        { label: 'Presale', value: project.tokenomics.presale, desc: 'Initial token sale to raise capital', color: '#DC143C' },
                        { label: 'Liquidity Pool', value: project.tokenomics.liquidity, desc: 'DEX liquidity for trading', color: '#3B82F6' },
                        { label: 'Treasury', value: project.tokenomics.treasury, desc: 'Operations and growth fund', color: '#10B981' },
                        { label: 'Team', value: project.tokenomics.team, desc: '24-month vesting schedule', color: '#8B5CF6' }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-bold">{item.label}</div>
                              <div className="text-xs text-gray-600">{item.desc}</div>
                            </div>
                            <div className="text-2xl font-black">{item.value}%</div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-700"
                              style={{ 
                                backgroundColor: item.color,
                                width: mounted ? `${item.value}%` : '0%',
                                transitionDelay: `${index * 100}ms`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Token Utility */}
                  <div className="bg-gray-50 border-2 border-gray-300 p-6">
                    <h3 className="font-black uppercase mb-4">Token Utility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-bold mb-1">🏪 Revenue Sharing</div>
                        <p className="text-gray-600">Receive {project.revenueShare}% of monthly profits distributed proportionally to holdings</p>
                      </div>
                      <div>
                        <div className="font-bold mb-1">🗳️ Governance</div>
                        <p className="text-gray-600">Vote on business decisions, expansions, and treasury use</p>
                      </div>
                      <div>
                        <div className="font-bold mb-1">🎁 Customer Benefits</div>
                        <p className="text-gray-600">Exclusive discounts, early access, and member-only products</p>
                      </div>
                      <div>
                        <div className="font-bold mb-1">💱 Trading</div>
                        <p className="text-gray-600">Trade on DEX after launch for potential price appreciation</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'timeline' && (
                <>
                  {/* Project Roadmap */}
                  <div className="border-4 border-black bg-white p-6">
                    <h2 className="text-xl font-black uppercase mb-6">Project Timeline</h2>
                    <div className="space-y-6">
                      {[
                        { 
                          date: 'Q4 2024', 
                          title: 'Token Presale', 
                          status: 'active', 
                          tasks: ['Launch presale campaign', 'Build community', 'Raise initial capital'],
                          progress: progressPercentage
                        },
                        { 
                          date: 'Q1 2025', 
                          title: 'DEX Launch', 
                          status: 'upcoming',
                          tasks: ['Add liquidity on Raydium', 'Enable public trading', 'Marketing campaign'],
                          progress: 0
                        },
                        { 
                          date: 'Q2 2025', 
                          title: 'Construction Phase', 
                          status: 'upcoming',
                          tasks: ['Secure location', 'Build out space', 'Hire team'],
                          progress: 0
                        },
                        { 
                          date: 'Q3 2025', 
                          title: 'Grand Opening', 
                          status: 'upcoming',
                          tasks: ['Launch operations', 'First revenue', 'Begin profit sharing'],
                          progress: 0
                        }
                      ].map((item, index) => (
                        <div key={index} className={`flex gap-4 ${item.status !== 'active' ? 'opacity-50' : ''}`}>
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                              item.status === 'active' 
                                ? 'bg-[#DC143C] text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {item.status === 'active' ? '•' : index + 1}
                            </div>
                            {index < 3 && (
                              <div className="w-0.5 h-20 bg-gray-300 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-black">{item.title}</h3>
                              {item.status === 'active' && (
                                <span className="px-2 py-1 bg-[#DC143C] text-white text-xs font-bold uppercase">
                                  In Progress
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mb-3">{item.date}</div>
                            <div className="space-y-1">
                              {item.tasks.map((task, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-3 h-3 text-gray-400" />
                                  <span>{task}</span>
                                </div>
                              ))}
                            </div>
                            {item.progress > 0 && (
                              <div className="mt-3">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#DC143C]"
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{item.progress.toFixed(0)}% Complete</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-blue-50 border-2 border-blue-600 p-6">
                    <h3 className="font-black uppercase mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Next Steps
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      After the presale completes, tokens will be distributed to your wallet automatically. 
                      Trading will begin on Raydium DEX within 48 hours of presale completion.
                    </p>
                    <p className="text-sm text-gray-700">
                      Monthly profit distributions will begin after the store opens in Q3 2025.
                      All distributions are automatic and proportional to your token holdings.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
