"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Store, MapPin, DollarSign, Users, FileText, CheckCircle2, Upload, AlertCircle, Coins, Shield, Building2, Target, TrendingUp, Calendar, Briefcase, ChevronDown, Globe, Rocket, Zap } from "lucide-react"
import React, { Suspense, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

export default function ProjectProposalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <ProjectProposalPageContent />
    </Suspense>
  )
}

function ProjectProposalPageContent() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const searchParams = useSearchParams()
  const parentProject = searchParams.get('parent')
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
  }, [])

  if (!mounted) return null

  const steps = [
    {
      title: "BUSINESS BASICS",
      description: "TELL US ABOUT YOUR PROJECT",
      icon: Building2
    },
    {
      title: "LOCATION & MARKET",
      description: "WHERE AND WHEN?",
      icon: MapPin
    },
    {
      title: "TOKENOMICS",
      description: "FUNDING & PROFIT SHARING",
      icon: Coins
    },
    {
      title: "BUSINESS PLAN",
      description: "STRATEGY & PROJECTIONS",
      icon: Target
    },
    {
      title: "REVIEW & SUBMIT",
      description: "FINAL REVIEW",
      icon: CheckCircle2
    }
  ]

  const categories = [
    "COFFEE SHOP",
    "RESTAURANT",
    "RETAIL STORE",
    "SUPERMARKET",
    "FASHION BOUTIQUE",
    "SERVICE BUSINESS",
    "ENTERTAINMENT VENUE",
    "HEALTH & WELLNESS",
    "OTHER"
  ]

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    switch(currentStep) {
      case 0:
        if (!formData.projectName) newErrors.projectName = "Required"
        if (!formData.projectSymbol) newErrors.projectSymbol = "Required"
        if (!formData.category) newErrors.category = "Required"
        if (!formData.description) newErrors.description = "Required"
        break
      case 1:
        if (!formData.city) newErrors.city = "Required"
        if (!formData.country) newErrors.country = "Required"
        if (!formData.targetMarket) newErrors.targetMarket = "Required"
        if (!formData.openingTimeline) newErrors.openingTimeline = "Required"
        break
      case 2:
        if (!formData.fundingTarget) newErrors.fundingTarget = "Required"
        break
      case 3:
        if (!formData.founderExperience) newErrors.founderExperience = "Required"
        if (!formData.marketAnalysis) newErrors.marketAnalysis = "Required"
        if (!formData.profitProjections) newErrors.profitProjections = "Required"
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleSubmit = async () => {
    console.log("Submitting proposal:", formData)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/paper-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#F5F3F0]/92 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 bg-black border-b-4 border-[#DC143C] z-50">
          <div className="h-16 px-6 flex items-center justify-between">
            <Link href="/franchise">
              <Button className="group border-4 border-white bg-black text-white hover:bg-white hover:text-black transition-all font-black uppercase tracking-wider">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                BACK
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#DC143C] rounded-full animate-pulse" />
              <span className="text-[#DC143C] font-black uppercase tracking-[0.3em]">
                {isFranchise ? `${parentProject} FRANCHISE APPLICATION` : 'NEW PROJECT PROPOSAL'}
              </span>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16" />

        {/* Hero Section */}
        <section className="bg-[#DC143C] border-b-4 border-black py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#DC143C] font-black text-xs tracking-[0.3em] uppercase mb-6">
                <Store className="w-4 h-4" />
                {isFranchise ? 'FRANCHISE APPLICATION' : 'PROJECT PROPOSAL'}
              </div>
              <h1 className="text-5xl md:text-6xl font-black font-serif text-white uppercase tracking-tight mb-4">
                {isFranchise ? `OPEN A ${parentProject} FRANCHISE` : 'LAUNCH YOUR PROJECT'}
              </h1>
              <p className="text-xl text-white font-bold uppercase tracking-wider">
                Join the community-owned business revolution
              </p>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="bg-black border-b-4 border-black">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <button
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    className={`flex items-center gap-3 px-4 py-2 transition-all ${
                      index === currentStep 
                        ? 'text-[#DC143C]'
                        : index < currentStep
                        ? 'text-white cursor-pointer hover:text-[#DC143C]'
                        : 'text-gray-600'
                    }`}
                  >
                    <div className={`w-10 h-10 border-4 flex items-center justify-center font-black ${
                      index === currentStep 
                        ? 'border-[#DC143C] bg-[#DC143C] text-white'
                        : index < currentStep
                        ? 'border-white bg-white text-black'
                        : 'border-gray-600 text-gray-600'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="hidden md:block">
                      <div className="text-xs font-black uppercase tracking-wider">{step.title}</div>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-white' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="border-4 border-black bg-white">
                <div className="p-6 border-b-4 border-black bg-black">
                  <div className="flex items-center gap-3">
                    {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-[#DC143C]" })}
                    <div>
                      <h2 className="text-xl font-black text-white uppercase">{steps[currentStep].title}</h2>
                      <p className="text-sm text-[#DC143C] font-bold uppercase">{steps[currentStep].description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Step 1: Business Basics */}
                      {currentStep === 0 && (
                        <>
                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              PROJECT NAME *
                            </label>
                            <Input
                              value={formData.projectName}
                              onChange={(e) => handleChange('projectName', e.target.value)}
                              placeholder="ENTER PROJECT NAME"
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                            {errors.projectName && (
                              <span className="text-[#DC143C] text-xs font-black uppercase">{errors.projectName}</span>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              TOKEN SYMBOL * (3-5 CHARACTERS)
                            </label>
                            <Input
                              value={formData.projectSymbol}
                              onChange={(e) => handleChange('projectSymbol', e.target.value.toUpperCase())}
                              placeholder="e.g. CAFE"
                              maxLength={5}
                              className="border-4 border-black font-black uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              CATEGORY *
                            </label>
                            <select
                              value={formData.category}
                              onChange={(e) => handleChange('category', e.target.value)}
                              className="w-full px-4 py-3 border-4 border-black bg-white font-bold uppercase focus:bg-[#DC143C]/5"
                            >
                              <option value="">SELECT CATEGORY</option>
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              PROJECT DESCRIPTION *
                            </label>
                            <Textarea
                              value={formData.description}
                              onChange={(e) => handleChange('description', e.target.value)}
                              placeholder="DESCRIBE YOUR PROJECT VISION..."
                              rows={5}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>
                        </>
                      )}

                      {/* Step 2: Location & Market */}
                      {currentStep === 1 && (
                        <>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                                CITY *
                              </label>
                              <Input
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder="ENTER CITY"
                                className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                                COUNTRY *
                              </label>
                              <Input
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                placeholder="ENTER COUNTRY"
                                className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              TARGET MARKET *
                            </label>
                            <Textarea
                              value={formData.targetMarket}
                              onChange={(e) => handleChange('targetMarket', e.target.value)}
                              placeholder="DESCRIBE YOUR TARGET CUSTOMERS..."
                              rows={3}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              OPENING TIMELINE *
                            </label>
                            <select
                              value={formData.openingTimeline}
                              onChange={(e) => handleChange('openingTimeline', e.target.value)}
                              className="w-full px-4 py-3 border-4 border-black bg-white font-bold uppercase focus:bg-[#DC143C]/5"
                            >
                              <option value="">SELECT TIMELINE</option>
                              <option value="3-6 MONTHS">3-6 MONTHS</option>
                              <option value="6-12 MONTHS">6-12 MONTHS</option>
                              <option value="12+ MONTHS">12+ MONTHS</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Step 3: Tokenomics */}
                      {currentStep === 2 && (
                        <>
                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              FUNDING TARGET (USD) *
                            </label>
                            <Input
                              type="number"
                              value={formData.fundingTarget}
                              onChange={(e) => handleChange('fundingTarget', e.target.value)}
                              placeholder="100000"
                              className="border-4 border-black font-black placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                            <span className="text-xs text-gray-600 font-bold uppercase mt-1">
                              TYPICAL RANGE: $50,000 - $500,000
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                                TOKEN PRICE (USD)
                              </label>
                              <Input
                                type="number"
                                step="0.01"
                                value={formData.tokenPrice}
                                onChange={(e) => handleChange('tokenPrice', e.target.value)}
                                className="border-4 border-black font-black placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                                PROFIT SHARE (%)
                              </label>
                              <Input
                                type="number"
                                value={formData.revenueShare}
                                onChange={(e) => handleChange('revenueShare', e.target.value)}
                                className="border-4 border-black font-black placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                              />
                            </div>
                          </div>

                          <div className="p-6 border-4 border-[#DC143C] bg-[#DC143C]">
                            <h3 className="text-white font-black uppercase mb-4">TOKEN ALLOCATION</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-white">
                                <span className="font-bold uppercase">PUBLIC SALE</span>
                                <span className="font-black">40%</span>
                              </div>
                              <div className="flex justify-between text-white">
                                <span className="font-bold uppercase">LIQUIDITY</span>
                                <span className="font-black">30%</span>
                              </div>
                              <div className="flex justify-between text-white">
                                <span className="font-bold uppercase">REWARDS</span>
                                <span className="font-black">20%</span>
                              </div>
                              <div className="flex justify-between text-white">
                                <span className="font-bold uppercase">TEAM</span>
                                <span className="font-black">10%</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Step 4: Business Plan */}
                      {currentStep === 3 && (
                        <>
                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              YOUR EXPERIENCE *
                            </label>
                            <Textarea
                              value={formData.founderExperience}
                              onChange={(e) => handleChange('founderExperience', e.target.value)}
                              placeholder="DESCRIBE YOUR RELEVANT EXPERIENCE..."
                              rows={4}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              MARKET ANALYSIS *
                            </label>
                            <Textarea
                              value={formData.marketAnalysis}
                              onChange={(e) => handleChange('marketAnalysis', e.target.value)}
                              placeholder="DESCRIBE THE MARKET OPPORTUNITY..."
                              rows={4}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              COMPETITIVE ADVANTAGE
                            </label>
                            <Textarea
                              value={formData.competitiveAdvantage}
                              onChange={(e) => handleChange('competitiveAdvantage', e.target.value)}
                              placeholder="WHAT MAKES YOUR PROJECT UNIQUE?"
                              rows={4}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-black uppercase tracking-wider mb-2 block">
                              REVENUE PROJECTIONS *
                            </label>
                            <Textarea
                              value={formData.profitProjections}
                              onChange={(e) => handleChange('profitProjections', e.target.value)}
                              placeholder="YEAR 1, 2, 3 PROJECTIONS..."
                              rows={4}
                              className="border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:bg-[#DC143C]/5"
                            />
                          </div>
                        </>
                      )}

                      {/* Step 5: Review & Submit */}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <div className="p-6 border-4 border-[#DC143C] bg-[#DC143C] text-center">
                            <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-4" />
                            <h3 className="text-2xl font-black text-white uppercase mb-2">READY TO SUBMIT</h3>
                            <p className="text-white font-bold uppercase">
                              Your proposal will be reviewed by the community
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 border-4 border-black">
                              <h4 className="font-black uppercase mb-2">PROJECT SUMMARY</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="font-bold uppercase">NAME:</span>
                                  <span className="font-black">{formData.projectName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-bold uppercase">SYMBOL:</span>
                                  <span className="font-black text-[#DC143C]">{formData.projectSymbol}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-bold uppercase">FUNDING:</span>
                                  <span className="font-black">${formData.fundingTarget}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-bold uppercase">LOCATION:</span>
                                  <span className="font-black">{formData.city}, {formData.country}</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border-4 border-black bg-black">
                              <div className="flex items-center gap-2 text-[#DC143C] mb-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-[0.3em]">NEXT STEPS</span>
                              </div>
                              <p className="text-white text-sm font-bold uppercase">
                                1. Community review (3-5 days)<br/>
                                2. Voting period (7 days)<br/>
                                3. If approved, launch preparation (7-14 days)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex gap-4 mt-8">
                    {currentStep > 0 && (
                      <Button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="flex-1 border-4 border-black bg-white text-black hover:bg-black hover:text-white font-black uppercase tracking-wider"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK
                      </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="flex-1 border-4 border-[#DC143C] bg-[#DC143C] text-white hover:bg-black hover:border-black font-black uppercase tracking-wider"
                      >
                        CONTINUE
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 border-4 border-[#DC143C] bg-[#DC143C] text-white hover:bg-black hover:border-black font-black uppercase tracking-[0.2em]"
                      >
                        <Rocket className="mr-2 h-5 w-5" />
                        SUBMIT PROPOSAL
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits Card */}
              <div className="border-4 border-black bg-white p-6">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#DC143C]" />
                  WHY APPLY?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5" />
                    <span className="text-sm font-bold uppercase">Instant access to capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5" />
                    <span className="text-sm font-bold uppercase">Community of co-owners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5" />
                    <span className="text-sm font-bold uppercase">Built-in customer base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DC143C] mt-0.5" />
                    <span className="text-sm font-bold uppercase">Marketing support</span>
                  </li>
                </ul>
              </div>

              {/* Requirements */}
              <div className="border-4 border-black bg-black p-6">
                <h3 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#DC143C]" />
                  REQUIREMENTS
                </h3>
                <ul className="space-y-2 text-white">
                  <li className="text-sm font-bold uppercase">• KYC VERIFICATION</li>
                  <li className="text-sm font-bold uppercase">• BUSINESS PLAN</li>
                  <li className="text-sm font-bold uppercase">• FINANCIAL PROJECTIONS</li>
                  <li className="text-sm font-bold uppercase">• COMMUNITY APPROVAL</li>
                </ul>
              </div>

              {/* Help Card */}
              <div className="border-4 border-[#DC143C] bg-[#DC143C] p-6">
                <h3 className="text-xl font-black text-white uppercase mb-4">NEED HELP?</h3>
                <p className="text-white text-sm font-bold uppercase mb-4">
                  Join our Discord for support
                </p>
                <Button className="w-full border-4 border-white bg-white text-[#DC143C] hover:bg-black hover:text-white hover:border-black font-black uppercase tracking-wider">
                  JOIN DISCORD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}