"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowRight, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  "Design",
  "Analytics",
  "Social",
  "Productivity",
  "Media",
  "Games",
  "Developer Tools",
  "Finance",
  "E-commerce",
  "Education",
]

const gradientOptions = [
  { name: "Ocean", value: "from-blue-500 to-cyan-500" },
  { name: "Sunset", value: "from-purple-500 to-pink-500" },
  { name: "Aurora", value: "from-indigo-500 to-blue-500" },
  { name: "Forest", value: "from-teal-500 to-emerald-500" },
  { name: "Fire", value: "from-orange-500 to-red-500" },
  { name: "Royal", value: "from-violet-500 to-purple-500" },
]

export default function CreateProjectPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    gradient: "from-blue-500 to-cyan-500",
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
        setFormData(prev => ({ ...prev, iconUrl: data.imageUrl, gradient: data.gradient || prev.gradient }))
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
        return formData.tokenSymbol && formData.initialSupply && formData.initialPrice && formData.equityPercentage
      default:
        return true
    }
  }

  const calculatedMarketCap =
    formData.initialSupply && formData.initialPrice
      ? (Number.parseFloat(formData.initialSupply) * Number.parseFloat(formData.initialPrice))
      : 0

  const steps = ["Project Details", "Token Economics", "Review & Launch"]

  return (
    <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-serif mb-3">
              Launch Your Project
            </h1>
            <p className="text-lg text-muted-foreground">
              Create a tokenized project where your community holds real equity
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => index < activeStep && setActiveStep(index)}
                  disabled={index > activeStep}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    index === activeStep
                      ? "bg-foreground text-background"
                      : index < activeStep
                      ? "bg-foreground/20 text-foreground cursor-pointer hover:bg-foreground/30"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{step}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-2",
                    index < activeStep ? "bg-foreground" : "bg-muted"
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
              <Card>
                <div className="p-6 space-y-6">
                  {activeStep === 0 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your project name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project and its value proposition"
                          value={formData.description}
                          onChange={(e) => handleChange("description", e.target.value)}
                          className="min-h-[120px] bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                          <SelectTrigger id="category" className="bg-background/50">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
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
                          <Label htmlFor="symbol">Token Symbol</Label>
                          <Input
                            id="symbol"
                            placeholder="e.g. SNOW"
                            value={formData.tokenSymbol}
                            onChange={(e) => handleChange("tokenSymbol", e.target.value.toUpperCase())}
                            className="bg-background/50"
                            maxLength={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="supply">Initial Supply</Label>
                          <Input
                            id="supply"
                            type="number"
                            placeholder="1,000,000"
                            value={formData.initialSupply}
                            onChange={(e) => handleChange("initialSupply", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      {/* Icon Generation */}
                      <div className="space-y-2">
                        <Label>Project Icon</Label>
                        <div className="flex items-center gap-4">
                          {formData.iconUrl ? (
                            <img
                              src={formData.iconUrl}
                              alt="Project icon"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-white border border-border/50 flex items-center justify-center">
                              <span className="text-lg font-serif text-black">
                                {formData.tokenSymbol ? `$${formData.tokenSymbol}` : "$"}
                              </span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={generateIcon}
                            disabled={!formData.name || !formData.tokenSymbol || isGeneratingIcon}
                          >
                            {isGeneratingIcon ? "Generating..." : "Generate Icon"}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Token ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="0.10"
                            value={formData.initialPrice}
                            onChange={(e) => handleChange("initialPrice", e.target.value)}
                            className="bg-background/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="equity">Equity for Holders (%)</Label>
                          <Input
                            id="equity"
                            type="number"
                            placeholder="25"
                            value={formData.equityPercentage}
                            onChange={(e) => handleChange("equityPercentage", e.target.value)}
                            className="bg-background/50"
                            max={100}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goal">Funding Goal ($)</Label>
                        <Input
                          id="goal"
                          type="number"
                          placeholder="100,000"
                          value={formData.fundingGoal}
                          onChange={(e) => handleChange("fundingGoal", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      {calculatedMarketCap > 0 && (
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="text-sm text-muted-foreground">Initial Market Cap</div>
                          <div className="text-2xl font-bold">
                            ${calculatedMarketCap.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <h3 className="text-2xl font-semibold mb-2">Ready to Launch?</h3>
                        <p className="text-muted-foreground">
                          Review your project details in the preview card
                        </p>
                      </div>

                      <div className="space-y-3 p-4 rounded-lg bg-muted/30">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Token Symbol</span>
                          <span className="font-medium">{formData.tokenSymbol}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Initial Supply</span>
                          <span className="font-medium">{Number(formData.initialSupply).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Token Price</span>
                          <span className="font-medium">${formData.initialPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Market Cap</span>
                          <span className="font-medium">${calculatedMarketCap.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Equity Share</span>
                          <span className="font-medium">{formData.equityPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    {activeStep > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(activeStep - 1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                    )}
                    {activeStep < 2 ? (
                      <Button
                        type="button"
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={!isStepValid(activeStep)}
                        className="flex-1"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStepValid(0) || !isStepValid(1) || isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {isSubmitting ? "Launching..." : "Launch Project"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview Section */}
            <div>
              <div className="sticky top-24">
                <h3 className="text-sm text-muted-foreground mb-4">Live Preview</h3>
                <Card>

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {formData.iconUrl ? (
                          <div className="w-10 h-10 rounded border border-border bg-white">
                            <img
                              src={formData.iconUrl}
                              alt={formData.name || "Project"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-white border border-border flex items-center justify-center">
                            <span className="text-sm font-serif text-black">
                              {formData.tokenSymbol ? `$${formData.tokenSymbol}` : "$"}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">
                            {formData.name || "Project Name"}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {formData.category || "Category"}
                          </p>
                        </div>
                      </div>
                      {formData.tokenSymbol && (
                        <span className="text-xs text-green-600">New</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {formData.description || "Your project description will appear here..."}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Token</div>
                        <div className="font-semibold">{formData.tokenSymbol || "TOKEN"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Price</div>
                        <div className="font-semibold">
                          ${formData.initialPrice || "0.00"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Supply</div>
                        <div className="font-semibold text-sm">
                          {formData.initialSupply ? Number(formData.initialSupply).toLocaleString() : "0"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Equity</div>
                        <div className="font-semibold text-sm">
                          {formData.equityPercentage || "0"}%
                        </div>
                      </div>
                    </div>

                  </div>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}