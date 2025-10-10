"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X, Users } from "lucide-react"

interface StoreMockupsProps {
  projectName: string
  projectSymbol: string
}

interface ConceptDesign {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  style: string
  votePercentage?: number
}

const conceptDesigns: ConceptDesign[] = [
  {
    id: "concept-1",
    name: "Concept A",
    description: "Clean white aesthetic with modern LED accents",
    image: "/mockups/coffee-storefront.png",
    features: ["LED lighting", "Minimalist design", "Digital displays", "Open layout"],
    style: "Modern",
    votePercentage: 38
  },
  {
    id: "concept-3",
    name: "Concept B",
    description: "Natural elements with greenery",
    image: "/mockups/concept-3.jpg",
    features: ["Plant walls", "Natural wood", "Natural light", "Organic shapes"],
    style: "Natural",
    votePercentage: 27
  },
  {
    id: "concept-4",
    name: "Concept C",
    description: "Tech-forward with smart features",
    image: "/mockups/concept-4.jpg",
    features: ["Digital menus", "Smart systems", "Modern tech", "Interactive elements"],
    style: "Tech",
    votePercentage: 22
  },
  {
    id: "concept-5",
    name: "Concept D",
    description: "Lebanese heritage meets contemporary design",
    image: "/mockups/concept-5.jpg",
    features: ["Local patterns", "Cultural elements", "Warm tones", "Traditional touches"],
    style: "Cultural",
    votePercentage: 13
  }
]

export function StoreMockups({ projectName, projectSymbol }: StoreMockupsProps) {
  const [mounted, setMounted] = useState(false)
  const [activeConceptIndex, setActiveConceptIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageLoad = useCallback((conceptId: string) => {
    setImageLoadStates(prev => ({ ...prev, [conceptId]: true }))
  }, [])

  const nextConcept = useCallback(() => {
    setActiveConceptIndex((prev) => (prev + 1) % conceptDesigns.length)
  }, [])

  const previousConcept = useCallback(() => {
    setActiveConceptIndex((prev) => (prev - 1 + conceptDesigns.length) % conceptDesigns.length)
  }, [])

  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextConcept()
    if (e.key === "ArrowLeft") previousConcept()
    if (e.key === "Escape") setIsLightboxOpen(false)
  }, [nextConcept, previousConcept])

  useEffect(() => {
    if (mounted) {
      window.addEventListener("keydown", handleKeyNavigation)
      return () => window.removeEventListener("keydown", handleKeyNavigation)
    }
  }, [mounted, handleKeyNavigation])

  if (!mounted) return null

  const activeConcept = conceptDesigns[activeConceptIndex]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold font-serif mb-2">Store Design</h3>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Four design concepts for our community-owned coffee shop in Beirut.
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

      {/* Main Gallery View */}
      <div className="space-y-6">
          {/* Hero Display */}
          <div className="relative group">
            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-accent/40 rounded-bl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-accent/40 rounded-br-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />

            <div className="relative overflow-hidden rounded-2xl border-2 border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-br from-background to-muted/20">

              {/* Navigation Arrows */}
              <button
                onClick={previousConcept}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
              >
                <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextConcept}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
              >
                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              {/* Lightbox Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
              >
                <Maximize2 className="w-5 h-5" />
              </button>

              {/* Concept Label */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40">
                  <span className="text-sm font-semibold">{activeConcept.name}</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] w-full">
                {!imageLoadStates[activeConcept.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeConcept.image}
                  alt={`${activeConcept.name} Design Concept`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onLoad={() => handleImageLoad(activeConcept.id)}
                />

                {/* Voting Overlay */}
                {activeConcept.votePercentage && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Community Preference</span>
                        <span className="text-sm font-bold">{activeConcept.votePercentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
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
          <div className="grid grid-cols-4 gap-3">
            {conceptDesigns.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => setActiveConceptIndex(index)}
                className={`relative group overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  index === activeConceptIndex
                    ? "border-primary shadow-lg shadow-primary/30"
                    : "border-border/40 hover:border-primary/50"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={concept.image}
                    alt={concept.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-semibold text-white">{concept.name}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Concept Details */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15">
            <h4 className="font-bold font-serif text-base mb-2">{activeConcept.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {activeConcept.description}
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-2">
              {activeConcept.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/50 border border-border/40"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeConcept.image}
              alt={activeConcept.name}
              className="w-full h-full object-contain rounded-2xl"
            />

            {/* Navigation in Lightbox */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  previousConcept()
                }}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-sm font-semibold text-white">{activeConcept.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextConcept()
                }}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}