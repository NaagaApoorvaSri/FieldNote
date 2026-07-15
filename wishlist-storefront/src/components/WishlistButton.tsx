import { useWishlist } from "../context/WishlistContext";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  /** Compact renders as an icon-only stamp (for cards); full adds a label. */
  variant?: "compact" | "full";
}

/**
 * Toggle a single product in/out of the wishlist. This is the one place the
 * "add/remove" logic is implemented — ProductCard and the detail view both
 * render this component rather than re-implementing the toggle themselves.
 */
export function WishlistButton({ productId, productName, variant = "compact" }: WishlistButtonProps) {
  const { isInWishlist, addItem, removeItem } = useWishlist();
  const saved = isInWishlist(productId);

  function toggle() {
    if (saved) {
      removeItem(productId);
    } else {
      addItem(productId);
    }
  }

  const label = saved ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={saved}
        aria-label={label}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-body text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo ${
          saved
            ? "border-saffron-dark bg-saffron text-ink hover:bg-saffron-dark"
            : "border-line bg-white/80 text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
        }`}
      >
        <StampIcon filled={saved} />
        {saved ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white/90 text-ink shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo active:scale-95"
    >
      <StampIcon filled={saved} />
    </button>
  );
}

function StampIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className={`transition-all duration-150 ${filled ? "scale-100" : "scale-95"}`}
    >
      <path
        d="M12 20.5s-7.5-4.8-9.8-9.6C.7 7.2 2.6 4 6 4c2 0 3.6 1.1 6 3.3C14.4 5.1 16 4 18 4c3.4 0 5.3 3.2 3.8 6.9-2.3 4.8-9.8 9.6-9.8 9.6z"
        fill={filled ? "var(--color-saffron)" : "none"}
        stroke={filled ? "var(--color-saffron-dark)" : "var(--color-slate)"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
