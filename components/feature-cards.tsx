"use client"

import { useState } from "react"

export function FeatureCards() {
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      title: "Launch on $NOW",
      description: "Follow $COFFEE's lead. Use the $NOW platform to tokenize any real business with community presales and shared ownership.",
      emoji: "🚀",
    },
    {
      title: "Treasury Rewards",
      description: "33% treasury allocation like $COFFEE. Automatically reward customers with tokens for every purchase they make.",
      emoji: "💎",
    },
    {
      title: "Token Economy",
      description: "Pay employees in tokens, reward loyalty, build community. The $NOW model aligns everyone's incentives.",
      emoji: "🤝",
    },
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.03),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isActive = index === activeIndex
            return (
              <div key={index} className="relative">
                {/* Corner Decorations - only on active card */}
                {isActive && (
                  <>
                    <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-opacity duration-300" />
                    <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-opacity duration-300" />
                    <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-opacity duration-300" />
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-opacity duration-300" />
                  </>
                )}

                <button
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-full p-10 rounded-2xl flex flex-col gap-4 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-card/80 backdrop-blur-sm border-2 border-border shadow-xl shadow-primary/10 scale-[1.02]"
                      : "border-2 border-border/60 hover:border-border hover:bg-card/40 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5"
                  }`}
                >
                  <div className={`text-5xl mb-3 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                    {feature.emoji}
                  </div>
                  <h3 className="text-foreground text-xl font-bold leading-tight font-serif">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Active indicator line */}
                  {isActive && (
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
