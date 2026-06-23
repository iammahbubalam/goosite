"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Milk = { id: string; name: string; note: string; rate: number };

const MILKS: Milk[] = [
  { id: "raw", name: "Raw milk", note: "Farm-fresh, unprocessed", rate: 130 },
  { id: "pasteurised", name: "Pasteurised", note: "Gently heat-treated", rate: 110 },
  { id: "uht", name: "UHT", note: "Long-life, ambient", rate: 95 },
];

const FREQS = [
  { id: "daily", label: "Daily", per: 30 },
  { id: "weekdays", label: "Weekdays", per: 22 },
  { id: "alternate", label: "Alternate days", per: 15 },
  { id: "custom", label: "Custom days", per: null },
] as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const taka = (n: number) => `৳${Math.round(n).toLocaleString("en-US")}`;

export function CustomPlanBuilder() {
  const [milkId, setMilkId] = useState("pasteurised");
  const [litres, setLitres] = useState(1);
  const [freq, setFreq] = useState<(typeof FREQS)[number]["id"]>("daily");
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5]); // Mon–Sat

  const milk = MILKS.find((m) => m.id === milkId)!;

  const perMonth = useMemo(() => {
    if (freq === "custom") return days.length * 4.33;
    return FREQS.find((f) => f.id === freq)!.per ?? 0;
  }, [freq, days]);

  const perDelivery = litres * milk.rate;
  const monthly = Math.round((perDelivery * perMonth) / 10) * 10;

  const toggleDay = (i: number) =>
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort()));

  const stepLitres = (delta: number) =>
    setLitres((l) => Math.min(4, Math.max(0.5, +(l + delta).toFixed(1))));

  return (
    <div className="grid gap-6 rounded-[2.5rem] border hairline bg-bg p-6 md:p-10 lg:grid-cols-5 lg:gap-10">
      {/* Controls */}
      <div className="space-y-9 lg:col-span-3">
        {/* Milk type */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">Choose your milk</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {MILKS.map((m) => {
              const on = m.id === milkId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMilkId(m.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    on
                      ? "border-ink bg-ink text-cream shadow-[var(--shadow-soft)]"
                      : "hairline bg-cream/40 text-night hover:border-sage/40 hover:bg-cream",
                  )}
                >
                  <span className="font-serif text-lg">{m.name}</span>
                  <span
                    className={cn(
                      "mt-1 block text-xs",
                      on ? "text-cream/65" : "text-stone",
                    )}
                  >
                    {m.note}
                  </span>
                  <span
                    className={cn(
                      "mt-2 block text-sm font-medium",
                      on ? "text-cream" : "text-sage-deep",
                    )}
                  >
                    {taka(m.rate)}/L
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Litres per delivery */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">Litres per delivery</p>
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
            </p>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <p className="text-eyebrow text-sage-deep/80">How often</p>
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
          <p className="text-eyebrow text-sage-soft/70">Your plan</p>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Milk" value={milk.name} />
            <Row label="Per delivery" value={`${litres}L`} />
            <Row
              label="Schedule"
              value={
                freq === "custom"
                  ? `${days.length} day${days.length === 1 ? "" : "s"} / week`
                  : FREQS.find((f) => f.id === freq)!.label
              }
            />
            <Row
              label="Deliveries"
              value={`~${Math.round(perMonth)} / month`}
            />
          </div>

          <div className="mt-7 border-t border-cream/15 pt-6">
            <p className="text-sm text-cream/60">Estimated monthly</p>
            <p className="mt-1 font-serif text-5xl">
              {monthly > 0 ? taka(monthly) : "—"}
            </p>
            <p className="mt-1.5 text-xs text-cream/55">
              Billed monthly · no lock-in
            </p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {["Pause or skip anytime", "Delivered before breakfast", "Cancel whenever"].map(
              (p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm">
                  <Check size={15} className="shrink-0 text-sage-soft" />
                  <span className="text-cream/85">{p}</span>
                </li>
              ),
            )}
          </ul>

          <div className="mt-8">
            <Button href="/contact" variant="light" size="lg" className="w-full">
              Start this plan
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
      <span className="text-cream/55">{label}</span>
      <span className="font-medium text-cream">{value}</span>
    </div>
  );
}
