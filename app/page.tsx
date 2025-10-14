import { HeroSectionRedesigned } from "@/components/hero-section-redesigned"
import { HowItWorks } from "@/components/how-it-works"
import { WhyNowPlatform } from "@/components/why-now-platform"
import { LaunchPipelineRedesigned } from "@/components/launch-pipeline-redesigned"
import { SocialProof } from "@/components/social-proof"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"

export default function LandingPage() {
  return (
    <main id="content" className="w-full min-h-screen bg-background">
      {/* Optimized information architecture for highest conversion */}
      <HeroSectionRedesigned />
      <HowItWorks />
      <WhyNowPlatform />
      <LaunchPipelineRedesigned />
      <SocialProof />
      <CTASection />
      <FooterSection />
    </main>
  )
}
