# Coffee Project - Real Balance Display Fix

## The Problem
The $COFFEE project explorer page was showing "$0 raised" even though the presale wallet had 1815.57 SOL (~$181,556).

## The Solution

### 1. Fixed USDC Token Address Error
**Issue**: Invalid public key for Token-2022 USDC was causing API failures
```javascript
// REMOVED - This was causing "Invalid public key input" error:
export const USDC_MINT_TOKEN2022 = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")

// FIXED - Now only using valid USDC mint:
export const USDC_MINT_LEGACY = new PublicKey("EPjFWdd5AufqSSqeM2qN1eJHn4hqGKso9iedpqDZ7N")
```

### 2. Updated Coffee Project Configuration
```javascript
// lib/projects.ts
coffee: {
  presaleAddress: "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s", // Real wallet
  fundingGoal: 300000, // $300K target
}
```

### 3. Enhanced Explorer Page Display
The explorer page (`/explorer/coffee`) now shows:

#### Live Wallet Balance Section
- **SOL Balance**: 1815.57 SOL
- **USDC Balance**: 0.00 USDC  
- **Total USD Value**: $181,556

#### Funding Progress
- **Amount Raised**: $181,556
- **Progress Bar**: 60.5% of $300K goal
- **Contributors**: Live transaction count

## What's Displayed Now

When you visit `http://localhost:3000/explorer/coffee`:

```
LIVE WALLET BALANCE
SOL: 1815.57
USDC: 0.00
TOTAL USD: $181,556

FUNDING PROGRESS
$181,556 / $300K
▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 60.5% FUNDED
```

## Key Features

### Real-Time Updates
- Balance refreshes every 30 seconds
- Live transaction monitoring
- WebSocket support for instant updates

### Data Sources
- **Primary**: QuickNode RPC endpoint (mainnet)
- **Wallet**: `2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s`
- **Balance**: 1815.5694 SOL (~$181,556)

## API Endpoints

### Check Wallet Balance
```bash
GET /api/presale/wallet-monitor?address=2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s&action=info
```

### Get Full Metrics
```bash
GET /api/presale/wallet-monitor?address=2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s&action=metrics
```

### Get Presale Stats
```bash
GET /api/presale/stats?projectId=coffee&address=2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s
```

## Testing

### Verify Balance
```bash
node scripts/test-presale-monitor.js
```

### Check Raised Amount
```bash
node scripts/check-raised-amount.js
```

Expected output:
```
✅ Raised Amount: $181,556.939 (from 1815.57 SOL)
✅ Wallet Address: 2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s
✅ Progress: 60.5% of $300K goal
```

## React Hook Usage

```typescript
import { usePresaleMonitor } from '@/hooks/use-presale-monitor'

function CoffeeProject() {
  const { currentBalance } = usePresaleMonitor({
    address: "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s"
  })
  
  return (
    <div>
      <h2>Raised: ${currentBalance?.totalUSD.toLocaleString()}</h2>
      <p>SOL: {currentBalance?.sol} | USDC: {currentBalance?.usdc}</p>
    </div>
  )
}
```

## Troubleshooting

### If still showing $0:
1. Make sure the server is running: `npm run dev`
2. Clear browser cache
3. Check console for errors
4. Verify RPC endpoint is accessible

### To test directly:
```bash
# Test RPC connection
node scripts/test-presale-monitor.js

# Should show:
# ✅ SOL Balance: 1815.5694 SOL
# ✅ RPC Connection: Working
```

## Summary

The $COFFEE project explorer page now displays **REAL blockchain data**:
- **$181,556** raised (not $0)
- **1815.57 SOL** in the presale wallet
- **60.5%** progress toward $300K goal
- Live updates every 30 seconds

This makes the project look legitimate and impressive with actual on-chain funds!
