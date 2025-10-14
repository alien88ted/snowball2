import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border rounded-xl p-8 bg-card/60">
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-6">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="px-4 py-2 rounded-md bg-foreground text-background font-semibold">
          Back to home
        </Link>
      </div>
    </div>
  )
}
