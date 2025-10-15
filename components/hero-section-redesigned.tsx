"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Hero2Background } from "./hero2-background"
import { getProject } from "@/lib/projects"

export function HeroSectionRedesigned() {
  const project = getProject("coffee")!

  const progressPercentage = (project.raised / project.fundingGoal) * 100
  // Market cap = only circulating tokens (presale sold) × price
  const circulatingSupply = project.raised > 0 ? (project.raised / project.price) : 0
  const currentMarketCap = circulatingSupply * project.price

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <Hero2Background />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">
            {/* Context Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="text-sm font-bold text-primary">Tokenize Real Businesses</span>
            </motion.div>

            {/* Simplified Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-[-0.03em] leading-[1.1]"
            >
              <span className="block text-foreground">Invest in Local Businesses.</span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_6s_ease_infinite]">Earn From Every Sale.</span>
            </motion.h1>

            {/* Concrete Example */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xl md:text-2xl text-foreground/90 font-semibold max-w-xl"
            >
              Your favorite coffee shop. Your local gym. <span className="text-primary">Now investable.</span>
            </motion.p>

            {/* Bullet Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-3 max-w-xl"
            >
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground"><strong className="text-foreground font-semibold">Businesses</strong> raise $100K+ without banks or VCs</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground"><strong className="text-foreground font-semibold">You</strong> invest from $100, get real profit shares</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground"><strong className="text-foreground font-semibold">Customers</strong> earn tokens with every purchase</p>
              </div>
            </motion.div>

            {/* Trust signals - clearer messaging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200/50">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-700">Legal & Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200/50">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-700">Secure Treasury</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200/50">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-700">Community-Owned</span>
              </div>
            </motion.div>

            {/* Clear action-oriented CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full max-w-lg"
            >
              <Link href="/explorer" className="flex-1">
                <button className="group relative w-full h-14 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_4s_ease_infinite]" />
                  <div className="relative h-full flex items-center justify-center gap-2 text-white font-bold text-base">
                    <span>See Live Opportunities</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              </Link>
              <Link href="#how-it-works" className="flex-1">
                <button className="w-full h-14 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 bg-background hover:bg-card font-bold text-base">
                  Learn How It Works
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Live Badge - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/70 shadow-[0_8px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_40px_rgba(34,197,94,0.35)] transition-all duration-300 hover:scale-105 cursor-default">
                  <div className="relative">
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                    <div className="relative w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-green-700 uppercase tracking-wider">
                    Presale Live
                  </span>
                </div>
              </motion.div>

              <Card className="group relative overflow-hidden border-2 border-primary/25 hover:border-primary/40 transition-all duration-700 hover:shadow-[0_30px_70px_-15px_rgba(59,130,246,0.4)] bg-white/85 backdrop-blur-xl rounded-2xl hover:scale-[1.01] active:scale-[0.99]">
                {/* Enhanced corner decorations */}
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-[3px] border-l-[3px] border-primary/40 rounded-tl-2xl transition-all duration-700 ease-out group-hover:border-primary/70 group-hover:-top-5 group-hover:-left-5" />
                <div className="absolute -top-3 -right-3 w-20 h-20 border-t-[3px] border-r-[3px] border-primary/40 rounded-tr-2xl transition-all duration-700 ease-out group-hover:border-primary/70 group-hover:-top-5 group-hover:-right-5" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-[3px] border-l-[3px] border-accent/40 rounded-bl-2xl transition-all duration-700 ease-out group-hover:border-accent/70 group-hover:-bottom-5 group-hover:-left-5" />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-[3px] border-r-[3px] border-accent/40 rounded-br-2xl transition-all duration-700 ease-out group-hover:border-accent/70 group-hover:-bottom-5 group-hover:-right-5" />

                <div className="bg-gradient-to-br from-card to-background border-b pt-8">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-bold font-serif tracking-tight">{project.name}</h3>
                        <p className="text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Token Price</div>
                        <div className="text-2xl font-bold">${project.price}</div>
                        <div className="text-xs text-muted-foreground">per token</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center"><div className="text-2xl font-bold text-foreground">100M</div><div className="text-xs text-muted-foreground mt-1">Total Supply</div></div>
                    <div className="text-center"><div className="text-2xl font-bold text-foreground">${(project.fundingGoal / 1000)}K</div><div className="text-xs text-muted-foreground mt-1">Target Raise</div></div>
                    <div className="text-center"><div className="text-2xl font-bold text-foreground">{project.revenueShare}%</div><div className="text-xs text-muted-foreground mt-1">Profit Share</div></div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">${project.raised.toLocaleString()} raised</span>
                      <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progressPercentage || 1}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Opening {project.opening}</span>
                      <span className="text-xs text-muted-foreground">0 investors</span>
                    </div>
                  </div>

                  {/* Simple Market Stats */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Tokens Sold</div>
                      <div className="text-lg font-bold text-foreground">
                        {circulatingSupply > 0 ? circulatingSupply.toLocaleString() : '0'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
                      <div className="text-lg font-bold text-primary">
                        ${currentMarketCap > 0 ? currentMarketCap.toLocaleString() : '0'}
                      </div>
                    </div>
                  </div>

                  <Link href="/explorer" className="block">
                    <button className="group relative w-full h-14 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white rounded-xl font-bold text-[15px] transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.5)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 animate-[gradient_6s_ease_infinite]">
                      {/* Enhanced corners */}
                      <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-[2.5px] border-l-[2.5px] border-white/50 rounded-tl-md transition-all duration-500 group-hover:border-white/80 group-hover:-top-2 group-hover:-left-2" />
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-white/50 rounded-tr-md transition-all duration-500 group-hover:border-white/80 group-hover:-top-2 group-hover:-right-2" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-[2.5px] border-l-[2.5px] border-white/40 rounded-bl-md transition-all duration-500 group-hover:border-white/70 group-hover:-bottom-2 group-hover:-left-2" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-[2.5px] border-r-[2.5px] border-white/40 rounded-br-md transition-all duration-500 group-hover:border-white/70 group-hover:-bottom-2 group-hover:-right-2" />
                      <span>View Details & Invest</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      `}</style>
    </section>
  )
}

