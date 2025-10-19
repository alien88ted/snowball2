"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Activity, Scale, DollarSign, Package, Zap, BarChart3 } from "lucide-react"

export function RicoMetrics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulated metrics data - in production this would come from the refinery's API
  const metrics = {
    monthlyProcessing: {
      gold: 65.2, // kg
      silver: 890, // kg
      platinum: 12.4, // kg
      palladium: 8.7 // kg
    },
    currentMonth: {
      revenue: 218000,
      grossMargin: 19.5,
      batchesProcessed: 47
    },
    inventory: {
      goldOunces: 142.3,
      silverOunces: 2847,
      totalValue: 385000
    }
  }

  const metalPrices = [
    { name: "Gold", price: 2043, change: +1.2, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    { name: "Silver", price: 24.18, change: -0.4, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-300" },
    { name: "Platinum", price: 915, change: +2.1, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { name: "Palladium", price: 967, change: +0.8, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-serif">Operations Dashboard</h3>
          <p className="text-sm text-muted-foreground">Live refinery metrics & performance</p>
        </div>
      </div>

      {/* Current Month Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/60">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-700" />
            <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Monthly Revenue</span>
          </div>
          <div className="text-3xl font-bold text-green-900">${(metrics.currentMonth.revenue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-green-700/80 mt-1">Oct 2025 (projected)</div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-200/60">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Gross Margin</span>
          </div>
          <div className="text-3xl font-bold text-blue-900">{metrics.currentMonth.grossMargin}%</div>
          <div className="text-xs text-blue-700/80 mt-1">Above 18% target</div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200/60">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-700" />
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">Batches Processed</span>
          </div>
          <div className="text-3xl font-bold text-purple-900">{metrics.currentMonth.batchesProcessed}</div>
          <div className="text-xs text-purple-700/80 mt-1">This month</div>
        </Card>
      </div>

      {/* Processing Volume */}
      <Card className="p-6 border-2 border-border/30 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-5">
          <Scale className="w-5 h-5 text-amber-600" />
          <h4 className="text-lg font-bold">Monthly Processing Volume</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200/60">
            <div className="text-xs text-yellow-800 font-semibold mb-1">Gold</div>
            <div className="text-2xl font-bold text-yellow-900">{metrics.monthlyProcessing.gold}</div>
            <div className="text-xs text-yellow-700/70">kg/month</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-300/60">
            <div className="text-xs text-gray-800 font-semibold mb-1">Silver</div>
            <div className="text-2xl font-bold text-gray-900">{metrics.monthlyProcessing.silver}</div>
            <div className="text-xs text-gray-700/70">kg/month</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/60">
            <div className="text-xs text-blue-800 font-semibold mb-1">Platinum</div>
            <div className="text-2xl font-bold text-blue-900">{metrics.monthlyProcessing.platinum}</div>
            <div className="text-xs text-blue-700/70">kg/month</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/60">
            <div className="text-xs text-purple-800 font-semibold mb-1">Palladium</div>
            <div className="text-2xl font-bold text-purple-900">{metrics.monthlyProcessing.palladium}</div>
            <div className="text-xs text-purple-700/70">kg/month</div>
          </div>
        </div>
      </Card>

      {/* Metal Spot Prices */}
      <Card className="p-6 border-2 border-border/30 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold">Live Metal Prices</h4>
          <span className="ml-auto text-xs text-muted-foreground">per troy oz</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metalPrices.map((metal) => (
            <div key={metal.name} className={`p-4 rounded-xl ${metal.bg} border ${metal.border}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm font-bold ${metal.color}`}>{metal.name}</div>
                  <div className={`text-2xl font-bold font-mono ${metal.color}`}>${metal.price.toLocaleString()}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${metal.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metal.change >= 0 ? '+' : ''}{metal.change}%
                  <TrendingUp className={`w-4 h-4 ${metal.change < 0 ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Current Inventory */}
      <Card className="p-6 border-2 border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-5">
          <Package className="w-5 h-5 text-amber-700" />
          <h4 className="text-lg font-bold text-amber-900">Current Inventory</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/60 border border-amber-200/60">
            <div className="text-xs text-amber-700 font-semibold mb-1">Gold</div>
            <div className="text-2xl font-bold text-amber-900">{metrics.inventory.goldOunces}</div>
            <div className="text-xs text-amber-700/70">troy oz</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/60 border border-amber-200/60">
            <div className="text-xs text-amber-700 font-semibold mb-1">Silver</div>
            <div className="text-2xl font-bold text-amber-900">{metrics.inventory.silverOunces.toLocaleString()}</div>
            <div className="text-xs text-amber-700/70">troy oz</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60">
            <div className="text-xs text-green-700 font-semibold mb-1">Total Value</div>
            <div className="text-2xl font-bold text-green-900">${(metrics.inventory.totalValue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-green-700/70">at spot price</div>
          </div>
        </div>
      </Card>

      {/* Transparency Note */}
      <div className="p-5 rounded-xl bg-blue-50/80 border border-blue-200/60">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-blue-900 mb-1">100% Transparent Operations</div>
            <div className="text-sm text-blue-800/80 leading-relaxed">
              All refining batches are recorded on-chain with input weight, assay results, output weight, and profit margins.
              Token holders receive quarterly audited reports and can verify inventory through third-party vault inspections.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
