import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProductFamilies } from "@/components/sections/product-families";
import { SolutionFinder } from "@/components/sections/solution-finder";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TheDifference } from "@/components/sections/the-difference";
import { FeaturesHero } from "@/components/sections/features-hero";
import { FloorShowcase } from "@/components/sections/floor-showcase";
import { Industries } from "@/components/sections/industries";
import { Security } from "@/components/sections/security";
import { DeploymentModels } from "@/components/sections/deployment-models";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="content">
      {/* ═══ PHASE 1: ESTABLISH BITS (Who we are) ═══ */}

      {/* 1. Hero: Company-level value proposition — WHO is BITS, WHAT does it build */}
      <Hero />

      {/* 2. Trust & Statutory Governance — Social proof and credibility */}
      <TrustStrip />

      {/* ═══ PHASE 2: SHOW THE PORTFOLIO (What we offer) ═══ */}

      {/* 3. Product Families: 4 connected product families overview (CPO Rec #3) */}
      <ProductFamilies />

      {/* 4. Solution Finder: Problem-based discovery — "What are you trying to improve?" (CPO Rec #8) */}
      <SolutionFinder />

      {/* ═══ PHASE 3: FLAGSHIP DEEP DIVE (Operations 360) ═══ */}

      {/* 5. The Operational Advantage: Why BITS over generic software */}
      <TheDifference />

      {/* 6. Operations 360 Benchmarks: Flagship platform metrics */}
      <StatsStrip />

      {/* 7. Collections Command Center: Hero feature with account management */}
      <FeaturesHero />

      {/* 8. The Recovery Floor Powerhouse: Predictive Dialer, QA, Omnichannel */}
      <FloorShowcase />

      {/* ═══ PHASE 4: TRUST & FIT (Can it work for me?) ═══ */}

      {/* 9. Target Industries */}
      <Industries />

      {/* 10. Security: BSP/NPC-aligned enterprise security */}
      <Security />

      {/* 11. Deployment Architecture */}
      <DeploymentModels />

      {/* ═══ PHASE 5: CONVERT (How do I get started?) ═══ */}

      {/* 12. Solution Packages & Pricing */}
      <Pricing />

      {/* 13. FAQ */}
      <FAQ />

      {/* 14. Executive Consultation */}
      <Contact />
    </main>
  );
}
