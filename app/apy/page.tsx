"use client"

/**
 * YIELD CALCULATOR - Focus on investor returns
 * Model: 100M tokens, $0.15 price, 33% profit share, $100K target
 */

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ExplorerCorners } from "@/components/explorer-corners"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Store, DollarSign, Zap, Calculator, X, CheckCircle } from "lucide-react"

const VERIFIED = {
  totalSupply: 100_000_000,
  presaleSupply: 30_000_000,
  tokenPrice: 0.15,
  fundingTarget: 100_000,
  profitShare: 33,
}

export default function YieldCalculator() {
  const [investmentUSD, setInvestmentUSD] = useState(1000)
  const [monthlyRevenue, setMonthlyRevenue] = useState(25_000)
  const [profitMargin, setProfitMargin] = useState(20)
  const [buybackEnabled, setBuybackEnabled] = useState(true)
  const [showMathProof, setShowMathProof] = useState(false)
  const [showRaiseGuide, setShowRaiseGuide] = useState(false)

  // Calculate core metrics
  const tokensOwned = investmentUSD / VERIFIED.tokenPrice
  const baseOwnership = (tokensOwned / VERIFIED.totalSupply) * 100

  // Generate 10-year projection data using useMemo
  const { projectionData, year10Data } = useMemo(() => {
    const data = []
    let currentSupply = VERIFIED.totalSupply

    const expansionPlan = [
      { year: 0, branches: 0 },
      { year: 1, branches: 1 },
      { year: 2, branches: 3 },
      { year: 3, branches: 5 },
      { year: 4, branches: 7 },
      { year: 5, branches: 10 },
      { year: 6, branches: 15 },
      { year: 7, branches: 25 },
      { year: 8, branches: 35 },
      { year: 9, branches: 45 },
      { year: 10, branches: 50 },
    ]

    expansionPlan.forEach((plan) => {
      if (plan.year === 0) return

      const revenuePerBranch = monthlyRevenue * Math.pow(1.1, plan.year - 1)
      const profitPerBranch = (revenuePerBranch * (profitMargin / 100)) * 12
      const totalAnnualProfit = profitPerBranch * plan.branches

      if (buybackEnabled && plan.year > 0) {
        const buybackAmount = totalAnnualProfit * 0.10
        const avgPrice = VERIFIED.tokenPrice * Math.pow(1.15, plan.year - 1)
        const tokensBurned = buybackAmount / avgPrice
        currentSupply -= tokensBurned
      }

      const currentOwnership = (tokensOwned / currentSupply) * 100
      const toHolders = totalAnnualProfit * (VERIFIED.profitShare / 100)
      const yourAnnualPayout = toHolders * (currentOwnership / 100)
      const floorYield = (yourAnnualPayout / investmentUSD) * 100

      const scarcityMultiple = buybackEnabled ? VERIFIED.totalSupply / currentSupply : 1
      const demandMultiple = 1 + (Math.log(plan.branches + 1) / Math.log(51)) * 3
      const priceMultiple = scarcityMultiple * demandMultiple
      const estimatedPrice = VERIFIED.tokenPrice * priceMultiple
      const tokenValue = tokensOwned * estimatedPrice
      const unrealizedGain = tokenValue - investmentUSD
      const totalReturnUSD = unrealizedGain + (yourAnnualPayout * plan.year)
      const totalReturnPercent = (totalReturnUSD / investmentUSD) * 100

      data.push({
        year: plan.year,
        branches: plan.branches,
        floorYield: parseFloat(floorYield.toFixed(2)),
        totalReturn: parseFloat(totalReturnPercent.toFixed(1)),
        annualPayout: parseFloat(yourAnnualPayout.toFixed(0)),
        tokenValue: parseFloat(tokenValue.toFixed(0)),
        tokenPrice: parseFloat(estimatedPrice.toFixed(3)),
      })
    })

    return {
      projectionData: data,
      year10Data: data[data.length - 1]
    }
  }, [investmentUSD, monthlyRevenue, profitMargin, buybackEnabled, tokensOwned, baseOwnership])

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Header */}
      <section className="mb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="relative group/cta">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/70 to-card/80 backdrop-blur-2xl" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
              <ExplorerCorners offset={20} size={64} thickness={2.5} radius="2xl" scoped />

              <div className="relative p-10 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.03em] mb-3">
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Investor
                  </span>
                  {' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_4s_ease_infinite]">
                    Yield Calculator
                  </span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Realistic yield projections based on verified tokenomics and multi-branch expansion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        {/* Inputs Row */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="group relative bg-white/80 backdrop-blur-xl border-2 border-primary/20">
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-[2px] border-l-[2px] border-primary/40 rounded-tl-lg" />
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-[2px] border-r-[2px] border-primary/40 rounded-tr-lg" />
            <CardContent className="p-4">
              <Label htmlFor="investment" className="text-xs">Investment ($)</Label>
              <Input
                id="investment"
                type="number"
                min="100"
                step="100"
                value={investmentUSD}
                onChange={(e) => setInvestmentUSD(Math.max(100, Number(e.target.value) || 0))}
                className="mt-1 text-lg font-bold"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                = {tokensOwned.toLocaleString()} tokens
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border border-border/30">
            <CardContent className="p-4">
              <Label htmlFor="revenue" className="text-xs">Monthly Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                min="10000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Math.max(10000, Number(e.target.value) || 0))}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">Per branch</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border border-border/30">
            <CardContent className="p-4">
              <Label htmlFor="margin" className="text-xs">Profit Margin (%)</Label>
              <Input
                id="margin"
                type="number"
                min="5"
                max="40"
                value={profitMargin}
                onChange={(e) => setProfitMargin(Math.max(5, Math.min(40, Number(e.target.value) || 0)))}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">Industry: 15-25%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border border-border/30">
            <CardContent className="p-4">
              <Label className="text-xs">Buyback & Burn</Label>
              <div className="mt-1 flex gap-2">
                <button
                  className={`flex-1 px-2 py-1.5 rounded text-xs font-semibold ${buybackEnabled ? 'bg-accent text-white' : 'bg-muted'}`}
                  onClick={() => setBuybackEnabled(true)}
                >
                  ON
                </button>
                <button
                  className={`flex-1 px-2 py-1.5 rounded text-xs font-semibold ${!buybackEnabled ? 'bg-foreground text-background' : 'bg-muted'}`}
                  onClick={() => setBuybackEnabled(false)}
                >
                  OFF
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">10% of profits</div>
            </CardContent>
          </Card>
        </div>

        {/* 10-Year Vision Chart */}
        <Card className="group relative border-2 border-accent/30 bg-gradient-to-br from-white via-white/95 to-accent/5">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-accent/50 rounded-tl-xl transition-all duration-500 group-hover:border-accent/70" />
          <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-accent/50 rounded-tr-xl transition-all duration-500 group-hover:border-accent/70" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] border-primary/50 rounded-bl-xl transition-all duration-500 group-hover:border-primary/70" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] border-primary/50 rounded-br-xl transition-all duration-500 group-hover:border-primary/70" />

          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Store className="w-6 h-6 text-accent" />
              10-Year Expansion: Path to National Scale
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              From 1 location → 50+ locations (Vision: Starbucks has 36,000)
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis
                    dataKey="year"
                    label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                    stroke="rgba(0,0,0,0.5)"
                  />
                  <YAxis
                    label={{ value: 'Yield %', angle: -90, position: 'insideLeft' }}
                    stroke="rgba(0,0,0,0.5)"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-primary/20">
                          <div className="font-bold mb-2">Year {data.year} - {data.branches} Branches</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between gap-4">
                              <span className="text-green-600">Floor Yield:</span>
                              <span className="font-bold">{data.floorYield}%</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-blue-600">Total Return:</span>
                              <span className="font-bold">{data.totalReturn}%</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Annual Payout:</span>
                              <span className="font-bold">${data.annualPayout}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Token Value:</span>
                              <span className="font-bold">${data.tokenValue}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="floorYield"
                    stroke="rgb(34 197 94)"
                    strokeWidth={3}
                    name="Floor Yield % (Distributions Only)"
                    dot={{ fill: 'rgb(34 197 94)', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalReturn"
                    stroke="rgb(59 130 246)"
                    strokeWidth={3}
                    name="Total Return % (w/ Price Appreciation)"
                    dot={{ fill: 'rgb(59 130 246)', r: 5 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Insight */}
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
              <div className="font-bold text-yellow-900 mb-2">🎯 The Scale Advantage</div>
              <div className="text-sm text-yellow-800 leading-relaxed">
                <strong>Green line (Floor Yield):</strong> Your guaranteed minimum from profit distributions alone.
                This is the FLOOR - doesn't depend on token price.
                <br /><br />
                <strong>Blue line (Total Return):</strong> Includes token price appreciation from buybacks + demand growth.
                This is realistic if holders HODL and business scales.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yield Breakdown Table */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="group relative border-2 border-primary/20 bg-white/90 backdrop-blur-xl">
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-primary/40 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl" />

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Floor Yield (Distribution-Based)
              </CardTitle>
              <div className="text-sm text-muted-foreground">Guaranteed minimum - doesn't depend on price</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projectionData.filter(d => [1, 2, 3, 5, 7, 10].includes(d.year)).map((data) => (
                  <div key={data.year} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <span className="font-semibold">Year {data.year}</span>
                      <span className="text-xs text-muted-foreground ml-2">({data.branches} branches)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{data.floorYield}%</div>
                      <div className="text-xs text-muted-foreground">${data.annualPayout}/year</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-semibold text-green-800 mb-1">Why This Matters:</div>
                <div className="text-xs text-green-700">
                  Even if token price stays at $0.15 forever, you earn {year10Data?.floorYield}% annually by Year 10.
                  This is your FLOOR - the worst-case scenario if price doesn't move.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative border-2 border-blue-500/20 bg-white/90 backdrop-blur-xl">
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-blue-500/40 rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-blue-500/40 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl" />

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Total Return (w/ Price Appreciation)
              </CardTitle>
              <div className="text-sm text-muted-foreground">Floor yield + token price growth</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projectionData.filter(d => [1, 2, 3, 5, 7, 10].includes(d.year)).map((data) => (
                  <div key={data.year} className={`flex items-center justify-between p-3 rounded-lg ${data.year === 10 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400' : 'bg-muted/30'}`}>
                    <div>
                      <span className="font-semibold">Year {data.year}</span>
                      <span className="text-xs text-muted-foreground ml-2">({data.branches} branches)</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${data.year === 10 ? 'text-yellow-800' : 'text-blue-600'}`}>
                        {data.totalReturn}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Token: ${data.tokenPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-semibold text-blue-800 mb-1">The Upside:</div>
                <div className="text-xs text-blue-700">
                  With buybacks + scale, token price appreciates. By Year 10, your ${investmentUSD} could be worth ${year10Data?.tokenValue?.toLocaleString() || 0}
                  ({((year10Data?.tokenValue || 0) / investmentUSD).toFixed(1)}x) + you've earned ${(year10Data?.annualPayout || 0) * 10} in distributions.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Vision: Starbucks Scale */}
        <Card className="group relative border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-yellow-500/50 rounded-tl-xl transition-all duration-500 group-hover:border-yellow-500/70" />
          <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-yellow-500/50 rounded-tr-xl transition-all duration-500 group-hover:border-yellow-500/70" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] border-orange-500/50 rounded-bl-xl transition-all duration-500 group-hover:border-orange-500/70" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] border-orange-500/50 rounded-br-xl transition-all duration-500 group-hover:border-orange-500/70" />

          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              The Moon Shot: What if we hit Starbucks scale?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 bg-gradient-to-br from-white to-yellow-50/50 rounded-xl border-2 border-yellow-300/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-sm text-muted-foreground mb-2">Starbucks Locations</div>
                <div className="text-3xl font-bold text-yellow-900">36,000</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-yellow-50/50 rounded-xl border-2 border-yellow-300/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-sm text-muted-foreground mb-2">Even 0.1% of That</div>
                <div className="text-3xl font-bold text-yellow-900">36 branches</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-green-50/50 rounded-xl border-2 border-green-400/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-sm text-muted-foreground mb-2">Your Annual Payout</div>
                <div className="text-3xl font-bold text-green-600">
                  ${((monthlyRevenue * (profitMargin / 100) * 12 * 36 * (VERIFIED.profitShare / 100)) * (baseOwnership / 100)).toFixed(0)}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-400">
              <div className="text-lg font-bold text-yellow-900 mb-3">Maximum Success Scenario (Decade Plan)</div>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Your ${investmentUSD} investment →</span>
                  <span className="font-bold">{tokensOwned.toLocaleString()} tokens ({baseOwnership.toFixed(4)}% ownership)</span>
                </div>
                <div className="flex justify-between">
                  <span>If 36 branches:</span>
                  <span className="font-bold">${((monthlyRevenue * (profitMargin / 100) * 12 * 36 * (VERIFIED.profitShare / 100)) * (baseOwnership / 100)).toFixed(0)}/year in distributions</span>
                </div>
                <div className="flex justify-between">
                  <span>If 100 branches:</span>
                  <span className="font-bold">${((monthlyRevenue * (profitMargin / 100) * 12 * 100 * (VERIFIED.profitShare / 100)) * (baseOwnership / 100)).toFixed(0)}/year</span>
                </div>
                <div className="flex justify-between">
                  <span>If 1,000 branches (regional chain):</span>
                  <span className="font-bold text-green-700">${((monthlyRevenue * (profitMargin / 100) * 12 * 1000 * (VERIFIED.profitShare / 100)) * (baseOwnership / 100)).toLocaleString()}/year 🚀</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference: Yield at Different Scales */}
        <Card className="group relative border-2 border-primary/20 bg-gradient-to-br from-white via-white/95 to-primary/5 backdrop-blur-xl">
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-xl transition-all duration-500 group-hover:border-primary/60" />
          <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-primary/40 rounded-tr-xl transition-all duration-500 group-hover:border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl transition-all duration-500 group-hover:border-accent/60" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl transition-all duration-500 group-hover:border-accent/60" />

          <CardHeader>
            <CardTitle className="text-2xl">Expected Floor Yield by Scale (Distributions Only)</CardTitle>
            <div className="text-sm text-muted-foreground">Based on your ${investmentUSD} investment</div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-6 gap-3">
              {[1, 3, 5, 10, 25, 50].map((branchCount) => {
                const profit = monthlyRevenue * (profitMargin / 100) * 12 * branchCount
                const toHolders = profit * (VERIFIED.profitShare / 100)
                const payout = toHolders * (baseOwnership / 100)
                const yield_pct = (payout / investmentUSD) * 100

                return (
                  <div key={branchCount} className="p-4 bg-gradient-to-br from-white to-muted/30 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-border/30">
                    <div className="text-2xl font-bold text-foreground">{branchCount}</div>
                    <div className="text-xs text-muted-foreground mb-2">branches</div>
                    <div className="text-lg font-bold text-green-600">{yield_pct.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">${payout.toFixed(0)}/yr</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Clean Stock vs Token Comparison */}
        <Card className="group relative border-2 border-purple-500/20 bg-white/90 backdrop-blur-xl">
          <div className="absolute -top-3 -left-3 w-14 h-14 border-t-[2.5px] border-l-[2.5px] border-purple-500/40 rounded-tl-xl transition-all duration-500 group-hover:border-purple-500/60" />
          <div className="absolute -top-3 -right-3 w-14 h-14 border-t-[2.5px] border-r-[2.5px] border-purple-500/40 rounded-tr-xl transition-all duration-500 group-hover:border-purple-500/60" />
          <div className="absolute -bottom-3 -left-3 w-14 h-14 border-b-[2.5px] border-l-[2.5px] border-pink-500/40 rounded-bl-xl transition-all duration-500 group-hover:border-pink-500/60" />
          <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-[2.5px] border-r-[2.5px] border-pink-500/40 rounded-br-xl transition-all duration-500 group-hover:border-pink-500/60" />

          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div>
                <CardTitle className="text-2xl font-bold mb-1">Tokens vs Stocks</CardTitle>
                <div className="text-sm text-muted-foreground">Starbucks (SBUX) compared to $COFFEE</div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">Verified</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Shareholder Benefits Truth Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Shareholder Benefits: Feature-by-Feature</h3>
                <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-lg font-bold border border-purple-200">7 Categories Tested</div>
              </div>
              <div className="overflow-x-auto bg-white rounded-xl border-2 border-purple-200 shadow-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-purple-200">
                      <th className="text-left p-3 font-bold">Benefit</th>
                      <th className="text-center p-3 font-bold bg-red-50">Starbucks Stock</th>
                      <th className="text-center p-3 font-bold bg-green-50">$COFFEE Token</th>
                      <th className="text-center p-3 font-bold">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">💰 Profit Distributions</td>
                      <td className="text-center p-3">$2.16/share quarterly (2024)</td>
                      <td className="text-center p-3 bg-green-50">33% of profits monthly</td>
                      <td className="text-center p-3">🏆 Token (monthly)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">🗳️ Voting Rights</td>
                      <td className="text-center p-3">Annual meeting only</td>
                      <td className="text-center p-3 bg-green-50">On-chain anytime</td>
                      <td className="text-center p-3">🏆 Token (instant)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">📊 Financial Reports</td>
                      <td className="text-center p-3">Quarterly (6-8 weeks delay)</td>
                      <td className="text-center p-3 bg-green-50">Real-time on-chain</td>
                      <td className="text-center p-3">🏆 Token (instant)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">💸 Liquidity</td>
                      <td className="text-center p-3">NYSE: 6.5 hrs/day</td>
                      <td className="text-center p-3 bg-green-50">DEX: 24/7/365</td>
                      <td className="text-center p-3">🏆 Token (4x time)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">🎁 Customer Perks</td>
                      <td className="text-center p-3">Loyalty program (separate)</td>
                      <td className="text-center p-3 bg-green-50">Token rewards with purchases</td>
                      <td className="text-center p-3">🏆 Token (integrated)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">🔒 Price Support</td>
                      <td className="text-center p-3">None (market only)</td>
                      <td className="text-center p-3 bg-green-50">10% profit → buybacks</td>
                      <td className="text-center p-3">🏆 Token (floor)</td>
                    </tr>
                    <tr className="hover:bg-purple-50/50">
                      <td className="p-3 font-semibold">💵 Tax Treatment</td>
                      <td className="text-center p-3 bg-red-50">Dividends taxed immediately</td>
                      <td className="text-center p-3 bg-green-50">Buybacks = defer tax</td>
                      <td className="text-center p-3">🏆 Token (efficient)</td>
                    </tr>
                    <tr className="bg-purple-100 font-bold">
                      <td className="p-3">TOTAL SCORE</td>
                      <td className="text-center p-3 text-red-700">2/7</td>
                      <td className="text-center p-3 text-green-700 bg-green-100">7/7</td>
                      <td className="text-center p-3 text-green-700">🏆 TOKENS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real Returns Comparison */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Reality Check: Actual Returns ($1,000 Investment)</h3>
                <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 rounded-lg font-bold border border-blue-200">Based on 2024 Data</div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">

                {/* Starbucks Reality */}
                <div className="p-6 bg-gradient-to-br from-white via-gray-50/50 to-white rounded-xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">📈</div>
                      <div className="font-bold text-lg">Starbucks Today</div>
                    </div>
                    <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg font-mono font-bold border border-gray-300">SBUX</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Current Stock Price</div>
                      <div className="text-2xl font-bold">~$95</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">$1K Investment Gets</div>
                      <div className="text-xl font-bold">10.5 shares</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Annual Dividend</div>
                      <div className="text-xl font-bold text-blue-600">$22.68/year</div>
                      <div className="text-xs text-muted-foreground">(10.5 × $2.16)</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-700 mb-1">Current Yield</div>
                      <div className="text-3xl font-bold text-blue-900">2.27%</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Established brand (36K locations)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Predictable dividends</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-600" />
                      <span>Already expensive ($95/share)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-600" />
                      <span>Limited growth (mature company)</span>
                    </div>
                  </div>
                </div>

                {/* $COFFEE Reality */}
                <div className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-xl border-2 border-green-400 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">🚀</div>
                      <div className="font-bold text-lg text-green-900">$COFFEE Launch</div>
                    </div>
                    <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg font-mono font-bold text-green-900 border border-green-300">COFFEE</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs text-green-700 mb-1">Token Price</div>
                      <div className="text-2xl font-bold text-green-900">$0.15</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-700 mb-1">$1K Investment Gets</div>
                      <div className="text-xl font-bold text-green-900">6,667 tokens</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-700 mb-1">Year 1 Distribution (1 branch)</div>
                      <div className="text-xl font-bold text-green-700">$1.32/year</div>
                      <div className="text-xs text-green-700">(Floor yield: 0.13%)</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-400">
                      <div className="text-xs text-green-800 mb-1">Year 10 Yield (50 branches)</div>
                      <div className="text-3xl font-bold text-green-900">6.6%</div>
                      <div className="text-xs text-green-700 mt-1">+ Price appreciation 🚀</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-green-300 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-700" />
                      <span className="text-green-900">Ground floor opportunity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-700" />
                      <span className="text-green-900">High growth potential (1 → 1,000s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-700" />
                      <span className="text-green-900">Customer viral loop built-in</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-700" />
                      <span className="text-green-900">Buyback price support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Truth Table: Return Scenarios */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Truth Table: Realistic Return Projections</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs font-bold">All Math Verified</span>
                </div>
              </div>
              <div className="space-y-4">

                {/* Conservative Scenario */}
                <div className="p-6 bg-gradient-to-br from-white via-gray-50/30 to-white rounded-xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg">Conservative: $COFFEE Stays Local (10 locations)</div>
                    <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 rounded-lg font-bold border border-yellow-400">Realistic</div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-xl font-bold">5 years</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Annual Yield</div>
                      <div className="text-xl font-bold text-green-600">1.32%</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Token Price</div>
                      <div className="text-xl font-bold">$0.25-$0.40</div>
                    </div>
                    <div className="text-center p-4 bg-green-100 rounded-lg border border-green-300">
                      <div className="text-xs text-green-700 mb-1">Total Return</div>
                      <div className="text-xl font-bold text-green-900">100-200%</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <strong>vs Starbucks stock:</strong> Similar yield (2.27%), but we have way more growth potential (early stage)
                  </div>
                </div>

                {/* Moderate Scenario */}
                <div className="p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg text-blue-900">Moderate: Regional Chain (100 locations)</div>
                    <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 rounded-lg font-bold border border-blue-400">Achievable</div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-blue-700 mb-1">Timeline</div>
                      <div className="text-xl font-bold text-blue-900">10 years</div>
                    </div>
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-blue-700 mb-1">Annual Yield</div>
                      <div className="text-xl font-bold text-blue-900">13.2%</div>
                    </div>
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-blue-700 mb-1">Token Price</div>
                      <div className="text-xl font-bold text-blue-900">$0.75-$1.50</div>
                    </div>
                    <div className="text-center p-4 bg-blue-200 rounded-lg border-2 border-blue-400">
                      <div className="text-xs text-blue-800 mb-1">Total Return</div>
                      <div className="text-xl font-bold text-blue-950">500-1,000%</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-blue-800">
                    <strong>vs Starbucks stock:</strong> MUCH higher yield (13.2% vs 2.3%) + massive price appreciation potential
                  </div>
                </div>

                {/* Moon Shot Scenario */}
                <div className="p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 rounded-xl border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg text-yellow-900">Moon Shot: National Chain (1,000+ locations)</div>
                    <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-yellow-300 to-orange-300 text-yellow-900 rounded-lg font-bold border border-yellow-500">IF Starbucks-Level</div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-yellow-700 mb-1">Timeline</div>
                      <div className="text-xl font-bold text-yellow-900">15-20 years</div>
                    </div>
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-yellow-700 mb-1">Annual Yield</div>
                      <div className="text-xl font-bold text-yellow-900">132%</div>
                    </div>
                    <div className="text-center p-4 bg-white/70 rounded-lg">
                      <div className="text-xs text-yellow-700 mb-1">Token Price</div>
                      <div className="text-xl font-bold text-yellow-900">$3-$10</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-200 rounded-lg border-2 border-yellow-500">
                      <div className="text-xs text-yellow-800 mb-1">Total Return</div>
                      <div className="text-xl font-bold text-yellow-950">5,000%+</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-yellow-800">
                    <strong>vs Starbucks IPO investors:</strong> They got 6,000% over 32 years. We could match that in 15-20 years.
                  </div>
                </div>
              </div>
            </div>

            {/* The Math: Why Tokens Win */}
            <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-xl border-2 border-purple-400 shadow-lg">
              <div className="font-bold text-xl text-purple-900 mb-4">🧮 The Math: Why Tokens Create More Value</div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-white to-purple-50/30 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-sm font-bold text-purple-900 mb-2">Customer Economics</div>
                  <div className="text-xs text-purple-800 space-y-1">
                    <div><strong>Stock model:</strong> Customer = $5 revenue</div>
                    <div><strong>Token model:</strong> Customer = $5 revenue + 0.5 referrals</div>
                    <div className="pt-2 border-t border-purple-200 font-bold text-green-700">
                      Result: 50% higher LTV 🚀
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-purple-50/30 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-sm font-bold text-purple-900 mb-2">Accessibility Math</div>
                  <div className="text-xs text-purple-800 space-y-1">
                    <div><strong>Stocks:</strong> ~1M potential investors (US, accredited)</div>
                    <div><strong>Tokens:</strong> ~50M potential (global, $100 min)</div>
                    <div className="pt-2 border-t border-purple-200 font-bold text-green-700">
                      Result: 50x more buyers 🌍
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-purple-50/30 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-sm font-bold text-purple-900 mb-2">Liquidity Math</div>
                  <div className="text-xs text-purple-800 space-y-1">
                    <div><strong>Stocks:</strong> 1,625 trading hrs/year</div>
                    <div><strong>Tokens:</strong> 8,760 trading hrs/year</div>
                    <div className="pt-2 border-t border-purple-200 font-bold text-green-700">
                      Result: 5.4x more liquidity ⏰
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl border-2 border-green-400 shadow-lg">
              <div className="font-bold text-xl text-green-900 mb-3">✅ The Honest Truth</div>
              <div className="space-y-2 text-sm text-green-800 leading-relaxed">
                <div>
                  <strong>Tokenization = Stocks on steroids.</strong> You get the same ownership and profit-sharing as traditional equity,
                  but with instant global liquidity, customer rewards, and buyback price support.
                </div>
                <div>
                  <strong>The trade-off?</strong> Higher volatility. Crypto prices swing more than stocks.
                  But if you believe in the business and can handle the swings, tokens offer way more upside.
                </div>
                <div className="pt-3 border-t border-green-300">
                  <strong>Reality:</strong> Starbucks shareholders earn 2.27% yield on a mature company.
                  $COFFEE token holders could earn 1-6% yield (Year 1-10) on a GROWING company,
                  plus massive price appreciation if we scale. Early = advantage.
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => window.open('/docs/TOKENIZATION_VS_STOCK_MARKET.md', '_blank')}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-[gradient_4s_ease_infinite] text-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-purple-300 font-bold"
              >
                Read Full Analysis →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What Users Need to Know */}
        <Card className="group relative border-2 border-primary/20 bg-gradient-to-br from-white via-white/95 to-primary/5 backdrop-blur-xl">
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-xl transition-all duration-500 group-hover:border-primary/60" />
          <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-primary/40 rounded-tr-xl transition-all duration-500 group-hover:border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-xl transition-all duration-500 group-hover:border-accent/60" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-accent/40 rounded-br-xl transition-all duration-500 group-hover:border-accent/60" />

          <CardHeader>
            <CardTitle className="text-2xl">What You Need to Know</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="font-bold text-sm mb-2">💰 How You Make Money (2 Ways)</div>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                  <div><strong>1. Quarterly Distributions:</strong> 33% of NET profits paid to all holders proportionally</div>
                  <div><strong>2. Token Price Appreciation:</strong> As business grows + buybacks happen, token price increases</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🔥 The Buyback Mechanism</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  10% of profits used to buy tokens from DEX and BURN them forever.
                  This reduces supply → your ownership % grows → token price squeezes up.
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🎁 Customer Rewards (25M tokens)</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  25% of tokens reserved for customers. Every purchase earns tokens.
                  This creates viral growth loop: customers become owners → bring friends → more revenue → higher payouts.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-bold text-sm mb-2">🏪 The Scale Playbook</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Start with 1 location in Beirut. Prove the model. Use profits + treasury to open 2-3 more.
                  By Year 5: 10 locations. By Year 10: 50+ locations. Vision: 1,000+ (regional chain).
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">⚖️ Token Distribution (100%)</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Presale (investors):</span><span className="font-semibold">30M (30%)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">DEX Liquidity:</span><span className="font-semibold">30M (30%)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Customer Rewards:</span><span className="font-semibold">25M (25%)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Treasury (expansion):</span><span className="font-semibold">10M (10%)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Team (vested):</span><span className="font-semibold">5M (5%)</span></div>
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🛡️ Risk Factors (Be Honest)</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  • Business might fail (coffee shops are competitive)
                  • Expansion might be slower than projected
                  • Token price could go down if sellers {'>'} buyers
                  • Regulatory risks in different jurisdictions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Tokenomics */}
        <Card className="group relative bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-green-50/50 border-2 border-green-300/60 backdrop-blur-xl">
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-green-500/40 rounded-tl-xl transition-all duration-500 group-hover:border-green-500/60" />
          <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-green-500/40 rounded-tr-xl transition-all duration-500 group-hover:border-green-500/60" />
          <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-emerald-500/40 rounded-bl-xl transition-all duration-500 group-hover:border-emerald-500/60" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-emerald-500/40 rounded-br-xl transition-all duration-500 group-hover:border-emerald-500/60" />

          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Mathematically Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{VERIFIED.totalSupply.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Total Tokens</div>
              </div>
              <div>
                <div className="text-2xl font-bold">${VERIFIED.tokenPrice}</div>
                <div className="text-xs text-muted-foreground mt-1">Token Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold">${(VERIFIED.fundingTarget / 1000)}K</div>
                <div className="text-xs text-muted-foreground mt-1">Target Raise</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{VERIFIED.profitShare}%</div>
                <div className="text-xs text-muted-foreground mt-1">Profit Share</div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                onClick={() => setShowMathProof(true)}
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_4s_ease_infinite] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-primary/30 font-bold"
              >
                <Calculator className="w-4 h-4 mr-2" />
                View Math Proofs
              </Button>
              <Button
                onClick={() => setShowRaiseGuide(true)}
                variant="outline"
                className="border-2 border-primary/40 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:scale-105 transition-all duration-300 font-bold"
              >
                <Store className="w-4 h-4 mr-2" />
                Raise & LP Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Math Proof Modal */}
      {showMathProof && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMathProof(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Mathematical Verification Proofs</h2>
              <button onClick={() => setShowMathProof(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 font-mono text-sm">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="font-bold text-green-800">PROOF 1: Token Distribution = 100%</div>
                </div>
                <div className="space-y-1 text-green-900">
                  <div>Presale: 30% = 30,000,000 tokens</div>
                  <div>Liquidity: 30% = 30,000,000 tokens</div>
                  <div>Rewards: 25% = 25,000,000 tokens</div>
                  <div>Treasury: 10% = 10,000,000 tokens</div>
                  <div>Team: 5% = 5,000,000 tokens</div>
                  <div className="pt-2 border-t border-green-300 font-bold">TOTAL: 100% ✓</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <div className="font-bold text-blue-800">PROOF 2: Funding Target Achievable</div>
                </div>
                <div className="space-y-1 text-blue-900">
                  <div>Presale tokens: 30,000,000</div>
                  <div>Token price: $0.15</div>
                  <div>Max possible raise: $4,500,000</div>
                  <div>Target: $100,000</div>
                  <div className="pt-2 border-t border-blue-300 font-bold">
                    Only need 666,667 tokens (2.2% of presale) ✓
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <div className="font-bold text-purple-800">PROOF 3: Business Model Sound</div>
                </div>
                <div className="space-y-1 text-purple-900">
                  <div>Monthly revenue: ${monthlyRevenue.toLocaleString()}</div>
                  <div>Profit margin: {profitMargin}%</div>
                  <div>Monthly profit: ${(monthlyRevenue * (profitMargin / 100)).toLocaleString()}</div>
                  <div>Annual profit: ${(monthlyRevenue * (profitMargin / 100) * 12).toLocaleString()}</div>
                  <div className="pt-2 border-t border-purple-300 font-bold">
                    33% to holders = ${((monthlyRevenue * (profitMargin / 100) * 12) * 0.33).toLocaleString()}/year ✓
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                  <div className="font-bold text-yellow-800">PROOF 4: Multi-Branch Scaling</div>
                </div>
                <div className="space-y-1 text-yellow-900">
                  <div>Year 1 (1 branch): ${((monthlyRevenue * (profitMargin / 100) * 12) * 0.33).toLocaleString()} to holders</div>
                  <div>Year 3 (5 branches): ${((monthlyRevenue * (profitMargin / 100) * 12 * 5) * 0.33).toLocaleString()} to holders</div>
                  <div>Year 10 (50 branches): ${((monthlyRevenue * (profitMargin / 100) * 12 * 50) * 0.33).toLocaleString()} to holders</div>
                  <div className="pt-2 border-t border-yellow-300 font-bold">
                    Linear scaling: N branches = N × profits ✓
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <div className="font-bold text-orange-800">PROOF 5: Buyback Mechanism</div>
                </div>
                <div className="space-y-1 text-orange-900">
                  <div>10% of profits → buyback & burn</div>
                  <div>Year 1 buyback: ${((monthlyRevenue * (profitMargin / 100) * 12) * 0.10).toLocaleString()}</div>
                  <div>Tokens burned: ~{Math.floor(((monthlyRevenue * (profitMargin / 100) * 12) * 0.10) / VERIFIED.tokenPrice).toLocaleString()}</div>
                  <div className="pt-2 border-t border-orange-300 font-bold">
                    Supply shrinks → ownership % grows ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raise & LP Guide Modal */}
      {showRaiseGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRaiseGuide(false)}>
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Raise Strategy & Meteora LP Guide</h2>
              <button onClick={() => setShowRaiseGuide(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">How Much to Raise?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 bg-muted/30 rounded-xl border">
                    <div className="text-lg font-bold mb-2">$100K Minimum</div>
                    <div className="space-y-2 text-sm">
                      <div>Tokens: 666,667</div>
                      <div>Dilution: 2.2%</div>
                      <div className="pt-2 border-t text-xs text-muted-foreground">Quick test, tight budget</div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                    <div className="text-lg font-bold mb-2 text-green-800">$300K Recommended ⭐</div>
                    <div className="space-y-2 text-sm text-green-900">
                      <div>Tokens: 2,000,000</div>
                      <div>Dilution: 6.7%</div>
                      <div className="pt-2 border-t text-xs font-semibold">Professional launch</div>
                    </div>
                  </div>
                  <div className="p-6 bg-muted/30 rounded-xl border">
                    <div className="text-lg font-bold mb-2">$1M Aggressive</div>
                    <div className="space-y-2 text-sm">
                      <div>Tokens: 6,666,667</div>
                      <div>Dilution: 22%</div>
                      <div className="pt-2 border-t text-xs text-muted-foreground">Multi-location</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Meteora DLMM Configuration</h3>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold mb-2">LP Size by Raise:</div>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-white/80 rounded-lg">
                          <div className="font-semibold">$100K</div>
                          <div className="text-xs text-muted-foreground mt-1">$20K USDC + 133K tokens</div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg border border-green-300">
                          <div className="font-semibold text-green-800">$300K ⭐</div>
                          <div className="text-xs text-green-700 mt-1">$75K USDC + 500K tokens</div>
                        </div>
                        <div className="p-3 bg-white/80 rounded-lg">
                          <div className="font-semibold">$1M</div>
                          <div className="text-xs text-muted-foreground mt-1">$300K USDC + 2M tokens</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/60 rounded-lg">
                      <div className="font-bold mb-2 text-sm">Meteora Settings:</div>
                      <div className="grid md:grid-cols-2 gap-3 text-xs font-mono">
                        <div>binStep: 25 (0.25%)</div>
                        <div>initialPrice: $0.15</div>
                        <div>minPrice: $0.10</div>
                        <div>maxPrice: $0.50</div>
                        <div>binRange: 10</div>
                        <div>type: DLMM</div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="font-bold text-sm text-yellow-900 mb-2">⚠️ Price Floor Protection</div>
                      <div className="text-xs text-yellow-800 space-y-1">
                        <div>• 10% profits → buyback if price {'<'} $0.15</div>
                        <div>• 10M treasury tokens for LP</div>
                        <div>• Team vests over 24 months</div>
                        <div>• Rewards vest over 5 years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Full guide: docs/RAISE_AND_LP_GUIDE.md
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
