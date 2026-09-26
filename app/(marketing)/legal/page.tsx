import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy & Terms | ${site.legalName}`,
  description: "Official Privacy notice, Data Privacy Act compliance, and terms of use for Boundless IT Solutions (BITS).",
  alternates: { canonical: `${site.url}/legal` },
  openGraph: {
    title: `Privacy & Terms | ${site.legalName}`,
    description: "Official Privacy notice, Data Privacy Act compliance, and terms of use for Boundless IT Solutions (BITS).",
    url: `${site.url}/legal`,
    siteName: site.legalName,
    type: "website",
  },
};

const legalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/legal#webpage`,
      name: `Privacy & Terms | ${site.legalName}`,
      url: `${site.url}/legal`,
      description: "Official Privacy notice and terms of use for Boundless IT Solutions (BITS).",
      inLanguage: "en-PH",
      publisher: {
        "@type": "Organization",
        name: site.legalName,
        url: site.url,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy & Terms",
          item: `${site.url}/legal`,
        },
      ],
    },
  ],
};

export default function LegalPage() {
  return (
    <main id="content" className="bg-cloud pb-24 pt-32 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalSchema) }}
      />

      <Container className="max-w-3xl">
        <h1 className="text-h2 text-ink">Privacy & Terms</h1>

        <section id="privacy" className="mt-14 scroll-mt-28">
          <h2 className="text-h3 text-ink">Privacy notice</h2>
          <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-slateblue">
            <p>
              When you contact BITS through this website, we collect the information you
              submit: your name, work email, company and message. We use it for one purpose
              only: to respond to your inquiry.
            </p>
            <p>
              We do not sell your information, share it with advertisers, or add you to
              marketing lists without your explicit consent.
            </p>
            <p>
              This site does not use advertising trackers. If analytics are introduced in
              the future, this notice will be updated to describe them.
            </p>
            <p>
              To access, correct or delete the information you have shared with us, contact
              us through the form on this website.
            </p>
          </div>
        </section>

        <section id="terms" className="mt-16 scroll-mt-28 border-t border-linelight pt-14">
          <h2 className="text-h3 text-ink">Terms of use</h2>
          <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-slateblue">
            <p>
              The content on this website is provided for general information about BITS and
              the solutions we design and build. It does not constitute professional,
              financial or legal advice.
            </p>
            <p>
              Interface concepts shown on this page use sample data and are illustrative of
              the platforms we design, not representations of a specific deployed product.
            </p>
            <p>
              The BITS name, logo and brand assets are the property of Boundless IT
              Solutions and may not be reused without written permission.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
