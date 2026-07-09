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

/**
 * Milk-flow recipes. Realism comes from marbling: whites alternate with
 * deeper accent tones so the shader renders thin veins of colour folding
 * through a white body — like cream stirred into milk. `scale < 1` zooms the
 * field out so several currents are visible at once instead of one soft blob;
 * distortion/swirl sit at the shader's documented max (0–1); a touch of
 * grainMixer roughens the vein edges so they read organic, not vector.
 */
const MILK: Record<
  MilkVariant,
  {
    colors: string[];
    speed: number;
    distortion: number;
    swirl: number;
    scale: number;
    grainMixer: number;
    fallback: string;
  }
> = {
  cream: {
    colors: ["#ffffff", "#eacfa0", "#fffdf8", "#d9bd8a", "#ffffff", "#dfe9f4", "#f6ecd8"],
    speed: 0.4,
    distortion: 1,
    swirl: 1,
    scale: 0.72,
    grainMixer: 0.1,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#f6ead2 60%,#ece0cb 100%)",
  },
  blue: {
    colors: ["#ffffff", "#a9c3e8", "#fdfaf3", "#8fb0e0", "#ffffff", "#5b86cd", "#e8eef8"],
    speed: 0.42,
    distortion: 1,
    swirl: 1,
    scale: 0.72,
    grainMixer: 0.1,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#e7eef8 55%,#cdd9ec 100%)",
  },
  sage: {
    colors: ["#ffffff", "#c4d8a6", "#fdfcf6", "#9cba77", "#ffffff", "#7ea25a", "#eaf1dd"],
    speed: 0.4,
    distortion: 1,
    swirl: 1,
    scale: 0.72,
    grainMixer: 0.1,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#eef3e4 55%,#d6e4c4 100%)",
  },
  gold: {
    colors: ["#ffffff", "#ecd292", "#fffcf4", "#e3c581", "#ffffff", "#c9a04a", "#f8ecd2"],
    speed: 0.4,
    distortion: 1,
    swirl: 1,
    scale: 0.72,
    grainMixer: 0.1,
    fallback: "linear-gradient(180deg,#fffdf9 0%,#fbeed1 55%,#eed7a8 100%)",
  },
  ink: {
    colors: ["#f3f6fc", "#9fb6df", "#e2eaf7", "#5d7cbb", "#eef3fb", "#2a4f8f", "#c3d2ea"],
    speed: 0.34,
    distortion: 1,
    swirl: 1,
    scale: 0.72,
    grainMixer: 0.1,
    fallback: "linear-gradient(180deg,#f3f6fc 0%,#cdd9ec 60%,#9fb6df 100%)",
  },
};

export function PageHero({
  eyebrow,
  title,
  titleBn,
  intro,
  introBn,
  children,
  media,
  mediaTone = "milk",
  mediaLabel,
  mediaPhoto,
  milk = "cream",
}: {
  eyebrow: string;
  title: ReactNode;
  /** Bangla echo of the headline (serif Bangla). */
  titleBn?: ReactNode;
  intro?: string;
  /** Bangla echo of the intro paragraph. */
  introBn?: string;
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
        scale={m.scale}
        grainMixer={m.grainMixer}
        fallback={m.fallback}
        className="opacity-[0.95]"
      />
      {/* legibility wash — kept to the left edge only, so the milk currents
          stay fully visible while the headline sits on calm ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg/55 via-bg/10 to-transparent"
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
          {titleBn && (
            <Reveal delay={0.08}>
              <p className="font-bn-serif mt-3 text-2xl text-ink/90 md:text-3xl">
                {titleBn}
              </p>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-stone">
                {intro}
              </p>
            </Reveal>
          )}
          {introBn && (
            <Reveal delay={0.13}>
              <p className="font-bn mt-3 max-w-xl text-base leading-relaxed text-stone">
                {introBn}
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
            rounded="rounded-[1.5rem] md:rounded-[2.5rem]"
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
