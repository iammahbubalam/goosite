import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";
import { ArtPanel } from "@/components/ui/art-panel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Story() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 h-[30rem]">
            <ArtPanel tone="field" className="col-span-3 row-span-3" />
            <ArtPanel tone="milk" className="col-span-2 row-span-2" />
            <ArtPanel tone="cream" className="col-span-2 row-span-3" />
            <ArtPanel tone="ink" className="col-span-3 row-span-2">
              <div className="flex h-full flex-col justify-end p-6">
                <p className="font-serif text-3xl text-cream">4am</p>
                <p className="text-sm text-cream/70">the day begins</p>
              </div>
            </ArtPanel>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-6">
              Healthy families begin with pure food.
            </h2>
          </Reveal>
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
