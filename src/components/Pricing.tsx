'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { useAppState } from './providers/AppStateProvider';
import { useModal } from './providers/ModalProvider';
import { useToast } from './providers/ToastProvider';

export default function Pricing() {
  const { t } = useI18n();
  const { plan } = useAppState();
  const { openUpgrade } = useModal();
  const { toast } = useToast();

  const onFree = () => {
    if (plan === 'pro') openUpgrade();
    else toast(t('toast.alreadyFree'));
  };

  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head rv" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('pricing.eyebrow')}
          </span>
          <h2 dangerouslySetInnerHTML={{ __html: t('pricing.headingHtml') }} />
          <p className="lede" style={{ margin: '16px auto 0' }}>
            {t('pricing.lede')}
          </p>
        </div>
        <div className="plans">
          <div className="plan rv">
            <h3>{t('pricing.free')}</h3>
            <div className="price">
              ₹0<small>{t('pricing.freePeriod')}</small>
            </div>
            <ul>
              <li>{t('pricing.free1')}</li>
              <li>{t('pricing.free2')}</li>
              <li>{t('pricing.free3')}</li>
              <li>{t('pricing.free4')}</li>
              <li className="off">{t('pricing.free5')}</li>
              <li className="off">{t('pricing.free6')}</li>
            </ul>
            <button className="btn btn-ghost" onClick={onFree}>
              {t('pricing.freeBtn')}
            </button>
          </div>
          <div className="plan hot rv">
            <span className="flag">{t('pricing.popular')}</span>
            <h3>{t('pricing.monthly')}</h3>
            <div className="price">
              ₹299<small>{t('pricing.monthlyPeriod')}</small>
            </div>
            <ul>
              <li>{t('pricing.monthly1')}</li>
              <li>{t('pricing.monthly2')}</li>
              <li>{t('pricing.monthly3')}</li>
              <li>{t('pricing.monthly4')}</li>
              <li>{t('pricing.monthly5')}</li>
              <li>{t('pricing.monthly6')}</li>
            </ul>
            <button className="btn btn-pri" onClick={openUpgrade}>
              {t('pricing.monthlyBtn')}
            </button>
          </div>
          <div className="plan rv">
            <span className="flag" style={{ background: 'var(--panel-2)', color: 'var(--teal)', border: '1px solid var(--line-2)' }}>
              {t('pricing.save')}
            </span>
            <h3>{t('pricing.yearly')}</h3>
            <div className="price">
              ₹2,499<small>{t('pricing.yearlyPeriod')}</small>
            </div>
            <ul>
              <li>{t('pricing.yearly1')}</li>
              <li>{t('pricing.yearly2')}</li>
              <li>{t('pricing.yearly3')}</li>
              <li>{t('pricing.yearly4')}</li>
              <li>{t('pricing.yearly5')}</li>
            </ul>
            <button className="btn btn-ghost" onClick={openUpgrade}>
              {t('pricing.yearlyBtn')}
            </button>
          </div>
        </div>
        <p className="pay-note">{t('pricing.note')}</p>
      </div>
    </section>
  );
}
