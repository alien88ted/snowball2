"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Download, Copy, Check, Palette, Package, Sparkles } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LogoEditorPage() {
  // Text
  const [logoText, setLogoText] = useState("$coffee")
  
  // Style state
  const [currentStyle, setCurrentStyle] = useState('beirut-coffee')
  const [customColor, setCustomColor] = useState("#6F4E37")
  const [gradientOpacity, setGradientOpacity] = useState(0.9)
  
  // Copy states
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  // Sexy style presets
  const stylePresets = [
    {
      id: 'beirut-coffee',
      name: '☕ Beirut Brew',
      gradient: true,
      color1: '#6F4E37',  // Rich coffee brown
      color2: '#C4A574',  // Warm cream/foam
      opacity: 0.9,
      description: 'Lebanese warmth'
    },
    {
      id: 'cedar-espresso',
      name: '🌲 Cedar Espresso',
      gradient: true,
      color1: '#2E7D32',  // Lebanese cedar green
      color2: '#5D4037',  // Espresso brown
      opacity: 1,
      description: 'Cedar meets coffee'
    },
    {
      id: 'mediterranean-roast',
      name: '🌊 Corniche Café',
      gradient: true,
      color1: '#8D6E63',  // Roasted coffee
      color2: '#0277BD',  // Mediterranean blue
      opacity: 0.85,
      description: 'Beirut sea breeze'
    },
    {
      id: 'classic',
      name: 'Classic',
      gradient: true,
      color1: '#000000',
      color2: '#000000',
      opacity: 0.7,
      description: 'Clean & minimal'
    },
    {
      id: 'ocean',
      name: 'Ocean Depth',
      gradient: true,
      color1: '#0891b2',
      color2: '#0c4a6e',
      opacity: 1,
      description: 'Deep sea vibes'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      gradient: true,
      color1: '#f97316',
      color2: '#dc2626',
      opacity: 1,
      description: 'Warm gradient'
    },
    {
      id: 'aurora',
      name: 'Aurora',
      gradient: true,
      color1: '#8b5cf6',
      color2: '#06b6d4',
      opacity: 1,
      description: 'Northern lights'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      gradient: true,
      color1: '#10b981',
      color2: '#047857',
      opacity: 1,
      description: 'Rich green'
    },
    {
      id: 'royal',
      name: 'Royal',
      gradient: true,
      color1: '#6366f1',
      color2: '#4338ca',
      opacity: 1,
      description: 'Regal purple'
    },
    {
      id: 'carbon',
      name: 'Carbon',
      gradient: true,
      color1: '#18181b',
      color2: '#52525b',
      opacity: 1,
      description: 'Dark metal'
    },
    {
      id: 'gold',
      name: 'Gold Rush',
      gradient: true,
      color1: '#fbbf24',
      color2: '#d97706',
      opacity: 1,
      description: 'Premium gold'
    },
    {
      id: 'custom',
      name: 'Custom',
      gradient: true,
      color1: customColor,
      color2: customColor,
      opacity: gradientOpacity,
      description: 'Your style'
    }
  ]

  const activeStyle = stylePresets.find(s => s.id === currentStyle) || stylePresets[0]

  // Generate SVG for any text
  const generateSVG = (text: string, scale = 1) => {
    const fontSize = 32 * scale
    const svgWidth = Math.max(200, text.length * 20 * scale)
    const svgHeight = 60 * scale
    
    return `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&amp;display=swap');
    </style>
    ${activeStyle.gradient ? `
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${activeStyle.color1}" stop-opacity="1" />
      <stop offset="100%" stop-color="${activeStyle.color2}" stop-opacity="${activeStyle.opacity}" />
    </linearGradient>` : ''}
  </defs>
  
  <text x="${svgWidth / 2}" y="${svgHeight / 2 + fontSize * 0.25}" 
        font-family="'Instrument Serif', Georgia, serif"
        font-size="${fontSize}"
        font-weight="700"
        letter-spacing="-0.025em"
        text-anchor="middle" 
        fill="${activeStyle.gradient ? 'url(#textGradient)' : activeStyle.color1}">${text}</text>
</svg>`
  }

  const copySVG = async () => {
    const svg = generateSVG(logoText)
    await navigator.clipboard.writeText(svg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadSingleSVG = (text?: string) => {
    const targetText = text || logoText
    const svg = generateSVG(targetText)
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${targetText.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-logo.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadSinglePNG = (text: string, scale: number) => {
    const svg = generateSVG(text, scale)
    const svgWidth = Math.max(200, text.length * 20) * scale
    const svgHeight = 60 * scale
    
    const canvas = document.createElement('canvas')
    canvas.width = svgWidth
    canvas.height = svgHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    return new Promise<void>((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve()
            return
          }
          const pngUrl = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = pngUrl
          a.download = `${text.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${canvas.width}x${canvas.height}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(pngUrl)
          URL.revokeObjectURL(url)
          resolve()
        })
      }
      img.src = url
    })
  }

  // Download package with $ and full text
  const downloadPackage = async () => {
    setDownloading(true)
    
    // Get just the $ symbol
    const dollarOnly = "$"
    
    // Download $ SVG
    downloadSingleSVG(dollarOnly)
    await new Promise(r => setTimeout(r, 200))
    
    // Download full text SVG
    downloadSingleSVG(logoText)
    await new Promise(r => setTimeout(r, 200))
    
    // Download $ PNG 2x
    await downloadSinglePNG(dollarOnly, 2)
    await new Promise(r => setTimeout(r, 200))
    
    // Download full text PNG 2x
    await downloadSinglePNG(logoText, 2)
    await new Promise(r => setTimeout(r, 200))
    
    // Download $ PNG 4x
    await downloadSinglePNG(dollarOnly, 4)
    await new Promise(r => setTimeout(r, 200))
    
    // Download full text PNG 4x
    await downloadSinglePNG(logoText, 4)
    
    setDownloading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">Logo Studio</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Create Your Logo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from premium styles or customize your own
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <Card className="border border-foreground/10 bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Preview */}
              <div className="p-16 bg-gradient-to-br from-muted/10 via-background to-muted/10 rounded-lg border border-foreground/5">
                <div className="flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: generateSVG(logoText) }} />
                </div>
              </div>

              {/* $ Symbol Preview */}
              <div className="p-8 bg-white border rounded-lg">
                <Label className="text-sm mb-3 block">Symbol Only</Label>
                <div className="flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: generateSVG('$', 2) }} />
                </div>
              </div>

              {/* Header Context */}
              <div className="border rounded-lg p-4 bg-gradient-to-r from-background to-muted/5">
                <Label className="text-xs mb-2 block text-muted-foreground">Header Preview</Label>
                <div className="flex items-center justify-between">
                  <div dangerouslySetInnerHTML={{ __html: generateSVG(logoText, 0.75) }} />
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Home</span>
                    <span>Explorer</span>
                    <span>APY</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls & Export */}
          <div className="space-y-6">
            {/* Text Input Card */}
            <Card className="border border-foreground/10 bg-white shadow-xl">
              <CardHeader>
                <CardTitle>Logo Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="Enter your text..."
                  className="font-serif text-xl mb-3"
                />
                <div className="flex gap-2 flex-wrap">
                  {['$coffee', '$beirut', '$kahwa', '$espresso', '$latte', '$'].map(text => (
                    <Button
                      key={text}
                      onClick={() => setLogoText(text)}
                      variant="outline"
                      size="sm"
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Style Presets Card */}
            <Card className="border border-foreground/10 bg-white shadow-xl">
              <CardHeader>
                <CardTitle>Style Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {stylePresets.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setCurrentStyle(style.id)
                        if (style.id === 'custom') {
                          // Keep custom settings
                        }
                      }}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        currentStyle === style.id 
                          ? 'border-foreground bg-muted' 
                          : 'border-foreground/10 hover:border-foreground/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-8 h-3 rounded"
                          style={{
                            background: style.gradient 
                              ? `linear-gradient(to right, ${style.color1}, ${style.color2})`
                              : style.color1
                          }}
                        />
                        <span className="font-semibold text-sm">{style.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Color Controls */}
                {currentStyle === 'custom' && (
                  <div className="mt-4 p-3 border rounded-lg bg-muted/30">
                    <Label className="text-sm mb-2 block">Custom Settings</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-16 h-9 p-1 cursor-pointer"
                        />
                        <Input
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="flex-1 font-mono text-sm"
                          placeholder="#000000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Gradient Fade: {Math.round(gradientOpacity * 100)}%</Label>
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[gradientOpacity]}
                          onValueChange={([value]) => setGradientOpacity(value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Download Card */}
            <Card className="border border-foreground/10 bg-white shadow-xl">
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => downloadSingleSVG()}
                    className="bg-gradient-to-b from-foreground to-foreground/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </Button>
                  <Button
                    onClick={copySVG}
                    variant="outline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy SVG
                      </>
                    )}
                  </Button>
                </div>

                {/* Package Download */}
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={downloadPackage}
                  disabled={downloading}
                >
                  <Package className="w-4 h-4 mr-2" />
                  {downloading ? (
                    'Downloading Package...'
                  ) : (
                    <>Download Full Package ($ + {logoText})</>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Package includes: $ symbol + full text in SVG & PNG (2x, 4x)
                </p>

                {/* Individual PNGs */}
                <div className="border-t pt-4">
                  <Label className="text-sm mb-2 block">Individual PNGs</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 4].map(scale => (
                      <Button
                        key={scale}
                        onClick={() => downloadSinglePNG(logoText, scale)}
                        variant="outline"
                        size="sm"
                      >
                        PNG {scale}x
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}