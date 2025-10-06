"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardPreview() {
  const projects = [
    {
      name: "Snowflake Builder",
      icon: "❄️",
      price: "$4.80",
      marketCap: "$542k",
      holders: 1234,
      change: "+12.5%",
      positive: true,
      tokens: 124,
    },
    {
      name: "Winter Dashboard",
      icon: "📊",
      price: "$3.60",
      marketCap: "$321k",
      holders: 892,
      change: "+8.2%",
      positive: true,
      tokens: 89,
    },
    {
      name: "Frosty Chat",
      icon: "💬",
      price: "$8.90",
      marketCap: "$892k",
      holders: 2341,
      change: "-2.1%",
      positive: false,
      tokens: 256,
    },
    {
      name: "Ice Gallery",
      icon: "🖼️",
      price: "$2.40",
      marketCap: "$180k",
      holders: 567,
      change: "+5.3%",
      positive: true,
      tokens: 45,
    },
    {
      name: "Snow Timer",
      icon: "⏱️",
      price: "$1.80",
      marketCap: "$120k",
      holders: 423,
      change: "+3.7%",
      positive: true,
      tokens: 78,
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Dashboard Interface Mockup */}
        <div className="relative bg-card/60 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-border/40 overflow-hidden hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-500">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
            <div className="flex items-center gap-3">
              <div className="text-foreground font-semibold flex items-center gap-2 text-lg">
                snow.fun <span className="text-2xl">❄️</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">ICM Dashboard</span>
            </div>
            <Link href="/portfolio">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
              >
                View Full Dashboard
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Your Tokenized Projects
              </h2>
              <Link href="/explorer/create">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                  Launch Project
                </Button>
              </Link>
            </div>

            {/* Enhanced Table */}
            <div className="bg-background/40 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-6 gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border-b border-border/50 text-sm font-semibold text-muted-foreground">
                <div>Project</div>
                <div>Token Price</div>
                <div>Market Cap</div>
                <div>Holders</div>
                <div>24h Change</div>
                <div>Your Holdings</div>
              </div>

              {/* Table Rows with hover effects */}
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-border/30 text-sm hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-lg flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform">
                      {project.icon}
                    </div>
                    <span className="font-medium">{project.name}</span>
                  </div>
                  <div className="font-semibold">{project.price}</div>
                  <div className="text-muted-foreground">{project.marketCap}</div>
                  <div className="font-medium">{project.holders.toLocaleString()}</div>
                  <div className={project.positive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {project.change}
                  </div>
                  <div className="font-semibold">{project.tokens} tokens</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
