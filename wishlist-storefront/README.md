# Fieldnote — Storefront + Wishlist (V1)

A small e-commerce storefront with a wishlist that supports merging two
distinct wishlists into one. Built with React, Vite, TypeScript, and
Tailwind CSS v4. Wishlist persistence is client-side (`localStorage`) —
there is no backend in this build.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Test the merge algorithm

```bash
npm test
```

Runs the Vitest suite in `src/lib/mergeWishlists.test.ts`, covering the
mandatory merge requirement's edge cases: self-merge, empty lists,
disjoint lists, overlapping items (earliest-added-wins), order-independence,
and dropping items for products no longer in the catalog.

## Build

```bash
npm run build
npm run preview
```

## How "merge two distinct wishlists" works here

This is a pure client app with no accounts and no server, so there's no
natural second wishlist to merge with. It's simulated the way it would
actually happen for a real user without an account: **export/import**.

1. On the Wishlist page, **Export this wishlist** copies your current
   wishlist to the clipboard as JSON (or downloads a `.json` file if
   clipboard access isn't available).
2. Open the app in another browser (or a private window, to simulate a
   second "device"), build a different wishlist there.
3. Click **Import & merge a wishlist** and select the exported `.json`
   file. The two wishlists are merged: matching products keep the
   earliest "added" date, everything else is combined, and nothing is
   silently dropped except items whose product no longer exists in the
   catalog (surfaced in the status message when that happens).

The merge logic itself (`src/lib/mergeWishlists.ts`) is a pure function
with no dependency on React, the DOM, or localStorage, so it's testable
in complete isolation — see the test file above.

## Project structure

```
src/
├── types/        Product, Wishlist, WishlistSnapshot — the domain model
├── data/         Static seeded product catalog
├── lib/          Pure logic: merge algorithm (+ tests), storage, formatting, lookups
├── context/      WishlistContext — single source of truth for wishlist state
├── components/   Reusable UI: ProductCard, WishlistButton, SearchBar, etc.
└── pages/        StorefrontPage, WishlistPage
```

## Notable decisions (carried over from the V1 spec)

- **Wishlist stores product references only** (`productId` + `addedAt`),
  never a copy of product data — prices/names are always looked up live
  against the catalog, so the wishlist can't go stale.
- **One wishlist per browser.** There's no multi-list management UI in V1.
- **Accessibility:** every icon-only control has an `aria-label`; the
  wishlist toggle exposes `aria-pressed`; live regions (`aria-live="polite"`)
  announce search result counts and merge outcomes; focus is visibly
  outlined on every interactive element; `prefers-reduced-motion` is
  respected globally.
- **Responsive:** single-column on mobile, up to 4-column grid on large
  screens; the header, search bar, and merge panel all reflow rather than
  overflow.

## Known limitations (by design, for a V1 in scope)

- No real accounts/auth — merge is demonstrated via export/import rather
  than a login flow.
- No cart/checkout — out of scope per the product spec.
- No product search filters beyond free-text (name/category/description).
