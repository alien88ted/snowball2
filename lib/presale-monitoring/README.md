# Presale Monitoring System

A robust, modular, and production-ready system for monitoring Solana presale wallets with real-time tracking, comprehensive analytics, and diagnostic capabilities.

## 📁 Architecture

```
presale-monitoring/
├── config/                 # Configuration management
│   └── index.ts           # Centralized configuration
├── core/                   # Core business logic
│   └── [services]         # Core monitoring services
├── diagnostics/           # Monitoring & diagnostics
│   └── index.ts          # Diagnostics manager
├── services/              # External services
│   └── rpc-manager.ts    # RPC endpoint management
├── types/                 # TypeScript definitions
│   └── index.ts          # All type definitions
├── utils/                 # Utility modules
│   ├── cache-manager.ts  # LRU cache management
│   └── rate-limiter.ts   # Rate limiting strategies
└── README.md             # This file
```

## 🚀 Features

### Core Capabilities
- ✅ **Real-time wallet monitoring** - Track SOL and USDC balances
- ✅ **Transaction analysis** - Parse and categorize all transactions
- ✅ **Contributor tracking** - Identify unique contributors and patterns
- ✅ **Historical analysis** - Daily volumes, trends, and cumulative data
- ✅ **WebSocket support** - Real-time updates via WebSocket connections

### Technical Features
- 🔄 **Multi-RPC management** - Automatic failover and load balancing
- ⚡ **Rate limiting** - Multiple strategies (token bucket, sliding window)
- 💾 **Smart caching** - LRU cache with TTL support
- 📊 **Diagnostics** - Performance tracking and health monitoring
- 🛡️ **Error handling** - Retry logic with exponential backoff
- 📈 **Performance optimized** - Sequential processing for rate compliance

## 📋 Configuration

All configuration is centralized in `config/index.ts`:

```typescript
import { RPC_CONFIG, RATE_LIMIT_CONFIG, CACHE_CONFIG } from './config'

// RPC Configuration (Now using Helius for better performance)
RPC_CONFIG.HELIUS_RATE_LIMIT = 50         // Helius standard: 50 req/sec
RPC_CONFIG.HELIUS_SECURE_RATE_LIMIT = 100 // Helius secure: 100 req/sec
RPC_CONFIG.QUICKNODE_RATE_LIMIT = 15      // QuickNode fallback: 15 req/sec
RPC_CONFIG.TIMEOUT = 60000                // 60 seconds

// Rate Limiting (Optimized for Helius)
RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND = 50  // Helius standard capacity
RATE_LIMIT_CONFIG.BATCH_SIZE = 40              // Larger batches with Helius
RATE_LIMIT_CONFIG.REQUEST_DELAY = 10           // 10ms between requests

// Caching
CACHE_CONFIG.MAX_TRANSACTION_CACHE = 10000
CACHE_CONFIG.METRICS_CACHE_TTL = 30000  // 30 seconds
```

### Environment Variables

```bash
# RPC Configuration (Helius Primary, QuickNode Backup)
HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
HELIUS_SECURE_RPC_URL=https://your-secure-endpoint.helius-rpc.com
HELIUS_RATE_LIMIT=50
HELIUS_SECURE_RATE_LIMIT=100
QUICKNODE_RPC_URL=https://your-endpoint.solana-mainnet.quiknode.pro/
QUICKNODE_RATE_LIMIT=15
RPC_TIMEOUT=60000

# Rate Limiting (Optimized for Helius)
MAX_RPS=50
BATCH_SIZE=40
REQUEST_DELAY=10

# Cache Settings
METRICS_CACHE_TTL=30000
MAX_TX_CACHE=10000
MAX_CONTRIBUTOR_CACHE=5000

# Features
ENABLE_DIAGNOSTICS=true
ENABLE_WEBSOCKET=true
ENABLE_AUTO_RECONNECT=true
```

## 🔧 Modules

### 1. RPC Manager (`services/rpc-manager.ts`)

Manages multiple RPC endpoints with automatic failover and priority routing:

