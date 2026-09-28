import type { TitledText } from "@/content/services";

interface ProcessStepsProps {
  steps: TitledText[];
  tone?: "light" | "dark";
  /** Geniş ekranda yatay (ölçü çizgili) düzen. */
  layout?: "horizontal" | "vertical";
}

/**
 * Numaralı süreç adımları. Geniş ekranda adımlar ölçü çizgisine benzeyen bir
 * hat üzerinde yatay dizilir; mobilde dikey zaman çizelgesine dönüşür.
 */
export function ProcessSteps({ steps, tone = "light", layout = "horizontal" }: ProcessStepsProps) {
  const dark = tone === "dark";
  const horizontal = layout === "horizontal";
  const cols = steps.length === 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <ol className={`relative grid gap-0 ${horizontal ? `${cols} lg:gap-8` : ""}`}>
      {horizontal && (
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-[1.375rem] hidden h-px lg:block ${dark ? "bg-white/20" : "bg-navy-900/20"}`}
        />
      )}
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`relative pb-10 pl-16 last:pb-0 ${horizontal ? "lg:pb-0 lg:pl-0 lg:pt-0" : ""}`}
        >
          {/* Dikey hat (mobil / dikey düzen) */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-[1.375rem] top-11 w-px ${dark ? "bg-white/20" : "bg-navy-900/15"} ${
                horizontal ? "lg:hidden" : ""
              }`}
            />
          )}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 grid size-11 place-items-center border font-mono text-sm font-medium ${
              horizontal ? "lg:relative" : ""
            } ${dark ? "border-white/25 bg-navy-900 text-accent-300" : "border-navy-900/20 bg-white text-navy-900"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={`text-lg font-bold tracking-[-0.015em] ${horizontal ? "lg:mt-6" : ""} ${
              dark ? "text-white" : "text-navy-900"
            }`}
          >
            <span className="sr-only">{i + 1}. adım: </span>
            {step.title}
          </h3>
          <p className={`mt-2 text-[0.9375rem] leading-relaxed ${dark ? "text-navy-200" : "text-muted"}`}>
            {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
