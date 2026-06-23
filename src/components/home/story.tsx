import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SplitReveal } from "@/components/motion/split-reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Story() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <Parallax amount={36}>
            <MaskReveal
              rounded="rounded-[2.5rem]"
              className="relative aspect-[4/5] shadow-[var(--shadow-lift)] ring-1 ring-inset ring-ink/5"
            >
              <Photo
                src={getPhoto("story-milking")?.src}
                blurDataURL={getPhoto("story-milking")?.lqip}
                alt="Hand-milking at first light"
                tone="field"
                shader
                rounded="rounded-none"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full"
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/55 to-transparent p-8">
                  <p className="font-serif text-3xl text-cream">4am</p>
                  <p className="text-sm text-cream/75">the day begins</p>
                </div>
              </Photo>
            </MaskReveal>
          </Parallax>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6"
            text="Healthy families begin with pure food."
          />
          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-stone">
              <p>
                Long before the city wakes, our farmers are already at work.
                Cows are milked by hand, the milk is filtered and chilled within
                the hour, and tested before it ever leaves the farm.
              </p>
              <p>
                We believe you should never have to wonder what is in your
                family&rsquo;s milk. So we built GOOWALI around a single idea —
                an honest line from the farm to your table, with nothing hidden
                in between.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <Button href="/about" variant="ghost">
                Read our full story
                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
