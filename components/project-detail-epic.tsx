"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowLeft, MapPin, Calendar, TrendingUp, Users, Coins,
  Copy, Check, Wallet, Activity, Circle,
  CheckCircle2, DollarSign, ArrowUpRight,
  Building2, Target, Zap, AlertTriangle, BarChart3, Vote
} from "lucide-react"
import { Project, generateProjectIcon } from "@/lib/projects"
import { usePresale } from "@/hooks/use-presale"
import { useUnifiedWallet } from "@/hooks/use-unified-wallet"
import { WalletConnectButton } from "@/components/wallet-connect-button"

// Conditionally import Privy to avoid errors when not configured
let usePrivy: any = () => ({
  ready: true,
  authenticated: false,
  user: null,
  login: async () => {}
})

try {
  const privyModule = require('@privy-io/react-auth')
  if (privyModule.usePrivy) {
    usePrivy = privyModule.usePrivy
  }
} catch (e) {
  // Privy not available, use default
}

// Golden ratio for perfect proportions
const PHI = 1.618033988749895

// Smooth cubic bezier easing
const easeCubicInOut = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Advanced counter with smooth interpolation
function useAnimatedValue(targetValue: number, duration: number = 2000, initialValue: number = 0) {
  const [value, setValue] = useState(initialValue)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef<number>()
  const targetValueRef = useRef<number>(targetValue)

  // Update target ref when targetValue changes
  useEffect(() => {
    targetValueRef.current = targetValue
  }, [targetValue])

  const animate = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now()
      startValueRef.current = value
    }

    const elapsed = performance.now() - startTimeRef.current
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeCubicInOut(progress)

    const currentValue = startValueRef.current + (targetValueRef.current - startValueRef.current) * easedProgress
    setValue(currentValue)

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      startTimeRef.current = undefined
    }
  }, [duration, value])

  useEffect(() => {
    if (Math.abs(value - targetValue) > 0.01) {
      startTimeRef.current = undefined // Reset animation
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetValue, animate, value])

  return value
}

// Mouse parallax effect
function useMouseParallax(factor: number = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
      setOffset({ x: x * factor, y: y * factor })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [factor])
  
  return offset
}

interface ProjectDetailEpicProps {
  project: Project
  initialPresaleData?: any
}

