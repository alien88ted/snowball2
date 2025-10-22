"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Search, TrendingUp, Clock, Users, MapPin,
  ChevronDown, Star, Grid3x3, List,
  ArrowUpRight, ArrowDownRight, Zap, Sparkles,
  DollarSign, Shield, Info, Copy, Share2,
  Heart, Bell, X, Check, ExternalLink,
  Percent, ArrowRight, ChevronRight,
  Sun, Moon, Monitor, Menu, Coffee,
  Snowflake
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"
import { useTheme } from "@/components/app-theme-provider"
import { usePrivy } from "@privy-io/react-auth"

type SortOption = "trending" | "newest" | "funded" | "closing"
type ViewMode = "grid" | "list"

function CornerFrame({ className = "" }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gray-300 dark:border-gray-700 ${className}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-300 dark:border-gray-700 ${className}`} />
    </>
  )
}

function ExplorerContent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("trending")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [investAmount, setInvestAmount] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const { ready, authenticated, user, login } = usePrivy()

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

  const filteredProjects = useMemo(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

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

  const totalRaised = projects.reduce((sum, p) => sum + (p.fundingGoal * (p.progress || 0) / 100), 0)
  const totalInvestors = projects.reduce((sum, p) => sum + (p.investors || 0), 0)
  const averageAPY = projects.reduce((sum, p) => sum + (p.apy || 0), 0) / projects.length

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50 text-gray-900 dark:text-gray-100">
      {/* Enhanced Header with Landing Page Style */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Winter Theme */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                    <Snowflake className="w-4 h-4 text-white animate-pulse" />
                  </div>
                </div>
                <span className="text-xl font-bold font-serif bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  now.fun
                </span>
              </a>

              {/* Desktop Nav with Underline Animation */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: "/explorer", label: "Trade", active: true },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                      item.active
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                    {item.active && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full" />
                    )}
                    {!item.active && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Side with Refined Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle with Better Styling */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "light" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                  title="Light mode"
                >
                  <Sun className={`w-4 h-4 ${theme === "light" ? "text-amber-500" : "text-gray-500"}`} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "system" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                  title="System"
                >
                  <Monitor className={`w-4 h-4 ${theme === "system" ? "text-blue-500" : "text-gray-500"}`} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded transition-all ${
                    theme === "dark" 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                  title="Dark mode"
                >
                  <Moon className={`w-4 h-4 ${theme === "dark" ? "text-indigo-500" : "text-gray-500"}`} />
                </button>
              </div>

              {/* Wallet with Gradient */}
              {ready && authenticated ? (
                <div className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={login}
                  disabled={!ready}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Subtle Background Pattern */}
      <main className="max-w-[1400px] mx-auto px-6 py-8 relative">
        {/* Subtle dot pattern like landing page */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Page Title with Serif Font */}
        <div className="mb-8 relative">
          <h1 className="text-4xl font-bold font-serif mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Explore Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Invest in tokenized businesses and earn real returns
          </p>
        </div>

        {/* Stats Row with Corner Frames */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Raised</div>
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-serif">${(totalRaised / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +23.5% this week
            </div>
          </div>
          
          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Investors</div>
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-serif">{(totalInvestors / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active users</div>
          </div>
          
          <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group hover:shadow-md transition-all">
            <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Average APY</div>
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-serif">{averageAPY.toFixed(1)}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Verified returns</div>
          </div>
        </div>

        {/* Filters with Enhanced Styling */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Search with Icon Animation */}
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              />
            </div>

            {/* Categories with Pill Style */}
            <div className="flex items-center gap-2">
              {["all", "coffee", "marketplace", "fashion", "food"].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* View & Sort with Better Design */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:border-gray-300 dark:hover:border-gray-700"
            >
              <option value="trending">🔥 Trending</option>
              <option value="newest">✨ Newest</option>
              <option value="funded">💰 Most Funded</option>
              <option value="closing">⏰ Closing Soon</option>
            </select>

            <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "grid" 
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "list" 
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Project Details with Corner Frames */}
        {selectedProject && (
          <div ref={detailsRef} className="relative mb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg animate-in slide-in-from-top fade-in duration-300">
            <CornerFrame />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="relative group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                      {(() => {
                        const Icon = getProjectIcon(selectedProject.category)
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-serif mb-1">{selectedProject.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedProject.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedProject.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {Math.floor(Math.random() * 30) + 1} days left
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {selectedProject.investors} investors
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Progress Section */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Funding Progress</span>
                      <span className="font-bold">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-500 relative"
                        style={{ width: `${selectedProject.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        ${((selectedProject.fundingGoal * (selectedProject.progress || 0) / 100) / 1000).toFixed(0)}K raised
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        ${(selectedProject.fundingGoal / 1000).toFixed(0)}K goal
                      </span>
                    </div>
                  </div>

                  {/* Tokenomics with Better Design */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Token Distribution</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedProject.tokenomics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold w-10 text-right">{value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Investment Box with Gradient Border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20" />
                  <div className="relative bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-semibold mb-4">Quick Invest</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Amount (USDC)</label>
                        <input
                          type="number"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      
                      {investAmount && (
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600 dark:text-gray-400">You'll receive</span>
                            <span className="font-bold">{(Number(investAmount) * 10).toLocaleString()} ${selectedProject.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Est. APY</span>
                            <span className="font-bold text-green-600 dark:text-green-400">{selectedProject.apy}%</span>
                          </div>
                        </div>
                      )}
                      
                      <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                        Invest Now
                      </button>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Min investment</span>
                          <span className="font-medium">${selectedProject.minInvestment}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <span>Revenue share</span>
                          <span className="font-medium">{selectedProject.revenueShare}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid with Enhanced Cards */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <CornerFrame className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">${project.symbol}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatchlist(project.id)
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <Star className={`w-4 h-4 transition-colors ${
                        isWatched 
                          ? "fill-amber-500 text-amber-500" 
                          : "text-gray-400 hover:text-amber-500"
                      }`} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                      <span>${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K raised</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full relative"
                        style={{ width: `${project.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400">APY</div>
                      <div className="font-semibold text-green-600 dark:text-green-400">{project.apy}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Investors</div>
                      <div className="font-semibold">{project.investors}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Min</div>
                      <div className="font-semibold">${project.minInvestment}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.name}
                          </h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">${project.symbol}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
                        <div className="font-semibold">{project.progress}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 dark:text-gray-400">APY</div>
                        <div className="font-semibold text-green-600 dark:text-green-400">{project.apy}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Raised</div>
                        <div className="font-semibold">${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(project.id)
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                      >
                        <Star className={`w-4 h-4 transition-colors ${
                          isWatched 
                            ? "fill-amber-500 text-amber-500" 
                            : "text-gray-400 hover:text-amber-500"
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default function ExplorerEnhanced() {
  return (
    <AppThemeProvider>
      <ExplorerContent />
    </AppThemeProvider>
  )
}
