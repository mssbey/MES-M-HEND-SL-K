import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/hizmetler", priority: 0.9 },
    ...services.map((s) => ({ path: `/hizmetler/${s.slug}`, priority: 0.8 })),
    { path: "/kurumsal", priority: 0.7 },
    { path: "/projeler", priority: 0.6 },
    { path: "/sss", priority: 0.6 },
    { path: "/iletisim", priority: 0.8 },
    // Yasal metinler onaylanana kadar arama motorlarına kapalıdır.
    ...(siteConfig.legal.reviewed
      ? [
          { path: "/gizlilik-politikasi", priority: 0.2 },
          { path: "/kvkk-aydinlatma-metni", priority: 0.2 },
        ]
      : []),
  ];
  return pages.map(({ path, priority }) => ({ url: absoluteUrl(path), lastModified, priority }));
}
