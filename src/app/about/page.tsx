import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Parallax } from "@/components/motion/parallax";
import { Counter } from "@/components/motion/counter";

export const metadata: Metadata = {
  title: "About",
  description:
    "GOOWALI exists to put pure, honest food on every Bangladeshi family's table — connecting the farm directly to your home.",
};

const VALUES = [
  {
    title: "Honesty",
    titleBn: "সততা",
    text: "We tell you exactly where your food comes from. No fine print.",
  },
  {
    title: "Purity",
    titleBn: "বিশুদ্ধতা",
    text: "Nothing added that doesn't belong. Ever.",
  },
  {
    title: "Care",
    titleBn: "যত্ন",
    text: "For our animals, our farmers, and your family.",
  },
  {
    title: "Roots",
    titleBn: "শিকড়",
    text: "Proudly Bangladeshi, built on traditional values.",
  },
];

const NUMBERS = [
  { to: 2400, suffix: "+", label: "families served", labelBn: "পরিবার পরিবেশিত" },
  { to: 100, suffix: "%", label: "single origin", labelBn: "একক উৎস" },
  { to: 100, suffix: "%", label: "purity, tested daily", labelBn: "বিশুদ্ধতা, প্রতিদিন পরীক্ষিত" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        milk="gold"
        mediaPhoto="glass-pour"
        mediaLabel="Pure food, honest source."
        eyebrow="About GOOWALI"
        title={
          <>
            Pure food,
            <br />
            <span className="italic text-ink">for every family.</span>
          </>
        }
        titleBn="খাঁটি খাবার, প্রতিটি পরিবারের জন্য।"
        intro="We started GOOWALI with a simple frustration: families could no longer trust the milk they bought. So we built an honest alternative — farm to family, with nothing hidden in between."
        introBn="একটি সহজ হতাশা থেকে GOOWALI-র শুরু: পরিবারগুলো আর কেনা দুধে ভরসা রাখতে পারছিল না। তাই আমরা গড়লাম এক সৎ বিকল্প — খামার থেকে পরিবারে, মাঝে কিছুই লুকানো নেই।"
      />

      {/* Numbers — the promise, counted */}
      <section className="bg-cream py-14 lg:py-24">
        <div className="container-x">
          <Stagger className="grid gap-10 border-y hairline py-12 sm:grid-cols-3">
            {NUMBERS.map((n) => (
              <StaggerItem key={n.label}>
                <div className="text-center">
                  <p className="font-serif text-5xl text-ink md:text-6xl">
                    <Counter to={n.to} suffix={n.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-stone">{n.label}</p>
                  <p className="font-bn mt-0.5 text-xs text-stone/70">
                    {n.labelBn}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Mission / Vision — one editorial spread */}
      <section className="bg-cream pb-24 md:pb-28">
        <div className="container-x grid gap-8 lg:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="border-t-2 border-ink pt-7">
              <Eyebrow>Our mission</Eyebrow>
              <p className="mt-6 font-serif text-3xl leading-snug text-night md:text-4xl">
                To make pure, honest food the easy choice for every Bangladeshi
                family.
              </p>
              <p className="font-bn mt-4 text-stone">
                খাঁটি, সৎ খাবারকে প্রতিটি বাংলাদেশি পরিবারের সহজ পছন্দ করে তোলা।
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-t-2 border-sage pt-7">
              <Eyebrow>Our vision</Eyebrow>
              <p className="mt-6 font-serif text-3xl leading-snug text-night md:text-4xl">
                To become the most trusted dairy and food brand in the country —
                one honest morning at a time.
              </p>
              <p className="font-bn mt-4 text-stone">
                দেশের সবচেয়ে বিশ্বস্ত দুগ্ধ ও খাদ্য ব্র্যান্ড হয়ে ওঠা — এক একটি
                সৎ সকাল ধরে।
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values — numbered editorial rows */}
      <section className="bg-bg py-16 lg:py-28">
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
          <Stagger className="mt-14">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="group grid items-baseline gap-3 border-t hairline py-8 transition-colors duration-500 hover:bg-cream/60 md:grid-cols-12 md:gap-6 md:px-4">
                  <span className="font-serif text-lg text-sage-deep/70 md:col-span-1">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-3xl text-night md:col-span-4 md:text-4xl">
                    {v.title}
                    <span className="font-bn-serif ml-3 text-xl text-stone/70">
                      {v.titleBn}
                    </span>
                  </h3>
                  <p className="max-w-md leading-relaxed text-stone md:col-span-7">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
            <div className="border-t hairline" />
          </Stagger>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-cream py-16 lg:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Parallax amount={40}>
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
          </Parallax>
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
              <div className="mt-7 space-y-5 text-base md:text-lg leading-relaxed text-stone">
                <p>
                  I wanted to give my family milk I could trust — the kind I
                  remembered from my grandmother&rsquo;s village. When I
                  couldn&rsquo;t find it, I decided to build it.
                </p>
                <p>
                  GOOWALI is that promise, realized. We nurture the herd,
                  test everything, and deliver it fresh. No middlemen,
                  no shortcuts, no compromise.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="relative mt-10 border-l-2 border-sage pl-7">
                <span
                  aria-hidden
                  className="absolute -left-3 -top-8 font-serif text-8xl leading-none text-sage/25"
                >
                  &ldquo;
                </span>
                <p className="font-serif text-3xl italic leading-snug text-ink md:text-4xl">
                  Pure food is not a luxury. It&rsquo;s a right.
                </p>
                <p className="font-bn-serif mt-3 text-lg text-stone">
                  খাঁটি খাবার বিলাসিতা নয়, অধিকার।
                </p>
              </blockquote>
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
