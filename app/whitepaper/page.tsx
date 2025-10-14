"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState("intro")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "foundation", title: "Foundation" },
    { id: "location", title: "Location & Equipment" },
    { id: "technology", title: "Technology" },
    { id: "marketing", title: "Marketing" },
    { id: "launch", title: "Launch Strategy" },
    { id: "operations", title: "Operations" },
    { id: "scaling", title: "Scaling" },
    { id: "vision", title: "Long-term Vision" }
  ]

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#000000" }}>
      {/* Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "#e5e5e5", zIndex: 50 }}>
        <div
          style={{
            height: "100%",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            width: `${scrollProgress}%`,
            transition: "width 0.3s"
          }}
        />
      </div>

      {/* Hero */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px", color: "#111827" }}>
            $COFFEE Whitepaper
          </h1>
          <p style={{ fontSize: "24px", color: "#6b7280", marginBottom: "40px" }}>
            The Complete Execution Playbook: From $50K to Tokenized Coffee Empire
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "800px", margin: "0 auto 40px" }}>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "12px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>$50K</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Initial Capital</div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "12px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>30 Days</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>To Launch</div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "12px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>5M</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Total Tokens</div>
            </div>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "12px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>$500K</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Target Raise</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#intro" style={{ padding: "12px 24px", backgroundColor: "#111827", color: "#ffffff", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
              Read Whitepaper →
            </a>
            <Link href="/" style={{ padding: "12px 24px", border: "2px solid #111827", color: "#111827", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ position: "sticky", top: 0, backgroundColor: "#ffffff", borderBottom: "1px solid #e5e5e5", zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 20px", display: "flex", gap: "8px", overflowX: "auto" }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: activeSection === section.id ? "#3b82f6" : "#f3f4f6",
                color: activeSection === section.id ? "#ffffff" : "#4b5563",
                fontWeight: "500",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>

        {/* Introduction */}
        <section id="intro" style={{ marginBottom: "80px" }}>
          <div style={{ padding: "48px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
              ☕ Introduction
            </h2>

            <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>
              READ THIS. DO THIS. WIN.
            </p>

            <p style={{ fontSize: "18px", lineHeight: "1.7", marginBottom: "32px", color: "#4b5563" }}>
              This whitepaper contains the complete execution playbook for launching the world's first
              tokenized coffee shop. From $50K initial investment to a global franchise empire.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
              <div style={{ padding: "24px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>What You're Building</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>✓ Physical coffee shop with blockchain backend</li>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>✓ Customers earn ownership tokens with purchases</li>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>✓ Employees receive equity instead of just wages</li>
                  <li style={{ color: "#374151" }}>✓ Community governance through token voting</li>
                </ul>
              </div>

              <div style={{ padding: "24px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Reality Check</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>⚠️ 80-100 hour work weeks for 3 months</li>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>⚠️ $50K you can afford to lose</li>
                  <li style={{ marginBottom: "12px", color: "#374151" }}>⚠️ Public failure risk</li>
                  <li style={{ color: "#374151" }}>⚠️ No glamour, just hustle</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation */}
        <section id="foundation" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            🏗️ Part 1: Foundation
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Mental Preparation</h3>
              <p style={{ marginBottom: "16px", color: "#4b5563", lineHeight: "1.6" }}>
                This will be the hardest thing you've ever done. You're not just opening a coffee shop or launching a token—you're pioneering an entirely new business model.
              </p>
              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Success Depends On:</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563" }}>
                  <li>Speed of execution (30 days, not 90)</li>
                  <li>Relentless hustle (barista + CEO + janitor)</li>
                  <li>Community obsession (every customer is an investor)</li>
                  <li>Data-driven decisions (trust numbers, not feelings)</li>
                  <li>Authenticity (be real, show struggles)</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Legal Setup</h3>
              <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Business Structure: LLC</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Personal asset protection</li>
                  <li>Tax flexibility</li>
                  <li>Simple to set up</li>
                  <li>Professional appearance</li>
                  <li>Required for banking</li>
                </ul>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Timeline & Cost</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Registration: $500 (2-3 weeks)</li>
                  <li>Tax ID: 1 week</li>
                  <li>Municipality License: $300-500 (2-4 weeks)</li>
                  <li>Lawyer budget: $2,000</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Banking & Finance</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>💵</div>
                  <h4 style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>Business Account</h4>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>LLC docs + Tax ID</p>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>🔐</div>
                  <h4 style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>Crypto Wallets</h4>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>Treasury, Operations</p>
                </div>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Payment Processing</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Square for fiat (2.6% + 10¢)</li>
                  <li>BitPay for crypto (1% fee)</li>
                  <li>Cash float: $200</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Team Assembly</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600", color: "#111827" }}>You (Founder)</span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>80+ hrs/week</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>$0 salary + tokens</p>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600", color: "#111827" }}>Barista #1</span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>20 hrs/week</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>$600/month + 50 tokens/month</p>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600", color: "#111827" }}>Developer</span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>Contract</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>$3,000 one-time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Equipment */}
        <section id="location" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            📍 Part 2: Location & Equipment
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Finding the Perfect Popup Location</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div style={{ padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px" }}>
                  <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Must-Haves</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                    <li>200-400 sq ft</li>
                    <li>High foot traffic (300+ people/day)</li>
                    <li>Electricity + water access</li>
                    <li>Month-to-month lease</li>
                    <li>Young demographic (18-35)</li>
                  </ul>
                </div>
                <div style={{ padding: "16px", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
                  <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Deal-Breakers</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                    <li>Long-term lease (6+ months)</li>
                    <li>Hidden fees</li>
                    <li>No electricity</li>
                    <li>Terrible location</li>
                    <li>Overly restrictive rules</li>
                  </ul>
                </div>
              </div>

              <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Location Types</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "500", color: "#111827" }}>Co-Working Spaces</span>
                  <span style={{ color: "#3b82f6" }}>$500-800/mo</span>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "500", color: "#111827" }}>University Campus</span>
                  <span style={{ color: "#3b82f6" }}>$300-600/mo</span>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "500", color: "#111827" }}>Shopping Mall Kiosk</span>
                  <span style={{ color: "#3b82f6" }}>$1,000-1,500/mo</span>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "500", color: "#111827" }}>Market Stall</span>
                  <span style={{ color: "#3b82f6" }}>$50-100/day</span>
                </div>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Equipment Budget</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>Coffee Equipment</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Espresso, grinder, etc</div>
                    </div>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$6,000</span>
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>Storage & Fridge</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Cold storage</div>
                    </div>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$1,200</span>
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>POS & Tech</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>iPad, Square</div>
                    </div>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$800</span>
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>Furniture</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Counter, stools</div>
                    </div>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$1,500</span>
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>Supplies (1mo)</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Cups, lids, etc</div>
                    </div>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$1,000</span>
                  </div>
                </div>
                <div style={{ padding: "12px", borderTop: "2px solid #e5e5e5", marginTop: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "600", color: "#111827" }}>Total Equipment</span>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#3b82f6" }}>$10,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            ⚡ Part 3: Technology
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Smart Contract</h3>
              <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Core Functions</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Create 5M $COFFEE tokens</li>
                  <li>Handle vesting schedules</li>
                  <li>Reward customers automatically</li>
                  <li>Track ownership</li>
                  <li>Enable governance voting</li>
                </ul>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Tech Stack</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>ERC-20 Standard</li>
                  <li>Polygon blockchain</li>
                  <li>Solidity 0.8.19+</li>
                  <li>OpenZeppelin libraries</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>POS Integration</h3>
              <div style={{ padding: "16px", backgroundColor: "#e0f2fe", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Customer Journey</h4>
                <ol style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Customer orders coffee</li>
                  <li>Pays with cash/card/crypto</li>
                  <li>Links wallet (30 seconds)</li>
                  <li>Tokens sent automatically</li>
                  <li>Confirmation received</li>
                </ol>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Backend Setup</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Node.js + Express</li>
                  <li>Square webhooks</li>
                  <li>PostgreSQL database</li>
                  <li>Alchemy/Infura connection</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Website & App</h3>
              <div style={{ padding: "16px", backgroundColor: "#faf5ff", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Essential Pages</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Homepage with hero</li>
                  <li>How it works</li>
                  <li>Tokenomics</li>
                  <li>Live stats dashboard</li>
                  <li>Presale page</li>
                </ul>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Tech Stack</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Next.js + React</li>
                  <li>Tailwind CSS</li>
                  <li>RainbowKit wallet</li>
                  <li>Vercel hosting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing */}
        <section id="marketing" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            📢 Part 4: Marketing & Community
          </h2>

          <div style={{ padding: "48px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
              <div>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Social Media Strategy</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                  <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>Instagram</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Visual lifestyle</div>
                    <div style={{ fontSize: "12px", color: "#3b82f6" }}>1x/day</div>
                  </div>
                  <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>TikTok</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Viral potential</div>
                    <div style={{ fontSize: "12px", color: "#3b82f6" }}>2-3x/day</div>
                  </div>
                  <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>Twitter</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Crypto community</div>
                    <div style={{ fontSize: "12px", color: "#3b82f6" }}>3-5x/day</div>
                  </div>
                  <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>Discord</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Community hub</div>
                    <div style={{ fontSize: "12px", color: "#3b82f6" }}>Always on</div>
                  </div>
                </div>

                <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px" }}>
                  <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Content Pillars</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: "#3b82f6" }}>40%</div>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>Education</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>30%</div>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>Behind-scenes</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: "#8b5cf6" }}>20%</div>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>Community</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#fed7aa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: "#ea580c" }}>10%</div>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>Announcements</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Community Building</h3>

                <div style={{ padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px", marginBottom: "16px" }}>
                  <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Discord Growth Goals</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Week 1-2</span>
                      <span style={{ fontWeight: "bold", color: "#111827" }}>100 members</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Week 3-4</span>
                      <span style={{ fontWeight: "bold", color: "#111827" }}>500 members</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Week 5-8</span>
                      <span style={{ fontWeight: "bold", color: "#111827" }}>1,500 members</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Week 9-12</span>
                      <span style={{ fontWeight: "bold", color: "#3b82f6" }}>3,000 members</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                  <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Community Events</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                    <li>Weekly coffee chats (voice)</li>
                    <li>Sunday planning sessions</li>
                    <li>Wednesday AMAs</li>
                    <li>Monthly in-person meetups</li>
                    <li>Token holder exclusive events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Strategy */}
        <section id="launch" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            🚀 Part 5: Launch Strategy
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>7-Day Pre-Launch Checklist</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                <div>
                  <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Operations</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Location fully set up</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Equipment tested (20 practice drinks)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Inventory stocked (2 weeks)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Staff trained (60 sec onboarding)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>POS system working perfectly</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Technology</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Smart contract on mainnet</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Website live and tested</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Token distribution working</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Backup plan ready</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563", cursor: "pointer" }}>
                      <input type="checkbox" />
                      <span>Analytics tracking setup</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Launch Day Schedule</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#4b5563" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ fontFamily: "monospace", color: "#3b82f6" }}>5:00 AM</span>
                    <span>Founder arrives, final prep</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ fontFamily: "monospace", color: "#3b82f6" }}>6:00 AM</span>
                    <span>Staff arrives, team huddle</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ fontFamily: "monospace", color: "#3b82f6" }}>6:30 AM</span>
                    <span>Pre-opening, start live stream</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ fontFamily: "monospace", color: "#3b82f6" }}>7:00 AM</span>
                    <span style={{ fontWeight: "600", color: "#111827" }}>GRAND OPENING 🎉</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Week 1 Goals</h3>

              <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Revenue</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Day 1</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$1,200+</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Days 2-5</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$600-900/day</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Weekend</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$1,000+/day</span>
                  </div>
                  <div style={{ padding: "8px 0", borderTop: "1px solid #e5e5e5", marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: "600" }}>Week Total</span>
                    <span style={{ fontWeight: "bold", color: "#3b82f6" }}>$6,000-7,000</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Community</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>200+ wallet holders</li>
                  <li>50+ repeat customers</li>
                  <li>1,000+ social followers</li>
                  <li>10+ testimonials</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Operations */}
        <section id="operations" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            ⚙️ Part 6: Operations
          </h2>

          <div style={{ padding: "48px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>Daily Operations Manual</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "32px" }}>
              <div style={{ padding: "24px", backgroundColor: "#e0f2fe", borderRadius: "12px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
                  📅 Opening (6:30 AM)
                </h4>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: "14px", color: "#4b5563" }}>
                  <li>☐ Unlock and lights on</li>
                  <li>☐ Turn on espresso machine</li>
                  <li>☐ Start music playlist</li>
                  <li>☐ Check inventory</li>
                  <li>☐ Test first shot</li>
                  <li>☐ Set up POS system</li>
                  <li>☐ Count cash drawer</li>
                  <li>☐ Post "We're open!"</li>
                </ul>
              </div>

              <div style={{ padding: "24px", backgroundColor: "#f0fdf4", borderRadius: "12px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
                  ☕ During Service
                </h4>
                <div style={{ fontSize: "14px", color: "#4b5563" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontWeight: "600", color: "#111827" }}>Peak Hours:</span>
                    <ul style={{ margin: "4px 0 0 20px", padding: 0 }}>
                      <li>2-3 min per order</li>
                      <li>Focus on speed</li>
                      <li>Maintain quality</li>
                    </ul>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600", color: "#111827" }}>Slow Hours:</span>
                    <ul style={{ margin: "4px 0 0 20px", padding: 0 }}>
                      <li>Deep cleaning</li>
                      <li>Content creation</li>
                      <li>Customer conversations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ padding: "24px", backgroundColor: "#faf5ff", borderRadius: "12px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
                  🔒 Closing (8:00 PM)
                </h4>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: "14px", color: "#4b5563" }}>
                  <li>☐ Last call announcement</li>
                  <li>☐ Clean espresso machine</li>
                  <li>☐ Empty grounds</li>
                  <li>☐ Wipe all surfaces</li>
                  <li>☐ Sweep and mop</li>
                  <li>☐ Count cash</li>
                  <li>☐ Update metrics</li>
                  <li>☐ Lock up</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "24px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
              <h4 style={{ fontWeight: "600", marginBottom: "16px", color: "#111827" }}>Weekly Metrics Dashboard</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
                <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Revenue</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6", margin: "4px 0" }}>$6,000+</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Daily sales</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Token Conversion</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6", margin: "4px 0" }}>60%+</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Wallets/customers</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Repeat Rate</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6", margin: "4px 0" }}>40%+</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Returning customers</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>NPS Score</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6", margin: "4px 0" }}>50+</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Customer satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scaling */}
        <section id="scaling" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            📈 Part 7: Scaling
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>90-Day Report Card</h3>

              <div style={{ padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Targets vs Actuals</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Revenue (3 months)</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$45,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Net Profit Margin</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>15%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Wallet Holders</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>300+</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Repeat Rate</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>2.7x</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Key Learnings</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#4b5563", fontSize: "14px" }}>
                  <li>Token holders visit 2.7x more often</li>
                  <li>Morning rush is make-or-break</li>
                  <li>Simple menu = happy customers</li>
                  <li>Word-of-mouth {'>'} paid ads</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: "32px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>Mini-Presale Strategy</h3>

              <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px", marginBottom: "16px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Presale 2.0</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Goal</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$150,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Token Price</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>$0.15</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Tokens for Sale</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>1,000,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Vesting</span>
                    <span style={{ fontWeight: "bold", color: "#111827" }}>6-month linear</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px", backgroundColor: "#e0f2fe", borderRadius: "8px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "8px", color: "#111827" }}>Use of Funds</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Permanent location</span>
                    <span style={{ fontWeight: "500" }}>$80k</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Equipment upgrade</span>
                    <span style={{ fontWeight: "500" }}>$30k</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Working capital</span>
                    <span style={{ fontWeight: "500" }}>$20k</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Marketing</span>
                    <span style={{ fontWeight: "500" }}>$15k</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Legal/compliance</span>
                    <span style={{ fontWeight: "500" }}>$5k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long-term Vision */}
        <section id="vision" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px", color: "#111827" }}>
            🌟 Part 8: Long-term Vision
          </h2>

          <div style={{ padding: "48px", backgroundColor: "#ffffff", border: "2px solid #e5e5e5", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>The 5-Year Plan</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              {[
                { year: "Year 1 (2025)", goals: ["Prove concept ✓", "Open permanent location", "List token", "500+ holders", "$300k revenue"], highlight: "Break even" },
                { year: "Year 2 (2026)", goals: ["3 company locations", "Launch franchise", "2,000+ holders", "$1M+ revenue"], highlight: "$200k+ profit" },
                { year: "Year 3 (2027)", goals: ["10 total locations", "3 countries", "10,000+ holders", "$5M+ revenue"], highlight: "Launch $NOW platform" },
                { year: "Year 4 (2028)", goals: ["25 locations", "Major exchange listing", "50,000+ holders", "$15M+ revenue"], highlight: "Global brand" },
                { year: "Year 5 (2029)", goals: ["50+ locations", "10+ countries", "200,000+ holders", "$50M+ revenue"], highlight: "IPO or exit" }
              ].map((item, i) => (
                <div key={i} style={{ position: "relative", paddingLeft: "32px" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#3b82f6" }}></div>
                  {i < 4 && <div style={{ position: "absolute", left: "7px", top: "16px", width: "2px", height: "100%", backgroundColor: "#e5e5e5" }}></div>}

                  <div style={{ padding: "24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e5e5" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "#111827" }}>{item.year}</h4>
                      <span style={{ padding: "4px 12px", backgroundColor: "#dbeafe", color: "#3b82f6", borderRadius: "16px", fontSize: "14px", fontWeight: "500" }}>
                        {item.highlight}
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                      {item.goals.map((goal, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4b5563" }}>
                          <span style={{ color: "#10b981" }}>✓</span>
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "32px", background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>The Bigger Vision: $NOW Platform</h3>
              <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "16px" }}>
                $COFFEE was proof. $NOW is the platform. Any business can tokenize.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>💵</div>
                  <h4 style={{ fontWeight: "600", fontSize: "14px", marginBottom: "4px", color: "#111827" }}>Revenue Model</h4>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#6b7280" }}>
                    <li>Setup: $5,000</li>
                    <li>Monthly: $500</li>
                    <li>Token sales: 2.5%</li>
                  </ul>
                </div>

                <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>👥</div>
                  <h4 style={{ fontWeight: "600", fontSize: "14px", marginBottom: "4px", color: "#111827" }}>Target Market</h4>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#6b7280" }}>
                    <li>Restaurants</li>
                    <li>Gyms</li>
                    <li>Retail stores</li>
                  </ul>
                </div>

                <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌍</div>
                  <h4 style={{ fontWeight: "600", fontSize: "14px", marginBottom: "4px", color: "#111827" }}>Impact</h4>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#6b7280" }}>
                    <li>Democratize ownership</li>
                    <li>Align incentives</li>
                    <li>Transparent economy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Words */}
        <section style={{ marginBottom: "80px" }}>
          <div style={{ padding: "48px", background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)", border: "2px solid #3b82f6", borderRadius: "16px", textAlign: "center" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>You Have Everything You Need</h2>

            <p style={{ fontSize: "18px", color: "#4b5563", maxWidth: "800px", margin: "0 auto 32px" }}>
              This document contains everything required to go from idea to successful tokenized coffee shop
              to potential $50M+ business. What happens next is up to you.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", maxWidth: "800px", margin: "0 auto 40px" }}>
              <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚀</div>
                <h4 style={{ fontWeight: "600", marginBottom: "4px", color: "#111827" }}>The Reality</h4>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>It will be harder than described, but it's doable</p>
              </div>

              <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎯</div>
                <h4 style={{ fontWeight: "600", marginBottom: "4px", color: "#111827" }}>The Truth</h4>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Your idea is sound, execution matters most</p>
              </div>

              <div style={{ padding: "16px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>☕</div>
                <h4 style={{ fontWeight: "600", marginBottom: "4px", color: "#111827" }}>Your Move</h4>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Close this doc, open "Week 1 Tasks", start executing</p>
              </div>
            </div>

            <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#111827" }}>
              Go make history.
            </div>

            <div style={{ fontSize: "48px" }}>
              🚀☕💎
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e5e5", padding: "48px 20px", textAlign: "center", color: "#6b7280" }}>
        <p>© 2025 $COFFEE. The world's first tokenized coffee shop.</p>
      </footer>
    </div>
  )
}
