"use client"

import { useState, useEffect } from "react"
import { 
  X, 
  TrendingUp, 
  Users, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  DollarSign,
  Target,
  Shield,
  Percent,
  Calendar,
  BarChart3,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Heart,
  Bell,
  ChevronRight
} from "lucide-react"
import type { Project } from "@/lib/projects"
import { getProjectIcon } from "@/lib/project-icons"

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tokenomics' | 'financials' | 'team'>('overview')
  const [investAmount, setInvestAmount] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  if (!project) return null

  const fundedAmount = project.fundingGoal * (project.progress / 100)
  const timeLeft = Math.floor(Math.random() * 30) + 1
  const Icon = getProjectIcon(project.category)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-200/60 backdrop-blur-xl">
          <div className="p-6 flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                  project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                  project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                  'from-green-500 to-emerald-600'
                } rounded-xl blur-xl opacity-50`} />
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${
                  project.category === 'coffee' || project.category === 'First $NOW Launch' ? 'from-amber-500 to-orange-600' :
                  project.category === 'marketplace' ? 'from-blue-500 to-indigo-600' :
                  project.category === 'fashion' ? 'from-purple-500 to-pink-600' :
                  'from-green-500 to-emerald-600'
                } flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                  <span className="text-xl font-mono text-gray-600">${project.symbol}</span>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 flex items-center gap-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'financials', label: 'Financials' },
              { id: 'team', label: 'Team' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-all",
                  selectedTab === tab.id
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <Target className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{project.progress}%</div>
                    <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Raised</span>
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${fundedAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      of ${project.fundingGoal.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Investors</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {project.investors.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      +{Math.floor(project.investors * 0.1)} today
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description} This innovative project combines traditional retail with blockchain technology,
                    creating a new paradigm for business ownership and customer engagement. By tokenizing the business,
                    we enable global participation in the success of physical stores while providing transparency and
                    instant liquidity through DeFi mechanisms.
                  </p>
                </div>

                {/* Store Locations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Store Locations</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Miami, FL - Opening Q2 2024</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Los Angeles, CA - Opening Q3 2024</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">New York, NY - Opening Q4 2024</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Austin, TX - Opening Q1 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'tokenomics' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Token Distribution</h3>
                  <div className="space-y-3">
                    {Object.entries(project.tokenomics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono font-bold text-gray-900 w-12 text-right">
                            {value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Revenue Sharing</h3>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Profit Distribution to Holders</span>
                      <span className="text-2xl font-bold text-green-600">{project.revenueShare}%</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Monthly distributions based on token holdings. Verified through on-chain governance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'financials' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Projections</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Year 1 Revenue</div>
                      <div className="text-xl font-bold text-gray-900">$2.5M - $3.5M</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Break-even</div>
                      <div className="text-xl font-bold text-gray-900">Month 8-10</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Est. APY</div>
                      <div className="text-xl font-bold text-green-600">{project.apy}%</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">ROI Target</div>
                      <div className="text-xl font-bold text-gray-900">3-5x in 24mo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'team' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Team</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-600">CEO & Founder</div>
                      <div className="text-xs text-gray-500 mt-1">10+ years retail experience</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Sarah Chen</div>
                      <div className="text-sm text-gray-600">CTO</div>
                      <div className="text-xs text-gray-500 mt-1">Ex-Coinbase, Web3 veteran</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 p-6 bg-gray-50/50">
            {/* Quick Invest */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Invest</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Investment Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      USDC
                    </span>
                  </div>
                </div>
                
                {investAmount && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>You'll receive</span>
                      <span className="font-mono font-bold text-gray-900">
                        {(Number(investAmount) * 10).toLocaleString()} ${project.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Est. monthly return</span>
                      <span className="font-mono font-bold text-green-600">
                        ${(Number(investAmount) * project.apy / 100 / 12).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                
                <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all">
                  Invest Now
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-all flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Add to Watchlist
              </button>
              <button className="w-full px-3 py-2 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-all flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Set Alert
              </button>
              <button 
                onClick={() => handleCopy(window.location.href + '/project/' + project.id)}
                className="w-full px-3 py-2 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Copy className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Contract Info */}
            <div className="mt-6 p-3 bg-white rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 mb-2">Contract Address</div>
              <div className="font-mono text-xs text-gray-900 break-all">
                {project.contract || '0x1234...5678'}
              </div>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View on Explorer
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
