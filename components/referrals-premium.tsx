"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Users, Copy, Check, TrendingUp, DollarSign, Sparkles, Gift, Link2, Award, ArrowRight } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Aurora Background Component - Premium Version (same as portfolio)
function AuroraBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base - More vibrant */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20'
      }`} />
      
      {/* Aurora gradient orbs - More vivid */}
      <div className="absolute inset-0">
        {/* Primary orb */}
        <div
          className={`absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent' 
              : 'bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-transparent'
          } blur-3xl animate-float-slow`}
          style={{ animationDelay: '0s', animationDuration: '20s' }}
        />
        
        {/* Secondary orb */}
        <div
          className={`absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent' 
              : 'bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent'
          } blur-3xl animate-float-medium`}
          style={{ animationDelay: '5s', animationDuration: '25s' }}
        />
        
        {/* Accent orb */}
        <div
          className={`absolute top-3/4 left-1/3 w-[600px] h-[600px] rounded-full ${
            isDark 
              ? 'bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-transparent' 
              : 'bg-gradient-to-br from-pink-400/10 via-rose-400/10 to-transparent'
          } blur-3xl animate-float-fast`}
          style={{ animationDelay: '10s', animationDuration: '15s' }}
        />
      </div>
      
      {/* Mesh gradient overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-30'}`}
        style={{
          backgroundImage: `radial-gradient(at 40% 40%, ${
            isDark ? 'rgb(147, 51, 234)' : 'rgb(192, 132, 252)'
          } 0, transparent 50%),
          radial-gradient(at 80% 80%, ${
            isDark ? 'rgb(34, 211, 238)' : 'rgb(125, 211, 252)'
          } 0, transparent 50%),
          radial-gradient(at 20% 80%, ${
            isDark ? 'rgb(251, 113, 133)' : 'rgb(251, 146, 160)'
          } 0, transparent 50%)`
        }}
      />
    </div>
  )
}

