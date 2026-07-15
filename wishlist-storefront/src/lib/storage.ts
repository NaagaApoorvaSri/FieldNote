/**
 * Thin, typed wrapper around localStorage. Keeping every read/write behind
 * this module means the rest of the app never touches `window.localStorage`
 * directly — if persistence ever needs to move to a backend, this is the
 * only file that changes.
 */
export function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    // Corrupt or inaccessible storage should never crash the app.
    return null;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or unavailable (private browsing); fail silently
    // rather than breaking the UI — the in-memory state is still correct
    // for the rest of the session.
  }
}
