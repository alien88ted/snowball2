"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users, Shield, DollarSign, Zap, Globe, Coins } from "lucide-react"
import { FooterSection } from "@/components/footer-section"

// Golden ratio for perfect proportions
const PHI = 1.618033988749895
const PHI_INVERSE = 0.618033988749895

// Smooth cubic bezier easing
const easeCubicInOut = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Advanced counter with smooth interpolation
function useAnimatedValue(targetValue: number, duration: number = 2000) {
  const [value, setValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef<number>(0)

  const animate = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now()
      startValueRef.current = value
    }

    const elapsed = performance.now() - startTimeRef.current
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeCubicInOut(progress)

    const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easedProgress
    setValue(currentValue)

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      setIsAnimating(false)
      startTimeRef.current = undefined
    }
  }, [targetValue, duration, value])

  useEffect(() => {
    if (!isAnimating && value !== targetValue) {
      setIsAnimating(true)
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetValue, isAnimating, animate, value])

  return value
}

// Simple scroll-triggered animations
function useScrollTrigger(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Mouse parallax with lerping
function useMouseParallax(factor: number = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * factor
      const y = (e.clientY / window.innerHeight - 0.5) * factor
      targetRef.current = { x, y }
    }

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1
      setOffset({ ...currentRef.current })
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [factor])

  return offset
}

// Magnetic hover effect with spring physics
function useMagneticHover(strength: number = 0.3) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLElement>(null)
  const velocityRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < 150) {
        const force = (1 - distance / 150) * strength
        targetRef.current = {
          x: distanceX * force,
          y: distanceY * force
        }
      } else {
        targetRef.current = { x: 0, y: 0 }
      }
    }

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    const animate = () => {
      const springForce = 0.2
      const damping = 0.85

      velocityRef.current.x += (targetRef.current.x - position.x) * springForce
      velocityRef.current.y += (targetRef.current.y - position.y) * springForce
      velocityRef.current.x *= damping
      velocityRef.current.y *= damping

      setPosition(prev => ({
        x: prev.x + velocityRef.current.x,
        y: prev.y + velocityRef.current.y
      }))

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [position.x, position.y, strength])

  return { ref, position }
}

