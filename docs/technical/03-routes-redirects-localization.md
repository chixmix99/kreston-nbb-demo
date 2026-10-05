# Kreston NBB Routes Redirects and Localization

Status: Adopted for demo routing  
Production status: Arabic public slugs and final content inventory require approval

## Routing outcome

Use explicit `/en` and `/ar` prefixes for every public page. Keep the internal route hierarchy identical across languages while allowing locale-specific public slugs after human approval.

The demo uses English path segments under both locale prefixes when an Arabic slug has not been approved. Production must not invent Arabic transliterations. A future approved Arabic slug maps to the same internal content identifier.

## Canonical route structure

| Purpose | English route | Arabic demo route | Release |
|---|---|---|---|
| Home | `/en` | `/ar` | Demo and production |
| About | `/en/about` | `/ar/about` | Demo and production |
| Leadership | `/en/about/leadership` | `/ar/about/leadership` | Production; representative demo layout allowed |
| Services | `/en/services` | `/ar/services` | Demo and production |
| Audit and Assurance | `/en/services/audit-assurance` | `/ar/services/audit-assurance` | Demo and production |
| Internal Audit Risk and Compliance | `/en/services/internal-audit-risk-compliance` | `/ar/services/internal-audit-risk-compliance` | Production; route may exist with working demo copy |
| Tax and Zakat | `/en/services/tax-zakat` | `/ar/services/tax-zakat` | Production; route may exist with working demo copy |
| Accounting and Advisory | `/en/services/accounting-advisory` | `/ar/services/accounting-advisory` | Production; route may exist with working demo copy |
| Management Consulting | `/en/services/management-consulting` | `/ar/services/management-consulting` | Production; route may exist with working demo copy |
| Operations and Technology | `/en/services/operations-technology` | `/ar/services/operations-technology` | Production; route may exist with working demo copy |
| Industries | `/en/industries` | `/ar/industries` | Disabled until approved evidence exists |
| Insights | `/en/insights` | `/ar/insights` | Demo and production |
| Insight detail | `/en/insights/[slug]` | `/ar/insights/[slug]` | Production when content is approved |
| Careers | `/en/careers` | `/ar/careers` | Demo and production |
| Contact | `/en/contact` | `/ar/contact` | Demo and production |
| Search | `/en/search` | `/ar/search` | Optional production feature |
| Privacy | `/en/privacy` | `/ar/privacy` | Production blocker |
| Cookies | `/en/cookies` | `/ar/cookies` | Production blocker if cookies require consent |
| Terms | `/en/terms` | `/ar/terms` | Production blocker |
| Recruitment privacy | `/en/recruitment-privacy` | `/ar/recruitment-privacy` | Required before applications open |
| Accessibility | `/en/accessibility` | `/ar/accessibility` | Required before production release |

## Root and locale handling

- `/` permanently redirects to `/en`.
- Do not auto-redirect visitors based on IP or browser language.
- A language switch keeps the visitor on the equivalent content record when that translation is published.
- If no equivalent production translation exists, the switch links to the target-language section home and explains the limitation accessibly.
- Remembering a visitor's language may use a first-party preference cookie only after the cookie approach is approved. The URL remains authoritative.
- Unknown locale segments return 404.

## Legacy redirect map

Use permanent redirects. With Next.js, `permanent: true` produces HTTP 308 and preserves method semantics. All current GET routes below should resolve directly to the final destination without redirect chains.

### English routes

