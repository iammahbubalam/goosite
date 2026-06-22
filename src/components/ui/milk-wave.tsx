import { cn } from "@/lib/utils";

/**
 * Organic milk-wave divider. Place at the top or bottom of a section to pour
 * one colour into the next. `fill` is the colour the wave paints with.
 */
export function MilkWave({
  className,
  fill = "var(--color-cream)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none w-full leading-[0]", className)}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[110px]"
      >
        <path
          d="M0,64 C220,118 380,18 620,46 C840,72 980,128 1180,92 C1300,70 1380,52 1440,58 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
