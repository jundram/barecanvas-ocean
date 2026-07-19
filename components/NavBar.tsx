"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass, PenLine, ChefHat, Sparkles, User, Settings as SettingsIcon, Camera, X,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/reflections", label: "Reflections", icon: PenLine },
  { href: "/kitchen", label: "Kitchen", icon: ChefHat },
  { href: "/blueprint", label: "Soul Blueprint", icon: Sparkles },
  { href: "/moments", label: "Moments", icon: Camera },
  { href: "/journey", label: "Journey", icon: User },
  { href: "/account", label: "Account", icon: SettingsIcon },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-foam text-shadow-soft"
          onClick={() => setOpen(false)}
        >
          Bare<span className="italic font-light">Canvas</span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md border-foam/25 text-foam bg-abyss/25 transition-colors duration-200 hover:bg-abyss/40"
          aria-label="Open navigation"
        >
          {open ? <X size={15} /> : <Compass size={15} />}
        </button>
      </header>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed top-[76px] right-5 sm:right-8 z-40 w-[min(280px,calc(100vw-2.5rem))] rounded-[24px] border backdrop-blur-xl overflow-hidden bg-abyss/70 border-foam/[0.15]"
        >
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm border-b last:border-b-0 border-foam/[0.08] transition-colors ${
                  active ? "text-gold" : "text-foam/85 hover:text-foam"
                }`}
              >
                <n.icon size={15} strokeWidth={1.75} />
                {n.label}
              </Link>
            );
          })}
        </motion.nav>
      )}

      {/* Mobile bottom dock — quick wayfinding without opening the drawer */}
      <nav className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between px-1.5 py-1.5 rounded-2xl border backdrop-blur-xl bg-abyss/60 border-foam/[0.15]">
        {NAV.slice(0, 5).map((n) => {
          const active = pathname === n.href;
          return (
            <Link key={n.href} href={n.href} className="relative flex-1 flex flex-col items-center gap-1 py-2">
              <n.icon size={16} strokeWidth={1.75} className={active ? "text-gold" : "text-foam/60"} />
              <span className={`text-[8px] tracking-wide ${active ? "text-gold" : "text-foam/60"}`}>
                {n.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
