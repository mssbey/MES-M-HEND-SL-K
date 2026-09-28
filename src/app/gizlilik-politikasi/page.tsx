import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/sections/LegalDocumentView";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { privacyDocument } from "@/content/legal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/gizlilik-politikasi";

export const metadata: Metadata = pageMetadata({
  title: privacyDocument.title,
  description: privacyDocument.description,
  path,
  noIndex: !siteConfig.legal.reviewed,
});

export default function GizlilikPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: privacyDocument.title, path }])} />
      <PageHero
        crumbs={[{ name: privacyDocument.title, path }]}
        eyebrow="Yasal bilgilendirme"
        title={privacyDocument.title}
      />
      <LegalDocumentView doc={privacyDocument} />
    </>
  );
}
