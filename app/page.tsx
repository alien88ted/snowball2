"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users, Shield, DollarSign, Zap, Globe, Coins, ChevronDown } from "lucide-react"
import { FooterSection } from "@/components/footer-section"
import { HowItWorksFuture } from "@/components/how-it-works-future"

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
      const colorVariant: 'primary' | 'accent' | 'amber' | 'gradient' =
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

        // Reduced spawn rate for better performance
        if (Math.random() < 0.008 && newDollars.length < 8) {
          newDollars.push(spawnDollar())
        }

        // Disable connections for better performance
        // Skip connection calculations entirely

        // Update existing dollars with SUPERCHARGED physics
        newDollars = newDollars
          .map(d => {
            // Calculate distance to mouse
            const dx = mouseRef.current.x - d.x
            const dy = mouseRef.current.y - d.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Simplified mouse interaction for better performance
            const interactionRadius = 30
            const forceMult = 0.1

            let forceX = 0
            let forceY = 0

            if (distance < interactionRadius && distance > 1) {
              const force = (1 - distance / interactionRadius) * forceMult
              forceX = -(dx / distance) * force
              forceY = -(dy / distance) * force
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

            // Wake trail opacity (disabled for performance)
            const newTrailOpacity = 0

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

// Typewriter effect for our branded stores
function useTypewriter() {
  const words = ['COFFEE', 'MARKET', 'FASHION', 'TECH', 'BEAUTY', 'SPORT', 'SPQR']
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
  // const howTrigger = useScrollTrigger() // Now handled by enhanced component
  const benefitsTrigger = useScrollTrigger()

  // Animated counters
  const priceValue = useAnimatedValue(coffeeTrigger.isVisible ? 15 : 0, 1500)
  const revenueValue = useAnimatedValue(coffeeTrigger.isVisible ? 33 : 0, 1800)
  const minValue = useAnimatedValue(coffeeTrigger.isVisible ? 100 : 0, 2000)

  useEffect(() => {
    setMounted(true)
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] overflow-hidden relative scroll-smooth">
      

      {/* Enhanced background with subtle aurora effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle morphing gradient blobs */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-red-400/30 via-pink-400/20 to-transparent rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 30s ease-in-out infinite',
            }} />
          
          <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-gray-400/20 via-black/10 to-transparent rounded-full blur-3xl"
            style={{
              animation: 'morphBlob 25s ease-in-out infinite reverse',
              animationDelay: '5s',
            }} />
        </div>
        
        {/* Very subtle grid */}
        <div className="absolute inset-0 opacity-[0.01]" 
          style={{
            backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} 
        />
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

            {/* Connection network disabled for performance */}

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

      {/* Hero Section - Editorial Brutalist */}
      <section
        ref={heroTrigger.ref as any}
        className="relative min-h-[85vh] flex items-center justify-center px-6 pt-28 pb-36 overflow-hidden"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient overlay for quality enhancement */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#F5F3F0]/90 pointer-events-none" />
        
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Ambient floating gradient orbs */}
        <div className="absolute top-20 -left-32 w-[600px] h-[600px] bg-gradient-radial from-[#DC143C]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 -right-32 w-[800px] h-[800px] bg-gradient-radial from-black/[0.04] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
        
        {/* Dramatic Angel Wings / Ocean Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
          {/* Flowing ocean waves in black and white */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.03) 2px,
                rgba(0, 0, 0, 0.03) 4px
              )`,
              animation: 'oceanFlow 15s linear infinite',
              transform: 'perspective(500px) rotateX(60deg) translateZ(0)',
            }}
          />
          
          {/* Angel Wings SVG */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wingGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="black" stopOpacity="0.15" />
                <stop offset="100%" stopColor="black" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="wingGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            
            {/* Left Wing */}
            <g style={{ animation: 'wingFlap 8s ease-in-out infinite' }}>
              <path
                d="M 720 400 Q 500 300, 300 350 Q 150 380, 50 450 L 720 500 Z"
                fill="url(#wingGradient1)"
                strokeWidth="1"
                stroke="rgba(0,0,0,0.1)"
              />
              <path
                d="M 720 380 Q 480 280, 250 330 Q 100 360, 0 430 L 720 500 Z"
                fill="url(#wingGradient2)"
              />
              {/* Wing feather details */}
              {[...Array(5)].map((_, i) => (
                <path
                  key={`left-feather-${i}`}
                  d={`M ${720 - i * 120} 400 Q ${600 - i * 120} ${350 - i * 10}, ${500 - i * 120} 380`}
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="1"
                  fill="none"
                  style={{ animation: `featherFloat ${6 + i}s ease-in-out infinite` }}
                />
              ))}
            </g>
            
            {/* Right Wing */}
            <g style={{ animation: 'wingFlap 8s ease-in-out infinite', animationDelay: '0.5s' }}>
              <path
                d="M 720 400 Q 940 300, 1140 350 Q 1290 380, 1390 450 L 720 500 Z"
                fill="url(#wingGradient1)"
                strokeWidth="1"
                stroke="rgba(0,0,0,0.1)"
              />
              <path
                d="M 720 380 Q 960 280, 1190 330 Q 1340 360, 1440 430 L 720 500 Z"
                fill="url(#wingGradient2)"
              />
              {/* Wing feather details */}
              {[...Array(5)].map((_, i) => (
                <path
                  key={`right-feather-${i}`}
                  d={`M ${720 + i * 120} 400 Q ${840 + i * 120} ${350 - i * 10}, ${940 + i * 120} 380`}
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="1"
                  fill="none"
                  style={{ animation: `featherFloat ${6 + i}s ease-in-out infinite` }}
                />
              ))}
            </g>
            
            {/* Center piece - body/core */}
            <ellipse
              cx="720"
              cy="420"
              rx="60"
              ry="100"
              fill="rgba(0,0,0,0.03)"
              style={{ animation: 'breathe 4s ease-in-out infinite' }}
            />
          </svg>
          
          {/* Flowing lines effect */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={`flow-${i}`}
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent"
                style={{
                  bottom: `${100 + i * 60}px`,
                  animation: `oceanFlow ${10 + i * 2}s linear infinite ${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

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

          {/* Unique Geometric Badge */}
          <div className="inline-block mb-16 opacity-0 animate-[fadeInDown_0.6s_ease-out_0.1s_forwards]">
            <div className="relative">
              {/* Geometric frame */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-400" />
                <div className="px-4 py-2 relative">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.35em]">FUTURE OF COMMERCE</span>
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-300" />
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-400" />
              </div>
            </div>
          </div>

          {/* Unique $ Centerpiece */}
          <div className="relative mb-14 flex flex-row items-center justify-center gap-0">
            
            {/* $ Symbol - Split Design */}
            <div className="relative group cursor-default">
              {/* Base $ with split effect */}
              <div className="relative">
                {/* Left half - Solid Black with shadow */}
                <div
                  className="absolute text-[96px] md:text-[140px] font-serif font-black leading-none select-none"
                  style={{
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                    color: '#111',
                    letterSpacing: '-0.05em',
                    textShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  $
                </div>
                
                {/* Right half with RED offset */}
                <div
                  className="absolute text-[96px] md:text-[140px] font-serif font-black leading-none select-none"
                  style={{
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                    color: '#DC143C',
                    letterSpacing: '-0.05em',
                    transform: 'translateX(5px)',
                    opacity: 0.9,
                    textShadow: '0 0 20px rgba(220,20,60,0.5), 0 4px 12px rgba(220,20,60,0.4)',
                  }}
                >
                  $
                </div>
                
                {/* Glitch/distortion effect on hover */}
                <div
                  className="absolute text-[96px] md:text-[140px] font-serif font-black leading-none select-none opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{
                    color: 'transparent',
                    letterSpacing: '-0.05em',
                    textShadow: '3px 3px 0 rgba(220,20,60,0.6), -3px -3px 0 rgba(0,200,255,0.4)',
                    animation: 'glitch 0.3s infinite',
                    mixBlendMode: 'screen',
                  }}
                >
                  $
                </div>

                {/* Invisible placeholder for spacing */}
                <div
                  className="text-[96px] md:text-[140px] font-serif font-black leading-none select-none invisible"
                  style={{ letterSpacing: '-0.05em' }}
                >
                  $
                </div>
              </div>
              
              {/* Corner brackets - brutalist frame */}
              <div className="absolute -top-4 -left-4 w-10 h-10 border-t-4 border-l-4 border-[#DC143C] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-4 border-r-4 border-black opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Accent squares */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#DC143C] opacity-40 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-black opacity-30 group-hover:opacity-80 transition-all duration-500" />
            </div>

            {/* Typewriter - Clean Black */}
            <div className="inline-flex items-center gap-0">
              <span
                className="text-[80px] md:text-[120px] font-serif font-black leading-none select-none relative uppercase"
                style={{
                  letterSpacing: '-0.02em',
                  fontWeight: 900,
                  color: '#000000',
                }}
              >
                <span className="relative">
                  {mounted ? typewriterText : 'SPQR'}
                  {/* Underline accent */}
                  <div className="absolute -bottom-3 left-0 right-0 h-[2px] bg-black opacity-20" />
                </span>
              </span>
              <span
                className="inline-block w-[1px] h-14 md:h-20 bg-gray-900 ml-2"
                style={{
                  animation: 'blink 1s steps(2) infinite',
                  opacity: 1,
                }}
              />
            </div>
          </div>

          {/* Main Headline - Brutalist Typography */}
          <h1 className="text-6xl md:text-7xl lg:text-[100px] font-serif tracking-[-0.02em] leading-[0.8] mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <span className="block font-black mb-3 relative">
              <span className="text-black uppercase">Physical</span>
              <span className="text-black ml-3 uppercase">stores</span>
            </span>
            <span className="block font-black relative">
              <span className="text-[#DC143C] uppercase">Onchain</span>
              <span className="text-[#DC143C] ml-3 uppercase">rebirth</span>
            </span>
          </h1>

          {/* Subheadline - Editorial Statement */}
          <div className="mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            <p className="text-[11px] tracking-[0.3em] text-[#DC143C] uppercase font-black mb-6">
              Remember, you were forgotten
            </p>
            <p className="text-[18px] md:text-[20px] text-gray-700 max-w-[580px] mx-auto mb-8 leading-[1.4] font-medium">
              We're building branded stores where
              <span className="text-black font-black"> customers become owners</span>
            </p>
            
            {/* Shop • Earn • Own - Unique Typography */}
            <div className="flex items-center justify-center gap-1 relative">
              <div className="group relative px-3 py-1 cursor-default">
                <span className="text-[15px] font-black text-gray-600 tracking-[0.2em] transition-all duration-300 group-hover:text-[#DC143C] group-hover:tracking-[0.3em] uppercase">SHOP</span>
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#DC143C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              
              <span className="text-gray-400 text-sm px-1">·</span>
              
              <div className="group relative px-3 py-1 cursor-default">
                <span className="text-[15px] font-black text-gray-600 tracking-[0.2em] transition-all duration-300 group-hover:text-[#DC143C] group-hover:tracking-[0.3em] uppercase">EARN</span>
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#DC143C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              
              <span className="text-gray-400 text-sm px-1">·</span>
              
              <div className="group relative px-3 py-1 cursor-default">
                <span className="text-[15px] font-black text-gray-600 tracking-[0.2em] transition-all duration-300 group-hover:text-[#DC143C] group-hover:tracking-[0.3em] uppercase">OWN</span>
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#DC143C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* CTA - Minimalist Editorial */}
          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <Link href="/explorer">
              <button className="group relative px-10 py-5 bg-[#DC143C] text-white text-[13px] font-black tracking-[0.25em] uppercase transition-all duration-200 hover:bg-black hover:scale-[1.02]">
                <span className="relative flex items-center gap-4">
                  Enter Rebirth
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </span>
              </button>
            </Link>
            
            {/* Scroll indicator */}
            <div className="mt-12 flex flex-col items-center gap-2 cursor-pointer" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>
              <p className="text-[10px] font-black tracking-[0.3em] text-black/60 uppercase">
                Scroll to learn more
              </p>
              <ChevronDown className="w-4 h-4 text-black/40 animate-bounce" />
            </div>
          </div>
        </div>
        
        {/* Date ticker - Editorial Style */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-black uppercase">
          <span>{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
          <span className="text-[#DC143C]">Remember, you were forgotten</span>
        </div>
        
      </section>

      {/* How It Works - Bridging Physical + Digital */}
      <HowItWorksFuture />

      {/* Benefits */}
      <section
        ref={benefitsTrigger.ref as any}
        id="benefits"
        className="py-32 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/88 to-[#F5F3F0]/92 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FAF8F5]/20 to-[#FAF8F5]/40 pointer-events-none" />
        
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#DC143C]/5 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <span className="text-sm font-mono text-[#DC143C] font-black">002</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">BENEFITS</h3>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-black text-black mb-16 uppercase tracking-tight leading-[0.9] opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            When customers<br/>become owners
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Token Holders */}
            <div className={`group border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 ${benefitsTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border-2 border-current flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wider">For Token Holders</h3>
              </div>
              <ul className="space-y-5 text-gray-700 group-hover:text-gray-200">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Own actual physical stores and brands</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Earn from every customer transaction</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Vote on store operations and expansion</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Automated profit distributions on-chain</span></li>
              </ul>
            </div>

            {/* Customers */}
            <div className={`group border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 ${benefitsTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border-2 border-current flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wider">For Customers</h3>
              </div>
              <ul className="space-y-5 text-gray-700 group-hover:text-gray-200">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Every purchase earns you ownership</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Loyalty becomes actual equity</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Shape the stores you shop at</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 w-4 h-4 text-[#DC143C] group-hover:text-white flex-shrink-0" /><span className="leading-relaxed font-medium">Benefit when your favorite places succeed</span></li>
              </ul>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-sm opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <div className="group rounded-none border-2 border-black p-4 flex items-center gap-3 hover:bg-black hover:text-white transition-all cursor-default">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Physical stores, digital ownership</span>
            </div>
            <div className="group rounded-none border-2 border-black p-4 flex items-center gap-3 hover:bg-black hover:text-white transition-all cursor-default">
              <Globe className="w-4 h-4" />
              <span className="font-medium">Built on blockchain from day one</span>
            </div>
            <div className="group rounded-none border-2 border-black p-4 flex items-center gap-3 hover:bg-black hover:text-white transition-all cursor-default">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Real revenue, real profits, real ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-32 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
        {/* Enhanced multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/93 via-[#F8F6F3]/85 to-[#FAF8F5]/91 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#DC143C]/[0.02] to-transparent pointer-events-none" />
        
        {/* Dynamic background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#DC143C]/[0.03] to-transparent rounded-ellipse blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-black/[0.02] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <span className="text-sm font-mono text-[#DC143C] font-black">003</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">VISION</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              <h2 className="text-4xl md:text-6xl font-serif font-black text-black mb-8 uppercase leading-[0.95]">Making the real<br/>world programmable</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                We're not retrofitting old businesses with tokens. We're building new brands from scratch where blockchain isn't an afterthought - it's the foundation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8 font-medium">
                Physical stores with on-chain DNA. Where buying your morning coffee makes you an owner. Where loyalty becomes equity. Where the world outside your screen connects to the world on-chain.
              </p>
              <div className="flex gap-3">
                <Link href="/explorer">
                  <button className="px-8 py-4 bg-black text-white font-black text-[12px] tracking-[0.2em] uppercase hover:bg-[#DC143C] transition-all">Own Our Stores</button>
                </Link>
                <Link href="#faq">
                  <button className="px-8 py-4 border-2 border-black text-black font-black text-[12px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all">Read FAQ</button>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              <div className="group relative border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-current flex items-center justify-center mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-current mb-2 uppercase">Our Brands</h4>
                  <p className="text-current opacity-80 text-sm leading-relaxed mb-3 font-medium">$COFFEE, $MARKET, $FASHION - real stores we're building from the ground up.</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono bg-[#DC143C] text-white font-black">$COFFEE</span>
                    <span className="px-2 py-0.5 text-xs font-mono bg-[#DC143C]/60 text-white font-black">$MARKET</span>
                  </div>
                </div>
              </div>
              <div className="group relative border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-current flex items-center justify-center mb-4">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-current mb-2 uppercase">Native On-Chain</h4>
                  <p className="text-current opacity-80 text-sm leading-relaxed mb-3 font-medium">Every transaction, every customer, every profit - all flowing through smart contracts.</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-[#DC143C] group-hover:bg-white" />
                    <span className="font-bold">Real-time transparent</span>
                  </div>
                </div>
              </div>
              <div className="group relative border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-current flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-current mb-2 uppercase">Customer Ownership</h4>
                  <p className="text-current opacity-80 text-sm leading-relaxed mb-3 font-medium">Shop at the store, earn tokens, become an owner. Simple as that.</p>
                  <div className="flex items-baseline gap-3 text-xs font-mono">
                    <div>
                      <span className="font-bold">$5</span>
                      <span className="opacity-60"> spent</span>
                    </div>
                    <span className="opacity-40">→</span>
                    <div>
                      <span className="font-bold">10</span>
                      <span className="opacity-60"> tokens</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-current flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-current mb-2 uppercase">Real Assets</h4>
                  <p className="text-current opacity-80 text-sm leading-relaxed mb-3 font-medium">Not derivatives or abstractions. Actual stores, actual products, actual profits.</p>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 border border-current flex items-center justify-center">
                        <span className="text-[8px] font-bold">✓</span>
                      </div>
                      <span className="text-xs font-bold">Physical</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 border border-current flex items-center justify-center">
                        <span className="text-[8px] font-bold">✓</span>
                      </div>
                      <span className="text-xs font-bold">Tangible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {/* Sophisticated gradient layering */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/94 via-[#F9F7F4]/87 to-[#FAF8F5]/92 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#DC143C]/[0.01] via-transparent to-black/[0.01] pointer-events-none" />
        
        {/* Ambient floating shapes */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-radial from-[#DC143C]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-radial from-black/[0.03] to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s', animationDelay: '3s' }} />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <span className="text-sm font-mono text-[#DC143C] font-black">004</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">FAQ</h3>
          </div>

          <div className="space-y-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            <details className="group border-2 border-black p-5 open:bg-black open:text-white transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-black text-black group-open:text-white uppercase tracking-wider text-sm">How do I become an owner?</span>
                <span className="text-black group-open:text-white group-open:rotate-180 transition-transform font-black">⌄</span>
              </summary>
              <p className="mt-3 text-gray-700 group-open:text-gray-200 font-medium">Buy tokens during the launch to fund the store's creation, or earn tokens by shopping at our stores once they're open. Every purchase gives you ownership.</p>
            </details>

            <details className="group border-2 border-black p-5 open:bg-black open:text-white transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-black text-black group-open:text-white uppercase tracking-wider text-sm">These are your own stores?</span>
                <span className="text-black group-open:text-white group-open:rotate-180 transition-transform font-black">⌄</span>
              </summary>
              <p className="mt-3 text-gray-700 group-open:text-gray-200 font-medium">Yes. $COFFEE, $MARKET, $FASHION - these are brands we're building from scratch. Physical stores designed to run on blockchain rails from day one.</p>
            </details>

            <details className="group border-2 border-black p-5 open:bg-black open:text-white transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-black text-black group-open:text-white uppercase tracking-wider text-sm">How do profits work?</span>
                <span className="text-black group-open:text-white group-open:rotate-180 transition-transform font-black">⌄</span>
              </summary>
              <p className="mt-3 text-gray-700 group-open:text-gray-200 font-medium">Store revenue flows through smart contracts. Profits are automatically distributed to token holders monthly. No banks, no delays, fully transparent on-chain.</p>
            </details>

            <details className="group border-2 border-black p-5 open:bg-black open:text-white transition-all">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-black text-black group-open:text-white uppercase tracking-wider text-sm">Can I sell my tokens?</span>
                <span className="text-black group-open:text-white group-open:rotate-180 transition-transform font-black">⌄</span>
              </summary>
              <p className="mt-3 text-gray-700 group-open:text-gray-200 font-medium">Tokens are tradeable on-chain. As our stores grow and succeed, token demand naturally increases from customers earning and wanting more ownership.</p>
            </details>
          </div>
        </div>
      </section>


      {/* Philosophy & CTA */}
      <section className="py-48 px-6 bg-black text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} 
        />
        <div className="max-w-4xl mx-auto">
          {/* Philosophy */}
          <div className="mb-32">
            <p className="text-4xl md:text-5xl lg:text-6xl text-[#DC143C] leading-[1.1] font-black uppercase mb-8">
              The world is alive.<br/>We're making it<br/>programmable.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-[1.4] mt-12">
              Physical stores with on-chain DNA. Where customers are owners. Where loyalty is equity.
            </p>
          </div>

          {/* CTA */}
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-black mb-12 leading-[1.1] tracking-tight uppercase">
              Ready to own<br className="hidden sm:block" /> the future?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explorer">
                <button className="group px-10 py-5 bg-[#DC143C] text-white font-black text-[13px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-3">
                  Own Our Stores
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
              </Link>

              <Link href="/docs">
                <button className="px-10 py-5 font-black text-[13px] tracking-[0.25em] uppercase border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                  Learn The Vision
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* Global Styles - Enhanced */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes orbit0 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        
        @keyframes orbit1 {
          from { transform: translate(-50%, -50%) rotate(120deg) translateX(60px) rotate(-120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg) translateX(60px) rotate(-480deg); }
        }
        
        @keyframes orbit2 {
          from { transform: translate(-50%, -50%) rotate(240deg) translateX(60px) rotate(-240deg); }
          to { transform: translate(-50%, -50%) rotate(600deg) translateX(60px) rotate(-600deg); }
        }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        @keyframes oceanWave {
          0% {
            transform: translateX(0) translateY(var(--wave-y, 100px));
          }
          100% {
            transform: translateX(-100px) translateY(var(--wave-y, 100px));
          }
        }
        
        @keyframes wingFlap {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-10px) scale(1.02);
          }
          50% {
            transform: translateY(-5px) scale(1.01);
          }
          75% {
            transform: translateY(-15px) scale(1.03);
          }
        }
        
        @keyframes featherFloat {
          0%, 100% {
            opacity: 0.05;
            transform: translateY(0);
          }
          50% {
            opacity: 0.08;
            transform: translateY(-5px);
          }
        }
        
        @keyframes oceanFlow {
          0% {
            transform: translateX(0) perspective(500px) rotateX(60deg);
          }
          100% {
            transform: translateX(-100px) perspective(500px) rotateX(60deg);
          }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(40px); opacity: 0; }
        }
        
        @keyframes scrollPulse {
          0% { transform: translateY(0) translateX(-50%); opacity: 0.4; }
          50% { transform: translateY(8px) translateX(-50%); opacity: 1; }
          100% { transform: translateY(0) translateX(-50%); opacity: 0.4; }
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
