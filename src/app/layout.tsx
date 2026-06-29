import type { Metadata } from "next";
import { Fraunces, Inter, Tiro_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Grain } from "@/components/ui/grain";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  // default wght variable axis only — dropping opsz/SOFT shrinks the woff2,
  // which gates the hero headline's LCP.
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Bangla type — Tiro Bangla (serif) pairs with Fraunces for headlines/accents;
// Hind Siliguri (sans) is the clean Bangla body/label face. ~30% of copy is Bn.
const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: "400",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goowali.com"),
  title: {
    default: "GOOWALI — Pure Milk, Every Morning",
    template: "%s · GOOWALI",
  },
  description:
    "GOOWALI brings 100% pure milk and natural food directly from trusted Bangladeshi farms to your family. Fresh every morning.",
  keywords: [
    "pure milk Bangladesh",
    "farm fresh milk",
    "organic dairy",
    "milk subscription Dhaka",
    "GOOWALI",
  ],
  openGraph: {
    title: "GOOWALI — Pure Milk, Every Morning",
    description: "From our farms to your family. Fresh, pure, honest.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${tiroBangla.variable} ${hindSiliguri.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col bg-bg text-night antialiased"
        suppressHydrationWarning
      >
        {/* the whole site rests on a faint, fixed pool of milk */}
        <div aria-hidden className="milk-underlay" />
        <ScrollProgress />
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
          <CartDrawer />
        </CartProvider>
        <Grain />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-cream)",
              color: "var(--color-night)",
              border: "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
              borderRadius: "1rem",
            },
          }}
        />
      </body>
    </html>
  );
}
