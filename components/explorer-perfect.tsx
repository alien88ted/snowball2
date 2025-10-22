"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import { AppHeaderPerfect } from "@/components/app-header-perfect"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Search, Filter, TrendingUp, Clock, Users, MapPin,
  ChevronDown, Star, Grid3x3, List, BarChart3,
  ArrowUpRight, ArrowDownRight, Sparkles, Zap,
  DollarSign, Target, Shield, Info, Copy, Share2,
  Heart, Bell, ChevronRight, X, Check, ExternalLink,
  Calendar, Percent, Gift, Activity, ArrowRight,
  Wallet, ChartBar
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

type SortOption = "trending" | "newest" | "funded" | "closing"
type ViewMode = "grid" | "list" | "compact"

export default function ExplorerPerfect() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("trending")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [investAmount, setInvestAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
    setProjects(getAllProjects())
  }, [])

  useEffect(() => {
    if (selectedProject && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedProject])

  const toggleWatchlist = (projectId: string) => {
    const newWatchlist = watchlist.includes(projectId) 
      ? watchlist.filter(id => id !== projectId)
      : [...watchlist, projectId]
    setWatchlist(newWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        filtered = [...filtered].sort((a, b) => (b.investors || 0) - (a.investors || 0))
        break
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id))
        break
      case "funded":
        filtered = [...filtered].sort((a, b) => (b.progress || 0) - (a.progress || 0))
        break
      case "closing":
        filtered = [...filtered].sort((a, b) => (a.progress || 0) - (b.progress || 0))
        break
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, sortBy])

  // Calculate total stats
  const totalRaised = projects.reduce((sum, p) => sum + (p.fundingGoal * (p.progress || 0) / 100), 0)
  const totalInvestors = projects.reduce((sum, p) => sum + (p.investors || 0), 0)
  const averageAPY = projects.reduce((sum, p) => sum + (p.apy || 0), 0) / projects.length

  return (
    <AppThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 transition-colors duration-500">
        <AppHeaderPerfect />
        
        {/* Hero Section with Animated Background */}
        <div className="relative pt-20 pb-10 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob" />
            <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-6">
            <div className="flex items-start justify-between mb-10">
              <div>
                <h1 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                    Explore Projects
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                  Invest in real businesses, earn real returns. Join the future of decentralized ownership.
                </p>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    viewMode === "grid" 
                      ? "bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    viewMode === "list" 
                      ? "bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    viewMode === "compact" 
                      ? "bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                  )}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Raised</span>
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    ${(totalRaised / 1000000).toFixed(1)}M
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="font-medium">+23.5% this week</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</span>
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {projects.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">3 launching soon</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Investors</span>
                    <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {(totalInvestors / 1000).toFixed(1)}K
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="font-medium">+1,245 today</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average APY</span>
                    <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                      <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {averageAPY.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Verified returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="sticky top-16 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-y border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <div className="flex items-center justify-between gap-5">
              {/* Search */}
              <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all shadow-sm text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2">
                {["all", "coffee", "marketplace", "fashion", "food"].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-400/25"
                        : "bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    {category === "all" ? "All Projects" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all cursor-pointer shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
              >
                <option value="trending">🔥 Trending</option>
                <option value="newest">✨ Newest</option>
                <option value="funded">💰 Most Funded</option>
                <option value="closing">⏰ Closing Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected Project Details (Inline) */}
        {selectedProject && (
          <div ref={detailsRef} className="max-w-[1400px] mx-auto px-6 py-8">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden animate-in slide-in-from-top fade-in duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Header */}
              <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all group"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      selectedProject.category === 'coffee' || selectedProject.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                      selectedProject.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                      selectedProject.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                      'from-green-500 to-emerald-600'
                    } rounded-2xl blur-2xl opacity-50`} />
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${
                      selectedProject.category === 'coffee' || selectedProject.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                      selectedProject.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                      selectedProject.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                      'from-green-500 to-emerald-600'
                    } flex items-center justify-center shadow-xl`}>
                      {(() => {
                        const Icon = getProjectIcon(selectedProject.category)
                        return <Icon className="w-10 h-10 text-white" />
                      })()}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProject.name}</h2>
                      <span className="text-2xl font-mono text-gray-600 dark:text-gray-400">${selectedProject.symbol}</span>
                      {selectedProject.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">{selectedProject.description}</p>
                    
                    {/* Quick Stats */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{Math.floor(Math.random() * 30) + 1} days left</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedProject.investors} investors</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => toggleWatchlist(selectedProject.id)}
                      className={cn(
                        "p-3 rounded-xl transition-all",
                        watchlist.includes(selectedProject.id)
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                    >
                      <Star className={cn("w-5 h-5", watchlist.includes(selectedProject.id) && "fill-current")} />
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-xl transition-all">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleCopy(window.location.href)}
                      className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-xl transition-all"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-8 grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Progress Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Funding Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-bold text-gray-900 dark:text-white">{selectedProject.progress}%</span>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${selectedProject.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Raised</div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${((selectedProject.fundingGoal * (selectedProject.progress || 0) / 100) / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Goal</div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${(selectedProject.fundingGoal / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tokenomics */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Token Distribution</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProject.tokenomics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-sm font-mono font-bold text-gray-900 dark:text-white w-12 text-right">
                              {value}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">Revenue Share</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProject.revenueShare}% of profits distributed monthly</p>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">Secured Funding</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Smart contract protected investments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Investment Widget */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Invest</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Investment Amount</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={investAmount}
                            onChange={(e) => setInvestAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 pr-14 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all text-gray-900 dark:text-white"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 dark:text-gray-400">
                            USDC
                          </span>
                        </div>
                      </div>
                      
                      {investAmount && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">You'll receive</span>
                              <span className="font-mono font-bold text-gray-900 dark:text-white">
                                {(Number(investAmount) * 10).toLocaleString()} ${selectedProject.symbol}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Est. APY</span>
                              <span className="font-bold text-green-600 dark:text-green-400">
                                {selectedProject.apy}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Monthly return</span>
                              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                                +${(Number(investAmount) * (selectedProject.apy || 0) / 100 / 12).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Invest Now
                      </button>
                    </div>
                  </div>

                  {/* Contract Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Contract Address</div>
                    <div className="font-mono text-xs text-gray-900 dark:text-white break-all mb-3">
                      {selectedProject.contract || '0x1234...5678'}
                    </div>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 font-medium">
                      View on Explorer
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          {viewMode === "grid" && (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => {
                const Icon = getProjectIcon(project.category)
                const isWatched = watchlist.includes(project.id)
                
                return (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 dark:group-hover:from-blue-400/10 dark:group-hover:to-purple-400/10 transition-all duration-500" />
                    
                    {/* Card Content */}
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${
                              project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                              project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                              project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                              'from-green-500 to-emerald-600'
                            } rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity`} />
                            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${
                              project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                              project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                              project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                              'from-green-500 to-emerald-600'
                            } flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {project.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">${project.symbol}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWatchlist(project.id)
                          }}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            isWatched 
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" 
                              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                          )}
                        >
                          <Star className={cn("w-4 h-4", isWatched && "fill-current")} />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                          <span>${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K raised</span>
                          <span className="font-bold">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 rounded-lg text-center">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">APY</div>
                          <div className="text-sm font-bold text-green-600 dark:text-green-400">{project.apy}%</div>
                        </div>
                        <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg text-center">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Investors</div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{project.investors}</div>
                        </div>
                        <div className="p-2.5 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg text-center">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Min</div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">${project.minInvestment}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.floor(Math.random() * 30) + 1}d left
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </AppThemeProvider>
  )
}
