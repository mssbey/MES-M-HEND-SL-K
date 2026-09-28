import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { UiIcon, type UiIconName } from "@/components/icons/UiIcon";
import { PageHero } from "@/components/sections/PageHero";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { mailHref, telHref, whatsappHref, whatsappMessage } from "@/lib/links";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/iletisim";

export const metadata: Metadata = pageMetadata({
  title: "İletişim ve Teklif Talebi",
  description:
    "MES Mühendislik Çözümleri ile telefon, e-posta veya WhatsApp üzerinden iletişime geçin ya da teklif formunu doldurarak projenizi anlatın.",
  path,
});

const steps = [
  "Formu doldurun veya bizi arayın.",
  "Projenizi dinleyip gerekli belgeleri ya da keşif ihtiyacını belirleyelim.",
  "Kapsamı netleştirip size yazılı bir teklif sunalım.",
];

export default function IletisimPage() {
  const { contact, address, workingHours } = siteConfig;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "İletişim", path }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "İletişim ve Teklif Talebi",
            url: `${siteConfig.url}${path}`,
            about: { "@id": `${siteConfig.url}/#organization` },
          },
        ]}
      />
      <PageHero
        crumbs={[{ name: "İletişim", path }]}
        eyebrow="İletişim ve teklif"
        title="Projenizi anlatın, birlikte değerlendirelim."
        lead="Teklif formunu doldurabilir, bizi arayabilir ya da WhatsApp üzerinden yazabilirsiniz. Talebinizi inceleyip sizinle iletişime geçelim."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* İletişim kanalları */}
          <div className="grid content-start gap-8">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy-900">Doğrudan iletişim</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">
                İlgili kişi: <strong className="font-semibold text-navy-900">{contact.person}</strong>
              </p>
            </div>
            <ul className="grid gap-3">
              <ContactRow icon="phone" label="Telefon" href={telHref}>
                {contact.phoneDisplay}
              </ContactRow>
              <ContactRow icon="whatsapp" label="WhatsApp" href={whatsappHref(whatsappMessage())} external>
                Mesaj gönderin
              </ContactRow>
              <ContactRow icon="mail" label="E-posta" href={mailHref("Bilgi talebi")}>
                {contact.email}
              </ContactRow>
              <ContactRow icon="globe" label="Web">
                {contact.website}
              </ContactRow>
              {address && (
                <ContactRow icon="pin" label="Adres">
                  {`${address.streetAddress}, ${address.postalCode} ${address.addressLocality}/${address.addressRegion}`}
                </ContactRow>
              )}
              {workingHours && (
                <ContactRow icon="clock" label="Çalışma saatleri">
                  {workingHours}
                </ContactRow>
              )}
            </ul>

            <div className="relative overflow-hidden bg-navy-900 p-7 text-white">
              <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0" />
              <div className="relative">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-300">Süreç nasıl işler?</p>
                <ol className="mt-5 grid gap-4">
                  {steps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-navy-100">
                      <span className="font-mono text-sm text-accent-300">0{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Teklif formu */}
          <div id="teklif" className="relative scroll-mt-28 border border-line bg-bone p-5 sm:p-8 lg:p-10">
            <CornerMarks className="text-navy-900/40" size={14} />
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy-900 sm:text-[1.75rem]">Teklif talep formu</h2>
            <p className="mt-2 text-[0.9375rem] text-muted">
              Ne kadar ayrıntı paylaşırsanız, size o kadar isabetli bir ön değerlendirme sunabiliriz.
            </p>
            <div className="mt-8">
              <QuoteForm services={services.map((s) => ({ slug: s.slug, label: s.shortTitle }))} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  href,
  external,
  children,
}: {
  icon: UiIconName;
  label: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center border border-line bg-white text-accent-600">
        <UiIcon name={icon} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="block truncate text-[1.0625rem] font-semibold text-navy-900">{children}</span>
      </span>
      {href && <UiIcon name="arrow-up-right" className="size-4 shrink-0 text-navy-900/40 transition-colors group-hover:text-navy-900" />}
    </>
  );
  const cls = "group flex items-center gap-4 border border-line bg-white p-3.5 pr-5";
  return (
    <li>
      {href ? (
        <a
          href={href}
          className={`${cls} transition-colors hover:border-navy-900/40`}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}
