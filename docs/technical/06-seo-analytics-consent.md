# Kreston NBB SEO Analytics and Consent Specification

Status: SEO foundations ready for implementation  
Production status: Analytics and consent providers require approval

## Search outcome

Every public page must be discoverable through clean server-rendered HTML, have a unique purpose and metadata, and expose the correct English-Arabic relationship. The application must generate the technical files missing from the current site and must not index drafts, search results, demo placeholders, or incomplete translations.

Analytics should measure useful visitor intent without capturing form contents or unnecessary personal data. Analytics remains disabled in the demo unless an approved provider and consent approach are configured.

## Production origin

Canonical production origin: `https://kreston-nbb.com` unless the client approves a different canonical host.

Enforce one host variant and HTTPS. Redirect alternate protocol and host variants in one hop.

## Metadata contract

Every indexable page includes:

- Unique localized `<title>`.
- Unique localized meta description.
- Self-referencing canonical URL.
- Published locale alternates.
- Open Graph title, description, URL, locale, type, and image.
- Appropriate social-card metadata when an approved image exists.
- One visible H1 matching the page purpose.

Recommended title patterns:

| Page | Pattern |
|---|---|
| Home | `Kreston NBB Saudi | Audit Tax and Advisory` subject to copy approval |
| Section | `[Section] | Kreston NBB Saudi` |
| Service | `[Service] in Saudi Arabia | Kreston NBB` |
| Insight | `[Insight title] | Kreston NBB Saudi` |
| Person | `[Name] [Role] | Kreston NBB Saudi` |

Patterns are starting rules, not permission to publish unsupported service or regulatory wording.

## Indexability rules

Index:

- Published Home, About, Services, approved service pages, approved Industry pages, Insights, published insight details, Careers, Contact, Leadership, and required legal pages.

Do not index:

- Search results.
- Preview or staging pages.
- Drafts.
- Demo-only placeholder pages.
- Form success and error URLs.
- Filter combinations unless an editor creates a dedicated landing page.
- Untranslated or incomplete locale records.
- Internal health or API endpoints.

Use both a meta robots directive and an `X-Robots-Tag` header for staging and non-HTML assets when appropriate. Authentication is preferable for private review environments.

## Robots file

The production site must return HTTP 200 at `/robots.txt` and include:

```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*/search
Sitemap: https://kreston-nbb.com/sitemap.xml
```

Adjust paths to the final application. Do not use `robots.txt` as an access-control mechanism.

Staging and preview environments must disallow crawling and send noindex headers. The current public `/robots.txt` returns 404 and cannot be carried forward.

## XML sitemap

The production site must return HTTP 200 at `/sitemap.xml` and include only canonical published pages.

Each entry should include:

- Canonical absolute URL.
- Accurate last-modified value from the content record.
- Published alternate-language links where supported by the generator.

Do not fabricate change frequency or priority values. Exclude redirected, noindex, draft, search, API, and demo-only routes.

## Hreflang

For paired pages:

```text
en-SA -> English canonical
ar-SA -> Arabic canonical
x-default -> English canonical
```

Rules:

- Each language version references itself and its published counterpart.
- References are reciprocal.
- Do not point to a language homepage when the annotation claims it is the direct translation of a detail page.
- Omit an unavailable locale rather than advertising incomplete content.

## Structured data

Generate JSON-LD from the same validated records used for the visible page. Recommended types:

| Page | Structured data |
|---|---|
| Site-wide | `Organization`, `WebSite` |
| Office and Contact | `ProfessionalService` only after legal name, address, phone, and coordinates are verified |
| Service detail | `Service` |
| Person profile | `Person` |
| Insight detail | `Article`, `NewsArticle`, or another accurate subtype |
| Interior pages | `BreadcrumbList` |

Rules:

- Structured data must match visible content.
- Do not add aggregate ratings, reviews, prices, opening hours, or credentials that are not displayed and approved.
- Use stable page identifiers based on canonical URLs.
- Validate representative pages before launch.

## On-page requirements

- Exactly one H1 per page.
- Heading levels follow the content hierarchy without skips used for styling.
- Service and insight links use descriptive anchor text.
- Images use meaningful localized alt text or empty alt text when decorative.
- Dates use semantic `<time>` values.
- Author and review dates are visible on insights when applicable.
- Important copy is present in initial server HTML.
- Internal links connect services, people, Industries, and Insights when the relationship is genuine.

