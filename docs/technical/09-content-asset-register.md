# Kreston NBB Content and Asset Register

Status: Initial register based on workspace files and the public website  
Review date: 2 October 2026

## Register rules

This register records what is known, what may support the demo, what must be rewritten, and what is blocked. Public availability does not prove ownership or permission to reuse an asset.

Status values:

- `demo`: may be used in the controlled demo with a provisional marker.
- `review`: may be useful but requires editorial, factual, or rights review.
- `production blocker`: a verified client-supplied value is required.
- `retire`: do not migrate.

## Workspace documents

| Item | Path | Status | Use |
|---|---|---|---|
| Strategy and redesign plan | `Kreston_NBB_Website_Strategy_and_Redesign_Plan.docx` | demo | Primary approved planning source until superseded. |
| Discovery brief | `kreston-nbb-website-discovery-brief.md` | demo | Audit evidence, direction, and implementation requirements. |
| Design tokens | `kreston-nbb-design-tokens.css` | demo | Provisional colour, type, spacing, layout, focus, and motion tokens. |
| Report generator | `build_kreston_nbb_report.py` | review | Reproducibility reference only; not part of the website application. Its paths are workspace-relative and it uses `kreston-nbb-logo.png` only when that optional local source exists. |

## Brand assets

| Asset | Current source | Status | Required action |
|---|---|---|---|
| Website logo PNG | `/images/logo/logo3.png` | demo | May support the demo. Request official full-colour SVG, reversed SVG, monochrome mark, favicon, clear-space, and minimum-size rules. |
| Blue and teal palette | Current styles and workspace tokens | demo | Confirm against official Kreston NBB and applicable network brand guidance. |
| Inter font | Current site font asset and strategy | review | Confirm licence, approved weights, and production delivery method. |
| Tahoma | Current site fallback | review | Do not treat as the preferred Arabic brand typeface without approval. |
| Noto Sans Arabic | Strategy recommendation | review | Confirm brand approval and font-delivery plan. |
| Chevron geometry | Visible logo characteristic | review | May inspire restrained crops or direction devices; do not redraw the official logo. |

## Current website media

| Asset | Current path | Status | Required action |
|---|---|---|---|
| Hero video | `/uploads/upload1693739760796.mp4` | review | Confirm ownership and purpose. Create poster and mobile fallback if retained. Default demo should use a static hero. |
| Current hero image | `/uploads/upload1689768831581.png` | review | Inspect quality and rights before any reuse. |
| About image | `/images/about.png` | review | Request original, caption, subject consent where relevant, and rights evidence. |
| Global map | `/images/mapwhite.png` | retire | Not needed for the NBB-first homepage. |
| Network-stat icons | `/images/icon/*.png` | retire | Do not migrate automatically; the related global counters are secondary and inconsistent. |
| Audit service icon | `/uploads/upload1701857461295.svg` | review | Inspect source, style consistency, and rights. |
| Internal audit icon | `/uploads/upload1701857542378.svg` | review | Inspect source, style consistency, and rights. |
| Tax service icon | `/uploads/upload1701857371415.svg` | review | Inspect source, style consistency, and rights. |
| Accounting and advisory icon | `/uploads/upload1697709962458.svg` | review | Inspect source, style consistency, and rights. |
| Management services icon | `/uploads/upload1697710081135.svg` | review | Inspect source, style consistency, and rights. |
| Operations and technology icon | `/uploads/upload1697710197053.svg` | review | Inspect source, style consistency, and rights. |
| Service raster images | Various `/uploads/` files | review | Do not migrate generic duplicates without selection and rights approval. |
| Insight images and video | Various `/uploads/` files | review | Tie each approved asset to a reviewed insight record and rights evidence. |

## Required new asset pack

Production blockers:

- Official logo package.
- Favicon and application icon sources.
- Leadership headshots with consent and rights.
- Authentic office and team photography.
- Approved Riyadh or Saudi context photography where useful.
- Social-sharing image templates.
- Approved service icon family.
- Image credits and licence records.
- Arabic and English font files or licensed hosted sources.

Do not generate realistic employee portraits or imply that stock or generated people work for Kreston NBB.

## Company information

| Information | Current evidence | Status | Required action |
|---|---|---|---|
| Exact legal name | Workspace documents identify Kreston NBB Saudi, but exact legal form is unconfirmed | production blocker | Obtain approved English and Arabic legal names. |
| Firm description | Existing About copy and new positioning direction | review | Rewrite around NBB Saudi, services, people, and evidence. |
| Address | Current public output is empty; strategy notes conflicting sources | production blocker | Obtain canonical address and formatted locale variants. |
| Map pin | Current site links to a Riyadh map location | production blocker | Confirm exact coordinates and approved map URL. |
| Telephone | Current public HTML renders `phone:undefined` | production blocker | Obtain display and normalized `tel:` values. |
| Email | Current public HTML renders `mailto:undefined` | production blocker | Obtain public address and routing owner. |
| Working hours | Not verified | production blocker | Obtain localized hours and holiday handling. |
| Social channels | Current footer output does not provide verified links | production blocker | Obtain official profile URLs and remove incorrect links. |

The application must omit absent values instead of displaying empty labels, placeholder text, or invalid links.

## Service inventory

