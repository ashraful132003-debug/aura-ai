'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const CARDS = [
  { ico: '💬', t: 'features.c1' },
  { ico: '🌧️', t: 'features.c2' },
  { ico: '🫁', t: 'features.c3' },
  { ico: '📊', t: 'features.c4' },
  { ico: '🎙️', t: 'features.c5' },
  { ico: '🔒', t: 'features.c6' },
];

export default function Features() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);

  // Card tilt on fine pointers only (disabled on touch / reduced motion).
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches || reduced) return;
    const cards = Array.from(gridRef.current?.querySelectorAll<HTMLElement>('.tilt') ?? []);
    const detach: (() => void)[] = [];
    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-3px)`;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      };
      const leave = () => {
        card.style.transform = '';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      detach.push(() => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    });
    return () => detach.forEach((fn) => fn());
  }, []);

  return (
    <section id="features">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('features.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('features.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('features.lede')}
          </p>
        </div>
        <div className="grid3" ref={gridRef}>
          {CARDS.map((c) => (
            <div className="card rv tilt" key={c.t}>
              <div className="ico">{c.ico}</div>
              <h3>{t(`${c.t}.title`)}</h3>
              <p>{t(`${c.t}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
