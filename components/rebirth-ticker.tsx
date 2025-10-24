"use client"

import { useEffect, useState } from "react"
import { Activity, TrendingUp, Users, Clock, DollarSign } from "lucide-react"
import { usePresale } from "@/hooks/use-presale"

export function RebirthTicker() {
  const { data, loading } = usePresale("rebirth")
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Calculate time until launch
  const timeUntilLaunch = data?.startTime ? data.startTime - currentTime : 0
  const days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeUntilLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeUntilLaunch % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeUntilLaunch % (1000 * 60)) / 1000)

  const isUpcoming = data?.status === "upcoming"
  const isActive = data?.status === "active"
  const isEnded = data?.status === "ended" || data?.status === "filled"

  return (
    <div className="bg-black border-b-4 border-[#DC143C] overflow-hidden">
      <div className="relative">
        {/* Main Ticker */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            {/* REBIRTH Badge */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#DC143C] rounded-full animate-pulse" />
              <span className="text-[#DC143C] font-black text-sm uppercase tracking-wider">
                $REBIRTH
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold uppercase">
                {isUpcoming ? "LAUNCHING SOON" : isActive ? "PRESALE LIVE" : isEnded ? "PRESALE ENDED" : "PREPARING"}
              </span>
            </div>

            {/* Stats */}
            {isActive && data && (
              <>
                <div className="flex items-center gap-2 border-l border-[#DC143C]/30 pl-8">
                  <TrendingUp className="w-4 h-4 text-[#DC143C]" />
                  <span className="text-white text-sm">
                    <span className="font-black">${(data.raised / 1000).toFixed(0)}K</span>
                    <span className="text-white/60"> / ${(data.target / 1000).toFixed(0)}K</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#DC143C]" />
                  <span className="text-white text-sm font-black">
                    {data.contributors} Contributors
                  </span>
                </div>
              </>
            )}

            {/* Countdown */}
            {isUpcoming && timeUntilLaunch > 0 && (
              <div className="flex items-center gap-2 border-l border-[#DC143C]/30 pl-8">
                <Clock className="w-4 h-4 text-[#DC143C]" />
                <div className="flex items-center gap-3 text-white">
                  <div className="text-center">
                    <div className="text-lg font-black">{days}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-60">Days</div>
                  </div>
                  <span className="text-[#DC143C]">:</span>
                  <div className="text-center">
                    <div className="text-lg font-black">{hours.toString().padStart(2, '0')}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-60">Hours</div>
                  </div>
                  <span className="text-[#DC143C]">:</span>
                  <div className="text-center">
                    <div className="text-lg font-black">{minutes.toString().padStart(2, '0')}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-60">Mins</div>
                  </div>
                  <span className="text-[#DC143C]">:</span>
                  <div className="text-center">
                    <div className="text-lg font-black">{seconds.toString().padStart(2, '0')}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-60">Secs</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {data && (
              <div className="text-right">
                <div className="text-[10px] text-[#DC143C] uppercase tracking-wider font-black">
                  {data.taxRate ? `${data.taxRate}% TAX` : "FAIR LAUNCH"}
                </div>
                <div className="text-sm text-white font-bold">
                  31.7M Total Supply
                </div>
              </div>
            )}
            
            <button 
              onClick={() => window.location.href = '/tokenomics'}
              className="px-4 py-2 bg-[#DC143C] text-white font-black text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all border-2 border-[#DC143C] hover:border-white"
            >
              {isActive ? "JOIN PRESALE" : "LEARN MORE"}
            </button>
          </div>
        </div>

        {/* Recent Activity Scroll */}
        {data?.recentContributions && data.recentContributions.length > 0 && (
          <div className="border-t border-[#DC143C]/30 py-2 px-6 overflow-hidden">
            <div className="flex gap-8 animate-scroll-left">
              {[...data.recentContributions, ...data.recentContributions].map((contrib, i) => (
                <div key={i} className="flex items-center gap-2 text-xs whitespace-nowrap">
                  <DollarSign className="w-3 h-3 text-[#DC143C]" />
                  <span className="text-white/60">{contrib.address}</span>
                  <span className="text-white font-bold">{contrib.amount.toFixed(2)} SOL</span>
                  <span className="text-[#DC143C]">•</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
