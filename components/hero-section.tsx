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

  // Generate clean SVG icon - pure white background with $COFFEE text (Arabic % brand style)
  const generateCoffeeIcon = () => {
    const svg = `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#FFFFFF"/>
        <text x="128" y="145" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="-2">
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
            <h1 className="text-center text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-[1.1]">
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
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-colors">
                  <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <span>Invest in $COFFEE</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>

              <Link href="#whitepaper" className="flex-1">
                <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80">
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

          {/* $COFFEE Card with Corner Decorations */}
          <div className="max-w-md w-full relative">
            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-2xl" />

            <Card className="relative hover:border-foreground/20 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-primary/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />

              <div className="relative">
                {/* Banner */}
                <div className="relative">
                  <div className="w-full h-32 bg-white border-b-2 border-border/40 flex items-center justify-center">
                    <img
                      src={generateCoffeeIcon()}
                      alt={project.name}
                      className="h-20 object-contain"
                    />
                  </div>
                  {/* Presale Live Badge - Prominent */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500 blur-md opacity-40 animate-pulse" />
                      <div className="relative bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2.5 rounded-full shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-sm font-bold tracking-wide">PRESALE LIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="px-6 pt-8 pb-6">
                  {/* Category & Quick Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      {project.category}
                    </p>
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Early Stage</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Funding Progress */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Funding Progress</span>
                      <span className="text-xs font-bold text-foreground">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="relative h-2.5 bg-background/60 rounded-full overflow-hidden mb-3 border border-border/40">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full shadow-lg shadow-primary/30"
                        style={{ width: `${Math.max(3, progressPercentage)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold text-foreground">${project.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground text-xs ml-1">raised</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">of </span>
                        <span className="font-bold text-foreground">${(project.fundingGoal / 1000)}K</span>
                      </div>
                    </div>
                  </div>

                  {/* Token Price & Key Metrics */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-background/90 to-background/60 border-2 border-primary/20 shadow-inner">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Presale Price</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground line-through">$0.20</span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">25% OFF</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold font-serif bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      ${project.price}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">per $COFFEE token</div>
                  </div>

                  {/* Tokenomics Distribution */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                        <Coins className="w-3.5 h-3.5" />
                        Token Distribution
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Presale', value: project.tokenomics.presale, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
                        { label: 'Liquidity Pool', value: project.tokenomics.liquidity, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-700' },
                        { label: 'Treasury', value: project.tokenomics.treasury, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
                        { label: 'Team (Vested)', value: project.tokenomics.team, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-foreground">{item.label}</span>
                              <span className={`text-xs font-bold ${item.textColor} ${item.bgColor} px-2 py-0.5 rounded`}>
                                {item.value}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-background/60 rounded-full overflow-hidden border border-border/30">
                              <div
                                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-background/90 to-background/50 border border-border/40 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <div className="text-xs text-muted-foreground font-medium">Location</div>
                      </div>
                      <div className="font-bold text-sm">{project.location}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-background/90 to-background/50 border border-border/40 hover:border-accent/30 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <div className="text-xs text-muted-foreground font-medium">Opening</div>
                      </div>
                      <div className="font-bold text-sm">{project.opening}</div>
                    </div>
                  </div>

                  {/* Investment Highlights */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Why Invest</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        'First tokenized coffee shop',
                        'Customer ownership model',
                        'Employee equity rewards',
                        'Prime Beirut location'
                      ].map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">{highlight}</span>
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