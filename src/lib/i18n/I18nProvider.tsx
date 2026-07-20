'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from '../types';
import { KEYS, readRaw, writeRaw } from '../storage';
import { dictionaries, en, RTL_LANGS } from './dictionaries';

type Vars = Record<string, string | number>;

interface I18nContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  /** translate a key with English fallback and {var} interpolation */
  t: (key: string, vars?: Vars) => string;
  /** whether the client has read the stored preference (avoids hydration fl… ) */
  ready: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

const isLang = (v: string | null): v is Lang =>
  v === 'en' || v === 'hi' || v === 'ar' || v === 'ur' || v === 'es' || v === 'fr';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Server + first client render always start at 'en' so hydration matches; the
  // stored preference is applied in an effect right after mount.
  const [lang, setLangState] = useState<Lang>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readRaw(KEYS.lang);
    if (isLang(stored) && stored !== 'en') setLangState(stored);
    setReady(true);
  }, []);

  // Keep <html lang> and dir in sync with the active language.
  useEffect(() => {
    const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    writeRaw(KEYS.lang, l);
  }, []);

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const dict = dictionaries[lang];
      const raw = dict[key] ?? en[key] ?? key;
      return interpolate(raw, vars);
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, dir: RTL_LANGS.includes(lang) ? 'rtl' : 'ltr', setLang, t, ready }),
    [lang, setLang, t, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
