"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users, Shield, DollarSign, Zap, Globe, Coins } from "lucide-react"
import { FooterSection } from "@/components/footer-section"

// Nature-inspired easing function (like wind through trees)
const easeNature = (t: number) => {
  return t < 0.5
    ? 4 * t * t * t + Math.sin(t * Math.PI) * 0.1
    : 1 - Math.pow(-2 * t + 2, 3) / 2 + Math.sin(t * Math.PI) * 0.1
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(end * easeOutQuart(progress)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible])

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

  return { count, ref }
}

// Parallax scroll hook
function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const screenCenterY = window.innerHeight / 2
      const distance = (centerY - screenCenterY) * speed
      setOffset(distance)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

// Magnetic button hook
function useMagneticButton() {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      if (distance < 100) {
        const strength = (100 - distance) / 100
        setPosition({
          x: (e.clientX - centerX) * strength * 0.3,
          y: (e.clientY - centerY) * strength * 0.3
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { ref, position }
}

// Ripple effect hook
function useRipple() {
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([])

  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setRipples(prev => [...prev, ripple])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id))
    }, 1000)
  }

  return { ripples, createRipple }
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [time, setTime] = useState(0)

  // Counter refs
  const priceCounter = useCounter(15, 1500)
  const revenueCounter = useCounter(33, 1800)
  const minCounter = useCounter(100, 2000)

  // Parallax refs
  const heroParallax = useParallax(0.3)
  const gradientParallax = useParallax(0.5)

  // Magnetic buttons
  const exploreMagnetic = useMagneticButton()
  const ctaMagnetic = useMagneticButton()

  // Ripple effects
  const heroRipple = useRipple()
  const ctaRipple = useRipple()

  // Generate stars constellation
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: Math.random() * 3 + 2
    }))
  }, [])

  // Generate snow particles
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      fallDuration: Math.random() * 10 + 15,
      swayDuration: Math.random() * 4 + 3,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4
    }))
  }, [])

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      setMousePosition({
        x: x,
        y: y
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Organic time-based animations
    const animationFrame = () => {
      setTime(prev => prev + 0.01)
      requestAnimationFrame(animationFrame)
    }
    const animation = requestAnimationFrame(animationFrame)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">

      {/* Stars Constellation Background */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: `${star.twinkleDuration}s`,
                transform: `translateY(${scrollY * 0.02}px)`
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60" />
            </div>
          ))}
        </div>
      )}

      {/* Soft Snow Particles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute animate-snowfall"
              style={{
                left: `${flake.x}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationDelay: `${flake.delay}s`,
                animationDuration: `${flake.fallDuration}s`,
                opacity: flake.opacity
              }}
            >
              <div
                className="w-full h-full bg-white rounded-full animate-sway"
                style={{
                  animationDuration: `${flake.swayDuration}s`,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Organic Tree Branches */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <svg
            className="absolute w-full h-full opacity-[0.03]"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              d={`M 0,500 Q ${250 + Math.sin(time) * 20},${400 + Math.cos(time * 0.5) * 30} 500,${300 + Math.sin(time * 0.7) * 20}`}
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              className="animate-tree-sway"
            />
            <path
              d={`M 500,${300 + Math.sin(time * 0.7) * 20} Q ${750 + Math.cos(time * 0.8) * 25},${400 + Math.sin(time * 0.6) * 30} 1000,500`}
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              className="animate-tree-sway-reverse"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Hero - Living & Breathing */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-20">
        {/* Organic flowing gradient - like morning mist */}
        <div
          ref={gradientParallax.ref}
          className="absolute inset-0 -z-10"
          style={{
            transform: `translateY(${gradientParallax.offset * 0.3}px)`
          }}
        >
          {/* Aurora-like waves */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(${45 + Math.sin(time * 0.5) * 10}deg,
                transparent 0%,
                rgba(59, 130, 246, ${0.1 + Math.sin(time) * 0.05}) 20%,
                rgba(168, 85, 247, ${0.1 + Math.cos(time * 0.8) * 0.05}) 40%,
                rgba(6, 182, 212, ${0.1 + Math.sin(time * 0.6) * 0.05}) 60%,
                transparent 100%)`,
              transform: `translateY(${Math.sin(time * 0.3) * 30}px)`
            }}
          />

          {/* Organic flowing shapes */}
          <div
            className="absolute top-0 right-0 w-[1200px] h-[1200px] animate-breathe"
            style={{
              background: `radial-gradient(ellipse at ${50 + Math.sin(time * 0.4) * 20}% ${50 + Math.cos(time * 0.3) * 20}%,
                rgba(59, 130, 246, 0.05) 0%,
                transparent 40%)`,
              filter: 'blur(60px)',
              transform: `rotate(${time * 5}deg) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[1000px] h-[1000px] animate-breathe-reverse"
            style={{
              background: `radial-gradient(ellipse at ${50 - Math.cos(time * 0.5) * 20}% ${50 - Math.sin(time * 0.4) * 20}%,
                rgba(168, 85, 247, 0.05) 0%,
                transparent 40%)`,
              filter: 'blur(60px)',
              transform: `rotate(${-time * 3}deg) translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
            }}
          />
        </div>

        <div
          ref={heroParallax.ref}
          className="max-w-4xl mx-auto text-center"
          style={{
            transform: `translateY(${heroParallax.offset * 0.2}px)`
          }}
        >
          {/* Animated Badge with enhanced pulse */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm mb-8 animate-fade-in-down hover:border-gray-300 transition-all cursor-pointer">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping animation-delay-200" />
            </div>
            <span className="text-xs font-medium text-gray-600">$COFFEE presale live</span>
          </div>

          {/* Animated Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight mb-6 animate-fade-in-up">
            Own real businesses.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Earn from every sale.
            </span>
          </h1>

          {/* Subheading with stagger animation */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
            Tokenized local businesses where employees get equity and customers become investors.
            Start with $100. Get monthly profits.
          </p>

          {/* Animated CTAs with magnetic effect and ripples */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link href="/explorer">
              <Button
                ref={exploreMagnetic.ref as any}
                className="h-12 px-8 bg-black hover:bg-gray-900 text-white rounded-full font-medium group transition-all hover:shadow-xl relative overflow-hidden"
                style={{
                  transform: `translate(${exploreMagnetic.position.x}px, ${exploreMagnetic.position.y}px)`
                }}
                onClick={heroRipple.createRipple as any}
              >
                {/* Ripple effects */}
                {heroRipple.ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                    style={{
                      left: ripple.x - 10,
                      top: ripple.y - 10,
                      width: 20,
                      height: 20
                    }}
                  />
                ))}
                Explore Opportunities
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#how">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-full font-medium border-gray-200 hover:border-gray-300 transition-all"
              >
                How it works
              </Button>
            </Link>
          </div>

          {/* Floating particles */}
          {mounted && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${10 + i * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Organic Wave Divider */}
      <div className="relative h-32 -mt-1 overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d={`M0,${60 + Math.sin(time * 0.5) * 10}
               C${300 + Math.cos(time * 0.3) * 20},${40 + Math.sin(time * 0.7) * 15}
               ${600 + Math.sin(time * 0.4) * 25},${80 + Math.cos(time * 0.6) * 10}
               1200,${60 + Math.sin(time * 0.5) * 10}
               L1200,120 L0,120 Z`}
            fill="url(#waveGradient)"
            className="animate-flow"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.03)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.03)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.03)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* $COFFEE Feature - Dynamic & Interactive */}
      <section className="py-20 px-6 relative -mt-32">
        <div className="max-w-5xl mx-auto">

          {/* Animated Section Header */}
          <div className="flex items-center gap-4 mb-12 animate-fade-in">
            <span className="text-xs font-mono text-gray-400 animate-slide-right">001</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 animate-expand" />
            <span className="text-xs font-mono text-gray-400 animate-slide-left">FIRST LAUNCH</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Info with animated counters */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-serif mb-4">$COFFEE</h2>
              <p className="text-gray-600 mb-8">
                A Beirut coffee shop where employees own equity and every cup sold benefits token holders.
              </p>

              {/* Animated Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b hover:border-gray-300 transition-colors">
                  <span className="text-sm text-gray-500">Token price</span>
                  <span className="font-mono font-medium" ref={priceCounter.ref}>
                    ${priceCounter.count > 0 ? `0.${priceCounter.count}` : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b hover:border-gray-300 transition-colors">
                  <span className="text-sm text-gray-500">Revenue share</span>
                  <span className="font-mono font-medium" ref={revenueCounter.ref}>
                    {revenueCounter.count}%
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b hover:border-gray-300 transition-colors">
                  <span className="text-sm text-gray-500">Min investment</span>
                  <span className="font-mono font-medium" ref={minCounter.ref}>
                    ${minCounter.count}
                  </span>
                </div>
                <div className="flex justify-between py-3 hover:bg-gray-50 transition-colors rounded">
                  <span className="text-sm text-gray-500">Launch date</span>
                  <span className="font-mono font-medium">Q4 2025</span>
                </div>
              </div>

              <Link href="/explorer/coffee">
                <Button className="w-full h-11 bg-black hover:bg-gray-900 text-white rounded-lg font-medium transition-all hover:scale-[1.02] hover:shadow-lg group">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right: Living Visual */}
            <div className="relative animate-fade-in-left">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="text-center relative z-10">
                  <div className="text-6xl font-serif mb-4 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-gradient-y bg-[length:auto_200%]">
                    $COFFEE
                  </div>
                  <div className="text-sm text-gray-500">Beirut, Lebanon</div>
                </div>

                {/* Living background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-transparent to-orange-200 animate-gradient-shift" />
                </div>
              </div>

              {/* Floating Status */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border animate-bounce-slow">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-xs font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Staggered animations */}
      <section id="how" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4 animate-fade-in">How it works</h2>
            <p className="text-gray-600 animate-fade-in animation-delay-200">Three simple steps to ownership</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Choose a business",
                description: "Browse vetted local businesses seeking investment"
              },
              {
                number: "2",
                title: "Buy tokens",
                description: "Invest as little as $100 to become a partial owner"
              },
              {
                number: "3",
                title: "Earn monthly",
                description: "Receive your share of profits every month"
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative animate-fade-in-up hover:translate-y-[-4px] transition-transform"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium animate-scale-in hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>

                {/* Connecting line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-5 left-[60px] w-[calc(100%-60px)] h-[1px]">
                    <div className="h-full bg-gradient-to-r from-gray-300 to-transparent animate-expand" style={{ animationDelay: `${i * 200 + 500}ms` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits - Interactive cards */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4 animate-fade-in">Why $NOW</h2>
            <p className="text-gray-600 animate-fade-in animation-delay-200">A better way to invest in local businesses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparent",
                description: "All transactions on-chain",
                color: "blue"
              },
              {
                icon: Users,
                title: "Community",
                description: "Owned by locals",
                color: "purple"
              },
              {
                icon: TrendingUp,
                title: "Returns",
                description: "Monthly profit share",
                color: "green"
              },
              {
                icon: Zap,
                title: "Simple",
                description: "Start with $100",
                color: "orange"
              }
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <feature.icon className={`w-8 h-8 mb-4 text-gray-400 group-hover:text-${feature.color}-500 transition-colors`} />
                <h3 className="font-medium mb-2 group-hover:text-gray-900 transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Breathing text */}
      <section className="py-20 px-6 border-t relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8 animate-fade-in">Our philosophy</h2>

          <div className="space-y-8">
            {[
              "Employees should own the businesses they build",
              "Customers should benefit from the businesses they support",
              "Profits should flow back to the community"
            ].map((text, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="text-5xl font-serif text-transparent bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text mb-3 animate-pulse-slow">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Dynamic gradient */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-white animate-gradient-shift" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-serif mb-6 animate-fade-in">
            Ready to own{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              real equity?
            </span>
          </h2>
          <p className="text-gray-600 mb-8 animate-fade-in animation-delay-200">
            Join the future of community ownership
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link href="/explorer">
              <Button
                ref={ctaMagnetic.ref as any}
                className="h-12 px-8 bg-black hover:bg-gray-900 text-white rounded-full font-medium transition-all hover:shadow-xl group"
                style={{
                  transform: `translate(${ctaMagnetic.position.x}px, ${ctaMagnetic.position.y}px)`
                }}
              >
                Start Investing
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/franchise/apply">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-full font-medium border-gray-200 hover:border-gray-400 transition-all"
              >
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-20px); }
          75% { transform: translateX(20px); }
        }

        @keyframes tree-sway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-1deg); }
          75% { transform: translateX(10px) rotate(1deg); }
        }

        @keyframes tree-sway-reverse {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(10px) rotate(1deg); }
          75% { transform: translateX(-10px) rotate(-1deg); }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }

        @keyframes breathe-reverse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(0.9) rotate(-180deg); }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes aurora {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-20px) scaleY(1.2); }
        }

        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slide-left {
          from { transform: translateX(10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-y {
          0%, 100% { background-position: 50% 0%; }
          50% { background-position: 50% 100%; }
        }

        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes gradient-shift-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }

        .animate-slide-right {
          animation: slide-right 0.6s ease-out forwards;
        }

        .animate-slide-left {
          animation: slide-left 0.6s ease-out forwards;
        }

        .animate-expand {
          animation: expand 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-y {
          animation: gradient-y 4s ease infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 8s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle var(--duration, 3s) ease-in-out infinite;
        }

        .animate-snowfall {
          animation: snowfall var(--duration, 20s) linear infinite;
        }

        .animate-sway {
          animation: sway var(--duration, 4s) ease-in-out infinite;
        }

        .animate-tree-sway {
          animation: tree-sway 6s ease-in-out infinite;
        }

        .animate-tree-sway-reverse {
          animation: tree-sway-reverse 6s ease-in-out infinite;
        }

        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }

        .animate-breathe-reverse {
          animation: breathe-reverse 8s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }

        .animate-aurora {
          animation: aurora 10s ease-in-out infinite;
        }

        .animate-flow {
          animation: flow 20s linear infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover states */
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Living text gradient */
        .gradient-text {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </main>
  )
}