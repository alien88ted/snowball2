"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const userHoldings = [
  {
    id: 1,
    projectName: "Snowflake Builder",
    projectIcon: "❄️",
    tokenSymbol: "SNOW",
    tokensOwned: 250,
    avgBuyPrice: 4.2,
    currentPrice: 4.8,
    totalValue: 1200,
    change24h: 12.5,
    equityPercent: 2.5,
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 2,
    projectName: "Winter Dashboard",
    projectIcon: "📊",
    tokenSymbol: "DASH",
    tokensOwned: 180,
    avgBuyPrice: 3.2,
    currentPrice: 3.6,
    totalValue: 648,
    change24h: 8.2,
    equityPercent: 1.8,
    color: "from-purple-400 to-pink-300",
  },
  {
    id: 3,
    projectName: "Snowball Fight",
    projectIcon: "⛄",
    tokenSymbol: "FIGHT",
    tokensOwned: 95,
    avgBuyPrice: 11.5,
    currentPrice: 12.9,
    totalValue: 1225.5,
    change24h: 22.1,
    equityPercent: 0.95,
    color: "from-rose-400 to-pink-300",
  },
]

const recentActivity = [
  { type: "buy", project: "Snowflake Builder", amount: 50, price: 4.5, time: "2 hours ago", icon: "❄️" },
  { type: "sell", project: "Frosty Chat", amount: 30, price: 8.2, time: "1 day ago", icon: "💬" },
  { type: "buy", project: "Snowball Fight", amount: 25, price: 12.1, time: "2 days ago", icon: "⛄" },
  { type: "buy", project: "Winter Dashboard", amount: 80, price: 3.4, time: "3 days ago", icon: "📊" },
]

