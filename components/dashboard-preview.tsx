"use client"

import { useState, useEffect, useRef } from "react"

export function DashboardPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = [
    {
      title: "Issue Tokens",
      description: "Companies create digital tokens representing ownership stakes. Held in blockchain wallets, not brokerage accounts.",
      stat: "24/7",
      statLabel: "Trading"
    },
    {
      title: "Smart Contracts",
      description: "Automated code manages dividends, voting rights, and corporate actions. No intermediaries needed.",
      stat: "100%",
      statLabel: "Automated"
    },
    {
      title: "Fractional Ownership",
      description: "Own fractions of shares. Lower barriers to entry, increased liquidity, borderless access.",
      stat: "$1",
      statLabel: "Min Entry"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>

          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              Tokenized Equity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Digital shares on blockchain. Real ownership, programmable rights.
            </p>
          </div>

          {/* Main Interactive Card */}
          <div className="relative bg-card/60 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-border/40 overflow-hidden mb-8">

            {/* Tabs */}
            <div className="flex border-b border-border/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
              {content.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative ${
                    activeTab === idx
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.title}
                  {activeTab === idx && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{content[activeTab].title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {content[activeTab].description}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/40">
                    <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                      {content[activeTab].stat}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {content[activeTab].statLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Platforms", value: "tZERO, Polymath" },
              { label: "Compliant", value: "SEC Regulated" },
              { label: "Adoption", value: "BlackRock ↗" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border/30 hover:border-border/50 transition-all text-center"
              >
                <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                <div className="font-semibold text-sm">{stat.value}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
