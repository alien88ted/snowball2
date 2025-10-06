"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"

export function SnowTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds])

  const reset = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Snow Timer</h2>
        <p className="text-muted-foreground">Pomodoro timer with relaxing snowfall animations</p>
      </div>

      <Card className="p-12 relative overflow-hidden">
        {/* Animated snowflakes */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-50 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center space-y-8">
          <div className="text-8xl font-bold text-foreground font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setIsActive(!isActive)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-32"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={reset} className="w-32 bg-transparent">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            {[15, 25, 45].map((min) => (
              <Button
                key={min}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMinutes(min)
                  setSeconds(0)
                  setIsActive(false)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                {min} min
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
