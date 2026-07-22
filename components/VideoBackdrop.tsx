"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The one film: the aerial turquoise coastline.
const SRC = "/media/hero-coast.mp4";

// ~45% natural speed — calm, cinematic drift along the coast.
const RATE = 0.45;

// Scrolling gently accelerates the flight up to this rate, easing back to
// the resting pace when the visitor stops. Modulating playbackRate (never
// seeking) keeps the motion perfectly continuous — it can speed up and
// breathe, but it can never jump.
const MAX_RATE = 1.35;

// Seconds of *video time* over which the end dissolves into the start.
// At 45% speed this reads as a ~3s crossfade — the loop never shows a cut.
const FADE = 1.4;

/** The site's single backdrop.
 *
 * On the home page the film plays — slow motion, scroll-responsive,
 * seamlessly looped via two staggered copies of the same clip.
 *
 * On every other page the film FREEZES exactly where it was, becoming a
 * still photograph of the coast, and a soft ocean-toned light veil fades
 * over it so ink-dark editorial type reads with high contrast. Because
 * the frozen frame is simply the film paused mid-flight, moving between
 * the animated home and the still sections is one continuous image —
 * nothing swaps, the water just holds its breath. */
export default function VideoBackdrop() {
  const pathname = usePathname();
  const vidA = useRef<HTMLVideoElement | null>(null);
  const vidB = useRef<HTMLVideoElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const raysRef = useRef<HTMLDivElement | null>(null);
  const mistRef = useRef<HTMLDivElement | null>(null);
  const isHomeRef = useRef(true);

  // Route changes: freeze or wake the film, cross-dissolve the overlays,
  // and flag the surface so content-panel type flips to ink. The frozen
  // frame itself stays fully visible — no full-page veil; sections float
  // their own glass panels over it.
  useEffect(() => {
    const isHome = pathname === "/";
    isHomeRef.current = isHome;
    if (isHome) {
      delete document.body.dataset.surface;
    } else {
      document.body.dataset.surface = "light";
    }
    if (scrimRef.current) scrimRef.current.style.opacity = isHome ? "1" : "0";
    if (raysRef.current) raysRef.current.style.opacity = isHome ? "0.22" : "0";
    if (mistRef.current) mistRef.current.style.opacity = isHome ? "0.35" : "0";
  }, [pathname]);

  useEffect(() => {
    const a = vidA.current;
    const b = vidB.current;
    if (!a || !b) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vids: HTMLVideoElement[] = [a, b];
    vids.forEach((v) => {
      // iOS only autoplays a video it is CERTAIN is muted and inline.
      // React doesn't reliably reflect the `muted` prop onto the DOM node,
      // so set both properties imperatively before any play() call — this
      // is the difference between a black box and a playing film on iPhone.
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("webkit-playsinline", "");
      v.playbackRate = RATE;
    });
    let active = 0;
    let raf = 0;
    let last = performance.now();
    let lastScrollY = window.scrollY;
    let velocity = 0; // smoothed scroll speed, px/s
    let rate = RATE;

    const ensurePlaying = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p) p.catch(() => {});
    };

    // Kick playback on the first user gesture as a fallback: iOS sometimes
    // refuses the initial programmatic play() (notably right after load or
    // in some Low Power states), but honours it once the user touches or
    // scrolls. One-shot, then removed.
    const kick = () => {
      if (isHomeRef.current) ensurePlaying(vids[active]);
    };
    const kickEvents = ["touchstart", "pointerdown", "scroll", "click"];
    kickEvents.forEach((e) =>
      window.addEventListener(e, kick, { once: true, passive: true })
    );

    a.style.opacity = "1";
    b.style.opacity = "0";

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1) || 0.016;
      last = now;

      const cur = vids[active];
      const nxt = vids[1 - active];

      if (reduced || !isHomeRef.current) {
        // stilled sections: hold the frame, no motion at all
        if (!cur.paused) cur.pause();
        if (!nxt.paused) nxt.pause();
        velocity = 0;
        rate = RATE;
        lastScrollY = window.scrollY;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (cur.paused && !cur.ended) ensurePlaying(cur);

      // scroll-responsive playback: scroll speed (either direction) leans
      // on the accelerator; a low-pass filter and an eased return glide
      // the rate back down to the resting drift when scrolling stops
      const dy = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      const instVel = dy / dt;
      velocity += (instVel - velocity) * Math.min(dt * 6, 1);
      const targetRate = Math.min(RATE + velocity * 0.00045, MAX_RATE);
      rate += (targetRate - rate) * Math.min(dt * 3, 1);

      if (Math.abs(cur.playbackRate - rate) > 0.005) cur.playbackRate = rate;
      if (Math.abs(nxt.playbackRate - rate) > 0.005) nxt.playbackRate = rate;

      const dur = cur.duration;
      if (Number.isFinite(dur) && dur > 0) {
        const remain = dur - cur.currentTime;
        if (remain < FADE || cur.ended) {
          if (nxt.paused) {
            try {
              nxt.currentTime = 0;
            } catch {}
            ensurePlaying(nxt);
          }
          nxt.style.zIndex = "1";
          nxt.style.opacity = "1";
          cur.style.zIndex = "2";
          cur.style.opacity = String(Math.min(Math.max(remain / FADE, 0), 1));
          if (remain < 0.08 || cur.ended) {
            cur.pause();
            cur.style.opacity = "0";
            active = 1 - active;
          }
        } else {
          cur.style.zIndex = "2";
          cur.style.opacity = "1";
          nxt.style.zIndex = "1";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      kickEvents.forEach((e) => window.removeEventListener(e, kick));
    };
  }, []);

  const overlayTransition = { transition: "opacity 700ms ease" };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-abyss" aria-hidden="true">
      <video
        ref={vidA}
        src={SRC}
        muted
        autoPlay
        loop={false}
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1, zIndex: 2 }}
      />
      <video
        ref={vidB}
        src={SRC}
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, zIndex: 1 }}
      />

      {/* home: legibility scrim — gentle darkening top and bottom */}
      <div
        ref={scrimRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          opacity: 1,
          ...overlayTransition,
          background:
            "linear-gradient(to bottom, rgba(7,13,20,0.52) 0%, rgba(7,13,20,0.20) 32%, rgba(7,13,20,0.16) 58%, rgba(7,13,20,0.55) 100%)",
        }}
      />

      {/* soft light rays falling from the upper sky (home only) */}
      <div
        ref={raysRef}
        className="absolute inset-0 pointer-events-none rays-layer"
        style={{ zIndex: 11, opacity: 0.22, ...overlayTransition }}
      />

      {/* two mist veils drifting at different speeds (home only) */}
      <div
        ref={mistRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 12, opacity: 0.35, ...overlayTransition }}
      >
        <div className="mist-layer mist-a" />
        <div className="mist-layer mist-b" />
      </div>
    </div>
  );
}
