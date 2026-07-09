import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Reveal } from "@/components/motion/reveal";

const CLIENTS = ["Restaurants", "Cafés", "Tea shops", "Hotels", "Bakeries"];

export function B2BTeaser() {
  return (
    <section className="bg-cream py-16 lg:py-32">
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
          <Reveal delay={0.08}>
            <p className="font-bn-serif mt-3 text-2xl text-ink/85">
              একই বিশুদ্ধতা, আপনার রান্নাঘরের প্রয়োজন মতো।
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-stone">
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
          <Photo
            src={getPhoto("family-breakfast")?.src}
            blurDataURL={getPhoto("family-breakfast")?.lqip}
            alt="A table served with GOOWALI"
            tone="ink"
            rounded="rounded-[2rem]"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="aspect-[5/4]"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25"
            />
            <div className="relative flex h-full flex-col justify-between p-10">
              <p className="font-serif text-3xl leading-snug text-cream">
                &ldquo;Our chai never tasted this consistent before GOOWALI.&rdquo;
              </p>
              <div>
                <p className="font-medium text-cream">Tareq Hossain</p>
                <p className="text-sm text-cream/70">
                  Owner, Porota House · Banani
                </p>
              </div>
            </div>
          </Photo>
        </Reveal>
      </div>
    </section>
  );
}