// Floating Dollar Signs - Premium
function FloatingDollars({ isDark }: { isDark: boolean }) {
  const [dollars, setDollars] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; opacity: number }>>([])
  
  useEffect(() => {
    const newDollars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      opacity: isDark ? 0.015 : 0.025
    }))
    setDollars(newDollars)
  }, [isDark])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dollars.map((dollar) => (
        <div
          key={dollar.id}
          className={`absolute font-serif font-bold ${
            isDark 
              ? 'text-purple-400/30' 
              : 'bg-gradient-to-br from-purple-200 to-blue-200 bg-clip-text text-transparent'
          }`}
          style={{
            left: `${dollar.x}%`,
            top: `${dollar.y}%`,
            transform: `translate(-50%, -50%) rotate(${dollar.rotation}deg) scale(${dollar.scale})`,
            fontSize: `${4 + dollar.scale * 2}rem`,
            opacity: dollar.opacity,
            animation: `float-slow ${25 + Math.random() * 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            filter: 'blur(1px)'
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

export default function ReferralsPremium() {
  const [isDark, setIsDark] = useState(false)
  const [copied, setCopied] = useState(false)
  const referralCode = "SNOW2024PREMIUM"
  const referralLink = `https://now.fun/ref/${referralCode}`
  const { ready, authenticated, user, login, logout } = usePrivy()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mock referral data
  const referralStats = {
    totalReferred: 23,
    activeReferrals: 18,
    totalEarnings: 2456.78,
    pendingEarnings: 345.90,
    conversionRate: 78.26,
    tier: 'Gold'
  }

  // Mock referral activity
  const referrals = [
    {
      id: 1,
      user: "0x1234...5678",
      invested: 5000,
      earned: 250,
      status: "Active",
      joinedDate: "2024-01-15"
    },
    {
      id: 2,
      user: "0xABCD...EF01",
      invested: 2500,
      earned: 125,
      status: "Active",
      joinedDate: "2024-01-12"
    },
    {
      id: 3,
      user: "0x9876...5432",
      invested: 8000,
      earned: 400,
      status: "Active",
      joinedDate: "2024-01-10"
    },
    {
      id: 4,
      user: "0xDEAD...BEEF",
      invested: 0,
      earned: 0,
      status: "Pending",
      joinedDate: "2024-01-08"
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-white'} relative transition-colors`}>
      {/* Aurora Background */}
      <AuroraBackground isDark={isDark} />
      
      {/* Floating Dollar Signs */}
      <FloatingDollars isDark={isDark} />

      {/* Header - Clean Landing Page Style */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200/60'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/" className="group">
                <span className={`text-xl font-bold font-serif tracking-tight ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'
                } transition-opacity hover:opacity-70 duration-200`}>
                  Snowball
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-1">
                {["Trade", "Portfolio", "Referrals", "Leaderboard"].map((item) => {
                  const isActive = item === "Referrals"
                  return (
                    <a
                      key={item}
                      href={item === "Trade" ? "/explorer" : `/${item.toLowerCase()}`}
                      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
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
                  <span className="text-[13px] text-gray-500 font-medium">
                    {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                  </span>
                  <button
                    onClick={logout}
                    className={`h-8 px-4 text-[13px] font-medium rounded-full ${
                      isDark 
                        ? 'border border-gray-700 hover:bg-gray-800 text-gray-300' 
                        : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } transition-all`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  disabled={!ready}
                  className={`group h-8 px-4 text-[13px] font-medium rounded-full shadow-sm transition-all ${
                    isDark
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Sign In
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Referral Header */}
        <div className={`rounded-3xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-serif font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Referral Program
              </h1>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Earn rewards by inviting friends to invest in $NOW stores
              </p>
            </div>
            <div className={`px-4 py-2 rounded-xl ${
              referralStats.tier === 'Gold' 
                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30'
                : referralStats.tier === 'Silver'
                ? 'bg-gradient-to-r from-slate-500/20 to-slate-400/20 text-slate-400 border border-slate-500/30'
                : 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 border border-purple-500/30'
            } backdrop-blur-sm`}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm font-bold">{referralStats.tier} Tier</span>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-slate-800/30 border border-purple-500/10' 
              : 'bg-purple-50/30 border border-purple-200/20'
          } backdrop-blur-sm mb-6`}>
            <div className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your Referral Link
            </div>
            <div className="flex gap-3">
              <div className={`flex-1 p-3 rounded-xl ${
                isDark ? 'bg-slate-900/50' : 'bg-white/50'
              } backdrop-blur-sm font-mono text-sm`}>
                {referralLink}
              </div>
              <button
                onClick={() => handleCopy(referralLink)}
                className={`px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  copied 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                } shadow-lg`}
              >
                <span className="flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
            <div className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Referral Code: <span className="font-mono font-bold text-purple-400">{referralCode}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                icon: Users, 
                label: 'Total Referred', 
                value: referralStats.totalReferred,
                subValue: `${referralStats.activeReferrals} active`,
                color: 'purple'
              },
              { 
                icon: DollarSign, 
                label: 'Total Earnings', 
                value: `$${referralStats.totalEarnings.toLocaleString()}`,
                subValue: `$${referralStats.pendingEarnings} pending`,
                color: 'emerald'
              },
              { 
                icon: TrendingUp, 
                label: 'Conversion Rate', 
                value: `${referralStats.conversionRate}%`,
                subValue: 'Above average',
                color: 'blue'
              }
            ].map((stat) => (
              <div key={stat.label} className={`p-5 rounded-2xl ${
                isDark 
                  ? 'bg-slate-800/30 border border-purple-500/10' 
                  : 'bg-purple-50/30 border border-purple-200/20'
              } backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === 'purple' ? 'text-purple-400' :
                    stat.color === 'emerald' ? 'text-emerald-400' :
                    'text-blue-400'
                  }`} />
                </div>
                <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-xs mt-1 ${
                  stat.color === 'purple' ? 'text-purple-400' :
                  stat.color === 'emerald' ? 'text-emerald-400' :
                  'text-blue-400'
                }`}>
                  {stat.subValue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referrals Table */}
        <div className={`rounded-2xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl shadow-xl`}>
          <div className="p-6 border-b border-purple-500/10">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Referrals
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDark ? 'bg-slate-800/20' : 'bg-purple-50/20'}`}>
                <tr className="border-b border-purple-500/10">
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>User</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Invested</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Your Earnings</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Status</th>
                  <th className={`text-left px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-purple-500/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center`}>
                          <Users className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className={`font-mono text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {referral.user}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      ${referral.invested.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${
                      referral.earned > 0 ? 'text-emerald-400' : isDark ? 'text-slate-500' : 'text-slate-600'
                    }`}>
                      ${referral.earned.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        referral.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {referral.joinedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rewards Tiers */}
        <div className={`mt-8 rounded-2xl border ${
          isDark 
            ? 'border-purple-500/20 bg-slate-900/40' 
            : 'border-purple-200/30 bg-white/60'
        } backdrop-blur-xl p-6 shadow-xl`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Reward Tiers
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { tier: 'Bronze', referrals: '1-5', commission: '3%', color: 'from-orange-600 to-orange-400' },
              { tier: 'Silver', referrals: '6-15', commission: '4%', color: 'from-slate-500 to-slate-300' },
              { tier: 'Gold', referrals: '16+', commission: '5%', color: 'from-amber-500 to-yellow-400', active: true }
            ].map((tier) => (
              <div key={tier.tier} className={`p-4 rounded-xl ${
                tier.active 
                  ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30'
                  : isDark 
                    ? 'bg-slate-800/20 border border-slate-700/30' 
                    : 'bg-slate-50/20 border border-slate-200/30'
              } backdrop-blur-sm transition-all hover:scale-105`}>
                <div className={`text-lg font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-2`}>
                  {tier.tier}
                </div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
                  {tier.referrals} referrals
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tier.commission}
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  commission
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
