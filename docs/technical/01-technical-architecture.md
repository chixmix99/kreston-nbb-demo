# Kreston NBB Website Technical Architecture

Status: Adopted for the demo  
Production status: Subject to hosting and CMS confirmation

## Architecture outcome

Build a new bilingual marketing application using Next.js App Router, React, and strict TypeScript. The demo will use repository-owned structured content. Pages and components will consume that content through a small repository interface so a production CMS can replace the local source without rewriting page components.

The application must support static generation, accessible client-side enhancements, English and Arabic parity, descriptive URLs, secure server-side form endpoints, and platform-neutral deployment.

## Technology decisions

| Area | Decision | Reason |
|---|---|---|
| Web framework | Current stable Next.js App Router | Supports static rendering, metadata, image optimization, route handlers, and React components in one application. |
| Language | TypeScript with `strict` enabled | Prevents content and component contract drift. |
| Runtime | Active Node.js LTS at scaffold time | Avoids an unsupported runtime. Record the exact version in `.nvmrc` and `package.json`. |
| Styling | CSS variables from `kreston-nbb-design-tokens.css` plus locally scoped component styles | Keeps brand values centralized and avoids coupling the design system to a utility framework. |
| Content for demo | Version-controlled structured data and prose inside the application | Allows immediate work without pretending a CMS has been selected. |
| Content access | `ContentRepository` interface | Separates page rendering from the eventual CMS SDK. |
| Localization | Locale route segment and locale-specific content records | Makes language, direction, metadata, and page parity explicit. |
| Validation | Shared runtime schemas for content and form payloads | Rejects incomplete records during build and unsafe payloads at runtime. |
| Testing | Unit and component tests plus Playwright browser tests and automated accessibility checks | Covers logic, rendering, navigation, forms, and RTL behaviour. |
| Package management | Use one package manager and commit its lockfile | Ensures repeatable builds. Select the available team standard during scaffold; do not maintain multiple lockfiles. |

Exact package versions must be chosen when the scaffold is created, committed in the lockfile, and updated through reviewed dependency changes. This document does not guess future package versions.

## Rendering strategy

Use static generation for:

- Home.
- About and Leadership.
- Services hub and service pages.
- Industries hub and pages when approved.
- Insights index and published articles.
- Careers overview.
- Contact and legal pages.

Use dynamic server handling only for:

- Search results if search is included in the first release.
- Preview mode when a CMS is connected.
- Enquiry and careers form submissions.
- Health checks required by the selected host.

Client-side JavaScript should enhance navigation, menus, filters, accordions, and form feedback. It must not be required to read primary page content or discover links.

## Application boundaries

### Presentation layer

Responsible for page composition, components, layout, direction, interaction states, and accessible markup. It must not contain hard-coded company facts that belong in content records.

### Content layer

Responsible for retrieving localized services, people, credentials, offices, insights, legal pages, and global settings. It exposes typed domain records and filters out drafts.

### Integration layer

Responsible for form delivery, upload handling, analytics adapters, error reporting, and future CMS clients. External vendor code must stay behind an adapter.

### Configuration layer

Responsible for environment-specific origins, feature flags, integration endpoints, and public analytics identifiers. Secrets must never be placed in content files, browser bundles, or committed environment files.

## Recommended project structure

```text
app/
  [locale]/
    layout.tsx
    page.tsx
    about/
    services/
    insights/
    careers/
    contact/
  api/
    enquiries/
    careers/
components/
  layout/
  navigation/
  content/
  forms/
  feedback/
content/
  en/
  ar/
lib/
  content/
  forms/
  i18n/
  seo/
  security/
  analytics/
styles/
  tokens.css
  globals.css
public/
  images/
  icons/
tests/
  unit/
  component/
  e2e/
```

This is the target structure for the future application. Do not copy the report generator, strategy files, or raw live-site HTML into the application source.

## Content repository contract

Pages depend on an interface equivalent to:

```ts
interface ContentRepository {
  getSiteSettings(locale: Locale): Promise<SiteSettings>;
  getHomePage(locale: Locale): Promise<HomePage>;
  getAboutPage(locale: Locale): Promise<AboutPage>;
  listServices(locale: Locale): Promise<ServiceSummary[]>;
  getService(locale: Locale, slug: string): Promise<Service | null>;
  listPeople(locale: Locale): Promise<PersonSummary[]>;
  getPerson(locale: Locale, slug: string): Promise<Person | null>;
  listInsights(locale: Locale, query?: InsightQuery): Promise<InsightSummary[]>;
  getInsight(locale: Locale, slug: string): Promise<Insight | null>;
  getOffice(locale: Locale): Promise<Office | null>;
  getLegalPage(locale: Locale, key: LegalPageKey): Promise<LegalPage | null>;
}
```

