/**
 * Single source of truth for rendering a price. Prices are stored as whole
 * cents (see Product type) specifically so formatting logic is never
 * duplicated across components — every place a price appears calls this.
 */
export function formatPrice(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
