"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hero2Background } from "@/components/hero2-background"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Hero2Page() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left) / width)
    mouseY.set((e.clientY - top) / height)
  }

  // Smooth the mouse values
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 })

  // Create parallax transforms. The values are inverted to move away from the mouse.
  const transformTitle = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y],) => `translate3d(${(x - 0.5) * -60}px, ${(y - 0.5) * -60}px, 0) perspective(800px) rotateY(${(x - 0.5) * -15}deg) rotateX(${(y - 0.5) * 15}deg)`
  )
  const transformText = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y],) => `translate3d(${(x - 0.5) * -40}px, ${(y - 0.5) * -40}px, 0) perspective(800px) rotateY(${(x - 0.5) * -10}deg) rotateX(${(y - 0.5) * 10}deg)`
  )
  const transformButtons = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y],) => `translate3d(${(x - 0.5) * -50}px, ${(y - 0.5) * -50}px, 0) perspective(800px) rotateY(${(x - 0.5) * -12}deg) rotateX(${(y - 0.5) * 12}deg)`
  )
  const transformPanel = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y],) => `translate3d(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px, 0) perspective(800px) rotateY(${(x - 0.5) * -5}deg) rotateX(${(y - 0.5) * 5}deg)`
  )
  const spotlightX = useTransform(smoothMouseX, [0, 1], ["20%", "80%"])
  const spotlightY = useTransform(smoothMouseY, [0, 1], ["20%", "80%"])

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-background overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <Hero2Background />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 md:pt-32 pb-20 h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-12 text-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
            className="max-w-4xl flex flex-col items-center gap-6" 
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              variants={FADE_IN_VARIANTS}
              style={{ transform: transformTitle, textShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight"
            >
              <span className="block">Snow Aura.</span>
              <span className="block mt-2">Own Together.</span>
            </motion.h1>

            <motion.p
              variants={FADE_IN_VARIANTS}
              style={{ transform: transformText }}
              className="max-w-2xl text-muted-foreground text-base sm:text-lg md:text-xl"
            >
              A living, low-lag aurora crafted for readability and elegance. Real-time depth without distraction.
            </motion.p>
            
            <motion.div
              variants={FADE_IN_VARIANTS}
              style={{ transform: transformButtons }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/explorer/create">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-black text-white hover:bg-gray-900 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
                >
                  Start Building
                </Button>
              </Link>
              <Link href="/explorer">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 border-2 border-border/60 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:border-border hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-black/10"
                >
                  View Examples
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={FADE_IN_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ transform: transformPanel, transformStyle: "preserve-3d" }}
            className="mx-auto max-w-3xl rounded-3xl border-2 border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20"
          >
            <motion.div 
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: useTransform(
                  [spotlightX, spotlightY],
                  ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%)`
                )
              }}
            />
            <div className="relative p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-3 text-white">Design Notes</h2>
              <ul className="list-disc pl-5 text-sm text-blue-100/80 space-y-1.5 text-left">
                <li>Dynamic 3D parallax scene powered by Framer Motion.</li>
                <li>Content layers react to mouse movement for an immersive feel.</li>
                <li>Enhanced glassmorphism with reactive spotlight effect.</li>
                <li>Built on the "Celestial Weave" canvas background.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


