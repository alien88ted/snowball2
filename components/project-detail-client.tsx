"use client"

import { useState, useEffect, useRef } from "react"
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

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const [presaleStats, setPresaleStats] = useState<PresaleStats | null>(null)
  const [walletTotals, setWalletTotals] = useState<{ sol: number; usdc: number; totalUsd: number; updatedAt?: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [investAmount, setInvestAmount] = useState(1)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Particle effect state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)

    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)

    // Fetch presale statistics (TX-based) and live wallet totals (balance-based)
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

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchBoth, 30000)

    return () => clearInterval(interval)
  }, [project.presaleAddress])

  // Animate raised amount to live wallet USD total
  useEffect(() => {
    const targetAmount = walletTotals?.totalUsd || 0
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
  }, [walletTotals])

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

  // 3D card tilt effect
  const handleCardMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleCardMouseLeave = (cardId: string) => {
    const card = cardRefs.current[cardId]
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const progressPercentage = animatedRaised > 0
    ? (animatedRaised / project.fundingGoal) * 100
    : 0

  const tokensReceived = investAmount / project.price
  const potentialValue = tokensReceived * (project.price * 1.5) // 1.5x projection

  return (
    <div className="min-h-screen bg-background pt-16 relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/20 blur-sm animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Background Gradient with moving mesh */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.04] animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.08] via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/[0.06] via-transparent to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Back Button with glassmorphism */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Link href="/explorer">
          <Button
            variant="ghost"
            size="sm"
            className="group hover:bg-white/60 backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Explorer</span>
          </Button>
        </Link>
      </div>

      {/* Floating Price Ticker */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-4 shadow-2xl shadow-green-500/10 animate-slide-in">
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
                <span className="font-mono font-semibold">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </span>
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

      {/* Hero Banner - Ultra Premium */}
      <section className="max-w-[1400px] mx-auto px-6 pb-12">
        <div className="relative group">
          {/* Animated corner decorations */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-700 group-hover:border-primary/70 group-hover:-top-6 group-hover:-left-6 group-hover:w-28 group-hover:h-28" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-accent/40 rounded-tr-2xl transition-all duration-700 group-hover:border-accent/70 group-hover:-top-6 group-hover:-right-6 group-hover:w-28 group-hover:h-28" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-700 group-hover:border-accent/70 group-hover:-bottom-6 group-hover:-left-6 group-hover:w-28 group-hover:h-28" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/40 rounded-br-2xl transition-all duration-700 group-hover:border-primary/70 group-hover:-bottom-6 group-hover:-right-6 group-hover:w-28 group-hover:h-28" />

          <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-border/30 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-700 hover:border-primary/50 hover:shadow-[0_0_100px_rgba(59,130,246,0.15)] group-hover:-translate-y-2">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />

            <div className="text-center relative z-10">
              <div className="text-8xl md:text-9xl lg:text-[180px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 tracking-tighter transition-all duration-700 group-hover:scale-105 leading-none animate-fade-in">
                {project.symbol}
              </div>
              <div className="text-3xl md:text-4xl font-serif text-gray-500 mt-8 tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {project.category}
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/60 rounded-full text-sm font-bold tracking-wide shadow-lg shadow-green-500/20">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full z-10" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    </div>
                    25% DISCOUNT ACTIVE
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Next-Gen Layout */}
      <section className="max-w-[1400px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Info Card - Ultra Premium */}
            <Card
              ref={(el) => { cardRefs.current['main-info'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'main-info')}
              onMouseLeave={() => handleCardMouseLeave('main-info')}
              className="p-10 border-2 border-border/30 hover:border-primary/40 transition-all duration-700 hover:shadow-[0_20px_100px_rgba(59,130,246,0.15)] bg-white/80 backdrop-blur-xl rounded-2xl transform-gpu"
              style={{ transformStyle: 'preserve-3d', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl border-2 border-border/30 bg-gradient-to-br from-white to-gray-50/50 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
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
                    <h1 className="text-5xl font-bold font-serif tracking-[-0.03em] bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                      {project.name}
                    </h1>
                    <p className="text-base text-muted-foreground mt-2 font-semibold tracking-wide">{project.category}</p>
                  </div>
                </div>
              </div>

              <p className="text-[18px] text-muted-foreground/90 leading-[1.8] mb-8 font-light">
                {project.description}
              </p>

              {/* Enhanced Presale Address with glassmorphism */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] border-2 border-primary/20 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    PRESALE ADDRESS (SOLANA)
                  </span>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/90 hover:bg-white transition-all duration-300 text-xs font-bold hover:shadow-xl hover:scale-105 active:scale-95 border border-border/30"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-primary" />
                        Copy Address
                      </>
                    )}
                  </button>
                </div>
                <code className="text-sm font-mono text-foreground/90 break-all leading-relaxed bg-white/60 px-4 py-3 rounded-xl block border border-border/30">
                  {project.presaleAddress}
                </code>
                {walletTotals && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="p-4 rounded-xl bg-white/80 border-2 border-border/40 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                      <div className="text-[11px] text-muted-foreground/80 uppercase tracking-wider font-bold mb-1">SOL Balance</div>
                      <div className="font-bold text-lg tabular-nums text-primary">{walletTotals.sol.toFixed(4)}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/80 border-2 border-border/40 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                      <div className="text-[11px] text-muted-foreground/80 uppercase tracking-wider font-bold mb-1">USDC Balance</div>
                      <div className="font-bold text-lg tabular-nums text-accent">{walletTotals.usdc.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/60 backdrop-blur-sm hover:border-green-300/60 transition-all duration-300 hover:shadow-lg">
                      <div className="text-[11px] text-green-700/80 uppercase tracking-wider font-bold mb-1">Total (USD)</div>
                      <div className="font-bold text-lg tabular-nums text-green-700">$ {walletTotals.totalUsd.toLocaleString()}</div>
                    </div>
                    {walletTotals.updatedAt && (
                      <div className="md:col-span-3 text-[11px] text-muted-foreground/70 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Last updated {new Date(walletTotals.updatedAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Ultra-Enhanced Funding Progress */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border/30">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    FUNDING PROGRESS
                  </span>
                  <span className="text-2xl font-bold tabular-nums text-foreground">
                    ${animatedRaised.toLocaleString()} <span className="text-base text-muted-foreground font-normal">/ ${(project.fundingGoal / 1000)}K</span>
                  </span>
                </div>

                {/* Animated progress bar with glow */}
                <div className="relative h-6 bg-gradient-to-r from-muted/30 to-muted/20 rounded-full overflow-hidden border-2 border-border/40 shadow-inner mb-4">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-1000 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                    style={{ width: progressPercentage > 0 ? `${Math.min(progressPercentage, 100)}%` : '2%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20" />
                  </div>
                  {/* Milestone markers */}
                  {[25, 50, 75].map((milestone) => (
                    <div
                      key={milestone}
                      className="absolute top-0 bottom-0 w-[2px] bg-white/60 z-10"
                      style={{ left: `${milestone}%` }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary/50 shadow-lg" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-semibold">
                      {presaleStats?.contributors || 0} contributors
                    </span>
                  </div>
                  <span className="text-lg text-primary font-bold tabular-nums">
                    {progressPercentage.toFixed(1)}% funded
                  </span>
                </div>
              </div>

              {/* Key Stats Grid - Premium Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Token Price', value: `$${project.price}`, icon: DollarSign, color: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/30', text: 'text-green-700' },
                  { label: 'Funding Goal', value: `$${(project.fundingGoal / 1000)}K`, icon: Target, color: 'from-blue-500/10 to-sky-500/10', border: 'border-blue-500/30', text: 'text-blue-700' },
                  { label: 'Location', value: project.location.split(',')[0], icon: MapPin, color: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/30', text: 'text-purple-700' },
                  { label: 'Opening', value: project.opening, icon: Calendar, color: 'from-orange-500/10 to-amber-500/10', border: 'border-orange-500/30', text: 'text-orange-700' },
                ].map((stat, i) => (
                  <Card
                    key={i}
                    ref={(el) => { cardRefs.current[`stat-${i}`] = el }}
                    onMouseMove={(e) => handleCardMouseMove(e, `stat-${i}`)}
                    onMouseLeave={() => handleCardMouseLeave(`stat-${i}`)}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border-2 ${stat.border} transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform-gpu`}
                    style={{ transformStyle: 'preserve-3d', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.text}`} />
                      <div className="text-xs text-muted-foreground/80 font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                    <div className={`text-2xl font-bold font-serif ${stat.text}`}>{stat.value}</div>
                  </Card>
                ))}
              </div>

              {/* Features - Ultra Modern */}
              <div>
                <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  What You Get
                </h3>
                <div className="space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-muted/40 to-muted/20 hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-500 border-2 border-border/30 hover:border-green-500/40 hover:shadow-xl group cursor-pointer">
                      <div className="mt-0.5 p-1.5 bg-green-500 rounded-full transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[15px] leading-relaxed text-foreground/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Store Mockups */}
            <Card className="p-10 border-2 border-border/30 hover:border-primary/40 transition-all duration-700 hover:shadow-[0_20px_100px_rgba(59,130,246,0.15)] bg-white/80 backdrop-blur-xl rounded-2xl">
              <StoreMockups projectName={project.name} projectSymbol={project.symbol} />
            </Card>
          </div>

          {/* Right Column - Investment Panel + Token Distribution (sticky) */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* Investment Calculator - The Star of the Show */}
            <Card
              ref={(el) => { cardRefs.current['invest-panel'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'invest-panel')}
              onMouseLeave={() => handleCardMouseLeave('invest-panel')}
              className="p-8 border-2 border-primary/30 rounded-2xl bg-gradient-to-br from-white via-white/95 to-primary/5 shadow-[0_20px_80px_rgba(59,130,246,0.2)] transform-gpu relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Investment Calculator</h3>
                </div>

                <div className="space-y-6">
                  {/* Price highlight with animation */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/60 shadow-xl shadow-green-500/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-5 h-5 text-green-600 animate-bounce" />
                        <span className="text-xs font-bold text-green-800 uppercase tracking-wide">25% EARLY BIRD DISCOUNT</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold font-serif text-green-900">${project.price}</span>
                        <span className="text-xl text-green-700/70 line-through">$0.20</span>
                      </div>
                      <div className="text-sm text-green-700/90 mt-2 font-medium">per {project.symbol} token</div>
                    </div>
                  </div>

                  {/* Investment Amount Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-primary" />
                      Investment Amount (SOL)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Math.max(0.1, Math.min(100, parseFloat(e.target.value) || 0)))}
                        className="w-full px-6 py-4 text-2xl font-bold font-mono rounded-2xl border-2 border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          onClick={() => setInvestAmount(Math.max(0.1, investAmount - 0.5))}
                          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                          <TrendingDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setInvestAmount(Math.min(100, investAmount + 0.5))}
                          className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[0.5, 1, 2, 5].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setInvestAmount(amount)}
                          className="flex-1 py-2 px-3 rounded-lg border-2 border-border/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm font-bold hover:scale-105 active:scale-95"
                        >
                          {amount} SOL
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculation Results */}
                  <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                    <div className="flex items-center justify-between pb-3 border-b border-border/30">
                      <span className="text-sm text-muted-foreground font-semibold">Tokens Received</span>
                      <span className="text-2xl font-bold font-mono text-primary">{tokensReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border/30">
                      <span className="text-sm text-muted-foreground font-semibold">Current Value</span>
                      <span className="text-xl font-bold font-mono">${investAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-semibold flex items-center gap-1">
                        Projected Value (1.5x)
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </span>
                      <span className="text-2xl font-bold font-mono text-green-600">${potentialValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/80 border border-blue-200/50">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-800 font-bold">Multi-sig</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/80 border border-purple-200/50">
                      <Lock className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-purple-800 font-bold">Audited</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-5 rounded-2xl border-2 border-border/30">
                    <div className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      How to Invest
                    </div>
                    Send SOL to the presale address above to receive {project.symbol} tokens at ${project.price} each.
                    <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground/80 flex items-center justify-between">
                      <span>Minimum: 0.1 SOL</span>
                      <span>Maximum: 100 SOL</span>
                    </div>
                  </div>

                  {/* CTA Buttons - Ultra Premium */}
                  <div className="space-y-3">
                    <Button className="w-full h-16 bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-bold text-lg rounded-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Wallet className="w-6 h-6 mr-3 transition-transform duration-500 group-hover:rotate-12 relative z-10" />
                      <span className="relative z-10">Connect Wallet & Buy {project.symbol}</span>
                      <ChevronRight className="w-5 h-5 ml-3 transition-transform duration-500 group-hover:translate-x-2 relative z-10" />
                    </Button>

                    <Button variant="outline" className="w-full h-14 rounded-2xl font-semibold border-2 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group">
                      <Globe className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                      View Whitepaper
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Token Distribution - Enhanced Visualization */}
            <Card
              ref={(el) => { cardRefs.current['tokenomics'] = el }}
              onMouseMove={(e) => handleCardMouseMove(e, 'tokenomics')}
              onMouseLeave={() => handleCardMouseLeave('tokenomics')}
              className="p-8 border-2 border-border/30 rounded-2xl bg-white/80 backdrop-blur-xl hover:border-primary/40 transition-all duration-700 hover:shadow-[0_20px_100px_rgba(59,130,246,0.15)] transform-gpu"
              style={{ transformStyle: 'preserve-3d', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-3">
                <Coins className="w-6 h-6 text-primary" />
                Token Distribution
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500', gradient: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', description: 'Initial token sale to early investors' },
                  { label: 'Liquidity', value: project.tokenomics.liquidity, color: 'bg-green-500', gradient: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30', description: 'DEX liquidity pool funding' },
                  { label: 'Treasury', value: project.tokenomics.treasury, color: 'bg-purple-500', gradient: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', description: 'Community rewards & growth' },
                  { label: 'Team', value: project.tokenomics.team, color: 'bg-gray-500', gradient: 'from-gray-500/20 to-gray-500/5', border: 'border-gray-500/30', description: 'Team allocation (vested)' },
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br ${item.gradient} border-2 ${item.border} hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                        <span className="text-base font-bold">{item.label}</span>
                      </div>
                      <span className="text-2xl font-bold tabular-nums">{item.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000 rounded-full shadow-lg`}
                        style={{ width: mounted ? `${item.value}%` : '0%', transitionDelay: `${i * 100}ms` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 font-medium">{item.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -20px) rotate(-5deg); }
          75% { transform: translate(-10px, -10px) rotate(3deg); }
        }
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient { animation: gradient 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
