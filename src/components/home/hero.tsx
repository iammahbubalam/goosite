"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MilkWave } from "@/components/ui/milk-wave";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-morning pt-28 md:pt-32">
      {/* drifting light blooms */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-[#fff4e6] to-[#f0e2cd] blur-3xl"
        animate={reduce ? undefined : { y: [0, 26, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-24 -z-10 h-80 w-80 rounded-full bg-green/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x grid items-center gap-12 pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        <div className="lg:col-span-6">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-eyebrow inline-flex items-center gap-2 text-green"
          >
            <span className="h-px w-7 bg-green/60" />
            Farm to family · Bangladesh
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
            className="text-display mt-6"
          >
            Pure milk.
            <br />
            <span className="italic text-ink">Every morning.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.18 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-stone"
          >
            Directly from trusted farms to your family — collected at dawn,
            tested with care, delivered before breakfast.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/products" size="lg">
              Explore products
              <ArrowRight
                size={18}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/subscription" variant="outline" size="lg">
              Subscribe
            </Button>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-sm text-stone/80"
          >
            Trusted by <span className="font-semibold text-ink">2,400+</span>{" "}
            families across Dhaka.
          </motion.p>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#fff7ee] via-[#fefcf8] to-[#ece0cd] shadow-[var(--shadow-lift)]">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center p-10"
            >
              <Image
                src="/brand/goowali_bgremoved.png"
                alt="GOOWALI fresh milk"
                width={420}
                height={420}
                priority
                className="h-auto w-3/4 drop-shadow-[0_30px_40px_rgba(21,59,122,0.18)]"
              />
            </motion.div>

            {/* floating proof chip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-6 left-6 rounded-2xl bg-bg/85 px-5 py-3 shadow-[var(--shadow-soft)] backdrop-blur"
            >
              <p className="text-eyebrow text-green">Tested today</p>
              <p className="font-serif text-xl text-ink">100% pure</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <MilkWave fill="var(--color-cream)" className="-mb-px" />
    </section>
  );
}
