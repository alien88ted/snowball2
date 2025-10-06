"use client"

import { useEffect, useRef } from "react"

export function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Orb class
    class Orb {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = 150 + Math.random() * 250
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3

        // Subtle color palette
        const colors = [
          "rgba(139, 92, 246, 0.15)", // purple
          "rgba(59, 130, 246, 0.15)",  // blue
          "rgba(236, 72, 153, 0.12)",  // pink
          "rgba(168, 85, 247, 0.15)",  // violet
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < -this.radius || this.x > canvas.width + this.radius) {
          this.vx *= -1
        }
        if (this.y < -this.radius || this.y > canvas.height + this.radius) {
          this.vy *= -1
        }
      }

      draw() {
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

    // Create orbs
    const orbs: Orb[] = []
    for (let i = 0; i < 4; i++) {
      orbs.push(new Orb())
    }

    let animationId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw orbs
      orbs.forEach(orb => {
        orb.update()
        orb.draw()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        filter: "blur(60px)"
      }}
    />
  )
}
