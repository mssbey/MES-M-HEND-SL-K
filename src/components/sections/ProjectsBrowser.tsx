"use client";

import { useState, type ReactNode } from "react";

interface ProjectsBrowserProps {
  filters: { slug: string; label: string }[];
  /** Her proje kartı ve ilişkili hizmet slug'ları. */
  items: { key: string; services: string[]; card: ReactNode }[];
}

/** Proje listesini hizmet türüne göre filtreler. */
export function ProjectsBrowser({ filters, items }: ProjectsBrowserProps) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((item) => item.services.includes(active)) : items;
  const options = [{ slug: null, label: "Tümü" }, ...filters];

  return (
    <div>
      <div role="group" aria-label="Hizmete göre filtrele" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = active === option.slug;
          return (
            <button
              key={option.slug ?? "all"}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(option.slug)}
              className={`h-10 border px-4 text-sm font-semibold transition-colors ${
                pressed
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-line bg-white text-navy-900 hover:border-navy-900/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} proje gösteriliyor
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.key}>{item.card}</li>
        ))}
      </ul>
    </div>
  );
}
