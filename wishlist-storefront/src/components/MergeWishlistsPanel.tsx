import { useRef, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import type { WishlistSnapshot } from "../types/wishlist";

/**
 * Since this is a LocalStorage-only client (no accounts, no server), "two
 * distinct wishlists" are simulated via export/import: a wishlist built on
 * one device/browser is exported as a JSON snapshot, then imported on
 * another to merge with whatever is already saved there. The merge itself
 * runs through the same pure mergeWishlists logic either way.
 */
export function MergeWishlistsPanel() {
  const { exportSnapshot, mergeSnapshot, count } = useWishlist();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleExport() {
    const snapshot = exportSnapshot();
    const json = JSON.stringify(snapshot, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      setStatus("Wishlist copied to clipboard as JSON. Paste it into another browser to merge it in later.");
      setError(null);
    } catch {
      downloadJSON(snapshot);
      setStatus("Wishlist downloaded as a .json file. Import it in another browser to merge it in later.");
      setError(null);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      applyImport(String(reader.result));
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function applyImport(rawText: string) {
    let snapshot: WishlistSnapshot;
    try {
      snapshot = JSON.parse(rawText);
      if (!Array.isArray(snapshot.items)) throw new Error("not a wishlist");
    } catch {
      setStatus(null);
      setError("That doesn't look like a valid wishlist file. Export one first, then try importing it.");
      return;
    }

    const result = mergeSnapshot(snapshot);
    setError(null);

    const parts: string[] = [];
    parts.push(
      result.addedCount > 0
        ? `Added ${result.addedCount} new ${result.addedCount === 1 ? "item" : "items"} from "${result.sourceName}".`
        : `No new items — everything in "${result.sourceName}" was already in your wishlist.`
    );
    if (result.droppedCount > 0) {
      parts.push(`${result.droppedCount} ${result.droppedCount === 1 ? "item was" : "items were"} skipped (no longer in the catalog).`);
    }
    setStatus(parts.join(" "));
  }

  return (
    <div className="rounded-[24px] border border-line/70 bg-white/80 p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-lg font-medium text-ink">Merge wishlists</h2>
      <p className="mt-1 text-sm leading-6 text-slate">
        Bring items from another browser or device into this wishlist. Nothing is overwritten — matching
        products keep the earliest "added" date, and everything else is combined.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleExport}
          disabled={count === 0}
          className="rounded-2xl border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo disabled:cursor-not-allowed disabled:border-line disabled:bg-paper disabled:text-slate-light"
        >
          Export this wishlist
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-2xl border border-indigo/20 bg-indigo/10 px-4 py-2.5 text-sm font-medium text-indigo transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo hover:text-paper"
        >
          Import &amp; merge a wishlist
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Import a wishlist JSON file"
        />
      </div>

      <div aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm leading-6">
        {status && <p className="text-ink">{status}</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

function downloadJSON(snapshot: WishlistSnapshot) {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${snapshot.name.toLowerCase().replace(/\s+/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
