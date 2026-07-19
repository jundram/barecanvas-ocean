"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChefHat, ArrowUpRight } from "lucide-react";
import { TideDivider } from "@/components/ui";
import Reveal from "@/components/Reveal";
import type { Recipe } from "@/lib/notion";

export default function KitchenList({ recipes }: { recipes: Recipe[] }) {
  const [filter, setFilter] = useState("All");

  const tags = useMemo(() => {
    const unique = Array.from(new Set(recipes.map((r) => r.tag).filter(Boolean)));
    return ["All", ...unique];
  }, [recipes]);

  const shown = filter === "All" ? recipes : recipes.filter((r) => r.tag === filter);

  return (
    <div className="text-foam">
      <div className="flex items-center gap-6 mt-8 mb-4 flex-wrap">
        {tags.map((tg) => (
          <button
            key={tg}
            onClick={() => setFilter(tg)}
            className={`pb-1 text-[11px] uppercase tracking-[0.14em] border-b transition-colors ${
              filter === tg
                ? "text-foam border-foam"
                : "text-foam/50 border-transparent hover:text-foam"
            }`}
          >
            {tg}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-sm mt-8 text-foam/70">No recipes with this tag yet.</p>
      ) : (
        <div className="mt-4">
          {shown.map((r, i) => (
            <Reveal key={r.id}>
              <Link href={`/kitchen/${r.id}`} className="group block py-14 sm:py-16">
                <div className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-16 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="sm:w-1/2 w-full">
                    <div className="rounded-[28px] overflow-hidden aspect-[4/3] shadow-[0_16px_60px_rgba(4,10,16,0.35)]">
                      {r.imageUrl ? (
                        <img
                          src={r.imageUrl}
                          alt={r.name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-abyss/30 flex items-center justify-center">
                          <ChefHat size={32} strokeWidth={1} className="text-foam/50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm:w-1/2 w-full">
                    <span className="text-4xl font-display italic text-foam/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-3xl sm:text-4xl font-display font-light leading-tight text-foam text-shadow-soft">
                      {r.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] uppercase tracking-[0.3em] text-foam/60">
                      {r.time && <span>{r.time}</span>}
                      {r.time && r.diff && <span>·</span>}
                      {r.diff && <span>{r.diff}</span>}
                      {typeof r.rating === "number" && (
                        <>
                          <span>·</span>
                          <span>{r.rating.toFixed(1)} ★</span>
                        </>
                      )}
                    </div>
                    {r.tag && (
                      <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-foam/60">
                        {r.tag}
                      </p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foam/70 group-hover:text-foam transition-colors">
                      Turn the page <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
              {i < shown.length - 1 && <TideDivider />}
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
