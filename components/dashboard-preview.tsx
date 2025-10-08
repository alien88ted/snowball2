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
      title: "Customer Rewards",
      description: "Buy a coffee, get $COFFEE tokens. Every purchase makes you a partial owner of the coffee shop. Treasury funds customer rewards.",
      stat: "33%",
      statLabel: "Treasury for Rewards"
    },
    {
      title: "Employee Payments",
      description: "Baristas and staff earn $COFFEE tokens as salary. Employees become stakeholders, aligning incentives with business success.",
      stat: "100%",
      statLabel: "Token-Based Pay"
    },
    {
      title: "Community Ownership",
      description: "500K presale target to open first branch in Beirut. 33% liquidity, 33% rewards, 33% presale, 1% team. True shared ownership.",
      stat: "$500K",
      statLabel: "Funding Goal"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>

          {/* Title */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 font-serif tracking-tighter">
              <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                How $NOW Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See it in action with $COFFEE - our first presale launching on the $NOW platform.
              A real coffee shop where every purchase makes you an owner.
            </p>
          </div>

          {/* Main Interactive Card with Corner Decorations */}
          <div className="relative mb-12">
            {/* Corner Decorations */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl" />

            <div className="relative bg-card/60 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-border/40 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-border/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
                {content.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 px-6 py-5 text-base font-semibold transition-all relative ${
                      activeTab === idx
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.title}
                    {activeTab === idx && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-10 md:p-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-4xl font-bold mb-6 font-serif tracking-tight">{content[activeTab].title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {content[activeTab].description}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="inline-block p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border/40 shadow-lg shadow-primary/5">
                      <div className="text-7xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-3 font-serif">
                        {content[activeTab].stat}
                      </div>
                      <div className="text-base text-muted-foreground font-semibold tracking-wide">
                        {content[activeTab].statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Platforms", value: "tZERO, Polymath" },
              { label: "Compliant", value: "SEC Regulated" },
              { label: "Adoption", value: "BlackRock ↗" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/40 transition-all duration-300 text-center cursor-pointer hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-wider">{stat.label}</div>
                <div className="font-bold text-base group-hover:text-primary transition-colors">{stat.value}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
