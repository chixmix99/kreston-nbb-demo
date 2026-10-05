import Image from 'next/image';
import Link from 'next/link';
import { localPath, pick, type Locale, type Service, type Insight } from '@/lib/content/types';
import { navigation, t } from '@/lib/i18n';
import { Arrow, ArrowUp, Globe } from './icons';

export function Eyebrow({ children, number }: { children: React.ReactNode; number?: string }) {
  return <div className="eyebrow">{number ? <span className="mono">{number}</span> : <span className="tiny-mark" aria-hidden="true" />}{children}</div>;
}
export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link href={href} className={'text-link ' + (light ? 'light' : '')}>{children}<Arrow /></Link>;
}
export function Breadcrumb({ locale, items }: { locale: Locale; items: { name: string; href?: string }[] }) {
  return <nav className="breadcrumb" aria-label={t(locale, 'Breadcrumb', 'مسار التنقل')}><Link href={localPath(locale)}>{t(locale, 'Home', 'الرئيسية')}</Link>{items.map((item, index) => <span key={index}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</span>)}</nav>;
}
export function PageIntro({ locale, label, title, summary, children }: { locale: Locale; label: string; title: string; summary: string; children?: React.ReactNode }) {
  return <section className="page-intro shell"><Breadcrumb locale={locale} items={[{ name: label }]} /><Eyebrow>{label}</Eyebrow><div className="intro-grid"><h1>{title}</h1><div className="intro-description"><p>{summary}</p>{children}</div></div></section>;
}
export function ContactBand({ locale }: { locale: Locale }) {
  return <section className="contact-band"><div className="shell contact-band-inner"><div><Eyebrow>{t(locale, 'Your next move', 'خطوتك القادمة')}</Eyebrow><h2>{t(locale, 'Good advice starts', 'المشورة الجيدة تبدأ')}<br />{t(locale, 'with a conversation.', 'بمحادثة.')}</h2></div><Link href={localPath(locale, 'contact')} className="circle-link" aria-label={t(locale, 'Request a consultation', 'طلب استشارة')}><ArrowUp /></Link><p>{t(locale, 'Tell us what you’re thinking about. We’ll help you find the right place to start.', 'أخبرنا بما يشغلك، وسنساعدك على تحديد نقطة البداية المناسبة.')}</p></div></section>;
}
export function Footer({ locale, services }: { locale: Locale; services: Service[] }) {
  return <footer className="footer"><div className="shell">
    <div className="footer-top"><Link href={localPath(locale)} aria-label={t(locale, 'Home', 'الرئيسية')}><Image src="/images/kreston-nbb.png" width={1683} height={730} sizes="210px" alt="Kreston NBB Saudi" className="footer-logo" /></Link><p>{t(locale, 'Local understanding.', 'فهم محلي.')}<br />{t(locale, 'A wider perspective.', 'ورؤية أوسع.')}</p></div>
    <div className="footer-grid"><div><span className="footer-label">{t(locale, 'Find your way', 'اكتشف المزيد')}</span>{[...navigation(locale), { path: 'contact', label: t(locale, 'Contact', 'تواصل معنا') }].map(item => <Link href={localPath(locale, item.path)} key={item.path}>{item.label}</Link>)}</div>
    <div><span className="footer-label">{t(locale, 'Our expertise', 'خبراتنا')}</span>{services.map(service => <Link href={localPath(locale, 'services/' + service.slug)} key={service.id}>{pick(service.name, locale)}</Link>)}</div>
    <div className="footer-location"><span className="footer-label">{t(locale, 'Rooted in Saudi Arabia', 'جذورنا في السعودية')}</span><p>{t(locale, 'Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية')}</p><TextLink href={localPath(locale, 'contact')}>{t(locale, 'Start a conversation', 'ابدأ محادثة')}</TextLink><div className="network-note"><Globe /><span>{t(locale, 'A member of the Kreston Global network.', 'عضو في شبكة كريستون العالمية.')}</span></div></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Kreston NBB Saudi</span><span>{t(locale, 'Website concept · Content subject to review', 'تصور للموقع · المحتوى خاضع للمراجعة')}</span><Link href={localPath(locale, 'privacy')}>{t(locale, 'Privacy & demo information', 'الخصوصية ومعلومات النسخة التجريبية')}</Link></div>
  </div></footer>;
}
export function InsightCard({ insight, locale, featured = false }: { insight: Insight; locale: Locale; featured?: boolean }) {
  const label = insight.category === 'business' ? t(locale, 'Business in Saudi Arabia', 'الأعمال في السعودية') : insight.category === 'audit' ? t(locale, 'Audit & assurance', 'المراجعة والتأكيد') : t(locale, 'Financial advisory', 'الاستشارات المالية');
  return <article className={'insight-card ' + (featured ? 'featured-insight' : '')}>
    <Link href={localPath(locale, 'insights/' + insight.slug)} className="insight-image" tabIndex={-1} aria-hidden="true"><Image src={insight.image} alt="" fill sizes={featured ? '(max-width: 700px) 100vw, 60vw' : '(max-width: 700px) 100vw, 40vw'} /><span className="image-arrow"><ArrowUp /></span></Link>
    <div className="insight-meta"><span>{label}</span><span>{t(locale, 'Perspective', 'رؤية')}</span></div>
    <h3><Link href={localPath(locale, 'insights/' + insight.slug)}>{pick(insight.title, locale)}</Link></h3><p>{pick(insight.summary, locale)}</p>
  </article>;
}

