import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { agents, site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BITS — Collections CRM & Dialer Platform",
    template: "%s | BITS",
  },
  description:
    "BITS is an enterprise collections CRM and operations platform with predictive dialer, autonomous AI agents, compliance guardrails, and operational intelligence.",
  keywords: [
    "collections CRM",
    "debt collection software",
    "collections operations platform",
    "debt recovery CRM",
    "collection agency software",
    "collections dialer",
    "predictive dialer",
    "collections workflow",
    "QA collections",
    "BSP compliant collections",
    "NPC compliant CRM",
    "AI collections agents",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.legalName,
    title: "BITS — Collections CRM & Dialer Platform",
    description:
      "Enterprise collections CRM with predictive auto-dialer, AI recovery agents, compliance rules, and operations intelligence. Accelerate debt recovery while staying fully compliant.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Collections CRM & Dialer Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS — Collections CRM & Dialer Platform",
    description:
      "Enterprise collections CRM with predictive auto-dialer, AI recovery agents, compliance rules, and operations intelligence.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo-horizontal.png`,
      description: site.description,
      slogan: site.tagline,
    },
    {
      "@type": "WebSite",
      name: site.legalName,
      url: site.url,
    },
    {
      "@type": "SoftwareApplication",
      name: "BITS Collections CRM & Operations Platform",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Debt Collection Software",
      operatingSystem: "Web",
      description: site.description,
      url: site.url,
      publisher: { "@type": "Organization", name: site.legalName },
      offers: {
        "@type": "OfferCatalog",
        name: "BITS modules",
        itemListElement: agents.map((module) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: module.name,
            description: module.role,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is BITS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BITS is a collections CRM and operations platform that combines portfolio management, agent workflows, customer communications, built-in dialer, quality assurance, AI agents, and operational reporting into one workspace.",
          },
        },
        {
          "@type": "Question",
          name: "Does BITS support on-premises deployment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. BITS supports cloud, on-premises, and supported hybrid deployment configurations designed around different infrastructure and operational requirements.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-electric-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
