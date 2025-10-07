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
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1
      mouseY += (targetMouseY - mouseY) * 0.1

      // Clear with slight trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw 3D perspective grid
      const vanishY = canvas.height * 0.3
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)'
      ctx.lineWidth = 1

      // Horizontal lines with perspective
      for (let y = vanishY; y < canvas.height; y += gridSize) {
        const progress = (y - vanishY) / (canvas.height - vanishY)
        const lineY = vanishY + (y - vanishY) * Math.pow(progress, 1.5)

        ctx.beginPath()
        ctx.moveTo(0, lineY)
        ctx.lineTo(canvas.width, lineY)
        ctx.stroke()
      }

      // Vertical lines with perspective
      const centerX = canvas.width / 2
      for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(centerX, vanishY)
        const endX = centerX + (x - centerX) * 2
        ctx.lineTo(endX, canvas.height)
        ctx.stroke()
      }

      // Draw particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Distance from mouse
        const dist = Math.sqrt(Math.pow(particle.x - mouseX, 2) + Math.pow(particle.y - mouseY, 2))
        const glow = Math.max(0, 1 - dist / 200)

        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity + glow * 0.3})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * (1 + glow), 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw interactive grid dots with wave effect
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
          const wave = Math.sin(distance * 0.01 - frame * 0.05) * 0.5 + 0.5
          const opacity = Math.max(0.05, (1 - distance / 400) * wave)

          ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.4})`
          ctx.beginPath()
          const dotRadius = dotSize * (1 + wave * 0.5)
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Update and draw floating nodes with enhanced effects
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        node.pulsePhase += 0.05

        // Bounce off walls with dampening
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.9
          node.x = Math.max(0, Math.min(canvas.width, node.x))
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.9
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        }

        // Attraction to mouse (subtle)
        const mouseDistX = mouseX - node.x
        const mouseDistY = mouseY - node.y
        const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY)
        if (mouseDist < 300 && mouseDist > 50) {
          node.vx += (mouseDistX / mouseDist) * 0.02
          node.vy += (mouseDistY / mouseDist) * 0.02
        }

        // Draw connections to nearby nodes with gradient
        nodes.forEach((otherNode, j) => {
          if (i >= j) return
          const dist = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
            Math.pow(node.y - otherNode.y, 2)
          )
          if (dist < 250) {
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
            gradient.addColorStop(0, `rgba(${node.color}, ${0.2 * (1 - dist / 250)})`)
            gradient.addColorStop(1, `rgba(${otherNode.color}, ${0.2 * (1 - dist / 250)})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = lineWidth * (1 - dist / 250) * 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        })

        // Draw node with multi-layer glow
        const pulseSize = Math.sin(node.pulsePhase) * 0.3 + 1

        // Outer glow
        const glow1 = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 6 * pulseSize)
        glow1.addColorStop(0, `rgba(${node.color}, 0.1)`)
        glow1.addColorStop(0.5, `rgba(${node.color}, 0.05)`)
        glow1.addColorStop(1, `rgba(${node.color}, 0)`)

        ctx.fillStyle = glow1
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 6 * pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Mid glow
        const glow2 = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3 * pulseSize)
        glow2.addColorStop(0, `rgba(${node.color}, 0.3)`)
        glow2.addColorStop(0.7, `rgba(${node.color}, 0.1)`)
        glow2.addColorStop(1, `rgba(${node.color}, 0)`)

        ctx.fillStyle = glow2
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3 * pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(${node.color}, 0.8)`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // White center
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 0.3 * pulseSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // Mouse cursor effects
      // Ripple effect
      for (let i = 0; i < 3; i++) {
        const rippleRadius = 30 + Math.sin(frame * 0.05 + i * Math.PI / 3) * 20 + i * 20
        const rippleOpacity = 0.1 * (1 - i / 3)
        ctx.strokeStyle = `rgba(236, 72, 153, ${rippleOpacity})`
        ctx.lineWidth = 2 - i * 0.5
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, rippleRadius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Central glow at cursor
      const cursorGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100)
      cursorGlow.addColorStop(0, 'rgba(236, 72, 153, 0.1)')
      cursorGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)')
      cursorGlow.addColorStop(1, 'rgba(139, 92, 246, 0)')

      ctx.fillStyle = cursorGlow
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2)
      ctx.fill()

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