import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

export const telHref = `tel:${contact.phoneE164}`;

export function mailHref(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}

export function whatsappMessage(serviceTitle?: string) {
  return serviceTitle
    ? `Merhaba, ${serviceTitle.toLocaleLowerCase("tr-TR")} hizmetiniz hakkında bilgi ve teklif almak istiyorum.`
    : "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.";
}

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function quoteHref(serviceSlug?: string) {
  return serviceSlug ? `/iletisim?hizmet=${serviceSlug}#teklif` : "/iletisim#teklif";
}
