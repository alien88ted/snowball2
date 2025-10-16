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

// Intelligent scroll-triggered animations
function useScrollTrigger(threshold: number = 0.2) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        setProgress(entry.intersectionRatio)
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: '0px 0px -10% 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible, progress }
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

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [time, setTime] = useState(0)

  // Mouse parallax layers
  const mouseParallax1 = useMouseParallax(20)
  const mouseParallax2 = useMouseParallax(40)
  const mouseParallax3 = useMouseParallax(60)

  // Scroll triggers for sections
  const heroTrigger = useScrollTrigger()
  const coffeeTrigger = useScrollTrigger()
  const howTrigger = useScrollTrigger()
  const benefitsTrigger = useScrollTrigger()

  // Magnetic buttons
  const exploreMagnetic = useMagneticHover(0.3)
  const ctaMagnetic = useMagneticHover(0.3)

  // Animated counters
  const priceValue = useAnimatedValue(coffeeTrigger.isVisible ? 15 : 0, 1500)
  const revenueValue = useAnimatedValue(coffeeTrigger.isVisible ? 33 : 0, 1800)
  const minValue = useAnimatedValue(coffeeTrigger.isVisible ? 100 : 0, 2000)

  // Generate aurora particles with golden ratio spacing
  const auroraParticles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i * PHI * 12.5) % 100,
      delay: i * PHI_INVERSE,
      duration: 10 + (i % 3) * 5,
      size: 200 + (i % 4) * 100
    }))
  }, [])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const animateTime = () => {
      setTime(prev => prev + 0.005)
      requestAnimationFrame(animateTime)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const animation = requestAnimationFrame(animateTime)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">

      {/* Ethereal Aurora Background */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Gradient mesh background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 0%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 0%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 100%, rgba(120, 219, 255, 0.05) 0%, transparent 50%)
                `,
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
          </div>

          {/* Floating aurora orbs */}
          {auroraParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${-particle.size/2}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle at center,
                  rgba(99, 102, 241, ${0.05 + Math.sin(time + particle.delay) * 0.02}) 0%,
                  transparent 70%)`,
                filter: 'blur(80px)',
                transform: `
                  translateY(${scrollY * 0.2 + Math.sin(time + particle.delay) * 20}px)
                  scale(${1 + Math.sin(time * 0.5 + particle.delay) * 0.2})
                `,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}

          {/* Light rays */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background: `
                linear-gradient(90deg,
                  transparent 0%,
                  rgba(99, 102, 241, 0.1) ${25 + Math.sin(time) * 5}%,
                  transparent ${50 + Math.sin(time) * 5}%,
                  rgba(168, 85, 247, 0.1) ${75 + Math.cos(time) * 5}%,
                  transparent 100%)
              `,
              transform: `translateX(${Math.sin(time * 0.3) * 50}px)`
            }}
          />
        </div>
      )}

      {/* Hero Section - Majestic Entry */}
      <section
        ref={heroTrigger.ref as any}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div
          className="max-w-5xl mx-auto text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: `translateY(${mounted ? 0 : 20}px)`,
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Premium Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg shadow-gray-200/20 mb-8"
            style={{
              transform: `translateY(${mouseParallax1.y}px) translateX(${mouseParallax1.x}px)`
            }}
          >
            <div className="relative">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-medium text-gray-700">$COFFEE presale is live</span>
            <span className="text-xs text-gray-500">→</span>
          </div>

          {/* Main Headline - Powerful Typography */}
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[-0.03em] leading-[0.9] mb-8">
            <span
              className="block text-gray-900"
              style={{
                transform: `translateY(${mouseParallax2.y * 0.5}px) translateX(${mouseParallax2.x * 0.5}px)`
              }}
            >
              Own real
            </span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradient-flow 8s ease infinite',
                transform: `translateY(${mouseParallax2.y * 0.7}px) translateX(${mouseParallax2.x * 0.7}px)`
              }}
            >
              businesses
            </span>
          </h1>

          {/* Subheadline - Elegant & Clear */}
          <p
            className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              transform: `translateY(${mouseParallax1.y * 0.3}px) translateX(${mouseParallax1.x * 0.3}px)`
            }}
          >
            Tokenized equity in local businesses.
            <br />
            <span className="text-gray-500">Start with $100. Earn from every sale.</span>
          </p>

          {/* CTA Buttons - Magnetic & Elegant */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/explorer">
              <button
                ref={exploreMagnetic.ref as any}
                className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  transform: `translate(${exploreMagnetic.position.x}px, ${exploreMagnetic.position.y}px)`
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Link>

            <Link href="#how">
              <button
                className="px-8 py-4 text-gray-700 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Learn How It Works
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500"
            style={{
              opacity: heroTrigger.progress,
              transform: `translateY(${(1 - heroTrigger.progress) * 20}px)`
            }}
          >
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

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 1 - scrollY / 300 }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* $COFFEE Feature - Premium Showcase */}
      <section
        ref={coffeeTrigger.ref as any}
        className="py-32 px-6 relative"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className="flex items-center gap-6 mb-16"
            style={{
              opacity: coffeeTrigger.isVisible ? 1 : 0,
              transform: `translateX(${coffeeTrigger.isVisible ? 0 : -20}px)`,
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-gray-400">001</span>
              <div className="w-12 h-[1px] bg-gray-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 tracking-widest">FEATURED LAUNCH</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Product Visual */}
            <div
              className="relative"
              style={{
                opacity: coffeeTrigger.isVisible ? 1 : 0,
                transform: `translateY(${coffeeTrigger.isVisible ? 0 : 40}px)`,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-1">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at ${50 + Math.sin(time) * 20}% ${50 + Math.cos(time * 0.8) * 20}%,
                        rgba(245, 158, 11, 0.2),
                        transparent 60%)`
                    }}
                  />

                  {/* Logo */}
                  <div className="relative z-10 text-center">
                    <div className="text-7xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600">
                      $COFFEE
                    </div>
                    <div className="text-gray-500">Beirut, Lebanon</div>
                  </div>

                  {/* Live badge */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Live Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div
              className="space-y-8"
              style={{
                opacity: coffeeTrigger.isVisible ? 1 : 0,
                transform: `translateX(${coffeeTrigger.isVisible ? 0 : 40}px)`,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              }}
            >
              <div>
                <h2 className="text-4xl font-serif mb-4">Beirut Brew</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A specialty coffee shop in the heart of Beirut where baristas own equity
                  and every cup sold generates returns for token holders worldwide.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-3xl font-light">
                    ${(priceValue / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">Token Price</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-light">
                    {Math.floor(revenueValue)}%
                  </div>
                  <div className="text-sm text-gray-500">Revenue Share</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-light">
                    ${Math.floor(minValue)}
                  </div>
                  <div className="text-sm text-gray-500">Min. Investment</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-medium">$420K / $500K</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                    style={{ width: coffeeTrigger.isVisible ? '84%' : '0%' }}
                  />
                </div>
              </div>

              {/* CTA */}
              <Link href="/explorer/coffee">
                <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:shadow-xl transition-all hover:scale-[1.02]">
                  View Investment Details →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Elegant Process */}
      <section
        ref={howTrigger.ref as any}
        id="how"
        className="py-32 px-6 bg-gradient-to-b from-gray-50/50 to-transparent"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-5xl font-serif mb-4"
              style={{
                opacity: howTrigger.isVisible ? 1 : 0,
                transform: `translateY(${howTrigger.isVisible ? 0 : 20}px)`,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              How it works
            </h2>
            <p
              className="text-xl text-gray-600"
              style={{
                opacity: howTrigger.isVisible ? 1 : 0,
                transform: `translateY(${howTrigger.isVisible ? 0 : 20}px)`,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
              }}
            >
              Three simple steps to community ownership
            </p>
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
                className="relative"
                style={{
                  opacity: howTrigger.isVisible ? 1 : 0,
                  transform: `translateY(${howTrigger.isVisible ? 0 : 40}px)`,
                  transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
                }}
              >
                <div className="text-6xl font-light text-gray-200 mb-4">{step.number}</div>
                <step.icon className="w-8 h-8 text-gray-700 mb-4" />
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {/* Connecting line */}
                {i < 2 && (
                  <div
                    className="hidden md:block absolute top-12 left-full w-full h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
                      opacity: howTrigger.isVisible ? 1 : 0,
                      transform: `scaleX(${howTrigger.isVisible ? 1 : 0})`,
                      transformOrigin: 'left',
                      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15 + 0.5}s`
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid - Premium Cards */}
      <section
        ref={benefitsTrigger.ref as any}
        className="py-32 px-6"
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
      <section className="py-32 px-6 relative">
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

      {/* Final CTA - Compelling Close */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif mb-8">
            Ready to own{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              real equity?
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12">
            Join thousands building wealth through community ownership
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorer">
              <button
                ref={ctaMagnetic.ref as any}
                className="px-10 py-5 bg-gray-900 text-white rounded-full font-medium hover:scale-[1.02] hover:shadow-2xl transition-all"
                style={{
                  transform: `translate(${ctaMagnetic.position.x}px, ${ctaMagnetic.position.y}px)`
                }}
              >
                Start Investing Today →
              </button>
            </Link>

            <Link href="/franchise/apply">
              <button className="px-10 py-5 rounded-full font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
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