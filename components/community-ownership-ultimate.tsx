"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Store, Wallet, TrendingUp, Users, Coins, DollarSign, BarChart3, Shield, Globe, CheckCircle2, ArrowRight, Sparkles, Zap, Target, Award, ChevronRight, Coffee, Building2, Banknote, PiggyBank, LineChart, Heart, ArrowUpRight, Activity, Gem, Lock, Database, CircleDollarSign, FileText, ChartBar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CommunityOwnershipUltimate() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  // Premium 3D card effect
  const handleCardMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleCardMouseLeave = (cardId: string) => {
    const card = cardRefs.current[cardId]
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }
  }

  const processSteps = [
    {
      phase: "LAUNCH",
      title: "Business Creates Opportunity",
      description: "Verified local businesses tokenize their growth with institutional-grade smart contracts",
      metrics: {
        typical: "$300-500K",
        timeline: "48 hours",
        security: "Multi-sig secured"
      },
      icon: Building2,
      gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      accentColor: "text-blue-600",
      features: [
        "SEC-compliant tokenization framework",
        "Automated legal documentation",
        "Real-time financial modeling"
      ]
    },
    {
      phase: "INVEST",
      title: "Community Takes Ownership",
      description: "Direct investment through battle-tested DeFi infrastructure with institutional safeguards",
      metrics: {
        minimum: "0.1 SOL",
        average: "$2,500",
        participants: "500-2000"
      },
      icon: Users,
      gradient: "from-purple-600/10 via-purple-500/5 to-transparent",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      accentColor: "text-purple-600",
      features: [
        "Zero intermediary fees",
        "Instant settlement finality",
        "Regulatory compliance built-in"
      ]
    },
    {
      phase: "EARN",
      title: "Perpetual Revenue Sharing",
      description: "Automated profit distribution through immutable smart contracts with quarterly payouts",
      metrics: {
        yield: "25-40% APY",
        frequency: "Quarterly",
        verified: "On-chain proof"
      },
      icon: TrendingUp,
      gradient: "from-green-600/10 via-green-500/5 to-transparent",
      borderColor: "border-green-500/20 hover:border-green-500/40",
      accentColor: "text-green-600",
      features: [
        "Transparent revenue tracking",
        "Automated distribution system",
        "Compound earning potential"
      ]
    }
  ]

  const investmentModel = {
    initial: 1000,
    tokens: 1000,
    businessRevenue: 1200000,
    profitMargin: 25,
    distributionRate: 33,
    yearlyReturn: 1000,
    effectiveAPY: 33
  }

  const platformMetrics = [
    { label: "Total Invested", value: "$12.7M", trend: "+287%" },
    { label: "Active Businesses", value: "47", trend: "+23%" },
    { label: "Community Owners", value: "8,432", trend: "+412%" },
    { label: "Avg Returns", value: "31.2%", trend: "+8.3%" }
  ]

  if (!mounted) return null

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-background via-background/98 to-background">
      {/* Sophisticated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Ultra-premium header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Institutional-Grade Infrastructure
              </span>
            </div>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[-0.04em] mb-8">
            <span className="block text-foreground/90">Community</span>
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Ownership Protocol
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
            Transform local businesses into community-owned assets through
            blockchain-verified investment infrastructure
          </p>
        </motion.div>

        {/* Live metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformMetrics.map((metric, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-bold ${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                <div className="text-2xl font-bold font-mono tracking-tight">{metric.value}</div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main process visualization */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative group"
              >
                {/* Connection dots for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border via-primary/30 to-border z-10" />
                )}

                <Card
                  ref={(el) => { cardRefs.current[`step-${index}`] = el }}
                  onMouseMove={(e) => handleCardMouseMove(e, `step-${index}`)}
                  onMouseLeave={() => handleCardMouseLeave(`step-${index}`)}
                  className={`
                    relative h-full p-8 border-2 ${step.borderColor}
                    bg-gradient-to-br ${step.gradient}
                    transition-all duration-500 cursor-pointer
                    hover:shadow-2xl hover:shadow-primary/5
                    ${activeStep === index ? 'scale-[1.02]' : ''}
                  `}
                  style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Phase indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${step.accentColor}`}>
                      {step.phase}
                    </span>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${step.gradient} border ${step.borderColor.split(' ')[0]}`}>
                      <step.icon className={`w-5 h-5 ${step.accentColor}`} />
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground/80 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(step.metrics).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <div className="text-xs text-muted-foreground capitalize mb-1">{key}</div>
                        <div className="font-bold font-mono text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {step.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: activeStep === index ? 1 : 0.6,
                          x: activeStep === index ? 0 : -5
                        }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className={`w-4 h-4 ${step.accentColor} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-muted-foreground/90">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment calculator showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Card
            ref={(el) => { cardRefs.current['calculator'] = el }}
            onMouseMove={(e) => handleCardMouseMove(e, 'calculator')}
            onMouseLeave={() => handleCardMouseLeave('calculator')}
            className="relative border-2 border-primary/20 overflow-hidden"
            style={{
              willChange: 'transform',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <div className="relative p-12 md:p-16">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Investment flow */}
                <div>
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Investment Model
                    </span>
                    <h3 className="text-4xl font-bold mt-3 mb-4">
                      Real Returns. Real Ownership.
                    </h3>
                    <p className="text-lg text-muted-foreground/80">
                      Direct investment model with transparent, verifiable returns
                      distributed through smart contracts.
                    </p>
                  </div>

                  {/* Investment flow visualization */}
                  <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">Your Investment</span>
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold font-mono">${investmentModel.initial}</div>
                      <div className="text-sm text-muted-foreground mt-1">One-time investment</div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">Token Allocation</span>
                        <Coins className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold font-mono">{investmentModel.tokens}</div>
                      <div className="text-sm text-muted-foreground mt-1">Ownership tokens received</div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">Annual Return</span>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-3xl font-bold font-mono text-green-600">
                        ${investmentModel.yearlyReturn}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {investmentModel.effectiveAPY}% APY verified on-chain
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Business metrics */}
                <div>
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                      Business Performance
                    </span>
                    <h3 className="text-4xl font-bold mt-3 mb-4">
                      Proven Model at Scale
                    </h3>
                    <p className="text-lg text-muted-foreground/80">
                      Real businesses generating real revenue with transparent
                      profit sharing mechanisms.
                    </p>
                  </div>

                  {/* Business metrics */}
                  <div className="p-8 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Annual Revenue</div>
                        <div className="text-2xl font-bold font-mono">
                          ${(investmentModel.businessRevenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Profit Margin</div>
                        <div className="text-2xl font-bold font-mono">
                          {investmentModel.profitMargin}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Distribution Rate</div>
                        <div className="text-2xl font-bold font-mono">
                          {investmentModel.distributionRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Payment Frequency</div>
                        <div className="text-2xl font-bold">Quarterly</div>
                      </div>
                    </div>

                    {/* Visual profit chart */}
                    <div className="h-32 relative rounded-lg bg-gradient-to-t from-green-500/5 to-transparent border border-green-500/20 p-4">
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between h-20 gap-2">
                        {[40, 55, 45, 65, 70, 85, 90, 100].map((height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t opacity-80"
                          />
                        ))}
                      </div>
                      <div className="absolute top-2 right-4">
                        <span className="text-xs font-bold text-green-600">+18.2% QoQ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA section */}
              <div className="mt-12 pt-12 border-t border-border/50">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-center lg:text-left">
                    <h4 className="text-2xl font-bold mb-2">Ready to become an owner?</h4>
                    <p className="text-muted-foreground">
                      Join 8,432 community members earning passive income from local businesses
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-6 border-2"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Whitepaper
                    </Button>
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Start Investing
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
        >
          {[
            { icon: Shield, label: "Multi-Signature" },
            { icon: Lock, label: "Audited Contracts" },
            { icon: Database, label: "On-Chain Verification" },
            { icon: Activity, label: "Real-Time Monitoring" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground/60">
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}