The demo implementation reads from repository files. A future CMS implementation must satisfy the same contract and pass the same content validation tests.

## Locale architecture

- Supported locales are `en` and `ar`.
- Every public page lives below a locale segment.
- `<html lang>` and `<html dir>` must be derived from the route locale.
- `en` uses `ltr`; `ar` uses `rtl`.
- Content lookups never silently fall back from Arabic to English on a public page.
- If a translation is unavailable, production returns a controlled not-found state and excludes that locale URL from the sitemap.
- The demo may show a clearly marked placeholder, but the placeholder must never be mistaken for approved Arabic copy.

## Media architecture

- Use framework image optimization for raster images.
- Keep SVG icons as reviewed local assets or accessible inline SVG components.
- Provide explicit width, height, and responsive `sizes` values to prevent layout shift.
- Use a still-image hero by default. A video is optional only after rights, encoding, poster, performance, and reduced-motion behaviour are approved.
- Do not load the current global map or network-stat icons by default.
- Every migrated asset must have an entry in the content and asset register.

## Data and caching

For the demo, content changes require a new build. For production CMS integration:

- Prefer static pages with controlled revalidation.
- Revalidate only affected content through authenticated webhooks.
- Reject webhook calls without a valid secret.
- Do not cache form POST responses.
- Do not cache preview content in public responses.
- Ensure cache keys include locale and content identifier.

## Error handling

- Unknown locale: permanent redirect only when a deterministic legacy rule exists; otherwise return 404.
- Unknown content slug: localized 404.
- Missing required content: fail the build for publishable records.
- Optional related content: omit the component without leaving empty headings.
- External integration failure: return a generic visitor-safe message, log a correlation ID, and avoid exposing vendor or stack details.
- Image failure: preserve the layout and alternative text; do not display a broken-image icon.

## Accessibility architecture

- Server-render semantic landmarks and headings.
- Use native controls before custom widgets.
- Ensure all interactive components work by keyboard without JavaScript timing assumptions.
- Announce form errors and async results through appropriate live regions.
- Keep the DOM order logical in both LTR and RTL.
- Use logical CSS properties such as `margin-inline-start` and `padding-inline`.
- Set reduced-motion behaviour globally and within individual motion components.

## Security architecture

- Treat public content as untrusted when it originates from a CMS.
- Do not render arbitrary stored HTML without sanitization and an explicit element allowlist.
- Validate form payloads on the server even when browser validation passes.
- Keep secrets server-only.
- Apply security headers in production as specified in document 05.
- Log operational events without recording enquiry messages, CV contents, or unnecessary personal data.
- Run dependency, static-analysis, and secret-detection checks in continuous integration.

## Environment variables

Names may be adapted to the chosen providers, but keep the boundary below:

```text
NEXT_PUBLIC_SITE_ORIGIN
NEXT_PUBLIC_ANALYTICS_PROVIDER
NEXT_PUBLIC_ANALYTICS_ID
CONTENT_SOURCE
CMS_API_URL
CMS_READ_TOKEN
CMS_WEBHOOK_SECRET
ENQUIRY_PROVIDER
ENQUIRY_DESTINATION
CAREERS_DESTINATION
UPLOAD_STORAGE_BUCKET
UPLOAD_SCAN_ENDPOINT
ERROR_REPORTING_DSN
```

Only variables beginning with `NEXT_PUBLIC_` may be exposed to the browser. `.env.example` may contain names and safe descriptions, never real credentials.

## Demo feature flags

The initial scaffold should support:

```text
FEATURE_INDUSTRIES=false
FEATURE_SEARCH=false
FEATURE_LIVE_FORMS=false
FEATURE_HERO_VIDEO=false
FEATURE_ANALYTICS=false
```

Flags may be implemented as typed configuration. Disabled features must not leave dead links, empty navigation, or inaccessible controls.

## Definition of architecture complete

Architecture is implemented when:

- The application builds from a clean checkout using one documented command.
- English and Arabic routes render from the same component tree.
- Content is retrieved through `ContentRepository` rather than imported ad hoc into pages.
- Metadata and direction are derived from content and locale.
- A service record can render at a descriptive localized route.
- A missing record produces a localized 404.
- Form endpoints are isolated from UI components and remain disabled until configured.
- Unit, type, build, accessibility, and browser smoke tests run in continuous integration.
