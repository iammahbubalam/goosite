"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
  bn: string;
};

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    Icon: Sun,
    photo: "journey-dawn",
    title: "First light",
    line: "A farmer's day starts before sunrise.",
    bn: "সূর্য ওঠার আগেই শুরু হয় কৃষকের দিন।",
  },
  {
    no: "02",
    Icon: Cow,
    photo: "journey-herd",
    title: "Our desi cows",
    line: "Native cows, raised free on open pasture.",
    bn: "খোলা মাঠে বেড়ে ওঠা দেশি গরু।",
  },
  {
    no: "03",
    Icon: Drop,
    photo: "journey-milking",
    title: "Hand-milked",
    line: "Milked by hand, fresh into clean steel.",
    bn: "হাতে দোয়ানো, সরাসরি পরিষ্কার পাত্রে।",
  },
  {
    no: "04",
    Icon: Flask,
    photo: "journey-testing",
    title: "Tested for purity",
    line: "Every batch checked before anything is made.",
    bn: "কিছু তৈরির আগে প্রতিটি দুধ পরীক্ষিত।",
  },
  {
    no: "05",
    Icon: JarLabel,
    photo: "journey-rawmilk",
    title: "Pure raw milk",
    line: "Bottled pure, the same morning.",
    bn: "খাঁটি কাঁচা দুধ, সেই সকালেই বোতলজাত।",
  },
  {
    no: "06",
    Icon: Jar,
    photo: "journey-products",
    title: "Made by hand",
    line: "Doi, ghee & chhana, made slowly the organic way.",
    bn: "দই, ঘি আর ছানা — হাতে, ধীরে তৈরি।",
  },
  {
    no: "07",
    Icon: ForkKnife,
    photo: "journey-family",
    title: "Your family",
    line: "On your family's table, before breakfast.",
    bn: "নাস্তার আগেই, আপনার পরিবারের টেবিলে।",
  },
];

export function MilkJourney() {
  return (
    <section className="relative isolate overflow-hidden bg-dawn py-24 md:py-28">
      {/* Heading */}
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Farm to family</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6"
            text="Every drop tells a story."
          />
          <Reveal delay={0.08}>
            <p className="font-bn-serif mt-3 text-2xl text-ink/85">
              প্রতিটি ফোঁটায় একটি গল্প।
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Seven unhurried steps stand between our farms and your morning.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Chapters */}
      <div className="mt-8 md:mt-12">
        {CHAPTERS.map((c, i) => (
          <ChapterRow key={c.no} chapter={c} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ChapterRow({ chapter, flip }: { chapter: Chapter; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { Icon } = chapter;
  const photo = getPhoto(chapter.photo);

  // Scroll progress across this row's full pass through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image: slides in from its side as the row enters, then drifts gently
  // (parallax) — all tied to scroll so it "follows" the page.
  const x = useTransform(scrollYProgress, [0, 0.4], [flip ? 80 : -80, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.08, 1]);

  return (
    <div
      ref={ref}
      className="container-x grid items-center gap-10 py-12 md:min-h-[78vh] md:gap-16 lg:grid-cols-2"
    >
      {/* Media */}
      <motion.div
        style={{ x, y, opacity }}
        className={flip ? "lg:order-2" : "lg:order-1"}
      >
        <motion.div
          style={{ scale }}
          className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)] ring-1 ring-inset ring-ink/5"
        >
          <Photo
            src={photo?.src}
            blurDataURL={photo?.lqip}
            alt={photo?.alt ?? chapter.title}
            tone="field"
            shader
            rounded="rounded-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent"
          />
          <span className="absolute left-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg/85 text-sage-deep shadow-[var(--shadow-soft)] backdrop-blur">
            <Icon size={24} weight="light" />
          </span>
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <Reveal>
          <span className="font-serif text-6xl text-ink/15 md:text-7xl">
            {chapter.no}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-3 font-serif text-4xl text-night md:text-5xl">
            {chapter.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-stone">
            {chapter.line}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="font-bn mt-2 max-w-md text-base leading-relaxed text-stone/90">
            {chapter.bn}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
