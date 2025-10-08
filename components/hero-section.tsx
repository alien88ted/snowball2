"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, Target } from "lucide-react"
import { useState, useEffect, useRef } from "react"

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

  // Generate clean SVG icon
  const generateCoffeeIcon = () => {
    const svg = `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="white"/>
        <rect x="2" y="2" width="252" height="252" fill="white" stroke="#e5e5e5" stroke-width="2"/>
        <text x="128" y="145" font-family="Georgia, serif" font-size="56" font-weight="600" fill="black" text-anchor="middle" letter-spacing="1">
          $COFFEE
        </text>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  return (
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_50%)]" />
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

            <Card className="relative hover:border-foreground/20 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/50 to-card/60 backdrop-blur-sm" />
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border-2 border-border bg-white shadow-sm">
                      <img
                        src={generateCoffeeIcon()}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{project.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium">{project.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                    Presale Live
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-background/80 to-background/40 border border-border/40">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Price</div>
                    <div className="font-bold text-lg">${project.price}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-background/80 to-background/40 border border-border/40">
                    <div className="text-xs text-muted-foreground font-medium mb-1">24h Change</div>
                    <div className="font-bold text-lg text-green-600">+15.3%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-background/80 to-background/40 border border-border/40">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Target</div>
                    <div className="font-bold text-lg">${(project.fundingGoal / 1000)}K</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-background/80 to-background/40 border border-border/40">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Location</div>
                    <div className="font-bold text-lg">Beirut</div>
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