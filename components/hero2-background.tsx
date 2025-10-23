"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/**
 * FLUID OCEAN 3D NEXUS BACKGROUND
 *
 * An enhanced, fluid premium background featuring:
 * - Ocean-like fluid dynamics with sticky viscosity
 * - Interconnected wave motion system
 * - Solid, vibrant gradient orbs with 3D depth
 * - Multi-layered animated mesh gradients
 * - Strong pulsing radial glows with wave influence
 * - 3D perspective grid with wave deformation
 * - Dynamic sweeping light beams
 * - Enhanced texture layers
 * - Advanced mouse-reactive fluid dynamics
 * - 3D glassmorphism depth layers
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
    const waves = container.querySelectorAll<HTMLDivElement>('[data-wave]')
    let rafId: number

    // Fluid dynamics parameters - Optimized for visual impact
    const fluidState = {
      viscosity: 0.85, // How sticky/connected elements are (lower = more fluid)
      tension: 0.12,   // Surface tension effect (higher = stronger pull)
      dampening: 0.93, // Energy loss over time (lower = more movement)
      waveSpeed: 0.006, // Speed of wave propagation (higher = faster waves)
    }

    // Ocean wave parameters for each orb
    const orbStates = Array.from(orbs).map((_, index) => ({
      x: 0,
      y: 0,
      z: 0,
      vx: 0, // velocity x
      vy: 0, // velocity y
      vz: 0, // velocity z
      phase: Math.random() * Math.PI * 2,
      amplitude: 60 + Math.random() * 40,
      frequency: 0.002 + Math.random() * 0.001,
      neighbors: [] as number[], // Will store references to nearby orbs
    }))

    // Initialize neighbor connections (sticky effect)
    orbStates.forEach((state, i) => {
      orbStates.forEach((otherState, j) => {
        if (i !== j && Math.abs(i - j) <= 2) { // Connect nearby orbs
          state.neighbors.push(j)
        }
      })
    })

    // Enhanced mouse tracking with fluid response
    const mouse = { 
      x: 0.5, 
      y: 0.5, 
      targetX: 0.5, 
      targetY: 0.5,
      velocityX: 0,
      velocityY: 0,
      lastX: 0.5,
      lastY: 0.5
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.lastX = mouse.targetX
      mouse.lastY = mouse.targetY
      mouse.targetX = e.clientX / window.innerWidth
      mouse.targetY = e.clientY / window.innerHeight
      
      // Calculate mouse velocity for fluid influence
      mouse.velocityX = (mouse.targetX - mouse.lastX) * 10
      mouse.velocityY = (mouse.targetY - mouse.lastY) * 10
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Ocean wave function
    const getWaveOffset = (x: number, y: number, time: number, index: number) => {
      // Multiple wave layers for realistic ocean effect
      const wave1 = Math.sin(x * 0.02 + time * 0.002 + index) * 30
      const wave2 = Math.sin(y * 0.03 + time * 0.003 - index * 0.5) * 25
      const wave3 = Math.cos(x * 0.01 - y * 0.01 + time * 0.0015) * 20
      const wave4 = Math.sin((x + y) * 0.015 + time * 0.004 + index * 0.3) * 28
      
      return {
        x: wave1 + wave3,
        y: wave2 + wave4,
        z: (wave1 + wave2) * 0.5
      }
    }

    // Fluid animation loop with ocean dynamics
    const animate = (time: number) => {
      // Smooth mouse interpolation with fluid dynamics
      mouse.x += (mouse.targetX - mouse.x) * 0.12
      mouse.y += (mouse.targetY - mouse.y) * 0.12

      const mouseOffsetX = (mouse.x - 0.5) * 250
      const mouseOffsetY = (mouse.y - 0.5) * 250

      // Update orb states with fluid dynamics
      orbStates.forEach((state, index) => {
        const orb = orbs[index]
        if (!orb) return

        // Ocean wave base movement
        const waveOffset = getWaveOffset(
          state.x + index * 100,
          state.y + index * 100,
          time,
          index
        )

        // Apply wave forces
        state.vx += waveOffset.x * fluidState.waveSpeed
        state.vy += waveOffset.y * fluidState.waveSpeed
        state.vz += waveOffset.z * fluidState.waveSpeed * 0.5

        // Mouse influence with fluid response
        const distToMouse = Math.sqrt(
          Math.pow(mouse.x - 0.5, 2) + 
          Math.pow(mouse.y - 0.5, 2)
        )
        const mouseInfluence = Math.max(0, 1 - distToMouse * 2)
        
        state.vx += mouse.velocityX * mouseInfluence * 5
        state.vy += mouse.velocityY * mouseInfluence * 5

        // Sticky neighbor influence (viscosity)
        state.neighbors.forEach(neighborIndex => {
          const neighbor = orbStates[neighborIndex]
          const dx = neighbor.x - state.x
          const dy = neighbor.y - state.y
          
          // Apply tension forces
          state.vx += dx * fluidState.tension
          state.vy += dy * fluidState.tension
          
          // Share velocity (sticky effect)
          state.vx += (neighbor.vx - state.vx) * (1 - fluidState.viscosity)
          state.vy += (neighbor.vy - state.vy) * (1 - fluidState.viscosity)
        })

        // Apply velocity with dampening
        state.vx *= fluidState.dampening
        state.vy *= fluidState.dampening
        state.vz *= fluidState.dampening

        state.x += state.vx
        state.y += state.vy
        state.z += state.vz

        // Organic floating motion
        const floatPhase = time * state.frequency + state.phase
        const floatX = Math.sin(floatPhase) * state.amplitude
        const floatY = Math.cos(floatPhase * 0.7) * state.amplitude
        const floatZ = Math.sin(floatPhase * 0.5 + index) * 20

        // Parallax depth layers
        const parallaxFactor = 1.5 + (index * 0.7)
        
        // Scale pulsing with wave influence
        const scale = 1 + Math.sin(time * 0.0005 + index + state.z * 0.01) * 0.2

        // Apply all transformations with fluid motion
        orb.style.transform = `
          translate3d(
            calc(-50% + ${floatX + state.x}px + ${mouseOffsetX * parallaxFactor}px),
            calc(-50% + ${floatY + state.y}px + ${mouseOffsetY * parallaxFactor}px),
            ${floatZ + state.z}px
          )
          scale(${scale})
        `
        
        // Dynamic blur based on z-position for depth - MUCH less blur
        const blur = 2 + index * 2 + Math.abs(state.z) * 0.1
        orb.style.filter = `blur(${blur}px) brightness(${1.4 - index * 0.05}) saturate(1.5)`
      })

      // Animate light beams with wave influence
      beams.forEach((beam, index) => {
        const waveInfluence = Math.sin(time * 0.001 + index) * 5
        const rotation = (time * 0.015 + index * 60 + waveInfluence) % 360
        const scaleY = 1 + Math.sin(time * 0.001 + index) * 0.2
        beam.style.transform = `rotate(${rotation}deg) scaleY(${scaleY})`
      })

      // Animate wave overlays if present
      waves.forEach((wave, index) => {
        const offset = getWaveOffset(index * 200, index * 150, time, index)
        wave.style.transform = `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
    >
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: scale(1) translateZ(0); }
          50% { opacity: 1; transform: scale(1.15) translateZ(50px); }
        }

        @keyframes float-up {
          0% { transform: translateY(100vh) translateX(0) translateZ(-50px); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-100vh) translateX(50px) translateZ(50px); opacity: 0; }
        }

        @keyframes mesh-shift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(5%, -5%, 30px) scale(1.08); }
          66% { transform: translate3d(-5%, 5%, -30px) scale(0.92); }
        }

        @keyframes grid-perspective {
          0%, 100% { transform: rotateX(65deg) rotateZ(0deg) translateY(0) translateZ(-100px); }
          50% { transform: rotateX(65deg) rotateZ(2deg) translateY(-15px) translateZ(-50px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes shimmerFlow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes radial-pulse {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.4; }
          50% { transform: scale(1.3) translateZ(40px); opacity: 0.7; }
        }

        @keyframes ocean-wave {
          0%, 100% { 
            transform: translateX(-5%) translateY(0) scaleY(1) rotate(0deg);
            opacity: 0.8;
          }
          25% { 
            transform: translateX(5%) translateY(-8%) scaleY(1.2) rotate(2deg);
            opacity: 1;
          }
          50% { 
            transform: translateX(-3%) translateY(6%) scaleY(0.9) rotate(-1deg);
            opacity: 0.9;
          }
          75% { 
            transform: translateX(4%) translateY(-5%) scaleY(1.1) rotate(1deg);
            opacity: 0.95;
          }
        }

        @keyframes fluid-morph {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          25% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 70%;
            transform: rotate(90deg) scale(1.1);
          }
          50% { 
            border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
            transform: rotate(180deg) scale(0.95);
          }
          75% { 
            border-radius: 40% 60% 60% 40% / 70% 40% 60% 30%;
            transform: rotate(270deg) scale(1.05);
          }
        }

        .noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Liquid Metal Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      
      {/* Aurora Borealis Layer */}
      <div className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              transparent 0%, 
              rgba(59, 130, 246, 0.03) 20%, 
              rgba(168, 85, 247, 0.03) 40%,
              rgba(236, 72, 153, 0.02) 60%,
              transparent 100%)
          `,
          animation: 'gradient-flow 20s ease infinite',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Liquid Metal Mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 180deg at 25% 25%, 
              rgba(120, 119, 198, 0.15) 0deg, 
              rgba(255, 119, 168, 0.1) 60deg, 
              rgba(255, 206, 84, 0.08) 120deg,
              rgba(120, 119, 198, 0.15) 360deg),
            conic-gradient(from 60deg at 75% 75%, 
              rgba(120, 119, 198, 0.1) 0deg, 
              rgba(255, 119, 168, 0.08) 90deg, 
              rgba(120, 119, 198, 0.1) 180deg,
              transparent 270deg,
              transparent 360deg)
          `,
          filter: 'blur(40px) contrast(1.1)',
          animation: 'mesh-shift 20s ease-in-out infinite',
          opacity: 0.7,
        }}
      />
      
      {/* Crystalline Structure */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(60deg, transparent 40%, rgba(120, 119, 198, 0.1) 50%, transparent 60%),
            linear-gradient(-60deg, transparent 40%, rgba(255, 119, 168, 0.1) 50%, transparent 60%),
            linear-gradient(120deg, transparent 40%, rgba(120, 119, 198, 0.08) 50%, transparent 60%)
          `,
          backgroundSize: '30px 30px',
          animation: 'shimmerFlow 8s linear infinite',
        }}
      />

      {/* Asymmetric Wave Flow */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        <div
          data-wave
          className="absolute top-0 left-0 w-[150%] h-[150%]"
          style={{
            background: `
              radial-gradient(ellipse at 30% 0%, 
                rgba(120, 119, 198, 0.12) 0%, 
                transparent 40%)
            `,
            transform: 'translateZ(-100px) rotate(-15deg)',
            animation: 'ocean-wave 25s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
        <div
          data-wave
          className="absolute bottom-0 right-0 w-[140%] h-[140%]"
          style={{
            background: `
              radial-gradient(ellipse at 70% 100%, 
                rgba(255, 119, 168, 0.1) 0%, 
                transparent 35%)
            `,
            transform: 'translateZ(-80px) rotate(10deg)',
            animation: 'ocean-wave 30s cubic-bezier(0.4, 0, 0.2, 1) infinite 5s',
          }}
        />
      </div>

      {/* Multi-Plane Floating Gradient Orbs - 3D Enhanced Depth */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(0)', transformStyle: 'preserve-3d' }}>
        {/* Layer 1 - Closest (Strongest parallax) */}
        <div
          data-orb
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px]"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(120, 119, 198, 0.3) 0%, 
                rgba(255, 119, 168, 0.2) 50%,
                rgba(120, 119, 198, 0.1) 100%)
            `,
            boxShadow: `
              0 0 120px 40px rgba(120, 119, 198, 0.15),
              inset 0 0 60px rgba(255, 255, 255, 0.1)
            `,
            filter: 'blur(30px) contrast(1.2)',
            mixBlendMode: 'screen',
            willChange: 'transform, filter, border-radius',
            zIndex: 4,
            transform: 'translateZ(100px)',
            animation: 'fluid-morph 4s ease-in-out infinite',
          }}
        />

        {/* Layer 2 - Purple Orb */}
        <div
          data-orb
          className="absolute top-1/3 right-1/4 w-[750px] h-[750px]"
          style={{
            background: `
              linear-gradient(225deg, 
                rgba(255, 119, 168, 0.25) 0%, 
                rgba(255, 206, 84, 0.15) 50%,
                rgba(255, 119, 168, 0.08) 100%)
            `,
            boxShadow: `
              0 0 100px 35px rgba(255, 119, 168, 0.12),
              inset 0 0 50px rgba(255, 255, 255, 0.08)
            `,
            filter: 'blur(35px) contrast(1.1)',
            mixBlendMode: 'screen',
            willChange: 'transform, filter, border-radius',
            zIndex: 3,
            transform: 'translateZ(50px)',
            animation: 'fluid-morph 5s ease-in-out infinite 0.5s',
          }}
        />

        {/* Layer 3 - Pink Orb */}
        <div
          data-orb
          className="absolute bottom-1/4 left-1/3 w-[650px] h-[650px]"
          style={{
            background: `
              linear-gradient(45deg, 
                rgba(120, 119, 198, 0.2) 0%, 
                rgba(120, 119, 198, 0.1) 100%)
            `,
            boxShadow: `
              0 0 80px 30px rgba(120, 119, 198, 0.1)
            `,
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
            willChange: 'transform, filter, border-radius',
            zIndex: 2,
            transform: 'translateZ(0px)',
            animation: 'fluid-morph 4.5s ease-in-out infinite 1s',
          }}
        />

        {/* Layer 4 - Cyan Orb */}
        <div
          data-orb
          className="absolute top-1/2 right-1/3 w-[600px] h-[600px]"
          style={{
            background: `
              linear-gradient(315deg, 
                rgba(255, 206, 84, 0.18) 0%, 
                rgba(120, 119, 198, 0.08) 100%)
            `,
            boxShadow: `
              0 0 70px 25px rgba(255, 206, 84, 0.08)
            `,
            filter: 'blur(45px)',
            mixBlendMode: 'screen',
            willChange: 'transform, filter, border-radius',
            zIndex: 1,
            transform: 'translateZ(-50px)',
            animation: 'fluid-morph 5.5s ease-in-out infinite 1.5s',
          }}
        />

        {/* Additional depth layer - Emerald */}
        <div
          data-orb
          className="absolute bottom-1/3 right-1/5 w-[550px] h-[550px]"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(255, 119, 168, 0.15) 0%, 
                transparent 100%)
            `,
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
            willChange: 'transform, filter, border-radius',
            zIndex: 2,
            transform: 'translateZ(-25px)',
            animation: 'fluid-morph 3.5s ease-in-out infinite 2s',
          }}
        />
      </div>

      {/* Premium Radial Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(59, 130, 246, 0.25) 0%, 
                rgba(99, 102, 241, 0.15) 15%,
                rgba(59, 130, 246, 0.08) 30%, 
                rgba(79, 70, 229, 0.03) 50%,
                transparent 70%)
            `,
            animation: 'radial-pulse 10s ease-in-out infinite',
            transform: 'translateZ(-30px) scale(1.1)',
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[900px] h-[900px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(236, 72, 153, 0.2) 0%, 
                rgba(244, 114, 182, 0.12) 15%,
                rgba(236, 72, 153, 0.06) 30%,
                rgba(219, 39, 119, 0.02) 50%, 
                transparent 70%)
            `,
            animation: 'radial-pulse 12s ease-in-out infinite 3s',
            transform: 'translateZ(-40px) scale(1.05)',
            filter: 'blur(12px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
      
      <div className="absolute top-1/2 left-0 w-[850px] h-[850px] -translate-y-1/2">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(168, 85, 247, 0.18) 0%,
                rgba(139, 92, 246, 0.1) 20%, 
                rgba(168, 85, 247, 0.04) 40%,
                transparent 65%)
            `,
            animation: 'radial-pulse 14s ease-in-out infinite 6s',
            transform: 'translateZ(-50px)',
            filter: 'blur(15px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Dynamic Light Rays */}
      <div className="absolute inset-0 opacity-30" style={{ transformStyle: 'preserve-3d', mixBlendMode: 'overlay' }}>
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[3px] h-[150%] origin-center"
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0%, 
                rgba(59, 130, 246, 0.1) 10%,
                rgba(59, 130, 246, 0.4) 30%,
                rgba(79, 70, 229, 0.6) 50%, 
                rgba(59, 130, 246, 0.4) 70%,
                rgba(59, 130, 246, 0.1) 90%,
                transparent 100%)
            `,
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(79, 70, 229, 0.2)',
            willChange: 'transform',
            transform: 'translateZ(20px)',
          }}
        />
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[2px] h-[150%] origin-center"
          style={{
            background: `
              linear-gradient(to bottom, transparent 0%, rgba(168, 85, 247, 0.7) 20%, rgba(168, 85, 247, 0.9) 50%, rgba(168, 85, 247, 0.7) 80%, transparent 100%)
            `,
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)',
            willChange: 'transform',
            transform: 'translateZ(10px)',
          }}
        />
        <div
          data-beam
          className="absolute top-1/2 left-1/2 w-[2px] h-[150%] origin-center"
          style={{
            background: `
              linear-gradient(to bottom, transparent 0%, rgba(236, 72, 153, 0.6) 20%, rgba(236, 72, 153, 0.8) 50%, rgba(236, 72, 153, 0.6) 80%, transparent 100%)
            `,
            boxShadow: '0 0 12px rgba(236, 72, 153, 0.35)',
            willChange: 'transform',
            transform: 'translateZ(0px)',
          }}
        />
      </div>

      {/* Holographic Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) translateZ(-100px)',
          transformOrigin: 'center bottom',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(120, 119, 198, 0.4) 0.5px, transparent 0.5px),
              linear-gradient(to bottom, rgba(120, 119, 198, 0.4) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 0, 0 0, 0 0',
            animation: 'grid-perspective 12s ease-in-out infinite',
            transformOrigin: 'center bottom',
            boxShadow: 'inset 0 0 100px rgba(59, 130, 246, 0.05)',
          }}
        />
      </div>

      {/* Ambient Particle System */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${[
                'rgba(59, 130, 246, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(34, 211, 238, 1)'
              ][i % 4]} 0%, transparent 70%)`,
              boxShadow: `0 0 10px ${[
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(34, 211, 238, 0.8)'
              ][i % 4]}`,
              left: `${Math.random() * 100}%`,
              bottom: 0,
              animation: `float-up ${15 + Math.random() * 15}s linear infinite`,
              animationDelay: `${-Math.random() * 15}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced 3D Glassmorphism Layers */}
      <div className="absolute inset-0 opacity-40" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%),
              radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
            `,
            backdropFilter: 'blur(20px) saturate(150%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 0 40px rgba(255, 255, 255, 0.1),
              inset 0 0 40px rgba(255, 255, 255, 0.05),
              0 10px 40px rgba(59, 130, 246, 0.1)
            `,
            animation: 'pulse-glow 5s ease-in-out infinite',
            transform: 'translateZ(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.08) 100%),
              radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)
            `,
            backdropFilter: 'blur(25px) saturate(140%)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: `
              0 0 35px rgba(255, 255, 255, 0.08),
              inset 0 0 35px rgba(255, 255, 255, 0.04),
              0 10px 35px rgba(236, 72, 153, 0.08)
            `,
            animation: 'pulse-glow 7s ease-in-out infinite 1s',
            transform: 'translateZ(40px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.06) 100%),
              radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 60%)
            `,
            backdropFilter: 'blur(30px) saturate(130%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: `
              0 0 30px rgba(168, 85, 247, 0.06),
              inset 0 0 30px rgba(255, 255, 255, 0.03)
            `,
            animation: 'pulse-glow 6s ease-in-out infinite 2s',
            transform: 'translateZ(20px)',
          }}
        />
      </div>

      {/* Enhanced 3D Shimmer Effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(110deg, 
              transparent 35%, 
              rgba(255, 255, 255, 0.1) 40%,
              rgba(255, 255, 255, 0.15) 50%,
              rgba(255, 255, 255, 0.1) 60%,
              transparent 65%)
          `,
          backgroundSize: '200% 100%',
          animation: 'shimmer 10s linear infinite',
          transform: 'translateZ(80px)',
        }}
      />

      {/* Metallic Grain */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Enhanced 3D Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              transparent 0%, 
              transparent 40%, 
              rgba(0, 0, 0, 0.03) 60%, 
              rgba(0, 0, 0, 0.08) 80%,
              rgba(0, 0, 0, 0.12) 100%),
            radial-gradient(circle at top left, 
              rgba(59, 130, 246, 0.05) 0%, 
              transparent 50%),
            radial-gradient(circle at bottom right, 
              rgba(236, 72, 153, 0.05) 0%, 
              transparent 50%)
          `,
          transform: 'translateZ(150px)',
        }}
      />
    </div>
  )
}
