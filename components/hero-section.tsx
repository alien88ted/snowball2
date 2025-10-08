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
    description: "Revolutionary tokenized coffee shop in Beirut. Every cup you buy makes you an owner. Employees earn equity, not just wages.",
    category: "First $NOW Launch",
    price: 0.15,
    fundingGoal: 500000,
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q2 2025",
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
        <div className="flex flex-col items-center gap-20">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-10">
            <h1 className="text-center text-6xl md:text-7xl lg:text-[90px] font-serif font-bold tracking-[-0.02em] leading-[1.05]">
              <span className="block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">The $NOW Model.</span>
              <span className="block mt-3 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Own Together.</span>
            </h1>

            <p className="max-w-2xl text-center text-muted-foreground text-lg md:text-xl leading-relaxed">
              Tokenize real businesses with the $NOW model. Our first launch: $COFFEE - a revolutionary
              coffee shop in Beirut where customers and employees become owners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-xl">
              <Link href="/explorer" className="flex-1">
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/20">
                  <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <span>Invest in $COFFEE</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:translate-y-[-1px] hover:shadow-md hover:shadow-primary/10">
                  <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-lg">
                    <span>Download Whitepaper</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              {[
                { icon: "✓", text: "Real business equity" },
                { icon: "✓", text: "Customer ownership" },
                { icon: "✓", text: "Employee token rewards" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary text-sm font-bold transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* $COFFEE Card with Corner Decorations - REDESIGNED */}
          <div className="max-w-2xl w-full relative group/card">
            {/* Corner Decorations - Static, elegant */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover/card:border-primary/50" />
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover/card:border-primary/50" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover/card:border-accent/50" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover/card:border-accent/50" />

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

                    {/* Presale Status - Clean & Minimal */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50/80 border border-green-200/50">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
                      </div>
                      <span className="text-sm font-semibold text-green-700 tracking-tight">Presale Live</span>
                    </div>
                  </div>
                </div>

                {/* Main Content - Optimized Layout */}
                <div className="px-6 py-5">
                  {/* Price + Discount Row */}
                  <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-3xl font-bold font-serif tracking-[-0.01em] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            ${project.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">$0.20</span>
                        </div>
                        <div className="text-xs text-muted-foreground">per $COFFEE token</div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-green-100">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-bold">25% OFF</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Early Stage</div>
                      </div>
                    </div>
                  </div>

                  {/* Description - Condensed */}
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Funding Progress - Inline compact */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Funding</span>
                      <span className="text-xs font-bold text-foreground">
                        ${project.raised.toLocaleString()} / ${(project.fundingGoal / 1000)}K
                      </span>
                    </div>
                    <div className="relative h-2 bg-background/60 rounded-full overflow-hidden border border-border/40">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full"
                        style={{ width: `${Math.max(3, progressPercentage)}%` }}
                      />
                    </div>
                  </div>

                  {/* Two-Column Grid - Details + Tokenomics */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {/* Left: Key Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">Location</div>
                          <div className="text-sm font-semibold text-foreground">{project.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">Opening</div>
                          <div className="text-sm font-semibold text-foreground">{project.opening}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Tokenomics - Compact */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Coins className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Distribution</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: 'Presale', value: project.tokenomics.presale, color: 'bg-blue-500' },
                          { label: 'Liquidity', value: project.tokenomics.liquidity, color: 'bg-green-500' },
                          { label: 'Treasury', value: project.tokenomics.treasury, color: 'bg-purple-500' },
                          { label: 'Team', value: project.tokenomics.team, color: 'bg-orange-500' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-1">
                              <div className={`w-2 h-2 rounded-full ${item.color}`} />
                              <span className="text-xs text-muted-foreground">{item.label}</span>
                            </div>
                            <span className="text-xs font-bold text-foreground">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Investment Highlights - Condensed horizontal pills */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Why Invest</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'First tokenized cafe',
                        'Customer ownership',
                        'Employee equity',
                        'Prime location'
                      ].map((highlight, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5 bg-background/60 px-2.5 py-1 rounded-full border border-border/30">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-br from-primary to-accent" />
                          <span className="text-xs text-muted-foreground">{highlight}</span>
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