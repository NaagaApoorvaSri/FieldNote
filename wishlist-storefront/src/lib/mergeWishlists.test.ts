import { describe, it, expect } from "vitest";
import { mergeWishlistItems } from "./mergeWishlists";
import type { WishlistItem } from "../types/wishlist";

const item = (productId: string, addedAt: string): WishlistItem => ({ productId, addedAt });

describe("mergeWishlistItems", () => {
  it("self-merge is a no-op", () => {
    const a = [item("p1", "2026-01-01T00:00:00Z"), item("p2", "2026-01-02T00:00:00Z")];
    expect(mergeWishlistItems(a, a)).toHaveLength(2);
  });

  it("merging with an empty list returns the non-empty list's items", () => {
    const a = [item("p1", "2026-01-01T00:00:00Z")];
    expect(mergeWishlistItems(a, [])).toEqual(a);
    expect(mergeWishlistItems([], a)).toEqual(a);
  });

  it("both empty returns empty", () => {
    expect(mergeWishlistItems([], [])).toEqual([]);
  });

  it("disjoint lists produce a full union", () => {
    const a = [item("p1", "2026-01-01T00:00:00Z")];
    const b = [item("p2", "2026-01-02T00:00:00Z")];
    const result = mergeWishlistItems(a, b);
    expect(result.map((i) => i.productId).sort()).toEqual(["p1", "p2"]);
  });

  it("overlapping product keeps the earlier addedAt", () => {
    const a = [item("p1", "2026-01-05T00:00:00Z")];
    const b = [item("p1", "2026-01-01T00:00:00Z")];
    const result = mergeWishlistItems(a, b);
    expect(result).toHaveLength(1);
    expect(result[0].addedAt).toBe("2026-01-01T00:00:00Z");
  });

  it("is order-independent (commutative)", () => {
    const a = [item("p1", "2026-01-05T00:00:00Z"), item("p2", "2026-01-03T00:00:00Z")];
    const b = [item("p1", "2026-01-01T00:00:00Z"), item("p3", "2026-01-04T00:00:00Z")];

    const ab = mergeWishlistItems(a, b).map((i) => `${i.productId}:${i.addedAt}`).sort();
    const ba = mergeWishlistItems(b, a).map((i) => `${i.productId}:${i.addedAt}`).sort();

    expect(ab).toEqual(ba);
  });

  it("drops items whose product no longer exists in the catalog", () => {
    const a = [item("p1", "2026-01-01T00:00:00Z"), item("deleted-product", "2026-01-02T00:00:00Z")];
    const b = [item("p2", "2026-01-01T00:00:00Z")];
    const validIds = new Set(["p1", "p2"]);

    const result = mergeWishlistItems(a, b, validIds);
    expect(result.map((i) => i.productId).sort()).toEqual(["p1", "p2"]);
  });

  it("never produces duplicate productIds", () => {
    const a = [item("p1", "2026-01-01T00:00:00Z"), item("p1", "2026-01-02T00:00:00Z")];
    const result = mergeWishlistItems(a, []);
    const ids = result.map((i) => i.productId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
