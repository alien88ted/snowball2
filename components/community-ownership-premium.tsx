"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store, Wallet, TrendingUp, Users, Coins, DollarSign, BarChart3, Shield, Globe, CheckCircle2, ArrowRight, Sparkles, Zap, Target, Award, ChevronRight, Coffee, Building2, Banknote, PiggyBank, LineChart, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CommunityOwnershipPremium() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [animatedValue, setAnimatedValue] = useState(0)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)
    // Animate counter
    const duration = 2000
    const startTime = Date.now()
    const targetValue = 300000

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedValue(Math.floor(targetValue * eased))
      if (progress < 1) requestAnimationFrame(animateNumber)
    }

    animateNumber()
  }, [])

  // 3D card tilt effect
  const handleCardMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleCardMouseLeave = (cardId: string) => {
    const card = cardRefs.current[cardId]
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  const steps = [
    {
      icon: Building2,
      iconBg: "from-blue-500 to-indigo-600",
      title: "Business Launches",
      subtitle: "Real local businesses tokenize",
      description: "Coffee shop needs $100K to open. Creates tokens representing actual ownership.",
      highlight: "$100K",
      color: "blue",
      features: [
        { icon: Target, text: "Set funding goal" },
        { icon: Coins, text: "Create tokens" },
        { icon: BarChart3, text: "Define profit share" }
      ],
      visual: "☕",
      stats: { label: "Typical Raise", value: "$300-500K" }
    },
    {
      icon: Wallet,
      iconBg: "from-purple-500 to-pink-600",
      title: "Community Invests",
      subtitle: "You become an owner",
      description: "Buy tokens directly. Money goes straight to building the business.",
      highlight: "Direct Investment",
      color: "purple",
      features: [
        { icon: Shield, text: "Secure multi-sig" },
        { icon: Globe, text: "Global access" },
        { icon: Users, text: "Community driven" }
      ],
      visual: "💰",
      stats: { label: "Min Investment", value: "0.1 SOL" }
    },
    {
      icon: TrendingUp,
      iconBg: "from-green-500 to-emerald-600",
      title: "Everyone Earns",
      subtitle: "Profits shared forever",
      description: "Business opens. Profits distributed quarterly. Customers earn rewards.",
      highlight: "33% APY",
      color: "green",
      features: [
        { icon: DollarSign, text: "Quarterly payouts" },
        { icon: Award, text: "Customer rewards" },
        { icon: LineChart, text: "Value appreciation" }
      ],
      visual: "🚀",
      stats: { label: "Avg Returns", value: "25-40%" }
    }
  ]

  const realExample = {
    investment: 1000,
    tokens: 1000,
    yearlyProfit: 300000,
    yourShare: 1000,
    apy: 33,
    timeline: "Q1 2025"
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-card/20">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Revolutionary Ownership Model</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tighter mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
            How Community
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Ownership Works
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to owning real businesses in your community
          </p>

          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-green-500/20"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-green-500 rounded-full relative" />
              </div>
              <span className="text-sm font-bold text-green-700">LIVE NOW</span>
            </div>
            <div className="h-4 w-px bg-green-500/30" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="font-mono font-bold text-green-700">2,847 owners</span>
            </div>
            <div className="h-4 w-px bg-green-500/30" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-mono font-bold text-green-700">$1.2M invested</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Process Steps */}
        <div className="relative mb-24">
          {/* Connection Line with Gradient */}
          <div className="hidden lg:block absolute top-[140px] left-[16.66%] right-[16.66%] h-1 rounded-full overflow-hidden bg-gradient-to-r from-border/20 via-border/40 to-border/20">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-1000"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index
              const isPassed = activeStep > index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => {
                    setActiveStep(index)
                    setHoveredCard(index)
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative"
                >
                  {/* Glow Effect */}
                  {isActive && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
                  )}

                  <Card
                    ref={(el) => { cardRefs.current[`step-${index}`] = el }}
                    onMouseMove={(e) => handleCardMouseMove(e, `step-${index}`)}
                    onMouseLeave={() => handleCardMouseLeave(`step-${index}`)}
                    className={`
                      relative p-8 h-full border-2 rounded-3xl transition-all duration-500 cursor-pointer
                      ${isActive
                        ? 'border-primary/40 shadow-2xl shadow-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/5'
                        : 'border-border/30 hover:border-primary/30 bg-white/80'
                      }
                    `}
                    style={{ willChange: 'transform' }}
                  >
                    {/* Step Number Badge */}
                    <div className={`
                      absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg
                      ${isPassed
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                        : isActive
                        ? 'bg-gradient-to-br from-primary to-accent text-white animate-pulse'
                        : 'bg-gradient-to-br from-muted/50 to-muted text-muted-foreground'
                      }
                    `}>
                      {isPassed ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                    </div>

                    {/* Icon with Premium Background */}
                    <div className="mb-6">
                      <div className={`
                        relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.iconBg} p-0.5
                        ${isActive ? 'animate-pulse' : ''}
                      `}>
                        <div className="w-full h-full rounded-2xl bg-white/90 flex items-center justify-center">
                          <Icon className={`w-10 h-10 text-${step.color}-600`} />
                        </div>
                      </div>

                      {/* Visual Emoji */}
                      <div className="absolute -top-2 -right-2 text-3xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                        {step.visual}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold font-serif mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground font-semibold">{step.subtitle}</p>
                      </div>

                      <p className="text-muted-foreground/90 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Highlight Badge */}
                      <div className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-xl
                        bg-gradient-to-r from-${step.color}-50 to-${step.color}-100/50
                        border border-${step.color}-200/60
                      `}>
                        <Zap className={`w-4 h-4 text-${step.color}-600`} />
                        <span className={`text-sm font-bold text-${step.color}-700`}>
                          {step.highlight}
                        </span>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-2 pt-2">
                        {step.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: hoveredCard === index ? 1 : 0.7, x: hoveredCard === index ? 0 : -5 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <feature.icon className={`w-4 h-4 text-${step.color}-500`} />
                            <span className="text-sm text-muted-foreground">{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stat Card */}
                      <div className={`
                        p-3 rounded-xl bg-gradient-to-br from-${step.color}-50/50 to-transparent
                        border border-${step.color}-200/30
                      `}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                            {step.stats.label}
                          </span>
                          <span className={`text-lg font-bold font-mono text-${step.color}-700`}>
                            {step.stats.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Premium Real Example Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative corners */}
          <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />

          <Card
            ref={(el) => { cardRefs.current['example'] = el }}
            onMouseMove={(e) => handleCardMouseMove(e, 'example')}
            onMouseLeave={() => handleCardMouseLeave('example')}
            className="relative p-10 md:p-12 border-2 border-primary/30 rounded-3xl bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-2xl shadow-primary/10 overflow-hidden"
            style={{ willChange: 'transform' }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4">
                  <Coffee className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">REAL EXAMPLE</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-serif mb-3">
                  Your Investment Journey
                </h3>
                <p className="text-lg text-muted-foreground">
                  See exactly how your investment grows with actual numbers
                </p>
              </div>

              {/* Investment Flow */}
              <div className="grid md:grid-cols-5 gap-4 md:gap-2 items-center mb-10">
                {[
                  { label: "You Invest", value: `$${realExample.investment}`, icon: Wallet, color: "blue" },
                  { label: "You Get", value: `${realExample.tokens} tokens`, icon: Coins, color: "purple" },
                  { label: "Shop Profits", value: `$${(realExample.yearlyProfit/1000)}K/year`, icon: Store, color: "orange" },
                  { label: "Your Share", value: `$${realExample.yourShare}/year`, icon: PiggyBank, color: "green" },
                  { label: "Returns", value: `${realExample.apy}% APY`, icon: TrendingUp, color: "emerald" }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`
                        p-4 rounded-2xl text-center
                        bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/30
                        border-2 border-${item.color}-200/60
                        hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer
                      `}
                    >
                      <item.icon className={`w-8 h-8 mx-auto mb-2 text-${item.color}-600`} />
                      <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-xl font-bold font-serif">{item.value}</div>
                    </motion.div>

                    {i < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ChevronRight className="w-6 h-6 text-primary/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Visual Chart */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-green-700 font-semibold mb-1">Projected Annual Returns</p>
                    <p className="text-3xl font-bold font-serif text-green-900">
                      ${animatedValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700 font-semibold mb-1">Timeline</p>
                    <p className="text-2xl font-bold text-green-900">{realExample.timeline}</p>
                  </div>
                </div>

                {/* Progress bar visualization */}
                <div className="relative h-8 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '33%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full flex items-center justify-end pr-3"
                  >
                    <span className="text-xs font-bold text-white">33% APY</span>
                  </motion.div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg bg-gradient-to-r from-black via-gray-900 to-black hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <Wallet className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Start Investing Now
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>

                <p className="mt-4 text-sm text-muted-foreground">
                  Join 2,847+ community owners • Minimum investment 0.1 SOL
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
        >
          {[
            { icon: Shield, text: "Multi-sig Security" },
            { icon: Award, text: "Audited Contracts" },
            { icon: Users, text: "DAO Governed" },
            { icon: Heart, text: "Community First" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}