## Redirect and status requirements

- Implement the map in document 03.
- Use a permanent redirect for moved canonical content.
- Return 404 for unknown content and 410 only when a deliberate removal policy supports it.
- Do not redirect every unknown URL to the homepage.
- Avoid redirect chains and loops.
- Return 200 only when the requested page contains its intended content.

## Performance and search

Technical search quality includes:

- Responsive images with explicit dimensions.
- Optimized font loading.
- Minimal render-blocking third-party scripts.
- No autoplay hero video on mobile.
- Stable header and image layout.
- Static rendering for primary content.
- Compressed HTML, CSS, JavaScript, images, and fonts.
- Correct caching for versioned static assets.

Performance targets are defined in document 08 and must be measured on representative production pages.

## Site search

Search is optional for the first release because the initial content volume may not justify it.

If enabled:

- Index English and Arabic separately.
- Search only published records.
- Weight titles, service names, headings, summaries, and body content deliberately.
- Provide typo-tolerant behaviour only if the selected search implementation supports Arabic and English well.
- Use localized empty and error states.
- Keep search results noindex.
- Do not send raw search queries to third parties without privacy review.

## Analytics decision

The provider is unselected. The implementation must expose a provider-neutral client interface and do nothing when analytics is disabled.

```ts
interface AnalyticsClient {
  track(event: AnalyticsEvent): void;
}
```

Analytics initialization depends on the approved consent rule. No event may include names, email addresses, phone numbers, free-text messages, CV information, or complete search queries.

## Event taxonomy

| Event | Trigger | Allowed properties |
|---|---|---|
| `consultation_cta` | Visitor activates a consultation CTA | `locale`, `source_path`, `service_key`, `placement` |
| `form_start` | First meaningful interaction with an enquiry form | `locale`, `form_type`, `source_path` |
| `form_submit_success` | Server confirms delivery | `locale`, `form_type`, `service_key` |
| `form_submit_error` | Submission fails | `locale`, `form_type`, `error_category`; no field values |
| `service_view` | Service detail page view if page views are not automatic | `locale`, `service_key`, `source_group` |
| `adviser_contact` | Approved adviser-contact action | `locale`, `person_id`, `service_key`, `contact_method` |
| `language_switch` | Language changes | `source_locale`, `target_locale`, `route_key` |
| `content_download` | Approved document download | `locale`, `asset_id`, `topic_key` |
| `career_apply` | Application flow starts | `locale`, `vacancy_id`; no applicant details |
| `search` | Search submitted, if approved | `locale`, `result_count`, `query_category`; avoid raw query |

Events must use stable identifiers rather than localized display labels.

## Consent behaviour

The final consent interface depends on the approved policies and selected tools.

Default implementation principle:

- Necessary storage operates without optional-consent controls only when genuinely necessary.
- Analytics and marketing tools stay disabled until the applicable consent condition is met.
- Rejecting optional tracking is as easy as accepting it.
- Visitors can revisit their choice.
- The interface works by keyboard and screen reader.
- Consent records contain only what the approved compliance design requires.
- Changing consent withdraws or enables future collection; document provider limitations for previously collected data.

Do not display a cookie banner when the site sets no optional cookies or equivalent storage. Do not add analytics merely to justify a banner.

## Search console and webmaster setup

Before production launch:

- Verify the canonical domain with the chosen search-engine tools.
- Submit the XML sitemap.
- Inspect representative English and Arabic URLs.
- Confirm redirects from legacy paths.
- Monitor indexing, structured-data errors, Core Web Vitals, and 404s.
- Assign an owner for monthly review and issue resolution.

Account creation and verification require client ownership and are not part of the demo.

## SEO acceptance

SEO implementation is complete when:

- `/robots.txt` and `/sitemap.xml` return valid HTTP 200 responses in production.
- All indexable templates produce unique metadata and one H1.
- Canonical and hreflang annotations are reciprocal and valid.
- Structured data matches visible approved content.
- All known legacy URLs resolve in one hop to an appropriate destination.
- Staging and previews remain non-indexable.
- The site contains no placeholder titles, empty headings, database-ID canonical routes, or `undefined` contact links.
- Analytics events exclude personal and free-text data.
