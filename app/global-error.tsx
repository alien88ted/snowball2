"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ maxWidth: 640, width: '100%', textAlign: 'center', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 12, padding: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>App crashed</h1>
            <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>
              {process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred.'}
            </p>
            <button onClick={() => reset()} style={{ padding: '8px 12px', fontWeight: 600, borderRadius: 8, background: '#000', color: '#fff' }}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

