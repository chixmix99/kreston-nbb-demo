import type { NextConfig } from 'next';

const services = [
  ['64ae7d153a75882b4691e53c', 'audit-assurance'],
  ['64da619f8aa93ee30dc0ff9d', 'internal-audit-risk-compliance'],
  ['64ae85d2ce928849ed89c8b1', 'tax-zakat'],
  ['64ae85cace928849ed89c8ae', 'accounting-advisory'],
  ['64ae85cdce928849ed89c8af', 'management-consulting'],
  ['64ae85d5ce928849ed89c8b2', 'operations-technology'],
];

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: true },
      ...['about', 'services', 'insights', 'contact'].map((path) => ({ source: `/${path}`, destination: `/en/${path}`, permanent: true })),
      ...['', '/ar'].flatMap((prefix) => [
        { source: `${prefix}/career`, destination: `${prefix || '/en'}/careers`, permanent: true },
        { source: `${prefix}/news-and-events`, destination: `${prefix || '/en'}/insights`, permanent: true },
        { source: `${prefix}/kreston-global`, destination: `${prefix || '/en'}/about#network-affiliation`, permanent: true },
        ...services.map(([id, slug]) => ({ source: `${prefix}/services/${id}`, destination: `${prefix || '/en'}/services/${slug}`, permanent: true })),
      ]),
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
};
export default config;
