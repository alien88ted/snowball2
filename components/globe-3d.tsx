"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

// Dynamically import Globe to avoid SSR issues with Three.js
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-2xl border">
      <div className="text-muted-foreground">Loading globe...</div>
    </div>
  ),
})

type Location = {
  lat: number
  lng: number
  label: string
  size: number
  color: string
}

const LOCATIONS: Location[] = [
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", size: 0.3, color: "#3b82f6" },
  { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.3, color: "#3b82f6" },
  { lat: 51.5074, lng: -0.1278, label: "London", size: 0.3, color: "#3b82f6" },
  { lat: 6.5244, lng: 3.3792, label: "Lagos", size: 0.3, color: "#3b82f6" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", size: 0.3, color: "#3b82f6" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.3, color: "#3b82f6" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", size: 0.3, color: "#3b82f6" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.3, color: "#3b82f6" },
]

export function Globe3D({ className }: { className?: string }) {
  const globeEl = useRef<any>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!globeEl.current) return

    // Auto-rotate
    const globe = globeEl.current
    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.8
    globe.controls().enableZoom = false

    // Point camera at an angle that shows most locations
    globe.pointOfView({ lat: 20, lng: 30, altitude: 2 }, 0)
  }, [isClient])

  if (!isClient) {
    return (
      <div className={cn(
        "relative w-full aspect-[4/3] rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden",
        "shadow-lg shadow-primary/10",
        "flex items-center justify-center",
        className,
      )}>
        <div className="text-muted-foreground">Loading globe...</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl border overflow-hidden",
        "shadow-lg shadow-primary/10",
        "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
        className,
      )}
      aria-hidden="true"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_70%)] pointer-events-none z-10" />

      {/* Globe Container */}
      <div className="absolute inset-0">
        <Globe
          ref={globeEl}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl={null}
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={LOCATIONS}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointAltitude={0.02}
          pointRadius="size"
          pointColor="color"
          pointResolution={12}
          atmosphereColor="#60a5fa"
          atmosphereAltitude={0.15}
          showAtmosphere={true}
          backgroundColor="rgba(0,0,0,0)"
          width={undefined}
          height={undefined}
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-md px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-medium">Global community ownership network</span>
        </div>
      </div>
    </div>
  )
}
