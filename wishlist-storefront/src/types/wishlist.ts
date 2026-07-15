/**
 * A wishlist entry references a product by id and records when it was
 * added. Wishlists never store a copy of product data — prices/names are
 * always looked up live against the catalog, so a wishlist can't go stale.
 */
export interface WishlistItem {
  productId: string;
  /** ISO 8601 timestamp. The natural tiebreaker used during merge. */
  addedAt: string;
}

/**
 * A named, addressable wishlist. V1 supports exactly one "mine" list plus
 * any number of importable named lists (see WishlistSnapshot), which is what
 * makes the merge feature meaningful without needing real multi-user auth.
 */
export interface Wishlist {
  id: string;
  /** Human-readable label, e.g. "My Wishlist" or an imported list's name. */
  name: string;
  items: WishlistItem[];
}

/**
 * A portable, self-contained representation of a wishlist used for the
 * "merge two distinct wishlists" feature: exported from one browser/session
 * as JSON, then pasted/imported into another to merge with the current list.
 */
export interface WishlistSnapshot {
  id: string;
  name: string;
  items: WishlistItem[];
  exportedAt: string;
}
