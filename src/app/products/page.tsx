import type { Metadata } from "next";
import { CATEGORIES, productsByCategory } from "@/lib/products";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProductCard } from "@/components/product/product-card";
import { Eyebrow } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Pure milk, traditional dairy and honest organic staples — sourced directly from trusted Bangladeshi farms.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        milk="blue"
        eyebrow="The range"
        mediaPhoto="glass-pour"
        mediaLabel="Milk is the hero."
        title={
          <>
            Honest food,
            <br />
            <span className="italic text-ink">simply made.</span>
          </>
        }
        titleBn="সৎ খাবার, সহজভাবে তৈরি।"
        intro="Milk is our hero. Around it, a small, considered range of dairy and organic staples — each one sourced with the same care."
        introBn="দুধই আমাদের নায়ক। তাকে ঘিরে দুগ্ধ ও অর্গানিক পণ্যের ছোট্ট, যত্নে সাজানো এক সম্ভার — প্রতিটিই একই যত্নে উৎস থেকে আনা।"
      />

      <div className="bg-cream">
        {CATEGORIES.map((cat, i) => (
          <section
            key={cat.id}
            className="container-x border-t border-ink/10 py-20 first:border-t-0 md:py-28"
          >
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal>
                  <Eyebrow>
                    {`0${i + 1} · ${cat.label}`}
                    <span className="font-bn ml-1 normal-case tracking-normal text-sage-deep/70">
                      · {cat.labelBn}
                    </span>
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="text-headline mt-5 max-w-xl">{cat.blurb}</h2>
                </Reveal>
              </div>
            </div>

            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productsByCategory(cat.id).map((p) => (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>

      <CtaBand
        title="Not sure where to begin?"
        subtitle="Start with our milk — the heart of everything we make."
        primary={{ label: "Try the milk", href: "/products/raw-milk" }}
        secondary={{ label: "Subscribe", href: "/subscription" }}
      />
    </>
  );
}
