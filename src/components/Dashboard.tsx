'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AFFIRMATIONS, CHAT_LIMIT, DASH_TIPS, MOOD_META } from '@/lib/constants';
import { dayKey } from '@/lib/date';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { MoodName, MoodStore } from '@/lib/types';
import { useAppState } from './providers/AppStateProvider';
import { useModal } from './providers/ModalProvider';
import { useToast } from './providers/ToastProvider';

interface DistRow {
  mood: MoodName;
  count: number;
  pct: number;
}
interface DashView {
  streak: number;
  total: number;
  avg7: number | null;
  breathLabel: string;
  dist: DistRow[];
}

const EMPTY: DashView = { streak: 0, total: 0, avg7: null, breathLabel: '0m', dist: [] };

function drawTrend(cv: HTMLCanvasElement, data: MoodStore, emptyText: string) {
  const cx = cv.getContext('2d');
  if (!cx) return;
  const dpr = window.devicePixelRatio || 1;
  const r = cv.parentElement!.getBoundingClientRect();
  if (r.width < 10) return;
  cv.width = r.width * dpr;
  cv.height = r.height * dpr;
  cx.scale(dpr, dpr);
  const W = r.width;
  const H = r.height;
  const pad = { t: 14, b: 26, l: 8, r: 8 };
  cx.clearRect(0, 0, W, H);
  const pts: (number | null)[] = [];
  const labels: number[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const e = data[dayKey(d)];
    pts.push(e ? e.v : null);
    labels.push(d.getDate());
  }
  const iw = (W - pad.l - pad.r) / 13;
  cx.strokeStyle = 'rgba(255,255,255,.06)';
  cx.lineWidth = 1;
  [25, 50, 75, 100].forEach((g) => {
    const y = pad.t + (H - pad.t - pad.b) * (1 - g / 100);
    cx.beginPath();
    cx.moveTo(pad.l, y);
    cx.lineTo(W - pad.r, y);
    cx.stroke();
  });
  cx.fillStyle = 'rgba(147,160,184,.55)';
  cx.font = '10px sans-serif';
  cx.textAlign = 'center';
  labels.forEach((l, i) => {
    if (i % 2 === 1) cx.fillText(String(l), pad.l + i * iw, H - 8);
  });
  const has = pts.some((p) => p !== null);
  if (!has) {
    cx.fillStyle = 'rgba(147,160,184,.7)';
    cx.font = '300 13px sans-serif';
    cx.fillText(emptyText, W / 2, H / 2);
    return;
  }
  const Y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / 100);
  const grad = cx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#6EE7D8');
  grad.addColorStop(1, '#A78BFA');
  const segs: [number, number, number][][] = [];
  let cur: [number, number, number][] = [];
  pts.forEach((p, i) => {
    if (p !== null) cur.push([pad.l + i * iw, Y(p), p]);
    else if (cur.length) {
      segs.push(cur);
      cur = [];
    }
  });
  if (cur.length) segs.push(cur);
  segs.forEach((seg) => {
    if (seg.length > 1) {
      const fill = cx.createLinearGradient(0, pad.t, 0, H - pad.b);
      fill.addColorStop(0, 'rgba(110,231,216,.22)');
      fill.addColorStop(1, 'rgba(167,139,250,0)');
      cx.beginPath();
      cx.moveTo(seg[0][0], H - pad.b);
      seg.forEach((p) => cx.lineTo(p[0], p[1]));
      cx.lineTo(seg[seg.length - 1][0], H - pad.b);
      cx.closePath();
      cx.fillStyle = fill;
      cx.fill();
      cx.beginPath();
      seg.forEach((p, i) => (i === 0 ? cx.moveTo(p[0], p[1]) : cx.lineTo(p[0], p[1])));
      cx.strokeStyle = grad;
      cx.lineWidth = 2.5;
      cx.lineJoin = 'round';
      cx.lineCap = 'round';
      cx.stroke();
    }
    seg.forEach((p) => {
      cx.beginPath();
      cx.arc(p[0], p[1], 4, 0, 7);
      cx.fillStyle = '#0B1120';
      cx.fill();
      cx.beginPath();
      cx.arc(p[0], p[1], 4, 0, 7);
      cx.strokeStyle = grad;
      cx.lineWidth = 2;
      cx.stroke();
    });
  });
}

