"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { UiIcon } from "@/components/icons/UiIcon";
import { buttonClasses } from "@/components/ui/Button";
import { mailHref, telHref, whatsappHref } from "@/lib/links";
import {
  CONSENT_TEXT,
  OTHER_SERVICE,
  normalizeQuote,
  quoteToText,
  validateQuote,
  type QuoteErrors,
  type QuoteInput,
} from "@/lib/quote";

interface QuoteFormProps {
  services: { slug: string; label: string }[];
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "fallback"; reason: "not-configured" | "failed" | "rate-limited"; text: string };

const fieldOrder: (keyof QuoteInput)[] = ["name", "phone", "email", "service", "message", "consent"];

export function QuoteForm({ services }: QuoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const validSlugs = services.map((s) => s.slug);

  // ?hizmet=... parametresiyle gelen ziyaretçi için hizmet seçimini doldur.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("hizmet");
    const select = formRef.current?.elements.namedItem("service");
    if (slug && select instanceof HTMLSelectElement && validSlugs.includes(slug)) select.value = slug;
    // Yalnızca ilk yüklemede çalışır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "fallback") statusRef.current?.focus();
  }, [status.kind]);

  const labelFor = (slug: string) =>
    slug === OTHER_SERVICE ? "Birden fazla hizmet / emin değilim" : (services.find((s) => s.slug === slug)?.label ?? slug);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = normalizeQuote({ ...Object.fromEntries(data), consent: data.get("consent") === "on" });
    const found = validateQuote(input, validSlugs);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = fieldOrder.find((key) => found[key]);
      const el = first ? form.elements.namedItem(first) : null;
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const text = quoteToText(input, labelFor(input.service));
    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company_website: data.get("company_website") ?? "" }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: QuoteErrors };
      if (res.ok && body.ok) {
        setStatus({ kind: "success" });
        form.reset();
        return;
      }
      if (body.code === "INVALID" && body.errors) {
        setErrors(body.errors);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({
        kind: "fallback",
        reason: body.code === "NOT_CONFIGURED" ? "not-configured" : body.code === "RATE_LIMITED" ? "rate-limited" : "failed",
        text,
      });
    } catch {
      setStatus({ kind: "fallback", reason: "failed", text });
    }
  }

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-white p-8 focus:outline-none sm:p-10">
        <span className="grid size-12 place-items-center bg-navy-900 text-white">
          <UiIcon name="check" className="size-6" strokeWidth={2} />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-navy-900">Talebiniz bize ulaştı.</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          Bilgilerinizi inceleyip sizinle en kısa sürede iletişime geçeceğiz. Acil bir konu için bizi doğrudan
          arayabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-navy-900 underline underline-offset-4"
        >
          Yeni bir talep oluştur
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-6" aria-describedby={`${uid}-note`}>
      <p id={`${uid}-note`} className="text-sm text-muted">
        <span aria-hidden="true" className="text-accent-600">
          *
        </span>{" "}
        ile işaretli alanlar zorunludur.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Ad soyad" required error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field id={id("phone")} label="Telefon" required error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05xx xxx xx xx"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id("phone")}-error` : undefined}
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <Field id={id("email")} label="E-posta" hint="İsteğe bağlı" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field id={id("service")} label="Hizmet türü" required error={errors.service}>
          <div className="relative">
            <select
              id={id("service")}
              name="service"
              required
              defaultValue=""
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? `${id("service")}-error` : undefined}
              className={`${inputCls(!!errors.service)} appearance-none pr-10`}
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
              <option value={OTHER_SERVICE}>Birden fazla hizmet / emin değilim</option>
            </select>
            <UiIcon
              name="chevron-down"
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-900/60"
            />
          </div>
        </Field>
      </div>

      <Field
        id={id("message")}
        label="Proje / iş açıklaması"
        required
        hint="Yapının türü, yaklaşık büyüklüğü, konumu ve beklediğiniz takvim"
        error={errors.message}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          aria-invalid={!!errors.message}
          aria-describedby={`${id("message")}-hint${errors.message ? ` ${id("message")}-error` : ""}`}
          className={`${inputCls(!!errors.message)} h-auto resize-y py-3 leading-relaxed`}
        />
      </Field>

      {/* Bot tuzağı */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company_website")}>Web siteniz</label>
        <input id={id("company_website")} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex gap-3.5">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy-900"
          />
          <label htmlFor={id("consent")} className="cursor-pointer text-sm leading-relaxed text-navy-900/85">
            <Link
              href="/kvkk-aydinlatma-metni"
              target="_blank"
              className="font-semibold text-navy-900 underline underline-offset-4"
            >
              KVKK Aydınlatma Metni
            </Link>
            {CONSENT_TEXT.replace("KVKK Aydınlatma Metni", "")}
            <span aria-hidden="true" className="whitespace-nowrap text-accent-600">
              {" *"}
            </span>
          </label>
        </div>
        {errors.consent && <ErrorText id={`${id("consent")}-error`}>{errors.consent}</ErrorText>}
      </div>

      {status.kind === "fallback" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border border-amber-300 bg-amber-50 p-5 text-[0.9375rem] focus:outline-none sm:p-6"
        >
          <p className="flex items-start gap-3 font-semibold text-amber-950">
            <UiIcon name="alert" className="mt-0.5 size-5 shrink-0" />
            {status.reason === "not-configured"
              ? "Çevrim içi form gönderimi henüz etkin değil; talebiniz iletilmedi."
              : status.reason === "rate-limited"
                ? "Kısa sürede çok sayıda gönderim yapıldı; talebiniz iletilmedi."
                : "Talebiniz teknik bir sorun nedeniyle iletilemedi."}
          </p>
          <p className="mt-2 pl-8 leading-relaxed text-amber-950/85">
            Bilgilerinizi hazır bir metin olarak e-posta veya WhatsApp üzerinden gönderebilir ya da bizi doğrudan
            arayabilirsiniz.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 pl-8">
            <a href={mailHref("Teklif talebi", status.text)} className={buttonClasses("primary", "md")}>
              <UiIcon name="mail" className="size-4" />
              E-posta ile gönder
            </a>
            <a
              href={whatsappHref(status.text)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "md")}
            >
              <UiIcon name="whatsapp" className="size-4" />
              WhatsApp ile gönder
            </a>
            <a href={telHref} className={buttonClasses("secondary", "md")}>
              <UiIcon name="phone" className="size-4" />
              Ara
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.</p>
        <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {submitting ? "Gönderiliyor…" : "Teklif talebini gönder"}
          {!submitting && <UiIcon name="arrow-right" className="size-[1.125em]" />}
        </button>
      </div>
    </form>
  );
}

function inputCls(invalid: boolean) {
  return `block h-12 w-full rounded-[3px] border bg-white px-3.5 text-base text-navy-900 placeholder:text-navy-900/35 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 ${
    invalid
      ? "border-red-700 focus:border-red-700 focus:ring-red-700/20"
      : "border-line-strong hover:border-navy-900/40 focus:border-navy-900 focus:ring-accent-500/25"
  }`;
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-navy-900">
          {label}
          {required && (
            <span aria-hidden="true" className="text-accent-600">
              {" "}
              *
            </span>
          )}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="text-right text-xs text-muted">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <UiIcon name="alert" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
