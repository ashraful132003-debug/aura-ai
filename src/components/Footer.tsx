'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="logo" href="#top">
              <span className="logo-orb" />
              Aura AI
            </a>
            <p>{t('footer.brand')}</p>
          </div>
          <div>
            <h4>{t('footer.featuresH')}</h4>
            <ul>
              <li><a href="#chat">{t('nav.chat')}</a></li>
              <li><a href="#soundscape">{t('nav.soundscapes')}</a></li>
              <li><a href="#mood">{t('nav.moodLong')}</a></li>
              <li><a href="#breathing">{t('breath.eyebrow')}</a></li>
              <li><a href="#dashboard">{t('nav.dashboard')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.aboutH')}</h4>
            <ul>
              <li><a href="#about">{t('footer.aboutStory')}</a></li>
              <li><a href="#safety">{t('safety.eyebrow')}</a></li>
              <li><a href="#features">{t('footer.aboutOffer')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.supportH')}</h4>
            <ul>
              <li><a href="#safety">{t('footer.supportCrisis')}</a></li>
              <li><a href="#chat">{t('nav.chat')}</a></li>
              <li><a href="#pricing">{t('nav.pricing')}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>{t('footer.copyright')}</span>
          <nav>
            <a href="#safety">{t('footer.privacy')}</a>
            <a href="#safety">{t('nav.safety')}</a>
            <a href="#about">{t('footer.aboutH')}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
