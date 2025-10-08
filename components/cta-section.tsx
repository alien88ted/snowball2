"use client"

import Link from "next/link"

export function CTASection() {

  return (
    <div className="w-full relative overflow-hidden bg-background py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 rounded-br-3xl" />

          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/50 to-card/60 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_60%)]" />
            <div className="absolute inset-0 border border-border/40 rounded-3xl shadow-2xl shadow-blue-500/10" />


            <div className="relative p-16 md:p-20 flex flex-col items-center gap-12">
              <div className="relative">
                <div className="relative px-6 py-3 bg-primary/10 rounded-full border border-primary/30">
                  <span className="text-sm font-bold text-primary">
                    First $NOW Launch: $COFFEE
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-6xl md:text-8xl font-bold leading-tight font-serif tracking-tighter mb-6">
                  <span className="inline-block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Join
                  </span>
                  <br />
                  <span className="inline-block text-primary">
                    $NOW
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Start with $COFFEE - our first tokenized business launching in Beirut. Be an early adopter of the $NOW revolution.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                <Link href="/explorer" className="flex-1">
                  <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer bg-black hover:bg-gray-900 transition-colors">
                    <div className="relative h-full flex items-center justify-center gap-3 text-white font-bold text-lg">
                      <span>Invest in $COFFEE</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </div>
                  </div>
                </Link>

                <Link href="/explorer" className="flex-1">
                  <div className="group relative h-14 rounded-full overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                    <div className="relative h-full flex items-center justify-center gap-3 text-foreground font-bold text-lg">
                      <span>Learn More</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border/50">
                {[
                  { icon: "✓", text: "$500K Target" },
                  { icon: "✓", text: "Beirut Location" },
                  { icon: "✓", text: "Opening 2025" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
