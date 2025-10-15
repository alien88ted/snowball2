"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp, Users, Globe, Shield, Award, Star, DollarSign, BarChart3, ChevronRight, Rocket, Lock, Coins, Target, MapPin, Wallet, Coffee, Clock, Building2 } from "lucide-react"
import { FooterSection } from "@/components/footer-section"

// Clean, elegant background with subtle gradients
function PremiumBackground() {
  return (
    <>
      {/* Subtle gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-background to-accent/[0.02]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/[0.08] via-transparent to-transparent blur-3xl" />
      </div>
    </>
  )
}

// Clean gradient text component
function GradientText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

// Premium card with corner decorations
function PremiumCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <div
      className={`relative group ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-top-3 group-hover:-left-3" />
      <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-top-3 group-hover:-right-3" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-accent/40 rounded-bl-xl transition-all duration-500 group-hover:border-accent/60 group-hover:-bottom-3 group-hover:-left-3" />
      <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-xl transition-all duration-500 group-hover:border-primary/60 group-hover:-bottom-3 group-hover:-right-3" />

      <Card className="relative bg-white/80 backdrop-blur-xl border-2 border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.2)] overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </div>
  )
}

// Animated counter component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const start = Date.now()
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      setCount(Math.floor(value * progress))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="font-mono tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast Launch",
      description: "Get your business tokenized and funded in under 48 hours",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-signature wallets and audited smart contracts",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track performance with live revenue and investor dashboards",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with investors and entrepreneurs worldwide",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { value: 127, label: "Businesses Funded", prefix: "", suffix: "+" },
    { value: 8.4, label: "Million Raised", prefix: "$", suffix: "M" },
    { value: 45000, label: "Active Investors", prefix: "", suffix: "+" },
    { value: 315, label: "Average ROI", prefix: "", suffix: "%" }
  ]

  const testimonials = [
    {
      quote: "Transformed our family bakery into a thriving franchise with community backing.",
      author: "Sarah Chen",
      role: "Founder, Sweet Dreams Bakery",
      rating: 5
    },
    {
      quote: "The transparency and ease of investment is unlike anything I've experienced.",
      author: "Marcus Rodriguez",
      role: "Angel Investor",
      rating: 5
    },
    {
      quote: "We raised $500K in 72 hours and our investors are now our biggest advocates.",
      author: "Emily Watson",
      role: "CEO, TechHub Spaces",
      rating: 5
    }
  ]

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative">
      <PremiumBackground />

      {/* Clean Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-6">
        {/* Subtle corner accents */}
        <div className="absolute inset-8 md:inset-12 lg:inset-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          {/* Clean badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Coffee className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              $COFFEE Now Live • Own Real Business Equity
            </span>
          </div>

          {/* Clean, powerful heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8">
            <div className="mb-2">
              Invest in <GradientText>Local Businesses</GradientText>
            </div>
            <div>
              Earn From Every Sale
            </div>
          </h1>

          {/* Clear subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Start with $100. Get real equity. Earn monthly revenue share from businesses you believe in.
          </p>

          {/* Clean CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/explorer">
              <Button className="h-12 px-8 text-base bg-black hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg group">
                Explore Opportunities
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button variant="outline" className="h-12 px-8 text-base font-semibold rounded-xl border-2 hover:bg-muted/50 transition-all duration-200">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>$100 minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>SEC compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Monthly payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: $COFFEE - Perfected */}
      <section className="py-32 px-6 relative bg-black text-white overflow-hidden">
        {/* Refined background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,1) 79px, rgba(255,255,255,1) 80px)`,
          }} />
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Typography Header - Refined */}
          <div className="mb-20">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-[0.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">LAUNCH 001</span>
              <div className="h-[0.5px] bg-gradient-to-l from-transparent via-white/20 to-transparent flex-1" />
            </div>

            <h2 className="text-7xl md:text-9xl font-serif font-bold text-center leading-[0.85] tracking-tight mb-8">
              <span className="block text-white/20 text-5xl md:text-6xl mb-2">$</span>
              <span className="block">COFFEE</span>
            </h2>

            <p className="text-center text-white/50 max-w-lg mx-auto leading-relaxed text-sm">
              A radical experiment in shared ownership. Employees are owners. Customers are investors. Profits flow to those who build it.
            </p>
          </div>

          {/* Refined Grid Layout */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {/* Main Investment Card - Perfected */}
            <div className="md:col-span-2 relative group">
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-none" />
              <div className="relative p-10 h-full flex flex-col justify-between border border-white/10">
                <div>
                  <div className="mb-12">
                    <div className="text-6xl font-serif mb-3">$0.15</div>
                    <div className="text-white/40 text-xs font-mono uppercase tracking-wider">Per token · Early access pricing</div>
                  </div>

                  <div className="space-y-0">
                    <div className="flex items-center justify-between py-4 border-t border-white/10">
                      <span className="text-white/50 text-sm">Revenue Distribution</span>
                      <span className="font-mono text-lg">33%</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-white/10">
                      <span className="text-white/50 text-sm">Token Supply</span>
                      <span className="font-mono text-lg">100M</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-y border-white/10">
                      <span className="text-white/50 text-sm">Minimum Entry</span>
                      <span className="font-mono text-lg">$100</span>
                    </div>
                  </div>
                </div>

                <Link href="/explorer/coffee" className="mt-12">
                  <div className="relative overflow-hidden group/btn">
                    <div className="absolute inset-0 bg-white transition-transform duration-300 transform -translate-x-full group-hover/btn:translate-x-0" />
                    <div className="relative px-8 py-4 bg-white text-black font-medium text-sm tracking-wide text-center transition-colors duration-300 group-hover/btn:text-black">
                      EXPLORE OPPORTUNITY →
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Side Info Stack - Refined */}
            <div className="space-y-4">
              {/* Location */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
                <div className="relative p-6 border border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-3">LOCATION</div>
                  <div className="text-xl font-medium">Beirut</div>
                  <div className="text-white/40 text-sm">Lebanon</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
                <div className="relative p-6 border border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-3">TIMELINE</div>
                  <div className="text-xl font-medium">Q4 2025</div>
                  <div className="text-white/40 text-sm">Launch Date</div>
                </div>
              </div>

              {/* Status Indicator - Refined */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
                <div className="relative p-6 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-green-400/90">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Statement - Perfected */}
          <div className="relative mb-20">
            <div className="border-t border-b border-white/10 py-16">
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-white/30 text-center mb-12">CORE PRINCIPLES</h3>
              <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-5xl font-serif text-white/10 mb-4">01</div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Employees don't just work here.<br/>They own equity from day one.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-serif text-white/10 mb-4">02</div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Every purchase contributes to<br/>a business you partially own.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-serif text-white/10 mb-4">03</div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Profits flow back to the<br/>community that built it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Actions - Perfected */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-8 text-xs">
              <Link href="/logo" className="text-white/40 hover:text-white transition-all duration-300 font-mono uppercase tracking-wider">
                Brand Assets
              </Link>
              <span className="text-white/20">·</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('9tH8oUjnjX4pzr6aRmo9V3ESoAZ2yUBQDzgBhfJNc6rM');
                  // Optional: Add a subtle feedback
                }}
                className="text-white/40 hover:text-white transition-all duration-300 font-mono uppercase tracking-wider"
              >
                Contract Address
              </button>
              <span className="text-white/20">·</span>
              <Link href="/explorer/coffee" className="text-white/40 hover:text-white transition-all duration-300 font-mono uppercase tracking-wider">
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to invest confidently and grow your wealth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <PremiumCard key={i}>
                <div className="p-6">
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Opportunities",
                description: "Explore vetted businesses with transparent financials and growth plans",
                icon: Globe
              },
              {
                step: "2",
                title: "Invest & Own",
                description: "Buy tokens starting at $100 and become a partial owner",
                icon: Wallet
              },
              {
                step: "3",
                title: "Earn Monthly",
                description: "Receive automatic revenue share distributions to your wallet",
                icon: Coins
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <PremiumCard>
                  <div className="p-6">
                    <div className="w-10 h-10 mb-4 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </PremiumCard>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What Investors Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 border-2">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-base mb-4 text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Ready to Start <GradientText>Investing?</GradientText>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Join thousands building wealth through community-powered businesses
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorer">
              <Button className="h-12 px-8 text-base bg-black hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg group">
                Start Investing Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/franchise/apply">
              <Button variant="outline" className="h-12 px-8 text-base font-semibold rounded-xl border-2 hover:bg-muted/50 transition-all duration-200">
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />

      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Better text rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Focus states */
        *:focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </main>
  )
}
