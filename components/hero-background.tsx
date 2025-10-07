"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    })

    // Ultra-smooth ink flow system
    class InkFlow {
      path: Array<{
        x: number
        y: number
        vx: number
        vy: number
        life: number
      }>

      constructor() {
        this.path = []
        // Start from random edge
        const edge = Math.floor(Math.random() * 4)
        let x, y, vx, vy

        switch(edge) {
          case 0: // top
            x = Math.random() * w
            y = 0
            vx = (Math.random() - 0.5) * 2
            vy = 1 + Math.random() * 2
            break
          case 1: // right
            x = w
            y = Math.random() * h
            vx = -(1 + Math.random() * 2)
            vy = (Math.random() - 0.5) * 2
            break
          case 2: // bottom
            x = Math.random() * w
            y = h
            vx = (Math.random() - 0.5) * 2
            vy = -(1 + Math.random() * 2)
            break
          default: // left
            x = 0
            y = Math.random() * h
            vx = 1 + Math.random() * 2
            vy = (Math.random() - 0.5) * 2
        }

        this.path.push({ x, y, vx, vy, life: 0 })
      }

      update() {
        if (this.path.length === 0) return

        const latest = this.path[this.path.length - 1]

        // Organic flow using sine waves
        const time = Date.now() * 0.001
        const flowX = Math.sin(time * 0.7 + latest.y * 0.01) * 0.5
        const flowY = Math.cos(time * 0.5 + latest.x * 0.01) * 0.5

        // Update velocity with flow influence
        const newVx = latest.vx * 0.98 + flowX
        const newVy = latest.vy * 0.98 + flowY

        // Add new point
        this.path.push({
          x: latest.x + newVx,
          y: latest.y + newVy,
          vx: newVx,
          vy: newVy,
          life: 0
        })

        // Age all points
        this.path.forEach(p => p.life++)

        // Remove old points
        this.path = this.path.filter(p => p.life < 500)

        // Reset if path dies or goes off screen
        const last = this.path[this.path.length - 1]
        if (!last || last.x < -100 || last.x > w + 100 || last.y < -100 || last.y > h + 100) {
          this.path = []
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.path.length < 2) return

        // Draw smooth curve through points
        ctx.beginPath()
        ctx.moveTo(this.path[0].x, this.path[0].y)

        for (let i = 1; i < this.path.length - 1; i++) {
          const xc = (this.path[i].x + this.path[i + 1].x) / 2
          const yc = (this.path[i].y + this.path[i + 1].y) / 2

          const age = this.path[i].life / 500
          const opacity = (1 - age) * 0.4

          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
          ctx.lineWidth = (1 - age) * 2
          ctx.quadraticCurveTo(this.path[i].x, this.path[i].y, xc, yc)
        }

        ctx.stroke()
      }
    }

    const flows: InkFlow[] = []

    // Create initial flows
    for (let i = 0; i < 3; i++) {
      flows.push(new InkFlow())
    }

    const render = () => {
      // Ultra subtle fade
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(0, 0, w, h)

      // Update and draw flows
      flows.forEach(flow => {
        flow.update()
        flow.draw(ctx)
      })

      // Occasionally add new flow
      if (Math.random() < 0.005 && flows.length < 5) {
        flows.push(new InkFlow())
      }

      // Remove dead flows
      for (let i = flows.length - 1; i >= 0; i--) {
        if (flows[i].path.length === 0) {
          flows.splice(i, 1)
        }
      }

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.6
      }}
    />
  )
}