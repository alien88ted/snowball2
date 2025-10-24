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

  // Core data - REBIRTH tokenomics
  const tokenData = {
    totalSupply: 31_777_777,
    segments: [
      { label: "Open Market/Liquidity", value: 21_000_000, percentage: 66.1, color: "#DC143C", description: "Fair launch - No presale" },
      { label: "Community Treasury", value: 10_000_000, percentage: 31.5, color: "#111827", description: "Governance decisions" },
      { label: "Team", value: 777_777, percentage: 2.4, color: "#6B7280", description: "5yr vest, 1yr cliff" }
    ]
  }

  const taxMechanism = {
    rate: 13,
    allocation: [
      { label: "Franchise Funding", percentage: 100, description: "All tax funds new stores" }
    ]
  }

  const scenarios = {
    conservative: {
      year1: { stores: 1, funded: 60_000, tokenPrice: 0.20 },
      year3: { stores: 3, funded: 180_000, tokenPrice: 0.35 },
      year5: { stores: 5, funded: 300_000, tokenPrice: 0.50 }
    },
    moderate: {
      year1: { stores: 2, funded: 120_000, tokenPrice: 0.30 },
      year3: { stores: 8, funded: 480_000, tokenPrice: 0.75 },
      year5: { stores: 20, funded: 1_200_000, tokenPrice: 1.50 }
    },
    aggressive: {
      year1: { stores: 5, funded: 300_000, tokenPrice: 0.50 },
      year3: { stores: 25, funded: 1_500_000, tokenPrice: 2.00 },
      year5: { stores: 100, funded: 6_000_000, tokenPrice: 5.00 }
    }
  }

  const scenario = scenarios[selectedScenario]
  const tokensOwned = investmentAmount / 0.15 // Estimated launch price
  const ownershipPercentage = (tokensOwned / tokenData.totalSupply) * 100

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
              31.7M TOKENS · 13% TAX · FUNDS ECOSYSTEM
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar - Brutalist */}
      <section className="border-b-4 border-black bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-[#DC143C]">
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Trade Tax</div>
              <div className="text-2xl font-black text-white uppercase">13%</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Total Supply</div>
              <div className="text-2xl font-black text-white uppercase">31.7M</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Launch Type</div>
              <div className="text-2xl font-black text-white uppercase">FAIR</div>
            </div>
            <div className="py-6 px-4">
              <div className="text-sm text-[#DC143C] mb-1 font-black tracking-wider uppercase">Use of Tax</div>
              <div className="text-2xl font-black text-white uppercase">100% STORES</div>
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
              <p className="text-lg font-bold text-gray-700 mb-8 uppercase">
                NO PRESALE · FAIR MARKET LAUNCH · COMMUNITY FIRST
              </p>
              
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
                          className="w-4 h-4 border-2 border-black group-hover:border-white"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <div className="font-black text-black group-hover:text-white uppercase">{segment.label}</div>
                          <div className="text-sm text-gray-600 group-hover:text-white/80 uppercase">{segment.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-black group-hover:text-white">
                          {segment.value.toLocaleString()}
                        </div>
                        <div className="text-sm font-black text-[#DC143C] group-hover:text-white">
                          {segment.percentage.toFixed(1)}%
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
                      <span className="font-black text-black">{segment.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-8 border-2 border-black bg-white">
                      <div 
                        className="h-full transition-all duration-500 ease-out"
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

              <div className="mt-8 p-4 border-4 border-black bg-[#DC143C]">
                <div className="text-xs text-white font-black uppercase tracking-[0.3em] mb-2">KEY INSIGHT</div>
                <p className="text-sm text-white font-bold uppercase">
                  13% tax on all trades creates sustainable funding for franchise growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Mechanism - NEW SECTION */}
      <section className="py-16 px-6 border-b-4 border-black bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-[#DC143C] uppercase tracking-[0.3em] mb-8">
            TAX MECHANISM
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-4 border-[#DC143C] bg-white p-8">
              <h3 className="text-3xl font-black text-black mb-4">13% TRADE TAX</h3>
              <p className="text-gray-700 mb-6">Every buy and sell incurs a 13% tax that directly funds the franchise ecosystem.</p>
              
              <div className="space-y-4">
                <div className="p-4 border-2 border-black">
                  <div className="font-black text-2xl text-[#DC143C] mb-2">100%</div>
                  <div className="font-bold uppercase text-black">To Franchise Funding</div>
                  <div className="text-sm text-gray-600 mt-1">All tax revenue funds new stores at fair market value</div>
                </div>
              </div>
            </div>

            <div className="border-4 border-white p-8">
              <h3 className="text-3xl font-black text-white mb-4">FAIR MECHANISM</h3>
              <p className="text-gray-300 mb-6">Tokens for stores are acquired from the open market, ensuring no advantage.</p>
              
              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#DC143C] mt-2" />
                  <div>
                    <div className="font-bold uppercase">No Presale Edge</div>
                    <div className="text-sm text-gray-400">Stores buy tokens at market price like everyone else</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#DC143C] mt-2" />
                  <div>
                    <div className="font-bold uppercase">Community First</div>
                    <div className="text-sm text-gray-400">Fair launch ensures equal opportunity for all</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#DC143C] mt-2" />
                  <div>
                    <div className="font-bold uppercase">Sustainable Growth</div>
                    <div className="text-sm text-gray-400">Tax creates consistent funding for expansion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator - Brutalist */}
      <section className="py-16 px-6 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-[#DC143C] uppercase tracking-[0.3em] mb-8">
            GROWTH PROJECTIONS
          </h2>

          {/* Scenario Selector */}
          <div className="flex gap-4 mb-8">
            {(['conservative', 'moderate', 'aggressive'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedScenario(s)}
                className={`px-6 py-3 border-4 border-black font-black uppercase tracking-wider transition-all ${
                  selectedScenario === s
                    ? 'bg-[#DC143C] text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results Table */}
          <div className="border-4 border-black overflow-hidden">
            <div className="bg-[#DC143C] p-4">
              <h3 className="text-2xl font-black text-white uppercase">Ecosystem Growth</h3>
            </div>
            <div className="bg-white">
              <table className="w-full">
                <thead className="border-b-4 border-black">
                  <tr>
                    <th className="p-4 text-left font-black uppercase">Timeline</th>
                    <th className="p-4 text-center font-black uppercase">Stores Funded</th>
                    <th className="p-4 text-center font-black uppercase">Capital Deployed</th>
                    <th className="p-4 text-center font-black uppercase">Est. Token Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  <tr>
                    <td className="p-4 font-bold">YEAR 1</td>
                    <td className="p-4 text-center font-black text-2xl">{scenario.year1.stores}</td>
                    <td className="p-4 text-center font-black text-xl">${scenario.year1.funded.toLocaleString()}</td>
                    <td className="p-4 text-center font-black text-[#DC143C]">${scenario.year1.tokenPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">YEAR 3</td>
                    <td className="p-4 text-center font-black text-2xl">{scenario.year3.stores}</td>
                    <td className="p-4 text-center font-black text-xl">${scenario.year3.funded.toLocaleString()}</td>
                    <td className="p-4 text-center font-black text-[#DC143C]">${scenario.year3.tokenPrice.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-bold">YEAR 5</td>
                    <td className="p-4 text-center font-black text-2xl">{scenario.year5.stores}</td>
                    <td className="p-4 text-center font-black text-xl">${scenario.year5.funded.toLocaleString()}</td>
                    <td className="p-4 text-center font-black text-[#DC143C]">${scenario.year5.tokenPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 p-6 border-4 border-black bg-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-black text-black">DISCLAIMER:</span> These projections are hypothetical scenarios based on potential ecosystem growth. 
              Actual results will depend on market conditions, adoption rates, and franchise success. The 13% tax ensures consistent funding regardless of market cycles.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Brutalist */}
      <section className="py-20 px-6 bg-[#DC143C] border-b-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6 uppercase">
            Ready to Join the Rebirth?
          </h2>
          <p className="text-xl text-white mb-8 uppercase font-bold">
            Fair Launch · No Presale · Pure Community
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/explorer">
              <button className="px-8 py-4 bg-white text-black font-black text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all border-4 border-white hover:border-white">
                Join Fair Launch
              </button>
            </Link>
            <Link href="/docs">
              <button className="px-8 py-4 border-4 border-white text-white font-black text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
                Read Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
      </div>
    </main>
  )
}