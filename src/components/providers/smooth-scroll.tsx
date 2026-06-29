"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll";

/**
 * Lenis smooth scroll synced to the GSAP ticker so ScrollTrigger and Lenis
 * share one rAF loop. Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    // lerp-based smoothing is frame-rate independent and gives a consistent,
    // buttery glide that Framer's useScroll tracks precisely (no spring lag).
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on(
      "scroll",
      (e: { progress: number; velocity: number; scroll: number }) => {
        scrollState.progress = e.progress;
        scrollState.velocity = e.velocity;
        scrollState.y = e.scroll;
        ScrollTrigger.update();
      },
    );

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
