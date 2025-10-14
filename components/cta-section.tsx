"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { Zap, TrendingUp, Users } from "lucide-react"
import { ExplorerCorners } from "./explorer-corners"

export function CTASection() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])

  // Ripple effect on click
  const createRipple = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id))
    }, 600)
  }

  // Magnetic cursor effect
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 100

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.25
      ctaRefs.current[index]!.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.02)`
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ctaRefs.current[index]) {
      ctaRefs.current[index]!.style.transform = 'translate(0, 0) scale(1)'
    }
  }

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background py-24 md:py-32">
      {/* Elite background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="relative group group/cta">
          <div className="relative rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(59,130,246,0.4)] hover:scale-[1.01]">
            {/* Glass morphism layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(59,130,246,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_100%,rgba(168,85,247,0.15),transparent_60%)]" />
            <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
            {/* 4 Corner decorations like explorer */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-[3px] border-l-[3px] border-primary/50 rounded-tl-2xl transition-all duration-500 group-hover/cta:border-primary/70 group-hover/cta:-top-5 group-hover/cta:-left-5" />
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-[3px] border-r-[3px] border-primary/50 rounded-tr-2xl transition-all duration-500 group-hover/cta:border-primary/70 group-hover/cta:-top-5 group-hover/cta:-right-5" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-[3px] border-l-[3px] border-accent/50 rounded-bl-2xl transition-all duration-500 group-hover/cta:border-accent/70 group-hover/cta:-bottom-5 group-hover/cta:-left-5" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-[3px] border-r-[3px] border-accent/50 rounded-br-2xl transition-all duration-500 group-hover/cta:border-accent/70 group-hover/cta:-bottom-5 group-hover/cta:-right-5" />


            <div className="relative p-12 md:p-16 flex flex-col items-center gap-10">
              <div className="relative">
                <div className="relative px-6 py-3 bg-primary/10 rounded-full border border-primary/30">
                  <span className="text-sm font-bold text-primary">
                    First $NOW Launch: $COFFEE
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold leading-[1.05] font-serif tracking-[-0.04em] mb-8 relative">
                  <span className="absolute inset-0 blur-3xl bg-gradient-to-br from-primary/15 via-accent/15 to-transparent opacity-60" />
                  <span className="inline-block relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Join the Future.
                  </span>
                  <br />
                  <span className="inline-block relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent mt-2 animate-gradient">
                    Invest $NOW.
                  </span>
                </h2>
                <p className="text-[19px] md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-[1.6] mb-6">
                  Be an early investor in $COFFEE - our first tokenized business launching in Beirut.
                </p>
                {/* Urgency indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">25% Early Bird Discount</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-semibold">Limited Supply</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-600 font-semibold">Presale Live Now</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl">
                <Link href="/explorer" className="flex-1">
                  <div
                    ref={el => ctaRefs.current[0] = el}
                    onMouseMove={(e) => handleMouseMove(e, 0)}
                    onMouseLeave={() => handleMouseLeave(0)}
                    onClick={(e) => createRipple(e, 0)}
                    className="group relative h-16 rounded-full overflow-hidden cursor-pointer bg-gradient-to-r from-black via-gray-900 to-black transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] will-change-transform hover:scale-[1.02] hover:-translate-y-0.5"
                    style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s' }}
                  >
                    {/* 4 Corner decorations for button - Premium style */}
                    <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-[2.5px] border-l-[2.5px] border-white/50 rounded-tl-lg transition-all duration-500 group-hover:border-white/80 group-hover:-top-2.5 group-hover:-left-2.5 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-[2.5px] border-r-[2.5px] border-white/50 rounded-tr-lg transition-all duration-500 group-hover:border-white/80 group-hover:-top-2.5 group-hover:-right-2.5 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-[2.5px] border-l-[2.5px] border-white/40 rounded-bl-lg transition-all duration-500 group-hover:border-white/70 group-hover:-bottom-2.5 group-hover:-left-2.5 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-[2.5px] border-r-[2.5px] border-white/40 rounded-br-lg transition-all duration-500 group-hover:border-white/70 group-hover:-bottom-2.5 group-hover:-right-2.5 group-hover:w-6 group-hover:h-6" />
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-20 rounded-full" />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    {/* Ripple effects */}
                    {ripples.map(ripple => (
                      <span
                        key={ripple.id}
                        className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 0,
                          height: 0,
                        }}
                      />
                    ))}
                    <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-[18px] tracking-[-0.01em]">
                      <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Invest in $COFFEE Now</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </div>
                  </div>
                </Link>

                <Link href="/explorer" className="flex-1">
                  <div
                    ref={el => ctaRefs.current[1] = el}
                    onMouseMove={(e) => handleMouseMove(e, 1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    className="group relative h-16 rounded-full overflow-hidden cursor-pointer border-2 border-border/60 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_16px_36px_-8px_rgba(59,130,246,0.25)] will-change-transform"
                    style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s' }}
                  >
                    {/* 4 Corner decorations for button */}
                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-lg transition-all duration-300 group-hover:border-primary/60 group-hover:-top-2 group-hover:-left-2" />
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-lg transition-all duration-300 group-hover:border-primary/60 group-hover:-top-2 group-hover:-right-2" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent/30 rounded-bl-lg transition-all duration-300 group-hover:border-accent/60 group-hover:-bottom-2 group-hover:-left-2" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent/30 rounded-br-lg transition-all duration-300 group-hover:border-accent/60 group-hover:-bottom-2 group-hover:-right-2" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-[18px] tracking-[-0.01em]">
                      <span>View Whitepaper</span>
                    </div>
                  </div>
                </Link>
              </div>

              <style jsx>{`
                @keyframes ripple {
                  to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                    transform: translate(-50%, -50%);
                  }
                }

                @keyframes shimmer {
                  0% { background-position: -200% center; }
                  100% { background-position: 200% center; }
                }
              `}</style>

              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border/60">
                {[
                  { icon: "✓", text: "$500K Target" },
                  { icon: "✓", text: "Beirut Location" },
                  { icon: "✓", text: "Opening 2025" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 flex items-center justify-center text-primary text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                      {item.icon}
                    </div>
                    <span className="text-[15px] text-muted-foreground/80 font-medium group-hover:text-foreground transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
