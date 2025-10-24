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
    <main className="min-h-screen bg-[#FAF8F5] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92 pointer-events-none" />
      {/* Subtle noise overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="relative z-10">
      {/* Brutalist Header */}
      <section className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-[#DC143C] tracking-[0.3em] mb-4 uppercase">REBIRTH ECONOMICS</p>
            <h1 className="text-6xl md:text-7xl font-black font-serif text-black mb-6 uppercase tracking-tight">
              TOKENOMICS
            </h1>
            <p className="text-xl text-black font-bold uppercase tracking-wider">
              100M TOKENS · FIXED SUPPLY · REAL REVENUE
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar - Brutalist */}
      <section className="border-b-4 border-black bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-[#DC143C]">
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Total Supply</div>
              <div className="text-2xl font-black text-white uppercase">100,000,000</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Initial Price</div>
              <div className="text-2xl font-black text-white uppercase">$0.15</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Profit Share</div>
              <div className="text-2xl font-black text-white uppercase">33%</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Rewards</div>
              <div className="text-2xl font-black text-white uppercase">25M TOKENS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Distribution - Brutalist */}
      <section className="py-16 px-6 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Data Table */}
            <div className="lg:col-span-2">
              <h2 className="text-sm font-black text-[#DC143C] uppercase tracking-[0.3em] mb-6">
                TOKEN DISTRIBUTION
              </h2>
              
              <div className="space-y-0 border-4 border-black overflow-hidden">
                {tokenData.segments.map((segment, index) => (
                  <div 
                    key={index}
                    className="group hover:bg-[#DC143C] hover:text-white transition-all"
                    onMouseEnter={() => setHoveredMetric(segment.label)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <div className="p-4 flex items-center justify-between border-b-2 border-black last:border-0">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-4 h-4 border-2 border-black group-hover:border-white bg-[#DC143C] group-hover:bg-white"
                        />
                        <div>
                          <div className="font-black text-black group-hover:text-white uppercase">{segment.label}</div>
                          <div className="text-sm text-gray-600 group-hover:text-white/80 uppercase">{segment.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-black group-hover:text-white">
                          {(segment.value / 1_000_000).toFixed(0)}M
                        </div>
                        <div className="text-sm font-black text-[#DC143C] group-hover:text-white">
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
              <h2 className="text-sm font-black text-[#DC143C] uppercase tracking-[0.3em] mb-6">
                ALLOCATION VISUAL
              </h2>
              
              <div className="space-y-3">
                {tokenData.segments.map((segment, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-black font-bold uppercase">{segment.label}</span>
                      <span className="font-black text-black">{segment.percentage}%</span>
                    </div>
                    <div className="h-8 border-2 border-black bg-white">
                      <div 
                        className="h-full bg-[#DC143C] transition-all duration-500 ease-out"
                        style={{ 
                          width: mounted ? `${segment.percentage}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 border-4 border-black bg-[#DC143C]">
                <div className="text-xs text-white font-black uppercase tracking-[0.3em] mb-2">KEY INSIGHT</div>
                <p className="text-sm text-white font-bold uppercase">
                  55% allocated to liquidity and customers creates viral growth.
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
                className="py-2 px-4 text-sm font-black border-4 border-white bg-white text-black hover:bg-[#DC143C] hover:text-white transition-all uppercase"
              >
                $100
              </button>
              <button 
                onClick={() => setInvestmentAmount(1000)}
                className="py-2 px-4 text-sm font-black border-4 border-white bg-white text-black hover:bg-[#DC143C] hover:text-white transition-all uppercase"
              >
                $1,000
              </button>
              <button 
                onClick={() => setInvestmentAmount(10000)}
                className="py-2 px-4 text-sm font-black border-4 border-white bg-white text-black hover:bg-[#DC143C] hover:text-white transition-all uppercase"
              >
                $10,000
              </button>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="mb-8">
            <label className="text-sm text-white font-black block mb-3 uppercase tracking-wider">Growth Scenario</label>
            <div className="grid grid-cols-3 gap-3">
              {(['conservative', 'moderate', 'aggressive'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedScenario(type)}
                  className={`py-3 px-4 border-4 transition-all ${
                    selectedScenario === type
                      ? 'border-[#DC143C] bg-[#DC143C] text-white'
                      : 'border-white bg-white text-black hover:bg-[#DC143C] hover:text-white'
                  }`}
                >
                  <div className="font-black uppercase">{type}</div>
                  <div className="text-xs mt-1 font-bold uppercase">
                    {type === 'conservative' && '5 stores by Y5'}
                    {type === 'moderate' && '10 stores by Y5'}
                    {type === 'aggressive' && '25 stores by Y5'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white border-4 border-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black bg-[#DC143C]">
                  <th className="text-left py-3 px-4 text-sm font-black text-white uppercase tracking-wider">Metric</th>
                  <th className="text-right py-3 px-4 text-sm font-black text-white uppercase tracking-wider">Year 1</th>
                  <th className="text-right py-3 px-4 text-sm font-black text-white uppercase tracking-wider">Year 3</th>
                  <th className="text-right py-3 px-4 text-sm font-black text-white uppercase tracking-wider">Year 5</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-black">
                  <td className="py-3 px-4 text-sm text-black font-bold uppercase">Stores Operating</td>
                  <td className="py-3 px-4 text-right font-black text-black">{scenario.year1.stores}</td>
                  <td className="py-3 px-4 text-right font-black text-black">{scenario.year3.stores}</td>
                  <td className="py-3 px-4 text-right font-black text-black">{scenario.year5.stores}</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="py-3 px-4 text-sm text-black font-bold uppercase">Total Profit</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year1.profit / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year3.profit / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year5.profit / 1000).toFixed(0)}K</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="py-3 px-4 text-sm text-black font-bold uppercase">To Holders (33%)</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year1.profit * 0.33 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year3.profit * 0.33 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-right font-black text-black">${(scenario.year5.profit * 0.33 / 1000).toFixed(0)}K</td>
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

      {/* CTA Section - Brutalist */}
      <section className="border-t-4 border-[#DC143C] bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl text-white font-black uppercase tracking-tight mb-4">
              Start with $100. Own every store.
            </h2>
            <p className="text-[#DC143C] mb-8 font-bold uppercase tracking-wider">
              Real stores · Real revenue · Real ownership · REBIRTH
            </p>
            <div className="flex gap-4">
              <Link href="/explorer">
                <button className="px-8 py-4 bg-[#DC143C] text-white font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border-4 border-[#DC143C] hover:border-white flex items-center gap-2">
                  ENTER REBIRTH
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-8 py-4 text-white border-4 border-white hover:bg-white hover:text-black transition-all font-black uppercase tracking-[0.2em]">
                  DOCUMENTATION
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
      </div>
    </main>
  )
}