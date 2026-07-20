'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

const ITEMS = ['1', '2', '3', '4', '5', '6'];

export default function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq">
      <div className="wrap">
        <div className="sec-head rv" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('faq.eyebrow')}
          </span>
          <h2 dangerouslySetInnerHTML={{ __html: t('faq.headingHtml') }} />
        </div>
        <div className="faq rv">
          {ITEMS.map((n) => (
            <details key={n}>
              <summary>{t(`faq.q${n}`)}</summary>
              <div className="fa-body">{t(`faq.a${n}`)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
