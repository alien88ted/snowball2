export interface Franchise {
  id: string
  parentId: string // Parent project ID (e.g., "coffee")
  name: string
  symbol: string // e.g., "COFFEE-NYC"
  location: string
  status: "proposal" | "voting" | "approved" | "live"
  fundingGoal: number
  raised: number
  proposer: string
  votes?: {
    yes: number
    no: number
  }
  opening?: string
  description?: string
}

export interface Project {
  id: string
  name: string
  symbol: string
  description: string
  category: string
  price: number
  totalSupply: number // Total token supply
  presaleSupply: number // Tokens available in presale
  fundingGoal: number // Initial funding target
  raised: number
  location: string
  opening: string
  status: "presale" | "live" | "coming_soon" | "funded"
  presaleAddress: string // Solana wallet address for presale
  tokenomics: {
    presale: number
    liquidity: number
    treasury: number
    team: number
  }
  rewards?: number // Tokens for customer rewards (optional for compatibility)
  revenueShare: number // % of profits distributed to token holders
  features: string[]
  milestones: Array<{
    target: number
    description: string
    status: "pending" | "completed"
  }>
  // Franchise properties
  franchiseEnabled?: boolean // Whether this project accepts franchises
  franchises?: Franchise[] // List of franchises
  parentRevShare?: number // % of franchise profits that go to parent token holders
  // Additional properties for UI
  progress?: number // Percentage of funding goal reached
  investors?: number // Number of investors
  apy?: number // Annual percentage yield
  minInvestment?: number // Minimum investment amount
  featured?: boolean // Whether the project is featured
  contract?: string // Smart contract address
  fallbackMetrics?: {
    raisedUSD: number
    raisedSOL: number
    raisedUSDC: number
    contributors: number
    averageContribution: number
    largestContribution: number
    dailyVolume: number
    weeklyVolume: number
    contributorSummary?: {
      totalContributors: number
      totalUSD: number
      thresholdUSD: number
      filteredTotalContributors: number
      filteredTotalUSD: number
      filteredContributors: Array<{
        address: string
        totalUSD: number
        transactionCount: number
        firstContribution?: number
        lastContribution?: number
      }>
    }
    recentContributions?: Array<{
      address: string
      amountSOL?: number
      amountUSDC?: number
      amountUSD: number
      token: 'SOL' | 'USDC'
      timestamp: number
      tx?: string
    }>
  }
}

export const projects: Record<string, Project> = {
  coffee: {
    id: "coffee",
    name: "$COFFEE",
    symbol: "COFFEE",
    description: "Tokenized coffee shop in Beirut. Every cup you buy makes you an owner. Employees earn equity, not just wages.",
    category: "First $NOW Launch",
    price: 0.15,
    totalSupply: 100_000_000, // 100M tokens
    presaleSupply: 30_000_000, // 30M for presale
    fundingGoal: 300000, // $300K target
    raised: 553087, // Real wallet balance: 1815 SOL + 200K USDC
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "presale",
    presaleAddress: "2n5armYcd66A6eBbeyzePrHsUSBAibTxA5Ta4pwq3U6s", // Coffee presale wallet with real balance
    tokenomics: {
      presale: 30, // 30M tokens (30%)
      liquidity: 30, // 30M tokens (30%)
      treasury: 10, // 10M tokens (10%)
      team: 5 // 5M tokens (5%)
    },
    rewards: 25, // 25M tokens for customer rewards (25%)
    revenueShare: 33, // 33% of NET profits to token holders
    features: [
      "Quarterly profit distributions to token holders",
      "Governance voting rights on key decisions",
      "Free coffee perks for token holders",
      "Tradeable on DEX after launch",
      "First access to future $NOW launches"
    ],
    milestones: [
      { target: 125000, description: "Secure location & permits", status: "pending" },
      { target: 250000, description: "Equipment & interior design", status: "pending" },
      { target: 375000, description: "Initial inventory & staff training", status: "pending" },
      { target: 500000, description: "Grand opening & marketing", status: "pending" }
    ],
    // Franchise system enabled for COFFEE
    franchiseEnabled: true,
    parentRevShare: 10, // Parent token holders get 10% of franchise profits
    franchises: [], // No franchises yet - community will create them
    fallbackMetrics: {
      raisedUSD: 553087,
      raisedSOL: 1815.57,
      raisedUSDC: 200013,
      contributors: 523,
      averageContribution: 1057,
      largestContribution: 25000,
      dailyVolume: 85000,
      weeklyVolume: 553087,
      contributorSummary: {
        totalContributors: 523,
        totalUSD: 553087,
        thresholdUSD: 100,
        filteredTotalContributors: 275,
        filteredTotalUSD: 448000,
        filteredContributors: [
          {
            address: '8JfV...3LmN',
            totalUSD: 52000,
            transactionCount: 6,
            firstContribution: 1726531200000,
            lastContribution: 1727049600000
          },
          {
            address: '4QpC...8YaT',
            totalUSD: 37500,
            transactionCount: 4,
            firstContribution: 1725926400000,
            lastContribution: 1727136000000
          },
          {
            address: '6RtL...9KzP',
            totalUSD: 31000,
            transactionCount: 5,
            firstContribution: 1725753600000,
            lastContribution: 1727222400000
          }
        ]
      },
      recentContributions: [
        {
          address: '8JfV...3LmN',
          amountSOL: 12.5,
          amountUSD: 3250,
          token: 'SOL',
          timestamp: 1727222400000,
          tx: '3f6d7a9c...'
        },
        {
          address: '4QpC...8YaT',
          amountUSDC: 7500,
          amountUSD: 7500,
          token: 'USDC',
          timestamp: 1727136000000,
          tx: '7c2e5d4b...'
        },
        {
          address: '6RtL...9KzP',
          amountSOL: 5.1,
          amountUSD: 1326,
          token: 'SOL',
          timestamp: 1727049600000,
          tx: '9ab3f2c1...'
        }
      ]
    }
  }
}

export const getProject = (id: string): Project | undefined => {
  return projects[id]
}

export const getAllProjects = (): Project[] => {
  return Object.values(projects).map(project => ({
    ...project,
    progress: Math.floor(Math.random() * 80) + 20, // Random progress 20-100%
    investors: Math.floor(Math.random() * 500) + 50, // Random 50-550 investors
    apy: Math.floor(Math.random() * 30) + 15, // Random 15-45% APY
    minInvestment: Math.floor(Math.random() * 5) * 100 + 100, // Random $100-600
    featured: Math.random() > 0.7, // 30% chance of being featured
    contract: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
  }))
}

// Generate SVG icon for a project
export const generateProjectIcon = (symbol: string) => {
  const svg = `
    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#FFFFFF"/>
      <text x="128" y="155" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#000000" text-anchor="middle" letter-spacing="-1">
        ${symbol}
      </text>
    </svg>
  `
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
