"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePrivy } from "@privy-io/react-auth"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/explorer", label: "Explorer" },
  { href: "/governance", label: "Governance" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/docs", label: "Documentation" },
] as const

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // remove initial mount fade to avoid header appearing late
  const { ready, authenticated, user, login, logout } = usePrivy()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const next = window.scrollY > 20
        setScrolled((prev) => (prev === next ? prev : next))
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border/40"
        : "bg-background/10 backdrop-blur-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={cn(
          "flex items-center justify-between h-16 transition-colors duration-300"
        )}>
          {/* Logo */}
          <Link
            href="/"
            className="group"
          >
            <span className="text-2xl font-bold font-serif tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent transition-opacity hover:opacity-80">
              $now.fun
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    active
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {ready && authenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="group font-medium"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={login}
                disabled={!ready}
                className="group bg-foreground text-background hover:bg-foreground/90 font-medium"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Mobile Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="pb-6 border-b">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl font-bold font-serif bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                      $now.fun
                    </span>
                  </Link>
                </div>

                {/* Mobile Nav */}
                <div className="flex-1 py-6">
                  <nav className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                            active
                              ? "bg-foreground/10 text-foreground"
                              : "text-muted-foreground hover:bg-foreground/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* Mobile CTA */}
                <div className="pt-6 border-t">
                  {ready && authenticated ? (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground text-center">
                        {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                      </div>
                      <Button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        variant="outline"
                        className="w-full font-medium"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        login()
                        setIsOpen(false)
                      }}
                      disabled={!ready}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium"
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
