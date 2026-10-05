import type { Locale } from './content/types';
export const t = (locale: Locale, english: string, arabic: string) => locale === 'ar' ? arabic : english;
export const navigation = (locale: Locale) => [
  { path: 'about', label: t(locale, 'Our firm', 'عن الشركة') },
  { path: 'services', label: t(locale, 'Our expertise', 'خبراتنا') },
  { path: 'insights', label: t(locale, 'Perspectives', 'رؤى') },
  { path: 'careers', label: t(locale, 'Careers', 'الوظائف') },
];

