import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

/** Görünür içerik yolu. Son öğe mevcut sayfadır. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Ana Sayfa", path: "/" }, ...items];
  return (
    <nav aria-label="İçerik yolu" className="font-mono text-[0.75rem] uppercase tracking-[0.12em]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-navy-900">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-navy-900">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-navy-900/30">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
