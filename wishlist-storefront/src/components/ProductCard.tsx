import type { Product } from "../types/product";
import { formatPrice } from "../lib/formatPrice";
import { WishlistButton } from "./WishlistButton";

function getProductImageUrl(product: Product) {
  if (product.imageUrl) {
    return product.imageUrl;
  }

  const fallbackLabel = encodeURIComponent(product.name);
  return `https://placehold.co/600x400/111827/ffffff?text=${fallbackLabel}`;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_24px_56px_-12px_rgba(59,91,219,0.25)] hover:-translate-y-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = `https://placehold.co/600x400/111827/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute right-4 top-4">
          <WishlistButton productId={product.id} productName={product.name} />
        </div>
        {!product.inStock && (
          <span className="absolute left-4 top-4 rounded-full bg-danger px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-light">{product.category}</p>
        <h3 className="font-display text-xl font-semibold leading-snug text-ink group-hover:text-indigo transition-colors duration-300">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-line">
          <p className="font-display text-lg font-bold text-ink">{formatPrice(product.priceCents, product.currency)}</p>
          <span className="rounded-full border border-indigo bg-indigo-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo transition-all duration-300 group-hover:bg-indigo group-hover:text-paper cursor-pointer">
            View
          </span>
        </div>
      </div>
    </article>
  );
}
