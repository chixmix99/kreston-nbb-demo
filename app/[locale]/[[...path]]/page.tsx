import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, pick, localPath, type Locale } from '@/lib/content/types';
import { contentRepository } from '@/lib/content/repository';
import { t } from '@/lib/i18n';
import { HomePage, ServicesPage, ServicePage, AboutPage, InsightsPage, ArticlePage, ContactPage, CareersPage, PrivacyPage } from '@/components/pages';

type Params = { locale: string; path?: string[] };
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const [services, insights] = await Promise.all([contentRepository.listServices(params.locale), contentRepository.listInsights(params.locale)]);
  return [
    { path: [] }, ...['about', 'services', 'insights', 'contact', 'careers', 'privacy'].map(path => ({ path: [path] })),
    ...services.map(service => ({ path: ['services', service.slug] })),
    ...insights.map(insight => ({ path: ['insights', insight.slug] })),
  ];
}
async function resolveMetadata(locale: Locale, path: string[]) {
  const route = path.join('/');
  if (path.length === 2 && path[0] === 'services') {
    const service = await contentRepository.getService(locale, path[1]);
    if (service) return { title: pick(service.name, locale), description: pick(service.summary, locale) };
  }
  if (path.length === 2 && path[0] === 'insights') {
    const insight = await contentRepository.getInsight(locale, path[1]);
    if (insight) return { title: pick(insight.title, locale), description: pick(insight.summary, locale) };
  }
  const titles: Record<string, string> = {
    '': t(locale, 'Saudi insight. Confident decisions.', 'رؤية سعودية. قرارات واثقة.'),
    about: t(locale, 'Our firm', 'عن الشركة'),
    services: t(locale, 'Our expertise', 'خبراتنا'),
    insights: t(locale, 'Perspectives', 'رؤى'),
    contact: t(locale, 'Let’s talk', 'لنتحدث'),
    careers: t(locale, 'Careers', 'الوظائف'),
    privacy: t(locale, 'Privacy & demo information', 'الخصوصية ومعلومات النسخة التجريبية'),
  };
  return { title: titles[route] || t(locale, 'Page not found', 'الصفحة غير موجودة'), description: t(locale, 'Audit, tax and advisory expertise for the decisions that move your business forward in Saudi Arabia.', 'خبرات المراجعة والضرائب والاستشارات للقرارات التي تدفع أعمالك إلى الأمام في المملكة العربية السعودية.') };
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, path = [] } = await params;
  if (!isLocale(locale)) return {};
  const meta = await resolveMetadata(locale, path);
  return { ...meta, alternates: { canonical: localPath(locale, path.join('/')), languages: { 'en-SA': localPath('en', path.join('/')), 'ar-SA': localPath('ar', path.join('/')) } }, openGraph: { ...meta, locale: locale === 'ar' ? 'ar_SA' : 'en_SA', type: 'website', images: [{ url: '/images/riyadh.jpg', width: 2200, height: 1100 }] } };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, path = [] } = await params;
  if (!isLocale(locale)) notFound();
  const [services, insights] = await Promise.all([contentRepository.listServices(locale), contentRepository.listInsights(locale)]);
  const route = path.join('/');
  if (!route) return <HomePage locale={locale} services={services} insights={insights}/>;
  if (route === 'services') return <ServicesPage locale={locale} services={services}/>;
  if (route === 'about') return <AboutPage locale={locale}/>;
  if (route === 'insights') return <InsightsPage locale={locale} insights={insights}/>;
  if (route === 'contact') return <ContactPage locale={locale} services={services}/>;
  if (route === 'careers') return <CareersPage locale={locale}/>;
  if (route === 'privacy') return <PrivacyPage locale={locale}/>;
  if (path.length === 2 && path[0] === 'services') {
    const service = await contentRepository.getService(locale, path[1]);
    if (service) return <ServicePage locale={locale} service={service} services={services} insights={insights}/>;
  }
  if (path.length === 2 && path[0] === 'insights') {
    const insight = await contentRepository.getInsight(locale, path[1]);
    if (insight) return <ArticlePage locale={locale} insight={insight}/>;
  }
  notFound();
}
