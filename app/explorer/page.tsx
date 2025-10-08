"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users, Target } from "lucide-react"

// Generate simple black and white SVG icon for COFFEE
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

const coffeeProject = {
  id: 1,
  name: "$COFFEE",
  symbol: "COFFEE",
  description: "Revolutionary tokenized coffee shop in Beirut. Every cup you buy makes you an owner. Employees earn equity, not just wages.",
  category: "Physical Business",
  holders: 0,
  marketCap: 500000,
  tokenPrice: 0.15,
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
  },
  features: [
    "Customer rewards in tokens for every purchase",
    "Employees paid in equity tokens",
    "Treasury funds ongoing rewards",
    "Community governance rights",
    "Profit sharing through token value"
  ],
  milestones: [
    { target: 100000, description: "Secure location & permits", status: "pending" },
    { target: 250000, description: "Equipment & interior design", status: "pending" },
    { target: 400000, description: "Initial inventory & staff training", status: "pending" },
    { target: 500000, description: "Grand opening & marketing", status: "pending" }
  ],
  iconUrl: generateCoffeeIcon()
}

export default function ExplorerPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const progressPercentage = (coffeeProject.raised / coffeeProject.fundingGoal) * 100

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* Clean Banner with Corner Decorations */}
          <div className="w-full mb-20">
            <div className="relative group">
              {/* Corner Decorations */}
              <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
              <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

              <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-white border-2 border-border/40 rounded-3xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black tracking-tighter">
                    $COFFEE
                  </div>
                  <div className="text-2xl md:text-3xl font-serif text-gray-600 mt-4 tracking-tight">
                    First $NOW Launch
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Revolutionary tokenized coffee shop in Beirut where ownership is shared with every cup.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover:border-accent/40" />

                <div className="p-8 rounded-2xl border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">$500K</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">Target</div>
                </div>
              </div>
              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover:border-accent/40" />

                <div className="p-8 rounded-2xl border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Q2 2025</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">Opening</div>
                </div>
              </div>
              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover:border-accent/40" />

                <div className="p-8 rounded-2xl border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">33%</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">Treasury</div>
                </div>
              </div>
              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover:border-accent/40" />

                <div className="p-8 rounded-2xl border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Beirut</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">Location</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* Main Card Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="hover:border-foreground/20 transition-colors">
            <div className="p-8 md:p-12">

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border border-border bg-white">
                    <img
                      src={coffeeProject.iconUrl}
                      alt={coffeeProject.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{coffeeProject.name}</h2>
                    <p className="text-sm text-muted-foreground">{coffeeProject.category}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-semibold">
                  {coffeeProject.status}
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                {coffeeProject.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Token Price</div>
                  <div className="text-xl font-semibold">${coffeeProject.tokenPrice}</div>
                  <div className="text-xs text-green-600">Presale Price</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
                  <div className="text-xl font-semibold">${(coffeeProject.marketCap / 1000)}K</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Location</div>
                  <div className="text-xl font-semibold">Beirut</div>
                  <div className="text-xs text-muted-foreground">Lebanon</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Opening</div>
                  <div className="text-xl font-semibold">Q2 2025</div>
                  <div className="text-xs text-muted-foreground">6 months</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Funding Progress</span>
                  <span className="text-sm text-muted-foreground">
                    ${coffeeProject.raised.toLocaleString()} / ${coffeeProject.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Tokenomics */}
              <div className="grid md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-4">Token Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm">Presale</span>
                      </div>
                      <span className="text-sm font-semibold">{coffeeProject.tokenomics.presale}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm">Liquidity Pool</span>
                      </div>
                      <span className="text-sm font-semibold">{coffeeProject.tokenomics.liquidity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm">Treasury (Rewards)</span>
                      </div>
                      <span className="text-sm font-semibold">{coffeeProject.tokenomics.treasury}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                        <span className="text-sm">Team</span>
                      </div>
                      <span className="text-sm font-semibold">{coffeeProject.tokenomics.team}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {coffeeProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

                {/* Milestones */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Funding Milestones</h3>
                  <div className="space-y-3">
                    {coffeeProject.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          coffeeProject.raised >= milestone.target
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{milestone.description}</span>
                            <span className="text-xs text-muted-foreground">${(milestone.target / 1000)}K</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-black hover:bg-gray-900">
                  Invest in $COFFEE
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Download Whitepaper
                </Button>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong> Buy $COFFEE tokens during presale. When the coffee shop opens,
                  customers earn tokens with every purchase from the treasury. Employees receive tokens as salary.
                  Token value grows with business success. This is real ownership, not just loyalty points.
                </p>
              </div>

            </div>
          </Card>
        </div>
      </section>

      {/* The Model Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">The $NOW Model in Action</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="font-semibold mb-2">Buy Coffee</h3>
              <p className="text-sm text-muted-foreground">
                Every purchase earns you $COFFEE tokens from the treasury. The more you buy, the more you own.
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-semibold mb-2">Work & Earn</h3>
              <p className="text-sm text-muted-foreground">
                Employees receive $COFFEE tokens as salary. Everyone working becomes a stakeholder.
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold mb-2">Grow Together</h3>
              <p className="text-sm text-muted-foreground">
                As the business succeeds, token value increases. Everyone wins - customers, employees, investors.
              </p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}