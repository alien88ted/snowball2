"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"

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

      {/* Clean Ticker Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full mb-12">
          <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] bg-white border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-black">
                ${project.symbol}
              </div>
              <div className="text-xl md:text-2xl font-serif text-gray-600 mt-4">
                {project.name}
              </div>
            </div>
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