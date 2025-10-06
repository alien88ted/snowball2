"use client"

import { useEffect, useRef } from "react"

export function SnowDepthBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      return
    }

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()
    const resizeCanvas = () => {
      cancelAnimationFrame(animationId)
      setCanvasSize()
      animationId = requestAnimationFrame(draw)
    }
    window.addEventListener("resize", resizeCanvas, { passive: true })

    // Multi-layer snow system with depth
    class SnowLayer {
      flakes: Snowflake[]
      depth: number // 0 = far, 1 = near

      constructor(count: number, depth: number) {
        this.depth = depth
        this.flakes = []

        for (let i = 0; i < count; i++) {
          this.flakes.push(new Snowflake(depth))
        }
      }
    }

    class Snowflake {
      x: number
      baseY: number
      y: number
      size: number
      speed: number
      drift: number
      opacity: number
      sparkle: number
      sparkleSpeed: number
      depth: number
      blur: number

      constructor(depth: number) {
        this.depth = depth
        this.x = Math.random() * canvas.width
        this.baseY = Math.random() * canvas.height
        this.y = this.baseY

        // Depth affects size, speed, and opacity
        // Near flakes: bigger, faster, more opaque
        // Far flakes: tiny, slow, subtle
        const depthFactor = 0.3 + depth * 0.7

        this.size = (1 + depth * 5) * (0.8 + Math.random() * 0.4)
        this.speed = (0.5 + depth * 2) * (0.8 + Math.random() * 0.4)
        this.drift = (Math.random() - 0.5) * 0.8 * depth
        this.opacity = 0.4 + depth * 0.5
        this.sparkle = Math.random()
        this.sparkleSpeed = 0.01 + Math.random() * 0.02
        this.blur = 0
      }

      update(time: number) {
        this.y = (this.baseY + time * this.speed) % (window.innerHeight + 20)

        if (this.y < -10) {
          this.y = window.innerHeight + 10
          this.baseY = window.innerHeight + 10
        }

        this.x += Math.sin(time * 0.001 + this.baseY) * this.drift

        // Wrap horizontally
        if (this.x < -10) this.x = canvas.width + 10
        if (this.x > canvas.width + 10) this.x = -10

        // Sparkle animation
        this.sparkle = (Math.sin(time * this.sparkleSpeed) + 1) / 2
      }

      draw() {

        const sparkleIntensity = this.sparkle * 0.3

        // Simple white snowflake
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()

        // Optional subtle glow for larger flakes
        if (this.depth > 0.6 && this.size > 3) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.2})`
          ctx.fill()
        }
      }
    }

    // Create 3 optimized layers
    const layers = [
      new SnowLayer(20, 0.2),  // Background
      new SnowLayer(15, 0.5),  // Middle
      new SnowLayer(10, 0.8),  // Foreground
    ]

    let animationId: number
    let time = 0

    let lastTs = 0
    const draw = (ts?: number) => {
      if (typeof ts === "number") {
        const dt = Math.min(33, ts - lastTs || 16)
        lastTs = ts
        time += dt * 0.06
      } else {
        time += 1
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw layers from back to front
      layers.forEach(layer => {
        layer.flakes.forEach(flake => {
          flake.update(time)
          flake.draw()
        })
      })

      animationId = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        cancelAnimationFrame(animationId)
        animationId = requestAnimationFrame(draw)
      } else {
        cancelAnimationFrame(animationId)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("visibilitychange", onVisibility)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1
      }}
    />
  )
}
