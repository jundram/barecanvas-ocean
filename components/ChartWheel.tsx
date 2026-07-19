"use client";

import { NatalChart, PlanetKey, SIGNS, Sign } from "@/lib/astro/ephemeris";

const ZODIAC_GLYPH: Record<Sign, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const PLANET_GLYPH: Record<PlanetKey, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂", jupiter: "♃", saturn: "♄",
};

const PLANET_ORDER: PlanetKey[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"];

function polar(cx: number, cy: number, r: number, mathDeg: number) {
  const rad = (mathDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

export default function ChartWheel({ chart }: { chart: NatalChart }) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 165;
  const signRingR = 140;
  const houseLineInnerR = 60;
  const planetR = 105;

  const ascSignIndex = SIGNS.indexOf(chart.ascendant.sign);
  // Whole-sign house 1 starts at the 0° cusp of the Ascendant's own sign.
  const houseStartLon = ascSignIndex * 30;
  const ascLonAbsolute = ascSignIndex * 30 + chart.ascendant.degree;

  // theta(L): Ascendant sits at the 9-o'clock point (180°), and increasing
  // ecliptic longitude runs counter-clockwise from there, matching standard
  // chart-wheel convention.
  const theta = (lon: number) => 180 + (lon - ascLonAbsolute);

  // Slight angular offset so planets close together in longitude don't
  // visually collide — nudges labels outward in sequence.
  const placementEntries = PLANET_ORDER.map((key) => {
    const p = chart.placements[key];
    const absLon = SIGNS.indexOf(p.sign) * 30 + p.degree;
    return { key, absLon };
  }).sort((a, b) => a.absLon - b.absLon);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto">
      {/* Outer + sign ring circles */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="currentColor" strokeOpacity={0.18} className="text-ink dark:text-foam" />
      <circle cx={cx} cy={cy} r={signRingR} fill="none" stroke="currentColor" strokeOpacity={0.18} className="text-ink dark:text-foam" />
      <circle cx={cx} cy={cy} r={houseLineInnerR} fill="none" stroke="currentColor" strokeOpacity={0.18} className="text-ink dark:text-foam" />

      {/* 12 house division lines + sign glyphs, each 30° from the Ascendant's sign start */}
      {Array.from({ length: 12 }).map((_, i) => {
        const cuspLon = houseStartLon + i * 30;
        const t = theta(cuspLon);
        const outer = polar(cx, cy, outerR, t);
        const inner = polar(cx, cy, houseLineInnerR, t);
        const midT = t - 15; // middle of this house segment, for the glyph
        const glyphPos = polar(cx, cy, (outerR + signRingR) / 2, midT);
        const sign = SIGNS[((ascSignIndex + i) % 12 + 12) % 12];
        const houseNumPos = polar(cx, cy, houseLineInnerR + 14, midT);

        return (
          <g key={i}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeOpacity={0.22} className="text-ink dark:text-foam" />
            <text x={glyphPos.x} y={glyphPos.y} textAnchor="middle" dominantBaseline="middle" className="fill-lagoon dark:fill-cyanglow" style={{ fontSize: 15 }}>
              {ZODIAC_GLYPH[sign]}
            </text>
            <text x={houseNumPos.x} y={houseNumPos.y} textAnchor="middle" dominantBaseline="middle" className="fill-current text-ink/40 dark:text-foam/40" style={{ fontSize: 9 }}>
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Ascendant marker (exact degree, not just sign boundary) */}
      {(() => {
        const t = theta(ascLonAbsolute);
        const outer = polar(cx, cy, outerR + 12, t);
        const inner = polar(cx, cy, houseLineInnerR, t);
        return (
          <g>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeWidth={2} className="text-coral" />
            <text x={outer.x} y={outer.y} textAnchor="middle" dominantBaseline="middle" className="fill-coral font-medium" style={{ fontSize: 10 }}>
              ASC
            </text>
          </g>
        );
      })()}

      {/* Planets */}
      {placementEntries.map(({ key, absLon }) => {
        const t = theta(absLon);
        const pos = polar(cx, cy, planetR, t);
        return (
          <g key={key}>
            <circle cx={pos.x} cy={pos.y} r={11} className="fill-foam dark:fill-abyssdeep" stroke="currentColor" strokeOpacity={0.25} />
            <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" className="fill-current text-ink dark:text-foam" style={{ fontSize: 12 }}>
              {PLANET_GLYPH[key]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
