"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Sun,
  Tractor,
  Milk,
  FlaskConical,
  Snowflake,
  Truck,
  Home,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { Icon: Sun, title: "Dawn", text: "Cows wake and are milked by hand at first light." },
  { Icon: Tractor, title: "Farm", text: "Single-source from herds we know and trust." },
  { Icon: Milk, title: "Collection", text: "Filtered and gathered within the hour." },
  { Icon: FlaskConical, title: "Testing", text: "Every batch lab-checked for purity." },
  { Icon: Snowflake, title: "Cooling", text: "Flash-chilled to lock in freshness." },
  { Icon: Truck, title: "Delivery", text: "Carried cold across the city overnight." },
  { Icon: Home, title: "Family", text: "On your table, before breakfast." },
];

export function MilkJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-dawn py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Farm to family</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-6">Every drop tells a story.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Seven careful steps stand between our farms and your morning. Not
              one of them is rushed.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* progress rail */}
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-1rem)] w-px bg-ink/10 md:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-green"
            />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {STEPS.map(({ Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.04,
                }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border hairline bg-bg text-ink shadow-[var(--shadow-soft)]">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <div className="pt-1.5">
                  <p className="text-eyebrow text-green/80">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl text-night md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-stone">{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
