import { ShieldCheck, Sprout, FlaskConical, Leaf, Truck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const TRUST = [
  { Icon: ShieldCheck, label: "100% Pure", bn: "১০০% খাঁটি" },
  { Icon: Sprout, label: "Farm Fresh", bn: "খামার-তাজা" },
  { Icon: FlaskConical, label: "Quality Tested", bn: "মান পরীক্ষিত" },
  { Icon: Leaf, label: "No Preservatives", bn: "প্রিজারভেটিভ মুক্ত" },
  { Icon: Truck, label: "Daily Delivery", bn: "প্রতিদিন ডেলিভারি" },
];

export function TrustBar() {
  return (
    <section className="bg-sage-soft py-16">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-eyebrow text-sage-deep/80">
            A promise in every drop
          </p>
          <p className="font-bn-serif mt-2 text-center text-lg text-sage-deep/70">
            প্রতিটি ফোঁটায় একটি প্রতিশ্রুতি
          </p>
        </Reveal>
        <Stagger className="mt-9 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST.map(({ Icon, label, bn }) => (
            <StaggerItem
              key={label}
              className="group flex cursor-default flex-col items-center gap-3 text-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sage/30 bg-white/40 text-sage-deep transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-sage/60 group-hover:bg-white/80 group-hover:shadow-[var(--shadow-soft)]">
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </span>
              <span className="text-sm font-medium tracking-tight text-night transition-colors duration-500 group-hover:text-sage-deep">
                {label}
              </span>
              <span className="font-bn -mt-1.5 text-xs text-sage-deep/70">
                {bn}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
