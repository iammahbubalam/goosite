import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-2 text-sage",
        className,
      )}
    >
      <span className="h-px w-6 bg-sage/60" />
      {children}
    </span>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 lg:py-32", className)}>
      {children}
    </section>
  );
}
