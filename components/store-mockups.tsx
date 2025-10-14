"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Users, Coffee, Zap, Sparkles, TrendingUp } from "lucide-react"

interface StoreMockupsProps {
  projectName: string
  projectSymbol: string
}

interface ConceptDesign {
  id: string
  name: string
  description: string
  features: string[]
  style: string
  votePercentage?: number
  color: string
  icon: string
}

const conceptDesigns: ConceptDesign[] = [
  {
    id: "concept-1",
    name: "Modern Minimalist",
    description: "Clean white aesthetic with modern LED accents",
    features: ["LED lighting", "Minimalist design", "Digital displays", "Open layout"],
    style: "Modern",
    votePercentage: 38,
    color: "from-blue-500/10 to-sky-500/10",
    icon: "✦"
  },
  {
    id: "concept-2",
    name: "Natural Oasis",
    description: "Natural elements with greenery",
    features: ["Plant walls", "Natural wood", "Natural light", "Organic shapes"],
    style: "Natural",
    votePercentage: 27,
    color: "from-green-500/10 to-emerald-500/10",
    icon: "🌿"
  },
  {
    id: "concept-3",
    name: "Tech Forward",
    description: "Tech-forward with smart features",
    features: ["Digital menus", "Smart systems", "Modern tech", "Interactive elements"],
    style: "Tech",
    votePercentage: 22,
    color: "from-purple-500/10 to-pink-500/10",
    icon: "⚡"
  },
  {
    id: "concept-4",
    name: "Cultural Heritage",
    description: "Lebanese heritage meets contemporary design",
    features: ["Local patterns", "Cultural elements", "Warm tones", "Traditional touches"],
    style: "Cultural",
    votePercentage: 13,
    color: "from-orange-500/10 to-amber-500/10",
    icon: "✨"
  }
]

export function StoreMockups({ projectName, projectSymbol }: StoreMockupsProps) {
  const [mounted, setMounted] = useState(false)
  const [activeConceptIndex, setActiveConceptIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextConcept = useCallback(() => {
    setActiveConceptIndex((prev) => (prev + 1) % conceptDesigns.length)
  }, [])

  const previousConcept = useCallback(() => {
    setActiveConceptIndex((prev) => (prev - 1 + conceptDesigns.length) % conceptDesigns.length)
  }, [])

  if (!mounted) return null

  const activeConcept = conceptDesigns[activeConceptIndex]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold font-serif mb-2">Store Design Concepts</h3>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Four design concepts for our community-owned coffee shop in Beirut. Vote on your favorite after milestone #2.
          </p>
        </div>

        {/* Community Voting Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-blue-50/30 border border-blue-200/40">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900/80 mb-1">
                Community Designed
              </p>
              <p className="text-xs text-blue-800/60 leading-relaxed">
                Token holders will vote on the final design after funding milestone #2 ($250K). Current preferences shown below.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">1,247 community votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Concept Display - Clean Branding */}
      <div className="space-y-6">
        {/* Hero Display */}
        <div className="relative group">
          {/* Corner Decorations */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
          <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
          <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />

          <div className="relative overflow-hidden rounded-2xl border-2 border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-white via-gray-50/50 to-white">
            {/* Navigation Arrows */}
            <button
              onClick={previousConcept}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-lg group/btn"
            >
              <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextConcept}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-lg group/btn"
            >
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>

            {/* Concept Label */}
            <div className="absolute top-4 left-4 z-20">
              <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40">
                <span className="text-sm font-semibold">{activeConcept.name}</span>
              </div>
            </div>

            {/* Main Concept Display - Pure Branding */}
            <div className="relative aspect-[16/10] w-full flex items-center justify-center overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}
              />

              {/* Gradient background based on concept */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeConcept.color}`} />

              {/* Concept Icon and Name */}
              <div className="relative z-10 flex flex-col items-center justify-center p-12">
                <div className="text-9xl mb-6 animate-float">{activeConcept.icon}</div>
                <div className="text-5xl font-serif font-bold text-center mb-4 text-foreground">
                  {activeConcept.name}
                </div>
                <div className="text-xl text-muted-foreground text-center mb-8 max-w-md">
                  {activeConcept.description}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-border/40">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">{activeConcept.style} Style</span>
                </div>
              </div>

              {/* Voting Overlay */}
              {activeConcept.votePercentage && (
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Community Preference</span>
                      <span className="text-lg font-bold text-primary">{activeConcept.votePercentage}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
                        style={{ width: `${activeConcept.votePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {conceptDesigns.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptIndex(index)}
              className={`relative group overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                index === activeConceptIndex
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border/40 hover:border-primary/50"
              }`}
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${concept.color} flex items-center justify-center`}>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 text-4xl group-hover:scale-110 transition-transform duration-300">
                  {concept.icon}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-bold text-white">{concept.name}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Concept Details */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-bold font-serif text-lg mb-1 flex items-center gap-2">
                <span className="text-2xl">{activeConcept.icon}</span>
                {activeConcept.name}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeConcept.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{activeConcept.votePercentage}%</div>
              <div className="text-xs text-muted-foreground">votes</div>
            </div>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-2">
            {activeConcept.features.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/60 border border-border/40 hover:border-primary/40 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {conceptDesigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveConceptIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeConceptIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border/40 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
