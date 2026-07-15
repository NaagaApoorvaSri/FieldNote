import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Wishlist, WishlistSnapshot } from "../types/wishlist";
import { readJSON, writeJSON } from "../lib/storage";
import { mergeInto } from "../lib/mergeWishlists";
import { getAllProductIds } from "../lib/products";

const STORAGE_KEY = "fieldnote.wishlist.v1";

const EMPTY_WISHLIST: Wishlist = { id: "mine", name: "My Wishlist", items: [] };

export interface MergeResult {
  /** Products that were new to the current wishlist after merging. */
  addedCount: number;
  /** Products dropped because they no longer exist in the catalog. */
  droppedCount: number;
  sourceName: string;
}

interface WishlistContextValue {
  wishlist: Wishlist;
  count: number;
  isInWishlist: (productId: string) => boolean;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  exportSnapshot: () => WishlistSnapshot;
  mergeSnapshot: (snapshot: WishlistSnapshot) => MergeResult;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function loadInitialWishlist(): Wishlist {
  return readJSON<Wishlist>(STORAGE_KEY) ?? EMPTY_WISHLIST;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist>(loadInitialWishlist);

  const persist = useCallback((next: Wishlist) => {
    setWishlist(next);
    writeJSON(STORAGE_KEY, next);
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.items.some((i) => i.productId === productId),
    [wishlist.items]
  );

  const addItem = useCallback(
    (productId: string) => {
      if (isInWishlist(productId)) return;
      persist({
        ...wishlist,
        items: [...wishlist.items, { productId, addedAt: new Date().toISOString() }],
      });
    },
    [wishlist, isInWishlist, persist]
  );

  const removeItem = useCallback(
    (productId: string) => {
      persist({
        ...wishlist,
        items: wishlist.items.filter((i) => i.productId !== productId),
      });
    },
    [wishlist, persist]
  );

  const exportSnapshot = useCallback((): WishlistSnapshot => {
    return {
      id: wishlist.id,
      name: wishlist.name,
      items: wishlist.items,
      exportedAt: new Date().toISOString(),
    };
  }, [wishlist]);

  const mergeSnapshot = useCallback(
    (snapshot: WishlistSnapshot): MergeResult => {
      const validIds = getAllProductIds();
      const before = new Set(wishlist.items.map((i) => i.productId));

      const incomingValidCount = snapshot.items.filter((i) => validIds.has(i.productId)).length;
      const droppedCount = snapshot.items.length - incomingValidCount;

      const merged = mergeInto(wishlist, { id: snapshot.id, name: snapshot.name, items: snapshot.items }, validIds);

      const addedCount = merged.items.filter((i) => !before.has(i.productId)).length;

      persist(merged);

      return { addedCount, droppedCount, sourceName: snapshot.name };
    },
    [wishlist, persist]
  );

  const count = wishlist.items.length;

  const value = useMemo(
    () => ({ wishlist, count, isInWishlist, addItem, removeItem, exportSnapshot, mergeSnapshot }),
    [wishlist, count, isInWishlist, addItem, removeItem, exportSnapshot, mergeSnapshot]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
