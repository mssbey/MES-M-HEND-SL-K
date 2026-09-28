import type { Faq } from "@/content/services";

/** Yerel <details> öğesiyle erişilebilir akordeon. */
export function FaqList({ items, headingLevel: H = "h3" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <H className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-navy-900 sm:text-lg">
              {faq.q}
            </H>
            <span
              aria-hidden="true"
              className="relative mt-0.5 grid size-7 shrink-0 place-items-center border border-navy-900/20 text-navy-900 transition-colors group-open:border-navy-900 group-open:bg-navy-900 group-open:text-white"
            >
              <span className="absolute h-px w-3 bg-current" />
              <span className="absolute h-3 w-px bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="max-w-3xl pb-7 pr-12 text-[0.9375rem] leading-relaxed text-muted sm:text-base">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}
