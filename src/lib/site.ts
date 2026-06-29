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
  { label: "Products", labelBn: "পণ্য", href: "/products" },
  { label: "Subscription", labelBn: "সাবস্ক্রিপশন", href: "/subscription" },
  { label: "Our Farms", labelBn: "আমাদের খামার", href: "/farms" },
  { label: "Bulk Supply", labelBn: "বাল্ক সরবরাহ", href: "/bulk-supply" },
  { label: "About", labelBn: "আমাদের কথা", href: "/about" },
  { label: "Journal", labelBn: "জার্নাল", href: "/blog" },
] as const;
