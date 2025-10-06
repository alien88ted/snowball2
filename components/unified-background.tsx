"use client"

import { useEffect, useRef } from "react"

export function UnifiedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resizeCanvas()

    window.addEventListener("resize", resizeCanvas)

    // Create flowing orbs that span the entire page
    class FlowingOrb {
      x: number
      y: number
      baseY: number
      radius: number
      speed: number
      color: string
      oscillation: number
      phase: number

      constructor(sectionY: number, color: string) {
        this.x = Math.random() * canvas.width
        this.baseY = sectionY
        this.y = this.baseY
        this.radius = 200 + Math.random() * 300
        this.speed = 0.0003 + Math.random() * 0.0005
        this.color = color
        this.oscillation = 30 + Math.random() * 50
        this.phase = Math.random() * Math.PI * 2
      }

      update(time: number, scrollY: number) {
        // Parallax effect based on scroll
        const parallaxFactor = 0.3
        this.y = this.baseY - scrollY * parallaxFactor + Math.sin(time * this.speed + this.phase) * this.oscillation
        this.x += Math.cos(time * this.speed * 0.5) * 0.2

        // Keep in bounds
        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
      }

      draw(scrollY: number) {
        // Only draw if near viewport
        const viewportY = scrollY
        const viewportHeight = window.innerHeight

        if (this.y < viewportY - this.radius * 2 || this.y > viewportY + viewportHeight + this.radius * 2) {
          return
        }

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        )
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        )
      }
    }

    // Create orbs at different vertical positions
    const orbs: FlowingOrb[] = []
    const colors = [
      "rgba(139, 92, 246, 0.12)",  // purple
      "rgba(59, 130, 246, 0.12)",   // blue
      "rgba(236, 72, 153, 0.10)",   // pink
      "rgba(168, 85, 247, 0.12)",   // violet
      "rgba(34, 211, 238, 0.10)",   // cyan
    ]

    // Distribute orbs throughout the page height
    for (let i = 0; i < 12; i++) {
      const sectionHeight = canvas.height / 6
      const sectionY = (i % 6) * sectionHeight + Math.random() * sectionHeight
      orbs.push(new FlowingOrb(sectionY, colors[i % colors.length]))
    }

    let animationId: number
    let lastTime = 0
    let scrollY = window.scrollY

    const updateScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener("scroll", updateScroll, { passive: true })

    const draw = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach(orb => {
        orb.update(time, scrollY)
        orb.draw(scrollY)
      })

      animationId = requestAnimationFrame(draw)
    }

    draw(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", updateScroll)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        zIndex: 0,
        filter: "blur(70px)",
        height: "100vh"
      }}
    />
  )
}
