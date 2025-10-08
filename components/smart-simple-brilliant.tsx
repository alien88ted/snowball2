"use client"

import { useState, useEffect } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

export function SmartSimpleBrilliant() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    let raf = 0
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setMousePosition({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion])

  const features = [
    {
      icon: "🏪",
      title: "Real Business",
      description: "Physical locations, real revenue",
      gradient: "from-blue-400 via-cyan-300 to-blue-500",
      color: "blue",
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Anyone can invest from anywhere",
      gradient: "from-pink-400 via-rose-300 to-pink-500",
      color: "pink",
    },
    {
      icon: "📈",
      title: "Aligned Incentives",
      description: "Everyone wins when business grows",
      gradient: "from-purple-400 via-indigo-300 to-purple-500",
      color: "purple",
    },
  ]

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_60%)]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-[200px] font-bold text-foreground select-none">$NOW</div>
          </div>

          <div className="relative">
            <h2 className="text-7xl md:text-8xl font-bold mb-6 font-serif tracking-[-0.02em] leading-[1.1]">
              <span className="inline-block bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Real
              </span>
              <span className="inline-block mx-4 text-border/60">·</span>
              <span className="inline-block bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Global
              </span>
              <span className="inline-block mx-4 text-border/60">·</span>
              <span className="inline-block bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Aligned
              </span>
            </h2>
            <p className="text-[19px] md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-[1.6]">
              Revolutionary business ownership through tokenization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: hoveredIndex === index ? "translateY(-8px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Corner Decorations */}
              {hoveredIndex === index && (
                <>
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl transition-opacity duration-300" />
                  <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl transition-opacity duration-300" />
                  <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-3xl transition-opacity duration-300" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-3xl transition-opacity duration-300" />
                </>
              )}

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card/70 to-card/30 backdrop-blur-2xl" />
              <div className="absolute inset-0 rounded-3xl border-2 border-border/40" />

              {hoveredIndex === index && !prefersReducedMotion && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div
                    className={`absolute inset-[-2px] bg-gradient-to-r ${feature.gradient} opacity-50 blur-sm animate-spin-slow`}
                  />
                </div>
              )}

              <div className="relative h-full p-12 flex flex-col items-center text-center gap-6">
                <div className="relative">
                  {!prefersReducedMotion && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl scale-150 animate-pulse" />
                  )}
                  <div
                    className={`
                      relative w-28 h-28 rounded-2xl bg-gradient-to-br ${feature.gradient}
                      flex items-center justify-center text-6xl
                      shadow-2xl shadow-${feature.color}-500/30
                      transition-all duration-500
                      ${hoveredIndex === index ? "rotate-12 scale-110 shadow-${feature.color}-500/50" : "rotate-0 scale-100"}
                    `}
                    style={{
                      boxShadow: hoveredIndex === index
                        ? `0 25px 50px -12px ${feature.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : feature.color === 'pink' ? 'rgba(236, 72, 153, 0.5)' : 'rgba(168, 85, 247, 0.5)'}`
                        : `0 20px 25px -5px ${feature.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : feature.color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm" />
                    <span className="relative z-10">{feature.icon}</span>
                  </div>

                  {hoveredIndex === index && !prefersReducedMotion && (
                    <>
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-orbit" />
                      <div className="absolute top-1/2 right-0 w-2 h-2 bg-accent rounded-full animate-orbit-reverse" />
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl font-bold text-foreground relative inline-block font-serif tracking-[-0.01em] leading-[1.2]">
                    {feature.title}
                    <div
                      className={`
                        absolute -bottom-2 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-full
                        transition-all duration-300
                        ${hoveredIndex === index ? "w-full" : "w-0"}
                      `}
                    />
                  </h3>
                  <p className="text-[17px] text-muted-foreground/80 leading-[1.6]">{feature.description}</p>
                </div>

                <div className="mt-auto pt-6">
                  <div
                    className={`
                      text-2xl transition-all duration-300
                      ${hoveredIndex === index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
                    `}
                  >
                    ↓
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative group/stats">
          {/* Corner Decorations for Stats Card */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover/stats:border-primary/50" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover/stats:border-primary/50" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover/stats:border-accent/50" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover/stats:border-accent/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl" />
          <div className="relative bg-card/40 backdrop-blur-2xl border-2 border-border/50 rounded-3xl p-16 shadow-xl shadow-purple-500/5 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-border/70">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { value: "$500K", label: "First Launch", icon: "🚀" },
                { value: "33%", label: "Treasury", icon: "💎" },
                { value: "100%", label: "Token Pay", icon: "🤝" },
                { value: "2025", label: "Opening", icon: "⚡" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-125">
                    {stat.icon}
                  </div>
                  <div className="text-6xl font-bold text-foreground mb-3 font-serif tracking-[-0.02em] leading-none">{stat.value}</div>
                  <div className="text-sm text-muted-foreground/70 uppercase tracking-[0.08em] font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        @keyframes orbit-reverse {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(50px) rotate(360deg);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
