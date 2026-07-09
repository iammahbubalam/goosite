import type { Metadata } from "next";
import { MapPin, HeartHandshake, Microscope, Leaf } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Eyebrow } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";

export const metadata: Metadata = {
  title: "The Farm",
  description:
    "Meet the farm behind GOOWALI. Open about where your milk comes from, our standards, and the care our animals receive.",
};

const STANDARDS = [
  {
    Icon: HeartHandshake,
    title: "Animals cared for",
    text: "Grass-fed herds, clean sheds, and farmers who know each cow by name.",
  },
  {
    Icon: Microscope,
    title: "Tested, not trusted blindly",
    text: "Milk is checked for purity and adulteration before it ever leaves the farm.",
  },
  {
    Icon: Leaf,
    title: "Natural by default",
    text: "No growth hormones, no shortcuts — just patient, traditional farming.",
  },
];

const FARMS = [
  { name: "Main Farm (Gazipur)", detail: "Dewalertek, Kaliganj, Gazipur, Dhaka." }
];

export default function FarmsPage() {
  return (
    <>
      <PageHero
        milk="sage"
        eyebrow="The farm"
        mediaPhoto="story-cows"
        mediaLabel="Green fields. Morning light."
        title={
          <>
            Where your
            <br />
            <span className="italic text-ink">morning begins.</span>
          </>
        }
        titleBn="যেখানে আপনার সকাল শুরু।"
        intro="We don't rely on complex supply chains. This is the farm and the standards behind every bottle."
        introBn="আমরা কোনো জটিল সরবরাহ শৃঙ্খলের ওপর নির্ভর করি না। এই হলো সেই খামার এবং মান, যা প্রতিটি বোতলের পেছনে রয়েছে।"
      />

      {/* Immersive panel */}
      <section className="bg-cream pt-4 pb-24 md:pb-28">
        <div className="container-x">
          <MaskReveal className="aspect-[16/9] md:aspect-[21/9]">
            <Photo
              src={getPhoto("farm-hero")?.src}
              blurDataURL={getPhoto("farm-hero")?.lqip}
              tone="field"
              shader
              alt="GOOWALI farm at morning"
              rounded="rounded-none"
              sizes="100vw"
              className="h-full w-full"
            >
              {!getPhoto("farm-hero") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-serif text-3xl text-ink/80 md:text-5xl">
                    Green fields. Morning light.
                  </p>
                </div>
              )}
            </Photo>
          </MaskReveal>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-bg py-16 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our standards</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                Purity is a practice, not a slogan.
              </h2>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {STANDARDS.map(({ Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-[2rem] border hairline bg-cream p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl text-night">
                    {title}
                  </h3>
                  <p className="mt-2 text-stone">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Farm list */}
      <section className="bg-cream py-16 lg:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow>The origin</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-5 mb-12">Every cow known by name.</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {FARMS.map((f) => (
              <StaggerItem key={f.name}>
                <div className="h-full rounded-[2rem] border hairline bg-bg p-8">
                  <MapPin className="text-green" size={22} />
                  <h3 className="mt-5 font-serif text-2xl text-night">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-stone">{f.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Purity you can trace."
        subtitle="Taste the difference a single origin makes."
        primary={{ label: "Shop the milk", href: "/products" }}
        secondary={{ label: "Subscribe", href: "/subscription" }}
      />
    </>
  );
}
