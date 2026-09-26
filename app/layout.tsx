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
    default: "Boundless IT Solutions (BITS) — Enterprise Operations Software, Collections CRM & AI Infrastructure",
    template: "%s | Boundless IT Solutions (BITS)",
  },
  description:
    "Boundless IT Solutions (BITS) engineers custom enterprise operations software, BITScrm collections core, autonomous voice AI agents (BITSagent), and compliance-ready ERP tailored to real-world workflows in the Philippines and globally.",
  keywords: [
    "Boundless IT Solutions",
    "Boundless IT Solutions Philippines",
    "boundless it solutions",
    "BITS",
    "BITScrm",
    "BITS CRM",
    "BITSagent",
    "BITS Tap",
    "BITS Collections CRM",
    "BITS Accounting ERP",
    "BITS HRMS Payroll",
    "BITS Construction Software",
    "enterprise operations software Philippines",
    "business-specific software",
    "operational technology",
    "collections CRM software",
    "AI voice agents Philippines",
    "debt collection software Philippines",
    "BPO software platform",
    "banking operational infrastructure",
    "predictive dialer CRM",
    "supervisory call monitoring",
    "Philippine payroll TRAIN law compliance",
    "custom enterprise software engineering",
    "white label enterprise SaaS platform",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google645361b8cef93e08",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.legalName,
    title: "Boundless IT Solutions (BITS) — Enterprise Operations Software, Collections CRM & AI Infrastructure",
    description:
      "Boundless IT Solutions (BITS) engineers custom enterprise operations software, BITScrm collections core, autonomous voice AI agents (BITSagent), and compliance-ready ERP tailored to real-world workflows.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Boundless IT Solutions (BITS) Enterprise Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boundless IT Solutions (BITS) — Enterprise Operations Software, Collections CRM & AI Infrastructure",
    description:
      "Boundless IT Solutions (BITS) engineers custom enterprise operations software, BITScrm collections core, autonomous voice AI agents (BITSagent), and compliance-ready ERP tailored to real-world workflows.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06162F",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      legalName: "Boundless IT Solutions",
      alternateName: [
        "Boundless IT Solutions",
        "BITS",
        "BITScrm",
        "BITS CRM",
        "BITSagent",
        "BITS Tap",
        "Boundless IT Solutions Philippines",
        "Boundless IT",
      ],
      url: site.url,
      logo: `${site.url}/brand/logo-horizontal.png`,
      image: `${site.url}/og.png`,
      description: site.description,
      slogan: site.tagline,
      areaServed: {
        "@type": "Country",
        name: "Philippines",
        identifier: "PH",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "PH",
        addressRegion: "NCR",
        addressLocality: "Metro Manila",
      },
      knowsAbout: [
        "Enterprise Software Engineering",
        "Collections CRM Software",
        "Predictive Dialer Telephony",
        "Autonomous Voice AI Agents",
        "Accounting and Financial ERP Systems",
        "Philippine Payroll Compliance and TRAIN Law",
        "Smart NFC Hardware and Dynamic Identity",
        "Omnichannel Contact Center Operations",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: site.inquiryEmail,
        contactType: "Customer Support and Inquiries",
        areaServed: "PH",
        availableLanguage: ["English", "Filipino"],
      },
      publishingPrinciples: `${site.url}/legal`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: "Boundless IT Solutions (BITS)",
      alternateName: ["Boundless IT Solutions", "BITS", "BITScrm"],
      url: site.url,
      inLanguage: "en-PH",
      description: site.description,
      publisher: {
        "@id": `${site.url}/#organization`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#platform`,
      name: "BITS Enterprise Technology Platform",
      alternateName: [
        "Boundless IT Solutions Platform",
        "BITScrm Suite",
        "BITS Suite",
      ],
      applicationCategory: "BusinessApplication, CRMApplication",
      operatingSystem: "Web, Managed Cloud, Sovereign On-Premises, Linux, Windows",
      inLanguage: "en-PH",
      description: site.description,
      url: site.url,
      publisher: {
        "@id": `${site.url}/#organization`,
      },
      brand: {
        "@type": "Brand",
        name: "Boundless IT Solutions",
        alternateName: "BITS",
      },
      offers: {
        "@type": "OfferCatalog",
        name: "BITS Solution Tiers",
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
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} overflow-x-clip`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
