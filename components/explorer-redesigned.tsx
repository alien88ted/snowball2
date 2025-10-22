"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import { AppHeaderEnhanced } from "@/components/app-header-enhanced"
import { ProjectDetailModal } from "@/components/project-detail-modal"
import { Card } from "@/components/ui/card"
import { 
  Search, Filter, TrendingUp, Clock, Users, MapPin,
  ChevronDown, Star, Grid3x3, List, BarChart3,
  ArrowUpRight, ArrowDownRight, Sparkles, Zap
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"

type SortOption = "trending" | "newest" | "funded" | "closing"
type ViewMode = "grid" | "list" | "compact"

export default function ExplorerRedesigned() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("trending")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [watchlist, setWatchlist] = useState<string[]>([])

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
    setProjects(getAllProjects())
  }, [])

  const toggleWatchlist = (projectId: string) => {
    const newWatchlist = watchlist.includes(projectId) 
      ? watchlist.filter(id => id !== projectId)
      : [...watchlist, projectId]
    setWatchlist(newWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
  }

  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case "trending":
        filtered = [...filtered].sort((a, b) => b.investors - a.investors)
        break
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id))
        break
      case "funded":
        filtered = [...filtered].sort((a, b) => b.progress - a.progress)
        break
      case "closing":
        filtered = [...filtered].sort((a, b) => a.progress - b.progress)
        break
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, sortBy])

  // Calculate total stats
  const totalRaised = projects.reduce((sum, p) => sum + (p.fundingGoal * p.progress / 100), 0)
  const totalInvestors = projects.reduce((sum, p) => sum + p.investors, 0)
  const averageAPY = projects.reduce((sum, p) => sum + p.apy, 0) / projects.length

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <AppHeaderEnhanced />
      
      {/* Hero Stats */}
      <div className="pt-20 pb-10 bg-gradient-to-b from-white via-white to-gray-50/50 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-3">
                Explore Projects
              </h1>
              <p className="text-gray-600 text-lg">
                Invest in real businesses, earn real returns
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"} transition-all`}
              >
                <Grid3x3 className={`w-4 h-4 ${viewMode === "grid" ? "text-gray-900" : "text-gray-600"}`} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white/50"} transition-all`}
              >
                <List className={`w-4 h-4 ${viewMode === "list" ? "text-gray-900" : "text-gray-600"}`} />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2.5 rounded-lg ${viewMode === "compact" ? "bg-white shadow-sm" : "hover:bg-white/50"} transition-all`}
              >
                <BarChart3 className={`w-4 h-4 ${viewMode === "compact" ? "text-gray-900" : "text-gray-600"}`} />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-5">
            <div className="group relative p-5 bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50 rounded-2xl border border-blue-100/60 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Total Raised</span>
                <div className="p-2 bg-blue-100/80 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${(totalRaised / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                +23.5% this week
              </div>
            </div>
            
            <div className="group relative p-5 bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50 rounded-2xl border border-purple-100/60 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Active Projects</span>
                <div className="p-2 bg-purple-100/80 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{projects.length}</div>
              <div className="text-xs text-gray-500 mt-2 font-medium">
                3 launching soon
              </div>
            </div>
            
            <div className="group relative p-5 bg-gradient-to-br from-green-50 via-green-50/50 to-emerald-50 rounded-2xl border border-green-100/60 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Total Investors</span>
                <div className="p-2 bg-green-100/80 rounded-lg">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {(totalInvestors / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                +1,245 today
              </div>
            </div>
            
            <div className="group relative p-5 bg-gradient-to-br from-amber-50 via-amber-50/50 to-orange-50 rounded-2xl border border-amber-100/60 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Average APY</span>
                <div className="p-2 bg-amber-100/80 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{averageAPY.toFixed(1)}%</div>
              <div className="text-xs text-gray-500 mt-2 font-medium">
                Verified returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-5">
            {/* Search */}
            <div className="flex-1 max-w-md relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2">
              {["all", "coffee", "marketplace", "fashion", "food"].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {category === "all" ? "All Projects" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all cursor-pointer shadow-sm hover:border-gray-300"
            >
              <option value="trending">🔥 Trending</option>
              <option value="newest">✨ Newest</option>
              <option value="funded">💰 Most Funded</option>
              <option value="closing">⏰ Closing Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === "grid" && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white rounded-2xl border border-gray-200/60 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${
                            project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                            project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                            project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                            'from-green-500 to-emerald-600'
                          } rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${
                            project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                            project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                            project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                            'from-green-500 to-emerald-600'
                          } flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">${project.symbol}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(project.id)
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isWatched 
                            ? "bg-yellow-100 text-yellow-600" 
                            : "bg-gray-100 text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>${(project.fundingGoal * project.progress / 100).toLocaleString()} raised</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">APY</div>
                        <div className="text-sm font-bold text-green-600">{project.apy}%</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Investors</div>
                        <div className="text-sm font-bold text-gray-900">{project.investors}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Min</div>
                        <div className="text-sm font-bold text-gray-900">${project.minInvestment}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.floor(Math.random() * 30) + 1}d left
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                        project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                        project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                        project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                        'from-green-500 to-emerald-600'
                      } flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900">{project.name}</h3>
                          <span className="text-sm font-mono text-gray-500">${project.symbol}</span>
                          {project.featured && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Progress</div>
                        <div className="text-lg font-bold text-gray-900">{project.progress}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">APY</div>
                        <div className="text-lg font-bold text-green-600">{project.apy}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Raised</div>
                        <div className="text-lg font-bold text-gray-900">
                          ${((project.fundingGoal * project.progress / 100) / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(project.id)
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isWatched 
                            ? "bg-yellow-100 text-yellow-600" 
                            : "bg-gray-100 text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  )
}
