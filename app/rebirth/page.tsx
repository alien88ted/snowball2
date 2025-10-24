"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ArrowRight, TrendingUp, Shield, DollarSign, Zap, Building2, 
  Coins, CheckCircle2, ChevronRight, Globe, Users, Target,
  Wallet, Lock, Rocket, BarChart3, Gift, Coffee, Vote,
  Store, LineChart, PieChart, Activity, ArrowUpRight,
  CircleDollarSign, Layers, Network, Gem, Flame, ArrowDown,
  ShoppingBag, Receipt, Percent, X, AlertCircle, Sparkles
} from "lucide-react"
import Link from "next/link"

export default function RebirthTokenPage() {
  const [activeTab, setActiveTab] = useState<'how' | 'tokenomics' | 'fair'>('how')
  const [taxRevenue, setTaxRevenue] = useState(0)
  
  // Simulate tax revenue counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTaxRevenue(prev => prev + Math.random() * 100)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Paper texture background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/95 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group">
              <span className="text-3xl font-black font-serif text-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                REBIRTH
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/explorer" className="text-sm font-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                Explorer
              </Link>
              <Link href="/whitepaper" className="text-sm font-black uppercase tracking-wider hover:text-[#DC143C] transition-colors">
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero - THE BIG IDEA */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Fair Launch Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-mono font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-4 h-4" />
                <span>FAIR LAUNCH • NO PRESALE • NO VC</span>
                <Sparkles className="w-4 h-4" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.85] mb-6">
                <span className="block text-black">$REBIRTH</span>
                <span className="block text-[#DC143C] text-3xl md:text-4xl mt-2">THE SELF-FUNDING ECOSYSTEM</span>
        </h1>
              
              <p className="text-xl md:text-2xl font-bold text-black max-w-3xl mx-auto mb-8">
                13% tax on every trade funds new stores.
                <span className="block mt-2 text-gray-600">No VCs. No presale. Just pure community power.</span>
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
                <div className="border-4 border-black bg-white p-4 hover:bg-black hover:text-white transition-all group">
                  <div className="text-2xl font-black mb-1 text-[#DC143C] group-hover:text-white">13%</div>
                  <div className="text-xs font-black uppercase tracking-wider">TAX FUNDS STORES</div>
                </div>
                <div className="border-4 border-black bg-[#DC143C] text-white p-4">
                  <div className="text-2xl font-black mb-1">31.7M</div>
                  <div className="text-xs font-black uppercase tracking-wider">TOTAL SUPPLY</div>
                </div>
                <div className="border-4 border-black bg-white p-4 hover:bg-black hover:text-white transition-all group">
                  <div className="text-2xl font-black mb-1 text-[#DC143C] group-hover:text-white">NO</div>
                  <div className="text-xs font-black uppercase tracking-wider">PRESALE</div>
                </div>
                <div className="border-4 border-black bg-black text-white p-4">
                  <div className="text-2xl font-black mb-1 text-[#DC143C]">100%</div>
                  <div className="text-xs font-black uppercase tracking-wider">FAIR LAUNCH</div>
                </div>
              </div>

              {/* Live Tax Revenue Counter */}
              <div className="bg-black text-white border-4 border-black p-6 max-w-2xl mx-auto mb-8">
                <div className="text-sm font-mono font-black uppercase tracking-[0.2em] mb-2 text-gray-400">
                  LIVE TAX REVENUE FOR STORES
                </div>
                <div className="text-4xl md:text-5xl font-mono font-black text-[#DC143C]">
                  ${taxRevenue.toFixed(2)}
                </div>
                <div className="text-xs font-mono text-gray-500 mt-2">
                  FUNDING THE NEXT STORE LAUNCH
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-[#DC143C] text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all border-4 border-black">
                  Buy on Raydium (Launch Soon)
                </button>
                <Link href="/explorer">
                  <button className="px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-100 transition-all border-4 border-black">
                    View Store Presales →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* THE GENIUS MECHANISM */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-12">
              The Self-Funding Loop
          </h2>
          
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border-4 border-white flex items-center justify-center mb-4">
                    <span className="text-3xl font-black">1</span>
                  </div>
                  <h3 className="text-lg font-black uppercase mb-2">People Trade $REBIRTH</h3>
                  <p className="text-gray-300 text-sm">Every buy and sell has a 13% tax</p>
                  <div className="mt-4 text-2xl font-mono font-black text-[#DC143C]">13% TAX</div>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border-4 border-[#DC143C] flex items-center justify-center mb-4">
                    <span className="text-3xl font-black">2</span>
                  </div>
                  <h3 className="text-lg font-black uppercase mb-2">Tax Funds Stores</h3>
                  <p className="text-gray-300 text-sm">100% of tax revenue buys store tokens at market price</p>
                  <div className="mt-4 text-2xl font-mono font-black text-[#DC143C]">100% TO STORES</div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border-4 border-white bg-white text-black flex items-center justify-center mb-4">
                    <span className="text-3xl font-black">3</span>
                  </div>
                  <h3 className="text-lg font-black uppercase mb-2">Stores Pay Profits</h3>
                  <p className="text-gray-300 text-sm">30% of store profits flow back to $REBIRTH holders</p>
                  <div className="mt-4 text-2xl font-mono font-black text-[#DC143C]">∞ LOOP</div>
                </div>
              </div>

              <div className="mt-12 p-6 border-4 border-[#DC143C] text-center">
                <p className="text-xl font-bold">
                  More trading → More stores funded → More profits → Higher $REBIRTH value → More trading
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  It's a perpetual growth machine powered by the community
                </p>
              </div>
            </div>
        </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-[73px] z-40 bg-white border-y-4 border-black">
          <div className="max-w-6xl mx-auto">
            <div className="flex">
              <button
                onClick={() => setActiveTab('how')}
                className={`flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'how' ? 'bg-[#DC143C] text-white' : 'hover:bg-gray-100'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => setActiveTab('tokenomics')}
                className={`flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'tokenomics' ? 'bg-[#DC143C] text-white' : 'hover:bg-gray-100'
                }`}
              >
                Tokenomics
              </button>
              <button
                onClick={() => setActiveTab('fair')}
                className={`flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'fair' ? 'bg-[#DC143C] text-white' : 'hover:bg-gray-100'
                }`}
              >
                Fair Launch
              </button>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* HOW IT WORKS TAB */}
            {activeTab === 'how' && (
              <div className="space-y-16">
                {/* The Tax Mechanism */}
                <div>
                  <h2 className="text-4xl font-black uppercase mb-8 text-center">
                    The 13% Tax Breakdown
                  </h2>
                  <div className="bg-white border-4 border-black p-8 max-w-3xl mx-auto">
                    <div className="space-y-6">
                      {/* Example Trade */}
                      <div className="p-4 bg-gray-50 border-2 border-black">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">Someone Buys $1,000 of $REBIRTH</span>
                          <span className="font-mono font-black text-xl">$1,000</span>
                        </div>
                        <ArrowDown className="w-6 h-6 mx-auto my-2 text-[#DC143C]" />
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#DC143C]">13% Tax Collected</span>
                          <span className="font-mono font-black text-xl text-[#DC143C]">$130</span>
                        </div>
                      </div>

                      <ArrowDown className="w-6 h-6 mx-auto text-[#DC143C]" />

                      {/* Where Tax Goes */}
                      <div className="p-6 bg-black text-white">
                        <h4 className="font-black uppercase mb-4 text-center">THAT $130 IMMEDIATELY:</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>→ Goes to Treasury Wallet</span>
                            <CheckCircle2 className="w-5 h-5 text-[#DC143C]" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>→ Buys Store Tokens at Market Price</span>
                            <CheckCircle2 className="w-5 h-5 text-[#DC143C]" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>→ No Special Deals or Discounts</span>
                            <CheckCircle2 className="w-5 h-5 text-[#DC143C]" />
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-600 text-center">
                          <p className="text-sm text-gray-400">
                            100% transparent. 100% on-chain. 100% fair.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Store Funding Process - OPEN PRESALES */}
                <div>
                  <h2 className="text-4xl font-black uppercase mb-8">How Stores Get Funded</h2>
                  
                  {/* Key Point Banner */}
                  <div className="bg-[#DC143C] text-white border-4 border-black p-6 mb-8 text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="text-xl font-black uppercase mb-2">COMPLETELY FAIR & OPEN</h3>
                    <p className="max-w-2xl mx-auto">
                      Store presales are PUBLIC. Anyone can invest. $REBIRTH treasury participates 
                      just like everyone else - same price, same terms, no special deals.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="border-4 border-black p-6">
                      <div className="text-3xl font-black mb-4 text-[#DC143C]">Step 1</div>
                      <h3 className="font-black uppercase mb-3">Store Opens Presale</h3>
                      <p className="text-gray-600 mb-4">
                        New store launches PUBLIC presale on our Explorer. Open to everyone until cap reached or time expires.
                      </p>
                      <div className="text-sm font-mono font-bold bg-gray-100 p-2">
                        PUBLIC PRESALE - ANYONE CAN JOIN
                      </div>
                    </div>

                    <div className="border-4 border-black p-6">
                      <div className="text-3xl font-black mb-4">Step 2</div>
                      <h3 className="font-black uppercase mb-3">Everyone Invests Together</h3>
                      <p className="text-gray-600 mb-4">
                        Regular investors AND $REBIRTH treasury (using tax revenue) buy tokens at the SAME presale price.
                      </p>
                      <div className="text-sm font-mono font-bold bg-gray-100 p-2">
                        SAME PRICE FOR EVERYONE
                      </div>
                    </div>

                    <div className="border-4 border-black p-6">
                      <div className="text-3xl font-black mb-4 text-[#DC143C]">Step 3</div>
                      <h3 className="font-black uppercase mb-3">Presale Closes</h3>
                      <p className="text-gray-600 mb-4">
                        When funding goal reached or time expires. $REBIRTH treasury owns tokens bought with tax revenue.
                      </p>
                      <div className="text-sm font-mono font-bold bg-gray-100 p-2">
                        TREASURY OWNS FAIR SHARE
                      </div>
                    </div>

                    <div className="border-4 border-black p-6 bg-[#DC143C] text-white">
                      <div className="text-3xl font-black mb-4">Step 4</div>
                      <h3 className="font-black uppercase mb-3">Profits Flow to All</h3>
                      <p className="text-gray-200 mb-4">
                        30% of store profits to ALL token holders. $REBIRTH treasury gets its proportional share.
                      </p>
                      <div className="text-sm font-mono font-bold bg-black/20 p-2">
                        EVERYONE EARNS
                      </div>
                    </div>
                  </div>

                  {/* Example Box */}
                  <div className="mt-8 bg-white border-4 border-black p-6">
                    <h4 className="font-black uppercase mb-4">Real Example:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-[#DC143C]" />
                        <span>New coffee shop needs $500k funding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        <span>Opens public presale at $0.15 per token</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Regular investors buy $300k worth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="w-5 h-5 text-[#DC143C]" />
                        <span className="font-bold">$REBIRTH treasury buys $200k worth (from tax revenue)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span>Presale complete! Store funded, everyone got same price</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why This Is Genius */}
                <div className="bg-black text-white border-4 border-black p-12">
                  <h2 className="text-4xl font-black uppercase mb-8 text-center">
                    Why This Is Genius
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-4 text-[#DC143C]" />
                      <h3 className="font-black uppercase mb-2">Self-Funding</h3>
                      <p className="text-sm text-gray-300">
                        No need for VCs or external funding. The ecosystem funds itself through trading.
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-12 h-12 mx-auto mb-4 text-[#DC143C]" />
                      <h3 className="font-black uppercase mb-2">100% Fair</h3>
                      <p className="text-sm text-gray-300">
                        Open presales. Same price for everyone. $REBIRTH buys alongside you.
                      </p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[#DC143C]" />
                      <h3 className="font-black uppercase mb-2">Aligned Incentives</h3>
                      <p className="text-sm text-gray-300">
                        More trading = more stores. More stores = more value. Everyone wins.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Open Ecosystem */}
                <div className="mt-12">
                  <h2 className="text-4xl font-black uppercase mb-8">The Open Ecosystem</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white border-4 border-black p-6">
                      <h3 className="text-xl font-black uppercase mb-4">For Individual Investors</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Direct Access to Store Presales</span>
                            <p className="text-sm text-gray-600">Invest directly in any store on the Explorer</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Or Buy $REBIRTH</span>
                            <p className="text-sm text-gray-600">Get diversified exposure to all stores</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Same Terms as Treasury</span>
                            <p className="text-sm text-gray-600">No special prices for anyone</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#DC143C] text-white border-4 border-black p-6">
                      <h3 className="text-xl font-black uppercase mb-4">For Store Operators</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Launch Open Presale</span>
                            <p className="text-sm text-gray-200">Fair funding from community + $REBIRTH</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">$REBIRTH Participation</span>
                            <p className="text-sm text-gray-200">Treasury can invest tax revenue in your presale</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Built-in Community</span>
                            <p className="text-sm text-gray-200">Access to $REBIRTH holders as investors</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOKENOMICS TAB */}
            {activeTab === 'tokenomics' && (
              <div className="space-y-16">
                {/* Supply Distribution */}
                <div>
                  <h2 className="text-4xl font-black uppercase mb-8 text-center">
                    Ultra-Fair Distribution
                  </h2>
                  <div className="bg-white border-4 border-black p-8 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-black mb-6">31,777,777 Total Supply</h3>
                        <div className="space-y-4">
                          {/* Open Market/Liquidity */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold">Open Market/Liquidity</span>
                              <span className="font-mono font-black text-xl">21M</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6">
                              <div className="h-6 bg-[#DC143C]" style={{ width: '66%' }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">66% - Fair launch on DEX</p>
                          </div>

                          {/* Community Treasury */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold">Community Treasury</span>
                              <span className="font-mono font-black text-xl">10M</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6">
                              <div className="h-6 bg-black" style={{ width: '31.5%' }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">31.5% - For governance decisions</p>
                          </div>

                          {/* Team */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold">Team</span>
                              <span className="font-mono font-black text-xl">777K</span>
                            </div>
                            <div className="w-full bg-gray-200 h-6">
                              <div className="h-6 bg-gray-600" style={{ width: '2.5%' }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">2.5% - 5yr vest, 1yr cliff</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black mb-6">Key Points</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-black text-white">
                            <h4 className="font-black uppercase mb-2">NO PRESALE</h4>
                            <p className="text-sm text-gray-300">
                              100% fair launch. No early investors. No special prices. Everyone gets the same shot.
                            </p>
                          </div>
                          <div className="p-4 border-2 border-black">
                            <h4 className="font-black uppercase mb-2">TINY TEAM ALLOCATION</h4>
                            <p className="text-sm text-gray-600">
                              Only 2.5% for team, locked for 5 years. We're here to build, not dump.
                            </p>
                          </div>
                          <div className="p-4 border-2 border-black">
                            <h4 className="font-black uppercase mb-2">COMMUNITY CONTROLLED</h4>
                            <p className="text-sm text-gray-600">
                              31.5% in community treasury. You vote how to use it.
                            </p>
                          </div>
          </div>
        </div>
      </div>
      
                    {/* Visual Breakdown */}
                    <div className="mt-8 pt-8 border-t-4 border-gray-200">
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-black uppercase">Launch Day Distribution</h4>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]" title="Open Market" />
                        <div className="w-8 h-8 bg-[#DC143C]/60" title="Open Market" />
                        <div className="w-8 h-8 bg-black" title="Treasury" />
                        <div className="w-8 h-8 bg-black" title="Treasury" />
                        <div className="w-8 h-8 bg-black" title="Treasury" />
                        <div className="w-2 h-8 bg-gray-600" title="Team" />
                      </div>
                      <div className="flex justify-center gap-8 mt-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-[#DC143C]" />
                          <span className="font-bold">Open Market (66%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-black" />
                          <span className="font-bold">Treasury (31.5%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-600" />
                          <span className="font-bold">Team (2.5%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Projections */}
                <div>
                  <h2 className="text-4xl font-black uppercase mb-8">Tax Revenue Projections</h2>
                  <div className="bg-[#DC143C] text-white border-4 border-black p-8">
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-2xl font-black uppercase mb-6 text-center">
                        How Much Can We Fund?
                      </h3>
                      <div className="space-y-6">
                        <div className="p-4 bg-black/20 border-2 border-white">
                          <div className="flex justify-between items-center mb-2">
                            <span>Daily Volume</span>
                            <span className="font-mono font-black">$100,000</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span>13% Tax Collected</span>
                            <span className="font-mono font-black">$13,000</span>
                          </div>
                          <div className="border-t border-white/50 pt-2 mt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-bold">Monthly Store Fund</span>
                              <span className="font-mono font-black text-xl">$390,000</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm mb-2">That's enough to fund</p>
                          <div className="text-4xl font-black">1-2 NEW STORES</div>
                          <p className="text-sm mt-2">Every single month</p>
                        </div>

                        <div className="p-4 bg-white text-black">
                          <p className="font-bold text-center">
                            Higher volume = More stores = More profits = Higher $REBIRTH value
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAIR LAUNCH TAB */}
            {activeTab === 'fair' && (
              <div className="space-y-16">
                {/* Why Fair Launch */}
                <div>
                  <h2 className="text-4xl font-black uppercase mb-8 text-center">
                    The Fairest Launch Ever
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white border-4 border-black p-8">
                      <h3 className="text-2xl font-black mb-4 text-[#DC143C]">What We DON'T Have</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <X className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">No Presale</span>
                            <p className="text-sm text-gray-600">No early birds getting cheap tokens</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">No VC Allocation</span>
                            <p className="text-sm text-gray-600">No whales waiting to dump on you</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">No Private Sale</span>
                            <p className="text-sm text-gray-600">No special deals for insiders</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">No Team Dump</span>
                            <p className="text-sm text-gray-600">2.5% team tokens locked for 5 years</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black text-white border-4 border-black p-8">
                      <h3 className="text-2xl font-black mb-4 text-[#DC143C]">What We DO Have</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">100% Open Market</span>
                            <p className="text-sm text-gray-300">Everyone buys at the same price</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Instant Liquidity</span>
                            <p className="text-sm text-gray-300">Deep liquidity from day one</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Community Treasury</span>
                            <p className="text-sm text-gray-300">31.5% controlled by holders</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Self-Funding Model</span>
                            <p className="text-sm text-gray-300">Tax revenue funds growth</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Launch Details */}
                <div className="bg-white border-4 border-black p-8 max-w-3xl mx-auto">
                  <h3 className="text-2xl font-black uppercase mb-6 text-center">Launch Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Launch Date</span>
                      <span className="font-mono font-black">Coming Soon</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Platform</span>
                      <span className="font-mono font-black">Raydium (Solana)</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Starting Liquidity</span>
                      <span className="font-mono font-black">21,000,000 $REBIRTH</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Buy Tax</span>
                      <span className="font-mono font-black text-[#DC143C]">13%</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Sell Tax</span>
                      <span className="font-mono font-black text-[#DC143C]">13%</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2 border-gray-200">
                      <span className="font-bold">Max Wallet</span>
                      <span className="font-mono font-black">No Limit</span>
                    </div>
                  </div>
                </div>

                {/* Fair Launch Promise */}
                <div className="bg-[#DC143C] text-white border-4 border-black p-12 text-center">
                  <AlertCircle className="w-16 h-16 mx-auto mb-6" />
                  <h3 className="text-3xl font-black uppercase mb-4">
                    Our Promise To You
                  </h3>
                  <p className="text-lg mb-6 max-w-2xl mx-auto">
                    No tricks. No rugpulls. No insider deals. Just a fair chance for everyone 
                    to own part of the future of tokenized commerce.
                  </p>
                  <div className="inline-block p-4 bg-black/20 border-2 border-white">
                    <p className="text-sm font-mono font-black uppercase tracking-wider">
                      Contract will be verified • Liquidity will be locked • Tax wallet multisig
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-black text-white border-t-4 border-black">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-6">
              Be Part of The Revolution
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Fair launch. Self-funding. Community-driven. This is how we rebuild commerce.
            </p>
            
            <div className="bg-[#DC143C] border-4 border-white p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-black uppercase mb-4">Launch Countdown</h3>
              <div className="text-4xl font-mono font-black">COMING SOON</div>
              <p className="text-sm mt-2">Join our community to get notified</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-100 transition-all border-4 border-white">
                Join Telegram
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border-4 border-white">
                Read Whitepaper
              </button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-xs text-white/60 max-w-2xl mx-auto">
                * $REBIRTH is a utility token for the REBIRTH ecosystem. The 13% transaction tax funds ecosystem growth. 
                Not available in restricted jurisdictions. Always DYOR. Not financial advice.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}