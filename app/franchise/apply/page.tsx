"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Store, MapPin, DollarSign, Users, FileText, CheckCircle2, Upload, AlertCircle, Coins, Shield, Building2, Target, TrendingUp, Calendar, Briefcase, ChevronDown, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

export default function ProjectProposalPage() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const searchParams = useSearchParams()
  const parentProject = searchParams.get('parent') // e.g., "COFFEE" for franchises
  const isFranchise = !!parentProject
  
  const [formData, setFormData] = useState({
    // Step 1: Business Basics
    projectName: "",
    projectSymbol: "",
    category: "",
    description: "",
    
    // Step 2: Location & Details
    city: "",
    country: "",
    targetMarket: "",
    openingTimeline: "",
    
    // Step 3: Tokenomics
    fundingTarget: "",
    tokenPrice: "0.15",
    revenueShare: "33",
    minInvestment: "100",
    
    
    // Step 4: Business Plan
    founderExperience: "",
    marketAnalysis: "",
    competitiveAdvantage: "",
    profitProjections: "",
    
    // Step 5: Contact Info
    founderName: "",
    email: "",
    walletAddress: "",
    socialLinks: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    // Check system theme
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  if (!mounted) return null

  const steps = [
    {
      title: "Business Basics",
      description: "Tell us about your project idea",
      icon: Building2
    },
    {
      title: "Location & Market",
      description: "Where and when will you launch?",
      icon: MapPin
    },
    {
      title: "Tokenomics",
      description: "How will funding and profit sharing work?",
      icon: Coins
    },
    {
      title: "Business Plan",
      description: "Your strategy and projections",
      icon: Target
    },
    {
      title: "Review & Submit",
      description: "Final review before community voting",
      icon: CheckCircle2
    }
  ]

  const categories = [
    "Coffee Shop",
    "Restaurant",
    "Retail Store",
    "Supermarket",
    "Fashion Boutique",
    "Service Business",
    "Entertainment Venue",
    "Health & Wellness",
    "Technology",
    "Other"
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.projectName) newErrors.projectName = isFranchise ? "Franchise name required" : "Project name required"
      if (!formData.projectSymbol) newErrors.projectSymbol = "Token symbol required"
      if (!isFranchise && !formData.category) newErrors.category = "Category required"
      if (!formData.description) newErrors.description = "Description required"
    }

    if (step === 1) {
      if (!formData.city) newErrors.city = "City required"
      if (!formData.country) newErrors.country = "Country required"
      if (!formData.targetMarket) newErrors.targetMarket = "Target market required"
      if (!formData.openingTimeline) newErrors.openingTimeline = "Timeline required"
    }

    if (step === 2) {
      if (!formData.fundingTarget) newErrors.fundingTarget = "Funding target required"
      if (!formData.revenueShare) newErrors.revenueShare = "Revenue share required"
    }

    if (step === 3) {
      if (!formData.founderExperience) newErrors.founderExperience = "Experience required"
      if (!formData.marketAnalysis) newErrors.marketAnalysis = "Market analysis required"
    }

    if (step === 4) {
      if (!formData.founderName) newErrors.founderName = "Name required"
      if (!formData.email) newErrors.email = "Email required"
      if (!formData.walletAddress) newErrors.walletAddress = "Wallet address required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Submitting proposal:", formData)
      // Add submission logic
      alert("Proposal submitted for community review!")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
              <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold">{isFranchise ? 'Franchise Name' : 'Project Name'} *</label>
                <Input
                  placeholder={isFranchise ? `e.g., ${parentProject} Manhattan` : "e.g., Downtown Coffee House"}
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className={`h-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors`}
                />
                {errors.projectName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectName}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Token Symbol *</label>
                <div className="relative">
                  <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>$</span>
                  <Input
                    placeholder={isFranchise ? `${parentProject}-NYC` : "COFFEE"}
                    value={formData.projectSymbol}
                    onChange={(e) => setFormData({ ...formData, projectSymbol: e.target.value.toUpperCase() })}
                    className={`h-12 pl-8 rounded-xl border-2 ${
                      isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                    } focus:border-emerald-500 transition-colors uppercase`}
                    maxLength={15}
                  />
                </div>
                {errors.projectSymbol && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectSymbol}
                  </p>
                )}
              </div>
            </div>

            {!isFranchise ? (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Category *</label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full h-12 px-4 pr-10 rounded-xl border-2 appearance-none cursor-pointer ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-700 text-white' 
                        : 'bg-white/50 border-gray-200 text-gray-900'
                    } focus:border-emerald-500 transition-colors`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.category}
                  </p>
                )}
              </div>
            ) : (
              <div className={`p-4 rounded-xl ${
                isDark ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
              }`}>
                <p className={`text-xs ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                } font-medium mb-1`}>
                  FRANCHISE BENEFITS
                </p>
                <ul className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } space-y-1`}>
                  <li>• Use {parentProject} brand and operations</li>
                  <li>• 10% of profits go to parent token holders</li>
                  <li>• Access to proven business model</li>
                  <li>• Support from global community</li>
                </ul>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-semibold">{isFranchise ? 'Franchise Description' : 'Project Description'} *</label>
              <Textarea
                placeholder={isFranchise 
                  ? `Why this location is perfect for ${parentProject}, local market opportunity, your unique approach...`
                  : "Describe your business idea, what makes it special, and how it will generate revenue..."}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`min-h-[150px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
                maxLength={500}
              />
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {formData.description.length}/500 characters
              </p>
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.description}
                </p>
              )}
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold">City *</label>
                <Input
                  placeholder="e.g., Beirut"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`h-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors`}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Country *</label>
                <Input
                  placeholder="e.g., Lebanon"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={`h-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors`}
                />
                {errors.country && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Target Market *</label>
              <Textarea
                placeholder="Describe your target customers, demographics, and why this location is strategic..."
                value={formData.targetMarket}
                onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                className={`min-h-[120px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
              {errors.targetMarket && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.targetMarket}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Expected Opening *</label>
              <Input
                placeholder="e.g., Q4 2025"
                value={formData.openingTimeline}
                onChange={(e) => setFormData({ ...formData, openingTimeline: e.target.value })}
                className={`h-12 rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                When do you expect to open for business?
              </p>
              {errors.openingTimeline && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.openingTimeline}
                </p>
              )}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <label className="text-sm font-semibold">Funding Target (USD) *</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="number"
                  placeholder="100000"
                  value={formData.fundingTarget}
                  onChange={(e) => setFormData({ ...formData, fundingTarget: e.target.value })}
                  className={`h-12 pl-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors`}
                />
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                How much capital do you need to launch?
              </p>
              {errors.fundingTarget && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fundingTarget}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold">Token Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.tokenPrice}
                    onChange={(e) => setFormData({ ...formData, tokenPrice: e.target.value })}
                    className={`h-12 pl-12 rounded-xl border-2 ${
                      isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                    } focus:border-emerald-500 transition-colors`}
                  />
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Presale price per token
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Min Investment (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="number"
                    value={formData.minInvestment}
                    onChange={(e) => setFormData({ ...formData, minInvestment: e.target.value })}
                    className={`h-12 pl-12 rounded-xl border-2 ${
                      isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                    } focus:border-emerald-500 transition-colors`}
                  />
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Minimum per investor
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Profit Share Percentage *</label>
              <div className="relative">
                <Input
                  type="number"
                  min="10"
                  max="50"
                  value={formData.revenueShare}
                  onChange={(e) => setFormData({ ...formData, revenueShare: e.target.value })}
                  className={`h-12 pr-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                What percentage of profits will be distributed to token holders?
              </p>
              {errors.revenueShare && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.revenueShare}
                </p>
              )}
            </div>

            {/* Token Distribution Preview */}
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-50'
            } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className="font-semibold mb-3">Standard Token Distribution</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Presale (Community)</span>
                  <span className="font-mono">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>DEX Liquidity</span>
                  <span className="font-mono">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Rewards & Marketing</span>
                  <span className="font-mono">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Treasury</span>
                  <span className="font-mono">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Team (24mo vesting)</span>
                  <span className="font-mono">5%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <label className="text-sm font-semibold">Your Experience *</label>
              <Textarea
                placeholder="Tell us about your background, relevant experience, and why you're the right person to run this business..."
                value={formData.founderExperience}
                onChange={(e) => setFormData({ ...formData, founderExperience: e.target.value })}
                className={`min-h-[120px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
              {errors.founderExperience && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.founderExperience}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Market Analysis *</label>
              <Textarea
                placeholder="Competition analysis, market opportunity, customer demand, and growth potential..."
                value={formData.marketAnalysis}
                onChange={(e) => setFormData({ ...formData, marketAnalysis: e.target.value })}
                className={`min-h-[120px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
              {errors.marketAnalysis && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.marketAnalysis}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Competitive Advantage</label>
              <Textarea
                placeholder="What makes your business unique? Special partnerships, location advantages, unique offerings..."
                value={formData.competitiveAdvantage}
                onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                className={`min-h-[120px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Profit Projections</label>
              <Textarea
                placeholder="Expected monthly revenue, costs, and profit margins. When do you expect to break even?"
                value={formData.profitProjections}
                onChange={(e) => setFormData({ ...formData, profitProjections: e.target.value })}
                className={`min-h-[120px] rounded-xl border-2 ${
                  isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                } focus:border-emerald-500 transition-colors`}
              />
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-semibold">Your Name *</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className={`h-12 rounded-xl border-2 ${
                      isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                    } focus:border-emerald-500 transition-colors`}
                  />
                  {errors.founderName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.founderName}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Email *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`h-12 rounded-xl border-2 ${
                      isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                    } focus:border-emerald-500 transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Wallet Address *</label>
                <Input
                  placeholder="Your Solana wallet address"
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  className={`h-12 rounded-xl border-2 ${
                    isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
                  } focus:border-emerald-500 transition-colors font-mono text-sm`}
                />
                {errors.walletAddress && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.walletAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Review Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold">{isFranchise ? 'Franchise' : 'Proposal'} Summary</h3>
              
              <div className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
              } border space-y-3`}>
                {isFranchise && (
                  <div className={`px-3 py-2 -m-2 mb-2 rounded-lg ${
                    isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>
                      ${parentProject} FRANCHISE APPLICATION
                    </p>
                  </div>
                )}
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>
                    {isFranchise ? 'Franchise' : 'Project'}
                  </p>
                  <p className="font-semibold text-lg">{formData.projectName || "—"}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ${formData.projectSymbol || "—"} {!isFranchise && `• ${formData.category || "—"}`}
                  </p>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Location</p>
                    <p className="font-semibold">{formData.city || "—"}, {formData.country || "—"}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Opening</p>
                    <p className="font-semibold">{formData.openingTimeline || "—"}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Funding Target</p>
                    <p className="font-semibold text-lg text-emerald-500">
                      ${formData.fundingTarget ? parseInt(formData.fundingTarget).toLocaleString() : "0"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Profit Share</p>
                    <p className="font-semibold text-lg text-emerald-500">
                      {formData.revenueShare}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            } border`}>
              <h4 className="font-semibold mb-3 text-emerald-900 dark:text-emerald-400">
                What Happens Next?
              </h4>
              <div className="space-y-2">
                {(isFranchise ? [
                  `Your franchise proposal goes to ${parentProject} token holders for voting`,
                  "7-day voting period with 60% approval required",
                  "If approved, you can launch your franchise presale",
                  `10% of franchise profits flow back to ${parentProject} holders`,
                ] : [
                  "Your proposal is reviewed by the team (24-48 hours)",
                  "If approved, it's posted for community discussion",
                  "Community members can ask questions and provide feedback",
                  "After discussion, you can launch your presale",
                ]).map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className={`text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${
        isDark ? 'bg-gray-900/90' : 'bg-white/90'
      } backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/explorer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Explorer
            </Link>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {isFranchise ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-8 h-8 text-emerald-500" />
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium">
                  ${parentProject} Franchise Application
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                Open a {parentProject} Franchise
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Expand the {parentProject} network with community backing
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                Launch Your Project
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Submit your business idea for community funding
              </p>
            </>
          )}
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i === currentStep
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : i < currentStep
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400'
                      : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-medium text-center hidden sm:block ${
                    i === currentStep 
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-all duration-300 ${
                    i < currentStep ? 'bg-emerald-500' : isDark ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className={`border-2 ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 sm:p-8">
              {/* Step Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl ${
                    isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  } flex items-center justify-center`}>
                    {(() => {
                      const Icon = steps[currentStep].icon
                      return <Icon className="w-5 h-5 text-emerald-500" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold">
                      {steps[currentStep].title}
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="h-12 px-6 rounded-xl border-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}

                <div className="flex-1" />

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    className="h-12 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  >
                    Submit Proposal
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}