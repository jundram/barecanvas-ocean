import tzLookup from "tz-lookup";

export interface GeoResult {
  lat: number;
  lon: number;
  displayName: string;
  timezone: string; // IANA zone, e.g. "Asia/Ulaanbaatar"
}

// A fixed, hardcoded reference point — used for "Bonds" comparisons — so
// that one doesn't depend on a network geocoding call at request time.
export const ULAANBAATAR_1988: { date: string; time: string } & GeoResult = {
  date: "1988-12-30",
  time: "08:50",
  lat: 47.9077,
  lon: 106.8832,
  displayName: "Ulaanbaatar, Mongolia",
  timezone: "Asia/Ulaanbaatar",
};

/**
 * Geocodes a city/country via OpenStreetMap's free Nominatim API (no key
 * required). This runs client-side in the browser, so it needs real
 * internet access at the time someone uses the Soul Blueprint form —
 * fine once deployed, just not something testable inside a sandboxed
 * dev environment without network access.
 */
export async function geocodeCity(city: string, country: string): Promise<GeoResult | null> {
  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;

  const results = await res.json();
  if (!Array.isArray(results) || results.length === 0) return null;

  const { lat, lon, display_name } = results[0];
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  return {
    lat: latNum,
    lon: lonNum,
    displayName: display_name,
    timezone: tzLookup(latNum, lonNum),
  };
}

/**
 * Converts a birth date + local time + IANA timezone into the correct
 * UTC instant, using the JS engine's own built-in historical timezone
 * database (Intl API) — no extra network call, and it correctly accounts
 * for historical DST rule changes, not just the zone's current offset.
 */
export function localBirthMomentToUTC(
  dateStr: string, // "YYYY-MM-DD"
  timeStr: string, // "HH:mm"
  timezone: string
): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  // Start from a naive UTC guess, then correct using the actual offset
  // the timezone had at that moment (handles DST/historical changes).
  const naiveUtcGuess = Date.UTC(year, month - 1, day, hour, minute);

  const offsetMinutes = getOffsetMinutesAt(naiveUtcGuess, timezone);
  return new Date(naiveUtcGuess - offsetMinutes * 60000);
}

function getOffsetMinutesAt(utcMillis: number, timezone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = dtf.formatToParts(new Date(utcMillis));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);

  const asUtc = Date.UTC(
    get("year"), get("month") - 1, get("day"),
    get("hour"), get("minute"), get("second")
  );
  return (asUtc - utcMillis) / 60000;
}
