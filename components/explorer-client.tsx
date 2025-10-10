"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, TrendingUp, ArrowRight } from "lucide-react"
import { getAllProjects, generateProjectIcon } from "@/lib/projects"

export default function ExplorerClient() {
  const [mounted, setMounted] = useState(false)
  const projects = getAllProjects()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08), transparent 60%)" }}
        />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-[-0.02em] mb-6">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Explore $NOW Projects
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              Invest in tokenized real-world businesses. Real revenue, real ownership, real profits.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const progressPercentage = (project.raised / project.fundingGoal) * 100
              const statusConfig = {
                presale: { label: "Presale Live", color: "green" },
                live: { label: "Live", color: "blue" },
                coming_soon: { label: "Coming Soon", color: "gray" },
                funded: { label: "Funded", color: "purple" }
              }
              const status = statusConfig[project.status]

              return (
                <Link key={project.id} href={`/explorer/${project.id}`}>
                  <div className="relative group cursor-pointer">
                    {/* Corner Decorations */}
                    <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

                    <Card className="h-full border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                      {/* Header with Icon */}
                      <div className="p-6 bg-gradient-to-br from-white via-white to-gray-50/30 border-b border-border/40">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden flex-shrink-0">
                            {mounted && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={generateProjectIcon(project.symbol)}
                                alt={project.name}
                                className="w-full h-full object-contain p-1"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold font-serif tracking-[-0.01em] truncate">
                              {project.name}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium">{project.category}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                          status.color === "green" ? "bg-green-50 text-green-700 border border-green-200/60" :
                          status.color === "blue" ? "bg-blue-50 text-blue-700 border border-blue-200/60" :
                          status.color === "purple" ? "bg-purple-50 text-purple-700 border border-purple-200/60" :
                          "bg-gray-50 text-gray-700 border border-gray-200/60"
                        }`}>
                          {status.color === "green" && (
                            <div className="relative flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full z-10" />
                              <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                            </div>
                          )}
                          {status.label}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 space-y-4">
                        {/* Description */}
                        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/6 to-accent/6 border border-primary/15">
                            <div className="text-xs text-muted-foreground/70 mb-1">Price</div>
                            <div className="text-lg font-bold font-serif">${project.price}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-br from-card/50 to-card/20 border border-border/30">
                            <div className="text-xs text-muted-foreground/70 mb-1">Goal</div>
                            <div className="text-lg font-bold font-serif">${(project.fundingGoal / 1000)}K</div>
                          </div>
                        </div>

                        {/* Location & Opening */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground/80">{project.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span className="text-muted-foreground/80">Opens {project.opening}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">Progress</span>
                            <span className="text-xs font-bold tabular-nums">
                              {progressPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="relative h-2 bg-background/70 rounded-full overflow-hidden border border-border/50">
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500"
                              style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }}
                            />
                          </div>
                        </div>

                        {/* View Details Link */}
                        <div className="pt-2 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Coming Soon Message */}
          {projects.length === 1 && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/40 border border-border/40">
                <span className="text-sm text-muted-foreground font-medium">
                  More projects launching soon
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}


