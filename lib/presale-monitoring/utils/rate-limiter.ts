/**
 * Rate Limiter Module
 *
 * Implements multiple rate limiting strategies:
 * - Token Bucket: Smooth, allows bursts
 * - Sliding Window: Precise rate limiting
 * - Queue-based: Sequential processing with delays
 */

import { RATE_LIMIT_CONFIG } from '../config'

/**
 * Rate limiter statistics for diagnostics
 */
export interface RateLimiterStats {
  totalRequests: number
  allowedRequests: number
  throttledRequests: number
  currentTokens: number
  averageWaitTime: number
  lastRequestTime: number
}

/**
 * Base interface for rate limiters
 */
export interface IRateLimiter {
  throttle(): Promise<void>
  getStats(): RateLimiterStats
  reset(): void
}

/**
 * Token Bucket Rate Limiter
 * Allows burst traffic while maintaining average rate
 */
export class TokenBucketRateLimiter implements IRateLimiter {
  private tokens: number
  private lastRefill: number = Date.now()
  private readonly maxTokens: number
  private readonly refillRate: number

  // Statistics
  private stats: RateLimiterStats = {
    totalRequests: 0,
    allowedRequests: 0,
    throttledRequests: 0,
    currentTokens: 0,
    averageWaitTime: 0,
    lastRequestTime: 0,
  }

  private waitTimes: number[] = []

  constructor(maxRequestsPerSecond: number = RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND) {
    this.maxTokens = maxRequestsPerSecond
    this.tokens = maxRequestsPerSecond
    this.refillRate = maxRequestsPerSecond // tokens per second
  }

  async throttle(): Promise<void> {
    const startWait = Date.now()
    this.stats.totalRequests++

    // Refill tokens based on time passed
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000 // in seconds
    this.tokens = Math.min(this.maxTokens, this.tokens + (timePassed * this.refillRate))
    this.lastRefill = now

    // If no tokens available, calculate wait time
    if (this.tokens < 1) {
      this.stats.throttledRequests++
      const waitTime = ((1 - this.tokens) / this.refillRate) * 1000

      await new Promise(resolve => setTimeout(resolve, Math.ceil(waitTime)))

      // Refill after waiting
      const afterWait = Date.now()
      const waitedTime = (afterWait - now) / 1000
      this.tokens = Math.min(this.maxTokens, this.tokens + (waitedTime * this.refillRate))
      this.lastRefill = afterWait

      // Track wait time
      const totalWait = afterWait - startWait
      this.waitTimes.push(totalWait)
      if (this.waitTimes.length > 100) this.waitTimes.shift()
    } else {
      this.stats.allowedRequests++
    }

    // Consume a token
    this.tokens -= 1
    this.stats.currentTokens = Math.floor(this.tokens)
    this.stats.lastRequestTime = Date.now()

    // Update average wait time
    if (this.waitTimes.length > 0) {
      this.stats.averageWaitTime =
        this.waitTimes.reduce((a, b) => a + b, 0) / this.waitTimes.length
    }
  }

  getStats(): RateLimiterStats {
    // Update current tokens
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000
    const currentTokens = Math.min(
      this.maxTokens,
      this.tokens + (timePassed * this.refillRate)
    )

    return {
      ...this.stats,
      currentTokens: Math.floor(currentTokens),
    }
  }

  reset(): void {
    this.tokens = this.maxTokens
    this.lastRefill = Date.now()
    this.stats = {
      totalRequests: 0,
      allowedRequests: 0,
      throttledRequests: 0,
      currentTokens: this.maxTokens,
      averageWaitTime: 0,
      lastRequestTime: 0,
    }
    this.waitTimes = []
  }

  /**
   * Get available tokens without consuming
   */
  getAvailableTokens(): number {
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000
    return Math.min(this.maxTokens, this.tokens + (timePassed * this.refillRate))
  }
}

/**
 * Sliding Window Rate Limiter
 * More precise rate limiting within a time window
 */
export class SlidingWindowRateLimiter implements IRateLimiter {
  private requests: number[] = []
  private readonly maxRequests: number
  private readonly windowMs: number

  private stats: RateLimiterStats = {
    totalRequests: 0,
    allowedRequests: 0,
    throttledRequests: 0,
    currentTokens: 0,
    averageWaitTime: 0,
    lastRequestTime: 0,
  }

  constructor(
    maxRequestsPerSecond: number = RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND,
    windowMs: number = 1000
  ) {
    this.maxRequests = maxRequestsPerSecond
    this.windowMs = windowMs
  }

