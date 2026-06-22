import type { Metadata } from "next";
import { Sunrise, SlidersHorizontal, HandHeart } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PlanSelector } from "@/components/subscription/plan-selector";
import { Eyebrow } from "@/components/ui/section";
import { Faq } from "@/components/sections/faq";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Milk Subscription",
  description:
    "Fresh milk delivered to your door every morning. Choose a plan, pause anytime, and let your mornings take care of themselves.",
};

const STEPS = [
  {
    Icon: SlidersHorizontal,
    title: "Choose your plan",
    text: "Daily, alternate days, or a family pack. Pick what fits your home.",
  },
  {
    Icon: Sunrise,
    title: "We deliver at dawn",
    text: "Cold, fresh milk arrives at your door before you wake.",
  },
  {
    Icon: HandHeart,
    title: "Stay in control",
    text: "Pause, skip or change anytime — no calls, no penalties.",
  },
];

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SubscriptionPage() {
  return (
    <>
      <PageHero
        eyebrow="Milk subscription"
        mediaLabel="Fresh at your door, every dawn."
        title={
          <>
            Mornings,
            <br />
            <span className="italic text-ink">handled.</span>
          </>
        }
        intro="Join the GOOWALI family and wake up to fresh milk at your door — every morning, exactly as you like it."
      />

      {/* How it works */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map(({ Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <div className="rounded-[2rem] border hairline bg-bg p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-eyebrow text-green/70">
                      0{i + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-night">
                    {title}
                  </h3>
                  <p className="mt-2 text-stone">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Schedule visual */}
      <section className="bg-bg py-24 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Your week</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                Delivery that fits your rhythm.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
                Set the days that suit you. Going away? Pause with a tap and
                resume when you&rsquo;re back. Your milk, your schedule.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border hairline bg-cream p-8">
              <div className="grid grid-cols-7 gap-2.5">
                {WEEK.map((d, i) => {
                  const on = i !== 6;
                  return (
                    <div key={d} className="text-center">
                      <p className="text-xs text-stone">{d}</p>
                      <div
                        className={`mt-2 flex aspect-square items-center justify-center rounded-2xl text-sm font-medium ${
                          on
                            ? "bg-ink text-cream"
                            : "border hairline text-stone"
                        }`}
                      >
                        {on ? "1L" : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 text-sm text-stone">
                Example: daily delivery, Sundays off.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Reveal>
              <Eyebrow>Choose your plan</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                One subscription. One less worry.
              </h2>
            </Reveal>
          </div>
          <PlanSelector />
        </div>
      </section>

      <Faq
        eyebrow="Subscription FAQ"
        heading="The little details, sorted."
      />
    </>
  );
}
