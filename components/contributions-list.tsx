"use client"

import { useState, useEffect } from "react"
import { Copy, Check, TrendingUp, Users, Award, Wallet, ExternalLink, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Contributor {
  rank: number
  address: string
  totalContributed: number
  transactionCount: number
  averageAmount: number
  firstContribution: number
  lastContribution: number
  percentageOfTotal: number
}

interface ContributionsData {
  contributors: Contributor[]
  summary: {
    totalContributors: number
    totalRaised: number
    averageContribution: number
    medianContribution: number
    largestContribution: number
    distribution: {
      under100: number
      from100to500: number
      from500to1000: number
      from1000to5000: number
      from5000to10000: number
      above10000: number
    }
  }
}

interface ContributionsListProps {
  projectId: string
  presaleAddress: string
}

export function ContributionsList({ projectId, presaleAddress }: ContributionsListProps) {
  const [data, setData] = useState<ContributionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchContributors()
  }, [projectId, presaleAddress])

  const fetchContributors = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/presale/contributors?projectId=${projectId}&wallet=${presaleAddress}&limit=50`)

      if (!response.ok) {
        throw new Error('Failed to fetch contributors')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching contributors:', err)
      setError(err instanceof Error ? err.message : 'Failed to load contributors')
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Unable to load contributors</p>
          <button
            onClick={fetchContributors}
            className="mt-4 px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const displayedContributors = showAll ? data.contributors : data.contributors.slice(0, 10)

  return (
    <div className="border-4 border-black bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <h3 className="text-2xl font-black uppercase">Top Contributors</h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Total Contributors</p>
            <p className="text-2xl font-bold">{data.summary.totalContributors}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="border-2 border-white/20 p-3">
            <p className="text-xs opacity-75 uppercase">Average</p>
            <p className="text-lg font-bold">{formatUSD(data.summary.averageContribution)}</p>
          </div>
          <div className="border-2 border-white/20 p-3">
            <p className="text-xs opacity-75 uppercase">Median</p>
            <p className="text-lg font-bold">{formatUSD(data.summary.medianContribution)}</p>
          </div>
          <div className="border-2 border-white/20 p-3">
            <p className="text-xs opacity-75 uppercase">Largest</p>
            <p className="text-lg font-bold">{formatUSD(data.summary.largestContribution)}</p>
          </div>
        </div>
      </div>

      {/* Contributors List */}
      <div className="divide-y-2 divide-black">
        {displayedContributors.map((contributor) => {
          const isTopThree = contributor.rank <= 3
          const isCopied = copiedAddress === contributor.address

          return (
            <div
              key={contributor.address}
              className={`p-4 transition-all hover:bg-gray-50 ${
                isTopThree ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Rank & Address */}
                <div className="flex items-center gap-3 flex-1">
                  <div className={`
                    w-10 h-10 flex items-center justify-center font-black text-lg
                    ${contributor.rank === 1 ? 'bg-yellow-400 border-2 border-yellow-600' : ''}
                    ${contributor.rank === 2 ? 'bg-gray-300 border-2 border-gray-500' : ''}
                    ${contributor.rank === 3 ? 'bg-orange-300 border-2 border-orange-500' : ''}
                    ${contributor.rank > 3 ? 'bg-white border-2 border-black' : ''}
                  `}>
                    {contributor.rank === 1 && <Award className="h-5 w-5" />}
                    {contributor.rank > 1 && contributor.rank}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm">
                        {formatAddress(contributor.address)}
                      </code>
                      <button
                        onClick={() => copyAddress(contributor.address)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {isCopied ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                      <a
                        href={`https://solscan.io/account/${contributor.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">
                        {contributor.transactionCount} transaction{contributor.transactionCount !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-gray-600">
                        Last: {formatDistanceToNow(new Date(contributor.lastContribution), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contribution Amount */}
                <div className="text-right">
                  <p className="font-black text-lg">{formatUSD(contributor.totalContributed)}</p>
                  <p className="text-xs text-gray-600">
                    {contributor.percentageOfTotal.toFixed(1)}% of total
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Show More Button */}
      {data.contributors.length > 10 && (
        <div className="p-4 border-t-2 border-black">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-bold uppercase"
          >
            {showAll ? `Show Less` : `Show All ${data.contributors.length} Contributors`}
          </button>
        </div>
      )}

      {/* Distribution Chart */}
      <div className="p-6 border-t-4 border-black bg-gray-50">
        <h4 className="font-bold uppercase mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Contribution Distribution
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">Under $100</p>
            <p className="text-xl font-black">{data.summary.distribution.under100}</p>
          </div>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">$100-$500</p>
            <p className="text-xl font-black">{data.summary.distribution.from100to500}</p>
          </div>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">$500-$1K</p>
            <p className="text-xl font-black">{data.summary.distribution.from500to1000}</p>
          </div>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">$1K-$5K</p>
            <p className="text-xl font-black">{data.summary.distribution.from1000to5000}</p>
          </div>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">$5K-$10K</p>
            <p className="text-xl font-black">{data.summary.distribution.from5000to10000}</p>
          </div>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs font-bold uppercase">Over $10K</p>
            <p className="text-xl font-black">{data.summary.distribution.above10000}</p>
          </div>
        </div>
      </div>
    </div>
  )
}