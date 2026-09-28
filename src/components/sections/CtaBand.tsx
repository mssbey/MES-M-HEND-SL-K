import { UiIcon } from "@/components/icons/UiIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { mailHref, quoteHref, telHref, whatsappHref, whatsappMessage } from "@/lib/links";

interface CtaBandProps {
  title?: string;
  text?: string;
  /** Hizmet sayfalarında formu ve WhatsApp mesajını önceden doldurmak için. */
  service?: { slug: string; shortTitle: string };
}

/** Sayfa sonlarındaki güçlü iletişim çağrısı. */
export function CtaBand({
  title = "Projenizi birlikte değerlendirelim.",
  text = "Yeni bir yapı, kapsamlı bir tadilat ya da tek bir sistem… İhtiyacınızı anlatın; kapsamı, süreci ve teklifi açık biçimde ortaya koyalım.",
  service,
}: CtaBandProps) {
  const { contact } = siteConfig;
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[34rem] rounded-full border border-white/10 [box-shadow:0_0_0_60px_rgb(255_255_255/0.02),0_0_0_120px_rgb(255_255_255/0.015)]"
      />
      <div className="container-site relative grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-24">
        <div>
          <Eyebrow tone="dark">Teklif ve iletişim</Eyebrow>
          <h2 id="cta-title" className="mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-navy-200">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref(service?.slug)} variant="light" size="lg" icon="arrow-right">
              Teklif Al
            </ButtonLink>
            <ButtonLink
              href={whatsappHref(whatsappMessage(service?.shortTitle))}
              variant="outline-light"
              size="lg"
              icon="whatsapp"
              iconLeading
              external
            >
              WhatsApp ile yazın
            </ButtonLink>
          </div>
        </div>

        <div className="border border-white/15 bg-navy-950/40 p-6 backdrop-blur-sm sm:p-8">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-300">Doğrudan iletişim</p>
          <p className="mt-3 text-lg font-semibold">{contact.person}</p>
          <ul className="mt-5 grid gap-1">
            <li>
              <a href={telHref} className="group flex items-center justify-between gap-4 border-t border-white/10 py-4">
                <span className="flex items-center gap-3">
                  <UiIcon name="phone" className="size-5 text-accent-300" />
                  <span className="text-lg font-semibold tracking-[-0.01em]">{contact.phoneDisplay}</span>
                </span>
                <UiIcon name="arrow-up-right" className="size-4 text-white/50 transition-colors group-hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href={mailHref(service ? `${service.shortTitle} hakkında` : undefined)}
                className="group flex items-center justify-between gap-4 border-t border-white/10 py-4"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <UiIcon name="mail" className="size-5 shrink-0 text-accent-300" />
                  <span className="truncate font-medium">{contact.email}</span>
                </span>
                <UiIcon name="arrow-up-right" className="size-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
