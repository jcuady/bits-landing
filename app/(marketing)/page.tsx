import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Problem } from "@/components/sections/problem";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { BitsAgentShowcase } from "@/components/sections/bits-agent-showcase";
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
      <ProductShowcase />
      <BitsAgentShowcase />
      <Pricing />
      <WhyBits />
      <Security />
      <Process />
      <CtaBanner />
      <Contact />
    </main>
  );
}
