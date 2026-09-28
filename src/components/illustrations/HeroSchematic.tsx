import type { CSSProperties } from "react";

/**
 * Ana sayfa için şematik bina kesiti: ısıtma, sıhhi tesisat, doğalgaz, yangın
 * ve havalandırma hatlarını teknik pafta dilinde gösterir. Gerçek bir projeyi
 * temsil etmez; bu nedenle antette "ŞEMATİK" ibaresi yer alır.
 */

const ceilings = [118, 218, 318];
const hatch = Array.from({ length: 54 }, (_, i) => 30 + i * 10);
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

// Hat stilleri (lejant ile aynı)
const S = {
  water: "stroke-accent-500",
  supply: "stroke-navy-900",
  ret: "stroke-navy-900",
  waste: "stroke-navy-900/45",
  gas: "stroke-accent-700",
  fire: "stroke-navy-600",
};

export function HeroSchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 500"
      className={className}
      role="img"
      aria-labelledby="hero-schematic-title hero-schematic-desc"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title id="hero-schematic-title">Mekanik sistemler şematik kesiti</title>
      <desc id="hero-schematic-desc">
        Üç katlı bir binada ısıtma, temiz su, atık su, doğalgaz, yangın ve havalandırma hatlarının bir arada
        gösterildiği teknik çizim tarzında şematik illüstrasyon.
      </desc>

      {/* Pafta çerçevesi */}
      <rect x="0.5" y="0.5" width="599" height="499" className="fill-white stroke-navy-900/15" />
      <rect x="12" y="12" width="576" height="476" className="stroke-navy-900/30" />

      {/* Ölçü çizgileri */}
      <g className="stroke-navy-900/45" strokeWidth="0.8">
        <path d="M90 44H470" />
        <path d="M86 48l8-8M466 48l8-8" />
        <path d="M90 50V100M470 50V100" strokeDasharray="2 3" />
        <path d="M510 110V418" />
        {[110, 210, 310, 418].map((y) => (
          <g key={y}>
            <path d={`M506 ${y + 4}l8-8`} />
            <path d={`M474 ${y}H516`} strokeDasharray="2 3" />
          </g>
        ))}
      </g>
      <g className="fill-navy-900/60 font-mono" fontSize="9" letterSpacing="0.5">
        <text x="280" y="38" textAnchor="middle">
          24.00
        </text>
        <text x="518" y="164">
          3.20
        </text>
        <text x="518" y="264">
          3.20
        </text>
        <text x="518" y="368">
          3.50
        </text>
      </g>

      {/* Yapı: döşemeler, duvarlar, zemin */}
      <g className="animate-fade-up">
        {[110, 210, 310, 410].map((y) => (
          <rect key={y} x="90" y={y} width="380" height="8" className="fill-navy-900/10 stroke-navy-900/60" strokeWidth="1" />
        ))}
        <rect x="90" y="118" width="8" height="292" className="fill-navy-900/10 stroke-navy-900/60" />
        <rect x="462" y="118" width="8" height="292" className="fill-navy-900/10 stroke-navy-900/60" />
        <rect x="90" y="100" width="6" height="10" className="stroke-navy-900/60" />
        <rect x="464" y="100" width="6" height="10" className="stroke-navy-900/60" />
        <path d="M24 418H576" className="stroke-navy-900/70" strokeWidth="1.2" />
        <path d={hatch.map((x) => `M${x} 428L${x + 10} 418`).join("")} className="stroke-navy-900/25" strokeWidth="0.8" />
      </g>

      {/* Çatı ekipmanları */}
      <g className="animate-fade-up" style={delay(0.2)}>
        <rect x="330" y="74" width="96" height="36" rx="2" className="fill-accent-50 stroke-navy-900" strokeWidth="1.3" />
        {[354, 402].map((cx) => (
          <g key={cx} className="stroke-navy-900" strokeWidth="1">
            <circle cx={cx} cy="92" r="10" />
            <path d={`M${cx - 7} ${92 - 7}L${cx + 7} ${92 + 7}M${cx - 7} ${92 + 7}L${cx + 7} ${92 - 7}`} />
          </g>
        ))}
        <rect x="130" y="88" width="40" height="22" rx="2" className="fill-white stroke-navy-900" strokeWidth="1.2" />
        <circle cx="150" cy="99" r="7" className="stroke-navy-900" />
        <path d="M143 99h14M150 92v14" className="stroke-navy-900/50" strokeWidth="0.8" />
        {/* Etiketler */}
        <path d="M330 80L306 64H226" className="stroke-navy-900/50" strokeWidth="0.8" />
        <circle cx="330" cy="80" r="1.8" className="fill-navy-900" />
        <path d="M130 94L112 74H40" className="stroke-navy-900/50" strokeWidth="0.8" />
        <circle cx="130" cy="94" r="1.8" className="fill-navy-900" />
      </g>
      <g className="fill-navy-900/75 font-mono" fontSize="8.5" letterSpacing="0.6">
        <text x="228" y="60">KLİMA SANTRALİ</text>
        <text x="42" y="70">DIŞ ÜNİTE</text>
        <text x="24" y="258">ŞAFT</text>
        <text x="212" y="394">K-01</text>
        <text x="258" y="384" textAnchor="middle">
          DEPO
        </text>
      </g>
      <path d="M26 262H58L110 236" className="stroke-navy-900/50" strokeWidth="0.8" />

      {/* Havalandırma kanalları */}
      <g className="animate-fade-up" style={delay(0.5)}>
        <rect x="408" y="110" width="14" height="226" className="fill-accent-100/70 stroke-accent-500" strokeWidth="1.1" />
        {ceilings.map((c) => (
          <g key={c}>
            <rect x="170" y={c + 4} width="238" height="10" className="fill-accent-100/70 stroke-accent-500" strokeWidth="1.1" />
            {[210, 290, 370].map((x) => (
              <path key={x} d={`M${x - 8} ${c + 14}H${x + 8}L${x + 5} ${c + 19}H${x - 5}Z`} className="fill-white stroke-accent-500" />
            ))}
          </g>
        ))}
      </g>

      {/* Yangın hattı */}
      <g className={S.fire} strokeWidth="1.5" strokeDasharray="2 2.5">
        <path d="M446 432V146" className="animate-fade-up" style={delay(0.9)} />
        <path d="M170 146H446M170 246H446M300 346H446" className="animate-fade-up" style={delay(1)} />
      </g>
      <g className="animate-fade-up fill-navy-600 stroke-navy-600" strokeWidth="1" style={delay(1.1)}>
        {[146, 246].flatMap((y) =>
          [200, 260, 320, 380].map((x) => <path key={`${x}-${y}`} d={`M${x} ${y}v5M${x - 3} ${y + 9}h6l-3-4z`} />),
        )}
        {[330, 390].map((x) => (
          <path key={x} d={`M${x} 346v5M${x - 3} 355h6l-3-4z`} />
        ))}
      </g>

      {/* Tesisat şaftı kolonları */}
      <path d="M112 118V410" pathLength={1} className={`draw-line ${S.water}`} strokeWidth="1.6" style={delay(0.3)} />
      <path d="M120 118V410" pathLength={1} className={`draw-line ${S.supply}`} strokeWidth="1.6" style={delay(0.4)} />
      <path d="M128 118V410" className={`animate-fade-up ${S.ret}`} strokeWidth="1.4" strokeDasharray="5 3" style={delay(0.6)} />
      <path d="M138 118V430H40" className={`animate-fade-up ${S.waste}`} strokeWidth="3" style={delay(0.6)} />

      {/* Kat bağlantıları: radyatör, lavabo */}
      {[118, 218].map((c, i) => (
        <g key={c}>
          <path d={`M120 ${c + 66}H180`} pathLength={1} className={`draw-line ${S.supply}`} strokeWidth="1.5" style={delay(1.2 + i * 0.2)} />
          <path d={`M128 ${c + 82}H180`} className={`animate-fade-up ${S.ret}`} strokeWidth="1.4" strokeDasharray="5 3" style={delay(1.3 + i * 0.2)} />
          <path d={`M112 ${c + 52}H285V${c + 72}`} pathLength={1} className={`draw-line ${S.water}`} strokeWidth="1.5" style={delay(1.4 + i * 0.2)} />
          <path d={`M285 ${c + 80}V${c + 88}H138`} className={`animate-fade-up ${S.waste}`} strokeWidth="2.5" style={delay(1.5 + i * 0.2)} />
          {/* Radyatör */}
          <g className="animate-fade-up" style={delay(1.3 + i * 0.2)}>
            <rect x="180" y={c + 60} width="56" height="24" rx="2" className="fill-white stroke-navy-900" strokeWidth="1.2" />
            <path
              d={Array.from({ length: 7 }, (_, k) => `M${187 + k * 7} ${c + 63}V${c + 81}`).join("")}
              className="stroke-navy-900/50"
              strokeWidth="0.8"
            />
          </g>
          {/* Lavabo */}
          <path d={`M270 ${c + 72}H300L296 ${c + 80}H274Z`} className="animate-fade-up fill-white stroke-navy-900" strokeWidth="1.2" style={delay(1.5 + i * 0.2)} />
        </g>
      ))}

      {/* Klima iç ünitesi (2. kat) */}
      <g className="animate-fade-up" style={delay(1.6)}>
        <rect x="330" y="258" width="42" height="12" rx="3" className="fill-white stroke-navy-900" strokeWidth="1.2" />
        <path d="M336 266h30" className="stroke-navy-900/50" strokeWidth="0.8" />
      </g>

      {/* Zemin kat: kazan, depo, pompa, doğalgaz */}
      <g className="animate-fade-up" style={delay(0.8)}>
        <rect x="170" y="346" width="36" height="50" rx="2" className="fill-white stroke-navy-900" strokeWidth="1.3" />
        <path d="M188 360c.4 3 5 4.6 5 9a5 5 0 0 1-10 0c0-2.4 1.2-3.5 2.4-4.6 0 1.6.6 2.6 1.7 2.6 0-2.4-.3-4.7.9-7z" className="stroke-accent-600" strokeWidth="1.1" />
        <rect x="236" y="356" width="44" height="48" rx="4" className="fill-accent-50 stroke-navy-900" strokeWidth="1.2" />
        <path d="M240 372c4-2 8 2 12 0s8 2 12 0 8 2 12 0" className="stroke-accent-500" strokeWidth="1" />
        <circle cx="300" cy="396" r="7" className="fill-white stroke-navy-900" strokeWidth="1.2" />
        <path d="M297 392.5l6 3.5-6 3.5z" className="fill-navy-900" />
        <rect x="52" y="392" width="18" height="14" rx="1" className="fill-white stroke-accent-700" strokeWidth="1.1" />
        <text x="61" y="402.5" textAnchor="middle" fontSize="8" className="fill-accent-700 font-mono">
          G
        </text>
      </g>
      <path d="M170 360H120" pathLength={1} className={`draw-line ${S.supply}`} strokeWidth="1.5" style={delay(1)} />
      <path d="M170 374H128" className={`animate-fade-up ${S.ret}`} strokeWidth="1.4" strokeDasharray="5 3" style={delay(1)} />
      <path d="M280 396H293M307 396H342V341H112" pathLength={1} className={`draw-line ${S.water}`} strokeWidth="1.5" style={delay(1.1)} />
      <path d="M24 399H52M70 399H188V396" className={`animate-fade-up ${S.gas}`} strokeWidth="1.5" strokeDasharray="10 3 2 3" style={delay(1.2)} />

      {/* Akış animasyonu */}
      <path d="M112 410V118" className="flow-line stroke-white" strokeWidth="0.9" />
      <path d="M120 118V410" className="flow-line stroke-white" strokeWidth="0.9" />

      {/* Lejant */}
      <g className="font-mono" fontSize="8" letterSpacing="0.4">
        {[
          { label: "TEMİZ SU", cls: S.water, w: 1.6 },
          { label: "ISITMA GİDİŞ", cls: S.supply, w: 1.6 },
          { label: "ISITMA DÖNÜŞ", cls: S.ret, w: 1.4, dash: "5 3" },
          { label: "ATIK SU", cls: S.waste, w: 3 },
          { label: "DOĞALGAZ", cls: S.gas, w: 1.5, dash: "10 3 2 3" },
          { label: "YANGIN", cls: S.fire, w: 1.5, dash: "2 2.5" },
          { label: "HAVA KANALI", cls: "stroke-accent-500", w: 6, duct: true },
        ].map((item, i) => {
          const x = 26 + (i % 4) * 96;
          const y = 452 + Math.floor(i / 4) * 20;
          return (
            <g key={item.label}>
              {item.duct ? (
                <rect x={x} y={y - 4} width="22" height="7" className="fill-accent-100 stroke-accent-500" strokeWidth="1" />
              ) : (
                <path d={`M${x} ${y}h22`} className={item.cls} strokeWidth={item.w} strokeDasharray={item.dash} />
              )}
              <text x={x + 28} y={y + 3} className="fill-navy-900/70">
                {item.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Antet */}
      <g className="stroke-navy-900/50" strokeWidth="0.8">
        <rect x="412" y="436" width="176" height="52" className="fill-bone/60" />
        <path d="M412 454H588M412 471H588M520 454V488" />
      </g>
      <g className="font-mono" fontSize="8" letterSpacing="0.5">
        <text x="420" y="448.5" fontWeight="500" className="fill-navy-900">
          MES MÜHENDİSLİK ÇÖZÜMLERİ
        </text>
        <text x="420" y="465.5" className="fill-navy-900/70">
          MEKANİK SİSTEMLER
        </text>
        <text x="528" y="465.5" className="fill-accent-600">
          ŞEMATİK
        </text>
        <text x="420" y="482.5" className="fill-navy-900/70">
          KESİT A-A
        </text>
        <text x="528" y="482.5" className="fill-navy-900/70">
          PAFTA M-00
        </text>
      </g>
    </svg>
  );
}
