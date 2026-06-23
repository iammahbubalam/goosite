"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { MilkWave } from "@/components/ui/milk-wave";
import { ShaderField } from "@/components/shader/shader-field";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Counter } from "@/components/motion/counter";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const heroPhoto = getPhoto("hero-glass");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.8 })
        // headline: transform-only (no opacity) so it stays painted from FCP
        // and remains a fast LCP element — no JS-hidden mask reveal here.
        .from(".hero-h1", { y: 28, duration: 1.1 }, "-=0.45")
        .from(".hero-copy", { opacity: 0, y: 18, duration: 0.9 }, "-=0.75")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.7")
        .from(
          ".hero-stat",
          { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 },
          "-=0.6",
        )
        // clip + scale only — never opacity, so the (priority) hero image
        // stays painted and remains the LCP element (fast LCP).
        .fromTo(
          ".hero-panel",
          { clipPath: "inset(6% round 3rem)", scale: 1.04 },
          {
            clipPath: "inset(0% round 3rem)",
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1.2",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden pt-28 md:pt-32"
    >
      {/* the whole hero floats on flowing milk — bold, visible swirl */}
      <ShaderField
        colors={["#ffffff", "#fbf4e8", "#ece1cc", "#fffdf9", "#eef1ea"]}
        speed={0.5}
        distortion={1.5}
        swirl={1.2}
        fallback="linear-gradient(180deg, #ffffff 0%, #fbf4e8 45%, #eef3e4 100%)"
      />
      {/* whisper-thin scrim — just under the headline, milk stays the star */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg/16 via-transparent to-transparent"
      />
      {/* bottom fade into the green wave — guarantees a soft light-green seam,
          never a dark shader edge, where the hero meets the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-b from-transparent via-sage-soft/40 to-sage-soft"
      />

      <div className="container-x grid items-center gap-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-6">
          <span className="hero-eyebrow text-eyebrow inline-flex items-center gap-2 text-sage">
            <span className="h-px w-7 bg-sage/60" />
            Farm to family · Bangladesh
          </span>

          <h1 className="hero-h1 text-display mt-6">
            Pure milk. <span className="italic text-ink">Every morning.</span>
          </h1>

          <p className="hero-copy mt-7 max-w-md text-lg leading-relaxed text-stone">
            Directly from trusted farms to your family — collected at dawn,
            tested with care, delivered before breakfast.
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href="/products" size="lg">
                Explore products
                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/subscription" variant="outline" size="lg">
                Subscribe
              </Button>
            </Magnetic>
          </div>

          {/* credibility stats */}
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t hairline pt-8">
            <div className="hero-stat">
              <dt className="font-serif text-3xl text-ink">
                <Counter to={2400} suffix="+" />
              </dt>
              <dd className="mt-1 text-sm text-stone">families served</dd>
            </div>
            <div className="hero-stat">
              <dt className="font-serif text-3xl text-ink">
                <Counter to={40} suffix="+" />
              </dt>
              <dd className="mt-1 text-sm text-stone">partner farms</dd>
            </div>
            <div className="hero-stat">
              <dt className="font-serif text-3xl text-ink">
                <Counter to={100} suffix="%" />
              </dt>
              <dd className="mt-1 text-sm text-stone">purity, tested daily</dd>
            </div>
          </dl>
        </div>

        {/* Hero visual */}
        <div className="relative lg:col-span-6">
          <div className="hero-panel relative isolate mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3rem] shadow-[var(--shadow-lift)] ring-1 ring-inset ring-white/30">
            {/* branded GOOWALI hero visual */}
            <Photo
              src={heroPhoto?.src}
              alt={heroPhoto?.alt ?? "GOOWALI fresh milk"}
              blurDataURL={heroPhoto?.lqip}
              tone="milk"
              shader
              rounded="rounded-none"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="absolute inset-0 h-full w-full"
            />
            {/* soft gradient so the proof chip stays readable on any image */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/35 to-transparent"
            />

            {/* floating proof chip */}
            <div className="absolute bottom-6 left-6 rounded-2xl bg-bg/85 px-5 py-3 shadow-[var(--shadow-soft)] backdrop-blur">
              <p className="text-eyebrow text-sage">Tested today</p>
              <p className="font-serif text-xl text-ink">100% pure</p>
            </div>
          </div>
        </div>
      </div>

      <MilkWave fill="var(--color-sage-soft)" className="-mb-px" />
    </section>
  );
}
