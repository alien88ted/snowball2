"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, Target, TrendingUp, Users, Coins, Clock } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Hero2Background } from "./hero2-background"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
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
            <h1 className="text-center text-6xl md:text-7xl lg:text-[90px] font-serif font-bold tracking-[-0.02em] leading-[1.1]">
              <span className="block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">The $NOW Model.</span>
              <span className="block mt-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Own Together.</span>
            </h1>

            <p className="max-w-2xl text-center text-muted-foreground/80 text-[17px] md:text-xl leading-[1.6]">
              Tokenize real businesses with the $NOW model. Our first launch: $COFFEE - a revolutionary
              coffee shop in Beirut where customers and employees become owners.
            </p>

            {/* CTA Buttons - Refined */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
              <Link href="/explorer" className="flex-1">
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)]">
                  <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-[17px]">
                    <span>Invest in $COFFEE</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border/60 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:translate-y-[-1px] hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.15)]">
                  <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-[17px]">
                    <span>Download Whitepaper</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
              {[
                { icon: "✓", text: "Real business equity" },
                { icon: "✓", text: "Customer ownership" },
                { icon: "✓", text: "Employee token rewards" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 flex items-center justify-center text-primary text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                    {item.icon}
                  </div>
                  <span className="text-sm text-muted-foreground/80 font-medium group-hover:text-foreground transition-colors duration-300">
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

                  {/* Funding Progress - Honest Display */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-[0.08em]">Funding Progress</span>
                      <span className="text-xs font-bold text-foreground tabular-nums">
                        ${project.raised.toLocaleString()} / ${(project.fundingGoal / 1000)}K
                      </span>
                    </div>
                    <div className="relative h-2.5 bg-background/70 rounded-full overflow-hidden border border-border/50">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500"
                        style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '0%' }}
                      />
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

                    {/* Right: Tokenomics - Improved Spacing */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Coins className="w-4 h-4 text-muted-foreground/70" />
                        <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-[0.08em]">Distribution</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500' },
                          { label: 'Liquidity', value: project.tokenomics.liquidity, color: 'bg-green-500' },
                          { label: 'Treasury', value: project.tokenomics.treasury, color: 'bg-purple-500' },
                          { label: 'Team', value: project.tokenomics.team, color: 'bg-orange-500' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              <div className={`w-2 h-2 rounded-full ${item.color}`} />
                              <span className="text-xs text-muted-foreground/80">{item.label}</span>
                            </div>
                            <span className="text-xs font-bold text-foreground tabular-nums">{item.value}%</span>
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