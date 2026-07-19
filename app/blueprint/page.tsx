"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ArrowRight, Compass, Clock3, Users, Orbit, Layers } from "lucide-react";
import { TideCard, Pill, TideDivider, DriftHeading } from "@/components/ui";
import {
  computeNatalChart, computeCurrentTransits, computeProgressions, computeAnnualProfection,
  NatalChart, PlanetKey,
} from "@/lib/astro/ephemeris";
import { geocodeCity, localBirthMomentToUTC, ULAANBAATAR_1988 } from "@/lib/astro/geocode";
import {
  SUN_PATTERN, MOON_PATTERN, RISING_PATTERN,
  SUN_PATTERN_DEEP, MOON_PATTERN_DEEP, RISING_PATTERN_DEEP,
  MERCURY_PATTERN, VENUS_PATTERN, MARS_PATTERN, JUPITER_PATTERN, SATURN_PATTERN,
  PROGRESSED_SUN_PATTERN, PROGRESSED_MOON_PATTERN, PROFECTION_RULER_PATTERN,
} from "@/lib/astro/interpretations";
import { describeTransit, computeBonds } from "@/lib/astro/synastry";
import ChartWheel from "@/components/ChartWheel";

const PLANET_LABELS: Record<PlanetKey, string> = {
  sun: "Sun", moon: "Moon", mercury: "Mercury", venus: "Venus",
  mars: "Mars", jupiter: "Jupiter", saturn: "Saturn",
};

const PLANET_GLYPH: Record<PlanetKey, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂", jupiter: "♃", saturn: "♄",
};

const ZODIAC_GLYPH: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const SECONDARY_PATTERN: Record<Exclude<PlanetKey, "sun" | "moon">, Record<string, string>> = {
  mercury: MERCURY_PATTERN, venus: VENUS_PATTERN, mars: MARS_PATTERN,
  jupiter: JUPITER_PATTERN, saturn: SATURN_PATTERN,
};

type Tab = "chart" | "pattern" | "transits" | "deeper" | "bonds";

