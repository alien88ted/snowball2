"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

// Celestial Weave: A premium background with flowing ribbons, cosmic dust, and a deep aurora.
export function Hero2Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let W = window.innerWidth
    let H = window.innerHeight
    
    const setSize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.scale(dpr, dpr)
    }
    setSize()
    window.addEventListener("resize", setSize)

    const mouse = { x: W / 2, y: H / 2, influence: 0.1 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    const hsla = (h: number, s: number, l: number, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`

    // --- Volumetric Aurora Layer ---
    const orbs: any[] = []
    const createOrbs = () => {
      orbs.length = 0
      const colors = [
        { h: 220, s: 70, l: 50, a: 0.12 },
        { h: 260, s: 60, l: 55, a: 0.10 },
        { h: 330, s: 65, l: 60, a: 0.09 },
      ]
      for (let i = 0; i < 3; i++) {
        orbs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          radius: 400 + Math.random() * 400,
          speed: 0.000015 + Math.random() * 0.00002,
          phase: Math.random() * Math.PI * 2,
          ...colors[i],
        })
      }
    }
    createOrbs()

    // --- Celestial Ribbons ---
    const ribbons: any[] = []
    const createRibbons = () => {
      ribbons.length = 0
      const ribbonCount = 5
      for (let i = 0; i < ribbonCount; i++) {
        ribbons.push({
          amplitude: 30 + Math.random() * 20,
          wavelength: 250 + Math.random() * 150,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0004 + Math.random() * 0.0006,
          offsetY: H * 0.2 + (i / ribbonCount) * (H * 0.6),
          thickness: 1.0 + Math.random() * 1.0,
          hueOffset: -15 + i * 10,
        })
      }
    }
    createRibbons()

    // --- Cosmic Dust & Glints ---
    const particles: any[] = []
    const createParticles = () => {
      particles.length = 0
      const particleCount = W > 768 ? 100 : 50
      for (let i = 0; i < particleCount; i++) {
        const isGlint = Math.random() > 0.95
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: Math.random() * 1.5, // Depth for parallax
          size: isGlint ? 1 + Math.random() * 1.5 : 0.5 + Math.random() * 0.8,
          speed: 0.05 + Math.random() * 0.1,
          opacity: isGlint ? 1 : 0.4 + Math.random() * 0.4,
          isGlint: isGlint,
          twinkleSpeed: 0.05 + Math.random() * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
    }
    createParticles()

    let rafId: number
    const render = (time: number) => {
      ctx.clearRect(0, 0, W, H)

      // Mouse influence
      const mouseOffsetX = (mouse.x - W / 2) * mouse.influence
      const mouseOffsetY = (mouse.y - H / 2) * mouse.influence
      
      // --- Draw Aurora ---
      ctx.globalCompositeOperation = "screen"
      orbs.forEach(orb => {
        const x = orb.x + Math.sin(time * orb.speed + orb.phase) * 150
        const y = orb.y + Math.cos(time * orb.speed * 0.8 + orb.phase) * 150
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius)
        gradient.addColorStop(0, hsla(orb.h, orb.s, orb.l, orb.a))
        gradient.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = gradient
        ctx.fillRect(x - orb.radius, y - orb.radius, orb.radius * 2, orb.radius * 2)
      })
      
      // --- Draw Ribbons ---
      ctx.globalCompositeOperation = "lighter"
      const baseHue = 210
      ribbons.forEach(r => {
        const hue = baseHue + r.hueOffset
        ctx.strokeStyle = hsla(hue, 75, 65, 0.18)
        ctx.lineWidth = r.thickness
        ctx.beginPath()
        for (let x = -10; x <= W + 10; x += 10) {
          const y = r.offsetY + Math.sin((x + r.phase + time * 1000 * r.speed) / r.wavelength * Math.PI * 2) * r.amplitude
          const finalY = y - mouseOffsetY * (r.offsetY / H) * 2 // Parallax
          if (x === -10) ctx.moveTo(x, finalY)
          else ctx.lineTo(x, finalY)
        }
        ctx.stroke()
      })

      // --- Draw Particles ---
      ctx.globalCompositeOperation = "source-over"
      particles.forEach(p => {
        p.y -= p.speed
        if (p.y < 0) {
          p.y = H
          p.x = Math.random() * W
        }
        
        const finalX = p.x + mouseOffsetX * p.z
        const finalY = p.y + mouseOffsetY * p.z
        
        let opacity = p.opacity
        if (p.isGlint) {
          opacity = Math.abs(Math.sin(time * 0.001 * p.twinkleSpeed + p.twinklePhase))
        }

        if (finalX > 0 && finalX < W && finalY > 0 && finalY < H) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", setSize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
