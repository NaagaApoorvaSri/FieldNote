interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <div className="relative group">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-light group-focus-within:text-indigo transition-colors duration-300" />
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search notebooks, pens, bags…"
          className="w-full rounded-2xl border border-line bg-paper py-3.5 pl-12 pr-5 font-body text-sm text-ink shadow-[0_4px_16px_-4px_rgba(0,0,0,0.04)] placeholder:text-slate-light transition-all duration-300 focus:border-indigo focus:bg-white focus:shadow-[0_12px_32px_-8px_rgba(59,91,219,0.15)] focus:outline-none"
        />
      </div>
      <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-widest text-slate-light" aria-live="polite">
        {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
