"use client"

import { useState } from "react"
import { ArrowRight, Building2, Coins, TrendingUp, Users, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function PlatformModel() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Tokenize Any Business",
      description: "Real businesses launch tokens on $NOW. Coffee shops, gyms, grocery stores - any business with recurring customers becomes investable.",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      highlight: "Global investment access"
    },
    {
      number: "02",
      title: "Community Raises Capital",
      description: "Presale tokens to future customers and investors. No VCs, no banks. Funds locked in multi-sig treasury with milestone-based releases.",
      icon: Users,
      color: "from-green-500 to-emerald-600",
      highlight: "100% community owned"
    },
    {
      number: "03",
      title: "Share Real Revenue",
      description: "Business opens and generates profit. Token holders receive quarterly distributions. Customers earn tokens with every purchase.",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      highlight: "Aligned incentives"
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: "SEC-Compliant",
      description: "Revenue sharing, not securities"
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade tokens on DEX after launch"
    },
    {
      icon: Coins,
      title: "Real Yield",
      description: "Backed by actual business profits"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.03),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6"
          >
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">The $NOW Platform</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-[-0.02em] leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              How Tokenization Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[19px] md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-[1.6]"
          >
            The $NOW platform transforms traditional businesses into community-owned assets.
            Every business becomes investable. Every customer becomes an owner.
          </motion.p>
        </div>

        {/* Three Step Process */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const isActive = index === activeStep
            const Icon = step.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-full p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isActive
                      ? "bg-card/80 backdrop-blur-sm border-primary/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] scale-[1.02]"
                      : "bg-card/40 border-border/50 hover:border-border/70 hover:bg-card/60"
                  }`}
                >
                  {/* Step Number with Gradient */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-[0.08em] mb-1">
                        Step {step.number}
                      </div>
                      <h3 className="text-xl font-bold font-serif tracking-[-0.01em]">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground/80 text-[15px] leading-[1.6] mb-4">
                    {step.description}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      {step.highlight}
                    </span>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-2xl" />
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Platform Benefits - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-border/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground/70">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground/80">
                Ready to tokenize your business or invest in the next launch?{" "}
                <a href="#launches" className="font-semibold text-primary hover:underline">
                  See what's coming →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}