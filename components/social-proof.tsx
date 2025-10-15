"use client"

import { Shield, Award, Users } from "lucide-react"

export function SocialProof() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-serif font-bold">
            Trusted building blocks for community-owned businesses
          </h3>
          <p className="mt-2 text-muted-foreground">
            Transparent on-chain flows • Built on Solana • Community first
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-card">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold">Transparent on-chain</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-card">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold">Built on Solana</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-card">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold">Community-owned</span>
          </div>
        </div>
      </div>
    </section>
  )
}
