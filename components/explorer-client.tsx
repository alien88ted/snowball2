"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { getAllProjects, generateProjectIcon } from "@/lib/projects"

export default function ExplorerClient() {
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const projects = getAllProjects()
  const [totals, setTotals] = useState<Record<string, { sol: number; usdc: number; totalUsd: number; updatedAt?: number }>>({})

  useEffect(() => {
    setMounted(true)
    async function load() {
      try {
        const results = await Promise.all(
          projects.map(async (p) => {
            const res = await fetch(`/api/wallet?address=${p.presaleAddress}`, { cache: "no-store" })
            if (!res.ok) return [p.id, { sol: 0, usdc: 0, totalUsd: 0, updatedAt: Date.now() }] as const
            const data = await res.json()
            return [p.id, { sol: data.sol ?? 0, usdc: data.usdc ?? 0, totalUsd: data.totalUsd ?? 0, updatedAt: data.updatedAt ?? Date.now() }] as const
          })
        )
        const map: Record<string, { sol: number; usdc: number; totalUsd: number; updatedAt?: number }> = {}
        for (const [id, val] of results) map[id] = val
        setTotals(map)
      } catch {}
    }
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [projects])

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-10">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-[-0.02em] mb-2">Live Investment Opportunities</h1>
                <p className="text-base text-muted-foreground">Real businesses. Real profits. Invest from $100.</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 rounded-md border ${viewMode === "list" ? "bg-foreground text-background" : "hover:bg-muted"}`}>List</button>
                <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 rounded-md border ${viewMode === "grid" ? "bg-foreground text-background" : "hover:bg-muted"}`}>Grid</button>
              </div>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="divide-y divide-border/50 rounded-md border border-border/50 overflow-hidden">
              {projects.map((project) => {
                const totalUsd = totals[project.id]?.totalUsd ?? 0
                const progress = totalUsd > 0 ? (totalUsd / project.fundingGoal) * 100 : 0
                return (
                  <Link key={project.id} href={`/explorer/${project.id}`} className="block">
                    <div className="relative group flex items-center gap-4 p-4 hover:bg-muted/40">
                      {/* Corner Decorations */}
                      <div className="pointer-events-none absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 rounded-tl-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                      <div className="pointer-events-none absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                      <div className="pointer-events-none absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(168,85,247,0.35)' }} />
                      <div className="pointer-events-none absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 rounded-br-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(168,85,247,0.35)' }} />
                      <div className="w-10 h-10 rounded-md border border-border/40 bg-white overflow-hidden flex-shrink-0">
                        {mounted && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={generateProjectIcon(project.symbol)} alt={project.name} className="w-full h-full object-contain p-1" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold truncate">{project.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border">
                            {project.status === "presale" ? "Presale" : project.status === "live" ? "Live" : project.status === "funded" ? "Funded" : "Coming Soon"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{project.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono">{progress.toFixed(0)}%</div>
                        <div className="text-[11px] text-muted-foreground font-mono">$ {Math.floor(totalUsd).toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const totalUsd = totals[project.id]?.totalUsd ?? 0
                const progressPercentage = totalUsd > 0 ? (totalUsd / project.fundingGoal) * 100 : 0
                const statusConfig = {
                  presale: { label: "Presale Live", color: "green" },
                  live: { label: "Live", color: "blue" },
                  coming_soon: { label: "Coming Soon", color: "gray" },
                  funded: { label: "Funded", color: "purple" }
                }
                const status = statusConfig[project.status as keyof typeof statusConfig]

                return (
                  <Link key={project.id} href={`/explorer/${project.id}`}>
                    <div className="relative group cursor-pointer">
                      {/* Corner Decorations */}
                      <div className="pointer-events-none absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                      <div className="pointer-events-none absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 rounded-tr-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                      <div className="pointer-events-none absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 rounded-bl-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(168,85,247,0.35)' }} />
                      <div className="pointer-events-none absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 rounded-br-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                           style={{ borderColor: 'rgba(168,85,247,0.35)' }} />
                      <Card className="h-full border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-border/40 bg-white/80">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-xl border border-border/40 bg-white shadow-sm overflow-hidden flex-shrink-0">
                              {mounted && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={generateProjectIcon(project.symbol)} alt={project.name} className="w-full h-full object-contain p-1" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold font-serif tracking-[-0.01em] truncate">{project.name}</h3>
                              <p className="text-xs text-muted-foreground font-medium">{project.category}</p>
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                            status?.color === "green" ? "bg-green-50 text-green-700 border border-green-200/60" :
                            status?.color === "blue" ? "bg-blue-50 text-blue-700 border border-blue-200/60" :
                            status?.color === "purple" ? "bg-purple-50 text-purple-700 border border-purple-200/60" :
                            "bg-gray-50 text-gray-700 border border-gray-200/60"
                          }`}>
                            {status?.label}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">Progress</span>
                            <span className="text-xs font-bold tabular-nums">{progressPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="relative h-2 bg-background/70 rounded-full overflow-hidden border border-border/50">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full transition-all duration-500" style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '2%' }} />
                          </div>
                          <div className="mt-2 text-[11px] text-muted-foreground flex justify-between">
                            <span className="font-mono">$ {Math.floor(totalUsd).toLocaleString()}</span>
                            <span className="font-mono">/ {(project.fundingGoal / 1000)}K</span>
                          </div>
                          <div className="pt-3 flex items-center justify-between text-sm font-semibold text-primary group-hover:text-accent transition-colors">
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
          )}

          {projects.length === 1 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">More projects launching soon</div>
          )}
        </div>
      </section>
    </div>
  )
}
