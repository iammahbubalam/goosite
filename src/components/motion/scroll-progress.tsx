"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll";

/**
 * A 2px reading-progress hairline pinned to the very top of the page. Reads the
 * shared Lenis scroll progress each frame — no extra scroll listener. Sage →
 * ink so it carries the organic accent across the whole site.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    const onTick = () => {
      el.style.transform = `scaleX(${scrollState.progress})`;
    };
    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(90deg, var(--color-sage) 0%, var(--color-ink) 100%)",
      }}
      ref={bar}
    />
  );
}
