"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, ArrowRight, Book, Target, Users, Rocket, Shield, TrendingUp, DollarSign, Coffee, ChevronRight } from "lucide-react"

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState("intro")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "intro", title: "INTRODUCTION", icon: Book },
    { id: "foundation", title: "FOUNDATION", icon: Shield },
    { id: "location", title: "LOCATION & EQUIPMENT", icon: Target },
    { id: "technology", title: "TECHNOLOGY", icon: Rocket },
    { id: "marketing", title: "MARKETING", icon: TrendingUp },
    { id: "launch", title: "LAUNCH STRATEGY", icon: Coffee },
    { id: "operations", title: "OPERATIONS", icon: Users },
    { id: "scaling", title: "SCALING", icon: DollarSign },
    { id: "vision", title: "LONG-TERM VISION", icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black z-50">
        <div
          className="h-full bg-[#DC143C] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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

      <div className="relative z-10">
      {/* Hero */}
        <div className="pt-24 pb-16 border-b-4 border-black bg-black">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-black text-xs tracking-[0.3em] uppercase mb-6">
              <FileText className="w-4 h-4" />
              OFFICIAL DOCUMENT
            </div>
            <h1 className="text-6xl md:text-7xl font-black font-serif text-white uppercase tracking-tight mb-4">
              REBIRTH<br/>WHITEPAPER
            </h1>
            <p className="text-xl text-[#DC143C] font-bold uppercase tracking-wider max-w-2xl mx-auto">
              The complete guide to community-owned tokenized businesses
            </p>
            <div className="mt-8 text-white/60 font-bold uppercase text-sm">
              VERSION 2.0 · UPDATED {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar Navigation */}
          <aside className="w-80 border-r-4 border-black bg-white h-screen sticky top-0 overflow-y-auto hidden lg:block">
            <div className="p-6 border-b-4 border-black bg-[#DC143C]">
              <h3 className="text-white font-black uppercase tracking-wider">TABLE OF CONTENTS</h3>
      </div>
            <nav className="p-0">
          {sections.map((section) => (
                <a
              key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                setActiveSection(section.id)
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`flex items-center gap-3 px-6 py-4 border-b-2 border-black transition-all font-black uppercase text-sm tracking-wider hover:bg-[#DC143C] hover:text-white ${
                    activeSection === section.id ? "bg-black text-white" : "text-black"
                  }`}
                >
                  <section.icon className={`w-4 h-4 ${activeSection === section.id ? "text-[#DC143C]" : ""}`} />
                  <span className="flex-1">{section.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
        {/* Introduction */}
            <section id="intro" className="mb-20">
              <div className="border-4 border-black bg-white p-8 mb-8">
                <h2 className="text-4xl font-black font-serif uppercase mb-6">INTRODUCTION</h2>
                <p className="text-lg font-bold uppercase leading-relaxed mb-6">
                  REBIRTH revolutionizes traditional business ownership by tokenizing physical stores, 
                  enabling community ownership where every customer becomes a stakeholder.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-4 border-black p-4 bg-[#DC143C]">
                    <h3 className="text-white font-black uppercase mb-2">THE PROBLEM</h3>
                    <p className="text-white text-sm font-bold uppercase">
                      Traditional businesses exclude customers from ownership and profits
                    </p>
              </div>
                  <div className="border-4 border-black p-4">
                    <h3 className="font-black uppercase mb-2">THE SOLUTION</h3>
                    <p className="text-sm font-bold uppercase">
                      Tokenized equity enables instant, global, fractional ownership
                    </p>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation */}
            <section id="foundation" className="mb-20">
              <div className="border-4 border-black bg-white p-8">
                <h2 className="text-4xl font-black font-serif uppercase mb-6">FOUNDATION</h2>
                
                <div className="space-y-6">
                    <div>
                    <h3 className="text-2xl font-black uppercase mb-4">CORE PRINCIPLES</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="block w-6 h-6 bg-[#DC143C] text-white text-center font-black">1</span>
                    <div>
                          <strong className="font-black uppercase">COMMUNITY OWNERSHIP:</strong>
                          <span className="font-bold uppercase ml-2">Every token holder is a true owner</span>
                    </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="block w-6 h-6 bg-[#DC143C] text-white text-center font-black">2</span>
                    <div>
                          <strong className="font-black uppercase">PROFIT SHARING:</strong>
                          <span className="font-bold uppercase ml-2">33% of profits distributed monthly</span>
                    </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="block w-6 h-6 bg-[#DC143C] text-white text-center font-black">3</span>
                    <div>
                          <strong className="font-black uppercase">TRANSPARENCY:</strong>
                          <span className="font-bold uppercase ml-2">All financials on-chain and public</span>
                    </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="block w-6 h-6 bg-[#DC143C] text-white text-center font-black">4</span>
                    <div>
                          <strong className="font-black uppercase">LIQUIDITY:</strong>
                          <span className="font-bold uppercase ml-2">Trade tokens 24/7 on DEX</span>
                    </div>
                      </li>
                </ul>
                </div>

                  <div className="border-4 border-black bg-black p-6">
                    <h3 className="text-[#DC143C] font-black uppercase mb-4">LEGAL STRUCTURE</h3>
                    <p className="text-white font-bold uppercase mb-4">
                      Each project operates as a legally compliant entity with:
                    </p>
                    <ul className="space-y-2 text-white">
                      <li className="font-bold uppercase">• REGISTERED BUSINESS ENTITY</li>
                      <li className="font-bold uppercase">• SECURITIES COMPLIANCE</li>
                      <li className="font-bold uppercase">• TAX TRANSPARENCY</li>
                      <li className="font-bold uppercase">• AUDIT REQUIREMENTS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

            {/* Technology Stack */}
            <section id="technology" className="mb-20">
              <div className="border-4 border-black bg-white p-8">
                <h2 className="text-4xl font-black font-serif uppercase mb-6">TECHNOLOGY</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border-4 border-black p-6">
                    <h3 className="font-black uppercase mb-4">BLOCKCHAIN</h3>
                    <ul className="space-y-2">
                      <li className="font-bold uppercase">• SOLANA NETWORK</li>
                      <li className="font-bold uppercase">• SPL TOKENS</li>
                      <li className="font-bold uppercase">• SMART CONTRACTS</li>
                      <li className="font-bold uppercase">• MULTI-SIG WALLETS</li>
                    </ul>
                  </div>
                  <div className="border-4 border-[#DC143C] bg-[#DC143C] p-6">
                    <h3 className="text-white font-black uppercase mb-4">INFRASTRUCTURE</h3>
                    <ul className="space-y-2 text-white">
                      <li className="font-bold uppercase">• IPFS STORAGE</li>
                      <li className="font-bold uppercase">• DEX INTEGRATION</li>
                      <li className="font-bold uppercase">• DAO GOVERNANCE</li>
                      <li className="font-bold uppercase">• ORACLE FEEDS</li>
                    </ul>
                </div>
              </div>

                <div className="border-4 border-black bg-gray-100 p-6">
                  <h3 className="font-black uppercase mb-4">TOKENOMICS FORMULA</h3>
                  <code className="block bg-black text-[#DC143C] p-4 font-mono text-sm uppercase">
                    TOTAL_SUPPLY = 1,000,000 TOKENS<br/>
                    PRESALE = 30%<br/>
                    LIQUIDITY = 30%<br/>
                    REWARDS = 25%<br/>
                    TREASURY = 10%<br/>
                    TEAM = 5% (24-MONTH VESTING)
                  </code>
            </div>
          </div>
        </section>

            {/* Operations */}
            <section id="operations" className="mb-20">
              <div className="border-4 border-black bg-white p-8">
                <h2 className="text-4xl font-black font-serif uppercase mb-6">OPERATIONS</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-black uppercase mb-4">REVENUE MODEL</h3>
                    <div className="border-4 border-black overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#DC143C] text-white">
                            <th className="p-3 text-left font-black uppercase">SOURCE</th>
                            <th className="p-3 text-right font-black uppercase">ALLOCATION</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b-2 border-black">
                            <td className="p-3 font-bold uppercase">PRODUCT SALES</td>
                            <td className="p-3 text-right font-black">70%</td>
                          </tr>
                          <tr className="border-b-2 border-black">
                            <td className="p-3 font-bold uppercase">SERVICES</td>
                            <td className="p-3 text-right font-black">20%</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-bold uppercase">MERCHANDISE</td>
                            <td className="p-3 text-right font-black">10%</td>
                          </tr>
                        </tbody>
                      </table>
                </div>
              </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase mb-4">PROFIT DISTRIBUTION</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border-4 border-black p-4 text-center">
                        <div className="text-3xl font-black text-[#DC143C]">33%</div>
                        <div className="font-bold uppercase">Token Holders</div>
              </div>
                      <div className="border-4 border-black p-4 text-center">
                        <div className="text-3xl font-black">10%</div>
                        <div className="font-bold uppercase">Buyback</div>
            </div>
                      <div className="border-4 border-black p-4 text-center">
                        <div className="text-3xl font-black">57%</div>
                        <div className="font-bold uppercase">Reinvest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

            {/* Vision */}
            <section id="vision" className="mb-20">
              <div className="border-4 border-black bg-[#DC143C] p-8">
                <h2 className="text-4xl font-black font-serif text-white uppercase mb-6">LONG-TERM VISION</h2>
                
                <div className="space-y-6 text-white">
                  <p className="text-lg font-bold uppercase leading-relaxed">
                    By 2030, REBIRTH aims to power 10,000+ community-owned businesses globally,
                    creating a new economy where customers are owners and profits flow back to communities.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-4 border-white p-4">
                      <h3 className="font-black uppercase mb-2">5-YEAR GOALS</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="font-bold uppercase">• 1,000 STORES</li>
                        <li className="font-bold uppercase">• $1B MARKET CAP</li>
                        <li className="font-bold uppercase">• 1M TOKEN HOLDERS</li>
                        <li className="font-bold uppercase">• 50 COUNTRIES</li>
                      </ul>
                    </div>
                    <div className="border-4 border-white p-4">
                      <h3 className="font-black uppercase mb-2">IMPACT METRICS</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="font-bold uppercase">• $100M DISTRIBUTED</li>
                        <li className="font-bold uppercase">• 10K JOBS CREATED</li>
                        <li className="font-bold uppercase">• 100K ENTREPRENEURS</li>
                        <li className="font-bold uppercase">• CARBON NEUTRAL</li>
                      </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

            {/* Download Section */}
            <section className="text-center">
              <div className="border-4 border-black bg-white p-8">
                <h3 className="text-2xl font-black uppercase mb-4">DOWNLOAD FULL WHITEPAPER</h3>
                <p className="font-bold uppercase mb-6">
                  Get the complete 50-page document with detailed financials and technical specifications
                </p>
                <button className="px-8 py-4 border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-[0.2em] hover:bg-black hover:border-black transition-all">
                  DOWNLOAD PDF
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
              </div>
            </section>
          </main>
          </div>
      </div>
    </div>
  )
}