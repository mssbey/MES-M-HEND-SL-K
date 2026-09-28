import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/sections/LegalDocumentView";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { kvkkDocument } from "@/content/legal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/kvkk-aydinlatma-metni";

export const metadata: Metadata = pageMetadata({
  title: kvkkDocument.title,
  description: kvkkDocument.description,
  path,
  noIndex: !siteConfig.legal.reviewed,
});

export default function KvkkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: kvkkDocument.title, path }])} />
      <PageHero crumbs={[{ name: kvkkDocument.title, path }]} eyebrow="Yasal bilgilendirme" title={kvkkDocument.title} />
      <LegalDocumentView doc={kvkkDocument} />
    </>
  );
}
