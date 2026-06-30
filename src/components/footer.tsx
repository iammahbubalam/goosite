import Link from "next/link";
import Image from "next/image";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { NAV_LINKS, SITE } from "@/lib/site";
import { MilkWave } from "@/components/ui/milk-wave";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ShaderField } from "@/components/shader/shader-field";

/** Underline-draws left→right on hover — the navbar's link tell, on dark. */
function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group/link relative inline-block text-cream/80 transition-colors duration-500 hover:text-cream"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sage transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:w-full" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-ink text-cream">
      <MilkWave fill="var(--color-ink)" className="-mt-px" />

      {/* a faint pool of milk resting under the closing chord */}
      <ShaderField
        colors={["#153b7a", "#2a4f8f", "#41552f", "#cdd9ec", "#fff9f2"]}
        speed={0.22}
        distortion={0.9}
        swirl={0.7}
        fallback="radial-gradient(120% 80% at 80% 0%, rgba(205,217,236,0.18), transparent 55%)"
        className="opacity-[0.20]"
      />

      <div className="container-x relative grid gap-14 pb-12 pt-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/brand/goowali_bgremoved.webp"
            alt="GOOWALI"
            width={150}
            height={56}
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-cream/90">
            From our farms to your family. Fresh, pure, honest — every morning.
          </p>
          <p className="font-bn-serif mt-3 max-w-sm text-xl leading-snug text-cream/75">
            আমাদের খামার থেকে আপনার পরিবারে — তাজা, খাঁটি, সৎ।
          </p>
          <p className="font-bn mt-4 text-sm text-cream/60">{SITE.taglineBn}</p>
          <p className="mt-6 text-sm text-cream/55">
            A sister concern of{" "}
            <a
              href="https://agnosgroup.com"
              target="_blank"
              rel="noreferrer"
              className="group/agnos relative font-medium text-cream/80 transition-colors duration-500 hover:text-cream"
            >
              Agnos Dairy &amp; Livestock
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sage transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/agnos:w-full" />
            </a>
          </p>
          <p className="font-bn mt-1 text-sm text-cream/45">
            অ্যাগনস ডেইরি অ্যান্ড লাইভস্টক-এর একটি সহযোগী প্রতিষ্ঠান
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-eyebrow inline-flex items-center gap-2 text-sage-soft/70">
            <span className="h-px w-5 bg-sage/60" />
            Explore <span className="font-bn ml-1 normal-case tracking-normal text-cream/45">· ঘুরে দেখুন</span>
          </h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-eyebrow inline-flex items-center gap-2 text-sage-soft/70">
            <span className="h-px w-5 bg-sage/60" />
            Get in touch <span className="font-bn ml-1 normal-case tracking-normal text-cream/45">· যোগাযোগ</span>
          </h4>
          <ul className="mt-5 space-y-3 text-cream/80">
            <li>
              <FooterLink href={`mailto:${SITE.email}`}>
                {SITE.email}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={`tel:${SITE.phone}`}>{SITE.phone}</FooterLink>
            </li>
            <li className="text-cream/70">{SITE.address}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: InstagramLogo, href: SITE.social.instagram, label: "Instagram" },
              { Icon: FacebookLogo, href: SITE.social.facebook, label: "Facebook" },
              { Icon: YoutubeLogo, href: SITE.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-sage/60 hover:bg-sage/15 hover:text-cream"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* grand wordmark — wipes up on scroll */}
      <MaskReveal rounded="rounded-none" className="relative select-none px-4 pt-10">
        <p
          aria-hidden
          className="text-center font-serif text-[20vw] font-light leading-[0.8] tracking-tight text-cream/10"
        >
          GOOWALI
        </p>
      </MaskReveal>

      <div className="container-x relative flex flex-col gap-3 border-t border-cream/15 py-7 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} GOOWALI. Pure food, honestly made.</p>
        <p>Made in Bangladesh 🇧🇩</p>
      </div>
    </footer>
  );
}
