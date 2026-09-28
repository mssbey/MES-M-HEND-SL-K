import type { Metadata } from "next";
import Link from "next/link";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { UiIcon } from "@/components/icons/UiIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachSteps } from "@/content/company";
import { getServicesByGroup, serviceGroups, services, type ServiceGroupId } from "@/content/services";
import { quoteHref } from "@/lib/links";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/hizmetler";

export const metadata: Metadata = pageMetadata({
  title: "Hizmetler",
  description:
    "Mekanik tesisat ve doğalgaz projelendirme, yangın tesisatı, havalandırma ve iklimlendirme, sıhhi tesisat ile klima, kombi ve radyatör sistemlerinde mühendislik hizmetleri.",
  path,
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MES Mühendislik Çözümleri hizmetleri",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: absoluteUrl(`/hizmetler/${s.slug}`),
  })),
};

export default function HizmetlerPage() {
  const groupIds = Object.keys(serviceGroups) as ServiceGroupId[];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Hizmetler", path }]), itemListJsonLd]} />
      <PageHero
        crumbs={[{ name: "Hizmetler", path }]}
        eyebrow="Hizmetlerimiz"
        title="Mekanik sistemlerin tamamı için tek bir muhatap."
        lead="Projelendirmeden kuruluma, bakımdan iyileştirmeye kadar binanın mekanik altyapısıyla ilgili ihtiyaçlarınızı aynı mühendislik disipliniyle karşılıyoruz."
        actions={
          <>
            <ButtonLink href={quoteHref()} size="lg" icon="arrow-right">
              Teklif Al
            </ButtonLink>
            <ButtonLink href="#proje-tesisat" variant="secondary" size="lg">
              Hizmetlere göz atın
            </ButtonLink>
          </>
        }
      />

      {groupIds.map((gid, gi) => {
        const items = getServicesByGroup(gid);
        return (
          <section
            key={gid}
            id={gid}
            aria-labelledby={`${gid}-baslik`}
            className={`py-20 sm:py-24 lg:py-28 ${gi % 2 === 1 ? "border-y border-line bg-bone" : ""}`}
          >
            <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading
                  id={`${gid}-baslik`}
                  index={String(gi + 1).padStart(2, "0")}
                  eyebrow="Hizmet grubu"
                  title={serviceGroups[gid].title}
                  lead={serviceGroups[gid].description}
                />
              </div>
              <ul className="grid gap-5">
                {items.map((service) => {
                  const number = services.indexOf(service) + 1;
                  return (
                    <li key={service.slug}>
                      <article className="group relative grid gap-6 border border-line bg-white p-6 transition-colors duration-300 hover:border-navy-900/30 sm:grid-cols-[auto_1fr] sm:p-8">
                        <span className="grid size-16 place-items-center border border-line text-navy-900 transition-colors group-hover:text-accent-600">
                          <ServiceIcon name={service.icon} className="size-11" />
                        </span>
                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="text-xl font-bold tracking-[-0.02em] text-navy-900 sm:text-[1.375rem]">
                              <Link
                                href={`/hizmetler/${service.slug}`}
                                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-500"
                              >
                                {service.title}
                              </Link>
                            </h3>
                            <span className="font-mono text-[0.75rem] text-navy-900/40">
                              {String(number).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="mt-1 text-[0.9375rem] font-medium text-accent-600">{service.tagline}</p>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
                          <ul className="mt-5 grid gap-2 sm:grid-cols-3 sm:gap-4">
                            {service.highlights.map((h) => (
                              <li key={h} className="flex gap-2 text-sm leading-snug text-navy-900/85">
                                <UiIcon name="check" className="mt-0.5 size-4 shrink-0 text-accent-600" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <span
                            aria-hidden="true"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
                          >
                            Hizmet detayları
                            <UiIcon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="hizmet-surec" className="border-t border-line py-20 sm:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            id="hizmet-surec"
            eyebrow="Nasıl çalışıyoruz"
            title="Her hizmette aynı disiplin."
            lead="Kapsam ne olursa olsun işe ihtiyacı anlamakla başlar, testlerle doğrulanmış bir teslimle bitiririz."
          />
          <div className="mt-14 lg:mt-20">
            <ProcessSteps steps={approachSteps} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
