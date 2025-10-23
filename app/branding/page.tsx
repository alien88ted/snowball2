"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Download, Image as ImageIcon, Twitter } from "lucide-react"
import { toPng } from 'html-to-image'

export default function BrandingPage() {
  const [mounted, setMounted] = useState(false)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const colorsRef = useRef<HTMLElement>(null)
  const fullPageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Random glitch effect
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const downloadSection = async (elementRef: React.RefObject<HTMLElement>, filename: string) => {
    if (!elementRef.current) return

    setDownloading(true)
    try {
      const dataUrl = await toPng(elementRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#FAF8F5'
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  const downloadLogo = async () => {
    await downloadSection(logoRef, 'rebirth-logo')
  }

  const downloadColors = async () => {
    await downloadSection(colorsRef, 'rebirth-colors')
  }

  const downloadFullPage = async () => {
    if (!fullPageRef.current) return

    setDownloading(true)
    try {
      const dataUrl = await toPng(fullPageRef.current, {
        quality: 1,
        pixelRatio: 1.5,
        backgroundColor: '#FAF8F5'
      })

      const link = document.createElement('a')
      link.download = 'rebirth-brand-guide.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  const colors = [
    { name: "Primary Red", hex: "#DC143C", desc: "Main brand color" },
    { name: "Bright Red", hex: "#FF1744", desc: "Accents & gradients" },
    { name: "Deep Red", hex: "#B01030", desc: "Hover states" },
    { name: "Dark Red", hex: "#8B0000", desc: "Dark text" },
    { name: "Black", hex: "#111111", desc: "Primary text" },
    { name: "Off White", hex: "#FAF8F5", desc: "Background" }
  ]

  const typography = [
    { label: "Display", size: "text-[120px]", weight: "font-black", text: "REBIRTH" },
    { label: "Heading 1", size: "text-7xl", weight: "font-black", text: "Physical stores" },
    { label: "Heading 2", size: "text-5xl", weight: "font-bold", text: "Onchain rebirth" },
    { label: "Body", size: "text-lg", weight: "font-medium", text: "Remember, you were forgotten" },
    { label: "Caption", size: "text-xs", weight: "font-black", text: "FUTURE OF COMMERCE" }
  ]

  return (
    <main className="min-h-screen bg-[#FAF8F5] relative overflow-hidden" ref={fullPageRef as any}>
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating $ symbols - subtle */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute font-serif font-black text-black text-[8rem]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              $
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="group">
              <span className="text-xl font-serif font-black text-black group-hover:text-[#DC143C] transition-colors uppercase tracking-tight">
                Rebirth
              </span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/branding/twitter-assets"
                className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black text-xs font-black uppercase tracking-wider rounded hover:bg-black hover:text-white transition-all"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Twitter Assets
              </a>
              <button
                onClick={downloadFullPage}
                disabled={downloading}
                className="group flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white text-xs font-black uppercase tracking-wider rounded hover:bg-[#B01030] transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                {downloading ? 'Exporting...' : 'Download All'}
              </button>
              <div className="flex items-center gap-1">
                <div className="w-8 h-[2px] bg-[#DC143C]" />
                <span className="text-[10px] font-black tracking-[0.3em] text-black uppercase">Brand Guidelines</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero - Master Logo */}
        <section className="mb-32 relative">
          {/* Grid background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Label */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[#DC143C] font-black">001</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">MASTER LOGO</h3>
            </div>
            <button
              onClick={downloadLogo}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#DC143C] text-[#DC143C] text-xs font-black uppercase tracking-wider rounded hover:bg-[#DC143C] hover:text-white transition-all disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Export Logo
            </button>
          </div>

          {/* Main Logo Display */}
          <div className="relative mb-16" ref={logoRef as any}>
            {/* Split $ Symbol */}
            <div className="relative inline-block group cursor-default mb-8">
              <div className="relative">
                {/* Left half - Solid Black with shadow */}
                <div
                  className="absolute text-[160px] md:text-[200px] font-serif font-black leading-none select-none"
                  style={{
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                    color: '#111',
                    letterSpacing: '-0.05em',
                    textShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  $
                </div>

                {/* Right half with RED offset and glow */}
                <div
                  className="absolute text-[160px] md:text-[200px] font-serif font-black leading-none select-none"
                  style={{
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                    color: '#DC143C',
                    letterSpacing: '-0.05em',
                    transform: 'translateX(5px)',
                    opacity: 0.9,
                    textShadow: '0 0 20px rgba(220,20,60,0.5), 0 4px 12px rgba(220,20,60,0.4)',
                  }}
                >
                  $
                </div>

                {/* Glitch/distortion effect on hover */}
                <div
                  className="absolute text-[160px] md:text-[200px] font-serif font-black leading-none select-none opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{
                    color: 'transparent',
                    letterSpacing: '-0.05em',
                    textShadow: '3px 3px 0 rgba(220,20,60,0.6), -3px -3px 0 rgba(0,200,255,0.4)',
                    animation: glitchActive ? 'glitch 0.3s infinite' : 'none',
                    mixBlendMode: 'screen',
                  }}
                >
                  $
                </div>

                {/* Invisible placeholder */}
                <div
                  className="text-[160px] md:text-[200px] font-serif font-black leading-none select-none invisible"
                  style={{ letterSpacing: '-0.05em' }}
                >
                  $
                </div>
              </div>

              {/* Corner brackets - brutalist frame */}
              <div className="absolute -top-4 -left-4 w-10 h-10 border-t-4 border-l-4 border-[#DC143C] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-4 border-r-4 border-black opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Accent squares */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#DC143C] opacity-40 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-black opacity-30 group-hover:opacity-80 transition-all duration-500" />
            </div>
          </div>

          {/* REBIRTH Wordmark */}
          <div className="relative">
            <h1 className="text-[120px] md:text-[180px] font-serif font-black leading-[0.85] tracking-[-0.03em] uppercase mb-8"
              style={{
                background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Rebirth
            </h1>

            {/* Tagline */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-[3px] bg-[#DC143C]" />
              <p className="text-[11px] tracking-[0.35em] text-[#DC143C] uppercase font-black">
                Remember, you were forgotten
              </p>
            </div>

            {/* Description */}
            <p className="text-xl text-black/70 max-w-2xl leading-relaxed font-medium">
              Physical stores with onchain DNA. Where customers become owners.
              Where loyalty becomes equity. The rebirth of commerce.
            </p>
          </div>

          {/* Logo variations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Black version */}
            <div className="p-8 border-2 border-black/10 bg-white relative group hover:border-black/30 transition-all">
              <div className="absolute top-3 right-3 text-[8px] font-black tracking-[0.3em] text-black/40">BLACK</div>
              <div className="text-6xl font-serif font-black text-black uppercase tracking-tight">Rebirth</div>
            </div>

            {/* Red version */}
            <div className="p-8 border-2 border-black/10 bg-white relative group hover:border-[#DC143C]/30 transition-all">
              <div className="absolute top-3 right-3 text-[8px] font-black tracking-[0.3em] text-black/40">RED</div>
              <div className="text-6xl font-serif font-black uppercase tracking-tight" style={{ color: '#DC143C' }}>Rebirth</div>
            </div>

            {/* White version */}
            <div className="p-8 border-2 border-black bg-black relative group hover:border-[#DC143C] transition-all">
              <div className="absolute top-3 right-3 text-[8px] font-black tracking-[0.3em] text-white/40">WHITE</div>
              <div className="text-6xl font-serif font-black text-white uppercase tracking-tight">Rebirth</div>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-32" ref={colorsRef as any}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[#DC143C] font-black">002</span>
              <div className="w-16 h-[2px] bg-[#DC143C]" />
              <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">COLOR PALETTE</h3>
            </div>
            <button
              onClick={downloadColors}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#DC143C] text-[#DC143C] text-xs font-black uppercase tracking-wider rounded hover:bg-[#DC143C] hover:text-white transition-all disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Export Colors
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color.hex} className="group">
                <div
                  className="w-full h-48 mb-4 relative overflow-hidden border-2 border-black/10 cursor-pointer hover:border-black/30 transition-all"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex)}
                >
                  {/* Corner frame */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30" />

                  {/* Copy indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedColor === color.hex ? (
                      <Check className="w-8 h-8 text-white" />
                    ) : (
                      <Copy className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-black uppercase tracking-wide">{color.name}</span>
                    <button
                      onClick={() => copyColor(color.hex)}
                      className="text-xs font-mono text-black/60 hover:text-[#DC143C] transition-colors"
                    >
                      {copiedColor === color.hex ? 'Copied!' : color.hex}
                    </button>
                  </div>
                  <p className="text-xs text-black/50">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-sm font-mono text-[#DC143C] font-black">003</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">TYPOGRAPHY</h3>
          </div>

          <div className="space-y-12">
            {typography.map((type) => (
              <div key={type.label} className="border-l-4 border-[#DC143C] pl-6 py-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black tracking-[0.3em] text-black/40 uppercase">{type.label}</span>
                  <div className="h-[1px] flex-1 bg-black/10" />
                </div>
                <div className={`${type.size} ${type.weight} font-serif text-black uppercase tracking-tight leading-none`}>
                  {type.text}
                </div>
              </div>
            ))}
          </div>

          {/* Font info */}
          <div className="mt-12 p-8 border-2 border-black/10 bg-white">
            <h4 className="text-sm font-black text-black uppercase tracking-wide mb-4">Typefaces</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-serif font-black mb-2">Instrument Serif</div>
                <p className="text-sm text-black/60">Headings, Display, Logo</p>
              </div>
              <div>
                <div className="text-2xl font-sans font-medium mb-2">Inter</div>
                <p className="text-sm text-black/60">Body text, UI elements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-sm font-mono text-[#DC143C] font-black">004</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">DESIGN PRINCIPLES</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-black/10 p-8 hover:border-[#DC143C]/30 transition-all">
              <div className="w-12 h-12 bg-[#DC143C] mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">1</span>
              </div>
              <h4 className="text-2xl font-serif font-black text-black uppercase mb-4">Brutalist</h4>
              <p className="text-black/70 leading-relaxed">
                Raw, honest, direct. No unnecessary decoration. Form follows function.
                Let the content breathe with bold typography and stark contrast.
              </p>
            </div>

            <div className="border-2 border-black/10 p-8 hover:border-[#DC143C]/30 transition-all">
              <div className="w-12 h-12 bg-[#DC143C] mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">2</span>
              </div>
              <h4 className="text-2xl font-serif font-black text-black uppercase mb-4">Editorial</h4>
              <p className="text-black/70 leading-relaxed">
                Magazine-inspired layouts. Strong hierarchies. Confident typography.
                Generous spacing. Make every element count.
              </p>
            </div>

            <div className="border-2 border-black/10 p-8 hover:border-[#DC143C]/30 transition-all">
              <div className="w-12 h-12 bg-[#DC143C] mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">3</span>
              </div>
              <h4 className="text-2xl font-serif font-black text-black uppercase mb-4">Memorable</h4>
              <p className="text-black/70 leading-relaxed">
                Distinctive identity. The split dollar sign. The bold red.
                The brutal typography. Stand out, be remembered.
              </p>
            </div>

            <div className="border-2 border-black/10 p-8 hover:border-[#DC143C]/30 transition-all">
              <div className="w-12 h-12 bg-[#DC143C] mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">4</span>
              </div>
              <h4 className="text-2xl font-serif font-black text-black uppercase mb-4">Physical + Digital</h4>
              <p className="text-black/70 leading-relaxed">
                Bridge the physical and blockchain. Real stores with onchain DNA.
                Tangible experiences with digital ownership. The future of commerce.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <div className="flex items-center gap-3 mb-12">
            <span className="text-sm font-mono text-[#DC143C] font-black">005</span>
            <div className="w-16 h-[2px] bg-[#DC143C]" />
            <h3 className="text-sm font-black text-[#DC143C] tracking-[0.3em]">IN USE</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business card mockup */}
            <div className="p-12 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <div className="w-full max-w-sm aspect-[1.75] bg-black p-8 flex flex-col justify-between border-2 border-white/20">
                <div className="text-4xl font-serif font-black text-white uppercase">Rebirth</div>
                <div className="space-y-1 text-right">
                  <div className="text-[8px] tracking-[0.3em] text-white/60 uppercase font-black">Physical stores, onchain</div>
                  <div className="text-xs text-white/80 font-mono">rebirth.com</div>
                </div>
              </div>
            </div>

            {/* Billboard mockup */}
            <div className="p-12 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="w-full aspect-[2] bg-[#DC143C] p-8 flex flex-col justify-center items-center text-center border-4 border-white">
                <div className="text-6xl font-serif font-black text-white uppercase mb-2">Rebirth</div>
                <div className="text-xs tracking-[0.4em] text-white/90 uppercase font-black">Remember, you were forgotten</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-black/10 mt-32 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="text-6xl font-serif font-black text-white uppercase">Rebirth</div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-black mb-1">Brand Guidelines v1.0</div>
              <div className="text-sm text-white/60">{new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Download Menu */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Quick download buttons */}
        <button
          onClick={downloadLogo}
          disabled={downloading}
          className="group flex items-center gap-2 px-4 py-3 bg-black text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-[#DC143C] transition-all shadow-2xl disabled:opacity-50"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="hidden md:inline">Logo</span>
        </button>
        <button
          onClick={downloadColors}
          disabled={downloading}
          className="group flex items-center gap-2 px-4 py-3 bg-black text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-[#DC143C] transition-all shadow-2xl disabled:opacity-50"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="hidden md:inline">Colors</span>
        </button>
        <button
          onClick={downloadFullPage}
          disabled={downloading}
          className="group flex items-center gap-2 px-4 py-3 bg-[#DC143C] text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-[#B01030] transition-all shadow-2xl disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">{downloading ? 'Wait...' : 'All'}</span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </main>
  )
}
