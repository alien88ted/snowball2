"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Globe, Store, Link2, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function HowItWorksFuture() {
  const [isVisible, setIsVisible] = useState(false)
  const [activePhase, setActivePhase] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const phases = [
    {
      number: "01",
      title: "We build branded stores",
      core: "Physical spaces, on-chain DNA",
      truth: "$COFFEE isn't just a token - it's an actual coffee shop we're building. $MARKET is a real supermarket. These are our brands, built from the ground up to live on-chain.",
      facts: [
        "Real physical locations",
        "Our brands, our stores",
        "Built for blockchain from day one"
      ],
      visual: {
        type: "brands",
        items: [
          { name: "$COFFEE", desc: "Specialty coffee shop" },
          { name: "$MARKET", desc: "Community supermarket" },
          { name: "$TECH", desc: "Electronics retail" },
          { name: "$FASHION", desc: "Streetwear store" }
        ]
      }
    },
    {
      number: "02", 
      title: "Token = Ownership",
      core: "Buy tokens, own the store",
      truth: "When you buy $COFFEE tokens, you're funding and owning the actual coffee shop. Every token is a piece of the physical store, the brand, the profits - everything.",
      facts: [
        "Tokens represent real equity",
        "Own part of physical + digital assets",
        "Governance over the brand"
      ],
      visual: {
        type: "bridge",
        physical: "Physical Store",
        digital: "On-chain Ownership",
        connection: "Tokens"
      }
    },
    {
      number: "03",
      title: "Customers become owners",
      core: "Shop and earn ownership",
      truth: "Buy a coffee, earn $COFFEE tokens. Shop at $MARKET, get $MARKET tokens. Every purchase makes customers part-owners. The more you use it, the more you own it.",
      facts: [
        "Rewards paid in ownership tokens",
        "Loyalty becomes equity",
        "Customers aligned with success"
      ],
      visual: {
        type: "flow",
        steps: ["Buy coffee", "Earn tokens", "Own the shop", "Share profits"]
      }
    },
    {
      number: "04",
      title: "Profits flow on-chain",
      core: "Monthly distributions, forever",
      truth: "Store makes money → Smart contract distributes profits → Token holders get paid. No banks, no delays, no bullshit. The physical and digital worlds united.",
      facts: [
        "Automated profit sharing",
        "Transparent on-chain accounting",
        "Physical business, digital dividends"
      ],
      visual: {
        type: "cycle",
        elements: ["Store Revenue", "Smart Contract", "Token Holders", "Reinvestment"]
      }
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: 'url("/paper-texture.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/93 via-[#FAF8F5]/88 to-white/92 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      {/* Ambient background shapes */}
      <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-black/[0.03] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-40 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-[#DC143C]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brutalist Header */}
        <div className={cn(
          "text-center mb-24 transition-all duration-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-sm font-mono text-[#DC143C] font-black">001</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">HOW IT WORKS</h3>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <span className="text-sm font-mono text-[#DC143C] font-black">001</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-serif font-black text-black mb-8 uppercase tracking-tight leading-[0.85]">
            The future is
            <span className="block text-[#DC143C] mt-2">
              physical + digital
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
            We're building real-world stores with on-chain DNA. Not retrofitting old businesses with crypto — 
            creating new brands where blockchain isn't an add-on, it's the foundation.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Phase Navigation */}
          <div className="space-y-1">
            {phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={cn(
                  "w-full text-left p-8 transition-all duration-300 relative border-2 border-black",
                  activePhase === index 
                    ? "bg-black text-white" 
                    : "bg-white hover:bg-[#DC143C] hover:text-white",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className={cn(
                    "text-5xl font-black",
                    activePhase === index ? "text-[#DC143C]" : "text-gray-300"
                  )}>
                    {phase.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                      {phase.title}
                    </h3>
                    <p className={cn(
                      "text-sm font-medium",
                      activePhase === index ? "text-gray-300" : "text-gray-600"
                    )}>
                      {phase.core}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {activePhase === index && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DC143C]" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Active Phase Details */}
          <div className="sticky top-32">
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              {phases.map((phase, phaseIndex) => (
                <div
                  key={phaseIndex}
                  className={cn(
                    "transition-all duration-500",
                    activePhase === phaseIndex ? "opacity-100" : "opacity-0 absolute pointer-events-none"
                  )}
                >
                  <div className="mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                      {phase.truth}
                    </p>

                    {/* Visual representation */}
                    <div className="p-10 bg-white border-2 border-black mb-8">
                      {phase.visual.type === "brands" && (
                        <div className="grid grid-cols-2 gap-4">
                          {phase.visual.items?.map((item, i) => (
                            <div 
                              key={i}
                              className="p-4 bg-white border-2 border-black hover:bg-black hover:text-white transition-all cursor-default"
                            >
                              <div className="font-mono font-black text-xl mb-1">
                                {item.name}
                              </div>
                              <div className="text-sm opacity-80">
                                {item.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {phase.visual.type === "bridge" && (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 text-center">
                            <Store className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                            <div className="font-semibold text-gray-900">
                              {phase.visual.physical}
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <Link2 className="w-8 h-8 text-gray-400 mb-1" />
                            <div className="text-sm text-gray-500">
                              {phase.visual.connection}
                            </div>
                          </div>
                          <div className="flex-1 text-center">
                            <Globe className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                            <div className="font-semibold text-gray-900">
                              {phase.visual.digital}
                            </div>
                          </div>
                        </div>
                      )}

                      {phase.visual.type === "flow" && (
                        <div className="flex items-center justify-between">
                          {phase.visual.steps?.map((step, i) => (
                            <div key={i} className="flex items-center">
                              {i > 0 && <ArrowRight className="w-6 h-6 text-gray-400 mx-2" />}
                              <div className="px-4 py-2 bg-white border-2 border-black font-black text-black uppercase tracking-wider text-sm">
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {phase.visual.type === "cycle" && (
                        <div className="relative">
                          <div className="grid grid-cols-2 gap-8">
                            {phase.visual.elements?.map((element, i) => (
                              <div 
                                key={i}
                                className="flex items-center justify-center p-4 bg-white border-2 border-black font-black text-black uppercase tracking-wider text-sm"
                              >
                                {element}
                              </div>
                            ))}
                          </div>
                          {/* Connecting arrows */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Zap className="w-8 h-8 text-gray-300" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Key Facts */}
                    <div className="space-y-3">
                      {phase.facts.map((fact, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-4"
                        >
                          <div className="w-2 h-2 bg-[#DC143C]" />
                          <span className="text-gray-700 font-medium">
                            {fact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className={cn(
          "mt-32 text-center max-w-4xl mx-auto",
          isVisible ? "opacity-100" : "opacity-0"
        )} style={{ transitionDelay: "800ms" }}>
          <div className="p-12 bg-black text-white border-4 border-black">
            <h3 className="text-4xl font-black mb-6 uppercase tracking-tight text-[#DC143C]">
              This is the future
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 font-medium">
              Not sitting behind desks trading derivatives. Building real stores, real brands, real experiences — 
              all running on blockchain rails. Every transaction on-chain. Every customer an owner. 
              Every profit distributed automatically.
            </p>
            <p className="text-2xl text-white font-black uppercase tracking-tight">
              The world is alive. We're making it programmable.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className={cn(
          "mt-16 flex flex-col sm:flex-row gap-4 justify-center",
          isVisible ? "opacity-100" : "opacity-0"
        )} style={{ transitionDelay: "900ms" }}>
          <Link href="/explorer">
            <button className="px-10 py-5 bg-[#DC143C] text-white font-black text-[13px] tracking-[0.25em] uppercase hover:bg-black transition-all">
              Join the Revolution
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </Link>
          <Link href="/docs">
            <button className="px-10 py-5 border-2 border-black text-black font-black text-[13px] tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