**Default Priority Order:**
1. **Helius Secure** (100 req/s) - Fastest, highest capacity
2. **Helius Standard** (50 req/s) - High performance primary
3. **QuickNode** (15 req/s) - Reliable backup
4. **Public** (5 req/s) - Emergency fallback

```typescript
import { rpcManager } from './services/rpc-manager'

// Add custom endpoint
rpcManager.addEndpoint({
  name: 'custom',
  url: 'https://custom-rpc.com',
  priority: 1,
  rateLimit: 20,
  healthy: true
})

// Execute with retry and failover
const result = await rpcManager.executeWithRetry(
  async (connection) => {
    return await connection.getBalance(publicKey)
  },
  { maxRetries: 3, preferredEndpoint: 'quicknode' }
)

// Check health
const health = await rpcManager.checkAllEndpoints()
```

### 2. Rate Limiter (`utils/rate-limiter.ts`)

Multiple rate limiting strategies:

```typescript
import { createRateLimiter } from './utils/rate-limiter'

// Token bucket (smooth, allows bursts)
const limiter = createRateLimiter('token-bucket', 15)

// Sliding window (precise)
const limiter = createRateLimiter('sliding-window', 15)

// Composite (maximum protection)
const limiter = createRateLimiter('composite', 15)

// Use the limiter
await limiter.throttle()  // Will wait if rate limit exceeded

// Get statistics
const stats = limiter.getStats()
console.log(`Tokens available: ${stats.currentTokens}`)
console.log(`Throttled requests: ${stats.throttledRequests}`)
```

### 3. Cache Manager (`utils/cache-manager.ts`)

LRU caching with TTL support:

```typescript
import { cacheManager, transactionCache } from './utils/cache-manager'

// Use predefined caches
transactionCache.set('tx123', transactionData)
const tx = transactionCache.get('tx123')

// Create custom cache
const customCache = cacheManager.createCache('custom', 1000, 60000)
customCache.set('key', 'value', 5000)  // 5 second TTL

// Get cache statistics
const stats = cacheManager.getAllStats()
console.log(`Cache hit rate: ${stats.transactions.hitRate}`)

// Memory management
cacheManager.pruneAll()  // Remove expired entries
const memory = cacheManager.getTotalMemoryUsage()
```

### 4. Diagnostics (`diagnostics/index.ts`)

Comprehensive monitoring and diagnostics:

```typescript
import { diagnosticsManager } from './diagnostics'

// Start monitoring
diagnosticsManager.startMonitoring(60000)  // Log every minute

// Record performance
const start = Date.now()
// ... operation ...
diagnosticsManager.recordPerformance('fetchTransactions', Date.now() - start)

// Record errors
diagnosticsManager.recordError(ErrorType.RPC_ERROR, error)

// Generate report
const report = diagnosticsManager.generateReport()
console.log(report.recommendations)

// Health check
const health = await diagnosticsManager.healthCheck()
if (!health.healthy) {
  console.error('System unhealthy:', health.checks)
}

// Export diagnostics
await diagnosticsManager.exportDiagnostics('./diagnostics-report.json')
```

## 📊 Performance Characteristics

### With Helius (50 req/sec) - CURRENT CONFIGURATION
- **1000 transactions**: ~20 seconds (3.3x faster)
- **2000 transactions**: ~40 seconds (3.3x faster)
- **5000 transactions**: ~100 seconds (3.3x faster)
- **Request rate**: 45-50 req/sec (optimal utilization)
- **Memory usage**: ~50-100MB with full caches

### With Helius Secure (100 req/sec) - Available
- **1000 transactions**: ~10 seconds (6.7x faster)
- **2000 transactions**: ~20 seconds (6.7x faster)
- **5000 transactions**: ~50 seconds (6.7x faster)
- **Request rate**: 90-100 req/sec (maximum throughput)

### Previous QuickNode Settings (15 req/sec)
- **1000 transactions**: ~67 seconds
- **2000 transactions**: ~134 seconds
- **Request rate**: 14-15 req/sec

