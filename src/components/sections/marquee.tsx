const WORDS = [
  "Fresh",
  "Pure",
  "Morning",
  "Family",
  "Trust",
  "Nature",
  "Farm",
  "Honest",
  "Real",
  "Care",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-serif text-5xl italic text-night/80 md:text-7xl">
            {w}
          </span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-green/70" />
        </span>
      ))}
    </div>
  );
}

/**
 * Slow editorial marquee of the brand's emotional vocabulary. One per page —
 * a breath between sections, not decoration.
 */
export function Marquee() {
  return (
    <section className="overflow-hidden border-y hairline bg-cream py-12 md:py-16">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
      <span className="sr-only">
        Fresh, pure, from our farms to your family.
      </span>
    </section>
  );
}
