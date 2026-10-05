export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => value === 'en' || value === 'ar';
export type Copy = { en: string; ar: string };
export type Service = {
  id: string; legacyId: string; slug: string; number: string;
  name: Copy; short: Copy; summary: Copy; introduction: Copy;
  offerings: { name: Copy; description: Copy }[];
};
export type Insight = {
  slug: string; category: 'business' | 'audit' | 'advisory'; image: string;
  title: Copy; summary: Copy; sections: { title: Copy; body: Copy }[];
};
export const pick = (value: Copy, locale: Locale): string => value[locale];
export const localPath = (locale: Locale, path = '') => '/' + locale + (path ? '/' + path.replace(/^\//, '') : '');

