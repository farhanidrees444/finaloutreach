import { Navigation } from "@/components/site/navigation"
import { Hero } from "@/components/site/hero"
import { ClientLogosMarquee } from "@/components/site/client-logos-marquee"
import { ResultsBar } from "@/components/site/results-bar"
import { Services } from "@/components/site/services"
import { Process } from "@/components/site/process"
import { CaseStudies } from "@/components/site/case-studies"
import { Testimonials } from "@/components/site/testimonials"
import { Faq } from "@/components/site/faq"
import { Pricing } from "@/components/site/pricing"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"
import { StickyMobileCta } from "@/components/site/sticky-mobile-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { organizationSchema, websiteSchema, serviceSchema } from "@/lib/seo/schemas"

// ISR — regenerate the homepage every hour so static delivery stays fast
// while content (testimonials, copy tweaks) refreshes regularly.
export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), serviceSchema()]} />
      <div className="relative min-h-screen bg-background text-ink">
        <Navigation />
        <main id="main">
          <Hero />
          <ClientLogosMarquee />
          <ResultsBar />
          <Services />
          <Process />
          <CaseStudies />
          <Testimonials />
          <Faq />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
        {/* Single urgency mechanic — mobile-only sticky CTA. */}
        <StickyMobileCta />
      </div>
    </>
  )
}
