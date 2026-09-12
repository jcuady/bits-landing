import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Problem } from "@/components/sections/problem";
import { Solutions } from "@/components/sections/solutions";
import { AiEcosystem } from "@/components/sections/ai-ecosystem";
import { Industries } from "@/components/sections/industries";
import { WhyBits } from "@/components/sections/why-bits";
import { Security } from "@/components/sections/security";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { CustomSolutions } from "@/components/sections/custom-solutions";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <TrustStrip />
      <Problem />
      <Solutions />
      <AiEcosystem />
      <Industries />
      <WhyBits />
      <Security />
      <ProductShowcase />
      <CustomSolutions />
      <Process />
      <Cta />
      <Contact />
    </main>
  );
}
