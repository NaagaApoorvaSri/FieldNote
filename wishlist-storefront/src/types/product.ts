/**
 * A single catalog item. The catalog is static/seeded for V1 — there is no
 * create/update/delete UI, so this type only needs to describe read shape.
 */
export interface Product {
  /** Stable, unique, URL-safe identifier (slug). Used as the wishlist FK. */
  id: string;
  name: string;
  /** Price in whole cents to avoid floating point rounding issues. */
  priceCents: number;
  currency: "USD";
  /** Short line shown on the card and detail view. */
  description: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}
