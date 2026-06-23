import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stories and guidance on pure food, healthy families and the farms behind GOOWALI.",
};

const POSTS = [
  {
    title: "Why pure milk matters for growing children",
    excerpt:
      "The first years shape a lifetime. Here's what really goes into the milk on your child's table.",
    category: "Health",
    read: "5 min",
    tone: "milk" as const,
    cover: "blog-children",
    featured: true,
  },
  {
    title: "Raw vs pasteurised: which milk is right for your family?",
    excerpt: "A calm, honest guide to the two — and how to choose.",
    category: "Guide",
    read: "6 min",
    tone: "cream" as const,
    cover: "blog-raw-vs-past",
  },
  {
    title: "A morning at our Sirajganj farm",
    excerpt: "Before the city wakes, the day's milk is already on its way.",
    category: "Farm",
    read: "4 min",
    tone: "field" as const,
    cover: "blog-farm-morning",
  },
  {
    title: "The quiet power of a morning ritual",
    excerpt: "How a simple glass of milk became a family tradition.",
    category: "Living",
    read: "3 min",
    tone: "cream" as const,
    cover: "blog-living",
  },
  {
    title: "Cooking with cold-pressed mustard oil",
    excerpt: "Three honest recipes that let a pure ingredient shine.",
    category: "Recipes",
    read: "7 min",
    tone: "field" as const,
    cover: "mustard-oil",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <PageHero
        milk="cream"
        eyebrow="The journal"
        mediaPhoto="story-milking"
        mediaLabel="Slow mornings, honest stories."
        title={
          <>
            Stories worth
            <br />
            <span className="italic text-ink">slowing down for.</span>
          </>
        }
        intro="On pure food, healthy families, and the farms that make it all possible."
      />

      <section className="bg-cream py-20 md:py-24">
        <div className="container-x">
          {/* Featured */}
          <Reveal>
            <Link
              href="/blog"
              className="group grid overflow-hidden rounded-[2.5rem] border hairline bg-bg md:grid-cols-2"
            >
              <Photo
                src={getPhoto(featured.cover)?.src}
                blurDataURL={getPhoto(featured.cover)?.lqip}
                tone={featured.tone}
                alt={featured.title}
                rounded="rounded-none"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[16/10] md:aspect-auto"
              />
              <div className="flex flex-col justify-center p-10 md:p-14">
                <span className="text-eyebrow text-green">
                  Featured · {featured.category}
                </span>
                <h2 className="text-headline mt-5">{featured.title}</h2>
                <p className="mt-5 text-lg text-stone">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 font-medium text-ink">
                  Read the story
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {rest.map((post) => (
              <StaggerItem key={post.title}>
                <Link
                  href="/blog"
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border hairline bg-bg transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <Photo
                    src={getPhoto(post.cover)?.src}
                    blurDataURL={getPhoto(post.cover)?.lqip}
                    tone={post.tone}
                    alt={post.title}
                    rounded="rounded-none"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="aspect-[4/3]"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-eyebrow text-green/80">
                      {post.category} · {post.read}
                    </span>
                    <h3 className="mt-3 font-serif text-xl text-night">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-stone">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