export default function Dashboard() {
  const { t } = useI18n();
  const { mounted, plan, usageCount, chatsLeft, moods, breath, journal, saveJournal, deleteJournal } = useAppState();
  const { openUpgrade } = useModal();
  const { toast } = useToast();

  const [view, setView] = useState<DashView>(EMPTY);
  const [jInput, setJInput] = useState('');
  const [dashDate, setDashDate] = useState('Today');
  const [affirm, setAffirm] = useState('');
  const [tip, setTip] = useState(DASH_TIPS[0]);
  const [resetStr, setResetStr] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pro = plan === 'pro';

  // Date-derived, client-only bits (avoids hydration mismatch).
  useEffect(() => {
    try {
      setDashDate(new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }));
    } catch {
      /* ignore */
    }
    const dateIdx = new Date().getDate();
    setAffirm(AFFIRMATIONS[dateIdx % AFFIRMATIONS.length]);
    setTip(DASH_TIPS[dateIdx % DASH_TIPS.length]);
  }, []);

  useEffect(() => {
    const now = new Date();
    const mid = new Date(now);
    mid.setHours(24, 0, 0, 0);
    const hrs = Math.ceil((mid.getTime() - now.getTime()) / 3600000);
    setResetStr(hrs <= 1 ? t('dash.resetSoon') : t('dash.resetHours', { h: hrs }));
  }, [usageCount, t]);

  // Derived stats + distribution.
  useEffect(() => {
    let streak = 0;
    const d = new Date();
    if (!moods[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (moods[dayKey(d)]) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    const keys = Object.keys(moods);
    const vals: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const dd = new Date();
      dd.setDate(dd.getDate() - i);
      const e = moods[dayKey(dd)];
      if (e) vals.push(e.v);
    }
    const avg7 = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    const breathLabel = breath.s < 60 ? `${breath.s}s` : `${Math.round(breath.s / 60)}m`;
    const counts: Partial<Record<MoodName, number>> = {};
    let total = 0;
    keys.forEach((k) => {
      const m = moods[k].m;
      if (MOOD_META[m]) {
        counts[m] = (counts[m] || 0) + 1;
        total++;
      }
    });
    const dist: DistRow[] = (Object.keys(MOOD_META) as MoodName[])
      .filter((m) => counts[m])
      .map((m) => ({ mood: m, count: counts[m]!, pct: Math.round((counts[m]! / total) * 100) }));
    setView({ streak, total: keys.length, avg7, breathLabel, dist });
  }, [moods, breath]);

  // Trend canvas.
  const redraw = useCallback(() => {
    if (canvasRef.current) drawTrend(canvasRef.current, moods, t('dash.trendEmpty'));
  }, [moods, t]);

  useEffect(() => {
    redraw();
    let to: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(to);
      to = setTimeout(redraw, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(to);
      window.removeEventListener('resize', onResize);
    };
  }, [redraw]);

  const onSaveJournal = () => {
    if (saveJournal(jInput)) {
      setJInput('');
      toast(t('toast.journalSaved'));
    } else {
      toast(t('toast.writeFirst'));
    }
  };

  const onExport = () => {
    const keys = Object.keys(moods).sort();
    if (!keys.length) {
      toast(t('toast.nothingExport'));
      return;
    }
    const rows = ['date,mood,clarity'];
    keys.forEach((k) => rows.push(`${k},${moods[k].m},${moods[k].v}`));
    try {
      const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'aura-mood-history.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast(t('toast.exported'));
    } catch {
      toast(t('toast.exportUnsupported'));
    }
  };

  const usagePct = pro ? 100 : Math.min(100, Math.round((usageCount / CHAT_LIMIT) * 100));
  const usageText = !mounted
    ? t('dash.usageInit', { limit: CHAT_LIMIT })
    : pro
      ? t('dash.usagePro')
      : t('dash.usageFree', { n: usageCount, limit: CHAT_LIMIT, reset: resetStr });

  return (
    <section id="dashboard">
      <div className="wrap">
        <div className="sec-head rv" style={{ marginBottom: 0 }}>
          <span className="eyebrow">{t('dash.eyebrow')}</span>
        </div>
        <div className="dash-head-row rv">
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: t('dash.headingHtml') }} />
            <p className="lede" style={{ marginTop: 12 }}>
              {t('dash.lede')}
            </p>
          </div>
          <span className="dash-date">{mounted ? dashDate : t('dash.today')}</span>
        </div>

        <div className="panel rv usage-panel" style={{ borderRadius: 22 }}>
          <div className="usage-info">
            <div className="usage-top">
              <b>{t('dash.usageTitle')}</b>
              <span>{usageText}</span>
            </div>
            <div className="usage-bar">
              <i className={!pro && chatsLeft <= 2 ? 'warn' : undefined} style={{ width: `${usagePct}%` }} />
            </div>
          </div>
          <span className={`plan-badge${pro ? ' pro' : ''}`}>{pro ? t('dash.planPro') : t('dash.planFree')}</span>
          <button className="btn btn-pri" style={{ padding: '11px 22px', fontSize: '.88rem' }} onClick={openUpgrade}>
            {pro ? t('dash.manage') : t('dash.upgrade')}
          </button>
        </div>

        <div className="dash-stats rv">
          <div className="dstat">
            <small>{t('dash.stat.streak')}</small>
            <b>{view.streak}</b>
            <span>{t('dash.stat.streakSub')}</span>
          </div>
          <div className="dstat">
            <small>{t('dash.stat.checkins')}</small>
            <b>{view.total}</b>
            <span>{t('dash.stat.checkinsSub')}</span>
          </div>
          <div className="dstat">
            <small>{t('dash.stat.clarity')}</small>
            <b>{view.avg7 !== null ? `${view.avg7}%` : '—'}</b>
            <span>{t('dash.stat.claritySub')}</span>
          </div>
          <div className="dstat">
            <small>{t('dash.stat.breathing')}</small>
            <b>{view.breathLabel}</b>
            <span>{t('dash.stat.breathingSub')}</span>
          </div>
        </div>

        <div className="dash-grid rv">
          <div className="dash-panel">
            <h3>{t('dash.trendHeading')}</h3>
            <div className="trend-wrap">
              <canvas ref={canvasRef} />
            </div>
          </div>
          <div className="dash-panel">
            <h3>{t('dash.distHeading')}</h3>
            <div className="dist">
              {view.dist.length === 0 ? (
                <div className="dash-empty">{t('dash.distEmpty')}</div>
              ) : (
                view.dist.map((row) => (
                  <div className="dist-row" key={row.mood}>
                    <span className="dn">
                      {MOOD_META[row.mood].emoji} {t(`mood.${row.mood}`)}
                    </span>
                    <span className="db">
                      <i style={{ width: `${row.pct}%` }} />
                    </span>
                    <span className="dv">{row.count}</span>
                  </div>
                ))
              )}
            </div>
            <div className="dash-tip">{tip}</div>
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16, padding: 12 }} onClick={onExport}>
              {t('dash.export')}
            </button>
          </div>
        </div>

        <div className="dash-grid rv" style={{ marginTop: 18 }}>
          <div className="dash-panel">
            <h3>{t('dash.journalHeading')}</h3>
            <textarea
              className="journal-in"
              placeholder={t('dash.journalPlaceholder')}
              maxLength={2000}
              value={jInput}
              onChange={(e) => setJInput(e.target.value)}
            />
            <button className="btn btn-pri" style={{ marginTop: 12, padding: '11px 24px', fontSize: '.9rem' }} onClick={onSaveJournal}>
              {t('dash.journalSave')}
            </button>
            <div className="j-entries">
              {journal.slice(0, 5).map((en, idx) => (
                <div className="j-entry" key={`${en.d}-${idx}`}>
                  <small>
                    <span>{en.d}</span>
                    <button
                      onClick={() => {
                        deleteJournal(idx);
                        toast(t('toast.journalDeleted'));
                      }}
                    >
                      {t('dash.journalDelete')}
                    </button>
                  </small>
                  <p>{en.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-panel">
            <h3>{t('dash.affirmHeading')}</h3>
            <div className="affirm">{affirm}</div>
            <div className="dash-tip" style={{ marginTop: 8 }}>
              {t('dash.affirmSub')}
            </div>
            <h3 style={{ marginTop: 26 }}>{t('dash.remindHeading')}</h3>
            <p style={{ color: 'var(--mut)', fontSize: '.9rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t('dash.remindBody')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
