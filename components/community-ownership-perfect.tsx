"use client"

import { Building2, Users, TrendingUp } from "lucide-react"

export function CommunityOwnershipPerfect() {
  const steps = [
    {
      title: "Launch",
      desc: "A real business creates a token tied to revenue sharing.",
      Icon: Building2,
    },
    {
      title: "Invest",
      desc: "You buy tokens from $100. Funds go to building the business.",
      Icon: Users,
    },
    {
      title: "Earn",
      desc: "A share of profits is distributed to token holders on-chain.",
      Icon: TrendingUp,
    },
  ] as const

  return (
    <section className="py-24 md:py-28">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em]">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Three steps to community ownership and on-chain revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ title, desc, Icon }, i) => (
            <div key={title} className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-muted-foreground">Step {i + 1}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
