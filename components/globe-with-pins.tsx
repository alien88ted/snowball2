"use client"

import { cn } from "@/lib/utils"
import { ModernWorldMap } from "./modern-world-map"

export function GlobeWithPins({ className }: { className?: string }) {
  // Using the modern 2D animated world map instead of 3D globe
  // for better compatibility and faster loading
  return <ModernWorldMap className={className} />
}
