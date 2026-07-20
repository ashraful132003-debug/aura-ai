'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LANGS } from '@/lib/i18n/dictionaries';
import type { Lang } from '@/lib/types';

const NAV_ITEMS: { href: string; key: string; mobileKey?: string }[] = [
  { href: '#features', key: 'nav.features' },
  { href: '#soundscape', key: 'nav.soundscapes' },
  { href: '#chat', key: 'nav.chat' },
  { href: '#mood', key: 'nav.mood', mobileKey: 'nav.moodLong' },
  { href: '#breathing', key: 'nav.breathing' },
  { href: '#dashboard', key: 'nav.dashboard' },
  { href: '#safety', key: 'nav.safety' },
  { href: '#faq', key: 'nav.faq' },
  { href: '#pricing', key: 'nav.pricing' },
];

function LangSelect({ id, mobile }: { id: string; mobile?: boolean }) {
  const { lang, setLang, t } = useI18n();
  return (
    <select
      className="lang-sel"
      id={id}
      aria-label={t('nav.langAria')}
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      style={mobile ? { marginTop: 10 } : undefined}
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {mobile ? l.label : l.short}
        </option>
      ))}
    </select>
  );
}

export default function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a className="logo" href="#top" aria-label={t('nav.home')}>
            <span className="logo-orb" />
            Aura
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {t(item.key)}
              </a>
            ))}
            <LangSelect id="langSel" />
            <a className="btn btn-pri" href="#chat">
              {t('nav.cta')}
            </a>
          </nav>
          <button
            className={`burger${open ? ' open' : ''}`}
            id="burger"
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mnav${open ? ' open' : ''}`} id="mnav" inert={!open}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {t(item.mobileKey ?? item.key)}
          </a>
        ))}
        <LangSelect id="langSelM" mobile />
        <a className="btn btn-pri" href="#chat" onClick={() => setOpen(false)}>
          {t('nav.cta')}
        </a>
      </div>
    </>
  );
}
