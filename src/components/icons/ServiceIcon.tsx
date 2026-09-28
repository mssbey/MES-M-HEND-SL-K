import type { ReactNode, SVGProps } from "react";
import type { ServiceIconName } from "@/content/services";

interface ServiceIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: ServiceIconName;
  /** Büyük çizimlerde çizgi kalınlığını sabit tutmak için. */
  nonScaling?: boolean;
}

/** Kartvizitteki ikon dilinden türetilmiş, 48×48 ızgarada çizgi ikonlar. */
export function ServiceIcon({ name, nonScaling, strokeWidth = 1.75, ...props }: ServiceIconProps) {
  const ve = nonScaling ? ("non-scaling-stroke" as const) : undefined;
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name](ve)}
    </svg>
  );
}

type VE = "non-scaling-stroke" | undefined;

const paths: Record<ServiceIconName, (ve: VE) => ReactNode> = {
  building: (ve) => (
    <>
      <path vectorEffect={ve} d="M5 43h38" />
      <path vectorEffect={ve} d="M9 43V13l13-6v36" />
      <path vectorEffect={ve} d="M22 43V19h15v24" />
      <path vectorEffect={ve} d="M13.5 17h4M13.5 23h4M13.5 29h4M13.5 35h4" />
      <path vectorEffect={ve} d="M26.5 25h6M26.5 31h6" />
      <path vectorEffect={ve} d="M37 27h2.5a2.5 2.5 0 0 1 2.5 2.5V43" />
      <path vectorEffect={ve} d="M26.5 37h6v6" />
    </>
  ),
  flame: (ve) => (
    <>
      <path
        vectorEffect={ve}
        d="M24 5c1 6.5 9 9.5 9 19a9 9 0 0 1-18 0c0-4.5 2.2-6.8 4.4-8.8 0 3.3 1.2 5.3 3.4 5.3 0-5.3-1.1-10.3 1.2-15.5z"
      />
      <path vectorEffect={ve} d="M24 25.5c1.7 1.8 3 3.4 3 5.2a3 3 0 0 1-6 0c0-1.8 1.3-3.4 3-5.2z" />
      <path vectorEffect={ve} d="M12 39h24M17 43h14" />
    </>
  ),
  fire: (ve) => (
    <>
      <path vectorEffect={ve} d="M24 4v5M17 9h14M19.5 9l2 4h5l2-4" />
      <path vectorEffect={ve} d="M15 17l-3 3M33 17l3 3M24 16v3" />
      <path
        vectorEffect={ve}
        d="M24 23c.6 4.2 6.5 6.4 6.5 12.5a6.5 6.5 0 0 1-13 0c0-3.2 1.6-4.8 3.2-6.3 0 2.2.8 3.6 2.3 3.6 0-3.4-.4-6.6 1-9.8z"
      />
      <path vectorEffect={ve} d="M13 44h22" />
    </>
  ),
  fan: (ve) => (
    <>
      <circle vectorEffect={ve} cx="24" cy="24" r="19" />
      <circle vectorEffect={ve} cx="24" cy="24" r="3" />
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          vectorEffect={ve}
          transform={`rotate(${deg} 24 24)`}
          d="M24 21c-.4-5.6 2.3-10.6 7.6-11.6 1.4 5.3-2.2 10.4-7.6 11.6z"
        />
      ))}
    </>
  ),
  faucet: (ve) => (
    <>
      <path vectorEffect={ve} d="M6 11v11" />
      <path vectorEffect={ve} d="M6 14h17a8 8 0 0 1 8 8v3" />
      <path vectorEffect={ve} d="M6 19h14a4 4 0 0 1 4 4v2" />
      <path vectorEffect={ve} d="M22.5 25h10" />
      <path vectorEffect={ve} d="M17 14V8M13 8h8" />
      <path vectorEffect={ve} d="M27.5 31s-3.5 4-3.5 6.3a3.5 3.5 0 0 0 7 0c0-2.3-3.5-6.3-3.5-6.3z" />
      <path vectorEffect={ve} d="M6 44c2.5 0 2.5-1.6 5-1.6s2.5 1.6 5 1.6 2.5-1.6 5-1.6 2.5 1.6 5 1.6 2.5-1.6 5-1.6 2.5 1.6 5 1.6 2.5-1.6 5-1.6" />
    </>
  ),
  ac: (ve) => (
    <>
      <rect vectorEffect={ve} x="5" y="8" width="38" height="16" rx="3" />
      <path vectorEffect={ve} d="M10 19.5h28" />
      <path vectorEffect={ve} d="M35 13h3" />
      <path vectorEffect={ve} d="M15 29c0 3-2.5 4.5-2.5 7.5s2.5 3.5 2.5 6" />
      <path vectorEffect={ve} d="M24 29c0 3-2.5 4.5-2.5 7.5s2.5 3.5 2.5 6" />
      <path vectorEffect={ve} d="M33 29c0 3-2.5 4.5-2.5 7.5s2.5 3.5 2.5 6" />
    </>
  ),
  boiler: (ve) => (
    <>
      <rect vectorEffect={ve} x="11" y="4" width="26" height="31" rx="3" />
      <rect vectorEffect={ve} x="17" y="9" width="14" height="6" rx="1" />
      <path vectorEffect={ve} d="M24 19.5c1.4 1.6 3 3 3 4.8a3 3 0 0 1-6 0c0-1.8 1.6-3.2 3-4.8z" />
      <path vectorEffect={ve} d="M17 35v9M24 35v9M31 35v9" />
      <path vectorEffect={ve} d="M15 40h4M29 40h4" />
    </>
  ),
  radiator: (ve) => (
    <>
      {[7, 14.5, 22, 29.5, 37].map((x) => (
        <rect key={x} vectorEffect={ve} x={x} y="15" width="5" height="23" rx="2.5" />
      ))}
      <path vectorEffect={ve} d="M9.5 38v4M39.5 38v4" />
      <path vectorEffect={ve} d="M3 34h4M42 20h3" />
      <path vectorEffect={ve} d="M16 4c-1.6 1.6 1.6 2.8 0 5M24 4c-1.6 1.6 1.6 2.8 0 5M32 4c-1.6 1.6 1.6 2.8 0 5" />
    </>
  ),
};
