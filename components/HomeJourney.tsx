"use client";

import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Chapter, EditorialLink } from "@/components/ui";
import type { BareDraftPost } from "@/lib/wordpress";
import type { Recipe } from "@/lib/notion";
import type { Photo } from "@/lib/cloudinary";

/* Chapter and EditorialLink come from the shared UI kit — the Home page
 * IS the design system, so the same components render every page. */
function ChapterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <EditorialLink href={href} className="mt-10">
      {children}
    </EditorialLink>
  );
}

export default function HomeJourney({
  post,
  recipe,
  photo,
  quote,
}: {
  post: BareDraftPost | undefined;
  recipe: Recipe | undefined;
  photo: Photo | undefined;
  quote: string;
}) {

  return (
    <div className="text-foam">
      {/* Arrival — the coastline from above, real film */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 relative">
        <Reveal y={14}>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] opacity-70 mb-8">
            A quiet place by the sea
          </p>
          <h1 className="font-display font-light text-mega tracking-[-0.015em] text-shadow-soft">
            Bare<span className="italic">Canvas</span>
          </h1>
          <span className="block w-px h-14 bg-current opacity-30 mx-auto mt-10" />
          <p className="mt-8 text-lg sm:text-xl italic font-display font-light max-w-md mx-auto leading-relaxed opacity-95 text-shadow-soft">
            Life begins where the tide meets the shore.
          </p>
        </Reveal>
        <Reveal delay={0.15} y={0} className="absolute bottom-10 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[9px] uppercase tracking-[0.36em]">Begin</span>
          <ChevronDown className="animate-drift" size={16} strokeWidth={1.25} />
        </Reveal>
      </section>

      {/* I — Reflections, on the empty dawn beach */}
      {post && (
        <section className="min-h-[100svh] flex items-center justify-center px-6 py-28">
          <Reveal className="max-w-2xl mx-auto w-full text-center">
            <Chapter numeral="I" label="Tidepools of Thought" />
            <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
              Reflections
            </h2>
            <p className="mt-10 text-lg sm:text-2xl font-display italic font-light leading-[1.7] opacity-95 text-shadow-soft">
              “{post.excerpt}”
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] opacity-70">{post.title}</p>
            <ChapterLink href="/reflections">Continue reading</ChapterLink>
          </Reveal>
        </section>
      )}

      {/* Interlude — a single line as the sun clears the headland */}
      <section className="min-h-[55svh] flex items-center justify-center px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <span className="block w-8 h-px bg-current opacity-40 mx-auto mb-10" />
          <p className="text-xl sm:text-2xl font-display italic font-light leading-[1.8] text-shadow-soft">
            {quote}
          </p>
          <span className="block w-8 h-px bg-current opacity-40 mx-auto mt-10" />
        </Reveal>
      </section>

      {/* II — Kitchen, in the golden hour */}
      {recipe && (
        <section className="min-h-[100svh] flex items-center justify-center px-6 py-28">
          <Reveal className="max-w-2xl mx-auto w-full text-center">
            <Chapter numeral="II" label="The Hearth Hour" />
            <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
              Kitchen
            </h2>
            <p className="mt-10 text-lg sm:text-2xl font-display italic font-light leading-[1.7] opacity-95 text-shadow-soft">
              {recipe.name} — a small ritual, shared with care.
            </p>
            <ChapterLink href={`/kitchen/${recipe.id}`}>Turn the page</ChapterLink>
          </Reveal>
        </section>
      )}

      {/* III — Moments, in the pink dusk */}
      {photo && (
        <section className="min-h-[100svh] flex items-center justify-center px-6 py-28">
          <Reveal className="max-w-2xl mx-auto w-full text-center">
            <Chapter numeral="III" label="The Shoreline of Memory" />
            <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
              Moments
            </h2>
            <p className="mt-10 text-lg sm:text-2xl font-display italic font-light leading-[1.7] opacity-95 text-shadow-soft">
              Quiet fragments of life, held in light and colour.
            </p>
            <ChapterLink href="/moments">Wander the shoreline</ChapterLink>
          </Reveal>
        </section>
      )}

      {/* IV — Blueprint, under the southern stars */}
      <section className="min-h-[100svh] flex items-center justify-center px-6 py-28">
        <Reveal className="max-w-2xl mx-auto w-full text-center">
          <Chapter numeral="IV" label="The Star Current" />
          <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
            Soul Blueprint
          </h2>
          <p className="mt-10 text-lg sm:text-2xl font-display italic font-light leading-[1.7] opacity-95 text-shadow-soft">
            A map of your inner sky, cast from the true positions of the
            planets at the moment you were born.
          </p>
          <ChapterLink href="/blueprint">Chart your sky</ChapterLink>
        </Reveal>
      </section>

      {/* V — Journey, as the sky pales toward dawn again */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 py-28">
        <Reveal>
          <Chapter numeral="V" label="Where the Story Began" />
          <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
            Journey
          </h2>
          <p className="mt-10 text-lg sm:text-xl italic font-display font-light leading-[1.8] max-w-md mx-auto opacity-95 text-shadow-soft">
            A space to pause, wander, and rediscover the beauty within
            everyday life.
          </p>
          <ChapterLink href="/journey">Read the whole voyage</ChapterLink>
        </Reveal>
      </section>
    </div>
  );
}
