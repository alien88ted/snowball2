import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
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
          position: 'relative',
        }}
      >
        {/* Left half - Black */}
        <div
          style={{
            position: 'absolute',
            fontSize: 24,
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
            fontSize: 24,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#DC143C',
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            transform: 'translateX(1px)',
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