### Rate Limiting Behavior
```
Request Pattern with Helius (50 req/sec):
Second 0: ██████████████████████████████████████████████████ 50 req
Second 1: ██████████████████████████████████████████████████ 50 req
Second 2: ██████████████████████████████████████████████████ 50 req
...consistent 50 req/sec, smooth processing
```

## 🔍 Diagnostics Output

```
========== DIAGNOSTICS REPORT ==========
Timestamp: 2024-10-25T10:00:00.000Z
Uptime: 45m
Health: ✅

Performance:
  RPS: 14.52
  Avg Latency: 45ms
  P95 Latency: 120ms
  Error Rate: 0.01%
  Cache Hit Rate: 87.34%

RPC:
  Endpoint: quicknode
  Latency: 42ms
  Tokens: 12/15

Recommendations:
  ⚠️  Consider increasing cache TTL for better hit rate
========================================
```

## 🛠️ Troubleshooting

### High Latency
1. Check RPC endpoint health: `rpcManager.checkAllEndpoints()`
2. Verify rate limiter tokens: `globalRateLimiter.getStats()`
3. Check cache hit rate: `cacheManager.getOverallHitRate()`

### 429 Rate Limit Errors
1. Reduce `MAX_REQUESTS_PER_SECOND` in config
2. Increase `REQUEST_DELAY` between requests
3. Check actual request rate in diagnostics

### Memory Issues
1. Reduce cache sizes in `CACHE_CONFIG`
2. Call `cacheManager.pruneAll()` periodically
3. Monitor with `cacheManager.getTotalMemoryUsage()`

### Connection Issues
1. Check all endpoints: `rpcManager.checkAllEndpoints()`
2. Verify WebSocket URL in config
3. Enable auto-reconnect: `ENABLE_AUTO_RECONNECT=true`

## 📈 Optimization Tips

### For Maximum Speed (WITH HELIUS)
```typescript
// Use Helius Secure for 100 req/sec capacity
RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND = 100
RATE_LIMIT_CONFIG.BATCH_SIZE = 80
RATE_LIMIT_CONFIG.REQUEST_DELAY = 5

// Increase cache sizes
CACHE_CONFIG.MAX_TRANSACTION_CACHE = 20000

// Use composite rate limiter for burst handling
const limiter = createRateLimiter('composite', 100)
```

### For Stability
```typescript
// Conservative rate limiting
RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_SECOND = 10
RATE_LIMIT_CONFIG.REQUEST_DELAY = 50

// Enable all diagnostics
MONITORING_CONFIG.ENABLE_DIAGNOSTICS = true
MONITORING_CONFIG.ENABLE_REQUEST_LOGGING = true

// Increase retry attempts
RATE_LIMIT_CONFIG.MAX_RETRIES = 5
```

## 📝 API Usage Example

```typescript
import {
  PresaleMonitoringService,
  diagnosticsManager,
  rpcManager
} from './lib/presale-monitoring'

// Initialize service
const monitor = new PresaleMonitoringService('wallet-address')

// Enable diagnostics
diagnosticsManager.startMonitoring()

// Fetch metrics
const metrics = await monitor.getMetrics()
console.log(`Total raised: $${metrics.totalRaised.totalUSD}`)
console.log(`Contributors: ${metrics.uniqueContributors}`)

// Get top contributors
const contributors = await monitor.getTopContributors(20)

// Start real-time monitoring
await monitor.startRealtimeMonitoring((update) => {
  console.log('Update:', update.type, update.data)
})

// Check system health
const health = await diagnosticsManager.healthCheck()
console.log('System healthy:', health.healthy)

// Generate diagnostics report
const report = diagnosticsManager.generateReport()
await diagnosticsManager.exportDiagnostics('./report.json')

// Cleanup
monitor.dispose()
diagnosticsManager.stopMonitoring()
```

## 🔐 Security Considerations

1. **RPC URLs**: Store sensitive URLs in environment variables
2. **Rate Limits**: Respect provider limits to avoid bans
3. **Cache Data**: Don't cache sensitive information
4. **Error Messages**: Sanitize error messages in production
5. **Access Control**: Implement authentication for API endpoints

## 📄 License

Internal use only. All rights reserved.