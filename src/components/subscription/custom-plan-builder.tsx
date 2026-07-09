"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MILK_RATE_PER_L } from "@/lib/products";
import {
  FREQS,
  DAYS,
  deliveriesPerMonth,
  estimateMonthly,
  taka,
  type FreqId,
} from "@/lib/subscription";

export function CustomPlanBuilder() {
  // Subscriptions are raw milk only — the one product worth waking up for.
  const [litres, setLitres] = useState(1);
  const [freq, setFreq] = useState<FreqId>("daily");
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5]); // Mon–Sat

  const perMonth = useMemo(
    () => deliveriesPerMonth(freq, days.length),
    [freq, days],
  );

  const perDelivery = litres * MILK_RATE_PER_L;
  const monthly = estimateMonthly(litres, freq, days.length);

  const checkoutHref = useMemo(() => {
    const q = new URLSearchParams({
      type: "sub",
      litres: String(litres),
      freq,
    });
    if (freq === "custom") q.set("days", days.join(","));
    return `/checkout?${q.toString()}`;
  }, [litres, freq, days]);

  const toggleDay = (i: number) =>
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort()));

  const stepLitres = (delta: number) =>
    setLitres((l) => Math.min(4, Math.max(0.5, +(l + delta).toFixed(1))));

  return (
    <div className="grid gap-6 rounded-[1.5rem] md:rounded-[2.5rem] border hairline bg-bg p-6 md:p-10 lg:grid-cols-5 lg:gap-10">
      {/* Controls */}
      <div className="space-y-9 lg:col-span-3">
        {/* The milk — one choice, the right one */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">
            Your milk{" "}
            <span className="font-bn ml-1 normal-case tracking-normal text-sage-deep/60">
              · আপনার দুধ
            </span>
          </p>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-ink bg-ink p-5 text-cream shadow-[var(--shadow-soft)]">
            <div>
              <span className="font-serif text-lg">
                Raw milk
                <span className="font-bn-serif ml-1.5 text-base opacity-70">
                  কাঁচা দুধ
                </span>
              </span>
              <span className="mt-1 block text-xs text-cream/65">
                Farm-fresh, unprocessed — the only milk we subscribe.
              </span>
            </div>
            <span className="shrink-0 font-serif text-2xl">
              {taka(MILK_RATE_PER_L)}
              <span className="text-sm text-cream/65">/L</span>
            </span>
          </div>
        </div>

        {/* Litres per delivery */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">
            Litres per delivery{" "}
            <span className="font-bn ml-1 normal-case tracking-normal text-sage-deep/60">
              · প্রতি ডেলিভারিতে লিটার
            </span>
          </p>
          <div className="mt-4 flex items-center gap-5">
            <div className="inline-flex items-center gap-1 rounded-full border hairline bg-cream/50 p-1.5">
              <button
                type="button"
                aria-label="Less"
                onClick={() => stepLitres(-0.5)}
                disabled={litres <= 0.5}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <span className="w-16 text-center font-serif text-2xl text-night">
                {litres}L
              </span>
              <button
                type="button"
                aria-label="More"
                onClick={() => stepLitres(0.5)}
                disabled={litres >= 4}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-sm text-stone">
              {taka(perDelivery)} per delivery
              <span className="font-bn ml-1 text-stone/70">· প্রতি ডেলিভারি</span>
            </p>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">
            How often{" "}
            <span className="font-bn ml-1 normal-case tracking-normal text-sage-deep/60">
              · কত ঘন ঘন
            </span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {FREQS.map((f) => {
              const on = f.id === freq;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFreq(f.id)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    on
                      ? "border-ink bg-ink text-cream"
                      : "hairline bg-cream/40 text-night hover:border-sage/40 hover:bg-cream",
                  )}
                >
                  {f.label}
                  <span className="font-bn ml-1.5 opacity-70">{f.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Custom day picker */}
          {freq === "custom" && (
            <div className="mt-5 grid grid-cols-7 gap-2">
              {DAYS.map((d, i) => {
                const on = days.includes(i);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(i)}
                    aria-pressed={on}
                    className={cn(
                      "flex flex-col items-center rounded-2xl border py-3 text-xs font-medium transition-all duration-300",
                      on
                        ? "border-sage bg-sage/15 text-sage-deep"
                        : "hairline bg-cream/40 text-stone hover:bg-cream",
                    )}
                  >
                    {d}
                    <span className="mt-1.5 text-sm">{on ? "1L" : "—"}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Live summary */}
      <div className="lg:col-span-2">
        <div className="flex h-full flex-col rounded-[2rem] bg-ink p-8 text-cream">
          <p className="bn-eyebrow text-sage-soft/70">আপনার প্ল্যান · Your plan</p>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Milk · দুধ" value="Raw milk · কাঁচা দুধ" />
            <Row label="Per delivery · প্রতি ডেলিভারি" value={`${litres}L`} />
            <Row
              label="Schedule · সময়সূচি"
              value={
                freq === "custom"
                  ? `${days.length} day${days.length === 1 ? "" : "s"} / week`
                  : FREQS.find((f) => f.id === freq)!.labelBn
              }
            />
            <Row
              label="Deliveries · ডেলিভারি"
              value={`~${Math.round(perMonth)} / month`}
            />
          </div>

          <div className="mt-7 border-t border-cream/15 pt-6">
            <p className="font-bn text-sm text-cream/60">
              আনুমানিক মাসিক খরচ · Estimated monthly
            </p>
            <p className="mt-1 font-serif text-5xl">
              {monthly > 0 ? taka(monthly) : "—"}
            </p>
            <p className="mt-1.5 text-xs text-cream/55">
              Billed monthly · no lock-in
            </p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {[
              "যেকোনো সময় বিরতি বা বাদ দিন",
              "নাস্তার আগেই পৌঁছে দেওয়া",
              "যখন খুশি বাতিল করুন",
            ].map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm">
                <Check size={15} className="shrink-0 text-sage-soft" />
                <span className="font-bn text-cream/85">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href={checkoutHref} variant="light" size="lg" className="w-full">
              Start this plan · <span className="font-bn">শুরু করুন</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-bn text-cream/55">{label}</span>
      <span className="font-bn font-medium text-cream">{value}</span>
    </div>
  );
}
