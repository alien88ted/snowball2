"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

// LIVING AURORA CORE - Clean, elegant, divine visualization
export function LivingAuroraCore({
  intensity = 'med',
  hue = 210,
  stars: enableStars = false,
  embers: enableEmbers = false,
  energyLines = false,
  interact = false,
  background = 'none',
  glints = true,
}: {
  intensity?: 'low' | 'med' | 'high'
  hue?: number
  stars?: boolean
  embers?: boolean
  energyLines?: boolean
  interact?: boolean
  background?: 'none' | 'light'
  glints?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const runningRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // High quality rendering with capped DPR for perf
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    // Offscreen for volumetric curtains
    const layerCanvas = document.createElement('canvas')
    const lctx = layerCanvas.getContext('2d')
    if (!lctx) return

    // Tiny noise canvas for gentle grain (debands gradients)
    const noiseCanvas = document.createElement('canvas')
    noiseCanvas.width = 64; noiseCanvas.height = 64
    const nctx = noiseCanvas.getContext('2d')
    if (!nctx) return
    nctx.clearRect(0, 0, 64, 64)
    const noiseDensity = 0.06
    for (let i = 0; i < 64 * 64 * noiseDensity; i++) {
      const x = Math.floor(Math.random() * 64)
      const y = Math.floor(Math.random() * 64)
      const a = 12 + Math.floor(Math.random() * 12) // very faint
      nctx.fillStyle = `rgba(255,255,255,${a / 255})`
      nctx.fillRect(x, y, 1, 1)
    }
    const noisePattern = ctx.createPattern(noiseCanvas, 'repeat')

    const setSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      layerCanvas.width = w
      layerCanvas.height = h
    }
    setSize()

    let W = window.innerWidth
    let H = window.innerHeight
    const onResize = () => {
      setSize()
      W = window.innerWidth
      H = window.innerHeight
    }
    window.addEventListener("resize", onResize, { passive: true })

    // Color helper
    const hsla = (h: number, s: number, l: number, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`

    // Mouse tracking for interactivity
    const mouse = {
      x: W / 2,
      y: H / 2,
      energy: 1
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.energy = Math.min(1.5, mouse.energy + 0.01)
    }
    if (interact) window.addEventListener('mousemove', onMouseMove, { passive: true })

    // AURORA CORE - Sacred geometry with golden ratio
    class AuroraCore {
      phi = 1.618033988749895  // Golden ratio

      params = {
        m1: 5,
        m2: 7,
        n1: 0.3,
        n2: 0.3,
        n3: 0.3,
        scale: Math.min(W, H) * 0.25,
        rotation: 0,
        breathe: 0
      }

      morph(time: number) {
        // Gentle breathing
        this.params.breathe = Math.sin(time * 0.00022) * 0.5 + 0.5

        // Smooth morphing
        const t = time * 0.0001
        this.params.m1 = 5 + Math.sin(t * this.phi) * 2
        this.params.m2 = 7 + Math.cos(t / this.phi) * 2

        this.params.n1 = 0.3 + (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.5
        this.params.n2 = 0.3 + (Math.cos(t * 0.8) * 0.5 + 0.5) * 0.4
        this.params.n3 = 0.3 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 0.4

        this.params.rotation = time * 0.00008
        this.params.scale = Math.min(W, H) * 0.22 * (1 + Math.sin(time * 0.0007) * 0.035 * mouse.energy)
      }

      calculateVertex(phi: number): {x: number, y: number} {
        const m1 = this.params.m1
        const m2 = this.params.m2

        // Supershape formula
        const t1 = Math.abs(Math.cos(m1 * phi / 4)) ** this.params.n2
        const t2 = Math.abs(Math.sin(m1 * phi / 4)) ** this.params.n3
        const r1 = (t1 + t2) ** (-1 / this.params.n1)

        const t3 = Math.abs(Math.cos(m2 * phi / 4)) ** this.params.n2
        const t4 = Math.abs(Math.sin(m2 * phi / 4)) ** this.params.n3
        const r2 = (t3 + t4) ** (-1 / this.params.n1)

        let r = r1 * r2 * (1 + this.params.breathe * 0.1)

        const x = r * Math.cos(phi + this.params.rotation)
        const y = r * Math.sin(phi + this.params.rotation)

        return { x, y }
      }
    }

    // FLOWING PARTICLES
    class FlowParticle {
      x = 0
      y = 0
      vx = 0
      vy = 0
      angle = Math.random() * Math.PI * 2
      radius = Math.min(W, H) * 0.2 * (0.8 + Math.random() * 0.4)
      speed = (Math.random() - 0.5) * 0.002
      size = 2 + Math.random() * 3
      hueOffset = Math.random() * 30 - 15

      update(time: number, centerX: number, centerY: number) {
        this.angle += this.speed

        const targetX = centerX + Math.cos(this.angle) * this.radius
        const targetY = centerY + Math.sin(this.angle) * this.radius

        // Add some wave motion
        const waveX = Math.cos(time * 0.001 + this.angle * 3) * 10
        const waveY = Math.sin(time * 0.001 + this.angle * 3) * 10

        this.x += (targetX + waveX - this.x) * 0.05
        this.y += (targetY + waveY - this.y) * 0.05
      }

      render(ctx: CanvasRenderingContext2D, baseHue: number) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        )

        const hue = (baseHue + this.hueOffset) % 360
        gradient.addColorStop(0, hsla(hue, 80, 70, 0.8))
        gradient.addColorStop(0.5, hsla(hue, 70, 60, 0.3))
        gradient.addColorStop(1, hsla(hue, 60, 50, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // STARS
    class Star {
      x = Math.random() * W
      y = Math.random() * H
      size = Math.random() * 1.5
      twinkle = Math.random() * Math.PI * 2
      speed = 0.01 + Math.random() * 0.02

      update() {
        this.twinkle += this.speed
      }

      render(ctx: CanvasRenderingContext2D) {
        const brightness = 0.3 + (Math.sin(this.twinkle) * 0.5 + 0.5) * 0.5
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize systems
    const auroraCore = new AuroraCore()
    const particles: FlowParticle[] = []
    const stars: Star[] = []

    // Create particles
    if (enableEmbers) {
      const particleCount = intensity === 'high' ? 15 : intensity === 'low' ? 5 : 10
      for (let i = 0; i < particleCount; i++) {
        particles.push(new FlowParticle())
      }
    }

    // Create stars
    if (enableStars) {
      for (let i = 0; i < 100; i++) {
        stars.push(new Star())
      }
    }

    // Device/viewport aware complexity
    const minSide = Math.min(W, H)
    const cores = (navigator as any).hardwareConcurrency || 4
    const lowPower = cores <= 4 || minSide < 900

    // Volumetric curtain params
    type Curtain = { angle: number; radius: number; hueOffset: number; speed: number; squish: number }
    const baseCurtains = intensity === 'high' ? 6 : intensity === 'low' ? 3 : 5
    const curtainCount = lowPower ? Math.max(2, Math.floor(baseCurtains * 0.6)) : baseCurtains
    const curtains: Curtain[] = Array.from({ length: curtainCount }, (_, i) => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.min(W, H) * (0.12 + Math.random() * 0.2),
      hueOffset: -20 + i * (40 / curtainCount),
      speed: 0.06 + Math.random() * 0.12,
      squish: 0.5 + Math.random() * 0.18,
    }))

    // Bokeh glints inside the core for premium sparkle (subtle)
    type Glint = { baseAngle: number; radius: number; size: number; hueOffset: number; speed: number }
    const glintBase = intensity === 'high' ? 12 : intensity === 'low' ? 5 : 8
    const glintCount = lowPower ? Math.max(3, Math.floor(glintBase * 0.6)) : glintBase
    const glintList: Glint[] = Array.from({ length: glints ? glintCount : 0 }, (_, i) => ({
      baseAngle: Math.random() * Math.PI * 2,
      radius: Math.min(W, H) * (0.06 + Math.random() * 0.14),
      size: 8 + Math.random() * 16,
      hueOffset: -12 + i * (24 / Math.max(1, glintCount)),
      speed: 0.05 + Math.random() * 0.12,
    }))

    // RENDER LOOP
    let lastTime = 0
    let accumulator = 0
    let heavyToggle = false
    let avgDt = 16
    let degrade = false
    const render = (timestamp: number) => {
      if (!runningRef.current) return

      const deltaTime = Math.min(33, timestamp - lastTime)
      lastTime = timestamp
      accumulator += deltaTime
      if (accumulator < 16) { rafRef.current = requestAnimationFrame(render); return }
      accumulator = 0
      // Dynamic degrade based on smoothed frame time
      avgDt = avgDt * 0.9 + deltaTime * 0.1
      degrade = avgDt > 22
      const time = timestamp

      // Mouse energy decay
      mouse.energy = Math.max(1, mouse.energy * 0.995)

      const baseHue = (hue + time * 0.01) % 360
      const centerX = W / 2
      const centerY = H / 2

      // Transparent canvas; optional very light background if requested
      ctx.clearRect(0, 0, W, H)
      if (background === 'light') {
        const bg = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(W, H) * 0.8)
        bg.addColorStop(0, 'rgba(255,255,255,0.06)')
        bg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)
      }

      // Render stars
      if (enableStars) {
        stars.forEach(star => {
          star.update()
          star.render(ctx)
        })
      }

      // Update aurora
      auroraCore.morph(time)

      // Build aurora shape (quality-aware, runtime-adaptive)
      const steps = (degrade || lowPower)
        ? (minSide >= 1024 ? 200 : 160)
        : (minSide >= 1440 ? 300 : minSide >= 1024 ? 240 : 200)
      const vertices: Array<{x: number, y: number}> = []

      for (let i = 0; i <= steps; i++) {
        const phi = (i / steps) * Math.PI * 2
        const vertex = auroraCore.calculateVertex(phi)
        vertices.push({
          x: centerX + vertex.x * auroraCore.params.scale,
          y: centerY + vertex.y * auroraCore.params.scale
        })
      }

      // Draw aurora with multiple layers (object only)
      // Layer 1: Soft volume glow
      ctx.globalCompositeOperation = 'screen'
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, auroraCore.params.scale * 2
      )
      glowGradient.addColorStop(0, hsla(baseHue, 70, 50, 0.15))
      glowGradient.addColorStop(0.4, hsla((baseHue + 30) % 360, 60, 45, 0.08))
      glowGradient.addColorStop(0.7, hsla((baseHue + 60) % 360, 50, 40, 0.04))
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      // Build reusable shape path
      const shapePath = new Path2D()
      shapePath.moveTo(vertices[0].x, vertices[0].y)
      for (const vertex of vertices) shapePath.lineTo(vertex.x, vertex.y)
      shapePath.closePath()

      ctx.fillStyle = glowGradient
      ctx.fill(shapePath)

      // Back parallax layer (very faint, expanded shape)
      {
        const expand = 1.18
        const backVerts: Array<{x:number,y:number}> = vertices.map(v => {
          const dx = v.x - centerX, dy = v.y - centerY
          return { x: centerX + dx * expand, y: centerY + dy * expand }
        })
        const backGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, auroraCore.params.scale * 1.9)
        backGrad.addColorStop(0, hsla((baseHue + 12) % 360, 85, 72, 0.08))
        backGrad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.save()
        ctx.beginPath(); ctx.moveTo(backVerts[0].x, backVerts[0].y)
        for (const v of backVerts) ctx.lineTo(v.x, v.y)
        ctx.closePath(); ctx.clip()
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = backGrad
        ctx.fillRect(0, 0, W, H)
        ctx.restore()
      }

      // Layer 2: Core shape (color depth)
      ctx.globalCompositeOperation = 'lighter'
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, auroraCore.params.scale * 1.5
      )
      coreGradient.addColorStop(0, hsla(baseHue, 100, 70, 0.3))
      coreGradient.addColorStop(0.3, hsla((baseHue + 20) % 360, 90, 65, 0.2))
      coreGradient.addColorStop(0.6, hsla((baseHue + 40) % 360, 80, 60, 0.1))
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = coreGradient
      ctx.fill(shapePath)

      // Layer 3: Specular sweeps (clipped to core) — softened
      const drawSpecular = (angle: number, strength: number) => {
        const sx = centerX + Math.cos(angle) * auroraCore.params.scale * 0.35
        const sy = centerY + Math.sin(angle) * auroraCore.params.scale * 0.35
        const spec = ctx.createRadialGradient(sx, sy, 0, sx, sy, auroraCore.params.scale * 1.05)
        spec.addColorStop(0, 'rgba(255,255,255,' + strength.toFixed(2) + ')')
        spec.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.save(); ctx.clip(shapePath)
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = spec
        ctx.fillRect(0, 0, W, H)
        ctx.restore()
      }
      drawSpecular(time * 0.0012, 0.10)
      drawSpecular(-time * 0.0009 + 1.2, 0.08)

      // Layer 4: Soft inner shadow only (no rim stroke to avoid "scan" vibes)
      ctx.globalCompositeOperation = 'multiply'
      const inner = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, auroraCore.params.scale * 1.2)
      inner.addColorStop(0, 'rgba(0,0,0,0)')
      inner.addColorStop(1, 'rgba(0,0,0,0.06)')
      ctx.fillStyle = inner
      ctx.fill(shapePath)

      // Layer 5: Volumetric curtains — blurred ellipses composited in screen mode and clipped to the core
      lctx.clearRect(0, 0, W, H)
      const baseBlur = (degrade || lowPower)
        ? Math.round(Math.max(10, Math.min(18, Math.max(W, H) / 120)))
        : Math.round(Math.max(12, Math.min(22, Math.max(W, H) / 90)))
      if (!heavyToggle) {
        lctx.clearRect(0, 0, W, H)
        lctx.filter = `blur(${baseBlur}px) saturate(120%)`
        lctx.globalCompositeOperation = 'lighter'
        const curtainsToDraw = (degrade || lowPower) ? Math.max(2, Math.floor(curtains.length * 0.7)) : curtains.length
        for (let i = 0; i < curtainsToDraw; i++) {
          const c = curtains[i]
          const ang = c.angle + time * 0.001 * c.speed
          const px = centerX + Math.cos(ang) * c.radius
          const py = centerY + Math.sin(ang) * c.radius
          const curtScale = auroraCore.params.scale * (0.9 + Math.sin(time * 0.0007 + i) * 0.05)
          lctx.save()
          lctx.translate(px, py)
          lctx.scale(1, c.squish)
          const grad = lctx.createRadialGradient(0, 0, 0, 0, 0, curtScale)
          const h = (baseHue + c.hueOffset + i * 6) % 360
          grad.addColorStop(0, hsla(h, 90, 75, 0.18))
          grad.addColorStop(0.6, hsla((h + 20) % 360, 85, 68, 0.10))
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          lctx.fillStyle = grad
          lctx.beginPath(); lctx.arc(0, 0, curtScale, 0, Math.PI * 2); lctx.fill()
          lctx.restore()
        }
      }

      // Glints pass (more focused blur)
      if (!heavyToggle && glints && glintList.length) {
        lctx.filter = `blur(${Math.max(8, baseBlur - 8)}px) saturate(110%)`
        const glintsToDraw = (degrade || lowPower) ? Math.max(2, Math.floor(glintList.length * 0.6)) : glintList.length
        for (let i = 0; i < glintsToDraw; i++) {
          const g = glintList[i]
          const ang = g.baseAngle + time * 0.001 * g.speed
          const px = centerX + Math.cos(ang) * g.radius
          const py = centerY + Math.sin(ang) * g.radius
          const h = (baseHue + g.hueOffset + i * 3) % 360
          const grad = lctx.createRadialGradient(px, py, 0, px, py, g.size)
          grad.addColorStop(0, hsla(h, 95, 88, 0.20))
          grad.addColorStop(0.6, hsla((h + 10) % 360, 90, 82, 0.10))
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          lctx.fillStyle = grad
          lctx.beginPath(); lctx.arc(px, py, g.size, 0, Math.PI * 2); lctx.fill()
        }
      }
      // Clip curtains inside the core shape and draw
      ctx.save(); ctx.clip(shapePath)
      ctx.globalCompositeOperation = 'screen'
      ctx.drawImage(layerCanvas, 0, 0)
      ctx.restore()

      // Snow dust inside the core (very subtle, adaptive)
      if (!heavyToggle) {
        const flakeCount = (degrade || lowPower) ? 18 : 28
        ctx.save(); ctx.clip(shapePath)
        ctx.globalCompositeOperation = 'screen'
        for (let i = 0; i < flakeCount; i++) {
          const fx = centerX + Math.cos((time * 0.0003 + i) * 3.1) * (auroraCore.params.scale * 0.7) * (0.2 + (i % 7) * 0.03)
          const fy = centerY + Math.sin((time * 0.00025 + i * 0.7)) * (auroraCore.params.scale * 0.55) * (0.2 + (i % 5) * 0.04)
          const fr = 0.7 + (i % 5) * 0.2
          const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr * 6)
          g.addColorStop(0, 'rgba(255,255,255,0.14)')
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.beginPath(); ctx.arc(fx, fy, fr * 2, 0, Math.PI * 2); ctx.fill()
        }
        ctx.restore()
      }

      // Optional energy lines (off by default)
      if (energyLines) {
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < vertices.length; i += 20) {
          const vertex = vertices[i]
          const lineGrad = ctx.createLinearGradient(centerX, centerY, vertex.x, vertex.y)
          lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
          lineGrad.addColorStop(0.7, hsla((baseHue + i) % 360, 70, 60, 0.05))
          lineGrad.addColorStop(1, hsla((baseHue + i) % 360, 80, 70, 0.1))
          ctx.strokeStyle = lineGrad
          ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(vertex.x, vertex.y); ctx.stroke()
        }
      }

      // Render embers (disabled by default)
      if (enableEmbers) {
        ctx.globalCompositeOperation = 'screen'
        particles.forEach(particle => {
          particle.update(time, centerX, centerY)
          particle.render(ctx, baseHue)
        })
      }

      // Mouse interaction pulse
      if (interact && mouse.energy > 1.1) {
        const pulseRadius = 30 * mouse.energy
        const pulseGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, pulseRadius
        )
        pulseGrad.addColorStop(0, hsla(baseHue, 100, 70, 0.2 * (mouse.energy - 1)))
        pulseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = pulseGrad
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Very subtle grain overlay to avoid banding (reusing pattern, every other frame)
      if (!heavyToggle && noisePattern) {
        ctx.save()
        ctx.globalAlpha = 0.025
        ctx.globalCompositeOperation = 'overlay'
        ctx.fillStyle = noisePattern
        ctx.fillRect(0, 0, W, H)
        ctx.restore()
      }

      heavyToggle = !heavyToggle

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

    const onVisibility = () => {
      document.visibilityState === "visible" ? start() : stop()
    }
    document.addEventListener("visibilitychange", onVisibility)
    start()

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("resize", onResize)
      if (interact) window.removeEventListener('mousemove', onMouseMove)
    }
  }, [prefersReducedMotion, intensity, hue, enableStars, enableEmbers, energyLines, interact, background])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}