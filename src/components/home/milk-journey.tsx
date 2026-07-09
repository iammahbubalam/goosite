"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Sun, Cow, Drop, Flask, JarLabel, Jar, ForkKnife } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";

type Chapter = {
  no: string;
  Icon: PhosphorIcon;
  photo: string;
  title: string;
  line: string;
};

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    Icon: Sun,
    photo: "journey-dawn",
    title: "First light",
    line: "Before the city stirs, the day's first milk is drawn by hand.",
  },
  {
    no: "02",
    Icon: Cow,
    photo: "journey-herd",
    title: "Free-grazed desi cows",
    line: "Native breeds on open green — milk the way it ought to begin.",
  },
  {
    no: "03",
    Icon: Drop,
    photo: "journey-milking",
    title: "By hand, never rushed",
    line: "Steady hands, warm steel, and not a machine in sight.",
  },
  {
    no: "04",
    Icon: Flask,
    photo: "journey-testing",
    title: "Proven pure",
    line: "Every batch meets the light and the lab before it earns our name.",
  },
  {
    no: "05",
    Icon: JarLabel,
    photo: "journey-rawmilk",
    title: "Pure raw milk",
    line: "Bottled the same morning, cream still rising to the top.",
  },
  {
    no: "06",
    Icon: Jar,
    photo: "journey-products",
    title: "Made by patient hands",
    line: "Doi, ghee and chhana, coaxed slow over a clay-oven flame.",
  },
  {
    no: "07",
    Icon: ForkKnife,
    photo: "journey-family",
    title: "Home by breakfast",
    line: "On your table at dawn, exactly as nature intended.",
  },
];

// Tight spring used ONLY for the decorative spine fill, so the line glides a
// hair behind the cursor. Cards map directly to scroll (no spring) for precise,
// 1:1 triggering — the smoothness comes from Lenis, not from lagging the value.
const FILL_SPRING = { stiffness: 120, damping: 30, mass: 0.3 } as const;

