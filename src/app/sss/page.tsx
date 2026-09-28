import type { Metadata } from "next";
import Link from "next/link";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { generalFaqs } from "@/content/faq";
import { services } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const path = "/sss";

export const metadata: Metadata = pageMetadata({
  title: "Sık Sorulan Sorular",
  description:
    "Teklif süreci, proje ve uygulama kapsamı, doğalgaz, yangın, klima, kombi ve radyatör sistemleri hakkında sık sorulan sorular ve yanıtları.",
  path,
});

export default function SssPage() {
  const allFaqs = [...generalFaqs, ...services.flatMap((s) => s.faqs)];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Sık Sorulan Sorular", path }]), faqJsonLd(allFaqs)]} />
      <PageHero
        crumbs={[{ name: "Sık Sorulan Sorular", path }]}
        eyebrow="Sık sorulan sorular"
        title="Aklınızdaki sorulara açık yanıtlar."
        lead="Teklif sürecinden teknik ayrıntılara kadar en çok merak edilen konuları derledik. Yanıtını bulamadığınız sorular için bize doğrudan ulaşabilirsiniz."
      />

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-20 lg:py-24">
        <aside className="hidden lg:block">
          <nav aria-label="Soru kategorileri" className="sticky top-32">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy-900/50">Kategoriler</p>
            <ol className="mt-4 grid border-l border-line text-[0.9375rem]">
              <li>
                <a href="#genel" className="-ml-px block border-l border-transparent py-2 pl-4 font-medium text-muted hover:border-navy-900 hover:text-navy-900">
                  Genel sorular
                </a>
              </li>
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="-ml-px block border-l border-transparent py-2 pl-4 font-medium text-muted hover:border-navy-900 hover:text-navy-900"
                  >
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="grid min-w-0 gap-16">
          <section id="genel" aria-labelledby="genel-baslik">
            <h2 id="genel-baslik" className="mb-6 text-2xl font-bold tracking-[-0.02em] text-navy-900 sm:text-[1.75rem]">
              Genel sorular
            </h2>
            <FaqList items={generalFaqs} />
          </section>

          {services.map((s) => (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-sss`}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 id={`${s.slug}-sss`} className="flex items-center gap-3 text-2xl font-bold tracking-[-0.02em] text-navy-900 sm:text-[1.75rem]">
                  <ServiceIcon name={s.icon} className="size-8 text-accent-600" />
                  {s.shortTitle}
                </h2>
                <Link href={`/hizmetler/${s.slug}`} className="text-sm font-semibold text-navy-900 underline underline-offset-4">
                  Hizmet detayları
                </Link>
              </div>
              <FaqList items={s.faqs} />
            </section>
          ))}
        </div>
      </div>

      <CtaBand title="Sorunuzun yanıtını bulamadınız mı?" text="Projenizle ilgili her soruyu doğrudan yanıtlamaktan memnuniyet duyarız." />
    </>
  );
}
