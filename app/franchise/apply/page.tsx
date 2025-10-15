"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Store, MapPin, DollarSign, Users, FileText, CheckCircle2, Upload, AlertCircle, Coins, Shield } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FranchiseApplyPage() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(12500) // Mock balance
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([])
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: "",
    email: "",
    walletAddress: "",

    // Step 2: Location Details
    city: "",
    country: "",
    address: "",
    squareFootage: "",

    // Step 3: Financial Plan
    estimatedCosts: "",
    fundingTarget: "",
    timeline: "",

    // Step 4: Business Plan
    experience: "",
    marketAnalysis: "",
    competitiveAdvantage: "",

    // Documents
    businessPlan: null as File | null,
    financialProjections: null as File | null
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Magnetic cursor effect
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!ctaRefs.current[index]) return
    const rect = ctaRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 100

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3
      ctaRefs.current[index]!.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ctaRefs.current[index]) {
      ctaRefs.current[index]!.style.transform = 'translate(0, 0)'
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const steps = [
    {
      title: "Verify Eligibility",
      description: "Check your token holdings and wallet connection",
      icon: Shield
    },
    {
      title: "Location Details",
      description: "Where will your franchise be located?",
      icon: MapPin
    },
    {
      title: "Financial Plan",
      description: "Funding requirements and timeline",
      icon: DollarSign
    },
    {
      title: "Business Plan",
      description: "Your vision and strategy",
      icon: FileText
    },
    {
      title: "Review & Submit",
      description: "Final review and $5K application fee",
      icon: CheckCircle2
    }
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.walletAddress) newErrors.walletAddress = "Wallet address required"
      if (tokenBalance < 10000) newErrors.tokenBalance = "Need 10,000+ $COFFEE tokens"
    }

    if (step === 1) {
      if (!formData.city) newErrors.city = "City required"
      if (!formData.country) newErrors.country = "Country required"
      if (!formData.address) newErrors.address = "Address required"
    }

    if (step === 2) {
      if (!formData.fundingTarget) newErrors.fundingTarget = "Funding target required"
      if (!formData.timeline) newErrors.timeline = "Timeline required"
    }

    if (step === 3) {
      if (!formData.experience) newErrors.experience = "Experience required"
      if (!formData.marketAnalysis) newErrors.marketAnalysis = "Market analysis required"
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
      // Submit logic here
      console.log("Submitting application:", formData)
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
            {/* Token Balance Check */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-md" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
                    <Coins className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-serif mb-1">Token Holdings</h3>
                  <p className="text-sm text-muted-foreground">Minimum 10,000 $COFFEE required</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Your Balance</span>
                  {tokenBalance >= 10000 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div className="text-3xl font-bold font-serif mb-2">
                  {tokenBalance.toLocaleString()} $COFFEE
                </div>
                {tokenBalance >= 10000 ? (
                  <p className="text-sm text-green-600 font-semibold">✓ Eligible to apply</p>
                ) : (
                  <p className="text-sm text-orange-600 font-semibold">
                    Need {(10000 - tokenBalance).toLocaleString()} more tokens
                  </p>
                )}
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold">Wallet Address *</label>
              <Input
                placeholder="0x... or wallet.sol"
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              {errors.walletAddress && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.walletAddress}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Full Name *</label>
              <Input
                placeholder="Your legal name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Email Address *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
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
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
                />
                {errors.city && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Country *</label>
                <Input
                  placeholder="United States"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
                />
                {errors.country && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Full Address *</label>
              <Input
                placeholder="123 Main Street, Suite 100"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              {errors.address && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Square Footage</label>
              <Input
                placeholder="1,500 sq ft"
                value={formData.squareFootage}
                onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              <p className="text-xs text-muted-foreground">Approximate size of your location</p>
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
              <label className="text-sm font-semibold">Funding Target *</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="500000"
                  value={formData.fundingTarget}
                  onChange={(e) => setFormData({ ...formData, fundingTarget: e.target.value })}
                  className="h-12 pl-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
                />
              </div>
              <p className="text-xs text-muted-foreground">Typical range: $300K - $500K</p>
              {errors.fundingTarget && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fundingTarget}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Estimated Setup Costs</label>
              <Textarea
                placeholder="Breakdown of expected costs: construction, equipment, permits, etc."
                value={formData.estimatedCosts}
                onChange={(e) => setFormData({ ...formData, estimatedCosts: e.target.value })}
                className="min-h-[120px] rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Timeline to Opening *</label>
              <Input
                placeholder="6 months from funding"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="h-12 rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              {errors.timeline && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.timeline}
                </p>
              )}
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
              <label className="text-sm font-semibold">Relevant Experience *</label>
              <Textarea
                placeholder="Describe your experience in hospitality, business management, or related fields..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="min-h-[120px] rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              {errors.experience && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.experience}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Market Analysis *</label>
              <Textarea
                placeholder="Why this location? What's the target demographic? Competition analysis..."
                value={formData.marketAnalysis}
                onChange={(e) => setFormData({ ...formData, marketAnalysis: e.target.value })}
                className="min-h-[120px] rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
              {errors.marketAnalysis && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.marketAnalysis}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Competitive Advantage</label>
              <Textarea
                placeholder="What makes your location special? Unique positioning, partnerships, etc."
                value={formData.competitiveAdvantage}
                onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                className="min-h-[120px] rounded-xl border-2 border-border/40 focus:border-primary/50 transition-colors"
              />
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <label className="text-sm font-semibold">Supporting Documents</label>

              <div className="p-4 rounded-xl border-2 border-dashed border-border/40 hover:border-primary/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Business Plan (PDF)</p>
                    <p className="text-xs text-muted-foreground">Optional but recommended</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-border/40 hover:border-primary/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Financial Projections (PDF)</p>
                    <p className="text-xs text-muted-foreground">3-year revenue forecast</p>
                  </div>
                </div>
              </div>
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
            {/* Review Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif">Application Summary</h3>

              <div className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-background/50 border border-border/30 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Applicant</p>
                  <p className="font-semibold">{formData.name || "Not provided"}</p>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                </div>

                <div className="h-px bg-border/30" />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Proposed Location</p>
                  <p className="font-semibold">{formData.city}, {formData.country}</p>
                  <p className="text-sm text-muted-foreground">{formData.address}</p>
                </div>

                <div className="h-px bg-border/30" />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Funding Target</p>
                  <p className="font-semibold text-lg">
                    ${formData.fundingTarget ? parseInt(formData.fundingTarget).toLocaleString() : "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Application Fee */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50/50 to-yellow-50/50 border-2 border-orange-200/40">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-orange-900 mb-2">Application Fee Required</h4>
                  <p className="text-sm text-orange-800/80 mb-3">
                    A non-refundable $5,000 fee is required to submit your proposal for community voting.
                    This covers due diligence, legal review, and platform costs.
                  </p>
                  <div className="p-3 rounded-lg bg-white/50 border border-orange-200/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-orange-900">Application Fee</span>
                      <span className="text-2xl font-bold font-serif text-orange-900">$5,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-blue-200/40">
              <h4 className="font-bold text-blue-900 mb-3">What Happens Next?</h4>
              <div className="space-y-2">
                {[
                  "Your proposal is posted publicly on the franchise dashboard",
                  "7-day voting period begins for parent $COFFEE token holders",
                  "60% approval required with 10% quorum",
                  "If approved, you can launch your franchise token presale"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800/90">{step}</p>
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
    <div className="min-h-screen bg-background pt-16">

      {/* Header */}
      <section className="relative py-16 md:py-20 border-b border-border/30">
        <div className="max-w-[900px] mx-auto px-6">
          <Link href="/franchise" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Franchise Info
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tighter mb-4">
            Franchise Application
          </h1>
          <p className="text-muted-foreground/80 text-lg">
            Apply to launch your own $COFFEE franchise location
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="relative py-8 border-b border-border/30">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i === currentStep
                      ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30'
                      : i < currentStep
                      ? 'bg-green-100 text-green-600'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-semibold text-center ${
                    i === currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title.split(' ')[0]}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-all duration-300 ${
                    i < currentStep ? 'bg-green-600' : 'bg-border/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="relative group/card">
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl transition-all duration-300 group-hover/card:border-primary/60" />
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl transition-all duration-300 group-hover/card:border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-accent/40 rounded-bl-3xl transition-all duration-300 group-hover/card:border-accent/60" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-accent/40 rounded-br-3xl transition-all duration-300 group-hover/card:border-accent/60" />

            <Card className="relative border-2 border-border/40 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm" />

              <div className="relative p-8 md:p-10">
                {/* Step Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
                      {(() => {
                        const Icon = steps[currentStep].icon
                        return Icon ? <Icon className="w-5 h-5 text-primary" /> : null
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-serif">{steps[currentStep].title}</h2>
                      <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-border/30">
                  {currentStep > 0 && (
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="h-12 px-6 rounded-xl border-2 border-border/40 hover:border-primary/30 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}

                  <div className="flex-1" />

                  {currentStep < steps.length - 1 ? (
                    <div
                      ref={el => { ctaRefs.current[0] = el }}
                      onMouseMove={(e) => handleMouseMove(e, 0)}
                      onMouseLeave={() => handleMouseLeave(0)}
                      className="will-change-transform"
                      style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      <Button
                        onClick={nextStep}
                        className="h-12 px-8 rounded-xl bg-gradient-to-r from-black via-gray-900 to-black text-white hover:shadow-xl transition-all"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      ref={el => { ctaRefs.current[1] = el }}
                      onMouseMove={(e) => handleMouseMove(e, 1)}
                      onMouseLeave={() => handleMouseLeave(1)}
                      className="will-change-transform"
                      style={{ transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      <Button
                        onClick={handleSubmit}
                        className="h-12 px-8 rounded-xl bg-gradient-to-r from-green-600 via-green-700 to-green-600 text-white hover:shadow-xl transition-all"
                      >
                        Submit Application ($5K)
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}
