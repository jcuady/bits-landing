import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = ["/app/", "/api/", "/login", "/forgot-password"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      // OpenAI ChatGPT, SearchGPT & Operators
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "OAI-AdsBot"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Anthropic Claude
      {
        userAgent: ["ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Perplexity AI
      {
        userAgent: ["PerplexityBot", "Perplexity-User"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Google Gemini, Search & Agents
      {
        userAgent: ["Google-Extended", "Google-Agent", "Googlebot"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Microsoft Bing & Copilot
      {
        userAgent: ["Bingbot", "msnbot"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Apple Intelligence & Siri Web Search
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Common Crawl & Open Research
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: disallowedPaths,
      },

    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

