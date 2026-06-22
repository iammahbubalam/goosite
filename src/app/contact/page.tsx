import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { Eyebrow } from "@/components/ui/section";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Order milk, start a subscription, or arrange bulk supply. The GOOWALI family is here to help.",
};

const DETAILS = [
  { Icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phone}` },
  { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: MapPin, label: "Visit", value: SITE.address },
  { Icon: Clock, label: "Hours", value: "Every day · 7am – 9pm" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        mediaLabel="From our family to yours."
        title={
          <>
            Let&rsquo;s bring milk
            <br />
            <span className="italic text-ink">to your door.</span>
          </>
        }
        intro="Whether it's a single litre for your family or a daily supply for your kitchen, we'd love to help."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Reach us</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-5">
                A real family, ready to talk.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-5">
              {DETAILS.map(({ Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-start gap-4 rounded-3xl border hairline bg-bg p-6 transition-colors hover:bg-cream">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-eyebrow text-stone/70">{label}</p>
                      <p className="mt-1 text-lg text-night">{value}</p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={label} delay={0.06}>
                    {href ? <a href={href}>{inner}</a> : inner}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
