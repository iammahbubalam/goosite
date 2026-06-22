import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "cream" | "milk" | "ink" | "green" | "field";

const tones: Record<Tone, string> = {
  cream:
    "from-[#fff4e6] via-[#fff9f2] to-[#f6ead8] text-ink",
  milk: "from-[#ffffff] via-[#fafaf7] to-[#eee7dc] text-ink",
  ink: "from-[#1d4a8f] via-[#153b7a] to-[#0f2c5c] text-cream",
  green: "from-[#dcebc6] via-[#cfe2b2] to-[#a9c97f] text-ink",
  field:
    "from-[#e8f0d8] via-[#cfe2b2] to-[#8bb85f] text-ink",
};

/**
 * Editorial image stand-in: a soft, organic gradient panel with grain and a
 * gentle vignette. Used where commissioned farm photography will later sit.
 */
export function ArtPanel({
  tone = "cream",
  className,
  children,
  rounded = "rounded-[2rem]",
}: {
  tone?: Tone;
  className?: string;
  children?: ReactNode;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br",
        tones[tone],
        rounded,
        className,
      )}
    >
      {/* soft light blooms */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-1/3 -right-1/4 h-2/3 w-2/3 rounded-full bg-white/20 blur-3xl" />
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
}
