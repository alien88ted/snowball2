import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF8F5',
          borderRadius: '20%',
          position: 'relative',
        }}
      >
        {/* Left half - Black */}
        <div
          style={{
            position: 'absolute',
            fontSize: 120,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#111111',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          }}
        >
          $
        </div>
        {/* Right half - Red with offset */}
        <div
          style={{
            position: 'absolute',
            fontSize: 120,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#DC143C',
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            transform: 'translateX(3px)',
          }}
        >
          $
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}