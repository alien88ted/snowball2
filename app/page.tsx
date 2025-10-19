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

// Scroll spy for section highlighting
function useScrollSpy(ids: string[], offset: number = 100) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    const onScroll = () => {
      let current: string | null = null
      for (const el of elements) {
        const rect = el.getBoundingClientRect()
        if (rect.top - offset <= 0) {
          current = el.id
        } else {
          break
        }
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}

// Lightweight interactive 3D tilt via CSS variables
function useTilt(maxTilt: number = 6) {
  const [vars, setVars] = useState<React.CSSProperties>({});

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * maxTilt
    const ry = (px - 0.5) * maxTilt
    setVars({ ['--rx' as any]: `${rx}deg`, ['--ry' as any]: `${ry}deg` })
  }

  const onMouseLeave = () => {
    setVars({ ['--rx' as any]: `0deg`, ['--ry' as any]: `0deg` })
  }

  return { vars, onMouseMove, onMouseLeave }
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

// Typewriter effect for business names (infinite loop for $ scroller)
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

// Headline typewriter: same nouns but final word includes period and finalizes
function useHeadlineTypewriter() {
  const words = ['assets', 'businesses', 'metals', 'things.']
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (isDone) return
    const currentWord = words[wordIndex]
    const timeout = isDeleting ? 70 : 120

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
        } else {
          if (wordIndex === words.length - 1) {
            setIsDone(true)
          } else {
            setTimeout(() => setIsDeleting(true), 1200)
          }
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1))
        } else {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, isDone])

  return { text, isDone }
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  // Subtle tilt for step cards
  const t1 = useTilt(6)
  const t2 = useTilt(6)
  const t3 = useTilt(6)
  const t4 = useTilt(6)
  const typewriterText = useTypewriter()
  const { text: headlineNoun, isDone: headlineDone } = useHeadlineTypewriter()

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
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduceMotion(mq.matches)
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
      try {
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
      } catch {
        // Safari fallback
        // @ts-ignore
        mq.addListener(handler)
        return () => {
          // @ts-ignore
          mq.removeListener(handler)
        }
      }
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden relative">

      {/* AURORA BACKGROUND - Extended across entire page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main Aurora Layer - MASSIVE morphing gradient blobs */}
        <div className="absolute inset-0">
          {/* Giant morphing aurora blobs */}
          <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-cyan-400/10 rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 25s ease-in-out infinite, float 20s ease-in-out infinite',
              willChange: 'transform'
            }} />

          <div className="absolute top-1/2 -right-1/4 w-[1100px] h-[1100px] bg-gradient-to-tl from-purple-400/20 via-violet-400/15 to-pink-400/10 rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 30s ease-in-out infinite reverse, float 25s ease-in-out infinite reverse',
              willChange: 'transform'
            }} />

          <div className="absolute top-1/3 -left-1/3 w-[900px] h-[900px] bg-gradient-to-br from-cyan-400/15 via-blue-300/10 to-indigo-400/10 rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 20s ease-in-out infinite, float 22s ease-in-out infinite',
              animationDelay: '3s',
              willChange: 'transform'
            }} />

          <div className="absolute bottom-1/4 right-1/4 w-[950px] h-[950px] bg-gradient-to-bl from-indigo-400/15 via-purple-300/10 to-blue-400/10 rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 28s ease-in-out infinite reverse, float 24s ease-in-out infinite',
              animationDelay: '7s',
              willChange: 'transform'
            }} />

          <div className="absolute bottom-1/3 right-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-violet-400/13 via-purple-300/8 to-transparent rounded-full blur-3xl"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/12 via-transparent via-transparent to-purple-400/12 rounded-full blur-2xl" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
            style={{
              animation: 'spin 50s linear infinite reverse',
              willChange: 'transform'
            }}>
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/10 via-transparent via-transparent to-cyan-400/10 rounded-full blur-2xl" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px]"
            style={{
              animation: 'spin 90s linear infinite',
              willChange: 'transform'
            }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-400/8 via-transparent via-transparent via-transparent to-pink-400/8 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Elegant grid with perspective */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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

        {/* Shimmer waves */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          style={{
            animation: 'shimmerDown 12s ease-in-out infinite',
            willChange: 'transform'
          }} />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-100/4 to-transparent"
          style={{
            animation: 'shimmerDown 10s ease-in-out infinite reverse',
            animationDelay: '3s',
            willChange: 'transform'
          }} />

        {/* Central radiant core */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite, slowSpin 50s linear infinite',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Sophisticated Multi-Layer $ Ecosystem - Flows Across Sections */}
      {mounted && !reduceMotion && (
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

      {/* Hero Section */}
      <section
        ref={heroTrigger.ref as any}
        className="relative min-h-[75vh] flex items-center justify-center px-6 pt-32 pb-32 overflow-hidden"
      >
        {/* Subtle hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating particles in hero */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => {
              const size = i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5;
              const speed = 25 + Math.random() * 15;

              return (
                <div
                  key={`hero-particle-${i}`}
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
                    opacity: 0.7,
                    willChange: 'transform, opacity'
                  }}
                />
              );
            })}
          </div>
        )}

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
              Own real {mounted ? headlineNoun : 'assets'}
              {!headlineDone && (
                <span className="inline-block w-[2px] h-[0.8em] align-baseline bg-gray-900 ml-1 animate-pulse" />
              )}
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

      {/* Sticky section nav removed per request */}

      {/* How It Works */}
      <section
        ref={howTrigger.ref as any}
        id="how"
        className="relative py-32 px-6"
      >
        {/* Ambient accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-200/40 to-amber-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-200/40 to-indigo-200/30 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs font-mono text-gray-400">001</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gray-900 to-transparent" />
            <span className="text-xs font-bold tracking-[0.25em] text-gray-700">HOW IT WORKS</span>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Own the block. For real.</h2>
            <p className="text-gray-600 text-lg">From spotting a winner to monthly flow — no fluff.</p>
          </div>

          {/* Timeline rail (desktop) */}
          <div className="relative hidden md:block mb-14">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2" />
            <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 origin-left transition-all duration-700 ease-out ${howTrigger.isVisible ? 'opacity-100' : 'opacity-0'}`}
                 style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.6), rgba(245,158,11,0.6), rgba(16,185,129,0.6))' }} />
            <div className="relative flex justify-between">
              {[0,1,2,3].map((i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-white border border-gray-300 shadow-sm relative -top-1" />
              ))}
            </div>
          </div>

          {/* Mobile vertical rail */}
          <div className="relative md:hidden mb-8">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6" role="list">
            {/* Step 1 */}
            <li className={`group relative transition-all ${howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} role="listitem">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-300 via-blue-200 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-300/60 via-gray-100 to-transparent">
                <div
                  className="tilt rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:[--ty:-4px] group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                  onMouseMove={t1.onMouseMove}
                  onMouseLeave={t1.onMouseLeave}
                  style={t1.vars}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">01</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Spot the operator</h3>
                  <p className="text-gray-600">Vetted neighborhood businesses with real revenue and receipts.</p>
                  <div className="mt-4 text-xs text-gray-500">Diligence packs • Live metrics</div>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmerSweep_1.4s_ease-in-out]" />
                  </div>
                </div>
              </div>
              <span className="md:hidden absolute left-[6px] top-9 w-2 h-2 rounded-full bg-indigo-500" />
            </li>

            {/* Step 2 */}
            <li className={`group relative transition-all ${howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }} role="listitem">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-300 via-emerald-200 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-300/60 via-gray-100 to-transparent">
                <div
                  className="tilt rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:[--ty:-4px] group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                  onMouseMove={t2.onMouseMove}
                  onMouseLeave={t2.onMouseLeave}
                  style={t2.vars}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">02</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Verify and allocate</h3>
                  <p className="text-gray-600">KYC once, pick your amount, sign. That’s it.</p>
                  <div className="mt-4 text-xs text-gray-500">3–5 min • Secure onboarding</div>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmerSweep_1.4s_ease-in-out]" />
                  </div>
                </div>
              </div>
              <span className="md:hidden absolute left-[6px] top-9 w-2 h-2 rounded-full bg-blue-500" />
            </li>

            {/* Step 3 */}
            <li className={`group relative transition-all ${howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }} role="listitem">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-200 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-amber-300/60 via-gray-100 to-transparent">
                <div
                  className="tilt rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:[--ty:-4px] group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                  onMouseMove={t3.onMouseMove}
                  onMouseLeave={t3.onMouseLeave}
                  style={t3.vars}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">03</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Own real tokens</h3>
                  <p className="text-gray-600">Transferable, on-chain equity tied to verifiable docs.</p>
                  <div className="mt-4 text-xs text-gray-500">Portable • Auditable</div>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmerSweep_1.4s_ease-in-out]" />
                  </div>
                </div>
              </div>
              <span className="md:hidden absolute left-[6px] top-9 w-2 h-2 rounded-full bg-amber-500" />
            </li>

            {/* Step 4 */}
            <li className={`group relative transition-all ${howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }} role="listitem">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-300 via-teal-200 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-300/60 via-gray-100 to-transparent">
                <div
                  className="tilt rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:[--ty:-4px] group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                  onMouseMove={t4.onMouseMove}
                  onMouseLeave={t4.onMouseLeave}
                  style={t4.vars}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">04</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Monthly flow</h3>
                  <p className="text-gray-600">Payouts land in your wallet. Track it, brag later.</p>
                  <div className="mt-4 text-xs text-gray-500">Transparent reports • One-click exports</div>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmerSweep_1.4s_ease-in-out]" />
                  </div>
                </div>
              </div>
              <span className="md:hidden absolute left-[6px] top-9 w-2 h-2 rounded-full bg-emerald-500" />
            </li>
          </ol>

          {/* Mini example bar */}
          <div className={`mt-12 transition-all ${howTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="max-w-4xl mx-auto rounded-2xl p-[1px] bg-gradient-to-r from-gray-200 via-amber-200 to-gray-200">
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Live example</div>
                  <div className="text-lg font-semibold text-gray-900">$COFFEE • Beirut • 84% funded</div>
                  <div className="text-sm text-gray-600">Min $100 • Est. APY 33% • Monthly distributions</div>
                </div>
                <Link href="/explorer/coffee">
                  <button className="px-5 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all">
                    View details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitsTrigger.ref as any}
        id="benefits"
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-sm font-mono text-gray-400 font-bold">002</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gray-900 to-transparent" />
            <h3 className="text-sm font-bold text-gray-700 tracking-[0.2em]">BENEFITS</h3>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-14">
            Built for investors and business owners
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Investors */}
            <div className={`group rounded-3xl border border-gray-200/80 p-8 bg-white/60 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all ${benefitsTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">For Investors</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-600" />Own fractional equity in real businesses</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-600" />Start with $100, diversify locally</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-600" />Monthly profit distributions</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-600" />Transparent metrics and on-chain records</li>
              </ul>
            </div>

            {/* Businesses */}
            <div className={`group rounded-3xl border border-gray-200/80 p-8 bg-white/60 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all ${benefitsTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">For Business Owners</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-600" />Raise capital without predatory terms</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-600" />Turn customers into aligned owners</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-600" />Automated distributions, clean cap table</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-600" />Compliance and investor onboarding handled</li>
              </ul>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
            <div className="rounded-2xl border border-gray-200 p-4 flex items-center gap-3"><Shield className="w-4 h-4 text-gray-700" /><span className="text-gray-700">SEC-compliant offerings</span></div>
            <div className="rounded-2xl border border-gray-200 p-4 flex items-center gap-3"><Globe className="w-4 h-4 text-gray-700" /><span className="text-gray-700">On-chain proof of ownership</span></div>
            <div className="rounded-2xl border border-gray-200 p-4 flex items-center gap-3"><TrendingUp className="w-4 h-4 text-gray-700" /><span className="text-gray-700">Transparent performance metrics</span></div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-sm font-mono text-gray-400 font-bold">003</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gray-900 to-transparent" />
            <h3 className="text-sm font-bold text-gray-700 tracking-[0.2em]">VISION</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Finance that serves the street</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We’re rebuilding local ownership. Instead of profits leaving the neighborhood, they flow back to the people who build and support the business—employees and customers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Each offering is backed by verifiable operations and transparent metrics. Ownership is tokenized, distributions are automated, and the community becomes the growth engine.
              </p>
              <div className="flex gap-3">
                <Link href="/explorer">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">Explore Opportunities</button>
                </Link>
                <Link href="#faq">
                  <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 transition-all">Read FAQ</button>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4"><Users className="w-5 h-5" /></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Ownership</h4>
                <p className="text-gray-600">Employees and customers become real owners with aligned incentives.</p>
              </div>
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4"><Coins className="w-5 h-5" /></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent Profits</h4>
                <p className="text-gray-600">Monthly distributions tracked on-chain with clear reporting.</p>
              </div>
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4"><Globe className="w-5 h-5" /></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Open Infrastructure</h4>
                <p className="text-gray-600">Interoperable rails for investing, governance, and payouts.</p>
              </div>
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4"><Shield className="w-5 h-5" /></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Compliance First</h4>
                <p className="text-gray-600">KYC/AML, investor onboarding, and cap tables handled correctly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-sm font-mono text-gray-400 font-bold">004</span>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gray-900 to-transparent" />
            <h3 className="text-sm font-bold text-gray-700 tracking-[0.2em]">FAQ</h3>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50 open:border-gray-300 transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-gray-900 font-medium">How do I earn returns?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">You receive monthly profit distributions proportional to your ownership. Distributions are recorded on-chain and visible in your dashboard.</p>
            </details>

            <details className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50 open:border-gray-300 transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-gray-900 font-medium">Is this crypto? Is it regulated?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Ownership is tokenized for portability, but offerings are structured to be compliant. We handle KYC/AML and investor accreditation where applicable.</p>
            </details>

            <details className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50 open:border-gray-300 transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-gray-900 font-medium">Can I sell my position?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Liquidity depends on the specific offering and local regulations. We aim to support compliant secondary mechanisms where possible.</p>
            </details>

            <details className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50 open:border-gray-300 transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-gray-900 font-medium">What risks should I consider?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Local businesses carry operational risk. We provide diligence materials, transparent metrics, and encourage diversification across multiple offerings.</p>
            </details>
          </div>
        </div>
      </section>


      {/* Philosophy & CTA */}
      <section className="py-48 px-6 bg-gray-900/95 backdrop-blur-sm text-white relative">
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
        .tilt {
          transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--ty, 0));
          will-change: transform;
          transition: transform 300ms ease;
        }
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
