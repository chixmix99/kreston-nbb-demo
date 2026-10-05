export const serviceKeys = ['audit_assurance', 'internal_audit_risk_compliance', 'tax_zakat', 'accounting_advisory', 'management_consulting', 'operations_technology', 'general'] as const;
export type EnquiryValues = {
  name: string; workEmail: string; organization: string; phone: string;
  serviceKey: string; message: string; consent: boolean; website: string;
};
export type ErrorKey = 'name' | 'workEmail' | 'organization' | 'phone' | 'serviceKey' | 'message' | 'consent' | 'website';
export function validateEnquiry(values: EnquiryValues): Partial<Record<ErrorKey, true>> {
  const errors: Partial<Record<ErrorKey, true>> = {};
  const bounded = (value: string, min: number, max: number) => value.trim().length >= min && value.trim().length <= max;
  if (!bounded(values.name, 2, 100)) errors.name = true;
  if (!bounded(values.organization, 2, 150)) errors.organization = true;
  if (values.workEmail.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail.trim())) errors.workEmail = true;
  if (values.phone.trim() && (!/^[+\d\s().-]{8,24}$/.test(values.phone.trim()) || values.phone.replace(/\D/g, '').length < 7)) errors.phone = true;
  if (!(serviceKeys as readonly string[]).includes(values.serviceKey)) errors.serviceKey = true;
  if (!bounded(values.message, 20, 5000)) errors.message = true;
  if (!values.consent) errors.consent = true;
  if (values.website) errors.website = true;
  return errors;
}

