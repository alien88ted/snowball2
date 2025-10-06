"use client"

import { useEffect, useRef } from "react"

export function HyperliquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0
    let scrollY = window.scrollY
    let cameraZ = 0

    const updateScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener("scroll", updateScroll, { passive: true })

    // 3D point projection
    const project = (x: number, y: number, z: number, perspective: number) => {
      const scale = perspective / (perspective + z)
      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
        scale: scale
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.6
      cameraZ = time * 0.4 + scrollY * 0.03

      const perspective = 600
      const gridSize = 20
      const cellSize = 80

      // GRID: Single optimized horizontal plane
      ctx.save()

      // Draw every 2nd line for performance
      for (let x = -gridSize; x <= gridSize; x += 2) {
        const points = []
        for (let z = -gridSize; z <= gridSize; z += 2) {
          const zPos = z * cellSize - (cameraZ % cellSize)
          const point = project(x * cellSize, 250, zPos, perspective)
          points.push(point)
        }

        ctx.beginPath()
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })

        const avgScale = points.reduce((sum, p) => sum + p.scale, 0) / points.length
        const opacity = Math.max(0.02, Math.min(0.15, avgScale * 0.3))

        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Vertical lines
      for (let z = -gridSize; z <= gridSize; z += 2) {
        const points = []
        for (let x = -gridSize; x <= gridSize; x += 2) {
          const zPos = z * cellSize - (cameraZ % cellSize)
          const point = project(x * cellSize, 250, zPos, perspective)
          points.push(point)
        }

        ctx.beginPath()
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })

        const avgScale = points.reduce((sum, p) => sum + p.scale, 0) / points.length
        const opacity = Math.max(0.02, Math.min(0.15, avgScale * 0.3))

        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Minimal accent nodes (only a few)
      const nodeSpacing = 8
      for (let x = -gridSize; x <= gridSize; x += nodeSpacing) {
        for (let z = -gridSize; z <= gridSize; z += nodeSpacing) {
          const zPos = z * cellSize - (cameraZ % (cellSize * nodeSpacing))
          const point = project(x * cellSize, 250, zPos, perspective)

          if (point.scale > 0.5 && point.scale < 1.5) {
            const pulse = Math.sin(time * 0.03 + x * 0.15 + z * 0.15) * 0.5 + 0.5
            const nodeSize = point.scale * 2 * (1 + pulse * 0.3)
            const opacity = Math.min(0.4, point.scale * 0.6) * (0.5 + pulse * 0.5)

            ctx.beginPath()
            ctx.arc(point.x, point.y, nodeSize, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(236, 72, 153, ${opacity})`
            ctx.fill()
          }
        }
      }

      ctx.restore()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", updateScroll)
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
