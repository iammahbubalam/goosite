"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import SplitType from "split-type";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { MilkWave } from "@/components/ui/milk-wave";
import { ShaderField } from "@/components/shader/shader-field";
import { MilkVessel } from "@/components/shader/milk-vessel";
import { Counter } from "@/components/motion/counter";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(".hero-h1", {
        types: "lines",
        lineClass: "reveal-line",
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.8 })
        .from(
          split.lines,
          { yPercent: 116, duration: 1.15, stagger: 0.12 },
          "-=0.45",
        )
        .from(".hero-copy", { opacity: 0, y: 18, duration: 0.9 }, "-=0.75")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.7")
        .from(
          ".hero-stat",
          { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 },
          "-=0.6",
        )
        .fromTo(
          ".hero-panel",
          { clipPath: "inset(8% round 3rem)", opacity: 0, scale: 1.05 },
          {
            clipPath: "inset(0% round 3rem)",
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.25",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden pt-28 md:pt-32"
    >
      {/* flowing cream-and-milk shader backdrop */}
      <ShaderField
        colors={["#fffaf3", "#fff2e1", "#f4e7d2", "#eaf1dc", "#dfe9f4"]}
        speed={0.22}
        distortion={0.7}
        swirl={0.55}
        fallback="radial-gradient(120% 90% at 50% -10%, #fff9f2 0%, #fdfbf8 55%)"
      />
      {/* legibility wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg/85 via-bg/40 to-transparent"
      />

      <div className="container-x grid items-center gap-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-6">
          <span className="hero-eyebrow text-eyebrow inline-flex items-center gap-2 text-green">
            <span className="h-px w-7 bg-green/60" />
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
          <div className="hero-panel relative isolate mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3rem] shadow-[var(--shadow-lift)]">
            {/* a vessel full of milk */}
            <MilkVessel />

            {/* floating proof chip */}
            <div className="absolute bottom-6 left-6 rounded-2xl bg-bg/85 px-5 py-3 shadow-[var(--shadow-soft)] backdrop-blur">
              <p className="text-eyebrow text-green">Tested today</p>
              <p className="font-serif text-xl text-ink">100% pure</p>
            </div>
          </div>
        </div>
      </div>

      <MilkWave fill="var(--color-cream)" className="-mb-px" />
    </section>
  );
}
