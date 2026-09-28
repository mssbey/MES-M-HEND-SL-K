import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { UiIcon } from "@/components/icons/UiIcon";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { mailHref, telHref, whatsappHref, whatsappMessage } from "@/lib/links";

const corporateLinks = [
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler ve referanslar" },
  { href: "/sss", label: "Sık sorulan sorular" },
  { href: "/iletisim", label: "İletişim ve teklif" },
];

export function Footer() {
  const { contact, address, workingHours } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-60" />
      <div className="container-site relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block text-white" aria-label="MES Mühendislik Çözümleri — Ana sayfa">
              <Logo className="h-11 w-auto" />
            </Link>
            <p className="mt-6 text-lg font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-[0.9375rem] italic leading-relaxed text-navy-200">{siteConfig.slogan}</p>
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-300">
              Hizmetler
            </h2>
            <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="transition-colors hover:text-white">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-corporate" className="lg:col-span-2">
            <h2 id="footer-corporate" className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-300">
              Kurumsal
            </h2>
            <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
              {corporateLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-300">İletişim</h2>
            <address className="mt-5 grid gap-3.5 text-[0.9375rem] not-italic">
              <span className="flex items-center gap-3 text-white">
                <UiIcon name="user" className="size-4 shrink-0 text-accent-300" />
                {contact.person}
              </span>
              <a href={telHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <UiIcon name="phone" className="size-4 shrink-0 text-accent-300" />
                {contact.phoneDisplay}
              </a>
              <a
                href={whatsappHref(whatsappMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <UiIcon name="whatsapp" className="size-4 shrink-0 text-accent-300" />
                WhatsApp ile yazın
              </a>
              <a href={mailHref()} className="flex items-center gap-3 transition-colors hover:text-white">
                <UiIcon name="mail" className="size-4 shrink-0 text-accent-300" />
                {contact.email}
              </a>
              <span className="flex items-center gap-3">
                <UiIcon name="globe" className="size-4 shrink-0 text-accent-300" />
                {contact.website}
              </span>
              {address && (
                <span className="flex items-start gap-3">
                  <UiIcon name="pin" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                  {`${address.streetAddress}, ${address.postalCode} ${address.addressLocality}/${address.addressRegion}`}
                </span>
              )}
              {workingHours && (
                <span className="flex items-center gap-3">
                  <UiIcon name="clock" className="size-4 shrink-0 text-accent-300" />
                  {workingHours}
                </span>
              )}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.8125rem] text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/gizlilik-politikasi" className="hover:text-white">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="/kvkk-aydinlatma-metni" className="hover:text-white">
                KVKK Aydınlatma Metni
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
