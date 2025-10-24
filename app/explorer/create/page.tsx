"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, TrendingUp, Zap, Package, DollarSign, Users, Rocket, Shield, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  "COFFEE",
  "RESTAURANT",
  "RETAIL",
  "FITNESS",
  "BEAUTY",
  "TECH",
  "EDUCATION",
  "HEALTH",
  "ENTERTAINMENT",
  "SERVICES",
]

export default function CreateProjectPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tokenSymbol: "",
    initialSupply: "",
    initialPrice: "",
    equityPercentage: "",
    fundingGoal: "",
    iconUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingIcon, setIsGeneratingIcon] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push("/explorer")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateIcon = async () => {
    if (!formData.name || !formData.tokenSymbol) return

    setIsGeneratingIcon(true)
    try {
      const response = await fetch('/api/generate-icon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          symbol: formData.tokenSymbol,
          category: formData.category
        })
      })

      const data = await response.json()
      if (data.imageUrl) {
        setFormData(prev => ({ ...prev, iconUrl: data.imageUrl }))
      }
    } catch (error) {
      console.error('Failed to generate icon:', error)
    }
    setIsGeneratingIcon(false)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.name && formData.description && formData.category
      case 1:
        return formData.tokenSymbol && formData.initialSupply && formData.initialPrice && formData.equityPercentage && formData.fundingGoal
      default:
        return true
    }
  }

  const calculatedMarketCap =
    formData.initialSupply && formData.initialPrice
      ? (Number.parseFloat(formData.initialSupply) * Number.parseFloat(formData.initialPrice))
      : 0

  const steps = ["PROJECT DETAILS", "TOKENOMICS", "REVIEW & LAUNCH"]

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
      
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="border-b-4 border-black bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-black text-xs tracking-[0.3em] uppercase mb-6">
                <Rocket className="w-4 h-4" />
                CREATE & LAUNCH
              </div>
              <h1 className="text-5xl sm:text-6xl font-black font-serif text-white uppercase tracking-tight mb-4">
                LAUNCH YOUR<br/>TOKENIZED PROJECT
              </h1>
              <p className="text-lg text-[#DC143C] font-black uppercase tracking-wider">
                Create a store where your community holds real equity
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => index < activeStep && setActiveStep(index)}
                    disabled={index > activeStep}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 border-4 text-sm font-black uppercase tracking-wider transition-all",
                      index === activeStep
                        ? "bg-[#DC143C] text-white border-[#DC143C]"
                        : index < activeStep
                        ? "bg-black text-white border-black cursor-pointer hover:bg-[#DC143C] hover:border-[#DC143C]"
                        : "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                    )}
                  >
                    <span className="w-8 h-8 border-2 flex items-center justify-center text-xs font-black">
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{step}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-12 h-1 mx-2",
                      index < activeStep ? "bg-black" : "bg-gray-300"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="border-4 border-black bg-white">
                  <div className="p-8 border-b-4 border-black bg-[#DC143C]">
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                      {activeStep === 0 && <Package className="w-6 h-6" />}
                      {activeStep === 1 && <DollarSign className="w-6 h-6" />}
                      {activeStep === 2 && <Rocket className="w-6 h-6" />}
                      {steps[activeStep]}
                    </h2>
                  </div>
                  <div className="p-8 space-y-6">
                    {activeStep === 0 && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm font-black uppercase tracking-wider">PROJECT NAME</Label>
                          <Input
                            placeholder="ENTER YOUR PROJECT NAME"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-bold uppercase placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-black uppercase tracking-wider">DESCRIPTION</Label>
                          <Textarea
                            placeholder="DESCRIBE YOUR PROJECT AND ITS VALUE..."
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="min-h-[120px] border-4 border-black bg-white focus:bg-[#DC143C]/5 font-bold uppercase placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-black uppercase tracking-wider">CATEGORY</Label>
                          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                            <SelectTrigger className="border-4 border-black bg-white font-bold uppercase">
                              <SelectValue placeholder="SELECT A CATEGORY" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat} className="font-bold uppercase">
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {activeStep === 1 && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-black uppercase tracking-wider">TOKEN SYMBOL</Label>
                            <Input
                              placeholder="COFFEE"
                              value={formData.tokenSymbol}
                              onChange={(e) => handleChange("tokenSymbol", e.target.value.toUpperCase())}
                              className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-black uppercase"
                              maxLength={10}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-black uppercase tracking-wider">INITIAL SUPPLY</Label>
                            <Input
                              type="number"
                              placeholder="1000000"
                              value={formData.initialSupply}
                              onChange={(e) => handleChange("initialSupply", e.target.value)}
                              className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-black"
                            />
                          </div>
                        </div>

                        {/* Icon Generation */}
                        <div className="space-y-2">
                          <Label className="text-sm font-black uppercase tracking-wider">PROJECT ICON</Label>
                          <div className="flex items-center gap-4">
                            {formData.iconUrl ? (
                              <img
                                src={formData.iconUrl}
                                alt="Project icon"
                                className="w-20 h-20 border-4 border-black object-cover"
                              />
                            ) : (
                              <div className="w-20 h-20 border-4 border-black bg-white flex items-center justify-center">
                                <span className="text-2xl font-black text-[#DC143C]">
                                  {formData.tokenSymbol ? `$${formData.tokenSymbol}` : "$"}
                                </span>
                              </div>
                            )}
                            <Button
                              type="button"
                              onClick={generateIcon}
                              disabled={!formData.name || !formData.tokenSymbol || isGeneratingIcon}
                              className="border-4 border-black bg-white text-black hover:bg-[#DC143C] hover:text-white font-black uppercase tracking-wider"
                            >
                              {isGeneratingIcon ? "GENERATING..." : "GENERATE ICON"}
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-black uppercase tracking-wider">PRICE PER TOKEN ($)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.10"
                              value={formData.initialPrice}
                              onChange={(e) => handleChange("initialPrice", e.target.value)}
                              className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-black"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-black uppercase tracking-wider">EQUITY FOR HOLDERS (%)</Label>
                            <Input
                              type="number"
                              placeholder="25"
                              value={formData.equityPercentage}
                              onChange={(e) => handleChange("equityPercentage", e.target.value)}
                              className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-black"
                              max={100}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-black uppercase tracking-wider">FUNDING GOAL ($)</Label>
                          <Input
                            type="number"
                            placeholder="100000"
                            value={formData.fundingGoal}
                            onChange={(e) => handleChange("fundingGoal", e.target.value)}
                            className="border-4 border-black bg-white focus:bg-[#DC143C]/5 font-black"
                          />
                        </div>

                        {calculatedMarketCap > 0 && (
                          <div className="p-4 border-4 border-[#DC143C] bg-[#DC143C]">
                            <div className="text-sm text-white font-black uppercase tracking-wider">INITIAL MARKET CAP</div>
                            <div className="text-3xl font-black text-white">
                              ${calculatedMarketCap.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center py-8 border-4 border-black bg-[#DC143C]">
                          <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
                          <h3 className="text-3xl font-black text-white uppercase mb-2">READY TO LAUNCH?</h3>
                          <p className="text-white font-bold uppercase">
                            Review your project details below
                          </p>
                        </div>

                        <div className="space-y-3 p-6 border-4 border-black bg-white">
                          <div className="flex justify-between text-sm pb-2 border-b-2 border-black">
                            <span className="font-bold uppercase">TOKEN SYMBOL</span>
                            <span className="font-black text-[#DC143C]">{formData.tokenSymbol}</span>
                          </div>
                          <div className="flex justify-between text-sm pb-2 border-b-2 border-black">
                            <span className="font-bold uppercase">INITIAL SUPPLY</span>
                            <span className="font-black">{Number(formData.initialSupply || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm pb-2 border-b-2 border-black">
                            <span className="font-bold uppercase">TOKEN PRICE</span>
                            <span className="font-black">${formData.initialPrice}</span>
                          </div>
                          <div className="flex justify-between text-sm pb-2 border-b-2 border-black">
                            <span className="font-bold uppercase">MARKET CAP</span>
                            <span className="font-black">${calculatedMarketCap.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-bold uppercase">EQUITY SHARE</span>
                            <span className="font-black text-[#DC143C]">{formData.equityPercentage}%</span>
                          </div>
                        </div>

                        <div className="p-4 border-4 border-black bg-black">
                          <div className="flex items-center gap-2 text-[#DC143C] mb-2">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">SECURITY NOTE</span>
                          </div>
                          <p className="text-white text-sm font-bold uppercase">
                            Your project will be secured with multi-sig wallets and audited smart contracts
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                      {activeStep > 0 && (
                        <Button
                          type="button"
                          onClick={() => setActiveStep(activeStep - 1)}
                          className="flex-1 border-4 border-black bg-white text-black hover:bg-black hover:text-white font-black uppercase tracking-wider"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          BACK
                        </Button>
                      )}
                      {activeStep < 2 ? (
                        <Button
                          type="button"
                          onClick={() => setActiveStep(activeStep + 1)}
                          disabled={!isStepValid(activeStep)}
                          className="flex-1 border-4 border-[#DC143C] bg-[#DC143C] text-white hover:bg-black hover:border-black font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          CONTINUE
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={!isStepValid(0) || !isStepValid(1) || isSubmitting}
                          className="flex-1 border-4 border-[#DC143C] bg-[#DC143C] text-white hover:bg-black hover:border-black font-black uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "LAUNCHING..." : "🚀 LAUNCH PROJECT"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div>
                <div className="sticky top-24">
                  <h3 className="text-sm font-black text-[#DC143C] mb-4 uppercase tracking-[0.3em]">LIVE PREVIEW</h3>
                  <div className="border-4 border-black bg-white">
                    {/* Preview Header */}
                    <div className="p-5 border-b-4 border-black bg-black">
                      <div className="flex items-center justify-between">
                        <span className="text-[#DC143C] font-black text-xs uppercase tracking-[0.3em]">PROJECT CARD</span>
                        {formData.tokenSymbol && (
                          <span className="text-xs text-white font-black uppercase tracking-wider bg-[#DC143C] px-2 py-1">NEW</span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        {formData.iconUrl ? (
                          <div className="w-16 h-16 border-4 border-black bg-white">
                            <img
                              src={formData.iconUrl}
                              alt={formData.name || "Project"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center">
                            <span className="text-xl font-black text-[#DC143C]">
                              {formData.tokenSymbol ? `$${formData.tokenSymbol}` : "$"}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-black text-xl uppercase">
                            {formData.name || "PROJECT NAME"}
                          </h3>
                          <p className="text-sm text-[#DC143C] font-black uppercase">
                            {formData.category || "CATEGORY"}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm font-bold mb-6 uppercase line-clamp-3">
                        {formData.description || "YOUR PROJECT DESCRIPTION WILL APPEAR HERE..."}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="border-2 border-black p-3">
                          <div className="text-xs font-black uppercase">TOKEN</div>
                          <div className="font-black text-[#DC143C]">{formData.tokenSymbol || "TOKEN"}</div>
                        </div>
                        <div className="border-2 border-black p-3">
                          <div className="text-xs font-black uppercase">PRICE</div>
                          <div className="font-black">
                            ${formData.initialPrice || "0.00"}
                          </div>
                        </div>
                        <div className="border-2 border-black p-3">
                          <div className="text-xs font-black uppercase">SUPPLY</div>
                          <div className="font-black text-sm">
                            {formData.initialSupply ? Number(formData.initialSupply).toLocaleString() : "0"}
                          </div>
                        </div>
                        <div className="border-2 border-black p-3">
                          <div className="text-xs font-black uppercase">EQUITY</div>
                          <div className="font-black text-[#DC143C] text-sm">
                            {formData.equityPercentage || "0"}%
                          </div>
                        </div>
                      </div>

                      {/* Funding Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs font-black uppercase mb-2">
                          <span>FUNDING PROGRESS</span>
                          <span className="text-[#DC143C]">0%</span>
                        </div>
                        <div className="h-6 border-4 border-black bg-white">
                          <div className="h-full bg-[#DC143C]" style={{ width: '0%' }} />
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-3 border-4 border-[#DC143C] bg-[#DC143C] text-white font-black uppercase tracking-[0.2em] hover:bg-black hover:border-black transition-all">
                        VIEW PROJECT
                      </button>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="mt-6 p-4 border-4 border-black bg-black">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#DC143C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-bold uppercase">
                          This is a preview of how your project will appear in the explorer
                        </p>
                        <p className="text-[#DC143C] text-xs font-bold uppercase mt-1">
                          Final appearance may vary slightly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}