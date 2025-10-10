"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, TrendingUp, Users, Clock, Zap, Award } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Hero2Background } from "./hero2-background"
import { motion } from "framer-motion"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export function HeroSection() {
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
    <section ref={heroRef} className="pt-32 pb-24 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Background Gradients */}
      <Hero2Background />

      {/* Ethereal Light Columns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" style={{ animationDelay: '0s', animation: 'fadeInOut 6s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[40%] w-[1px] h-full bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" style={{ animationDelay: '2s', animation: 'fadeInOut 6s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[60%] w-[1px] h-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" style={{ animationDelay: '4s', animation: 'fadeInOut 6s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" style={{ animationDelay: '1s', animation: 'fadeInOut 6s ease-in-out infinite' }} />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-20">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-11">
            <h1 className="text-center text-6xl md:text-7xl lg:text-[100px] font-serif font-bold tracking-[-0.03em] leading-[1.05] relative">
              {/* Multi-layered Atmospheric Glow */}
              <span className="absolute inset-0 blur-[120px] bg-gradient-to-br from-primary/25 via-accent/20 to-transparent opacity-70" />
              <span className="absolute inset-0 blur-[80px] bg-gradient-to-tl from-accent/20 via-primary/15 to-transparent opacity-60" />
              <span className="absolute inset-0 blur-[40px] bg-gradient-to-br from-primary/15 to-transparent opacity-50" />

              <span className="block relative mb-2">
                <span className="inline-block bg-gradient-to-br from-foreground via-foreground to-foreground/90 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out] [text-shadow:0_2px_20px_rgba(0,0,0,0.03)]" style={{ WebkitTextStroke: '0.5px rgba(0,0,0,0.02)' }}>
                  Invest in Real Businesses.
                </span>
              </span>
              <span className="block relative">
                <span className="inline-block bg-gradient-to-r from-primary via-accent via-primary to-accent bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out_0.2s_backwards] bg-[length:300%_100%] animate-[shimmerText_5s_ease-in-out_infinite] [text-shadow:0_0_60px_rgba(59,130,246,0.4)]" style={{ WebkitTextStroke: '0.5px rgba(59,130,246,0.1)' }}>
                  Own Real Profits.
                </span>
              </span>
            </h1>

            <p className="max-w-2xl text-center text-muted-foreground/90 text-[18px] md:text-[21px] leading-[1.75] font-light tracking-[-0.01em]">
              The $NOW platform transforms everyday businesses into investable assets.
              <span className="inline-block mx-2 w-1 h-1 rounded-full bg-primary/40 align-middle" />
              Coffee shops, gyms, restaurants—each launches tokens, raises community capital, and shares profits with holders.
              <span className="block mt-4 font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Our first launch: $COFFEE, a premium café in Beirut.
              </span>
            </p>

            {/* CTA Buttons - Enhanced Primary */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl">
              <Link href="/explorer" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[0] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s' }}
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
                  <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-black via-gray-900 to-black" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative h-full flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm flex items-center justify-center group-hover:from-primary/50 group-hover:to-accent/50 transition-all duration-300 border border-white/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] text-white/60 font-medium tracking-wide">Live Now</div>
                        <div className="text-[17px] font-bold tracking-[-0.01em]">Explore Launches</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[1] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer border-2 border-border/50 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-2 text-foreground font-semibold text-[15px] tracking-[-0.01em]">
                    <span>Read Whitepaper</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              {[
                { icon: Award, text: "SEC-Compliant Framework", color: "text-blue-600" },
                { icon: Users, text: "Real Revenue Share", color: "text-green-600" },
                { icon: TrendingUp, text: "Tradeable Tokens", color: "text-purple-600" },
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

          {/* Featured Launch Section */}
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/30 mb-7 shadow-[0_0_25px_rgba(34,197,94,0.18)] backdrop-blur-sm">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-[13px] font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-[0.03em] uppercase">
                  Launch #1 — Live Now
                </span>
              </div>

              {/* Refined Title Treatment */}
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold font-serif tracking-[-0.025em] mb-6 relative inline-block leading-[1.1]">
                <span className="relative z-10 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
                  Featured Launch: $COFFEE
                </span>
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/4 via-accent/8 to-primary/4 blur-3xl -z-10 opacity-80" />
              </h2>

              <p className="text-muted-foreground/85 text-lg md:text-[19px] max-w-2xl mx-auto leading-[1.65] font-light tracking-[-0.01em]">
                Our first tokenized business is raising <span className="font-semibold text-foreground">$500K</span> to open a premium café in Beirut.
                <span className="block mt-2.5 text-[16px] text-muted-foreground/65">Get in at presale prices before launch.</span>
              </p>
            </div>

            {/* $COFFEE Card - Artisan Perfected */}
            <div className="max-w-2xl mx-auto w-full relative group/card">
            {/* Refined Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/35 rounded-tl-2xl transition-all duration-500 group-hover/card:border-primary/55 group-hover/card:w-24 group-hover/card:h-24" />
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/35 rounded-tr-2xl transition-all duration-500 group-hover/card:border-primary/55 group-hover/card:w-24 group-hover/card:h-24" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/35 rounded-bl-2xl transition-all duration-500 group-hover/card:border-accent/55 group-hover/card:w-24 group-hover/card:h-24" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/35 rounded-br-2xl transition-all duration-500 group-hover/card:border-accent/55 group-hover/card:w-24 group-hover/card:h-24" />

            <Card className="relative hover:border-foreground/20 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.18),0_0_1px_rgba(0,0,0,0.06)] overflow-hidden group">
              {/* Premium glassmorphic background */}
              <div className="absolute inset-0 bg-gradient-to-br from-card/85 via-card/70 to-card/85 backdrop-blur-md" />

              {/* Subtle shimmer overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
              </div>

              <div className="relative">
                {/* Refined Header */}
                <div className="relative bg-gradient-to-br from-white via-white/98 to-gray-50/40 border-b border-border/40 px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Logo + Name */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative group/logo">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-[52px] h-[52px] rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden transition-all duration-500 group-hover/logo:border-primary/40 group-hover/logo:shadow-lg group-hover/logo:shadow-primary/10 group-hover/logo:scale-105">
                          <img
                            src={generateCoffeeIcon()}
                            alt={project.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[22px] font-bold font-serif tracking-[-0.015em] leading-none bg-gradient-to-br from-foreground via-foreground to-foreground/75 bg-clip-text text-transparent">
                          {project.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground/70 font-medium tracking-wide mt-1 uppercase">{project.category}</p>
                      </div>
                    </div>

                    {/* Presale Status - Refined */}
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 shadow-sm shadow-green-500/8">
                      <div className="relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      </div>
                      <span className="text-[13px] font-bold text-green-700 tracking-tight">Presale Live</span>
                    </div>
                  </div>
                </div>

                {/* Main Content - Artisan Layout */}
                <div className="px-6 py-6">
                  {/* PRESALE PRICING - Premium */}
                  <div className="mb-4 p-5 rounded-xl bg-gradient-to-br from-card/70 to-background/50 border border-border/40 shadow-sm">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <div className="text-[11px] text-muted-foreground/65 font-medium mb-1.5 uppercase tracking-wider">Presale Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-[38px] font-bold font-serif tracking-[-0.025em] text-foreground leading-none">
                            ${project.price}
                          </span>
                          <span className="text-sm text-muted-foreground/45 line-through mb-1">$0.20</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground/55 mt-1">per token</div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-lg border border-green-200/40 dark:border-green-800/40 mb-1.5">
                          <span className="text-[13px] font-semibold text-green-700 dark:text-green-400">25% discount</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground/55">Launch: $0.20</div>
                      </div>
                    </div>
                  </div>

                  {/* KEY HIGHLIGHTS - Compact */}
                  <div className="mb-4 grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-50/35 to-emerald-50/35 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/25 dark:border-green-800/30 transition-all duration-300 hover:border-green-300/40 hover:shadow-sm">
                      <div className="text-[10px] text-muted-foreground/65 mb-1 uppercase tracking-wider">Returns</div>
                      <div className="text-[13px] font-bold text-foreground">Quarterly Profits</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50/35 to-indigo-50/35 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/25 dark:border-blue-800/30 transition-all duration-300 hover:border-blue-300/40 hover:shadow-sm">
                      <div className="text-[10px] text-muted-foreground/65 mb-1 uppercase tracking-wider">Security</div>
                      <div className="text-[13px] font-bold text-foreground">Multi-sig Treasury</div>
                    </div>
                  </div>

                  {/* PROJECT OVERVIEW - Refined */}
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-card/45 to-background/45 border border-border/35">
                    <p className="text-[14px] text-foreground/90 font-medium mb-3 leading-[1.6] tracking-[-0.01em]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[13px] font-semibold text-foreground/85">Beirut, Lebanon</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[13px] font-semibold text-foreground/85">Opening Q4 2025</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-purple-600" />
                        <span className="text-[13px] font-semibold text-foreground/85">Tech Hub Location</span>
                      </div>
                    </div>
                  </div>

                  {/* FUNDING PROGRESS - Streamlined */}
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/[0.035] to-accent/[0.035] border border-primary/[0.08]">
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.1em]">Funding Progress</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[17px] font-bold text-foreground tabular-nums">
                            ${animatedRaised.toLocaleString()}
                          </span>
                          <span className="text-[13px] text-muted-foreground/65">
                            of ${(project.fundingGoal / 1000)}K
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[22px] font-bold text-primary tabular-nums leading-none">{progressPercentage.toFixed(0)}%</div>
                        <div className="text-[10px] text-muted-foreground/55 mt-0.5 uppercase tracking-wider">funded</div>
                      </div>
                    </div>
                    <div className="relative h-2.5 bg-background/60 rounded-full overflow-hidden border border-border/40 shadow-inner mb-2.5">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.25)]"
                        style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }}
                      />
                    </div>
                    {/* Social Proof */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-muted-foreground/60" />
                        <span className="text-[11px] text-muted-foreground/65">
                          <span className="font-bold text-foreground/85">0</span> investors
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground/65">
                        <span className="font-bold text-foreground/85">{countdown.days}</span> days until launch
                      </span>
                    </div>
                  </div>


                  {/* LOCATION DETAILS - Compact */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <HoverCard openDelay={200} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-card/45 to-background/45 border border-border/35 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-md group">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <div>
                              <div className="text-[10px] text-muted-foreground/65 mb-0.5 uppercase tracking-wider">Location</div>
                              <div className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                                {project.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                              className="w-[320px] p-0 overflow-hidden border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl"
                              align="start"
                              sideOffset={8}
                            >
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {/* Header with Map Visual */}
                                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-border/30 min-h-[160px] overflow-hidden group/map">
                                  {/* Embedded Map - Zoomed out to show region */}
                                  <div className="absolute inset-0">
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384429.8397949217!2d33.0!3d33.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut%2C%20Lebanon!5e0!3m2!1sen!2sus!4v1234567890"
                                      className="w-full h-full opacity-30 dark:opacity-20 grayscale-[50%] contrast-110"
                                      style={{ border: 0 }}
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                      title="Beirut Location Map"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/70 dark:via-slate-900/40 dark:to-slate-900/70" />
                                  </div>

                                  {/* Simple pin marker */}
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <motion.div
                                      initial={{ scale: 0, y: -20 }}
                                      animate={{ scale: 1, y: 0 }}
                                      transition={{
                                        delay: 0.1,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                      }}
                                    >
                                      <div className="relative">
                                        {/* Subtle pulse */}
                                        <motion.div
                                          className="absolute -inset-2 rounded-full bg-primary/20"
                                          animate={{
                                            scale: [1, 1.5],
                                            opacity: [0.4, 0],
                                          }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeOut"
                                          }}
                                        />
                                        {/* Compact pin */}
                                        <div className="relative bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-lg ring-2 ring-primary/30">
                                          <MapPin className="w-3.5 h-3.5 text-primary" fill="currentColor" />
                                        </div>
                                      </div>
                                    </motion.div>
                                  </div>

                                  {/* View larger map link */}
                                  <a
                                    href="https://www.google.com/maps/place/Beirut,+Lebanon/@33.8938,35.5018,11z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-2 right-2 z-20 text-[10px] text-muted-foreground/60 hover:text-primary transition-colors bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded backdrop-blur-sm"
                                  >
                                    View larger map →
                                  </a>
                                </div>

                                {/* Details Grid */}
                                <div className="p-4 space-y-3">
                                  {/* Coordinates with copy hint */}
                                  <motion.div
                                    className="flex items-center gap-3 group/coord cursor-pointer hover:bg-muted/30 -mx-2 px-2 py-1.5 rounded-lg transition-colors duration-200"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => navigator.clipboard.writeText("33.8938°N, 35.5018°E")}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">GPS</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-xs text-muted-foreground/70 mb-0.5">Coordinates</div>
                                      <div className="text-sm font-mono font-semibold text-foreground group-hover/coord:text-primary transition-colors">
                                        33.8938°N, 35.5018°E
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground/50 opacity-0 group-hover/coord:opacity-100 transition-opacity">
                                      Click to copy
                                    </div>
                                  </motion.div>

                                  {/* Timezone */}
                                  <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 flex items-center justify-center flex-shrink-0">
                                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-xs text-muted-foreground/70 mb-0.5">Time Zone</div>
                                      <div className="text-sm font-semibold text-foreground">
                                        EET (UTC+2) • {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Beirut', hour: '2-digit', minute: '2-digit' })}
                                      </div>
                                    </div>
                                  </motion.div>

                                  {/* Tech Hub Status */}
                                  <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center flex-shrink-0">
                                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-xs text-muted-foreground/70 mb-0.5">Regional Hub</div>
                                      <div className="text-sm font-semibold text-foreground">
                                        Growing Tech & Startup Scene
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>

                                {/* Footer with subtle pattern */}
                                <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 px-4 py-3 border-t border-border/30">
                                  {/* Decorative dots pattern */}
                                  <div className="absolute inset-0 opacity-[0.02]">
                                    <div className="absolute inset-0" style={{
                                      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
                                      backgroundSize: '12px 12px'
                                    }} />
                                  </div>
                                  <div className="relative text-xs text-muted-foreground/70 text-center font-medium">
                                    Strategic location connecting East & West
                                  </div>
                                </div>
                              </motion.div>
                            </HoverCardContent>
                          </HoverCard>

                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-card/45 to-background/45 border border-border/35 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-muted-foreground/65 mb-0.5 uppercase tracking-wider">Opening</div>
                          <div className="text-[13px] font-semibold text-foreground">{project.opening}</div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* CTA - Premium */}
                  <Link href="/explorer" className="block">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/[0.07] to-accent/[0.07] border border-primary/20 transition-all duration-500 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group hover:translate-y-[-1px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[15px] font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors tracking-[-0.01em]">
                            View Full Details & Invest
                          </div>
                          <div className="text-[12px] text-muted-foreground/65">
                            Presale: $0.15/token
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
    </section>
  )
}