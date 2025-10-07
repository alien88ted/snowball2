"use client"

import { useEffect, useState } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Smooth animated gradient orbs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
        style={{
          top: "-20%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)",
          animation: "drift 25s ease-in-out infinite"
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          top: "10%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%)",
          animation: "drift 20s ease-in-out infinite reverse",
          animationDelay: "2s"
        }}
      />

      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-15 blur-3xl"
        style={{
          bottom: "5%",
          left: "20%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%)",
          animation: "drift 30s ease-in-out infinite",
          animationDelay: "5s"
        }}
      />

      <div
        className="absolute w-[650px] h-[650px] rounded-full opacity-15 blur-3xl"
        style={{
          bottom: "-10%",
          right: "15%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.35), transparent 70%)",
          animation: "drift 22s ease-in-out infinite reverse",
          animationDelay: "1s"
        }}
      />

      <style jsx>{`
        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
        }
      `}</style>
    </div>
  )
}