  async throttle(): Promise<void> {
    const now = Date.now()
    this.stats.totalRequests++

    // Remove requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs)

    // Check if we can make a request
    if (this.requests.length >= this.maxRequests) {
      this.stats.throttledRequests++

      // Calculate how long to wait
      const oldestRequest = this.requests[0]
      const waitTime = this.windowMs - (now - oldestRequest) + 1

      await new Promise(resolve => setTimeout(resolve, waitTime))

      // Clean up again after waiting
      const afterWait = Date.now()
      this.requests = this.requests.filter(time => afterWait - time < this.windowMs)
    } else {
      this.stats.allowedRequests++
    }

    // Add this request
    this.requests.push(Date.now())
    this.stats.currentTokens = this.maxRequests - this.requests.length
    this.stats.lastRequestTime = Date.now()
  }

  getStats(): RateLimiterStats {
    const now = Date.now()
    const activeRequests = this.requests.filter(time => now - time < this.windowMs)

    return {
      ...this.stats,
      currentTokens: Math.max(0, this.maxRequests - activeRequests.length),
    }
  }

  reset(): void {
    this.requests = []
    this.stats = {
      totalRequests: 0,
      allowedRequests: 0,
      throttledRequests: 0,
      currentTokens: this.maxRequests,
      averageWaitTime: 0,
      lastRequestTime: 0,
    }
  }
}

/**
 * Simple Delay Rate Limiter
 * Enforces a minimum delay between requests
 */
export class DelayRateLimiter implements IRateLimiter {
  private lastRequestTime: number = 0
  private readonly minDelay: number

  private stats: RateLimiterStats = {
    totalRequests: 0,
    allowedRequests: 0,
    throttledRequests: 0,
    currentTokens: 1,
    averageWaitTime: 0,
    lastRequestTime: 0,
  }

  constructor(requestsPerSecond: number = RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND) {
    this.minDelay = 1000 / requestsPerSecond
  }

  async throttle(): Promise<void> {
    const now = Date.now()
    this.stats.totalRequests++

    const timeSinceLastRequest = now - this.lastRequestTime

    if (timeSinceLastRequest < this.minDelay) {
      this.stats.throttledRequests++
      const waitTime = this.minDelay - timeSinceLastRequest

      await new Promise(resolve => setTimeout(resolve, waitTime))
    } else {
      this.stats.allowedRequests++
    }

    this.lastRequestTime = Date.now()
    this.stats.lastRequestTime = this.lastRequestTime
  }

  getStats(): RateLimiterStats {
    return { ...this.stats }
  }

  reset(): void {
    this.lastRequestTime = 0
    this.stats = {
      totalRequests: 0,
      allowedRequests: 0,
      throttledRequests: 0,
      currentTokens: 1,
      averageWaitTime: 0,
      lastRequestTime: 0,
    }
  }
}

/**
 * Composite Rate Limiter
 * Combines multiple strategies for robust rate limiting
 */
export class CompositeRateLimiter implements IRateLimiter {
  private limiters: IRateLimiter[]

  constructor(...limiters: IRateLimiter[]) {
    this.limiters = limiters
  }

  async throttle(): Promise<void> {
    // Apply all rate limiters
    await Promise.all(this.limiters.map(limiter => limiter.throttle()))
  }

  getStats(): RateLimiterStats {
    // Aggregate stats from all limiters
    const allStats = this.limiters.map(l => l.getStats())

    return {
      totalRequests: Math.max(...allStats.map(s => s.totalRequests)),
      allowedRequests: Math.min(...allStats.map(s => s.allowedRequests)),
      throttledRequests: Math.max(...allStats.map(s => s.throttledRequests)),
      currentTokens: Math.min(...allStats.map(s => s.currentTokens)),
      averageWaitTime:
        allStats.reduce((sum, s) => sum + s.averageWaitTime, 0) / allStats.length,
      lastRequestTime: Math.max(...allStats.map(s => s.lastRequestTime)),
    }
  }

  reset(): void {
    this.limiters.forEach(limiter => limiter.reset())
  }
}

/**
 * Factory function to create the appropriate rate limiter
 */
export function createRateLimiter(
  type: 'token-bucket' | 'sliding-window' | 'delay' | 'composite' = 'token-bucket',
  maxRequestsPerSecond?: number
): IRateLimiter {
  const rps = maxRequestsPerSecond || RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND

  switch (type) {
    case 'token-bucket':
      return new TokenBucketRateLimiter(rps)

    case 'sliding-window':
      return new SlidingWindowRateLimiter(rps)

    case 'delay':
      return new DelayRateLimiter(rps)

    case 'composite':
      // Combine token bucket with sliding window for maximum protection
      return new CompositeRateLimiter(
        new TokenBucketRateLimiter(rps),
        new SlidingWindowRateLimiter(rps)
      )

    default:
      return new TokenBucketRateLimiter(rps)
  }
}

// Export a global rate limiter instance
export const globalRateLimiter = createRateLimiter('token-bucket')