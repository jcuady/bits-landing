import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Problem } from "@/components/sections/problem";
import { TheDifference } from "@/components/sections/the-difference";
import { Ecosystem } from "@/components/sections/ecosystem";
import { ProductsSuite } from "@/components/sections/products-suite";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { BitsAgentShowcase } from "@/components/sections/bits-agent-showcase";
import { Industries } from "@/components/sections/industries";
import { Security } from "@/components/sections/security";
import { Process } from "@/components/sections/process";
import { DeploymentModels } from "@/components/sections/deployment-models";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="content">
      {/* 1. Hero Section: Value proposition & product architecture */}
      <Hero />

      {/* 2. Trust & Statutory Governance: Zero fake certs, BSP/NPC alignment */}
      <TrustStrip />

      {/* 3. Platform Benchmarks */}
      <StatsStrip />

      {/* 4. The Problem: Friction of generic software & disconnected spreadsheets */}
      <Problem />

      {/* 5. The Difference: Your operation isn't generic. Your software shouldn't be either */}
      <TheDifference />

      {/* 6. BITS Technology Ecosystem: The 6 Platform Pillars */}
      <Ecosystem />

      {/* 6.1 Enterprise Product Suite: Modular Engines (Payroll, HRMS, Sales, Marketing, Commerce) & Flagships */}
      <ProductsSuite />

      {/* 7. Flagship Product: BITScrm Operational Core */}
      <ProductShowcase />

      {/* 8. AI Operations Layer: BITSagent Voice, Email, QA & RAG */}
      <BitsAgentShowcase />

      {/* 9. Target Industries: BPOs, Collections, Banking & Financial, Growing Businesses */}
      <Industries />

      {/* 10. Security: Built for sensitive business operations (RBAC, auditability) */}
      <Security />

      {/* 11. Methodology: 01 Understand, 02 Design, 03 Build, 04 Deploy, 05 Improve */}
      <Process />

      {/* 12. Deployment Architecture: Cloud vs. On-Premises Scoping */}
      <DeploymentModels />

      {/* 13. Solution Packages: Starter, Growth, Enterprise consultative tiers */}
      <Pricing />

      {/* 13. FAQ: 10 Comprehensive enterprise questions with Schema.org markup */}
      <FAQ />

      {/* 14. Final Enterprise Call to Action Banner */}
      <CtaBanner />

      {/* 15. Lead Consultation Flow */}
      <Contact />
    </main>
  );
}
