"use client"

import { useState, useEffect, useRef } from "react"

export function DashboardPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [visibleElements, setVisibleElements] = useState<boolean[]>([false, false, false, false])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stagger animations for child elements
          const delays = [0, 150, 300, 450]
          delays.forEach((delay, index) => {
            setTimeout(() => {
              setVisibleElements(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, delay)
          })
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = [
    {
      title: "1. Customer Loyalty Engine",
      description: "Buy coffee, earn $COFFEE tokens automatically. 33% treasury allocation means millions of tokens distributed to customers over time. Creates viral growth loop: customers become owners, owners bring more customers.",
      stat: "33%",
      statLabel: "Treasury for Rewards",
      benefit: "Drives recurring revenue + word-of-mouth growth"
    },
    {
      title: "2. Employee Alignment",
      description: "Staff paid partially in $COFFEE tokens. When business thrives, tokens appreciate. Employees have skin in the game. Reduces churn, increases service quality, creates culture of ownership not employment.",
      stat: "100%",
      statLabel: "Incentive Alignment",
      benefit: "Lower costs + higher quality service"
    },
    {
      title: "3. Fast Capital Raising",
      description: "$500K target reached through global community presale. No VC dilution. No bank loans. Token holders become evangelists. 33% liquidity ensures tradeable market. Repeatable model for scaling to new locations.",
      stat: "$500K",
      statLabel: "Community Funded",
      benefit: "No debt + built-in marketing army"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.03)_25%,transparent_25%,transparent_75%,rgba(168,85,247,0.03)_75%)] bg-[size:60px_60px] animate-slide-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.06),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-accent/60 to-primary/40" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent/40 via-primary/60 to-accent/40" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div>
          {/* Asymmetric Title Layout - Left Aligned with Decorative Element */}
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Decorative Number */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-32">
                <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center transition-all duration-700 ${
                  visibleElements[0] ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'
                }`}>
                  <div className="absolute inset-2 rounded-2xl bg-background/80 backdrop-blur-sm" />
                  <span className="relative text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">3</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 mb-6">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">The $NOW Mechanism</span>
              </div>
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif tracking-[-0.02em] leading-[1.05] transition-all duration-700 ${
                visibleElements[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <span className="block mb-2">
                  <span className="bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
                    Three Ways
                  </span>
                </span>
                <span className="block text-muted-foreground/60 text-4xl md:text-5xl">
                  Tokens Create Value
                </span>
              </h2>
              <p className={`text-lg md:text-xl text-muted-foreground/80 max-w-3xl leading-[1.7] transition-all duration-700 delay-100 ${
                visibleElements[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                $COFFEE demonstrates the complete $NOW model: <span className="font-semibold text-foreground">customer rewards</span> drive foot traffic,
                <span className="font-semibold text-foreground"> employee ownership</span> aligns incentives, and <span className="font-semibold text-foreground">community funding</span> scales faster than traditional VC.
              </p>
            </div>
          </div>

          {/* Main Interactive Card with Corner Decorations */}
          <div className={`relative mb-12 group/card transition-all duration-700 ${
            visibleElements[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {/* Corner Decorations */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover/card:border-primary/50" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover/card:border-primary/50" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover/card:border-accent/50" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover/card:border-accent/50" />

            <div className="relative bg-card/60 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(59,130,246,0.1)] border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.2)] hover:border-border/70">
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

              {/* Content - Enhanced Typography */}
              <div className="p-10 md:p-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-4xl font-bold mb-6 font-serif tracking-[-0.01em] leading-[1.15]">{content[activeTab].title}</h3>
                    <p className="text-muted-foreground/80 text-[17px] leading-[1.7] mb-6">
                      {content[activeTab].description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">→</span>
                      </div>
                      <span className="text-sm font-semibold text-green-900">{content[activeTab].benefit}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="inline-block p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border/50 shadow-lg shadow-primary/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-border/70">
                      <div className="text-7xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-3 font-serif tracking-[-0.02em] leading-none">
                        {content[activeTab].stat}
                      </div>
                      <div className="text-base text-muted-foreground/80 font-semibold tracking-[0.03em]">
                        {content[activeTab].statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Proposition Summary - Enhanced */}
          <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-purple-50/50 to-blue-50/50 border-2 border-purple-200/40">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 font-serif">Why This Model Wins</h3>
              <p className="text-muted-foreground/80 text-lg">Traditional businesses can't compete with token-powered growth loops</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Traditional Cafe",
                  value: "Pay for customers",
                  icon: "📉",
                  color: "text-red-600"
                },
                {
                  label: "$NOW Cafe",
                  value: "Customers pay YOU",
                  icon: "📈",
                  color: "text-green-600"
                },
                {
                  label: "Result",
                  value: "10x growth velocity",
                  icon: "⚡",
                  color: "text-primary"
                }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/50 transition-all duration-700 text-center cursor-pointer hover:shadow-lg hover:shadow-primary/8 hover:translate-y-[-2px] ${
                    visibleElements[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div className="text-sm text-muted-foreground/70 mb-3 font-medium uppercase tracking-[0.08em]">{stat.label}</div>
                  <div className={`font-bold text-lg ${stat.color} transition-colors duration-300`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes slide-slow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }
        .animate-slide-slow {
          animation: slide-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
