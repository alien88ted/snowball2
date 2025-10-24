"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, CheckCircle2, Clock, Filter, Shield, Lock, Vote, Users, TrendingUp, AlertCircle, Zap, FileText } from "lucide-react"

type VoteOption = "for" | "against" | "abstain"

type Proposal = {
  id: string
  title: string
  summary: string
  detail: string
  status: "active" | "closed"
  endsAt?: number
  options: Record<VoteOption, number> // tallies
}

const seedProposals: Proposal[] = [
  {
    id: "prop-001",
    title: "DEPLOY $COFFEE LIQUIDITY ON RAYDIUM",
    summary: "Approve initial LP pairing and % allocation for launch week",
    detail:
      "Authorize pairing $COFFEE with USDC on Raydium with a capped initial liquidity. Treasury provides liquidity per tokenomics; LP position managed by multisig.",
    status: "active",
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days
    options: { for: 126, against: 12, abstain: 4 },
  },
  {
    id: "prop-002",
    title: "$MARKET SUPPLIER BULK DISCOUNT PROGRAM",
    summary: "Negotiate 2% bulk rebate to return to token holders",
    detail:
      "Authorize ops to negotiate supplier rebates (2%) with quarterly distributions to holders through the rewards treasury.",
    status: "active",
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    options: { for: 88, against: 9, abstain: 6 },
  },
  {
    id: "prop-000",
    title: "ADOPT STANDARD DAO MEETING CADENCE",
    summary: "Bi-weekly sync with published minutes",
    detail:
      "Adopt a lightweight governance rhythm: bi-weekly sync, published minutes, and public action tracker for transparency.",
    status: "closed",
    options: { for: 152, against: 11, abstain: 3 },
  },
]

