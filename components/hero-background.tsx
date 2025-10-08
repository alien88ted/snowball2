"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

// Elegant Aurora Strands — light, high-end, no doodles, no dark overlay
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const runningRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.8)
    const setSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setSize()

    let W = window.innerWidth
    let H = window.innerHeight
    const onResize = () => { setSize(); W = window.innerWidth; H = window.innerHeight }
    window.addEventListener('resize', onResize, { passive: true })

    const hsla = (h: number, s: number, l: number, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`

    // Parametric ribbons across the viewport
    type Ribbon = {
      amplitude: number
      wavelength: number
      phase: number
      speed: number
      offsetY: number
      thickness: number
      hueOffset: number
    }
    const baseHue = 210 // icy/snow vibe baseline
    const ribbons: Ribbon[] = Array.from({ length: 4 }, (_, i) => ({
      amplitude: 28 + Math.random() * 18,
      wavelength: 210 + Math.random() * 120,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0008,
      offsetY: (H * 0.35) + i * (H * 0.12) - H * 0.24,
      thickness: 1.2 + Math.random() * 0.8,
      hueOffset: -20 + i * 16,
    }))

    const drawRibbon = (t: number, r: Ribbon) => {
      const hue = (baseHue + r.hueOffset + (t * 4) % 360)
      const step = 8
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Primary stroke
      ctx.strokeStyle = hsla(hue, 75, 62, 0.16)
      ctx.lineWidth = r.thickness + 0.8
      ctx.beginPath()
      for (let x = -20; x <= W + 20; x += step) {
        const y = r.offsetY + Math.sin((x + r.phase + t * 1200 * r.speed) / r.wavelength * Math.PI * 2) * r.amplitude
        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Gloss highlight
      ctx.strokeStyle = hsla(hue + 20, 95, 80, 0.12)
      ctx.lineWidth = Math.max(0.6, r.thickness - 0.2)
      ctx.beginPath()
      for (let x = -20; x <= W + 20; x += step) {
        const y = r.offsetY + Math.sin((x + r.phase + t * 1200 * r.speed) / r.wavelength * Math.PI * 2) * r.amplitude
        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    let last = 0
    const render = (ts: number) => {
      if (!runningRef.current) return
      const dt = Math.min(33, ts - last || 16)
      last = ts
      const t = ts * 0.001

      // Clear fully — no dark overlay, no vignette
      ctx.clearRect(0, 0, W, H)

      // Soft central glow for subtle depth (very light)
      const cx = W / 2, cy = H / 2
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6)
      glow.addColorStop(0, hsla(baseHue + 10, 90, 95, 0.05))
      glow.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      // Draw ribbons
      ribbons.forEach(r => drawRibbon(t, r))

      rafRef.current = requestAnimationFrame(render)
    }

    const start = () => {
      if (runningRef.current || prefersReducedMotion) return
      runningRef.current = true
      rafRef.current = requestAnimationFrame(render)
    }
    const stop = () => {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }

    const onVisibility = () => { document.visibilityState === 'visible' ? start() : stop() }
    document.addEventListener('visibilitychange', onVisibility)
    start()

    // Reduced motion: draw one elegant static frame
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6)
      glow.addColorStop(0, hsla(baseHue + 10, 90, 95, 0.06))
      glow.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)
      ribbons.forEach(r => drawRibbon(0, r))
    }

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}