"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Masked, word-by-word reveal for editorial headlines. Each line clips its
 * words, which rise into place on scroll. Falls back to static text under
 * prefers-reduced-motion.
 */
export function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // split-type is only needed once we've decided to animate, so load it on
    // demand to keep it out of the shared client bundle.
    import("split-type").then(({ default: SplitType }) => {
      if (cancelled) return;

      const split = new SplitType(el, {
        types: "lines,words",
        lineClass: "reveal-line",
      });

      const tween = gsap.from(split.words, {
        yPercent: 115,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.045,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [delay, text]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {text}
    </Tag>
  );
}
