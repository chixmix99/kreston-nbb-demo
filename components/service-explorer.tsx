'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { localPath, pick, type Locale, type Service } from '@/lib/content/types';
import { t } from '@/lib/i18n';
import { Arrow, ArrowUp } from './icons';

export function ServiceExplorer({ services, locale }: { services: Service[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];
  return <div className="service-explorer">
    <div className="service-tabs" role="tablist" aria-orientation="vertical" aria-label={t(locale, 'Explore our services', 'اكتشف خدماتنا')}>
      {services.map((item, index) => <button key={item.id} id={'tab-' + item.id} role="tab" type="button" aria-selected={index === active} aria-controls={'panel-' + service.id} tabIndex={index === active ? 0 : -1} className={index === active ? 'active' : ''} ref={node => { refs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={event => {
        let next = index;
        if (event.key === 'ArrowDown') next = (index + 1) % services.length;
        else if (event.key === 'ArrowUp') next = (index + services.length - 1) % services.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = services.length - 1;
        else return;
        event.preventDefault(); setActive(next); refs.current[next]?.focus();
      }}><span className="mono">{item.number}</span><span>{pick(item.name, locale)}</span><ArrowUp /></button>)}
    </div>
    <div className="service-panel" id={'panel-' + service.id} role="tabpanel" aria-labelledby={'tab-' + service.id} tabIndex={0}>
      <div className="panel-top"><span className="mono">{service.number} / 06</span><span className="crosshair" aria-hidden="true">+</span></div>
      <h3>{pick(service.short, locale)}</h3><p>{pick(service.summary, locale)}</p>
      <ul>{service.offerings.slice(0, 3).map(offering => <li key={offering.name.en}>{pick(offering.name, locale)}</li>)}</ul>
      <Link className="text-link light" href={localPath(locale, 'services/' + service.slug)}>{t(locale, 'Explore this service', 'اكتشف هذه الخدمة')}<Arrow /></Link>
    </div>
  </div>;
}

