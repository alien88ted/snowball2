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
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08), transparent 60%)" }}
        />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif tracking-tighter mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to build tokenized projects with snow.fun.
              Launch, explore, and create with shared ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-20 h-20 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

                <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3 p-10">
                    <CardTitle className="text-xl font-bold font-serif tracking-tight">Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 px-10 pb-10">
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
                          "block px-5 py-3 rounded-xl text-base transition-all duration-300",
                          activeSection === item.id
                            ? "bg-black text-white font-semibold shadow-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-24">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24 relative">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05), transparent 60%)" }}
              />
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Getting Started</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Build the future of collaborative ownership with tokenized projects.
                </p>
              </div>

              <div className="grid gap-10 md:grid-cols-3 mb-12">
                {[
                  {
                    icon: <Code className="h-6 w-6" />,
                    title: "No Code Required",
                    desc: "Launch in minutes without writing a single line of code"
                  },
                  {
                    icon: <Layers className="h-6 w-6" />,
                    title: "Token Economics",
                    desc: "Built-in tokenomics with equity distribution"
                  },
                  {
                    icon: <Rocket className="h-6 w-6" />,
                    title: "Community First",
                    desc: "True shared ownership for your community"
                  }
                ].map((feature, i) => (
                  <div key={i} className="relative group">
                    {/* Corner Decorations */}
                    <div className="absolute -top-0 -left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover:border-primary/40" />
                    <div className="absolute -top-0 -right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover:border-primary/40" />
                    <div className="absolute -bottom-0 -left-0 w-16 h-16 border-l-2 border-b-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover:border-accent/40" />
                    <div className="absolute -bottom-0 -right-0 w-16 h-16 border-r-2 border-b-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover:border-accent/40" />

                    <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm h-full">
                      <CardContent className="p-10">
                        <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold font-serif tracking-tight mb-3">{feature.title}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/explorer" className="flex-1">
                  <Button variant="outline" className="group w-full h-14 rounded-full border-2 border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                    Browse Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Link href="/explorer/create" className="flex-1">
                  <Button className="group w-full h-14 rounded-full bg-black hover:bg-gray-900 text-white text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

            {/* Landing Section */}
            <section id="landing" className="scroll-mt-24 relative">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: "radial-gradient(ellipse at center, rgba(236,72,153,0.05), transparent 60%)" }}
              />
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Landing Page</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Your project's first impression - make it count.
                </p>
              </div>

              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

                <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-12 pb-8">
                    <CardTitle className="text-2xl font-bold font-serif tracking-tight">Key Components</CardTitle>
                    <CardDescription className="text-base mt-3">Essential sections for high-converting landing pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-12 pb-12">
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <h4 className="text-lg font-bold font-serif tracking-tight mb-3">Hero Section</h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Bold headline with clear value proposition and prominent CTAs above the fold.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <h4 className="text-lg font-bold font-serif tracking-tight mb-3">Token Preview Cards</h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Showcase live projects with real-time data, prices, and market activity.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <h4 className="text-lg font-bold font-serif tracking-tight mb-3">Trust Indicators</h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Social proof, security badges, and community stats to build credibility.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

            {/* Explorer Section */}
            <section id="explorer" className="scroll-mt-24 relative">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05), transparent 60%)" }}
              />
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Explorer</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Discover and invest in tokenized projects.
                </p>
              </div>

              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

                <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-12 pb-8">
                    <CardTitle className="text-2xl font-bold font-serif tracking-tight">Discovery Features</CardTitle>
                    <CardDescription className="text-base mt-3">Tools to find the perfect projects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-12 pb-12">
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <p className="text-lg font-bold font-serif tracking-tight mb-3">Smart Search</p>
                      <p className="text-base text-muted-foreground leading-relaxed">Search across names, descriptions, and categories</p>
                    </div>
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <p className="text-lg font-bold font-serif tracking-tight mb-3">Advanced Filters</p>
                      <p className="text-base text-muted-foreground leading-relaxed">Filter by category, price range, market cap, and more</p>
                    </div>
                    <div className="p-6 rounded-2xl border-2 border-border/40 bg-gradient-to-br from-card/50 to-card/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <p className="text-lg font-bold font-serif tracking-tight mb-3">Sorting Options</p>
                      <p className="text-base text-muted-foreground leading-relaxed">Sort by trending, holders, volume, or recent activity</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

            {/* Create Section */}
            <section id="create" className="scroll-mt-24 relative">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.05), transparent 60%)" }}
              />
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Create Flow</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Launch your tokenized project in three simple steps.
                </p>
              </div>

              <div className="relative group">
                {/* Corner Decorations */}
                <div className="absolute -top-0 -left-0 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -top-0 -right-0 w-24 h-24 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300 group-hover:border-primary/40" />
                <div className="absolute -bottom-0 -left-0 w-24 h-24 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl transition-all duration-300 group-hover:border-accent/40" />
                <div className="absolute -bottom-0 -right-0 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl transition-all duration-300 group-hover:border-accent/40" />

                <Card className="border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-12 pb-8">
                    <CardTitle className="text-2xl font-bold font-serif tracking-tight">Launch Process</CardTitle>
                    <CardDescription className="text-base mt-3">From idea to live project</CardDescription>
                  </CardHeader>
                  <CardContent className="px-12 pb-12">
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="grid grid-cols-3 w-full h-14 bg-muted/50 p-2 rounded-2xl">
                        <TabsTrigger value="details" className="text-base font-semibold rounded-xl data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">1. Details</TabsTrigger>
                        <TabsTrigger value="tokenomics" className="text-base font-semibold rounded-xl data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">2. Tokenomics</TabsTrigger>
                        <TabsTrigger value="preview" className="text-base font-semibold rounded-xl data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">3. Launch</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="mt-8 space-y-0">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border-2 border-border/40">
                          <h4 className="text-xl font-bold font-serif tracking-tight mb-4">Project Information</h4>
                          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Name your project, write a compelling description, choose a category, and select your branding.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-bold border border-blue-200">Name</span>
                            <span className="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-bold border border-purple-200">Description</span>
                            <span className="px-4 py-2 bg-pink-500/10 text-pink-600 rounded-full text-sm font-bold border border-pink-200">Category</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="tokenomics" className="mt-8 space-y-0">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border-2 border-border/40">
                          <h4 className="text-xl font-bold font-serif tracking-tight mb-4">Token Configuration</h4>
                          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Set your token symbol, initial supply, price per token, and equity percentage for holders.
                          </p>
                          <div className="grid grid-cols-2 gap-6 text-base">
                            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                              <span className="text-muted-foreground font-medium">Symbol:</span> <span className="font-bold">SNOW</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                              <span className="text-muted-foreground font-medium">Supply:</span> <span className="font-bold">1,000,000</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                              <span className="text-muted-foreground font-medium">Price:</span> <span className="font-bold">$0.10</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                              <span className="text-muted-foreground font-medium">Equity:</span> <span className="font-bold">25%</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="preview" className="mt-8 space-y-0">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border-2 border-border/40">
                          <h4 className="text-xl font-bold font-serif tracking-tight mb-4">Review & Launch</h4>
                          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                            Preview your project card, review all details, and launch to the marketplace.
                          </p>
                          <Link href="/explorer/create">
                            <Button className="group w-full h-14 rounded-full bg-black hover:bg-gray-900 text-white text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
                              Start Creating Now
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </Button>
                          </Link>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}