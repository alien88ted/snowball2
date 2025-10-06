import { HeroSection } from "@/components/hero-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { FeatureCards } from "@/components/feature-cards"
import { SmartSimpleBrilliant } from "@/components/smart-simple-brilliant"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AmbientBackground } from "@/components/ambient-background"

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-background relative">
      <AmbientBackground />
      <div className="pt-16 relative z-10">
        <HeroSection />
        <DashboardPreview />
        <FeatureCards />
        <SmartSimpleBrilliant />
        <CTASection />
        <FooterSection />
      </div>
    </div>
  )
}
