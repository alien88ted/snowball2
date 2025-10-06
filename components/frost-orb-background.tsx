"use client"

import { useEffect, useState } from "react"

export function FrostOrbBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Animated gradient orbs with frost effect */}
      <div className="absolute inset-0">
        {/* Top left frost orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            top: "-10%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2), transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
            filter: "blur(60px)"
          }}
        />

        {/* Top right frost orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            top: "5%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.25), rgba(168, 85, 247, 0.2), transparent 70%)",
            animation: "float-slow 18s ease-in-out infinite reverse",
            animationDelay: "2s",
            filter: "blur(70px)"
          }}
        />

        {/* Center orb */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.15), transparent 65%)",
            animation: "pulse-slow 15s ease-in-out infinite",
            filter: "blur(80px)"
          }}
        />

        {/* Bottom left orb */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-25"
          style={{
            bottom: "10%",
            left: "5%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.2), transparent 70%)",
            animation: "float-slow 22s ease-in-out infinite",
            animationDelay: "4s",
            filter: "blur(65px)"
          }}
        />

        {/* Bottom right orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            bottom: "-15%",
            right: "0%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.28), rgba(34, 211, 238, 0.18), transparent 70%)",
            animation: "float-slow 24s ease-in-out infinite reverse",
            animationDelay: "1s",
            filter: "blur(75px)"
          }}
        />
      </div>

      {/* Floating ice crystals / snowflakes - CSS only */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift-${i % 3} ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.5 + Math.random() * 0.4
            }}
          >
            <div
              className="relative"
              style={{
                width: `${5 + Math.random() * 10}px`,
                height: `${5 + Math.random() * 10}px`,
              }}
            >
              {/* Ice crystal shape */}
              <div
                className="absolute inset-0 bg-white/90 rounded-full"
                style={{
                  boxShadow: "0 0 10px rgba(139, 92, 246, 0.5), 0 0 16px rgba(255, 255, 255, 0.4)"
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-white to-purple-200/60 rounded-full blur-[2px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Larger floating snowflake objects */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`snowflake-${i}`}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `float-snowflake ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            {/* Complex snowflake shape */}
            <div className="relative w-12 h-12 opacity-60">
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/90 rounded-full shadow-lg shadow-purple-300/50" />

              {/* 6 arms radiating out */}
              {[...Array(6)].map((_, armIndex) => (
                <div
                  key={armIndex}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-t from-white/90 to-white/40"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${armIndex * 60}deg)`,
                    transformOrigin: "center center",
                    boxShadow: "0 0 6px rgba(139, 92, 246, 0.4)"
                  }}
                >
                  {/* Branch tips */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/80 rounded-full" />
                  <div className="absolute top-2 -left-1 w-1.5 h-1.5 bg-white/70 rounded-full" />
                  <div className="absolute top-2 -right-1 w-1.5 h-1.5 bg-white/70 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Frost particles - tiny specs */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`frost-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: "0 0 3px rgba(255, 255, 255, 0.6)"
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes drift-0 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -15px) rotate(90deg);
          }
          50% {
            transform: translate(-10px, 10px) rotate(180deg);
          }
          75% {
            transform: translate(15px, 5px) rotate(270deg);
          }
        }

        @keyframes drift-1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-15px, 20px) rotate(120deg);
          }
          66% {
            transform: translate(10px, -10px) rotate(240deg);
          }
        }

        @keyframes drift-2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          40% {
            transform: translate(25px, 15px) rotate(144deg);
          }
          80% {
            transform: translate(-20px, -5px) rotate(288deg);
          }
        }

        @keyframes float-snowflake {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(40px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, 20px) rotate(180deg);
          }
          75% {
            transform: translate(30px, 10px) rotate(270deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}
