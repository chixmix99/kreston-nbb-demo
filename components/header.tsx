'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { localPath, type Locale } from '@/lib/content/types';
import { navigation, t } from '@/lib/i18n';
import { ArrowUp, Globe } from './icons';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const targetLocale = locale === 'en' ? 'ar' : 'en';
  const targetPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, '/' + targetLocale);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner shell">
      <Link className="brand" href={localPath(locale)} aria-label={t(locale, 'Kreston NBB Saudi — home', 'كريستون إن بي بي السعودية — الرئيسية')} onClick={() => setOpen(false)}>
        <Image src="/images/kreston-nbb.png" alt="Kreston NBB Saudi" width={1683} height={730} priority sizes="190px" />
      </Link>
      <nav className="desktop-nav" aria-label={t(locale, 'Main navigation', 'التنقل الرئيسي')}>
        {navigation(locale).map((item) => <Link key={item.path} href={localPath(locale, item.path)} aria-current={pathname.includes('/' + item.path) ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link className="language-link" href={targetPath} hrefLang={targetLocale} lang={targetLocale} aria-label={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'} onClick={() => setOpen(false)}><Globe /><span>{locale === 'en' ? 'العربية' : 'English'}</span></Link>
        <Link className="header-contact" href={localPath(locale, 'contact')}>{t(locale, 'Let’s talk', 'لنتحدث')}<ArrowUp /></Link>
        <button ref={trigger} className={'menu-toggle ' + (open ? 'is-open' : '')} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? t(locale, 'Close menu', 'إغلاق القائمة') : t(locale, 'Open menu', 'فتح القائمة')} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" hidden={!open} aria-label={t(locale, 'Mobile navigation', 'التنقل عبر الهاتف')}>
      {[...navigation(locale), { path: 'contact', label: t(locale, 'Contact', 'تواصل معنا') }].map((item, i) => <Link href={localPath(locale, item.path)} key={item.path} onClick={() => setOpen(false)}><span className="mono">{'0' + (i + 1)}</span>{item.label}<ArrowUp /></Link>)}
    </nav>
  </header>;
}

