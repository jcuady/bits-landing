import type { MetadataRoute } from "next";
import { bitsProducts, site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";

/**
 * Slugs that permanently redirect elsewhere (see `redirects()` in next.config.ts).
 *
 * A sitemap entry that redirects is a wasted crawl signal — the URL is a
 * priority hint for a page that does not exist. Listing the flagship
 * Operations 360 pages instead concentrates that priority where it can rank.
 *
 * Keep in sync with next.config.ts redirects.
 */
const REDIRECTED_PRODUCT_SLUGS = new Set([
  "collections",
  "crm",
  "sales",
  "support",
  "marketing",
  "commerce",
  "ai-agent",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable release / update date for search engines (W3C Datetime format)
  // Prevents invalidating Google's crawl cache on every millisecond fetch
  const lastModified = new Date("2026-10-05T12:00:00.000Z");

  const productEntries: MetadataRoute.Sitemap = bitsProducts
    .filter((p) => !REDIRECTED_PRODUCT_SLUGS.has(p.id))
    .map((p) => ({
      url: `${site.url}/products/${p.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: p.isFlagship ? 0.9 : 0.8,
    }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.95 : 0.9,
  }));

  return [
    {
      // Operations 360 is the flagship platform and owns the head category terms.
      // Ranked above the homepage deliberately — it is the page we want indexed
      // for "top oms" / "collections crm" style queries.
      url: `${site.url}/operations-360`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${site.url}/operations-360/crm`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/operations-360/ai`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/blog`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/products`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/solutions`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${site.url}/pricing`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${site.url}/security`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${site.url}/products/white-label`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...productEntries,
    ...blogEntries,
    {
      url: `${site.url}/brandbook`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${site.url}/legal`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      // Public NPC/GDPR compliance disclosure — indexable, not a private page.
      url: `${site.url}/cookies`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}

