import Link from "next/link";
import Image from "next/image";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { MilkWave } from "@/components/ui/milk-wave";

/** Underline-draws left→right on hover — the navbar's link tell, on dark. */
function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group/link relative inline-block text-cream/70 transition-colors duration-500 hover:text-cream"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sage transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:w-full" />
    </Link>
  );
}

const SHOP = [
  { label: "Products", href: "/products" },
  { label: "Subscription", href: "/subscription" },
  { label: "Bulk Supply", href: "/bulk-supply" },
];

const COMPANY = [
  { label: "Our Farms", href: "/farms" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-ink text-cream">
      <MilkWave fill="var(--color-ink)" className="-mt-px" />

      <div className="container-x relative grid gap-x-8 gap-y-12 pb-16 pt-10 md:grid-cols-12">
        {/* brand */}
        <div className="md:col-span-5">
          <Image
            src="/brand/goowali_bgremoved.webp"
            alt="GOOWALI"
            width={650}
            height={200}
            style={{ width: "auto", height: "auto" }}
            className="h-12 brightness-0 invert"
          />
          <p className="mt-6 max-w-xs font-serif text-xl leading-snug text-cream/85">
            From our farms to your family — fresh, pure, honest.
          </p>
          <p className="font-bn mt-2.5 max-w-xs text-sm leading-relaxed text-cream/55">
            আমাদের খামার থেকে আপনার পরিবারে — তাজা, খাঁটি, সৎ।
          </p>
          <p className="mt-8 text-xs leading-relaxed text-cream/40">
            A sister concern of{" "}
            <a
              href="https://agnosgroup.com"
              target="_blank"
              rel="noreferrer"
              className="text-cream/60 underline-offset-4 transition-colors duration-500 hover:text-cream hover:underline"
            >
              Agnos Dairy &amp; Livestock
            </a>
          </p>
        </div>

        {/* shop */}
        <div className="md:col-span-2 md:col-start-6">
          <h4 className="text-eyebrow text-sage-soft/60">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {SHOP.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* company */}
        <div className="md:col-span-2">
          <h4 className="text-eyebrow text-sage-soft/60">Company</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {COMPANY.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div className="md:col-span-3">
          <h4 className="text-eyebrow text-sage-soft/60">
            Contact <span className="font-bn ml-1 normal-case tracking-normal text-cream/40">· যোগাযোগ</span>
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <FooterLink href={`mailto:${SITE.email}`}>{SITE.email}</FooterLink>
            </li>
            <li>
              <FooterLink href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>
                {SITE.phone}
              </FooterLink>
            </li>
            <li className="leading-relaxed text-cream/55">{SITE.address}</li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="container-x relative flex flex-col gap-5 border-t border-cream/12 py-7 text-sm text-cream/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} GOOWALI. Pure food, honestly made.</p>
        <div className="flex items-center gap-5">
          <div className="flex gap-2.5">
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-sage/60 hover:bg-sage/15 hover:text-cream"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="whitespace-nowrap">Made in Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