| Current path | Destination |
|---|---|
| `/` | `/en` |
| `/about` | `/en/about` |
| `/kreston-global` | `/en/about#network-affiliation` |
| `/services` | `/en/services` |
| `/services/64ae7d153a75882b4691e53c` | `/en/services/audit-assurance` |
| `/services/64da619f8aa93ee30dc0ff9d` | `/en/services/internal-audit-risk-compliance` |
| `/services/64ae85d2ce928849ed89c8b1` | `/en/services/tax-zakat` |
| `/services/64ae85cace928849ed89c8ae` | `/en/services/accounting-advisory` |
| `/services/64ae85cdce928849ed89c8af` | `/en/services/management-consulting` |
| `/services/64ae85d5ce928849ed89c8b2` | `/en/services/operations-technology` |
| `/career` | `/en/careers` |
| `/news-and-events` | `/en/insights` |
| `/insights` | `/en/insights` |
| `/insights/details/64ae48eac812d1af1f0c365a` | Hold until the article is reviewed; then redirect to its approved descriptive slug or `/en/insights` |
| `/insights/details/64ae4be3dc42470c4f4485c7` | Hold until the article is reviewed; then redirect to its approved descriptive slug or `/en/insights` |
| `/insights/details/656f4be3d82fa6d1b339a985` | Hold until the article is reviewed; then redirect to its approved descriptive slug or `/en/insights` |
| `/contact` | `/en/contact` |
| `/search` | `/en/search` when enabled; otherwise `/en` |

Legacy insight redirects are deliberately unresolved because the current articles contain stale, generic, or poorly structured material. Do not create new canonical article URLs until editorial review decides whether each item should be rewritten, archived, or retired.

### Arabic routes

Mirror each current `/ar/...` route to the equivalent `/ar/...` canonical route. Known examples:

| Current path | Destination |
|---|---|
| `/ar` | `/ar` |
| `/ar/about` | `/ar/about` |
| `/ar/kreston-global` | `/ar/about#network-affiliation` |
| `/ar/services` | `/ar/services` |
| `/ar/career` | `/ar/careers` |
| `/ar/news-and-events` | `/ar/insights` |
| `/ar/contact` | `/ar/contact` |

Before production, crawl the live website and server logs to add every indexed path, case variant, trailing-slash variant, and historic campaign URL to the redirect collection.

## Slug rules

- Lowercase Unicode where supported.
- Use hyphens between words.
- Do not include database identifiers.
- Do not include dates unless the content type requires them.
- Do not change a published slug without adding a permanent redirect.
- Reserve route words used by fixed sections.
- Validate uniqueness within each locale and content type.
- Strip leading and trailing separators.
- Reject slugs containing encoded path separators, query strings, or fragments.

## Route-to-content mapping

Route files use stable content keys, not display titles. Example:

```text
audit_assurance -> en: audit-assurance
audit_assurance -> ar: audit-assurance until an Arabic slug is approved
```

Changing a title does not change the URL automatically. A slug change is an explicit editorial action with a redirect requirement.

## Canonical and alternate URLs

- Every indexable page declares a self-referencing canonical URL.
- Every page with both published locales declares `en-SA`, `ar-SA`, and `x-default` alternates.
- `x-default` points to the English equivalent.
- Do not declare an alternate URL for an unpublished translation.
- Query-string filter and search-result pages are not canonical content pages.
- Canonicals use the production origin and normalized path without tracking parameters.

## Navigation rules

Primary navigation order:

1. About.
2. Services.
3. Industries, only when enabled.
4. Insights.
5. Careers.
6. Contact.

Header utility items:

- Language switch.
- Search when enabled.
- Request a consultation CTA.

Kreston Global is not a primary navigation item. Its legacy route resolves to the NBB About page affiliation section.

## Breadcrumb rules

- Omit breadcrumbs on the homepage.
- Begin with the localized Home label.
- Use the localized hub label for detail pages.
- The final item is text with `aria-current="page"`, not a link.
- Render matching `BreadcrumbList` structured data from the same route model.
- In RTL, visual direction mirrors while DOM order remains logical.

## Not-found behaviour

A localized 404 must:

- Use the requested valid locale.
- State that the page could not be found.
- Link to Home, Services, Insights, and Contact.
- Exclude itself from indexing.
- Avoid a full-site search box when search is disabled.
- Record only the missing path and referrer in operational logs; do not log form or query contents unnecessarily.

## Redirect verification

Before launch:

- Export all known current URLs.
- Test every redirect for one hop only.
- Confirm permanent status and final HTTP 200.
- Confirm locale is preserved.
- Confirm query parameters are dropped unless they are explicitly required.
- Confirm retired content does not redirect to an unrelated detail page.
- Monitor production 404s for at least four weeks after launch and add justified redirects through review.
