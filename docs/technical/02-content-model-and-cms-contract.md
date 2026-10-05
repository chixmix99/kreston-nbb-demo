# Kreston NBB Content Model and CMS Contract

Status: Adopted for demo content  
Production status: CMS vendor and final editorial workflow require confirmation

## Content outcome

All publishable facts must be stored as structured, localized records instead of being embedded in page components. English and Arabic records share stable internal identifiers but have separate publication status, public slugs, copy, metadata, and review history.

The demo will use local records that satisfy this contract. Any production CMS must implement the same fields, relationships, validation, and publication rules.

## Shared field types

### Locale

Allowed values: `en`, `ar`.

### Publication status

Allowed values:

- `draft`
- `in_review`
- `approved`
- `scheduled`
- `published`
- `archived`

Only `published` records are available on the public production site. Demo records may use `draft` and be exposed only in the controlled demo build.

### SEO fields

Every indexable record contains:

| Field | Type | Rule |
|---|---|---|
| `metaTitle` | string | Required before publication and unique within the locale. |
| `metaDescription` | string | Required before publication; describe the page specifically. |
| `canonicalPath` | string | Derived from the route and validated against the record locale. |
| `socialImage` | asset reference | Optional in the demo; required for priority production pages. |
| `noIndex` | boolean | Defaults to false for published public content. |

### Asset reference

| Field | Type | Rule |
|---|---|---|
| `assetId` | string | Stable internal identifier. |
| `src` | string | Local path for demo or CMS asset URL in production. |
| `width` | integer | Required for raster images. |
| `height` | integer | Required for raster images. |
| `alt` | string | Localized. Empty only for decorative images. |
| `caption` | string | Optional, localized. |
| `credit` | string | Required when licence or attribution demands it. |
| `rightsStatus` | enum | `unknown`, `client_owned`, `licensed`, `approved_external`, `do_not_use`. |
| `rightsEvidence` | string or reference | Required before production use unless client-owned status is documented. |

An asset with `unknown` or `do_not_use` rights cannot be published in production.

### Review fields

Every material claim record contains:

- `owner`
- `approvedBy`
- `approvedAt`
- `reviewDueAt`
- `sourceReference`

Demo records may leave approval fields empty only when the UI does not present the content as verified fact.

## Site settings

One localized record per locale.

Required fields:

- Site name.
- Default SEO title and description.
- Navigation labels and route keys.
- Primary and secondary CTA labels.
- Footer navigation.
- Social links.
- Legal page links.
- Kreston affiliation statement.
- Member-firm disclaimer.
- Default social image.
- Organization structured-data settings.

Production blockers:

- Exact legal name.
- Approved affiliation wording.
- Approved disclaimer.
- Verified social profiles.

## Home page

Required fields:

- `heroEyebrow` optional.
- `heroTitle`.
- `heroSummary`.
- `primaryCta`.
- `secondaryCta`.
- `heroMedia` optional.
- Ordered proof references.
- Featured service references.
- Why NBB heading and value items.
- Featured industry references, only when Industry content is enabled.
- Featured insight reference.
- Featured leadership references.
- Network-affiliation heading and short statement.
- Final conversion heading and CTA.
- SEO fields.

Validation:

- One H1-equivalent title only.
- Exactly one primary action in the hero.
- No network statistics unless they are approved, sourced, dated, and assigned an owner.
- Omit empty optional sections completely.

## Service

One record per service per locale.

Required fields:

| Field | Type | Notes |
|---|---|---|
| `serviceKey` | enum | Stable across locales. |
| `locale` | locale | Required. |
| `name` | string | Public H1. |
| `slug` | string | Unique within locale. |
| `summary` | string | One concise outcome statement. |
| `audiences` | string array | Who the service is for. |
| `problems` | structured list | Business problems addressed. |
| `subServices` | structured list | Title and explanation for each offer. |
| `deliverables` | structured list | What the client receives. |
| `saudiContext` | rich text | Local regulatory or operating context, with evidence. |
| `approach` | ordered steps | Engagement stages without invented promises. |
| `leadPeople` | person references | At least one required for production. |
| `credentials` | credential references | Optional; every displayed item must be approved. |
| `relatedInsights` | insight references | Optional. |
| `faqs` | FAQ list | Three to six useful items recommended. |
| `cta` | CTA | Defaults to consultation intent for the service. |
| `heroImage` | asset reference | Optional. |
| `icon` | asset reference | Optional. |
| `seo` | SEO fields | Required before publication. |

Allowed `serviceKey` values:

- `audit_assurance`
- `internal_audit_risk_compliance`
- `tax_zakat`
- `accounting_advisory`
- `management_consulting`
- `operations_technology`

Demo rule: use working copy derived from the strategy and current service inventory, clearly treated as unapproved. Do not reproduce awkward or outdated claims merely because they appear on the current site.

## Person

Required fields:

- Stable person identifier.
- Locale.
- Full display name.
- Public slug.
- Role title.
- Short biography.
- Full biography.
- Service references.
- Industry references when approved.
- Credentials with exact approved wording.
- Photograph and rights status.
- Optional approved professional profile link.
- Display order.
- SEO fields for indexable profiles.

Do not store or publish private telephone numbers or personal email addresses without explicit approval. Use a routed adviser-contact action when possible.

## Credential

