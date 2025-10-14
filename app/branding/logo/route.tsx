import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const size = { width: 1024, height: 1024 }
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        <div style={{
          fontSize: 180,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          letterSpacing: -2,
          color: '#000000',
        }}>
          $COFFEE
        </div>
      </div>
    ),
    size
  )
}

