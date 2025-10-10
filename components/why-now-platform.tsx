"use client"

import { motion } from "framer-motion"
import { Check, X, Zap, Shield, Globe, Coins, Users, TrendingUp } from "lucide-react"
import { useState } from "react"

export function WhyNowPlatform() {
  const [activeComparison, setActiveComparison] = useState(0)

  const comparisons = [
    {
      name: "Traditional VC",
      cons: [
        "Exclusive to accredited investors",
        "Minimum $25K-$100K investment",
        "No liquidity for 7-10 years",
        "Founders lose control"
      ],
      icon: "🏦"
    },
    {
      name: "Crowdfunding",
      cons: [
        "No real ownership",
        "No profit sharing",
        "Just pre-orders or donations",
        "Platform takes 5-10% fees"
      ],
      icon: "👥"
    },
    {
      name: "Bank Loans",
      cons: [
        "Requires collateral",
        "High interest rates",
        "Personal guarantees",
        "No community involvement"
      ],
      icon: "🏛️"
    }
  ]

  const nowBenefits = [
    "Open to everyone globally",
    "$100 minimum investment",
    "Instant liquidity on DEX",
    "Real revenue sharing",
    "Community ownership",
    "Token rewards for customers"
  ]

  const keyFeatures = [
    {
      icon: Globe,
      title: "Global Access",
      description: "Anyone, anywhere can invest in real businesses",
      metric: "195 countries"
    },
    {
      icon: Shield,
      title: "SEC Compliant",
      description: "Revenue sharing model, not securities",
      metric: "100% legal"
    },
    {
      icon: Coins,
      title: "Real Yield",
      description: "Quarterly profit distributions to token holders",
      metric: "8-15% APY"
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade tokens on DEX immediately after launch",
      metric: "24/7 trading"
    }
  ]

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <span className="text-sm font-semibold text-accent">Why $NOW</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.02em] mb-4">
            The Future of Business Funding
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional funding is broken. $NOW fixes it with community-driven tokenization
            that benefits everyone - businesses, investors, and customers.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="overflow-hidden rounded-2xl border-2 border-border bg-card">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-muted/30 border-b-2 border-border">
              <div className="col-span-2 p-6">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Funding Method
                </div>
              </div>
              {comparisons.map((comp, index) => (
                <div
                  key={index}
                  className={`
                    p-6 text-center border-l border-border cursor-pointer
                    transition-all duration-300
                    ${activeComparison === index ? 'bg-red-50/50 dark:bg-red-950/20' : 'hover:bg-muted/50'}
                  `}
                  onClick={() => setActiveComparison(index)}
                >
                  <div className="text-2xl mb-2">{comp.icon}</div>
                  <div className="font-semibold text-sm">{comp.name}</div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border">
              {/* $NOW Benefits */}
              <div className="grid grid-cols-5">
                <div className="col-span-2 p-6 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      $NOW
                    </div>
                    <div>
                      <div className="font-bold text-lg">$NOW Platform</div>
                      <div className="text-xs text-muted-foreground">Community Tokenization</div>
                    </div>
                  </div>
                </div>
                {comparisons.map((_, index) => (
                  <div key={index} className="p-6 border-l border-border bg-gradient-to-b from-green-50/30 to-transparent dark:from-green-950/20">
                    <div className="space-y-3">
                      {nowBenefits.slice(index * 2, index * 2 + 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Traditional Methods Drawbacks */}
              <div className="grid grid-cols-5">
                <div className="col-span-2 p-6 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Common Issues</div>
                </div>
                {comparisons.map((comp, index) => (
                  <div
                    key={index}
                    className={`
                      p-6 border-l border-border
                      ${activeComparison === index ? 'bg-red-50/30 dark:bg-red-950/10' : ''}
                    `}
                  >
                    <div className="space-y-3">
                      {comp.cons.slice(0, 2).map((con, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {feature.description}
                    </p>

                    {/* Metric */}
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                      {feature.metric}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              $COFFEE presale is live now
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Be part of the first community-owned coffee shop
          </p>
          <a
            href="/explorer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <span>Start Investing</span>
            <TrendingUp className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}