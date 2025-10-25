# Presale Wallet Monitoring API

## Overview
Real-time Solana wallet monitoring service for tracking presale wallet balances and transactions using QuickNode RPC.

## Configuration
The service uses QuickNode RPC endpoint for reliable mainnet access:
- **RPC URL**: `https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/`
- **WebSocket**: `wss://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/`

## Coffee Presale Wallet
- **Address**: `2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s`
- **Current Balance**: ~1815 SOL (~$181,556)
- **Status**: LIVE and accepting contributions

## API Endpoints

### 1. Wallet Info
Get current wallet balance (SOL + USDC)
```
GET /api/presale/wallet-monitor?address={wallet}&action=info
```

**Response:**
```json
{
  "address": "2n5arm...",
  "solBalance": 1815.5694,
  "usdcBalance": 0,
  "totalValueUSD": 181556.94,
  "solPrice": 100,
  "lastUpdated": 1735343000000
}
```

### 2. Comprehensive Metrics
Get detailed presale metrics and analytics
```
GET /api/presale/wallet-monitor?address={wallet}&action=metrics
```

**Response:**
```json
{
  "wallet": { /* wallet info */ },
  "totalRaised": {
    "sol": 1815.5694,
    "usdc": 0,
    "totalUSD": 181556.94
  },
  "recentTransactions": [],
  "dailyVolume": 0,
  "weeklyVolume": 0,
  "transactionCount": {
    "total": 5,
    "deposits": 5,
    "withdrawals": 0
  },
  "uniqueContributors": 3,
  "averageContribution": 605.19,
  "largestContribution": 1000
}
```

### 3. Transaction History
Get recent transactions for the wallet
```
GET /api/presale/wallet-monitor?address={wallet}&action=transactions&limit=50
```

**Response:**
```json
{
  "address": "2n5arm...",
  "transactions": [
    {
      "signature": "4ub74F...",
      "type": "deposit",
      "amount": 10.5,
      "token": "SOL",
      "from": "9XYZ...",
      "to": "2n5arm...",
      "timestamp": 1735343000000,
      "status": "success",
      "usdValue": 1050
    }
  ],
  "count": 5,
  "timestamp": 1735343000000
}
```

### 4. Quick Summary
Get a lightweight summary of wallet activity
```
GET /api/presale/wallet-monitor?address={wallet}&action=summary
```

**Response:**
```json
{
  "address": "2n5arm...",
  "currentBalance": {
    "sol": 1815.5694,
    "usdc": 0,
    "totalUSD": 181556.94
  },
  "solPrice": 100,
  "recentActivity": {
    "transactions": 5,
    "deposits": 5,
    "totalDepositedUSD": 181556.94
  },
  "lastTransaction": { /* transaction details */ },
  "timestamp": 1735343000000
}
```

### 5. Historical Analysis
Get historical data and trends
```
GET /api/presale/wallet-monitor?address={wallet}&action=historical&days=30
```

**Response:**
```json
{
  "address": "2n5arm...",
  "period": "30 days",
  "dailyVolumes": [
    { "date": "2024-10-25", "volume": 5000 },
    { "date": "2024-10-26", "volume": 8500 }
  ],
  "cumulativeRaised": [
    { "date": "2024-10-25", "total": 5000 },
    { "date": "2024-10-26", "total": 13500 }
  ],
  "topContributors": [
    { "address": "9XYZ...", "total": 50000, "count": 5 }
  ],
  "timestamp": 1735343000000
}
```

### 6. Presale Stats (Legacy)
Combined endpoint for presale statistics
```
GET /api/presale/stats?address={wallet}&projectId=coffee
```

This endpoint integrates with the monitoring service and provides backward compatibility.

## React Hook Usage

```typescript
import { usePresaleMonitor } from '@/hooks/use-presale-monitor'

function MyComponent() {
  const {
    walletInfo,
    currentBalance,
    metrics,
    summary,
    transactions,
    fetchMetrics,
    fetchHistoricalAnalysis
  } = usePresaleMonitor({
    address: "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s",
    refreshInterval: 10000, // 10 seconds
    enableRealtime: true // WebSocket updates
  })

  return (
    <div>
      <h2>Current Balance</h2>
      <p>SOL: {currentBalance?.sol}</p>
      <p>USDC: {currentBalance?.usdc}</p>
      <p>Total USD: ${currentBalance?.totalUSD}</p>
    </div>
  )
}
```

## Component Usage

```typescript
import { PresaleMonitorWidget } from '@/components/presale-monitor-widget'

function MyPage() {
  return (
    <PresaleMonitorWidget
      address="2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s"
      projectName="Coffee Shop"
      refreshInterval={30000}
    />
  )
}
```

## Testing

Run the test script to verify connectivity:
```bash
node scripts/test-presale-monitor.js
```

Expected output:
- SOL Balance: 1815.5694 SOL
- USDC Balance: 0.00 USDC
- Recent transactions count
- RPC connection status

## Cache Strategy
- **Wallet Info**: No cache (real-time)
- **Metrics**: 10-second cache
- **Transactions**: 30-second cache
- **Historical**: 5-minute cache
- **Summary**: 5-second cache

## Rate Limiting
QuickNode RPC has generous rate limits. The service implements:
- Internal caching to reduce RPC calls
- Batch transaction fetching
- Configurable refresh intervals
- WebSocket for real-time updates (reduces polling)

## Security Notes
1. RPC endpoints are configured server-side only
2. Wallet addresses are validated before queries
3. All responses include proper CORS headers
4. Rate limiting prevents abuse

## Monitoring Multiple Wallets

The service supports monitoring multiple presale wallets simultaneously:

```typescript
const coffeeMonitor = new PresaleMonitoringService(COFFEE_ADDRESS)
const marketMonitor = new PresaleMonitoringService(MARKET_ADDRESS)
const fashionMonitor = new PresaleMonitoringService(FASHION_ADDRESS)
```

## WebSocket Real-time Updates

For real-time balance updates:

```javascript
const ws = new WebSocket(QUICKNODE_WSS_URL)

ws.send(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "accountSubscribe",
  params: [
    "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s",
    { encoding: "jsonParsed", commitment: "confirmed" }
  ]
}))

ws.on('message', (data) => {
  // Handle balance updates
})
```

## Troubleshooting

### Connection Issues
- Verify RPC endpoint is accessible
- Check network connectivity
- Ensure wallet address is valid

### Balance Mismatch
- Confirm using correct wallet address
- Check for pending transactions
- Verify USDC mint addresses

### Performance
- Increase cache TTL for less frequent updates
- Use WebSocket for real-time needs
- Batch transaction queries

## Support

For issues or questions:
1. Check the test script first: `scripts/test-presale-monitor.js`
2. Verify RPC endpoint status
3. Check console for detailed error messages
