"use client"

import { useEffect, useRef } from "react"

// SnowAuraBackground: zero-canvas, zero-animation-loop. Pure CSS transforms with tiny JS tick via CSS animation only.
// Goals: ultra-smooth, minimal GPU, beautiful on white, matches snow.fun vibe.
export function SnowAuraBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Nothing to do; all motion is CSS-driven. Keep effect mount-only.
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft radial auras */}
      <div className="absolute -top-40 -left-32 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)] blur-3xl animate-sway-slow" />
      <div className="absolute -bottom-48 -right-28 w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_60%)] blur-3xl animate-sway-med" />
      <div className="absolute top-1/3 -left-20 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_60%)] blur-3xl animate-sway-fast" />

      {/* Frost arcs (pure CSS conic gradients) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vmin] h-[85vmin] rounded-full opacity-70 animate-rotate-slow"
        style={{
          background: "conic-gradient(from 0deg, rgba(255,255,255,0.0) 0deg, rgba(146,197,255,0.18) 30deg, rgba(255,255,255,0.0) 120deg, rgba(255,255,255,0.0) 360deg)"
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vmin] h-[95vmin] rounded-full opacity-60 animate-rotate-rev"
        style={{
          background: "conic-gradient(from 180deg, rgba(255,255,255,0.0) 0deg, rgba(173,216,255,0.16) 40deg, rgba(255,255,255,0.0) 110deg, rgba(255,255,255,0.0) 360deg)"
        }}
      />

      {/* Grain to fight banding (subtle) */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay grain" />

      <style jsx>{`
        @keyframes swaySlow { from { transform: translateY(-1.5%) translateX(0%); } to { transform: translateY(1.5%) translateX(1%); } }
        @keyframes swayMed { from { transform: translateY(1%) translateX(-1%); } to { transform: translateY(-1%) translateX(0%); } }
        @keyframes swayFast { from { transform: translateY(0.5%) translateX(0.5%); } to { transform: translateY(-0.5%) translateX(-0.5%); } }
        @keyframes spinSlow { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spinRev { from { transform: translate(-50%,-50%) rotate(360deg); } to { transform: translate(-50%,-50%) rotate(0deg); } }
        .animate-sway-slow { animation: swaySlow 10s ease-in-out infinite alternate; }
        .animate-sway-med { animation: swayMed 8s ease-in-out infinite alternate; }
        .animate-sway-fast { animation: swayFast 6s ease-in-out infinite alternate; }
        .animate-rotate-slow { animation: spinSlow 28s linear infinite; }
        .animate-rotate-rev { animation: spinRev 36s linear infinite; }
        .grain { background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 3px 3px; }
      `}</style>
    </div>
  )
}


