import { Sunrise, CalendarCheck, RefreshCw } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ShaderField } from "@/components/shader/shader-field";

const POINTS = [
  { Icon: Sunrise, title: "Before breakfast", text: "Delivered to your door every morning, rain or shine." },
  { Icon: CalendarCheck, title: "Your schedule", text: "Daily, alternate days, or weekdays only — you decide." },
  { Icon: RefreshCw, title: "Pause anytime", text: "Skip, pause or change your plan whenever life shifts." },
];

export function SubscriptionTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-cream md:py-32">
      <ShaderField
        colors={["#21539c", "#153b7a", "#0f2c5c", "#1d4a8f"]}
        speed={0.2}
        distortion={0.9}
        swirl={0.8}
        className="opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-ink/45"
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cream/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-green/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow className="text-green-soft">Milk subscription</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6 text-cream"
            text="Wake up to fresh milk. Every single day."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
              Join the GOOWALI family and let mornings take care of themselves.
              One subscription, one less thing to worry about.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <Button href="/subscription" variant="light" size="lg">
                Start your subscription
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {POINTS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex items-start gap-5 rounded-3xl border border-cream/15 bg-cream/5 p-6 backdrop-blur">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 text-green-soft">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-cream">{title}</h3>
                  <p className="mt-1.5 text-cream/70">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
