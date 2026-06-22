export const SITE = {
  name: "GOOWALI",
  tagline: "Pure milk. Every morning.",
  taglineBn: "গরুর ১০০% খাঁটি দুধ",
  email: "hello@goowali.com",
  phone: "+880 1700-000000",
  address: "Gulshan, Dhaka, Bangladesh",
  social: {
    instagram: "https://instagram.com/goowali",
    facebook: "https://facebook.com/goowali",
    youtube: "https://youtube.com/@goowali",
  },
} as const;

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Subscription", href: "/subscription" },
  { label: "Our Farms", href: "/farms" },
  { label: "Bulk Supply", href: "/bulk-supply" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
] as const;
