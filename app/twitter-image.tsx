import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function TwitterImage() {
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
          background: 'linear-gradient(135deg, #0F0F0F 0%, #1F1F1F 100%)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
        }}>
          {/* Split $ Symbol */}
          <div style={{
            position: 'relative',
            width: '90px',
            height: '110px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Left half - White/Light */}
            <div style={{
              position: 'absolute',
              fontSize: 90,
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              color: '#FFFFFF',
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            }}>
              $
            </div>
            {/* Right half - Red with offset */}
            <div style={{
              position: 'absolute',
              fontSize: 90,
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              color: '#DC143C',
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              transform: 'translateX(3px)',
              filter: 'drop-shadow(0 0 18px rgba(220, 20, 60, 0.6))',
            }}>
              $
            </div>
          </div>
          <div style={{
            fontSize: 72,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: -2,
            textTransform: 'uppercase',
          }}>
            REBIRTH
          </div>
        </div>
        <div style={{
          marginTop: 18,
          fontSize: 30,
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#FFFFFF',
          opacity: 0.9,
        }}>
          The Future of Tokenized Commerce
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

