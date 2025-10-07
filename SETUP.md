# Setup Guide for $now.fun

## ✅ Already Done
- Dependencies installed
- Performance optimizations applied
- Privy authentication integrated

## 🔧 Required Setup

### 1. Get Privy App ID
1. Go to https://dashboard.privy.io/
2. Sign up or log in
3. Create a new app
4. Copy your **App ID**
5. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_PRIVY_APP_ID=your_actual_app_id_here
   ```

### 2. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🚀 Features Implemented

### Performance Optimizations
- ✅ Canvas animation optimized (viewport-only rendering)
- ✅ Reduced motion support (respects user preferences)
- ✅ Throttled scroll handlers (prevents excessive re-renders)
- ✅ Visibility API integration (pauses when tab inactive)

### Authentication
- ✅ Privy integration with email & wallet support
- ✅ Sign in/out in header
- ✅ User info display
- ✅ Mobile-responsive auth menu

### Pages
- ✅ Landing page with animated background
- ✅ Explorer with search/filter/sort
- ✅ Create flow with live preview
- ✅ Project detail pages with download assets
- ✅ Documentation page

## 🐛 Troubleshooting

### If you get "MODULE_NOT_FOUND" errors:
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### If React hook errors appear:
Make sure you're using the LOCAL Next.js:
```bash
npx next dev
```

### If it's still laggy:
1. Disable background animation on mobile (edit `app/page.tsx`)
2. Reduce flake count in `components/snow-depth-background.tsx`
3. Check browser DevTools Performance tab

## 📝 Notes
- Using Next.js 14.2.16 (not 15.x)
- Node.js 18+ or 20+ recommended (you're on 22, might work but officially unsupported)
- All performance optimizations respect `prefers-reduced-motion`