export default function GovernanceClient() {
  const [proposals, setProposals] = useState<Proposal[]>(seedProposals)
  const [filter, setFilter] = useState<"all" | "active" | "closed">("active")
  const [voted, setVoted] = useState<Record<string, VoteOption | undefined>>({})
  const [now, setNow] = useState(Date.now())
  const [showNewProposal, setShowNewProposal] = useState(false)
  const { toast } = useToast()

  // Temporary lock flag while full governance is not live
  const locked = true

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const visible = useMemo(() => {
    return proposals.filter((p) => (filter === "all" ? true : p.status === filter))
  }, [filter, proposals])

  const vote = (id: string, option: VoteOption) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id !== id
          ? p
          : {
              ...p,
              options: { ...p.options, [option]: p.options[option] + 1 },
            }
      )
    )
    setVoted((m) => ({ ...m, [id]: option }))
    toast({
      title: "VOTE RECORDED",
      description: `Your vote has been submitted on-chain`,
    })
  }

  const fmtPct = (n: number) => `${n.toFixed(0)}%`
  const pct = (p: Proposal, key: VoteOption) => {
    const total = p.options.for + p.options.against + p.options.abstain
    if (total === 0) return 0
    return (p.options[key] / total) * 100
  }

  const formatTimeLeft = (endsAt: number) => {
    const diff = endsAt - now
    if (diff <= 0) return "ENDED"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (days > 0) return `${days}D ${hours}H LEFT`
    return `${hours}H LEFT`
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92 pointer-events-none" />
      
      <div className="relative z-10 pt-16">
        {/* Hero */}
        <section className="py-20 border-b-4 border-black bg-black">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-black text-xs tracking-[0.3em] uppercase mb-6">
              <Vote className="w-4 h-4" />
              DAO GOVERNANCE
            </div>
            <h1 className="text-6xl md:text-7xl font-black font-serif text-white uppercase tracking-tight mb-4">
              COMMUNITY<br/>
              <span className="text-[#DC143C]">GOVERNANCE</span>
            </h1>
            <p className="text-xl text-white font-bold uppercase tracking-wider mb-8 max-w-2xl mx-auto">
              Shape the future of community-owned businesses through on-chain voting
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="border-4 border-white bg-transparent p-4">
                <div className="text-3xl font-black text-[#DC143C]">{proposals.filter(p => p.status === 'active').length}</div>
                <div className="text-xs text-white font-bold uppercase">Active Proposals</div>
              </div>
              <div className="border-4 border-white bg-transparent p-4">
                <div className="text-3xl font-black text-white">342</div>
                <div className="text-xs text-white font-bold uppercase">Total Votes</div>
              </div>
              <div className="border-4 border-white bg-transparent p-4">
                <div className="text-3xl font-black text-[#DC143C]">89%</div>
                <div className="text-xs text-white font-bold uppercase">Participation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="border-b-4 border-black bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 border-4 font-black uppercase tracking-wider transition-all ${
                    filter === "all" 
                      ? "border-[#DC143C] bg-[#DC143C] text-white" 
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 border-4 font-black uppercase tracking-wider transition-all ${
                    filter === "active" 
                      ? "border-[#DC143C] bg-[#DC143C] text-white" 
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  ACTIVE
                </button>
                <button
                  onClick={() => setFilter("closed")}
                  className={`px-4 py-2 border-4 font-black uppercase tracking-wider transition-all ${
                    filter === "closed" 
                      ? "border-[#DC143C] bg-[#DC143C] text-white" 
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  CLOSED
                </button>
              </div>
              <button
                onClick={() => setShowNewProposal(!showNewProposal)}
                className="px-6 py-2 border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-wider hover:bg-black hover:border-black transition-all"
              >
                + NEW PROPOSAL
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-6">
            {/* New Proposal Form */}
            {showNewProposal && (
              <div className="mb-8 border-4 border-[#DC143C] bg-white p-8">
                <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#DC143C]" />
                  SUBMIT PROPOSAL
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-black uppercase tracking-wider">TITLE</Label>
                    <Input 
                      placeholder="ENTER PROPOSAL TITLE..." 
                      className="border-4 border-black font-bold uppercase placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black uppercase tracking-wider">SUMMARY</Label>
                    <Input 
                      placeholder="BRIEF DESCRIPTION..." 
                      className="border-4 border-black font-bold uppercase placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black uppercase tracking-wider">DETAILS</Label>
                    <Textarea 
                      rows={5}
                      placeholder="FULL PROPOSAL DETAILS..." 
                      className="border-4 border-black font-bold uppercase placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      disabled={locked}
                      className="flex-1 border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-wider hover:bg-black hover:border-black disabled:opacity-50"
                    >
                      {locked ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          COMING SOON
                        </>
                      ) : (
                        <>
                          SUBMIT
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={() => setShowNewProposal(false)}
                      className="border-4 border-black bg-white text-black font-black uppercase tracking-wider hover:bg-black hover:text-white"
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Proposals List */}
            <div className="space-y-6">
              {visible.map((p) => {
                const total = p.options.for + p.options.against + p.options.abstain
                const userVote = voted[p.id]
                
                return (
                  <div key={p.id} className="border-4 border-black bg-white overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b-4 border-black bg-black">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-black text-white uppercase">{p.title}</h3>
                          <p className="text-[#DC143C] font-bold uppercase text-sm mt-1">{p.summary}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {p.status === "active" ? (
                            <>
                              <div className="w-2 h-2 bg-[#DC143C] rounded-full animate-pulse" />
                              <span className="text-[#DC143C] font-black text-xs uppercase">
                                {p.endsAt ? formatTimeLeft(p.endsAt) : "ACTIVE"}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-400 font-black text-xs uppercase">CLOSED</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="font-bold uppercase mb-6">{p.detail}</p>

                      {/* Voting Stats */}
                      <div className="space-y-3 mb-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-black uppercase text-sm">FOR</span>
                            <span className="font-black text-[#DC143C]">{fmtPct(pct(p, "for"))}</span>
                          </div>
                          <div className="h-8 border-4 border-black bg-white">
                            <div 
                              className="h-full bg-[#DC143C] transition-all duration-500"
                              style={{ width: `${pct(p, "for")}%` }}
                            />
                          </div>
                          <div className="text-xs font-bold uppercase mt-1">{p.options.for} VOTES</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-black uppercase text-sm">AGAINST</span>
                            <span className="font-black">{fmtPct(pct(p, "against"))}</span>
                          </div>
                          <div className="h-8 border-4 border-black bg-white">
                            <div 
                              className="h-full bg-black transition-all duration-500"
                              style={{ width: `${pct(p, "against")}%` }}
                            />
                          </div>
                          <div className="text-xs font-bold uppercase mt-1">{p.options.against} VOTES</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-black uppercase text-sm">ABSTAIN</span>
                            <span className="font-black text-gray-500">{fmtPct(pct(p, "abstain"))}</span>
                          </div>
                          <div className="h-8 border-4 border-black bg-white">
                            <div 
                              className="h-full bg-gray-400 transition-all duration-500"
                              style={{ width: `${pct(p, "abstain")}%` }}
                            />
                          </div>
                          <div className="text-xs font-bold uppercase mt-1">{p.options.abstain} VOTES</div>
                        </div>
                      </div>

                      {/* Voting Buttons */}
                      {p.status === "active" && !userVote && (
                        <div className="grid grid-cols-3 gap-3">
                          <Button
                            onClick={() => vote(p.id, "for")}
                            disabled={locked}
                            className="border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-wider hover:bg-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {locked ? <Lock className="w-4 h-4" /> : "FOR"}
                          </Button>
                          <Button
                            onClick={() => vote(p.id, "against")}
                            disabled={locked}
                            className="border-4 border-black bg-white text-black font-black uppercase tracking-wider hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {locked ? <Lock className="w-4 h-4" /> : "AGAINST"}
                          </Button>
                          <Button
                            onClick={() => vote(p.id, "abstain")}
                            disabled={locked}
                            className="border-4 border-gray-400 bg-gray-100 text-gray-600 font-black uppercase tracking-wider hover:bg-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {locked ? <Lock className="w-4 h-4" /> : "ABSTAIN"}
                          </Button>
                        </div>
                      )}

                      {userVote && (
                        <div className="p-4 border-4 border-[#DC143C] bg-[#DC143C]/10 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#DC143C]" />
                          <span className="font-black uppercase text-sm">
                            YOU VOTED: {userVote.toUpperCase()}
                          </span>
                        </div>
                      )}

                      {p.status === "closed" && (
                        <div className="p-4 border-4 border-gray-400 bg-gray-100 text-center">
                          <span className="font-black uppercase text-gray-600">
                            VOTING CLOSED · {total} TOTAL VOTES
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Lock Notice */}
            {locked && (
              <div className="mt-12 border-4 border-black bg-black p-8 text-center">
                <Shield className="w-12 h-12 text-[#DC143C] mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white uppercase mb-2">COMING SOON</h3>
                <p className="text-white font-bold uppercase mb-4">
                  Full governance features will be enabled after token launch
                </p>
                <p className="text-[#DC143C] text-sm font-bold uppercase">
                  Connect wallet and hold tokens to participate
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}