import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 90],
  },
  /**
   * CPO Rev 2 — flagship canonicalisation.
   *
   * Operations 360 is the platform; BITScrm and BITSagent AI are modules
   * inside it. These 301s move the flagship onto an obvious URL and demote
   * the two standalone product pages to modules.
   *
   * DELIBERATELY NOT REDIRECTED YET (needs a separate decision):
   *   /products/crm, /products/sales, /products/support,
   *   /products/marketing, /products/commerce
   * These are genuine catalogue products. Redirecting them would retire
   * catalogue entries, which conflicts with the "keep all 22" instruction.
   * They remain the main source of self-cannibalisation (see CPO doc C2).
   *
   * /crm-sales/* is live product demo — never redirect.
   */
  async redirects() {
    return [
      // Flagship: the platform now owns the head term
      { source: "/products/collections", destination: "/operations-360", permanent: true },
      // Modules: CRM and AI are no longer rival products
      { source: "/bitscrm", destination: "/operations-360/crm", permanent: true },
      { source: "/bitsagent", destination: "/operations-360/ai", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/app/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(og.png|icon.png|icon-48.png|icon-192.png|icon-512.png|apple-icon.png|favicon.ico|favicon.png)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(llms.txt|llms-full.txt|index.md|bitscrm.md|bitsagent.md)",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Vary", value: "Accept" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
