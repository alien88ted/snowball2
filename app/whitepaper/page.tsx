"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Hero2Background } from "@/components/hero2-background"
import {
  ArrowRight, ChevronRight, Target, Rocket, Coffee, DollarSign,
  Users, TrendingUp, Globe, Shield, CheckCircle, AlertCircle,
  Calendar, MapPin, BarChart3, Zap, BookOpen, Home
} from "lucide-react"

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState("intro")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "intro", title: "Introduction", icon: Coffee },
    { id: "foundation", title: "Foundation", icon: Shield },
    { id: "location", title: "Location & Equipment", icon: MapPin },
    { id: "technology", title: "Technology", icon: Zap },
    { id: "marketing", title: "Marketing & Community", icon: Users },
    { id: "launch", title: "Launch Strategy", icon: Rocket },
    { id: "operations", title: "Operations", icon: BarChart3 },
    { id: "scaling", title: "Scaling", icon: TrendingUp },
    { id: "vision", title: "Long-term Vision", icon: Globe }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Hero2Background />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              <span className="block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                $COFFEE Whitepaper
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-[1.6] mb-8">
              The Complete Execution Playbook: From $50K to Tokenized Coffee Empire
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              {[
                { value: "$50K", label: "Initial Capital" },
                { value: "30 Days", label: "To Launch" },
                { value: "5M", label: "Total Tokens" },
                { value: "$500K", label: "Target Raise" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
                  <div className="text-2xl font-bold font-serif text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#intro">
                <Button size="lg" className="bg-black hover:bg-gray-900">
                  Read Whitepaper
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Introduction */}
        <section id="intro" className="mb-24">
          <Card className="p-8 md:p-12 border-2 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="h-8 w-8 text-primary" />
              <h2 className="text-4xl font-bold font-serif">Introduction</h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground/80">
              <p className="text-lg leading-relaxed mb-6">
                <strong>READ THIS. DO THIS. WIN.</strong>
              </p>
              <p className="mb-6">
                This whitepaper contains the complete execution playbook for launching the world's first
                tokenized coffee shop. From $50K initial investment to a global franchise empire.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <h3 className="text-xl font-bold mb-3 text-foreground">What You're Building</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Physical coffee shop with blockchain backend</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Customers earn ownership tokens with purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Employees receive equity instead of just wages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Community governance through token voting</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/10">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Reality Check</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <span>80-100 hour work weeks for 3 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <span>$50K you can afford to lose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <span>Public failure risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <span>No glamour, just hustle</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Foundation */}
        <section id="foundation" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 1: Foundation</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mental Preparation */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Mental Preparation</h3>
              <div className="space-y-4 text-muted-foreground/80">
                <p>This will be the hardest thing you've ever done. You're not just opening a coffee shop or launching a token—you're pioneering an entirely new business model.</p>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Success Depends On:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Speed of execution (30 days, not 90)</li>
                    <li>• Relentless hustle (barista + CEO + janitor)</li>
                    <li>• Community obsession (every customer is an investor)</li>
                    <li>• Data-driven decisions (trust numbers, not feelings)</li>
                    <li>• Authenticity (be real, show struggles)</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Legal Setup */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Legal Setup</h3>
              <div className="space-y-4 text-muted-foreground/80">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold mb-2 text-foreground">Business Structure: LLC</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Personal asset protection</li>
                    <li>• Tax flexibility</li>
                    <li>• Simple to set up</li>
                    <li>• Professional appearance</li>
                    <li>• Required for banking</li>
                  </ul>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Timeline & Cost</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Registration: $500 (2-3 weeks)</li>
                    <li>• Tax ID: 1 week</li>
                    <li>• Municipality License: $300-500 (2-4 weeks)</li>
                    <li>• Lawyer budget: $2,000</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Banking */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Banking & Finance</h3>
              <div className="space-y-4 text-muted-foreground/80">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-card/50 rounded-lg border border-border/40">
                    <DollarSign className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-semibold text-sm text-foreground">Business Account</h4>
                    <p className="text-xs mt-1">LLC docs + Tax ID</p>
                  </div>
                  <div className="p-3 bg-card/50 rounded-lg border border-border/40">
                    <Shield className="h-5 w-5 text-accent mb-2" />
                    <h4 className="font-semibold text-sm text-foreground">Crypto Wallets</h4>
                    <p className="text-xs mt-1">Treasury, Operations, Personal</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Payment Processing</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Square for fiat (2.6% + 10¢)</li>
                    <li>• BitPay for crypto (1% fee)</li>
                    <li>• Cash float: $200</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Team */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Team Assembly</h3>
              <div className="space-y-4 text-muted-foreground/80">
                <div className="space-y-3">
                  <div className="p-3 bg-card/50 rounded-lg border border-border/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">You (Founder)</span>
                      <span className="text-xs">80+ hrs/week</span>
                    </div>
                    <p className="text-xs">$0 salary + tokens</p>
                  </div>

                  <div className="p-3 bg-card/50 rounded-lg border border-border/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Barista #1</span>
                      <span className="text-xs">20 hrs/week</span>
                    </div>
                    <p className="text-xs">$600/month + 50 tokens/month</p>
                  </div>

                  <div className="p-3 bg-card/50 rounded-lg border border-border/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Developer</span>
                      <span className="text-xs">Contract</span>
                    </div>
                    <p className="text-xs">$3,000 one-time</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Location & Equipment */}
        <section id="location" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 2: Location & Equipment</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Location Strategy */}
            <Card className="lg:col-span-2 p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Finding the Perfect Popup Location</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Must-Haves</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>✓ 200-400 sq ft</li>
                    <li>✓ High foot traffic (300+ people/day)</li>
                    <li>✓ Electricity + water access</li>
                    <li>✓ Month-to-month lease</li>
                    <li>✓ Young demographic (18-35)</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-lg border border-red-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Deal-Breakers</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>✗ Long-term lease (6+ months)</li>
                    <li>✗ Hidden fees</li>
                    <li>✗ No electricity</li>
                    <li>✗ Terrible location</li>
                    <li>✗ Overly restrictive rules</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Location Types</h4>
                {[
                  { type: "Co-Working Spaces", cost: "$500-800/mo", pro: "Tech-savvy audience" },
                  { type: "University Campus", cost: "$300-600/mo", pro: "High volume, young" },
                  { type: "Shopping Mall Kiosk", cost: "$1,000-1,500/mo", pro: "Massive foot traffic" },
                  { type: "Market Stall", cost: "$50-100/day", pro: "Flexible, cheap" }
                ].map((loc, i) => (
                  <div key={i} className="p-3 bg-card/50 rounded-lg border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{loc.type}</span>
                      <span className="text-sm text-primary">{loc.cost}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-1">{loc.pro}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Equipment Budget */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Equipment Budget</h3>
              <div className="space-y-3">
                {[
                  { item: "Coffee Equipment", amount: "$6,000", note: "Espresso, grinder, etc" },
                  { item: "Storage & Fridge", amount: "$1,200", note: "Cold storage" },
                  { item: "POS & Tech", amount: "$800", note: "iPad, Square" },
                  { item: "Furniture", amount: "$1,500", note: "Counter, stools" },
                  { item: "Supplies (1mo)", amount: "$1,000", note: "Cups, lids, etc" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/40">
                    <div>
                      <div className="font-medium text-sm text-foreground">{item.item}</div>
                      <div className="text-xs text-muted-foreground/70">{item.note}</div>
                    </div>
                    <span className="font-bold text-primary">{item.amount}</span>
                  </div>
                ))}

                <div className="pt-3 mt-3 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Equipment</span>
                    <span className="text-xl font-bold text-primary">$10,500</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 3: Technology</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Smart Contract */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Smart Contract</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold mb-2 text-foreground">Core Functions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• Create 5M $COFFEE tokens</li>
                    <li>• Handle vesting schedules</li>
                    <li>• Reward customers automatically</li>
                    <li>• Track ownership</li>
                    <li>• Enable governance voting</li>
                  </ul>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Tech Stack</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• ERC-20 Standard</li>
                    <li>• Polygon blockchain</li>
                    <li>• Solidity 0.8.19+</li>
                    <li>• OpenZeppelin libraries</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* POS Integration */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">POS Integration</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Customer Journey</h4>
                  <ol className="space-y-1 text-sm text-muted-foreground/80">
                    <li>1. Customer orders coffee</li>
                    <li>2. Pays with cash/card/crypto</li>
                    <li>3. Links wallet (30 seconds)</li>
                    <li>4. Tokens sent automatically</li>
                    <li>5. Confirmation received</li>
                  </ol>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Backend Setup</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• Node.js + Express</li>
                    <li>• Square webhooks</li>
                    <li>• PostgreSQL database</li>
                    <li>• Alchemy/Infura connection</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Website */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Website & App</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Essential Pages</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• Homepage with hero</li>
                    <li>• How it works</li>
                    <li>• Tokenomics</li>
                    <li>• Live stats dashboard</li>
                    <li>• Presale page</li>
                  </ul>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Tech Stack</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• Next.js + React</li>
                    <li>• Tailwind CSS</li>
                    <li>• RainbowKit wallet</li>
                    <li>• Vercel hosting</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Marketing */}
        <section id="marketing" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 4: Marketing & Community</h2>
          </div>

          <Card className="p-8 md:p-12 hover:border-primary/40 transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Social Media Strategy</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { platform: "Instagram", focus: "Visual lifestyle", posts: "1x/day" },
                      { platform: "TikTok", focus: "Viral potential", posts: "2-3x/day" },
                      { platform: "Twitter", focus: "Crypto community", posts: "3-5x/day" },
                      { platform: "Discord", focus: "Community hub", posts: "Always on" }
                    ].map((platform, i) => (
                      <div key={i} className="p-3 bg-card/50 rounded-lg border border-border/40">
                        <div className="font-semibold text-sm text-foreground">{platform.platform}</div>
                        <div className="text-xs text-muted-foreground/70 mt-1">{platform.focus}</div>
                        <div className="text-xs text-primary mt-1">{platform.posts}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <h4 className="font-semibold mb-2 text-foreground">Content Pillars</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-600">40%</div>
                        <span className="text-muted-foreground/80">Education</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-600">30%</div>
                        <span className="text-muted-foreground/80">Behind-scenes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-xs font-bold text-purple-600">20%</div>
                        <span className="text-muted-foreground/80">Community</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center text-xs font-bold text-orange-600">10%</div>
                        <span className="text-muted-foreground/80">Announcements</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Building */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Community Building</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/10">
                    <h4 className="font-semibold mb-2 text-foreground">Discord Growth Goals</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground/80">Week 1-2</span>
                        <span className="font-bold text-foreground">100 members</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground/80">Week 3-4</span>
                        <span className="font-bold text-foreground">500 members</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground/80">Week 5-8</span>
                        <span className="font-bold text-foreground">1,500 members</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground/80">Week 9-12</span>
                        <span className="font-bold text-primary">3,000 members</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                    <h4 className="font-semibold mb-2 text-foreground">Community Events</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground/80">
                      <li>• Weekly coffee chats (voice)</li>
                      <li>• Sunday planning sessions</li>
                      <li>• Wednesday AMAs</li>
                      <li>• Monthly in-person meetups</li>
                      <li>• Token holder exclusive events</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Launch Strategy */}
        <section id="launch" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 5: Launch Strategy</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pre-Launch Checklist */}
            <Card className="lg:col-span-2 p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">7-Day Pre-Launch Checklist</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Operations</h4>
                  <div className="space-y-2">
                    {[
                      "Location fully set up",
                      "Equipment tested (20 practice drinks)",
                      "Inventory stocked (2 weeks)",
                      "Staff trained (60 sec onboarding)",
                      "POS system working perfectly"
                    ].map((item, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm text-muted-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                        <input type="checkbox" className="rounded border-border" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Technology</h4>
                  <div className="space-y-2">
                    {[
                      "Smart contract on mainnet",
                      "Website live and tested",
                      "Token distribution working",
                      "Backup plan ready",
                      "Analytics tracking setup"
                    ].map((item, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm text-muted-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                        <input type="checkbox" className="rounded border-border" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-lg border border-orange-500/10">
                <h4 className="font-semibold mb-2 text-foreground">Launch Day Schedule</h4>
                <div className="space-y-2 text-sm text-muted-foreground/80">
                  <div className="flex gap-3">
                    <span className="font-mono text-primary">5:00 AM</span>
                    <span>Founder arrives, final prep</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary">6:00 AM</span>
                    <span>Staff arrives, team huddle</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary">6:30 AM</span>
                    <span>Pre-opening, start live stream</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary">7:00 AM</span>
                    <span className="font-semibold text-foreground">GRAND OPENING 🎉</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Week 1 Goals */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Week 1 Goals</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold mb-2 text-foreground">Revenue</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Day 1</span>
                      <span className="font-bold text-foreground">$1,200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Days 2-5</span>
                      <span className="font-bold text-foreground">$600-900/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Weekend</span>
                      <span className="font-bold text-foreground">$1,000+/day</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-border/40 flex justify-between">
                      <span className="font-semibold">Week Total</span>
                      <span className="font-bold text-primary">$6,000-7,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Community</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• 200+ wallet holders</li>
                    <li>• 50+ repeat customers</li>
                    <li>• 1,000+ social followers</li>
                    <li>• 10+ testimonials</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Operations */}
        <section id="operations" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 6: Operations</h2>
          </div>

          <Card className="p-8 md:p-12 hover:border-primary/40 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Daily Operations Manual</h3>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Opening Procedure */}
              <div className="p-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/10">
                <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Opening (6:30 AM)
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground/80">
                  <li>☐ Unlock and lights on</li>
                  <li>☐ Turn on espresso machine</li>
                  <li>☐ Start music playlist</li>
                  <li>☐ Check inventory</li>
                  <li>☐ Test first shot</li>
                  <li>☐ Set up POS system</li>
                  <li>☐ Count cash drawer</li>
                  <li>☐ Post "We're open!"</li>
                </ul>
              </div>

              {/* During Service */}
              <div className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/10">
                <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-green-500" />
                  During Service
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground/80">
                  <div>
                    <span className="font-semibold text-foreground">Peak Hours:</span>
                    <ul className="mt-1 space-y-0.5">
                      <li>• 2-3 min per order</li>
                      <li>• Focus on speed</li>
                      <li>• Maintain quality</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Slow Hours:</span>
                    <ul className="mt-1 space-y-0.5">
                      <li>• Deep cleaning</li>
                      <li>• Content creation</li>
                      <li>• Customer conversations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Closing Procedure */}
              <div className="p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/10">
                <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Closing (8:00 PM)
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground/80">
                  <li>☐ Last call announcement</li>
                  <li>☐ Clean espresso machine</li>
                  <li>☐ Empty grounds</li>
                  <li>☐ Wipe all surfaces</li>
                  <li>☐ Sweep and mop</li>
                  <li>☐ Count cash</li>
                  <li>☐ Update metrics</li>
                  <li>☐ Lock up</li>
                </ul>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="mt-8 p-6 bg-card/50 rounded-lg border border-border/40">
              <h4 className="font-semibold mb-4 text-foreground">Weekly Metrics Dashboard</h4>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { metric: "Revenue", target: "$6,000+", track: "Daily sales" },
                  { metric: "Token Conversion", target: "60%+", track: "Wallets/customers" },
                  { metric: "Repeat Rate", target: "40%+", track: "Returning customers" },
                  { metric: "NPS Score", target: "50+", track: "Customer satisfaction" }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-background/50 rounded-lg border border-border/30">
                    <div className="text-xs text-muted-foreground/70">{item.metric}</div>
                    <div className="text-lg font-bold text-primary mt-1">{item.target}</div>
                    <div className="text-xs text-muted-foreground/70 mt-1">{item.track}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Scaling */}
        <section id="scaling" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 7: Scaling</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 90-Day Results */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">90-Day Report Card</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/10">
                  <h4 className="font-semibold mb-3 text-foreground">Targets vs Actuals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Revenue (3 months)</span>
                      <span className="font-bold text-foreground">$45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Net Profit Margin</span>
                      <span className="font-bold text-foreground">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Wallet Holders</span>
                      <span className="font-bold text-foreground">300+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Repeat Rate</span>
                      <span className="font-bold text-foreground">2.7x</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-foreground">Key Learnings</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>• Token holders visit 2.7x more often</li>
                    <li>• Morning rush is make-or-break</li>
                    <li>• Simple menu = happy customers</li>
                    <li>• Word-of-mouth > paid ads</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Fundraising */}
            <Card className="p-8 hover:border-primary/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Mini-Presale Strategy</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold mb-3 text-foreground">Presale 2.0</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Goal</span>
                      <span className="font-bold text-foreground">$150,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Token Price</span>
                      <span className="font-bold text-foreground">$0.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Tokens for Sale</span>
                      <span className="font-bold text-foreground">1,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Vesting</span>
                      <span className="font-bold text-foreground">6-month linear</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-lg border border-blue-500/10">
                  <h4 className="font-semibold mb-2 text-foreground">Use of Funds</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Permanent location</span>
                      <span className="font-medium">$80k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Equipment upgrade</span>
                      <span className="font-medium">$30k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Working capital</span>
                      <span className="font-medium">$20k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Marketing</span>
                      <span className="font-medium">$15k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Legal/compliance</span>
                      <span className="font-medium">$5k</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Long-term Vision */}
        <section id="vision" className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold font-serif">Part 8: Long-term Vision</h2>
          </div>

          <Card className="p-8 md:p-12 hover:border-primary/40 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">The 5-Year Plan</h3>

            <div className="space-y-6">
              {[
                {
                  year: "Year 1 (2025)",
                  goals: ["Prove concept ✓", "Open permanent location", "List token", "500+ holders", "$300k revenue"],
                  highlight: "Break even"
                },
                {
                  year: "Year 2 (2026)",
                  goals: ["3 company locations", "Launch franchise", "2,000+ holders", "$1M+ revenue"],
                  highlight: "$200k+ profit"
                },
                {
                  year: "Year 3 (2027)",
                  goals: ["10 total locations", "3 countries", "10,000+ holders", "$5M+ revenue"],
                  highlight: "Launch $NOW platform"
                },
                {
                  year: "Year 4 (2028)",
                  goals: ["25 locations", "Major exchange listing", "50,000+ holders", "$15M+ revenue"],
                  highlight: "Global brand"
                },
                {
                  year: "Year 5 (2029)",
                  goals: ["50+ locations", "10+ countries", "200,000+ holders", "$50M+ revenue"],
                  highlight: "IPO or exit"
                }
              ].map((year, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary" />
                  {i < 4 && <div className="absolute left-2 top-4 w-0.5 h-full bg-border/40" />}

                  <div className="p-6 bg-card/50 rounded-lg border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg text-foreground">{year.year}</h4>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {year.highlight}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {year.goals.map((goal, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground/80">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* The $NOW Platform */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10">
              <h3 className="text-2xl font-bold mb-4">The Bigger Vision: $NOW Platform</h3>
              <p className="text-muted-foreground/80 mb-4">
                $COFFEE was proof. $NOW is the platform. Any business can tokenize.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-background/70 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-semibold text-sm mb-1">Revenue Model</h4>
                  <ul className="space-y-0.5 text-xs text-muted-foreground/70">
                    <li>• Setup: $5,000</li>
                    <li>• Monthly: $500</li>
                    <li>• Token sales: 2.5%</li>
                  </ul>
                </div>

                <div className="p-4 bg-background/70 rounded-lg">
                  <Users className="h-6 w-6 text-accent mb-2" />
                  <h4 className="font-semibold text-sm mb-1">Target Market</h4>
                  <ul className="space-y-0.5 text-xs text-muted-foreground/70">
                    <li>• Restaurants</li>
                    <li>• Gyms</li>
                    <li>• Retail stores</li>
                  </ul>
                </div>

                <div className="p-4 bg-background/70 rounded-lg">
                  <Globe className="h-6 w-6 text-green-500 mb-2" />
                  <h4 className="font-semibold text-sm mb-1">Impact</h4>
                  <ul className="space-y-0.5 text-xs text-muted-foreground/70">
                    <li>• Democratize ownership</li>
                    <li>• Align incentives</li>
                    <li>• Transparent economy</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Final Words */}
        <section className="mb-24">
          <Card className="p-8 md:p-12 border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-serif mb-6">You Have Everything You Need</h2>

              <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-8">
                This document contains everything required to go from idea to successful tokenized coffee shop
                to potential $50M+ business. What happens next is up to you.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                <div className="p-4 bg-background/70 rounded-lg">
                  <Rocket className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">The Reality</h4>
                  <p className="text-sm text-muted-foreground/70">It will be harder than described, but it's doable</p>
                </div>

                <div className="p-4 bg-background/70 rounded-lg">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">The Truth</h4>
                  <p className="text-sm text-muted-foreground/70">Your idea is sound, execution matters most</p>
                </div>

                <div className="p-4 bg-background/70 rounded-lg">
                  <Coffee className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Your Move</h4>
                  <p className="text-sm text-muted-foreground/70">Close this doc, open "Week 1 Tasks", start executing</p>
                </div>
              </div>

              <div className="text-3xl font-bold font-serif mb-4">
                Go make history.
              </div>

              <div className="text-4xl">
                🚀☕💎
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 text-center text-muted-foreground/60">
        <p>© 2025 $COFFEE. The world's first tokenized coffee shop.</p>
      </footer>
    </div>
  )
}