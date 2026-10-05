# Kreston NBB Saudi — Website Discovery & Redesign Starter Brief

Audit date: 2 October 2026  
Source reviewed: <https://kreston-nbb.com> (English and Arabic experiences, main pages, all six service-detail routes, visible assets and front-end styles)

## 1. Recommended direction

Build a bilingual, trust-led professional-services website for **Kreston NBB Saudi**. The firm, its people, Saudi expertise and services must remain the focus. Kreston network membership should appear only as supporting credibility—not as the website's subject.

The redesign should lead with three ideas:

1. **Saudi expertise** — local regulation, business context and access to senior advisers.
2. **Senior, accountable advice** — direct access to experienced professionals who understand the client.
3. **Confident outcomes** — clarity, compliance, risk reduction and better decisions.

Suggested positioning line:

> Clear advice for confident business decisions in Saudi Arabia.

Suggested primary CTA: **Request a consultation**  
Suggested secondary CTA: **Explore our services**

These lines are working copy only; they need client and Kreston brand approval.

## 2. Existing brand system to preserve

### Logo and identity

- Wordmark: **Kreston NBB Saudi**.
- Mark: left-facing layered chevron/arrow using Kreston blue and teal.
- Character: precise, trustworthy, modern, approachable and firmly rooted in the Saudi market.
- Use the supplied master logo, preferably SVG. Do not redraw it from the compressed website image.
- Required client files: full-colour SVG, white/reversed SVG, monochrome version, favicon mark, minimum-size and clear-space rules.

### Extracted colour palette

| Role | Colour | Hex | Current use |
|---|---:|---:|---|
| Kreston blue | Blue | `#189CD8` | Main CTA, links, gradient start |
| Kreston teal | Teal | `#43BBC7` | Header CTA, logo, gradient end |
| Deep slate | Dark blue-grey | `#243746` | Headings, dark sections, overlays |
| Ink | Near-black navy | `#0F172A` | Body copy and interface text |
| Canvas | Cool off-white | `#EEEFF4` | Section backgrounds |
| Surface | White | `#FFFFFF` | Cards, navigation and forms |
| Muted text | Grey | `#6B7280` | Supporting copy |
| Footer muted | Blue-grey | `#8B8EA1` | Footer links on light surface |
| Border | Light grey | `#E5E7EB` | Inputs, cards and dividers |
| Link accent | Sky blue | `#0EA5E9` | Editorial links |

Core gradient: `linear-gradient(90deg, #189CD8 0%, #43BBC7 100%)`

Recommended colour use:

- Use deep slate and white for most of the interface; reserve blue/teal for action and emphasis.
- Use the gradient sparingly for one major action or signature graphic per screen.
- Avoid pale teal text on white. Text and controls must meet WCAG 2.2 AA contrast.
- Use photography, whitespace and type hierarchy—not more colours—to add visual richness.

### Typography

Current site:

- English: Inter.
- Several components and Arabic content: Tahoma.
- The mix is inconsistent across buttons, headings and cards.

Recommended starter system:

- English: **Inter**, weights 400, 500, 600 and 700.
- Arabic: **Noto Sans Arabic** or another Kreston-approved Arabic companion; Tahoma as system fallback.
- Display: 48–64 px desktop, 36–44 px tablet, 32–38 px mobile.
- H2: 32–44 px; H3: 22–28 px; body: 16–18 px; metadata: no smaller than 14 px.
- Keep body text around 65–75 characters per line and use 1.5–1.7 line height.

### Visual language

Preserve:

- Blue/teal identity.
- Saudi context.
- Clean professional-services tone.
- Kreston network affiliation as a secondary trust signal.

Improve:

- Replace generic skyline-only storytelling with authentic office, leadership and client-context photography.
- Use one consistent set of simple line icons.
- Use generous white space, strong editorial type and restrained motion.
- Prefer real advisers and client situations over stock handshakes, glass towers and generic AI imagery.
- Use the chevron geometry as a subtle crop, mask, divider or directional device.

## 3. Existing website inventory

### Current pages

- Home
- About
- Kreston Global (current legacy page; absorb into the NBB About page or redirect)
- Services
  - Financial Audit and Consulting
  - Internal Audit Service
  - Tax Services
  - Accounting and Advisory Services
  - Management Services
  - Operations and Technology Consulting
- Insights
- News & Events
- Careers
- Contact
- Search
- Arabic mirrors under `/ar`

### Current trust material

- Kreston network membership as supporting evidence.
- Network size and ranking counters.
- Forum of Firms reference.
- Global reach map, currently overemphasised for an NBB-focused site.
- Riyadh office details.
- A small number of insights and one 2023 news article.

