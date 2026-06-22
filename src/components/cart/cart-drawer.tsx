"use client";

import { Drawer } from "vaul";
import { Minus, Plus, Trash, ArrowRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear, count } = useCart();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-night/30 backdrop-blur-sm" />
        <Drawer.Content className="fixed inset-y-0 right-0 z-[70] flex w-[92vw] max-w-md flex-col bg-cream outline-none">
          <div className="flex items-center justify-between border-b hairline px-6 py-5">
            <Drawer.Title className="font-serif text-2xl text-night">
              Your morning order
            </Drawer.Title>
            <Drawer.Description className="sr-only">
              Items in your basket
            </Drawer.Description>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-stone hover:text-ink"
            >
              Close
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
              <p className="font-serif text-2xl text-night">
                Your basket is empty.
              </p>
              <p className="text-stone">
                Start with the milk — the heart of everything we make.
              </p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink-soft"
              >
                Explore products
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-4 py-5">
                    <div className="flex-1">
                      <p className="font-serif text-lg text-night">
                        {item.name}
                      </p>
                      <p className="text-sm text-stone">
                        {item.price} · {item.unit}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center rounded-full border hairline">
                          <button
                            aria-label="Decrease"
                            onClick={() => setQty(item.slug, item.qty - 1)}
                            className="px-2.5 py-1.5 text-ink hover:text-ink-soft"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-7 text-center text-sm text-night">
                            {item.qty}
                          </span>
                          <button
                            aria-label="Increase"
                            onClick={() => setQty(item.slug, item.qty + 1)}
                            className="px-2.5 py-1.5 text-ink hover:text-ink-soft"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          aria-label="Remove"
                          onClick={() => remove(item.slug)}
                          className="text-stone transition-colors hover:text-ink"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t hairline px-6 py-6">
                <div className="flex items-center justify-between text-sm text-stone">
                  <span>{count} item{count > 1 ? "s" : ""}</span>
                  <button
                    onClick={clear}
                    className="hover:text-ink"
                  >
                    Clear basket
                  </button>
                </div>
                <Link
                  href="/contact"
                  onClick={() => {
                    setOpen(false);
                    toast.success("Let's finish your order", {
                      description: "Tell us your delivery area and we'll confirm.",
                    });
                  }}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-medium text-cream transition-all duration-500 hover:bg-ink-soft"
                >
                  Confirm order
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
                <p className="mt-3 text-center text-xs text-stone">
                  No payment now — we confirm every order personally.
                </p>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
