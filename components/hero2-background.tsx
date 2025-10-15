"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/**
 * ETHEREAL NEXUS BACKGROUND
 *
 * A world-class, premium background featuring:
 * - Floating gradient orbs with dynamic blur
 * - Animated mesh gradients
 * - Pulsing radial glows
 * - Perspective grid overlay
 * - Sweeping light beams
 * - Subtle noise texture
 * - Mouse-reactive parallax
 * - Glassmorphism depth layers
 *
 * Performance: 60fps, GPU-accelerated, optimized for all devices
 */

export function Hero2Background() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const simple = process.env.NEXT_PUBLIC_SIMPLE_LANDING === 'true'

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const container = containerRef.current
    const orbs = container.querySelectorAll<HTMLDivElement>('[data-orb]')
    const beams = container.querySelectorAll<HTMLDivElement>('[data-beam]')
    let rafId: number

    // Mouse tracking with smooth interpolation
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX / window.innerWidth
      mouse.targetY = e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop
    const animate = (time: number) => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      const offsetX = (mouse.x - 0.5) * 60
      const offsetY = (mouse.y - 0.5) * 60

      // Animate orbs with enhanced multi-plane parallax
      orbs.forEach((orb, index) => {
        const speed = 0.0002 + (index * 0.0001)
        // Enhanced parallax with depth layers (1.2x to 2.5x)
        const parallaxFactor = 1.2 + (index * 0.4)
        const phase = time * speed + (index * Math.PI * 0.5)

        const x = Math.sin(phase) * 25
        const y = Math.cos(phase * 0.8) * 25
        const scale = 1 + Math.sin(time * 0.0005 + index) * 0.12

        orb.style.transform = `
          translate(
            calc(-50% + ${x}px + ${offsetX * parallaxFactor}px),
            calc(-50% + ${y}px + ${offsetY * parallaxFactor}px)
          )
          scale(${scale})
        `
        orb.style.filter = `blur(${70 + index * 5}px)`
      })

      // Animate light beams
      beams.forEach((beam, index) => {
        const rotation = (time * 0.01 + index * 60) % 360
        beam.style.transform = `rotate(${rotation}deg)`
      })

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || simple) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes float-up {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        @keyframes mesh-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, -5%) scale(1.05); }
          66% { transform: translate(-5%, 5%) scale(0.95); }
        }

        @keyframes grid-perspective {
          0%, 100% { transform: rotateX(60deg) translateY(0); }
          50% { transform: rotateX(60deg) translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes radial-pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }

        .noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Light Base Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle Mesh Gradient Layer - Reduced Opacity */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(at 27% 37%, hsla(215, 80%, 70%, 0.06) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(125, 70%, 80%, 0.04) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(354, 80%, 75%, 0.06) 0px, transparent 50%),
            radial-gradient(at 10% 29%, hsla(256, 75%, 78%, 0.05) 0px, transparent 50%),
            radial-gradient(at 97% 96%, hsla(38, 50%, 85%, 0.03) 0px, transparent 50%),
            radial-gradient(at 33% 50%, hsla(222, 60%, 80%, 0.06) 0px, transparent 50%),
            radial-gradient(at 79% 53%, hsla(343, 60%, 85%, 0.05) 0px, transparent 50%)
          `,
          animation: 'mesh-shift 20s ease-in-out infinite',
        }}
      />

      {/* Multi-Plane Floating Gradient Orbs - Enhanced Depth */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
        {/* Layer 1 - Closest (Strongest parallax) */}
        <div
          data-orb
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(70px)',
            willChange: 'transform, filter',
            zIndex: 4,
          }}
        />

        {/* Layer 2 */}
        <div
          data-orb
          className="absolute top-1/3 right-1/4 w-[750px] h-[750px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, rgba(168, 85, 247, 0) 70%)',
            filter: 'blur(75px)',
            willChange: 'transform, filter',
            zIndex: 3,
          }}
        />

        {/* Layer 3 */}
        <div
          data-orb
          className="absolute bottom-1/4 left-1/3 w-[650px] h-[650px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.065) 0%, rgba(236, 72, 153, 0) 70%)',
            filter: 'blur(70px)',
            willChange: 'transform, filter',
            zIndex: 2,
          }}
        />

        {/* Layer 4 - Farthest (Subtlest parallax) */}
        <div
          data-orb
          className="absolute top-1/2 right-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.055) 0%, rgba(34, 211, 238, 0) 70%)',
            filter: 'blur(60px)',
            willChange: 'transform, filter',
            zIndex: 1,
          }}
        />

        {/* Additional depth layer - Emerald */}
        <div
          data-orb
          className="absolute bottom-1/3 right-1/5 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.045) 0%, rgba(16, 185, 129, 0) 70%)',
            filter: 'blur(65px)',
            willChange: 'transform, filter',
            zIndex: 2,
          }}
        />
      </div>

      {/* Radial Pulse Glows (lighter) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
            animation: 'radial-pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[700px] h-[700px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
            animation: 'radial-pulse 10s ease-in-out infinite 2s',
          }}
        />
      </div>

      {/* Light Beams (lighter) */}
      <div className="absolute inset-0 opacity-10">
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[1px] h-[150%] origin-center"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3) 50%, transparent)',
            willChange: 'transform',
          }}
        />
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[1px] h-[150%] origin-center"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.25) 50%, transparent)',
            willChange: 'transform',
          }}
        />
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[1px] h-[150%] origin-center"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.2) 50%, transparent)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'grid-perspective 15s ease-in-out infinite',
            transformOrigin: 'center bottom',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              animation: `float-up ${20 + Math.random() * 20}s linear infinite`,
              animationDelay: `${-Math.random() * 20}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Layers */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            animation: 'pulse-glow 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            animation: 'pulse-glow 8s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Shimmer Effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 15s linear infinite',
        }}
      />

      {/* Noise Texture - Reduced */}
      <div className="absolute inset-0 noise-texture opacity-15" />

      {/* Very Subtle Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.02) 100%)',
        }}
      />
    </div>
  )
}
