import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section";
import { MilkWave } from "@/components/ui/milk-wave";
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-morning pt-36 pb-4 md:pt-44">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display mt-6">{title}</h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone">
                {intro}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.15}>
              <div className="mt-9">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
      <MilkWave fill="var(--color-cream)" className="mt-16 -mb-px" />
    </section>
  );
}
