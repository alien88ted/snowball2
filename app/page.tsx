"use client";

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
  const [dollars, setDollars] = useState<{
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
  }[]>([])

  const [connections, setConnections] = useState<{
    from: number
    to: number
    strength: number
    pulse: number
  }[]>([])

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
        scale: layer === 0 ? 0.12 + Math.random() * 0.20 :
               layer === 1 ? 0.25 + Math.random() * 0.30 :
               layer === 2 ? 0.45 + Math.random() * 0.40 :
               0.65 + Math.random() * 0.55, // Bigger front layer with more variation
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

        // MAXIMUM optimized spawn rate - buttery smooth
        if (Math.random() < 0.012 && newDollars.length < 18) {
          newDollars.push(spawnDollar())
        }

        // Minimal connections - only update every 10 frames
        if (frameCount % 10 === 0) {
          const activeConnections: typeof connections = []
          const maxConnections = 4

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

            // ENHANCED layer-dependent mouse interaction - fluid and responsive
            const interactionRadius = d.layer === 3 ? 55 : d.layer === 2 ? 40 : d.layer === 1 ? 25 : 15
            const forceMult = d.layer === 3 ? 0.22 : d.layer === 2 ? 0.15 : d.layer === 1 ? 0.10 : 0.05

            let forceX = 0
            let forceY = 0
            let wakeEffect = 0

            if (distance < interactionRadius && distance > 1) {
              // DRAMATIC force with mouse intensity and velocity - ENHANCED
              const baseForce = Math.pow(1 - distance / interactionRadius, 2.4)
              const intensityMult = 1 + mouseRef.current.intensity * 1.5
              const force = baseForce * forceMult * intensityMult

              forceX = -(dx / distance) * force
              forceY = -(dy / distance) * force

              // VORTEX effect - dramatic swirl with depth
              const tangentX = -dy / distance
              const tangentY = dx / distance
              const swirlStrength = mouseRef.current.intensity * (0.6 + d.layer * 0.15)
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

            // REMOVED clustering for maximum performance

            // Update velocity with forces
            let newVx = d.vx + forceX
            let newVy = d.vy + forceY

            // Layer-based damping - smooth floaty motion
            const damping = d.layer === 0 ? 0.97 : d.layer === 1 ? 0.94 : d.layer === 2 ? 0.91 : 0.88
            newVx *= damping
            newVy *= damping

            // Complex wave motion with layer depth - more fluid
            const waveComplexity = d.layer === 3 ? 2.2 : d.layer === 2 ? 1.6 : d.layer === 1 ? 1.1 : 0.6
            const waveX = Math.sin((frameCount * 0.010) + d.phase) * 0.030 * waveComplexity +
                         Math.sin((frameCount * 0.003) + d.phase * 2) * 0.015
            const waveY = Math.cos((frameCount * 0.007) + d.phase * 0.7) * 0.022 * waveComplexity +
                         Math.sin((frameCount * 0.005) + d.phase * 1.3) * 0.012

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

// Typewriter effect for business names
function useTypewriter() {
  const words = ['coffee', 'cafe', 'gym', 'bakery', 'laundry', 'salon', 'market']
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timeout = isDeleting ? 80 : 150

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1))
        } else {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex])

  return text
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const typewriterText = useTypewriter()

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
            {/* Ambient background aura */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 40%,
                    rgba(99, 102, 241, 0.04) 0%,
                    rgba(168, 85, 247, 0.02) 25%,
                    transparent 55%)`,
                  animation: 'pulse 10s ease-in-out infinite'
                }}
              />
            </div>

            {/* Dynamic connection network - ULTRA OPTIMIZED */}
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <defs>
                <linearGradient id="connectionGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {connections.slice(0, 8).map((conn) => {
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
                    stroke="url(#connectionGradientBlue)"
                    strokeWidth="1"
                    opacity={conn.strength * 0.5}
                  />
                )
              })}
            </svg>

            {/* Layer 0: Far Background - Atmospheric depth with bokeh */}
            {floatingDollars.filter(d => d.layer === 0).map(dollar => {
              const softGlow = Math.sin(dollar.pulsePhase * 0.8) * 0.1 + 1
              const getColor = () => {
                switch (dollar.colorVariant) {
                  case 'primary': return 'rgba(99, 102, 241, 0.3)'
                  case 'accent': return 'rgba(168, 85, 247, 0.3)'
                  case 'amber': return 'rgba(245, 158, 11, 0.3)'
                  default: return 'rgba(99, 102, 241, 0.3)'
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
                    opacity: dollar.opacity * 0.22 * softGlow,
                    fontSize: `${2.5 + dollar.scale * 2.5}rem`,
                    color: getColor(),
                    filter: `blur(${2.5 + dollar.scale * 0.5}px)`,
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 1: Background - Soft ethereal presence */}
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
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(99, 102, 241, ${dollar.opacity * 0.45}))`
                  }
                  break
                case 'accent':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(147, 51, 234))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(168, 85, 247, ${dollar.opacity * 0.45}))`
                  }
                  break
                case 'amber':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(245, 158, 11), rgb(217, 119, 6))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(245, 158, 11, ${dollar.opacity * 0.45}))`
                  }
                  break
                default:
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${20 + trailGlow * 10}px rgba(99, 102, 241, ${dollar.opacity * 0.45}))`
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
                    opacity: dollar.opacity * 0.48,
                    fontSize: `${3.5 + dollar.scale * 3}rem`,
                    ...colorStyle
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 2: Mid-ground - Optimized luminous presence */}
            {floatingDollars.filter(d => d.layer === 2).map(dollar => {
              const trailGlow = dollar.trailOpacity * 0.6
              let colorStyle = {}

              switch (dollar.colorVariant) {
                case 'primary':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${35 + trailGlow * 18}px rgba(99, 102, 241, ${dollar.opacity * 0.65})) drop-shadow(0 0 ${18 + trailGlow * 9}px rgba(79, 70, 229, ${dollar.opacity * 0.4}))`
                  }
                  break
                case 'accent':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(147, 51, 234))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${35 + trailGlow * 18}px rgba(168, 85, 247, ${dollar.opacity * 0.65})) drop-shadow(0 0 ${18 + trailGlow * 9}px rgba(147, 51, 234, ${dollar.opacity * 0.4}))`
                  }
                  break
                case 'amber':
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(245, 158, 11), rgb(217, 119, 6))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${35 + trailGlow * 18}px rgba(245, 158, 11, ${dollar.opacity * 0.65})) drop-shadow(0 0 ${18 + trailGlow * 9}px rgba(217, 119, 6, ${dollar.opacity * 0.4}))`
                  }
                  break
                default:
                  colorStyle = {
                    background: `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 ${35 + trailGlow * 18}px rgba(99, 102, 241, ${dollar.opacity * 0.65})) drop-shadow(0 0 ${18 + trailGlow * 9}px rgba(168, 85, 247, ${dollar.opacity * 0.4}))`
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
                    opacity: dollar.opacity * 0.72,
                    fontSize: `${4.5 + dollar.scale * 3.5}rem`,
                    ...colorStyle
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Layer 3: Foreground - OPTIMIZED premium with dynamic gradients */}
            {floatingDollars.filter(d => d.layer === 3).map(dollar => {
              const trailGlow = dollar.trailOpacity * 1.0

              return (
                <div
                  key={dollar.id}
                  className="absolute font-serif font-bold select-none pointer-events-none"
                  style={{
                    left: `${dollar.x}%`,
                    top: `${dollar.y}%`,
                    transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
                    opacity: dollar.opacity * 0.88,
                    fontSize: `${5.5 + dollar.scale * 4}rem`,
                    background: dollar.colorVariant === 'primary'
                      ? `linear-gradient(135deg, rgb(99, 102, 241), rgb(59, 130, 246))`
                      : dollar.colorVariant === 'accent'
                      ? `linear-gradient(135deg, rgb(168, 85, 247), rgb(192, 132, 252))`
                      : dollar.colorVariant === 'amber'
                      ? `linear-gradient(135deg, rgb(245, 158, 11), rgb(251, 191, 36))`
                      : `linear-gradient(135deg, rgb(99, 102, 241), rgb(168, 85, 247))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `
                      drop-shadow(0 0 ${45 + trailGlow * 25}px rgba(${dollar.colorVariant === 'primary' ? '99, 102, 241' : dollar.colorVariant === 'accent' ? '168, 85, 247' : '245, 158, 11'}, ${dollar.opacity * 0.75}))
                      drop-shadow(0 0 ${22 + trailGlow * 12}px rgba(${dollar.colorVariant === 'primary' ? '59, 130, 246' : dollar.colorVariant === 'accent' ? '192, 132, 252' : '251, 191, 36'}, ${dollar.opacity * 0.5}))
                      drop-shadow(0 2px 6px rgba(0, 0, 0, ${dollar.opacity * 0.12}))
                    `
                  }}
                >
                  $
                </div>
              )
            })}

            {/* Ambient light spots - ultra optimized */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(2)].map((_, i) => (
                <div
                  key={`ambient-${i}`}
                  className="absolute"
                  style={{
                    left: `${35 + i * 25}%`,
                    top: `${25 + i * 30}%`,
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle,
                      rgba(99, 102, 241, ${0.04 - i * 0.01}) 0%,
                      transparent 50%)`,
                    filter: 'blur(40px)',
                    transform: `scale(${1.5 + i * 0.3})`,
                    animation: `float ${10 + i * 3}s ease-in-out infinite`,
                    animationDelay: `${i * 2.5}s`
                  }}
                />
              ))}
            </div>
          </div>
      )}

      {/* Hero Section - OPTIMIZED AURORA */}
      <section
        ref={heroTrigger.ref as any}
        className="relative min-h-[75vh] flex items-center justify-center px-6 pt-32 pb-32 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgb(248, 250, 252) 0%, rgba(239, 246, 255, 0.3) 40%, rgba(250, 245, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%)'
        }}
      >
        {/* STUNNING AURORA BACKGROUND - OPTIMIZED */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Main Aurora Layer - MASSIVE morphing gradient blobs */}
          <div className="absolute inset-0">
            {/* Giant morphing aurora blobs */}
            <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-400/25 via-indigo-400/20 to-cyan-400/15 rounded-full blur-3xl"
              style={{
                animation: 'morphBlob 25s ease-in-out infinite, float 20s ease-in-out infinite',
                willChange: 'transform'
              }} />

            <div className="absolute -bottom-1/4 -right-1/4 w-[1100px] h-[1100px] bg-gradient-to-tl from-purple-400/25 via-violet-400/20 to-pink-400/15 rounded-full blur-3xl"
              style={{
                animation: 'morphBlob 30s ease-in-out infinite reverse, float 25s ease-in-out infinite reverse',
                willChange: 'transform'
              }} />

            <div className="absolute top-1/3 -left-1/3 w-[900px] h-[900px] bg-gradient-to-br from-cyan-400/20 via-blue-300/15 to-indigo-400/15 rounded-full blur-3xl"
              style={{
                animation: 'morphBlob 20s ease-in-out infinite, float 22s ease-in-out infinite',
                animationDelay: '3s',
                willChange: 'transform'
              }} />

            <div className="absolute -top-1/3 right-1/4 w-[950px] h-[950px] bg-gradient-to-bl from-indigo-400/20 via-purple-300/15 to-blue-400/15 rounded-full blur-3xl"
              style={{
                animation: 'morphBlob 28s ease-in-out infinite reverse, float 24s ease-in-out infinite',
                animationDelay: '7s',
                willChange: 'transform'
              }} />

            <div className="absolute bottom-1/3 right-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-violet-400/18 via-purple-300/12 to-transparent rounded-full blur-3xl"
              style={{
                animation: 'morphBlob 22s ease-in-out infinite, float 26s ease-in-out infinite reverse',
                animationDelay: '5s',
                willChange: 'transform'
              }} />

            {/* Rotating massive aurora rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
              style={{
                animation: 'spin 70s linear infinite',
                willChange: 'transform'
              }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-transparent via-transparent to-purple-400/15 rounded-full blur-2xl" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
              style={{
                animation: 'spin 50s linear infinite reverse',
                willChange: 'transform'
              }}>
              <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/12 via-transparent via-transparent to-cyan-400/12 rounded-full blur-2xl" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px]"
              style={{
                animation: 'spin 90s linear infinite',
                willChange: 'transform'
              }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-400/10 via-transparent via-transparent via-transparent to-pink-400/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Elegant grid with perspective - OPTIMIZED */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: 'perspective(1000px) rotateX(60deg) scale(2)',
              transformOrigin: 'center center',
              maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
              willChange: 'transform'
            }}
          />

          {/* Enhanced floating particles - REDUCED COUNT */}
          {mounted && [...Array(15)].map((_, i) => {
            const size = i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5;
            const speed = 25 + Math.random() * 15;

            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${100 + Math.random() * 20}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: i % 3 === 0
                    ? 'radial-gradient(circle, rgba(99, 102, 241, 0.7), rgba(99, 102, 241, 0.2))'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, rgba(168, 85, 247, 0.7), rgba(168, 85, 247, 0.2))'
                    : 'radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.2))',
                  animation: `floatParticle ${speed}s linear infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                  opacity: 0.6,
                  willChange: 'transform, opacity'
                }}
              />
            );
          })}

          {/* Shimmer waves - OPTIMIZED */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/6 to-transparent"
            style={{
              animation: 'shimmerDown 12s ease-in-out infinite',
              willChange: 'transform'
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-100/5 to-transparent"
            style={{
              animation: 'shimmerDown 10s ease-in-out infinite reverse',
              animationDelay: '3s',
              willChange: 'transform'
            }} />

          {/* Central radiant core - ENHANCED */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(168, 85, 247, 0.12) 30%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
              animation: 'breathe 8s ease-in-out infinite, slowSpin 50s linear infinite',
              willChange: 'transform'
            }}
          />

          {/* Vignette for depth */}
          <div className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(248, 250, 252, 0.3) 100%)'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">

          {/* Centerpiece $ with Typewriter - Horizontally Aligned */}
          <div className="relative mb-14 flex flex-row items-center justify-center gap-1">
            {/* $ Symbol */}
            <div className="relative">
              <div
                className="text-[56px] md:text-[72px] font-serif font-bold text-gray-900 leading-none select-none"
                style={{
                  animation: 'liquidMorph 6s ease-in-out infinite, breathe 4s ease-in-out infinite',
                  letterSpacing: '-0.02em',
                  filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.06))'
                }}
              >
                $
              </div>

              {/* Flowing shimmer overlay */}
              <div
                className="absolute inset-0 text-[56px] md:text-[72px] font-serif font-bold leading-none select-none pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
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
            </div>

            {/* Typewriter Business Names - Matching $ Style */}
            <div className="inline-flex items-center gap-0.5">
              <span
                className="text-[56px] md:text-[72px] font-serif font-bold text-gray-900 leading-none select-none"
                style={{
                  letterSpacing: '-0.02em',
                  filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.06))'
                }}
              >
                {mounted ? typewriterText : 'coffee'}
              </span>
              <span
                className="inline-block w-1 h-12 md:h-16 bg-gray-900 animate-pulse ml-1"
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>

          {/* Main Headline - Powerful & Clear */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] mb-6">
            <span className="block text-gray-900 mb-1">
              Own real businesses.
            </span>
            <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Earn from every sale.
            </span>
          </h1>

          {/* Subheadline - Elegant & Concise */}
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Tokenized equity in local businesses.<br className="hidden sm:block" />
            Start with $100. Get monthly profits.
          </p>

          {/* CTA Buttons - Refined */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/explorer">
              <button className="group px-7 py-3.5 bg-gray-900 text-white rounded-xl font-medium transition-all hover:bg-gray-800 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] duration-300">
                <span className="flex items-center gap-2">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                </span>
              </button>
            </Link>

            <Link href="#how">
              <button className="px-7 py-3.5 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ultra-Premium Live Opportunities Section */}
      <section
        ref={coffeeTrigger.ref as any}
        className="relative -mt-20 py-24 px-6 overflow-hidden"
      >
        {/* Dynamic background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-24">
            <div className={`transition-all duration-1000 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative inline-block mb-6">
                {/* Live pulse indicator */}
                <div className="absolute -top-4 -right-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-lg">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Live Now</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent leading-none tracking-tight">
                  Active investments
                </h2>
              </div>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join thousands investing in community-owned businesses
              </p>

              {/* Live stats bar */}
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">$2.4M</span>
                  <span className="text-sm text-gray-500">Total invested</span>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">18%</span>
                  <span className="text-sm text-gray-500">Avg. returns</span>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">5,421</span>
                  <span className="text-sm text-gray-500">Investors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Premium Investment Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Coffee Investment - Ultra Premium Card */}
            <div className={`group relative transition-all duration-700 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Floating glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />

              <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 via-transparent to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Header with live indicator and token */}
                <div className="relative p-8 pb-0">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      $COFFEE
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 backdrop-blur px-3 py-1.5 rounded-full border border-green-500/30">
                      <div className="relative">
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-xs font-semibold text-green-700">LIVE</span>
                    </div>
                  </div>

                  {/* Business info with animated icon */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-8 h-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      {/* Rotating badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-spin-slow">
                        ⚡
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">Artisan Coffee Co.</h3>
                      <p className="text-sm text-gray-600">Premium chain • 12 locations</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-6">
                  {/* Live metrics grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">Monthly Revenue</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">$240k</span>
                        <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">+12%</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">APY</div>
                      <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        15-18%
                      </div>
                    </div>
                  </div>

                  {/* Animated funding progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Funding Progress</span>
                      <span className="text-xs font-bold text-gray-900">84% • $420k/$500k</span>
                    </div>
                    <div className="relative h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-orange-100/50" />
                      <div
                        className="relative h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full shadow-sm transition-all duration-1500 ease-out flex items-center justify-end pr-1"
                        style={{
                          width: coffeeTrigger.isVisible ? '84%' : '0%',
                          backgroundSize: '200% 100%',
                          animation: 'gradient-flow 3s ease infinite'
                        }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Investor avatars */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white shadow-sm flex items-center justify-center">
                        <span className="text-xs font-bold text-white">+1.8k</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">investors</span>
                  </div>

                  {/* Premium CTA */}
                  <Link href="/explorer/coffee">
                    <button className="relative w-full group/btn overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" style={{
                        backgroundSize: '200% 100%',
                        animation: 'gradient-flow 3s ease infinite'
                      }} />
                      <div className="relative px-6 py-3.5 flex items-center justify-center gap-2 text-white font-semibold">
                        <span>Invest Now</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>
                  </Link>

                  <div className="text-center mt-3">
                    <span className="text-xs text-gray-500">Min. investment: <span className="font-bold text-gray-700">$100</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gym Card - Premium Design */}
            <div className={`group relative transition-all duration-700 delay-100 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-green-600">LIVE</span>
                </div>

                <div className="relative">
                  {/* Premium Icon */}
                  <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6.5 6.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0" />
                      <path d="M17.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0" />
                      <path d="M6.5 10v7.5" />
                      <path d="M17.5 14v-7.5" />
                      <path d="M6.5 17.5h11" />
                      <path d="M6.5 6.5h11" />
                    </svg>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-1">$gym</div>
                  <div className="text-sm text-gray-500 mb-6">Fitness Centers Network</div>

                  {/* Stats */}
                  <div className="space-y-3 py-4 border-t border-gray-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="font-semibold text-gray-900">$480k</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Locations</span>
                      <span className="font-semibold text-gray-900">8 centers</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Investors</span>
                      <span className="font-semibold text-gray-900">2,341</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="my-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span className="font-medium">92% Funded</span>
                      <span>$736K / $800K</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1500 ease-out"
                        style={{ width: coffeeTrigger.isVisible ? '92%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* APY Badge */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Est. APY</span>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">32%</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/explorer/gym">
                    <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bakery Card - Premium Design */}
            <div className={`group relative transition-all duration-700 delay-200 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Coming Soon indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-yellow-600">SOON</span>
                </div>

                <div className="relative">
                  {/* Premium Icon */}
                  <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-rose-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                      <path d="M12 15c-4.5 0-6.5 2.5-6.5 5.5S7.5 22 12 22s6.5 0 6.5-1.5-2-5.5-6.5-5.5z" />
                      <path d="M9 12v.01" />
                      <path d="M15 12v.01" />
                    </svg>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-1">$bakery</div>
                  <div className="text-sm text-gray-500 mb-6">Artisan Bakeries</div>

                  {/* Stats */}
                  <div className="space-y-3 py-4 border-t border-gray-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Target Revenue</span>
                      <span className="font-semibold text-gray-900">$180k/mo</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Planned Locations</span>
                      <span className="font-semibold text-gray-900">5 shops</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Launch Date</span>
                      <span className="font-semibold text-gray-900">Q1 2025</span>
                    </div>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="my-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span className="font-medium">Opening Soon</span>
                      <span>Target: $500K</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-50" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* APY Badge */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Target APY</span>
                      <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">35%</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium cursor-not-allowed">
                    Get Notified →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ultra-Premium How It Works Section */}
      <section
        ref={howTrigger.ref as any}
        id="how"
        className="relative py-32 px-6 overflow-hidden"
      >
        {/* Dynamic gradient background that flows */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20" />
        </div>

        {/* Subtle floating $ symbols - smooth and elegant */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: '10%', top: '20%', delay: 0, size: 24 },
            { left: '80%', top: '30%', delay: 2, size: 32 },
            { left: '20%', top: '70%', delay: 4, size: 28 },
            { left: '70%', top: '60%', delay: 6, size: 24 },
            { left: '50%', top: '40%', delay: 8, size: 36 },
          ].map((pos, i) => (
            <div
              key={`how-dollar-${i}`}
              className="absolute text-indigo-500/5"
              style={{
                left: pos.left,
                top: pos.top,
                fontSize: `${pos.size}px`,
                animation: `gentleFloat ${20 + i * 2}s ease-in-out ${pos.delay}s infinite`,
              }}
            >
              $
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Premium Section Header with liquid effect */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 leading-none tracking-tight transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                How it works
              </h2>
              {/* Subtle underline animation */}
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent transition-all duration-1000 ${
                howTrigger.isVisible ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </div>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto mt-8 transition-all duration-700 delay-200 ${
              howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Three steps to community ownership
            </p>
          </div>

          {/* Ultra-Premium Process Cards with Liquid Morphing */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {/* Connecting line animation */}
              <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 pointer-events-none hidden lg:block" viewBox="0 0 1000 2">
                <line x1="200" y1="1" x2="800" y2="1" stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5" opacity="0.2">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                </line>
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                    <stop offset="50%" stopColor="rgb(168, 85, 247)" />
                    <stop offset="100%" stopColor="rgb(99, 102, 241)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Step 1: Discover - Glassmorphic Card */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  {/* Floating number with glow */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    1
                  </div>

                  {/* Premium animated icon */}
                  <div className="mb-8 relative h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-2xl animate-pulse" />
                    <svg className="w-20 h-20 relative z-10" viewBox="0 0 80 80" fill="none">
                      {/* Morphing search glass */}
                      <circle cx="35" cy="35" r="20" stroke="url(#grad1)" strokeWidth="3" fill="none">
                        <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <line x1="48" y1="48" x2="60" y2="60" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round">
                        <animate attributeName="x2" values="60;62;60" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="60;62;60" dur="3s" repeatCount="indefinite" />
                      </line>

                      {/* Floating mini $ symbols inside */}
                      <text x="35" y="40" textAnchor="middle" fill="url(#grad1)" fontSize="16" fontWeight="bold" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                        $
                      </text>

                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                          <stop offset="100%" stopColor="rgb(168, 85, 247)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                    Discover
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Browse curated businesses ready for community investment
                  </p>

                  {/* Hover reveal detail */}
                  <div className="mt-6 pt-6 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-center gap-2 text-sm text-indigo-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span>Explore opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Invest - Premium Glassmorphic Card */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '150ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  {/* Floating number with glow */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    2
                  </div>

                  {/* Premium animated icon */}
                  <div className="mb-8 relative h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-2xl animate-pulse" />

                    {/* Liquid wallet animation */}
                    <svg className="w-20 h-20 relative z-10" viewBox="0 0 80 80" fill="none">
                      <rect x="20" y="30" width="40" height="30" rx="4" stroke="url(#grad2)" strokeWidth="3" fill="none">
                        <animate attributeName="rx" values="4;6;4" dur="3s" repeatCount="indefinite" />
                      </rect>

                      {/* Morphing $ symbol flowing in */}
                      <g>
                        <text x="40" y="25" textAnchor="middle" fill="url(#grad2)" fontSize="20" fontWeight="bold">
                          $
                          <animateTransform attributeName="transform" type="translate" from="0 -20" to="0 20" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </text>
                      </g>

                      {/* Pulse effect */}
                      <circle cx="40" cy="45" r="25" fill="none" stroke="url(#grad2)" strokeWidth="1" opacity="0">
                        <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                      </circle>

                      <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                          <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                    Invest
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Start with just $100. Own real equity in local businesses
                  </p>

                  {/* Hover reveal detail */}
                  <div className="mt-6 pt-6 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Secure blockchain</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Earn - Premium Glassmorphic Card */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  {/* Floating number with glow */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    3
                  </div>

                  {/* Premium animated icon */}
                  <div className="mb-8 relative h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl animate-pulse" />

                    {/* Growing chart with liquid effect */}
                    <svg className="w-20 h-20 relative z-10" viewBox="0 0 80 80" fill="none">
                      {/* Chart bars with growth animation */}
                      <rect x="20" y="50" width="8" height="10" fill="url(#grad3)">
                        <animate attributeName="height" values="10;15;10" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="y" values="50;45;50" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <rect x="36" y="40" width="8" height="20" fill="url(#grad3)">
                        <animate attributeName="height" values="20;30;20" dur="3s" begin="0.5s" repeatCount="indefinite" />
                        <animate attributeName="y" values="40;30;40" dur="3s" begin="0.5s" repeatCount="indefinite" />
                      </rect>
                      <rect x="52" y="30" width="8" height="30" fill="url(#grad3)">
                        <animate attributeName="height" values="30;40;30" dur="3s" begin="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="30;20;30" dur="3s" begin="1s" repeatCount="indefinite" />
                      </rect>

                      {/* Floating $ symbols */}
                      <text x="40" y="20" textAnchor="middle" fill="url(#grad3)" fontSize="14" fontWeight="bold">
                        $
                        <animateTransform attributeName="transform" type="translate" from="0 40" to="0 -20" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                      </text>

                      {/* Upward trend arrow */}
                      <path d="M 15 45 L 60 25" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                      </path>
                      <path d="M 52 25 L 60 25 L 60 33" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                      <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                          <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                    Earn
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monthly profit distributions directly to your wallet
                  </p>

                  {/* Hover reveal detail */}
                  <div className="mt-6 pt-6 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>Real returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why $NOW - Premium Storytelling Section */}
          <div className="relative mt-32 mb-32">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5 rounded-full blur-3xl" />
            </div>

            {/* Premium header with depth */}
            <div className="text-center mb-20 relative">
              <div className={`transition-all duration-1000 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-2">
                  <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                    Why
                  </span>
                  <span className="relative inline-block ml-4">
                    <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg" />
                    <span className="relative text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                      $NOW
                    </span>
                  </span>
                  <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                    ?
                  </span>
                </h3>
                <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                  The future of investing isn't on Wall Street. It's on Main Street.
                </p>
              </div>
            </div>

            {/* Premium Value Propositions - 4 Pillars */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Pillar 1: Radical Transparency */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '200ms' }}>
                <div className="h-full">
                  <div className="relative h-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-indigo-300/50 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    {/* Premium Icon with Animation */}
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                          {/* Shield with checkmark - security/blockchain icon */}
                          <div className="relative">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            {/* Pulse animation */}
                            <div className="absolute inset-0">
                              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" className="animate-ping opacity-30" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">On-Chain Truth</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Every transaction verified. Every return tracked. Complete transparency.
                    </p>

                    {/* Visual indicator */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                        </div>
                        <span className="text-xs font-medium text-indigo-600">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Community Power */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="h-full">
                  <div className="relative h-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-green-300/50 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    {/* Premium Icon with Animation */}
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                          {/* Users group icon with floating effect */}
                          <div className="relative animate-pulse">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                          </div>
                          {/* Floating hearts animation */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                              <div className="text-green-400 text-xs animate-float opacity-60">❤</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">People Power</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Owned by employees and customers. Not Wall Street.
                    </p>

                    {/* Visual indicator */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-gray-600">10k+ investors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Real Returns */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '400ms' }}>
                <div className="h-full">
                  <div className="relative h-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-purple-300/50 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    {/* Premium Icon with Animation */}
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                          {/* Trending up chart icon */}
                          <div className="relative">
                            <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                            {/* Sparkles animation */}
                            <div className="absolute -top-1 -right-1">
                              <svg className="w-4 h-4 text-purple-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                          </div>
                          {/* Rising dollars effect */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-purple-400 text-sm font-bold opacity-0 animate-float">
                              $
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">Monthly Profits</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Real revenue sharing. Not speculation. Actual business profits.
                    </p>

                    {/* Visual indicator */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Avg return</span>
                        <span className="font-bold text-purple-600">12-18%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 4: Accessibility */}
              <div className={`relative group transition-all duration-700 ${
                howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '500ms' }}>
                <div className="h-full">
                  <div className="relative h-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-amber-300/50 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    {/* Premium Icon with Animation */}
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                          {/* Unlock/accessibility icon */}
                          <div className="relative">
                            <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-full bg-amber-400/20 scale-0 group-hover:scale-150 transition-transform duration-500" />
                          </div>
                          {/* Dollar sign entering */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-amber-500 font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                              $
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">Start Small</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Begin with $100. No accreditation. No gatekeepers.
                    </p>

                    {/* Visual indicator */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Minimum</span>
                        <span className="font-bold text-amber-600">$100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Premium Live Demo Section */}
          <div className="relative mb-32">
            {/* Floating background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900/50 to-gray-900 rounded-3xl p-12 overflow-hidden">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                                   linear-gradient(180deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  animation: 'slideGrid 20s linear infinite',
                }} />
              </div>

              {/* Floating $ symbols in background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`demo-dollar-${i}`}
                    className="absolute text-white/10 animate-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 40}%`,
                      fontSize: '80px',
                      animationDelay: `${i * 2}s`,
                      animationDuration: '15s',
                    }}
                  >
                    $
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                {/* Premium header */}
                <div className="text-center mb-12">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                      Live Investment Calculator
                    </span>
                  </h3>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    See your potential returns in real-time
                  </p>
                </div>

                {/* Interactive Calculator Cards */}
                <div className="grid lg:grid-cols-3 gap-6 mb-12">
                  {/* Investment Input Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-300 uppercase tracking-wider">Your Investment</span>
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">$</span>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-white mb-4">
                        $5,000
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" style={{ width: '75%' }}>
                            <div className="h-full bg-white/30 animate-pulse" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Min: $100</span>
                          <span>Max: $10k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Returns Card with Animation */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-300 uppercase tracking-wider">Annual Return</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                          </svg>
                          <span className="text-xs text-green-400">+2.3%</span>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-white mb-4">
                        15.8%
                      </div>
                      {/* Animated chart bars */}
                      <div className="flex items-end justify-between h-12 gap-1">
                        {[40, 60, 45, 80, 65, 90, 75].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-green-400 to-emerald-400 rounded-t opacity-60"
                            style={{
                              height: `${height}%`,
                              animation: `growBar 1s ease-out ${i * 0.1}s both`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Monthly Earnings Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-300 uppercase tracking-wider">Monthly Profit</span>
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full" />
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-white mb-4">
                        $65.83
                      </div>
                      {/* Flowing money animation */}
                      <div className="relative h-12 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-2xl text-purple-400/40 animate-float">
                            {[...'$$$$$$'].map((char, i) => (
                              <span
                                key={i}
                                className="inline-block"
                                style={{
                                  animation: `floatUp 3s linear ${i * 0.5}s infinite`,
                                }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA with glow effect */}
                <div className="text-center">
                  <button className="relative group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                    <span className="relative">Start Investing Now →</span>
                  </button>
                  <p className="mt-4 text-sm text-gray-400">
                    Join 10,000+ community investors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & CTA */}
      <section className="py-48 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Philosophy */}
          <div className="mb-32">
            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-400 leading-[1.3] font-light mb-8">
              Employees should own the businesses they build. Customers should benefit from the businesses they support.
            </p>
            <p className="text-2xl md:text-3xl text-gray-600 font-light leading-[1.4]">
              Profits should flow back to the community.
            </p>
          </div>

          {/* CTA */}
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-12 leading-[1.1] tracking-tight">
              Ready to own<br className="hidden sm:block" /> real equity?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explorer">
                <button className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2">
                  Start Investing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/franchise/apply">
                <button className="px-8 py-4 rounded-xl font-medium border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
                  List Your Business
                </button>
              </Link>
            </div>
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

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
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

        @keyframes slideGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes growBar {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            opacity: 0.6;
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes shimmerFlow {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes shimmerDown {
          0%, 100% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            transform: translateY(100%);
            opacity: 1;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
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

        @keyframes flowWave {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-30px) translateY(-15px);
          }
        }

        @keyframes beamPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(1) rotate(2deg);
          }
          50% {
            opacity: 0.6;
            transform: scaleY(1.1) rotate(2deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        @keyframes morphBlob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 40% 60% 50% 50% / 50% 50% 60% 40%;
            transform: scale(1.05) rotate(90deg);
          }
          50% {
            border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
            transform: scale(0.95) rotate(180deg);
          }
          75% {
            border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
            transform: scale(1.02) rotate(270deg);
          }
        }

        @keyframes rayRotate {
          0% {
            transform: rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) translateX(30px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes twinkleStar {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes ambientPulse {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) translateY(-10px);
            opacity: 0.7;
          }
        }

        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slowSpin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes floatOrbit {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(10px, -15px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(20px, -5px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(10px, 10px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes steamRise {
          0% {
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) scaleX(1.5);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-60px) scaleX(2);
            opacity: 0;
          }
        }

        @keyframes liquidShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes liquidFlow {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes planeGlide {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(-15deg);
          }
          50% {
            transform: translateX(100px) translateY(-10px) rotate(-15deg);
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
