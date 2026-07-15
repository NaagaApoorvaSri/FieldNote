import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  query: string;
}

export function ProductGrid({ products, query }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[32px] border border-dashed border-line/50 bg-gradient-to-br from-paper-dim to-danger/5 px-8 py-20 text-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.04)]">
        <p className="font-display text-2xl font-bold text-ink">No matches for "{query}"</p>
        <p className="max-w-sm text-base leading-7 text-slate">
          Try searching with different keywords, or browse by exploring other products.
        </p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Products"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <div role="listitem" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
