"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Bag } from "@phosphor-icons/react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b hairline"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="GOOWALI home"
          className="relative flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/goowali_full_logo_bgremoved.webp"
            alt="GOOWALI"
            width={160}
            height={48}
            priority
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-night/80 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-sage transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={`Open basket, ${count} items`}
            onClick={() => setCartOpen(true)}
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border hairline text-ink transition-colors hover:bg-cream"
          >
            <Bag
              size={19}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6"
            />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 18 }}
                  className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1 text-[11px] font-semibold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border hairline text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-cream border-b hairline"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 rounded-2xl px-4 py-3.5 font-serif text-2xl text-night transition-colors hover:bg-bg"
                >
                  {link.label}
                  <span className="font-bn text-base text-stone">
                    {link.labelBn}
                  </span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-ink px-6 py-3.5 text-center font-medium text-cream"
              >
                Order now · <span className="font-bn">অর্ডার করুন</span>
              </Link>
              <p className="mt-4 px-4 text-sm text-stone">{SITE.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
