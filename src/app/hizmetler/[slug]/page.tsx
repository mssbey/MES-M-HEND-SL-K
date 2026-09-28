import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { UiIcon } from "@/components/icons/UiIcon";
import { ServiceDrawing } from "@/components/illustrations/ServiceDrawing";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { JsonLd } from "@/components/ui/JsonLd";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getService, serviceGroups, services } from "@/content/services";
import { quoteHref, telHref, whatsappHref, whatsappMessage } from "@/lib/links";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/hizmetler/${service.slug}`,
  });
}

export default async function ServicePage(props: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/hizmetler/${service.slug}`;
  const related = services.filter((s) => s.slug !== service.slug && s.group === service.group).slice(0, 3);
  const others = related.length < 3 ? services.filter((s) => s.group !== service.group).slice(0, 3 - related.length) : [];
  const toc = [
    { id: "kapsam", label: "Hizmet kapsamı" },
    { id: "surec", label: "Çalışma süreci" },
    { id: "kimler-icin", label: "Kimler için uygun" },
    ...(service.note ? [{ id: "onemli-not", label: service.note.title }] : []),
    { id: "sorular", label: "Sık sorulan sorular" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Hizmetler", path: "/hizmetler" },
            { name: service.title, path },
          ]),
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Hizmetler", path: "/hizmetler" },
          { name: service.title, path },
        ]}
        eyebrow={serviceGroups[service.group].title}
        title={service.title}
        lead={service.intro}
        actions={
          <>
            <ButtonLink href={quoteHref(service.slug)} size="lg" icon="arrow-right">
              Teklif Al
            </ButtonLink>
            <ButtonLink
              href={whatsappHref(whatsappMessage(service.shortTitle))}
              variant="secondary"
              size="lg"
              icon="whatsapp"
              iconLeading
              external
            >
              WhatsApp ile sorun
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative">
            <div className="bg-white p-2 shadow-[0_40px_80px_-40px_rgb(20_36_70/0.45)] sm:p-3">
              {service.image ? (
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              ) : (
                <ServiceDrawing service={service} />
              )}
            </div>
            <CornerMarks className="text-navy-900/40" size={16} />
          </div>
        }
      />

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-20 lg:py-24">
        {/* Sayfa içi gezinme */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <nav aria-label="Sayfa içeriği">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-navy-900/50">Bu sayfada</p>
              <ol className="mt-4 grid border-l border-line">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px flex gap-3 border-l border-transparent py-2 pl-4 text-[0.9375rem] font-medium text-muted transition-colors hover:border-navy-900 hover:text-navy-900"
                    >
                      <span className="font-mono text-[0.75rem] leading-6 text-navy-900/40">0{i + 1}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-10 border border-line bg-bone p-5">
              <p className="text-[0.9375rem] font-semibold text-navy-900">Projeniz için bilgi alın</p>
              <a
                href={telHref}
                className="mt-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-navy-900 hover:underline"
              >
                <UiIcon name="phone" className="size-4 text-accent-600" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <ButtonLink href={quoteHref(service.slug)} className="mt-4 w-full">
                Teklif formu
              </ButtonLink>
            </div>
          </div>
        </aside>

        <div className="grid min-w-0 gap-20 lg:gap-24">
          {/* Kapsam */}
          <section id="kapsam" aria-labelledby="kapsam-baslik">
            <Eyebrow index="01">Hizmet kapsamı</Eyebrow>
            <h2 id="kapsam-baslik" className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-navy-900 sm:text-4xl">
              {service.tagline}
            </h2>
            <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item.title} className="bg-white p-6 sm:p-7">
                  <h3 className="flex items-start gap-3 text-[1.0625rem] font-bold tracking-[-0.01em] text-navy-900">
                    <UiIcon name="check" className="mt-0.5 size-5 shrink-0 text-accent-600" strokeWidth={2} />
                    {item.title}
                  </h3>
                  <p className="mt-2.5 pl-8 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Süreç */}
          <section id="surec" aria-labelledby="surec-baslik">
            <Eyebrow index="02">Çalışma süreci</Eyebrow>
            <h2 id="surec-baslik" className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-navy-900 sm:text-4xl">
              Adım adım, öngörülebilir bir süreç.
            </h2>
            <div className="mt-10">
              <ProcessSteps steps={service.process} layout="vertical" />
            </div>
          </section>

          {/* Kimler için */}
          <section id="kimler-icin" aria-labelledby="kimler-baslik">
            <Eyebrow index="03">Kimler için uygun</Eyebrow>
            <h2 id="kimler-baslik" className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-navy-900 sm:text-4xl">
              Bu hizmet kimin işine yarar?
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.audiences.map((a) => (
                <li key={a.title} className="relative border border-line bg-bone p-6">
                  <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em] text-navy-900">{a.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{a.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {service.note && (
            <section id="onemli-not" aria-labelledby="not-baslik">
              <div className="flex gap-5 border-l-2 border-accent-500 bg-accent-50 p-6 sm:p-8">
                <UiIcon name="info" className="mt-0.5 size-6 shrink-0 text-accent-600" />
                <div>
                  <h2 id="not-baslik" className="text-lg font-bold tracking-[-0.01em] text-navy-900">
                    {service.note.title}
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-900/80">{service.note.text}</p>
                </div>
              </div>
            </section>
          )}

          {/* SSS */}
          <section id="sorular" aria-labelledby="sorular-baslik">
            <Eyebrow index={service.note ? "05" : "04"}>Sık sorulan sorular</Eyebrow>
            <h2 id="sorular-baslik" className="mb-8 mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-navy-900 sm:text-4xl">
              {service.shortTitle} hakkında merak edilenler
            </h2>
            <FaqList items={service.faqs} />
            <p className="mt-6 text-[0.9375rem] text-muted">
              Başka sorularınız mı var?{" "}
              <Link href="/sss" className="font-semibold text-navy-900 underline underline-offset-4">
                Tüm soruları inceleyin
              </Link>{" "}
              veya{" "}
              <Link href={quoteHref(service.slug)} className="font-semibold text-navy-900 underline underline-offset-4">
                bize yazın
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      {/* Diğer hizmetler */}
      <section aria-labelledby="diger-hizmetler" className="border-t border-line bg-bone py-16 sm:py-20">
        <div className="container-site">
          <h2 id="diger-hizmetler" className="text-2xl font-bold tracking-[-0.02em] text-navy-900">
            İlgili hizmetler
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[...related, ...others].map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group flex h-full items-center gap-4 border border-line bg-white p-5 transition-colors hover:border-navy-900/30"
                >
                  <span className="grid size-12 shrink-0 place-items-center border border-line text-navy-900 group-hover:text-accent-600">
                    <ServiceIcon name={s.icon} className="size-7" />
                  </span>
                  <span className="flex-1 font-semibold leading-snug text-navy-900">{s.title}</span>
                  <UiIcon name="arrow-right" className="size-4 shrink-0 text-navy-900/50 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`${service.shortTitle} için teklif alın.`}
        text="Projenizi ya da ihtiyacınızı kısaca anlatın; kapsamı netleştirip size açık ve anlaşılır bir teklif sunalım."
        service={service}
      />
    </>
  );
}
