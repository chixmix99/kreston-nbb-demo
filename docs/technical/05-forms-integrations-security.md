# Kreston NBB Forms Integrations and Security

Status: Demo behaviour specified  
Production status: Destinations, providers, privacy terms, and retention require approval

## Form outcome

The demo must show complete accessible form behaviour without transmitting or retaining personal data. Production forms will submit through server-side endpoints, validate all input, route messages through approved integrations, expose clear success and failure states, and avoid putting personal information into URLs or analytics.

## Demo behaviour

`FEATURE_LIVE_FORMS` defaults to `false`.

When disabled:

- Forms may be fully interactive in the browser.
- Submission performs local validation and displays a clearly labelled demonstration success state.
- No network request leaves the application.
- No entered data is written to storage, logs, cookies, analytics, or error-reporting context.
- The review environment states that delivery is simulated.

Do not configure a personal email address or an inferred Kreston NBB mailbox.

## Public endpoints for production

| Endpoint | Method | Content type | Purpose |
|---|---|---|---|
| `/api/enquiries` | POST | `application/json` | General and service consultation enquiries. |
| `/api/careers/applications` | POST | `multipart/form-data` | Vacancy or approved speculative applications with optional CV. |

All other methods return 405 with an `Allow` header. Successful POST responses are not cached.

## Consultation enquiry fields

| Field | Required | Validation | Notes |
|---|---|---|---|
| `name` | Yes | 2 to 100 Unicode characters | Visible label and suitable autocomplete. |
| `workEmail` | Yes | Valid email, maximum 254 characters | Do not reject valid non-corporate domains unless client policy requires it. |
| `phone` | No | 8 to 24 characters after trimming | Allow international prefix, spaces, parentheses, and hyphens. |
| `organization` | Yes | 2 to 150 characters | Company or organization name. |
| `role` | No | Maximum 120 characters | Optional position. |
| `serviceKey` | Yes | Approved service enum or `general` | Preselect from service-page context. |
| `message` | Yes | 20 to 5,000 characters | Plain text only. |
| `preferredContact` | No | `email` or `phone` | Phone requires a phone value. |
| `consent` | Yes | Must be true | Wording links to the approved privacy notice. |
| `locale` | Yes | `en` or `ar` | Derived server-side from the route when possible. |
| `sourcePath` | Yes | Valid same-origin path | Do not trust a client-supplied external URL. |
| `website` | No | Must remain empty | Honeypot field hidden accessibly from genuine visitors. |

Do not ask for financial statements, identity documents, account numbers, or other sensitive engagement material through the general website form.

## Careers application fields

| Field | Required | Validation | Notes |
|---|---|---|---|
| `name` | Yes | 2 to 100 characters | Applicant name. |
| `email` | Yes | Valid email, maximum 254 characters | Applicant contact. |
| `phone` | No | 8 to 24 characters | Optional. |
| `vacancyId` | Conditional | Must match a published vacancy | Required for a listed vacancy. |
| `coverNote` | No | Maximum 3,000 characters | Plain text. |
| `cv` | Conditional | Approved file rules | Required only if the recruitment process requires it. |
| `consent` | Yes | Must be true | Links to recruitment privacy notice. |
| `locale` | Yes | `en` or `ar` | Route-derived. |
| `website` | No | Must remain empty | Honeypot. |

Do not collect date of birth, gender, nationality, marital status, national identifiers, or a photograph by default. Any additional field requires a documented business purpose and legal approval.

## Upload rules

Applications remain disabled until storage, scanning, access, and deletion are configured.

When enabled:

- Accept PDF, DOCX, and any additional client-approved format only.
- Default maximum size is 5 MB.
- Verify both extension and file signature.
- Rename uploads to a generated identifier.
- Store privately outside the public web root.
- Run malware scanning before delivery or reviewer access.
- Reject encrypted or malformed files unless an approved process handles them.
- Do not include raw applicant names in storage object keys.
- Provide retention and deletion rules in the recruitment privacy notice.
- Restrict access to approved recruitment roles and record access where the provider supports it.

## Server validation sequence

1. Reject unsupported method or content type.
2. Enforce request size limit.
3. Validate origin and host against the approved site origin.
4. Apply rate limit.
5. Check honeypot and bot signal.
6. Parse using limits that prevent oversized nested payloads.
7. Validate and normalize fields through the shared schema.
8. Scan an upload before routing it.
9. Submit through the selected integration adapter.
10. Record a minimal operational event with a generated correlation ID.
11. Return a localized result without echoing sensitive values.

Browser validation improves usability but never replaces server validation.

## Integration adapter

The application uses a provider-neutral interface equivalent to:

