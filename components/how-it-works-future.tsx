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
      className="relative py-32 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Visionary Header */}
        <div className={cn(
          "text-center mb-24 transition-all duration-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full mb-8">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-mono text-gray-600">BRIDGING WORLDS</span>
            <Link2 className="w-4 h-4" />
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            The future is
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-900 to-gray-600">
              physical + digital
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building real-world stores with on-chain DNA. Not retrofitting old businesses with crypto - 
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
                  "w-full text-left p-8 transition-all duration-300 relative",
                  activePhase === index 
                    ? "bg-black text-white" 
                    : "hover:bg-gray-100",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className={cn(
                    "text-5xl font-bold opacity-20",
                    activePhase === index ? "text-white" : "text-gray-400"
                  )}>
                    {phase.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {phase.title}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      activePhase === index ? "text-gray-300" : "text-gray-500"
                    )}>
                      {phase.core}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {activePhase === index && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
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
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {phase.truth}
                    </p>

                    {/* Visual representation */}
                    <div className="p-10 bg-gray-50 rounded-2xl mb-8 border border-gray-200">
                      {phase.visual.type === "brands" && (
                        <div className="grid grid-cols-2 gap-4">
                          {phase.visual.items?.map((item, i) => (
                            <div 
                              key={i}
                              className="p-4 bg-white rounded-xl border border-gray-200"
                            >
                              <div className="font-mono font-bold text-xl text-gray-900 mb-1">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-600">
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
                              <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 font-medium text-gray-800">
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
                                className="flex items-center justify-center p-4 bg-white rounded-xl border-2 border-gray-300 font-medium text-gray-800"
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
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                          <span className="text-gray-700">
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
          <div className="p-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl">
            <h3 className="text-3xl font-bold mb-6">
              This is the future
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Not sitting behind desks trading derivatives. Building real stores, real brands, real experiences - 
              all running on blockchain rails. Every transaction on-chain. Every customer an owner. 
              Every profit distributed automatically.
            </p>
            <p className="text-xl text-white font-semibold">
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
            <button className="px-10 py-4 bg-black text-white font-bold hover:bg-gray-900 transition-all">
              Join the Revolution
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </Link>
          <Link href="/docs">
            <button className="px-10 py-4 border-2 border-black text-black font-bold hover:bg-gray-50 transition-all">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
