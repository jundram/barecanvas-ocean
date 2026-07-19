import { ELEMENT, MODALITY, Sign, SIGNS } from "./ephemeris";

type ElementRelation = "same-element" | "compatible" | "friction" | "neutral";

const COMPATIBLE_PAIRS: Record<string, string> = {
  Fire: "Air",
  Air: "Fire",
  Earth: "Water",
  Water: "Earth",
};

function elementRelation(a: Sign, b: Sign): ElementRelation {
  const ea = ELEMENT[a];
  const eb = ELEMENT[b];
  if (ea === eb) return "same-element";
  if (COMPATIBLE_PAIRS[ea] === eb) return "compatible";
  const opposingPairs: Record<string, string> = { Fire: "Water", Water: "Fire", Earth: "Air", Air: "Earth" };
  if (opposingPairs[ea] === eb) return "friction";
  return "neutral";
}

/** How many signs apart (0-11), used to describe transit "distance" from natal placement. */
function signDistance(natal: Sign, transiting: Sign): number {
  return (SIGNS.indexOf(transiting) - SIGNS.indexOf(natal) + 12) % 12;
}

export function describeTransit(natalSunSign: Sign, transitingSign: Sign, planetLabel: string): string {
  const distance = signDistance(natalSunSign, transitingSign);
  const rel = elementRelation(natalSunSign, transitingSign);

  if (distance === 0) {
    return `${planetLabel} is currently moving through your own sign — a period where this planet's themes are unusually close to the surface for you, more noticeable than in most stretches of the year.`;
  }
  if (distance === 6) {
    return `${planetLabel} is currently opposite your natal placement — a good stretch to notice where you're being pulled toward balance rather than more of the same approach.`;
  }
  if (rel === "same-element") {
    return `${planetLabel} is moving through a sign that shares your core element — this tends to feel supportive and fluent rather than effortful, a period where your usual instincts work in your favor.`;
  }
  if (rel === "compatible") {
    return `${planetLabel} is in a sign that pairs easily with yours — a period well-suited to acting on plans rather than just holding them.`;
  }
  if (rel === "friction") {
    return `${planetLabel} is in a sign that runs counter to your natural rhythm right now — not a bad period, but one where things may take more deliberate effort than usual to land.`;
  }
  return `${planetLabel} is passing through a neutral relationship to your placement — a quieter stretch, worth using for steady progress rather than expecting a dramatic shift.`;
}

export interface BondsResult {
  headline: string;
  worksWell: string[];
  needsCare: string[];
}

/**
 * Simplified synastry — a real comparison of two computed charts by
 * element and modality, not full professional synastry (which would
 * additionally weigh exact aspect angles and house overlays). Framed
 * honestly as a first-pass read, not a definitive verdict.
 */
export function computeBonds(
  personA: { sun: Sign; moon: Sign; ascendant: Sign },
  personB: { sun: Sign; moon: Sign; ascendant: Sign }
): BondsResult {
  const sunRel = elementRelation(personA.sun, personB.sun);
  const moonRel = elementRelation(personA.moon, personB.moon);
  const sameModalitySun = MODALITY[personA.sun] === MODALITY[personB.sun];

  const worksWell: string[] = [];
  const needsCare: string[] = [];

  if (sunRel === "same-element" || sunRel === "compatible") {
    worksWell.push(
      `Your core drives (${personA.sun} and ${personB.sun}) run in a naturally compatible direction — you're less likely to need to explain your motives to each other than most pairings.`
    );
  } else if (sunRel === "friction") {
    needsCare.push(
      `Your core drives (${personA.sun} and ${personB.sun}) pull in genuinely different directions — worth naming explicitly rather than assuming the other person "should" want the same pace or approach you do.`
    );
  } else {
    worksWell.push(
      `Your core drives (${personA.sun} and ${personB.sun}) aren't in obvious tension, but they're also not automatically aligned — this bond likely runs on effort and clarity more than instinct.`
    );
  }

  if (moonRel === "same-element" || moonRel === "compatible") {
    worksWell.push(
      `Emotionally, ${personA.moon} and ${personB.moon} tend to regulate each other well — one of you is less likely to feel chronically misread by the other.`
    );
  } else {
    needsCare.push(
      `Emotionally, ${personA.moon} and ${personB.moon} process things differently enough that reassurance which works for one of you may not land the same way for the other — worth checking rather than assuming.`
    );
  }

  if (sameModalitySun) {
    needsCare.push(
      `You share the same core modality (both ${MODALITY[personA.sun]}), which can mean similar instincts about timing and pace — good for rhythm, but with less natural balancing from the other side when you're both moving the same way at once.`
    );
  }

  const headline =
    sunRel === "friction"
      ? "A bond with real charge to it — genuinely energizing when it's working, and worth deliberate care when it isn't."
      : "A bond with more natural ease than friction — the kind that tends to run smoothly with only occasional, specific check-ins needed.";

  return { headline, worksWell, needsCare };
}
