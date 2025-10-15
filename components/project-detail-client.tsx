"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock, Zap, Copy, Check, Shield, Globe, Award, ChevronRight, Wallet, DollarSign, BarChart3, Sparkles, Lock, CheckCircle2, TrendingDown } from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { getPresaleStats, type PresaleStats } from "@/lib/solana-tracking"
import { StoreMockups } from "@/components/store-mockups"

interface ProjectDetailClientProps {
  project: Project
}

// Optimized animated background - fewer particles
const AnimatedBackground = memo(() => {
  const [particles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }))
  )

  return (
    <>
      {/* Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/15 blur-sm will-change-transform"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${15 + particle.id * 2}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Gradients */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/[0.04] via-transparent to-transparent" />
      </div>
    </>
  )
})

AnimatedBackground.displayName = 'AnimatedBackground'

// Optimized stat card
const StatCard = memo(({ stat, index, cardRefs, handleCardMouseMove, handleCardMouseLeave }: any) => (
  <Card
    ref={(el) => { cardRefs.current[`stat-${index}`] = el }}
    onMouseMove={(e) => handleCardMouseMove(e, `stat-${index}`)}
    onMouseLeave={() => handleCardMouseLeave(`stat-${index}`)}
    className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border-2 ${stat.border} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer will-change-transform`}
  >
    <div className="flex items-center gap-2 mb-2">
      <stat.icon className={`w-4 h-4 ${stat.text}`} />
      <div className="text-xs text-muted-foreground/80 font-bold uppercase tracking-wider">{stat.label}</div>
    </div>
    <div className={`text-2xl font-bold font-serif ${stat.text}`}>{stat.value}</div>
  </Card>
))

StatCard.displayName = 'StatCard'

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const [presaleStats, setPresaleStats] = useState<PresaleStats | null>(null)
  const [walletTotals, setWalletTotals] = useState<{ sol: number; usdc: number; totalUsd: number; updatedAt?: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [investAmount, setInvestAmount] = useState(1)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)

    // Fetch presale statistics
    const fetchBoth = async () => {
      try {
        const [statsRes, walletRes] = await Promise.all([
          getPresaleStats(project.presaleAddress),
          fetch(`/api/wallet?address=${project.presaleAddress}`, { cache: 'no-store' })
        ])
        setPresaleStats(statsRes)
        if (walletRes.ok) {
          const data = await walletRes.json()
          setWalletTotals({ sol: data.sol ?? 0, usdc: data.usdc ?? 0, totalUsd: data.totalUsd ?? 0, updatedAt: data.updatedAt ?? Date.now() })
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching project data:", error)
        setLoading(false)
      }
    }

    fetchBoth()
    const interval = setInterval(fetchBoth, 30000)
    return () => clearInterval(interval)
  }, [project.presaleAddress])

  // Animate raised amount
  useEffect(() => {
    const targetAmount = walletTotals?.totalUsd || 0
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
  }, [walletTotals])

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

  // Optimized 3D card tilt effect
  const handleCardMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
  }

  const handleCardMouseLeave = (cardId: string) => {
    const card = cardRefs.current[cardId]
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const progressPercentage = animatedRaised > 0 ? (animatedRaised / project.fundingGoal) * 100 : 0
  const tokensReceived = investAmount / project.price
  const potentialValue = tokensReceived * (project.price * 1.5)

  const stats = [
    { label: 'Token Price', value: `$${project.price}`, icon: DollarSign, color: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/30', text: 'text-green-700' },
    { label: 'Funding Goal', value: `$${(project.fundingGoal / 1000)}K`, icon: Target, color: 'from-blue-500/10 to-sky-500/10', border: 'border-blue-500/30', text: 'text-blue-700' },
    { label: 'Location', value: project.location.split(',')[0], icon: MapPin, color: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/30', text: 'text-purple-700' },
    { label: 'Opening', value: project.opening, icon: Calendar, color: 'from-orange-500/10 to-amber-500/10', border: 'border-orange-500/30', text: 'text-orange-700' },
  ]

  return (
    <div className="min-h-screen bg-background pt-16 relative overflow-hidden">
      <AnimatedBackground />

      {/* Back Button */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Link href="/explorer">
          <Button variant="ghost" size="sm" className="group hover:bg-white/60 backdrop-blur-md transition-all duration-200 border border-white/20 hover:border-white/40">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Explorer</span>
          </Button>
        </Link>
      </div>

      {/* Price Ticker */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-green-500 rounded-full relative" />
              </div>
              <span className="text-sm font-bold text-green-700">PRESALE LIVE</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-mono font-bold text-green-700">${project.price}</span>
              </div>
              <div className="h-4 w-px bg-green-500/30" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-foreground/60" />
                <span className="font-mono font-semibold">{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
              </div>
              <div className="h-4 w-px bg-border/30" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-mono font-semibold">{presaleStats?.contributors || 0} investors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner - Clean Branding */}
      <section className="max-w-[1400px] mx-auto px-6 pb-12">
        <div className="relative group">
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-4 group-hover:-left-4" />
          <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-accent/40 rounded-tr-2xl transition-all duration-500 group-hover:border-accent/60 group-hover:-top-4 group-hover:-right-4" />
          <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-left-4" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-primary/40 rounded-br-2xl transition-all duration-500 group-hover:border-primary/60 group-hover:-bottom-4 group-hover:-right-4" />

          <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-border/30 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_80px_rgba(59,130,246,0.12)] group-hover:-translate-y-1">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}
            />

            <div className="text-center relative z-10">
              <div className="text-8xl md:text-9xl lg:text-[160px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 tracking-tighter transition-all duration-500 group-hover:scale-[1.02] leading-none">
                {project.symbol}
              </div>
              <div className="text-2xl md:text-3xl font-serif text-gray-500 mt-6 tracking-tight">
                {project.category}
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <span className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/60 rounded-full text-sm font-bold shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
            <Card
              ref={(el) => { cardRefs.current['main-info'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'main-info')}
              onMouseLeave={() => handleCardMouseLeave('main-info')}
              className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.1)] bg-white/80 backdrop-blur-xl rounded-2xl will-change-transform"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl border-2 border-border/30 bg-gradient-to-br from-white to-gray-50/50 shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
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
                    <h1 className="text-4xl font-bold font-serif tracking-[-0.02em] bg-gradient-to-br from-foreground to-foreground/90 bg-clip-text text-transparent">
                      {project.name}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1.5 font-semibold">{project.category}</p>
                  </div>
                </div>
              </div>

              <p className="text-[17px] text-muted-foreground/90 leading-[1.7] mb-8">
                {project.description}
              </p>

              {/* Presale Address */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] border-2 border-primary/20 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.12em] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    PRESALE ADDRESS (SOLANA)
                  </span>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white transition-all duration-200 text-xs font-bold hover:shadow-md hover:scale-105 active:scale-95 border border-border/30"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-primary" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="text-sm font-mono text-foreground/90 break-all bg-white/60 px-4 py-3 rounded-xl block border border-border/30">
                  {project.presaleAddress}
                </code>
                {walletTotals && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 rounded-xl bg-white/80 border border-border/30 hover:border-primary/30 transition-colors">
                      <div className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-bold mb-1">SOL Balance</div>
                      <div className="font-bold text-lg tabular-nums text-primary">{walletTotals.sol.toFixed(4)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 border border-border/30 hover:border-accent/30 transition-colors">
                      <div className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-bold mb-1">USDC Balance</div>
                      <div className="font-bold text-lg tabular-nums text-accent">{walletTotals.usdc.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
                      <div className="text-[10px] text-green-700/80 uppercase tracking-wider font-bold mb-1">Total (USD)</div>
                      <div className="font-bold text-lg tabular-nums text-green-700">$ {walletTotals.totalUsd.toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Funding Progress */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    FUNDING PROGRESS
                  </span>
                  <span className="text-xl font-bold tabular-nums text-foreground">
                    ${animatedRaised.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">/ ${(project.fundingGoal / 1000)}K</span>
                  </span>
                </div>

                <div className="relative h-5 bg-gradient-to-r from-muted/30 to-muted/20 rounded-full overflow-hidden border-2 border-border/40 mb-3">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] rounded-full transition-all duration-700"
                    style={{ width: progressPercentage > 0 ? `${Math.min(progressPercentage, 100)}%` : '2%', animation: 'shimmer 3s ease-in-out infinite' }}
                  />
                  {[25, 50, 75].map((milestone) => (
                    <div key={milestone} className="absolute top-0 bottom-0 w-[1px] bg-white/40 z-10" style={{ left: `${milestone}%` }}>
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-primary/40" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-semibold">{presaleStats?.contributors || 0} contributors</span>
                  </div>
                  <span className="text-base text-primary font-bold tabular-nums">{progressPercentage.toFixed(1)}% funded</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <StatCard key={i} stat={stat} index={i} cardRefs={cardRefs} handleCardMouseMove={handleCardMouseMove} handleCardMouseLeave={handleCardMouseLeave} />
                ))}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-primary" />
                  What You Get
                </h3>
                <div className="space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/40 to-muted/20 hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 border-2 border-border/30 hover:border-green-500/30 group cursor-pointer">
                      <div className="mt-0.5 p-1 bg-green-500 rounded-full transition-transform duration-300 group-hover:scale-110">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Store Mockups */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.1)] bg-white/80 backdrop-blur-xl rounded-2xl">
              <StoreMockups projectName={project.name} projectSymbol={project.symbol} />
            </Card>
          </div>

          {/* Right Column - Investment Panel */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* Investment Calculator */}
            <Card
              ref={(el) => { cardRefs.current['invest-panel'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'invest-panel')}
              onMouseLeave={() => handleCardMouseLeave('invest-panel')}
              className="p-8 border-2 border-primary/30 rounded-2xl bg-gradient-to-br from-white via-white/95 to-primary/5 shadow-[0_20px_60px_rgba(59,130,246,0.15)] will-change-transform relative overflow-hidden"
            >
              {/* Background blur elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/8 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-serif">Calculate Your Investment</h3>
                </div>

                <div className="space-y-5">
                  {/* Price highlight */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/60 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-green-800 uppercase tracking-wide">25% EARLY BIRD DISCOUNT</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold font-serif text-green-900">${project.price}</span>
                        <span className="text-lg text-green-700/70 line-through">$0.20</span>
                      </div>
                      <div className="text-sm text-green-700/90 mt-1 font-medium">per {project.symbol} token</div>
                    </div>
                  </div>

                  {/* Investment Input */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-primary" />
                      How much do you want to invest?
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Math.max(0.1, Math.min(100, parseFloat(e.target.value) || 0)))}
                        className="w-full px-5 py-3.5 text-xl font-bold font-mono rounded-xl border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/90"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <button
                          onClick={() => setInvestAmount(Math.max(0.1, investAmount - 0.5))}
                          className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-150 hover:scale-110 active:scale-95"
                        >
                          <TrendingDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setInvestAmount(Math.min(100, investAmount + 0.5))}
                          className="p-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-150 hover:scale-110 active:scale-95"
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
                          className="flex-1 py-2 px-3 rounded-lg border-2 border-border/30 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-xs font-bold hover:scale-105 active:scale-95"
                        >
                          {amount} SOL
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-2.5 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/30">
                      <span className="text-xs text-muted-foreground font-semibold">You get</span>
                      <span className="text-xl font-bold font-mono text-primary">{tokensReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/30">
                      <span className="text-xs text-muted-foreground font-semibold">You pay</span>
                      <span className="text-lg font-bold font-mono">${investAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                        Could be worth
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </span>
                      <span className="text-xl font-bold font-mono text-green-600">${potentialValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/50">
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-blue-800 font-bold">Multi-sig</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/80 border border-purple-200/50">
                      <Lock className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs text-purple-800 font-bold">Audited</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/30">
                    <div className="font-bold text-foreground mb-1.5 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      How to Invest
                    </div>
                    Send SOL to the presale address above to receive {project.symbol} tokens at ${project.price} each.
                    <div className="mt-2.5 pt-2.5 border-t border-border/30 text-xs text-muted-foreground/80 flex items-center justify-between">
                      <span>Min: 0.1 SOL</span>
                      <span>Max: 100 SOL</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2.5">
                    <Button className="w-full h-14 bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[1.01] active:scale-[0.99] group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Wallet className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
                      <span className="relative z-10">Connect Wallet & Buy {project.symbol}</span>
                      <ChevronRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
                    </Button>

                    <Button variant="outline" className="w-full h-12 rounded-xl font-semibold border-2 hover:bg-muted/50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] group">
                      <Globe className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                      View Whitepaper
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tokenomics */}
            <Card
              ref={(el) => { cardRefs.current['tokenomics'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'tokenomics')}
              onMouseLeave={() => handleCardMouseLeave('tokenomics')}
              className="p-8 border-2 border-border/30 rounded-2xl bg-white/80 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.1)] will-change-transform"
            >
              <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-primary" />
                Token Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500', gradient: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', description: 'Initial token sale' },
                  { label: 'Liquidity', value: project.tokenomics.liquidity, color: 'bg-green-500', gradient: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30', description: 'DEX liquidity' },
                  { label: 'Treasury', value: project.tokenomics.treasury, color: 'bg-purple-500', gradient: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', description: 'Rewards & growth' },
                  { label: 'Team', value: project.tokenomics.team, color: 'bg-gray-500', gradient: 'from-gray-500/20 to-gray-500/5', border: 'border-gray-500/30', description: 'Team (vested)' },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} border-2 ${item.border} hover:scale-[1.01] transition-all duration-200 cursor-pointer group`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-lg ${item.color} shadow-md group-hover:scale-110 transition-transform duration-200`} />
                        <span className="text-sm font-bold">{item.label}</span>
                      </div>
                      <span className="text-xl font-bold tabular-nums">{item.value}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-700 rounded-full`}
                        style={{ width: mounted ? `${item.value}%` : '0%', transitionDelay: `${i * 80}ms` }}
                      />
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1.5">{item.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
        }
      `}</style>
    </div>
  )
}
