interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="w-full max-w-xl">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light" />
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search notebooks, bags, mugs…"
          className="w-full rounded-2xl border border-line bg-paper/90 py-3 pl-11 pr-4 font-body text-sm text-ink shadow-sm placeholder:text-slate-light transition-all duration-200 focus:border-indigo focus:bg-white focus:shadow-[0_0_0_4px_rgba(53,80,122,0.12)] focus:outline-none"
        />
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-slate" aria-live="polite">
        {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
