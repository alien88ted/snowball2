export interface Project {
  id: string
  name: string
  symbol: string
  description: string
  category: string
  price: number
  fundingGoal: number
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
    fundingGoal: 500000,
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "presale",
    presaleAddress: "9tH8oUjnjX4pzr6aRmo9V3ESoAZ2yUBQDzgBhfJNc6rM",
    tokenomics: {
      presale: 33,
      liquidity: 33,
      treasury: 33,
      team: 1
    },
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
    fundingGoal: 500000,
    raised: 0,
    location: "Beirut, Lebanon",
    opening: "Q4 2025",
    status: "presale",
    // Provide your presale wallet to enable live tracking
    presaleAddress: "",
    tokenomics: {
      presale: 33,
      liquidity: 33,
      treasury: 33,
      team: 1
    },
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
