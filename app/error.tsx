"use client"

import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border rounded-xl p-8 bg-card/60">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
        </p>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-md bg-foreground text-background font-semibold"
          >
            Try again
          </button>
          <Link href="/" className="px-4 py-2 rounded-md border font-semibold">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

