import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../lib/products";
import { WishlistRow } from "../components/WishlistRow";
import { EmptyWishlist } from "../components/EmptyWishlist";
import { MergeWishlistsPanel } from "../components/MergeWishlistsPanel";

export function WishlistPage() {
  const { wishlist, count } = useWishlist();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[28px] border border-line/70 bg-white/80 p-6 shadow-[0_30px_80px_-35px_rgba(37,58,92,0.35)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo">Saved for later</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Wishlist</h1>
            <p className="mt-2 text-sm leading-6 text-slate">
              {count === 0 ? "Nothing saved yet." : `${count} ${count === 1 ? "item" : "items"} saved.`}
            </p>
          </div>
          <div className="rounded-full border border-line/80 bg-paper px-4 py-2 text-sm font-medium text-slate">
            {count === 0 ? "Ready when you are" : `${count} saved`}
          </div>
        </div>
      </section>

      <div className="mt-8">
        {count === 0 ? (
          <EmptyWishlist />
        ) : (
          <ul className="space-y-3">
            {wishlist.items.map((item) => {
              const product = getProductById(item.productId);
              // A wishlist item can never outlive the catalog in normal use
              // (merge already filters these out), but guard defensively
              // for any stray localStorage state from an older session.
              if (!product) return null;
              return <WishlistRow key={item.productId} item={item} product={product} />;
            })}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <MergeWishlistsPanel />
      </div>
    </div>
  );
}
