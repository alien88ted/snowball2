"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Generate simple black and white SVG icon for COFFEE (client-only)
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
  opening: "Q4 2025",
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
  iconUrl: ""
}

export default function ExplorerClient() {
  const [mounted, setMounted] = useState(false)
  const [project, setProject] = useState(() => ({ ...coffeeProject }))

  useEffect(() => {
    setMounted(true)
    // Generate icon on client
    setProject(p => ({ ...p, iconUrl: generateCoffeeIcon() }))
  }, [])

  const progressPercentage = (project.raised / project.fundingGoal) * 100

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08), transparent 60%)" }}
        />
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
                    {project.symbol}
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
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05), transparent 60%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="relative group">
            {/* Corner Decorations */}
            <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40 z-10" />
            <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40 z-10" />
            <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40 z-10" />
            <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40 z-10" />

            <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="p-12 md:p-16">

              {/* Header */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl border-2 border-border/40 bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/20">
                    {project.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.iconUrl} alt={project.name} className="w-full h-full object-cover rounded-2xl" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">{project.name}</h2>
                    <p className="text-base text-muted-foreground mt-2 font-medium">{project.category}</p>
                  </div>
                </div>
                <span className="px-5 py-2.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold border-2 border-green-200 shadow-sm">
                  {project.status}
                </span>
              </div>

              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                {project.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-sm text-muted-foreground mb-2 font-medium">Token Price</div>
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">${project.tokenPrice}</div>
                  <div className="text-xs text-green-600 mt-2 font-semibold">Presale Price</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-sm text-muted-foreground mb-2 font-medium">Market Cap</div>
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">${(project.marketCap / 1000)}K</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-sm text-muted-foreground mb-2 font-medium">Location</div>
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Beirut</div>
                  <div className="text-xs text-muted-foreground mt-2">Lebanon</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                  <div className="text-sm text-muted-foreground mb-2 font-medium">Opening</div>
                  <div className="text-3xl font-bold font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Q2 2025</div>
                  <div className="text-xs text-muted-foreground mt-2">6 months</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between mb-4">
                  <span className="text-base font-semibold">Funding Progress</span>
                  <span className="text-base text-muted-foreground font-medium">
                    ${project.raised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Tokenomics */}
              <div className="grid md:grid-cols-2 gap-10 mb-12 p-10 bg-gradient-to-br from-muted/40 to-muted/10 rounded-3xl border border-border/30">
                <div>
                  <h3 className="text-2xl font-bold font-serif mb-6 tracking-tighter">Token Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                        <span className="text-base font-medium">Presale</span>
                      </div>
                      <span className="text-base font-bold">{project.tokenomics.presale}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                        <span className="text-base font-medium">Liquidity Pool</span>
                      </div>
                      <span className="text-base font-bold">{project.tokenomics.liquidity}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                        <span className="text-base font-medium">Treasury (Rewards)</span>
                      </div>
                      <span className="text-base font-bold">{project.tokenomics.treasury}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-gray-500 shadow-lg shadow-gray-500/50" />
                        <span className="text-base font-medium">Team</span>
                      </div>
                      <span className="text-base font-bold">{project.tokenomics.team}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif mb-6 tracking-tighter">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/50">
                        <span className="text-green-500 mt-0.5 text-lg font-bold">✓</span>
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

                {/* Milestones */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold font-serif mb-6 tracking-tighter">Funding Milestones</h3>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-5 p-4 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 border border-border/30 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${
                          project.raised >= milestone.target
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-muted text-muted-foreground border-2 border-border/40'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-medium">{milestone.description}</span>
                            <span className="text-base font-bold text-muted-foreground">${(milestone.target / 1000)}K</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <Button className="group flex-1 h-14 rounded-full bg-black hover:bg-gray-900 text-white text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:scale-105">
                  Invest in $COFFEE
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-full border-2 border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  Download Whitepaper
                </Button>
              </div>

              {/* Info Box */}
              <div className="relative group">
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-blue-400/40 rounded-tl-2xl transition-all duration-300 group-hover:border-blue-400/50" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-blue-400/40 rounded-tr-2xl transition-all duration-300 group-hover:border-blue-400/50" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-blue-400/40 rounded-bl-2xl transition-all duration-300 group-hover:border-blue-400/50" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-blue-400/40 rounded-br-2xl transition-all duration-300 group-hover:border-blue-400/50" />

                <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-50/50 border-2 border-blue-200/60 rounded-2xl">
                  <p className="text-base text-blue-900 leading-relaxed">
                    <strong className="font-bold">How it works:</strong> Buy $COFFEE tokens during presale. When the coffee shop opens,
                    customers earn tokens with every purchase from the treasury. Employees receive tokens as salary.
                    Token value grows with business success. This is real ownership, not just loyalty points.
                  </p>
                </div>
              </div>

              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* The Model Section */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(236,72,153,0.05), transparent 60%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="text-5xl md:text-6xl font-bold font-serif text-center mb-20 tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">The $NOW Model in Action</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative group">
              {/* Corner Decorations */}
              <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
              <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

              <Card className="p-10 border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">☕</div>
                <h3 className="text-2xl font-bold font-serif mb-4 tracking-tighter">Buy Coffee</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Every purchase earns you $COFFEE tokens from the treasury. The more you buy, the more you own.
                </p>
              </Card>
            </div>

            <div className="relative group">
              {/* Corner Decorations */}
              <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
              <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

              <Card className="p-10 border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">💼</div>
                <h3 className="text-2xl font-bold font-serif mb-4 tracking-tighter">Work & Earn</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Employees receive $COFFEE tokens as salary. Everyone working becomes a stakeholder.
                </p>
              </Card>
            </div>

            <div className="relative group">
              {/* Corner Decorations */}
              <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
              <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

              <Card className="p-10 border-2 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">📈</div>
                <h3 className="text-2xl font-bold font-serif mb-4 tracking-tighter">Grow Together</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  As the business succeeds, token value increases. Everyone wins - customers, employees, investors.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


