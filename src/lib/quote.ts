/** Teklif formu için istemci ve sunucuda ortak kullanılan doğrulama. */

export const OTHER_SERVICE = "diger";

export interface QuoteInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
}

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

export const CONSENT_TEXT =
  "KVKK Aydınlatma Metni'ni okudum; paylaştığım kişisel verilerin talebimin değerlendirilmesi ve benimle iletişime geçilmesi amacıyla işlenmesine açık rıza veriyorum.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeQuote(raw: Record<string, unknown>): QuoteInput {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  return {
    name: str(raw.name, 120),
    phone: str(raw.phone, 40),
    email: str(raw.email, 160),
    service: str(raw.service, 80),
    message: str(raw.message, 4000),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateQuote(input: QuoteInput, validServices: string[]): QuoteErrors {
  const errors: QuoteErrors = {};
  if (input.name.length < 3) errors.name = "Lütfen adınızı ve soyadınızı yazın.";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) errors.phone = "Lütfen geçerli bir telefon numarası yazın.";
  if (input.email && !EMAIL_RE.test(input.email)) errors.email = "E-posta adresi geçerli görünmüyor.";
  if (!validServices.includes(input.service) && input.service !== OTHER_SERVICE)
    errors.service = "Lütfen bir hizmet türü seçin.";
  if (input.message.length < 10) errors.message = "Lütfen projenizi veya işinizi birkaç cümleyle anlatın.";
  if (!input.consent) errors.consent = "Talebinizi iletebilmemiz için onayınız gereklidir.";
  return errors;
}

/** Form içeriğini e-posta / WhatsApp ile iletmek için düz metne çevirir. */
export function quoteToText(input: QuoteInput, serviceLabel: string) {
  return [
    "Teklif talebi",
    `Ad soyad: ${input.name}`,
    `Telefon: ${input.phone}`,
    input.email ? `E-posta: ${input.email}` : null,
    `Hizmet: ${serviceLabel}`,
    "",
    input.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
