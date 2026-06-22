"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [delay, text]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {text}
    </Tag>
  );
}
