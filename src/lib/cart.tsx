"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: string;
  /** Numeric taka value backing `price` — powers subtotals. */
  priceValue: number;
  unit: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  /** Sum of priceValue × qty across the basket, in taka. */
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

/** Carts saved before priceValue existed lack it — recover from the ৳ string. */
const withPriceValue = (i: CartItem): CartItem =>
  typeof i.priceValue === "number"
    ? i
    : { ...i, priceValue: Number(String(i.price).replace(/[^\d]/g, "")) || 0 };

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "goowali-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR/client mismatch.
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems((JSON.parse(raw) as CartItem[]).map(withPriceValue));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (item, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug);
      if (found)
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: i.qty + qty } : i,
        );
      return [...prev, { ...item, qty }];
    });

  const remove: CartContextValue["remove"] = (slug) =>
    setItems((prev) => prev.filter((i) => i.slug !== slug));

  const setQty: CartContextValue["setQty"] = (slug, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((n, i) => n + i.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.priceValue * i.qty, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    open,
    setOpen,
    add,
    remove,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
