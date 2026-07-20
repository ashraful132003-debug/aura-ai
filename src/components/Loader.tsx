'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Loader() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let removeTimer: ReturnType<typeof setTimeout>;
    const hide = () => {
      setHidden(true);
      removeTimer = setTimeout(() => setRemoved(true), 700);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);
    const fallback = setTimeout(hide, 2200);
    return () => {
      clearTimeout(removeTimer);
      clearTimeout(fallback);
      window.removeEventListener('load', hide);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="loader" className={hidden ? 'hide' : undefined} aria-hidden="true">
      <div className="lorb" />
      <span>{t('loader.brand')}</span>
    </div>
  );
}
