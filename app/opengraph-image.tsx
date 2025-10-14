import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg,#ffffff,#eaf2ff)',
        }}
      >
        <div style={{
          fontSize: 80,
          fontFamily: 'Instrument Serif, Georgia, serif',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: -1,
        }}>
          $now.fun
        </div>
        <div style={{
          marginTop: 12,
          fontSize: 34,
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#374151',
        }}>
          Launch. Tokenize. Own Together.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

