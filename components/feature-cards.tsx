"use client"

import { useState, useEffect } from "react"

export function FeatureCards() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const features = [
    {
      title: "Build snowball apps",
      description: "Create delightful winter-themed apps with our intuitive builder and playful components.",
      emoji: "⛄",
    },
    {
      title: "Deploy instantly",
      description: "Launch your snowball apps to the world with zero configuration and maximum fun.",
      emoji: "🚀",
    },
    {
      title: "Share with friends",
      description: "Let others discover and enjoy your creations in the snow.fun explorer.",
      emoji: "🎿",
    },
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((prev) => (prev + 1) % features.length)
      setProgress(0)
    }
  }, [progress, features.length])

  return (
    <section className="border-t border-border border-b border-border">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          {features.map((feature, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setProgress(0)
                }}
                className={`p-6 flex flex-col gap-2 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-card border border-border shadow-sm scale-[1.02]"
                    : "border border-border/80 hover:border-border hover:bg-card/50"
                }`}
              >
                {isActive && (
                  <div className="space-y-1 mb-2">
                    <div className="w-full h-0.5 bg-foreground/8 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className={`text-3xl mb-2 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                  {feature.emoji}
                </div>
                <h3 className="text-foreground text-sm font-semibold leading-6">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-[22px]">{feature.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