```ts
interface EnquiryDeliveryProvider {
  deliverEnquiry(input: ValidatedEnquiry): Promise<DeliveryResult>;
  deliverApplication(input: ValidatedApplication): Promise<DeliveryResult>;
}
```

Possible implementations include an approved mailbox service, CRM, ticketing system, or workflow platform. Provider choice is a production decision.

The adapter must support:

- Idempotency key.
- Structured service or vacancy routing.
- Localized subject or record label.
- Correlation ID.
- Delivery success or typed failure.
- Retry policy for transient failures.
- Secret rotation without code changes.

Do not expose provider credentials to the browser.

## Routing requirements

Client confirmation is required for:

- General enquiry owner.
- Owner for each service.
- Careers owner.
- Escalation recipient.
- Expected response time.
- Working-hours and holiday behaviour.
- Whether the visitor receives an email confirmation.

Until these values exist, the production endpoint remains disabled. The interface must not promise a one-business-day response or any other timing without operational approval.

## Success and failure behaviour

### Success

- Show a localized confirmation.
- Include the correlation ID only if it helps support staff locate the request.
- Explain the next step without promising an unapproved response time.
- Clear sensitive fields only after confirmed delivery.
- Record an analytics success event without field contents.

### Validation error

- Return HTTP 400 or 422 consistently.
- Associate errors with fields.
- Preserve safe input values.
- Focus the error summary after submit.
- Do not reveal server validation internals.

### Rate limit

- Return HTTP 429.
- Give a generic localized retry message.
- Avoid revealing the precise anti-abuse rule.

### Integration failure

- Return a retry-safe error.
- Do not clear entered values.
- Log provider status and correlation ID, not the message body.
- Do not claim success when delivery failed.

## Anti-abuse controls

Use layered controls:

- Per-IP and per-session rate limits with privacy-conscious retention.
- Honeypot.
- Minimum human-completion time where useful.
- Payload size and field length limits.
- Rejection of repeated identical requests within a short window.
- Provider-side abuse monitoring.

Add an interactive challenge only when measured abuse justifies the accessibility and privacy cost. Any challenge provider requires consent and privacy review.

## Security headers

Production responses should include a reviewed policy equivalent to:

- `Strict-Transport-Security` after HTTPS and subdomain readiness are confirmed.
- `Content-Security-Policy` with explicit sources and no broad wildcard allowances.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` disabling unused browser capabilities.
- Frame protection through CSP `frame-ancestors`.
- `Cross-Origin-Opener-Policy` where integrations permit it.

Do not add a header that breaks required embeds or tools without testing. Avoid `unsafe-inline` and `unsafe-eval`; if a vendor makes them necessary, document and approve the exception.

## Application security requirements

- Enforce HTTPS in production.
- Escape rendered text by default.
- Sanitize approved rich text on ingestion or server rendering.
- Allowlist external link protocols.
- Add `rel="noopener noreferrer"` where appropriate for new-tab external links.
- Use parameterized provider APIs and avoid constructing commands or queries from form input.
- Protect preview, revalidation, and administrative endpoints with secrets and rate limits.
- Run dependency and static security checks in CI.
- Enable automated secret detection.
- Keep production error details out of visitor responses.
- Maintain a process for reporting and responding to vulnerabilities.

## Logging and personal data

Allowed operational fields:

- Timestamp.
- Endpoint.
- Result code.
- Correlation ID.
- Locale.
- Service or vacancy key.
- Integration status category.
- Coarse performance timing.

Do not log:

- Enquiry message.
- Applicant cover note.
- CV contents or filename supplied by the applicant.
- Full email address or phone number.
- Consent text response beyond the required audit mechanism approved by legal.
- Secrets, tokens, or provider payloads.

If troubleshooting requires temporary sensitive logging, it needs written approval, restricted access, and a deletion date.

## Privacy and retention gates

Before live forms are enabled, Kreston NBB must approve:

- Controller or responsible legal entity.
- Purpose and lawful basis.
- Required notice wording.
- Data categories.
- Recipients and processors.
- Storage region.
- Retention period.
- Data-subject request contact and process.
- Cross-border transfer position.
- Applicant-data rules.
- Cookie and challenge-provider implications.

This specification sets engineering controls and does not replace legal review.

## Form acceptance

Live forms are ready only when:

- Destinations and owners are approved.
- Privacy and recruitment notices are published.
- Server validation and anti-abuse tests pass.
- Integration failure is observable and recoverable.
- No personal data enters analytics or URLs.
- Upload scanning and private storage are verified where uploads exist.
- English and Arabic labels, errors, and confirmations are reviewed.
- Keyboard, screen-reader, autofill, zoom, and mobile input tests pass.
- End-to-end delivery is confirmed in staging and production with controlled test submissions.
