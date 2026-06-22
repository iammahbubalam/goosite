"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Counts up to `to` the first time it scrolls into view. Renders the final
 * value server-side (good for SEO / no-JS) and animates on the client.
 */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString()}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt(to);
      return;
    }

    el.textContent = fmt(0);
    const obj = { v: 0 };
    let tween: gsap.core.Tween | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween = gsap.to(obj, {
            v: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = fmt(obj.v);
            },
          });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [to, suffix, prefix, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {to.toLocaleString()}
      {suffix}
    </span>
  );
}
