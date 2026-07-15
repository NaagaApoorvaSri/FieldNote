import { NavLink } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-indigo text-paper shadow-[0_10px_24px_-16px_rgba(53,80,122,0.9)]"
      : "text-slate hover:bg-white/70 hover:text-ink"
  }`;

export function Header() {
  const { count } = useWishlist();

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group inline-flex items-center gap-3 rounded-full border border-line/80 bg-white/70 px-3 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          end
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo text-sm font-semibold text-paper shadow-inner">
            F
          </span>
          <span className="flex flex-col">
            <span className="font-display text-base font-semibold tracking-tight text-ink">Fieldnote</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate">Curated essentials</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-2 rounded-full border border-line/80 bg-white/75 p-1.5 shadow-sm" aria-label="Main">
          <NavLink to="/" className={navLinkClass} end>
            Storefront
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              Wishlist
              <span
                aria-label={`${count} ${count === 1 ? "item" : "items"} in wishlist`}
                className="inline-flex min-w-[1.375rem] items-center justify-center rounded-full bg-saffron px-1.5 py-0.5 font-mono text-[11px] leading-none text-ink"
              >
                {count}
              </span>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
