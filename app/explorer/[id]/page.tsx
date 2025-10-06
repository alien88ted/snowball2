"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Download, Image, Share2, Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import {
  generateBanner,
  generateLogo,
  generateSocialCard,
  downloadImage
} from "@/lib/download-utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - in a real app this would come from an API
const projectData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Snowflake Builder",
    symbol: "SFB",
    description: "Design tool platform with community-owned governance tokens. Build, collaborate, and earn through creative contributions.",
    category: "Design",
    holders: 1234,
    marketCap: 542000,
    tokenPrice: 4.8,
    change24h: 12.5,
    volume: "542K",
    totalSupply: 1000000,
    circulatingSupply: 750000,
    equityPercentage: 25,
  },
  "2": {
    id: 2,
    name: "Winter Dashboard",
    symbol: "WNTR",
    description: "Analytics SaaS with equity tokens for early supporters. Real-time data visualization and business intelligence.",
    category: "Analytics",
    holders: 892,
    marketCap: 321000,
    tokenPrice: 3.6,
    change24h: 8.2,
    volume: "321K",
    totalSupply: 1000000,
    circulatingSupply: 500000,
    equityPercentage: 20,
  },
  "3": {
    id: 3,
    name: "Frosty Chat",
    symbol: "FRST",
    description: "Messaging platform where token holders share in revenue. Decentralized communication with community governance.",
    category: "Social",
    holders: 2341,
    marketCap: 892000,
    tokenPrice: 8.9,
    change24h: -2.1,
    volume: "892K",
    totalSupply: 2000000,
    circulatingSupply: 1500000,
    equityPercentage: 30,
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projectData[projectId] || projectData["1"] // Fallback to first project
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  // Download handlers with error handling
  const handleDownloadBanner = async () => {
    setIsDownloading(true)
    setDownloadError(null)

    await downloadImage(
      () => generateBanner({
        symbol: project.symbol,
        name: project.name,
        category: project.category,
        price: project.tokenPrice
      }),
      `${project.symbol}-banner.png`,
      (error) => {
        setDownloadError('Failed to download banner')
        console.error(error)
      }
    )

    setIsDownloading(false)
  }

  const handleDownloadLogo = async () => {
    setIsDownloading(true)
    setDownloadError(null)

    await downloadImage(
      () => generateLogo({
        symbol: project.symbol,
        name: project.name
      }),
      `${project.symbol}-logo.png`,
      (error) => {
        setDownloadError('Failed to download logo')
        console.error(error)
      }
    )

    setIsDownloading(false)
  }

  const handleDownloadSocialCard = async () => {
    setIsDownloading(true)
    setDownloadError(null)

    await downloadImage(
      () => generateSocialCard({
        symbol: project.symbol,
        name: project.name,
        price: project.tokenPrice
      }),
      `${project.symbol}-social.png`,
      (error) => {
        setDownloadError('Failed to download social card')
        console.error(error)
      }
    )

    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/explorer">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explorer
          </Button>
        </Link>
      </div>

      {/* Clean Ticker Banner with Download Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full mb-12">
          <div className="relative group">
            {/* Banner */}
            <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] bg-white border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-black">
                  ${project.symbol}
                </div>
                <div className="text-xl md:text-2xl font-serif text-gray-600 mt-4">
                  {project.name}
                </div>
              </div>
            </div>

            {/* Download dropdown - shown on hover or always on mobile */}
            <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Download Assets
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Image Assets</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDownloadBanner}>
                    <Image className="mr-2 h-4 w-4" />
                    <span>Banner</span>
                    <span className="ml-auto text-xs text-muted-foreground">1920×1080</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadLogo}>
                    <div className="mr-2 h-4 w-4 flex items-center justify-center">
                      <div className="text-xs font-bold">□</div>
                    </div>
                    <span>Logo</span>
                    <span className="ml-auto text-xs text-muted-foreground">1024×1024</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadSocialCard}>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Social Card</span>
                    <span className="ml-auto text-xs text-muted-foreground">1200×630</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Error message */}
          {downloadError && (
            <div className="mt-2 text-center text-sm text-red-600">
              {downloadError}
            </div>
          )}

          {/* Download quick actions for accessibility */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadBanner}
              disabled={isDownloading}
              className="text-sm"
            >
              <Image className="h-3 w-3 mr-2" />
              Banner (1920×1080)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadLogo}
              disabled={isDownloading}
              className="text-sm"
            >
              <div className="text-xs font-bold mr-2">LOGO</div>
              Logo (1024×1024)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSocialCard}
              disabled={isDownloading}
              className="text-sm"
            >
              <Share2 className="h-3 w-3 mr-2" />
              Social (1200×630)
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">About</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Token Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="font-medium">{project.totalSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Circulating Supply</p>
                  <p className="font-medium">{project.circulatingSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Holder Equity</p>
                  <p className="font-medium">{project.equityPercentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token Holders</p>
                  <p className="font-medium">{project.holders.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Trading Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Market Data</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-lg">${project.tokenPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${(project.marketCap / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-medium">${project.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Change</span>
                  <span className={project.change24h > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {project.change24h > 0 ? "+" : ""}{project.change24h}%
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full">Buy ${project.symbol}</Button>
                <Button variant="outline" className="w-full">Add to Watchlist</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}