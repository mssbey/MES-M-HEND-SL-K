import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}

/** İç sayfaların üst alanı: içerik yolu, başlık, açıklama ve isteğe bağlı çizim. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, aside }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bone">
      <div
        aria-hidden="true"
        className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-site relative pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid items-center gap-12 lg:mt-14 ${aside ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[2.125rem] font-bold leading-[1.08] tracking-[-0.03em] text-navy-900 sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            {lead && <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{lead}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
