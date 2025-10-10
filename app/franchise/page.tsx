"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, Store, Users, TrendingUp, Shield, Vote, Coins, Network, CheckCircle2, DollarSign, Globe, Sparkles, Target, Zap } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function FranchisePage() {
  const [mounted, setMounted] = useState(false)
  const [activeExample, setActiveExample] = useState(0)
  const [animatedRevenue, setAnimatedRevenue] = useState(0)
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])

  // Magnetic cursor effect for CTAs
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 100

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3
      ctaRefs.current[index]!.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ctaRefs.current[index]) {
      ctaRefs.current[index]!.style.transform = 'translate(0, 0)'
    }
  }

  useEffect(() => {
    setMounted(true)

    // Animate revenue numbers
    const revenueTargets = [500000, 2500000, 5000000]
    const target = revenueTargets[activeExample]
    const duration = 1500
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedRevenue(Math.floor(target * eased))

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    animateNumber()
  }, [activeExample])

  if (!mounted) return null

  const networkExamples = [
    { franchises: 10, revenue: 500000, distribution: 50000 },
    { franchises: 50, revenue: 2500000, distribution: 250000 },
    { franchises: 100, revenue: 5000000, distribution: 500000 }
  ]

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="w-4 h-4 text-primary opacity-20" />
                </div>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Launch Your Own Location
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-[100px] font-serif font-bold tracking-[-0.03em] leading-[1.05] mb-6">
              <span className="block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Community-Owned
              </span>
              <span className="block mt-2 bg-gradient-to-br from-primary via-accent to-primary/70 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                Franchises
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-muted-foreground/80 text-[17px] md:text-xl leading-[1.6] mb-10">
              Token holders can launch franchised locations worldwide. Every $ store is tokenized,
              community-funded, and transparently operated.
              <span className="font-bold text-foreground"> From NYC to Paris, own the network.</span>
            </p>

            {/* Magnetic CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link href="/franchise/apply" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[0] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s' }}
                >
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
                  <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-black via-gray-900 to-black" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative h-full flex items-center justify-center gap-3 text-white">
                    <Store className="w-5 h-5" />
                    <span className="text-[15px] font-bold tracking-[-0.01em]">Apply for Franchise</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>

              <Link href="/franchise/proposals" className="flex-1">
                <div
                  ref={el => { ctaRefs.current[1] = el }}
                  onMouseMove={(e) => handleMouseMove(e, 1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                  className="group relative h-16 rounded-2xl overflow-hidden cursor-pointer border-2 border-border/50 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)] will-change-transform"
                  style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-2 text-foreground font-semibold text-[15px] tracking-[-0.01em]">
                    <Vote className="w-4 h-4" />
                    <span>View Proposals & Vote</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              {[
                { icon: Shield, text: "Parent Token Approval", color: "text-blue-600" },
                { icon: Coins, text: "10% to All Holders", color: "text-green-600" },
                { icon: Network, text: "Global Network", color: "text-purple-600" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                    <item.icon className={`w-3.5 h-3.5 ${item.color} transition-transform duration-300 group-hover:rotate-12`} />
                  </div>
                  <span className="text-sm text-muted-foreground/80 font-semibold group-hover:text-foreground transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* How It Works - Dual Token System */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Nested Token Architecture
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Parent tokens own the brand. Franchise tokens own locations. Everyone wins.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {/* Parent Token */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative group/card h-full">
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-300 group-hover/card:border-primary/60" />
                <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-all duration-300 group-hover/card:border-primary/60" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-300 group-hover/card:border-accent/60" />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-all duration-300 group-hover/card:border-accent/60" />

                <Card className="relative border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  </div>

                  <div className="relative p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-md" />
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
                          <Coins className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-serif tracking-tight">$COFFEE</h3>
                        <p className="text-xs text-muted-foreground/70 tracking-wide">Parent Token</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30 group-hover:border-primary/20 transition-colors">
                        <p className="text-sm font-semibold mb-2 text-foreground/90">What You Own</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The master franchise rights, global brand, and share of all franchise revenue
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          "Earn 10% of ALL franchise profits",
                          "Vote on franchise approvals",
                          "Control brand standards globally",
                          "Qualify to become franchisee"
                        ].map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-gradient-to-br from-card/50 to-background/50 border border-border/30 hover:border-green-200/40 hover:bg-green-50/20 transition-all duration-300 group/item">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                            <p className="text-sm text-muted-foreground/90 group-hover/item:text-foreground transition-colors">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Franchise Token */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative group/card h-full">
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-purple-400/40 rounded-tl-2xl transition-all duration-300 group-hover/card:border-purple-400/60" />
                <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-purple-400/40 rounded-tr-2xl transition-all duration-300 group-hover/card:border-purple-400/60" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-blue-400/40 rounded-bl-2xl transition-all duration-300 group-hover/card:border-blue-400/60" />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-2xl transition-all duration-300 group-hover/card:border-blue-400/60" />

                <Card className="relative border-2 border-border/40 transition-all duration-300 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-400/10 overflow-hidden group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                  </div>

                  <div className="relative p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-md" />
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center border border-purple-500/20">
                          <Store className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-serif tracking-tight">$COFFEE-NYC</h3>
                        <p className="text-xs text-muted-foreground/70 tracking-wide">Franchise Token</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-border/30 group-hover:border-purple-200/20 transition-colors">
                        <p className="text-sm font-semibold mb-2 text-foreground/90">What You Own</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A specific franchise location in your city with local governance rights
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          "Earn 30% of location profits",
                          "Vote on local operations",
                          "Location-specific perks & benefits",
                          "Tradeable on DEX after launch"
                        ].map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-gradient-to-br from-card/50 to-background/50 border border-border/30 hover:border-green-200/40 hover:bg-green-50/20 transition-all duration-300 group/item">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                            <p className="text-sm text-muted-foreground/90 group-hover/item:text-foreground transition-colors">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Network Effect Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative group/card">
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl transition-all duration-300 group-hover/card:border-primary/60" />
              <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl transition-all duration-300 group-hover/card:border-primary/60" />
              <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-accent/40 rounded-bl-3xl transition-all duration-300 group-hover/card:border-accent/60" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-accent/40 rounded-br-3xl transition-all duration-300 group-hover/card:border-accent/60" />

              <Card className="relative border-2 border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                </div>

                <div className="relative p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg animate-pulse" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
                        <Network className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-serif tracking-tight">Network Effect</h3>
                      <p className="text-sm text-muted-foreground/70">More franchises = More valuable parent token</p>
                    </div>
                  </div>

                  {/* Interactive selector */}
                  <div className="flex gap-2 mb-6">
                    {networkExamples.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveExample(i)}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all duration-300 ${
                          activeExample === i
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg'
                            : 'border-border/40 hover:border-primary/30 bg-card/50'
                        }`}
                      >
                        <div className="text-2xl font-bold font-serif mb-1">{example.franchises}</div>
                        <div className="text-xs text-muted-foreground">Locations</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground/70 mb-2">Network Revenue</div>
                        <div className="text-3xl font-bold font-serif mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          ${(animatedRevenue / 1000).toLocaleString()}K
                        </div>
                        <div className="text-xs text-muted-foreground/60">per year</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground/70 mb-2">To Parent Holders</div>
                        <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/20">
                          <div className="text-xs font-semibold text-muted-foreground mb-1">10% Distribution</div>
                          <div className="text-2xl font-bold text-primary">
                            ${(networkExamples[activeExample].distribution / 1000).toLocaleString()}K
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground/70 mb-2">Per Holder ROI</div>
                        <div className="text-3xl font-bold font-serif mb-1 text-green-600">
                          {(networkExamples[activeExample].franchises * 2.5).toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground/60">annual yield</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* Launch Process */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Launch Your Franchise
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Four steps from proposal to grand opening
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Qualify",
                icon: Shield,
                description: "Hold 10K+ parent tokens, submit business plan, pay $5K fee",
                color: "blue"
              },
              {
                step: "02",
                title: "Vote",
                icon: Vote,
                description: "Parent holders vote on your proposal over 7 days",
                color: "purple"
              },
              {
                step: "03",
                title: "Raise",
                icon: Coins,
                description: "Launch franchise token presale, raise $300-500K",
                color: "green"
              },
              {
                step: "04",
                title: "Open",
                icon: Store,
                description: "Build location, start operations, distribute profits",
                color: "orange"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative group/card h-full">
                  <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover/card:border-primary/50" />
                  <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover/card:border-primary/50" />
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover/card:border-accent/50" />
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover/card:border-accent/50" />

                  <Card className="relative border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 overflow-hidden group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    </div>

                    <div className="relative p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl font-bold font-serif text-primary/20">{step.step}</span>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
                          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                            <step.icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold font-serif tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative group/card">
              <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl transition-all duration-500 group-hover/card:border-primary/60" />
              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl transition-all duration-500 group-hover/card:border-primary/60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-accent/40 rounded-bl-3xl transition-all duration-500 group-hover/card:border-accent/60" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-accent/40 rounded-br-3xl transition-all duration-500 group-hover/card:border-accent/60" />

              <Card className="relative border-2 border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 backdrop-blur-sm" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                </div>

                <div className="relative p-16 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Ready to Scale
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Launch Your Location
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8">
                    From your city to the world, build a tokenized franchise with community ownership.
                    Share profits, govern together, scale globally.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                    <Link href="/franchise/apply" className="flex-1">
                      <div
                        ref={el => { ctaRefs.current[2] = el }}
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseLeave={() => handleMouseLeave(2)}
                        className="group relative h-14 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] will-change-transform"
                        style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s' }}
                      >
                        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
                        <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-black via-gray-900 to-black" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                        <div className="relative h-full flex items-center justify-center gap-2 text-white">
                          <span className="text-[15px] font-bold">Start Application</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </Link>

                    <Link href="/franchise/proposals" className="flex-1">
                      <div
                        ref={el => { ctaRefs.current[3] = el }}
                        onMouseMove={(e) => handleMouseMove(e, 3)}
                        onMouseLeave={() => handleMouseLeave(3)}
                        className="group relative h-14 rounded-2xl overflow-hidden cursor-pointer border-2 border-border/50 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)] will-change-transform"
                        style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <div className="relative h-full flex items-center justify-center gap-2 text-foreground font-semibold text-[15px]">
                          <span>View Proposals</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

    </div>
  )
}
