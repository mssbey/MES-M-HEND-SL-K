import Image from "next/image";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { CornerMarks } from "@/components/ui/CornerMarks";
import type { Project } from "@/content/projects";
import { getService } from "@/content/services";
import { quoteHref } from "@/lib/links";

export function ProjectCard({ project }: { project: Project }) {
  const related = project.services.map(getService).filter((s) => s !== undefined);
  const meta = [project.location, project.year, project.client].filter(Boolean);

  return (
    <article className="flex h-full flex-col border border-line bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-bone">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover"
          />
        ) : (
          <div className="bg-blueprint grid size-full place-items-center">
            {related[0] && <ServiceIcon name={related[0].icon} className="size-20 text-navy-900/30" />}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {meta.length > 0 && (
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-accent-600">{meta.join(" · ")}</p>
        )}
        <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.015em] text-navy-900">{project.title}</h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
        {project.scope && project.scope.length > 0 && (
          <ul className="mt-4 grid gap-1.5 text-sm text-navy-900/80">
            {project.scope.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {related.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="İlgili hizmetler">
            {related.map((s) => (
              <li key={s.slug} className="border border-line px-2.5 py-1 text-xs font-medium text-navy-900/80">
                {s.shortTitle}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/**
 * Proje verisi yokken gösterilen boş durum. Sahte referans üretmek yerine
 * bölümün amacını açıklar ve iletişime yönlendirir.
 */
export function ProjectsEmptyState({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden border border-line bg-bone">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <div className={`relative grid items-center gap-10 p-6 sm:p-10 ${compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[1.2fr_1fr] lg:p-14"}`}>
        <div className="max-w-xl">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-600">Referans portföyü</p>
          <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-navy-900 sm:text-[1.75rem]">
            Proje referanslarımız bu alanda yayımlanacak.
          </h3>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            Çalışmalarımızı yalnızca doğrulanmış bilgilerle ve müşterilerimizin onayıyla paylaşıyoruz. Bu sırada
            projenizin kapsamını ve ihtiyaçlarını konuşmak için bize doğrudan ulaşabilirsiniz.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref()} icon="arrow-right">
              Projenizi konuşalım
            </ButtonLink>
            {!compact && (
              <ButtonLink href="/hizmetler" variant="secondary">
                Hizmetleri inceleyin
              </ButtonLink>
            )}
          </div>
        </div>
        {!compact && (
          <div aria-hidden="true" className="hidden grid-cols-3 gap-3 lg:grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="relative aspect-square border border-dashed border-navy-900/20 bg-white/60">
                <CornerMarks className="text-navy-900/30" size={8} />
                <span className="absolute bottom-2 left-2 font-mono text-[0.625rem] tracking-[0.12em] text-navy-900/35">
                  P-{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
