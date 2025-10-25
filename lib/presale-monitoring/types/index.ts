/**
 * Type Definitions for Presale Monitoring System
 *
 * All shared types and interfaces used across the monitoring system
 */

import { PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js'

/**
 * Presale wallet information
 */
export interface PresaleWalletInfo {
  address: string
  solBalance: number
  usdcBalance: number
  totalValueUSD: number
  solPrice: number
  lastUpdated: number
}

/**
 * Presale transaction details
 */
export interface PresaleTransaction {
  signature: string
  type: 'deposit' | 'withdrawal' | 'unknown'
  amount: number
  token: 'SOL' | 'USDC' | 'OTHER'
  from: string
  to: string
  timestamp: number
  status: 'success' | 'failed'
  usdValue: number
  blockSlot?: number
  fee?: number
  memo?: string
}

/**
 * Contributor information
 */
export interface ContributorInfo {
  address: string
  totalContributed: number
  transactionCount: number
  firstContribution: number
  lastContribution: number
  averageAmount: number
  tokens?: TokenContribution[]
}

export interface ContributorSnapshot {
  address: string
  totalUSD: number
  transactionCount: number
  firstContribution: number
  lastContribution: number
}

export interface ContributorSummary {
  totalContributors: number
  totalUSD: number
  thresholdUSD: number
  filteredContributors: ContributorSnapshot[]
  filteredTotalContributors: number
  filteredTotalUSD: number
}

/**
 * Token contribution breakdown
 */
export interface TokenContribution {
  token: string
  amount: number
  usdValue: number
  percentage: number
}

/**
 * Contribution distribution buckets
 */
export interface ContributionDistribution {
  under100: number
  from100to500: number
  from500to1000: number
  from1000to5000: number
  from5000to10000: number
  above10000: number
}

/**
 * Presale metrics
 */
export interface PresaleMetrics {
  wallet: PresaleWalletInfo
  totalRaised: {
    sol: number
    usdc: number
    totalUSD: number
  }
  recentTransactions: PresaleTransaction[]
  dailyVolume: number
  weeklyVolume: number
  monthlyVolume: number
  transactionCount: {
    total: number
    deposits: number
    withdrawals: number
    last24h: number
    last7d: number
    last30d: number
  }
  uniqueContributors: number
  averageContribution: number
  medianContribution: number
  largestContribution: number
  smallestContribution: number
  contributionDistribution: ContributionDistribution
  contributorSummary: ContributorSummary
  lastUpdated: number
}

/**
 * Historical data point
 */
export interface HistoricalDataPoint {
  timestamp: number
  value: number
  metadata?: Record<string, any>
}

/**
 * Historical analysis result
 */
export interface HistoricalAnalysis {
  dailyVolumes: {
    date: string
    volume: number
    transactions: number
  }[]
  cumulativeRaised: {
    date: string
    total: number
  }[]
  topContributors: ContributorInfo[]
  hourlyActivity: {
    hour: number
    avgTransactions: number
    avgVolume: number
  }[]
  trend: 'increasing' | 'decreasing' | 'stable'
  growthRate: number // percentage
}

/**
 * Real-time update event
 */
export interface RealtimeUpdate {
  type: 'balance_update' | 'new_transaction' | 'metrics_update' | 'contributor_update'
  data: any
  timestamp: number
}

/**
 * Service options
 */
export interface PresaleMonitoringOptions {
  presaleAddress: string
  rpcUrl?: string
  wssUrl?: string
  cacheEnabled?: boolean
  cacheTTL?: number
  maxTransactions?: number
  enableWebSocket?: boolean
  enableDiagnostics?: boolean
}

/**
 * Service status
 */
export interface ServiceStatus {
  healthy: boolean
  uptime: number
  requestsProcessed: number
  errors: number
  lastError?: string
  cacheStats: {
    hits: number
    misses: number
    hitRate: number
  }
  rpcStats: {
    endpoint: string
    latency: number
    rateLimit: number
    requestsRemaining: number
  }
}

/**
 * Error types
 */
export enum ErrorType {
  RPC_ERROR = 'RPC_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * Custom error class
 */
export class PresaleMonitoringError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'PresaleMonitoringError'
  }
}

/**
 * API response format
 */
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    type: string
    message: string
    details?: any
  }
  metadata: {
    timestamp: number
    cached: boolean
    processingTime: number
    rpcEndpoint: string
  }
}

/**
 * Batch processing result
 */
export interface BatchResult<T> {
  successful: T[]
  failed: Array<{
    item: any
    error: Error
  }>
  totalProcessed: number
  processingTime: number
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  requestsPerSecond: number
  averageLatency: number
  p95Latency: number
  p99Latency: number
  errorRate: number
  cacheHitRate: number
  memoryUsage: number
  cpuUsage?: number
}

/**
 * Diagnostics report
 */
export interface DiagnosticsReport {
  timestamp: number
  version: string
  config: Record<string, any>
  status: ServiceStatus
  performance: PerformanceMetrics
  errors: Array<{
    type: ErrorType
    count: number
    lastOccurrence: number
    sample: string
  }>
  recommendations: string[]
}

/**
 * WebSocket message types
 */
export interface WSMessage {
  type: 'subscribe' | 'unsubscribe' | 'ping' | 'update'
  channel?: string
  data?: any
  id?: string
}

/**
 * Subscription options
 */
export interface SubscriptionOptions {
  channel: string
  filter?: (update: RealtimeUpdate) => boolean
  throttle?: number // milliseconds
  maxRetries?: number
}
