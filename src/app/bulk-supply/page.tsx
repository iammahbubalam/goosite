import type { Metadata } from "next";
import { Building2, Truck, BadgeCheck, Receipt, Phone, MapPin, Snowflake, Percent } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section";
import { ArtPanel } from "@/components/ui/art-panel";
import { Button } from "@/components/ui/button";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { DealershipForm } from "@/components/b2b/dealership-form";
import { SITE } from "@/lib/site";

const TEL = `tel:${SITE.phone.replace(/[^+\d]/g, "")}`;

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

const DEALERSHIP = [
  {
    Icon: MapPin,
    title: "Your territory",
    text: "Exclusive coverage of your area — we don't stack dealers on top of each other.",
  },
  {
    Icon: Snowflake,
    title: "Cold storage",
    text: "A working fridge or freezer setup is all you need to start. We advise on the rest.",
  },
  {
    Icon: Percent,
    title: "Honest margins",
    text: "Transparent dealer pricing with a margin structure that grows with your volume.",
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
  {
    q: "How do I become a GOOWALI dealer or distributor?",
    a: "Apply with the dealership form on this page — tell us your area and setup. Our partnerships team calls within two business days to discuss territory, volumes and margins.",
  },
];

export default function BulkSupplyPage() {
  return (
    <>
      <PageHero
        milk="ink"
        eyebrow="For business"
        mediaPhoto="farm-hero"
        mediaLabel="From our farms to your kitchen."
        title={
          <>
            Purity,
            <br />
            <span className="italic text-ink">at scale.</span>
          </>
        }
        titleBn="বিশুদ্ধতা, বড় পরিসরে।"
        intro="Dependable bulk supply for the businesses that care what they serve. The same milk we send to families — delivered to your kitchen door."
        introBn="যেসব ব্যবসা যত্ন করে কী পরিবেশন করছে, তাদের জন্য নির্ভরযোগ্য বাল্ক সরবরাহ। পরিবারে পাঠানো সেই একই দুধ — পৌঁছে যাবে আপনার রান্নাঘরের দরজায়।"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg">
            Request a quote
          </Button>
          <Button href={TEL} variant="outline" size="lg">
            <Phone size={17} strokeWidth={1.8} />
            {SITE.phone}
          </Button>
        </div>
      </PageHero>

      {/* Segments */}
      <section className="bg-cream py-14 lg:py-24">
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
      <section className="bg-bg py-16 lg:py-28">
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
      <section className="bg-cream py-16 lg:py-28">
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

      {/* Dealership */}
      <section className="bg-bg py-16 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>
                Dealership <span className="font-bn ml-1 normal-case tracking-normal">· ডিলারশিপ</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                Bring GOOWALI to your neighbourhood.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-bn mt-3 text-lg text-stone">
                আপনার এলাকায় গুয়ালী পৌঁছে দিন।
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md leading-relaxed text-stone">
                We&rsquo;re building a network of dealers and distributors
                across Bangladesh — people who believe their neighbours deserve
                honest milk. If that&rsquo;s you, let&rsquo;s talk.
              </p>
            </Reveal>
            <Stagger className="mt-10 space-y-4">
              {DEALERSHIP.map(({ Icon, title, text }) => (
                <StaggerItem key={title}>
                  <div className="flex items-start gap-4 rounded-[1.5rem] border hairline bg-cream p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-night">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone">
                        {text}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <DealershipForm />
            </Reveal>
          </div>
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
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] bg-ink px-8 py-16 text-center text-cream md:px-16 md:py-20">
              <h2 className="text-headline text-cream">
                Let&rsquo;s talk volume.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-cream/75">
                Tell us about your business and we&rsquo;ll build a supply plan
                around it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="light" size="lg">
                  Request a quote
                </Button>
                <Button href={TEL} variant="ghost" size="lg" className="text-cream hover:text-cream">
                  <Phone size={17} strokeWidth={1.8} />
                  {SITE.phone}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
