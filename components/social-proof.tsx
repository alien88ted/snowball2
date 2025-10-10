"use client"

import { motion } from "framer-motion"
import { Star, Quote, TrendingUp, Shield, Award, Users } from "lucide-react"
import { useState, useEffect } from "react"

export function SocialProof() {
  const [animatedStats, setAnimatedStats] = useState({
    investors: 0,
    raised: 0,
    businesses: 0,
    countries: 0
  })

  useEffect(() => {
    // Animate stats when in view
    const targets = {
      investors: 0, // Will be 1000+ after launch
      raised: 0, // Will be $500K+ after coffee launch
      businesses: 25, // Pipeline
      countries: 195 // Global access
    }

    const duration = 2500
    const startTime = Date.now()

    const animateNumbers = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        investors: Math.floor(targets.investors * eased),
        raised: Math.floor(targets.raised * eased),
        businesses: Math.floor(targets.businesses * eased),
        countries: Math.floor(targets.countries * eased)
      })

      if (progress < 1) {
        requestAnimationFrame(animateNumbers)
      }
    }

    animateNumbers()
  }, [])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Early Investor",
      content: "Finally, a way to invest in local businesses without being an accredited investor. The $NOW model just makes sense.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Business Owner",
      content: "Tokenizing my restaurant through $NOW was the best decision. No equity dilution, community support from day one.",
      avatar: "MJ",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Token Holder",
      content: "I love earning tokens every time I buy coffee. It's like being a mini-investor in my favorite local spots.",
      avatar: "ER",
      rating: 5
    }
  ]

  const partners = [
    { name: "Solana", logo: "SOL", description: "Blockchain Infrastructure" },
    { name: "Circle", logo: "USDC", description: "Stablecoin Partner" },
    { name: "Chainlink", logo: "LINK", description: "Oracle Network" },
    { name: "SafePal", logo: "SFP", description: "Wallet Partner" }
  ]

  const mediaLogos = [
    "TechCrunch",
    "Forbes",
    "Bloomberg",
    "CoinDesk",
    "The Block"
  ]

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-6">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Trusted Platform
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.02em] mb-4">
            Building the Future Together
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of investors and businesses revolutionizing ownership
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            {
              value: animatedStats.investors,
              label: "Early Supporters",
              suffix: "+",
              icon: Users,
              color: "from-blue-500 to-cyan-500"
            },
            {
              value: animatedStats.raised,
              label: "Ready to Deploy",
              prefix: "$",
              suffix: "K",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500"
            },
            {
              value: animatedStats.businesses,
              label: "Businesses Pipeline",
              suffix: "+",
              icon: Shield,
              color: "from-purple-500 to-pink-500"
            },
            {
              value: animatedStats.countries,
              label: "Countries Accessible",
              icon: Award,
              color: "from-orange-500 to-red-500"
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold font-serif mb-1">
                    {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            What Our Community Says
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners & Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Partners */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-center text-muted-foreground mb-8">
              Powered By Industry Leaders
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-border transition-all duration-300 text-center"
                >
                  <div className="text-2xl font-bold mb-1 text-primary">
                    {partner.logo}
                  </div>
                  <div className="text-sm font-semibold">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {partner.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Mentions */}
          <div className="p-8 rounded-2xl bg-muted/20 border border-border/50">
            <p className="text-sm text-muted-foreground text-center mb-6">
              As Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {mediaLogos.map((logo, index) => (
                <div
                  key={index}
                  className="text-lg font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: "SEC Compliant", color: "text-green-600" },
              { icon: Award, text: "Audited Smart Contracts", color: "text-blue-600" },
              { icon: Users, text: "Community First", color: "text-purple-600" }
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-sm font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}