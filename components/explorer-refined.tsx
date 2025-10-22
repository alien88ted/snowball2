"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Search, TrendingUp, Clock, Users, MapPin,
  ChevronDown, Star, Grid3x3, List,
  ArrowUpRight, ArrowDownRight, Zap,
  DollarSign, Shield, Info, Copy, Share2,
  Heart, Bell, X, Check, ExternalLink,
  Percent, ArrowRight, ChevronRight,
  Sun, Moon, Monitor, Menu
} from "lucide-react"
import { getAllProjects, type Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"
import { useTheme } from "@/components/app-theme-provider"
import { usePrivy } from "@privy-io/react-auth"

type SortOption = "trending" | "newest" | "funded" | "closing"
type ViewMode = "grid" | "list"

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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Clean Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 font-bold text-lg">$</span>
                </div>
                <span className="text-xl font-bold">now.fun</span>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: "/explorer", label: "Trade" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded ${theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  title="Light mode"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded ${theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  title="System"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded ${theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  title="Dark mode"
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              {/* Wallet */}
              {ready && authenticated ? (
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <span className="text-sm font-medium">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={login}
                  disabled={!ready}
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Connect Wallet
                </button>
              )}

              {/* Mobile Menu */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Invest in tokenized businesses
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Raised</div>
            <div className="text-2xl font-bold">${(totalRaised / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              <ArrowUpRight className="w-3 h-3 inline" />
              +23.5% this week
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Investors</div>
            <div className="text-2xl font-bold">{(totalInvestors / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active users</div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average APY</div>
            <div className="text-2xl font-bold">{averageAPY.toFixed(1)}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Verified returns</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2">
              {["all", "coffee", "marketplace", "fashion", "food"].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* View & Sort */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="funded">Most Funded</option>
              <option value="closing">Closing Soon</option>
            </select>

            <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Project Details */}
        {selectedProject && (
          <div ref={detailsRef} className="mb-8 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                    {(() => {
                      const Icon = getProjectIcon(selectedProject.category)
                      return <Icon className="w-8 h-8 text-white dark:text-gray-900" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedProject.name}</h2>
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
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Progress */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-bold">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 dark:bg-gray-100 rounded-full transition-all duration-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
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

                  {/* Tokenomics */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Token Distribution</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedProject.tokenomics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-bold">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Investment Box */}
                <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <h3 className="font-semibold mb-4">Quick Invest</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Amount (USDC)</label>
                      <input
                        type="number"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                      />
                    </div>
                    
                    {investAmount && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
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
                    
                    <button className="w-full py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                      Invest
                    </button>
                    
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Min investment</span>
                        <span>${selectedProject.minInvestment}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>Revenue share</span>
                        <span>{selectedProject.revenueShare}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">${project.symbol}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatchlist(project.id)
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Star className={`w-4 h-4 ${isWatched ? "fill-gray-900 dark:fill-gray-100" : ""}`} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K raised</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 dark:bg-gray-100 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">APY</div>
                      <div className="font-semibold">{project.apy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Investors</div>
                      <div className="font-semibold">{project.investors}</div>
                    </div>
                    <div>
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
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{project.name}</h3>
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
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Star className={`w-4 h-4 ${isWatched ? "fill-gray-900 dark:fill-gray-100" : ""}`} />
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

export default function ExplorerRefined() {
  return (
    <AppThemeProvider>
      <ExplorerContent />
    </AppThemeProvider>
  )
}