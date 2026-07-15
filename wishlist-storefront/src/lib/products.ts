import { products } from "../data/products";
import type { Product } from "../types/product";

const byId = new Map(products.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return byId.get(id);
}

export function getAllProductIds(): Set<string> {
  return new Set(products.map((p) => p.id));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
