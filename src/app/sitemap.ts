import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE = "https://goowali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/subscription",
    "/farms",
    "/bulk-supply",
    "/about",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...products];
}
