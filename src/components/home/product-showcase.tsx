import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function ProductShowcase() {
  const heroes = PRODUCTS.filter((p) => p.hero);

  return (
    <section className="bg-bg py-16 lg:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>The range</Eyebrow>
            </Reveal>
            <SplitReveal
              as="h2"
              className="text-headline mt-6"
              text="Milk is the hero. Everything else supports it."
            />
            <Reveal delay={0.08}>
              <p className="font-bn-serif mt-3 text-2xl text-ink/85">
                দুধই নায়ক। বাকি সবকিছু তাকে ঘিরে।
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/products" variant="outline">
              View all products
              <ArrowRight
                size={18}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {heroes.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
