import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#124294",
    theme_color: "#124294",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon", purpose: "any" },
      { src: "/icon-48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/icon-96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/icon-144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/brand/mark-tile.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
