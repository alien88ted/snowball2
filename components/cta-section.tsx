"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { Zap, TrendingUp, Users } from "lucide-react"

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
    <div className="w-full relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="relative group/cta">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover/cta:border-primary/50" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover/cta:border-primary/50" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover/cta:border-accent/50" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover/cta:border-accent/50" />

          <div className="relative rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/50 to-card/60 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_60%)]" />
            <div className="absolute inset-0 border border-border/40 rounded-3xl shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]" />


            <div className="relative p-12 md:p-16 flex flex-col items-center gap-10">
              <div className="relative">
                <div className="relative px-6 py-3 bg-primary/10 rounded-full border border-primary/30">
                  <span className="text-sm font-bold text-primary">
                    First $NOW Launch: $COFFEE
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold leading-[1.1] font-serif tracking-[-0.03em] mb-8 relative">
                  <span className="absolute inset-0 blur-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent opacity-40" />
                  <span className="inline-block relative bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Join the Future.
                  </span>
                  <br />
                  <span className="inline-block relative text-primary mt-2 animate-[pulse_3s_ease-in-out_infinite]">
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
                    className="group relative h-16 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] will-change-transform"
                    style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, box-shadow 0.3s' }}
                  >
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
