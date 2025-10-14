import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const size = { width: 1600, height: 900 }
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#ffffff,#eaf2ff)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 200,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            letterSpacing: -2,
            color: '#111827',
          }}>
            $COFFEE
          </div>
        </div>
      </div>
    ),
    size
  )
}

