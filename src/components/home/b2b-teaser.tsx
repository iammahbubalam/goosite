import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArtPanel } from "@/components/ui/art-panel";
import { Reveal } from "@/components/motion/reveal";

const CLIENTS = ["Restaurants", "Cafés", "Tea shops", "Hotels", "Bakeries"];

export function B2BTeaser() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>For business</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-6">
              The same purity, at the scale your kitchen needs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              Reliable bulk supply for the businesses that care what they serve.
              Consistent quality, dependable delivery, honest pricing.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border hairline bg-bg px-4 py-2 text-sm text-night"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href="/bulk-supply">
                Explore bulk supply
                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ArtPanel tone="ink" className="aspect-[5/4] p-10">
            <div className="flex h-full flex-col justify-between">
              <p className="font-serif text-3xl leading-snug text-cream">
                &ldquo;Our chai never tasted this consistent before GOOWALI.&rdquo;
              </p>
              <div>
                <p className="font-medium text-cream">Tareq Hossain</p>
                <p className="text-sm text-cream/60">
                  Owner, Porota House · Banani
                </p>
              </div>
            </div>
          </ArtPanel>
        </Reveal>
      </div>
    </section>
  );
}
