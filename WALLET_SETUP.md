# Solana Wallet Integration Setup

## ✅ What's Been Implemented

The application now supports Solana wallet connections using the official Solana Wallet Adapter. Users can connect with:
- **Phantom Wallet** (Most popular)
- **Solflare Wallet**
- **Backpack Wallet**
- Any wallet that supports the Solana Wallet Standard

## 🔧 Configuration

### Option 1: Solana Wallets Only (Recommended)

No configuration needed! The app will automatically use Solana wallets. Just run:

```bash
npm run dev
```

### Option 2: Privy + Solana Wallets (Optional)

If you want to use Privy for authentication alongside Solana wallets:

1. Create a `.env.local` file in the root directory
2. Add your Privy App ID:

```env
# Optional - Only add if you want Privy authentication
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id-here
```

## 🚀 How It Works

### For Users:
1. Click "CONNECT WALLET" button
2. Select their Solana wallet (Phantom, Solflare, etc.)
3. Approve the connection in their wallet
4. The wallet address will be displayed in the header

### For Developers:

The integration uses a unified wallet hook that works with both systems:

```typescript
import { useUnifiedWallet } from '@/hooks/use-unified-wallet'

function MyComponent() {
  const wallet = useUnifiedWallet()
  
  if (wallet.connected) {
    console.log('Wallet address:', wallet.address)
    console.log('Public key:', wallet.publicKey)
  }
}
```

## 🎨 Design

The wallet connection modal and buttons have been styled to match the brutalist design of the site:
- Black borders, no rounded corners
- Uppercase text with proper spacing
- White background with black hover states
- Red (#DC143C) accent color

## 🔌 RPC Configuration

The app uses your QuickNode RPC endpoint for all Solana interactions:
```
https://few-side-liquid.solana-mainnet.quiknode.pro/4a9812018a554804b8cc2c84bd78f02e84b7a903/
```

This is hardcoded in `components/solana-wallet-provider.tsx` but can be overridden with environment variables.

## 📝 Important Notes

1. **Privy is Optional**: The app works perfectly without Privy. It's only needed if you want additional authentication features.

2. **Wallet Priority**: When both systems are available, Solana wallets take priority over Privy wallets.

3. **Presale Integration**: The presale system automatically uses the connected Solana wallet address for contributions.

4. **Error Handling**: If Privy isn't configured properly, the app will gracefully fallback to Solana-only mode.

## 🐛 Troubleshooting

### "Cannot read properties of undefined" Error
This was caused by invalid Privy configuration and has been fixed. The app now handles missing Privy gracefully.

### Wallet Not Connecting
1. Make sure you have a Solana wallet extension installed (Phantom, Solflare, etc.)
2. Check that the wallet is unlocked
3. Try refreshing the page

### Styling Issues
The wallet adapter styles are imported in `app/globals.css` and overridden in `app/solana-wallet.css`.

## 🔗 Resources

- [Solana Wallet Adapter Docs](https://github.com/anza-xyz/wallet-adapter)
- [Phantom Wallet](https://phantom.app/)
- [Solflare Wallet](https://solflare.com/)