### Current reusable assets

- Website logo: `/images/logo/logo3.png`
- Hero aerial video: `/uploads/upload1693739760796.mp4`
- Global map: `/images/mapwhite.png` — inventory only; it does not need to appear in the redesign.
- Six service SVG illustrations under `/uploads/`
- Network-stat icons under `/images/icon/`
- About/insight photography under `/uploads/`
- Inter and Tahoma font files

Treat these as a migration inventory, not automatic approval to reuse them. Ask the client which assets are licensed, current and available in original quality.

## 4. High-priority problems found

### Critical content and conversion issues

- **All six service-detail pages render without their service title or body content.** They show only “Other Services,” a generic enquiry form and footer.
- The homepage does not give visitors a direct next step inside the hero.
- The site does not identify named experts, leadership, credentials, sector depth, case studies or client outcomes.
- The contact page displays headings such as “Office Address” and “Office Email” but the visible extracted page content contains no corresponding values.
- The only prominent news item is a 2023 conference, which makes the firm appear inactive.
- “Get Started” is vague for a high-trust advisory firm.

### Accuracy and trust issues

- Network statistics conflict across the site: 22,000 vs 25,000 people, 115 vs 120 countries, and 160 vs 170 firms.
- The current site gives significant space to Kreston network statistics. These are not central to the Kreston NBB proposition and should be removed from the homepage or reduced to one supporting affiliation statement. If any figures remain, Kreston's current official site states **30,000+ people, 155+ firms, 110+ countries, 800+ offices, $4.3bn revenue and 13th global ranking**; confirm them before publishing.
- The current footer address and phone differ from the current Kreston Global member listing. The client must confirm the canonical legal name, office address, map pin, phone and email.
- Kreston Global announced CMA approval for Kreston NBB Saudi in September 2026. This is a major, current trust signal and should be reflected on the new site only with approved wording and scope.
- Copy contains errors or awkward language such as “Forum of Forms,” “in the Saudi,” repeated superlatives and unclear claims.

### Contact and form defects

- The footer phone link uses the invalid `phone:` scheme and appears to contain an email value; it should use a verified `tel:` URL.
- A footer link labelled “youtube” points to X/Twitter.
- Several forms use `GET`, have unnamed fields, no required validation and no visible privacy consent.
- Contact fields rely on placeholders or incomplete labelling.
- The career form asks for date of birth and gender. The client should justify whether these are necessary, lawful and appropriate for recruitment; the safer default is to remove them.
- CV upload needs an explicit privacy notice, retention policy, file limits, malware scanning and secure delivery.

### Arabic experience

- The page uses RTL correctly at document level, but the localisation is incomplete.
- On the Arabic homepage, 44 of 91 sampled text elements still contained English.
- The Arabic hero text refers generically to industrial contracting solutions and does not match an accounting/advisory firm.
- Service names, service descriptions, global-reach copy and footer headings remain English.
- Arabic content needs professional translation and market review, not word-for-word machine translation.

### SEO and discovery

- Meta descriptions are missing, generic (`Kreston nbb`) or literally “Put your description here.”
- Several important pages have no H1; service-detail pages contain an empty H1.
- No canonical tags or JSON-LD structured data were detected on the audited pages.
- `/robots.txt` and `/sitemap.xml` return 404.
- Page titles are missing or weak; the contact page has no title.
- Insight URLs use database IDs instead of descriptive slugs.
- There are no obvious `Organization`, `LocalBusiness/ProfessionalService`, `Service`, `Article` or `BreadcrumbList` schemas.

### Accessibility and UI consistency

- Heading levels skip from H2 to H5 for statistics.
- Multiple actions have no accessible name.
- Many images use generic alt text such as `map`, `service`, `staff` or `logo` rather than meaningful descriptions—or decorative empty alt text.
- About-page fields are unlabelled; some career fields lack reliable labels.
- Typography alternates between Inter and Tahoma without a clear rule.
- Some interactive text is only 12 px.
- The autoplay hero video should provide a poster, reduced-motion behaviour, no essential audio and a lightweight mobile fallback.

### Legal and governance gaps to confirm

- Privacy policy, cookie policy, terms and accessibility statement are not prominent in the current footer.
- Forms need consent language, storage location, recipient and retention rules.
- Published claims, credentials, statistics and testimonials need an owner and review date.
- Kreston trademark and member-firm disclaimer wording must come from Kreston/client legal approval.

## 5. Recommended information architecture

### Primary navigation

1. **About**
   - Our firm
   - Leadership and team
   - Credentials and governance
   - Our network affiliation (a short supporting section, not a separate brand story)
