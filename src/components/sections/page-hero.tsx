import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section";
import { MilkWave } from "@/components/ui/milk-wave";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ArtPanel } from "@/components/ui/art-panel";
import { MilkVessel } from "@/components/shader/milk-vessel";
import { ShaderField } from "@/components/shader/shader-field";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";

type Tone = "cream" | "milk" | "ink" | "green" | "field";

/** Distinct flowing-milk backdrops — one mood per page hero. */
type MilkVariant = "cream" | "blue" | "sage" | "gold" | "ink";

const MILK: Record<
  MilkVariant,
  {
    colors: string[];
    speed: number;
    distortion: number;
    swirl: number;
    fallback: string;
  }
> = {
  cream: {
    colors: ["#ffffff", "#fbf0dc", "#efe0c6", "#e7dcc6", "#dfe9f4"],
    speed: 0.3,
    distortion: 1,
    swirl: 0.9,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#f6ead2 60%,#ece0cb 100%)",
  },
  blue: {
    colors: ["#ffffff", "#f1e8d6", "#cdd9ec", "#a9bfe4", "#8fb0e0"],
    speed: 0.34,
    distortion: 1.1,
    swirl: 1,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#e7eef8 55%,#cdd9ec 100%)",
  },
  sage: {
    colors: ["#ffffff", "#eef3e4", "#dde8cd", "#c2d6ac", "#a3c186"],
    speed: 0.3,
    distortion: 1.05,
    swirl: 0.95,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#eef3e4 55%,#d6e4c4 100%)",
  },
  gold: {
    colors: ["#ffffff", "#fbeed0", "#f1dca6", "#e8ca87", "#dab86c"],
    speed: 0.3,
    distortion: 1,
    swirl: 0.9,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#fbeed1 55%,#eed7a8 100%)",
  },
  ink: {
    colors: ["#eef3fb", "#cdd9ec", "#9fb6df", "#5d7cbb", "#2a4f8f"],
    speed: 0.26,
    distortion: 1,
    swirl: 0.85,
    fallback: "linear-gradient(180deg,#f3f6fc 0%,#cdd9ec 60%,#9fb6df 100%)",
  },
};

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  media,
  mediaTone = "milk",
  mediaLabel,
  mediaPhoto,
  milk = "cream",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
  /** Custom visual for the right column. Falls back to a themed shader panel. */
  media?: ReactNode;
  mediaTone?: Tone;
  mediaLabel?: string;
  /** Real photo id (from photos.generated.json) for the right column. */
  mediaPhoto?: string;
  /** Which flowing-milk mood paints behind this hero. */
  milk?: MilkVariant;
}) {
  const m = MILK[milk];
  const photo = mediaPhoto ? getPhoto(mediaPhoto) : undefined;
  const onPhoto = Boolean(photo) || mediaTone === "ink";
  return (
    <section className="relative isolate overflow-hidden bg-morning pt-36 pb-0 md:pt-44">
      {/* flowing milk backdrop — a different mood per page */}
      <ShaderField
        colors={m.colors}
        speed={m.speed}
        distortion={m.distortion}
        swirl={m.swirl}
        fallback={m.fallback}
        className="opacity-[0.55]"
      />
      {/* legibility wash — keeps the milk present but the copy crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg/75 via-bg/35 to-bg/10"
      />

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
              (photo ? (
                <Photo
                  src={photo.src}
                  blurDataURL={photo.lqip}
                  alt={mediaLabel ?? eyebrow}
                  rounded="rounded-none"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-full w-full"
                />
              ) : mediaTone === "milk" ? (
                <MilkVessel />
              ) : (
                <ArtPanel
                  tone={mediaTone}
                  shader
                  rounded="rounded-none"
                  className="h-full w-full"
                />
              ))}
            {photo && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent"
              />
            )}
            {mediaLabel && (
              <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                <p
                  className={`font-serif text-2xl ${
                    onPhoto ? "text-cream" : "text-ink/80"
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
