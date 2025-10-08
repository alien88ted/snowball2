"use client"

import { LivingAuroraCore } from "@/components/living-aurora-core"
export default function Hero2Page() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Dedicated Living Aurora Core scene */}
      <LivingAuroraCore intensity="high" hue={210} background="light" glints interact />

      {/* Overlay content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight">Living Aurora — Snow Mode</h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A single, living object. No clutter. Cinematic motion, snow-kissed glow, and premium light.
          </p>
        </div>

        {/* Frosted demo panel to feel the light behind content */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-2">Snow.fun Vision</h2>
          <p className="text-sm text-muted-foreground">
            Ownership as a living system. The aurora mirrors emergent collaboration—soft power, deep structure.
          </p>
        </div>
      </div>
    </div>
  )
}


