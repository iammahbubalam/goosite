"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Clip-path wipe reveal for hero-tier visuals. The content is uncovered on
 * scroll like a curtain drawing back. Static (fully visible) under reduced
 * motion. Wrap a single block that fills this element (h-full w-full).
 */
export function MaskReveal({
  children,
  className,
  direction = "up",
  rounded = "rounded-[2rem]",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
  rounded?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const from =
      direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";

    const tween = gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction]);

  return (
    <div ref={ref} className={cn("overflow-hidden", rounded, className)}>
      {children}
    </div>
  );
}
