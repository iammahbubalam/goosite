import { Quote } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { getPhoto } from "@/lib/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const ITEMS = [
  {
    quoteBn:
      "বাচ্চারা কী খাচ্ছে তা নিয়ে আর দুশ্চিন্তা করি না। দুধটা ঠিক যেন গ্রামের সেই দুধ, যা খেয়ে আমি বড় হয়েছি।",
    quote:
      "I stopped worrying about what my children drink — it tastes like the village milk I grew up on.",
    name: "Nusrat Jahan",
    role: "Mother of two · Dhanmondi",
    photo: "testimonial-mother",
  },
  {
    quoteBn:
      "আমি ঘুম থেকে ওঠার আগেই দুধ পৌঁছে যায়। খাঁটি, ঠান্ডা, আর প্রতিদিন ঠিক একই রকম — এই ধারাবাহিকতা সত্যিই বিরল।",
    quote:
      "It arrives before I wake up. Pure, cold, and exactly the same every morning.",
    name: "Imran Kabir",
    role: "Subscriber · Uttara",
    photo: "testimonial-subscriber",
  },
  {
    quoteBn:
      "আমাদের মিষ্টিতে পার্থক্যটা স্বাদেই বোঝা যায়। GOOWALI-র দুধ এমন এক উপকরণ, যাতে আমরা কখনো আপস করি না।",
    quote:
      "You can taste the difference in our desserts — GOOWALI milk we never compromise on.",
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
          <Reveal delay={0.08}>
            <p className="font-bn-serif mt-3 text-2xl text-ink/85">
              বিশ্বাস, এক একটি সকালে।
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-[2rem] border hairline bg-cream p-8">
                <Quote className="text-sage" size={28} strokeWidth={1.5} />
                <blockquote className="mt-5 flex-1">
                  <p className="font-bn-serif text-xl leading-relaxed text-night">
                    {t.quoteBn}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {t.quote}
                  </p>
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
