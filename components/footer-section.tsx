export function FooterSection() {
  return (
    <div className="w-full relative overflow-hidden bg-background">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04),transparent_60%)]" />

      {/* Main Footer Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col justify-start items-start gap-6">
            {/* Brand Section */}
            <div className="flex justify-start items-center gap-3">
              <div className="text-foreground text-2xl font-bold font-serif">
                $NOW
              </div>
            </div>
            <div className="text-muted-foreground text-base font-medium leading-relaxed max-w-xs">
              Revolutionary business ownership through tokenization. Start with $COFFEE.
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-start items-start gap-4">
              {/* Twitter/X Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="currentColor"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </svg>
              </div>

              {/* LinkedIn Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                    fill="currentColor"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </svg>
              </div>

              {/* GitHub Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.374-12-12-12z"
                    fill="currentColor"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-start sm:justify-between items-start gap-12 md:gap-16 flex-1">
            {/* Product Column */}
            <div className="flex flex-col justify-start items-start gap-4 min-w-[140px]">
              <div className="text-foreground text-sm font-bold uppercase tracking-wider">Platform</div>
              <div className="flex flex-col justify-end items-start gap-3">
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Launch Token
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Explore Projects
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  How it Works
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Whitepaper
                </div>
              </div>
            </div>

            {/* Company Column */}
            <div className="flex flex-col justify-start items-start gap-4 min-w-[140px]">
              <div className="text-foreground text-sm font-bold uppercase tracking-wider">Company</div>
              <div className="flex flex-col justify-center items-start gap-3">
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  About Us
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Team
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Careers
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Contact
                </div>
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col justify-start items-start gap-4 min-w-[140px]">
              <div className="text-foreground text-sm font-bold uppercase tracking-wider">Resources</div>
              <div className="flex flex-col justify-center items-start gap-3">
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Documentation
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Guides
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Community
                </div>
                <div className="text-muted-foreground text-base font-medium cursor-pointer hover:text-primary transition-colors">
                  Blog
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative pt-8 border-t border-border/40 flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-medium">© 2025 $NOW. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground text-sm font-medium cursor-pointer hover:text-primary transition-colors">Privacy</span>
            <span className="text-muted-foreground text-sm font-medium cursor-pointer hover:text-primary transition-colors">Terms</span>
            <span className="text-muted-foreground text-sm font-medium cursor-pointer hover:text-primary transition-colors">Legal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
