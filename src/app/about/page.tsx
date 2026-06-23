import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "GOOWALI exists to put pure, honest food on every Bangladeshi family's table — connecting trusted farms directly to homes.",
};

const VALUES = [
  { title: "Honesty", text: "We tell you exactly where your food comes from. No fine print." },
  { title: "Purity", text: "Nothing added that doesn't belong. Ever." },
  { title: "Care", text: "For our animals, our farmers, and your family." },
  { title: "Roots", text: "Proudly Bangladeshi, built on traditional values." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        fieldSeed={23}
        mediaLabel="Pure food, honest source."
        eyebrow="About GOOWALI"
        title={
          <>
            Pure food,
            <br />
            <span className="italic text-ink">for every family.</span>
          </>
        }
        intro="We started GOOWALI with a simple frustration: families could no longer trust the milk they bought. So we built an honest alternative — farm to family, with nothing hidden in between."
      />

      {/* Mission / Vision */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[2rem] border hairline bg-bg p-10">
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-night">
              To make pure, honest food the easy choice for every Bangladeshi
              family.
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="rounded-[2rem] bg-ink p-10 text-cream"
          >
            <Eyebrow className="text-green-soft">Our vision</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-cream">
              To become the most trusted dairy and food brand in the country —
              one honest morning at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg py-24 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What we stand for</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                Four values, in every drop.
              </h2>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-[2rem] border hairline bg-cream p-8">
                  <span className="text-eyebrow text-green/70">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-2xl text-night">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-stone">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <MaskReveal className="aspect-[4/5]">
            <Photo
              src={getPhoto("founder")?.src}
              blurDataURL={getPhoto("founder")?.lqip}
              tone="milk"
              alt="GOOWALI founder"
              rounded="rounded-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/45 to-transparent p-8">
                <p className="font-serif text-2xl text-cream">The founder</p>
              </div>
            </Photo>
          </MaskReveal>
          <div>
            <Reveal>
              <Eyebrow>Founder&rsquo;s note</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                It began with my own children.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-stone">
                <p>
                  I wanted to give my family milk I could trust — the kind I
                  remembered from my grandmother&rsquo;s village. When I
                  couldn&rsquo;t find it, I decided to build it.
                </p>
                <p>
                  GOOWALI is that promise, scaled. We work directly with farmers
                  we know, test everything, and deliver it fresh. No middlemen,
                  no shortcuts, no compromise.
                </p>
                <p className="font-serif text-2xl italic text-ink">
                  &ldquo;Pure food is not a luxury. It&rsquo;s a right.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Join the GOOWALI family."
        subtitle="Start every morning with food you can finally trust."
      />
    </>
  );
}
