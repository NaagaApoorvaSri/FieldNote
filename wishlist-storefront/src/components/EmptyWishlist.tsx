import { Link } from "react-router-dom";

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-line/80 bg-white/70 px-6 py-20 text-center shadow-sm">
      <EmptyStampIcon />
      <p className="font-display text-2xl text-ink">Your wishlist is empty</p>
      <p className="max-w-sm text-sm leading-6 text-slate">
        Save anything that catches your eye from the storefront — it'll show up here.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center rounded-full border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
      >
        Browse the storefront
      </Link>
    </div>
  );
}

function EmptyStampIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
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
