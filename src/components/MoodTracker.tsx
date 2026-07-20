'use client';

import { useEffect, useState } from 'react';
import { MOODS, MOOD_TIPS, type MoodDef } from '@/lib/constants';
import { dayKey, todayKey } from '@/lib/date';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { MoodName } from '@/lib/types';
import { useAppState } from './providers/AppStateProvider';

const DOW_KEYS = ['mood.day.sun', 'mood.day.mon', 'mood.day.tue', 'mood.day.wed', 'mood.day.thu', 'mood.day.fri', 'mood.day.sat'];

interface WeekView {
  week: { dow: number; v: number }[];
  selected: MoodName | null;
  avg: number | null;
  best: { dow: number; v: number } | null;
}

const EMPTY: WeekView = { week: [], selected: null, avg: null, best: null };

export default function MoodTracker() {
  const { t } = useI18n();
  const { moods, logMood } = useAppState();
  const [view, setView] = useState<WeekView>(EMPTY);

  // Recompute the week view whenever stored moods change (client-only; avoids
  // SSR/date hydration mismatch).
  useEffect(() => {
    const week: { dow: number; v: number }[] = [];
    const vals: number[] = [];
    let best: { dow: number; v: number } | null = null;
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const v = moods[dayKey(d)]?.v ?? 0;
      if (v) {
        vals.push(v);
        if (!best || v > best.v) best = { dow: d.getDay(), v };
      }
      week.push({ dow: d.getDay(), v });
    }
    const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    const selected = moods[todayKey()]?.m ?? null;
    setView({ week, selected, avg, best });
  }, [moods]);

  const insightHtml = (() => {
    if (view.avg === null || !view.best) return t('mood.insightDefault');
    const day = t(DOW_KEYS[view.best.dow]);
    const key = view.avg >= 75 ? 'mood.insightStrongCalm' : 'mood.insightStrongDip';
    return t(key, { day, val: view.best.v });
  })();

  const onPick = (mood: MoodDef) => logMood(mood);

  return (
    <section id="mood">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('mood.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('mood.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('mood.lede')}
          </p>
        </div>
        <div className="split" style={{ alignItems: 'stretch' }}>
          <div className="panel rv">
            <h3 style={{ marginBottom: 18 }}>{t('mood.selectPrompt')}</h3>
            <div className="moods">
              {MOODS.map((m) => (
                <button
                  key={m.key}
                  className={`mood${view.selected === m.key ? ' sel' : ''}`}
                  onClick={() => onPick(m)}
                >
                  <em>{m.emoji}</em>
                  {t(`mood.${m.key}`)}
                </button>
              ))}
            </div>
            <div className={`mood-tip${view.selected ? ' show' : ''}`}>
              {view.selected ? MOOD_TIPS[view.selected] : ''}
            </div>
          </div>
          <div className="panel rv">
            <h3>{t('mood.weekHeading')}</h3>
            <div className="week">
              {view.week.map((b, i) => (
                <div className="bar" key={i}>
                  <div className="fillwrap">
                    <div className="fill" style={{ height: `${b.v}%` }} />
                  </div>
                  <small>{t(DOW_KEYS[b.dow])}</small>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
              <span className="score">{view.avg !== null ? `${view.avg}%` : '—'}</span>
              <span style={{ color: 'var(--dim)', fontSize: '.85rem' }}>{t('mood.average')}</span>
            </div>
            <div className="insight" dangerouslySetInnerHTML={{ __html: insightHtml }} />
          </div>
        </div>
      </div>
    </section>
  );
}
