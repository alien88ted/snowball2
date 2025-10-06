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

    // Animation variables
    let animationId: number
    let time = 0

    // Grid settings with perspective
    const gridSize = 40
    const gridSpacing = 50
    const speed = 1.2
    const perspective = 400
    const vanishingY = canvas.height * 0.35 // Vanishing point

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += speed

      const centerX = canvas.width / 2

      // Draw perspective grid with depth
      ctx.save()

      // Horizontal lines (with perspective)
      for (let i = -gridSize; i <= gridSize; i++) {
        const z = (i * gridSpacing + time) % (gridSpacing * gridSize)
        const depth = Math.max(1, z)

        const scale = perspective / (perspective + depth)
        const y = vanishingY + (canvas.height - vanishingY) * (1 - scale)

        if (y < vanishingY - 50 || y > canvas.height) continue

        // Calculate opacity based on depth
        const depthFactor = 1 - (depth / (gridSpacing * gridSize))
        const opacity = Math.max(0.05, Math.min(0.3, depthFactor * 0.4))

        // Add glow effect for closer lines
        if (depthFactor > 0.7) {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`
        } else {
          ctx.shadowBlur = 0
        }

        ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`
        ctx.lineWidth = depthFactor > 0.7 ? 1.5 : 1

        const width = canvas.width * scale
        const leftX = centerX - width / 2
        const rightX = centerX + width / 2

        ctx.beginPath()
        ctx.moveTo(leftX, y)
        ctx.lineTo(rightX, y)
        ctx.stroke()
      }

      ctx.shadowBlur = 0

      // Vertical lines (with perspective)
      for (let i = -20; i <= 20; i++) {
        const x = i * gridSpacing * 2

        ctx.strokeStyle = "rgba(200, 200, 200, 0.15)"
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(centerX + x, vanishingY)

        // Calculate perspective endpoints
        const bottomScale = 3
        ctx.lineTo(centerX + x * bottomScale, canvas.height)
        ctx.stroke()
      }

      ctx.restore()

      // Add subtle vignette
      const vignette = ctx.createRadialGradient(
        centerX,
        canvas.height / 2,
        canvas.width * 0.3,
        centerX,
        canvas.height / 2,
        canvas.width * 0.8
      )
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)")
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.6)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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
      style={{ zIndex: 0 }}
    />
  )
}
