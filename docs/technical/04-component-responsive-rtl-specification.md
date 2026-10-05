# Kreston NBB Component Responsive and RTL Specification

Status: Ready for implementation  
Design authority: Strategy document and `kreston-nbb-design-tokens.css`

## Interface outcome

Create a restrained professional-services interface that makes Kreston NBB's services, people, Saudi context, and enquiry path easy to understand. Components must work from 320 CSS pixels upward, support English and Arabic with the same markup, and meet WCAG 2.2 AA requirements.

The blue and teal identity is an accent system. Deep slate, white, and neutral surfaces should carry most of the interface. Do not reproduce the current site's dense global statistics, empty sections, generic button labels, or video-first mobile hero.

## Token rules

Use `kreston-nbb-design-tokens.css` as the provisional source for:

- Brand and neutral colours.
- Typography families and scale.
- Spacing.
- Container widths.
- Radius and shadow.
- Motion duration and easing.
- Focus treatment.

Copy the tokens into the future application as `styles/tokens.css` when implementation begins. Do not maintain two divergent token sets.

Production requires confirmation of official brand colours, typefaces, logo clear space, and permitted gradient use.

## Responsive foundations

Use content-driven layouts rather than device-specific pages. Recommended CSS breakpoints:

| Name | Minimum width | Use |
|---|---:|---|
| Base | 0 | Single-column phones. |
| `sm` | 640 px | Wider phone and small two-column patterns. |
| `md` | 768 px | Tablet layout changes. |
| `lg` | 1024 px | Desktop navigation and multi-column page layout. |
| `xl` | 1280 px | Maximum content composition. |
| `2xl` | 1440 px | Additional outer space, not wider reading measures. |

Rules:

- Support 320 px without horizontal page scrolling.
- Use `--page-gutter` for page edges and `--container-wide` for the maximum shell.
- Keep sustained prose within `--container-content`.
- Use CSS Grid for repeated cards and Flexbox for small alignment groups.
- Allow text to determine component height.
- Do not clamp essential copy to a fixed number of lines.
- Do not reorder meaningful content with CSS.

## Page shell

Every page contains:

1. Skip link.
2. Site header.
3. Main landmark with one H1.
4. Footer.

Optional breadcrumbs appear inside `main` before the page header. Cookie controls, if required, follow the approved consent specification and remain keyboard accessible.

## Header

### Desktop

- Visible from `lg` upward.
- Logo links to the localized homepage.
- Primary navigation contains About, Services, Industries when enabled, Insights, Careers, and Contact.
- Language switch exposes its purpose and target language, such as `العربية` or `English`.
- Primary action is `Request a consultation` and links to the localized Contact page with an optional intent parameter.
- Current section is communicated visually and with `aria-current` on the active link.
- Sticky behaviour is allowed only when the header does not cover anchored content or consume excessive vertical space.

### Mobile and tablet

- Use a native button for the menu trigger with `aria-expanded` and `aria-controls`.
- Trigger target size is at least 44 by 44 CSS pixels.
- The menu opens as an in-flow panel or accessible dialog; it must trap focus only when implemented as a modal dialog.
- Escape closes a modal menu and returns focus to the trigger.
- Language switch and primary CTA remain easy to find.
- Body scrolling is restored reliably after close and route changes.

## Logo

- Use the official SVG once supplied.
- Until then, the extracted website logo may appear only in the controlled demo and remains marked provisional in the asset register.
- Preserve aspect ratio.
- Use `Kreston NBB Saudi` as the accessible name when the image carries the site-home function.
- Do not add redundant `logo` alt text next to visible company text.

## Hero

Required parts:

- Optional eyebrow.
- H1.
- One concise summary.
- Primary CTA.
- Secondary CTA.
- Optional approved image.
- Optional single proof point only when verified.

Desktop may use a two-column text and image arrangement. Mobile places the value proposition and actions before media.

Do not autoplay hero video in the default implementation. If video is later approved:

- Supply a poster.
- Mute it.
- Remove essential audio.
- Pause or replace it under reduced motion.
- Use a static mobile fallback.
- Avoid making page meaning dependent on playback.

## Trust strip

- Display two to four approved items.
- Use text or restrained marks rather than large counters.
- Every credential references an approved credential record.
- Omit the strip if approved local proof is unavailable.
- Do not substitute unverified Kreston network statistics.

## Cards

### Shared behaviour

- Entire-card links are allowed only when they preserve clear focus and do not create nested interactive elements.
- Otherwise, use a visible text link.
- Titles use H3 only when the card sits under an H2 section.
- Images have fixed aspect-ratio containers and explicit intrinsic dimensions.
- Cards grow with text and never hide essential copy.
- Hover is an enhancement; all information and actions remain available without it.

### Service card

Contains icon or image, service title, short outcome, and localized detail link. It must not contain long service lists.

### Person card

Contains approved photograph or neutral placeholder, name, role, service responsibility, and profile or contact-adviser action. Demo placeholders cannot use invented names or biographies.

### Insight card

Contains content type, title, summary, publication date, author when available, and detail link. Do not display fabricated reading time; calculate it from approved body content if used.

### Industry card

Only renders when the Industry feature is enabled and the record contains a responsible adviser and evidence.

## Service detail page

Recommended component order:

1. Breadcrumb.
2. Page header with service name and outcome.
3. Who the service is for.
4. Problems addressed.
5. Sub-services and deliverables.
6. Saudi context.
7. Engagement approach.
8. Lead advisers.
9. Approved credentials or proof.
10. Related insight.
11. FAQs.
12. Consultation CTA.

