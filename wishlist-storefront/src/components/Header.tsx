import { NavLink } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
    isActive
      ? "bg-indigo text-paper shadow-[0_12px_32px_-8px_rgba(59,91,219,0.35)]"
      : "text-slate-light hover:text-ink hover:bg-paper-dim"
  }`;

export function Header() {
  const { count } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group inline-flex items-center gap-3 rounded-full transition-all duration-300 hover:opacity-80"
          end
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-indigo-dark text-sm font-bold text-paper shadow-[0_8px_24px_-8px_rgba(59,91,219,0.4)]">
            F
          </span>
          <span className="flex flex-col">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">Fieldnote</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-light">Curated essentials</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-full border border-line bg-white/70 backdrop-blur-md p-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]" aria-label="Main">
          <NavLink to="/" className={navLinkClass} end>
            Storefront
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              Wishlist
              <span
                aria-label={`${count} ${count === 1 ? "item" : "items"} in wishlist`}
                className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-saffron font-mono text-xs font-bold leading-none text-ink"
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
