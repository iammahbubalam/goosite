import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-ink-soft hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5",
  outline:
    "border border-ink/20 text-night hover:border-ink/40 hover:bg-cream",
  ghost: "text-night hover:bg-cream",
  light:
    "bg-cream/90 text-ink backdrop-blur hover:bg-cream hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
