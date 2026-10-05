'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { t } from '@/lib/i18n';
export default function NotFound() {
  const params = useParams();
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  return <section className="shell not-found"><span className="eyebrow">404</span><h1>{t(locale, 'A different way forward.', 'لنبحث عن طريق آخر.')}</h1><p>{t(locale, 'We couldn’t find that page. Our expertise is a good place to start.', 'لم نعثر على هذه الصفحة. يمكنك البدء باستكشاف خبراتنا.')}</p><div className="button-group"><Link className="button" href={'/' + locale}>{t(locale, 'Back to home', 'العودة إلى الرئيسية')}</Link><Link className="text-link" href={'/' + locale + '/services'}>{t(locale, 'Explore our expertise', 'اكتشف خبراتنا')}</Link></div></section>;
}