Do not hide core service information inside accordions. Accordions are suitable for FAQs only.

## Accordion

- Use a button inside a heading.
- Expose `aria-expanded` and connect the button to its panel.
- The button remains operable with Enter and Space.
- The panel can contain text and links but not a second hidden navigation system.
- Opening one item does not have to close the others.
- Deep links to a FAQ should open and focus the relevant item when feasible.

## Buttons and links

Button variants:

- Primary: solid accessible action colour with white text.
- Secondary: neutral or outlined treatment with sufficient contrast.
- Text link: visible underline or another persistent non-colour affordance in prose.
- Destructive: reserved for authenticated administration, not the public website.

Rules:

- Use buttons for actions and links for navigation.
- Do not nest links and buttons.
- Use the same label for the same action.
- Replace `Get Started` with a specific action.
- Minimum target size is 44 by 44 CSS pixels where practical.
- Disabled controls must not be the only explanation for what is missing.

## Forms

Every field includes:

- Persistent visible label.
- Optional hint.
- Correct input type and autocomplete token.
- Required indication in text, not colour alone.
- Error message tied with `aria-describedby`.
- Error state that does not remove entered values.

Form-level behaviour:

- Place an error summary above the form after failed submission.
- Move focus to the summary only after submission, not during typing.
- Announce successful submission.
- Disable repeat submission while a request is in flight without blocking error recovery.
- Preserve the selected service when visitors arrive from a service page.
- Never place personal information in a GET query string.

Exact fields and validation appear in document 05.

## Alerts feedback and empty states

Support these states:

- Informational notice.
- Validation error.
- Integration error.
- Success confirmation.
- Loading where a real wait exists.
- No search results.
- No current vacancies.
- Missing optional content.

Do not render empty headings or blank grids. A Careers page with no vacancies should explain that there are no approved open roles and provide only an approved alternative contact or future-notification method.

## Footer

Required sections:

- Logo and short firm statement.
- Primary page links.
- Service links.
- Verified office contact information.
- Legal pages.
- Approved social profiles.
- Language link.
- Copyright year.
- Approved Kreston member-firm disclaimer.

Until contact values are verified, the demo must omit interactive `mailto:` and `tel:` links instead of rendering placeholders or `undefined` values.

## Typography

- English: Inter 400, 500, 600, and 700 when licensed and approved.
- Arabic: Noto Sans Arabic or approved alternative; Tahoma and Arial are fallbacks.
- Body copy: 16 to 18 px with 1.5 to 1.7 line height.
- Supporting text: never below 14 px.
- Avoid all-uppercase Arabic.
- Give Arabic headings and controls enough line height for marks and stacked forms.
- Do not force identical line breaks across languages.

## Colour and contrast

- Body text uses ink or deep slate on light surfaces.
- White text may use the darker action colour, not the lighter brand blue, where required for contrast.
- Text and interactive controls meet WCAG 2.2 AA in default, hover, focus, active, error, and disabled states.
- Focus rings remain visible against every surface.
- Status is never communicated by colour alone.
- Test the gradient at the exact location and text size before placing text over it.

## RTL rules

- Set `dir="rtl"` on the Arabic document root.
- Use CSS logical properties for inline spacing, borders, and positioning.
- Align Arabic body copy to the start edge.
- Mirror directional arrows, progress indicators, breadcrumbs, and carousel direction when their meaning depends on direction.
- Do not mirror logos, photographs, media controls, clocks, charts, or non-directional icons.
- Keep telephone numbers, email addresses, URLs, and Latin identifiers readable with local direction isolation.
- Keep form field order and DOM reading order logical.
- Verify mixed Arabic and English text, especially job titles, qualifications, tax terms, and acronyms.
- The language switch must not reset the visitor to the homepage when an equivalent page exists.

## Motion

- Use motion only to explain state change or orientation.
- Default transition duration follows the tokens and should normally stay below 300 ms.
- No parallax, scroll-jacking, or auto-advancing critical content.
- Respect `prefers-reduced-motion` and provide an equivalent static state.
- Never delay navigation or form feedback for animation.

## Page-specific responsive checks

### Home

- Hero actions stack cleanly at 320 px.
- Six services display as one, two, then three columns.
- Proof items wrap without becoming unreadable counters.
- Leadership and insight sections omit cleanly when data is unavailable.

### Service detail

- Long service names wrap without reducing the heading below the token range.
- In-page sections remain in reading order.
- Adviser CTA does not become a sticky obstruction on mobile.

### Contact

- Form precedes secondary office details on small screens.
- Long Arabic labels wrap above fields.
- Map embeds are optional and must not block contact content or consent.

### Insights

- Filters use native controls on mobile.
- Result counts and active filters are announced.
- The URL may represent filters, but filtered pages remain non-canonical unless an editorial landing page exists.

## Component acceptance

A component is ready when:

- It has documented content inputs and states.
- It works at 320, 768, 1024, and 1440 px.
- English and Arabic use the same component.
- Keyboard and visible-focus behaviour pass.
- Screen-reader name, role, value, and state are correct.
- Text expansion of at least 200 percent does not clip content.
- Reduced-motion behaviour is verified.
- Empty, loading, error, success, and disabled states are covered where applicable.
- It contains no hard-coded unverified company facts.
