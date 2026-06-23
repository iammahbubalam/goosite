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
  title: "Our Farms",
  description:
    "Meet the trusted Bangladeshi farms behind GOOWALI. Open about our sourcing, our standards, and the care our animals receive.",
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
  { name: "Sirajganj Highlands", detail: "Our founding partner herd since day one." },
  { name: "Pabna Greens", detail: "Riverside grazing land, famous for rich milk." },
  { name: "Tangail Meadows", detail: "Small family farms, big on care." },
];

export default function FarmsPage() {
  return (
    <>
      <PageHero
        milk="sage"
        eyebrow="Our farms"
        mediaTone="field"
        mediaLabel="Green fields. Morning light."
        title={
          <>
            Where your
            <br />
            <span className="italic text-ink">morning begins.</span>
          </>
        }
        intro="We don't hide our supply chain — we celebrate it. These are the farms, the families and the standards behind every bottle."
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
      <section className="bg-bg py-24 md:py-28">
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
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow>The network</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-5 mb-12">Farms we know by name.</h2>
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
        subtitle="Taste the difference an honest supply chain makes."
        primary={{ label: "Shop the milk", href: "/products" }}
        secondary={{ label: "Subscribe", href: "/subscription" }}
      />
    </>
  );
}
