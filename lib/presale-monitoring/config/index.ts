/**
 * Presale Monitoring Configuration Module
 *
 * Centralized configuration for all presale monitoring settings.
 * All tuneable parameters should be defined here for easy adjustment.
 */

// Environment variables with defaults
const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = process.env[key]
  return value ? parseInt(value, 10) : defaultValue
}

const getEnvString = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue
}

/**
 * RPC Configuration
 */
export const RPC_CONFIG = {
  // Helius RPC endpoints (Primary - High Performance)
  HELIUS_URL: getEnvString(
    'HELIUS_RPC_URL',
    'https://mainnet.helius-rpc.com/?api-key=d2ca47fa-dd6f-4fdc-8abf-8e4fb5444c57'
  ),
  HELIUS_SECURE_URL: getEnvString(
    'HELIUS_SECURE_RPC_URL',
    'https://meridith-gjai0w-fast-mainnet.helius-rpc.com'
  ),
  HELIUS_API_URL: 'https://api.helius.xyz/v0',
  HELIUS_API_KEY: 'd2ca47fa-dd6f-4fdc-8abf-8e4fb5444c57',

  // QuickNode RPC endpoints (Secondary)
  QUICKNODE_URL: getEnvString(
    'QUICKNODE_RPC_URL',
    'https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/'
  ),
  QUICKNODE_WSS: getEnvString(
    'QUICKNODE_WSS_URL',
    'wss://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/'
  ),

  // Backup RPC endpoints
  PUBLIC_RPC_URL: 'https://api.mainnet-beta.solana.com',
  PUBLIC_WSS_URL: 'wss://api.mainnet-beta.solana.com',

  // RPC settings
  COMMITMENT: 'confirmed' as const,
  TIMEOUT: getEnvNumber('RPC_TIMEOUT', 60000),

  // Rate limiting per RPC endpoint
  HELIUS_RATE_LIMIT: getEnvNumber('HELIUS_RATE_LIMIT', 50), // Helius has higher limits
  HELIUS_SECURE_RATE_LIMIT: getEnvNumber('HELIUS_SECURE_RATE_LIMIT', 100), // Secure endpoint even higher
  QUICKNODE_RATE_LIMIT: getEnvNumber('QUICKNODE_RATE_LIMIT', 15), // req/sec
  PUBLIC_RATE_LIMIT: getEnvNumber('PUBLIC_RATE_LIMIT', 5), // req/sec
}

/**
 * Rate Limiting Configuration
 * Updated to use Helius's higher capacity (50 req/s standard, 100 req/s secure)
 */
export const RATE_LIMIT_CONFIG = {
  // Maximum requests per second (increased for Helius)
  MAX_REQUESTS_PER_SECOND: getEnvNumber('MAX_RPS', 50), // Helius standard supports 50 req/s

  // Delay between individual requests (ms) - reduced for higher throughput
  REQUEST_DELAY: getEnvNumber('REQUEST_DELAY', 10), // 10ms allows up to 100 req/s

  // Batch processing - increased for Helius capacity
  BATCH_SIZE: getEnvNumber('BATCH_SIZE', 40), // Process more in parallel with Helius
  BATCH_DELAY: getEnvNumber('BATCH_DELAY', 0), // No additional delay needed with sequential processing

  // Retry configuration
  MAX_RETRIES: getEnvNumber('MAX_RETRIES', 3),
  INITIAL_RETRY_DELAY: getEnvNumber('INITIAL_RETRY_DELAY', 1000),
  RETRY_BACKOFF_MULTIPLIER: getEnvNumber('RETRY_BACKOFF_MULTIPLIER', 2),
  MAX_RETRY_DELAY: getEnvNumber('MAX_RETRY_DELAY', 30000),
}

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  // Cache TTL (milliseconds)
  METRICS_CACHE_TTL: getEnvNumber('METRICS_CACHE_TTL', 30000), // 30 seconds
  WALLET_CACHE_TTL: getEnvNumber('WALLET_CACHE_TTL', 10000), // 10 seconds

  // Cache size limits
  MAX_TRANSACTION_CACHE: getEnvNumber('MAX_TX_CACHE', 10000),
  MAX_CONTRIBUTOR_CACHE: getEnvNumber('MAX_CONTRIBUTOR_CACHE', 5000),

  // LRU eviction
  ENABLE_LRU: true,
}

/**
 * Transaction Processing Configuration
 */
export const TRANSACTION_CONFIG = {
  // Maximum transactions to fetch
  DEFAULT_TRANSACTION_LIMIT: getEnvNumber('DEFAULT_TX_LIMIT', 1000),
  MAX_TRANSACTION_LIMIT: getEnvNumber('MAX_TX_LIMIT', 5000),

  // Pagination
  SIGNATURES_PER_PAGE: 1000,

  // Processing limits
  MAX_CONCURRENT_PARSES: getEnvNumber('MAX_CONCURRENT_PARSES', 10),
}

