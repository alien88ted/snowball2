"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Download } from "lucide-react"

export function SnowflakeBuilder() {
  const [complexity, setComplexity] = useState([6])
  const [size, setSize] = useState([200])
  const [rotation, setRotation] = useState([0])

  const generateSnowflake = () => {
    setRotation([Math.random() * 360])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2 font-serif">Design Your Snowflake</h2>
          <p className="text-sm text-muted-foreground">
            Adjust the parameters below to create your unique snowflake design
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Complexity</label>
            <Slider value={complexity} onValueChange={setComplexity} min={3} max={12} step={1} className="mb-2" />
            <p className="text-xs text-muted-foreground">{complexity[0]} branches</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
            <Slider value={size} onValueChange={setSize} min={100} max={300} step={10} className="mb-2" />
            <p className="text-xs text-muted-foreground">{size[0]}px</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Rotation</label>
            <Slider value={rotation} onValueChange={setRotation} min={0} max={360} step={1} className="mb-2" />
            <p className="text-xs text-muted-foreground">{rotation[0]}°</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={generateSnowflake} className="flex-1 bg-primary hover:bg-primary/90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Randomize
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <div
          className="relative"
          style={{
            width: size[0],
            height: size[0],
            transform: `rotate(${rotation[0]}deg)`,
            transition: "all 0.3s ease",
          }}
        >
          {Array.from({ length: complexity[0] }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 bg-blue-400"
              style={{
                height: size[0] / 2,
                transformOrigin: "top center",
                transform: `translate(-50%, 0) rotate(${(360 / complexity[0]) * i}deg)`,
              }}
            >
              <div className="absolute top-1/4 left-1/2 w-8 h-1 bg-blue-400 -translate-x-1/2 rotate-45" />
              <div className="absolute top-1/4 left-1/2 w-8 h-1 bg-blue-400 -translate-x-1/2 -rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-blue-400 -translate-x-1/2 rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-blue-400 -translate-x-1/2 -rotate-45" />
              <div className="absolute top-3/4 left-1/2 w-4 h-1 bg-blue-400 -translate-x-1/2 rotate-45" />
              <div className="absolute top-3/4 left-1/2 w-4 h-1 bg-blue-400 -translate-x-1/2 -rotate-45" />
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </Card>
    </div>
  )
}
