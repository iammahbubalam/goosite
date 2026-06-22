"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

type ShaderFieldProps = {
  colors: string[];
  speed?: number;
  distortion?: number;
  swirl?: number;
  /** CSS gradient shown before the shader mounts and under reduced motion. */
  fallback?: string;
  className?: string;
};

/**
 * WebGL mesh-gradient backdrop. Mounts only when scrolled near the viewport
 * and pauses (speed 0) when offscreen, so several can live on one page without
 * burning the GPU. Under prefers-reduced-motion it stays a static CSS gradient.
 */
export function ShaderField({
  colors,
  speed = 0.3,
  distortion = 0.8,
  swirl = 0.6,
  fallback,
  className,
}: ShaderFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  // Render-time read; on the server this is always false so SSR shows the
  // static fallback and never mounts WebGL.
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
      style={fallback ? { background: fallback } : undefined}
    >
      {!reduce && mounted && (
        <MeshGradient
          colors={colors}
          speed={active ? speed : 0}
          distortion={distortion}
          swirl={swirl}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
