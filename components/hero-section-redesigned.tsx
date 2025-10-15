"use client"

import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export function HeroSectionRedesigned() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold text-primary">Own pieces of real businesses</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] leading-tight">
            Invest in local businesses. Earn from every sale.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Start with $100. Transparent, on-chain revenue sharing. Back teams you love and share in their growth.
          </p>

          <div className="w-full max-w-2xl grid sm:grid-cols-3 gap-3">
            {["$100 minimum", "Real profit sharing", "Transparent & secure"]
              .map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-2 rounded-lg border bg-card px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/explorer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              Explore Opportunities
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border font-semibold hover:border-primary/50 transition">
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
