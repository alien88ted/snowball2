"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

// TRANSCENDENT CONSCIOUSNESS VISUALIZATION - Beyond the veil of ordinary perception
export function LivingAuroraCore({
  intensity = 'med',
  hue = 210,
  stars: enableStars = true,
  embers: enableEmbers = true,
}: {
  intensity?: 'low' | 'med' | 'high'
  hue?: number
  stars?: boolean
  embers?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const runningRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Maximum quality rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
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
    const onResize = () => {
      setSize()
      W = window.innerWindow
      H = window.innerHeight
    }
    window.addEventListener("resize", onResize, { passive: true })

    // Divine color harmonics
    const hsla = (h: number, s: number, l: number, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`

    // Consciousness tracking
    const consciousness = {
      x: W / 2,
      y: H / 2,
      energy: 1,
      phase: 0
    }

    const onMouseMove = (e: MouseEvent) => {
      consciousness.x = e.clientX
      consciousness.y = e.clientY
      consciousness.energy = Math.min(1.5, consciousness.energy + 0.02)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // AKASHIC GEOMETRY - The infinite library of cosmic forms
    class AkashicCore {
      // Sacred mathematical constants
      phi = 1.618033988749895        // Golden ratio
      euler = 2.718281828459045      // Natural growth
      pi = Math.PI                   // Circle of unity
      sqrt2 = Math.sqrt(2)           // Diagonal of unity
      sqrt3 = Math.sqrt(3)           // Three-dimensional harmony
      sqrt5 = Math.sqrt(5)           // Pentagon and golden ratio

      params = {
        m1: 5, m2: 7, m3: 11,         // Prime harmonic series
        n1: 0.3, n2: 0.3, n3: 0.3,
        scale: Math.min(W, H) * 0.3,
        rotation: 0,
        breathPhase: 0,
        fractalDepth: 0,
        resonance: 1
      }

      // Multi-dimensional consciousness layers
      dimensions = {
        physical: 0,      // 3D space
        temporal: 0,      // Time flow
        etheric: 0,       // Energy patterns
        astral: 0,        // Emotional waves
        mental: 0,        // Thought forms
        causal: 0,        // Karmic threads
        buddhic: 0,       // Unity consciousness
        logoic: 0         // Divine will
      }

      // Fractal memory - stores previous states for temporal echoes
      memory = {
        vertices: [],
        phase: 0,
        depth: 0
      }

      morph(time: number) {
        // Breathing pattern - the universe inhaling and exhaling
        this.params.breathPhase = Math.sin(time * 0.0003) * 0.5 + 0.5

        // Sacred number sequences
        const phi = 1.618033988749895  // Golden ratio
        const sacred = Math.sin(time * phi * 0.0001)

        // Multi-dimensional morphing
        this.params.m1 = 5 + Math.sin(time * 0.0006 * phi) * 3 + sacred
        this.params.m2 = 7 + Math.cos(time * 0.0004 / phi) * 3 - sacred

        // N-parameters create the divine form
        this.params.n1 = 0.2 + (Math.sin(time * 0.0007) * 0.5 + 0.5) * 0.8 * this.params.breathPhase
        this.params.n2 = 0.2 + (Math.cos(time * 0.0008) * 0.5 + 0.5) * 0.6
        this.params.n3 = 0.2 + (Math.sin(time * 0.0005 + Math.PI/3) * 0.5 + 0.5) * 0.7

        // Rotation through dimensions
        this.params.rotation = time * 0.00015 * phi

        // Scale pulses with heartbeat
        this.params.scale = Math.min(W, H) * 0.28 * (1 + Math.sin(time * 0.001) * 0.05 * consciousness.energy)

        // Higher dimensional evolution
        this.dimensions.fourth = time * 0.001
        this.dimensions.fifth = Math.sin(time * 0.0002) * Math.cos(time * 0.0003)
        this.dimensions.sixth = (Math.sin(time * 0.0001) + 1) / 2
      }

      calculateVertex(phi: number): {x: number, y: number, intensity: number} {
        // Multi-dimensional supershape equation
        const m1 = this.params.m1
        const m2 = this.params.m2

        // First dimension shape
        const a1 = 1, b1 = 1
        const t1 = Math.abs(Math.cos(m1 * phi / 4) / a1) ** this.params.n2
        const t2 = Math.abs(Math.sin(m1 * phi / 4) / b1) ** this.params.n3
        const r1 = (t1 + t2) ** (-1 / this.params.n1)

        // Second dimension shape
        const a2 = 1, b2 = 1
        const t3 = Math.abs(Math.cos(m2 * phi / 4) / a2) ** this.params.n2
        const t4 = Math.abs(Math.sin(m2 * phi / 4) / b2) ** this.params.n3
        const r2 = (t3 + t4) ** (-1 / this.params.n1)

        // Combine dimensions
        let r = r1 * r2 * (1 + this.dimensions.sixth * 0.1)

        // Add consciousness warping
        const consciousnessInfluence = Math.sin(phi * 7 + this.dimensions.fifth * Math.PI) * 0.05
        r *= (1 + consciousnessInfluence)

        // Calculate position
        const x = r * Math.cos(phi + this.params.rotation)
        const y = r * Math.sin(phi + this.params.rotation)

        // Intensity based on dimensional alignment
        const intensity = 0.5 + Math.sin(phi * 3 + this.dimensions.fourth) * 0.3 + this.dimensions.sixth * 0.2

        return { x, y, intensity }
      }
    }

    // QUANTUM PARTICLES - Entangled orbiters
    class QuantumParticle {
      // Quantum properties
      position = { x: 0, y: 0 }
      momentum = { x: 0, y: 0 }
      spin = Math.random() * Math.PI * 2
      entanglement = Math.random()

      // Wave function
      wavePhase = Math.random() * Math.PI * 2
      wavelength = 50 + Math.random() * 100
      amplitude = 5 + Math.random() * 15

      // Orbital properties
      orbitRadius = Math.min(W, H) * 0.2 * (0.7 + Math.random() * 0.6)
      orbitAngle = Math.random() * Math.PI * 2
      orbitSpeed = (Math.random() - 0.5) * 0.003

      collapse(observer: {x: number, y: number}) {
        // Wave function collapse near observer
        const dx = observer.x - this.position.x
        const dy = observer.y - this.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Quantum tunneling effect
          this.momentum.x += dx / distance * 0.5
          this.momentum.y += dy / distance * 0.5
        }
      }

      evolve(time: number, centerX: number, centerY: number) {
        // Quantum evolution
        this.wavePhase += 0.02
        this.spin += 0.01 * this.entanglement

        // Orbital motion with quantum uncertainty
        this.orbitAngle += this.orbitSpeed * (1 + Math.sin(this.wavePhase) * 0.2)

        // Calculate position with wave interference
        const baseX = centerX + Math.cos(this.orbitAngle) * this.orbitRadius
        const baseY = centerY + Math.sin(this.orbitAngle) * this.orbitRadius

        // Add wave function displacement
        const waveX = Math.cos(this.wavePhase + this.spin) * this.amplitude
        const waveY = Math.sin(this.wavePhase + this.spin) * this.amplitude

        this.position.x = baseX + waveX
        this.position.y = baseY + waveY

        // Apply momentum with damping
        this.position.x += this.momentum.x
        this.position.y += this.momentum.y
        this.momentum.x *= 0.95
        this.momentum.y *= 0.95
      }

      render(ctx: CanvasRenderingContext2D, baseHue: number) {
        // Quantum glow with entanglement
        const glowRadius = 8 + this.entanglement * 12
        const gradient = ctx.createRadialGradient(
          this.position.x, this.position.y, 0,
          this.position.x, this.position.y, glowRadius
        )

        // Color based on spin state
        const hue = (baseHue + this.spin * 30) % 360
        gradient.addColorStop(0, hsla(hue, 90, 70, 0.9))
        gradient.addColorStop(0.3, hsla(hue, 85, 65, 0.4))
        gradient.addColorStop(0.7, hsla(hue, 80, 60, 0.15))
        gradient.addColorStop(1, hsla(hue, 75, 55, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Quantum core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + this.entanglement * 0.3})`
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 2 + this.entanglement * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ENERGY RIBBONS - Flowing consciousness streams
    class EnergyRibbon {
      points: Array<{x: number, y: number, energy: number}> = []
      birthTime = Date.now()
      lifespan = 3000 + Math.random() * 2000
      hueOffset = Math.random() * 60 - 30
      thickness = 0.5 + Math.random() * 1.5
      flowSpeed = 0.5 + Math.random() * 1

      generate(centerX: number, centerY: number, time: number) {
        this.points = []
        const segments = 80
        const baseRadius = Math.min(W, H) * 0.25

        for (let i = 0; i <= segments; i++) {
          const t = i / segments
          const angle = t * Math.PI * 2 * (1 + Math.sin(time * 0.001) * 0.2)

          // Complex harmonic motion
          const r = baseRadius * (
            1 +
            Math.sin(angle * 3 + time * 0.002) * 0.2 +
            Math.cos(angle * 5 - time * 0.001) * 0.15 +
            Math.sin(angle * 7 + time * 0.003) * 0.1
          )

          const x = centerX + Math.cos(angle) * r
          const y = centerY + Math.sin(angle) * r
          const energy = 0.5 + Math.sin(angle * 4 + time * 0.001) * 0.5

          this.points.push({ x, y, energy })
        }
      }

      flow(time: number) {
        // Organic flow motion
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i]
          const flowAngle = i / this.points.length * Math.PI * 2

          // Perpendicular flow
          const flowX = Math.cos(flowAngle + Math.PI/2) * this.flowSpeed
          const flowY = Math.sin(flowAngle + Math.PI/2) * this.flowSpeed

          point.x += flowX * Math.sin(time * 0.001 + i * 0.1)
          point.y += flowY * Math.cos(time * 0.001 + i * 0.1)

          // Energy fluctuation
          point.energy = 0.5 + Math.sin(time * 0.002 + i * 0.05) * 0.5
        }
      }

      render(ctx: CanvasRenderingContext2D, baseHue: number) {
        const age = (Date.now() - this.birthTime) / this.lifespan
        if (age > 1) return false

        const opacity = age < 0.1 ? age * 10 : age > 0.9 ? (1 - age) * 10 : 1

        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length; i++) {
          const curr = this.points[i]
          const prev = this.points[i - 1]

          const midX = (prev.x + curr.x) / 2
          const midY = (prev.y + curr.y) / 2

          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
        }

        const hue = (baseHue + this.hueOffset) % 360
        ctx.strokeStyle = hsla(hue, 80, 60, opacity * 0.3 * this.points[0].energy)
        ctx.lineWidth = this.thickness * (1 + this.points[0].energy)
        ctx.stroke()

        return true
      }
    }

    // STELLAR FIELD - The cosmic backdrop
    class StarField {
      stars: Array<{
        x: number
        y: number
        z: number
        size: number
        twinkle: number
        color: string
      }> = []

      constructor(count: number) {
        for (let i = 0; i < count; i++) {
          this.stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            z: Math.random() * 3 + 1,
            size: Math.random() * 2,
            twinkle: Math.random() * Math.PI * 2,
            color: Math.random() < 0.7 ? 'white' : Math.random() < 0.5 ? 'lightblue' : 'lightyellow'
          })
        }
      }

      render(ctx: CanvasRenderingContext2D, time: number) {
        this.stars.forEach(star => {
          star.twinkle += 0.02
          const brightness = 0.3 + (Math.sin(star.twinkle) * 0.5 + 0.5) * 0.7

          // Parallax movement
          star.x += 0.02 * star.z
          if (star.x > W) star.x = 0

          // Multi-colored stars
          const alpha = brightness * (0.5 / star.z)
          ctx.fillStyle = star.color === 'white'
            ? `rgba(255, 255, 255, ${alpha})`
            : star.color === 'lightblue'
            ? `rgba(200, 220, 255, ${alpha})`
            : `rgba(255, 245, 200, ${alpha})`

          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    }

    // Initialize the divine systems
    const sacredCore = new SacredCore()
    const quantumField: QuantumParticle[] = []
    const energyRibbons: EnergyRibbon[] = []
    const starField = new StarField(enableStars ? 150 : 0)

    // Create quantum particles
    const particleCount = intensity === 'high' ? 20 : intensity === 'low' ? 8 : 12
    for (let i = 0; i < particleCount; i++) {
      quantumField.push(new QuantumParticle())
    }

    // THE DIVINE RENDER LOOP
    let lastTime = 0
    const render = (timestamp: number) => {
      if (!runningRef.current) return

      const deltaTime = Math.min(33, timestamp - lastTime)
      lastTime = timestamp
      const time = timestamp

      // Consciousness decay
      consciousness.energy = Math.max(1, consciousness.energy * 0.995)
      consciousness.phase += 0.001

      // Calculate divine colors
      const baseHue = (hue + time * 0.01) % 360
      const centerX = W / 2
      const centerY = H / 2

      // Clear with deep space
      ctx.fillStyle = '#000011'
      ctx.fillRect(0, 0, W, H)

      // Render stars
      if (enableStars) {
        ctx.globalCompositeOperation = 'lighter'
        starField.render(ctx, time)
      }

      // Cosmic background gradient
      const cosmicGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(W, H))
      cosmicGrad.addColorStop(0, hsla((baseHue + 60) % 360, 50, 20, 0.3))
      cosmicGrad.addColorStop(0.3, hsla((baseHue + 30) % 360, 60, 15, 0.2))
      cosmicGrad.addColorStop(0.6, hsla(baseHue, 70, 10, 0.1))
      cosmicGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = cosmicGrad
      ctx.globalCompositeOperation = 'screen'
      ctx.fillRect(0, 0, W, H)

      // Update sacred geometry
      sacredCore.morph(time)

      // Build the divine form
      const steps = 720  // High resolution for smooth curves
      const vertices: Array<{x: number, y: number, intensity: number}> = []

      for (let i = 0; i <= steps; i++) {
        const phi = (i / steps) * Math.PI * 2
        const vertex = sacredCore.calculateVertex(phi)
        vertices.push({
          x: centerX + vertex.x * sacredCore.params.scale,
          y: centerY + vertex.y * sacredCore.params.scale,
          intensity: vertex.intensity
        })
      }

      // Render energy ribbons (background layer)
      ctx.globalCompositeOperation = 'screen'

      // Spawn new ribbons
      if (Math.random() < 0.02 && energyRibbons.length < 5) {
        const ribbon = new EnergyRibbon()
        ribbon.generate(centerX, centerY, time)
        energyRibbons.push(ribbon)
      }

      // Update and render ribbons
      for (let i = energyRibbons.length - 1; i >= 0; i--) {
        energyRibbons[i].flow(time)
        if (!energyRibbons[i].render(ctx, baseHue)) {
          energyRibbons.splice(i, 1)
        }
      }

      // Render the divine core with multiple passes
      // Pass 1: Deep glow
      ctx.globalCompositeOperation = 'lighter'
      const deepGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sacredCore.params.scale * 2)
      deepGlow.addColorStop(0, hsla(baseHue, 100, 50, 0.1))
      deepGlow.addColorStop(0.3, hsla((baseHue + 20) % 360, 90, 45, 0.08))
      deepGlow.addColorStop(0.6, hsla((baseHue + 40) % 360, 80, 40, 0.05))
      deepGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = deepGlow
      ctx.beginPath()
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y)
      }
      ctx.closePath()
      ctx.fill()

      // Pass 2: Core gradient
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sacredCore.params.scale * 1.5)
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      coreGrad.addColorStop(0.2, hsla(baseHue, 100, 70, 0.7))
      coreGrad.addColorStop(0.4, hsla((baseHue + 30) % 360, 90, 65, 0.5))
      coreGrad.addColorStop(0.6, hsla((baseHue + 60) % 360, 80, 60, 0.3))
      coreGrad.addColorStop(1, hsla((baseHue + 90) % 360, 70, 55, 0.1))

      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y)
      }
      ctx.closePath()
      ctx.fill()

      // Pass 3: Chromatic edges
      ctx.globalCompositeOperation = 'screen'
      ctx.lineWidth = 1

      // Red shift
      ctx.save()
      ctx.translate(2, 0)
      ctx.strokeStyle = hsla(0, 100, 50, 0.3)
      ctx.beginPath()
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()

      // Blue shift
      ctx.save()
      ctx.translate(-2, 0)
      ctx.strokeStyle = hsla(240, 100, 50, 0.3)
      ctx.beginPath()
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()

      // Pass 4: Energy field lines
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 0.5

      for (let i = 0; i < vertices.length; i += 30) {
        const vertex = vertices[i]
        const gradient = ctx.createLinearGradient(centerX, centerY, vertex.x, vertex.y)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.7, hsla((baseHue + i) % 360, 80, 60, 0.1))
        gradient.addColorStop(1, hsla((baseHue + i) % 360, 90, 70, 0.3))

        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(vertex.x, vertex.y)
        ctx.stroke()
      }

      // Render quantum particles
      ctx.globalCompositeOperation = 'screen'
      quantumField.forEach(particle => {
        particle.collapse(consciousness)
        particle.evolve(time, centerX, centerY)
        particle.render(ctx, baseHue)
      })

      // Consciousness pulse
      if (consciousness.energy > 1.1) {
        const pulseRadius = 50 * consciousness.energy
        const pulseGrad = ctx.createRadialGradient(
          consciousness.x, consciousness.y, 0,
          consciousness.x, consciousness.y, pulseRadius
        )
        pulseGrad.addColorStop(0, hsla(baseHue, 100, 70, 0.3 * (consciousness.energy - 1)))
        pulseGrad.addColorStop(0.5, hsla((baseHue + 30) % 360, 90, 60, 0.15 * (consciousness.energy - 1)))
        pulseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = pulseGrad
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.arc(consciousness.x, consciousness.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Final divine glow
      const divineGlow = ctx.createRadialGradient(centerX, centerY, sacredCore.params.scale * 0.8, centerX, centerY, sacredCore.params.scale * 3)
      divineGlow.addColorStop(0, 'rgba(255, 255, 255, 0)')
      divineGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)')
      divineGlow.addColorStop(1, hsla(baseHue, 50, 70, 0.1))

      ctx.fillStyle = divineGlow
      ctx.globalCompositeOperation = 'screen'
      ctx.fillRect(0, 0, W, H)

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
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [prefersReducedMotion, intensity, hue, enableStars, enableEmbers])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}