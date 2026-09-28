import { ServiceIcon } from "@/components/icons/ServiceIcon";
import type { Service } from "@/content/services";

/**
 * Hizmet detay sayfalarındaki pafta tarzı şematik çizim: büyütülmüş hizmet
 * ikonu, ölçü çizgileri, eksen çizgileri, açıklama etiketleri ve antet.
 */
export function ServiceDrawing({ service }: { service: Pick<Service, "icon" | "drawing" | "shortTitle"> }) {
  const [l1, l2, l3] = service.drawing.labels;
  return (
    <svg
      viewBox="0 0 480 360"
      className="h-auto w-full"
      role="img"
      aria-label={`${service.shortTitle} için şematik çizim`}
      fill="none"
      strokeLinecap="round"
    >
      <defs>
        <pattern id={`grid-${service.drawing.code}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="stroke-navy-900/[0.07]" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width="479" height="359" className="fill-white stroke-navy-900/15" />
      <rect x="10" y="10" width="460" height="340" fill={`url(#grid-${service.drawing.code})`} className="stroke-navy-900/30" />

      {/* Eksen çizgileri */}
      <path d="M240 40V280M110 160H370" className="stroke-accent-500/60" strokeWidth="0.8" strokeDasharray="14 3 2 3" />

      {/* Ölçü çizgileri */}
      <g className="stroke-navy-900/45" strokeWidth="0.8">
        <path d="M150 46H330M146 50l8-8M326 50l8-8M150 52V66M330 52V66" />
        <path d="M124 70V250M120 74l8-8M120 254l8-8M130 70H146M130 250H146" />
      </g>
      <g className="fill-navy-900/60 font-mono" fontSize="9">
        <text x="240" y="40" textAnchor="middle">
          1800
        </text>
        <text x="116" y="164" textAnchor="middle" transform="rotate(-90 116 160)">
          1800
        </text>
      </g>

      {/* Ana çizim */}
      <rect x="150" y="70" width="180" height="180" className="fill-white/80 stroke-navy-900/25" strokeWidth="1" />
      <g transform="translate(166 86)">
        <ServiceIcon
          name={service.icon}
          width="148"
          height="148"
          nonScaling
          strokeWidth={2.25}
          className="text-navy-900 animate-fade-up"
        />
      </g>

      {/* Etiketler */}
      <g className="stroke-navy-900/55" strokeWidth="0.8">
        <path d="M300 104L352 84H458" />
        <path d="M312 196L352 214H458" />
        <path d="M176 232L140 292H26" />
      </g>
      <g className="fill-navy-900">
        <circle cx="300" cy="104" r="2" />
        <circle cx="312" cy="196" r="2" />
        <circle cx="176" cy="232" r="2" />
      </g>
      <g className="fill-navy-900/80 font-mono" fontSize="9" letterSpacing="0.6">
        <text x="356" y="79">
          {l1}
        </text>
        <text x="356" y="209">
          {l2}
        </text>
        <text x="28" y="287">
          {l3}
        </text>
      </g>

      {/* Antet */}
      <g className="stroke-navy-900/50" strokeWidth="0.8">
        <rect x="300" y="300" width="160" height="40" className="fill-bone/70" />
        <path d="M300 320H460M400 320V340" />
      </g>
      <g className="font-mono" fontSize="8" letterSpacing="0.5">
        <text x="308" y="313.5" fontWeight="500" className="fill-navy-900">
          MES MÜHENDİSLİK
        </text>
        <text x="308" y="333.5" className="fill-accent-600">
          ŞEMATİK
        </text>
        <text x="408" y="333.5" className="fill-navy-900/70">
          {service.drawing.code}
        </text>
      </g>
    </svg>
  );
}
