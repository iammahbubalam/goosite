import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

export function CtaBand({
  title = "Bring pure milk home.",
  subtitle = "Join thousands of Bangladeshi families who start every morning with GOOWALI.",
  primary = { label: "Explore products", href: "/products" },
  secondary = { label: "Subscribe", href: "/subscription" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-bg pb-28 pt-4 md:pb-36">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#fff7ee] via-cream to-[#f3e7d4] px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-green/10 blur-3xl" />
            <p className="relative text-eyebrow text-green">{SITE.taglineBn}</p>
            <h2 className="text-headline relative mx-auto mt-5 max-w-2xl">
              {title}
            </h2>
            <p className="relative mx-auto mt-6 max-w-md text-lg text-stone">
              {subtitle}
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <Button href={primary.href} size="lg">
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outline" size="lg">
                {secondary.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
