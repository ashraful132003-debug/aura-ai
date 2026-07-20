'use client';

import { HELPLINES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Safety() {
  const { t } = useI18n();
  return (
    <section id="safety">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('safety.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('safety.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('safety.lede')}
          </p>
        </div>
        <div className="safety-cols">
          <div className="panel rv">
            <h3>{t('safety.canHeading')}</h3>
            <ul className="slist">
              <li>{t('safety.can1')}</li>
              <li>{t('safety.can2')}</li>
              <li>{t('safety.can3')}</li>
              <li>{t('safety.can4')}</li>
              <li>{t('safety.can5')}</li>
            </ul>
          </div>
          <div className="panel rv">
            <h3>{t('safety.cantHeading')}</h3>
            <ul className="slist no">
              <li>{t('safety.cant1')}</li>
              <li>{t('safety.cant2')}</li>
              <li>{t('safety.cant3')}</li>
              <li>{t('safety.cant4')}</li>
              <li>{t('safety.cant5')}</li>
            </ul>
          </div>
        </div>
        <div className="panel crisis rv">
          <h3>{t('safety.crisisHeading')}</h3>
          <p style={{ color: 'var(--mut)', fontWeight: 300, marginTop: 8, fontSize: '.95rem' }}>
            {t('safety.crisisBody')}
          </p>
          <div className="helplines">
            {HELPLINES.map((region) => (
              <div className="hl" key={region.name}>
                <b>
                  {region.flag} {region.name}
                </b>
                {region.entries.map((e) => (
                  <a href={e.href} key={e.href + e.label}>
                    <span>{e.label}</span>
                    <span>{e.num}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
