import type { ReactNode } from "react";
import { UiIcon } from "@/components/icons/UiIcon";
import { siteConfig } from "@/config/site";
import type { LegalDocument } from "@/content/legal";

const labels: Record<string, string> = {
  companyTitle: "Ticari unvan",
  registeredAddress: "Açık adres",
  mersisNo: "MERSİS numarası",
  kepAddress: "KEP adresi",
  formServiceProvider: "Form altyapısı sağlayıcısı",
  retentionPeriod: "Saklama süresi",
};

function values(): Record<string, string | null> {
  const { legal, contact, url } = siteConfig;
  return {
    companyTitle: legal.companyTitle,
    registeredAddress: legal.registeredAddress,
    mersisNo: legal.mersisNo,
    kepAddress: legal.kepAddress,
    formServiceProvider: legal.formServiceProvider,
    retentionPeriod: legal.retentionPeriod,
    email: contact.email,
    phone: contact.phoneDisplay,
    siteUrl: url.replace(/^https?:\/\//, ""),
  };
}

/** {{alan}} ifadelerini yapılandırma değerleriyle doldurur; boş olanları işaretler. */
function fill(text: string): ReactNode[] {
  const v = values();
  return text.split(/(\{\{\w+\}\})/g).map((part, i) => {
    const match = part.match(/^\{\{(\w+)\}\}$/);
    if (!match) return part;
    const value = v[match[1]];
    if (value) return <span key={i}>{value}</span>;
    return (
      <mark key={i} className="placeholder-mark">
        [Doldurulacak: {labels[match[1]] ?? match[1]}]
      </mark>
    );
  });
}

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  const { legal } = siteConfig;
  return (
    <div className="container-site py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {!legal.reviewed && (
          <div role="note" className="mb-12 flex gap-4 border border-amber-300 bg-amber-50 p-5 text-[0.9375rem] text-amber-950">
            <UiIcon name="alert" className="mt-0.5 size-5 shrink-0" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Taslak metin.</strong> Bu metin genel bir şablondur ve yayına alınmadan
              önce hukuk danışmanı tarafından firmanın gerçek veri işleme süreçlerine göre gözden geçirilmelidir.
            </p>
          </div>
        )}
        <p className="text-lg leading-relaxed text-navy-900/85">{fill(doc.intro)}</p>
        <div className="mt-12 grid gap-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold tracking-[-0.015em] text-navy-900 sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 grid gap-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                {section.blocks.map((block, i) =>
                  typeof block === "string" ? (
                    <p key={i}>{fill(block)}</p>
                  ) : (
                    <ul key={i} className="grid gap-2 pl-1">
                      {block.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent-500" />
                          <span>{fill(item)}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-16 border-t border-line pt-6 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
          Son güncelleme:{" "}
          {legal.lastUpdated ?? <mark className="placeholder-mark normal-case">[Doldurulacak: Tarih]</mark>}
        </p>
      </div>
    </div>
  );
}
