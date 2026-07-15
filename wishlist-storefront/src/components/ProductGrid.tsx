import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  query: string;
}

export function ProductGrid({ products, query }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-line/80 bg-white/70 px-6 py-20 text-center shadow-sm">
        <p className="font-display text-xl text-ink">No matches for "{query}"</p>
        <p className="max-w-sm text-sm leading-6 text-slate">
          Try a different word, or browse by category instead of searching.
        </p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Products"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <div role="listitem" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
