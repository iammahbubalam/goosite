"use client";

import dynamic from "next/dynamic";

// Sonner + Vaul are client-only overlays that are invisible until triggered
// (a toast fires / the cart opens), so defer their chunks off the initial
// load. ssr:false is correct — neither renders meaningful SSR HTML.
export const LazyToaster = dynamic(
  () => import("sonner").then((m) => m.Toaster),
  { ssr: false },
);

export const LazyCartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false },
);
