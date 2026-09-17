import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Problem } from "@/components/sections/problem";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { Solutions } from "@/components/sections/solutions";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { AiAgentsShowcase } from "@/components/sections/ai-agents-showcase";
import { Pricing } from "@/components/sections/pricing";
import { WhyBits } from "@/components/sections/why-bits";
import { Security } from "@/components/sections/security";
import { Process } from "@/components/sections/process";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <TrustStrip />
      <StatsStrip />
      <Problem />
      <FeaturesGrid />
      <Solutions />
      <ProductShowcase />
      <AiAgentsShowcase />
      <Pricing />
      <WhyBits />
      <Security />
      <Process />
      <CtaBanner />
      <Contact />
    </main>
  );
}
