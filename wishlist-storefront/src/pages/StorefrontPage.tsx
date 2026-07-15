import { useMemo, useState } from "react";
import { products } from "../data/products";
import { searchProducts } from "../lib/products";
import { SearchBar } from "../components/SearchBar";
import { ProductGrid } from "../components/ProductGrid";

export function StorefrontPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="mb-8 overflow-hidden rounded-[28px] border border-line/70 bg-white/80 p-6 shadow-[0_30px_80px_-35px_rgba(37,58,92,0.35)] backdrop-blur sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-indigo/20 bg-indigo/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo">
              Everyday carry, refined
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Storefront
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate sm:text-base">
              {products.length} everyday-carry goods, made to be used and kept.
            </p>
          </div>
          <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />
        </div>
      </section>

      <ProductGrid products={filtered} query={query} />
    </div>
  );
}
