# Kreston NBB Website Technical Implementation Pack

Status: Ready to start the demo build  
Prepared: 2 October 2026  
Scope: Kreston NBB Saudi only

## Purpose

This pack converts the approved strategic direction into implementation rules. It is based only on the files in this workspace and the public website at `https://kreston-nbb.com` as inspected on 2 October 2026.

The pack is sufficient to start a responsive, bilingual demonstration website. It does not authorise publication of unverified contact information, credentials, biographies, legal wording, or integrations.

## Source hierarchy

When sources conflict, use this order:

1. A later written approval from Kreston NBB.
2. `Kreston_NBB_Website_Strategy_and_Redesign_Plan.docx`.
3. `kreston-nbb-website-discovery-brief.md`.
4. This technical pack.
5. The public website, used only as a migration source and defect reference.

The live website is not an authority for disputed contact information, network statistics, regulatory claims, or Arabic copy.

## Documents

1. [Technical architecture](01-technical-architecture.md)
2. [Content model and CMS contract](02-content-model-and-cms-contract.md)
3. [Routes redirects and localization](03-routes-redirects-localization.md)
4. [Component responsive and RTL specification](04-component-responsive-rtl-specification.md)
5. [Forms integrations and security](05-forms-integrations-security.md)
6. [SEO analytics and consent](06-seo-analytics-consent.md)
7. [Deployment operations and maintenance](07-deployment-operations-maintenance.md)
8. [Quality assurance and acceptance](08-quality-assurance-acceptance.md)
9. [Content and asset register](09-content-asset-register.md)

## Decisions made for the demo

- Build a new application instead of modifying or reproducing the current website.
- Use Next.js App Router with TypeScript and React.
- Use the existing CSS variables as the initial design-token source.
- Store demo content locally behind a typed content-repository interface.
- Prefix every public page with `/en` or `/ar`.
- Generate marketing pages statically wherever possible.
- Use the same page and component structure for English and Arabic.
- Demonstrate form states without transmitting personal data.
- Keep Kreston Global membership to the About page, relevant proof points, and the footer disclaimer.
- Do not launch Industry pages until Kreston NBB supplies evidence and responsible advisers for each sector.

## Production decisions still requiring client confirmation

These items do not block the demo but block production release:

- Official master logos, brand rules, fonts, and asset usage rights.
- Exact legal entity name in English and Arabic.
- Canonical address, map pin, telephone, email, and working hours.
- Approved wording and evidence for licences, CMA status, memberships, statistics, and disclaimers.
- Leadership names, roles, biographies, photographs, and professional links.
- Final service descriptions and Arabic terminology.
- Production CMS, hosting region, data-residency requirements, and system owners.
- Enquiry recipients, CRM or mailbox integration, response commitments, and failure escalation.
- Privacy, cookie, terms, recruitment-retention, and accessibility policies.
- Analytics and consent platforms.
- Careers process, open roles, application fields, CV retention, and recruitment owner.

## Implementation boundary

The demo may contain working copy, representative images, simulated form submissions, and placeholder leadership cards clearly marked in the code and review environment. It must not display invented names, contact details, client logos, testimonials, statistics, credentials, licences, or regulatory claims.

The production release cannot proceed until every item marked `production blocker` in this pack has an approved value and owner.

## Live-site facts verified during preparation

- The current site is rendered with Next.js.
- English uses unprefixed routes and Arabic uses the `/ar` prefix.
- The six service-detail routes use database identifiers rather than descriptive slugs.
- A service-detail page renders `Other Services` and an enquiry form but no service title or service body.
- Contact inputs rely on placeholders and the rendered form has no visible method or action.
- Footer contact links render as `mailto:undefined` and `phone:undefined` in the public HTML.
- Current `robots.txt` and `sitemap.xml` endpoints return HTTP 404.
- The public Careers page contains irrelevant or placeholder vacancies outside the stated Saudi focus.
- Arabic homepage content includes an unrelated industrial-contracting message.

These findings define migration and replacement work. They are not content to reproduce.

## Start condition

Implementation can begin when the project scaffold uses the architecture in document 01 and the first route consumes the content interface in document 02. The demo must continue to use explicit placeholder markers until production-blocking facts are approved.
