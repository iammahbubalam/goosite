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
    <section className="relative isolate overflow-hidden bg-dawn py-24 md:py-32">
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
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone">
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
          className="absolute left-[1.875rem] top-2 bottom-2 w-px -translate-x-1/2 bg-ink/10 md:left-1/2"
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
  // Node grows + brightens as the card settles by the spine.
  const nodeScale = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);

  const cardStyle = reduce ? undefined : { x, opacity, scale };
  const imgStyle = reduce ? undefined : { y: imgY };
  const nodeStyle = reduce ? undefined : { scale: nodeScale };

  return (
    <div ref={ref} className="relative py-8 pl-16 md:py-12 md:pl-0">
      {/* node on the spine */}
      <motion.span
        aria-hidden
        style={nodeStyle as { scale: MotionValue<number> } | undefined}
        className="absolute left-[1.875rem] top-12 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-sage bg-bg shadow-[0_0_0_4px_var(--color-bg)] md:left-1/2"
      />
      {/* connector tick from spine to card (desktop) */}
      <span
        aria-hidden
        className={`absolute top-[3.25rem] hidden h-px w-8 bg-sage/35 md:block ${
          onRight ? "left-1/2" : "right-1/2"
        }`}
      />

      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
        <motion.article
          style={cardStyle}
          className={`group will-change-transform ${
            onRight ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] ring-1 ring-inset ring-ink/5">
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
            {/* number + icon chip */}
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-bg/85 py-1.5 pl-2.5 pr-3.5 shadow-[var(--shadow-soft)] backdrop-blur">
              <Icon size={16} weight="light" className="text-sage-deep" />
              <span className="font-serif text-sm leading-none text-ink">
                {chapter.no}
              </span>
            </div>
          </div>

          <div className={`mt-5 ${onRight ? "" : "md:text-right"}`}>
            <h3 className="font-serif text-2xl text-night md:text-3xl">
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
