"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock, Zap, Copy, Check, Shield, Globe, Award, ChevronRight } from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { getPresaleStats, type PresaleStats } from "@/lib/solana-tracking"
import { StoreMockups } from "@/components/store-mockups"

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const [presaleStats, setPresaleStats] = useState<PresaleStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setMounted(true)

    // Fetch presale statistics
    const fetchStats = async () => {
      try {
        const stats = await getPresaleStats(project.presaleAddress)
        setPresaleStats(stats)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching presale stats:", error)
        setLoading(false)
      }
    }

    fetchStats()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [project.presaleAddress])

  // Animate raised amount
  useEffect(() => {
    const targetAmount = presaleStats?.totalRaisedUSD || 0
    const duration = 2000
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedRaised(Math.floor(targetAmount * eased))

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    if (targetAmount > 0) {
      animateNumber()
    }
  }, [presaleStats])

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2025-10-01T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
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

  const progressPercentage = presaleStats
    ? (presaleStats.totalRaisedUSD / project.fundingGoal) * 100
    : 0

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Enhanced Background Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.05] via-transparent to-transparent" />
      </div>

      {/* Back Button with better hover state */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <Link href="/explorer">
          <Button
            variant="ghost"
            size="sm"
            className="group hover:bg-muted/50 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Explorer</span>
          </Button>
        </Link>
      </div>

      {/* Hero Banner - Enhanced with subtle animations */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="relative group">
          {/* Refined corner decorations with gradient */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-[14px] transition-all duration-500 group-hover:border-primary/50 group-hover:-top-4 group-hover:-left-4" />
          <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-[14px] transition-all duration-500 group-hover:border-primary/50 group-hover:-top-4 group-hover:-right-4" />
          <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-[14px] transition-all duration-500 group-hover:border-accent/50 group-hover:-bottom-4 group-hover:-left-4" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-[14px] transition-all duration-500 group-hover:border-accent/50 group-hover:-bottom-4 group-hover:-right-4" />

          <div className="w-full h-[320px] md:h-[420px] bg-gradient-to-br from-white via-gray-50/30 to-white border-2 border-border/30 rounded-[14px] flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/[0.08] group-hover:-translate-y-1">
            {/* Subtle animated gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
            </div>

            <div className="text-center relative">
              <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 tracking-tighter transition-all duration-500 group-hover:scale-[1.02]">
                {project.symbol}
              </div>
              <div className="text-2xl md:text-3xl font-serif text-gray-500 mt-6 tracking-tight">
                {project.category}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Enhanced typography and spacing */}
      <section className="max-w-[1200px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Info Card - Premium feel */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.05] bg-card/50 backdrop-blur-sm rounded-[14px]">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-[14px] border border-border/30 bg-gradient-to-br from-white to-gray-50/50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    {mounted && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={generateProjectIcon(project.symbol)}
                        alt={project.name}
                        className="w-full h-full object-contain p-2"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold font-serif tracking-[-0.02em] bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {project.name}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1.5 font-medium tracking-wide">{project.category}</p>
                  </div>
                </div>
                <span className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  project.status === "presale" ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/60 shadow-lg shadow-green-500/10" :
                  project.status === "live" ? "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border border-blue-200/60 shadow-lg shadow-blue-500/10" :
                  "bg-gray-50 text-gray-700 border border-gray-200"
                }`}>
                  {project.status === "presale" && (
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full z-10" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      </div>
                      PRESALE LIVE
                    </div>
                  )}
                </span>
              </div>

              <p className="text-[17px] text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Presale Address - Better visual hierarchy */}
              <div className="mb-8 p-5 rounded-[14px] bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] border border-primary/15 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.1em]">
                    PRESALE ADDRESS (SOLANA)
                  </span>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-background/80 hover:bg-background transition-all duration-300 text-xs font-semibold hover:shadow-md hover:scale-105 active:scale-100"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="text-sm font-mono text-foreground/90 break-all leading-relaxed">
                  {project.presaleAddress}
                </code>
              </div>

              {/* Funding Progress - Enhanced with better visuals */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.1em]">
                    FUNDING PROGRESS
                  </span>
                  <span className="text-base font-bold tabular-nums text-foreground">
                    ${animatedRaised.toLocaleString()} / ${(project.fundingGoal / 1000)}K
                  </span>
                </div>
                <div className="relative h-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-full overflow-hidden border border-border/40 shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }}
                  />
                  {/* Milestone markers */}
                  {[25, 50, 75].map((milestone) => (
                    <div
                      key={milestone}
                      className="absolute top-0 bottom-0 w-[1px] bg-border/30"
                      style={{ left: `${milestone}%` }}
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-background border border-border/50 shadow-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {presaleStats?.contributors || 0} contributors
                    </span>
                  </div>
                  <span className="text-sm text-primary font-bold tabular-nums">
                    {progressPercentage.toFixed(1)}% funded
                  </span>
                </div>
              </div>

              {/* Key Stats Grid - More refined design */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                <div className="p-5 rounded-[14px] bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] border border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
                  <div className="text-xs text-muted-foreground/70 mb-2 font-semibold uppercase tracking-wider">Token Price</div>
                  <div className="text-3xl font-bold font-serif bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">${project.price}</div>
                </div>
                <div className="p-5 rounded-[14px] bg-gradient-to-br from-card/60 to-card/30 border border-border/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-border/50">
                  <div className="text-xs text-muted-foreground/70 mb-2 font-semibold uppercase tracking-wider">Goal</div>
                  <div className="text-3xl font-bold font-serif">${(project.fundingGoal / 1000)}K</div>
                </div>
                <div className="p-5 rounded-[14px] bg-gradient-to-br from-card/60 to-card/30 border border-border/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-border/50">
                  <div className="text-xs text-muted-foreground/70 mb-2 font-semibold uppercase tracking-wider">Location</div>
                  <div className="text-xl font-bold font-serif truncate flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {project.location.split(',')[0]}
                  </div>
                </div>
                <div className="p-5 rounded-[14px] bg-gradient-to-br from-card/60 to-card/30 border border-border/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-border/50">
                  <div className="text-xs text-muted-foreground/70 mb-2 font-semibold uppercase tracking-wider">Opening</div>
                  <div className="text-xl font-bold font-serif flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {project.opening}
                  </div>
                </div>
              </div>

              {/* Features - More polished */}
              <div>
                <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-primary" />
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3.5 p-4 rounded-[12px] bg-gradient-to-r from-muted/30 to-muted/20 hover:from-muted/50 hover:to-muted/40 transition-all duration-300 border border-border/20 hover:border-border/40 hover:shadow-md group">
                      <span className="text-green-500 mt-0.5 font-bold text-lg transition-transform duration-300 group-hover:scale-110">✓</span>
                      <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Milestones - Enhanced visual feedback */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.05] bg-card/50 backdrop-blur-sm rounded-[14px]">
              <h3 className="text-2xl font-bold font-serif mb-7 flex items-center gap-2.5">
                <Target className="w-6 h-6 text-primary" />
                Funding Milestones
              </h3>
              <div className="space-y-5">
                {project.milestones.map((milestone, index) => {
                  const isReached = animatedRaised >= milestone.target
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-5 p-5 rounded-[14px] border-2 transition-all duration-500 ${
                        isReached
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-500/10'
                          : 'bg-gradient-to-r from-muted/20 to-muted/10 border-border/30 hover:border-border/50 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center text-base font-bold shadow-md transition-all duration-300 ${
                        isReached
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white scale-110'
                          : 'bg-gradient-to-br from-muted to-muted/70 text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{milestone.description}</span>
                          <span className="text-base font-bold tabular-nums">${(milestone.target / 1000)}K</span>
                        </div>
                      </div>
                      {isReached && (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md animate-[scaleIn_0.3s_ease-out]">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Store Mockups */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.05] bg-card/50 backdrop-blur-sm rounded-[14px]">
              <StoreMockups projectName={project.name} projectSymbol={project.symbol} />
            </Card>

            {/* Tokenomics - More visual appeal */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.05] bg-card/50 backdrop-blur-sm rounded-[14px]">
              <h3 className="text-2xl font-bold font-serif mb-7 flex items-center gap-2.5">
                <Coins className="w-6 h-6 text-primary" />
                Token Distribution
              </h3>

              {/* Visual donut chart */}
              <div className="flex items-center gap-8 mb-8">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    {[
                      { label: 'Presale', value: project.tokenomics.presale, color: '#3b82f6', offset: 0 },
                      { label: 'Liquidity', value: project.tokenomics.liquidity, color: '#10b981', offset: project.tokenomics.presale },
                      { label: 'Treasury', value: project.tokenomics.treasury, color: '#a855f7', offset: project.tokenomics.presale + project.tokenomics.liquidity },
                      { label: 'Team', value: project.tokenomics.team, color: '#6b7280', offset: project.tokenomics.presale + project.tokenomics.liquidity + project.tokenomics.treasury },
                    ].map((item, i) => {
                      const radius = 35
                      const circumference = 2 * Math.PI * radius
                      const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`
                      const strokeDashoffset = -((item.offset / 100) * circumference)

                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          stroke={item.color}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000 ease-out opacity-90 hover:opacity-100"
                          style={{
                            animation: mounted ? `drawCircle 1.5s ease-out ${i * 0.15}s forwards` : 'none',
                            strokeDasharray: mounted ? strokeDasharray : '0 ' + circumference
                          }}
                        />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold font-serif">100%</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Supply</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {[
                    { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500', description: 'Initial token sale to early investors' },
                    { label: 'Liquidity Pool', value: project.tokenomics.liquidity, color: 'bg-green-500', description: 'DEX liquidity provision' },
                    { label: 'Treasury (Rewards)', value: project.tokenomics.treasury, color: 'bg-purple-500', description: 'Community rewards & growth fund' },
                    { label: 'Team', value: project.tokenomics.team, color: 'bg-gray-500', description: 'Team allocation (vested)' },
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex items-center gap-4 mb-2">
                        <div className={`w-4 h-4 rounded-full ${item.color} transition-transform duration-300 group-hover:scale-125`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">{item.label}</span>
                            <span className="text-sm font-bold tabular-nums">{item.value}%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-1000 rounded-full`}
                          style={{
                            width: mounted ? `${item.value}%` : '0%',
                            transitionDelay: `${i * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - CTA & Countdown - More premium */}
          <div className="space-y-8">
            {/* Invest CTA - Enhanced with better visuals */}
            <Card className="p-8 border-2 border-primary/20 sticky top-24 rounded-[14px] bg-gradient-to-br from-card via-card/95 to-card shadow-xl shadow-primary/[0.08]">
              <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-primary" />
                Invest Now
              </h3>

              <div className="space-y-5">
                {/* Price highlight */}
                <div className="p-5 rounded-[14px] bg-gradient-to-br from-green-50/70 to-emerald-50/70 border border-green-200/50 shadow-lg shadow-green-500/[0.08]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-800 uppercase tracking-wide">25% EARLY BIRD DISCOUNT</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold font-serif text-green-900">${project.price}</span>
                    <span className="text-base text-green-700/70 line-through">$0.20</span>
                  </div>
                  <div className="text-sm text-green-700 mt-2">per {project.symbol} token</div>
                </div>

                {/* Security badge */}
                <div className="flex items-center gap-2.5 p-3 rounded-[10px] bg-blue-50/50 border border-blue-200/30">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-800 font-medium">Secure multi-sig treasury</span>
                </div>

                {/* Instructions */}
                <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-[10px] border border-border/30">
                  Send SOL to the presale address above to receive {project.symbol} tokens at ${project.price} each.
                  <span className="block text-xs mt-2 text-muted-foreground/70">Minimum: 0.1 SOL • Maximum: 100 SOL</span>
                </div>

                {/* CTA Buttons */}
                <Button className="w-full h-14 bg-black hover:bg-gray-900 text-white font-bold text-base rounded-[10px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-100 group">
                  <Zap className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-12" />
                  Buy {project.symbol}
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button variant="outline" className="w-full h-12 rounded-[10px] font-semibold hover:bg-muted/50 transition-all duration-300">
                  <Globe className="w-4 h-4 mr-2" />
                  Download Whitepaper
                </Button>
              </div>
            </Card>

            {/* Countdown - More refined */}
            <Card className="p-7 border-2 border-border/30 rounded-[14px] bg-gradient-to-br from-card/80 to-card/60">
              <div className="flex items-center gap-2.5 mb-5">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold">Launch Countdown</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Mins' },
                  { value: countdown.seconds, label: 'Secs' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-4 bg-gradient-to-br from-muted/40 to-muted/20 rounded-[10px] border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                    <div className="text-3xl font-bold font-serif tabular-nums bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-semibold mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trust indicators */}
            <Card className="p-6 border border-border/30 rounded-[14px] bg-gradient-to-br from-muted/20 to-muted/10">
              <h4 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-wider">Why Invest</h4>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: 'SEC-compliant framework' },
                  { icon: Users, text: 'Real revenue sharing' },
                  { icon: TrendingUp, text: 'Tradeable on DEX' },
                  { icon: Globe, text: 'Global accessibility' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent/20">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes drawCircle {
          to { stroke-dasharray: var(--dasharray); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}