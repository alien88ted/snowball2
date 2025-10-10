"use client"

import { useState } from "react"
import { ArrowRight, Clock, TrendingUp, Users, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

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
    originalPrice: 0.20,
    discount: 25,
    goal: 500000,
    raised: 0,
    investors: 0,
    location: "Beirut, Lebanon",
    timeline: "Q4 2025",
    highlights: [
      "Prime tech hub location",
      "33% revenue sharing",
      "Token rewards program"
    ],
    metrics: {
      roi: "15-20%",
      payback: "3-4 years",
      capacity: "200 daily customers"
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
    <section id="launches" className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />

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
                  className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300"
                  onMouseEnter={() => setHoveredCard(launch.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
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

                      {/* Right: Pricing & CTA */}
                      <div className="lg:border-l lg:pl-8">
                        <div className="mb-6">
                          <div className="text-sm text-muted-foreground mb-1">Presale Price</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">${launch.price}</span>
                            {launch.originalPrice && (
                              <>
                                <span className="text-lg text-muted-foreground line-through">
                                  ${launch.originalPrice}
                                </span>
                                <span className="text-sm font-semibold text-green-600">
                                  {launch.discount}% off
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Expected ROI</span>
                            <span className="font-semibold">{launch.metrics.roi}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Payback Period</span>
                            <span className="font-semibold">{launch.metrics.payback}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Category</span>
                            <span className="font-semibold">{launch.category}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link href="/explorer" className="block">
                          <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                            <span>View Details & Invest</span>
                            <ArrowRight className="w-4 h-4" />
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
                  className="relative overflow-hidden border hover:border-border/80 transition-all duration-300 bg-card/50"
                  onMouseEnter={() => setHoveredCard(launch.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
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