"use client"

import { motion } from "framer-motion"
import { Check, Zap, Shield, Globe, Coins, TrendingUp, Sparkles, Lock, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function WhyNowPlatform() {
  const benefits = [
    {
      icon: Globe,
      title: "Global Access",
      description: "Anyone, anywhere can invest",
      highlight: "195 countries",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "SEC Compliant",
      description: "Revenue sharing model",
      highlight: "100% legal",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Coins,
      title: "Real Yield",
      description: "Quarterly profit distributions",
      highlight: "8-15% APY",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade on DEX immediately",
      highlight: "24/7 trading",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Owned",
      description: "Every investor has a voice",
      highlight: "True ownership",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Lock,
      title: "Multi-sig Treasury",
      description: "Funds secured on-chain",
      highlight: "Transparent",
      color: "from-gray-600 to-gray-800"
    }
  ]

  const stats = [
    { label: "Minimum Investment", value: "$100", sublabel: "vs $25K traditional" },
    { label: "Time to Liquidity", value: "Instant", sublabel: "vs 7-10 years" },
    { label: "Global Reach", value: "195", sublabel: "countries" },
    { label: "Platform Fees", value: "0%", sublabel: "vs 5-10%" }
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.06),transparent_60%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6 shadow-lg shadow-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Platform Benefits</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.03em] mb-4">
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Built for Everyone,
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              Not Just the Elite
            </span>
          </h2>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Traditional funding excludes 99% of people. $NOW democratizes investment
            opportunities with community-driven tokenization.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group relative p-6 border-2 border-border/30 bg-white/70 backdrop-blur-xl hover:border-primary/30 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Corner decorations */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl transition-all duration-300 group-hover:border-primary/60 group-hover:-top-2 group-hover:-left-2" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr transition-all duration-300 group-hover:border-primary/60 group-hover:-top-2 group-hover:-right-2" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent/30 rounded-bl transition-all duration-300 group-hover:border-accent/60 group-hover:-bottom-2 group-hover:-left-2" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent/30 rounded-br transition-all duration-300 group-hover:border-accent/60 group-hover:-bottom-2 group-hover:-right-2" />

              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground/80 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.sublabel}
                </div>
              </div>
            </Card>
          ))}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative p-6 border-2 border-border/30 bg-white/70 backdrop-blur-xl hover:border-primary/40 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full">
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-[2.5px] border-l-[2.5px] border-primary/0 rounded-tl-lg transition-all duration-500 group-hover:border-primary/50 group-hover:-top-3 group-hover:-left-3" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-[2.5px] border-r-[2.5px] border-primary/0 rounded-tr-lg transition-all duration-500 group-hover:border-primary/50 group-hover:-top-3 group-hover:-right-3" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-[2.5px] border-l-[2.5px] border-accent/0 rounded-bl-lg transition-all duration-500 group-hover:border-accent/50 group-hover:-bottom-3 group-hover:-left-3" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-[2.5px] border-r-[2.5px] border-accent/0 rounded-br-lg transition-all duration-500 group-hover:border-accent/50 group-hover:-bottom-3 group-hover:-right-3" />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {benefit.description}
                  </p>

                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-foreground">
                      {benefit.highlight}
                    </span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 mb-6 shadow-lg shadow-green-100/50">
            <div className="relative">
              <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
              <div className="relative w-2.5 h-2.5 bg-green-500 rounded-full" />
            </div>
            <span className="text-sm font-bold text-green-700 uppercase tracking-wide">
              Presale Live Now
            </span>
          </div>
          <p className="text-muted-foreground mb-8 text-lg">
            Join the revolution in community-owned businesses
          </p>
          <a
            href="/explorer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white rounded-xl font-bold text-[16px] transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] hover:scale-[1.03] hover:-translate-y-0.5 animate-gradient"
          >
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-[2px] border-l-[2px] border-white/40 rounded-tl transition-all duration-300 group-hover:border-white/70 group-hover:-top-1.5 group-hover:-left-1.5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-[2px] border-r-[2px] border-white/40 rounded-tr transition-all duration-300 group-hover:border-white/70 group-hover:-top-1.5 group-hover:-right-1.5" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-[2px] border-l-[2px] border-white/30 rounded-bl transition-all duration-300 group-hover:border-white/60 group-hover:-bottom-1.5 group-hover:-left-1.5" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-[2px] border-r-[2px] border-white/30 rounded-br transition-all duration-300 group-hover:border-white/60 group-hover:-bottom-1.5 group-hover:-right-1.5" />

            <span>Start Investing Now</span>
            <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}