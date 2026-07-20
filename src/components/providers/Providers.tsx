'use client';

import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { AppStateProvider } from './AppStateProvider';
import { ModalProvider } from './ModalProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ToastProvider>
        <AppStateProvider>
          <ModalProvider>{children}</ModalProvider>
        </AppStateProvider>
      </ToastProvider>
    </I18nProvider>
  );
}
