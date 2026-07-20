'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ModalContextValue {
  upgradeOpen: boolean;
  openUpgrade: () => void;
  closeUpgrade: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const openUpgrade = useCallback(() => setUpgradeOpen(true), []);
  const closeUpgrade = useCallback(() => setUpgradeOpen(false), []);

  const value = useMemo<ModalContextValue>(
    () => ({ upgradeOpen, openUpgrade, closeUpgrade }),
    [upgradeOpen, openUpgrade, closeUpgrade],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
