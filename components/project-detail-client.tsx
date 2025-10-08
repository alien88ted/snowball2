"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock, Zap, Copy, Check } from "lucide-react"
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
      {/* Back Button */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <Link href="/explorer">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explorer
          </Button>
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="max-w-[1200px] mx-auto px-6 pb-12">
        <div className="relative group">
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/60" />
          <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/60" />
          <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/60" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-all duration-300 group-hover:border-accent/60" />

          <div className="w-full h-[300px] md:h-[400px] bg-white border-2 border-border/40 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black tracking-tighter">
                {project.symbol}
              </div>
              <div className="text-2xl md:text-3xl font-serif text-gray-600 mt-4 tracking-tight">
                {project.category}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 border-2 border-border/40 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden">
                    {mounted && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={generateProjectIcon(project.symbol)}
                        alt={project.name}
                        className="w-full h-full object-contain p-1"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold font-serif tracking-[-0.01em]">{project.name}</h1>
                    <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                  project.status === "presale" ? "bg-green-50 text-green-700 border border-green-200" :
                  project.status === "live" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                  "bg-gray-50 text-gray-700 border border-gray-200"
                }`}>
                  {project.status === "presale" && (
                    <div className="flex items-center gap-2">
                      <div className="relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      </div>
                      Presale Live
                    </div>
                  )}
                </span>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Presale Address */}
              <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Presale Address (Solana)
                  </span>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background hover:bg-muted transition-colors text-xs font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <code className="text-sm font-mono text-foreground break-all">
                  {project.presaleAddress}
                </code>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Funding Progress
                  </span>
                  <span className="text-sm font-bold tabular-nums">
                    ${animatedRaised.toLocaleString()} / ${(project.fundingGoal / 1000)}K
                  </span>
                </div>
                <div className="relative h-3 bg-background/70 rounded-full overflow-hidden border border-border/50 shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {presaleStats?.contributors || 0} contributors
                  </span>
                  <span className="text-xs text-primary font-bold">
                    {progressPercentage.toFixed(1)}% funded
                  </span>
                </div>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15">
                  <div className="text-xs text-muted-foreground/70 mb-1">Token Price</div>
                  <div className="text-2xl font-bold font-serif">${project.price}</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-xs text-muted-foreground/70 mb-1">Goal</div>
                  <div className="text-2xl font-bold font-serif">${(project.fundingGoal / 1000)}K</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-xs text-muted-foreground/70 mb-1">Location</div>
                  <div className="text-xl font-bold font-serif truncate">{project.location.split(',')[0]}</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-xs text-muted-foreground/70 mb-1">Opening</div>
                  <div className="text-xl font-bold font-serif">{project.opening}</div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-bold font-serif mb-4">What You Get</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                      <span className="text-green-500 mt-0.5 font-bold">✓</span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Milestones */}
            <Card className="p-8 border-2 border-border/40 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold font-serif mb-6">Funding Milestones</h3>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => {
                  const isReached = animatedRaised >= milestone.target
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                        isReached
                          ? 'bg-green-50 border-green-200'
                          : 'bg-muted/20 border-border/40 hover:border-border/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm ${
                        isReached
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{milestone.description}</span>
                          <span className="text-sm font-bold">${(milestone.target / 1000)}K</span>
                        </div>
                      </div>
                      {isReached && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Store Mockups */}
            <Card className="p-8 border-2 border-border/40 hover:border-primary/50 transition-all duration-300">
              <StoreMockups projectName={project.name} projectSymbol={project.symbol} />
            </Card>

            {/* Tokenomics */}
            <Card className="p-8 border-2 border-border/40 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold font-serif mb-6">Token Distribution</h3>
              <div className="space-y-3">
                {[
                  { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500' },
                  { label: 'Liquidity Pool', value: project.tokenomics.liquidity, color: 'bg-green-500' },
                  { label: 'Treasury (Rewards)', value: project.tokenomics.treasury, color: 'bg-purple-500' },
                  { label: 'Team', value: project.tokenomics.team, color: 'bg-gray-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm flex-1">{item.label}</span>
                    <span className="text-sm font-bold">{item.value}%</span>
                    <div className="w-32 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000`}
                        style={{ width: mounted ? `${item.value}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - CTA & Countdown */}
          <div className="space-y-6">
            {/* Invest CTA */}
            <Card className="p-6 border-2 border-border/40 sticky top-6">
              <h3 className="text-lg font-bold font-serif mb-4">Invest Now</h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 border border-green-200/40">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-bold text-green-800">25% OFF - Early Stage</span>
                  </div>
                  <div className="text-2xl font-bold font-serif text-green-900">${project.price}</div>
                  <div className="text-xs text-green-700 mt-1">per token</div>
                </div>

                <div className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg">
                  Send SOL to the presale address above to receive {project.symbol} tokens at ${project.price} each.
                </div>

                <Button className="w-full h-12 bg-black hover:bg-gray-900 text-white font-bold">
                  <Zap className="w-4 h-4 mr-2" />
                  Buy {project.symbol}
                </Button>

                <Button variant="outline" className="w-full h-12">
                  Download Whitepaper
                </Button>
              </div>
            </Card>

            {/* Countdown */}
            <Card className="p-6 border-2 border-border/40">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold">Launch Countdown</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Mins' },
                  { value: countdown.seconds, label: 'Secs' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold font-serif tabular-nums">{String(item.value).padStart(2, '0')}</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