2. **Services**
   - Audit & Assurance
   - Internal Audit, Risk & Compliance
   - Tax & Zakat
   - Accounting & Advisory
   - Management Consulting
   - Operations & Technology
3. **Industries**
   - Launch only the sectors the client can substantiate with expertise, named advisers and relevant work.
4. **Insights**
   - Articles
   - News & Events
   - Guides and reports
5. **Careers**
6. **Contact**

Header CTA: **Request a consultation**  
Utility: EN / العربية

Combine the current Insights and News areas into one maintained editorial hub. Remove Kreston Global from the primary navigation. The current `/kreston-global` page should redirect to the relevant affiliation section on the NBB About page unless there is a contractual requirement to keep it.

### Recommended URL pattern

- `/en/about`
- `/en/services/audit-assurance`
- `/en/services/tax-zakat`
- `/en/industries/financial-services`
- `/en/insights/article-slug`
- `/ar/...` with mirrored, human-approved Arabic slugs where the CMS permits

Use 301 redirects from every current indexed URL.

## 6. Homepage blueprint

1. **Header** — logo, concise navigation, language switch, consultation CTA.
2. **Hero** — Saudi-market value proposition, one proof point, two CTAs and authentic Riyadh/firm imagery.
3. **Trust strip** — approved Saudi credentials, CMA approval if approved, Kreston membership and one other relevant local proof point.
4. **Services** — six outcome-led cards with clear service-page links.
5. **Why Kreston NBB** — Saudi regulatory understanding + senior attention + responsive delivery.
6. **Industries** — 4–6 evidence-backed priority sectors.
7. **Featured insight** — one useful, dated Saudi regulatory/business article.
8. **Leadership** — managing partner and relevant service leads.
9. **Connected when needed** — one concise statement explaining that NBB can draw on the wider Kreston network for cross-border assignments. Do not turn this into a large statistics section.
10. **Conversion band** — “Talk to an adviser about your next decision.”
11. **Footer** — verified contact data, legal links, social channels, member-firm disclaimer and language link.

## 7. Page-level content requirements

### Every service page should include

- Clear H1 and one-sentence outcome.
- Who the service is for.
- Business problems solved.
- Specific sub-services and deliverables.
- Saudi regulatory/local context.
- Working approach or engagement stages.
- Relevant sectors.
- Named lead adviser with contact route.
- Credentials or approved proof.
- Related insight.
- 3–6 useful FAQs.
- Consultation CTA.

### About page

- Accurate firm story and legal identity.
- Local leadership and team.
- Values demonstrated through behaviour, not generic adjectives.
- Kreston relationship and member-firm independence disclaimer.
- Approved memberships, licences and credentials.
- Office presence and sectors served.

### Insights

- Publication date, author, role, category and reading time.
- Saudi-specific tax, zakat, audit, CMA and business guidance.
- Search and filters that actually work.
- Clear content-owner and review/expiry process.
- Article schema, social image and related-service CTA.

### Contact

- Verified legal office address, map pin, phone, email and working hours.
- Service/topic selector to route enquiries.
- Named response expectation, e.g. “We reply within one business day,” only if operationally true.
- Privacy consent and success/error states.
- Separate careers route; do not mix job applications with sales enquiries.

## 8. Starter messaging

### Hero option

**Saudi insight. Confident decisions.**

Audit, tax and advisory expertise for organisations navigating growth, regulation and change in Saudi Arabia and beyond.

Primary CTA: **Request a consultation**  
Secondary CTA: **Explore our services**

### Three value pillars

- **Local clarity** — guidance grounded in Saudi regulation and business realities.
- **Senior attention** — practical advice from experienced professionals who know your organisation.
- **Connected capability** — access to relevant Kreston specialists when an engagement crosses borders.

### Tone of voice

- Confident, not boastful.
- Specific, not generic.
- Human and direct, not bureaucratic.
- Evidence-led, not superlative-led.
- Equally natural in English and Arabic.

Avoid unsupported phrases such as “top accounting firm,” “best financial services” or “top-ranked” unless the exact source, date and scope are approved.

## 9. Design and component starter list

- Responsive header and Arabic-aware navigation.
- Breadcrumbs.
- Hero with static-image and reduced-motion variants.
- Trust/proof strip.
- Service card and service detail template.
- Industry card.
- Adviser profile card.
- Case study/testimonial pattern.
- Insight card, filters and article template.
- Statistic component using semantic text, not H5 headings.
- Accordion for FAQs.
- Contact and consultation forms.
- Alert, success and validation states.
- Bilingual footer.
- Cookie/consent interface if required by the approved policy.

