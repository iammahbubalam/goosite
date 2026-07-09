import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience Zones",
  description:
    "Taste the purity firsthand. Walk into our Experience Zones in Gulshan and Mirpur to pick up fresh milk and organic staples.",
};

export default function ExperienceZonesPage() {
  return (
    <>
      <PageHero
        milk="gold"
        eyebrow="Visit Us"
        title={
          <>
            Experience GOOWALI
            <br />
            <span className="italic text-ink">in person.</span>
          </>
        }
        intro="Taste the purity firsthand. Walk into our Experience Zones to pick up fresh milk, organic staples, and see what honest food really looks like."
      />

      <section className="bg-cream py-16 lg:py-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <MaskReveal className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
            <img
              src="/brand/exz/mavenue.png"
              alt="Gulshan Experience Zone"
              className="w-full h-auto"
            />
          </MaskReveal>
          <div>
            <Reveal>
              <Eyebrow>Gulshan</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-4 md:mt-5">Madani Avenue Outlet</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 md:mt-7 space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed text-stone">
                <p>
                  Our flagship experience zone. Come in for a fresh taste, chat with our team about our farm, and pick up your daily staples right off the shelf.
                </p>
                
                <div className="space-y-4 pt-5 md:pt-6 border-t hairline">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-green">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <p className="font-medium text-night">Address</p>
                      <p>696 Madani Avenue, Gulshan, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-green">
                      <Phone size={20} />
                    </span>
                    <div>
                      <p className="font-medium text-night">Phone</p>
                      <a href="tel:01836690842" className="hover:text-ink transition-colors">01836690842</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg py-16 lg:py-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow>Mirpur</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline mt-4 md:mt-5">Mirpur 11 Outlet</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 md:mt-7 space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed text-stone">
                <p>
                  Conveniently located for our customers in the Mirpur area. We bring the exact same farm-fresh standards and daily deliveries straight to your neighborhood.
                </p>
                
                <div className="space-y-4 pt-5 md:pt-6 border-t hairline">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-green">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <p className="font-medium text-night">Address</p>
                      <p>Mirpur 11, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-green">
                      <Phone size={20} />
                    </span>
                    <div>
                      <p className="font-medium text-night">Phone</p>
                      <a href="tel:01645340417" className="hover:text-ink transition-colors">01645340417</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <MaskReveal className="order-1 lg:order-2 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
            <img
              src="/brand/exz/mirpurelev.png"
              alt="Mirpur Experience Zone"
              className="w-full h-auto"
            />
          </MaskReveal>
        </div>
      </section>

      <CtaBand
        title="Not near a zone?"
        subtitle="Subscribe for daily home delivery, straight from the farm to your door."
        primary={{ label: "Subscribe", href: "/subscription" }}
        secondary={{ label: "Shop Products", href: "/products" }}
      />
    </>
  );
}
