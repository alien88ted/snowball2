"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp, Users, Globe, Shield, Award, Star, DollarSign, BarChart3, ChevronRight, Rocket, Lock, Coins, Target, MapPin, Wallet } from "lucide-react"
import { FooterSection } from "@/components/footer-section"

// Ultra-premium animated background with particles and gradients
function PremiumBackground() {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.02]" />

      {/* Floating particles */}
      <div className="fixed inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
    </>
  )
}

// Animated text gradient component
function GradientText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-primary via-purple-500 to-accent bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent ${className}`}>
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

export default function UltraPremiumLandingPage() {
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

      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
        {/* Animated border frame */}
        <div className="absolute inset-4 md:inset-8 lg:inset-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-accent/20 rounded-tr-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-accent/20 rounded-bl-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20 rounded-br-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 border border-primary/20 backdrop-blur-xl mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              The Future of Business Ownership is Here
            </span>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </div>

          {/* Main heading with premium typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[-0.03em] leading-[0.9] mb-8 animate-fade-in-up">
            <div className="mb-4">
              <GradientText>Own Pieces</GradientText>
            </div>
            <div className="mb-4">
              of <span className="text-foreground">Real Businesses</span>
            </div>
            <div>
              <span className="text-foreground">Earn From</span> <GradientText>Every Sale</GradientText>
            </div>
          </h1>

          {/* Premium subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Revolutionary platform connecting ambitious businesses with smart investors through{" "}
            <span className="text-foreground font-semibold">tokenized equity</span> and{" "}
            <span className="text-foreground font-semibold">transparent revenue sharing</span>
          </p>

          {/* Premium CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Link href="/explorer">
              <Button className="h-14 px-8 text-lg bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 group">
                <Rocket className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Opportunities
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>

            <Button variant="outline" className="h-14 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-white/50 backdrop-blur-xl transition-all duration-300 hover:scale-105 group">
              <Globe className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Watch Demo
              <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-primary to-accent text-white rounded-full">
                2 min
              </span>
            </Button>
          </div>

          {/* Animated trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: "SEC Compliant", subtext: "Fully regulated" },
              { icon: Lock, text: "Bank-Grade Security", subtext: "256-bit encryption" },
              { icon: Award, text: "Audited Smart Contracts", subtext: "By CertiK" }
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/60 animate-fade-in-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">{item.text}</div>
                  <div className="text-xs text-muted-foreground">{item.subtext}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <PremiumCard key={i} delay={i * 100}>
                <div className="p-8 text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    {mounted && <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />}
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-xl mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] mb-6">
              Everything You Need to <GradientText>Succeed</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools and features designed to help businesses thrive and investors prosper
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <PremiumCard
                key={i}
                className="animate-fade-in-up"
                delay={i * 100}
              >
                <div
                  className="p-8 text-center hover:scale-[1.02] transition-transform duration-300"
                  onMouseEnter={() => setHoveredCard(feature.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3.5 shadow-lg transform transition-all duration-300 ${hoveredCard === feature.title ? 'rotate-12 scale-110' : ''}`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium How It Works Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl mb-6">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-green-700">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] mb-6">
              Start Earning in <GradientText>3 Simple Steps</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Browse Opportunities",
                description: "Explore vetted businesses seeking investment, complete with financials and growth plans",
                icon: Globe
              },
              {
                step: "02",
                title: "Invest & Own",
                description: "Buy tokens starting at $100 and become a partial owner with voting rights",
                icon: Wallet
              },
              {
                step: "03",
                title: "Earn Revenue Share",
                description: "Receive automatic monthly distributions from business profits directly to your wallet",
                icon: Coins
              }
            ].map((item, i) => (
              <PremiumCard key={i} delay={i * 150}>
                <div className="p-8 relative">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="text-6xl font-serif font-bold bg-gradient-to-br from-primary/20 to-accent/20 bg-clip-text text-transparent mb-4">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 mb-4 p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent">
                      <item.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-xl mb-6">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-yellow-700">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em]">
              Loved by <GradientText>Thousands</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <PremiumCard key={i} delay={i * 100}>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-accent/10" />

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-primary/20 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">Limited Time Offer</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] mb-6">
            Ready to <GradientText>Transform Your Future?</GradientText>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of investors and entrepreneurs building wealth through community-powered businesses
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorer">
              <Button className="h-16 px-10 text-xl bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-110 group">
                <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Start Investing Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
              </Button>
            </Link>

            <Link href="/franchise/apply">
              <Button variant="outline" className="h-16 px-10 text-xl font-bold rounded-2xl border-2 hover:bg-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 group">
                <Target className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                List Your Business
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Start with $100</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  )
}