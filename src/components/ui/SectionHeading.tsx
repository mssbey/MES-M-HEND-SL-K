import type { ReactNode } from "react";

interface EyebrowProps {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Teknik pafta etiketini andıran küçük üst başlık. */
export function Eyebrow({ index, children, tone = "light", className = "" }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-accent-300" : "text-accent-600"
      } ${className}`}
    >
      {index && (
        <span className={tone === "dark" ? "text-white/60" : "text-navy-900/50"}>{index}</span>
      )}
      <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-accent-300/60" : "bg-accent-600/50"}`} />
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center [&>p:first-child]:justify-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        id={id}
        className={`mt-5 text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-5 text-[1.0625rem] leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-navy-200" : "text-muted"
          } ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
