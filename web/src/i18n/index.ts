import polyglotI18nProvider from 'ra-i18n-polyglot';
import zhCN from './zh-CN';
import enUS from './en-US';
import trTR from './tr-TR';

const translations = {
  'tr-TR': trTR,
  'en-US': enUS,
  'zh-CN': zhCN,
};

/** Desteklenen diller (menülerde bu sırayla listelenir). */
export const LOCALES = [
  { locale: 'tr-TR', name: 'Türkçe' },
  { locale: 'en-US', name: 'English' },
  { locale: 'zh-CN', name: '简体中文' },
] as const;

export const DEFAULT_LOCALE = 'tr-TR';

// localStorage'daki seçili dil; yoksa varsayılan Türkçe.
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale');
  return savedLocale && translations[savedLocale as keyof typeof translations]
    ? savedLocale
    : DEFAULT_LOCALE;
};

const baseI18nProvider = polyglotI18nProvider(
  (locale) => translations[locale as keyof typeof translations] || translations[DEFAULT_LOCALE],
  getDefaultLocale(),
  LOCALES.map((l) => ({ locale: l.locale, name: l.name })),
  { allowMissing: true }
);

// Dil değişince localStorage'a yaz (sonraki açılışta korunur).
export const i18nProvider = {
  ...baseI18nProvider,
  changeLocale: (locale: string) => {
    localStorage.setItem('locale', locale);
    return baseI18nProvider.changeLocale(locale);
  },
};
