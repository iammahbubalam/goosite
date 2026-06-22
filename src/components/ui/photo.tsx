import Image from "next/image";
import type { ReactNode } from "react";
import { ArtPanel } from "@/components/ui/art-panel";
import { cn } from "@/lib/utils";

type Tone = "cream" | "milk" | "ink" | "green" | "field";

/**
 * A photography slot. Pass `src` when real imagery is available and it renders
 * an optimised next/image; until then it falls back to the generative ArtPanel
 * so the layout is complete and premium with zero photos. Swapping in a real
 * photo later is a one-line change — just add `src`.
 */
export function Photo({
  src,
  alt = "",
  tone = "cream",
  shader = false,
  rounded = "rounded-[2rem]",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  children,
}: {
  src?: string;
  alt?: string;
  tone?: Tone;
  shader?: boolean;
  rounded?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  if (src) {
    return (
      <div
        className={cn("relative isolate overflow-hidden", rounded, className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {children}
      </div>
    );
  }

  return (
    <ArtPanel tone={tone} shader={shader} rounded={rounded} className={className}>
      {children}
    </ArtPanel>
  );
}