// SUPERCHARGED multi-layer $ ecosystem - THE SIGNATURE
function useFloatingDollars() {
  const [dollars, setDollars] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number // velocity x
    vy: number // velocity y
    rotation: number
    scale: number
    opacity: number
    baseSpeed: number
    phase: number // for individual sine wave motion
    layer: number // depth layer (0=far back, 1=back, 2=mid, 3=front)
    pulsePhase: number // for pulsing glow
    colorVariant: 'primary' | 'accent' | 'amber' | 'gradient' // color themes
    trailOpacity: number // for wake effects
  }>>([])

  const [connections, setConnections] = useState<Array<{
    from: number
    to: number
    strength: number
    pulse: number
  }>>([])

  const mouseRef = useRef({ x: -100, y: -100, intensity: 0, vx: 0, vy: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number
    let dollarId = 0
    let frameCount = 0

    const spawnDollar = () => {
      // 4 depth layers with different probabilities
      const rand = Math.random()
      const layer = rand < 0.2 ? 0 : rand < 0.45 ? 1 : rand < 0.75 ? 2 : 3

      // Color variety - primary blue, accent purple, amber coffee, or gradient
      const colorRand = Math.random()
      const colorVariant =
        colorRand < 0.4 ? 'primary' :
        colorRand < 0.7 ? 'accent' :
        colorRand < 0.85 ? 'gradient' :
        'amber'

      return {
        id: dollarId++,
        x: 20 + Math.random() * 60, // Wider spawn area
        y: 110,
        vx: 0,
        vy: 0,
        rotation: Math.random() * 360,
        scale: layer === 0 ? 0.15 + Math.random() * 0.25 :
               layer === 1 ? 0.3 + Math.random() * 0.35 :
               layer === 2 ? 0.5 + Math.random() * 0.45 :
               0.7 + Math.random() * 0.6, // Bigger front layer
        opacity: 0,
        baseSpeed: layer === 0 ? 0.03 + Math.random() * 0.05 :
                   layer === 1 ? 0.06 + Math.random() * 0.07 :
                   layer === 2 ? 0.1 + Math.random() * 0.09 :
                   0.15 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        layer: layer,
        pulsePhase: Math.random() * Math.PI * 2,
        colorVariant: colorVariant,
        trailOpacity: 0
      }
    }

    // Throttled mouse tracking for better performance
    let lastMouseUpdate = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseUpdate < 16) return // Throttle to ~60fps
      lastMouseUpdate = now

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const targetX = ((e.clientX - rect.left) / rect.width) * 100
        const targetY = ((e.clientY - rect.top) / rect.height) * 100

        // Calculate mouse velocity for wake effects
        const velX = targetX - mouseRef.current.x
        const velY = targetY - mouseRef.current.y
        const velocity = Math.sqrt(velX * velX + velY * velY)

        // Smooth tracking with intensity and directional velocity
        mouseRef.current = {
          x: mouseRef.current.x + velX * 0.2,
          y: mouseRef.current.y + velY * 0.2,
          intensity: Math.min(1.5, mouseRef.current.intensity * 0.85 + velocity * 0.015),
          vx: velX,
          vy: velY
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      frameCount++

      setDollars(prev => {
        let newDollars = [...prev]

        // Refined spawn rate - minimal and elegant
        if (Math.random() < 0.025 && newDollars.length < 30) {
          newDollars.push(spawnDollar())
        }
        // Rare burst for subtle density
        if (Math.random() < 0.002 && newDollars.length < 28) {
          newDollars.push(spawnDollar())
        }

        // Minimal connections - only update every 4 frames
        if (frameCount % 4 === 0) {
          const activeConnections: typeof connections = []
          const maxConnections = 8

          for (let i = 0; i < newDollars.length && activeConnections.length < maxConnections; i++) {
            for (let j = i + 1; j < newDollars.length && activeConnections.length < maxConnections; j++) {
              const d1 = newDollars[i]
              const d2 = newDollars[j]

              if (d1.layer === d2.layer && d1.opacity > 0.3 && d2.opacity > 0.3) {
                const dist = Math.sqrt(
                  Math.pow(d1.x - d2.x, 2) +
                  Math.pow(d1.y - d2.y, 2)
                )
                if (dist < 30) {
                  activeConnections.push({
                    from: d1.id,
                    to: d2.id,
                    strength: (1 - dist / 30) * Math.min(d1.opacity, d2.opacity),
                    pulse: Math.sin(frameCount * 0.03 + d1.id * 0.1) * 0.5 + 0.5
                  })
                }
              }
            }
          }
          setConnections(activeConnections)
        }

        // Update existing dollars with SUPERCHARGED physics
        newDollars = newDollars
          .map(d => {
            // Calculate distance to mouse
            const dx = mouseRef.current.x - d.x
            const dy = mouseRef.current.y - d.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // ENHANCED layer-dependent mouse interaction - more dramatic
            const interactionRadius = d.layer === 3 ? 50 : d.layer === 2 ? 35 : d.layer === 1 ? 20 : 12
            const forceMult = d.layer === 3 ? 0.18 : d.layer === 2 ? 0.12 : d.layer === 1 ? 0.08 : 0.04

            let forceX = 0
            let forceY = 0
            let wakeEffect = 0

            if (distance < interactionRadius && distance > 1) {
              // DRAMATIC force with mouse intensity and velocity
              const baseForce = Math.pow(1 - distance / interactionRadius, 2.2)
              const intensityMult = 1 + mouseRef.current.intensity * 1.2
              const force = baseForce * forceMult * intensityMult

              forceX = -(dx / distance) * force
              forceY = -(dy / distance) * force

              // STRONGER rotational force for dramatic swirl
              const tangentX = -dy / distance
              const tangentY = dx / distance
              const swirlStrength = mouseRef.current.intensity * 0.5
              forceX += tangentX * force * swirlStrength
              forceY += tangentY * force * swirlStrength

              // Wake trail effect based on mouse velocity direction
              const mouseDirX = mouseRef.current.vx
              const mouseDirY = mouseRef.current.vy
              if (Math.abs(mouseDirX) + Math.abs(mouseDirY) > 0.5) {
                const alignment = (dx * mouseDirX + dy * mouseDirY) / (distance + 0.1)
                if (alignment < 0) {
                  // Dollar is behind mouse movement - create wake
                  wakeEffect = Math.min(1, mouseRef.current.intensity * 0.8)
                }
              }
            }

            // Optimized clustering - check only nearby symbols
            const nearbySymbols = newDollars.filter(other => {
              if (other.id === d.id) return false
              const quickDist = Math.abs(other.x - d.x) + Math.abs(other.y - d.y)
              return quickDist < 50 // Manhattan distance for quick filtering
            })

            nearbySymbols.forEach(other => {
              const odx = other.x - d.x
              const ody = other.y - d.y
              const odist = Math.sqrt(odx * odx + ody * ody)

              // Same layer - stronger attraction
              if (d.layer === other.layer && odist > 8 && odist < 35) {
                const attractionForce = (1 - odist / 35) * 0.004
                forceX += (odx / odist) * attractionForce
                forceY += (ody / odist) * attractionForce
              }
              // Slight repulsion when too close
              else if (d.layer === other.layer && odist < 8 && odist > 0.1) {
                forceX -= (odx / odist) * 0.003
                forceY -= (ody / odist) * 0.003
              }
            })

            // Update velocity with forces
            let newVx = d.vx + forceX
            let newVy = d.vy + forceY

            // Layer-based damping - less damping for more movement
            const damping = d.layer === 0 ? 0.96 : d.layer === 1 ? 0.93 : d.layer === 2 ? 0.90 : 0.86
            newVx *= damping
            newVy *= damping

            // Complex wave motion with layer depth
            const waveComplexity = d.layer === 3 ? 2 : d.layer === 2 ? 1.5 : d.layer === 1 ? 1 : 0.5
            const waveX = Math.sin((frameCount * 0.012) + d.phase) * 0.025 * waveComplexity +
                         Math.sin((frameCount * 0.004) + d.phase * 2) * 0.012
            const waveY = Math.cos((frameCount * 0.009) + d.phase * 0.7) * 0.018 * waveComplexity

            // Update position
            let newX = d.x + newVx + waveX
            let newY = d.y - d.baseSpeed + newVy + waveY

            // Soft boundaries with bounce
            if (newX < 3) newX = 3 + Math.abs(newVx) * 0.6
            if (newX > 97) newX = 97 - Math.abs(newVx) * 0.6

            // Rotation varies by layer and movement
            const speed = Math.sqrt(newVx * newVx + newVy * newVy)
            const rotationSpeed = (0.12 + speed * 2.5) * (d.layer === 3 ? 1.5 : d.layer === 2 ? 1.2 : 1)

            // Enhanced pulsing opacity based on layer
            const pulseFactor = Math.sin(frameCount * 0.025 + d.pulsePhase) * 0.12
            const baseOpacity = d.layer === 0 ? 0.35 : d.layer === 1 ? 0.55 : d.layer === 2 ? 0.75 : 0.85

            // Wake trail opacity
            const newTrailOpacity = wakeEffect > 0 ? wakeEffect : d.trailOpacity * 0.9

            return {
              ...d,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              rotation: d.rotation + rotationSpeed,
              opacity: d.y > 98 ? 0 :
                      d.y < 2 ? (2 - d.y) / 2 :
                      Math.min(baseOpacity + pulseFactor, d.opacity + 0.018),
              phase: d.phase,
              pulsePhase: d.pulsePhase,
              trailOpacity: newTrailOpacity
            }
          })
          .filter(d => d.y > -10)

        return newDollars
      })

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return { dollars, connections, containerRef }
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  // Sophisticated $ ecosystem with depth
  const { dollars: floatingDollars, connections, containerRef } = useFloatingDollars()

  // Scroll triggers for sections
  const heroTrigger = useScrollTrigger()
  const coffeeTrigger = useScrollTrigger()
  const howTrigger = useScrollTrigger()
  const benefitsTrigger = useScrollTrigger()

  // Animated counters
  const priceValue = useAnimatedValue(coffeeTrigger.isVisible ? 15 : 0, 1500)
  const revenueValue = useAnimatedValue(coffeeTrigger.isVisible ? 33 : 0, 1800)
  const minValue = useAnimatedValue(coffeeTrigger.isVisible ? 100 : 0, 2000)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">

      {/* Clean Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-transparent" />
      </div>


      {/* Sophisticated Multi-Layer $ Ecosystem - Flows Across Sections */}
      {mounted && (
        <div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ height: '200vh' }}
        >
            {/* Ambient background particles */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%,
                    rgba(99, 102, 241, 0.03) 0%,
                    transparent 50%)`,
                  animation: 'pulse 8s ease-in-out infinite'
                }}
              />
            </div>

            {/* Subtle connection network - MINIMAL */}
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {connections.slice(0, 15).map((conn) => {
                const fromDollar = floatingDollars.find(d => d.id === conn.from)
                const toDollar = floatingDollars.find(d => d.id === conn.to)
                if (!fromDollar || !toDollar) return null
                if (fromDollar.layer !== toDollar.layer) return null

                return (
                  <line
                    key={`${conn.from}-${conn.to}`}
                    x1={`${fromDollar.x}%`}
                    y1={`${fromDollar.y}%`}
                    x2={`${toDollar.x}%`}
                    y2={`${toDollar.y}%`}
                    stroke="url(#connectionGradient)"
                    strokeWidth="1"
                    opacity={conn.strength * 0.4}
                  />
                )
              })}
            </svg>

            {/* Layer 0: Far Background - Atmospheric depth */}
            {floatingDollars.filter(d => d.layer === 0).map(dollar => {
              const getColor = () => {
                switch (dollar.colorVariant) {
                  case 'primary': return 'rgba(99, 102, 241, 0.25)'
                  case 'accent': return 'rgba(168, 85, 247, 0.25)'
                  case 'amber': return 'rgba(245, 158, 11, 0.25)'
                  default: return 'rgba(99, 102, 241, 0.25)'
                }
              }
              return (
                <div
                  key={dollar.id}
                  className="absolute font-serif font-bold"
                  style={{
                    left: `${dollar.x}%`,
                    top: `${dollar.y}%`,
                    transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
                    opacity: dollar.opacity * 0.18,
                    fontSize: `${2.5 + dollar.scale * 2.5}rem`,
                    color: getColor(),
                    filter: `blur(2px)`,
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 1: Background - Soft presence */}
            {floatingDollars.filter(d => d.layer === 1).map(dollar => {
              const trailGlow = dollar.trailOpacity * 0.3
              let colorStyle = {}

              switch (dollar.colorVariant) {
                case 'primary':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(99, 102, 241, ${dollar.opacity * 0.4}))`
                  }
                  break
                case 'accent':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(147, 51, 234))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(168, 85, 247, ${dollar.opacity * 0.4}))`
                  }
                  break
                case 'amber':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(245, 158, 11), rgb(217, 119, 6))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(245, 158, 11, ${dollar.opacity * 0.4}))`
                  }
                  break
                default:
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(99, 102, 241, ${dollar.opacity * 0.4}))`
                  }
              }

              return (
                <div
                  key={dollar.id}
                  className="absolute font-serif font-bold select-none pointer-events-none"
                  style={{
                    left: `${dollar.x}%`,
                    top: `${dollar.y}%`,
                    transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
                    opacity: dollar.opacity * 0.5,
                    fontSize: `${3.5 + dollar.scale * 3}rem`,
                    ...colorStyle
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 2: Mid-ground - Prominent presence */}
            {floatingDollars.filter(d => d.layer === 2).map(dollar => {
              const trailGlow = dollar.trailOpacity * 0.5
              let colorStyle = {}

              switch (dollar.colorVariant) {
                case 'primary':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${30 + trailGlow * 15}px rgba(99, 102, 241, ${dollar.opacity * 0.5}))`
                  }
                  break
                case 'accent':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(147, 51, 234))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${30 + trailGlow * 15}px rgba(168, 85, 247, ${dollar.opacity * 0.5}))`
                  }
                  break
                case 'amber':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(245, 158, 11), rgb(217, 119, 6))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${30 + trailGlow * 15}px rgba(245, 158, 11, ${dollar.opacity * 0.5}))`
                  }
                  break
                default:
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${30 + trailGlow * 15}px rgba(99, 102, 241, ${dollar.opacity * 0.5}))`
                  }
              }

              return (
                <div
                  key={dollar.id}
                  className="absolute font-serif font-bold select-none pointer-events-none"
                  style={{
                    left: `${dollar.x}%`,
                    top: `${dollar.y}%`,
                    transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
                    opacity: dollar.opacity * 0.7,
                    fontSize: `${4.5 + dollar.scale * 3.5}rem`,
                    ...colorStyle
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 3: Foreground - MAXIMUM impact */}
            {floatingDollars.filter(d => d.layer === 3).map(dollar => {
              const trailGlow = dollar.trailOpacity * 0.8
              let colorStyle = {}

              switch (dollar.colorVariant) {
                case 'primary':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(59, 130, 246))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${40 + trailGlow * 20}px rgba(99, 102, 241, ${dollar.opacity * 0.6}))`
                  }
                  break
                case 'accent':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(192, 132, 252))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${40 + trailGlow * 20}px rgba(168, 85, 247, ${dollar.opacity * 0.6}))`
                  }
                  break
                case 'amber':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(245, 158, 11), rgb(251, 191, 36))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${40 + trailGlow * 20}px rgba(245, 158, 11, ${dollar.opacity * 0.6}))`
                  }
                  break
                default:
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${40 + trailGlow * 20}px rgba(99, 102, 241, ${dollar.opacity * 0.6}))`
                  }
              }

              return (
                <div
                  key={dollar.id}
                  className="absolute font-serif font-bold select-none pointer-events-none"
                  style={{
                    left: `${dollar.x}%`,
                    top: `${dollar.y}%`,
                    transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
                    opacity: dollar.opacity * 0.85,
                    fontSize: `${5.5 + dollar.scale * 4}rem`,
                    ...colorStyle
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Ambient light spots */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`ambient-${i}`}
                  className="absolute"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${20 + i * 25}%`,
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle,
                      rgba(99, 102, 241, ${0.05 - i * 0.01}) 0%,
                      transparent 50%)`,
                    filter: 'blur(40px)',
                    transform: `scale(${1.5 + i * 0.3})`,
                    animation: `float ${10 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Clean & Powerful */}
      <section
        ref={heroTrigger.ref as any}
        className="relative min-h-[60vh] flex items-center justify-center px-6 pt-16 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Centerpiece $ - Living Liquid Ethos */}
          <div className="relative mb-8 h-[120px] md:h-[140px] flex items-center justify-center">
            {/* Main $ with liquid morph effect */}
            <div className="relative">
              <div
                className="text-[72px] md:text-[96px] font-serif font-bold text-gray-900 leading-none select-none"
                style={{
                  animation: 'liquidMorph 6s ease-in-out infinite, breathe 4s ease-in-out infinite',
                  letterSpacing: '-0.02em',
                  filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.1))'
                }}
              >
                $
              </div>

              {/* Flowing shimmer overlay */}
              <div
                className="absolute inset-0 text-[72px] md:text-[96px] font-serif font-bold leading-none select-none pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmerFlow 3s linear infinite',
                  backgroundSize: '200% 100%',
                  letterSpacing: '-0.02em'
                }}
              >
                $
              </div>

              {/* Liquid ripple layers */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 text-[72px] md:text-[96px] font-serif font-bold text-gray-900 leading-none opacity-[0.04] blur-md select-none"
                  style={{
                    animation: `liquidRipple ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.8}s`,
                    letterSpacing: '-0.02em'
                  }}
                >
                  $
                </div>
              ))}
            </div>
          </div>

          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">$COFFEE presale is live</span>
          </div>

          {/* Main Headline - Clean & Powerful */}
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.1] mb-6">
            <span className="block text-gray-900">
              Own real businesses.
            </span>
            <span className="block text-gray-900">
              Earn from every sale.
            </span>
          </h1>

          {/* Subheadline - Clear & Direct */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tokenized equity in local businesses.
            Start with $100. Get monthly profits.
          </p>

          {/* CTA Buttons - Simple & Clean */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/explorer">
              <button className="group px-8 py-3.5 bg-gray-900 text-white rounded-xl font-medium transition-all hover:bg-gray-800 hover:shadow-lg">
                <span className="flex items-center gap-2">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>

            <Link href="#how">
              <button className="px-8 py-3.5 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                How It Works
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>SEC Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>2,000+ Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>12% Avg Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* $COFFEE Feature - Premium Showcase */}
      <section
        ref={coffeeTrigger.ref as any}
        className="py-24 px-6 relative overflow-hidden"
      >
        {/* Subtle ambient $ symbols */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute font-serif font-bold text-amber-600"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                fontSize: `${4 + i * 0.5}rem`,
                transform: `rotate(${-15 + i * 5}deg)`,
                animation: `float ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              $
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div
            className={`flex items-center gap-6 mb-16 transition-all duration-1000 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-gray-400 font-bold">001</span>
              <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-transparent" />
            </div>
            <h3 className="text-sm font-bold text-gray-700 tracking-[0.2em]">FEATURED LAUNCH</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Real Business Card - Certificate Style */}
            <div
              className={`relative group transition-all duration-1000 delay-200 ${
                coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 border-2 border-amber-200/50 shadow-[0_8px_30px_rgba(245,158,11,0.15)] group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] transition-all duration-500">
                {/* Document-style header */}
                <div className="border-b-2 border-dashed border-amber-300/50 pb-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-mono text-gray-500 mb-1">INVESTMENT OPPORTUNITY</div>
                      <div className="text-4xl font-serif font-bold text-gray-900">$COFFEE</div>
                    </div>
                    {/* Live badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
                      </div>
                      <span className="text-xs font-bold text-green-700">LIVE</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Beirut Specialty Coffee</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">Est. 2024 • Hamra St, Beirut</div>
                </div>

                {/* Real Business Metrics */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Daily Customers</span>
                    <span className="text-sm font-bold text-gray-900">~180 cups</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Avg. Transaction</span>
                    <span className="text-sm font-bold text-gray-900">$4.50</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Hours</span>
                    <span className="text-sm font-bold text-gray-900">7AM - 9PM Daily</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Business Model</span>
                    <span className="text-sm font-bold text-gray-900">Barista-Owned</span>
                  </div>
                </div>

                {/* Certificate stamp */}
                <div className="relative mt-6 pt-6 border-t-2 border-dashed border-amber-300/50">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono text-gray-400">TOKEN ID: #001</div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full" />
                      <div className="relative text-5xl font-serif font-bold text-amber-600/20 select-none">$</div>
                    </div>
                  </div>
                </div>

                {/* Verification corner */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-xs font-mono text-amber-600 rotate-12">VERIFIED</div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <h2 className="text-5xl font-serif mb-5 font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Beirut Brew</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A specialty coffee shop in the heart of Beirut where baristas own equity
                  and every cup sold generates returns for token holders worldwide.
                </p>
              </div>

              {/* Key Metrics - Enhanced */}
              <div className="grid grid-cols-3 gap-4">
                <div className="group/metric relative p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Token Price</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ${(priceValue / 100).toFixed(2)}
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400/30 group-hover/metric:bg-amber-400/60 transition-colors" />
                </div>

                <div className="group/metric relative p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Revenue</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {Math.floor(revenueValue)}%
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-400/30 group-hover/metric:bg-orange-400/60 transition-colors" />
                </div>

                <div className="group/metric relative p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Min. Buy</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ${Math.floor(minValue)}
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400/30 group-hover/metric:bg-amber-400/60 transition-colors" />
                </div>
              </div>

              {/* Progress Bar - Enhanced */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                  <span className="text-sm font-bold text-gray-900">$420K <span className="text-gray-400 font-normal">/ $500K</span></span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full transition-all duration-1000 relative"
                    style={{ width: coffeeTrigger.isVisible ? '84%' : '0%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_linear_infinite]" />
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-medium">84% funded · 47 days remaining</div>
              </div>

              {/* CTA - Enhanced */}
              <Link href="/explorer/coffee">
                <button className="group/cta w-full relative py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-2xl hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/cta:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    View Investment Details
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Clean Process */}
      <section
        ref={howTrigger.ref as any}
        id="how"
        className="py-16 px-6 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl font-serif mb-4">How it works</h2>
            <p className="text-lg text-gray-600">Three simple steps to ownership</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Discover",
                description: "Browse vetted local businesses seeking community investment",
                icon: Globe
              },
              {
                number: "02",
                title: "Invest",
                description: "Buy tokens starting at $100 to become a partial owner",
                icon: Coins
              },
              {
                number: "03",
                title: "Earn",
                description: "Receive your share of profits every month, forever",
                icon: TrendingUp
              }
            ].map((step, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 ${
                  howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-4">
                  <step.icon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <div className="text-5xl font-light text-gray-200">{step.number}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid - Premium Cards */}
      <section
        ref={benefitsTrigger.ref as any}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-serif mb-4"
              style={{
                opacity: benefitsTrigger.isVisible ? 1 : 0,
                transform: `translateY(${benefitsTrigger.isVisible ? 0 : 20}px)`,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Why $NOW
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparent",
                description: "Every transaction on-chain",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: Users,
                title: "Community",
                description: "Owned by the people",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: TrendingUp,
                title: "Returns",
                description: "Monthly profit sharing",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Zap,
                title: "Simple",
                description: "Start with just $100",
                gradient: "from-orange-500 to-red-600"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative"
                style={{
                  opacity: benefitsTrigger.isVisible ? 1 : 0,
                  transform: `translateY(${benefitsTrigger.isVisible ? 0 : 40}px)`,
                  transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
                }}
              >
                <div className="relative p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <feature.icon className="w-10 h-10 text-gray-700 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Elegant Statements */}
      <section className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif mb-20">Our Philosophy</h2>

          <div className="space-y-16">
            {[
              "Employees should own the businesses they build",
              "Customers should benefit from the businesses they support",
              "Profits should flow back to the community"
            ].map((text, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: `translateY(${mounted ? 0 : 20}px)`,
                  transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`
                }}
              >
                <div className="text-8xl font-light text-gray-100 absolute left-1/2 -translate-x-1/2 -top-8">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="relative text-2xl text-gray-700 font-light leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Simple & Strong */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Ready to own real equity?
          </h2>

          <p className="text-lg text-gray-400 mb-10">
            Join thousands building wealth through community ownership
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorer">
              <button className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all">
                Start Investing Today →
              </button>
            </Link>

            <Link href="/franchise/apply">
              <button className="px-8 py-3.5 rounded-xl font-medium border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-all">
                List Your Business
              </button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes spin {
          from { transform: rotate(0deg) scale(1.5); }
          to { transform: rotate(360deg) scale(1.5); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(var(--scale, 1)); }
          50% { transform: translateY(-20px) scale(var(--scale, 1)); }
        }

        @keyframes liquidMorph {
          0%, 100% {
            transform: scale(1, 1) translateY(0);
          }
          25% {
            transform: scale(1.03, 0.97) translateY(-3px);
          }
          50% {
            transform: scale(0.98, 1.02) translateY(2px);
          }
          75% {
            transform: scale(1.01, 0.99) translateY(-1px);
          }
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.92;
          }
        }

        @keyframes shimmerFlow {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes liquidRipple {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 0.04;
          }
          50% {
            transform: scale(1.15) translateY(-8px);
            opacity: 0.01;
          }
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background: rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </main>
  )
}