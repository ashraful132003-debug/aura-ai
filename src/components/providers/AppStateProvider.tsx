'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CHAT_LIMIT, type MoodDef } from '@/lib/constants';
import { todayKey } from '@/lib/date';
import { KEYS, readJSON, readRaw, writeJSON, writeRaw } from '@/lib/storage';
import type { BreathStat, JournalEntry, MoodStore, Plan, Usage } from '@/lib/types';

interface AppStateValue {
  /** true once localStorage has been read on the client */
  mounted: boolean;

  plan: Plan;
  setPlan: (p: Plan) => void;

  /** today's consumed chat count */
  usageCount: number;
  /** remaining chats today; Infinity on Pro */
  chatsLeft: number;
  /** consume one chat (no-op on Pro); returns remaining after */
  consumeChat: () => number;

  moods: MoodStore;
  logMood: (mood: MoodDef) => void;

  breath: BreathStat;
  recordBreath: (seconds: number) => void;

  journal: JournalEntry[];
  saveJournal: (text: string) => boolean;
  deleteJournal: (index: number) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function loadUsage(): Usage {
  const u = readJSON<Usage>(KEYS.usage, { d: todayKey(), n: 0 });
  if (u.d !== todayKey()) return { d: todayKey(), n: 0 };
  return u;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [plan, setPlanState] = useState<Plan>('free');
  const [usage, setUsage] = useState<Usage>({ d: todayKey(), n: 0 });
  const [moods, setMoods] = useState<MoodStore>({});
  const [breath, setBreath] = useState<BreathStat>({ s: 0, n: 0 });
  const [journal, setJournal] = useState<JournalEntry[]>([]);

  // Hydrate from localStorage after mount (server render uses defaults).
  useEffect(() => {
    const storedPlan = readRaw(KEYS.plan);
    setPlanState(storedPlan === 'pro' ? 'pro' : 'free');
    setUsage(loadUsage());
    setMoods(readJSON<MoodStore>(KEYS.moods, {}));
    setBreath(readJSON<BreathStat>(KEYS.breath, { s: 0, n: 0 }));
    setJournal(readJSON<JournalEntry[]>(KEYS.journal, []));
    setMounted(true);
  }, []);

  const setPlan = useCallback((p: Plan) => {
    setPlanState(p);
    writeRaw(KEYS.plan, p);
  }, []);

  const chatsLeft = plan === 'pro' ? Infinity : Math.max(0, CHAT_LIMIT - usage.n);

  const consumeChat = useCallback((): number => {
    if (plan === 'pro') return Infinity;
    let remaining = 0;
    setUsage((prev) => {
      const base = prev.d === todayKey() ? prev : { d: todayKey(), n: 0 };
      const next = { d: base.d, n: base.n + 1 };
      writeJSON(KEYS.usage, next);
      remaining = Math.max(0, CHAT_LIMIT - next.n);
      return next;
    });
    return remaining;
  }, [plan]);

  const logMood = useCallback((mood: MoodDef) => {
    setMoods((prev) => {
      const next = { ...prev, [todayKey()]: { m: mood.key, v: mood.value } };
      writeJSON(KEYS.moods, next);
      return next;
    });
  }, []);

  const recordBreath = useCallback((seconds: number) => {
    setBreath((prev) => {
      const next = { s: prev.s + Math.round(seconds), n: prev.n + 1 };
      writeJSON(KEYS.breath, next);
      return next;
    });
  }, []);

  const saveJournal = useCallback((text: string): boolean => {
    const v = text.trim();
    if (!v) return false;
    setJournal((prev) => {
      const entry: JournalEntry = {
        d: new Date().toLocaleString(undefined, {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        t: v,
      };
      const next = [entry, ...prev].slice(0, 50);
      writeJSON(KEYS.journal, next);
      return next;
    });
    return true;
  }, []);

  const deleteJournal = useCallback((index: number) => {
    setJournal((prev) => {
      const next = prev.slice();
      next.splice(index, 1);
      writeJSON(KEYS.journal, next);
      return next;
    });
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      mounted,
      plan,
      setPlan,
      usageCount: usage.n,
      chatsLeft,
      consumeChat,
      moods,
      logMood,
      breath,
      recordBreath,
      journal,
      saveJournal,
      deleteJournal,
    }),
    [mounted, plan, setPlan, usage.n, chatsLeft, consumeChat, moods, logMood, breath, recordBreath, journal, saveJournal, deleteJournal],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