export function ProjectDetailEpic({ project, initialPresaleData }: ProjectDetailEpicProps) {
  const [mounted, setMounted] = useState(false)
  const { data: presaleData, loading } = usePresale(project.id, project.presaleAddress)

  // Use initial data if available, otherwise use hook data
  const data = presaleData || initialPresaleData
  const [copied, setCopied] = useState(false)
  const [investAmount, setInvestAmount] = useState(1)
  const [selectedTab, setSelectedTab] = useState(0)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const { ready, authenticated, user, login } = usePrivy()
  const wallet = useUnifiedWallet()
  
  // Parallax effects
  const parallax = useMouseParallax(20)
  const subtleParallax = useMouseParallax(10)

  useEffect(() => {
    setMounted(true)
    // Pulse animation
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(project.presaleAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Real data with animations
  const actualRaised = data?.currentBalance?.totalUSD || data?.raised || 0
  const progressPercentage = actualRaised > 0 ? (actualRaised / project.fundingGoal) * 100 : 0
  const contributors = data?.contributors || 0

  // Debug logging
  useEffect(() => {
    if (data) {
      console.log('ProjectDetailEpic - Presale Data:', {
        raised: data.raised,
        currentBalance: data.currentBalance,
        actualRaised,
        fundingGoal: project.fundingGoal,
        progressPercentage,
        contributors
      })
    }
  }, [data, actualRaised, progressPercentage, contributors, project.fundingGoal])
  const tokensReceived = investAmount / project.price
  const daysLeft = Math.ceil((new Date('2025-01-01').getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const solBalance = data?.currentBalance?.sol || 0
  const usdcBalance = data?.currentBalance?.usdc || 0
  
  // Animated values with golden ratio timing
  const animatedRaised = useAnimatedValue(actualRaised, 2000 * PHI, 0)
  const animatedProgress = useAnimatedValue(progressPercentage, 2500 * PHI, 0)
  const animatedContributors = useAnimatedValue(contributors, 1500 * PHI, 0)

  // Log animated values when they change
  useEffect(() => {
    console.log('Animated values:', {
      animatedRaised,
      animatedProgress,
      animatedContributors,
      actualRaised,
      progressPercentage
    })
  }, [animatedRaised, animatedProgress, animatedContributors, actualRaised, progressPercentage])

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* EPIC Background with depth */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/paper-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92" />
        
        {/* Dynamic grid that responds to mouse */}
        <div 
          className="absolute inset-0 opacity-[0.03] transition-transform duration-300"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, black 0px, transparent 1px, transparent 40px, black 41px), repeating-linear-gradient(90deg, black 0px, transparent 1px, transparent 40px, black 41px)',
            transform: `translate(${parallax.x}px, ${parallax.y}px)`
          }}
        />
        
        {/* Subtle accent orbs with parallax */}
        <div 
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#DC143C]/[0.02] to-transparent blur-3xl transition-transform duration-700"
          style={{
            transform: `translate(${subtleParallax.x * 2}px, ${subtleParallax.y * 2}px)`,
            opacity: 0.02 + pulseIntensity * 0.0001
          }}
        />
      </div>

      {/* EPIC Split Layout */}
      <div className="flex h-screen relative z-10">
        
        {/* LEFT PANEL - EPIC Investment */}
        <div className="w-[460px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r-8 border-black overflow-hidden">
          
          {/* Dynamic Header */}
          <div className="p-6 border-b-4 border-black relative">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
            />
            
            <Link href="/explorer" className="relative inline-flex items-center gap-2 text-black hover:text-[#DC143C] transition-all font-black uppercase text-xs tracking-wider mb-6 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
              BACK TO EXPLORER
            </Link>
            
            {/* Epic Stats with hover effects */}
            <div className="relative space-y-4">
              <div 
                onMouseEnter={() => setHoveredStat('raised')}
                onMouseLeave={() => setHoveredStat(null)}
                className="relative"
              >
                <div className={`text-6xl font-black transition-all duration-300 ${
                  hoveredStat === 'raised' ? 'scale-105 text-[#DC143C]' : ''
                }`}>
                  {loading && !data ? (
                    <span className="text-black/30">LOADING</span>
                  ) : (
                    <span>${Math.floor((actualRaised || 0) / 1000)}K</span>
                  )}
                </div>
                <div className="text-xs font-black uppercase text-black/60 mt-2 tracking-wider">
                  OF ${project.fundingGoal / 1000}K TARGET
                </div>
                
                {/* Live indicator */}
                <div className="absolute -right-4 top-0 flex items-center gap-2">
                  <Circle 
                    className="w-2 h-2 text-[#DC143C] animate-pulse" 
                    fill="currentColor"
                    style={{ animationDuration: `${2 / PHI}s` }}
                  />
                  <span className="text-[8px] font-black uppercase tracking-wider text-[#DC143C]">LIVE</span>
                </div>
              </div>
              
              {/* Epic Progress Bar */}
              <div className="space-y-2">
                <div className="h-6 bg-black/5 border-3 border-black relative overflow-hidden group">
                  <div
                    className="h-full bg-gradient-to-r from-[#DC143C] to-[#FF0000] transition-all duration-1000 relative"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  >
                    {/* Animated shimmer effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{
                        transform: `translateX(${pulseIntensity - 100}%)`,
                        transition: 'none'
                      }}
                    />
                  </div>
                  
                  {/* Percentage overlay */}
                  {progressPercentage > 5 && (
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-[10px] font-black text-white mix-blend-difference">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Stats row with hover effects */}
                <div className="flex justify-between text-xs font-black uppercase">
                  <span
                    className="hover:text-[#DC143C] transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredStat('funded')}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    {progressPercentage.toFixed(0)}% FUNDED
                  </span>
                  <span
                    className="hover:text-[#DC143C] transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredStat('backers')}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    {contributors} BACKERS
                  </span>
                  <span className="hover:text-[#DC143C] transition-colors cursor-pointer">
                    {daysLeft} DAYS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EPIC Investment Section with scroll */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/20">
            
            {/* Connected Status - Animated */}
            {wallet.connected && wallet.address && (
              <div className="mb-6 p-4 bg-gradient-to-r from-black to-[#1a1a1a] text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider">CONNECTED</span>
                  </div>
                  <span className="text-xs font-mono">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                </div>
              </div>
            )}
            
            {/* EPIC Input with visual feedback */}
            <div className="space-y-4 mb-8">
              <label className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                INVESTMENT AMOUNT 
                <span className="text-[#DC143C]">(SOL)</span>
              </label>
              <div className="border-4 border-black bg-white relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/0 to-[#DC143C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(parseFloat(e.target.value) || 0)}
                  className="relative w-full px-4 py-5 text-4xl font-black focus:outline-none text-center bg-transparent"
                />
              </div>
              
              {/* EPIC Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[0.5, 1, 5, 10].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setInvestAmount(amt)}
                    className={`relative py-3 text-sm font-black border-3 border-black transition-all overflow-hidden group ${
                      investAmount === amt ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{amt}</span>
                    {investAmount === amt && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C] to-[#FF0000] opacity-20" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* EPIC Returns Box with depth */}
            <div className="relative mb-8">
              {/* Shadow layers for depth */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black/20" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black/10" />
              
              <div className="relative border-4 border-black bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white p-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider mb-2 opacity-90">
                      YOU WILL RECEIVE
                    </div>
                    <div className="text-4xl font-black flex items-baseline gap-2">
                      {tokensReceived.toLocaleString()}
                      <span className="text-lg opacity-80">{project.symbol}</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/30" />
                  
                  {/* Detailed metrics grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group cursor-pointer">
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                        OWNERSHIP
                      </div>
                      <div className="font-black text-lg group-hover:scale-105 transition-transform origin-left">
                        {((tokensReceived / 100000000) * 100).toFixed(4)}%
                      </div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                        REVENUE SHARE
                      </div>
                      <div className="font-black text-lg group-hover:scale-105 transition-transform origin-left">
                        {project.revenueShare}%
                      </div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                        EST. APY
                      </div>
                      <div className="font-black text-lg group-hover:scale-105 transition-transform origin-left text-green-300">
                        +{project.apy}%
                      </div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                        USD VALUE
                      </div>
                      <div className="font-black text-lg group-hover:scale-105 transition-transform origin-left">
                        ${(investAmount * 140).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/20" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/20" />
              </div>
            </div>

            {/* EPIC CTA with multiple states */}
            {wallet.connected ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C] to-[#FF0000] blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <Button 
                  className="relative w-full h-14 bg-gradient-to-r from-black to-[#1a1a1a] hover:from-[#DC143C] hover:to-[#8B0000] text-white font-black uppercase tracking-wider border-4 border-black transition-all group overflow-hidden"
                  onClick={() => {
                    console.log(`Investing ${investAmount} SOL`)
                    alert(`Investment of ${investAmount} SOL initiated!`)
                  }}
                  disabled={investAmount <= 0 || loading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    INVEST {investAmount} SOL NOW
                  </span>
                  
                  {/* Animated background */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    style={{
                      transform: `translateX(${pulseIntensity - 100}%)`,
                      transition: 'none'
                    }}
                  />
                </Button>
              </div>
            ) : (
              <WalletConnectButton 
                variant="brutalist"
                className="w-full h-14 text-base justify-center"
              />
            )}

            {/* Contract with copy animation */}
            <button
              onClick={copyAddress}
              className="w-full mt-4 py-3 border-2 border-black hover:bg-black hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {project.presaleAddress.slice(0, 8)}...{project.presaleAddress.slice(-6)}
              </span>
              <div 
                className={`absolute inset-0 bg-green-500 transition-transform duration-300 ${
                  copied ? 'translate-y-0' : 'translate-y-full'
                }`}
              />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL - EPIC Content */}
        <div className="flex-1 ml-[460px] overflow-y-auto">
          
          {/* EPIC Header */}
          <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-b-4 border-black">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="group">
                  <span className="text-3xl font-black font-serif uppercase tracking-wider transition-all group-hover:text-[#DC143C] group-hover:tracking-[0.3em]">
                    REBIRTH
                  </span>
                </Link>
                <div className="flex items-center gap-8">
                  <WalletConnectButton variant="brutalist" />
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-5xl mx-auto">
            
            {/* EPIC Project Header */}
            <div className="mb-12">
              <div className="flex items-start gap-8 mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                  <div className="relative w-24 h-24 border-4 border-black bg-white p-3 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                    {mounted && (
                      <img
                        src={generateProjectIcon(project.symbol)}
                        alt={project.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-6xl font-black uppercase mb-3 tracking-tight hover:tracking-wide transition-all">
                    {project.name}
                  </h1>
                  <p className="text-black/80 text-lg mb-4 leading-relaxed max-w-3xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-2 bg-black text-white text-xs font-black uppercase hover:bg-[#DC143C] transition-colors">
                      {project.symbol}
                    </span>
                    <span className="px-4 py-2 border-2 border-black text-xs font-black uppercase hover:bg-black hover:text-white transition-all">
                      {project.category}
                    </span>
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </span>
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {project.opening}
                    </span>
                  </div>
                </div>
              </div>

              {/* EPIC Live Stats Grid */}
              {data?.currentBalance && (
                <div className="relative">
                  <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                  <div className="relative grid grid-cols-4 gap-0 border-4 border-black bg-white">
                    <div className="p-6 border-r-2 border-black hover:bg-black hover:text-white transition-all group">
                      <div className="text-xs font-black uppercase tracking-wider text-black/60 group-hover:text-white/80 mb-2">
                        SOL BALANCE
                      </div>
                      <div className="text-3xl font-black">{solBalance.toFixed(2)}</div>
                      <div className="text-xs font-black uppercase mt-1">
                        ≈ ${(solBalance * 140).toFixed(0)}
                      </div>
                    </div>
                    <div className="p-6 border-r-2 border-black hover:bg-black hover:text-white transition-all group">
                      <div className="text-xs font-black uppercase tracking-wider text-black/60 group-hover:text-white/80 mb-2">
                        USDC
                      </div>
                      <div className="text-3xl font-black">{(usdcBalance / 1000).toFixed(1)}K</div>
                      <div className="text-xs font-black uppercase mt-1">
                        ${usdcBalance.toFixed(0)}
                      </div>
                    </div>
                    <div className="p-6 border-r-2 border-black hover:bg-black hover:text-white transition-all group">
                      <div className="text-xs font-black uppercase tracking-wider text-black/60 group-hover:text-white/80 mb-2">
                        CONTRIBUTORS
                      </div>
                      <div className="text-3xl font-black">{contributors}</div>
                      <div className="text-xs font-black uppercase mt-1">
                        UNIQUE
                      </div>
                    </div>
                    <div className="p-6 bg-[#DC143C] text-white">
                      <div className="text-xs font-black uppercase tracking-wider text-white/80 mb-2">
                        TOTAL RAISED
                      </div>
                      <div className="text-3xl font-black">${(actualRaised / 1000).toFixed(0)}K</div>
                      <div className="text-xs font-black uppercase mt-1 flex items-center gap-1">
                        <Circle className="w-2 h-2 animate-pulse" fill="currentColor" />
                        LIVE
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* EPIC Tabs with indicator + Governance Link */}
            <div className="relative mb-8">
              <div className="flex gap-0 border-b-4 border-black justify-between">
                <div className="flex gap-0">
                  {['OVERVIEW', 'TOKENOMICS', 'ROADMAP'].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(index)}
                      className={`relative px-8 py-4 font-black text-sm uppercase tracking-wider transition-all ${
                        selectedTab === index 
                          ? 'bg-black text-white' 
                          : 'bg-white hover:bg-black/5 border-r-2 border-black last:border-r-0'
                      }`}
                    >
                      {tab}
                      {selectedTab === index && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC143C]" />
                      )}
                    </button>
                  ))}
                </div>
                <Link
                  href={`/explorer/${project.id}/voting`}
                  className="px-8 py-4 bg-[#DC143C] hover:bg-black text-white font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Vote className="w-4 h-4" />
                  GOVERNANCE
                </Link>
              </div>
            </div>

            {/* EPIC Tab Content */}
            <div className="space-y-8">
              {selectedTab === 0 && (
                <>
                  {/* EPIC Features Grid */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                    <div className="relative border-4 border-black bg-white p-8">
                      <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8" />
                        WHAT YOU GET
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {project.features.map((feature, index) => (
                          <div 
                            key={index} 
                            className="group relative flex items-start gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-all"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/0 to-[#DC143C]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CheckCircle2 className="relative w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="relative text-sm font-bold">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* EPIC Value Props */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: 'REVENUE SHARE', value: `${project.revenueShare}%`, icon: <DollarSign /> },
                      { label: 'EST. APY', value: `${project.apy}%`, icon: <TrendingUp /> },
                      { label: 'COMMITMENT', value: '5YR', icon: <Target /> }
                    ].map((item, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-black transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                        <div className="relative border-4 border-black bg-white p-6 text-center hover:bg-[#DC143C] hover:text-white transition-all">
                          <div className="flex justify-center mb-3">
                            {React.cloneElement(item.icon, { className: 'w-8 h-8' })}
                          </div>
                          <div className="text-4xl font-black mb-2">{item.value}</div>
                          <div className="text-xs font-black uppercase tracking-wider">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedTab === 1 && (
                <>
                  {/* EPIC Tokenomics */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                    <div className="relative border-4 border-black bg-white p-8">
                      <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8" />
                        TOKEN DISTRIBUTION
                      </h2>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                          {[
                            { label: 'PRESALE', value: project.tokenomics.presale, color: '#DC143C' },
                            { label: 'LIQUIDITY', value: project.tokenomics.liquidity, color: '#000000' },
                            { label: 'TREASURY', value: project.tokenomics.treasury, color: '#333333' },
                            { label: 'TEAM', value: project.tokenomics.team, color: '#666666' }
                          ].map((item, index) => (
                            <div key={index} className="group">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-black uppercase group-hover:text-[#DC143C] transition-colors">
                                  {item.label}
                                </span>
                                <span className="text-3xl font-black">{item.value}%</span>
                              </div>
                              <div className="h-8 bg-black/5 border-2 border-black relative overflow-hidden">
                                <div 
                                  className="h-full transition-all duration-1000"
                                  style={{ 
                                    backgroundColor: item.color,
                                    width: mounted ? `${item.value}%` : '0%',
                                    transitionDelay: `${index * 200}ms`
                                  }}
                                >
                                  {/* Animated fill effect */}
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    style={{
                                      transform: `translateX(${pulseIntensity - 100}%)`,
                                      transition: 'none'
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* EPIC Metrics */}
                        <div className="space-y-4">
                          <div className="border-3 border-black p-6 hover:bg-black hover:text-white transition-all group">
                            <h3 className="font-black uppercase mb-4 group-hover:text-[#DC143C]">SUPPLY</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="font-black uppercase">TOTAL</span>
                                <span className="font-black">100,000,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-black uppercase">PRICE</span>
                                <span className="font-black">${project.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-black uppercase">MCAP</span>
                                <span className="font-black">${(project.price * 100000000 / 1000000).toFixed(1)}M</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-4 border-[#DC143C] bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white p-6">
                            <h3 className="font-black uppercase mb-4">YOUR INVESTMENT</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>{investAmount} SOL</span>
                                <span className="font-black">${(investAmount * 140).toFixed(0)} USD</span>
                              </div>
                              <div className="flex justify-between">
                                <span>TOKENS</span>
                                <span className="font-black">{tokensReceived.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>OWNERSHIP</span>
                                <span className="font-black">{((tokensReceived / 100000000) * 100).toFixed(4)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedTab === 2 && (
                <>
                  {/* EPIC Roadmap */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" />
                    <div className="relative border-4 border-black bg-white p-8">
                      <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                        <Target className="w-8 h-8" />
                        ROADMAP
                      </h2>
                      <div className="space-y-0">
                        {[
                          { 
                            date: 'Q4 2024', 
                            title: 'TOKEN PRESALE', 
                            progress: progressPercentage, 
                            active: true,
                            tasks: ['LAUNCH', `RAISE $${project.fundingGoal.toLocaleString()}`, 'BUILD COMMUNITY'],
                            color: '#DC143C'
                          },
                          { 
                            date: 'Q1 2025', 
                            title: 'DEX LAUNCH', 
                            progress: 0, 
                            active: false,
                            tasks: ['RAYDIUM', 'LIQUIDITY', 'TRADING'],
                            color: '#000000'
                          },
                          { 
                            date: 'Q2 2025', 
                            title: 'CONSTRUCTION', 
                            progress: 0, 
                            active: false,
                            tasks: ['LOCATION', 'BUILD', 'TEAM'],
                            color: '#333333'
                          },
                          { 
                            date: 'Q3 2025', 
                            title: 'GRAND OPENING', 
                            progress: 0, 
                            active: false,
                            tasks: ['LAUNCH', 'REVENUE', 'DISTRIBUTIONS'],
                            color: '#666666'
                          }
                        ].map((milestone, index) => (
                          <div key={index} className={`border-b-4 border-black last:border-b-0 ${!milestone.active && 'opacity-50'}`}>
                            <div className="flex">
                              {/* Epic Number */}
                              <div 
                                className={`relative w-24 p-6 border-r-4 border-black flex items-center justify-center font-black text-3xl overflow-hidden ${
                                  milestone.active ? 'bg-[#DC143C] text-white' : 'bg-black/5'
                                }`}
                              >
                                {milestone.active && (
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    style={{
                                      transform: `translateX(${pulseIntensity - 100}%)`,
                                      transition: 'none'
                                    }}
                                  />
                                )}
                                <span className="relative">{index + 1}</span>
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <h3 className="font-black text-2xl uppercase">{milestone.title}</h3>
                                    <div className="text-xs font-black uppercase text-black/60 mt-1">
                                      {milestone.date}
                                    </div>
                                  </div>
                                  {milestone.active && (
                                    <span className="px-4 py-2 bg-black text-white text-xs font-black uppercase flex items-center gap-2">
                                      <Circle className="w-2 h-2 animate-pulse" fill="currentColor" />
                                      ACTIVE
                                    </span>
                                  )}
                                </div>
                                
                                {/* Tasks */}
                                <div className="flex gap-4 mb-4">
                                  {milestone.tasks.map((task, i) => (
                                    <span 
                                      key={i} 
                                      className={`px-3 py-1 text-xs font-black uppercase border-2 ${
                                        milestone.active 
                                          ? 'border-black bg-black/5' 
                                          : 'border-black/30'
                                      }`}
                                    >
                                      {task}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Epic Progress */}
                                {milestone.active && (
                                  <div className="relative">
                                    <div className="h-6 bg-black/5 border-3 border-black">
                                      <div 
                                        className="h-full bg-gradient-to-r from-[#DC143C] to-[#FF0000] transition-all duration-1000 relative"
                                        style={{ width: `${milestone.progress}%` }}
                                      >
                                        <div 
                                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                          style={{
                                            transform: `translateX(${pulseIntensity - 100}%)`,
                                            transition: 'none'
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-white mix-blend-difference">
                                      {milestone.progress.toFixed(0)}%
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
