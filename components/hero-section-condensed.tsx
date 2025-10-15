"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, TrendingUp, Zap } from "lucide-react"
import { getProject } from "@/lib/projects"

export function HeroSectionCondensed() {
  const project = getProject("coffee")!
  const progressPercentage = (project.raised / project.fundingGoal) * 100

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 py-20">
        <div className="text-center space-y-8">
          {/* Single Clear Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight">
              Your Local Coffee Shop
              <span className="block text-primary mt-2">
                Now Owned By Everyone
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Invest $100. Own a piece. Earn from every latte sold.
            </p>
          </motion.div>

          {/* Three Core Benefits - Ultra Concise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">Community Owned</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold">33% Profit Share</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Trade 24/7</span>
            </div>
          </motion.div>

          {/* Live Opportunity Card - Simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-md mx-auto"
          >
            <div className="relative p-6 rounded-2xl border-2 border-primary/20 bg-card/50 backdrop-blur">
              {/* Live Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500 text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE NOW
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">${project.raised.toLocaleString()} raised</span>
                    <span>{progressPercentage.toFixed(0)}% funded</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold">${project.price}</div>
                    <div className="text-xs text-muted-foreground">per token</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{project.revenueShare}%</div>
                    <div className="text-xs text-muted-foreground">profit share</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{project.opening}</div>
                    <div className="text-xs text-muted-foreground">opening</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Single Strong CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/explorer">
              <button className="group px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-3 mx-auto">
                Invest Now - Presale Ends Soon
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <p className="text-sm text-muted-foreground mt-4">
              No accreditation needed • Start with $100 • Withdraw anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
