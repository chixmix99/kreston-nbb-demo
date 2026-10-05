'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { localPath, pick, type Locale, type Service } from '@/lib/content/types';
import { t } from '@/lib/i18n';
import { validateEnquiry, type EnquiryValues, type ErrorKey } from '@/lib/forms/validation';
import { ArrowUp } from './icons';
const empty: EnquiryValues = { name: '', workEmail: '', organization: '', phone: '', serviceKey: 'general', message: '', consent: false, website: '' };
export function EnquiryForm({ locale, services }: { locale: Locale; services: Service[] }) {
  const params = useSearchParams();
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, true>>>({});
  const [success, setSuccess] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const service = params.get('service');
    if (service && services.some(item => item.id === service)) setValues(current => ({ ...current, serviceKey: service }));
  }, [params, services]);
  const labels: Record<ErrorKey, string> = {
    name: t(locale, 'Please enter your name (2–100 characters).', 'يرجى إدخال اسمك من حرفين إلى ١٠٠ حرف.'),
    workEmail: t(locale, 'Please enter a valid email address.', 'يرجى إدخال بريد إلكتروني صحيح.'),
    organization: t(locale, 'Please enter your organisation (2–150 characters).', 'يرجى إدخال اسم منشأتك من حرفين إلى ١٥٠ حرفاً.'),
    phone: t(locale, 'Please enter a valid phone number, or leave it blank.', 'يرجى إدخال رقم هاتف صحيح أو ترك الحقل فارغاً.'),
    serviceKey: t(locale, 'Please select a service.', 'يرجى اختيار خدمة.'),
    message: t(locale, 'Please write between 20 and 5,000 characters.', 'يرجى كتابة رسالة من ٢٠ إلى ٥٠٠٠ حرف.'),
    consent: t(locale, 'Please acknowledge the demo privacy information.', 'يرجى الإقرار بالاطلاع على معلومات خصوصية النسخة التجريبية.'),
    website: t(locale, 'Please leave the website field blank.', 'يرجى ترك حقل الموقع فارغاً.'),
  };
  function change(key: keyof EnquiryValues, value: string | boolean) { setValues(current => ({ ...current, [key]: value })); }
  function field({ id, label, type = 'text', required = true, autocomplete }: { id: 'name' | 'workEmail' | 'organization' | 'phone'; label: string; type?: string; required?: boolean; autocomplete?: string }) {
    return <div className="form-field"><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}{!required && <span className="optional"> {t(locale, '(optional)', '(اختياري)')}</span>}</label><input id={id} name={id} type={type} autoComplete={autocomplete} required={required} defaultValue={values[id]} maxLength={id === 'workEmail' ? 254 : id === 'phone' ? 24 : 150} aria-invalid={errors[id] ? true : undefined} aria-describedby={errors[id] ? id + '-error' : undefined} onBlur={event => change(id, event.target.value)} />{errors[id] && <p className="field-error" id={id + '-error'}>{labels[id]}</p>}</div>;
  }
  if (success) return <div ref={done} tabIndex={-1} className="form-success"><div className="success-mark" aria-hidden="true">✓</div><span className="eyebrow">{t(locale, 'Demo complete', 'اكتملت التجربة')}</span><h2>{t(locale, 'That’s how the conversation starts.', 'هكذا تبدأ المحادثة.')}</h2><p>{t(locale, 'Your form passed validation. This is a website preview, so your enquiry has not been sent or saved.', 'اجتاز النموذج التحقق. هذه نسخة تجريبية من الموقع، ولذلك لم يُرسل استفسارك أو يُحفظ.')}</p><button className="button" onClick={() => { setSuccess(false); setValues(empty); setErrors({}); }}>{t(locale, 'Try another enquiry', 'تجربة استفسار آخر')}<ArrowUp /></button></div>;
  return <form className="enquiry-form" noValidate onSubmit={event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: EnquiryValues = { name: String(form.get('name') || ''), workEmail: String(form.get('workEmail') || ''), organization: String(form.get('organization') || ''), phone: String(form.get('phone') || ''), serviceKey: String(form.get('serviceKey') || ''), message: String(form.get('message') || ''), consent: form.get('consent') === 'on', website: String(form.get('website') || '') };
    const found = validateEnquiry(next);
    setValues(next); setErrors(found);
    if (Object.keys(found).length) requestAnimationFrame(() => summary.current?.focus());
    else { setValues(empty); setSuccess(true); requestAnimationFrame(() => done.current?.focus()); }
  }}>
    <div className="form-heading"><h2>{t(locale, 'A little about you.', 'نبذة عنك.')}</h2><span>{t(locale, '* Required fields', '* حقول مطلوبة')}</span></div>
    {Object.keys(errors).length > 0 && <div ref={summary} className="error-summary" tabIndex={-1} role="alert"><p>{t(locale, 'Please check the following:', 'يرجى التحقق مما يلي:')}</p><ul>{(Object.keys(errors) as ErrorKey[]).map(key => <li key={key}><a href={'#' + key}>{labels[key]}</a></li>)}</ul></div>}
    <div className="form-grid">{field({ id: 'name', label: t(locale, 'Full name', 'الاسم الكامل'), autocomplete: 'name' })}{field({ id: 'workEmail', label: t(locale, 'Email address', 'البريد الإلكتروني'), type: 'email', autocomplete: 'email' })}{field({ id: 'organization', label: t(locale, 'Organisation', 'المنشأة'), autocomplete: 'organization' })}{field({ id: 'phone', label: t(locale, 'Phone number', 'رقم الهاتف'), type: 'tel', autocomplete: 'tel', required: false })}</div>
    <div className="form-field"><label htmlFor="serviceKey">{t(locale, 'What would you like to discuss?', 'ما الذي تود مناقشته؟')} *</label><select id="serviceKey" name="serviceKey" value={values.serviceKey} onChange={event => change('serviceKey', event.target.value)} required aria-invalid={errors.serviceKey ? true : undefined} aria-describedby={errors.serviceKey ? 'serviceKey-error' : undefined}><option value="general">{t(locale, 'Let’s find the right expertise', 'لنحدد الخبرة المناسبة')}</option>{services.map(service => <option key={service.id} value={service.id}>{pick(service.name, locale)}</option>)}</select>{errors.serviceKey && <p className="field-error" id="serviceKey-error">{labels.serviceKey}</p>}</div>
    <div className="form-field"><label htmlFor="message">{t(locale, 'Tell us a little more', 'أخبرنا بالمزيد')} *</label><textarea id="message" name="message" value={values.message} onChange={event => change('message', event.target.value)} rows={4} maxLength={5000} required placeholder={t(locale, 'Your priorities, your questions, or what comes next…', 'أولوياتك أو أسئلتك أو خططك القادمة…')} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'} /><p className="field-hint" id="message-hint">{t(locale, 'Please leave out confidential or sensitive information.', 'يرجى عدم إدراج معلومات سرية أو حساسة.')}</p>{errors.message && <p className="field-error" id="message-error">{labels.message}</p>}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="consent-field"><input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={event => change('consent', event.target.checked)} required aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'consent-error' : undefined}/><label htmlFor="consent">{t(locale, 'I understand this is a demo and have read the ', 'أفهم أن هذه نسخة تجريبية وقد قرأت ')}<Link href={localPath(locale, 'privacy')}>{t(locale, 'privacy information', 'معلومات الخصوصية')}</Link>.</label></div>
    {errors.consent && <p id="consent-error" className="field-error">{labels.consent}</p>}
    <div className="form-submit"><button type="submit" className="button">{t(locale, 'Request a consultation', 'طلب استشارة')}<ArrowUp /></button><span>{t(locale, 'Demo form. Nothing is sent or stored.', 'نموذج تجريبي. لا تُرسل البيانات ولا تُحفظ.')}</span></div>
  </form>;
}
