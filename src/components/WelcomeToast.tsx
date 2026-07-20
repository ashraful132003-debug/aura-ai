'use client';

import { useEffect, useRef } from 'react';
import { KEYS, readRaw, writeRaw } from '@/lib/storage';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { useToast } from './providers/ToastProvider';

export default function WelcomeToast() {
  const { toast } = useToast();
  const { t } = useI18n();
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  useEffect(() => {
    if (readRaw(KEYS.seen)) return;
    writeRaw(KEYS.seen, '1');
    const id = setTimeout(() => toast(tRef.current('toast.welcome')), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  return null;
}
