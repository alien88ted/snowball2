"use client"

import { useState } from "react"
import { ArrowRight, Clock, TrendingUp, Users, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExplorerCorners } from "./explorer-corners"

// This structure makes it easy to add new launches
const LAUNCHES = [
  {
    id: "coffee",
    name: "$COFFEE",
    tagline: "Premium Coffee Shop",
    description: "Beirut's first tokenized coffee shop in the heart of the tech district",
    status: "live",
    statusLabel: "Presale Live",
    category: "Food & Beverage",
    price: 0.15,
    totalSupply: 100_000_000, // 100M tokens
    goal: 100000, // $100K target
    raised: 0,
    investors: 0,
    location: "Beirut, Lebanon",
    timeline: "Q4 2025",
    highlights: [
      "100M token supply",
      "33% profit sharing",
      "Multi-branch expansion"
    ],
    metrics: {
      target: "$100K",
      supply: "100M",
      revenueShare: "33%"
    }
  },
  {
    id: "grocery",
    name: "$GROCERY",
    tagline: "Community Market",
    description: "Neighborhood grocery store with daily essentials and local products",
    status: "upcoming",
    statusLabel: "Q1 2026",
    category: "Retail",
    price: null,
    originalPrice: null,
    discount: null,
    goal: 1000000,
    raised: 0,
    investors: 0,
    location: "Miami, Florida",
    timeline: "Q1 2026",
    highlights: [
      "High-traffic location",
      "Essential services",
      "Recurring revenue model"
    ],
    metrics: {
      roi: "12-18%",
      payback: "4-5 years",
      capacity: "500 daily customers"
    }
  },
  {
    id: "fitness",
    name: "$FITNESS",
    tagline: "24/7 Smart Gym",
    description: "Modern fitness center with AI-powered equipment and personal training",
    status: "upcoming",
    statusLabel: "Q2 2026",
    category: "Health & Wellness",
    price: null,
    originalPrice: null,
    discount: null,
    goal: 750000,
    raised: 0,
    investors: 0,
    location: "Austin, Texas",
    timeline: "Q2 2026",
    highlights: [
      "24/7 access model",
      "Subscription revenue",
      "Token-based rewards"
    ],
    metrics: {
      roi: "20-25%",
      payback: "3 years",
      capacity: "1000 members"
    }
  }
]

// Future pipeline preview
const FUTURE_CATEGORIES = [
  { name: "Real Estate", count: "5+ projects", icon: "🏠" },
  { name: "Restaurants", count: "10+ projects", icon: "🍽️" },
  { name: "Transportation", count: "3+ projects", icon: "🚗" },
  { name: "Entertainment", count: "7+ projects", icon: "🎬" }
]

