import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Faq, Service } from "@/content/services";

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path === "/" ? "" : path}`;

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Başlık şablonunu (| MES Mühendislik) atlamak için. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle, noIndex }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.shortName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.slogan}`,
};

const ORG_ID = `${siteConfig.url}/#organization`;

export function organizationJsonLd() {
  const { contact, address, serviceArea, social } = siteConfig;
  const sameAs = Object.values(social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: "MES",
    url: siteConfig.url,
    logo: absoluteUrl("/brand/mes-logo.png"),
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    email: contact.email,
    telephone: contact.phoneE164,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      name: contact.person,
      telephone: contact.phoneE164,
      email: contact.email,
      availableLanguage: ["tr"],
    },
    ...(address ? { address: { "@type": "PostalAddress", ...address } } : {}),
    ...(serviceArea ? { areaServed: serviceArea } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "tr-TR",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Ana Sayfa", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/hizmetler/${service.slug}`)}#service`,
    name: service.title,
    serviceType: service.shortTitle,
    description: service.metaDescription,
    url: absoluteUrl(`/hizmetler/${service.slug}`),
    provider: { "@id": ORG_ID },
    ...(siteConfig.serviceArea ? { areaServed: siteConfig.serviceArea } : {}),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
