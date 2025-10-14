"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getProject } from "@/lib/projects"

export default function BrandingPage() {
  const project = getProject("coffee")

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <section className="relative">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-[-0.02em]">Branding</h1>
            <p className="mt-2 text-muted-foreground">Download the official {project?.name} logo and banner exactly as shown on the site. No badges or overlays.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Logo (PNG)</CardTitle>
                <CardDescription>1:1 with explorer icon (bold wordmark)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square w-full rounded-xl border bg-white overflow-hidden flex items-center justify-center">
                  {/* Use the same endpoint we expose below */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/branding/logo" alt={`${project?.name} logo`} className="w-full h-full object-contain" />
                </div>
                <div className="mt-4 flex gap-3">
                  <Button asChild>
                    <a href="/branding/logo" download="coffee-logo.png">Download PNG</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Banner */}
            <Card>
              <CardHeader>
                <CardTitle>Banner (PNG)</CardTitle>
                <CardDescription>Clean banner with brand gradient — no tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full rounded-xl border bg-white overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/branding/banner" alt={`${project?.name} banner`} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex gap-3">
                  <Button asChild>
                    <a href="/branding/banner" download="coffee-banner.png">Download PNG</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Brand tokens (colors) */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{label:'Primary', var:'--primary'}, {label:'Accent', var:'--accent'}, {label:'Foreground', var:'--foreground'}].map((c) => (
              <Card key={c.label}>
                <CardHeader>
                  <CardTitle className="text-base">{c.label}</CardTitle>
                  <CardDescription>Theme color</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-14 rounded-lg border" style={{ background: `var(${c.var})` }} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-sm text-muted-foreground">
            Need vector (SVG) or custom sizes? Ping me and I’ll add them.
          </div>
        </div>
      </section>
    </div>
  )
}

