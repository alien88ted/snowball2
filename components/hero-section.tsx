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
    <section className="pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col items-center gap-20">
          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-8">
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
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "SnowDex",
                  symbol: "SNOW",
                  category: "DeFi Platform",
                  price: "$2.45",
                  change: "+12.5%",
                  holders: "1.2k",
                  volume: "$542K",
                  gradient: "from-blue-500 to-cyan-500",
                  iconUrl: null,
                  delay: 0
                },
                {
                  name: "FrostAI",
                  symbol: "FAI",
                  category: "AI Tools",
                  price: "$8.92",
                  change: "+24.8%",
                  holders: "892",
                  volume: "$321K",
                  gradient: "from-purple-500 to-pink-500",
                  iconUrl: null,
                  delay: 100
                },
                {
                  name: "IceMarket",
                  symbol: "ICE",
                  category: "Marketplace",
                  price: "$5.67",
                  change: "+18.3%",
                  holders: "2.3k",
                  volume: "$892K",
                  gradient: "from-pink-500 to-rose-500",
                  iconUrl: null,
                  delay: 200
                },
              ].map(p => ({
                ...p,
                iconUrl: generateTokenIcon(p.name, p.symbol)
              })).map((project, index) => (
                <div
                  key={project.name}
                  className="p-5 rounded-lg bg-card border border-border hover:border-foreground/20 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded border border-border bg-white">
                      <img
                        src={project.iconUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground">{project.category}</div>
                    </div>
                    <div className="text-xs text-green-600">
                      {project.change}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-medium text-sm">{project.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="font-medium text-sm">{project.volume}</div>
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