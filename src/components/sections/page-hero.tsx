import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section";
import { MilkWave } from "@/components/ui/milk-wave";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { FlowField } from "@/components/generative/flow-field";
import { ArtPanel } from "@/components/ui/art-panel";
import { MilkVessel } from "@/components/shader/milk-vessel";

type Tone = "cream" | "milk" | "ink" | "green" | "field";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  media,
  mediaTone = "milk",
  mediaLabel,
  field = true,
  fieldSeed = 11,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
  /** Custom visual for the right column. Falls back to a themed shader panel. */
  media?: ReactNode;
  mediaTone?: Tone;
  mediaLabel?: string;
  field?: boolean;
  fieldSeed?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-morning pt-36 pb-0 md:pt-44">
      {field && (
        <FlowField
          seed={fieldSeed}
          palette={["#153b7a", "#6b9d38", "#d4af37"]}
          fade="#fdfbf8"
          density={0.7}
          className="opacity-40"
        />
      )}

      <div className="container-x grid items-center gap-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        {/* text */}
        <div className="lg:col-span-6">
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

        {/* visual */}
        <div className="lg:col-span-5 lg:col-start-8">
          <MaskReveal
            rounded="rounded-[2.5rem]"
            className="relative aspect-[4/5] shadow-[var(--shadow-lift)] ring-1 ring-inset ring-ink/5"
          >
            {media ??
              (mediaTone === "milk" ? (
                <MilkVessel />
              ) : (
                <ArtPanel
                  tone={mediaTone}
                  shader
                  rounded="rounded-none"
                  className="h-full w-full"
                />
              ))}
            {mediaLabel && (
              <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                <p
                  className={`font-serif text-2xl ${
                    mediaTone === "ink" ? "text-cream/85" : "text-ink/80"
                  }`}
                >
                  {mediaLabel}
                </p>
              </div>
            )}
          </MaskReveal>
        </div>
      </div>

      <MilkWave fill="var(--color-cream)" className="-mb-px" />
    </section>
  );
}
