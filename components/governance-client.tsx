"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, Filter, Shield, ThumbsDown, ThumbsUp } from "lucide-react"

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
    title: "Deploy $COFFEE Liquidity on Raydium",
    summary: "Approve initial LP pairing and % allocation for launch week",
    detail:
      "Authorize pairing $COFFEE with USDC on Raydium with a capped initial liquidity. Treasury provides liquidity per tokenomics; LP position managed by multisig.",
    status: "active",
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days
    options: { for: 126, against: 12, abstain: 4 },
  },
  {
    id: "prop-002",
    title: "$MARKET Supplier Bulk Discount Program",
    summary: "Negotiate 2% bulk rebate to return to token holders",
    detail:
      "Authorize ops to negotiate supplier rebates (2%) with quarterly distributions to holders through the rewards treasury.",
    status: "active",
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    options: { for: 88, against: 9, abstain: 6 },
  },
  {
    id: "prop-000",
    title: "Adopt Standard DAO Meeting Cadence",
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
  }

  const fmtPct = (n: number) => `${n.toFixed(0)}%`
  const pct = (p: Proposal, key: VoteOption) => {
    const total = p.options.for + p.options.against + p.options.abstain
    if (total === 0) return 0
    return (p.options[key] / total) * 100
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Background wash similar to hero/explorer */}
      <section className="relative py-10">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.06), transparent 60%)" }}
        />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* Header + Filters */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-[-0.02em]">Governance</h1>
              <p className="text-sm text-muted-foreground mt-1">Decentralized votes for treasury, ops, and product decisions.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>Active</Button>
              <Button variant={filter === "closed" ? "default" : "outline"} onClick={() => setFilter("closed")}>Closed</Button>
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                <Filter className="w-3.5 h-3.5 mr-1" /> All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Proposals list */}
            <div className="lg:col-span-2 space-y-6">
              {visible.map((p) => {
                const endsIn = p.endsAt ? Math.max(0, p.endsAt - now) : 0
                const d = Math.floor(endsIn / (1000 * 60 * 60 * 24))
                const h = Math.floor((endsIn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const m = Math.floor((endsIn % (1000 * 60 * 60)) / (1000 * 60))
                const s = Math.floor((endsIn % (1000 * 60)) / 1000)

                return (
                  <div key={p.id} className="relative group">
                    {/* 4-corner hover brackets */}
                    <div className="pointer-events-none absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                         style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                    <div className="pointer-events-none absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 rounded-tr-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                         style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                    <div className="pointer-events-none absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 rounded-bl-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                         style={{ borderColor: 'rgba(168,85,247,0.35)' }} />
                    <div className="pointer-events-none absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 rounded-br-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                         style={{ borderColor: 'rgba(168,85,247,0.35)' }} />

                    <Card className="border-2 border-border/40 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="text-xs font-mono text-muted-foreground">{p.id.toUpperCase()}</div>
                            <h3 className="text-xl font-bold font-serif tracking-[-0.01em]">
                              {p.title}
                            </h3>
                          </div>
                          <div className="text-right whitespace-nowrap">
                            {p.status === "active" ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                                <Clock className="w-3.5 h-3.5" />
                                {d}d {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200/60">
                                Closed
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {p.summary}
                        </p>

                        {/* Voting breakdown */}
                        <div className="space-y-3">
                          {[{k:'for',label:'For',cls:'bg-green-500'},{k:'against',label:'Against',cls:'bg-red-500'},{k:'abstain',label:'Abstain',cls:'bg-gray-400'}].map((row:any) => (
                            <div key={row.k}>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-semibold">{row.label}</span>
                                <span className="font-mono">{fmtPct(pct(p, row.k))}</span>
                              </div>
                              <div className="relative h-2 bg-background/70 rounded-full overflow-hidden border border-border/50">
                                <div className={`absolute inset-y-0 left-0 ${row.cls} transition-all duration-500 rounded-full`} style={{ width: `${pct(p, row.k)}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <Button
                            disabled={p.status !== "active"}
                            onClick={() => vote(p.id, "for")}
                            className="flex items-center gap-2"
                          >
                            <ThumbsUp className="w-4 h-4" /> For
                          </Button>
                          <Button
                            variant="outline"
                            disabled={p.status !== "active"}
                            onClick={() => vote(p.id, "against")}
                            className="flex items-center gap-2"
                          >
                            <ThumbsDown className="w-4 h-4" /> Against
                          </Button>
                          <Button
                            variant="ghost"
                            disabled={p.status !== "active"}
                            onClick={() => vote(p.id, "abstain")}
                            className="flex items-center gap-2"
                          >
                            Abstain
                          </Button>
                          {voted[p.id] && (
                            <span className="text-xs text-muted-foreground inline-flex items-center gap-1 ml-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                              Voted {voted[p.id]}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>

            {/* Sticky right column */}
            <div className="space-y-6 lg:sticky lg:top-24 h-fit">
              <Card className="p-6 border-2 border-primary/20 bg-card/90">
                <h3 className="text-lg font-bold font-serif mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Your Voting Power
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect a wallet to fetch voting weight based on holdings and any delegated power.
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded bg-muted/30 border border-border/40">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">$NOW</div>
                    <div className="font-mono font-semibold">0</div>
                  </div>
                  <div className="p-3 rounded bg-muted/30 border border-border/40">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">$COFFEE</div>
                    <div className="font-mono font-semibold">0</div>
                  </div>
                  <div className="p-3 rounded bg-muted/30 border border-border/40">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">$MARKET</div>
                    <div className="font-mono font-semibold">0</div>
                  </div>
                </div>
                <Button className="w-full mt-4">Connect Wallet</Button>
              </Card>

              <Card className="p-6 border-2 border-border/30 bg-card/80">
                <h3 className="text-lg font-bold font-serif mb-2">Active Ballots</h3>
                <ul className="space-y-2 text-sm">
                  {proposals.filter(p=>p.status==='active').slice(0,4).map((p)=> (
                    <li key={p.id} className="relative group">
                      {/* small corner markers */}
                      <div className="pointer-events-none absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ borderColor: 'rgba(59,130,246,0.35)' }} />
                      <a href={`#/governance/${p.id}`} className="block p-2 rounded hover:bg-muted/40">
                        <div className="flex items-center justify-between">
                          <span className="truncate pr-2">{p.title}</span>
                          <span className="text-[11px] font-mono text-muted-foreground">{fmtPct(pct(p,'for'))}/{fmtPct(pct(p,'against'))}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 border-2 border-border/30 bg-card/80">
                <h3 className="text-lg font-bold font-serif mb-2">Submit a Proposal</h3>
                <p className="text-sm text-muted-foreground mb-3">Have something to propose? Create a draft and share it for discussion.</p>
                <Button variant="outline" className="w-full">
                  Start Draft
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

