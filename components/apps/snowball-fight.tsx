"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Target } from "lucide-react"

export function SnowballFight() {
  const [score, setScore] = useState(0)
  const [targets, setTargets] = useState([
    { id: 1, x: 20, y: 30, hit: false },
    { id: 2, x: 60, y: 50, hit: false },
    { id: 3, x: 40, y: 70, hit: false },
  ])

  const hitTarget = (id: number) => {
    setTargets(targets.map((t) => (t.id === id ? { ...t, hit: true } : t)))
    setScore(score + 10)
    setTimeout(() => {
      setTargets(
        targets.map((t) =>
          t.id === id
            ? {
                ...t,
                hit: false,
                x: Math.random() * 80 + 10,
                y: Math.random() * 60 + 20,
              }
            : t,
        ),
      )
    }, 500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Snowball Fight</h2>
        <p className="text-muted-foreground">Click the targets to throw snowballs and score points!</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-4xl font-bold text-primary">{score}</p>
          </div>
          <Button onClick={() => setScore(0)} variant="outline">
            Reset Game
          </Button>
        </div>

        <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-100 to-white dark:from-blue-950 dark:to-slate-900 rounded-lg overflow-hidden border-2 border-border">
          {/* Snowfall effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Targets */}
          {targets.map((target) => (
            <button
              key={target.id}
              onClick={() => hitTarget(target.id)}
              className={`absolute transition-all duration-300 ${target.hit ? "scale-0" : "scale-100 hover:scale-110"}`}
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <Target className="w-16 h-16 text-red-500" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">⛄</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
