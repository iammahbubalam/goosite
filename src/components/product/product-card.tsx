import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { ArtPanel } from "@/components/ui/art-panel";
import { cn } from "@/lib/utils";

const toneFor = (cat: Product["category"]) =>
  cat === "milk" ? "milk" : cat === "dairy" ? "cream" : "field";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border hairline bg-bg transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <ArtPanel
        tone={toneFor(product.category)}
        rounded="rounded-none"
        className="aspect-[4/3]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-6xl text-ink/15 transition-transform duration-700 group-hover:scale-110">
            {product.name.split(" ")[0]}
          </span>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {product.price}
        </span>
      </ArtPanel>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-2xl text-night">{product.name}</h3>
        <p className="mt-2 flex-1 text-stone">{product.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Discover
          <ArrowUpRight
            size={16}
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
