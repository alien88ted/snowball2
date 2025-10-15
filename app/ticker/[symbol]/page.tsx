"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Shield, Coffee, Building2, DollarSign, Globe, ChevronRight, Sparkles, CheckCircle2, MapPin, Calculator, Coins, Vote, ChartBar, Zap, ArrowLeft, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"

// Ticker data - in production this would come from a database
const tickerData: Record<string, any> = {
  coffee: {
    symbol: "COFFEE",
    name: "$coffee",
    tagline: "The future of coffee shops",
    description: "Tokenized coffee empire starting in Beirut. Real equity, 33% profit share, DAO governance.",
    emoji: "☕",
    color: "amber",
    gradientFrom: "amber-600",
    gradientTo: "orange-600",
    status: "presale",
    raised: 68500,
    goal: 100000,
    tokenPrice: 0.15,
    totalSupply: "100M",
    profitShare: 33,
    location: "Beirut, Lebanon",
    launchDate: "2025",
    highlights: [
      "First location opening in Beirut",
      "33% of profits to token holders",
      "Customer rewards program",
      "DAO governance",
      "50+ locations planned"
    ],
    metrics: {
      monthlyRevenue: "$25K expected",
      profitMargin: "15-25%",
      yearOneLocations: 1,
      yearTenLocations: 50
    }
  },
  ramen: {
    symbol: "RAMEN",
    name: "$ramen",
    tagline: "Authentic Japanese ramen chain",
    description: "Premium ramen restaurants with profit sharing. From Tokyo techniques to global expansion.",
    emoji: "🍜",
    color: "red",
    gradientFrom: "red-600",
    gradientTo: "rose-600",
    status: "coming_soon",
    raised: 0,
    goal: 250000,
    tokenPrice: 0.25,
    totalSupply: "100M",
    profitShare: 30,
    location: "Tokyo, Japan",
    launchDate: "Q2 2025",
    highlights: [
      "Master chef from Tokyo",
      "30% profit distribution",
      "Exclusive member benefits",
      "Recipe NFTs for holders",
      "Asia-Pacific focus"
    ],
    metrics: {
      monthlyRevenue: "$40K expected",
      profitMargin: "20-30%",
      yearOneLocations: 2,
      yearTenLocations: 75
    }
  },
  gym: {
    symbol: "GYM",
    name: "$gym",
    tagline: "Community-owned fitness empire",
    description: "24/7 gyms where members are owners. Work out, earn tokens, share profits.",
    emoji: "💪",
    color: "green",
    gradientFrom: "green-600",
    gradientTo: "emerald-600",
    status: "coming_soon",
    raised: 0,
    goal: 500000,
    tokenPrice: 0.50,
    totalSupply: "50M",
    profitShare: 35,
    location: "Miami, USA",
    launchDate: "Q3 2025",
    highlights: [
      "24/7 access for holders",
      "35% profit share",
      "Earn tokens for workouts",
      "Premium equipment",
      "Global expansion plan"
    ],
    metrics: {
      monthlyRevenue: "$50K expected",
      profitMargin: "30-40%", 
      yearOneLocations: 1,
      yearTenLocations: 100
    }
  }
}

export default function TickerPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const ticker = tickerData[symbol] || tickerData.coffee
  
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const progress = (ticker.raised / ticker.goal) * 100

  // Investment tiers
  const tiers = [
    {
      amount: "$100",
      tokens: Math.floor(100 / ticker.tokenPrice).toLocaleString(),
      popular: false
    },
    {
      amount: "$1,000",
      tokens: Math.floor(1000 / ticker.tokenPrice).toLocaleString(),
      popular: true
    },
    {
      amount: "$10,000",
      tokens: Math.floor(10000 / ticker.tokenPrice).toLocaleString(),
      popular: false
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      {/* Header Navigation */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/explorer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/apy?ticker=${symbol}`}>
              <Button variant="outline" size="sm">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Returns
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.1),transparent_50%)]`} />
        
        <div className="max-w-6xl mx-auto">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            {ticker.status === "presale" ? (
              <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-300">
                <Sparkles className="w-3 h-3 mr-2" />
                Presale Live
              </Badge>
            ) : ticker.status === "coming_soon" ? (
              <Badge className="px-4 py-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                <Zap className="w-3 h-3 mr-2" />
                Coming {ticker.launchDate}
              </Badge>
            ) : (
              <Badge className="px-4 py-2 bg-blue-100 text-blue-800 border-blue-300">
                <TrendingUp className="w-3 h-3 mr-2" />
                Trading Live
              </Badge>
            )}
          </motion.div>

          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="text-8xl mb-6">{ticker.emoji}</div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4">
              <span className={`bg-gradient-to-r from-${ticker.gradientFrom} to-${ticker.gradientTo} bg-clip-text text-transparent`}>
                {ticker.name}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              {ticker.tagline}
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {ticker.description}
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold font-mono">${ticker.tokenPrice}</div>
              <div className="text-sm text-muted-foreground">Token Price</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{ticker.profitShare}%</div>
              <div className="text-sm text-muted-foreground">Profit Share</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{ticker.totalSupply}</div>
              <div className="text-sm text-muted-foreground">Total Supply</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{ticker.location}</div>
              <div className="text-sm text-muted-foreground">First Location</div>
            </Card>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className={`text-lg px-8 py-6 bg-gradient-to-r from-${ticker.gradientFrom} to-${ticker.gradientTo} shadow-xl`}>
              Buy ${ticker.symbol} Tokens
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <ExternalLink className="mr-2 w-5 h-5" />
              View on DEX
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Funding Progress */}
      {ticker.status === "presale" && (
        <section className="py-12 px-6 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 border-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Presale Progress</h3>
                  <p className="text-muted-foreground">Help launch {ticker.name}</p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  LIVE
                </Badge>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-bold">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border">
                  <div 
                    className={`h-full bg-gradient-to-r from-${ticker.gradientFrom} to-${ticker.gradientTo} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold font-mono">${ticker.raised.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Raised</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">${ticker.goal.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">{Math.floor(ticker.raised / ticker.tokenPrice).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Tokens Sold</div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Investment Options */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Investment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-6 ${tier.popular ? 'border-2 border-primary' : ''}`}>
                  {tier.popular && (
                    <Badge className="mb-3">Most Popular</Badge>
                  )}
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold mb-2">{tier.amount}</div>
                    <div className="text-muted-foreground">{tier.tokens} tokens</div>
                  </div>
                  <Button className={`w-full ${tier.popular ? `bg-gradient-to-r from-${ticker.gradientFrom} to-${ticker.gradientTo}` : ''}`} variant={tier.popular ? "default" : "outline"}>
                    Invest {tier.amount}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Key Highlights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ticker.highlights.map((highlight: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className={`w-5 h-5 text-${ticker.color}-600 flex-shrink-0 mt-0.5`} />
                <span>{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Metrics */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Business Projections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(ticker.metrics).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="text-xl font-bold">{value}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
