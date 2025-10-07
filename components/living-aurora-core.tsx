"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

// A living, morphing supershape core with aurora-like shading and orbiters
// Performance-conscious: DPR-capped, pauses on hidden, respects reduced motion
export function LivingAuroraCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const runningRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // DPR-capped scaling for crispness without overdraw
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
    window.addEventListener("resize", onResize, { passive: true })

    // Supershape parameters animated over time
    const params = {
      m1: 5, m2: 7,
      n1: 0.3, n2: 0.3, n3: 0.3,
      baseScale: Math.min(W, H) * 0.28,
    }

    // Small orbiters that add a sense of life
    const orbiters = Array.from({ length: W >= 1024 ? 14 : 9 }, () => ({
      r: params.baseScale * (0.75 + Math.random() * 0.35),
      a: Math.random() * Math.PI * 2,
      av: (Math.random() - 0.5) * 0.004,
      s: 3 + Math.random() * 3,
    }))

    const supershapeR = (phi: number, m: number, n1: number, n2: number, n3: number) => {
      const a = 1, b = 1
      const t1 = Math.abs(Math.cos(m * phi / 4) / a) ** n2
      const t2 = Math.abs(Math.sin(m * phi / 4) / b) ** n3
      const r = (t1 + t2) ** (-1 / n1)
      return r
    }

    let last = 0
    const render = (ts: number) => {
      if (!runningRef.current) return
      const dt = Math.min(33, ts - last || 16)
      last = ts
      const t = ts * 0.001

      // Animate params gently for a living feel
      params.m1 = 5 + Math.sin(t * 0.6) * 2
      params.m2 = 7 + Math.cos(t * 0.4) * 2
      params.n1 = 0.25 + (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.6
      params.n2 = 0.2 + (Math.cos(t * 0.8) * 0.5 + 0.5) * 0.5
      params.n3 = 0.2 + (Math.sin(t * 0.5 + 1.2) * 0.5 + 0.5) * 0.5

      const cx = W / 2
      const cy = H / 2
      const rot = t * 0.2
      const scale = params.baseScale * (1 + Math.sin(t * 0.9) * 0.03)

      ctx.clearRect(0, 0, W, H)

      // Aurora backdrop gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7)
      bgGrad.addColorStop(0, "rgba(139, 92, 246, 0.06)")
      bgGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.05)")
      bgGrad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // Build supershape path
      const steps = W >= 1024 ? 560 : 380
      const pts: Array<{x: number, y: number}> = []
      for (let i = 0; i <= steps; i++) {
        const phi = (i / steps) * Math.PI * 2
        const r1 = supershapeR(phi, params.m1, params.n1, params.n2, params.n3)
        const r2 = supershapeR(phi, params.m2, params.n1, params.n2, params.n3)
        const r = r1 * r2
        const x = r * Math.cos(phi)
        const y = r * Math.sin(phi)
        // rotate & scale
        const xr = x * Math.cos(rot) - y * Math.sin(rot)
        const yr = x * Math.sin(rot) + y * Math.cos(rot)
        pts.push({ x: cx + xr * scale, y: cy + yr * scale })
      }

      // Fill with multi-stop gradient for depth
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.4)
      coreGrad.addColorStop(0, "rgba(255,255,255,0.85)")
      coreGrad.addColorStop(0.25, "rgba(236,72,153,0.25)")
      coreGrad.addColorStop(0.55, "rgba(59,130,246,0.22)")
      coreGrad.addColorStop(1, "rgba(139,92,246,0.18)")

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2
        const yc = (pts[i].y + pts[i + 1].y) / 2
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc)
      }
      ctx.closePath()
      ctx.fillStyle = coreGrad
      ctx.globalCompositeOperation = "lighter"
      ctx.fill()

      // Specular sweep
      const sweepA = (t * 0.8) % (Math.PI * 2)
      const sx = cx + Math.cos(sweepA) * scale * 0.3
      const sy = cy + Math.sin(sweepA) * scale * 0.3
      const spec = ctx.createRadialGradient(sx, sy, 0, sx, sy, scale * 0.9)
      spec.addColorStop(0, "rgba(255,255,255,0.22)")
      spec.addColorStop(1, "rgba(255,255,255,0)")
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = spec
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2
        const yc = (pts[i].y + pts[i + 1].y) / 2
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc)
      }
      ctx.closePath()
      ctx.fill()

      // Soft inner shadow to emphasize shape edge
      ctx.globalCompositeOperation = "multiply"
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.1)
      inner.addColorStop(0, "rgba(0,0,0,0)")
      inner.addColorStop(1, "rgba(0,0,0,0.05)")
      ctx.fillStyle = inner
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2
        const yc = (pts[i].y + pts[i + 1].y) / 2
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc)
      }
      ctx.closePath()
      ctx.fill()

      // Orbiters
      ctx.globalCompositeOperation = "lighter"
      orbiters.forEach(o => {
        o.a += o.av
        const ox = cx + Math.cos(o.a) * o.r
        const oy = cy + Math.sin(o.a) * o.r
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.s * 8)
        g.addColorStop(0, "rgba(255,255,255,0.8)")
        g.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(ox, oy, o.s, 0, Math.PI * 2); ctx.fill()
      })

      rafRef.current = requestAnimationFrame(render)
    }

    const start = () => {
      if (runningRef.current) return
      runningRef.current = true
      rafRef.current = requestAnimationFrame(render)
    }
    const stop = () => {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }

    const onVisibility = () => { document.visibilityState === "visible" ? start() : stop() }
    document.addEventListener("visibilitychange", onVisibility)
    start()

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("resize", onResize)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}


