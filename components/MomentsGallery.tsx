"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Photo } from "@/lib/cloudinary";

export default function MomentsGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<Photo | null>(null);
  const [filter, setFilter] = useState("All");

  const tags = useMemo(() => {
    const unique = Array.from(new Set(photos.map((p) => p.tag)));
    return ["All", ...unique];
  }, [photos]);

  const shown = filter === "All" ? photos : photos.filter((p) => p.tag === filter);

  const cols: Photo[][] = [[], [], [], []];
  shown.forEach((p, i) => cols[i % 4].push(p));

  return (
    <div>
      <div className="flex items-center gap-6 mt-8 mb-10 flex-wrap">
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
        <p className="text-sm text-foam/70">No photos in this room yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-2.5">
              {col.map((p) => (
                <motion.button
                  key={p.url}
                  onClick={() => setActive(p)}
                  whileHover={{ scale: 0.985 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative rounded-2xl overflow-hidden group border border-foam/[0.15] shadow-[0_10px_40px_rgba(4,10,16,0.3)]"
                  style={{ height: p.h * 0.72 }}
                >
                  <img
                    src={p.url}
                    alt={p.caption}
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-[filter] duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-abyss/60 via-abyss/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-1 group-hover:translate-y-0">
                    <p className="text-[10px] uppercase tracking-wide text-left leading-snug text-white">{p.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-abyss/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-[28px] overflow-hidden bg-foam dark:bg-abyssdeep"
            >
              <img src={active.url} alt={active.caption} className="w-full max-h-[75vh] object-cover" />
              <div className="p-5 flex items-center justify-between">
                <p className="text-sm text-ink dark:text-foam">{active.caption}</p>
                <button
                  onClick={() => setActive(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-ink/15 dark:border-cyanglow/20 text-ink dark:text-foam"
                >
                  <X size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
