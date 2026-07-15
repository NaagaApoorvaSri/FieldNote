import { Link } from "react-router-dom";

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-[32px] border border-dashed border-line/50 bg-gradient-to-br from-paper-dim to-indigo-light/20 px-8 py-24 text-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.04)]">
      <EmptyStampIcon />
      <p className="font-display text-3xl font-bold text-ink">Your wishlist is empty</p>
      <p className="max-w-sm text-base leading-7 text-slate">
        Start building your collection by saving items from the storefront. Your wishlist will appear here.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-indigo to-indigo-dark px-6 py-3 text-sm font-bold text-paper transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(59,91,219,0.35)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo"
      >
        Browse the storefront
      </Link>
    </div>
  );
}

function EmptyStampIcon() {
  return (
    <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">
      <path
        d="M24 41s-15-9.6-19.6-19.2C0.7 14.5 4.2 8 11 8c4 0 6.6 2.2 13 6.6C20.4 10.2 20 8 24 8c6.8 0 10.3 6.5 6.6 13.8C26 31.4 24 41 24 41z"
        fill="none"
        stroke="var(--color-slate-light)"
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
    </svg>
  );
}
