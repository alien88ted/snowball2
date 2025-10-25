"use client"

import { usePresale } from "@/hooks/use-presale"
import { Project } from "@/lib/projects"
import { TrendingUp, Users, Coins, Activity, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface PresaleCardProps {
  project: Project
  icon?: React.ReactNode
}

export function PresaleCard({ project, icon }: PresaleCardProps) {
  const { data, loading, percentageRaised, isActive, canContribute } = usePresale(project.id, project.presaleAddress)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const [pulse, setPulse] = useState(false)

  // Animate progress bar
  useEffect(() => {
    const target = percentageRaised
    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedPercentage(target * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }

    if (target > 0) animate()
  }, [percentageRaised])

  // Pulse effect on new contribution
  useEffect(() => {
    if (data?.transactions && data.transactions > 0) {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }
  }, [data?.transactions])

  return (
    <Link href={`/explorer/${project.id}`}>
      <div className={`
        group relative border-4 border-black bg-white hover:bg-[#DC143C] hover:text-white 
        transition-all cursor-pointer overflow-hidden
        ${pulse ? 'animate-pulse' : ''}
      `}>
        {/* Live indicator */}
        {isActive && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#DC143C] group-hover:bg-white">
              <div className="w-2 h-2 bg-white group-hover:bg-[#DC143C] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white group-hover:text-black">LIVE</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-black group-hover:border-white bg-[#DC143C] group-hover:bg-white p-2 flex items-center justify-center">
                <span className="text-white group-hover:text-[#DC143C] text-lg font-black">
                  {icon || project.symbol.slice(1, 2)}
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl uppercase">{project.name}</h3>
                <p className="text-sm opacity-80">{project.symbol}</p>
              </div>
            </div>
          </div>

          {/* Franchise Type Badge */}
          {project.isPartner && (
            <div className="inline-block px-2 py-1 mb-3 bg-black group-hover:bg-white text-white group-hover:text-black text-[10px] font-black uppercase tracking-wider">
              FRANCHISE
            </div>
          )}

          {/* Description */}
          <p className="text-sm mb-4 line-clamp-2 leading-relaxed opacity-90">
            {project.description}
          </p>

          {/* Funding Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black uppercase">Progress</span>
              <span className="text-xs font-black">
                {loading ? "..." : `${Math.floor(animatedPercentage)}%`}
              </span>
            </div>
            <div className="h-2 bg-gray-200 border border-black group-hover:border-white">
              <div
                className="h-full bg-[#DC143C] group-hover:bg-white transition-all duration-500"
                style={{ width: `${Math.min(animatedPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 border-2 border-black group-hover:border-white">
              <div className="text-xs font-bold uppercase opacity-70">Raised</div>
              <div className="text-lg font-black">
                ${loading ? "..." : (data?.currentBalance?.totalUSD || data?.raised || 0).toLocaleString()}
              </div>
            </div>
            <div className="text-center p-2 border-2 border-black group-hover:border-white">
              <div className="text-xs font-bold uppercase opacity-70">Contributors</div>
              <div className="text-lg font-black">
                {loading ? "..." : data?.contributors || 0}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {data?.recentContributions && data.recentContributions.length > 0 && (
            <div className="mb-4 p-2 bg-black/10 group-hover:bg-white/10">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                <Activity className="w-3 h-3" />
                Latest: {data.recentContributions[0].address} - {data.recentContributions[0].amount.toFixed(2)} SOL
              </div>
            </div>
          )}

          {/* Key Info */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 border-2 border-black group-hover:border-white">
              <div className="text-[10px] font-bold uppercase">APY</div>
              <div className="text-sm font-black">{project.apy}%</div>
            </div>
            <div className="p-2 border-2 border-black group-hover:border-white">
              <div className="text-[10px] font-bold uppercase">Price</div>
              <div className="text-sm font-black">${project.price}</div>
            </div>
            <div className="p-2 border-2 border-black group-hover:border-white">
              <div className="text-[10px] font-bold uppercase">Period</div>
              <div className="text-sm font-black">{project.fundingPeriod}d</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-black group-hover:border-white flex items-center justify-between">
          <span className="text-xs font-black uppercase">
            {canContribute ? "Open for Investment" : "View Details"}
          </span>
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
