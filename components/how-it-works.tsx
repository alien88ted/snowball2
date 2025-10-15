"use client"

import { motion } from "framer-motion"
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { ExplorerCorners } from "./explorer-corners"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Business Lists",
      subtitle: "Coffee shop needs $100K to open",
      description: "A local business creates tokens. Each token = ownership share. They set a funding goal and token price.",
      icon: Building2,
      details: [
        "Legally compliant framework",
        "Funds held in secure treasury",
        "Money released as milestones hit"
      ],
      visual: "🏪"
    },
    {
      number: "02",
      title: "You Invest",
      subtitle: "Buy tokens starting at $100",
      description: "Anyone can invest during presale. Your money goes straight to building the business. Get tokens instantly.",
      icon: Users,
      details: [
        "Invest from anywhere in the world",
        "Start with just $100",
        "Own your tokens immediately"
      ],
      visual: "🌍"
    },
    {
      number: "03",
      title: "Everyone Profits",
      subtitle: "Business opens and makes money",
      description: "Business shares profits quarterly with token holders. Customers earn free tokens when they shop.",
      icon: TrendingUp,
      details: [
        "Get your share every 3 months",
        "Customers rewarded for loyalty",
        "Trade tokens anytime 24/7"
      ],
      visual: "📈"
    }
  ]

  return (
    <section id="how-it-works" className="py-28 md:py-36 relative overflow-hidden bg-gradient-to-b from-background via-background/98 to-background">
      {/* Elite Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_55%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary/20 bg-primary/8 mb-8 shadow-lg shadow-primary/5">
            <span className="text-sm font-bold text-primary">How It Works</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.03em] mb-6 leading-[1.1]">
            How It Works:
            <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_8s_ease_infinite]">
              3 Simple Steps
            </span>
          </h2>

          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Business raises money → You invest → Everyone earns
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveStep(index)}
                className="relative cursor-pointer group"
              >

                {/* Step Card */}
                <div
                  className={`
                    relative p-8 rounded-2xl border-2 transition-all duration-700 backdrop-blur-xl
                    ${isActive
                      ? 'bg-white/95 border-primary/50 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.35)] scale-[1.04] -translate-y-2'
                      : 'bg-white/75 border-border/40 hover:border-primary/35 hover:bg-white/85 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Enhanced Corner decorations */}
                  <div className={`absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] rounded-tl-2xl transition-all duration-700 ${isActive ? 'border-primary/60' : 'border-primary/0 group-hover:border-primary/40'} group-hover:-top-4 group-hover:-left-4`} />
                  <div className={`absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] rounded-tr-2xl transition-all duration-700 ${isActive ? 'border-primary/60' : 'border-primary/0 group-hover:border-primary/40'} group-hover:-top-4 group-hover:-right-4`} />
                  <div className={`absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] rounded-bl-2xl transition-all duration-700 ${isActive ? 'border-accent/60' : 'border-accent/0 group-hover:border-accent/40'} group-hover:-bottom-4 group-hover:-left-4`} />
                  <div className={`absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] rounded-br-2xl transition-all duration-700 ${isActive ? 'border-accent/60' : 'border-accent/0 group-hover:border-accent/40'} group-hover:-bottom-4 group-hover:-right-4`} />
                  {/* Step Number & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-14 h-14 rounded-xl flex items-center justify-center
                          transition-all duration-700
                          ${isActive
                            ? 'bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_100%] text-white shadow-xl shadow-primary/30 scale-110 animate-[gradient_6s_ease_infinite]'
                            : 'bg-muted/70 text-muted-foreground group-hover:bg-muted group-hover:scale-105'
                          }
                        `}
                      >
                        <Icon className="w-7 h-7" />
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

                </div>

                {/* Step Arrow (Mobile) - Clean */}
                {index < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center my-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary rotate-90" strokeWidth={2} />
                    </div>
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
          <div className="relative inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 group">
            {/* 4 Corner decorations */}
            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-xl transition-all duration-300 group-hover:border-primary/50 group-hover:-top-3 group-hover:-left-3" />
            <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-xl transition-all duration-300 group-hover:border-primary/50 group-hover:-top-3 group-hover:-right-3" />
            <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-accent/30 rounded-bl-xl transition-all duration-300 group-hover:border-accent/50 group-hover:-bottom-3 group-hover:-left-3" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-accent/30 rounded-br-xl transition-all duration-300 group-hover:border-accent/50 group-hover:-bottom-3 group-hover:-right-3" />
            <div className="text-left">
              <div className="text-lg font-bold mb-1">Ready to get started?</div>
              <div className="text-sm text-muted-foreground">
                Join the first wave of community-owned businesses
              </div>
            </div>
            <a
              href="/explorer"
              className="relative px-6 py-3 bg-foreground text-background rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap group/btn"
            >
              {/* 4 Corner decorations for button */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-white/30 rounded-tl transition-all duration-300 group-hover/btn:border-white/50 group-hover/btn:-top-1.5 group-hover/btn:-left-1.5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-white/30 rounded-tr transition-all duration-300 group-hover/btn:border-white/50 group-hover/btn:-top-1.5 group-hover/btn:-right-1.5" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-white/20 rounded-bl transition-all duration-300 group-hover/btn:border-white/40 group-hover/btn:-bottom-1.5 group-hover/btn:-left-1.5" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-white/20 rounded-br transition-all duration-300 group-hover/btn:border-white/40 group-hover/btn:-bottom-1.5 group-hover/btn:-right-1.5" />
              <span>Explore Launches</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}