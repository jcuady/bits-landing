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
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "OAI-AdsBot", "Operator"],
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
        userAgent: ["Google-Extended", "Google-Agent", "Googlebot", "Googlebot-Image"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Microsoft Bing & Copilot
      {
        userAgent: ["Bingbot", "msnbot", "BingPreview"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Apple Intelligence & Siri Web Search
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Meta & Social AI Agents
      {
        userAgent: ["Meta-ExternalAgent", "FacebookBot"],
        allow: "/",
        disallow: disallowedPaths,
      },
      // Cohere, Mistral & Amazon
      {
        userAgent: ["cohere-ai", "Amazonbot", "Bytespider", "DuckAssistBot"],
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
    host: new URL(site.url).host,
  };
}

