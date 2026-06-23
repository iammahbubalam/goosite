import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { ArtPanel } from "@/components/ui/art-panel";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
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
  const photo = getPhoto(product.slug);
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border hairline bg-bg transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {photo ? (
          <Photo
            src={photo.src}
            alt={photo.alt}
            blurDataURL={photo.lqip}
            rounded="rounded-none"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <ArtPanel
            tone={toneFor(product.category)}
            rounded="rounded-none"
            className="h-full w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl text-ink/15 transition-transform duration-700 group-hover:scale-110">
                {product.name.split(" ")[0]}
              </span>
            </div>
          </ArtPanel>
        )}
        <span className="absolute right-5 top-5 z-10 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {product.price}
        </span>
      </div>

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