All components must support LTR and RTL without separate duplicated markup.

## 10. Technical starting point

Recommended capabilities rather than a mandated stack:

- Modern server-rendered framework or CMS with strong bilingual/RTL support.
- Editor roles, draft/approval workflow and scheduled publishing.
- Structured service, team, insight and office content types.
- Image optimisation, responsive formats and CDN delivery.
- Static hero fallback and optional compressed video only where it improves the experience.
- Server-side form handling, spam protection and integration with the client's approved CRM or mailbox.
- Analytics and consent configuration owned by the client.
- Automated XML sitemap, robots file, canonical tags, hreflang and redirects.
- Core Web Vitals monitoring, error logging and uptime monitoring.
- Search that indexes Arabic and English independently.

## 11. Client requirements checklist

### Brand

- [ ] Kreston/NBB brand guideline documents.
- [ ] Master logo files and usage restrictions.
- [ ] Approved fonts and Arabic typography.
- [ ] Photography/video rights and original files.
- [ ] Which Kreston network brand rules Kreston NBB must follow.

### Business and compliance

- [ ] Exact legal entity name in English and Arabic.
- [ ] Current licence and CMA approval wording/scope.
- [ ] Approved Kreston member-firm disclaimer.
- [ ] Canonical office address, phone, email, map pin and working hours.
- [ ] Privacy, cookies, terms, recruitment-retention and accessibility policies.
- [ ] Required Saudi hosting, data-residency or security constraints.

### Audiences and conversion

- [ ] Priority client types and company sizes.
- [ ] Priority Saudi and cross-border sectors.
- [ ] Top three reasons clients choose the firm.
- [ ] Most valuable enquiry types.
- [ ] Lead owner, routing rules and response-time commitment.
- [ ] CRM, newsletter, analytics and marketing integrations.

### Content

- [ ] Approved description for every service and sub-service.
- [ ] Leadership bios, roles, headshots and LinkedIn URLs.
- [ ] Credentials, awards, memberships and dates.
- [ ] Approved client logos, testimonials and case studies.
- [ ] Content migration list and items to retire.
- [ ] English and Arabic approvers.
- [ ] Editorial owner and publishing cadence.

### Delivery

- [ ] CMS preference and internal editors.
- [ ] Hosting, domain/DNS and deployment ownership.
- [ ] Accessibility target: WCAG 2.2 AA recommended.
- [ ] Browser/device support.
- [ ] Budget, target launch date and approval milestones.
- [ ] Post-launch maintenance and SLA.

## 12. Recommended first release

### Phase 1 — foundation

- Confirm brand, legal identity, contact data, audiences and service taxonomy.
- Approve the English and Arabic voice and translation workflow.
- Produce sitemap, wireframes and a shared content model.

### Phase 2 — MVP design and build

- Home, About, Services, six service pages, Leadership, Insights, Careers and Contact.
- Complete English and Arabic content.
- Forms, analytics, SEO foundations, accessibility and redirects.

### Phase 3 — growth

- Industry pages, adviser profiles, case studies, downloadable guides, CRM automation and a sustained insight programme.

Do not begin high-fidelity design until the legal identity, contact data, bilingual content ownership and Kreston brand rules are confirmed. The extracted palette and tokens are sufficient for low-fidelity wireframes and an initial component prototype.

## 13. Minimum acceptance criteria

- Every service page contains useful, approved content and a named conversion path.
- English and Arabic are complete, equivalent and professionally reviewed.
- All contact details and credentials match approved official records.
- No placeholder metadata or empty headings.
- Unique title, description, canonical and H1 for every indexable page.
- Sitemap, robots, hreflang, schema and redirects are in place.
- Forms are secure, labelled, validated, privacy-aware and tested end to end.
- WCAG 2.2 AA checks pass for keyboard access, focus, contrast, labels and reduced motion.
- Mobile, tablet, desktop and RTL layouts are visually verified.
- All credentials, network references and other dated claims have an owner and review date.

## Sources checked

- Current firm website: <https://kreston-nbb.com/>
- Current firm services: <https://kreston-nbb.com/services>
- Current firm about page: <https://kreston-nbb.com/about>
- Kreston Global member listing: <https://www.kreston.com/members/kreston-nbb/>
- Kreston Global about/network figures: <https://www.kreston.com/about-kreston-global/>
- Kreston Global service/network figures: <https://www.kreston.com/about-kreston-global/serving-your-international-business-needs/>
- Kreston Global CMA approval announcement: <https://www.kreston.com/ninja-forms/5knsx/>
