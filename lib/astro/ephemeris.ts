import * as Astronomy from "astronomy-engine";

/**
 * VALIDATION NOTE (please read before trusting this):
 * This was written from documented library APIs and standard formulas
 * (Meeus, "Astronomical Algorithms") without being able to execute or
 * test it end-to-end in the environment it was authored in. Before
 * relying on it, sanity-check a known birth chart against a trusted
 * source like astro.com or astro-seek.com — especially the Ascendant,
 * which is the calculation most sensitive to small errors in timezone
 * or coordinate input.
 */

export const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type Sign = (typeof SIGNS)[number];

export function signFromLongitude(eclipticLongitudeDeg: number): { sign: Sign; degree: number } {
  const norm = ((eclipticLongitudeDeg % 360) + 360) % 360;
  const index = Math.floor(norm / 30);
  const degree = norm - index * 30;
  return { sign: SIGNS[index], degree };
}

function eclipticLongitudeOf(body: Astronomy.Body, date: Date): number {
  if (body === Astronomy.Body.Sun) {
    // Dedicated helper for apparent geocentric ecliptic longitude of the Sun.
    return Astronomy.SunPosition(date).elon;
  }
  const vector =
    body === Astronomy.Body.Moon
      ? Astronomy.GeoVector(Astronomy.Body.Moon, date, true)
      : Astronomy.GeoVector(body, date, true);
  const ecl = Astronomy.Ecliptic(vector);
  return ecl.elon;
}

// Mean obliquity of the ecliptic (Meeus 22.2), accurate to well within
// what's needed for an Ascendant calculation.
function obliquityDeg(date: Date): number {
  const jd = dateToJulianDay(date);
  const T = (jd - 2451545.0) / 36525;
  return (
    23.4392911 -
    0.0130042 * T -
    0.00000164 * T * T +
    0.000000504 * T * T * T
  );
}

function dateToJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/**
 * Ascendant (rising sign), via Greenwich Apparent Sidereal Time + standard
 * spherical-astronomy formula. `date` must be the precise UTC instant of
 * birth; `lonDeg` is birth longitude (east positive); `latDeg` is birth
 * latitude (north positive).
 */
export function ascendantLongitude(date: Date, latDeg: number, lonDeg: number): number {
  const gstHours = Astronomy.SiderealTime(date); // Greenwich sidereal time, in hours
  const lstHours = (((gstHours + lonDeg / 15) % 24) + 24) % 24;
  const ramcDeg = lstHours * 15;
  const obl = obliquityDeg(date);

  const ramc = rad(ramcDeg);
  const lat = rad(latDeg);
  const eps = rad(obl);

  // The textbook atan2(-cos(RAMC), ...) form lands on the Descendant, not
  // the Ascendant — verified against a real chart (30 Dec 1988, 08:50,
  // Ulaanbaatar: this produced Cancer when the actual Ascendant is
  // Capricorn, exactly 180° off). Negating both components rotates the
  // result by the needed 180° without disturbing the quadrant logic.
  const y = Math.cos(ramc);
  const x = -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps));
  let asc = deg(Math.atan2(y, x));
  asc = ((asc % 360) + 360) % 360;
  return asc;
}

export type PlanetKey =
  | "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn";

export interface ChartPlacement {
  sign: Sign;
  degree: number;
  house: number; // 1-12, whole-sign
}

export interface NatalChart {
  utcDate: Date;
  lat: number;
  lon: number;
  ascendant: { sign: Sign; degree: number };
  placements: Record<PlanetKey, ChartPlacement>;
}

const BODY_MAP: Record<PlanetKey, Astronomy.Body> = {
  sun: Astronomy.Body.Sun,
  moon: Astronomy.Body.Moon,
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
};

/** Whole-sign house: house 1 = Ascendant's sign, counting forward. */
function wholeSignHouse(ascSign: Sign, placementSign: Sign): number {
  const ascIndex = SIGNS.indexOf(ascSign);
  const placementIndex = SIGNS.indexOf(placementSign);
  return ((placementIndex - ascIndex + 12) % 12) + 1;
}

