"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { getProject } from "@/lib/projects"
import { WorldMapBackground } from "./world-map-background"
// balances and price are now served by our API route to avoid browser CORS issues

export function HeroSection() {
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [walletTotals, setWalletTotals] = useState<{ sol: number; usdc: number; totalUsd: number }>({ sol: 0, usdc: 0, totalUsd: 0 })
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])
  const coffee = getProject("coffee")

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

  // Fetch wallet balances (via API) and animate to total USD
  useEffect(() => {
    const WALLET = coffee?.presaleAddress || '9tH8oUjnjX4pzr6aRmo9V3ESoAZ2yUBQDzgBhfJNc6rM'
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`/api/wallet?address=${WALLET}`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch wallet')
        const data = await res.json()
        const totalUsd = data.totalUsd as number
        if (cancelled) return
        setWalletTotals({ sol: data.sol ?? 0, usdc: data.usdc ?? 0, totalUsd })

        // Animate from current displayed value to new value
        const start = animatedRaised
        const end = Math.floor(totalUsd)
        const duration = 1500
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const value = Math.floor(start + (end - start) * eased)
          setAnimatedRaised(value)
          if (progress < 1 && !cancelled) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      } catch (e) {
        // swallow errors; keep zeros
      }
    }

    load()

    // Optionally refresh every 30s
    const id = setInterval(load, 30000)
    return () => { cancelled = true; clearInterval(id) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const project = {
    name: coffee?.name ?? "$COFFEE",
    symbol: coffee?.symbol ?? "COFFEE",
    description: "Tokenized coffee shop in Beirut. Every cup you buy makes you an owner.",
    category: coffee?.category ?? "First $NOW Launch",
    price: coffee?.price ?? 0.15,
    fundingGoal: coffee?.fundingGoal ?? 500000,
    raised: 0,
    location: coffee?.location ?? "Beirut, Lebanon",
    opening: coffee?.opening ?? "Q4 2025",
    status: "Presale Live",
    tokenomics: coffee?.tokenomics ?? { presale: 33, liquidity: 33, treasury: 33, team: 1 }
  }

  const progressPercentage = (animatedRaised / project.fundingGoal) * 100;

  return (
    <div ref={heroRef} className="pt-32 pb-24 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Enhanced Background Gradients with Depth */}
      <div className="hero-bg"></div>

      {/* Refined Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary light source */}
        <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-accent/6 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[40%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: '14s', animationDelay: '4s' }} />

        {/* Accent lights */}
        <div className="absolute top-[60%] left-[25%] w-[300px] h-[300px] bg-accent/4 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '11s', animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[35%] w-[350px] h-[350px] bg-primary/4 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: '13s', animationDelay: '3s' }} />
      </div>

      {/* World Map Background */}
      <WorldMapBackground />

      {/* Refined Ethereal Light Columns with Depth */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {/* Primary layer */}
        <div className="absolute top-0 left-[15%] w-[2px] h-full bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" style={{ animationDelay: '0s', animation: 'fadeInOut 7s ease-in-out infinite', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[38%] w-[2px] h-full bg-gradient-to-b from-accent/40 via-accent/15 to-transparent" style={{ animationDelay: '2.5s', animation: 'fadeInOut 7s ease-in-out infinite', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[62%] w-[2px] h-full bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" style={{ animationDelay: '5s', animation: 'fadeInOut 7s ease-in-out infinite', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[85%] w-[2px] h-full bg-gradient-to-b from-accent/40 via-accent/15 to-transparent" style={{ animationDelay: '1.5s', animation: 'fadeInOut 7s ease-in-out infinite', filter: 'blur(1px)' }} />

        {/* Accent layer */}
        <div className="absolute top-0 left-[25%] w-[1px] h-full bg-gradient-to-b from-accent/25 via-accent/8 to-transparent" style={{ animationDelay: '3s', animation: 'fadeInOut 8s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[72%] w-[1px] h-full bg-gradient-to-b from-primary/25 via-primary/8 to-transparent" style={{ animationDelay: '4s', animation: 'fadeInOut 8s ease-in-out infinite' }} />
      </div>

      {/* Refined Horizontal Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-20">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-14">
            <h1 className="text-center text-6xl md:text-7xl lg:text-[110px] font-serif font-bold tracking-[-0.04em] leading-[1.02] relative">
              {/* Refined Multi-layered Atmospheric Glow */}
              <span className="absolute inset-0 blur-[140px] bg-gradient-to-br from-primary/30 via-accent/25 to-primary/20 opacity-80 animate-pulse" style={{ animationDuration: '8s' }} />
              <span className="absolute inset-0 blur-[90px] bg-gradient-to-tl from-accent/25 via-primary/20 to-transparent opacity-70" />
              <span className="absolute inset-0 blur-[50px] bg-gradient-to-br from-primary/20 to-accent/15 opacity-60" />

              <span className="block relative mb-3">
                <span className="inline-block bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out] drop-shadow-[0_2px_30px_rgba(0,0,0,0.05)]" style={{ WebkitTextStroke: '0.8px rgba(0,0,0,0.03)' }}>
                  Invest in Real Businesses.
                </span>
              </span>
              <span className="block relative">
                <span className="inline-block bg-gradient-to-r from-primary via-accent via-primary to-accent bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease-out_0.2s_backwards] bg-[length:300%_100%] animate-[shimmerText_5s_ease-in-out_infinite] drop-shadow-[0_0_80px_rgba(59,130,246,0.5)]" style={{ WebkitTextStroke: '1px rgba(59,130,246,0.12)' }}>
                  Own Real Profits.
                </span>
              </span>
            </h1>

            <p className="max-w-2xl text-center text-muted-foreground/95 text-[19px] md:text-[22px] leading-[1.8] font-light tracking-[-0.015em]">
              The <span className="font-semibold text-foreground">$NOW</span> platform transforms everyday businesses into investable assets.
              <span className="inline-block mx-2.5 w-1.5 h-1.5 rounded-full bg-primary/50 align-middle" />
              Coffee shops, gyms, restaurants—each launches tokens, raises community capital, and shares profits with holders.
              <span className="block mt-5 font-semibold text-foreground bg-gradient-to-r from-foreground via-foreground to-foreground/90 bg-clip-text text-transparent">
                Our first launch: <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">$COFFEE</span>, a premium café in Beirut.
              </span>
            </p>

            {/* CTA Buttons - Enhanced with Premium Interactions */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
              <Link href="/explorer" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[0] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] will-change-transform hover:scale-[1.02]"
                  style={{ transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s' }}
                >
                  {/* Refined animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl p-[2.5px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-90" />
                  <div className="absolute inset-[2.5px] rounded-[13px] bg-gradient-to-r from-black via-gray-900 to-black" />

                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1200" />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative h-full flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/35 to-accent/35 backdrop-blur-sm flex items-center justify-center group-hover:from-primary/55 group-hover:to-accent/55 transition-all duration-400 border border-white/25 group-hover:scale-110 group-hover:rotate-6">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] text-white/70 font-medium tracking-wide">Live Now</div>
                        <div className="text-[18px] font-bold tracking-[-0.02em]">Explore Launches</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[1] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer border-2 border-border/60 hover:border-primary/50 transition-all duration-400 bg-card/50 backdrop-blur-sm hover:bg-card/90 hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)] will-change-transform hover:scale-[1.02]"
                  style={{ transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s, border 0.4s, box-shadow 0.4s' }}
                >
                  {/* Enhanced shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1200" />

                  {/* Corner dots */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative h-full flex items-center justify-center gap-2 text-foreground font-semibold text-[16px] tracking-[-0.01em] group-hover:gap-3 transition-all duration-300">
                    <span className="group-hover:translate-x-[-2px] transition-transform duration-300">Read Whitepaper</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Featured Launch - Premium Design */}
          <div className="w-full max-w-4xl group/launch relative">
            {/* Refined outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-3xl opacity-0 group-hover/launch:opacity-100 transition-opacity duration-700" />

            <div className="relative border-2 border-border/60 bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-xl p-12 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover/launch:border-border/80 transition-all duration-500">
              <div className="flex items-start justify-between mb-10 pb-8 border-b border-border/30">
                <div>
                  <h2 className="text-6xl font-mono font-bold tracking-[-0.03em] bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">$COFFEE</h2>
                  <p className="text-sm font-mono text-muted-foreground mt-3 tracking-wider">BEIRUT <span className="text-border/60 mx-2">//</span> LEBANON <span className="text-border/60 mx-2">//</span> 2025</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2.5 justify-end mb-2">
                    <div className="relative">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-500 animate-ping opacity-75" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-green-600 tracking-wider">ACTIVE</span>
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground tracking-wider">
                    {countdown.days}D : {countdown.hours.toString().padStart(2, '0')}H : {countdown.minutes.toString().padStart(2, '0')}M : {countdown.seconds.toString().padStart(2, '0')}S
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="relative group/metric bg-gradient-to-br from-card/70 to-card/50 p-8 border border-border/20 rounded-lg hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(59,130,246,0.15)]">
                  <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">PRICE · USD</div>
                  <div className="text-5xl font-mono font-light tracking-tight">${project.price}</div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/30 group-hover/metric:bg-primary/60 transition-colors" />
                </div>
                <div className="relative group/metric bg-gradient-to-br from-card/70 to-card/50 p-8 border border-border/20 rounded-lg hover:border-accent/40 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)]">
                  <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">PROGRESS · %</div>
                  <div className="text-5xl font-mono font-light tracking-tight">{progressPercentage.toFixed(1)}</div>
                  <div className="text-[11px] font-mono text-primary mt-2 tracking-wider">
                    <span className="text-accent">$</span> {animatedRaised.toLocaleString()}
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent/30 group-hover/metric:bg-accent/60 transition-colors" />
                </div>
              </div>

              <div className="mt-6 px-4 py-3 bg-muted/30 rounded-md border border-border/20">
                <div className="text-xs font-mono text-muted-foreground tracking-wider">
                  <span className="text-foreground/70 font-semibold">WALLET</span>
                  <span className="mx-3 text-border/60">//</span>
                  SOL <span className="text-foreground/80">{walletTotals.sol.toFixed(3)}</span>
                  <span className="mx-3 text-border/60">|</span>
                  USDC <span className="text-foreground/80">{walletTotals.usdc.toLocaleString()}</span>
                  <span className="mx-3 text-border/60">|</span>
                  TOTAL <span className="text-primary font-bold">${walletTotals.totalUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
