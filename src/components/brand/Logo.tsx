import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

interface LogoProps {
  className?: string;
  /** Erişilebilir ad; dekoratif kullanımda boş bırakın. */
  title?: string;
}

/** MES logosu. Rengi `currentColor` ile metin renginden alır. */
export function Logo({ className, title }: LogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