| Stable key | Current title | New working title | Legacy ID | Status |
|---|---|---|---|---|
| `audit_assurance` | Financial Audit and Consulting | Audit and Assurance | `64ae7d153a75882b4691e53c` | review |
| `internal_audit_risk_compliance` | Internal Audit Service | Internal Audit Risk and Compliance | `64da619f8aa93ee30dc0ff9d` | review |
| `tax_zakat` | Tax Services | Tax and Zakat | `64ae85d2ce928849ed89c8b1` | review |
| `accounting_advisory` | Accounting And Advisory Services | Accounting and Advisory | `64ae85cace928849ed89c8ae` | review |
| `management_consulting` | Management Services | Management Consulting | `64ae85cdce928849ed89c8af` | review |
| `operations_technology` | Operations And Technology Consulting | Operations and Technology | `64ae85d5ce928849ed89c8b2` | review |

The public Services hub contains descriptions for all six services, but the detail routes render without the selected service content. Existing copy is a research source only. It needs subject-matter review, Saudi-specific terminology, proofreading, and restructuring into the service model in document 02.

For every service, request:

- Approved name.
- One-sentence outcome.
- Target clients.
- Problems addressed.
- Sub-services.
- Deliverables.
- Saudi regulatory context.
- Engagement stages.
- Responsible advisers.
- Approved credentials and evidence.
- Related Insights.
- FAQs.
- Enquiry routing owner.
- English and Arabic approval.

## About leadership and credibility

| Content | Current state | Status | Required action |
|---|---|---|---|
| NBB firm story | Existing About page shifts heavily into Kreston Global history | review | Replace with verified Kreston NBB Saudi history and operating proposition. |
| Leadership | No reliable named leadership content in supplied sources | production blocker | Obtain names, roles, bios, services, credentials, links, and photos. |
| Kreston affiliation | Present, but overemphasized and linked to conflicting statistics | review | Use concise approved wording and member-firm disclaimer. |
| Forum of Firms reference | Existing copy contains `Forum of Forms` error | review | Confirm whether NBB may make the claim and obtain exact wording. |
| CMA status | Strategy identifies a September 2026 announcement | production blocker | Obtain approved wording, scope, effective date, evidence, owner, and review date. |
| Other licences and memberships | Not supplied | production blocker | Obtain exact approved records or omit them. |
| Testimonials and client logos | Not supplied | production blocker | Use only with written approval and usage rights. |
| Case studies | Not supplied | production blocker | Obtain approved, non-confidential examples or omit the section. |

## Insights and news inventory

| Current item | Current route or ID | Status | Required action |
|---|---|---|---|
| The Saudi Financial Landscape Overview | `64ae48eac812d1af1f0c365a` | review | Fact-check, rewrite, assign author and review date, or retire. |
| Doing Business In Saudi Arabia | `64ae4be3dc42470c4f4485c7` | review | Replace generic promotional prose with useful sourced guidance, or retire. |
| Vision 2030 | `656f4be3d82fa6d1b339a985` | review | Check currency, structure, attribution, and relevance before any migration. |
| Kreston World and EMEA Conference 2023 | `/news-and-events` | retire or archive | Do not feature as recent content. Preserve only if an approved archive needs it. |

Before a current item receives a new descriptive URL, editorial review must decide whether it is rewritten, archived, or retired. Avoid redirecting an old article to unrelated new material.

Required initial editorial pack:

- One current Saudi regulatory or business insight.
- One service-led guide or FAQ article.
- Named author and role.
- Publication and review dates.
- Approved imagery.
- Arabic equivalent or explicit decision not to publish the locale yet.

## Careers inventory

The current site lists Quality Assurance in Palakkad, IT Admin in India with lorem ipsum, and Software Engineer in Kerala. These records do not support the Kreston NBB Saudi careers proposition.

Status: `retire`.

Required production content:

- Employer proposition.
- Recruitment process.
- Approved Saudi vacancies or a verified no-vacancies state.
- Recruitment contact or system.
- Application fields.
- Recruitment privacy notice.
- CV file, scanning, storage, access, and retention rules.
- English and Arabic copy.

## Arabic content

The current Arabic homepage refers to industrial contracting and the About record contains English body content. Existing Arabic cannot be treated as approved translation.

Status: `retire` for publication copy; `review` only as evidence of current defects.

Required production pack:

- Native Arabic value proposition.
- Approved service terminology glossary.
- Full navigation and interface labels.
- Complete page copy and metadata.
- Form labels, hints, errors, and confirmations.
- Image alt text.
- Structured-data text.
- Legal pages.
- Native-language editorial and market review.

## Legal and policy content

Production blockers:

- Privacy notice.
- Cookie notice and consent requirements.
- Website terms.
- Recruitment privacy notice.
- Accessibility statement.
- Member-firm and liability disclaimer.
- Approved trademark usage language.

Do not generate these as final legal policies from assumptions. Engineering may create route placeholders that remain inaccessible in production until approved content exists.

## Content migration rules

- Export source content and retain stable legacy identifiers for redirect mapping.
- Convert meaningful text into the structured model rather than copying page HTML.
- Remove inline Word styling, empty paragraphs, malformed lists, and obsolete classes.
- Fact-check all regulatory and numeric claims.
- Record author, owner, approval, and review date.
- Replace database-ID slugs with descriptive public slugs.
- Migrate only assets with confirmed rights.
- Verify every migrated page in English and Arabic independently.
- Archive the original export securely if required; do not ship it in the browser bundle.

## Minimum client request before production

1. Brand pack and usage rules.
2. Verified legal and contact sheet.
3. Approved six-service content pack.
4. Leadership and credentials pack.
5. Exact Kreston affiliation and disclaimer wording.
6. English-Arabic terminology and approval owners.
7. Form routing, privacy, security, and retention decisions.
8. CMS, hosting, domain, analytics, and maintenance owners.

Until those items arrive, implementation should proceed with controlled working content and disabled production integrations.
