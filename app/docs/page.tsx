"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Code, Layers, Rocket } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DocsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-serif mb-4">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build tokenized projects with snow.fun.
              Launch, explore, and create with shared ownership.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "landing", label: "Landing Page" },
                    { id: "explorer", label: "Explorer" },
                    { id: "create", label: "Create Flow" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "block px-3 py-2 rounded text-sm transition-colors",
                        activeSection === item.id
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-16">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-serif mb-3">Getting Started</h2>
                <p className="text-muted-foreground text-lg">
                  Build the future of collaborative ownership with tokenized projects.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  {
                    icon: <Code className="h-5 w-5" />,
                    title: "No Code Required",
                    desc: "Launch in minutes without writing a single line of code"
                  },
                  {
                    icon: <Layers className="h-5 w-5" />,
                    title: "Token Economics",
                    desc: "Built-in tokenomics with equity distribution"
                  },
                  {
                    icon: <Rocket className="h-5 w-5" />,
                    title: "Community First",
                    desc: "True shared ownership for your community"
                  }
                ].map((feature, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/explorer">
                  <Button variant="outline" className="group">
                    Browse Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/explorer/create">
                  <Button>
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </section>

            {/* Landing Section */}
            <section id="landing" className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-3xl font-bold font-serif mb-3">Landing Page</h2>
                <p className="text-muted-foreground">
                  Your project's first impression - make it count.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Key Components</CardTitle>
                  <CardDescription>Essential sections for high-converting landing pages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Hero Section</h4>
                      <p className="text-sm text-muted-foreground">
                        Bold headline with clear value proposition and prominent CTAs above the fold.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Token Preview Cards</h4>
                      <p className="text-sm text-muted-foreground">
                        Showcase live projects with real-time data, prices, and market activity.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Trust Indicators</h4>
                      <p className="text-sm text-muted-foreground">
                        Social proof, security badges, and community stats to build credibility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Explorer Section */}
            <section id="explorer" className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-3xl font-bold font-serif mb-3">Explorer</h2>
                <p className="text-muted-foreground">
                  Discover and invest in tokenized projects.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Discovery Features</CardTitle>
                  <CardDescription>Tools to find the perfect projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Smart Search</p>
                      <p className="text-sm text-muted-foreground">Search across names, descriptions, and categories</p>
                    </div>
                    <div>
                      <p className="font-medium">Advanced Filters</p>
                      <p className="text-sm text-muted-foreground">Filter by category, price range, market cap, and more</p>
                    </div>
                    <div>
                      <p className="font-medium">Sorting Options</p>
                      <p className="text-sm text-muted-foreground">Sort by trending, holders, volume, or recent activity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Create Section */}
            <section id="create" className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-3xl font-bold font-serif mb-3">Create Flow</h2>
                <p className="text-muted-foreground">
                  Launch your tokenized project in three simple steps.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Launch Process</CardTitle>
                  <CardDescription>From idea to live project</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="details">1. Details</TabsTrigger>
                      <TabsTrigger value="tokenomics">2. Tokenomics</TabsTrigger>
                      <TabsTrigger value="preview">3. Launch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-4 space-y-3">
                      <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                        <h4 className="font-semibold mb-2">Project Information</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Name your project, write a compelling description, choose a category, and select your branding.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs font-medium">Name</span>
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-600 rounded text-xs font-medium">Description</span>
                          <span className="px-2 py-1 bg-pink-500/10 text-pink-600 rounded text-xs font-medium">Category</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="tokenomics" className="mt-4 space-y-3">
                      <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                        <h4 className="font-semibold mb-2">Token Configuration</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Set your token symbol, initial supply, price per token, and equity percentage for holders.
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Symbol:</span> <span className="font-medium">SNOW</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Supply:</span> <span className="font-medium">1,000,000</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span> <span className="font-medium">$0.10</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Equity:</span> <span className="font-medium">25%</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4 space-y-3">
                      <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                        <h4 className="font-semibold mb-2">Review & Launch</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Preview your project card, review all details, and launch to the marketplace.
                        </p>
                        <Link href="/explorer/create">
                          <Button className="w-full">
                            Start Creating Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}