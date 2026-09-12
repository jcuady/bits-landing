import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#06162f",
    theme_color: "#06162f",
    icons: [
      { src: "/brand/mark-tile.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
