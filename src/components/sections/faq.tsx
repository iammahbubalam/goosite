"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export type FaqItem = { q: string; a: string };

const DEFAULT_FAQ: FaqItem[] = [
  {
    q: "How fresh is the milk really?",
    a: "Milk is collected at dawn, filtered and chilled within the hour, and delivered the same morning. From cow to your door in a single day.",
  },
  {
    q: "Is the milk tested?",
    a: "Yes. Every batch is lab-tested for purity, fat content and adulteration before it leaves our facility. Nothing reaches you untested.",
  },
  {
    q: "Do you add any preservatives?",
    a: "Never. Our raw and pasteurised milk contain nothing but milk. UHT milk is preserved only by heat and aseptic sealing — no chemicals.",
  },
  {
    q: "Which areas do you deliver to?",
    a: "We currently deliver across Dhaka, with new neighbourhoods added every month. Enter your area at checkout to confirm coverage.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Anytime. Skip a day, pause for a holiday, or change your plan from your account — no calls, no penalties.",
  },
];

export function Faq({
  items = DEFAULT_FAQ,
  eyebrow = "Questions",
  heading = "Everything you might be wondering.",
}: {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-6">{heading}</h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-xl text-night md:text-2xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border hairline text-ink"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 text-lg leading-relaxed text-stone">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
