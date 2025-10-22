"use client"

import { useState } from "react"
import { AppHeaderPerfect } from "@/components/app-header-perfect"
import { AppThemeProvider } from "@/components/app-theme-provider"
import { 
  Users,
  Gift,
  Link2,
  Copy,
  TrendingUp,
  Award,
  DollarSign,
  Target,
  Zap,
  Share2,
  Twitter,
  MessageCircle,
  Send,
  ArrowUpRight,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Trophy
} from "lucide-react"

interface ReferralStats {
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  pendingRewards: number
  tierProgress: number
  currentTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  nextTierReferrals: number
  conversionRate: number
}

interface Referral {
  id: string
  username: string
  joinedDate: string
  status: 'active' | 'pending' | 'inactive'
  invested: number
  yourEarnings: number
  level: number
}

const referralStats: ReferralStats = {
  totalReferrals: 47,
  activeReferrals: 32,
  totalEarnings: 2847.50,
  pendingRewards: 425.00,
  tierProgress: 65,
  currentTier: 'silver',
  nextTierReferrals: 18,
  conversionRate: 68.1
}

const referrals: Referral[] = [
  { id: '1', username: 'alex.eth', joinedDate: '2024-03-15', status: 'active', invested: 5000, yourEarnings: 250, level: 1 },
  { id: '2', username: 'maria_trader', joinedDate: '2024-03-14', status: 'active', invested: 10000, yourEarnings: 500, level: 1 },
  { id: '3', username: 'john.sol', joinedDate: '2024-03-13', status: 'pending', invested: 0, yourEarnings: 0, level: 1 },
  { id: '4', username: 'crypto_whale', joinedDate: '2024-03-12', status: 'active', invested: 25000, yourEarnings: 1250, level: 1 },
  { id: '5', username: 'defi_master', joinedDate: '2024-03-10', status: 'active', invested: 7500, yourEarnings: 375, level: 2 }
]

const tierBenefits = {
  bronze: { color: 'from-orange-400 to-orange-600', bgColor: 'from-orange-50 to-orange-100', commission: 5, bonus: 0, referralsNeeded: 0 },
  silver: { color: 'from-gray-400 to-gray-600', bgColor: 'from-gray-50 to-gray-100', commission: 7.5, bonus: 100, referralsNeeded: 10 },
  gold: { color: 'from-yellow-400 to-yellow-600', bgColor: 'from-yellow-50 to-yellow-100', commission: 10, bonus: 500, referralsNeeded: 50 },
  platinum: { color: 'from-purple-400 to-purple-600', bgColor: 'from-purple-50 to-purple-100', commission: 15, bonus: 2000, referralsNeeded: 100 }
}

export default function ReferralsRedesigned() {
  const [copied, setCopied] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'earnings'>('overview')
  
  const referralLink = 'https://now.fun/ref/USER123'
  const referralCode = 'NOWFUN123'

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text)
    if (isCode) {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } else {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AppThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 transition-colors duration-500">
        <AppHeaderPerfect />

      {/* Header */}
      <div className="pt-20 pb-10 bg-gradient-to-b from-white via-white to-gray-50/50 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-3">
                Referral Program
              </h1>
              <p className="text-gray-600 text-lg">
                Earn rewards by inviting friends to invest
              </p>
            </div>
            
            <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Claim ${referralStats.pendingRewards.toFixed(2)}
            </button>
          </div>

          {/* Tier Progress Card */}
          <div className={`p-6 bg-gradient-to-br ${tierBenefits[referralStats.currentTier].bgColor} rounded-xl border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 bg-gradient-to-br ${tierBenefits[referralStats.currentTier].color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Current Tier</div>
                  <div className="text-2xl font-bold text-gray-900 capitalize mb-1">
                    {referralStats.currentTier} Member
                  </div>
                  <div className="text-sm text-gray-600">
                    {tierBenefits[referralStats.currentTier].commission}% commission • ${tierBenefits[referralStats.currentTier].bonus} monthly bonus
                  </div>
                </div>
              </div>
              
              {referralStats.currentTier !== 'platinum' && (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Next tier: {referralStats.nextTierReferrals} more referrals</div>
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                      style={{ width: `${referralStats.tierProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Referrals</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +12 this month
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Users</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{referralStats.activeReferrals}</div>
              <div className="text-xs text-gray-500 mt-1">{referralStats.conversionRate}% conversion</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Earned</span>
                <DollarSign className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">${(referralStats.totalEarnings / 1000).toFixed(1)}K</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +$847 this month
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pending</span>
                <Gift className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">${referralStats.pendingRewards}</div>
              <div className="text-xs text-gray-500 mt-1">Ready to claim</div>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex items-center gap-2 mt-8">
            {[
              { id: 'overview', label: 'Overview', icon: Sparkles },
              { id: 'referrals', label: 'My Referrals', icon: Users },
              { id: 'earnings', label: 'Earnings', icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Referral Links */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Referral Links</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Referral Link</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(referralLink)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                          copied 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Referral Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralCode}
                        readOnly
                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-bold text-center"
                      />
                      <button
                        onClick={() => copyToClipboard(referralCode, true)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                          copiedCode 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Share on social media</p>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Telegram
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      More
                    </button>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Share Your Link', desc: 'Send your unique referral link to friends' },
                    { step: 2, title: 'Friends Join', desc: 'They sign up and start investing in projects' },
                    { step: 3, title: 'Earn Commissions', desc: 'Get up to 15% commission on their investments' },
                    { step: 4, title: 'Level Up', desc: 'Increase your tier for higher rewards' }
                  ].map(item => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tier Benefits</h3>
                <div className="space-y-3">
                  {Object.entries(tierBenefits).map(([tier, benefits]) => {
                    const isCurrentTier = tier === referralStats.currentTier
                    return (
                      <div 
                        key={tier} 
                        className={`p-3 rounded-lg border ${
                          isCurrentTier 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-medium capitalize ${
                            isCurrentTier ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {tier}
                            {isCurrentTier && <span className="ml-2 text-xs">(Current)</span>}
                          </span>
                          <div className={`w-8 h-8 bg-gradient-to-br ${benefits.color} rounded-lg flex items-center justify-center`}>
                            <Award className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>{benefits.commission}% commission</div>
                          <div>${benefits.bonus} monthly bonus</div>
                          <div>{benefits.referralsNeeded}+ referrals</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Level</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Invested</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">Your Earnings</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(referral => (
                  <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {referral.username[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{referral.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{referral.joinedDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'active' ? 'bg-green-100 text-green-700' :
                        referral.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">Level {referral.level}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                      ${referral.invested.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-bold text-green-600">
                      +${referral.yourEarnings.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </main>
    </AppThemeProvider>
  )
}
