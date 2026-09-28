import type { ReactNode, SVGProps } from "react";

export type UiIconName =
  | "phone"
  | "mail"
  | "whatsapp"
  | "globe"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "menu"
  | "close"
  | "chevron-down"
  | "plus"
  | "user"
  | "pin"
  | "clock"
  | "info"
  | "alert";

interface UiIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: UiIconName;
}

/** 24×24 ızgarada arayüz ikonları. */
export function UiIcon({ name, strokeWidth = 1.75, ...props }: UiIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

const icons: Record<UiIconName, ReactNode> = {
  phone: (
    <path d="M21 16.4v2.9a1.9 1.9 0 0 1-2.1 1.9 18.9 18.9 0 0 1-8.2-2.9 18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 2.1 4.3 1.9 1.9 0 0 1 4 2.2h2.9a1.9 1.9 0 0 1 1.9 1.6c.1.9.4 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L7.8 9.7a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.6 1.9z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 8.1 5.8a1.6 1.6 0 0 0 1.8 0L21 6.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.2 20.8l1.2-4.3A9 9 0 1 1 7.6 19.7z" />
      <path d="M9.1 8.2c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.2.4 0 .6.7 1.2 1.6 2 2.8 2.6.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.7c.2.1.3.3.3.5 0 .5-.1 1-.5 1.4-.5.4-1.2.7-2 .6-1.4-.2-2.9-1-4.1-2.2-1.2-1.2-2-2.6-2.2-4 0-.8.2-1.5.4-1.9z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.4 2.6 3.6 5.8 3.6 9.5s-1.2 6.9-3.6 9.5c-2.4-2.6-3.6-5.8-3.6-9.5s1.2-6.9 3.6-9.5z" />
    </>
  ),
  "arrow-right": <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  check: <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6M12 7.5v.01" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4.5M12 17v.01" />
    </>
  ),
};
