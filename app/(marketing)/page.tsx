import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Problem } from "@/components/sections/problem";
import { TheDifference } from "@/components/sections/the-difference";
import { FeaturesHero } from "@/components/sections/features-hero";
import { FloorShowcase } from "@/components/sections/floor-showcase";
import { FeaturesBento } from "@/components/sections/features-bento";
import { FeaturesAdmin } from "@/components/sections/features-admin";
import { Industries } from "@/components/sections/industries";
import { Security } from "@/components/sections/security";
import { Process } from "@/components/sections/process";
import { DeploymentModels } from "@/components/sections/deployment-models";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CloudBranding } from "@/components/sections/cloud-branding";

export default function Home() {
  return (
    <main id="content">
      {/* 1. Hero: Value proposition & product architecture */}
      <Hero />

      {/* 2. Trust & Statutory Governance */}
      <TrustStrip />

      {/* 3. Platform Benchmarks */}
      <StatsStrip />

      {/* 4. The Problem: Friction of generic software & disconnected spreadsheets */}
      <Problem />

      {/* 5. The Operational Advantage: 20-Year Ops Lead vs Generic CRM & Interactive Floor ROI Calculator */}
      <TheDifference />

      {/* 6. Collections Command Center: Hero feature with account management */}
      <FeaturesHero />

      {/* 7. The Recovery Floor Powerhouse: Predictive Dialer, Walled Training Mode, QA Outliers, Omnichannel, and Real-Time Analytics */}
      <FloorShowcase />

      {/* 8. Feature Bento: Modular Custom Widgets, Multi-Currency, Account Tagging, Templates */}
      <FeaturesBento />

      {/* 9. Administration & Security: RBAC, audit, licensing */}
      <FeaturesAdmin />

      {/* 8. Target Industries */}
      <Industries />

      {/* 9. Security: BSP/NPC-aligned enterprise security */}
      <Security />

      {/* 10. Methodology */}
      <Process />

      {/* 11. Deployment Architecture */}
      <DeploymentModels />

      {/* 12. Solution Packages */}
      <Pricing />

      {/* 13. FAQ */}
      <FAQ />

      {/* 14. Executive Consultation & Floor Architecture Diagnostic */}
      <Contact />

      {/* 15. Boundless Sovereign Cloud: Enterprise Cloud Infrastructure & Branding */}
      <CloudBranding />
    </main>
  );
}
