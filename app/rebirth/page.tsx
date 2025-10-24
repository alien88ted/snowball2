"use client"

import { useState, useEffect } from "react"

export default function RebirthTestPage() {
  const [currentText, setCurrentText] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const [showElectric, setShowElectric] = useState(false)
  
  const texts = [
    "TOKENIZED STORES",
    "COMMUNITY OWNED", 
    "PROFIT SHARING",
    "DECENTRALIZED",
    "REVOLUTIONARY",
    "REBIRTH"
  ]
  
  useEffect(() => {
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isPaused = false
    
    const type = () => {
      const current = texts[textIndex]
      
      // Check if we're on REBIRTH
      const isRebirth = current === "REBIRTH"
      
      if (!isDeleting) {
        // Typing
        setCurrentText(current.substring(0, charIndex + 1))
        charIndex++
        
        if (charIndex === current.length) {
          // Finished typing
          isPaused = true
          
          if (isRebirth) {
            // Trigger effects for REBIRTH
            setIsGlitching(true)
            setShowElectric(true)
            setTimeout(() => {
              setIsGlitching(false)
              // Keep REBIRTH displayed
            }, 2000)
            return // Stop the typewriter on REBIRTH
          } else {
            // Normal pause before deleting
            setTimeout(() => {
              isPaused = false
              isDeleting = true
            }, 1500)
          }
        }
      } else {
        // Deleting
        setCurrentText(current.substring(0, charIndex - 1))
        charIndex--
        
        if (charIndex === 0) {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
        }
      }
      
      if (!isPaused) {
        const speed = isDeleting ? 50 : isRebirth && charIndex > current.length - 3 ? 200 : 100
        setTimeout(type, speed)
      }
    }
    
    type()
  }, [])
  
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center relative overflow-hidden">
      {/* Paper texture background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92" />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-8">
          TEST PAGE FOR
        </h1>
        
        {/* Typewriter with effects */}
        <div className="relative inline-block">
          {/* Electric background effect */}
          {showElectric && currentText === "REBIRTH" && (
            <>
              {/* Lightning bolts */}
              <svg 
                className="absolute -inset-20 w-[calc(100%+160px)] h-[calc(100%+160px)] pointer-events-none"
                style={{ filter: 'blur(1px)' }}
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key={i}
                    d={`M ${50 + i * 30} 0 L ${60 + i * 30} 40 L ${45 + i * 30} 45 L ${55 + i * 30} 100`}
                    stroke="#DC143C"
                    strokeWidth="2"
                    fill="none"
                    opacity={0.6}
                    className="animate-pulse"
                    style={{
                      animation: `lightning ${0.2 + i * 0.1}s ease-out infinite`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </svg>
              
              {/* Electric glow */}
              <div className="absolute -inset-10 bg-gradient-radial from-[#DC143C]/20 via-[#DC143C]/10 to-transparent blur-xl animate-pulse" />
              <div className="absolute -inset-5 bg-gradient-radial from-[#FF1744]/20 via-[#FF1744]/10 to-transparent blur-lg animate-pulse" style={{ animationDelay: '0.1s' }} />
            </>
          )}
          
          <h2 
            className={`text-7xl md:text-9xl font-black uppercase relative ${
              currentText === "REBIRTH" 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C] animate-gradient'
                : 'text-black'
            } ${isGlitching ? 'glitch' : ''}`}
            data-text={currentText}
            style={{
              textShadow: currentText === "REBIRTH" 
                ? `
                  0 0 10px rgba(220, 20, 60, 0.8),
                  0 0 20px rgba(220, 20, 60, 0.6),
                  0 0 30px rgba(220, 20, 60, 0.4),
                  0 0 40px rgba(220, 20, 60, 0.2),
                  2px 2px 0 #000,
                  -2px -2px 0 #000,
                  2px -2px 0 #000,
                  -2px 2px 0 #000
                ` 
                : 'none'
            }}
          >
            {currentText}
            <span className={`${currentText !== "REBIRTH" ? 'animate-blink' : 'hidden'}`}>_</span>
          </h2>
          
          {/* Glitch effect layers */}
          {isGlitching && currentText === "REBIRTH" && (
            <>
              <div className="absolute inset-0 text-7xl md:text-9xl font-black uppercase text-[#00FFFF] opacity-70 mix-blend-screen glitch-1">
                {currentText}
              </div>
              <div className="absolute inset-0 text-7xl md:text-9xl font-black uppercase text-[#FF00FF] opacity-70 mix-blend-screen glitch-2">
                {currentText}
              </div>
            </>
          )}
        </div>
        
        {/* Additional effects info */}
        <div className="mt-16 space-y-4 text-sm uppercase tracking-wider font-bold text-gray-600">
          <p>Effects Testing:</p>
          <div className="flex justify-center gap-8">
            <span className={currentText === "REBIRTH" ? "text-[#DC143C]" : ""}>
              ✓ Typewriter
            </span>
            <span className={isGlitching ? "text-[#DC143C]" : ""}>
              {isGlitching ? "✓" : "○"} Glitch
            </span>
            <span className={showElectric ? "text-[#DC143C]" : ""}>
              {showElectric ? "✓" : "○"} Electric
            </span>
          </div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes lightning {
          0% { 
            opacity: 0;
            stroke-dasharray: 0 100;
          }
          50% {
            opacity: 1;
            stroke-dasharray: 100 0;
          }
          100% {
            opacity: 0;
            stroke-dasharray: 100 0;
          }
        }
        
        @keyframes glitchAnim {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translate(-3px, 3px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(-3px, -3px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(3px, 3px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(3px, -3px);
            filter: hue-rotate(360deg);
          }
        }
        
        .glitch {
          position: relative;
          animation: glitchAnim 0.3s infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          animation: glitchAnim 0.3s infinite;
          animation-direction: reverse;
          color: #00FFFF;
          z-index: -1;
          mix-blend-mode: screen;
        }
        
        .glitch::after {
          animation: glitchAnim 0.3s infinite;
          animation-delay: 0.1s;
          color: #FF00FF;
          z-index: -2;
          mix-blend-mode: screen;
        }
        
        .glitch-1 {
          animation: glitchAnim 0.2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        
        .glitch-2 {
          animation: glitchAnim 0.3s infinite reverse;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
      `}</style>
    </div>
  )
}
