"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CTASectionRedesigned() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    // Countdown to presale end (example: 30 days from now)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-8"
          >
            <Clock className="w-4 h-4 text-red-600" />
            <span className="text-sm font-bold text-red-600 dark:text-red-400">
              Limited Time Presale
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[-0.02em] mb-6"
          >
            Don't Miss Your Chance to
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              Own the Future
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            $COFFEE is just the beginning. Get in at presale prices before the platform
            launches hundreds of tokenized businesses. This is your opportunity to be part
            of the ownership revolution.
          </motion.p>

          {/* Value Props Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-6 mb-12"
          >
            {[
              { value: "$0.15", label: "Presale Price", subtext: "25% discount" },
              { value: "$100", label: "Minimum Investment", subtext: "Low barrier" },
              { value: "Q4 2025", label: "First Opening", subtext: "$COFFEE launch" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="text-2xl font-bold text-foreground mb-1">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground/60">
                  {item.subtext}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-4 p-4 rounded-xl bg-card border border-border mb-12"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="text-2xl text-border">:</div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="text-2xl text-border">:</div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/explorer">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex items-center gap-2">
                <span>Invest in $COFFEE Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="#whitepaper">
              <button className="px-8 py-4 bg-card border-2 border-border hover:border-primary/30 rounded-xl font-semibold transition-all duration-300">
                Read Whitepaper
              </button>
            </Link>
          </motion.div>

          {/* Trust Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground mt-8"
          >
            SEC-compliant tokenization • Multi-sig treasury • Audited smart contracts
          </motion.p>
        </motion.div>
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
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}