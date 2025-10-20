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
  revenueShare: number // % of profits distributed to token holders
  features: string[]
  milestones: Array<{
    target: number
    description: string
    status: "pending" | "completed"
  }>
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
    fundingGoal: 500000, // $500K realistic funding goal
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "presale",
    presaleAddress: "9tH8oUjnjX4pzr6aRmo9V3ESoAZ2yUBQDzgBhfJNc6rM",
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
    ]
  }
  ,
  market: {
    id: "market",
    name: "$MARKET",
    symbol: "MARKET",
    description: "Community-owned supermarket. Every basket funds ownership; profits are shared with token holders.",
    category: "Supermarket Grocer",
    price: 0.15,
    totalSupply: 100_000_000, // 100M tokens
    presaleSupply: 30_000_000, // 30M for presale
    fundingGoal: 500000, // $500K realistic funding goal
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "coming_soon",
    // Provide your presale wallet to enable live tracking
    presaleAddress: "",
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
      "Holder discounts and perks",
      "Tradeable on DEX after launch",
      "First access to future $NOW launches"
    ],
    milestones: [
      { target: 125000, description: "Secure location & permits", status: "pending" },
      { target: 250000, description: "Equipment & interior setup", status: "pending" },
      { target: 375000, description: "Initial inventory & staff training", status: "pending" },
      { target: 500000, description: "Grand opening & marketing", status: "pending" }
    ]
  },
  rico: {
    id: "rico",
    name: "$RICO",
    symbol: "RICO",
    description: "Licensed precious metals refinery in São Paulo. We source scrap gold, silver, platinum, and palladium from electronics, jewelry, and industrial sources. Tokenized ownership with transparent on-chain operations and monthly profit distributions.",
    category: "Precious Metals Refinery",
    price: 1.00,
    totalSupply: 10_000_000, // 10M tokens
    presaleSupply: 2_000_000, // 2M for presale (20% equity)
    fundingGoal: 2000000, // $2M target
    raised: 0,
    location: "São Paulo, Brazil",
    opening: "Q2 2025",
    status: "presale",
    presaleAddress: "RiCoMetaLs7xYzKp9vQ3HwB2mJ8NfT6aL4cD1eF2gH3j",
    tokenomics: {
      presale: 20, // 2M tokens (20% equity)
      liquidity: 15, // 1.5M tokens (15%)
      treasury: 40, // 4M tokens (40% - founders & operations)
      team: 10 // 1M tokens (10% - employee stock)
    },
    rewards: 15, // 1.5M tokens for community rewards (15%)
    revenueShare: 60, // 60% of NET profits to token holders
    features: [
      "Monthly profit distributions in USDC (60% of net profit)",
      "Quarterly option for physical silver delivery",
      "Transparent on-chain batch tracking (weight, purity, margins)",
      "Governance rights on expansion and metal categories",
      "Audited inventory reports and refining metrics",
      "Priority access to wholesale metal purchases"
    ],
    milestones: [
      { target: 500000, description: "New refining equipment & capacity expansion", status: "pending" },
      { target: 1000000, description: "Working capital for inventory & operations", status: "pending" },
      { target: 1500000, description: "Compliance upgrades & vault security", status: "pending" },
      { target: 2000000, description: "Operating reserve & Mexico City expansion planning", status: "pending" }
    ]
  }
}

export const getProject = (id: string): Project | undefined => {
  return projects[id]
}

export const getAllProjects = (): Project[] => {
  return Object.values(projects)
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
