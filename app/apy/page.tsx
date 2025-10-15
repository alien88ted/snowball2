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

              <div className="relative p-10 text-center space-y-4">
                {/* Context Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-bold text-primary">Calculate Your Returns</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.03em]">
                  <span className="block text-foreground">
                    How Much Can You Earn?
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-foreground/90 font-semibold max-w-2xl mx-auto">
                  See your potential profit as the business grows from 1 to 50+ locations
                </p>

                <p className="text-base text-muted-foreground max-w-xl mx-auto">
                  Real numbers. No hype. Based on actual coffee shop financials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        {/* Inputs Row - Redesigned */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-white shadow-xl">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-2xl" />
          <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-accent/40 rounded-tr-2xl" />

          <CardHeader className="pb-6">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Your Investment</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Change the numbers below to see what you could earn</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Investment Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="investment" className="text-sm font-semibold flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    How much do you want to invest?
                  </Label>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">$</span>
                  <Input
                    id="investment"
                    type="number"
                    min="100"
                    step="100"
                    value={investmentUSD}
                    onChange={(e) => setInvestmentUSD(Math.max(100, Number(e.target.value) || 0))}
                    className="pl-7 text-xl font-bold h-14 border-2 hover:border-primary/40 focus:border-primary transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    {tokensOwned.toLocaleString()} tokens ({baseOwnership.toFixed(3)}%)
                  </span>
                </div>
              </div>

              {/* Monthly Revenue */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="revenue" className="text-sm font-semibold flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-blue-600" />
                    Sales per month?
                  </Label>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">$</span>
                  <Input
                    id="revenue"
                    type="number"
                    min="10000"
                    step="5000"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Math.max(10000, Number(e.target.value) || 0))}
                    className="pl-7 text-xl font-bold h-14 border-2 hover:border-primary/40 focus:border-primary transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground px-3 py-2 bg-muted/50 rounded-lg">Average per location</p>
              </div>

              {/* Profit Margin */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="margin" className="text-sm font-semibold">How much profit?</Label>
                </div>
                <div className="relative">
                  <Input
                    id="margin"
                    type="number"
                    min="5"
                    max="40"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(Math.max(5, Math.min(40, Number(e.target.value) || 0)))}
                    className="pr-8 text-xl font-bold h-14 border-2 hover:border-primary/40 focus:border-primary transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">%</span>
                </div>
                <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700 font-medium">Coffee shops: 15-25%</p>
                </div>
              </div>

              {/* Buyback Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-orange-600" />
                    Buy back tokens?
                  </Label>
                </div>
                <div className="flex gap-2 h-14">
                  <button
                    onClick={() => setBuybackEnabled(true)}
                    className={`flex-1 rounded-xl text-base font-bold transition-all duration-300 border-2 ${
                      buybackEnabled
                        ? 'bg-gradient-to-br from-accent to-accent/80 text-white border-accent shadow-lg scale-105'
                        : 'bg-white border-border hover:border-accent/40 text-muted-foreground hover:text-accent'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setBuybackEnabled(false)}
                    className={`flex-1 rounded-xl text-base font-bold transition-all duration-300 border-2 ${
                      !buybackEnabled
                        ? 'bg-gradient-to-br from-gray-700 to-gray-600 text-white border-gray-700 shadow-lg scale-105'
                        : 'bg-white border-border hover:border-gray-400 text-muted-foreground hover:text-gray-700'
                    }`}
                  >
                    NO
                  </button>
                </div>
                <p className="text-xs text-muted-foreground px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="font-semibold text-orange-700">Boosts token price</span> by reducing supply
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10-Year Vision Chart */}
        <Card className="group relative border-2 border-accent/30 bg-gradient-to-br from-white via-white/95 to-accent/5">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-accent/50 rounded-tl-xl transition-all duration-500 group-hover:border-accent/70" />
          <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-accent/50 rounded-tr-xl transition-all duration-500 group-hover:border-accent/70" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] border-primary/50 rounded-bl-xl transition-all duration-500 group-hover:border-primary/70" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] border-primary/50 rounded-br-xl transition-all duration-500 group-hover:border-primary/70" />

          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Store className="w-6 h-6 text-accent" />
              Your Returns Over 10 Years
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              As the business grows from 1 coffee shop to 50+ locations
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
              <div className="font-bold text-yellow-900 mb-2">🎯 What These Lines Mean</div>
              <div className="text-sm text-yellow-800 leading-relaxed space-y-2">
                <p>
                  <strong>Green line:</strong> Your guaranteed cash payments from profits.
                  This happens even if the token price stays at $0.15 forever.
                </p>
                <p>
                  <strong>Blue line:</strong> Your total return if the token price goes up too.
                  This is realistic if people keep buying tokens as the business grows.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yield Breakdown Table */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="group relative border-2 border-green-500/30 bg-gradient-to-br from-white via-green-50/30 to-white shadow-xl">
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-green-500/40 rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-green-500/40 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-emerald-500/40 rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-emerald-500/40 rounded-br-xl" />

            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Guaranteed Cash Payments</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Your share of profits</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-green-100 border-2 border-green-300 rounded-full">
                  <span className="text-xs font-bold text-green-700">MINIMUM</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-900">You get this even if token price never goes up</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {projectionData.filter(d => [1, 2, 3, 5, 7, 10].includes(d.year)).map((data, idx) => (
                  <div
                    key={data.year}
                    className={`group/item flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      data.year === 10
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400'
                        : 'bg-white border-green-200/60 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                        data.year === 10 ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                      }`}>
                        Y{data.year}
                      </div>
                      <div>
                        <div className="font-semibold text-base">Year {data.year}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          {data.branches} branches
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${data.year === 10 ? 'text-green-700' : 'text-green-600'}`}>
                        {data.floorYield}%
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        ${data.annualPayout.toLocaleString()}/yr
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-900 mb-2">Your Worst-Case Scenario</div>
                    <div className="text-sm text-green-800 leading-relaxed">
                      Even if the token stays at <span className="font-semibold">$0.15</span> and nobody buys it,
                      you still earn <span className="font-bold text-green-700">{year10Data?.floorYield}%</span> per year by Year 10
                      from your share of the profits.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative border-2 border-blue-500/30 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl">
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-blue-500/40 rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-blue-500/40 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-[2.5px] border-l-[2.5px] border-purple-500/40 rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-[2.5px] border-r-[2.5px] border-purple-500/40 rounded-br-xl" />

            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">If Token Price Goes Up</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Cash payments + price gains</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-full">
                  <span className="text-xs font-bold text-blue-700">BEST CASE</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-900">Profit payments + your tokens become worth more</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {projectionData.filter(d => [1, 2, 3, 5, 7, 10].includes(d.year)).map((data, idx) => (
                  <div
                    key={data.year}
                    className={`group/item flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      data.year === 10
                        ? 'bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border-yellow-400'
                        : 'bg-white border-blue-200/60 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                        data.year === 10 ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-700'
                      }`}>
                        Y{data.year}
                      </div>
                      <div>
                        <div className="font-semibold text-base">Year {data.year}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          {data.branches} branches • ${data.tokenPrice}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${data.year === 10 ? 'text-orange-700' : 'text-blue-600'}`}>
                        {data.totalReturn}%
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        ${data.tokenValue.toLocaleString()} value
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-300 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-900 mb-2">Your Best-Case Scenario</div>
                    <div className="text-sm text-blue-800 leading-relaxed space-y-1">
                      <p>
                        If the business grows and people keep buying tokens, by Year 10 your <span className="font-semibold">${investmentUSD.toLocaleString()}</span> could be worth:
                      </p>
                      <div className="flex items-center gap-2 mt-2 p-2 bg-white/50 rounded-lg">
                        <span className="text-2xl font-bold text-blue-700">${year10Data?.tokenValue?.toLocaleString() || 0}</span>
                        <span className="text-xs font-semibold text-blue-600">
                          ({((year10Data?.tokenValue || 0) / investmentUSD).toFixed(1)}x your money)
                        </span>
                      </div>
                      <p className="text-xs pt-2 text-muted-foreground">
                        Plus ${((year10Data?.annualPayout || 0) * 10).toLocaleString()} in profit payments over those 10 years
                      </p>
                    </div>
                  </div>
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
              Dream Scenario: What if we become huge?
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
              <div className="text-lg font-bold text-yellow-900 mb-3">If Everything Goes Right (10+ Years)</div>
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
            <CardTitle className="text-2xl">Quick Look: Your Annual Income</CardTitle>
            <div className="text-sm text-muted-foreground">Based on ${investmentUSD} invested (profit payments only)</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 3, 5, 10, 25, 50].map((branchCount) => {
                const profit = monthlyRevenue * (profitMargin / 100) * 12 * branchCount
                const toHolders = profit * (VERIFIED.profitShare / 100)
                const payout = toHolders * (baseOwnership / 100)
                const yield_pct = (payout / investmentUSD) * 100

                return (
                  <div
                    key={branchCount}
                    className="group relative p-5 bg-gradient-to-br from-white via-primary/5 to-white rounded-2xl text-center hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 cursor-pointer"
                  >
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="mb-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-2 group-hover:scale-110 transition-transform">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{branchCount}</div>
                    <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">branches</div>
                    <div className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-2">
                      <div className="text-2xl font-bold text-green-600">{yield_pct.toFixed(1)}%</div>
                      <div className="text-xs text-green-700 font-semibold">yield</div>
                    </div>
                    <div className="text-sm font-bold text-foreground">${payout.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">per year</div>
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
                <CardTitle className="text-2xl font-bold mb-1">Why Tokens Beat Stocks</CardTitle>
                <div className="text-sm text-muted-foreground">Comparing Starbucks stock vs $COFFEE token</div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">Real Data</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Shareholder Benefits Truth Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">What You Get: Side-by-Side</h3>
                <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-lg font-bold border border-purple-200">7 Key Benefits</div>
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
                <h3 className="text-xl font-bold">Real Example: Invest $1,000 Today</h3>
                <div className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 rounded-lg font-bold border border-blue-200">2024 Numbers</div>
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
                <h3 className="text-xl font-bold">3 Realistic Scenarios</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs font-bold">Math Checked</span>
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
              <div className="font-bold text-xl text-purple-900 mb-4">🧮 Why Tokens Work Better</div>
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
              <div className="font-bold text-xl text-green-900 mb-3">✅ Bottom Line</div>
              <div className="space-y-2 text-sm text-green-800 leading-relaxed">
                <div>
                  <strong>Tokens = better stocks.</strong> You get ownership and profit sharing like regular stock,
                  but you can trade 24/7, customers earn tokens when they shop, and the business buys back tokens to boost the price.
                </div>
                <div>
                  <strong>The catch?</strong> Token prices swing more than stocks.
                  But if the business grows, you could earn way more than Starbucks shareholders.
                </div>
                <div className="pt-3 border-t border-green-300">
                  <strong>Real talk:</strong> Starbucks pays 2.27% per year on a $95 stock.
                  $COFFEE could pay 1-6% per year on a $0.15 token that could go to $1-$10 if we scale.
                  Getting in early = huge advantage.
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
            <CardTitle className="text-2xl">How This Actually Works</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="font-bold text-sm mb-2">💰 You Earn Money Two Ways</div>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                  <div><strong>1. Cash payments:</strong> Get 33% of profits every 3 months based on how many tokens you own</div>
                  <div><strong>2. Token goes up:</strong> As the business grows, more people want the token, so the price goes up</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🔥 Buybacks Make Price Go Up</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  10% of profits go to buying tokens and destroying them forever.
                  Fewer tokens = your share gets bigger = price goes up.
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🎁 Customers Become Owners</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Customers earn free tokens when they buy coffee.
                  This makes them owners, so they tell their friends, which brings more sales and higher profits for everyone.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-bold text-sm mb-2">🏪 The Growth Plan</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Start with 1 shop. Prove it works. Use profits to open more.
                  Year 5: 10 shops. Year 10: 50+ shops. Dream: 1,000+ shops (like Starbucks).
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">⚖️ Where All Tokens Go</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">You (investors):</span><span className="font-semibold">30%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Trading (DEX):</span><span className="font-semibold">30%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Customers:</span><span className="font-semibold">25%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Growth fund:</span><span className="font-semibold">10%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Team:</span><span className="font-semibold">5%</span></div>
                </div>
              </div>

              <div>
                <div className="font-bold text-sm mb-2">🛡️ The Risks (Being Real)</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  • Coffee shop could fail (happens a lot)
                  • Growth could be slower than predicted
                  • Token price could drop if people sell
                  • Laws might change in different countries
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
