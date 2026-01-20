"use client";

import { useEffect } from 'react';
import i18n from '../lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect language from localStorage or browser
    const storedLang = localStorage.getItem('i18nextLng');
    const browserLang = navigator.language.split('-')[0];

    const lang = storedLang || (browserLang === 'bg' ? 'bg' : 'en');

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return <>{children}</>;
}