export function MilkJourney() {
  const spine = useRef<HTMLDivElement>(null);

  // Spine progress is a continuous function of scroll — smoothed by a spring so
  // the fill glides instead of stepping. Reversible up and down by nature.
  const { scrollYProgress } = useScroll({
    target: spine,
    offset: ["start 72%", "end 62%"],
  });
  const fill = useSpring(scrollYProgress, FILL_SPRING);

  return (
    <section className="relative isolate overflow-hidden bg-dawn py-16 lg:py-32">
      {/* Heading */}
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Farm to family</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6"
            text="From first light to your table."
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-stone">
              No middlemen, no shortcuts — one unhurried path, seven mornings in
              the making.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Timeline */}
      <div
        ref={spine}
        className="relative mx-auto mt-16 max-w-5xl px-6 md:mt-24 md:px-8"
      >
        {/* spine track + scroll-bound fill */}
        <div
          aria-hidden
          className="absolute left-[1.875rem] top-0 bottom-0 w-px -translate-x-1/2 bg-ink/10 [mask-image:linear-gradient(to_bottom,transparent,#000_5%,#000_95%,transparent)] md:left-1/2"
        >
          <motion.div
            style={{ scaleY: fill }}
            className="h-full w-full origin-top bg-gradient-to-b from-sage via-sage to-sage-deep"
          />
        </div>

        {CHAPTERS.map((c, i) => (
          <ChapterRow key={c.no} chapter={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function ChapterRow({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { Icon } = chapter;
  const photo = getPhoto(chapter.photo);
  const onRight = index % 2 === 1; // desktop: card sits right of the spine

  // Progress of THIS row across its full pass through the viewport: 0 when its
  // top touches the bottom of the screen, 1 when its bottom leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map transforms DIRECTLY off scroll position — exact, no spring lag — so the
  // trigger is precise and identical going up or down. Windows are expressed as
  // fractions of the pass, giving each card a predictable in/settle band:
  //   ~0.10–0.42 : the card slides + fades + scales into place
  //   ~0.42–0.58 : the spine node fills as the card sits near centre
  const x = useTransform(scrollYProgress, [0.1, 0.42], [onRight ? 72 : -72, 0]);
  const opacity = useTransform(scrollYProgress, [0.12, 0.36], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.42], [0.93, 1]);
  // Slow parallax drift on the image for depth across the whole pass.
  const imgY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  // Node fills + the connector draws + a soft halo blooms as the card settles
  // by the spine — all on the same precise window so they move as one.
  const nodeScale = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const nodeGlow = useTransform(scrollYProgress, [0.42, 0.58], [0, 0.55]);

  const cardStyle = reduce ? undefined : { x, opacity, scale };
  const imgStyle = reduce ? undefined : { y: imgY };
  // Reduced motion → render the "active" end-state, static.
  const dotStyle = reduce ? { scale: 1, opacity: 1 } : { scale: nodeScale, opacity: nodeScale };
  const glowStyle = reduce ? { opacity: 0.4 } : { opacity: nodeGlow };
  const connStyle = reduce ? { scaleX: 1 } : { scaleX: nodeScale };

  return (
    <div ref={ref} className="relative py-8 pl-16 md:py-12 md:pl-0">
      {/* node on the spine: always-present hollow ring, an inner sage dot that
          fills, and a soft halo that blooms as the card lands */}
      <span
        aria-hidden
        className="absolute left-[1.875rem] top-12 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border border-sage/40 bg-bg shadow-[0_0_0_4px_var(--color-bg)] md:left-1/2"
      >
        <motion.span
          style={glowStyle as { opacity: MotionValue<number> } | { opacity: number }}
          className="absolute -inset-1.5 -z-10 rounded-full bg-sage/40 blur-md"
        />
        <motion.span
          style={dotStyle as { scale: MotionValue<number>; opacity: MotionValue<number> } | { scale: number; opacity: number }}
          className="h-2 w-2 rounded-full bg-sage"
        />
      </span>
      {/* connector tick — draws from the spine outward toward the card */}
      <motion.span
        aria-hidden
        style={connStyle as { scaleX: MotionValue<number> } | { scaleX: number }}
        className={`absolute top-14 hidden h-px w-8 bg-sage/50 md:block ${
          onRight ? "left-1/2 origin-left" : "right-1/2 origin-right"
        }`}
      />

      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
        <motion.article
          style={cardStyle}
          className={`group will-change-transform ${
            onRight ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)] ring-1 ring-inset ring-ink/5 transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[var(--shadow-lift)]">
            <motion.div style={imgStyle} className="absolute inset-[-8%]">
              <Photo
                src={photo?.src}
                blurDataURL={photo?.lqip}
                alt={photo?.alt ?? chapter.title}
                tone="field"
                shader
                rounded="rounded-none"
                sizes="(max-width: 768px) 100vw, 45vw"
                className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent"
            />
            {/* faint glassy top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15"
            />
            {/* number + icon chip */}
            <div className="absolute left-5 top-5 inline-flex items-center gap-2.5 rounded-full bg-bg/85 py-1.5 pl-3 pr-3.5 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-white/40 backdrop-blur">
              <Icon size={15} weight="light" className="text-sage-deep" />
              <span aria-hidden className="h-3 w-px bg-ink/15" />
              <span className="font-serif text-sm leading-none text-ink [font-feature-settings:'tnum']">
                {chapter.no}
              </span>
            </div>
          </div>

          <div className={`mt-5 ${onRight ? "" : "md:text-right"}`}>
            <h3 className="font-serif text-2xl text-night transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-sage-deep md:text-3xl">
              {chapter.title}
            </h3>
            <p
              className={`mt-2 max-w-md leading-relaxed text-stone ${
                onRight ? "" : "md:ml-auto"
              }`}
            >
              {chapter.line}
            </p>
          </div>
        </motion.article>

        {/* spacer keeps the card on its side of the spine */}
        <div
          aria-hidden
          className={`hidden md:block ${onRight ? "md:order-1" : "md:order-2"}`}
        />
      </div>
    </div>
  );
}
