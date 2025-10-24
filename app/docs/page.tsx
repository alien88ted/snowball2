"use client"

import Link from "next/link"
import { ArrowRight, Code, Layers, Rocket, BookOpen, Shield, Zap, Users, DollarSign, TrendingUp, ChevronRight, ExternalLink, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DocsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    tokenCreation: `// Token Configuration
const tokenConfig = {
  name: "Coffee Shop Token",
  symbol: "COFFEE",
  supply: 1000000,
  price: 0.15,
  equity: 25 // 25% profit sharing
}`,
    smartContract: `// Automatic Smart Contract
contract CoffeeToken {
  mapping(address => uint256) balances;
  uint256 public totalRevenue;
  
  function distributeProfit() public {
    uint256 profit = totalRevenue * 0.25;
    // Auto-distributed to holders
  }
}`,
    integration: `// Easy Integration
import { Rebirth } from '@rebirth/sdk';

const rebirth = new Rebirth({
  projectId: 'your-project',
  network: 'solana'
});

// Launch your token
await rebirth.launch(tokenConfig);`
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
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
      
      {/* Phoenix Fire Animation Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#DC143C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF4500" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x={`${i * 25}%`}
              y="50%"
              width="20%"
              height="50%"
              fill="url(#fireGradient)"
              opacity={0.3}
              style={{
                animation: `flicker ${2 + i * 0.5}s ease-in-out infinite`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section with Animation */}
        <section className="relative py-24 md:py-32 border-b-4 border-black overflow-hidden">
          {/* Animated corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#DC143C] opacity-50" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#DC143C] opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-black opacity-50" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-black opacity-50" />
          
          <div className="max-w-[1400px] mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-black text-xs tracking-[0.3em] uppercase mb-6">
                <BookOpen className="w-4 h-4" />
                REBIRTH KNOWLEDGE BASE
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-[100px] font-black font-serif tracking-tight mb-8 text-black uppercase relative">
                <span className="relative z-10">DOCUMENTATION</span>
                {/* Glitch effect on hover */}
                <span className="absolute inset-0 text-[#DC143C] opacity-0 hover:opacity-100 transition-opacity duration-200" style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)' }}>
                  DOCUMENTATION
                </span>
            </h1>
              <p className="text-xl text-black font-bold max-w-3xl mx-auto uppercase tracking-wider leading-relaxed">
                Master the REBIRTH platform · Build tokenized businesses · Create community-owned stores · Launch in minutes
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
                {[
                  { value: "5 MIN", label: "SETUP TIME" },
                  { value: "$100", label: "MIN INVEST" },
                  { value: "25%", label: "PROFIT SHARE" },
                  { value: "24/7", label: "TRADING" }
                ].map((stat, i) => (
                  <div key={i} className="border-2 border-black p-4 bg-white hover:bg-[#DC143C] hover:text-white transition-all group">
                    <div className="text-2xl font-black">{stat.value}</div>
                    <div className="text-[10px] font-bold tracking-wider opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

        <div className="max-w-[1400px] mx-auto px-6 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Enhanced Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Navigation */}
                <div className="border-4 border-black bg-white">
                  <div className="p-6 border-b-4 border-black bg-[#DC143C] text-white">
                    <h3 className="text-xl font-black font-serif tracking-tight uppercase flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      CONTENTS
                    </h3>
      </div>
                  <nav className="p-0">
                    {[
                      { id: "overview", label: "GETTING STARTED", icon: <Rocket className="w-4 h-4" /> },
                      { id: "explorer", label: "EXPLORER GUIDE", icon: <TrendingUp className="w-4 h-4" /> },
                      { id: "landing", label: "LANDING PAGES", icon: <Zap className="w-4 h-4" /> },
                      { id: "tokenomics", label: "TOKENOMICS", icon: <DollarSign className="w-4 h-4" /> },
                      { id: "create", label: "CREATE PROJECT", icon: <Code className="w-4 h-4" /> },
                      { id: "integration", label: "INTEGRATION", icon: <Layers className="w-4 h-4" /> }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveSection(item.id)
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={cn(
                          "flex items-center gap-3 px-6 py-4 text-sm transition-all duration-300 font-black uppercase tracking-wider border-b-2 border-black last:border-0",
                          activeSection === item.id
                            ? "bg-black text-white"
                            : "text-black hover:bg-[#DC143C] hover:text-white"
                        )}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform",
                          activeSection === item.id && "rotate-90"
                        )} />
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Links */}
                <div className="border-4 border-black bg-[#DC143C] p-6">
                  <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">QUICK ACTIONS</h4>
                  <div className="space-y-3">
                    <Link href="/explorer/create">
                      <button className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                        CREATE PROJECT →
                      </button>
                    </Link>
                    <Link href="/explorer">
                      <button className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                        BROWSE PROJECTS →
                      </button>
                    </Link>
                  </div>
                </div>
            </div>
          </aside>

            {/* Main Content with Better Styling */}
            <main className="lg:col-span-3 space-y-20">
              {/* Getting Started Section */}
              <section id="overview" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">1</span>
                    GETTING STARTED
                  </h2>
                </div>
                
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    REBIRTH revolutionizes business ownership by tokenizing physical stores. Each store becomes a tradeable asset where token holders receive monthly profit distributions on-chain.
                </p>
              </div>

                {/* Core Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="border-4 border-black bg-white hover:scale-[1.02] transition-transform">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center">
                          <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black uppercase">NO CODE REQUIRED</h3>
                      </div>
                      <p className="text-sm font-bold text-gray-700 uppercase mb-4">
                        Launch your tokenized business without writing a single line of code. Our platform handles all smart contracts automatically.
                      </p>
                      <ul className="space-y-2">
                        {["Automatic smart contracts", "Built-in compliance", "Instant deployment"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-bold">
                            <span className="text-[#DC143C]">✓</span>
                            <span className="uppercase">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-4 border-black bg-white hover:scale-[1.02] transition-transform">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black uppercase">COMMUNITY OWNED</h3>
                      </div>
                      <p className="text-sm font-bold text-gray-700 uppercase mb-4">
                        Your customers become co-owners. They earn from every purchase and help grow the business.
                      </p>
                      <ul className="space-y-2">
                        {["25% profit sharing", "Monthly distributions", "Voting rights"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-bold">
                            <span className="text-[#DC143C]">✓</span>
                            <span className="uppercase">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              </div>

                {/* Quick Start Steps */}
                <div className="border-4 border-black bg-black text-white p-8">
                  <h3 className="text-2xl font-black uppercase mb-6 text-[#DC143C]">QUICK START IN 3 STEPS</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { step: "01", title: "CONNECT WALLET", desc: "Link your Solana wallet to get started" },
                      { step: "02", title: "CREATE PROJECT", desc: "Fill in details and set tokenomics" },
                      { step: "03", title: "LAUNCH & EARN", desc: "Go live and start earning from day one" }
                    ].map((item, i) => (
                      <div key={i} className="border-2 border-[#DC143C] p-4">
                        <div className="text-3xl font-black text-[#DC143C] mb-2">{item.step}</div>
                        <h4 className="font-black uppercase mb-2">{item.title}</h4>
                        <p className="text-xs uppercase opacity-80">{item.desc}</p>
                      </div>
                    ))}
                  </div>
              </div>
            </section>

              {/* Explorer Guide Section */}
              <section id="explorer" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">2</span>
                    EXPLORER GUIDE
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    The Explorer is your gateway to discovering and investing in tokenized businesses. Browse live projects, analyze metrics, and invest with as little as $100.
                </p>
              </div>

                {/* Explorer Features */}
                <div className="space-y-6">
                  <div className="border-4 border-black bg-white">
                    <div className="p-8">
                      <h3 className="text-2xl font-black uppercase mb-6">KEY FEATURES</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="border-l-4 border-[#DC143C] pl-4">
                            <h4 className="font-black uppercase mb-2">LIVE TRADING DATA</h4>
                            <p className="text-sm text-gray-700 font-bold uppercase">
                              Real-time price updates, volume metrics, and holder counts updated every second
                            </p>
                          </div>
                          
                          <div className="border-l-4 border-[#DC143C] pl-4">
                            <h4 className="font-black uppercase mb-2">SMART FILTERS</h4>
                            <p className="text-sm text-gray-700 font-bold uppercase">
                              Filter by category, price range, market cap, or profit distribution percentage
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="border-l-4 border-black pl-4">
                            <h4 className="font-black uppercase mb-2">PROJECT ANALYTICS</h4>
                            <p className="text-sm text-gray-700 font-bold uppercase">
                              Deep dive into revenue history, growth metrics, and holder distribution
                      </p>
                    </div>
                          
                          <div className="border-l-4 border-black pl-4">
                            <h4 className="font-black uppercase mb-2">ONE-CLICK INVEST</h4>
                            <p className="text-sm text-gray-700 font-bold uppercase">
                              Buy tokens instantly with SOL or USDC directly from your wallet
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Guide */}
                  <div className="border-4 border-black bg-[#DC143C] text-white p-8">
                    <h3 className="text-2xl font-black uppercase mb-6">HOW TO USE THE EXPLORER</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { icon: "🔍", action: "SEARCH", desc: "Find projects by name or category" },
                        { icon: "📊", action: "ANALYZE", desc: "Review metrics and revenue data" },
                        { icon: "💰", action: "INVEST", desc: "Buy tokens with one click" },
                        { icon: "📈", action: "TRACK", desc: "Monitor your portfolio growth" }
                      ].map((step, i) => (
                        <div key={i} className="text-center">
                          <div className="text-4xl mb-2">{step.icon}</div>
                          <h4 className="font-black text-sm mb-1">{step.action}</h4>
                          <p className="text-xs uppercase opacity-80">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </section>

              {/* Landing Pages Section */}
              <section id="landing" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">3</span>
                    LANDING PAGES
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    Every project gets a professional landing page automatically. Showcase your business, display live metrics, and convert visitors into token holders.
                </p>
              </div>

                {/* Landing Page Components */}
                <div className="border-4 border-black bg-white">
                  <div className="grid md:grid-cols-2 border-b-4 border-black">
                    <div className="p-8 border-r-4 border-black">
                      <h3 className="text-xl font-black uppercase mb-4">INCLUDED SECTIONS</h3>
                      <ul className="space-y-3">
                        {[
                          "Hero with live price ticker",
                          "Business overview & vision",
                          "Tokenomics breakdown",
                          "Team & advisors",
                          "Roadmap & milestones",
                          "Live trading widget"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase">
                            <span className="w-6 h-6 bg-[#DC143C] text-white flex items-center justify-center text-xs">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black uppercase mb-4">CUSTOMIZATION</h3>
                      <ul className="space-y-3">
                        {[
                          "Custom branding & colors",
                          "Upload images & videos",
                          "Social media links",
                          "Custom domain support",
                          "SEO optimization",
                          "Analytics tracking"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase">
                            <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-8 bg-gray-50">
                    <p className="text-sm font-black uppercase text-center">
                      <span className="text-[#DC143C]">INSTANT DEPLOYMENT</span> · NO CODING REQUIRED · MOBILE RESPONSIVE · SSL SECURED
                    </p>
                    </div>
              </div>
            </section>

              {/* Tokenomics Section */}
              <section id="tokenomics" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">4</span>
                    TOKENOMICS
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    Our tokenomics model ensures sustainable growth and fair profit distribution. Every token represents real ownership in a physical business.
                </p>
              </div>

                {/* Token Distribution Visual */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="border-4 border-black bg-white p-8">
                    <h3 className="text-xl font-black uppercase mb-6">STANDARD ALLOCATION</h3>
                    <div className="space-y-4">
                      {[
                        { label: "PUBLIC SALE", value: 30, color: "#DC143C" },
                        { label: "LIQUIDITY POOL", value: 30, color: "#000000" },
                        { label: "CUSTOMER REWARDS", value: 25, color: "#666666" },
                        { label: "TREASURY", value: 10, color: "#999999" },
                        { label: "TEAM", value: 5, color: "#CCCCCC" }
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-black uppercase">{item.label}</span>
                            <span className="text-sm font-black">{item.value}%</span>
                          </div>
                          <div className="w-full h-8 border-2 border-black bg-white">
                            <div 
                              className="h-full transition-all duration-1000"
                              style={{ 
                                width: `${item.value}%`,
                                backgroundColor: item.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-4 border-black bg-black text-white p-8">
                    <h3 className="text-xl font-black uppercase mb-6 text-[#DC143C]">PROFIT DISTRIBUTION</h3>
                    <div className="space-y-6">
                      <div className="border-2 border-[#DC143C] p-4">
                        <div className="text-3xl font-black text-[#DC143C]">33%</div>
                        <div className="font-black uppercase">TO TOKEN HOLDERS</div>
                        <div className="text-xs uppercase opacity-80 mt-1">Monthly on-chain distribution</div>
                      </div>
                      <div className="border-2 border-white p-4">
                        <div className="text-3xl font-black">10%</div>
                        <div className="font-black uppercase">BUYBACK & BURN</div>
                        <div className="text-xs uppercase opacity-80 mt-1">Quarterly token reduction</div>
                      </div>
                      <div className="border-2 border-gray-600 p-4">
                        <div className="text-3xl font-black text-gray-400">57%</div>
                        <div className="font-black uppercase">REINVESTMENT</div>
                        <div className="text-xs uppercase opacity-80 mt-1">Growth & expansion fund</div>
                      </div>
                    </div>
                  </div>
                            </div>
              </section>

              {/* Create Project Section */}
              <section id="create" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">5</span>
                    CREATE PROJECT
                  </h2>
                            </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    Launch your tokenized business in minutes. Our guided creation process handles everything from smart contracts to landing pages.
                  </p>
                            </div>

                {/* Creation Steps */}
                <div className="space-y-8">
                  {[
                    {
                      step: "STEP 1: PROJECT DETAILS",
                      fields: ["Business name", "Description", "Category", "Location", "Website"],
                      code: codeExamples.tokenCreation
                    },
                    {
                      step: "STEP 2: TOKEN CONFIGURATION",
                      fields: ["Token symbol", "Total supply", "Initial price", "Profit share %", "Vesting schedule"],
                      code: codeExamples.smartContract
                    },
                    {
                      step: "STEP 3: LAUNCH & INTEGRATE",
                      fields: ["Review details", "Deploy contract", "Add liquidity", "Activate trading", "Share link"],
                      code: codeExamples.integration
                    }
                  ].map((section, i) => (
                    <div key={i} className="border-4 border-black bg-white">
                      <div className="grid md:grid-cols-2">
                        <div className="p-8 border-r-4 border-black">
                          <h3 className="text-xl font-black uppercase mb-6">{section.step}</h3>
                          <ul className="space-y-3">
                            {section.fields.map((field, j) => (
                              <li key={j} className="flex items-center gap-3">
                                <span className="w-6 h-6 bg-[#DC143C] text-white flex items-center justify-center text-xs font-black">
                                  {j + 1}
                                </span>
                                <span className="text-sm font-bold uppercase">{field}</span>
                              </li>
                            ))}
                          </ul>
                            </div>
                        <div className="p-8 bg-black">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black text-[#DC143C] uppercase">Example Code</span>
                            <button
                              onClick={() => copyToClipboard(section.code, `code-${i}`)}
                              className="text-white hover:text-[#DC143C] transition-colors"
                            >
                              {copiedCode === `code-${i}` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-12 border-4 border-[#DC143C] bg-[#DC143C] p-8 text-center">
                  <h3 className="text-3xl font-black text-white uppercase mb-4">READY TO BUILD?</h3>
                  <p className="text-white font-bold uppercase mb-6">Launch your tokenized business today</p>
                          <Link href="/explorer/create">
                    <button className="px-12 py-4 bg-white text-[#DC143C] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all inline-flex items-center gap-2">
                      START CREATING
                      <ArrowRight className="w-5 h-5" />
                    </button>
                          </Link>
                        </div>
              </section>

              {/* Integration Section */}
              <section id="integration" className="scroll-mt-24">
                <div className="mb-8 pb-4 border-b-4 border-black">
                  <h2 className="text-5xl font-black font-serif tracking-tight text-black uppercase flex items-center gap-4">
                    <span className="w-12 h-12 bg-[#DC143C] text-white flex items-center justify-center text-2xl font-black">6</span>
                    INTEGRATION
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-black font-bold uppercase leading-relaxed">
                    Connect your existing business systems with REBIRTH. Our APIs and SDKs make integration seamless.
                  </p>
                </div>

                {/* Integration Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: "REST API",
                      desc: "Full-featured API for custom integrations",
                      features: ["Token management", "Transaction history", "Real-time prices"]
                    },
                    {
                      title: "WEBHOOKS",
                      desc: "Real-time notifications for key events",
                      features: ["New purchases", "Price changes", "Distribution events"]
                    },
                    {
                      title: "SDK",
                      desc: "JavaScript/TypeScript SDK for web apps",
                      features: ["React components", "Wallet connection", "Trading widgets"]
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-4 border-black bg-white hover:bg-[#DC143C] hover:text-white transition-all group">
                      <div className="p-6">
                        <h3 className="text-xl font-black uppercase mb-2">{item.title}</h3>
                        <p className="text-sm font-bold uppercase mb-4 opacity-80">{item.desc}</p>
                        <ul className="space-y-2">
                          {item.features.map((feature, j) => (
                            <li key={j} className="text-xs font-bold uppercase flex items-center gap-2">
                              <span className="text-[#DC143C] group-hover:text-white">→</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                <div className="border-4 border-black bg-black text-white p-8">
                  <h3 className="text-2xl font-black uppercase mb-6 text-[#DC143C]">DEVELOPER RESOURCES</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-black uppercase mb-4">DOCUMENTATION</h4>
                      <div className="space-y-3">
                        {[
                          { label: "API Reference", link: "#" },
                          { label: "SDK Documentation", link: "#" },
                          { label: "Smart Contracts", link: "#" },
                          { label: "Example Projects", link: "#" }
                        ].map((item, i) => (
                          <a key={i} href={item.link} className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[#DC143C] transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black uppercase mb-4">SUPPORT</h4>
                      <div className="space-y-3">
                        {[
                          { label: "Discord Community", link: "#" },
                          { label: "GitHub Issues", link: "#" },
                          { label: "Email Support", link: "#" },
                          { label: "Video Tutorials", link: "#" }
                        ].map((item, i) => (
                          <a key={i} href={item.link} className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[#DC143C] transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer CTA */}
              <section className="border-4 border-[#DC143C] bg-[#DC143C] p-12 text-center">
                <h2 className="text-4xl font-black text-white uppercase mb-4">QUESTIONS?</h2>
                <p className="text-white font-bold uppercase mb-8 text-lg">
                  Join our community or reach out to our team
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-[#DC143C] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                    JOIN DISCORD
                  </button>
                  <button className="px-8 py-4 bg-black text-white font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#DC143C] transition-all border-4 border-black hover:border-white">
                    CONTACT TEAM
                  </button>
              </div>
            </section>
          </main>
        </div>
      </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.3; }
          50% { transform: scaleY(1.2) scaleX(0.9); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}