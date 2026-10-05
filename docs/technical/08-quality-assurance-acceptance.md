# Kreston NBB Quality Assurance and Acceptance Plan

Status: Ready for demo implementation  
Production status: Final devices, browsers, and client sign-off owners require confirmation

## Quality outcome

The website is acceptable only when its content, navigation, responsive behaviour, Arabic experience, accessibility, forms, search foundations, performance, security controls, and redirects work together. Passing an automated build is necessary but not sufficient; representative pages require human visual and interaction review.

## Test environments

- Local for developer feedback and unit tests.
- Preview for change review and visual comparison.
- Staging for production-like integrations, content, headers, and end-to-end tests.
- Production for controlled smoke tests and ongoing monitoring.

Preview and staging must remain non-indexable and must not route enquiries to production recipients.

## Required test data

Maintain safe fixtures for:

- English and Arabic content.
- Short and long titles.
- Long Arabic labels and mixed-direction text.
- All six service keys.
- Published and missing translation states.
- With and without images.
- With and without optional related content.
- Form success, validation failure, rate limit, and provider failure.
- Empty Insights and Careers states.
- Redirected, not-found, and disabled-feature routes.

Fixtures must not contain real personal data or invented public-facing credentials.

## Browser and device baseline

Final contractual support requires client approval. Until then, test the current and previous major versions of:

- Chrome on desktop and Android.
- Safari on macOS and iOS.
- Edge on Windows.
- Firefox on desktop.

Required viewport checks:

- 320 by 568.
- 360 by 800.
- 390 by 844.
- 768 by 1024.
- 1024 by 768.
- 1280 by 800.
- 1440 by 900.

Viewport tests do not replace testing on at least one real iOS device, one real Android device, and a keyboard-driven desktop setup before production.

## Automated test layers

### Unit tests

Cover:

- Locale parsing.
- Route generation.
- Slug validation.
- Content schema validation.
- Metadata generation.
- Hreflang pairing.
- Redirect lookup.
- Form schema validation and normalization.
- Analytics payload allowlist.
- Feature-flag behaviour.

### Component tests

Cover:

- Header and mobile menu states.
- Language switch.
- Breadcrumbs.
- Buttons and links.
- Service, Person, and Insight cards.
- Accordion keyboard behaviour.
- Field, error summary, success, and integration-error states.
- Empty states.
- RTL rendering and direction-dependent icons.

### End-to-end tests

Cover at minimum:

1. Load English home and reach a service detail page.
2. Submit the demo enquiry form successfully.
3. Trigger validation errors and recover without losing valid values.
4. Switch from an English service page to its Arabic equivalent.
5. Use the mobile navigation entirely by keyboard.
6. Follow a legacy service URL and arrive at the descriptive canonical route in one redirect.
7. Load an unknown localized URL and receive the localized 404.
8. Verify disabled Industries and Search features leave no dead navigation.
9. Verify no-vacancies and no-results states.
10. Confirm staging pages advertise noindex.

## Accessibility test plan

Target: WCAG 2.2 AA.

### Automated checks

Run automated accessibility tests against:

- English and Arabic homepages.
- Services hub.
- One long service page.
- About.
- Insights index and detail.
- Contact form including error and success states.
- Careers empty or application state.
- 404.

Automated tools cannot prove conformance and must be followed by manual checks.

### Keyboard

- Skip link appears and works.
- Focus order follows reading order.
- All controls are reachable and operable.
- Focus remains visible.
- Mobile menu opens, closes, and restores focus correctly.
- Accordion state works with Enter and Space.
- No keyboard trap exists.
- Sticky elements do not hide focused content.

### Screen reader

Test at least one desktop screen reader and the native mobile screen reader on a representative flow.

Confirm:

- Page title, language, and direction.
- Landmark names.
- Heading hierarchy.
- Current navigation state.
- Link and button names.
- Image alternatives.
- Field labels, instructions, required state, and errors.
- Dynamic success and failure announcements.
- Tables, if used, have proper headers.
- Arabic content is announced as Arabic rather than English.

### Visual accessibility

- Text and controls meet required contrast in every state.
- Content works at 200 percent browser zoom.
- Text spacing overrides do not clip or overlap.
- Layout reflows without horizontal reading scroll at the equivalent of 320 CSS pixels.
- Information does not depend on colour, position, sound, or motion alone.
- Reduced-motion mode removes non-essential animation and autoplay.

## RTL and localization test plan

For every representative Arabic page:

- `<html lang="ar" dir="rtl">` is correct.
- Navigation order and alignment are natural.
- Directional icons mirror only when meaningful.
- Logo and photography remain unmirrored.
- Mixed Arabic and English text remains legible.
- Telephone, email, dates, and numbers remain understandable.
- Form labels, hints, errors, and success copy are Arabic.
- No untranslated English interface labels remain.
- Text growth does not clip buttons, cards, navigation, or tables.
- Language switching preserves the equivalent page when published.

Arabic review requires a native or professionally qualified reviewer before production.

## Content QA

Check every page for:

- One clear H1.
- Correct page purpose and CTA.
- Approved spelling of the organization and services.
- No invented contact information, people, clients, credentials, or statistics.
- No placeholder labels, lorem ipsum, or `undefined` values.
- Correct author, publication date, and review date for Insights.
- Working internal and external links.
- Approved downloads and asset rights.
- Complete English-Arabic equivalence where both are published.
- Correct legal and member-firm disclaimers.

