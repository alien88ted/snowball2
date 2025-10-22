"use client"

import { useState } from "react"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { useTheme } from "@/components/app-theme-provider"
import { usePrivy } from "@privy-io/react-auth"
import {
  Copy, Check, Users, TrendingUp, DollarSign,
  ArrowUpRight, Gift, Sun, Moon, Monitor,
  User, ChevronRight
} from "lucide-react"

type Tab = "overview" | "earnings" | "referrals"

const mockReferralData = {
  referralCode: "SNOW2024",
  referralLink: "https://now.fun/ref/SNOW2024",
  totalReferrals: 23,
  activeReferrals: 18,
  totalEarnings: 1234.56,
  pendingEarnings: 234.56,
  tier: 2,
  commission: 10,
  nextTierAt: 50,
  referrals: [
    { id: 1, user: "0xA4e5...8B21", date: "2024-01-15", invested: 5000, earned: 125.00, status: "active" },
    { id: 2, user: "0x7F3d...1C42", date: "2024-01-14", invested: 2500, earned: 62.50, status: "active" },
    { id: 3, user: "0x9E2a...5D67", date: "2024-01-12", invested: 1000, earned: 25.00, status: "active" }
  ]
}

function ReferralsContent() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const { theme, setTheme } = useTheme()
  const { ready, authenticated, user, login } = usePrivy()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="group">
                <span className="text-xl font-bold font-serif tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent transition-opacity hover:opacity-70 duration-200">
                  $now.fun
                </span>
              </a>

              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: "/explorer", label: "Trade" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/referrals", label: "Referrals" },
                  { href: "/leaderboard", label: "Leaderboard" }
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      item.href === "/referrals"
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded ${theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded ${theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded ${theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              {ready && authenticated ? (
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <span className="text-sm font-medium">
                    {user?.wallet?.address ? formatAddress(user.wallet.address) : 'Connected'}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn rewards by inviting others to invest
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Earnings</div>
            <div className="text-2xl font-bold">${mockReferralData.totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              <ArrowUpRight className="w-3 h-3 inline" />
              +12.5% this month
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Referrals</div>
            <div className="text-2xl font-bold">{mockReferralData.activeReferrals}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Of {mockReferralData.totalReferrals} total
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Commission Rate</div>
            <div className="text-2xl font-bold">{mockReferralData.commission}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Tier {mockReferralData.tier}
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
            <div className="text-2xl font-bold">${mockReferralData.pendingEarnings}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Next payout in 5 days
            </div>
          </div>
        </div>

        {/* Referral Link Box */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Referral Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg font-mono text-sm">
                  {mockReferralData.referralCode}
                </div>
                <button
                  onClick={() => copyToClipboard(mockReferralData.referralCode)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Share Link</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm truncate">
                  {mockReferralData.referralLink}
                </div>
                <button
                  onClick={() => copyToClipboard(mockReferralData.referralLink)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tier Progress</h2>
            <span className="px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-medium">
              Tier {mockReferralData.tier}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress to Tier {mockReferralData.tier + 1}</span>
              <span className="font-bold">
                {mockReferralData.totalReferrals} / {mockReferralData.nextTierAt} referrals
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 dark:bg-gray-100 rounded-full transition-all duration-500"
                style={{ width: `${(mockReferralData.totalReferrals / mockReferralData.nextTierAt) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tier 1</div>
                <div className="text-sm font-bold">5% Commission</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">0-10 referrals</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tier 2 (Current)</div>
                <div className="text-sm font-bold">10% Commission</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">11-49 referrals</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tier 3</div>
                <div className="text-sm font-bold">15% Commission</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">50+ referrals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'referrals', label: 'Referrals' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "referrals" && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Invested</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400">Earned</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockReferralData.referrals.map(referral => (
                  <tr key={referral.id} className="border-t border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="font-mono text-sm">{referral.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{referral.date}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm">${referral.invested.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm font-bold text-green-600 dark:text-green-400">
                      +${referral.earned.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default function ReferralsRefined() {
  return (
    <AppThemeProvider>
      <ReferralsContent />
    </AppThemeProvider>
  )
}