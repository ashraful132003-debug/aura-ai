// SSR-safe localStorage helpers. All access is guarded so components can call
// these during render/effects without crashing on the server.

const isBrowser = typeof window !== 'undefined';

/** localStorage keys used across the app. */
export const KEYS = {
  moods: 'aura_moods',
  usage: 'aura_usage',
  plan: 'aura_plan',
  breath: 'aura_breath',
  journal: 'aura_journal',
  seen: 'aura_seen',
  lang: 'aura_lang',
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / privacy mode — ignore */
  }
}

export function readRaw(key: string): string | null {
  if (!isBrowser) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}
