'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-tag rv">
            <span className="dot" />
            <span>{t('hero.tag')}</span>
          </div>
          <h1 className="rv" dangerouslySetInnerHTML={{ __html: t('hero.h1Html') }} />
          <p className="lede rv">{t('hero.lede')}</p>
          <div className="hero-cta rv">
            <a className="btn btn-pri" href="#chat">
              💬 <span>{t('hero.talk')}</span>
            </a>
            <a className="btn btn-ghost" href="#soundscape">
              🎧 <span>{t('hero.explore')}</span>
            </a>
          </div>
          <div className="trust rv">
            <span>{t('hero.trust1')}</span>
            <span>{t('hero.trust2')}</span>
            <span>{t('hero.trust3')}</span>
            <span>{t('hero.trust4')}</span>
          </div>
        </div>
        <div className="hero-orbspace" aria-hidden="true" />
      </div>
    </section>
  );
}
