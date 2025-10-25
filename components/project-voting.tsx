"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowLeft, Copy, Check, Wallet, Circle,
  CheckCircle2, ArrowUpRight, Vote,
  ThumbsUp, ThumbsDown, Clock, Users,
  AlertTriangle, Shield, TrendingUp
} from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { usePresale } from "@/hooks/use-presale"
import { usePrivy } from "@privy-io/react-auth"

interface ProjectVotingProps {
  project: Project
}

interface Proposal {
  id: number
  title: string
  description: string
  type: 'treasury' | 'operations' | 'expansion' | 'governance'
  status: 'active' | 'passed' | 'rejected' | 'pending'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  deadline: string
  proposer: string
  created: string
}

export function ProjectVoting({ project }: ProjectVotingProps) {
  const [mounted, setMounted] = useState(false)
  const { data: presaleData, loading } = usePresale(project.id, project.presaleAddress)
  const [copied, setCopied] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)
  const [userVotes, setUserVotes] = useState<Record<number, 'for' | 'against'>>({})
  const { ready, authenticated, user, login } = usePrivy()
  
  // Mock proposals data
  const [proposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "EXPAND TO NEW LOCATION",
      description: "Open second coffee shop location in downtown area. Requires $50,000 from treasury for initial setup and 3-month operating costs.",
      type: 'expansion',
      status: 'active',
      votesFor: 150000,
      votesAgainst: 45000,
      totalVotes: 195000,
      quorum: 300000,
      deadline: '2024-12-15',
      proposer: '8xKj9...3nM2',
      created: '2024-11-20'
    },
    {
      id: 2,
      title: "INCREASE REVENUE SHARE TO 35%",
      description: "Proposal to increase token holder revenue share from 30% to 35% starting Q1 2025.",
      type: 'governance',
      status: 'active',
      votesFor: 280000,
      votesAgainst: 120000,
      totalVotes: 400000,
      quorum: 300000,
      deadline: '2024-12-10',
      proposer: '5nB7...xK9p',
      created: '2024-11-18'
    },
    {
      id: 3,
      title: "QUARTERLY BUYBACK PROGRAM",
      description: "Use 10% of profits each quarter to buy back and burn tokens from the market.",
      type: 'treasury',
      status: 'passed',
      votesFor: 450000,
      votesAgainst: 50000,
      totalVotes: 500000,
      quorum: 300000,
      deadline: '2024-11-01',
      proposer: '2mX4...8pQ1',
      created: '2024-10-15'
    },
    {
      id: 4,
      title: "NEW PRODUCT LINE: COLD BREW",
      description: "Invest $15,000 in cold brew equipment and launch new product line.",
      type: 'operations',
      status: 'rejected',
      votesFor: 100000,
      votesAgainst: 250000,
      totalVotes: 350000,
      quorum: 300000,
      deadline: '2024-10-20',
      proposer: '7kL2...5mN9',
      created: '2024-10-01'
    }
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVote = (proposalId: number, vote: 'for' | 'against') => {
    if (!authenticated) {
      login()
      return
    }
    setUserVotes({ ...userVotes, [proposalId]: vote })
    // In production, this would submit the vote on-chain
    console.log(`Voting ${vote} on proposal ${proposalId}`)
  }

  // Calculate user's voting power based on token balance
  const userTokenBalance = 10000 // Mock - would come from blockchain
  const votingPower = userTokenBalance // 1 token = 1 vote

  // Real data
  const actualRaised = presaleData?.currentBalance?.totalUSD || presaleData?.raised || 0
  const progressPercentage = actualRaised > 0 ? (actualRaised / project.fundingGoal) * 100 : 0
  const contributors = presaleData?.contributors || 0

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* BRUTALIST Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/paper-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, black 0px, transparent 1px, transparent 40px, black 41px), repeating-linear-gradient(90deg, black 0px, transparent 1px, transparent 40px, black 41px)',
          }}
        />
      </div>

      {/* Split Layout */}
      <div className="flex h-screen relative z-10">
        
        {/* LEFT PANEL - Voting Stats */}
        <div className="w-[420px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r-8 border-black">
          
          {/* Header */}
          <div className="p-6 border-b-4 border-black">
            <Link href={`/explorer/${project.id}`} className="inline-flex items-center gap-2 text-black hover:text-[#DC143C] transition-colors font-black uppercase text-xs tracking-wider mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              BACK TO PROJECT
            </Link>
            
            {/* Voting Power */}
            <div className="space-y-4">
              <div>
                <div className="text-5xl font-black">
                  GOVERNANCE
                </div>
                <div className="text-xs font-black uppercase text-black/60 mt-2 tracking-wider">
                  {project.name} VOTING
                </div>
              </div>
              
              {/* User Voting Power */}
              {authenticated && (
                <div className="p-4 bg-black text-white">
                  <div className="text-xs font-black uppercase tracking-wider mb-2">YOUR VOTING POWER</div>
                  <div className="text-3xl font-black">{votingPower.toLocaleString()}</div>
                  <div className="text-xs uppercase mt-1">{project.symbol} TOKENS</div>
                </div>
              )}
              
              {/* Active Proposals Count */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border-2 border-black">
                  <div className="text-2xl font-black">
                    {proposals.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-[10px] font-black uppercase">ACTIVE</div>
                </div>
                <div className="p-3 border-2 border-black">
                  <div className="text-2xl font-black">
                    {proposals.filter(p => p.status === 'passed').length}
                  </div>
                  <div className="text-[10px] font-black uppercase">PASSED</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Governance Stats */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-4">GOVERNANCE STATS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black/5">
                    <span className="text-xs font-black uppercase">TOTAL PROPOSALS</span>
                    <span className="font-black">{proposals.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/5">
                    <span className="text-xs font-black uppercase">PARTICIPATION</span>
                    <span className="font-black">67%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/5">
                    <span className="text-xs font-black uppercase">QUORUM</span>
                    <span className="font-black">300K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/5">
                    <span className="text-xs font-black uppercase">MIN TOKENS</span>
                    <span className="font-black">100</span>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-4">HOW IT WORKS</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-black">1.</span>
                    <span>Hold {project.symbol} tokens to vote</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-black">2.</span>
                    <span>1 token = 1 vote</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-black">3.</span>
                    <span>Proposals need 300K votes quorum</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-black">4.</span>
                    <span>Voting period: 14 days</span>
                  </div>
                </div>
              </div>

              {/* Create Proposal Button */}
              {authenticated ? (
                <Button className="w-full h-12 bg-[#DC143C] hover:bg-black text-white font-black uppercase tracking-wider border-4 border-black">
                  CREATE PROPOSAL
                </Button>
              ) : (
                <Button 
                  onClick={login}
                  className="w-full h-12 bg-white hover:bg-black hover:text-white text-black font-black uppercase tracking-wider border-4 border-black"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  CONNECT TO VOTE
                </Button>
              )}

              {/* Contract Address */}
              <button
                onClick={copyAddress}
                className="w-full py-3 border-2 border-black hover:bg-black hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {project.presaleAddress.slice(0, 6)}...{project.presaleAddress.slice(-4)}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Proposals */}
        <div className="flex-1 ml-[420px] overflow-y-auto">
          
          {/* Header */}
          <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="group">
                  <span className="text-3xl font-black font-serif uppercase tracking-wider transition-all group-hover:text-[#DC143C] group-hover:tracking-[0.3em]">
                    REBIRTH
                  </span>
                </Link>
                <div className="flex items-center gap-8">
                  {ready && authenticated ? (
                    <div className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all group">
                      <span className="text-xs font-mono font-black uppercase">
                        {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                      </span>
                    </div>
                  ) : (
                    <Button 
                      onClick={login}
                      className="bg-[#DC143C] hover:bg-black text-white font-black uppercase tracking-wider border-2 border-black group"
                    >
                      CONNECT
                      <ArrowUpRight className="ml-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-5xl mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-16 h-16 border-4 border-black bg-white p-2">
                  {mounted && (
                    <img
                      src={generateProjectIcon(project.symbol)}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-black uppercase">{project.name} GOVERNANCE</h1>
                  <p className="text-black/60 mt-1">Vote on proposals and shape the future of {project.name}</p>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex gap-0 border-b-4 border-black">
                {['ALL', 'ACTIVE', 'PASSED', 'REJECTED'].map((filter) => (
                  <button
                    key={filter}
                    className="px-6 py-3 font-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all border-r-2 border-black last:border-r-0"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Proposals List */}
            <div className="space-y-6">
              {proposals.map((proposal) => {
                const forPercentage = (proposal.votesFor / proposal.totalVotes) * 100 || 0
                const hasQuorum = proposal.totalVotes >= proposal.quorum
                const timeLeft = Math.ceil((new Date(proposal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                
                return (
                  <div key={proposal.id} className="relative">
                    <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                    <div className="relative border-4 border-black bg-white">
                      {/* Proposal Header */}
                      <div className="p-6 border-b-2 border-black">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-black uppercase px-2 py-1 bg-black text-white">
                                #{proposal.id}
                              </span>
                              <span className={`text-xs font-black uppercase px-2 py-1 ${
                                proposal.status === 'active' ? 'bg-[#DC143C] text-white' :
                                proposal.status === 'passed' ? 'bg-green-600 text-white' :
                                proposal.status === 'rejected' ? 'bg-red-600 text-white' :
                                'bg-gray-400 text-white'
                              }`}>
                                {proposal.status}
                              </span>
                              <span className="text-xs font-black uppercase px-2 py-1 border-2 border-black">
                                {proposal.type}
                              </span>
                            </div>
                            <h3 className="text-2xl font-black uppercase">{proposal.title}</h3>
                          </div>
                          {proposal.status === 'active' && (
                            <div className="text-right">
                              <div className="text-xs font-black uppercase text-black/60">ENDS IN</div>
                              <div className="text-xl font-black">{timeLeft} DAYS</div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm mb-4">{proposal.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span className="font-black uppercase">BY {proposal.proposer}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-black uppercase">{proposal.created}</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Voting Section */}
                      <div className="p-6">
                        {/* Voting Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-black uppercase">VOTING PROGRESS</span>
                            <span className="text-xs font-black">
                              {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} QUORUM
                            </span>
                          </div>
                          <div className="h-8 bg-black/10 border-2 border-black relative">
                            <div 
                              className="absolute left-0 top-0 h-full bg-green-600 transition-all"
                              style={{ width: `${forPercentage}%` }}
                            />
                            <div 
                              className="absolute right-0 top-0 h-full bg-red-600 transition-all"
                              style={{ width: `${100 - forPercentage}%` }}
                            />
                            {/* Quorum Line */}
                            <div 
                              className="absolute top-0 h-full w-1 bg-black"
                              style={{ left: `${(proposal.quorum / 1000000) * 100}%` }}
                            >
                              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase whitespace-nowrap">
                                QUORUM
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2 text-xs">
                            <span className="font-black">
                              FOR: {proposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)
                            </span>
                            <span className="font-black">
                              AGAINST: {proposal.votesAgainst.toLocaleString()} ({(100 - forPercentage).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                        
                        {/* Vote Buttons */}
                        {proposal.status === 'active' && (
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              onClick={() => handleVote(proposal.id, 'for')}
                              className={`py-3 font-black uppercase tracking-wider border-2 border-black transition-all flex items-center justify-center gap-2 ${
                                userVotes[proposal.id] === 'for' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-white hover:bg-green-600 hover:text-white'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              VOTE FOR
                            </button>
                            <button
                              onClick={() => handleVote(proposal.id, 'against')}
                              className={`py-3 font-black uppercase tracking-wider border-2 border-black transition-all flex items-center justify-center gap-2 ${
                                userVotes[proposal.id] === 'against' 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-white hover:bg-red-600 hover:text-white'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                              VOTE AGAINST
                            </button>
                          </div>
                        )}
                        
                        {/* Quorum Warning */}
                        {!hasQuorum && proposal.status === 'active' && (
                          <div className="mt-4 p-3 bg-yellow-100 border-2 border-yellow-600 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-xs font-black uppercase">
                              NEEDS {(proposal.quorum - proposal.totalVotes).toLocaleString()} MORE VOTES FOR QUORUM
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
