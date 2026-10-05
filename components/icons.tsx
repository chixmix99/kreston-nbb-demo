import type { SVGProps } from 'react';
type Props = SVGProps<SVGSVGElement>;
export function Arrow({ className = '', ...props }: Props) {
  return <svg className={'arrow ' + className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function ArrowUp({ className = '', ...props }: Props) {
  return <svg className={'arrow diagonal ' + className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Globe(props: Props) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" stroke="currentColor" strokeWidth="1.4"/></svg>;
}
export function Plus() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

