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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-[-0.02em] leading-[1.1]"
            >
              <span className="block text-foreground">Turn Any Business Into</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_6s_ease_infinite]">Community-Owned Assets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              The $NOW platform enables businesses to raise capital through tokenization.
              Investors get real revenue share. Customers earn tokens with every purchase.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground"><Shield className="w-4 h-4 text-green-600" /><span>SEC-Compliant</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span>Multi-sig Treasury</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4 text-purple-600" /><span>100% Community</span></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full max-w-lg"
            >
              <Link href="/explorer" className="flex-1">
                <div className="group relative h-14 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_4s_ease_infinite]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative h-full flex items-center justify-center gap-2 text-white font-semibold">
                    <span className="text-[15px] tracking-tight">Explore Launches</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
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

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="relative">
              {/* Live Badge - Fixed */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 shadow-lg">
                  <div className="relative">
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    <div className="relative w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                    Presale Live
                  </span>
                </div>
              </div>

              <Card className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] bg-white/80 backdrop-blur-xl rounded-2xl">
                {/* Clean corner decorations */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-4 group-hover:-left-4" />
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-primary/40 rounded-tr-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-4 group-hover:-right-4" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-left-4" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-4 group-hover:-right-4" />

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
                    <button className="group relative w-full h-12 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                      {/* Clean corners */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-[2px] border-l-[2px] border-white/50 rounded-tl transition-all duration-300 group-hover:border-white group-hover:-top-1.5 group-hover:-left-1.5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-[2px] border-r-[2px] border-white/50 rounded-tr transition-all duration-300 group-hover:border-white group-hover:-top-1.5 group-hover:-right-1.5" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-[2px] border-l-[2px] border-white/30 rounded-bl transition-all duration-300 group-hover:border-white/70 group-hover:-bottom-1.5 group-hover:-left-1.5" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-[2px] border-r-[2px] border-white/30 rounded-br transition-all duration-300 group-hover:border-white/70 group-hover:-bottom-1.5 group-hover:-right-1.5" />
                      <span>View Details & Invest</span>
                      <ArrowRight className="w-4 h-4" />
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

