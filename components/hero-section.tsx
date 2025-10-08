"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock, Zap, Award } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Hero2Background } from "./hero2-background"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])

  // Magnetic cursor effect for CTAs
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 100

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3
      ctaRefs.current[index]!.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ctaRefs.current[index]) {
      ctaRefs.current[index]!.style.transform = 'translate(0, 0)'
    }
  }

  useEffect(() => {
    setMounted(true)

    // Animate raised amount from 0 to current
    const targetAmount = 0
    const duration = 2000
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setAnimatedRaised(Math.floor(targetAmount * eased))

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    animateNumber()

    // Countdown to Q4 2025 (Oct 1, 2025)
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

  const project = {
    name: "$COFFEE",
    symbol: "COFFEE",
    description: "Tokenized coffee shop in Beirut. Every cup you buy makes you an owner.",
    category: "First $NOW Launch",
    price: 0.15,
    fundingGoal: 500000,
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "Presale Live",
    tokenomics: {
      presale: 33,
      liquidity: 33,
      treasury: 33,
      team: 1
    }
  }

  const progressPercentage = (project.raised / project.fundingGoal) * 100

  // Generate clean SVG icon - minimal, on-brand serif typography
  const generateCoffeeIcon = () => {
    const svg = `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#FFFFFF"/>
        <text x="128" y="155" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#000000" text-anchor="middle" letter-spacing="-1">
          $COFFEE
        </text>
      </svg>
    `
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  return (
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <Hero2Background />
      <div className="absolute inset-0">
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-16">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-10">
            <h1 className="text-center text-6xl md:text-7xl lg:text-[100px] font-serif font-bold tracking-[-0.03em] leading-[1.05] relative">
              {/* Subtle glow effect */}
              <span className="absolute inset-0 blur-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent opacity-50" />

              <span className="block relative">
                <span className="inline-block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out]">
                  The $NOW Model.
                </span>
              </span>
              <span className="block mt-4 relative">
                <span className="inline-block bg-gradient-to-br from-primary via-accent to-primary/70 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out_0.2s_backwards] bg-[length:200%_100%] animate-[shimmerText_3s_ease-in-out_infinite]">
                  Own Together.
                </span>
              </span>
            </h1>

            <style jsx>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes shimmerText {
                0%, 100% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
              }
            `}</style>

            <p className="max-w-2xl text-center text-muted-foreground/80 text-[17px] md:text-xl leading-[1.6]">
              Tokenize real businesses with the $NOW model. Our first launch: $COFFEE - a revolutionary
              coffee shop in Beirut where customers and employees become owners.
            </p>

            {/* CTA Buttons - Magnetic & Enhanced */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
              <Link href="/explorer" className="flex-1">
                <div
                  ref={el => ctaRefs.current[0] = el}
                  onMouseMove={(e) => handleMouseMove(e, 0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                  className="group relative h-14 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.4)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, box-shadow 0.3s' }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-[17px] tracking-[-0.01em]">
                    <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Invest in $COFFEE</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div
                  ref={el => ctaRefs.current[1] = el}
                  onMouseMove={(e) => handleMouseMove(e, 1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                  className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border/60 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_12px_28px_-8px_rgba(59,130,246,0.2)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-[17px] tracking-[-0.01em]">
                    <span>Download Whitepaper</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              {[
                { icon: Award, text: "Real Business Assets", color: "text-blue-600" },
                { icon: Users, text: "Community Owned", color: "text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                    <item.icon className={`w-3.5 h-3.5 ${item.color} transition-transform duration-300 group-hover:rotate-12`} />
                  </div>
                  <span className="text-sm text-muted-foreground/80 font-semibold group-hover:text-foreground transition-colors duration-300 tracking-[-0.01em]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* $COFFEE Card with Corner Decorations - REDESIGNED */}
          <div className="max-w-2xl w-full relative group/card">
            {/* Corner Decorations - Consistent 20px sizing */}
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-300 group-hover/card:border-primary/60" />
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-all duration-300 group-hover/card:border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-300 group-hover/card:border-accent/60" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-all duration-300 group-hover/card:border-accent/60" />

            <Card className="relative hover:border-foreground/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
              {/* Masked edge gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              </div>

              <div className="relative">
                {/* Compact Header - Clean & On-brand */}
                <div className="relative bg-gradient-to-br from-white via-white to-gray-50/30 border-b border-border/40 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    {/* Logo + Name */}
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative w-14 h-14 rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                          <img
                            src={generateCoffeeIcon()}
                            alt={project.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-serif tracking-[-0.01em] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {project.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium tracking-wide mt-0.5">{project.category}</p>
                      </div>
                    </div>

                    {/* Presale Status - Enhanced Urgency */}
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 shadow-sm shadow-green-500/10">
                      <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full z-10" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      </div>
                      <span className="text-sm font-bold text-green-700 tracking-tight">Presale Live</span>
                    </div>
                  </div>
                </div>

                {/* Main Content - Optimized Layout */}
                <div className="px-6 py-5">
                  {/* Price + Discount Row - Enhanced Hierarchy */}
                  <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2.5 mb-1">
                          <span className="text-[40px] font-bold font-serif tracking-[-0.02em] bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-none">
                            ${project.price}
                          </span>
                          <span className="text-sm text-muted-foreground/60 line-through">$0.20</span>
                        </div>
                        <div className="text-xs text-muted-foreground/70 font-medium">per $COFFEE token</div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3.5 py-2 rounded-lg transition-all duration-300 hover:bg-green-100 hover:shadow-md hover:shadow-green-500/10">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-bold">25% OFF</span>
                        </div>
                        <div className="text-xs text-muted-foreground/70 mt-1.5 font-medium">Early Stage</div>
                      </div>
                    </div>
                  </div>

                  {/* Description - Optimized Readability */}
                  <p className="text-[15px] text-muted-foreground/80 mb-6 leading-[1.6]">
                    {project.description}
                  </p>

                  {/* Funding Progress with Milestones */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-[0.08em]">Funding Progress</span>
                      <span className="text-xs font-bold text-foreground tabular-nums">
                        ${animatedRaised.toLocaleString()} / ${(project.fundingGoal / 1000)}K
                      </span>
                    </div>
                    <div className="relative h-3 bg-background/70 rounded-full overflow-hidden border border-border/50 shadow-inner">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }}
                      />
                      {/* Milestone markers */}
                      {[25, 50, 75].map((milestone) => (
                        <div
                          key={milestone}
                          className="absolute top-0 bottom-0 w-0.5 bg-border/40"
                          style={{ left: `${milestone}%` }}
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-background border border-border/60 shadow-sm" />
                        </div>
                      ))}
                    </div>
                    {/* Milestone labels */}
                    <div className="flex justify-between mt-2 text-[10px] text-muted-foreground/60 font-medium tabular-nums">
                      <span>$0</span>
                      <span>$125K</span>
                      <span>$250K</span>
                      <span>$375K</span>
                      <span className="text-primary font-bold">$500K</span>
                    </div>
                  </div>

                  {/* Launch Countdown Timer */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 border border-green-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-800 uppercase tracking-[0.08em]">Launch Countdown</span>
                      </div>
                      <span className="text-xs text-green-700 font-medium">Q4 2025</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: countdown.days, label: 'Days' },
                        { value: countdown.hours, label: 'Hours' },
                        { value: countdown.minutes, label: 'Mins' },
                        { value: countdown.seconds, label: 'Secs' }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-2 bg-white/60 rounded-lg border border-green-200/40 backdrop-blur-sm">
                          <div className="text-xl font-bold text-green-700 tabular-nums leading-none mb-1 font-serif">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-[9px] text-green-600/70 uppercase tracking-wider font-semibold">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-Column Grid - Details + Tokenomics */}
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    {/* Left: Key Details */}
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground/70 mb-0.5">Location</div>
                          <div className="text-sm font-semibold text-foreground">{project.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground/70 mb-0.5">Opening</div>
                          <div className="text-sm font-semibold text-foreground">{project.opening}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Tokenomics with Animated Chart */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Coins className="w-4 h-4 text-muted-foreground/70" />
                        <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-[0.08em]">Token Distribution</span>
                      </div>

                      {/* Animated Donut Chart */}
                      <div className="relative w-full aspect-square mb-3 max-w-[140px] mx-auto">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                          {[
                            { label: 'Presale', value: 33, color: '#3b82f6', offset: 0 },
                            { label: 'Liquidity', value: 33, color: '#10b981', offset: 33 },
                            { label: 'Treasury', value: 33, color: '#a855f7', offset: 66 },
                            { label: 'Team', value: 1, color: '#f97316', offset: 99 },
                          ].map((item, i) => {
                            const radius = 40
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
                                strokeWidth="16"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out opacity-90 hover:opacity-100"
                                style={{
                                  animation: mounted ? `drawCircle 1.5s ease-out ${i * 0.1}s forwards` : 'none',
                                  strokeDasharray: mounted ? strokeDasharray : '0 ' + circumference
                                }}
                              />
                            )
                          })}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground font-serif">100%</div>
                            <div className="text-[8px] text-muted-foreground/70 uppercase tracking-wider">Supply</div>
                          </div>
                        </div>
                      </div>

                      {/* Legend with bars */}
                      <div className="space-y-2">
                        {[
                          { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500' },
                          { label: 'Liquidity', value: project.tokenomics.liquidity, color: 'bg-green-500' },
                          { label: 'Treasury', value: project.tokenomics.treasury, color: 'bg-purple-500' },
                          { label: 'Team', value: project.tokenomics.team, color: 'bg-orange-500' },
                        ].map((item, i) => (
                          <div key={i} className="group cursor-pointer">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 flex-1">
                                <div className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-125 transition-transform duration-300`} />
                                <span className="text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">{item.label}</span>
                              </div>
                              <span className="text-xs font-bold text-foreground tabular-nums">{item.value}%</span>
                            </div>
                            <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.color} transition-all duration-1000 ease-out`}
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
                  </div>

                  {/* Investment Highlights - Enhanced Hierarchy */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-[0.08em]">Why Invest</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { text: 'First tokenized cafe', priority: 'high' },
                        { text: 'Customer ownership', priority: 'high' },
                        { text: 'Employee equity', priority: 'medium' },
                        { text: 'Prime location', priority: 'medium' }
                      ].map((highlight, i) => (
                        <div key={i} className={`inline-flex items-center gap-1.5 bg-background/70 px-3 py-1.5 rounded-full border transition-all duration-300 hover:bg-background hover:border-primary/30 ${
                          highlight.priority === 'high' ? 'border-border/50' : 'border-border/30'
                        }`}>
                          <div className={`rounded-full bg-gradient-to-br from-primary to-accent ${
                            highlight.priority === 'high' ? 'w-1.5 h-1.5' : 'w-1 h-1'
                          }`} />
                          <span className={`text-xs ${
                            highlight.priority === 'high' ? 'text-foreground font-medium' : 'text-muted-foreground/80'
                          }`}>{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}