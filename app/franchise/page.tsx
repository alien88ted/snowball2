"use client"

import Link from "next/link"
import { ArrowRight, Store, Users, TrendingUp, Shield, Vote, Coins, Network, CheckCircle2, DollarSign, Globe, Sparkles, Target, Zap, Rocket, AlertCircle, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function FranchisePage() {
  const [mounted, setMounted] = useState(false)
  const [activeExample, setActiveExample] = useState(0)
  const [animatedRevenue, setAnimatedRevenue] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Animate revenue numbers
    const revenueTargets = [500000, 2500000, 5000000]
    const target = revenueTargets[activeExample]
    const duration = 1500
    const startTime = Date.now()

    const animateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedRevenue(Math.floor(target * eased))

      if (progress < 1) {
        requestAnimationFrame(animateNumber)
      }
    }

    animateNumber()
  }, [activeExample])

  if (!mounted) return null

  const networkExamples = [
    { franchises: 10, revenue: 500000, distribution: 50000 },
    { franchises: 50, revenue: 2500000, distribution: 250000 },
    { franchises: 100, revenue: 5000000, distribution: 500000 }
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92 pointer-events-none" />
      
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b-4 border-black">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#DC143C]" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#DC143C]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-black" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-black" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-black text-xs tracking-[0.3em] uppercase mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" />
                FRANCHISE NETWORK
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-serif text-black uppercase tracking-tight mb-6">
                LAUNCH YOUR<br/>
                <span className="text-[#DC143C]">FRANCHISE</span>
              </h1>
              
              <p className="text-xl text-black font-bold uppercase tracking-wider mb-8 max-w-2xl mx-auto">
                Community-funded stores where every customer is an owner
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
                <div className="border-4 border-black bg-white p-4 hover:bg-[#DC143C] hover:text-white transition-all group">
                  <div className="text-3xl font-black">33%</div>
                  <div className="text-xs font-bold uppercase">Profit Share</div>
                </div>
                <div className="border-4 border-black bg-white p-4 hover:bg-[#DC143C] hover:text-white transition-all group">
                  <div className="text-3xl font-black">$100</div>
                  <div className="text-xs font-bold uppercase">Min Invest</div>
                </div>
                <div className="border-4 border-black bg-white p-4 hover:bg-[#DC143C] hover:text-white transition-all group">
                  <div className="text-3xl font-black">24/7</div>
                  <div className="text-xs font-bold uppercase">Trading</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/franchise/apply">
                  <motion.button
                    className="px-8 py-4 border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-[0.2em] hover:bg-black hover:border-black transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      APPLY NOW
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/franchise/proposals">
                  <motion.button
                    className="px-8 py-4 border-4 border-black bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    VIEW PROPOSALS
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">001</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h2 className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">HOW IT WORKS</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "SUBMIT PROPOSAL", desc: "Share your vision and business plan", icon: FileText },
                { step: "02", title: "COMMUNITY VOTE", desc: "Token holders decide on approval", icon: Vote },
                { step: "03", title: "RAISE CAPITAL", desc: "Fund through token presale", icon: Coins },
                { step: "04", title: "LAUNCH & EARN", desc: "Open doors and share profits", icon: TrendingUp }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="border-4 border-black bg-white p-6 hover:bg-[#DC143C] hover:text-white transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl font-black text-[#DC143C] group-hover:text-white mb-4">{item.step}</div>
                  <item.icon className="w-8 h-8 mb-4 text-[#DC143C] group-hover:text-white" />
                  <h3 className="font-black uppercase mb-2">{item.title}</h3>
                  <p className="text-sm font-bold uppercase opacity-80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">002</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h2 className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">FRANCHISE BENEFITS</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-4 border-black bg-white p-8">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                  <Store className="w-6 h-6 text-[#DC143C]" />
                  FOR FRANCHISEES
                </h3>
                <ul className="space-y-4">
                  {[
                    "Instant access to capital",
                    "Built-in customer base",
                    "Marketing through community",
                    "Shared decision making",
                    "Lower risk model"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#DC143C] mt-0.5" />
                      <span className="font-bold uppercase">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-4 border-black bg-[#DC143C] p-8">
                <h3 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  FOR INVESTORS
                </h3>
                <ul className="space-y-4 text-white">
                  {[
                    "33% profit sharing",
                    "Monthly distributions",
                    "Tradeable tokens",
                    "Community governance",
                    "Transparent financials"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5" />
                      <span className="font-bold uppercase">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Network Effect */}
        <section className="py-20 bg-black border-b-4 border-[#DC143C]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black font-serif text-white uppercase mb-4">
                THE NETWORK EFFECT
              </h2>
              <p className="text-[#DC143C] font-bold uppercase tracking-wider">
                More franchises = More value for everyone
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {networkExamples.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExample(i)}
                  className={`border-4 p-6 transition-all ${
                    activeExample === i 
                      ? 'border-[#DC143C] bg-[#DC143C] text-white' 
                      : 'border-white bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-3xl font-black mb-2">{example.franchises}</div>
                  <div className="text-sm font-bold uppercase">Franchises</div>
                </button>
              ))}
            </div>

            <div className="border-4 border-white bg-white/10 p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-sm text-white/60 font-bold uppercase mb-2">Network Revenue</div>
                  <div className="text-4xl font-black text-[#DC143C]">
                    ${animatedRevenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/60 font-bold uppercase mb-2">Holder Distribution</div>
                  <div className="text-4xl font-black text-white">
                    ${(animatedRevenue * 0.33).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/60 font-bold uppercase mb-2">Per Franchise</div>
                  <div className="text-4xl font-black text-[#DC143C]">
                    ${Math.floor(animatedRevenue / networkExamples[activeExample].franchises).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">003</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h2 className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">REQUIREMENTS</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "KYC VERIFICATION", desc: "Identity & background check" },
                { icon: FileText, title: "BUSINESS PLAN", desc: "Detailed proposal & projections" },
                { icon: DollarSign, title: "FINANCIAL PROOF", desc: "Show funding capability" },
                { icon: Vote, title: "COMMUNITY APPROVAL", desc: "Pass token holder vote" }
              ].map((req, i) => (
                <div key={i} className="border-4 border-black bg-white p-6 hover:scale-[1.02] transition-transform">
                  <req.icon className="w-8 h-8 text-[#DC143C] mb-4" />
                  <h3 className="font-black uppercase mb-2">{req.title}</h3>
                  <p className="text-sm font-bold uppercase opacity-80">{req.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Opportunities */}
        <section className="py-20 border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">004</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h2 className="text-sm font-black text-[#DC143C] tracking-[0.3em] uppercase">OPEN OPPORTUNITIES</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  name: "COFFEE SHOP", 
                  locations: "NYC, LA, Miami", 
                  investment: "$50K - $200K",
                  status: "ACCEPTING"
                },
                {
                  name: "RETAIL STORE",
                  locations: "London, Paris, Tokyo",
                  investment: "$100K - $500K",
                  status: "VOTING"
                },
                {
                  name: "RESTAURANT",
                  locations: "Global",
                  investment: "$200K - $1M",
                  status: "COMING SOON"
                }
              ].map((opp, i) => (
                <div key={i} className="border-4 border-black bg-white overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className={`p-2 text-center font-black text-xs uppercase tracking-[0.3em] ${
                    opp.status === 'ACCEPTING' ? 'bg-[#DC143C] text-white' :
                    opp.status === 'VOTING' ? 'bg-black text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {opp.status}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase mb-2">{opp.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#DC143C]" />
                        <span className="font-bold uppercase">{opp.locations}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#DC143C]" />
                        <span className="font-bold uppercase">{opp.investment}</span>
                      </div>
                    </div>
                    {opp.status === 'ACCEPTING' && (
                      <Link href="/franchise/apply">
                        <button className="w-full mt-4 py-2 border-2 border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white transition-all font-black uppercase">
                          APPLY NOW
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#DC143C] border-b-4 border-black">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-black font-serif text-white uppercase mb-4">
              READY TO BUILD?
            </h2>
            <p className="text-xl text-white font-bold uppercase mb-8 max-w-2xl mx-auto">
              Join the revolution of community-owned businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/franchise/apply">
                <button className="px-10 py-4 border-4 border-white bg-white text-[#DC143C] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all">
                  START APPLICATION
                </button>
              </Link>
              <button className="px-10 py-4 border-4 border-white bg-transparent text-white font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#DC143C] transition-all">
                LEARN MORE
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}