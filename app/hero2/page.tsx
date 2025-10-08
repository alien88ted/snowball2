"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Premium3DBackground } from "@/components/premium-3d-background"
import { FrostOrbBackground } from "@/components/frost-orb-background"
import { UnifiedBackground } from "@/components/unified-background"
import { HeroBackground } from "@/components/hero-background"
import { LivingAuroraCore } from "@/components/living-aurora-core"

type BgKey = "premium" | "frost" | "unified" | "strands" | "living"

export default function Hero2Page() {
  const [bg, setBg] = useState<BgKey>("premium")

  return (
    <div className="relative min-h-screen bg-background">
      {/* Backgrounds */}
      {bg === "premium" && <Premium3DBackground />}
      {bg === "frost" && <FrostOrbBackground />}
      {bg === "unified" && <UnifiedBackground />}
      {bg === "strands" && <HeroBackground />}
      {bg === "living" && (
        <LivingAuroraCore intensity="high" hue={210} stars embers />
      )}

      {/* Overlay content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight">Hero Background v2</h1>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Explore premium, performant background styles designed for clarity and smoothness.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button variant={bg === "premium" ? "default" : "outline"} onClick={() => setBg("premium")}>Premium 3D</Button>
          <Button variant={bg === "frost" ? "default" : "outline"} onClick={() => setBg("frost")}>Frost Orbs</Button>
          <Button variant={bg === "unified" ? "default" : "outline"} onClick={() => setBg("unified")}>Aurora Orbs</Button>
          <Button variant={bg === "strands" ? "default" : "outline"} onClick={() => setBg("strands")}>Elegant Strands</Button>
          <Button variant={bg === "living" ? "default" : "outline"} onClick={() => setBg("living")}>Living Aurora Core</Button>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-2">Design notes</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>All effects are GPU-friendly and pause offscreen or on reduced motion.</li>
            <li>Colors blend softly behind content for readable foreground contrast.</li>
            <li>Animations are throttled to keep interactions snappy.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


