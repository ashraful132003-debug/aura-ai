'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

type LevelKey = 'rain' | 'wind' | 'ocean' | 'fire';
type Levels = Record<LevelKey, number>;

interface Layer {
  gain: GainNode;
}

const SCALE: Levels = { rain: 0.55, wind: 0.8, ocean: 0.7, fire: 0.5 };

function fillStyle(value: number): React.CSSProperties {
  return { ['--fill' as string]: `${value}%` } as React.CSSProperties;
}

export default function Soundscape() {
  const { t } = useI18n();
  const [levels, setLevels] = useState<Levels>({ rain: 0, wind: 0, ocean: 0, fire: 0 });
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const layersRef = useRef<Record<LevelKey, Layer> | null>(null);
  const fireTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const levelsRef = useRef<Levels>(levels);
  const playingRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    levelsRef.current = levels;
  }, [levels]);

  const applyLevels = useCallback((l: Levels) => {
    const ctx = ctxRef.current;
    const layers = layersRef.current;
    if (!ctx || !layers) return;
    const now = ctx.currentTime;
    (Object.keys(SCALE) as LevelKey[]).forEach((k) => {
      layers[k].gain.gain.setTargetAtTime((l[k] / 100) * SCALE[k], now, 0.12);
    });
  }, []);

  const initAudio = useCallback((): boolean => {
    if (ctxRef.current) return true;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return false;
    try {
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = 0.9;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      master.connect(analyser);
      analyser.connect(ctx.destination);

      const noiseLen = ctx.sampleRate * 2;
      const noise = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const nd = noise.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) nd[i] = Math.random() * 2 - 1;

      const makeLayer = (setup: (src: AudioBufferSourceNode, g: GainNode) => void): Layer => {
        const src = ctx.createBufferSource();
        src.buffer = noise;
        src.loop = true;
        const g = ctx.createGain();
        g.gain.value = 0;
        setup(src, g);
        src.start();
        return { gain: g };
      };

      const layers: Record<LevelKey, Layer> = {
        rain: makeLayer((src, g) => {
          const hp = ctx.createBiquadFilter();
          hp.type = 'highpass';
          hp.frequency.value = 500;
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 6500;
          src.connect(hp);
          hp.connect(lp);
          lp.connect(g);
          g.connect(master);
        }),
        wind: makeLayer((src, g) => {
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 320;
          lp.Q.value = 1.4;
          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.12;
          const depth = ctx.createGain();
          depth.gain.value = 170;
          lfo.connect(depth);
          depth.connect(lp.frequency);
          lfo.start();
          src.connect(lp);
          lp.connect(g);
          g.connect(master);
        }),
        ocean: makeLayer((src, g) => {
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 650;
          const swell = ctx.createGain();
          swell.gain.value = 0.6;
          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.08;
          const depth = ctx.createGain();
          depth.gain.value = 0.4;
          lfo.connect(depth);
          depth.connect(swell.gain);
          lfo.start();
          src.connect(lp);
          lp.connect(swell);
          swell.connect(g);
          g.connect(master);
        }),
        fire: makeLayer((src, g) => {
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 420;
          src.connect(lp);
          lp.connect(g);
          g.connect(master);
        }),
      };

      fireTimerRef.current = setInterval(() => {
        if (!playingRef.current) return;
        const lvl = levelsRef.current.fire / 100;
        if (lvl <= 0) return;
        if (Math.random() > 0.55) return;
        const b = ctx.createBufferSource();
        b.buffer = noise;
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 2200 + Math.random() * 2500;
        bp.Q.value = 8;
        const cg = ctx.createGain();
        const t0 = ctx.currentTime;
        cg.gain.setValueAtTime(0, t0);
        cg.gain.linearRampToValueAtTime(lvl * (0.25 + Math.random() * 0.4), t0 + 0.005);
        cg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06 + Math.random() * 0.05);
        b.connect(bp);
        bp.connect(cg);
        cg.connect(master);
        b.start(t0);
        b.stop(t0 + 0.15);
      }, 130);

      ctxRef.current = ctx;
      masterRef.current = master;
      analyserRef.current = analyser;
      layersRef.current = layers;
      return true;
    } catch {
      ctxRef.current = null;
      return false;
    }
  }, []);

  const togglePlay = useCallback(
    (force?: boolean) => {
      if (!initAudio()) {
        setUnavailable(true);
        return;
      }
      const next = force !== undefined ? force : !playingRef.current;
      const ctx = ctxRef.current!;
      if (next) {
        void ctx.resume();
        let l = levelsRef.current;
        if (l.rain === 0 && l.wind === 0 && l.ocean === 0 && l.fire === 0) {
          l = { rain: 45, wind: 20, ocean: 0, fire: 0 };
          setLevels(l);
          levelsRef.current = l;
        }
        applyLevels(l);
      } else {
        const layers = layersRef.current!;
        (Object.keys(layers) as LevelKey[]).forEach((k) => {
          layers[k].gain.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
        });
      }
      playingRef.current = next;
      setPlaying(next);
    },
    [applyLevels, initAudio],
  );

  const onSlider = (key: LevelKey, value: number) => {
    const l = { ...levelsRef.current, [key]: value };
    setLevels(l);
    levelsRef.current = l;
    if (playingRef.current) applyLevels(l);
  };

  const onPreset = () => {
    const l: Levels = { rain: 55, wind: 25, ocean: 35, fire: 12 };
    setLevels(l);
    levelsRef.current = l;
    togglePlay(true);
  };

  // Visualizer
  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv?.getContext('2d');
    if (!cv || !cx) return;
    const size = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      cv.width = r.width * (window.devicePixelRatio || 1);
      cv.height = r.height * (window.devicePixelRatio || 1);
    };
    size();
    window.addEventListener('resize', size);
    let raf = 0;
    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return;
      const t0 = ts / 1000;
      const W = cv.width;
      const H = cv.height;
      cx.clearRect(0, 0, W, H);
      const grad = cx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, '#6EE7D8');
      grad.addColorStop(1, '#A78BFA');
      const analyser = analyserRef.current;
      if (playingRef.current && analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const n = 48;
        const bw = W / n;
        cx.fillStyle = grad;
        for (let i = 0; i < n; i++) {
          const v = data[Math.floor((i * data.length) / n)] / 255;
          const h = Math.max(3, v * H * 0.85);
          cx.globalAlpha = 0.35 + v * 0.6;
          cx.fillRect(i * bw + bw * 0.18, (H - h) / 2, bw * 0.64, h);
        }
        cx.globalAlpha = 1;
      } else {
        cx.strokeStyle = grad;
        cx.lineWidth = 2 * (window.devicePixelRatio || 1);
        cx.globalAlpha = 0.55;
        cx.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = H / 2 + Math.sin((x / W) * 6 + t0 * 1.4) * H * 0.14 * Math.sin(t0 * 0.7 + (x / W) * 2);
          if (x === 0) cx.moveTo(x, y);
          else cx.lineTo(x, y);
        }
        cx.stroke();
        cx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  // Cleanup audio on unmount
  useEffect(
    () => () => {
      if (fireTimerRef.current) clearInterval(fireTimerRef.current);
      if (ctxRef.current) void ctxRef.current.close();
    },
    [],
  );

  const rows: { key: LevelKey; label: string }[] = [
    { key: 'rain', label: t('sound.rain') },
    { key: 'wind', label: t('sound.wind') },
    { key: 'ocean', label: t('sound.ocean') },
    { key: 'fire', label: t('sound.fire') },
  ];

  return (
    <section id="soundscape">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('sound.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('sound.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('sound.lede')}
          </p>
        </div>
        <div className="panel rv">
          <div className="viz">
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
          </div>
          {rows.map((row) => (
            <div className="mix-row" key={row.key}>
              <span className="lbl">{row.label}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={levels[row.key]}
                aria-label={row.label}
                style={fillStyle(levels[row.key])}
                onChange={(e) => onSlider(row.key, Number(e.target.value))}
              />
              <span className="val">{levels[row.key]}%</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
            <button className="btn btn-pri" onClick={() => togglePlay()}>
              {unavailable ? t('sound.unavailable') : playing ? t('sound.pause') : t('sound.generate')}
            </button>
            <button className="btn btn-ghost" onClick={onPreset}>
              {t('sound.preset')}
            </button>
          </div>
          <p className="note">{t('sound.note')}</p>
        </div>
      </div>
    </section>
  );
}
