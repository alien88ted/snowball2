"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LivingAuroraCore } from "@/components/living-aurora-core"
import { SnowAuraBackground } from "@/components/snow-aura-background"
export default function Hero2Page() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ultra-performant CSS snow aura background */}
      <SnowAuraBackground />
      {/* Light aurora core layer for depth */}
      <LivingAuroraCore intensity="med" hue={210} background="none" glints={false} interact={false} />

      {/* Content aligned with landing hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 md:pt-32 pb-20">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="max-w-4xl flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight">
              <span className="block">Snow Aura.</span>
              <span className="block mt-2">Own Together.</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-base sm:text-lg md:text-xl">
              A living, low-lag aurora crafted for readability and elegance. Real-time depth without distraction.
            </p>

            {/* CTA Buttons (match landing) */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/explorer/create">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-black text-white hover:bg-gray-900 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Building
                </Button>
              </Link>
              <Link href="/explorer">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-br hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 hover:border-pink-200/50 hover:text-gray-900 hover:shadow-md hover:shadow-pink-100/50 font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Trust Indicators (match landing) */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-2">
              {["Real business equity","Customer ownership","Employee token rewards"].map((t, i) => (
                <span key={i} className="text-sm text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>

          {/* Frosted panel demo */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-2">Design notes</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 text-left">
              <li>CSS-driven auras for zero-js-loop motion.</li>
              <li>Light aurora layer is throttled and adaptive to remain smooth.</li>
              <li>Optimized for white backgrounds and serif hero style.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


