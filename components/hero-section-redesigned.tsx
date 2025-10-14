"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { Hero2Background } from "./hero2-background"
import { motion } from "framer-motion"

export function HeroSectionRedesigned() {
  const [animatedRaised, setAnimatedRaised] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Animate raised amount
    const targetAmount = 0
    const duration = 2000
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedRaised(Math.floor(targetAmount * eased))

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    animateNumber()

    // Countdown to Q4 2025
    const targetDate = new Date('2025-10-01T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const project = {
    name: "$COFFEE",
    symbol: "COFFEE",
    description: "Premium coffee shop in Beirut's tech hub. Every customer becomes an owner.",
    category: "Food & Beverage",
    price: 0.15,
    fundingGoal: 500000,
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "Presale Live"
  }

  const progressPercentage = (project.raised / project.fundingGoal) * 100

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <Hero2Background />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-12">

          {/* Hero Content */}
          <div className="max-w-4xl flex flex-col items-center gap-8 text-center">

            {/* Main Headline - Cleaner, More Impactful */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-[-0.02em] leading-[1.1]"
            >
              <span className="block text-foreground">
                Turn Any Business Into
              </span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                Community-Owned Assets
              </span>
            </motion.h1>

            {/* Subheadline - Clearer Value Prop */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              The $NOW platform enables businesses to raise capital through tokenization.
              Investors get real revenue share. Customers earn tokens with every purchase.
            </motion.p>

            {/* Trust Indicators - Moved Up for Immediate Credibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-green-600" />
                <span>SEC-Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Multi-sig Treasury</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-purple-600" />
                <span>100% Community Owned</span>
              </div>
            </motion.div>

            {/* Primary CTAs - Clean & Harmonious */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-lg"
            >
              {/* Primary CTA - Subtle Gradient */}
              <Link href="/explorer" className="flex-1">
                <div className="group relative h-14 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative h-full flex items-center justify-center gap-2 text-white font-semibold">
                    <span className="text-[15px] tracking-tight">Live Now</span>
                    <span className="text-[15px] tracking-tight opacity-60">•</span>
                    <span className="text-[15px] tracking-tight">Explore Launches</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Secondary CTA - Clean Border */}
              <Link href="#whitepaper" className="flex-1">
                <div className="group relative h-14 rounded-xl overflow-hidden cursor-pointer border border-border/60 hover:border-foreground/30 transition-all duration-300 bg-background/60 backdrop-blur-sm hover:bg-card/60">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-2 text-foreground font-semibold">
                    <span className="text-[15px] tracking-tight">Read Whitepaper</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Live Launch Card - Simplified and Template-Ready */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-3xl"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Live Now - Launch #1
                </span>
              </div>
            </div>

            <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl">
              {/* Card Header */}
              <div className="bg-gradient-to-br from-card to-background border-b">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl font-bold font-serif tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Presale Price</div>
                      <div className="text-2xl font-bold">${project.price}</div>
                      <div className="text-xs text-green-600 font-semibold">25% discount</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">$500K</div>
                    <div className="text-xs text-muted-foreground mt-1">Funding Goal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">Q4 2025</div>
                    <div className="text-xs text-muted-foreground mt-1">Opening Date</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">33%</div>
                    <div className="text-xs text-muted-foreground mt-1">Revenue Share</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">${animatedRaised.toLocaleString()} raised</span>
                    <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${progressPercentage || 1}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {countdown.days} days until launch
                    </span>
                    <span className="text-xs text-muted-foreground">
                      0 investors
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/explorer" className="block">
                  <button className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                    <span>View Details & Invest</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}