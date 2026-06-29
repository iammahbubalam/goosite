export type ProductCategory = "milk" | "dairy" | "organic";

export type Product = {
  slug: string;
  name: string;
  nameBn: string;
  category: ProductCategory;
  tagline: string;
  story: string;
  description: string;
  price: string;
  unit: string;
  benefits: string[];
  nutrition?: { label: string; value: string }[];
  source: string;
  process: string;
  hero: boolean;
};

export const CATEGORIES: {
  id: ProductCategory;
  label: string;
  labelBn: string;
  blurb: string;
}[] = [
  {
    id: "milk",
    label: "Milk",
    labelBn: "দুধ",
    blurb: "The hero. Collected at dawn, with you by breakfast.",
  },
  {
    id: "dairy",
    label: "Dairy",
    labelBn: "দুগ্ধজাত",
    blurb: "Slow-made the traditional way, from the same pure milk.",
  },
  {
    id: "organic",
    label: "Organic Pantry",
    labelBn: "অর্গানিক প্যান্ট্রি",
    blurb: "Honest staples, sourced from farmers we know by name.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "raw-milk",
    name: "Raw Milk",
    nameBn: "কাঁচা দুধ",
    category: "milk",
    tagline: "Milk as nature made it.",
    story:
      "Untouched and unaltered — chilled within the hour of milking, never heated, never thinned.",
    description:
      "Whole, single-source raw milk from grass-fed cows. Naturally rich, with the cream rising to the top the way real milk should.",
    price: "৳120",
    unit: "per litre",
    benefits: [
      "Single-source, never blended",
      "Naturally creamy top layer",
      "Zero preservatives, zero water",
      "Chilled within 60 minutes",
    ],
    nutrition: [
      { label: "Energy", value: "67 kcal" },
      { label: "Protein", value: "3.4 g" },
      { label: "Fat", value: "4.0 g" },
      { label: "Calcium", value: "120 mg" },
    ],
    source: "Grass-fed herds at our partner farms in Sirajganj & Pabna.",
    process: "Milked at dawn → filtered → flash-chilled → sealed → delivered.",
    hero: true,
  },
  {
    slug: "pasteurized-milk",
    name: "Pasteurized Milk",
    nameBn: "পাস্তুরিত দুধ",
    category: "milk",
    tagline: "Pure, gently protected.",
    story:
      "All the freshness of raw milk, gently pasteurised to keep your family safe — and nothing more.",
    description:
      "Carefully heat-treated to remove risk while preserving taste and nutrition. The everyday choice for young families.",
    price: "৳110",
    unit: "per litre",
    benefits: [
      "Gentle low-temperature pasteurisation",
      "Lab-tested every single batch",
      "Family-safe, fridge-ready",
      "No powder, no reconstitution",
    ],
    nutrition: [
      { label: "Energy", value: "64 kcal" },
      { label: "Protein", value: "3.3 g" },
      { label: "Fat", value: "3.6 g" },
      { label: "Calcium", value: "118 mg" },
    ],
    source: "Collected from the same trusted farms, processed within hours.",
    process: "Collect → test → pasteurise → cool → bottle → deliver.",
    hero: true,
  },
  {
    slug: "uht-milk",
    name: "UHT Milk",
    nameBn: "ইউএইচটি দুধ",
    category: "milk",
    tagline: "Purity that travels.",
    story:
      "Long-life milk for busy mornings and far corners — sealed at its freshest, ready when you are.",
    description:
      "Ultra-heat-treated and aseptically packed for a long shelf life without preservatives. Convenience without compromise.",
    price: "৳130",
    unit: "per litre",
    benefits: [
      "Stays fresh unopened for months",
      "No refrigeration until opened",
      "Sealed at peak freshness",
      "Perfect for travel & stockpiling",
    ],
    nutrition: [
      { label: "Energy", value: "65 kcal" },
      { label: "Protein", value: "3.3 g" },
      { label: "Fat", value: "3.6 g" },
      { label: "Calcium", value: "120 mg" },
    ],
    source: "Same farms, same standards — packed for the long road.",
    process: "Collect → test → ultra-heat → aseptic pack → deliver.",
    hero: true,
  },
  {
    slug: "doi",
    name: "Doi",
    nameBn: "দই",
    category: "dairy",
    tagline: "Set slow, the old way.",
    story:
      "Traditional Bengali yoghurt, set in clay and left to thicken naturally overnight.",
    description:
      "Creamy, lightly sweet doi made from our whole milk and live cultures. A morning ritual passed down generations.",
    price: "৳180",
    unit: "500 g",
    benefits: [
      "Live, gut-friendly cultures",
      "Set in traditional clay pots",
      "No artificial thickeners",
      "Naturally creamy",
    ],
    source: "Made daily from GOOWALI whole milk.",
    process: "Fresh milk → cultured → clay-set → chilled.",
    hero: false,
  },
  {
    slug: "matha",
    name: "Matha",
    nameBn: "মাঠা",
    category: "dairy",
    tagline: "Cool, light, refreshing.",
    story: "A spiced buttermilk that has soothed Bengali afternoons forever.",
    description:
      "Gently churned buttermilk, lightly salted and spiced. Refreshing, probiotic, and easy on the stomach.",
    price: "৳90",
    unit: "per litre",
    benefits: [
      "Natural probiotics",
      "Light and hydrating",
      "Traditionally spiced",
      "No additives",
    ],
    source: "Churned from cultured GOOWALI milk.",
    process: "Cultured milk → churned → spiced → chilled.",
    hero: false,
  },
  {
    slug: "cheese",
    name: "Cheese",
    nameBn: "পনির",
    category: "dairy",
    tagline: "Crafted, not manufactured.",
    story: "Small-batch cheese, aged with patience instead of shortcuts.",
    description:
      "Hand-crafted cheese from pure GOOWALI milk. Clean, full flavour with no fillers or emulsifiers.",
    price: "৳450",
    unit: "250 g",
    benefits: [
      "Small-batch crafted",
      "No fillers or emulsifiers",
      "High in protein & calcium",
      "Pure milk base",
    ],
    source: "Made from single-source whole milk.",
    process: "Milk → cultured → pressed → aged.",
    hero: false,
  },
  {
    slug: "ghee",
    name: "Ghee",
    nameBn: "ঘি",
    category: "dairy",
    tagline: "Golden, honest, pure.",
    story:
      "Slow-simmered clarified butter with a fragrance that fills the kitchen.",
    description:
      "Pure cow ghee, hand-churned and slow-cooked to a deep golden clarity. Nothing added, nothing hidden.",
    price: "৳950",
    unit: "500 ml",
    benefits: [
      "Hand-churned from pure cream",
      "Slow-cooked, deep aroma",
      "No vegetable oils or blends",
      "Rich in healthy fats",
    ],
    source: "Churned from the cream of GOOWALI milk.",
    process: "Cream → butter → slow-simmered → strained.",
    hero: false,
  },
  {
    slug: "mustard-oil",
    name: "Mustard Oil",
    nameBn: "সরিষার তেল",
    category: "organic",
    tagline: "Cold-pressed, full-strength.",
    story: "The sharp, golden oil at the heart of every Bengali kitchen.",
    description:
      "Cold-pressed mustard oil from organically grown seed. Pungent, pure, and bottled at full strength.",
    price: "৳320",
    unit: "per litre",
    benefits: [
      "Cold-pressed, never refined",
      "Organically grown seed",
      "Full natural pungency",
      "No blending",
    ],
    source: "Pressed from seed grown by partner farmers.",
    process: "Seed → cold-pressed → filtered → bottled.",
    hero: false,
  },
  {
    slug: "chia-seeds",
    name: "Chia Seeds",
    nameBn: "চিয়া সিড",
    category: "organic",
    tagline: "Tiny seeds, honest source.",
    story: "Clean, sun-dried chia for the families building better mornings.",
    description:
      "Premium organic chia seeds, cleaned and sun-dried. A simple, nutrient-dense addition to your routine.",
    price: "৳420",
    unit: "500 g",
    benefits: [
      "Rich in omega-3 & fibre",
      "Sun-dried, cleaned by hand",
      "Organically sourced",
      "Plant-based protein",
    ],
    source: "Selected from trusted organic suppliers.",
    process: "Harvest → clean → sun-dry → pack.",
    hero: false,
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    nameBn: "হলুদ গুঁড়া",
    category: "organic",
    tagline: "Earth-bright, additive-free.",
    story: "Stone-ground turmeric with the deep colour of real roots.",
    description:
      "Pure turmeric, sun-dried and stone-ground. No colour, no starch — just root, the way it should be.",
    price: "৳160",
    unit: "250 g",
    benefits: [
      "Single-origin roots",
      "No added colour or starch",
      "Stone-ground",
      "High natural curcumin",
    ],
    source: "Roots grown by partner spice farmers.",
    process: "Roots → boiled → sun-dried → stone-ground.",
    hero: false,
  },
  {
    slug: "chili-powder",
    name: "Chili Powder",
    nameBn: "মরিচ গুঁড়া",
    category: "organic",
    tagline: "Pure heat, nothing else.",
    story: "Sun-dried chillies, ground fresh — bright, clean, and honest.",
    description:
      "Whole sun-dried chillies ground to a fine, vivid powder. No fillers, no artificial colour.",
    price: "৳150",
    unit: "250 g",
    benefits: [
      "Whole-chilli ground",
      "No fillers or dyes",
      "Vivid natural colour",
      "Sun-dried",
    ],
    source: "Chillies grown by partner farmers.",
    process: "Chillies → sun-dried → ground → sieved.",
    hero: false,
  },
  {
    slug: "organic-spices",
    name: "Organic Spices",
    nameBn: "অর্গানিক মসলা",
    category: "organic",
    tagline: "A pantry you can trust.",
    story:
      "A curated set of whole and ground spices, sourced with the same honesty as our milk.",
    description:
      "Cumin, coriander, garam masala and more — sourced clean, ground fresh, packed small.",
    price: "from ৳140",
    unit: "assorted",
    benefits: [
      "Sourced from known farmers",
      "Ground in small batches",
      "No anti-caking agents",
      "Sealed for freshness",
    ],
    source: "A network of partner spice farmers.",
    process: "Source → clean → grind → seal.",
    hero: false,
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsByCategory = (cat: ProductCategory) =>
  PRODUCTS.filter((p) => p.category === cat);
