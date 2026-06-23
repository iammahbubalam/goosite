import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import {
  PRODUCTS,
  getProduct,
  productsByCategory,
} from "@/lib/products";
import { ArtPanel } from "@/components/ui/art-panel";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { MilkWave } from "@/components/ui/milk-wave";
import { ProductCard } from "@/components/product/product-card";
import { AddToCart } from "@/components/cart/add-to-cart";
import { Faq } from "@/components/sections/faq";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

const toneFor = (cat: string) =>
  cat === "milk" ? "milk" : cat === "dairy" ? "cream" : "field";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const photo = getPhoto(product.slug);
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-morning pt-32 pb-4 md:pt-40">
        <div className="container-x">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> All products
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <MaskReveal className="aspect-square">
              {photo ? (
                <Photo
                  src={photo.src}
                  alt={photo.alt}
                  blurDataURL={photo.lqip}
                  rounded="rounded-none"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full"
                />
              ) : (
                <ArtPanel
                  tone={toneFor(product.category)}
                  shader
                  rounded="rounded-none"
                  className="h-full w-full"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-6 text-center font-serif text-5xl text-ink/20 md:text-6xl">
                      {product.name}
                    </span>
                  </div>
                </ArtPanel>
              )}
            </MaskReveal>

            <div>
              <Reveal>
                <Eyebrow>{product.category}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-headline mt-5">{product.name}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 font-serif text-2xl italic text-ink">
                  {product.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-lg leading-relaxed text-stone">
                  {product.description}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex items-end gap-3">
                  <span className="font-serif text-4xl text-ink">
                    {product.price}
                  </span>
                  <span className="pb-1.5 text-stone">{product.unit}</span>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <AddToCart
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    unit={product.unit}
                  />
                  <Button href="/subscription" variant="outline" size="lg">
                    Subscribe &amp; save
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <MilkWave fill="var(--color-cream)" className="mt-16 -mb-px" />
      </section>

      {/* Benefits */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Why it&rsquo;s different</Eyebrow>
            <h2 className="text-headline mt-5">
              Care you can taste.
            </h2>
          </div>
          <Stagger className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {product.benefits.map((b) => (
              <StaggerItem
                key={b}
                className="flex items-start gap-3 border-b border-ink/10 pb-6"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <p className="text-lg text-night">{b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Source / Process / Nutrition */}
      <section className="bg-bg py-24 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <Reveal className="rounded-[2rem] border hairline bg-cream p-8">
            <Eyebrow>Source</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-night">
              {product.source}
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="rounded-[2rem] border hairline bg-cream p-8"
          >
            <Eyebrow>Process</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-night">
              {product.process}
            </p>
          </Reveal>
          <Reveal
            delay={0.16}
            className="rounded-[2rem] border hairline bg-ink p-8 text-cream"
          >
            <Eyebrow className="text-green-soft">
              {product.nutrition ? "Per 100ml" : "Our pledge"}
            </Eyebrow>
            {product.nutrition ? (
              <ul className="mt-5 space-y-3">
                {product.nutrition.map((n) => (
                  <li
                    key={n.label}
                    className="flex items-center justify-between border-b border-cream/15 pb-3 text-cream/85"
                  >
                    <span>{n.label}</span>
                    <span className="font-serif text-lg text-cream">
                      {n.value}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-lg leading-relaxed text-cream/85">
                Sourced honestly, made in small batches, and sealed for
                freshness. Nothing added that doesn&rsquo;t belong.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <Faq
        eyebrow="Good to know"
        heading="Questions about this product."
      />

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bg py-24 md:py-28">
          <div className="container-x">
            <Eyebrow>You may also like</Eyebrow>
            <h2 className="text-headline mt-5 mb-12">From the same family.</h2>
            <Stagger className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
