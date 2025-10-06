import { NextRequest, NextResponse } from 'next/server'

const PIXELLAB_API_KEY = 'bc272d7f-b27b-4ba7-8390-5db48fbc0eb0'

export async function POST(request: NextRequest) {
  try {
    const { name, symbol, category } = await request.json()

    if (!name || !symbol) {
      return NextResponse.json(
        { error: 'Name and symbol are required' },
        { status: 400 }
      )
    }

    // Create a clean, minimal prompt for icon generation - black and white only
    const prompt = `Minimalist black and white logo, text "${symbol}", clean typography, monochrome, no gradients, transparent background, simple flat design, helvetica or arial font`

    try {
      const response = await fetch('https://api.pixellab.ai/v1/generate-image-pixflux', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PIXELLAB_API_KEY}`
        },
        body: JSON.stringify({
          description: prompt.slice(0, 250),
          image_size: { height: 256, width: 256 },
          no_background: true
        })
      })

      if (!response.ok) {
        throw new Error('PixelLab API error')
      }

      const data = await response.json()
      const imageUrl = `data:image/png;base64,${data.image.base64}`

      return NextResponse.json({
        imageUrl,
        generated: true
      })
    } catch (pixelLabError) {
      // Fallback to a simple black and white SVG with ticker
      const fontSize = symbol.length <= 3 ? "72" : symbol.length <= 4 ? "56" : "48"

      const svg = `
        <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <rect width="256" height="256" fill="white"/>
          <rect x="2" y="2" width="252" height="252" fill="white" stroke="#e5e5e5" stroke-width="2"/>
          <text x="128" y="145" font-family="Georgia, serif" font-size="${fontSize}" font-weight="600" fill="black" text-anchor="middle" letter-spacing="1">
            $${symbol.toUpperCase()}
          </text>
        </svg>
      `

      const base64 = Buffer.from(svg).toString('base64')
      const svgDataUrl = `data:image/svg+xml;base64,${base64}`

      return NextResponse.json({
        imageUrl: svgDataUrl,
        fallback: true
      })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate icon' },
      { status: 500 }
    )
  }
}