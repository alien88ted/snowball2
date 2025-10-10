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
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Grid with Visual Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const isActive = index === activeIndex
            const accentColors = [
              "from-blue-500/10 via-cyan-500/5 to-blue-500/10",
              "from-pink-500/10 via-rose-500/5 to-pink-500/10",
              "from-purple-500/10 via-indigo-500/5 to-purple-500/10"
            ]
            const rotations = ["rotate-1", "-rotate-1", "rotate-0"]

            return (
              <div key={index} className="relative group/feat">
                {/* Corner Decorations - consistent sizing */}
                {isActive && (
                  <>
                    <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-opacity duration-300" />
                    <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-opacity duration-300" />
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-opacity duration-300" />
                    <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-opacity duration-300" />
                  </>
                )}

                <button
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-full p-10 rounded-3xl flex flex-col gap-5 text-left transition-all duration-500 overflow-hidden ${rotations[index]} hover:rotate-0 ${
                    isActive
                      ? "bg-card/90 backdrop-blur-xl border-2 border-primary/30 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.2)] scale-[1.03] -translate-y-2"
                      : "border-2 border-border/40 hover:border-primary/20 bg-card/50 backdrop-blur-md hover:shadow-[0_12px_40px_-10px_rgba(59,130,246,0.1)] hover:-translate-y-1"
                  }`}
                >
                  {/* Gradient Accent Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[index]} opacity-0 group-hover/feat:opacity-100 transition-opacity duration-500`} />

                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/feat:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative">
                    <div className={`text-6xl mb-3 transition-all duration-500 ${isActive ? "scale-125 rotate-12" : "group-hover/feat:scale-110"}`}>
                      {feature.emoji}
                    </div>
                    <h3 className="text-foreground text-2xl font-bold leading-tight font-serif tracking-[-0.01em] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-[15px] leading-[1.7]">
                      {feature.description}
                    </p>

                    {/* Active/Hover indicator */}
                    <div className={`mt-4 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 ${
                      isActive ? "w-16" : "w-0 group-hover/feat:w-12"
                    }`} />
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
