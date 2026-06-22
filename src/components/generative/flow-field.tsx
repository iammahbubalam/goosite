"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ---- seeded value noise (no deps) ------------------------------------ */

function valueHash(xi: number, yi: number, seed: number) {
  let n = (xi * 374761393 + yi * 668265263 + seed * 1274126177) | 0;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise2(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const tl = valueHash(xi, yi, seed);
  const tr = valueHash(xi + 1, yi, seed);
  const bl = valueHash(xi, yi + 1, seed);
  const br = valueHash(xi + 1, yi + 1, seed);
  const u = smooth(xf);
  const v = smooth(yf);
  return (
    tl * (1 - u) * (1 - v) +
    tr * u * (1 - v) +
    bl * (1 - u) * v +
    br * u * v
  );
}

function fbm(x: number, y: number, seed: number) {
  // two octaves is enough texture, cheap enough for many particles
  return noise2(x, y, seed) * 0.65 + noise2(x * 2.1, y * 2.1, seed + 7) * 0.35;
}

/* ---- component -------------------------------------------------------- */

type FlowFieldProps = {
  seed?: number;
  /** particle colors, rgba-ready hex */
  palette?: string[];
  /** trail fade color — should match the section background */
  fade?: string;
  density?: number;
  speed?: number;
  className?: string;
};

export function FlowField({
  seed = 7,
  palette = ["#153b7a", "#6b9d38", "#d4af37"],
  fade = "#fdfbf8",
  density = 1,
  speed = 1,
  className,
}: FlowFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    type P = { x: number; y: number; px: number; py: number; life: number; c: string };
    let particles: P[] = [];
    let raf = 0;
    let running = false;

    const NOISE_SCALE = 0.0016;
    const STEP = 0.55 * speed;

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        720,
        Math.floor(((w * h) / 5200) * density),
      );
      particles = Array.from({ length: count }, () => spawn());
      // paint the base once so the first frame isn't black
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
    };

    const spawn = (): P => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        px: x,
        py: y,
        life: 60 + Math.random() * 160,
        c: palette[(Math.random() * palette.length) | 0],
      };
    };

    let t = 0;
    const frame = () => {
      // fade previous frame toward the section background -> soft trails
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      ctx.lineWidth = 1;
      for (const p of particles) {
        const angle = fbm(p.x * NOISE_SCALE, p.y * NOISE_SCALE + t, seed) *
          Math.PI * 4;
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(angle) * STEP * 2.2;
        p.y += Math.sin(angle) * STEP * 2.2;
        p.life -= 1;

        if (
          p.life <= 0 ||
          p.x < 0 ||
          p.x > w ||
          p.y < 0 ||
          p.y > h
        ) {
          Object.assign(p, spawn());
          continue;
        }

        ctx.strokeStyle = p.c;
        ctx.globalAlpha = 0.16;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      t += 0.0006 * speed;

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (reduce) {
        // draw a generous number of static steps, then stop
        for (let i = 0; i < 240; i++) frame();
        running = false;
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    reset();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "100px" },
    );
    io.observe(canvas);

    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(reset, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeT);
    };
  }, [seed, palette, fade, density, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("absolute inset-0 -z-10 h-full w-full", className)}
    />
  );
}
