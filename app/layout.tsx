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
    default: "BITS — Enterprise Operations Software, Collections CRM & AI Infrastructure (Philippines)",
    template: "%s | BITS - Boundless IT Solutions",
  },
  description:
    "Eliminate disconnected spreadsheets and rigid SaaS. BITS engineers custom enterprise software, collections CRM, autonomous voice AI, and compliance-ready ERP tailored to your real workflows. Deployed on managed cloud or sovereign on-prem.",
  keywords: [
    "BITS",
    "Boundless IT Solutions",
    "enterprise operations software Philippines",
    "business-specific software",
    "operational technology",
    "collections CRM software",
    "BITScrm",
    "BITSagent",
    "AI voice agents",
    "debt collection software Philippines",
    "BPO software platform",
    "banking operational infrastructure",
    "predictive dialer CRM",
    "supervisory call monitoring",
    "Philippine payroll TRAIN law compliance",
    "custom enterprise software",
    "white label enterprise SaaS platform",
  ],
  alternates: { canonical: "/" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google645361b8cef93e08",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
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
    title: "BITS — Enterprise Operations Software, Collections CRM & AI Infrastructure",
    description:
      "Eliminate disconnected spreadsheets and rigid SaaS. BITS engineers custom enterprise software, collections CRM, autonomous voice AI, and compliance-ready ERP tailored to your real workflows.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Enterprise Technology Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITS — Enterprise Operations Software, Collections CRM & AI Infrastructure",
    description:
      "Eliminate disconnected spreadsheets and rigid SaaS. BITS engineers custom enterprise software, collections CRM, autonomous voice AI, and compliance-ready ERP tailored to your real workflows.",
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
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo-horizontal.png`,
      description: site.description,
      slogan: site.tagline,
      contactPoint: {
        "@type": "ContactPoint",
        email: site.inquiryEmail,
        contactType: "Customer Support and Inquiries",
      },
    },
    {
      "@type": "WebSite",
      name: site.legalName,
      url: site.url,
      description: site.description,
    },
    {
      "@type": "SoftwareApplication",
      name: "BITS Technology Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Cloud, On-Premises",
      description: site.description,
      url: site.url,
      publisher: { "@type": "Organization", name: site.legalName },
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
    <html lang="en" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
