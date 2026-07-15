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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line/70 bg-white/80 shadow-[0_16px_40px_-24px_rgba(28,31,38,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(37,58,92,0.35)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = `https://placehold.co/600x400/111827/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} productName={product.name} />
        </div>
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate">{product.category}</p>
        <h3 className="font-display text-lg font-medium leading-snug text-ink">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="font-mono text-base font-semibold text-ink">{formatPrice(product.priceCents, product.currency)}</p>
          <span className="rounded-full border border-line/80 bg-paper px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-slate">
            View
          </span>
        </div>
      </div>
    </article>
  );
}
