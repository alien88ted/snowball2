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
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/apy", label: "APY" },
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center pt-4 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Main" className={cn(
          "pointer-events-auto flex items-center justify-between w-full max-w-6xl h-14 px-4 sm:px-6 transition-all duration-500 rounded-full",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-gray-200/60"
            : "bg-white/80 backdrop-blur-md shadow-md shadow-black/5 border border-gray-200/40"
        )}>
          {/* Logo */}
          <Link
            href="/"
            className="group flex-shrink-0"
          >
            <span className="text-xl font-bold font-serif tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent transition-opacity hover:opacity-70 duration-200">
              $now.fun
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    "px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {ready && authenticated ? (
              <>
                <span className="text-[13px] text-gray-500 font-medium">
                  {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-[13px] font-medium rounded-full border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={login}
                disabled={!ready}
                size="sm"
                className="group h-8 px-4 bg-gray-900 text-white hover:bg-gray-800 font-medium text-[13px] rounded-full shadow-sm"
              >
                Sign In
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {/* Mobile Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="right" className="w-[320px] rounded-l-3xl">
              <div className="flex flex-col h-full pt-2">
                {/* Mobile Header */}
                <div className="pb-6 border-b border-gray-100">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl font-bold font-serif bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      $now.fun
                    </span>
                  </Link>
                </div>

                {/* Mobile Nav */}
                <div className="flex-1 py-6">
                  <nav className="flex flex-col gap-1.5">
                    {NAV_ITEMS.map((item) => {
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            active
                              ? "bg-gray-900 text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* Mobile CTA */}
                <div className="pt-6 border-t border-gray-100">
                  {ready && authenticated ? (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500 text-center font-medium">
                        {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
                      </div>
                      <Button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        variant="outline"
                        className="w-full font-medium rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
                      className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-xl"
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
