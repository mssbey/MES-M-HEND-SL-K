import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { CONSENT_TEXT, OTHER_SERVICE, normalizeQuote, validateQuote } from "@/lib/quote";

/**
 * Teklif formu uç noktası.
 *
 * Gönderim altyapısı ortam değişkenleriyle yapılandırılır (bkz. README):
 *   QUOTE_WEBHOOK_URL    — Talebin JSON olarak POST edileceği adres
 *                          (Formspree, Make, Zapier, n8n veya kendi sunucunuz).
 *   QUOTE_WEBHOOK_TOKEN  — (isteğe bağlı) "Authorization: Bearer" başlığı.
 *
 * Yapılandırma yoksa 503 döner; arayüz bu durumda başarı mesajı göstermez,
 * ziyaretçiyi e-posta / WhatsApp ile iletmeye yönlendirir.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, code: "BAD_REQUEST" }, { status: 400 });
  }

  // Bot tuzağı: gerçek kullanıcılar bu alanı görmez.
  if (typeof raw.company_website === "string" && raw.company_website.length > 0) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, code: "RATE_LIMITED" }, { status: 429 });
  }

  const input = normalizeQuote(raw);
  const errors = validateQuote(
    input,
    services.map((s) => s.slug),
  );
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, code: "INVALID", errors }, { status: 422 });
  }

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ ok: false, code: "NOT_CONFIGURED" }, { status: 503 });
  }

  const serviceTitle =
    input.service === OTHER_SERVICE
      ? "Birden fazla hizmet / emin değilim"
      : (services.find((s) => s.slug === input.service)?.title ?? input.service);

  const payload = {
    source: siteConfig.url,
    submittedAt: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    email: input.email || null,
    service: serviceTitle,
    serviceSlug: input.service,
    message: input.message,
    consent: { given: true, text: CONSENT_TEXT },
    _subject: `Teklif talebi: ${serviceTitle} — ${input.name}`,
    ...(input.email ? { _replyto: input.email } : {}),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(process.env.QUOTE_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.QUOTE_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[teklif] webhook yanıtı başarısız:", res.status);
      return Response.json({ ok: false, code: "DELIVERY_FAILED" }, { status: 502 });
    }
  } catch (error) {
    console.error("[teklif] webhook hatası:", error);
    return Response.json({ ok: false, code: "DELIVERY_FAILED" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
