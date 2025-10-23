"use client"

import { useState, useRef } from "react"
import { Download, Image as ImageIcon } from "lucide-react"
import { toPng } from 'html-to-image'

export default function TwitterAssetsPage() {
  const [downloading, setDownloading] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  const downloadAsImage = async (elementRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!elementRef.current) return

    setDownloading(true)
    try {
      const dataUrl = await toPng(elementRef.current, {
        quality: 1,
        pixelRatio: 2,
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

  const downloadAsSVG = (type: 'profile' | 'banner') => {
    const width = type === 'profile' ? 500 : 1500
    const height = 500

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
            <feColorMatrix in="noise" type="saturate" values="0"/>
          </filter>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#DC143C;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B0000;stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#E8E4DD"/>

        <!-- Paper texture overlay -->
        <rect width="${width}" height="${height}" fill="#E8E4DD" filter="url(#paper-texture)" opacity="0.3"/>

        ${type === 'profile' ? `
          <!-- Profile: Just the $ icon centered -->
          <!-- Left half of $ -->
          <text
            x="250"
            y="320"
            font-family="serif"
            font-size="200"
            font-weight="900"
            text-anchor="middle"
            fill="#111"
            letter-spacing="-10"
          >$</text>

          <!-- Right half of $ in red with offset -->
          <text
            x="256"
            y="320"
            font-family="serif"
            font-size="200"
            font-weight="900"
            text-anchor="middle"
            fill="#DC143C"
            letter-spacing="-10"
            opacity="0.9"
          >$</text>
        ` : `
          <!-- Banner: Centered $ and REBIRTH -->
          <g transform="translate(450, 250)">
            <!-- Left half of $ -->
            <text
              x="0"
              y="0"
              font-family="serif"
              font-size="240"
              font-weight="900"
              fill="#111"
              letter-spacing="-12"
            >$</text>

            <!-- Right half of $ in red with offset -->
            <text
              x="8"
              y="0"
              font-family="serif"
              font-size="240"
              font-weight="900"
              fill="#DC143C"
              letter-spacing="-12"
              opacity="0.9"
            >$</text>
          </g>

          <!-- REBIRTH text -->
          <text
            x="700"
            y="285"
            font-family="serif"
            font-size="140"
            font-weight="900"
            fill="url(#redGradient)"
            letter-spacing="-4"
          >REBIRTH</text>

          <!-- Tagline -->
          <line x1="700" y1="310" x2="770" y2="310" stroke="#DC143C" stroke-width="4"/>
          <text
            x="700"
            y="335"
            font-family="sans-serif"
            font-size="14"
            font-weight="900"
            fill="#DC143C"
            letter-spacing="6"
          >REMEMBER, YOU WERE FORGOTTEN</text>
        `}
      </svg>
    `

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `rebirth-twitter-${type}.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/branding" className="group flex items-center gap-3">
              <span className="text-xl font-serif font-black text-black group-hover:text-[#DC143C] transition-colors uppercase tracking-tight">
                Rebirth
              </span>
              <span className="text-xs text-black/40">/ Twitter Assets</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Profile Picture Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-black text-black uppercase mb-2">Profile Picture</h2>
              <p className="text-sm text-black/60">500x500px - Perfect for Twitter profile</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => downloadAsImage(profileRef, 'rebirth-twitter-profile')}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white text-xs font-black uppercase tracking-wider rounded hover:bg-[#B01030] transition-all disabled:opacity-50"
              >
                <ImageIcon className="w-4 h-4" />
                PNG
              </button>
              <button
                onClick={() => downloadAsSVG('profile')}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#DC143C] text-[#DC143C] text-xs font-black uppercase tracking-wider rounded hover:bg-[#DC143C] hover:text-white transition-all"
              >
                <Download className="w-4 h-4" />
                SVG
              </button>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="flex justify-center">
            <div
              ref={profileRef}
              className="relative w-[500px] h-[500px] rounded-lg shadow-2xl overflow-hidden"
              style={{
                backgroundImage: 'url(/paper-texture.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Additional noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content - Just the $ icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Split $ Symbol */}
                <div className="relative inline-block">
                  <div className="relative">
                    {/* Left half - Solid Black with shadow */}
                    <div
                      className="absolute text-[200px] font-serif font-black leading-none select-none"
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
                      className="absolute text-[200px] font-serif font-black leading-none select-none"
                      style={{
                        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                        color: '#DC143C',
                        letterSpacing: '-0.05em',
                        transform: 'translateX(6px)',
                        opacity: 0.9,
                        textShadow: '0 0 30px rgba(220,20,60,0.6), 0 4px 16px rgba(220,20,60,0.5)',
                      }}
                    >
                      $
                    </div>

                    {/* Invisible placeholder */}
                    <div
                      className="text-[200px] font-serif font-black leading-none select-none invisible"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      $
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-black text-black uppercase mb-2">Banner</h2>
              <p className="text-sm text-black/60">1500x500px - Perfect for Twitter header</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => downloadAsImage(bannerRef, 'rebirth-twitter-banner')}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white text-xs font-black uppercase tracking-wider rounded hover:bg-[#B01030] transition-all disabled:opacity-50"
              >
                <ImageIcon className="w-4 h-4" />
                PNG
              </button>
              <button
                onClick={() => downloadAsSVG('banner')}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#DC143C] text-[#DC143C] text-xs font-black uppercase tracking-wider rounded hover:bg-[#DC143C] hover:text-white transition-all"
              >
                <Download className="w-4 h-4" />
                SVG
              </button>
            </div>
          </div>

          {/* Banner Preview */}
          <div className="overflow-x-auto pb-4">
            <div
              ref={bannerRef}
              className="w-[1500px] h-[500px] rounded-lg shadow-2xl overflow-hidden"
              style={{
                backgroundImage: 'url(/paper-texture.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Additional noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <div className="flex items-center gap-8">
                  {/* Split $ Symbol - Larger */}
                  <div className="relative inline-block">
                    <div className="relative">
                      {/* Left half - Solid Black with shadow */}
                      <div
                        className="absolute text-[240px] font-serif font-black leading-none select-none"
                        style={{
                          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                          color: '#111',
                          letterSpacing: '-0.05em',
                          textShadow: '0 6px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        $
                      </div>

                      {/* Right half with RED offset and glow */}
                      <div
                        className="absolute text-[240px] font-serif font-black leading-none select-none"
                        style={{
                          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                          color: '#DC143C',
                          letterSpacing: '-0.05em',
                          transform: 'translateX(8px)',
                          opacity: 0.9,
                          textShadow: '0 0 40px rgba(220,20,60,0.7), 0 6px 20px rgba(220,20,60,0.6)',
                        }}
                      >
                        $
                      </div>

                      {/* Invisible placeholder */}
                      <div
                        className="text-[240px] font-serif font-black leading-none select-none invisible"
                        style={{ letterSpacing: '-0.05em' }}
                      >
                        $
                      </div>
                    </div>
                  </div>

                  {/* REBIRTH Text Block */}
                  <div>
                    <h1
                      className="text-[140px] font-serif font-black uppercase leading-[0.85] mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.03em'
                      }}
                    >
                      REBIRTH
                    </h1>

                    {/* Tagline */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-[4px] bg-[#DC143C]" />
                      <p className="text-[14px] tracking-[0.45em] text-[#DC143C] uppercase font-black">
                        Remember, you were forgotten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
