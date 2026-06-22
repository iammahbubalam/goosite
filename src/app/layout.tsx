import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-night antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
