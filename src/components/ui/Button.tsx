import Link from "next/link";
import type { ReactNode } from "react";
import { UiIcon, type UiIconName } from "@/components/icons/UiIcon";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "text";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-700 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_8px_24px_-12px_rgb(20_36_70/0.55)]",
  secondary: "border border-navy-900/20 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-50",
  light: "bg-white text-navy-900 hover:bg-accent-100",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/10",
  text: "text-navy-900 underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem] rounded-[3px]",
  lg: "h-13 px-7 text-base rounded-[3px]",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: UiIconName;
  /** İkon metnin önünde mi gösterilsin? Varsayılan: sonda. */
  iconLeading?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return [base, variants[variant], variant === "text" ? "" : sizes[size], className].join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconLeading,
  className,
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  const iconEl = icon ? (
    <UiIcon
      name={icon}
      className={`size-[1.125em] shrink-0 ${
        !iconLeading && icon.startsWith("arrow") ? "transition-transform duration-200 group-hover/btn:translate-x-0.5" : ""
      }`}
    />
  ) : null;
  const content = (
    <>
      {iconLeading && iconEl}
      <span>{children}</span>
      {!iconLeading && iconEl}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