Required fields:

- Credential identifier.
- Localized display name.
- Issuer.
- Approved claim text.
- Scope.
- Evidence reference.
- Effective date.
- Expiry date if applicable.
- Owner.
- Review due date.
- Publication status.

An expired, unapproved, or evidence-free credential must never render. CMA wording is a production blocker until Kreston NBB supplies the approved scope and exact language.

## Industry

Required fields:

- Stable industry key.
- Localized name and slug.
- Summary.
- Client issues.
- Relevant service references.
- Responsible person references.
- Proof or experience statements with evidence.
- Related insights.
- CTA.
- SEO fields.

No Industry record can reach `published` without a named responsible adviser and evidence of relevant work. The entire Industry feature remains disabled until at least three credible records pass this rule.

## Insight

Required fields:

- Stable insight identifier.
- Locale and localized slug.
- Content type: `article`, `guide`, `report`, `news`, or `event`.
- Title.
- Summary.
- Structured body content.
- Author references.
- Publication date.
- Last reviewed date.
- Review due date.
- Topic tags.
- Related service references.
- Related industry references.
- Hero or social image.
- Optional downloadable asset with rights and file metadata.
- SEO fields.

Rules:

- Do not import raw Microsoft Word HTML or inline styles from the legacy database.
- Sanitize allowed rich-text elements at ingestion.
- Every article needs a named author or approved organizational author.
- Expired regulatory content must be reviewed, archived, or marked with an update notice.
- News and Events are content types within Insights, not a separate primary section.

## Office

Required fields:

- Exact legal entity name.
- Public office name.
- Localized address lines.
- City, region, country, and postal code.
- Latitude and longitude.
- Map URL.
- Telephone display value and normalized `tel:` value.
- Email display value and normalized `mailto:` value.
- Working hours and timezone.
- Enquiry routing destination reference.
- Review owner and date.

Every value in this record is a production blocker because the current site renders empty or undefined contact details and the strategy notes conflicting external information.

## Career vacancy

Required fields:

- Stable vacancy identifier.
- Locale and localized slug.
- Approved job title.
- Location.
- Employment type.
- Team or service line.
- Summary.
- Responsibilities.
- Requirements.
- Application deadline if applicable.
- Application route.
- Publication and expiry dates.
- Recruitment owner.

Do not migrate the current Quality Assurance, IT Admin, or Software Engineer entries. They appear unrelated to the Kreston NBB Saudi website and include placeholder content.

## Legal page

Allowed keys:

- `privacy`
- `cookies`
- `terms`
- `recruitment_privacy`
- `accessibility`

Required fields:

- Locale.
- Title.
- Structured body.
- Effective date.
- Last reviewed date.
- Owner.
- ApprovedBy.
- SEO fields.

Legal pages cannot use demo-generated policy language in production. They require client or legal approval.

## Navigation and CTA

Navigation items store a route key rather than a manually typed URL. Each item includes:

- Localized label.
- Route key.
- Optional related content identifier.
- Display order.
- Visibility flag.
- Optional child items.

CTAs include:

- Localized label.
- Intent: `consultation`, `service_explore`, `contact_adviser`, `read_content`, or `apply`.
- Route key or content reference.
- Analytics identifier.

External URLs require protocol validation and an explicit `external` flag.

## Rich-text allowlist

Allowed editorial elements:

- Paragraphs.
- H2 and H3 headings.
- Ordered and unordered lists.
- Strong and emphasis.
- Internal and approved external links.
- Block quotations when attributed.
- Tables only for genuinely tabular information.
- Approved images with captions.

Disallowed content:

- Inline scripts.
- Inline event handlers.
- Arbitrary iframes.
- Inline styling copied from Word.
- Empty paragraphs used for spacing.
- H1 inside body content.
- Unreviewed embedded forms.

## Editorial workflow

1. Author creates or edits a locale record.
2. Subject-matter reviewer confirms technical claims.
3. Arabic or English editor reviews the native-language version independently.
4. Compliance owner approves credentials, licences, statistics, disclaimers, and regulatory claims.
5. Publisher validates preview, links, metadata, and review date.
6. Publisher releases the record.
7. The system alerts the owner before the review date.

English publication must not automatically publish the Arabic record. Production navigation and sitemaps must include only published locale records.

## Build-time validation

The build must fail when:

- A published record has a missing required field.
- Two published records share a locale and slug.
- A route references missing published content.
- An indexable page lacks a title or description.
- A displayed credential is unapproved, expired, or lacks evidence.
- A raster image lacks dimensions.
- An informative image lacks localized alt text.
- An Arabic page contains placeholder English interface labels.

The build should warn when:

- An insight is approaching its review date.
- Optional related content is absent.
- A social image is missing.
- A published page is not linked from navigation, a hub, or another indexable page.

## CMS selection requirements

The eventual CMS must provide:

- Structured content and references.
- Independent English and Arabic records.
- Draft, review, approval, scheduled publication, and archive states.
- Role-based access.
- Preview support.
- Asset metadata and rights fields.
- Webhooks for selective revalidation.
- Revision history and audit trail.
- Redirect management or an exportable redirect collection.
- Content export and backup.
- API access that does not require exposing write credentials to the browser.

A CMS that cannot enforce locale-specific publication status or claim-review metadata is not acceptable.
