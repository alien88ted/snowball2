"use client"

import { motion } from "framer-motion"
import { Check, Zap, Shield, Globe, Coins, TrendingUp, Sparkles, Lock, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function WhyNowPlatform() {
  const benefits = [
    {
      icon: Coins,
      title: "Start with $100",
      description: "Invest in real businesses without being rich. Traditional investing requires $25K minimum.",
      highlight: "$100 minimum",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Get Paid Every Quarter",
      description: "Earn real profit shares from the business. 33% of profits go directly to token holders.",
      highlight: "Real profits",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Sell Anytime",
      description: "Trade your tokens 24/7 on crypto exchanges. Traditional investments lock you in for 7-10 years.",
      highlight: "24/7 trading",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/97 to-background" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.08),transparent_65%)]" />
        {/* Subtle animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] animate-[gradient_20s_ease_infinite]" />
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
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary/12 to-accent/12 border-2 border-primary/25 mb-8 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-500 hover:scale-105 cursor-default">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-extrabold text-primary uppercase tracking-wider">Platform Benefits</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold tracking-[-0.03em] mb-6 leading-[1.1]">
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent drop-shadow-sm">
              Why This Works
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-[1.75]">
            Investing in local businesses used to be impossible. Now it's easy.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group relative p-8 border-2 border-border/40 bg-white/75 backdrop-blur-xl hover:border-primary/50 hover:bg-white/95 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.25)] hover:-translate-y-2 h-full">
                  {/* Enhanced corner decorations */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 border-t-[3px] border-l-[3px] border-primary/0 rounded-tl-2xl transition-all duration-700 group-hover:border-primary/60 group-hover:-top-4 group-hover:-left-4" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 border-t-[3px] border-r-[3px] border-primary/0 rounded-tr-2xl transition-all duration-700 group-hover:border-primary/60 group-hover:-top-4 group-hover:-right-4" />
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-[3px] border-l-[3px] border-accent/0 rounded-bl-2xl transition-all duration-700 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-left-4" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-[3px] border-r-[3px] border-accent/0 rounded-br-2xl transition-all duration-700 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-right-4" />

                  {/* Icon with enhanced interaction */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 shadow-xl group-hover:scale-115 group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-700`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-500">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground/90 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Highlight with enhanced styling */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-green-50/80 group-hover:bg-green-100/80 transition-colors duration-500">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">
                      {benefit.highlight}
                    </span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}