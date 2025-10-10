"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, ThumbsUp, ThumbsDown, Clock, Users, CheckCircle2, XCircle, AlertCircle, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Proposal {
  id: string
  applicant: string
  city: string
  country: string
  fundingTarget: number
  submitted: string
  votingEndsIn: number // hours
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorumRequired: number
  approvalRequired: number
  status: "active" | "approved" | "rejected" | "pending"
  hasVoted: boolean
}

export default function ProposalsPage() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "closed">("active")
  const [userTokenBalance] = useState(12500)
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])

  const proposals: Proposal[] = [
    {
      id: "prop-001",
      applicant: "Sarah Chen",
      city: "New York",
      country: "United States",
      fundingTarget: 450000,
      submitted: "2 days ago",
      votingEndsIn: 120, // 5 days
      votesFor: 425000,
      votesAgainst: 125000,
      totalVotes: 550000,
      quorumRequired: 10,
      approvalRequired: 60,
      status: "active",
      hasVoted: false
    },
    {
      id: "prop-002",
      applicant: "Marcus Rodriguez",
      city: "London",
      country: "United Kingdom",
      fundingTarget: 380000,
      submitted: "4 days ago",
      votingEndsIn: 72,
      votesFor: 180000,
      votesAgainst: 95000,
      totalVotes: 275000,
      quorumRequired: 10,
      approvalRequired: 60,
      status: "active",
      hasVoted: true
    },
    {
      id: "prop-003",
      applicant: "Akira Tanaka",
      city: "Tokyo",
      country: "Japan",
      fundingTarget: 500000,
      submitted: "8 days ago",
      votingEndsIn: -2, // ended
      votesFor: 720000,
      votesAgainst: 120000,
      totalVotes: 840000,
      quorumRequired: 10,
      approvalRequired: 60,
      status: "approved",
      hasVoted: true
    }
  ]

  // Magnetic cursor effect
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 100

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3
      ctaRefs.current[index]!.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ctaRefs.current[index]) {
      ctaRefs.current[index]!.style.transform = 'translate(0, 0)'
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredProposals = proposals.filter(p => {
    if (filter === "active") return p.status === "active"
    if (filter === "closed") return p.status !== "active"
    return true
  })

  const calculateProgress = (proposal: Proposal) => {
    const forPercent = (proposal.votesFor / proposal.totalVotes) * 100
    const againstPercent = (proposal.votesAgainst / proposal.totalVotes) * 100
    const quorumPercent = (proposal.totalVotes / 5000000) * 100 // assuming 5M total supply

    return { forPercent, againstPercent, quorumPercent }
  }

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Header */}
      <section className="relative py-16 md:py-20 border-b border-border/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link href="/franchise" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Franchise Info
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4">
                Franchise Proposals
              </h1>
              <p className="text-muted-foreground/80 text-lg max-w-2xl">
                Vote on franchise applications. Parent $COFFEE token holders decide which locations get approved.
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Your Voting Power</p>
                <p className="text-lg font-bold font-serif">{userTokenBalance.toLocaleString()} votes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="relative py-6 border-b border-border/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-2">
            {[
              { key: "active", label: "Active Voting", count: proposals.filter(p => p.status === "active").length },
              { key: "closed", label: "Closed", count: proposals.filter(p => p.status !== "active").length },
              { key: "all", label: "All Proposals", count: proposals.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === tab.key
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Proposals List */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-6">
            {filteredProposals.map((proposal, index) => {
              const { forPercent, againstPercent, quorumPercent } = calculateProgress(proposal)
              const isApproved = forPercent >= proposal.approvalRequired && quorumPercent >= proposal.quorumRequired
              const isRejected = proposal.votingEndsIn < 0 && !isApproved

              return (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative group/card">
                    <div className="absolute -top-2 -left-2 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl transition-all duration-300 group-hover/card:border-primary/50" />
                    <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl transition-all duration-300 group-hover/card:border-primary/50" />
                    <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl transition-all duration-300 group-hover/card:border-accent/50" />
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-2xl transition-all duration-300 group-hover/card:border-accent/50" />

                    <Card className="relative border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                      </div>

                      <div className="relative p-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <MapPin className="w-5 h-5 text-primary" />
                              <h3 className="text-2xl font-bold font-serif">
                                {proposal.city}, {proposal.country}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>Applicant: <span className="font-semibold text-foreground">{proposal.applicant}</span></span>
                              <span>•</span>
                              <span>Target: <span className="font-semibold text-foreground">${(proposal.fundingTarget / 1000).toLocaleString()}K</span></span>
                              <span>•</span>
                              <span>Submitted {proposal.submitted}</span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                            proposal.status === "active"
                              ? 'bg-blue-50 border border-blue-200/60'
                              : proposal.status === "approved"
                              ? 'bg-green-50 border border-green-200/60'
                              : 'bg-red-50 border border-red-200/60'
                          }`}>
                            {proposal.status === "active" ? (
                              <>
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-bold text-blue-700">
                                  {Math.floor(proposal.votingEndsIn / 24)}d {proposal.votingEndsIn % 24}h left
                                </span>
                              </>
                            ) : proposal.status === "approved" ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-bold text-green-700">Approved</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-bold text-red-700">Rejected</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Voting Progress */}
                        <div className="space-y-4 mb-6">
                          {/* For/Against Bars */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ThumbsUp className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold">For: {proposal.votesFor.toLocaleString()}</span>
                              </div>
                              <span className="text-lg font-bold text-green-600">{forPercent.toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                                style={{ width: `${forPercent}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ThumbsDown className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-semibold">Against: {proposal.votesAgainst.toLocaleString()}</span>
                              </div>
                              <span className="text-lg font-bold text-red-600">{againstPercent.toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                                style={{ width: `${againstPercent}%` }}
                              />
                            </div>
                          </div>

                          {/* Quorum */}
                          <div className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-background/50 border border-border/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-muted-foreground">Quorum Progress</span>
                              <span className="text-sm font-bold">{quorumPercent.toFixed(1)}% / {proposal.quorumRequired}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  quorumPercent >= proposal.quorumRequired
                                    ? 'bg-gradient-to-r from-primary to-accent'
                                    : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                                }`}
                                style={{ width: `${Math.min(quorumPercent, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          {proposal.status === "active" && !proposal.hasVoted ? (
                            <>
                              <div
                                ref={el => { ctaRefs.current[index * 3] = el }}
                                onMouseMove={(e) => handleMouseMove(e, index * 3)}
                                onMouseLeave={() => handleMouseLeave(index * 3)}
                                className="will-change-transform flex-1"
                                style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}
                              >
                                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-xl transition-all">
                                  <ThumbsUp className="w-4 h-4 mr-2" />
                                  Vote For
                                </Button>
                              </div>

                              <div
                                ref={el => { ctaRefs.current[index * 3 + 1] = el }}
                                onMouseMove={(e) => handleMouseMove(e, index * 3 + 1)}
                                onMouseLeave={() => handleMouseLeave(index * 3 + 1)}
                                className="will-change-transform flex-1"
                                style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}
                              >
                                <Button variant="outline" className="w-full h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all">
                                  <ThumbsDown className="w-4 h-4 mr-2" />
                                  Vote Against
                                </Button>
                              </div>
                            </>
                          ) : proposal.hasVoted ? (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-200/60">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-700">You voted on this proposal</span>
                            </div>
                          ) : null}

                          <Button variant="outline" className="h-12 px-6 rounded-xl border-2 border-border/40 hover:border-primary/30 transition-all">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
