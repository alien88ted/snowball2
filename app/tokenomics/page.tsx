"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, TrendingUp, Minus, Plus, Info } from "lucide-react"
import { FooterSection } from "@/components/footer-section"

export default function TokenomicsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')
  const [investmentAmount, setInvestmentAmount] = useState(1000)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Core data
  const tokenData = {
    totalSupply: 100_000_000,
    price: 0.15,
    segments: [
      { label: "Presale", value: 30_000_000, percentage: 30, color: "#111827", description: "Initial capital raise" },
      { label: "Liquidity", value: 30_000_000, percentage: 30, color: "#374151", description: "DEX liquidity (added gradually)" },
      { label: "Rewards", value: 25_000_000, percentage: 25, color: "#6B7280", description: "Customer earning program" },
      { label: "Treasury", value: 10_000_000, percentage: 10, color: "#9CA3AF", description: "Expansion & operations" },
      { label: "Team", value: 5_000_000, percentage: 5, color: "#D1D5DB", description: "24-month vesting" }
    ]
  }

  const profitAllocation = [
    { label: "Token Holders", percentage: 33, description: "Monthly distributions" },
    { label: "Buyback", percentage: 10, description: "Supply reduction" },
    { label: "Reinvestment", percentage: 57, description: "Growth & expansion" }
  ]

  const scenarios = {
    conservative: {
      year1: { stores: 1, profit: 60_000, tokenPrice: 0.20 },
      year3: { stores: 3, profit: 180_000, tokenPrice: 0.35 },
      year5: { stores: 5, profit: 300_000, tokenPrice: 0.50 }
    },
    moderate: {
      year1: { stores: 1, profit: 60_000, tokenPrice: 0.25 },
      year3: { stores: 5, profit: 300_000, tokenPrice: 0.60 },
      year5: { stores: 10, profit: 600_000, tokenPrice: 1.00 }
    },
    aggressive: {
      year1: { stores: 2, profit: 120_000, tokenPrice: 0.35 },
      year3: { stores: 10, profit: 600_000, tokenPrice: 1.50 },
      year5: { stores: 25, profit: 1_500_000, tokenPrice: 3.00 }
    }
  }

  const scenario = scenarios[selectedScenario]
  const tokensOwned = investmentAmount / tokenData.price
  const ownershipPercentage = (tokensOwned / tokenData.totalSupply) * 100

  const raiseTargets = [
    { amount: 100_000, liquidity: 20, operations: 80 },
    { amount: 300_000, liquidity: 25, operations: 75 },
    { amount: 500_000, liquidity: 30, operations: 70 },
    { amount: 1_000_000, liquidity: 35, operations: 65 }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-light text-gray-900 mb-4">
              Tokenomics
            </h1>
            <p className="text-xl text-gray-600">
              100 million tokens. Fixed supply. Real revenue sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="py-6 px-4">
              <div className="text-sm text-gray-500 mb-1">Total Supply</div>
              <div className="text-2xl font-mono">100,000,000</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-gray-500 mb-1">Initial Price</div>
              <div className="text-2xl font-mono">$0.15</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-gray-500 mb-1">Profit Share</div>
              <div className="text-2xl font-mono">33%</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-gray-500 mb-1">Customer Rewards</div>
              <div className="text-2xl font-mono">25M tokens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Distribution - Minimalist */}
      <section className="py-16 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Data Table */}
            <div className="lg:col-span-2">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                Token Distribution
              </h2>
              
              <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                {tokenData.segments.map((segment, index) => (
                  <div 
                    key={index}
                    className="group hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredMetric(segment.label)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <div className="p-4 flex items-center justify-between border-b border-gray-200 last:border-0">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{segment.label}</div>
                          <div className="text-sm text-gray-500">{segment.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-gray-900">
                          {(segment.value / 1_000_000).toFixed(0)}M
                        </div>
                        <div className="text-sm font-mono text-gray-500">
                          {segment.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                Allocation Visual
              </h2>
              
              <div className="space-y-3">
                {tokenData.segments.map((segment, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{segment.label}</span>
                      <span className="font-mono text-gray-900">{segment.percentage}%</span>
                    </div>
                    <div className="h-8 bg-gray-100 rounded">
                      <div 
                        className="h-full rounded transition-all duration-500 ease-out"
                        style={{ 
                          width: mounted ? `${segment.percentage}%` : '0%',
                          backgroundColor: segment.color,
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Insight</div>
                <p className="text-sm text-gray-700">
                  55% allocated to liquidity and customers creates a sustainable viral growth loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Distribution */}
      <section className="py-16 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Profit Distribution Model
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {profitAllocation.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="text-3xl font-mono text-gray-900 mb-2">
                  {item.percentage}%
                </div>
                <div className="font-medium text-gray-900 mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-gray-500">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Distribution Schedule</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-mono">Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-mono">On-chain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum</span>
                  <span className="font-mono">None</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Buyback Mechanism</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-mono">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-mono">DEX buyback</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Result</span>
                  <span className="font-mono">Burn tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-16 px-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Investment Calculator
          </h2>

          {/* Investment Input */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm text-gray-600">Investment Amount</label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setInvestmentAmount(Math.max(100, investmentAmount - 100))}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Math.max(100, parseInt(e.target.value) || 100))}
                  className="w-32 px-3 py-1 text-center font-mono border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                />
                <button 
                  onClick={() => setInvestmentAmount(investmentAmount + 100)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setInvestmentAmount(100)}
                className="py-2 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                $100
              </button>
              <button 
                onClick={() => setInvestmentAmount(1000)}
                className="py-2 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                $1,000
              </button>
              <button 
                onClick={() => setInvestmentAmount(10000)}
                className="py-2 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                $10,000
              </button>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="mb-8">
            <label className="text-sm text-gray-600 block mb-3">Growth Scenario</label>
            <div className="grid grid-cols-3 gap-3">
              {(['conservative', 'moderate', 'aggressive'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedScenario(type)}
                  className={`py-3 px-4 rounded-lg border transition-all ${
                    selectedScenario === type
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium capitalize">{type}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {type === 'conservative' && '5 stores by Y5'}
                    {type === 'moderate' && '10 stores by Y5'}
                    {type === 'aggressive' && '25 stores by Y5'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Metric</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Year 1</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Year 3</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Year 5</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Stores Operating</td>
                  <td className="py-3 px-4 text-right font-mono">{scenario.year1.stores}</td>
                  <td className="py-3 px-4 text-right font-mono">{scenario.year3.stores}</td>
                  <td className="py-3 px-4 text-right font-mono">{scenario.year5.stores}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Total Profit</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year1.profit / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year3.profit / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year5.profit / 1000).toFixed(0)}K</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">To Holders (33%)</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year1.profit * 0.33 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year3.profit * 0.33 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-mono">${(scenario.year5.profit * 0.33 / 1000).toFixed(0)}K</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">Your Annual Income</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-900">
                    ${(scenario.year1.profit * 0.33 * ownershipPercentage / 100).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-900">
                    ${(scenario.year3.profit * 0.33 * ownershipPercentage / 100).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-600 font-medium">
                    ${(scenario.year5.profit * 0.33 * ownershipPercentage / 100).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Projected Token Price</td>
                  <td className="py-3 px-4 text-right font-mono">${scenario.year1.tokenPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-mono">${scenario.year3.tokenPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-mono">${scenario.year5.tokenPrice.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">Portfolio Value</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-900">
                    ${(tokensOwned * scenario.year1.tokenPrice).toFixed(0)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-900">
                    ${(tokensOwned * scenario.year3.tokenPrice).toFixed(0)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-600 font-medium">
                    ${(tokensOwned * scenario.year5.tokenPrice).toFixed(0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-500">
              You would own {tokensOwned.toLocaleString()} tokens ({ownershipPercentage.toFixed(4)}% of total supply)
            </p>
          </div>
        </div>
      </section>

      {/* Liquidity Strategy */}
      <section className="py-16 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Liquidity Management
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Raise Allocation Table */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Raised Capital Allocation</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Raise</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">To LP</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Operations</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">LP Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raiseTargets.map((target, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4 font-mono text-sm">${(target.amount / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-600">{target.liquidity}%</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-600">{target.operations}%</td>
                        <td className="py-3 px-4 text-right font-mono text-sm">
                          ${(target.amount * target.liquidity / 100 * 2 / 1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Operations Breakdown */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Operations Budget (75% at $300K)</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Store Buildout</span>
                  <span className="font-mono text-sm">$100,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Equipment & Furniture</span>
                  <span className="font-mono text-sm">$50,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Initial Inventory</span>
                  <span className="font-mono text-sm">$25,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Marketing & Launch</span>
                  <span className="font-mono text-sm">$25,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Operating Buffer</span>
                  <span className="font-mono text-sm">$25,000</span>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span className="text-sm text-gray-900">Total Operations</span>
                  <span className="font-mono text-sm">$225,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-16 px-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Model Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Feature</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Traditional IPO</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Franchise</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 bg-gray-900 text-white">$COFFEE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Minimum Investment</td>
                  <td className="py-3 px-4 text-center font-mono text-sm">$10,000+</td>
                  <td className="py-3 px-4 text-center font-mono text-sm">$500,000+</td>
                  <td className="py-3 px-4 text-center font-mono text-sm bg-gray-50">$100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Time to Liquidity</td>
                  <td className="py-3 px-4 text-center text-sm">10-20 years</td>
                  <td className="py-3 px-4 text-center text-sm">Never</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">Day 1</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Customer Rewards</td>
                  <td className="py-3 px-4 text-center text-sm">None</td>
                  <td className="py-3 px-4 text-center text-sm">Points</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">25% ownership</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Profit Distribution</td>
                  <td className="py-3 px-4 text-center text-sm">Quarterly</td>
                  <td className="py-3 px-4 text-center text-sm">Monthly</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">Monthly on-chain</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Trading Hours</td>
                  <td className="py-3 px-4 text-center text-sm">Weekdays 9-4</td>
                  <td className="py-3 px-4 text-center text-sm">N/A</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">24/7/365</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">Global Access</td>
                  <td className="py-3 px-4 text-center text-sm">Limited</td>
                  <td className="py-3 px-4 text-center text-sm">Regional</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">195 countries</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">Transparency</td>
                  <td className="py-3 px-4 text-center text-sm">Quarterly</td>
                  <td className="py-3 px-4 text-center text-sm">Annual</td>
                  <td className="py-3 px-4 text-center text-sm bg-gray-50 font-medium">Real-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Facts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Key Facts
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-mono text-gray-900 mb-1">0.67%</div>
              <div className="text-sm text-gray-600">Circulating at $100K</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-mono text-gray-900 mb-1">$4.5M</div>
              <div className="text-sm text-gray-600">Max presale raise</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-mono text-gray-900 mb-1">24mo</div>
              <div className="text-sm text-gray-600">Team vesting period</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-mono text-gray-900 mb-1">$0.01</div>
              <div className="text-sm text-gray-600">Trading fee (Solana)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="border-t border-gray-200 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-white mb-4">
              Start with $100. Own a piece of every store.
            </h2>
            <p className="text-gray-400 mb-8">
              Real stores. Real revenue. Real ownership. Join the future of retail.
            </p>
            <div className="flex gap-4">
              <Link href="/explorer">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                  View Opportunities
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-6 py-3 text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                  Documentation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}