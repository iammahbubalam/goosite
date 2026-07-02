import { MILK_RATE_PER_L } from "./products";

/**
 * Subscription catalogue — raw milk only (GOOWALI does not subscribe
 * pasteurised/UHT). Single source of truth for the plan selector, the custom
 * builder and the checkout summary.
 */

export type SubPlan = {
  id: string;
  name: string;
  nameBn: string;
  /** Litres per delivery. */
  litres: number;
  /** Deliveries per month. */
  deliveries: number;
  price: string;
  cadence: string;
  desc: string;
  perks: string[];
  featured: boolean;
};

export const SUB_PLANS: SubPlan[] = [
  {
    id: "daily",
    name: "Daily Fresh",
    nameBn: "প্রতিদিন তাজা",
    litres: 1,
    deliveries: 30,
    price: "৳3,300",
    cadence: "/ month",
    desc: "1 litre of raw milk, delivered every single morning.",
    perks: ["Fresh daily delivery", "Pause or skip anytime", "Priority support"],
    featured: false,
  },
  {
    id: "family",
    name: "Family Morning",
    nameBn: "পরিবারের সকাল",
    litres: 2,
    deliveries: 30,
    price: "৳5,900",
    cadence: "/ month",
    desc: "2 litres of raw milk daily — for households that run on milk.",
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
    nameBn: "একদিন পর পর",
    litres: 1,
    deliveries: 15,
    price: "৳1,800",
    cadence: "/ month",
    desc: "1 litre of raw milk, every other morning. Lighter routines.",
    perks: ["Delivery every 2nd day", "Flexible schedule", "Pause anytime"],
    featured: false,
  },
];

export const getSubPlan = (id: string) => SUB_PLANS.find((p) => p.id === id);

export const FREQS = [
  { id: "daily", label: "Daily", labelBn: "প্রতিদিন", per: 30 },
  { id: "weekdays", label: "Weekdays", labelBn: "কর্মদিবস", per: 22 },
  { id: "alternate", label: "Alternate days", labelBn: "একদিন পর পর", per: 15 },
  { id: "custom", label: "Custom days", labelBn: "নিজের পছন্দে", per: null },
] as const;

export type FreqId = (typeof FREQS)[number]["id"];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const deliveriesPerMonth = (freq: FreqId, dayCount: number) =>
  freq === "custom"
    ? dayCount * 4.33
    : (FREQS.find((f) => f.id === freq)!.per ?? 0);

/** Estimated monthly cost for a custom raw-milk plan, rounded to ৳10. */
export const estimateMonthly = (litres: number, freq: FreqId, dayCount: number) =>
  Math.round((litres * MILK_RATE_PER_L * deliveriesPerMonth(freq, dayCount)) / 10) *
  10;

export const taka = (n: number) => `৳${Math.round(n).toLocaleString("en-US")}`;
