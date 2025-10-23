"use client"

import { useState, useEffect } from "react"
import { 
  Moon, Sun, Users, Copy, Check, TrendingUp, 
  DollarSign, ArrowRight, ArrowUpRight, ArrowDownRight,
  Activity, Clock, Coffee, Building2, Sparkles,
  MapPin, Target, CircleDollarSign, ChevronRight
} from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Floating Dollar Background (from Trade page)
function FloatingDollars({ isDark }: { isDark: boolean }) {
  const [dollars, setDollars] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; opacity: number }>>([])
  
  useEffect(() => {
    const newDollars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100, 
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      opacity: isDark ? 0.03 : 0.05
    }))
    setDollars(newDollars)
  }, [isDark])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dollars.map((dollar) => (
        <div
          key={dollar.id}
          className="absolute font-serif font-bold text-gray-400"
          style={{
            left: `${dollar.x}%`,
            top: `${dollar.y}%`,
            transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
            fontSize: '4rem',
            opacity: dollar.opacity,
            animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

// Aurora Orbs (subtle, from Trade page)
function AuroraOrbs({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full ${
        isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'
      } blur-[100px] animate-float`} />
      <div className={`absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full ${
        isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'
      } blur-[100px] animate-float`} style={{ animationDelay: '3s' }} />
    </div>
  )
}

export default function ReferralsUltimate() {
  const [isDark, setIsDark] = useState(false)
  const [copied, setCopied] = useState(false)
  const referralCode = "REF2024"
  const referralLink = `https://now.fun/r/${referralCode}`
  const { ready, authenticated, user, login, logout } = usePrivy()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Stats based on actual platform model
  const stats = {
    totalReferred: 12,
    activeInvestors: 8,
    totalRaised: 45678,
    avgInvestment: 5709,
    commission: 345.67, // Simple 0.75% commission on raises
    commissionRate: '0.75%'
  }

  // Referrals with their actual presale investments
  const referrals = [
    {
      id: 1,
      wallet: "0x742d...5648",
      joinDate: "3 days ago",
      investments: [
        { project: "Bean & Brew Miami", amount: 2500, status: "Funded", profitShare: 33 },
        { project: "Urban Market LA", amount: 1500, status: "Funding", profitShare: 33 }
      ],
      totalInvested: 4000,
      commission: 30.00
    },
    {
      id: 2,
      wallet: "0xA3f9...2190",
      joinDate: "5 days ago",
      investments: [
        { project: "Style House NYC", amount: 5000, status: "Funded", profitShare: 33 }
      ],
      totalInvested: 5000,
      commission: 37.50
    },
    {
      id: 3,
      wallet: "0x5B2c...8734",
      joinDate: "1 week ago",
      investments: [
        { project: "Bean & Brew Miami", amount: 1000, status: "Funded", profitShare: 33 },
        { project: "Fresh Bites Chicago", amount: 2500, status: "Funding", profitShare: 33 },
        { project: "Urban Market LA", amount: 1500, status: "Funding", profitShare: 33 }
      ],
      totalInvested: 5000,
      commission: 37.50
    },
    {
      id: 4,
      wallet: "0x9E1d...3456",
      joinDate: "2 weeks ago",
      investments: [],
      totalInvested: 0,
      commission: 0
    },
    {
      id: 5,
      wallet: "0xC4a2...9821",
      joinDate: "2 weeks ago",
      investments: [
        { project: "Bean & Brew Miami", amount: 10000, status: "Funded", profitShare: 33 },
        { project: "Style House NYC", amount: 7500, status: "Funded", profitShare: 33 },
        { project: "Fresh Bites Chicago", amount: 3500, status: "Funding", profitShare: 33 }
      ],
      totalInvested: 21000,
      commission: 157.50
    },
    {
      id: 6,
      wallet: "0xD8f2...1234",
      joinDate: "3 weeks ago",
      investments: [
        { project: "Urban Market LA", amount: 3000, status: "Funding", profitShare: 33 }
      ],
      totalInvested: 3000,
      commission: 22.50
    },
    {
      id: 7,
      wallet: "0xE7a9...5678",
      joinDate: "1 month ago",
      investments: [
        { project: "Bean & Brew Miami", amount: 1500, status: "Funded", profitShare: 33 }
      ],
      totalInvested: 1500,
      commission: 11.25
    },
    {
      id: 8,
      wallet: "0xF3b1...9012",
      joinDate: "1 month ago",
      investments: [
        { project: "Style House NYC", amount: 2000, status: "Funded", profitShare: 33 },
        { project: "Fresh Bites Chicago", amount: 2000, status: "Funding", profitShare: 33 }
      ],
      totalInvested: 4000,
      commission: 30.00
    }
  ]

  // Top projects your referrals invested in
  const topProjects = [
    { name: "Bean & Brew Miami", investors: 5, raised: 16500, icon: Coffee },
    { name: "Style House NYC", investors: 3, raised: 14500, icon: Building2 },
    { name: "Fresh Bites Chicago", investors: 3, raised: 8000, icon: Coffee },
    { name: "Urban Market LA", investors: 3, raised: 6000, icon: Building2 }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} relative transition-colors`}>
      {/* Background Effects */}
      <FloatingDollars isDark={isDark} />
      <AuroraOrbs isDark={isDark} />

      {/* Header - Clean like Trade page */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className={`text-xl font-bold font-serif tracking-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                } group-hover:opacity-80 transition-opacity`}>
                  Snowball
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-1">
                {["Trade", "Portfolio", "Referrals", "Leaderboard"].map((item) => {
                  const isActive = item === "Referrals"
                  return (
                    <a
                      key={item}
                      href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? isDark ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                          : isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </a>
                  )
                })}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              >
                {isDark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </button>
              {ready && authenticated ? (
                <>
                  <span className="text-sm text-gray-500">
                    {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className={`px-3 py-1.5 text-sm rounded-full border ${
                      isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
                    } transition-all`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  disabled={!ready}
                  className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-all"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header Section with Link */}
        <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-8 mb-6`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Your Referrals
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Earn {stats.commissionRate} commission when your referrals invest in $NOW projects
              </p>
            </div>
          </div>

          {/* Referral Link */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <label className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} block mb-2`}>
              YOUR REFERRAL LINK
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm ${
                  isDark ? 'bg-gray-900 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-gray-300'
                } border focus:outline-none`}
              />
              <button
                onClick={() => handleCopy(referralLink)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  copied 
                    ? 'bg-emerald-500 text-white' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Total Referred
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalReferred}
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Active Investors
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.activeInvestors}
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                Total Raised
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ${(stats.totalRaised / 1000).toFixed(1)}k
              </div>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
              <div className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>
                Your Commission
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ${stats.commission.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Referrals List */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}>
              <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Referral Activity
                </h2>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {referrals.map((referral) => (
                  <div key={referral.id} className={`p-6 hover:${isDark ? 'bg-gray-800/30' : 'bg-gray-50'} transition-colors`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className={`font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {referral.wallet}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          Joined {referral.joinDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          referral.commission > 0 ? 'text-emerald-500' : isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          +${referral.commission.toFixed(2)}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          commission
                        </div>
                      </div>
                    </div>

                    {referral.investments.length > 0 ? (
                      <div className="space-y-2">
                        {referral.investments.map((inv, i) => (
                          <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${
                            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-3">
                              <Coffee className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                              <div>
                                <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {inv.project}
                                </div>
                                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                  {inv.profitShare}% profit share
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                ${inv.amount.toLocaleString()}
                              </div>
                              <div className={`text-xs ${
                                inv.status === 'Funded' 
                                  ? 'text-emerald-500' 
                                  : 'text-amber-500'
                              }`}>
                                {inv.status}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className={`text-xs text-right ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                          Total invested: ${referral.totalInvested.toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} italic`}>
                        No investments yet
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel - Top Projects */}
          <div>
            <div className={`rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'} p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Popular with Referrals
              </h3>
              
              <div className="space-y-3">
                {topProjects.map((project, i) => (
                  <div key={i} className={`p-3 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <project.icon className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {project.name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          {project.investors} of your referrals invested
                        </div>
                        <div className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mt-2`}>
                          ${(project.raised / 1000).toFixed(1)}k raised
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simple commission info */}
              <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-800/30' : 'bg-gradient-to-br from-gray-50 to-gray-100/50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                  COMMISSION STRUCTURE
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.commissionRate}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  On all referral investments
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
