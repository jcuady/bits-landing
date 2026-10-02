import type { MetadataRoute } from "next";
import { bitsProducts, site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable release / update date for search engines (W3C Datetime format)
  // Prevents invalidating Google's crawl cache on every millisecond fetch
  const lastModified = new Date("2026-09-30T00:00:00.000Z");

  const productEntries: MetadataRoute.Sitemap = bitsProducts.map((p) => ({
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
      url: `${site.url}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
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
      url: `${site.url}/bitscrm`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/bitsagent`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${site.url}/products/crm`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
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
  ];
}