export function computeNatalChart(utcDate: Date, lat: number, lon: number): NatalChart {
  const ascLon = ascendantLongitude(utcDate, lat, lon);
  const asc = signFromLongitude(ascLon);

  const placements = {} as Record<PlanetKey, ChartPlacement>;
  (Object.keys(BODY_MAP) as PlanetKey[]).forEach((key) => {
    const elon = eclipticLongitudeOf(BODY_MAP[key], utcDate);
    const { sign, degree } = signFromLongitude(elon);
    placements[key] = { sign, degree, house: wholeSignHouse(asc.sign, sign) };
  });

  return { utcDate, lat, lon, ascendant: asc, placements };
}

/** Current transiting positions of the faster-moving, most-felt bodies. */
export function computeCurrentTransits(now: Date = new Date()) {
  const keys: PlanetKey[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"];
  const out = {} as Record<PlanetKey, { sign: Sign; degree: number }>;
  keys.forEach((key) => {
    const elon = eclipticLongitudeOf(BODY_MAP[key], now);
    out[key] = signFromLongitude(elon);
  });
  return out;
}

/**
 * Secondary progressions — "a day for a year." The progressed Sun/Moon
 * position is the real planetary position on the day `ageYears` days
 * after birth, not `ageYears` years after birth. This is the standard
 * technique for tracking slower-moving identity ("progressed Sun", one
 * sign roughly every ~30 years) and emotional-season ("progressed Moon",
 * one sign roughly every ~2.3 years) shifts across a lifetime.
 */
export function computeProgressions(
  natalUtcDate: Date,
  ageYears: number
): { sun: { sign: Sign; degree: number }; moon: { sign: Sign; degree: number } } {
  const progressedDate = new Date(natalUtcDate.getTime() + ageYears * 86400000);
  const sunElon = eclipticLongitudeOf(Astronomy.Body.Sun, progressedDate);
  const moonElon = eclipticLongitudeOf(Astronomy.Body.Moon, progressedDate);
  return { sun: signFromLongitude(sunElon), moon: signFromLongitude(moonElon) };
}

// Traditional (classical 7-planet) sign rulerships — matches the planet
// set this engine actually tracks, rather than modern outer-planet rulers.
export const TRADITIONAL_RULER: Record<Sign, PlanetKey> = {
  Aries: "mars", Taurus: "venus", Gemini: "mercury", Cancer: "moon",
  Leo: "sun", Virgo: "mercury", Libra: "venus", Scorpio: "mars",
  Sagittarius: "jupiter", Capricorn: "saturn", Aquarius: "saturn", Pisces: "jupiter",
};

/**
 * Annual profection — an older whole-sign technique. At age N (completed
 * solar years since birth), the profected house is `1 + (N mod 12)`,
 * counted forward from the natal Ascendant, and that house's sign ruler
 * becomes the year's "timelord" — the planet whose themes color the
 * whole year.
 */
export function computeAnnualProfection(
  ascendantSign: Sign,
  ageYears: number
): { house: number; ruler: PlanetKey; rulerSign: Sign } {
  const ageInt = Math.max(0, Math.floor(ageYears));
  const house = 1 + (ageInt % 12);
  const ascIndex = SIGNS.indexOf(ascendantSign);
  const rulerSign = SIGNS[(ascIndex + house - 1) % 12];
  return { house, ruler: TRADITIONAL_RULER[rulerSign], rulerSign };
}

export const ELEMENT: Record<Sign, "Fire" | "Earth" | "Air" | "Water"> = {
  Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
  Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
  Gemini: "Air", Libra: "Air", Aquarius: "Air",
  Cancer: "Water", Scorpio: "Water", Pisces: "Water",
};

export const MODALITY: Record<Sign, "Cardinal" | "Fixed" | "Mutable"> = {
  Aries: "Cardinal", Cancer: "Cardinal", Libra: "Cardinal", Capricorn: "Cardinal",
  Taurus: "Fixed", Leo: "Fixed", Scorpio: "Fixed", Aquarius: "Fixed",
  Gemini: "Mutable", Virgo: "Mutable", Sagittarius: "Mutable", Pisces: "Mutable",
};
