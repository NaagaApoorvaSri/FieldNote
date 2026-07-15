import type { Wishlist, WishlistItem } from "../types/wishlist";

/**
 * Merge two distinct wishlists into one.
 *
 * Rules (see product spec §7):
 * - Union of productIds across both lists.
 * - A product present in both keeps a single entry, with `addedAt` set to
 *   the EARLIER of the two timestamps (earliest expressed interest wins).
 * - A product present in only one list carries over unchanged.
 * - Order-independent: merge(a, b) and merge(b, a) produce the same items
 *   (only `name`/`id` of the result differ, since those come from the
 *   target list — see mergeInto below).
 * - Pure function: no I/O, no storage access, fully unit-testable in
 *   isolation from React and localStorage.
 *
 * Optionally accepts the set of valid product ids currently in the catalog;
 * if provided, items pointing at a product that no longer exists are
 * silently dropped rather than surfaced as an error (spec §8, edge case 5).
 */
export function mergeWishlistItems(
  a: WishlistItem[],
  b: WishlistItem[],
  validProductIds?: ReadonlySet<string>
): WishlistItem[] {
  const byProductId = new Map<string, WishlistItem>();

  for (const item of [...a, ...b]) {
    const existing = byProductId.get(item.productId);
    if (!existing) {
      byProductId.set(item.productId, item);
      continue;
    }
    // Conflict: keep the earlier addedAt.
    const earlier = new Date(item.addedAt) < new Date(existing.addedAt) ? item : existing;
    byProductId.set(item.productId, earlier);
  }

  let merged = Array.from(byProductId.values());

  if (validProductIds) {
    merged = merged.filter((item) => validProductIds.has(item.productId));
  }

  // Stable, deterministic ordering: earliest added first.
  merged.sort((x, y) => new Date(x.addedAt).getTime() - new Date(y.addedAt).getTime());

  return merged;
}

/**
 * Merge `incoming` into `target`, returning a new Wishlist with `target`'s
 * identity (id/name) preserved. This is the "surviving wishlist" from the
 * product spec: the source is discarded by the caller after merge, only the
 * target's identity continues to exist.
 */
export function mergeInto(
  target: Wishlist,
  incoming: Wishlist,
  validProductIds?: ReadonlySet<string>
): Wishlist {
  return {
    id: target.id,
    name: target.name,
    items: mergeWishlistItems(target.items, incoming.items, validProductIds),
  };
}
