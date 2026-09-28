import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard, ProjectsEmptyState } from "@/components/sections/Projects";
import { ProjectsBrowser } from "@/components/sections/ProjectsBrowser";
import { JsonLd } from "@/components/ui/JsonLd";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/projeler";

export const metadata: Metadata = pageMetadata({
  title: "Projeler ve Referanslar",
  description:
    "MES Mühendislik Çözümleri proje ve referansları: mekanik tesisat, iklimlendirme, yangın ve ısıtma sistemlerinde kapsamı ve çözümüyle çalışmalar.",
  path,
});

export default function ProjelerPage() {
  const usedServices = services.filter((s) => projects.some((p) => p.services.includes(s.slug)));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projeler", path }])} />
      <PageHero
        crumbs={[{ name: "Projeler", path }]}
        eyebrow="Projeler ve referanslar"
        title="Kapsamı net, çözümü belgelenmiş işler."
        lead="Her projede işin kapsamını, kullanılan sistemleri ve çözülen teknik problemleri açıkça paylaşıyoruz. Referanslarımızı yalnızca doğrulanmış bilgiler ve müşterilerimizin onayıyla yayımlıyoruz."
      />
      <section aria-label="Proje listesi" className="py-16 sm:py-20 lg:py-24">
        <div className="container-site">
          {projects.length > 0 ? (
            <ProjectsBrowser
              filters={usedServices.map((s) => ({ slug: s.slug, label: s.shortTitle }))}
              items={projects.map((p) => ({ key: p.slug, services: p.services, card: <ProjectCard project={p} /> }))}
            />
          ) : (
            <ProjectsEmptyState />
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
