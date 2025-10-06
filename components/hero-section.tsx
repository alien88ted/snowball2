"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Generate simple black and white SVG icons with ticker symbol
const generateTokenIcon = (name: string, symbol: string) => {
  // Adjust font size based on symbol length
  const fontSize = symbol.length <= 3 ? "72" : symbol.length <= 4 ? "56" : "48"

  const svg = `
    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="white"/>
      <rect x="2" y="2" width="252" height="252" fill="white" stroke="#e5e5e5" stroke-width="2"/>
      <text x="128" y="145" font-family="Georgia, serif" font-size="${fontSize}" font-weight="600" fill="black" text-anchor="middle" letter-spacing="1">
        $${symbol}
      </text>
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="pt-32 pb-32 relative overflow-hidden">
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col items-center gap-24">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-10">
            <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-serif">
              <span className="block">Launch. Tokenize.</span>
              <span className="block mt-2">Own Together.</span>
            </h1>

            <p className="max-w-2xl text-center text-muted-foreground text-base sm:text-lg md:text-xl">
              The future of collaborative ownership. Create tokenized projects where your community
              holds real equity. Launch businesses, apps, and ideas with true shared ownership.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/explorer/create">
                <Button size="lg" className="h-12 px-8">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/explorer">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-2">
              {[
                "No code required",
                "Launch in minutes",
                "Community owned",
              ].map((text, i) => (
                <span key={i} className="text-sm text-muted-foreground">
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Token Cards */}
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "BRRR",
                  symbol: "BRRR",
                  description: "The original Snowflake meme token that started it all",
                  category: "Meme",
                  price: 0.00234,
                  change24h: 156.8,
                  holders: 8924,
                  volume: "2.3M",
                  trending: true,
                },
                {
                  name: "Pumpdotfun",
                  symbol: "PUMP",
                  description: "Token launchpad platform for instant token creation",
                  category: "Platform",
                  price: 1.82,
                  change24h: 42.3,
                  holders: 15623,
                  volume: "8.7M",
                  trending: true,
                },
                {
                  name: "SnowAI",
                  symbol: "SNOW",
                  description: "AI-powered trading bot and analytics for Snowflake tokens",
                  category: "AI/Tools",
                  price: 0.0892,
                  change24h: -12.4,
                  holders: 3241,
                  volume: "456K",
                  trending: false,
                },
              ].map(p => ({
                ...p,
                iconUrl: generateTokenIcon(p.name, p.symbol)
              })).map((project, index) => (
                <div
                  key={project.name}
                  className="group p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-border bg-white">
                        <img
                          src={project.iconUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    {project.trending && (
                      <span className="text-xs text-green-600">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-semibold">${project.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">24h</div>
                      <div className={project.change24h > 0 ? "font-semibold text-green-600" : "font-semibold text-red-600"}>
                        {project.change24h > 0 ? "+" : ""}{project.change24h}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="font-semibold text-sm">${project.volume}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Holders</div>
                      <div className="font-semibold text-sm">{project.holders.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}