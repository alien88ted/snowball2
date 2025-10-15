"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { Compass, BookOpen, Rocket } from "lucide-react"

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()

  const sections = [
    { id: "discover", name: "Discover", icon: Compass },
    { id: "understand", name: "Understand", icon: BookOpen },
    { id: "engage", name: "Engage", icon: Rocket }
  ]

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      const sectionElements = sections.map(s => document.getElementById(s.id))
      const sectionOffsets = sectionElements.map(el => el ? el.offsetTop : 0)

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionOffsets[i]) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/20">
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-accent"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
            }}
          />
        </div>

        {/* Navigation Items */}
        <div className="relative space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            const isActive = activeSection === index

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div
                  className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center
                    transition-all duration-500 backdrop-blur-xl
                    ${isActive
                      ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110"
                      : "bg-background/80 border border-border/50 hover:border-primary/30 hover:bg-card/80"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform duration-300`} />

                  {/* Tooltip */}
                  <div className="absolute right-full mr-4 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                    {section.name}
                  </div>
                </div>

                {/* Active Indicator Pulse */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-primary/20"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}