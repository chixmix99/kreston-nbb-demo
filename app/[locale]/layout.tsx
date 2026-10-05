import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/content/types';
import { contentRepository } from '@/lib/content/repository';
import { t } from '@/lib/i18n';
import { Header } from '@/components/header';
import { Footer } from '@/components/shared';
import '../globals.css';

const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-inter', display: 'swap', weight: '100 900' });
const arabic = localFont({ src: '../../node_modules/@fontsource-variable/noto-sans-arabic/files/noto-sans-arabic-arabic-wght-normal.woff2', variable: '--font-arabic', display: 'swap', weight: '100 900', preload: false });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'http://localhost:3000'),
  title: { default: 'Kreston NBB Saudi | A clearer perspective', template: '%s | Kreston NBB Saudi' },
  description: 'Audit, tax and advisory expertise for business decisions in Saudi Arabia.',
  robots: { index: false, follow: false },
  icons: { icon: '/images/kreston-nbb.png' },
};
export function generateStaticParams() { return [{ locale: 'en' }, { locale: 'ar' }]; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const services = await contentRepository.listServices(locale);
  return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={inter.variable + ' ' + arabic.variable}><body><a className="skip-link" href="#main">{t(locale, 'Skip to content', 'انتقل إلى المحتوى')}</a><Header locale={locale} /><main id="main">{children}</main><Footer locale={locale} services={services} /></body></html>;
}
