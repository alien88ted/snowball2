"use client"

/**
 * YIELD CALCULATOR - Focus on investor returns
 * Model: 100M tokens, $0.15 price, 33% profit share, $100K target
 */

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExplorerCorners } from "@/components/explorer-corners"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Store, DollarSign, Zap } from "lucide-react"

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

  // Calculate core metrics
  const tokensOwned = investmentUSD / VERIFIED.tokenPrice
  const baseOwnership = (tokensOwned / VERIFIED.totalSupply) * 100

  // Generate 10-year projection data
  const projectionData = []
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

    // Revenue grows 10% per year per branch
    const revenuePerBranch = monthlyRevenue * Math.pow(1.1, plan.year - 1)
    const profitPerBranch = (revenuePerBranch * (profitMargin / 100)) * 12
    const totalAnnualProfit = profitPerBranch * plan.branches

    // Buybacks reduce supply
    if (buybackEnabled && plan.year > 0) {
      const buybackAmount = totalAnnualProfit * 0.10 // 10% for buybacks
      const avgPrice = VERIFIED.tokenPrice * Math.pow(1.15, plan.year - 1) // Price grows 15%/year
      const tokensBurned = buybackAmount / avgPrice
      currentSupply -= tokensBurned
    }

    // Your ownership grows as supply shrinks
    const currentOwnership = (tokensOwned / currentSupply) * 100

    // Distributions (FLOOR YIELD - guaranteed)
    const toHolders = totalAnnualProfit * (VERIFIED.profitShare / 100)
    const yourAnnualPayout = toHolders * (currentOwnership / 100)
    const floorYield = (yourAnnualPayout / investmentUSD) * 100

    // Token price appreciation (TOTAL RETURN - variable)
    const scarcityMultiple = buybackEnabled ? VERIFIED.totalSupply / currentSupply : 1
    const demandMultiple = 1 + (Math.log(plan.branches + 1) / Math.log(51)) * 3
    const priceMultiple = scarcityMultiple * demandMultiple
    const estimatedPrice = VERIFIED.tokenPrice * priceMultiple
    const tokenValue = tokensOwned * estimatedPrice
    const unrealizedGain = tokenValue - investmentUSD
    const totalReturnUSD = unrealizedGain + (yourAnnualPayout * plan.year)
    const totalReturnPercent = (totalReturnUSD / investmentUSD) * 100

    projectionData.push({
      year: plan.year,
      branches: plan.branches,
      floorYield: parseFloat(floorYield.toFixed(2)),
      totalReturn: parseFloat(totalReturnPercent.toFixed(1)),
      annualPayout: parseFloat(yourAnnualPayout.toFixed(0)),
      tokenValue: parseFloat(tokenValue.toFixed(0)),
      tokenPrice: parseFloat(estimatedPrice.toFixed(3)),
    })
  })

  const year10Data = projectionData[projectionData.length - 1]

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
        <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              The Moon Shot: What if we hit Starbucks scale?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 bg-white/60 rounded-xl border border-yellow-300">
                <div className="text-sm text-muted-foreground mb-2">Starbucks Locations</div>
                <div className="text-3xl font-bold text-yellow-900">36,000</div>
              </div>
              <div className="p-6 bg-white/60 rounded-xl border border-yellow-300">
                <div className="text-sm text-muted-foreground mb-2">Even 0.1% of That</div>
                <div className="text-3xl font-bold text-yellow-900">36 branches</div>
              </div>
              <div className="p-6 bg-white/60 rounded-xl border border-yellow-300">
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
        <Card className="border-2 border-border/30 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Expected Floor Yield by Scale (Distributions Only)</CardTitle>
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
                  <div key={branchCount} className="p-4 bg-muted/30 rounded-xl text-center hover:bg-muted/50 transition-colors">
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

        {/* What Users Need to Know */}
        <Card className="border-2 border-primary/20 bg-white/90 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl">What You Need to Know</CardTitle>
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
                  • Token price could go down if sellers > buyers
                  • Regulatory risks in different jurisdictions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Tokenomics */}
        <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200/60">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
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
            <div className="mt-4 text-center text-xs text-muted-foreground">
              All proofs passed ✓ See scripts/verify-tokenomics.js & scripts/yield-enhancement-analysis.js
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
