"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Code, Layers, Rocket } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DocsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

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
      {/* Subtle noise overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-black text-[#DC143C] tracking-[0.3em] mb-6 uppercase">REBIRTH MANUAL</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-serif tracking-tight mb-6 text-black uppercase">
                DOCUMENTATION
              </h1>
              <p className="text-base md:text-lg text-black font-bold max-w-2xl mx-auto uppercase tracking-wider">
                Everything you need to build tokenized projects with REBIRTH.
                Launch · Explore · Create · OWN.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative group">
                  <div className="border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white">
                    <div className="pb-3 p-10 border-b-2 border-black">
                      <h3 className="text-xl font-black font-serif tracking-tight uppercase">Navigation</h3>
                    </div>
                    <div className="space-y-0">
                      {[
                        { id: "overview", label: "OVERVIEW" },
                        { id: "landing", label: "LANDING PAGE" },
                        { id: "explorer", label: "EXPLORER" },
                        { id: "create", label: "CREATE FLOW" },
                      ].map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={() => setActiveSection(item.id)}
                          className={cn(
                            "block px-10 py-4 text-base transition-all duration-300 font-black uppercase tracking-wider border-b-2 border-black last:border-0",
                            activeSection === item.id
                              ? "bg-[#DC143C] text-white"
                              : "text-black hover:bg-black hover:text-white"
                          )}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-24">
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-24 relative">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-4 text-black uppercase">Getting Started</h2>
                  <p className="text-black font-bold text-base md:text-lg uppercase tracking-wider">
                    Build the future of collaborative ownership with tokenized projects.
                  </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3 mb-12">
                  {[
                    {
                      icon: <Code className="h-6 w-6" />,
                      title: "NO CODE",
                      desc: "LAUNCH IN MINUTES WITHOUT WRITING CODE"
                    },
                    {
                      icon: <Layers className="h-6 w-6" />,
                      title: "TOKEN ECONOMICS",
                      desc: "BUILT-IN TOKENOMICS WITH EQUITY"
                    },
                    {
                      icon: <Rocket className="h-6 w-6" />,
                      title: "COMMUNITY FIRST",
                      desc: "TRUE SHARED OWNERSHIP FOR ALL"
                    }
                  ].map((feature, i) => (
                    <div key={i} className="relative group">
                      <div className="border-4 border-black transition-all duration-300 hover:bg-[#DC143C] hover:text-white bg-white h-full">
                        <div className="p-10">
                          <div className="mb-4 text-[#DC143C] group-hover:text-white transition-transform duration-300 group-hover:scale-110">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-black font-serif tracking-tight mb-3 uppercase">{feature.title}</h3>
                          <p className="text-sm font-bold uppercase">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/explorer" className="flex-1">
                    <button className="group w-full h-14 border-4 border-black bg-white text-black text-base font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white">
                      BROWSE PROJECTS
                      <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
                  </Link>
                  <Link href="/explorer/create" className="flex-1">
                    <button className="group w-full h-14 bg-[#DC143C] text-white text-base font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black border-4 border-[#DC143C] hover:border-black">
                      START BUILDING
                      <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
                  </Link>
                </div>
              </section>

              {/* Divider */}
              <div className="h-[4px] bg-black" />

              {/* Landing Section */}
              <section id="landing" className="scroll-mt-24 relative">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-4 text-black uppercase">Landing Page</h2>
                  <p className="text-black font-bold text-base md:text-lg uppercase tracking-wider">
                    Your project's first impression - make it count.
                  </p>
                </div>

                <div className="relative group">
                  <div className="border-4 border-black transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="p-12 pb-8 border-b-4 border-black">
                      <h3 className="text-2xl font-black font-serif tracking-tight uppercase">Key Components</h3>
                      <p className="text-base mt-3 font-bold uppercase">Essential sections for high-converting landing pages</p>
                    </div>
                    <div className="space-y-6 px-12 pb-12 pt-8">
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white group/item">
                        <h4 className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Hero Section</h4>
                        <p className="text-sm font-bold uppercase">
                          Bold headline with clear value proposition and prominent CTAs above the fold.
                        </p>
                      </div>
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white group/item">
                        <h4 className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Token Preview Cards</h4>
                        <p className="text-sm font-bold uppercase">
                          Showcase live projects with real-time data, prices, and market activity.
                        </p>
                      </div>
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white group/item">
                        <h4 className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Trust Indicators</h4>
                        <p className="text-sm font-bold uppercase">
                          Social proof, security badges, and community stats to build credibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="h-[4px] bg-black" />

              {/* Explorer Section */}
              <section id="explorer" className="scroll-mt-24 relative">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-4 text-black uppercase">Explorer</h2>
                  <p className="text-black font-bold text-base md:text-lg uppercase tracking-wider">
                    Discover and invest in tokenized projects.
                  </p>
                </div>

                <div className="relative group">
                  <div className="border-4 border-black transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="p-12 pb-8 border-b-4 border-black">
                      <h3 className="text-2xl font-black font-serif tracking-tight uppercase">Discovery Features</h3>
                      <p className="text-base mt-3 font-bold uppercase">Tools to find the perfect projects</p>
                    </div>
                    <div className="space-y-6 px-12 pb-12 pt-8">
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white">
                        <p className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Smart Search</p>
                        <p className="text-sm font-bold uppercase">Search across names, descriptions, and categories</p>
                      </div>
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white">
                        <p className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Advanced Filters</p>
                        <p className="text-sm font-bold uppercase">Filter by category, price range, market cap, and more</p>
                      </div>
                      <div className="p-6 border-4 border-black bg-white transition-all duration-300 hover:bg-[#DC143C] hover:text-white">
                        <p className="text-lg font-black font-serif tracking-tight mb-3 uppercase">Sorting Options</p>
                        <p className="text-sm font-bold uppercase">Sort by trending, holders, volume, or recent activity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="h-[4px] bg-black" />

              {/* Create Section */}
              <section id="create" className="scroll-mt-24 relative">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-4 text-black uppercase">Create Flow</h2>
                  <p className="text-black font-bold text-base md:text-lg uppercase tracking-wider">
                    Launch your tokenized project in three simple steps.
                  </p>
                </div>

                <div className="relative group">
                  <div className="border-4 border-black transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="p-12 pb-8 border-b-4 border-black">
                      <h3 className="text-2xl font-black font-serif tracking-tight uppercase">Launch Process</h3>
                      <p className="text-base mt-3 font-bold uppercase">From idea to live project</p>
                    </div>
                    <div className="px-12 pb-12 pt-8">
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full h-14 bg-black p-0 border-4 border-black">
                          <TabsTrigger value="details" className="text-base font-black uppercase data-[state=active]:bg-[#DC143C] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-black transition-all duration-300 rounded-none">1. DETAILS</TabsTrigger>
                          <TabsTrigger value="tokenomics" className="text-base font-black uppercase data-[state=active]:bg-[#DC143C] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-black transition-all duration-300 rounded-none">2. TOKENOMICS</TabsTrigger>
                          <TabsTrigger value="preview" className="text-base font-black uppercase data-[state=active]:bg-[#DC143C] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-black transition-all duration-300 rounded-none">3. LAUNCH</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-8 space-y-0">
                          <div className="p-8 border-4 border-black bg-white">
                            <h4 className="text-xl font-black font-serif tracking-tight mb-4 uppercase">Project Information</h4>
                            <p className="text-base font-bold mb-6 uppercase">
                              Name your project, write a compelling description, choose a category, and select your branding.
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <span className="px-4 py-2 bg-[#DC143C] text-white border-4 border-[#DC143C] text-sm font-black uppercase">NAME</span>
                              <span className="px-4 py-2 bg-black text-white border-4 border-black text-sm font-black uppercase">DESCRIPTION</span>
                              <span className="px-4 py-2 bg-white text-black border-4 border-black text-sm font-black uppercase">CATEGORY</span>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="tokenomics" className="mt-8 space-y-0">
                          <div className="p-8 border-4 border-black bg-white">
                            <h4 className="text-xl font-black font-serif tracking-tight mb-4 uppercase">Token Configuration</h4>
                            <p className="text-base font-bold mb-6 uppercase">
                              Set your token symbol, initial supply, price per token, and equity percentage for holders.
                            </p>
                            <div className="grid grid-cols-2 gap-6 text-base">
                              <div className="p-4 border-2 border-black bg-white">
                                <span className="text-gray-600 font-bold uppercase">Symbol:</span> <span className="font-black text-[#DC143C]">REBIRTH</span>
                              </div>
                              <div className="p-4 border-2 border-black bg-white">
                                <span className="text-gray-600 font-bold uppercase">Supply:</span> <span className="font-black text-[#DC143C]">1,000,000</span>
                              </div>
                              <div className="p-4 border-2 border-black bg-white">
                                <span className="text-gray-600 font-bold uppercase">Price:</span> <span className="font-black text-[#DC143C]">$0.10</span>
                              </div>
                              <div className="p-4 border-2 border-black bg-white">
                                <span className="text-gray-600 font-bold uppercase">Equity:</span> <span className="font-black text-[#DC143C]">25%</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="preview" className="mt-8 space-y-0">
                          <div className="p-8 border-4 border-black bg-white">
                            <h4 className="text-xl font-black font-serif tracking-tight mb-4 uppercase">Review & Launch</h4>
                            <p className="text-base font-bold mb-8 uppercase">
                              Preview your project card, review all details, and launch to the marketplace.
                            </p>
                            <Link href="/explorer/create">
                              <button className="group w-full h-14 bg-[#DC143C] hover:bg-black text-white text-base font-black uppercase tracking-[0.2em] transition-all duration-300 border-4 border-[#DC143C] hover:border-black">
                                START CREATING NOW
                                <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-x-2" />
                              </button>
                            </Link>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}