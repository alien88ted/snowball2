"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { usePresaleMonitor } from "@/hooks/use-presale-monitor"
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon, UsersIcon, TrendingUpIcon, WalletIcon } from "lucide-react"

interface PresaleMonitorWidgetProps {
  address?: string
  projectName?: string
  refreshInterval?: number
}

export function PresaleMonitorWidget({ 
  address = "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s", // Coffee presale default
  projectName = "Coffee Shop",
  refreshInterval = 10000 
}: PresaleMonitorWidgetProps) {
  const {
    walletInfo,
    summary,
    currentBalance,
    loading,
    error,
    fetchMetrics,
    fetchTransactions,
    dailyVolume,
    weeklyVolume,
    totalRaised,
    contributors
  } = usePresaleMonitor({ address, refreshInterval })

  const [metrics, setMetrics] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    // Fetch additional data on mount
    fetchMetrics().then(setMetrics)
    fetchTransactions(5).then(setTransactions)
  }, [fetchMetrics, fetchTransactions])

  if (loading && !summary) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Presale Monitor Error</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{projectName} Presale Wallet</CardTitle>
              <CardDescription className="font-mono text-xs mt-1">
                {address.slice(0, 6)}...{address.slice(-4)}
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-auto">
              Live Monitoring
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">SOL Balance</p>
              <p className="text-2xl font-bold">
                {currentBalance?.sol?.toFixed(4) || "0.0000"} SOL
              </p>
              {walletInfo && (
                <p className="text-xs text-muted-foreground">
                  ≈ ${(currentBalance.sol * walletInfo.solPrice).toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">USDC Balance</p>
              <p className="text-2xl font-bold">
                {currentBalance?.usdc?.toFixed(2) || "0.00"} USDC
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${currentBalance?.totalUSD?.toFixed(2) || "0.00"}
              </p>
              {walletInfo && (
                <p className="text-xs text-muted-foreground">
                  @ ${walletInfo.solPrice.toFixed(2)}/SOL
                </p>
              )}
            </div>
          </div>

          {/* Activity Metrics */}
          {summary && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="text-lg font-semibold">
                    {summary.recentActivity.transactions}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Deposits</p>
                  <p className="text-lg font-semibold text-green-600">
                    {summary.recentActivity.deposits}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Deposited</p>
                  <p className="text-lg font-semibold">
                    ${summary.recentActivity.totalDepositedUSD.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold">
                    {new Date(summary.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Latest Transactions</h3>
              <div className="space-y-2">
                {transactions.slice(0, 3).map((tx, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {tx.type === 'deposit' ? (
                        <ArrowDownIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-mono">
                        {tx.from.slice(0, 4)}...{tx.from.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={tx.type === 'deposit' ? 'default' : 'secondary'}>
                        {tx.amount.toFixed(2)} {tx.token}
                      </Badge>
                      <span className="text-muted-foreground">
                        ${tx.usdValue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extended Metrics (if loaded) */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Presale Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Total Raised</span>
                </div>
                <p className="text-xl font-bold">
                  ${metrics.totalRaised.totalUSD.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metrics.totalRaised.sol.toFixed(2)} SOL + {metrics.totalRaised.usdc.toFixed(2)} USDC
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4" />
                  <span>Contributors</span>
                </div>
                <p className="text-xl font-bold">
                  {metrics.uniqueContributors}
                </p>
                <p className="text-xs text-muted-foreground">
                  Avg: ${metrics.averageContribution.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUpIcon className="h-4 w-4" />
                  <span>Daily Volume</span>
                </div>
                <p className="text-xl font-bold">
                  ${metrics.dailyVolume.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Weekly: ${metrics.weeklyVolume.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <WalletIcon className="h-4 w-4" />
                  <span>Transactions</span>
                </div>
                <p className="text-xl font-bold">
                  {metrics.transactionCount.total}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metrics.transactionCount.deposits} in / {metrics.transactionCount.withdrawals} out
                </p>
              </div>
            </div>

            {/* Largest Contribution */}
            {metrics.largestContribution > 0 && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Largest Contribution</p>
                <p className="text-lg font-bold">${metrics.largestContribution.toFixed(2)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
