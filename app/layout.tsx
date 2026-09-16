import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site, solutions } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "BITS | BPO CRM, Finance Operations & AI Automation",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.legalName,
    title: "BITS | BPO CRM, Finance Operations & AI Automation",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS BPO CRM and operations platforms" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS | BPO CRM, Finance Operations & AI Automation",
    description: site.description,
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
      "@type": "ItemList",
      name: "BITS solutions for BPO CRM, finance operations, and AI automation",
      itemListElement: solutions.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: `${site.url}/#${s.id}`,
          provider: { "@type": "Organization", name: site.legalName },
          serviceType: s.name,
        },
      })),
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
