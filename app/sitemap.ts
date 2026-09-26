import type { MetadataRoute } from "next";
import { bitsProducts, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const productEntries: MetadataRoute.Sitemap = bitsProducts.map((p) => ({
    url: `${site.url}/products/${p.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: p.isFlagship ? 0.9 : 0.8,
  }));

  return [
    { url: site.url, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${site.url}/bitscrm`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/bitsagent`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/products/crm`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/products/white-label`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    ...productEntries,
    { url: `${site.url}/brandbook`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/legal`, lastModified: currentDate, changeFrequency: "yearly", priority: 0.3 },
  ];
}


