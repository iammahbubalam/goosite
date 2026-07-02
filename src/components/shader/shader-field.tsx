"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// WebGL lib is heavy and only ever renders client-side (post-mount + IO-gated),
// so code-split it out of the shared bundle. Never SSRs anyway → ssr:false.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);

type ShaderFieldProps = {
  colors: string[];
  speed?: number;
  distortion?: number;
  swirl?: number;
  /** Zoom of the gradient field — below 1 shows more, smaller flow cells. */
  scale?: number;
  /** Organic grain on color edges (0–1) — gives currents a milky texture. */
  grainMixer?: number;
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
  scale = 1,
  grainMixer = 0,
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
          scale={scale}
          grainMixer={grainMixer}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
