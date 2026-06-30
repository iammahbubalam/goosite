import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Story } from "@/components/home/story";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SubscriptionTeaser } from "@/components/home/subscription-teaser";
import { B2BTeaser } from "@/components/home/b2b-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";

// Below-the-fold client islands: keep SSR on (default) so HTML/SEO/CLS are
// unchanged, but split their client chunks out of the initial load.
const MilkJourney = dynamic(() =>
  import("@/components/home/milk-journey").then((m) => m.MilkJourney),
);
const Faq = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.Faq),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Story />
      <MilkJourney />
      <ProductShowcase />
      <SubscriptionTeaser />
      <B2BTeaser />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
