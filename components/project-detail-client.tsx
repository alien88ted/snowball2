"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock, Zap, Copy, Check, Shield, Globe, Award, ChevronRight, Wallet, DollarSign, BarChart3, Sparkles, Lock, CheckCircle2, TrendingDown, ExternalLink, AlertCircle } from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { usePresale } from "@/hooks/use-presale"
import { StoreMockups } from "@/components/store-mockups"

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const { data: presaleData, loading, error, contribute, canContribute } = usePresale(project.id, project.presaleAddress)
  const [copied, setCopied] = useState(false)
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [investAmount, setInvestAmount] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animate raised amount
  useEffect(() => {
    const targetAmount = presaleData?.raised || 0
    const duration = 1500
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedRaised(Math.floor(targetAmount * eased))
      if (progress < 1) requestAnimationFrame(animateNumber)
    }

    if (targetAmount > 0) animateNumber()
  }, [presaleData])

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2025-10-01T00:00:00').getTime()
    const updateCountdown = () => {
      const now = Date.now()
      const distance = targetDate - now
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const progressPercentage = animatedRaised > 0 ? (animatedRaised / project.fundingGoal) * 100 : 0
  const tokensReceived = investAmount / project.price
  const potentialValue = tokensReceived * (project.price * 1.5)

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92 pointer-events-none" />
      
      <div className="relative z-10 pt-16">
        {/* Back Button */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <Link href="/explorer">
            <Button className="group border-4 border-black bg-white hover:bg-black hover:text-white transition-all font-black uppercase tracking-wider">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              BACK TO EXPLORER
            </Button>
          </Link>
        </div>

        {/* Live Ticker */}
        <div className="max-w-[1400px] mx-auto px-6 mb-8">
          <div className="bg-black border-4 border-black p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-[#DC143C] rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-[#DC143C] rounded-full relative" />
                </div>
                <span className="text-sm font-black text-[#DC143C] uppercase tracking-wider">PRESALE LIVE</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#DC143C]" />
                  <span className="font-black text-white uppercase">${project.price}</span>
                </div>
                <div className="h-4 w-px bg-[#DC143C]" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="font-black text-white">{countdown.days}D {countdown.hours}H {countdown.minutes}M</span>
                </div>
                <div className="h-4 w-px bg-[#DC143C]" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#DC143C]" />
                  <span className="font-black text-white">{presaleData?.contributors || 0} INVESTORS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner - BRUTALIST */}
        <section className="max-w-[1400px] mx-auto px-6 pb-12">
          <div className="border-4 border-black bg-white relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-b-4 border-r-4 border-[#DC143C]" />
            <div className="absolute top-0 right-0 w-24 h-24 border-b-4 border-l-4 border-[#DC143C]" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-t-4 border-r-4 border-black" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-t-4 border-l-4 border-black" />

            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              <div className="text-center relative z-10">
                <div className="text-8xl md:text-9xl lg:text-[200px] font-black font-serif text-black uppercase tracking-tighter leading-none">
                  {project.symbol}
                </div>
                <div className="text-3xl md:text-4xl font-black text-[#DC143C] uppercase tracking-wider mt-6">
                  {project.category}
                </div>
                <div className="mt-8 inline-flex items-center gap-4">
                  <span className="px-6 py-3 bg-[#DC143C] text-white border-4 border-[#DC143C] font-black uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      25% DISCOUNT ACTIVE
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-[1400px] mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Info Card */}
              <div className="border-4 border-black bg-white p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 border-4 border-black bg-white overflow-hidden">
                      {mounted && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={generateProjectIcon(project.symbol)}
                          alt={project.name}
                          className="w-full h-full object-contain p-3"
                        />
                      )}
                    </div>
                    <div>
                      <h1 className="text-4xl font-black font-serif text-black uppercase">
                        {project.name}
                      </h1>
                      <p className="text-sm text-[#DC143C] mt-1.5 font-black uppercase tracking-wider">{project.category}</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-black font-bold leading-relaxed mb-8 uppercase">
                  {project.description}
                </p>

                {/* Presale Address */}
                <div className="mb-8 p-6 border-4 border-black bg-[#DC143C]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      PRESALE ADDRESS (SOLANA)
                    </span>
                    <button
                      onClick={copyAddress}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all border-4 border-white"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          COPIED!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          COPY
                        </>
                      )}
                    </button>
                  </div>
                  <code className="text-sm font-mono text-white break-all bg-black/20 px-4 py-3 block border-2 border-white">
                    {project.presaleAddress}
                  </code>
                  {presaleData && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="p-3 bg-white border-2 border-black">
                        <div className="text-[10px] text-black uppercase tracking-wider font-black mb-1">SOL RAISED</div>
                        <div className="font-black text-lg text-[#DC143C]">{presaleData.raisedSOL.toFixed(2)}</div>
                      </div>
                      <div className="p-3 bg-white border-2 border-black">
                        <div className="text-[10px] text-black uppercase tracking-wider font-black mb-1">CONTRIBUTORS</div>
                        <div className="font-black text-lg text-[#DC143C]">{presaleData.contributors}</div>
                      </div>
                      <div className="p-3 bg-black border-2 border-white">
                        <div className="text-[10px] text-[#DC143C] uppercase tracking-wider font-black mb-1">TOTAL RAISED</div>
                        <div className="font-black text-lg text-white">$ {presaleData.raised.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Funding Progress */}
                <div className="mb-8 p-6 border-4 border-black bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black text-[#DC143C] uppercase tracking-[0.3em] flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      FUNDING PROGRESS
                    </span>
                    <span className="text-2xl font-black text-black uppercase">
                      ${animatedRaised.toLocaleString()} <span className="text-sm text-gray-600">/ ${(project.fundingGoal / 1000)}K</span>
                    </span>
                  </div>

                  <div className="relative h-8 border-4 border-black bg-white overflow-hidden mb-3">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#DC143C] transition-all duration-700"
                      style={{ width: progressPercentage > 0 ? `${Math.min(progressPercentage, 100)}%` : '2%' }}
                    />
                    {[25, 50, 75].map((milestone) => (
                      <div key={milestone} className="absolute top-0 bottom-0 w-[2px] bg-black z-10" style={{ left: `${milestone}%` }} />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#DC143C]" />
                      <span className="text-sm text-black font-black uppercase">{presaleData?.contributors || 0} CONTRIBUTORS</span>
                    </div>
                    <span className="text-base text-[#DC143C] font-black uppercase">{progressPercentage.toFixed(1)}% FUNDED</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'TOKEN PRICE', value: `$${project.price}`, icon: DollarSign },
                    { label: 'FUNDING GOAL', value: `$${(project.fundingGoal / 1000)}K`, icon: Target },
                    { label: 'LOCATION', value: project.location.split(',')[0], icon: MapPin },
                    { label: 'OPENING', value: project.opening, icon: Calendar },
                  ].map((stat, i) => (
                    <div key={i} className="border-4 border-black bg-white p-5 hover:bg-[#DC143C] hover:text-white transition-all group">
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4 text-[#DC143C] group-hover:text-white" />
                        <div className="text-[10px] font-black uppercase tracking-wider">{stat.label}</div>
                      </div>
                      <div className="text-xl font-black uppercase">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-black font-serif mb-5 uppercase flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-[#DC143C]" />
                    WHAT YOU GET
                  </h3>
                  <div className="space-y-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border-4 border-black bg-white hover:bg-[#DC143C] hover:text-white transition-all group">
                        <div className="mt-0.5 p-1 bg-[#DC143C] group-hover:bg-white border-2 border-black group-hover:border-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white group-hover:text-[#DC143C]" />
                        </div>
                        <span className="text-sm font-bold uppercase">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Store Mockups */}
              <div className="border-4 border-black bg-white p-10">
                <h3 className="text-2xl font-black font-serif mb-8 uppercase">STORE CONCEPT</h3>
                <StoreMockups projectName={project.name} projectSymbol={project.symbol} />
              </div>
            </div>

            {/* Right Column - Investment Panel */}
            <div className="space-y-8 lg:sticky lg:top-24 h-fit">
              {/* Investment Calculator */}
              <div className="border-4 border-[#DC143C] bg-[#DC143C] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white border-4 border-white">
                    <Zap className="w-5 h-5 text-[#DC143C]" />
                  </div>
                  <h3 className="text-xl font-black font-serif text-white uppercase">CALCULATE INVESTMENT</h3>
                </div>

                <div className="space-y-5">
                  {/* Price highlight */}
                  <div className="p-5 bg-white border-4 border-white">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#DC143C]" />
                      <span className="text-xs font-black text-black uppercase tracking-wider">25% EARLY BIRD DISCOUNT</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black font-serif text-[#DC143C]">${project.price}</span>
                      <span className="text-lg text-gray-500 line-through">$0.20</span>
                    </div>
                    <div className="text-sm text-black font-black uppercase mt-1">PER {project.symbol} TOKEN</div>
                  </div>

                  {/* Investment Input */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5" />
                      INVESTMENT AMOUNT
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Math.max(0.1, Math.min(100, parseFloat(e.target.value) || 0)))}
                        className="w-full px-5 py-3.5 text-xl font-black bg-white border-4 border-white focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <button
                          onClick={() => setInvestAmount(Math.max(0.1, investAmount - 0.5))}
                          className="p-1.5 bg-black text-white hover:bg-[#DC143C] transition-all"
                        >
                          <TrendingDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setInvestAmount(Math.min(100, investAmount + 0.5))}
                          className="p-1.5 bg-[#DC143C] text-white hover:bg-black transition-all"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[0.5, 1, 2, 5].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setInvestAmount(amount)}
                          className="flex-1 py-2 px-3 border-4 border-white bg-white text-black hover:bg-black hover:text-white transition-all font-black uppercase"
                        >
                          {amount} SOL
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-2.5 p-4 bg-black border-4 border-white">
                    <div className="flex items-center justify-between pb-2.5 border-b-2 border-white">
                      <span className="text-xs text-[#DC143C] font-black uppercase">YOU GET</span>
                      <span className="text-xl font-black text-white">{tokensReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2.5 border-b-2 border-white">
                      <span className="text-xs text-[#DC143C] font-black uppercase">YOU PAY</span>
                      <span className="text-lg font-black text-white">${investAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#DC143C] font-black uppercase flex items-center gap-1">
                        POTENTIAL VALUE
                        <Sparkles className="w-3 h-3" />
                      </span>
                      <span className="text-xl font-black text-[#DC143C]">${potentialValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-white">
                      <Shield className="w-3.5 h-3.5 text-[#DC143C]" />
                      <span className="text-xs text-black font-black uppercase">MULTI-SIG</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-white">
                      <Lock className="w-3.5 h-3.5 text-[#DC143C]" />
                      <span className="text-xs text-black font-black uppercase">AUDITED</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-sm text-white bg-black/20 p-4 border-2 border-white">
                    <div className="font-black text-white mb-1.5 flex items-center gap-2 uppercase">
                      <AlertCircle className="w-3.5 h-3.5" />
                      HOW TO INVEST
                    </div>
                    <p className="uppercase font-bold">
                      Send SOL to the presale address above to receive {project.symbol} tokens at ${project.price} each.
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t-2 border-white text-xs font-black flex items-center justify-between uppercase">
                      <span>MIN: 0.1 SOL</span>
                      <span>MAX: 100 SOL</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2.5">
                    <Button className="w-full h-14 bg-white text-[#DC143C] hover:bg-black hover:text-white font-black text-base uppercase tracking-[0.2em] transition-all border-4 border-white group">
                      <Wallet className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-12" />
                      CONNECT & BUY {project.symbol}
                      <ChevronRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Button>

                    <Button className="w-full h-12 bg-black text-white hover:bg-white hover:text-black font-black uppercase tracking-wider border-4 border-black hover:border-white transition-all group">
                      <Globe className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                      VIEW WHITEPAPER
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tokenomics */}
              <div className="border-4 border-black bg-white p-8">
                <h3 className="text-xl font-black font-serif mb-5 uppercase flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-[#DC143C]" />
                  TOKEN DISTRIBUTION
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'PRESALE', value: project.tokenomics.presale, description: 'INITIAL SALE' },
                    { label: 'LIQUIDITY', value: project.tokenomics.liquidity, description: 'DEX LIQUIDITY' },
                    { label: 'TREASURY', value: project.tokenomics.treasury, description: 'REWARDS & GROWTH' },
                    { label: 'TEAM', value: project.tokenomics.team, description: 'TEAM (VESTED)' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 border-4 border-black hover:bg-[#DC143C] hover:text-white transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-4 h-4 bg-[#DC143C] group-hover:bg-white border-2 border-black group-hover:border-white" />
                          <span className="text-sm font-black uppercase">{item.label}</span>
                        </div>
                        <span className="text-xl font-black">{item.value}%</span>
                      </div>
                      <div className="w-full h-4 border-2 border-black group-hover:border-white bg-white group-hover:bg-black/20 overflow-hidden">
                        <div
                          className="h-full bg-[#DC143C] group-hover:bg-white transition-all duration-700"
                          style={{ width: mounted ? `${item.value}%` : '0%', transitionDelay: `${i * 80}ms` }}
                        />
                      </div>
                      <div className="text-[11px] font-bold mt-1.5 uppercase">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}