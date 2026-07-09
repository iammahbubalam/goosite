export const SITE = {
  name: "GOOWALI",
  tagline: "Pure milk. Every morning.",
  taglineBn: "গরুর ১০০% খাঁটি দুধ",
  email: "milk@goowali.com",
  phone: "01836690842",
  /** Digits-only form of `phone` for wa.me / tel links. */
  whatsapp: "8801836690842",
  address: "696 Madani Avenue, Gulshan, Dhaka",
  experienceZones: [
    {
      name: "Gulshan Outlet",
      phone: "01836690842"
    },
    {
      name: "Mirpur Outlet",
      phone: "01645340417"
    }
  ],
  social: {
    instagram: "https://instagram.com/goowali",
    facebook: "https://facebook.com/goowali",
    youtube: "https://youtube.com/@goowali",
  },
} as const;

export const NAV_LINKS = [
  { label: "Products", labelBn: "পণ্য", href: "/products" },
  { label: "Subscription", labelBn: "সাবস্ক্রিপশন", href: "/subscription" },
  { label: "Our Farm", labelBn: "আমাদের খামার", href: "/farms" },
  { label: "Bulk Supply", labelBn: "বাল্ক সরবরাহ", href: "/bulk-supply" },
  { label: "About", labelBn: "আমাদের কথা", href: "/about" },
  { label: "Journal", labelBn: "জার্নাল", href: "/blog" },
] as const;
