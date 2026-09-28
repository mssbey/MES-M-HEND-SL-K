import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "MES",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#142446",
    lang: "tr",
    icons: [
      { src: "/brand/mes-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/mes-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
