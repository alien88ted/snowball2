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
              Built for Everyone,
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradient_8s_ease_infinite] filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.25)]">
              Not Just the Elite
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-[1.75]">
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                className="group relative p-7 border-2 border-border/40 bg-white/75 backdrop-blur-xl hover:border-primary/40 hover:bg-white/95 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 cursor-default"
              >
                {/* Enhanced corner decorations */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[2.5px] border-l-[2.5px] border-primary/30 rounded-tl-md transition-all duration-700 group-hover:border-primary/70 group-hover:-top-3 group-hover:-left-3" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-[2.5px] border-r-[2.5px] border-primary/30 rounded-tr-md transition-all duration-700 group-hover:border-primary/70 group-hover:-top-3 group-hover:-right-3" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-[2.5px] border-l-[2.5px] border-accent/30 rounded-bl-md transition-all duration-700 group-hover:border-accent/70 group-hover:-bottom-3 group-hover:-left-3" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[2.5px] border-r-[2.5px] border-accent/30 rounded-br-md transition-all duration-700 group-hover:border-accent/70 group-hover:-bottom-3 group-hover:-right-3" />

                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] mb-2 transition-all duration-500 group-hover:scale-110 animate-[gradient_8s_ease_infinite]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-foreground/90 mb-1.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground/70">
                    {stat.sublabel}
                  </div>
                </div>
              </Card>
            </motion.div>
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