"use client";

import { useEffect, useRef, useState } from "react";
import { Swirl } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

/**
 * Poured-milk swirl: twisting cream bands with noise distortion. Pure shader,
 * no geometry. Lazy-mounts near the viewport, pauses offscreen, and degrades to
 * a soft static CSS gradient under prefers-reduced-motion.
 */
export function MilkSwirl({
  className,
  speed = 0.7,
  twist = 0.62,
  fallback = "radial-gradient(120% 120% at 30% 20%, #fffaf3 0%, #fdf3e4 45%, #efe2cd 100%)",
}: {
  className?: string;
  speed?: number;
  twist?: number;
  fallback?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        setActive(entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      style={{ background: fallback }}
    >
      {!reduce && mounted && (
        <Swirl
          colorBack="#fffaf3"
          colors={["#ffffff", "#fff2e1", "#e9dcc6", "#dfe9f4"]}
          bandCount={3}
          twist={twist}
          center={0.15}
          proportion={0.5}
          softness={1}
          noise={0.45}
          noiseFrequency={0.4}
          speed={active ? speed : 0}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
