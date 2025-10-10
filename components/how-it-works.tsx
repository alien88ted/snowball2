"use client"

import { motion } from "framer-motion"
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Business Launches Token",
      subtitle: "Real businesses, real revenue",
      description: "Any business can launch on $NOW - coffee shops, gyms, grocery stores. Each business creates tokens representing ownership shares.",
      icon: Building2,
      details: [
        "SEC-compliant tokenization framework",
        "Multi-sig treasury for fund security",
        "Milestone-based fund releases"
      ],
      visual: "🏪"
    },
    {
      number: "02",
      title: "Community Invests",
      subtitle: "No VCs, no banks, just community",
      description: "During presale, anyone can buy tokens at discounted prices. Funds go directly to building the business - no middlemen.",
      icon: Users,
      details: [
        "Global investment access",
        "Low minimum investment ($100)",
        "Instant token distribution"
      ],
      visual: "🌍"
    },
    {
      number: "03",
      title: "Everyone Earns",
      subtitle: "Aligned incentives for all",
      description: "Business opens and generates profit. Token holders receive quarterly distributions. Customers earn tokens with purchases.",
      icon: TrendingUp,
      details: [
        "Quarterly profit distributions",
        "Token rewards for customers",
        "Secondary market trading"
      ],
      visual: "📈"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]" />
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
            <span className="text-sm font-semibold text-primary">How It Works</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.02em] mb-4">
            Three Simple Steps to
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community Ownership
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From business idea to profitable investment in three clear steps.
            No complexity, no confusion, just aligned incentives.
          </p>
        </motion.div>

        {/* Steps Visual */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className="relative cursor-pointer group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[60px] left-[calc(100%-1rem)] w-[calc(100%-3rem)] h-[2px] bg-gradient-to-r from-border to-transparent z-0" />
                )}

                {/* Step Card */}
                <div
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all duration-300
                    ${isActive
                      ? 'bg-card border-primary/30 shadow-xl scale-[1.02]'
                      : 'bg-card/60 border-border hover:border-border/80 hover:bg-card/80'
                    }
                  `}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          transition-all duration-300
                          ${isActive
                            ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg'
                            : 'bg-muted text-muted-foreground'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Step {step.number}
                        </div>
                        <h3 className="text-xl font-bold font-serif">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Visual Icon */}
                    <div className="text-3xl opacity-20 group-hover:opacity-30 transition-opacity">
                      {step.visual}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="text-sm font-semibold text-primary/80 mb-3">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className={`
                          flex items-start gap-2 text-xs
                          transition-all duration-300
                          ${isActive
                            ? 'text-foreground/80 translate-x-0 opacity-100'
                            : 'text-muted-foreground/60 -translate-x-2 opacity-70'
                          }
                        `}
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-2xl" />
                  )}
                </div>

                {/* Step Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-border rotate-90" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <div className="text-left">
              <div className="text-lg font-bold mb-1">Ready to get started?</div>
              <div className="text-sm text-muted-foreground">
                Join the first wave of community-owned businesses
              </div>
            </div>
            <a
              href="/explorer"
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap"
            >
              <span>Explore Launches</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}