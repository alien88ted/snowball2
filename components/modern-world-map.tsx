"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Pin = {
  x: number // percentage
  y: number // percentage
  label: string
  delay: number
}

const PINS: Pin[] = [
  { x: 15, y: 35, label: "San Francisco", delay: 0 },
  { x: 22, y: 32, label: "New York", delay: 0.1 },
  { x: 48, y: 28, label: "London", delay: 0.2 },
  { x: 52, y: 45, label: "Lagos", delay: 0.3 },
  { x: 58, y: 35, label: "Dubai", delay: 0.4 },
  { x: 75, y: 32, label: "Tokyo", delay: 0.5 },
  { x: 72, y: 42, label: "Singapore", delay: 0.6 },
  { x: 82, y: 70, label: "Sydney", delay: 0.7 },
]

export function ModernWorldMap({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl border overflow-hidden",
        "shadow-lg shadow-primary/10",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        className,
      )}
      aria-hidden="true"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_70%)]" />

      {/* World Map SVG with better paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 750"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <g fill="url(#mapFill)" stroke="url(#mapGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* North America - More accurate shape */}
          <path d="M 100,280 L 105,270 L 115,265 L 125,260 L 135,255 L 145,252 L 155,250 L 165,245 L 175,242 L 185,240 L 195,245 L 205,250 L 215,260 L 220,270 L 225,280 L 230,290 L 232,300 L 232,310 L 230,320 L 228,330 L 225,340 L 220,348 L 215,355 L 210,360 L 205,365 L 200,368 L 190,370 L 180,372 L 170,373 L 160,372 L 150,370 L 140,365 L 130,360 L 120,350 L 110,340 L 105,330 L 102,320 L 100,310 L 100,300 Z" />

          {/* South America */}
          <path d="M 230,420 L 235,410 L 240,405 L 245,402 L 250,400 L 255,405 L 260,415 L 265,430 L 268,445 L 270,460 L 270,475 L 268,490 L 265,505 L 260,520 L 255,535 L 250,545 L 245,550 L 240,553 L 235,552 L 230,548 L 225,540 L 220,528 L 218,515 L 217,500 L 218,485 L 220,470 L 223,455 L 226,440 L 228,430 Z" />

          {/* Europe */}
          <path d="M 480,260 L 490,255 L 500,252 L 510,250 L 520,252 L 530,255 L 540,260 L 548,268 L 554,278 L 558,288 L 560,298 L 558,308 L 554,316 L 548,323 L 540,328 L 530,330 L 520,330 L 510,328 L 500,324 L 492,318 L 486,310 L 482,300 L 480,290 Z" />

          {/* Africa */}
          <path d="M 500,340 L 510,335 L 520,332 L 530,330 L 540,332 L 550,336 L 558,342 L 565,350 L 570,360 L 574,372 L 576,385 L 577,400 L 576,415 L 574,430 L 570,445 L 565,458 L 558,470 L 550,480 L 540,488 L 530,493 L 520,495 L 510,493 L 502,488 L 495,480 L 490,470 L 486,458 L 484,445 L 483,430 L 484,415 L 486,400 L 490,385 L 495,372 L 500,360 Z" />

          {/* Asia */}
          <path d="M 580,230 L 595,225 L 610,222 L 625,220 L 640,222 L 655,225 L 670,230 L 685,237 L 698,246 L 710,256 L 720,268 L 728,281 L 734,295 L 738,310 L 740,325 L 738,340 L 734,353 L 728,365 L 720,375 L 710,383 L 698,390 L 685,395 L 670,398 L 655,398 L 640,395 L 625,390 L 612,383 L 600,374 L 590,363 L 582,350 L 577,336 L 575,322 L 575,308 L 577,294 L 580,280 Z" />

          {/* Australia */}
          <path d="M 770,500 L 785,495 L 800,493 L 815,495 L 828,500 L 838,508 L 845,518 L 850,530 L 852,543 L 850,556 L 845,568 L 838,578 L 828,585 L 815,590 L 800,592 L 785,590 L 772,585 L 762,578 L 755,568 L 750,556 L 748,543 L 750,530 L 755,518 L 762,508 Z" />

          {/* Animated connection lines */}
          <g stroke="url(#mapGradient)" strokeWidth="1.5" fill="none" opacity="0.5">
            <path d={`M ${PINS[0].x * 10},${PINS[0].y * 10} L ${PINS[1].x * 10},${PINS[1].y * 10}`}>
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" repeatCount="indefinite" />
            </path>
            <path d={`M ${PINS[2].x * 10},${PINS[2].y * 10} L ${PINS[3].x * 10},${PINS[3].y * 10}`}>
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d={`M ${PINS[4].x * 10},${PINS[4].y * 10} L ${PINS[5].x * 10},${PINS[5].y * 10}`}>
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" begin="1s" repeatCount="indefinite" />
            </path>
            <path d={`M ${PINS[6].x * 10},${PINS[6].y * 10} L ${PINS[7].x * 10},${PINS[7].y * 10}`}>
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Subtle grid */}
          <g opacity="0.1" stroke="url(#mapGradient)">
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="750" strokeWidth="0.5" />
            ))}
          </g>
        </g>
      </svg>

      {/* Animated Pins */}
      <div className="absolute inset-0">
        {PINS.map((pin, i) => (
          <div
            key={`${pin.label}-${i}`}
            className="absolute transition-all duration-500"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translate(-50%, -50%)' : 'translate(-50%, -40%)',
              transitionDelay: `${pin.delay}s`
            }}
          >
            <div className="relative group cursor-pointer">
              {/* Pulsing ring */}
              <span
                className="absolute inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-primary/30 animate-ping"
                style={{ animationDuration: '2s' }}
              />

              {/* Outer glow */}
              <span className="absolute inline-flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-primary/50 blur-md" />

              {/* Pin dot */}
              <span className="relative inline-flex h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/50 ring-2 ring-white/20" />

              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1.5 bg-background/95 backdrop-blur-sm border rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {pin.label}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background/95" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/90 backdrop-blur-md px-4 py-2 text-xs text-muted-foreground shadow-lg">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-semibold">8 Global Locations</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="font-medium">Community Ownership Network</span>
        </div>
      </div>

      {/* Gentle vignetting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  )
}
