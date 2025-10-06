"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, TrendingUp, Grid, List, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate simple black and white SVG icons with ticker symbol
const generateProjectIcon = (name: string, symbol: string) => {
  // Adjust font size based on symbol length
  const fontSize = symbol.length <= 3 ? "72" : symbol.length <= 4 ? "56" : "48"

  const svg = `
    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="white"/>
      <rect x="2" y="2" width="252" height="252" fill="white" stroke="#e5e5e5" stroke-width="2"/>
      <text x="128" y="145" font-family="Georgia, serif" font-size="${fontSize}" font-weight="600" fill="black" text-anchor="middle" letter-spacing="1">
        $${symbol}
      </text>
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const tokenizedProjects = [
  {
    id: 1,
    name: "Snowflake Builder",
    symbol: "SFB",
    description: "Design tool platform with community-owned governance tokens",
    category: "Design",
    holders: 1234,
    marketCap: 542000,
    tokenPrice: 4.8,
    trending: true,
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
    change24h: 12.5,
    volume: "542K",
    iconUrl: null,
  },
  {
    id: 2,
    name: "Winter Dashboard",
    symbol: "WNTR",
    description: "Analytics SaaS with equity tokens for early supporters",
    category: "Analytics",
    holders: 892,
    marketCap: 321000,
    tokenPrice: 3.6,
    trending: true,
    featured: true,
    gradient: "from-purple-500 to-pink-500",
    change24h: 8.2,
    volume: "321K",
    iconUrl: null,
  },
  {
    id: 3,
    name: "Frosty Chat",
    symbol: "FRST",
    description: "Messaging platform where token holders share in revenue",
    category: "Social",
    holders: 2341,
    marketCap: 892000,
    tokenPrice: 8.9,
    trending: false,
    featured: true,
    gradient: "from-indigo-500 to-blue-500",
    change24h: -2.1,
    volume: "892K",
    iconUrl: null,
  },
  {
    id: 4,
    name: "Snow Timer",
    symbol: "TIMER",
    description: "Productivity app with tokenized ownership model",
    category: "Productivity",
    holders: 567,
    marketCap: 234000,
    tokenPrice: 2.5,
    trending: false,
    featured: false,
    gradient: "from-teal-500 to-emerald-500",
    change24h: 5.7,
    volume: "234K",
    iconUrl: null,
  },
  {
    id: 5,
    name: "Ice Gallery",
    symbol: "ICE",
    description: "NFT marketplace with equity tokens for stakeholders",
    category: "Media",
    holders: 1456,
    marketCap: 456000,
    tokenPrice: 6.7,
    trending: true,
    featured: false,
    gradient: "from-sky-500 to-blue-500",
    change24h: 15.3,
    volume: "456K",
    iconUrl: null,
  },
  {
    id: 6,
    name: "Snowball Fight",
    symbol: "FIGHT",
    description: "Gaming platform where players own the ecosystem",
    category: "Games",
    holders: 3421,
    marketCap: 1234000,
    tokenPrice: 12.9,
    trending: true,
    featured: true,
    gradient: "from-rose-500 to-pink-500",
    change24h: 22.1,
    volume: "1.2M",
    iconUrl: null,
  },
].map(project => ({
  ...project,
  iconUrl: generateProjectIcon(project.name, project.symbol)
}))

const categories = ["All", "Design", "Analytics", "Social", "Productivity", "Media", "Games"]

export default function ExplorerPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("trending")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = tokenizedProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.trending ? 1 : -1
      case "holders":
        return b.holders - a.holders
      case "marketcap":
        return b.marketCap - a.marketCap
      case "price":
        return b.tokenPrice - a.tokenPrice
      case "change":
        return b.change24h - a.change24h
      default:
        return 0
    }
  })

  const totalMarketCap = tokenizedProjects.reduce((sum, project) => sum + project.marketCap, 0)
  const totalHolders = tokenizedProjects.reduce((sum, project) => sum + project.holders, 0)

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Clean Banner */}
          <div className="w-full mb-12">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-white border border-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black">
                  EXPLORE
                </div>
                <div className="text-2xl md:text-3xl font-serif text-gray-600 mt-2">
                  Community-Owned Projects
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-lg border border-border">
                <div className="text-2xl font-semibold">{tokenizedProjects.length}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="text-2xl font-semibold">${(totalMarketCap / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-muted-foreground">Market Cap</div>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="text-2xl font-semibold">{(totalHolders / 1000).toFixed(1)}K</div>
                <div className="text-xs text-muted-foreground">Holders</div>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-xs text-muted-foreground">Trading</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="marketcap">Market Cap</SelectItem>
                <SelectItem value="holders">Holders</SelectItem>
                <SelectItem value="change">24h Change</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1 ml-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-10 w-10"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-10 w-10"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {sortedProjects.map((project, index) => (
            <Link key={project.id} href={`/explorer/${project.id}`}>
              <Card className="hover:border-foreground/20 transition-colors cursor-pointer">

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-border bg-white">
                        <img
                          src={project.iconUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    {project.trending && (
                      <span className="text-xs text-green-600">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-semibold">${project.tokenPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">24h</div>
                      <div className={cn(
                        "font-semibold",
                        project.change24h > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {project.change24h > 0 ? "+" : ""}{project.change24h}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="font-semibold text-sm">${project.volume}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Holders</div>
                      <div className="font-semibold text-sm">{project.holders.toLocaleString()}</div>
                    </div>
                  </div>

                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No projects found matching your criteria</p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}