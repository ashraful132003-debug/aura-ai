'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BREATH_PATTERNS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { useAppState } from './providers/AppStateProvider';

export default function Breathing() {
  const { t } = useI18n();
  const { recordBreath } = useAppState();

  const [selected, setSelected] = useState(0);
  const [running, setRunning] = useState(false);

  const orbRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const progRef = useRef<SVGCircleElement>(null);
  const timeRef = useRef<HTMLElement>(null);
  const cyclesRef = useRef<HTMLElement>(null);

  const patRef = useRef<number[]>(BREATH_PATTERNS[0].seq.slice());
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);
  const runningRef = useRef(false);
  const phaseNamesRef = useRef<string[]>([]);

  // Keep translated phase names current for the ref-driven animation loop.
  useEffect(() => {
    phaseNamesRef.current = [
      t('breath.phase.inhale'),
      t('breath.phase.hold'),
      t('breath.phase.exhale'),
      t('breath.phase.hold'),
    ];
    if (!runningRef.current && phaseRef.current) phaseRef.current.textContent = t('breath.ready');
  }, [t]);

  const tick = useCallback((now: number) => {
    if (!runningRef.current) return;
    const el = (now - startRef.current) / 1000;
    elapsedRef.current = el;
    const pat = patRef.current;
    const total = pat.reduce((a, b) => a + b, 0);
    const tt = el % total;
    let acc = 0;
    let idx = 0;
    let ph = 0;
    for (let i = 0; i < 4; i++) {
      if (pat[i] === 0) continue;
      if (tt < acc + pat[i]) {
        idx = i;
        ph = (tt - acc) / pat[i];
        break;
      }
      acc += pat[i];
    }
    if (phaseRef.current) phaseRef.current.textContent = phaseNamesRef.current[idx];
    let s: number;
    if (idx === 0) s = 0.72 + ph * 0.42;
    else if (idx === 1) s = 1.14;
    else if (idx === 2) s = 1.14 - ph * 0.42;
    else s = 0.72;
    if (orbRef.current) orbRef.current.style.transform = `scale(${s.toFixed(3)})`;
    if (progRef.current) progRef.current.style.strokeDashoffset = (289 * (1 - tt / total)).toFixed(1);
    if (timeRef.current) timeRef.current.textContent = `${Math.floor(el)}s`;
    if (cyclesRef.current) cyclesRef.current.textContent = `${Math.floor(el / total)}`;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
    if (elapsedRef.current > 3) recordBreath(elapsedRef.current);
    elapsedRef.current = 0;
    if (phaseRef.current) phaseRef.current.textContent = t('breath.ready');
    if (orbRef.current) orbRef.current.style.transform = 'scale(1)';
    if (progRef.current) progRef.current.style.strokeDashoffset = '289';
  }, [recordBreath, t]);

  const start = useCallback(() => {
    runningRef.current = true;
    setRunning(true);
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onSelect = (i: number) => {
    setSelected(i);
    patRef.current = BREATH_PATTERNS[i].seq.slice();
    if (runningRef.current) startRef.current = performance.now();
  };

  return (
    <section id="breathing">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('breath.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('breath.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('breath.lede')}
          </p>
        </div>
        <div className="split" style={{ alignItems: 'center' }}>
          <div className="bpatterns rv">
            {BREATH_PATTERNS.map((p, i) => (
              <button key={p.key} className={`bpat${selected === i ? ' sel' : ''}`} onClick={() => onSelect(i)}>
                <span>
                  <b>{t(`breath.${p.key}.title`)}</b>
                  <p>{t(`breath.${p.key}.body`)}</p>
                </span>
                <span className="seq">{p.seq.filter((x) => x > 0).join('·')}</span>
              </button>
            ))}
            <p className="note">{t('breath.note')}</p>
          </div>
          <div className="panel rv">
            <div className="breath-stage">
              <div className="borb-wrap">
                <svg className="borb-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <linearGradient id="bgrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6EE7D8" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                  <circle className="track" cx="50" cy="50" r="46" />
                  <circle
                    className="prog"
                    ref={progRef}
                    cx="50"
                    cy="50"
                    r="46"
                    strokeDasharray="289"
                    strokeDashoffset="289"
                  />
                </svg>
                <div className="borb" ref={orbRef}>
                  <span className="phase" ref={phaseRef}>
                    {t('breath.ready')}
                  </span>
                </div>
              </div>
              <div className="bstats">
                <span>
                  ⏱ <b ref={timeRef}>0s</b>
                </span>
                <span>
                  🔁 <b ref={cyclesRef}>0</b> {t('breath.cycles')}
                </span>
              </div>
              <button className="btn btn-pri" onClick={() => (running ? stop() : start())}>
                {running ? t('breath.stop') : t('breath.start')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
