"use client"

import { useEffect, useRef } from "react"

export function EnhancedBackground() {
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

    // Particle system
    class Particle {
      x: number
      y: number
      baseY: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulseSpeed: number
      pulsePhase: number

      constructor(sectionY: number) {
        this.x = Math.random() * canvas.width
        this.baseY = sectionY
        this.y = this.baseY
        this.size = 1 + Math.random() * 3
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.2

        const colors = [
          "rgba(139, 92, 246, 0.4)",
          "rgba(59, 130, 246, 0.4)",
          "rgba(236, 72, 153, 0.4)",
          "rgba(168, 85, 247, 0.4)",
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = 0.3 + Math.random() * 0.4
        this.pulseSpeed = 0.001 + Math.random() * 0.002
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update(time: number, scrollY: number) {
        this.x += this.speedX
        this.y = this.baseY - scrollY * 0.2 + Math.sin(time * 0.001) * 20

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0

        this.opacity = 0.3 + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.3
      }

      draw(scrollY: number) {
        const viewportY = scrollY
        const viewportHeight = window.innerHeight

        if (this.y < viewportY - 100 || this.y > viewportY + viewportHeight + 100) {
          return
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
        ctx.fill()

        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/g, `${this.opacity * 0.5})`))
        gradient.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = gradient
        ctx.fillRect(this.x - this.size * 4, this.y - this.size * 4, this.size * 8, this.size * 8)
      }
    }

    // Animated mesh gradient orbs
    class MeshOrb {
      x: number
      y: number
      baseY: number
      radius: number
      color1: string
      color2: string
      angle: number
      rotationSpeed: number
      pulseSpeed: number
      phase: number

      constructor(sectionY: number, colorScheme: number) {
        this.x = Math.random() * canvas.width
        this.baseY = sectionY
        this.y = this.baseY
        this.radius = 300 + Math.random() * 400
        this.angle = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.0002
        this.pulseSpeed = 0.0005 + Math.random() * 0.001
        this.phase = Math.random() * Math.PI * 2

        const schemes = [
          ["rgba(139, 92, 246, 0.15)", "rgba(59, 130, 246, 0.12)"],
          ["rgba(236, 72, 153, 0.12)", "rgba(168, 85, 247, 0.15)"],
          ["rgba(59, 130, 246, 0.12)", "rgba(34, 211, 238, 0.10)"],
        ]
        const scheme = schemes[colorScheme % schemes.length]
        this.color1 = scheme[0]
        this.color2 = scheme[1]
      }

      update(time: number, scrollY: number) {
        this.angle += this.rotationSpeed
        const pulse = Math.sin(time * this.pulseSpeed + this.phase)
        this.radius = (300 + Math.random() * 100) + pulse * 50
        this.y = this.baseY - scrollY * 0.4 + Math.sin(time * 0.0003 + this.phase) * 60
        this.x += Math.cos(time * 0.0002) * 0.3
      }

      draw(scrollY: number) {
        const viewportY = scrollY
        const viewportHeight = window.innerHeight

        if (this.y < viewportY - this.radius * 2 || this.y > viewportY + viewportHeight + this.radius * 2) {
          return
        }

        const gradient = ctx.createRadialGradient(
          this.x + Math.cos(this.angle) * 100,
          this.y + Math.sin(this.angle) * 100,
          0,
          this.x,
          this.y,
          this.radius
        )
        gradient.addColorStop(0, this.color1)
        gradient.addColorStop(0.5, this.color2)
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

    const particles: Particle[] = []
    const meshOrbs: MeshOrb[] = []

    // Create particles throughout the page
    for (let i = 0; i < 150; i++) {
      const sectionY = Math.random() * canvas.height
      particles.push(new Particle(sectionY))
    }

    // Create mesh orbs
    for (let i = 0; i < 8; i++) {
      const sectionHeight = canvas.height / 5
      const sectionY = (i % 5) * sectionHeight + Math.random() * sectionHeight
      meshOrbs.push(new MeshOrb(sectionY, i))
    }

    let animationId: number
    let scrollY = window.scrollY

    const updateScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener("scroll", updateScroll, { passive: true })

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw mesh orbs first
      meshOrbs.forEach(orb => {
        orb.update(time, scrollY)
        orb.draw(scrollY)
      })

      // Draw particles on top
      particles.forEach(particle => {
        particle.update(time, scrollY)
        particle.draw(scrollY)
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
        filter: "blur(60px)",
        height: "100vh"
      }}
    />
  )
}
