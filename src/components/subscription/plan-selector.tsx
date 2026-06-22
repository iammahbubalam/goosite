"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "daily",
    name: "Daily Fresh",
    price: "৳3,300",
    cadence: "/ month",
    desc: "1 litre, delivered every single morning.",
    perks: ["Fresh daily delivery", "Pause or skip anytime", "Priority support"],
    featured: false,
  },
  {
    id: "family",
    name: "Family Morning",
    price: "৳5,900",
    cadence: "/ month",
    desc: "2 litres daily — for households that run on milk.",
    perks: [
      "2L every morning",
      "Free doi every week",
      "Pause or skip anytime",
      "Dedicated delivery slot",
    ],
    featured: true,
  },
  {
    id: "alternate",
    name: "Alternate Days",
    price: "৳1,800",
    cadence: "/ month",
    desc: "1 litre, every other morning. Lighter routines.",
    perks: ["Delivery every 2nd day", "Flexible schedule", "Pause anytime"],
    featured: false,
  },
];

export function PlanSelector() {
  const [selected, setSelected] = useState("family");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map((plan) => {
        const active = selected === plan.id;
        return (
          <motion.button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative flex flex-col rounded-[2rem] border p-8 text-left transition-colors duration-500",
              active
                ? "border-ink bg-ink text-cream shadow-[var(--shadow-lift)]"
                : "hairline bg-bg text-night hover:bg-cream",
            )}
          >
            {plan.featured && (
              <span
                className={cn(
                  "absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-medium",
                  active ? "bg-green text-cream" : "bg-green/15 text-green",
                )}
              >
                Most loved
              </span>
            )}
            <h3
              className={cn(
                "font-serif text-2xl",
                active ? "text-cream" : "text-night",
              )}
            >
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm",
                active ? "text-cream/70" : "text-stone",
              )}
            >
              {plan.desc}
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="font-serif text-4xl">{plan.price}</span>
              <span
                className={cn(
                  "pb-1.5 text-sm",
                  active ? "text-cream/60" : "text-stone",
                )}
              >
                {plan.cadence}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm">
                  <Check
                    size={16}
                    className={active ? "text-green-soft" : "text-green"}
                  />
                  <span className={active ? "text-cream/85" : "text-night"}>
                    {perk}
                  </span>
                </li>
              ))}
            </ul>
            <span
              className={cn(
                "mt-7 inline-flex items-center justify-center rounded-full py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-cream text-ink"
                  : "border hairline text-ink",
              )}
            >
              {active ? "Selected" : "Choose plan"}
            </span>
          </motion.button>
        );
      })}
      <div className="md:col-span-3 mt-2 flex flex-col items-center gap-3 text-center">
        <Button href="/contact" size="lg">
          Continue with this plan
        </Button>
        <p className="text-sm text-stone">
          No lock-in. Pause, skip or cancel anytime.
        </p>
      </div>
    </div>
  );
}