export default function PortfolioClient() {
  const [timeframe, setTimeframe] = useState("24h")
  const [hoveredHolding, setHoveredHolding] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const totalPortfolioValue = userHoldings.reduce((sum, holding) => sum + holding.totalValue, 0)
  const totalInvested = userHoldings.reduce((sum, holding) => sum + holding.tokensOwned * holding.avgBuyPrice, 0)
  const totalGainLoss = totalPortfolioValue - totalInvested
  const totalGainLossPercent = ((totalGainLoss / totalInvested) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15), transparent 50%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(236,72,153,0.15), transparent 50%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 20% 80%, rgba(168,85,247,0.15), transparent 50%)" }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-float"
          style={{ top: "10%", left: "5%" }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-r from-pink-400/20 to-rose-400/20 animate-float-delayed"
          style={{ bottom: "10%", right: "5%" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl bg-gradient-to-r from-purple-400/20 to-indigo-400/20 animate-float-slow"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative z-10">
        <div className="mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="text-[120px] font-bold text-foreground select-none">Portfolio</div>
          </div>
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              <span className="bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Your Portfolio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">Track your tokenized project investments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              label: "Total Value",
              value: `$${totalPortfolioValue.toFixed(2)}`,
              badge: `${Number(totalGainLossPercent) >= 0 ? "+" : ""}${totalGainLossPercent}%`,
              subtext: `${Number(totalGainLossPercent) >= 0 ? "+" : ""}$${totalGainLoss.toFixed(2)}`,
              positive: Number(totalGainLossPercent) >= 0,
              gradient: "from-blue-400 to-cyan-400",
            },
            {
              label: "Total Invested",
              value: `$${totalInvested.toFixed(2)}`,
              subtext: `Across ${userHoldings.length} projects`,
              gradient: "from-pink-400 to-rose-400",
            },
            {
              label: "Total Equity",
              value: `${userHoldings.reduce((sum, h) => sum + h.equityPercent, 0).toFixed(2)}%`,
              subtext: "Combined ownership stake",
              gradient: "from-purple-400 to-indigo-400",
            },
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
              <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

              <div className="relative rounded-3xl border-2 border-border/40 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative p-10">
                  <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-semibold">{stat.label}</p>
                  <h3 className="text-5xl font-bold text-foreground mb-6 font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">{stat.value}</h3>
                  {stat.badge ? (
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant="secondary"
                        className={`px-3 py-1.5 text-xs font-semibold ${stat.positive ? "bg-green-100 text-green-700 border-2 border-green-200" : "bg-red-100 text-red-700 border-2 border-red-200"}`}
                      >
                        {stat.positive ? "📈" : "📉"} {stat.badge}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{stat.subtext}</span>
                    </div>
                  ) : (
                    <p className="text-base text-muted-foreground font-medium">{stat.subtext}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mb-20 group">
          <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
          <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
          <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
          <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

          <div className="relative rounded-3xl border-2 border-border/40 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="relative p-12">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Your Holdings</h2>
                  <p className="text-base md:text-lg text-muted-foreground">Tokenized projects you own</p>
                </div>
                <div className="flex items-center gap-3">
                  {["24h", "7d", "30d", "All"].map((tf) => (
                    <Button
                      key={tf}
                      variant={timeframe === tf ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeframe(tf)}
                      className={`h-10 px-5 rounded-full font-semibold transition-all duration-300 ${timeframe === tf ? "bg-black text-white shadow-lg hover:scale-105" : "border-2 border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:scale-105"}`}
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {userHoldings.map((holding, index) => {
                  const gainLoss = holding.totalValue - holding.tokensOwned * holding.avgBuyPrice
                  const gainLossPercent = ((gainLoss / (holding.tokensOwned * holding.avgBuyPrice)) * 100).toFixed(2)
                  const isHovered = hoveredHolding === index

                  return (
                    <div
                      key={holding.id}
                      className="group/holding relative"
                      onMouseEnter={() => setHoveredHolding(index)}
                      onMouseLeave={() => setHoveredHolding(null)}
                    >
                      <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl transition-all duration-300 group-hover/holding:border-primary/30" />
                      <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/20 rounded-tr-2xl transition-all duration-300 group-hover/holding:border-primary/30" />
                      <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/20 rounded-bl-2xl transition-all duration-300 group-hover/holding:border-accent/30" />
                      <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/20 rounded-br-2xl transition-all duration-300 group-hover/holding:border-accent/30" />

                      <div className="relative rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                        {isHovered && <div className={`absolute inset-0 bg-gradient-to-r ${holding.color} opacity-5`} />}

                        <div className="relative flex items-center justify-between p-8">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${holding.color} blur-xl opacity-50`} />
                              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${holding.color} flex items-center justify-center text-4xl shadow-xl transition-all duration-300 ${isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"}`}>
                                <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm" />
                                <span className="relative z-10">{holding.projectIcon}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-4 mb-3">
                                <h3 className="text-2xl font-bold text-foreground font-serif tracking-tight">{holding.projectName}</h3>
                                <Badge variant="outline" className="text-xs font-mono font-semibold px-3 py-1 border-2">
                                  {holding.tokenSymbol}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-5 text-base text-muted-foreground">
                                <span className="font-semibold">{holding.tokensOwned} tokens</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="font-semibold">{holding.equityPercent}% equity</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="font-semibold">Avg ${holding.avgBuyPrice.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-foreground mb-3 font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                              ${holding.totalValue.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-4 justify-end">
                              <Badge
                                variant="secondary"
                                className={`text-sm px-3 py-1.5 font-semibold ${Number(gainLossPercent) >= 0 ? "bg-green-100 text-green-700 border-2 border-green-200" : "bg-red-100 text-red-700 border-2 border-red-200"}`}
                              >
                                {Number(gainLossPercent) >= 0 ? "+" : ""}
                                {gainLossPercent}%
                              </Badge>
                              <span className={`text-base font-bold ${Number(gainLossPercent) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {Number(gainLossPercent) >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
          <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
          <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
          <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

          <div className="relative rounded-3xl border-2 border-border/40 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="relative p-12">
              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Recent Activity</h2>
                <p className="text-base md:text-lg text-muted-foreground">Your latest transactions</p>
              </div>
              <div className="space-y-5">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="group/activity relative">
                    <div className="absolute -top-0 -left-0 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-xl transition-all duration-300 group-hover/activity:border-primary/30" />
                    <div className="absolute -top-0 -right-0 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-xl transition-all duration-300 group-hover/activity:border-primary/30" />
                    <div className="absolute -bottom-0 -left-0 w-16 h-16 border-l-2 border-b-2 border-accent/20 rounded-bl-xl transition-all duration-300 group-hover/activity:border-accent/30" />
                    <div className="absolute -bottom-0 -right-0 w-16 h-16 border-r-2 border-b-2 border-accent/20 rounded-br-xl transition-all duration-300 group-hover/activity:border-accent/30" />

                    <div className="relative rounded-xl border-2 border-border/40 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                      <div className="relative flex items-center justify-between p-6">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-xl bg-muted/50 blur-md" />
                            <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/60 border-2 border-border/40 flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover/activity:scale-110">
                              {activity.icon}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-4 mb-2">
                              <Badge
                                variant="secondary"
                                className={`text-sm px-3 py-1.5 font-semibold ${activity.type === "buy" ? "bg-green-100 text-green-700 border-2 border-green-200" : "bg-red-100 text-red-700 border-2 border-red-200"}`}
                              >
                                {activity.type === "buy" ? "Buy" : "Sell"}
                              </Badge>
                              <span className="font-bold text-foreground text-lg">{activity.project}</span>
                            </div>
                            <p className="text-base text-muted-foreground font-medium">
                              {activity.amount} tokens at ${activity.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground mb-2 font-serif tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                            ${(activity.amount * activity.price).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(calc(-50% + 20px), calc(-50% - 20px)); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
      `}</style>
    </div>
  )
}


