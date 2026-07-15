import type { Product } from "../types/product";
import type { WishlistItem } from "../types/wishlist";
import { formatPrice } from "../lib/formatPrice";
import { useWishlist } from "../context/WishlistContext";

interface WishlistRowProps {
  item: WishlistItem;
  product: Product;
}

export function WishlistRow({ item, product }: WishlistRowProps) {
  const { removeItem } = useWishlist();

  const addedLabel = new Date(item.addedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="flex flex-col gap-4 rounded-[22px] border border-line/70 bg-white/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center">
      <img
        src={product.imageUrl}
        alt=""
        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
        loading="lazy"
      />

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate">{product.category}</p>
        <h3 className="truncate font-display text-base font-medium text-ink">{product.name}</h3>
        <p className="mt-1 font-mono text-xs text-slate-light">Added {addedLabel}</p>
        {!product.inStock && (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-danger">Out of stock</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="shrink-0 font-mono text-sm font-semibold text-ink">{formatPrice(product.priceCents, product.currency)}</p>

        <button
          type="button"
          onClick={() => removeItem(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="shrink-0 rounded-full border border-line/80 bg-paper px-3 py-1.5 text-xs font-medium text-slate transition-all duration-200 hover:border-danger hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
