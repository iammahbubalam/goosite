import Link from "next/link";
import Image from "next/image";
import { Camera, AtSign, Play } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { MilkWave } from "@/components/ui/milk-wave";

export function Footer() {
  return (
    <footer className="relative mt-auto bg-ink text-cream">
      <MilkWave fill="var(--color-ink)" className="-mt-px" />
      <div className="container-x grid gap-14 pb-12 pt-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/brand/goowali_bgremoved.png"
            alt="GOOWALI"
            width={150}
            height={56}
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-cream/90">
            From our farms to your family. Fresh, pure, honest — every morning.
          </p>
          <p className="mt-4 text-sm text-cream/60">{SITE.taglineBn}</p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-eyebrow text-cream/50">Explore</h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-eyebrow text-cream/50">Get in touch</h4>
          <ul className="mt-5 space-y-3 text-cream/80">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-cream">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-cream">
                {SITE.phone}
              </a>
            </li>
            <li>{SITE.address}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Camera, href: SITE.social.instagram, label: "Instagram" },
              { Icon: AtSign, href: SITE.social.facebook, label: "Facebook" },
              { Icon: Play, href: SITE.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-cream/15 py-7 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} GOOWALI. Pure food, honestly made.</p>
        <p>Made in Bangladesh 🇧🇩</p>
      </div>
    </footer>
  );
}
