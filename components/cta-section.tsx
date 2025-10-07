"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

export function CTASection() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setMounted(true)
    const count = prefersReducedMotion ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 24)
    const flakes = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }))
    setSnowflakes(flakes)
  }, [prefersReducedMotion])

  return (
    <div className="w-full relative overflow-hidden bg-background py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {mounted && snowflakes.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute animate-fall"
              style={{
                left: `${flake.left}%`,
                animationDelay: `${flake.delay}s`,
                animationDuration: `${flake.duration}s`,
                top: "-50px",
                fontSize: `${16 + Math.random() * 16}px`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl" />

          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/50 to-card/60 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_60%)]" />
            <div className="absolute inset-0 border border-border/40 rounded-3xl shadow-2xl shadow-blue-500/10" />

            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
            </div>

            <div className="relative p-16 md:p-20 flex flex-col items-center gap-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full border border-primary/30 backdrop-blur-sm">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Get Started Today
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold leading-tight font-serif tracking-tighter mb-6">
                  <span className="inline-block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Ready to have
                  </span>
                  <br />
                  <span className="inline-block relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 bg-clip-text text-transparent blur-lg opacity-50" />
                    <span className="relative bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                      snow fun?
                    </span>
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join thousands building delightful experiences
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                <Link href="/explorer" className="flex-1">
                  <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x" />
                    <div className="absolute inset-[2px] bg-primary rounded-full transition-all duration-300 group-hover:bg-transparent" />
                    <div className="relative h-full flex items-center justify-center gap-3 text-primary-foreground font-bold text-lg transition-all duration-300 group-hover:scale-105">
                      <span>Start Building</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </div>
                  </div>
                </Link>

                <Link href="/explorer" className="flex-1">
                  <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                    <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-lg">
                      <span>View Examples</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border/50">
                {[
                  { icon: "✓", text: "Free to start" },
                  { icon: "✓", text: "No credit card" },
                  { icon: "✓", text: "5 min setup" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
