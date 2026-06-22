import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Story } from "@/components/home/story";
import { MilkJourney } from "@/components/home/milk-journey";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SubscriptionTeaser } from "@/components/home/subscription-teaser";
import { B2BTeaser } from "@/components/home/b2b-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

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
