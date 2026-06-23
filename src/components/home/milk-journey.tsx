"use client";

import { useEffect, useRef } from "react";
import {
  Sun,
  Tractor,
  Drop,
  TestTube,
  Snowflake,
  Truck,
  House,
} from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { FlowField } from "@/components/generative/flow-field";
import { gsap } from "@/lib/gsap";

const STEPS = [
  { Icon: Sun, title: "Dawn", text: "Cows wake and are milked by hand at first light." },
  { Icon: Tractor, title: "Farm", text: "Single-source from herds we know and trust." },
  { Icon: Drop, title: "Collection", text: "Filtered and gathered within the hour." },
  { Icon: TestTube, title: "Testing", text: "Every batch lab-checked for purity." },
  { Icon: Snowflake, title: "Cooling", text: "Flash-chilled to lock in freshness." },
  { Icon: Truck, title: "Delivery", text: "Carried cold across the city overnight." },
  { Icon: House, title: "Family", text: "On your table, before breakfast." },
];

export function MilkJourney() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackEl = track.current;
    const fillEl = fill.current;
    if (!trackEl || !root.current) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scrub the track sideways.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillEl) fillEl.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => tween.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-dawn">
      <FlowField
        seed={42}
        palette={["#153b7a", "#6e8c57", "#d4af37"]}
        fade="#fdfbf8"
        density={0.6}
        className="opacity-[0.3]"
      />
      {/* Heading */}
      <div className="container-x pt-24 lg:pt-28">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Farm to family</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6"
            text="Every drop tells a story."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Seven careful steps stand between our farms and your morning. Not
              one of them is rushed.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Track: horizontal on desktop, stacked on mobile */}
      <div
        ref={track}
        className="mt-14 flex flex-col gap-6 px-6 pb-24 lg:mt-20 lg:h-[58vh] lg:flex-row lg:gap-0 lg:px-0 lg:pb-0"
      >
        {STEPS.map(({ Icon, title, text }, i) => (
          <article
            key={title}
            className="group flex shrink-0 flex-col justify-end rounded-[2rem] border hairline bg-bg/70 p-8 backdrop-blur-sm transition-colors hover:bg-bg lg:mx-4 lg:h-full lg:w-[26rem] lg:rounded-[2.5rem] lg:p-12 lg:first:ml-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))]"
          >
            <span className="font-serif text-6xl text-ink/15 lg:text-7xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/12 text-sage">
              <Icon size={26} weight="light" />
            </span>
            <h3 className="mt-6 font-serif text-3xl text-night">{title}</h3>
            <p className="mt-2 max-w-xs text-stone">{text}</p>
          </article>
        ))}
      </div>

      {/* Progress rail (desktop scrub) */}
      <div className="hidden lg:block">
        <div className="container-x pb-16">
          <div className="h-px w-full bg-ink/10">
            <div
              ref={fill}
              className="h-px w-full origin-left scale-x-0 bg-sage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
