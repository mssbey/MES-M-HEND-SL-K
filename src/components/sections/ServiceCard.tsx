import Link from "next/link";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { UiIcon } from "@/components/icons/UiIcon";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { serviceGroups, type Service } from "@/content/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  headingLevel?: "h2" | "h3";
}

/** Hizmet kartı: tüm kart tıklanabilir, klavye odağı bağlantıda kalır. */
export function ServiceCard({ service, index, headingLevel: H = "h3" }: ServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-bone sm:p-7">
      <CornerMarks className="text-navy-900/0 transition-colors duration-300 group-hover:text-navy-900/40" />
      <div className="flex items-start justify-between">
        <span className="grid size-16 place-items-center border border-line bg-white text-navy-900 transition-colors duration-300 group-hover:border-navy-900/25 group-hover:text-accent-600">
          <ServiceIcon name={service.icon} className="size-11" />
        </span>
        <span className="font-mono text-[0.75rem] tracking-[0.12em] text-navy-900/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-600">
        {serviceGroups[service.group].title}
      </p>
      <H className="mt-2 text-[1.1875rem] font-bold leading-snug tracking-[-0.015em] text-navy-900">
        <Link
          href={`/hizmetler/${service.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-500"
        >
          {service.title}
        </Link>
      </H>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
      <span
        aria-hidden="true"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
      >
        Detayları incele
        <UiIcon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}

/** Hizmet kartları ızgarası; ince çizgilerle ayrılmış pafta düzeni. */
export function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
      {items.map((service, i) => (
        <li key={service.slug}>
          <ServiceCard service={service} index={i} />
        </li>
      ))}
    </ul>
  );
}
