"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { getProject } from "@/lib/projects"
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
      {/* Background Gradients */}
      <div className="hero-bg"></div>

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
          </div>

          {/* Featured Launch - simplified for now while fixing build */}
          <div className="w-full max-w-4xl border border-border/50 bg-card/30 backdrop-blur-sm p-12">
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-border/20">
              <div>
                <h2 className="text-5xl font-mono font-bold tracking-[-0.02em]">$COFFEE</h2>
                <p className="text-sm font-mono text-muted-foreground mt-2">BEIRUT // LEBANON // 2025</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-500">ACTIVE</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {countdown.days}:{countdown.hours.toString().padStart(2, '0')}:{countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/50 p-6 border border-border/10">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">PRICE_USD</div>
                <div className="text-4xl font-mono font-light">{project.price}</div>
              </div>
              <div className="bg-card/50 p-6 border border-border/10">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">PROGRESS_%</div>
                <div className="text-4xl font-mono font-light">{progressPercentage.toFixed(1)}</div>
                <div className="text-[10px] font-mono text-primary mt-1">$ {animatedRaised.toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-4 text-xs font-mono text-muted-foreground">
              Wallet: SOL {walletTotals.sol.toFixed(3)} | USDC {walletTotals.usdc.toLocaleString()} | Total $ {walletTotals.totalUsd.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
