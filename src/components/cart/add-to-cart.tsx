"use client";

import { toast } from "sonner";
import { ArrowRight } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";

export function AddToCart({
  slug,
  name,
  price,
  unit,
}: {
  slug: string;
  name: string;
  price: string;
  unit: string;
}) {
  const { add, setOpen } = useCart();

  return (
    <button
      onClick={() => {
        add({ slug, name, price, unit });
        toast.success(`${name} added`, {
          description: "Added to your morning order.",
          action: { label: "View", onClick: () => setOpen(true) },
        });
      }}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-medium text-cream transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-soft hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
    >
      Add to order
      <ArrowRight
        size={18}
        className="transition-transform duration-500 group-hover:translate-x-1"
      />
    </button>
  );
}
