import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateEnquiry, type EnquiryValues } from '../../lib/forms/validation.ts';
const valid: EnquiryValues = { name: 'Demo Visitor', workEmail: 'visitor@example.com', organization: 'Demo Company', phone: '', serviceKey: 'audit_assurance', message: 'We would like to discuss the audit preparation process.', consent: true, website: '' };
test('accepts a complete enquiry and Arabic names', () => {
  assert.deepEqual(validateEnquiry(valid), {});
  assert.deepEqual(validateEnquiry({ ...valid, name: 'زائر تجريبي', organization: 'منشأة تجريبية', message: 'نرغب في مناقشة متطلبات المراجعة المالية للمنشأة.' }), {});
});
test('rejects invalid contact details, unknown services and missing consent', () => {
  assert.deepEqual(validateEnquiry({ ...valid, name: 'A', workEmail: 'bad', organization: '', serviceKey: 'untrusted', consent: false }), { name: true, organization: true, workEmail: true, serviceKey: true, consent: true });
});
test('enforces payload bounds and honeypot', () => {
  assert.deepEqual(validateEnquiry({ ...valid, message: 'x'.repeat(5001), website: 'spam.test', phone: 'bad-phone' }), { phone: true, message: true, website: true });
});
test('allows international telephone punctuation and optional omission', () => {
  assert.deepEqual(validateEnquiry({ ...valid, phone: '+966 (11) 234-5678' }), {});
  assert.deepEqual(validateEnquiry({ ...valid, phone: ' ' }), {});
});

