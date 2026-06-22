import { ShieldCheck, Sprout, FlaskConical, Leaf, Truck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const TRUST = [
  { Icon: ShieldCheck, label: "100% Pure" },
  { Icon: Sprout, label: "Farm Fresh" },
  { Icon: FlaskConical, label: "Quality Tested" },
  { Icon: Leaf, label: "No Preservatives" },
  { Icon: Truck, label: "Daily Delivery" },
];

export function TrustBar() {
  return (
    <section className="bg-cream py-14">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-eyebrow text-stone/70">
            A promise in every drop
          </p>
        </Reveal>
        <Stagger className="mt-9 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST.map(({ Icon, label }) => (
            <StaggerItem
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border hairline text-ink">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <span className="text-sm font-medium tracking-tight text-night">
                {label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