export function LaunchPipelineRedesigned() {
  const [selectedLaunch, setSelectedLaunch] = useState(LAUNCHES[0])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const liveLaunches = LAUNCHES.filter(l => l.status === "live")
  const upcomingLaunches = LAUNCHES.filter(l => l.status === "upcoming")

  return (
    <section id="launches" className="py-24 md:py-32 relative overflow-hidden">
      {/* Elite background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/97 to-background" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_50%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-sm font-semibold text-primary">Launch Pipeline</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.02em] mb-4">
            Real Businesses.
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real Opportunities.
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every launch is carefully vetted. Every business has real revenue potential.
            Get in early on the next big opportunity.
          </p>
        </motion.div>

        {/* Live Launches */}
        {liveLaunches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold">Live Now</h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <div className="grid gap-6">
              {liveLaunches.map((launch) => (
                <Card
                  key={launch.id}
                  className="group relative overflow-hidden border-2 border-primary/20 backdrop-blur-xl bg-white/90 hover:border-primary/40 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.35)] hover:scale-[1.01] hover:-translate-y-1"
                  onMouseEnter={() => setHoveredCard(launch.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* 4 Corner decorations like explorer */}
                  <div className="absolute -top-3 -left-3 w-14 h-14 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-4 group-hover:-left-4" />
                  <div className="absolute -top-3 -right-3 w-14 h-14 border-t-[2.5px] border-r-[2.5px] border-primary/40 rounded-tr-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-4 group-hover:-right-4" />
                  <div className="absolute -bottom-3 -left-3 w-14 h-14 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-left-4" />
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-right-4" />
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold">
                      Launch #1
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left: Main Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-3xl font-bold font-serif">{launch.name}</h3>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-lg text-muted-foreground">{launch.tagline}</span>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {launch.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{launch.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>Opening {launch.timeline}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span>{launch.metrics.capacity}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                          {launch.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 rounded-lg bg-muted/50 text-sm font-medium text-center"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">
                              ${launch.raised.toLocaleString()} raised
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ${(launch.goal / 1000).toFixed(0)}K goal
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                              style={{ width: `${(launch.raised / launch.goal * 100) || 1}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {launch.investors} investors
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {((launch.raised / launch.goal) * 100).toFixed(0)}% funded
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Token Economics */}
                      <div className="lg:border-l lg:pl-8">
                        <div className="mb-6">
                          <div className="text-sm text-muted-foreground mb-1">Token Price</div>
                          <div className="text-4xl font-bold">${launch.price}</div>
                          <div className="text-xs text-muted-foreground mt-1">per token</div>
                        </div>

                        {/* Key Metrics */}
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Target Raise</span>
                            <span className="font-semibold">{launch.metrics.target}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Supply</span>
                            <span className="font-semibold">{launch.metrics.supply}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Profit Share</span>
                            <span className="font-semibold">{launch.metrics.revenueShare}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link href="/explorer" className="block">
                          <button className="group/btn relative w-full py-3 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white rounded-lg font-bold text-[15px] transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] hover:scale-[1.03] hover:-translate-y-0.5 flex items-center justify-center gap-2 animate-gradient">
                            {/* Mini corner decorations */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-[2px] border-l-[2px] border-white/40 rounded-tl transition-all duration-300 group-hover/btn:border-white/70 group-hover/btn:-top-1.5 group-hover/btn:-left-1.5" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-[2px] border-r-[2px] border-white/40 rounded-tr transition-all duration-300 group-hover/btn:border-white/70 group-hover/btn:-top-1.5 group-hover/btn:-right-1.5" />
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-[2px] border-l-[2px] border-white/30 rounded-bl transition-all duration-300 group-hover/btn:border-white/60 group-hover/btn:-bottom-1.5 group-hover/btn:-left-1.5" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-[2px] border-r-[2px] border-white/30 rounded-br transition-all duration-300 group-hover/btn:border-white/60 group-hover/btn:-bottom-1.5 group-hover/btn:-right-1.5" />
                            <span>View Details & Invest</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upcoming Launches */}
        {upcomingLaunches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-2xl font-bold">Coming Soon</h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingLaunches.map((launch) => (
                <Card
                  key={launch.id}
                  className="group relative overflow-hidden border hover:border-border/80 transition-all duration-300 bg-card/50"
                  onMouseEnter={() => setHoveredCard(launch.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* 4 Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-primary/0 rounded-tl-lg transition-all duration-300 group-hover:border-primary/40 group-hover:-top-2.5 group-hover:-left-2.5" />
                  <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-primary/0 rounded-tr-lg transition-all duration-300 group-hover:border-primary/40 group-hover:-top-2.5 group-hover:-right-2.5" />
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-accent/0 rounded-bl-lg transition-all duration-300 group-hover:border-accent/40 group-hover:-bottom-2.5 group-hover:-left-2.5" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-accent/0 rounded-br-lg transition-all duration-300 group-hover:border-accent/40 group-hover:-bottom-2.5 group-hover:-right-2.5" />
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-muted text-xs font-semibold">
                      {launch.statusLabel}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold font-serif mb-1">{launch.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {launch.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <span className="px-2 py-1 rounded bg-muted">
                            {launch.category}
                          </span>
                          <span className="px-2 py-1 rounded bg-muted">
                            ${(launch.goal / 1000).toFixed(0)}K goal
                          </span>
                          <span className="px-2 py-1 rounded bg-muted">
                            {launch.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Preview Metrics */}
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">Expected ROI</div>
                        <div className="font-semibold">{launch.metrics.roi}</div>
                      </div>
                      <button
                        disabled
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Coming {launch.timeline}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Future Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">More Categories Coming</h3>
              <p className="text-muted-foreground">
                25+ businesses in the pipeline across diverse industries
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {FUTURE_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-background/50 border border-border/50 text-center"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.count}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Want to tokenize your business?
              </p>
              <button className="px-6 py-2 border border-primary text-primary rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-background">
                Apply to Launch
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}