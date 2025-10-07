"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Grid properties
    const gridSize = 40
    const dotSize = 1.5
    const lineWidth = 0.5

    // Animation state
    let frame = 0
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let targetMouseX = canvas.width / 2
    let targetMouseY = canvas.height / 2

    // Track mouse movement with smoothing
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Floating nodes with enhanced properties
    const nodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 4 + 2,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '139, 92, 246' : '236, 72, 153', // purple or pink
    }))

    // Particles system
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid dots
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)'
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
          const opacity = Math.max(0.1, 1 - distance / 300)
          ctx.globalAlpha = opacity * 0.3
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Update and draw floating nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections to nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i === j) return
          const dist = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
            Math.pow(node.y - otherNode.y, 2)
          )
          if (dist < 200) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 200)})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        })

        // Draw node with glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3)
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')

        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw animated pulse circles at mouse position
      const pulseRadius = 50 + Math.sin(frame * 0.05) * 20
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, pulseRadius, 0, Math.PI * 2)
      ctx.stroke()

      frame++
      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-purple-500/10 animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full border border-pink-500/10 animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full border border-blue-500/10 animate-float-fast" />
      </div>
    </>
  )
}