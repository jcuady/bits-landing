import type { MetadataRoute } from "next";
import { bitsProducts, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries: MetadataRoute.Sitemap = bitsProducts.map((p) => ({
    url: `${site.url}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p.isFlagship ? 0.9 : 0.8,
  }));

  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/bitscrm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/bitsagent`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...productEntries,
    { url: `${site.url}/legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
