# TODO — High-Level, No-Micromanage Checklist

Keep it simple. This is just the unfinished stuff and the external connections we need to wire. Use this as a north star for Claude + devs.

## Governance
- [ ] Keep page locked until go-live flag is ready (env: `NEXT_PUBLIC_GOVERNANCE_OPEN=true|false`)
- [ ] Replace local queue with real DB (Supabase/Postgres). Table: `proposals(id, title, summary, detail, contact, status, created_at)`
- [ ] Admin list view to review/approve queued proposals (basic table UI)
- [ ] Add spam protection (rate limit per IP + optional CAPTCHA)
- [ ] Wallet/voting integration plan (on-chain snapshot or off-chain tally w/ proofs)

## API + Integrations
- [ ] `POST /api/proposals` → move JSON file storage to DB; add basic auth for admin reads
- [ ] `GET /api/wallet` → set `SOLANA_RPC_URL` (Helius/QuickNode or public RPC). Add server-side caching + rate limits
- [ ] `POST /api/generate-icon` → move API key to env `PIXELLAB_API_KEY`; add fallback-only mode if key missing
- [ ] Add global rate limiting middleware for `/api/*`

## Env Vars (set for prod)
- [ ] `NEXT_PUBLIC_SITE_URL` → public base URL
- [ ] `NEXT_PUBLIC_PRIVY_APP_ID` → required for auth
- [ ] `SOLANA_RPC_URL` and/or `NEXT_PUBLIC_SOLANA_RPC_URL` → wallet balances
- [ ] `PIXELLAB_API_KEY` → optional, image generation (keep server-only)

## Auth
- [ ] Confirm Privy provider is configured once (remove/merge `components/auth-provider.tsx` vs `components/providers.tsx`)
- [ ] Gate privileged actions behind auth (admin review, etc.)

## Explorer / Projects
- [ ] Replace hardcoded projects (`lib/projects.ts`) with DB/CMS source
- [ ] Fill real `presaleAddress` per project to enable live funding progress
- [ ] Add caching for wallet totals to avoid spamming RPC

## Portfolio
- [ ] Replace mock holdings with real user data (wallet + backend positions)
- [ ] Show distributions/earn history once revenue share live

## Governance Unlock Prep
- [ ] Feature flag to toggle proposals list + voting UI
- [ ] Finalize voting spec (weights, quorum, durations)
- [ ] Email/webhook on proposal submit (ops inbox / Discord)

## Security & Ops
- [ ] Move all secrets to `.env` and never bundle client-side
- [ ] Add simple logging on API errors (no PII)
- [ ] Add healthcheck page/route if deploying serverlessly

---

## Connection Map (What plugs into what)
- Governance form → `POST /api/proposals` → DB table `proposals`
- Admin review (TBD page) → `GET/PUT /api/proposals` → change `status`
- Explorer cards → wallet totals via `GET /api/wallet` → Solana RPC
- Icon generation (optional) → `POST /api/generate-icon` → PixelLab API (env key) → fallback SVG if unavailable
- Auth (Privy) → `NEXT_PUBLIC_PRIVY_APP_ID` → wrap app in `Providers`

## Minimal Setup Steps (prod)
- [ ] Set env vars above
- [ ] Provision Postgres/Supabase and create `proposals` table
- [ ] Point `SOLANA_RPC_URL` at a reliable RPC
- [ ] (Optional) Add `PIXELLAB_API_KEY` or rely on fallback SVGs
- [ ] Deploy, verify `/api/*` endpoints, then flip governance flag when ready

