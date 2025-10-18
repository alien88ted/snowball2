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

      {/* Products & How It Works - Transparent Cards */}
      <section
        ref={coffeeTrigger.ref as any}
        className="relative -mt-32 py-20 px-6 overflow-visible"
      >
        {/* Ultra-subtle gradient - perfect blending with hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">
              Live Investment Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real businesses, real returns. Start with $100.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Coffee Card */}
            <div className={`group relative transition-all duration-700 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-blue-200/50 hover:shadow-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.8) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
              >
            {/* Paper grain texture */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)' /%3E%3C/svg%3E")`,
              }}
            />

            {/* Notebook lines */}
            <div className="absolute inset-0 pointer-events-none rounded-sm"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(156, 163, 175, 0.12) 39px, rgba(156, 163, 175, 0.12) 40px)',
                backgroundSize: '100% 40px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
              }}
            />

            {/* Red margin line */}
            <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-red-400/20" />

            {/* Paper clips and stamps */}
            <div className="absolute -top-6 right-8 text-5xl opacity-25 rotate-12">📎</div>
            <div className="absolute top-8 -right-4 -rotate-12">
              <div className="border-4 border-blue-400/20 rounded-lg px-3 py-1.5 text-blue-600/30 font-mono font-bold text-xs tracking-wider">
                PILOT v1
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 ${
                coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Header with handwritten style */}
                <div className="absolute -top-2 -right-2 bg-green-50 border border-green-200 rounded-full px-2 py-1 text-xs font-medium text-green-700 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </div>

              {/* Main $coffee title with doodles */}
              <div className="relative mb-16">
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-gray-900 leading-none tracking-tight mb-6">
                  $coffee
                </h2>

                {/* Paper airplane gliding across */}
                {mounted && (
                  <div className="absolute -top-12 left-0 right-0 overflow-hidden">
                    <div
                      className="relative"
                      style={{
                        animation: 'planeGlide 10s ease-in-out infinite',
                      }}
                    >
                      <div className="text-4xl opacity-60" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}>✈️</div>
                    </div>
                  </div>
                )}

                {/* Dotted paper airplane trail */}
                <div className="absolute top-0 left-0 right-0 h-px">
                  <svg className="w-full h-px opacity-15" viewBox="0 0 1000 2" preserveAspectRatio="none">
                    <line x1="0" y1="1" x2="1000" y2="1" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8, 8" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Hand-drawn underline */}
                <svg className="w-80 h-4 -mt-2 ml-1" viewBox="0 0 300 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5 Q75 3, 150 6 T295 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-amber-400/40" />
                  <path d="M5 7 Q75 5, 150 8 T295 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-amber-400/30" />
                </svg>

                {/* Star doodles around */}
                <div className="absolute -right-8 -top-6 text-3xl opacity-40 rotate-12">⭐</div>
                <div className="absolute -left-4 top-1/2 text-2xl opacity-30 -rotate-12">✨</div>
              </div>

              {/* Two column layout with handwritten notes */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                {/* Left column - Details */}
                <div className="space-y-10">
                  {/* Location block */}
                  <div className="relative">
                    <div className="inline-block mb-2 text-xs font-mono text-gray-500 uppercase tracking-wider px-2 py-0.5 border border-dashed border-gray-300 rounded bg-gray-50">
                      📍 Destination
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Beirut Specialty Coffee
                    </h3>
                    <p className="text-lg text-gray-600">Hamra Street</p>

                    {/* Location marker doodle */}
                    <svg className="absolute -right-6 top-0 w-6 h-6 text-red-400/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>

                  {/* Description */}
                  <div className="relative pl-6 border-l-2 border-dashed border-blue-200">
                    <p className="text-lg text-gray-700 leading-relaxed italic">
                      "A specialty coffee shop in the heart of Beirut where baristas own equity and every cup sold generates returns for token holders worldwide."
                    </p>
                    {/* Quote mark doodle */}
                    <div className="absolute -left-3 -top-2 text-4xl text-blue-300/40 font-serif">"</div>
                  </div>

                  {/* Metrics with hand-drawn boxes */}
                  <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-br from-amber-50/50 to-orange-50/30 relative">
                    {/* Coffee cup doodle */}
                    <div className="absolute -top-4 -right-4 text-4xl opacity-40 rotate-12">☕</div>

                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-4">Investment Terms</div>

                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between py-2 border-b border-dotted border-amber-300/40">
                        <span className="text-sm text-gray-600 font-medium">Token Price</span>
                        <span className="text-2xl font-bold font-mono text-gray-900">${(priceValue / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex items-baseline justify-between py-2 border-b border-dotted border-amber-300/40 relative">
                        <span className="text-sm text-gray-600 font-medium">Revenue Share</span>
                        <span className="text-2xl font-bold font-mono text-gray-900">{Math.floor(revenueValue)}%</span>
                        {/* Highlight circle */}
                        <svg className="absolute -right-2 top-0 w-16 h-10" viewBox="0 0 60 40" fill="none">
                          <ellipse cx="45" cy="20" rx="15" ry="12" stroke="currentColor" strokeWidth="2" className="text-green-400/40" style={{ strokeDasharray: '2, 3' }} />
                        </svg>
                      </div>
                      <div className="flex items-baseline justify-between py-2 border-b border-dotted border-amber-300/40">
                        <span className="text-sm text-gray-600 font-medium">Est. APY</span>
                        <span className="text-2xl font-bold font-mono text-gray-900">33%</span>
                      </div>
                      <div className="flex items-baseline justify-between py-2">
                        <span className="text-sm text-gray-600 font-medium">Min. Investment</span>
                        <span className="text-2xl font-bold font-mono text-gray-900">${Math.floor(minValue)}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/explorer/coffee">
                    <button className="group w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Board This Flight
                        <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </button>
                  </Link>
                </div>

                {/* Right column - Progress */}
                <div className="space-y-10">
                  {/* Progress block */}
                  <div className="relative">
                    <div className="mb-6">
                      <div className="text-7xl md:text-8xl font-bold text-gray-900 mb-2 relative inline-block" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                        84%
                        {/* Circle around number */}
                        <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]" viewBox="0 0 200 120" fill="none">
                          <ellipse cx="100" cy="60" rx="90" ry="50" stroke="currentColor" strokeWidth="3" className="text-green-400/30" style={{ strokeDasharray: '4, 6' }} />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Funded</div>
                      {/* Checkmark doodle */}
                      <div className="inline-block ml-2">
                        <svg className="w-5 h-5 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    </div>

                    {/* Paper airplane progress */}
                    <div className="relative mb-10">
                      <div className="h-5 bg-gray-200 rounded-full overflow-hidden relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 rounded-full transition-all duration-1500 ease-out"
                          style={{
                            width: coffeeTrigger.isVisible ? '84%' : '0%',
                          }}
                        />
                        {/* Shine effect on progress */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full" />
                      </div>

                      {/* Airplane on progress */}
                      {coffeeTrigger.isVisible && (
                        <div
                          className="absolute -top-1 text-3xl transition-all duration-1500 ease-out"
                          style={{
                            left: '84%',
                            transform: 'translateX(-50%) rotate(-15deg)',
                          }}
                        >
                          ✈️
                        </div>
                      )}

                      {/* Dotted trail */}
                      <div className="absolute top-3 left-0 right-0 h-px pointer-events-none">
                        <svg className="w-full h-px opacity-20" viewBox="0 0 1000 2" preserveAspectRatio="none">
                          <line x1="0" y1="1" x2="1000" y2="1" stroke="#d97706" strokeWidth="2" strokeDasharray="6, 6" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Stats with stickers */}
                    <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-lg border border-dashed border-blue-200 relative">
                      {/* Stamp doodle */}
                      <div className="absolute -top-3 -left-3 bg-red-100 border-2 border-red-300/50 rounded px-2 py-1 text-xs font-mono text-red-600 -rotate-6">
                        LIVE
                      </div>

                      <div className="space-y-3 text-base">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-600">Raised</span>
                          <span className="font-bold font-mono text-gray-900 text-lg">$420,000</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-600">Goal</span>
                          <span className="font-bold font-mono text-gray-900 text-lg">$500,000</span>
                        </div>
                        <div className="flex justify-between items-baseline relative">
                          <span className="text-gray-600">Passengers</span>
                          <span className="font-bold font-mono text-gray-900 text-lg">234</span>
                          {/* Arrow doodle */}
                          <svg className="absolute -right-8 top-0 w-8 h-6 text-purple-300/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-600">Departure</span>
                          <span className="font-bold font-mono text-gray-900 text-lg">47 days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features with checkmarks */}
                  <div className="p-6 border-2 border-gray-300 rounded-lg bg-white relative">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-4">What You Get ✨</div>
                    <div className="space-y-3">
                      {[
                        { text: "Employee ownership model", emoji: "👥" },
                        { text: "Monthly profit distributions", emoji: "💰" },
                        { text: "Established customer base", emoji: "☕" },
                        { text: "On-chain transparency", emoji: "🔗" }
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-700 relative">
                          <div className="mt-0.5">
                            <svg className="w-5 h-5 text-green-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <span className="flex-1">{feature.text}</span>
                          <span className="text-lg opacity-40">{feature.emoji}</span>
                        </div>
                      ))}
                    </div>

                    {/* Star burst corner */}
                    <div className="absolute -bottom-2 -right-2 text-2xl opacity-30 rotate-12">⭐</div>
                  </div>
                </div>
              </div>

              {/* Bottom sticky note */}
              <div className="mt-16 relative">
                <div className="inline-block bg-yellow-100/90 p-6 rounded-sm shadow-lg rotate-1 border-l-4 border-yellow-400/40 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl opacity-40">📌</div>
                  <p className="text-base text-gray-800 font-semibold" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                    "More routes launching soon. Next: $bakery, $gym, $salon" ✈️
                  </p>
                  <div className="mt-4">
                    <Link href="/explorer">
                      <button className="text-sm font-mono text-gray-700 underline hover:text-gray-900 transition-colors">
                        → View all routes
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paper shadow */}
          <div className="h-3 bg-gray-300/20 rounded-b-sm blur-md -mt-1" />
        </div>
      </section>

      {/* How It Works & Why - Premium Paper Document Style */}
      <section
        ref={howTrigger.ref as any}
        id="how"
        className="py-40 px-6 bg-gray-50 relative overflow-hidden"
      >
        {/* Paper texture background */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Paper document container */}
          <div className="relative bg-white shadow-2xl rounded-sm p-12 md:p-16"
            style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            {/* Subtle paper grain */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)' /%3E%3C/svg%3E")`,
              }}
            />

            {/* Lined paper effect */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(156, 163, 175, 0.15) 39px, rgba(156, 163, 175, 0.15) 40px)',
                backgroundSize: '100% 40px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
              }}
            />

            {/* Red margin line (like notebook paper) */}
            <div className="absolute left-20 top-0 bottom-0 w-px bg-red-400/20" />

            {/* Paper clip doodle */}
            <div className="absolute -top-6 right-12 text-6xl opacity-30 rotate-12">📎</div>

            <div className="relative">
              {/* Pilot v1.0 stamp */}
              <div className="absolute -top-8 -left-8 -rotate-12">
                <div className="border-4 border-red-400/30 rounded-lg px-4 py-2 text-red-600/40 font-mono font-bold text-sm tracking-wider">
                  PILOT v1.0
                </div>
              </div>

              {/* How It Works Section */}
              <div className="mb-32">
                {/* Handwritten-style header with underline doodle */}
                <div className="relative mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                    How it works
                  </h2>
                  {/* Hand-drawn underline */}
                  <svg className="w-64 h-3 -mt-1" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5 Q50 3, 100 6 T198 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-400/40" />
                    <path d="M2 7 Q50 5, 100 8 T198 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-400/30" />
                  </svg>
                  {/* Doodle star */}
                  <div className="absolute -right-8 -top-4 text-2xl opacity-40">✨</div>
                </div>

                <div className="space-y-12 relative">
                  {/* Step 1 with circled number */}
                  <div
                    className={`relative pl-16 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    {/* Hand-drawn circle with number */}
                    <div className="absolute left-0 top-0">
                      <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-400/50" style={{ strokeDasharray: '2, 3' }} />
                        <text x="25" y="32" textAnchor="middle" className="text-xl font-bold fill-gray-900">1</text>
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 relative" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Discover
                      {/* Doodle arrow */}
                      <svg className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 text-yellow-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Browse vetted local businesses seeking community investment. Each opportunity is rigorously evaluated for financial viability and community impact.
                    </p>
                    {/* Highlight squiggle under key phrase */}
                    <svg className="w-32 h-2 mt-1 ml-0" viewBox="0 0 100 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3 Q25 1, 50 3 T98 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-300/60" />
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`relative pl-16 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: '150ms' }}
                  >
                    <div className="absolute left-0 top-0">
                      <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-400/50" style={{ strokeDasharray: '2, 3' }} />
                        <text x="25" y="32" textAnchor="middle" className="text-xl font-bold fill-gray-900">2</text>
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 relative" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Invest
                      {/* Dollar sign doodle */}
                      <span className="absolute -left-8 top-0 text-green-400/30 text-xl">$</span>
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Purchase tokens starting at $100. Own real equity in businesses that matter to you. No accreditation required, no minimum net worth.
                    </p>
                    {/* Box highlight */}
                    <div className="inline-block mt-2 px-3 py-1 border-2 border-green-300/40 rounded bg-green-50/30 text-sm font-mono text-green-700">
                      min $100
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`relative pl-16 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    <div className="absolute left-0 top-0">
                      <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-purple-400/50" style={{ strokeDasharray: '2, 3' }} />
                        <text x="25" y="32" textAnchor="middle" className="text-xl font-bold fill-gray-900">3</text>
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 relative" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Earn
                      {/* Star burst doodle */}
                      <svg className="absolute -right-10 top-0 w-6 h-6 text-yellow-400/40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Receive monthly profit distributions directly to your wallet. Watch your investment grow as the business thrives.
                    </p>
                  </div>

                  {/* Flow arrow connecting all steps */}
                  <svg className="absolute left-6 top-16 h-[calc(100%-4rem)] w-px" viewBox="0 0 2 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M1 0 L1 300" stroke="currentColor" strokeWidth="2" strokeDasharray="8, 8" strokeLinecap="round" className="text-gray-300" />
                  </svg>
                </div>
              </div>

              {/* Why $NOW Section */}
              <div>
                <div className="relative mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                    Why $NOW?
                  </h2>
                  {/* Scribble underline */}
                  <svg className="w-48 h-4 -mt-1" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5 Q50 2, 100 6 T198 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-purple-400/40" />
                    <path d="M2 7 Q50 4, 100 8 T198 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-purple-400/30" />
                    <path d="M2 3 Q50 6, 100 4 T198 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-purple-400/20" />
                  </svg>
                  {/* Thought bubble doodle */}
                  <div className="absolute -right-6 -top-2 text-2xl opacity-40">💭</div>
                </div>

                <div className="space-y-10">
                  {/* Benefit 1 */}
                  <div
                    className={`relative pl-8 pb-8 border-b border-dashed border-gray-300 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    {/* Checkmark doodle */}
                    <div className="absolute left-0 top-1">
                      <svg className="w-6 h-6 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Transparent by design
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Every transaction lives on-chain. Track business performance and your returns in real-time. No hidden fees, no fine print.
                    </p>
                    {/* Highlight box */}
                    <div className="inline-block mt-2 text-sm text-blue-600 font-mono opacity-60">→ 100% on-chain</div>
                  </div>

                  {/* Benefit 2 */}
                  <div
                    className={`relative pl-8 pb-8 border-b border-dashed border-gray-300 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <div className="absolute left-0 top-1">
                      <svg className="w-6 h-6 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 relative" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Community first
                      {/* Heart doodle */}
                      <span className="absolute -right-6 top-0 text-red-400/30 text-lg">♥</span>
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Businesses owned by employees, customers, and local communities—not distant venture capitalists.
                    </p>
                  </div>

                  {/* Benefit 3 */}
                  <div
                    className={`relative pl-8 pb-8 border-b border-dashed border-gray-300 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    <div className="absolute left-0 top-1">
                      <svg className="w-6 h-6 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Real returns
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Monthly profit sharing from actual business revenue. No speculation, no pump and dump. Just real earnings from real businesses.
                    </p>
                    {/* Underline emphasis */}
                    <svg className="w-24 h-2 mt-1" viewBox="0 0 80 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3 Q20 1, 40 3 T78 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-green-300/60" />
                    </svg>
                  </div>

                  {/* Benefit 4 */}
                  <div
                    className={`relative pl-8 transition-all duration-700 ${
                      howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <div className="absolute left-0 top-1">
                      <svg className="w-6 h-6 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 relative" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                      Accessible to everyone
                      {/* Smile doodle */}
                      <span className="absolute -right-6 top-1 text-xl opacity-30">😊</span>
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Start with $100. Build your portfolio over time. Investing in local businesses shouldn't require being already wealthy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky note doodle at bottom */}
              <div className="mt-16 relative">
                <div className="inline-block bg-yellow-100/80 p-6 rounded-sm shadow-md rotate-1 border-l-4 border-yellow-400/30">
                  <p className="text-base text-gray-700 font-medium italic" style={{ fontFamily: 'ui-rounded, system-ui' }}>
                    "Built for communities, not VCs." ✨
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Paper shadow at bottom */}
          <div className="h-2 bg-gray-300/20 rounded-b-sm blur-sm" />
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