export default function BlueprintPage() {
  const [dob, setDob] = useState("1990-01-01");
  const [time, setTime] = useState("12:00");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [tab, setTab] = useState<Tab>("chart");

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const geo = await geocodeCity(city, country);
      if (!geo) {
        setError("Couldn't find that city — try a more specific name, or include a larger nearby city.");
        setLoading(false);
        return;
      }
      const utc = localBirthMomentToUTC(dob, time, geo.timezone);
      const natal = computeNatalChart(utc, geo.lat, geo.lon);
      setChart(natal);
    } catch (e) {
      setError("Something went wrong computing your chart. Double-check the date/time and try again.");
    } finally {
      setLoading(false);
    }
  };

  const transits = useMemo(() => (chart ? computeCurrentTransits() : null), [chart]);

  const ageYears = useMemo(() => {
    if (!chart) return 0;
    return (Date.now() - chart.utcDate.getTime()) / (365.2425 * 86400000);
  }, [chart]);

  const deeper = useMemo(() => {
    if (!chart) return null;
    const progressions = computeProgressions(chart.utcDate, ageYears);
    const profection = computeAnnualProfection(chart.ascendant.sign, ageYears);
    return { progressions, profection };
  }, [chart, ageYears]);

  const bonds = useMemo(() => {
    if (!chart) return null;
    const refUtc = localBirthMomentToUTC(
      ULAANBAATAR_1988.date, ULAANBAATAR_1988.time, ULAANBAATAR_1988.timezone
    );
    const refChart = computeNatalChart(refUtc, ULAANBAATAR_1988.lat, ULAANBAATAR_1988.lon);
    return computeBonds(
      { sun: chart.placements.sun.sign, moon: chart.placements.moon.sign, ascendant: chart.ascendant.sign },
      { sun: refChart.placements.sun.sign, moon: refChart.placements.moon.sign, ascendant: refChart.ascendant.sign }
    );
  }, [chart]);

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <DriftHeading eyebrow="IV · The Star Current">
        Soul Blueprint
      </DriftHeading>
      <p className="mt-8 text-lg sm:text-xl font-display italic font-light leading-[1.8] text-foam/90 max-w-xl mx-auto text-center">
        Think of this as a quiet conversation with the universe. Using the
        exact moment you were born, we'll explore the patterns and transits
        that make your journey uniquely yours.
      </p>
      <TideDivider />

      {!chart && (
        <TideCard className="p-7 mt-8 max-w-xl">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={16} className="text-gold" />
            <h3 className="font-medium text-ink dark:text-foam">Enter your birth details</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-ink/60 dark:text-mist/60 col-span-1">
              Date of birth
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
              />
            </label>
            <label className="text-xs text-ink/60 dark:text-mist/60 col-span-1">
              Exact birth time
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
              />
            </label>
            <label className="text-xs text-ink/60 dark:text-mist/60 col-span-1">
              Birth city
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Sydney"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
              />
            </label>
            <label className="text-xs text-ink/60 dark:text-mist/60 col-span-1">
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Australia"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
              />
            </label>
          </div>

          {error && <p className="text-xs mt-3 text-coral">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !city || !country}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium bg-ink text-foam dark:bg-foam dark:text-ink disabled:opacity-40"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
            {loading ? "Calculating your chart…" : "Build my blueprint"}
          </button>
          <p className="text-xs mt-3 text-ink/60 dark:text-mist/60">
            Exact birth time matters most for your Ascendant — even 15 minutes off can shift it.
            Unsure? Check your birth certificate.
          </p>
        </TideCard>
      )}

      {chart && (
        <div className="mt-8">
          <div className="flex gap-6 mb-8 flex-wrap items-end border-b border-foam/20">
            <TabButton active={tab === "chart"} onClick={() => setTab("chart")} icon={Orbit} label="Chart" />
            <TabButton active={tab === "pattern"} onClick={() => setTab("pattern")} icon={Compass} label="Your Pattern" />
            <TabButton active={tab === "transits"} onClick={() => setTab("transits")} icon={Clock3} label="Your Transits" />
            <TabButton active={tab === "deeper"} onClick={() => setTab("deeper")} icon={Layers} label="Deeper Layers" />
            <TabButton active={tab === "bonds"} onClick={() => setTab("bonds")} icon={Users} label="Bonds" />
            <button
              onClick={() => setChart(null)}
              className="ml-auto pb-2 text-xs text-foam/60 hover:text-foam transition-colors"
            >
              Recalculate
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === "chart" && <ChartView chart={chart} />}
              {tab === "pattern" && <PatternView chart={chart} />}
              {tab === "transits" && transits && <TransitsView chart={chart} transits={transits} />}
              {tab === "deeper" && deeper && <DeeperLayersView ageYears={ageYears} deeper={deeper} />}
              {tab === "bonds" && bonds && <BondsView bonds={bonds} />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-2 text-[11px] uppercase tracking-[0.2em] border-b transition-colors ${
        active
          ? "text-foam border-cyanglow"
          : "text-foam/50 border-transparent hover:text-foam"
      }`}
    >
      <Icon size={14} strokeWidth={1.75} /> {label}
    </button>
  );
}

function ChartView({ chart }: { chart: NatalChart }) {
  const allPlanets: PlanetKey[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"];
  return (
    <div className="grid sm:grid-cols-2 gap-6 items-start">
      <TideCard className="p-6">
        <ChartWheel chart={chart} />
        <p className="text-xs text-center mt-2 text-ink/60 dark:text-mist/60">
          Whole-sign houses, Ascendant marked in coral
        </p>
      </TideCard>
      <TideCard className="p-6">
        <h4 className="text-sm font-medium mb-4 text-ink dark:text-foam">Your placements</h4>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm py-1.5 border-b border-ink/5 dark:border-mist/10">
            <span className="flex items-center gap-2 text-ink/60 dark:text-mist/60">
              <span className="w-6 text-center text-gold" aria-hidden="true">ASC</span>
              Ascendant
            </span>
            <span className="flex items-center gap-2 text-ink dark:text-foam font-medium">
              {chart.ascendant.sign}
              <span className="text-lagoon dark:text-cyanglow" aria-hidden="true">{ZODIAC_GLYPH[chart.ascendant.sign]}</span>
            </span>
          </div>
          {allPlanets.map((p) => (
            <div key={p} className="flex items-center justify-between text-sm py-1.5 border-b border-ink/5 dark:border-mist/10 last:border-0">
              <span className="flex items-center gap-2 text-ink/60 dark:text-mist/60">
                <span className="w-6 text-center text-base text-gold" aria-hidden="true">{PLANET_GLYPH[p]}</span>
                {PLANET_LABELS[p]}
              </span>
              <span className="flex items-center gap-2 text-ink dark:text-foam font-medium">
                {chart.placements[p].sign}
                <span className="text-lagoon dark:text-cyanglow" aria-hidden="true">{ZODIAC_GLYPH[chart.placements[p].sign]}</span>
              </span>
            </div>
          ))}
        </div>
      </TideCard>
    </div>
  );
}

function PatternView({ chart }: { chart: NatalChart }) {
  const big3 = [
    { key: "sun", label: "Sun", sign: chart.placements.sun.sign, degree: chart.placements.sun.degree, text: SUN_PATTERN[chart.placements.sun.sign], deep: SUN_PATTERN_DEEP[chart.placements.sun.sign] },
    { key: "moon", label: "Moon", sign: chart.placements.moon.sign, degree: chart.placements.moon.degree, text: MOON_PATTERN[chart.placements.moon.sign], deep: MOON_PATTERN_DEEP[chart.placements.moon.sign] },
    { key: "ascendant", label: "Ascendant", sign: chart.ascendant.sign, degree: chart.ascendant.degree, text: RISING_PATTERN[chart.ascendant.sign], deep: RISING_PATTERN_DEEP[chart.ascendant.sign] },
  ];

  const others: Exclude<PlanetKey, "sun" | "moon">[] = ["mercury", "venus", "mars", "jupiter", "saturn"];

  return (
    <div className="space-y-5">
      <div className="grid gap-5">
        {big3.map((p) => (
          <TideCard key={p.key} className="p-7">
            <Pill>{p.label} · {p.sign} {p.degree.toFixed(1)}°</Pill>
            <p className="text-base mt-4 leading-relaxed font-display text-ink dark:text-foam">{p.text}</p>
            <p className="text-sm mt-3 leading-relaxed text-ink/70 dark:text-mist/70">{p.deep}</p>
          </TideCard>
        ))}
      </div>

      <h4 className="text-sm font-medium mt-8 mb-2 text-foam">The rest of your pattern</h4>
      <div className="grid sm:grid-cols-2 gap-5">
        {others.map((key) => {
          const placement = chart.placements[key];
          return (
            <TideCard key={key} className="p-6">
              <Pill>{PLANET_LABELS[key]} · {placement.sign} {placement.degree.toFixed(1)}°</Pill>
              <p className="text-sm mt-4 leading-relaxed text-ink/75 dark:text-mist/75">
                {SECONDARY_PATTERN[key][placement.sign]}
              </p>
            </TideCard>
          );
        })}
      </div>
    </div>
  );
}

function TransitsView({ chart, transits }: { chart: NatalChart; transits: Record<PlanetKey, { sign: any; degree: number }> }) {
  const keys: PlanetKey[] = ["moon", "mercury", "venus", "mars", "jupiter", "saturn"];
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {keys.map((key) => (
        <TideCard key={key} className="p-6">
          <Pill>{PLANET_LABELS[key]} now in {transits[key].sign}</Pill>
          <p className="text-sm mt-3 leading-relaxed text-ink/75 dark:text-mist/75">
            {describeTransit(chart.placements.sun.sign, transits[key].sign, PLANET_LABELS[key])}
          </p>
        </TideCard>
      ))}
    </div>
  );
}

function DeeperLayersView({
  ageYears,
  deeper,
}: {
  ageYears: number;
  deeper: { progressions: ReturnType<typeof computeProgressions>; profection: ReturnType<typeof computeAnnualProfection> };
}) {
  const { progressions, profection } = deeper;
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-foam/70 max-w-2xl">
        Two techniques most horoscope apps skip — progressions and profections track the chart in motion at a slower, more personal timescale than daily transits.
      </p>

      <TideCard className="p-7 border-l-2" style={{ borderLeftColor: "#E8B75E" }}>
        <Pill>Progressed Sun · the chapter you're in</Pill>
        <p className="text-base mt-4 leading-relaxed font-display text-ink dark:text-foam">
          {PROGRESSED_SUN_PATTERN[progressions.sun.sign]}
        </p>
        <p className="text-xs mt-4 text-ink/60 dark:text-mist/60">
          Progressed Sun ≈ {progressions.sun.degree.toFixed(1)}° {progressions.sun.sign} · secondary progressions, age {ageYears.toFixed(1)}
        </p>
      </TideCard>

      <TideCard className="p-7 border-l-2" style={{ borderLeftColor: "#E8B75E" }}>
        <Pill>Progressed Moon · the emotional season</Pill>
        <p className="text-base mt-4 leading-relaxed font-display text-ink dark:text-foam">
          {PROGRESSED_MOON_PATTERN[progressions.moon.sign]}
        </p>
        <p className="text-xs mt-4 text-ink/60 dark:text-mist/60">
          Progressed Moon ≈ {progressions.moon.degree.toFixed(1)}° {progressions.moon.sign} · cycles all 12 signs roughly every 27.3 years
        </p>
      </TideCard>

      <TideCard className="p-7 border-l-2" style={{ borderLeftColor: "#E8B75E" }}>
        <Pill>This year's timelord · annual profection</Pill>
        <p className="text-base mt-4 leading-relaxed font-display text-ink dark:text-foam">
          {PROFECTION_RULER_PATTERN[profection.ruler]}
        </p>
        <p className="text-xs mt-4 text-ink/60 dark:text-mist/60">
          House {profection.house} activated ({profection.rulerSign} sign) · ruled by {PLANET_LABELS[profection.ruler]} · whole-sign annual profection, solar year age {Math.floor(ageYears)}
        </p>
      </TideCard>
    </div>
  );
}

function BondsView({ bonds }: { bonds: ReturnType<typeof computeBonds> }) {
  return (
    <div className="space-y-5">
      <TideCard className="p-7">
        <Pill>Your bond with Undram</Pill>
        <p className="text-lg mt-4 font-medium font-display text-ink dark:text-foam">{bonds.headline}</p>
      </TideCard>
      <div className="grid sm:grid-cols-2 gap-5">
        <TideCard className="p-6">
          <h4 className="text-sm font-medium mb-3 text-ink dark:text-foam">What tends to work well</h4>
          <ul className="space-y-3">
            {bonds.worksWell.map((t, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink/75 dark:text-mist/75">{t}</li>
            ))}
          </ul>
        </TideCard>
        <TideCard className="p-6">
          <h4 className="text-sm font-medium mb-3 text-ink dark:text-foam">What's worth caring for</h4>
          <ul className="space-y-3">
            {bonds.needsCare.map((t, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink/75 dark:text-mist/75">{t}</li>
            ))}
          </ul>
        </TideCard>
      </div>
      <p className="text-xs text-foam/60">
        This is a simplified compatibility read based on real computed Sun/Moon placements and
        their elemental relationship — not full professional synastry (which would also weigh
        exact aspect angles and house overlays between the two charts).
      </p>
    </div>
  );
}
