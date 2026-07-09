"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus, Plus, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { Eyebrow } from "@/components/ui/section";
import { Field, inputClass, submitClass } from "@/components/ui/field";
import {
  getSubPlan,
  estimateMonthly,
  deliveriesPerMonth,
  taka,
  FREQS,
  DAYS,
  type FreqId,
} from "@/lib/subscription";

const schema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().min(6, "A valid phone number, please"),
  area: z.string().min(2, "Which area should we deliver to?"),
  address: z.string().min(6, "A full address helps our rider find you"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** Human-friendly order reference, e.g. GW-8K2N4P. */
const makeOrderRef = () =>
  `GW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

/** What the customer is confirming — a basket order or a subscription. */
type SubSummary = {
  title: string;
  titleBn: string;
  lines: { label: string; value: string }[];
  monthly: number | null;
};

export function CheckoutClient() {
  const params = useSearchParams();
  const cart = useCart();
  const [placed, setPlaced] = useState<string | null>(null);

  const isSub = params.get("type") === "sub";

  const sub = useMemo<SubSummary | null>(() => {
    if (!isSub) return null;
    const planId = params.get("plan");
    if (planId) {
      const plan = getSubPlan(planId);
      if (!plan) return null;
      return {
        title: plan.name,
        titleBn: plan.nameBn,
        lines: [
          { label: "Milk", value: "Raw milk · কাঁচা দুধ" },
          { label: "Per delivery", value: `${plan.litres}L` },
          { label: "Deliveries", value: `~${plan.deliveries} / month` },
        ],
        monthly: Number(plan.price.replace(/[^\d]/g, "")),
      };
    }
    // Custom plan carried over from the builder.
    const litres = Number(params.get("litres")) || 1;
    const freq = (params.get("freq") ?? "daily") as FreqId;
    const days = (params.get("days") ?? "")
      .split(",")
      .filter(Boolean)
      .map(Number);
    const freqDef = FREQS.find((f) => f.id === freq) ?? FREQS[0];
    return {
      title: "Your custom plan",
      titleBn: "আপনার নিজের প্ল্যান",
      lines: [
        { label: "Milk", value: "Raw milk · কাঁচা দুধ" },
        { label: "Per delivery", value: `${litres}L` },
        {
          label: "Schedule",
          value:
            freq === "custom"
              ? days.map((d) => DAYS[d] ?? "").join(", ") || "Custom"
              : freqDef.label,
        },
        {
          label: "Deliveries",
          value: `~${Math.round(deliveriesPerMonth(freq, days.length))} / month`,
        },
      ],
      monthly: estimateMonthly(litres, freq, days.length),
    };
  }, [isSub, params]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Simulate a network round-trip; wire to a real endpoint later.
    await new Promise((r) => setTimeout(r, 700));
    const ref = makeOrderRef();
    console.info("order placed", {
      ref,
      mode: isSub ? "subscription" : "order",
      sub,
      items: cart.items,
      customer: data,
    });
    if (!isSub) cart.clear();
    setPlaced(ref);
    toast.success(isSub ? "Subscription requested" : "Order placed", {
      description: "We'll call you shortly to confirm.",
    });
  };

  /* ---------- success ---------- */
  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-xl flex-col items-center py-20 text-center"
      >
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green/15 text-green">
          <Check size={34} />
        </span>
        <h1 className="mt-8 font-serif text-4xl text-night md:text-5xl">
          {isSub ? "Subscription requested." : "Order placed."}
        </h1>
        <p className="font-bn mt-3 text-lg text-stone">
          {isSub ? "সাবস্ক্রিপশন অনুরোধ গৃহীত হয়েছে।" : "অর্ডার সম্পন্ন হয়েছে।"}
        </p>
        <p className="mt-6 rounded-full border hairline bg-bg px-6 py-2.5 font-medium text-ink">
          Reference · {placed}
        </p>
        <p className="mt-6 max-w-sm leading-relaxed text-stone">
          {isSub
            ? "We'll call you shortly to confirm your first morning delivery. No payment until your milk arrives."
            : "We'll call you shortly to confirm. Pay in cash when your delivery arrives — fresh by morning."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="rounded-full bg-ink px-7 py-3.5 font-medium text-cream transition-all duration-500 hover:bg-ink-soft"
          >
            Keep exploring
          </Link>
          <Link
            href="/"
            className="rounded-full border hairline px-7 py-3.5 font-medium text-ink transition-colors hover:bg-bg"
          >
            Back home
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ---------- empty basket (order mode only) ---------- */
  if (!isSub && cart.items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center py-24 text-center">
        <h1 className="font-serif text-4xl text-night">Your basket is empty.</h1>
        <p className="font-bn mt-3 text-stone">আপনার ঝুড়ি খালি।</p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-ink px-7 py-3.5 font-medium text-cream transition-all duration-500 hover:bg-ink-soft"
        >
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow>{isSub ? "Start your subscription" : "Checkout"}</Eyebrow>
      <h1 className="text-display mt-6 max-w-2xl">
        {isSub ? "One step from better mornings." : "Almost there."}
      </h1>
      <p className="font-bn mt-3 text-lg text-stone">
        {isSub ? "ভালো সকালের এক ধাপ দূরে।" : "প্রায় হয়ে গেছে।"}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- summary column ---------- */}
        <div className="lg:col-span-5">
          {isSub && sub ? (
            <div className="rounded-[2rem] bg-ink p-8 text-cream">
              <p className="bn-eyebrow text-sage-soft/70">
                আপনার প্ল্যান · Your plan
              </p>
              <h2 className="mt-4 font-serif text-3xl">
                {sub.title}
                <span className="font-bn-serif ml-2 text-xl opacity-70">
                  {sub.titleBn}
                </span>
              </h2>
              <div className="mt-6 space-y-3 border-t border-cream/15 pt-6 text-sm">
                {sub.lines.map((l) => (
                  <div
                    key={l.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-cream/55">{l.label}</span>
                    <span className="font-bn font-medium">{l.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-cream/15 pt-6">
                <p className="font-bn text-sm text-cream/60">
                  আনুমানিক মাসিক · Estimated monthly
                </p>
                <p className="mt-1 font-serif text-5xl">
                  {sub.monthly ? taka(sub.monthly) : "—"}
                </p>
                <p className="mt-1.5 text-xs text-cream/55">
                  No lock-in — pause, skip or cancel anytime.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border hairline bg-bg p-6 md:p-8">
              <p className="text-eyebrow text-stone/70">Your order · অর্ডার</p>
              <ul className="mt-5 divide-y divide-ink/8">
                {cart.items.map((item) => (
                  <li key={item.slug} className="flex items-center gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-night">
                        {item.name}
                      </p>
                      <p className="text-sm text-stone">
                        {item.price} · {item.unit}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border hairline p-1">
                      <button
                        type="button"
                        aria-label="Less"
                        onClick={() => cart.setQty(item.slug, item.qty - 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-night">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="More"
                        onClick={() => cart.setQty(item.slug, item.qty + 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="w-20 text-right font-medium text-night">
                      {taka(item.priceValue * item.qty)}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => cart.remove(item.slug)}
                      className="text-stone/60 transition-colors hover:text-[#b15c3a]"
                    >
                      <Trash size={17} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2.5 border-t hairline pt-5 text-sm">
                <div className="flex items-center justify-between text-stone">
                  <span>Subtotal · সাবটোটাল</span>
                  <span className="font-medium text-night">
                    {taka(cart.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone">
                  <span>Delivery · ডেলিভারি</span>
                  <span className="font-medium text-green">
                    Free inside Dhaka
                  </span>
                </div>
                <div className="flex items-center justify-between border-t hairline pt-3 text-base">
                  <span className="font-medium text-night">Total · মোট</span>
                  <span className="font-serif text-2xl text-ink">
                    {taka(cart.subtotal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* payment note */}
          <div className="mt-6 rounded-[2rem] border hairline bg-bg p-6">
            <p className="font-medium text-night">
              Cash on delivery{" "}
              <span className="font-bn text-stone">· ক্যাশ অন ডেলিভারি</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              No payment now — pay when your delivery arrives. We confirm every
              order personally by phone.
            </p>
          </div>
        </div>

        {/* ---------- delivery form ---------- */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 rounded-[1.5rem] md:rounded-[2.5rem] border hairline bg-bg p-8 md:p-10"
              noValidate
            >
              <p className="text-eyebrow text-stone/70">
                Delivery details · ডেলিভারির তথ্য
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field error={errors.name?.message}>
                  <input
                    placeholder="Your name"
                    className={inputClass}
                    autoComplete="name"
                    {...register("name")}
                  />
                </Field>
                <Field error={errors.phone?.message}>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={inputClass}
                    autoComplete="tel"
                    {...register("phone")}
                  />
                </Field>
              </div>

              <Field error={errors.area?.message}>
                <input
                  placeholder="Area (e.g. Gulshan, Banani, Dhanmondi)"
                  className={inputClass}
                  {...register("area")}
                />
              </Field>

              <Field error={errors.address?.message}>
                <textarea
                  rows={3}
                  placeholder="Full delivery address"
                  className={cn(inputClass, "resize-none")}
                  autoComplete="street-address"
                  {...register("address")}
                />
              </Field>

              <Field error={errors.notes?.message}>
                <input
                  placeholder="Delivery notes (optional)"
                  className={inputClass}
                  {...register("notes")}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className={submitClass}
              >
                {isSubmitting
                  ? "Placing…"
                  : isSub
                    ? "Start subscription · শুরু করুন"
                    : "Place order · অর্ডার করুন"}
              </button>
              <p className="text-center text-sm text-stone">
                We&rsquo;ll call to confirm before the first delivery.
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
