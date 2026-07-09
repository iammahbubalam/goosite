"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export type FaqItem = { q: string; a: string; qBn?: string; aBn?: string };

const DEFAULT_FAQ: FaqItem[] = [
  {
    q: "How fresh is the milk really?",
    qBn: "দুধ আসলে কতটা তাজা?",
    a: "Milk is collected at dawn, filtered and chilled within the hour, and delivered the same morning. From cow to your door in a single day.",
    aBn: "ভোরে সংগ্রহ করা দুধ এক ঘণ্টার মধ্যে ছেঁকে ঠান্ডা করা হয়, আর সেই সকালেই পৌঁছে দেওয়া হয় — গরু থেকে আপনার দরজা পর্যন্ত একটি দিনেই।",
  },
  {
    q: "Is the milk tested?",
    qBn: "দুধ কি পরীক্ষা করা হয়?",
    a: "Yes. Every batch is lab-tested for purity, fat content and adulteration before it leaves our facility. Nothing reaches you untested.",
    aBn: "হ্যাঁ। প্রতিটি ব্যাচ আমাদের কারখানা ছাড়ার আগে বিশুদ্ধতা, ফ্যাট ও ভেজালের জন্য ল্যাবে পরীক্ষা করা হয়। অপরীক্ষিত কিছুই আপনার কাছে পৌঁছায় না।",
  },
  {
    q: "Do you add any preservatives?",
    qBn: "কোনো প্রিজারভেটিভ মেশানো হয় কি?",
    a: "Never. Our raw and pasteurised milk contain nothing but milk. UHT milk is preserved only by heat and aseptic sealing — no chemicals.",
    aBn: "কখনো নয়। আমাদের কাঁচা ও পাস্তুরিত দুধে দুধ ছাড়া কিছুই নেই। UHT দুধ শুধু তাপ ও অ্যাসেপটিক সিলিং দিয়ে সংরক্ষণ করা হয় — কোনো রাসায়নিক নয়।",
  },
  {
    q: "Which areas do you deliver to?",
    qBn: "কোন কোন এলাকায় ডেলিভারি করেন?",
    a: "We currently deliver across Dhaka, with new neighbourhoods added every month. Enter your area at checkout to confirm coverage.",
    aBn: "এখন আমরা ঢাকাজুড়ে ডেলিভারি করি, প্রতি মাসে নতুন এলাকা যুক্ত হচ্ছে। কভারেজ নিশ্চিত করতে চেকআউটে আপনার এলাকা লিখুন।",
  },
  {
    q: "Can I pause my subscription?",
    qBn: "আমি কি সাবস্ক্রিপশন বিরতি দিতে পারি?",
    a: "Anytime. Skip a day, pause for a holiday, or change your plan from your account — no calls, no penalties.",
    aBn: "যেকোনো সময়। একদিন বাদ দিন, ছুটিতে বিরতি নিন, বা অ্যাকাউন্ট থেকে প্ল্যান বদলান — কোনো ফোন নয়, কোনো জরিমানা নয়।",
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
    <section className="bg-cream py-16 lg:py-32">
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
                      {item.qBn && (
                        <span className="font-bn mt-1 block text-base text-stone">
                          {item.qBn}
                        </span>
                      )}
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
                        <div className="max-w-xl pb-7">
                          <p className="text-base md:text-lg leading-relaxed text-stone">
                            {item.a}
                          </p>
                          {item.aBn && (
                            <p className="font-bn mt-3 leading-relaxed text-stone/90">
                              {item.aBn}
                            </p>
                          )}
                        </div>
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
