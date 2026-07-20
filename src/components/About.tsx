'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export default function About() {
  const { t } = useI18n();
  return (
    <section id="about">
      <div className="wrap split">
        <div className="rv">
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('about.headingHtml') }} />
          <p className="lede" style={{ marginTop: 18 }} dangerouslySetInnerHTML={{ __html: t('about.p1Html') }} />
          <p className="lede" style={{ marginTop: 14 }}>
            {t('about.p2')}
          </p>
          <div className="about-vals">
            <div>{t('about.val1')}</div>
            <div>{t('about.val2')}</div>
            <div>{t('about.val3')}</div>
            <div>{t('about.val4')}</div>
          </div>
        </div>
        <div className="panel rv" style={{ textAlign: 'center', padding: 'clamp(32px,5vw,52px)' }}>
          <div className="logo" style={{ justifyContent: 'center', fontSize: '1.8rem' }}>
            <span className="logo-orb" style={{ width: 34, height: 34 }} />
            Aura AI
          </div>
          <p style={{ color: 'var(--mut)', fontWeight: 300, margin: '14px auto 0', maxWidth: '30ch' }}>
            {t('about.tagline')}
          </p>
          <div className="stats" style={{ justifyContent: 'center' }}>
            <div>
              <b>6</b>
              <small>{t('about.stat1')}</small>
            </div>
            <div>
              <b>4</b>
              <small>{t('about.stat2')}</small>
            </div>
            <div>
              <b>0</b>
              <small>{t('about.stat3')}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
