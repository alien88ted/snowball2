"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Search, TrendingUp, Clock, Users, MapPin,
  Star, Grid3x3, List, ArrowUpRight, ArrowDownRight,
  DollarSign, X, ExternalLink, Percent,
  Sun, Moon, Monitor, ChevronDown
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Clean Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className="text-xl font-bold font-serif tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent transition-opacity hover:opacity-70 duration-200">
                  $now.fun
                </span>
              </a>

              <nav className="hidden md:flex items-center gap-8">
                {[
                  { href: "/explorer", label: "Trade", active: true },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      item.active
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-800 rounded-md p-1">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded ${theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-2 rounded ${theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded ${theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              {ready && authenticated ? (
                <div className="px-4 py-2 text-sm font-medium">
                  {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                </div>
              ) : (
                <button 
                  onClick={login}
                  disabled={!ready}
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold font-serif mb-3">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore and invest in tokenized businesses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="py-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Raised</div>
            <div className="text-2xl font-semibold">${(totalRaised / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +23.5% this week
            </div>
          </div>
          <div className="py-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Investors</div>
            <div className="text-2xl font-semibold">{(totalInvestors / 1000).toFixed(1)}K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Across {projects.length} projects
            </div>
          </div>
          <div className="py-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average APY</div>
            <div className="text-2xl font-semibold">{averageAPY.toFixed(1)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Verified returns
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 bg-white dark:bg-gray-950"
              />
            </div>

            <div className="flex items-center gap-1">
              {["all", "coffee", "marketplace", "fashion", "food"].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
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

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-3 py-2 pr-8 border border-gray-200 dark:border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 cursor-pointer bg-white dark:bg-gray-950"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="funded">Most Funded</option>
                <option value="closing">Closing Soon</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
            </div>

            <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Project Details */}
        {selectedProject && (
          <div ref={detailsRef} className="mb-12 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    {(() => {
                      const Icon = getProjectIcon(selectedProject.category)
                      return <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{selectedProject.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{selectedProject.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {selectedProject.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {Math.floor(Math.random() * 30) + 1} days left
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {selectedProject.investors} investors
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-500 dark:text-gray-400">Funding Progress</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 dark:bg-gray-100 rounded-full transition-all duration-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>${((selectedProject.fundingGoal * (selectedProject.progress || 0) / 100) / 1000).toFixed(0)}K raised</span>
                      <span>${(selectedProject.fundingGoal / 1000).toFixed(0)}K goal</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Token Distribution</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProject.tokenomics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="w-32 h-1 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gray-400 dark:bg-gray-600 rounded-full"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10 text-right">{value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <h3 className="font-medium mb-4">Quick Invest</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Amount (USDC)</label>
                        <input
                          type="number"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 bg-white dark:bg-gray-950"
                        />
                      </div>
                      
                      {investAmount && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">You'll receive</span>
                            <span className="font-medium">{(Number(investAmount) * 10).toLocaleString()} ${selectedProject.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Est. APY</span>
                            <span className="font-medium">{selectedProject.apy}%</span>
                          </div>
                        </div>
                      )}
                      
                      <button className="w-full py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm">
                        Invest
                      </button>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Min investment</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">${selectedProject.minInvestment}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Revenue share</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{selectedProject.revenueShare}%</span>
                        </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const Icon = getProjectIcon(project.category)
              const isWatched = watchlist.includes(project.id)
              
              return (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${project.symbol}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatchlist(project.id)
                      }}
                      className="p-1"
                    >
                      <Star className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K raised</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 dark:bg-gray-100 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">APY</div>
                      <div className="font-semibold">{project.apy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Investors</div>
                      <div className="font-semibold">{project.investors}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Min</div>
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
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">${project.symbol}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                        <div className="font-semibold">{project.progress}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">APY</div>
                        <div className="font-semibold">{project.apy}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Raised</div>
                        <div className="font-semibold">${((project.fundingGoal * (project.progress || 0) / 100) / 1000).toFixed(0)}K</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(project.id)
                        }}
                        className="p-2"
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
      </main>
    </div>
  )
}

export default function ExplorerSophisticated() {
  return (
    <AppThemeProvider>
      <ExplorerContent />
    </AppThemeProvider>
  )
}
