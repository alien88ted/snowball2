"use client"

import { useState } from "react"
import { ArrowRight, Coffee, ShoppingCart, Dumbbell, Home, Car, Pizza, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function LaunchPipeline() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const launches = [
    {
      id: "coffee",
      name: "$COFFEE",
      status: "live",
      statusText: "Presale Live",
      statusColor: "bg-green-500",
      icon: Coffee,
      description: "Premium coffee shop in Beirut tech hub",
      price: "$0.15",
      goal: "$500K",
      raised: "$0",
      timeline: "Opening Q4 2025",
      category: "Food & Beverage",
      bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
      borderColor: "border-amber-200/40 dark:border-amber-800/40",
      iconColor: "text-amber-600"
    },
    {
      id: "grocery",
      name: "$GROCERY",
      status: "coming",
      statusText: "Q1 2026",
      statusColor: "bg-blue-500",
      icon: ShoppingCart,
      description: "Community-owned grocery store",
      price: "TBA",
      goal: "$1M",
      raised: "-",
      timeline: "Launch Q1 2026",
      category: "Retail",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      borderColor: "border-blue-200/40 dark:border-blue-800/40",
      iconColor: "text-blue-600"
    },
    {
      id: "fitness",
      name: "$FITNESS",
      status: "coming",
      statusText: "Q2 2026",
      statusColor: "bg-purple-500",
      icon: Dumbbell,
      description: "24/7 gym with token rewards",
      price: "TBA",
      goal: "$750K",
      raised: "-",
      timeline: "Launch Q2 2026",
      category: "Health & Wellness",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      borderColor: "border-purple-200/40 dark:border-purple-800/40",
      iconColor: "text-purple-600"
    }
  ]

  const futureCategories = [
    { name: "Real Estate", icon: Home, example: "$PROPERTY" },
    { name: "Transportation", icon: Car, example: "$RIDES" },
    { name: "Restaurants", icon: Pizza, example: "$EATS" }
  ]

  return (
    <section id="launches" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Launch Pipeline</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-[-0.02em] leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Real Businesses. Real Tokens.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[19px] md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-[1.6]"
          >
            $COFFEE is just the beginning. The $NOW platform will tokenize hundreds of businesses.
            Get in early on the next launch.
          </motion.p>
        </div>

        {/* Launch Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {launches.map((launch, index) => {
            const Icon = launch.icon
            const isLive = launch.status === "live"
            const isHovered = hoveredCard === index

            return (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                {/* Launch Number Badge */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-lg">
                      Launch #1
                    </div>
                  </div>
                )}

                <div className={`relative h-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isLive
                    ? "bg-card/90 border-primary/30 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.15)]"
                    : `bg-gradient-to-br ${launch.bgGradient} ${launch.borderColor}`
                } ${isHovered ? "scale-[1.02] shadow-xl" : ""}`}>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${launch.statusColor} ${isLive ? "animate-pulse" : ""}`} />
                      <span className={`text-xs font-bold ${
                        isLive ? "text-green-600 dark:text-green-400" : "text-muted-foreground/70"
                      }`}>
                        {launch.statusText}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground/60 font-medium">
                      {launch.category}
                    </span>
                  </div>

                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-border/40 flex items-center justify-center ${
                      isLive ? "border-primary/30" : ""
                    }`}>
                      <Icon className={`w-6 h-6 ${launch.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-serif tracking-[-0.01em]">
                        {launch.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground/80 text-sm mb-4 leading-relaxed">
                    {launch.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-background/50">
                      <div className="text-xs text-muted-foreground/60 mb-0.5">Price</div>
                      <div className="font-bold text-foreground">{launch.price}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background/50">
                      <div className="text-xs text-muted-foreground/60 mb-0.5">Goal</div>
                      <div className="font-bold text-foreground">{launch.goal}</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="text-xs text-muted-foreground/70 mb-4">
                    {launch.timeline}
                  </div>

                  {/* CTA Button */}
                  {isLive ? (
                    <Link href="/explorer" className="block">
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent p-[2px] transition-all duration-300 hover:shadow-lg">
                        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent rounded-[10px] px-4 py-3 text-white font-semibold text-sm">
                          <span>Invest Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="rounded-xl bg-muted/30 px-4 py-3 text-center">
                      <span className="text-sm text-muted-foreground/70 font-medium">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Future Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 border border-border/40">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-serif mb-2">More Categories Coming</h3>
              <p className="text-muted-foreground/70">
                The $NOW platform will expand to every type of local business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {futureCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-border/40"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground/60">{category.example}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground/80">
                Want to tokenize your business?{" "}
                <a href="#" className="font-semibold text-primary hover:underline">
                  Apply to launch →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}