'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { useAppState } from './providers/AppStateProvider';
import { useModal } from './providers/ModalProvider';
import { useToast } from './providers/ToastProvider';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function UpgradeModal() {
  const { t } = useI18n();
  const { plan, setPlan } = useAppState();
  const { upgradeOpen, closeUpgrade } = useModal();
  const { toast } = useToast();

  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const pro = plan === 'pro';

  // Focus management + trap + Escape, restoring focus on close.
  useEffect(() => {
    if (!upgradeOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const card = cardRef.current;
    const focusables = () => Array.from(card?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => !el.hasAttribute('disabled'));
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeUpgrade();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lastFocused.current?.focus?.();
    };
  }, [upgradeOpen, closeUpgrade]);

  const goPro = () => {
    setPlan('pro');
    toast(t('toast.proUnlocked'));
    closeUpgrade();
  };
  const goFree = () => {
    setPlan('free');
    toast(t('toast.switchedFree'));
    closeUpgrade();
  };

  return (
    <div
      className={`modal${upgradeOpen ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeUpgrade();
      }}
    >
      <div className="modal-card" ref={cardRef}>
        <button className="modal-x" aria-label={t('modal.close')} onClick={closeUpgrade}>
          ✕
        </button>
        <h3 id="upTitle">{t('modal.title')}</h3>
        <p>{t('modal.desc')}</p>
        <ul className="modal-perks">
          <li>{t('modal.perk1')}</li>
          <li>{t('modal.perk2')}</li>
          <li>{t('modal.perk3')}</li>
          <li>{t('modal.perk4')}</li>
        </ul>
        {!pro && (
          <button className="btn btn-pri" onClick={goPro}>
            {t('modal.unlock')}
          </button>
        )}
        {pro && (
          <button className="btn btn-ghost" onClick={goFree}>
            {t('modal.switchFree')}
          </button>
        )}
        <button className="btn btn-ghost" onClick={closeUpgrade}>
          {t('modal.later')}
        </button>
        <p className="modal-note">{t('modal.note')}</p>
      </div>
    </div>
  );
}
