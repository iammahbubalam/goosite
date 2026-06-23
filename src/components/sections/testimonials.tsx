import { Quote } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const ITEMS = [
  {
    quote:
      "I stopped worrying about what my children drink. The milk tastes like the village milk I grew up on.",
    name: "Nusrat Jahan",
    role: "Mother of two · Dhanmondi",
    photo: "testimonial-mother",
  },
  {
    quote:
      "It arrives before I wake up. Pure, cold, and exactly the same every morning. That consistency is rare.",
    name: "Imran Kabir",
    role: "Subscriber · Uttara",
    photo: "testimonial-subscriber",
  },
  {
    quote:
      "You can taste the difference in our desserts. GOOWALI milk is the one ingredient we never compromise on.",
    name: "Farhana Rahman",
    role: "Pastry chef · Gulshan",
    photo: "testimonial-chef",
  },
];

export function Testimonials() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>From our family</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="text-headline mt-6"
            text="Trust, one morning at a time."
          />
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-[2rem] border hairline bg-cream p-8">
                <Quote className="text-sage" size={28} strokeWidth={1.5} />
                <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-night">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <Photo
                    src={getPhoto(t.photo)?.src}
                    blurDataURL={getPhoto(t.photo)?.lqip}
                    alt={t.name}
                    tone="milk"
                    rounded="rounded-full"
                    sizes="48px"
                    className="h-12 w-12 shrink-0 ring-1 ring-inset ring-ink/10"
                  />
                  <div>
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-sm text-stone">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
