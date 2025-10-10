import { HeroSectionRedesigned } from "@/components/hero-section-redesigned"
import { HowItWorks } from "@/components/how-it-works"
import { WhyNowPlatform } from "@/components/why-now-platform"
import { LaunchPipelineRedesigned } from "@/components/launch-pipeline-redesigned"
import { SocialProof } from "@/components/social-proof"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"

export default function LandingPageRedesigned() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/*
        OPTIMIZED INFORMATION ARCHITECTURE

        1. Hero - Hook visitors with clear value prop and live launch
        2. How It Works - Educational content for new visitors
        3. Why $NOW - Competitive advantages and platform benefits
        4. Launch Pipeline - Current and upcoming opportunities
        5. Social Proof - Trust building through stats and testimonials
        6. Final CTA - Conversion push
        7. Footer - Resources and links

        Removed sections:
        - PlatformModel (merged into How It Works)
        - DashboardPreview (not essential for initial conversion)
        - FeatureCards (redundant with other sections)
        - SmartSimpleBrilliant (too abstract, merged key points elsewhere)
      */}

      {/* Core Flow */}
      <HeroSectionRedesigned />
      <HowItWorks />
      <WhyNowPlatform />
      <LaunchPipelineRedesigned />
      <SocialProof />
      <CTASection />
      <FooterSection />
    </div>
  )
}