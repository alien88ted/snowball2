"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASectionRedesigned() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em]">
          Ready to own a piece of the businesses you love?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Get started in minutes. No banks, no middlemen—just transparent, on-chain ownership.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/explorer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            Explore Opportunities
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a href="#how-it-works" className="px-6 py-3 rounded-xl border font-semibold hover:border-primary/50 transition">
            How It Works
          </a>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          SEC-aware framework • Multi-sig treasury • Audited contracts
        </p>
      </div>
    </section>
  )
}
