'use client';
import { useState } from 'react';
import { type Locale, type Insight, pick } from '@/lib/content/types';
import { t } from '@/lib/i18n';
import { InsightCard } from './shared';
export function InsightBrowser({ insights, locale }: { insights: Insight[]; locale: Locale }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const categories = [{ key: 'all', label: t(locale, 'All perspectives', 'جميع الرؤى') }, { key: 'business', label: t(locale, 'Business', 'الأعمال') }, { key: 'audit', label: t(locale, 'Audit', 'المراجعة') }, { key: 'advisory', label: t(locale, 'Advisory', 'الاستشارات') }];
  const visible = insights.filter(item => (filter === 'all' || filter === item.category) && (pick(item.title, locale) + ' ' + pick(item.summary, locale)).toLowerCase().includes(query.toLowerCase().trim()));
  return <><div className="insight-toolbar"><div className="filter-buttons" aria-label={t(locale, 'Filter perspectives', 'تصفية الرؤى')}>{categories.map(category => <button type="button" key={category.key} aria-pressed={category.key === filter} onClick={() => setFilter(category.key)}>{category.label}</button>)}</div><label className="insight-search"><span className="sr-only">{t(locale, 'Search perspectives', 'البحث في الرؤى')}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t(locale, 'Find a perspective', 'ابحث عن رؤية')} /><span aria-hidden="true">⌕</span></label></div><p className="result-count" role="status">{locale === 'en' ? visible.length + (visible.length === 1 ? ' perspective' : ' perspectives') : 'عدد النتائج: ' + visible.length}</p>{visible.length ? <div className="insight-grid">{visible.map(item => <InsightCard key={item.slug} insight={item} locale={locale} />)}</div> : <div className="empty-state"><h2>{t(locale, 'A different perspective?', 'هل تبحث عن رؤية أخرى؟')}</h2><p>{t(locale, 'Try another phrase, or explore all our perspectives.', 'جرّب عبارة أخرى أو استعرض جميع الرؤى.')}</p><button className="button" onClick={() => { setFilter('all'); setQuery(''); }}>{t(locale, 'Reset filters', 'إعادة ضبط التصفية')}</button></div>}</>;
}

