"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* The Home page is the design system. Every component here mirrors its
 * typography exactly — Fraunces display in light weight for headings and
 * ledes, Inter for small-caps meta, one centered visual hierarchy. */

/** Centered chapter mark — italic numeral above a hairline rule above a
 * wide-tracked small-caps label. Identical to the Home page chapters. */
export function Chapter({ numeral, label }: { numeral?: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-5 mb-10">
      {numeral && <span className="font-display italic text-lg opacity-70">{numeral}</span>}
      <span className="block w-px h-10 bg-current opacity-30" />
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] opacity-75">{label}</p>
    </div>
  );
}

/** The one link style: small caps, wide tracking, hairline underline,
 * arrow. Used for every call-to-action across the site. */
export function EditorialLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] opacity-75 hover:opacity-100 transition-opacity duration-200 ${className}`;
  const inner = (
    <>
      <span className="border-b border-current pb-1">{children}</span>
      <ArrowUpRight size={13} strokeWidth={1.5} />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Page heading in the Home chapter style. Accepts the existing
 * `eyebrow` format ("I · Tidepools of Thought") and splits it into the
 * numeral + label of the chapter mark. */
export function DriftHeading({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  let numeral: string | undefined;
  let label = eyebrow ?? "";
  if (eyebrow && eyebrow.includes("·")) {
    const idx = eyebrow.indexOf("·");
    numeral = eyebrow.slice(0, idx).trim();
    label = eyebrow.slice(idx + 1).trim();
  }
  return (
    <div className={`text-foam text-center ${className}`}>
      {eyebrow && <Chapter numeral={numeral} label={label} />}
      <h1 className="font-display font-light text-huge tracking-[-0.01em] text-foam text-shadow-soft">
        {children}
      </h1>
    </div>
  );
}

/** Standard lede paragraph under a page heading — the Home page's
 * italic display voice, centered. */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 text-lg sm:text-xl font-display italic font-light leading-[1.8] text-foam/90 max-w-xl mx-auto text-center">
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-foam text-center">
      <Chapter label={eyebrow} />
      <h2 className="font-display font-light text-huge tracking-[-0.01em] text-shadow-soft">
        {title}
      </h2>
      <p className="mt-8 text-base sm:text-lg font-display italic font-light leading-[1.8] text-foam/80 max-w-xl mx-auto">
        {desc}
      </p>
      <TideDivider />
    </div>
  );
}

export function TideCard({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[18px] border backdrop-blur-md bg-foam/80 border-ink/[0.08] shadow-[0_8px_40px_rgba(14,42,46,0.08)] dark:bg-abyssdeep/50 dark:border-cyanglow/[0.12] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-stone dark:text-mist/70">
      <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" />
      {children}
    </span>
  );
}

export function TideDivider() {
  return (
    <div className="flex items-center gap-4 my-10" aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foam/30 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-foam/50" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foam/30 to-transparent" />
    </div>
  );
}
