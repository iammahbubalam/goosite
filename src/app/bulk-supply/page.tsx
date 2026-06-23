import type { Metadata } from "next";
import { Building2, Truck, BadgeCheck, Receipt } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section";
import { ArtPanel } from "@/components/ui/art-panel";
import { Button } from "@/components/ui/button";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Bulk Supply",
  description:
    "Dependable bulk milk and dairy supply for restaurants, cafés, hotels and bakeries across Bangladesh. Consistent quality, honest pricing.",
};

const VALUE = [
  { Icon: BadgeCheck, title: "Consistent quality", text: "The same tested purity in every delivery — batch after batch." },
  { Icon: Truck, title: "Dependable logistics", text: "Cold-chain delivery on a schedule your kitchen can rely on." },
  { Icon: Receipt, title: "Honest pricing", text: "Transparent bulk rates with no hidden markups or surprises." },
  { Icon: Building2, title: "Built to scale", text: "From a single café to a hotel group — we grow with you." },
];

const SEGMENTS = [
  "Restaurants",
  "Cafés",
  "Tea shops",
  "Hotels",
  "Bakeries",
  "Retailers",
];

const CASES = [
  {
    quote:
      "Switching to GOOWALI cut our customer complaints to zero. The milk is simply consistent.",
    name: "Porota House",
    detail: "5 outlets · 80L daily",
  },
  {
    quote:
      "Our pastry line depends on quality milk. GOOWALI delivers it on time, every time.",
    name: "Maison Patisserie",
    detail: "Bakery · 120L daily",
  },
];

const B2B_FAQ: FaqItem[] = [
  {
    q: "What's the minimum order for bulk supply?",
    a: "Bulk plans start at 20 litres per day. We tailor volumes and delivery frequency to your business.",
  },
  {
    q: "Do you offer credit terms?",
    a: "Yes — established partners can move to weekly or monthly invoicing after an initial period.",
  },
  {
    q: "Can you supply dairy products in bulk too?",
    a: "Absolutely. Doi, ghee, cheese and matha are all available at wholesale volumes.",
  },
  {
    q: "How do deliveries work?",
    a: "We run a dedicated cold-chain route. You'll get a fixed daily slot and a named point of contact.",
  },
];

export default function BulkSupplyPage() {
  return (
    <>
      <PageHero
        milk="ink"
        eyebrow="For business"
        mediaTone="ink"
        mediaLabel="From our farms to your kitchen."
        title={
          <>
            Purity,
            <br />
            <span className="italic text-ink">at scale.</span>
          </>
        }
        intro="Dependable bulk supply for the businesses that care what they serve. The same milk we send to families — delivered to your kitchen door."
      >
        <Button href="/contact" size="lg">
          Request a quote
        </Button>
      </PageHero>

      {/* Segments */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <p className="text-eyebrow text-stone/70">Trusted across the trade</p>
          </Reveal>
          <Stagger className="mt-8 flex flex-wrap gap-3">
            {SEGMENTS.map((s) => (
              <StaggerItem key={s}>
                <span className="rounded-full border hairline bg-bg px-5 py-2.5 text-night">
                  {s}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-bg py-24 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Why partner with us</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                A supplier your kitchen can count on.
              </h2>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUE.map(({ Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="flex h-full items-start gap-5 rounded-[2rem] border hairline bg-cream p-8">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-night">{title}</h3>
                    <p className="mt-2 text-stone">{text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow>In their kitchens</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline mt-5 mb-12">
              Businesses that switched, and stayed.
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {CASES.map((c) => (
              <StaggerItem key={c.name}>
                <ArtPanel tone="ink" className="p-10">
                  <div className="flex h-full flex-col justify-between gap-8">
                    <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-medium text-cream">{c.name}</p>
                      <p className="text-sm text-cream/60">{c.detail}</p>
                    </div>
                  </div>
                </ArtPanel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Faq
        items={B2B_FAQ}
        eyebrow="Bulk supply FAQ"
        heading="Answers for partners."
      />

      <section className="bg-bg pb-28 pt-4">
        <div className="container-x">
          <Reveal>
            <div className="rounded-[2.5rem] bg-ink px-8 py-16 text-center text-cream md:px-16 md:py-20">
              <h2 className="text-headline text-cream">
                Let&rsquo;s talk volume.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-cream/75">
                Tell us about your business and we&rsquo;ll build a supply plan
                around it.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/contact" variant="light" size="lg">
                  Request a quote
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
