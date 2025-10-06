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

export default function PortfolioPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-float"
          style={{
            top: "10%",
            left: "5%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-r from-pink-400/20 to-rose-400/20 animate-float-delayed"
          style={{
            bottom: "10%",
            right: "5%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl bg-gradient-to-r from-purple-400/20 to-indigo-400/20 animate-float-slow"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Page uses global header from layout.tsx */}

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-2xl border border-border/50" />
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative p-8">
                <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-4xl font-bold text-foreground mb-4 font-serif">{stat.value}</h3>
                {stat.badge && (
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant="secondary"
                      className={`${stat.positive ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
                    >
                      {stat.positive ? "📈" : "📉"} {stat.badge}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{stat.subtext}</span>
                  </div>
                )}
                {!stat.badge && <p className="text-sm text-muted-foreground">{stat.subtext}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl" />
          <div className="absolute inset-0 rounded-3xl border border-border/50" />

          <div className="relative p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Your Holdings</h2>
                <p className="text-muted-foreground">Tokenized projects you own</p>
              </div>
              <div className="flex items-center gap-2">
                {["24h", "7d", "30d", "All"].map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                    className={`transition-all duration-300 ${timeframe === tf ? "bg-primary text-primary-foreground shadow-lg scale-105" : "hover:scale-105"}`}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {userHoldings.map((holding, index) => {
                const gainLoss = holding.totalValue - holding.tokensOwned * holding.avgBuyPrice
                const gainLossPercent = ((gainLoss / (holding.tokensOwned * holding.avgBuyPrice)) * 100).toFixed(2)
                const isHovered = hoveredHolding === index

                return (
                  <div
                    key={holding.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredHolding(index)}
                    onMouseLeave={() => setHoveredHolding(null)}
                    style={{
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm" />
                    <div className="absolute inset-0 rounded-2xl border border-border/50" />
                    {isHovered && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className={`absolute inset-[-2px] bg-gradient-to-r ${holding.color} opacity-30 blur-sm`} />
                      </div>
                    )}

                    <div className="relative flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${holding.color} blur-lg opacity-50`}
                          />
                          <div
                            className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${holding.color} flex items-center justify-center text-3xl shadow-xl transition-transform duration-300 ${isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"}`}
                          >
                            <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm" />
                            <span className="relative z-10">{holding.projectIcon}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{holding.projectName}</h3>
                            <Badge variant="outline" className="text-xs font-mono">
                              {holding.tokenSymbol}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-medium">{holding.tokensOwned} tokens</span>
                            <span>•</span>
                            <span>{holding.equityPercent}% equity</span>
                            <span>•</span>
                            <span>Avg ${holding.avgBuyPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground mb-2 font-serif">
                          ${holding.totalValue.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${Number(gainLossPercent) >= 0 ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
                          >
                            {Number(gainLossPercent) >= 0 ? "+" : ""}
                            {gainLossPercent}%
                          </Badge>
                          <span
                            className={`text-sm font-medium ${Number(gainLossPercent) >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {Number(gainLossPercent) >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl" />
          <div className="absolute inset-0 rounded-3xl border border-border/50" />

          <div className="relative p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Recent Activity</h2>
              <p className="text-muted-foreground">Your latest transactions</p>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="group relative hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 rounded-xl bg-background/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-xl border border-border/50" />

                  <div className="relative flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-muted blur-sm" />
                        <div className="relative w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                          {activity.icon}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${activity.type === "buy" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
                          >
                            {activity.type === "buy" ? "Buy" : "Sell"}
                          </Badge>
                          <span className="font-semibold text-foreground">{activity.project}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.amount} tokens at ${activity.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground mb-1">
                        ${(activity.amount * activity.price).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 30px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(-50%, -50%);
          }
          50% {
            transform: translate(calc(-50% + 20px), calc(-50% - 20px));
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
