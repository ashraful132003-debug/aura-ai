'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const [kbHide, setKbHide] = useState(false);
  const [inChat, setInChat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });

    const onFocusIn = (e: FocusEvent) => {
      if ((e.target as HTMLElement)?.matches?.('input,textarea,select')) setKbHide(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if ((e.target as HTMLElement)?.matches?.('input,textarea,select')) setTimeout(() => setKbHide(false), 150);
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    let io: IntersectionObserver | null = null;
    const panel = document.getElementById('chatPanel');
    if (panel && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => setInChat(e.isIntersecting)),
        { threshold: 0.15 },
      );
      io.observe(panel);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      io?.disconnect();
    };
  }, []);

  const cls = [show ? 'show' : '', kbHide ? 'kb-hide' : '', inChat ? 'in-chat' : ''].filter(Boolean).join(' ');

  return (
    <button
      id="toTop"
      className={cls || undefined}
      aria-label={t('a11y.backToTop')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
