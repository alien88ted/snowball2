"use client"

import { useEffect, useRef } from "react"

export function Premium3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener("resize", setSize)

    // 3D Geometric Object
    class Icosahedron {
      x: number
      y: number
      z: number
      rotation: { x: number; y: number; z: number }
      rotationSpeed: { x: number; y: number; z: number }
      scale: number
      vertices: number[][]
      edges: number[][]

      constructor(x: number, y: number, z: number, scale: number) {
        this.x = x
        this.y = y
        this.z = z
        this.scale = scale
        this.rotation = { x: 0, y: 0, z: 0 }
        this.rotationSpeed = {
          x: 0.002 + Math.random() * 0.003,
          y: 0.002 + Math.random() * 0.003,
          z: 0.001 + Math.random() * 0.002
        }

        // Torus (donut) - simple but complex-looking
        const segments = 24
        const tubes = 16
        const radius = 1.5
        const tubeRadius = 0.6

        this.vertices = []
        for (let i = 0; i < segments; i++) {
          const u = (i / segments) * Math.PI * 2
          for (let j = 0; j < tubes; j++) {
            const v = (j / tubes) * Math.PI * 2
            const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u)
            const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u)
            const z = tubeRadius * Math.sin(v)
            this.vertices.push([x, y, z])
          }
        }

        // Create edges for wireframe
        this.edges = []
        for (let i = 0; i < segments; i++) {
          for (let j = 0; j < tubes; j++) {
            const current = i * tubes + j
            const next = i * tubes + ((j + 1) % tubes)
            const nextSegment = ((i + 1) % segments) * tubes + j

            this.edges.push([current, next])
            this.edges.push([current, nextSegment])
          }
        }
      }

      update() {
        this.rotation.x += this.rotationSpeed.x
        this.rotation.y += this.rotationSpeed.y
        this.rotation.z += this.rotationSpeed.z
      }

      project(vertex: number[]) {
        // Apply rotation
        let [x, y, z] = vertex

        // Rotate X
        let tempY = y
        y = y * Math.cos(this.rotation.x) - z * Math.sin(this.rotation.x)
        z = tempY * Math.sin(this.rotation.x) + z * Math.cos(this.rotation.x)

        // Rotate Y
        let tempX = x
        x = x * Math.cos(this.rotation.y) + z * Math.sin(this.rotation.y)
        z = -tempX * Math.sin(this.rotation.y) + z * Math.cos(this.rotation.y)

        // Rotate Z
        tempX = x
        x = x * Math.cos(this.rotation.z) - y * Math.sin(this.rotation.z)
        y = tempX * Math.sin(this.rotation.z) + y * Math.cos(this.rotation.z)

        // Scale and translate
        x *= this.scale
        y *= this.scale
        z *= this.scale

        // Perspective projection
        const perspective = 800
        const scale = perspective / (perspective + z + this.z)

        return {
          x: this.x + x * scale,
          y: this.y + y * scale,
          scale: scale
        }
      }

      draw() {
        const projected = this.vertices.map(v => this.project(v))

        // Draw edges
        this.edges.forEach(([i, j]) => {
          const p1 = projected[i]
          const p2 = projected[j]

          const avgScale = (p1.scale + p2.scale) / 2
          const opacity = Math.max(0.1, Math.min(0.6, avgScale * 0.8))

          // Gradient line for depth
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
          gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 1.2})`)
          gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = avgScale * 2
          ctx.lineCap = "round"

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        })

        // Optional: draw key vertices only (every 8th)
        projected.forEach((p, i) => {
          if (i % 8 !== 0) return

          const opacity = Math.max(0.2, Math.min(0.6, p.scale))

          // Small glow
          const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6 * p.scale)
          glowGradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.6})`)
          glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    }

    // Create floating torus objects
    const objects: Icosahedron[] = [
      new Icosahedron(canvas.width * 0.25, canvas.height * 0.25, -200, 60),
      new Icosahedron(canvas.width * 0.75, canvas.height * 0.7, -250, 55),
      new Icosahedron(canvas.width * 0.5, canvas.height * 0.5, -180, 50),
    ]

    let animationId: number

    const draw = () => {
      // Clear background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      objects.forEach(obj => {
        obj.update()
        obj.draw()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", setSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