/**
 * Monitoring & Diagnostics Configuration
 */
export const MONITORING_CONFIG = {
  // Enable detailed logging
  ENABLE_DIAGNOSTICS: getEnvString('ENABLE_DIAGNOSTICS', 'true') === 'true',
  ENABLE_REQUEST_LOGGING: getEnvString('ENABLE_REQUEST_LOGGING', 'false') === 'true',

  // Performance tracking
  TRACK_PERFORMANCE: true,
  PERFORMANCE_SAMPLE_RATE: 0.1, // Sample 10% of requests

  // Health check intervals
  HEALTH_CHECK_INTERVAL: getEnvNumber('HEALTH_CHECK_INTERVAL', 30000), // 30 seconds

  // Alert thresholds
  ALERT_ON_429: true,
  ALERT_ON_HIGH_LATENCY: 5000, // ms
  ALERT_ON_ERROR_RATE: 0.1, // 10% error rate
}

/**
 * USDC Token Configuration
 */
export const TOKEN_CONFIG = {
  // USDC Mint Address (Mainnet)
  USDC_MINT: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',

  // Token Program IDs
  TOKEN_PROGRAM_ID: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TOKEN_2022_PROGRAM_ID: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
}

/**
 * Default Presale Addresses
 */
export const PRESALE_ADDRESSES = {
  COFFEE: '2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s',
}

/**
 * Feature Flags
 */
export const FEATURES = {
  // Enable WebSocket monitoring
  ENABLE_WEBSOCKET: getEnvString('ENABLE_WEBSOCKET', 'true') === 'true',

  // Enable historical analysis
  ENABLE_HISTORICAL: getEnvString('ENABLE_HISTORICAL', 'true') === 'true',

  // Enable contributor tracking
  ENABLE_CONTRIBUTORS: getEnvString('ENABLE_CONTRIBUTORS', 'true') === 'true',

  // Enable auto-reconnect
  ENABLE_AUTO_RECONNECT: getEnvString('ENABLE_AUTO_RECONNECT', 'true') === 'true',
  AUTO_RECONNECT_INTERVAL: getEnvNumber('AUTO_RECONNECT_INTERVAL', 30000),
}

/**
 * Get configuration summary for logging
 */
export function getConfigSummary(): Record<string, any> {
  return {
    rpc: {
      endpoint: RPC_CONFIG.QUICKNODE_URL.substring(0, 50) + '...',
      rateLimit: RPC_CONFIG.QUICKNODE_RATE_LIMIT,
      timeout: RPC_CONFIG.TIMEOUT,
    },
    rateLimiting: {
      maxRPS: RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND,
      batchSize: RATE_LIMIT_CONFIG.BATCH_SIZE,
      requestDelay: RATE_LIMIT_CONFIG.REQUEST_DELAY,
    },
    cache: {
      transactionLimit: CACHE_CONFIG.MAX_TRANSACTION_CACHE,
      contributorLimit: CACHE_CONFIG.MAX_CONTRIBUTOR_CACHE,
      metricsTTL: CACHE_CONFIG.METRICS_CACHE_TTL,
    },
    features: FEATURES,
  }
}

/**
 * Validate configuration
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate rate limits
  if (RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND <= 0) {
    errors.push('MAX_REQUESTS_PER_SECOND must be positive')
  }

  if (RATE_LIMIT_CONFIG.BATCH_SIZE <= 0) {
    errors.push('BATCH_SIZE must be positive')
  }

  if (RATE_LIMIT_CONFIG.BATCH_SIZE > RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND) {
    errors.push('BATCH_SIZE should not exceed MAX_REQUESTS_PER_SECOND')
  }

  // Validate cache settings
  if (CACHE_CONFIG.MAX_TRANSACTION_CACHE <= 0) {
    errors.push('MAX_TRANSACTION_CACHE must be positive')
  }

  // Validate RPC URLs
  if (!RPC_CONFIG.QUICKNODE_URL.startsWith('http')) {
    errors.push('Invalid QUICKNODE_URL')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Export all configs as default
export default {
  RPC: RPC_CONFIG,
  RATE_LIMIT: RATE_LIMIT_CONFIG,
  CACHE: CACHE_CONFIG,
  TRANSACTION: TRANSACTION_CONFIG,
  MONITORING: MONITORING_CONFIG,
  TOKEN: TOKEN_CONFIG,
  PRESALE: PRESALE_ADDRESSES,
  FEATURES,
  getConfigSummary,
  validateConfig,
}