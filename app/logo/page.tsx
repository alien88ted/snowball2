"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function LogoPage() {
  const [copiedSVG, setCopiedSVG] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png'>('svg')

  // Our perfect $ logo SVG with gradient and premium styling
  const logoSVG = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dollarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Outer circle with gradient -->
  <circle cx="100" cy="100" r="95" fill="url(#dollarGradient)" opacity="0.1"/>
  <circle cx="100" cy="100" r="95" stroke="url(#dollarGradient)" stroke-width="3" fill="none"/>

  <!-- Inner circle for depth -->
  <circle cx="100" cy="100" r="85" stroke="url(#dollarGradient)" stroke-width="1.5" fill="none" opacity="0.3"/>

  <!-- Dollar sign with custom font styling -->
  <g filter="url(#glow)">
    <!-- Top vertical line -->
    <rect x="95" y="30" width="10" height="140" fill="url(#dollarGradient)" rx="5"/>

    <!-- Top curve of S -->
    <path d="M 70 60 Q 70 45 85 45 L 115 45 Q 130 45 130 60 Q 130 70 115 75 L 85 85"
          stroke="url(#dollarGradient)"
          stroke-width="12"
          fill="none"
          stroke-linecap="round"/>

    <!-- Bottom curve of S -->
    <path d="M 115 115 L 85 125 Q 70 130 70 140 Q 70 155 85 155 L 115 155 Q 130 155 130 140"
          stroke="url(#dollarGradient)"
          stroke-width="12"
          fill="none"
          stroke-linecap="round"/>
  </g>

  <!-- Corner accents (matching your design system) -->
  <path d="M 20 20 L 20 35 M 20 20 L 35 20" stroke="url(#dollarGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M 180 20 L 180 35 M 180 20 L 165 20" stroke="url(#dollarGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M 20 180 L 20 165 M 20 180 L 35 180" stroke="url(#dollarGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M 180 180 L 180 165 M 180 180 L 165 180" stroke="url(#dollarGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
</svg>`

  const copySVG = async () => {
    await navigator.clipboard.writeText(logoSVG)
    setCopiedSVG(true)
    setTimeout(() => setCopiedSVG(false), 2000)
  }

  const downloadSVG = () => {
    const blob = new Blob([logoSVG], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'snowball-logo.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadPNG = (size: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    const svgBlob = new Blob([logoSVG], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        if (!blob) return
        const pngUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = pngUrl
        a.download = `snowball-logo-${size}x${size}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(pngUrl)
      })
      URL.revokeObjectURL(url)
    }

    img.src = url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-bold text-primary">Brand Assets</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            $ Logo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your premium tokenized business logo. Download in multiple formats.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Logo Preview */}
          <Card className="relative border-2 border-primary/20 bg-gradient-to-br from-white via-white to-primary/5 shadow-2xl overflow-hidden">
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[2.5px] border-l-[2.5px] border-primary/40 rounded-tl-2xl" />
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[2.5px] border-r-[2.5px] border-accent/40 rounded-tr-2xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[2.5px] border-l-[2.5px] border-accent/40 rounded-bl-2xl" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[2.5px] border-r-[2.5px] border-primary/40 rounded-br-2xl" />

            <CardHeader>
              <CardTitle className="text-2xl">Logo Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Premium gradient design with glow effect
              </p>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
                <div
                  dangerouslySetInnerHTML={{ __html: logoSVG }}
                  className="relative drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <div className="space-y-6">
            {/* SVG Download */}
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-white via-green-50/30 to-white shadow-xl">
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-green-500/40 rounded-tl-xl" />
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-green-500/40 rounded-tr-xl" />

              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">SVG Format</CardTitle>
                    <p className="text-xs text-muted-foreground">Vector - scales infinitely</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={downloadSVG}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
                  <Button
                    onClick={copySVG}
                    variant="outline"
                    className="border-2 border-green-500/40 hover:bg-green-50"
                  >
                    {copiedSVG ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Best for web, design tools, and print. Maintains quality at any size.
                </p>
              </CardContent>
            </Card>

            {/* PNG Downloads */}
            <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl">
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-blue-500/40 rounded-tl-xl" />
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-[2.5px] border-r-[2.5px] border-blue-500/40 rounded-tr-xl" />

              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">PNG Format</CardTitle>
                    <p className="text-xs text-muted-foreground">Raster - various sizes</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { size: 512, label: '512×512', desc: 'Social media' },
                    { size: 1024, label: '1024×1024', desc: 'High-res' },
                    { size: 2048, label: '2048×2048', desc: 'Print' },
                    { size: 4096, label: '4096×4096', desc: 'Max quality' },
                  ].map(({ size, label, desc }) => (
                    <Button
                      key={size}
                      onClick={() => downloadPNG(size)}
                      variant="outline"
                      className="flex-col h-auto py-3 border-2 border-blue-500/30 hover:bg-blue-50 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <span className="font-bold">{label}</span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Transparent background. Perfect for social media, presentations, and apps.
                </p>
              </CardContent>
            </Card>

            {/* Usage Guidelines */}
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-white via-purple-50/30 to-white shadow-xl">
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-[2.5px] border-l-[2.5px] border-purple-500/40 rounded-tl-xl" />

              <CardHeader>
                <CardTitle className="text-xl">Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div>
                    <span className="font-semibold">Always maintain aspect ratio</span>
                    <p className="text-xs text-muted-foreground">Don't stretch or distort</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div>
                    <span className="font-semibold">Minimum size: 32×32px</span>
                    <p className="text-xs text-muted-foreground">For readability</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div>
                    <span className="font-semibold">Clear space around logo</span>
                    <p className="text-xs text-muted-foreground">Minimum 10% of logo size</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                  <div>
                    <span className="font-semibold">Don't change colors</span>
                    <p className="text-xs text-muted-foreground">Keep original gradient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Color Palette */}
        <Card className="border-2 border-primary/20 bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Brand Colors</CardTitle>
            <p className="text-sm text-muted-foreground">
              Primary gradient colors used in the logo
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: 'Primary Green', hex: '#10b981', rgb: 'rgb(16, 185, 129)' },
                { name: 'Emerald', hex: '#059669', rgb: 'rgb(5, 150, 105)' },
                { name: 'Dark Green', hex: '#047857', rgb: 'rgb(4, 120, 87)' },
              ].map((color) => (
                <div key={color.hex} className="space-y-3">
                  <div
                    className="h-24 rounded-xl shadow-lg border-2 border-border/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <div className="font-bold text-sm">{color.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{color.hex}</div>
                    <div className="text-xs text-muted-foreground font-mono">{color.rgb}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Different Sizes Preview */}
        <Card className="mt-8 border-2 border-primary/20 bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Size Examples</CardTitle>
            <p className="text-sm text-muted-foreground">
              How the logo looks at different sizes
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-around gap-8 p-8 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl">
              {[32, 64, 96, 128, 200].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: logoSVG.replace(/width="200" height="200"/, `width="${size}" height="${size}"`) }}
                    className="drop-shadow-lg"
                  />
                  <span className="text-xs font-semibold text-muted-foreground">{size}px</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
