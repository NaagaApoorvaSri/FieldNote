import { useMemo, useState } from "react";
import { products } from "../data/products";
import { searchProducts } from "../lib/products";
import { SearchBar } from "../components/SearchBar";
import { ProductGrid } from "../components/ProductGrid";

export function StorefrontPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="mb-12 overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-white via-white to-indigo-light/30 p-8 shadow-[0_12px_48px_-12px_rgba(59,91,219,0.2)] sm:p-10 lg:p-12 backdrop-blur-sm">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-indigo/20 bg-indigo/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo">
              ✨ Everyday carry, refined
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Storefront
            </h1>
            <p className="mt-3 text-base leading-7 text-slate sm:text-lg">
              {products.length} premium everyday-carry goods, handpicked and made to last. Build your perfect collection.
            </p>
          </div>
          <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />
        </div>
      </section>

      <ProductGrid products={filtered} query={query} />
    </div>
  );
}