Use a content freeze and final export for launch sign-off.

## Form QA

For each enabled form, test:

- Required fields.
- Minimum and maximum lengths.
- Unicode English and Arabic names.
- Email normalization without destructive rewriting.
- International phone formatting.
- Service preselection.
- Consent required state.
- Honeypot rejection.
- Rate limiting.
- Double submission.
- Provider timeout and failure.
- Browser back and reload behaviour.
- Keyboard, autofill, and mobile keyboard types.
- No personal data in URL, analytics, console, or ordinary logs.
- Success only after confirmed provider delivery.

For careers, also test file type, signature, size, malware result, private storage, access, and deletion.

## SEO QA

- Unique titles and descriptions.
- One H1.
- Self-canonical URL.
- Reciprocal published hreflang pairs.
- Valid JSON-LD matching visible content.
- HTTP 200 for canonical pages.
- One-hop permanent redirects for migrated URLs.
- Localized 404 for missing pages.
- Valid production robots file and XML sitemap.
- No staging, preview, search-result, or draft URLs in the sitemap.
- No database identifiers in new canonical paths.
- Social previews use approved images and copy.

## Performance budgets

Core Web Vitals production targets at the 75th percentile:

| Metric | Target |
|---|---:|
| Largest Contentful Paint | 2.5 seconds or less |
| Interaction to Next Paint | 200 milliseconds or less |
| Cumulative Layout Shift | 0.1 or less |

Engineering budgets for representative mobile pages:

- Initial route JavaScript should remain below 200 KB compressed where practical; exceptions require measurement and review.
- Hero image should normally remain below 300 KB for the intended mobile source.
- Avoid loading video on mobile by default.
- Reserve media dimensions to prevent layout shift.
- Load third-party scripts only after they are required and approved.
- Use font subsets and avoid unnecessary weights.

Test Home, the longest service page, an Insight detail page, and Contact under a throttled mobile profile. Lab results guide development; production field data determines ongoing Core Web Vitals health.

## Security QA

- Dependency and static analysis pass under the approved severity policy.
- Secret scan finds no committed credentials.
- Rich text rejects scripts, event handlers, unsafe URLs, and unapproved embeds.
- Form endpoints reject unsupported methods, origins, oversized bodies, invalid schemas, and abuse patterns.
- Security headers match the reviewed policy.
- Source maps and errors do not expose secrets or internal data.
- Preview and revalidation endpoints reject invalid credentials.
- Uploads remain private and inaccessible before scanning.
- Logs exclude prohibited personal data.

Arrange independent penetration testing if required by Kreston NBB's risk policy or the chosen hosting and integration scope.

## Visual regression

Capture approved reference screenshots for:

- English and Arabic Home.
- Desktop and mobile header.
- Services hub.
- One full service detail page.
- About.
- Contact default, error, and success states.
- Insights listing.
- Footer.

Review visual differences rather than accepting pixel changes automatically. Font-rendering noise may use controlled tolerance; missing content, alignment changes, overflow, or direction errors always require review.

## Acceptance matrix

| Area | Demo acceptance | Production acceptance |
|---|---|---|
| Architecture | Clean build, typed content interface, bilingual routes | Approved CMS and hosting connected |
| Content | Working copy clearly controlled | All copy and claims approved |
| Services | Hub and at least one complete example; all routes may exist | Six complete approved service pages |
| People | Representative layout without invented identities | Approved people, roles, bios, photos, and links |
| Arabic | Representative complete screens and component parity | Full professional translation and native review |
| Forms | Validation and simulated states | Secure end-to-end delivery and privacy approval |
| SEO | Metadata, route, robots, sitemap, schema logic implemented | Production host validation and legacy redirects verified |
| Accessibility | Automated and manual checks on representative flows | WCAG 2.2 AA review across the release scope |
| Performance | Budgets pass on demo routes | Production lab and field monitoring configured |
| Security | Safe defaults and disabled integrations | Headers, providers, secrets, scanning, monitoring approved |
| Operations | Local documented build and tests | CI/CD, rollback, backup, monitoring, owners confirmed |

## Release blockers

Do not launch production when any of these remain:

- Unverified legal identity or contact information.
- Missing or unapproved privacy and recruitment notices for enabled forms.
- Incomplete Arabic navigation, forms, metadata, or page content.
- Empty service pages.
- Invented or unsupported credentials, statistics, people, clients, testimonials, or claims.
- Broken form delivery or false success messages.
- Critical or high-risk security defect without an approved time-bound exception.
- Keyboard trap, missing field labels, inaccessible menu, or other material accessibility failure.
- Invalid canonical, hreflang, robots, sitemap, or redirect behaviour.
- No tested rollback.

## Sign-off evidence

Retain inside the project or approved delivery system:

- Commit and deployment identifier.
- Automated test results.
- Accessibility findings and resolutions.
- Browser and device results.
- Redirect test report.
- Performance report.
- Content approval record.
- English and Arabic approval record.
- Form-delivery test record.
- Security review result.
- Launch approval and named owners.

Do not store real enquiry or applicant payloads as test evidence.
