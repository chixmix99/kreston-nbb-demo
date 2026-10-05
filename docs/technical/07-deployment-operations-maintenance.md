# Kreston NBB Deployment Operations and Maintenance

Status: Workflow ready for implementation  
Production status: Hosting, domain ownership, and operational owners require confirmation

## Operations outcome

Use separate local, preview, staging, and production environments. Every release must be reproducible from version control, pass automated gates, protect secrets, support rollback, and expose enough health information to diagnose failures without recording visitor-submitted content.

No external environment, hosting project, DNS change, or deployment should be created until the user or Kreston NBB authorises it.

## Environment model

| Environment | Purpose | Content | Indexing | Live integrations |
|---|---|---|---|---|
| Local | Development and tests | Local demo records | Not applicable | Disabled by default |
| Preview | Review a branch or change | Draft or demo records | Blocked | Disabled or sandbox only |
| Staging | Release candidate and integration tests | Production-like approved test content | Blocked | Sandbox or controlled test destinations |
| Production | Public website | Published approved records | Allowed | Approved production providers |

Environment isolation requirements:

- Separate credentials.
- Separate CMS datasets or publication boundaries where supported.
- Separate form destinations.
- Separate analytics configuration.
- No production personal data copied into local or preview environments.

## Repository rules

- Keep website source, content used by the demo, tests, and technical documentation in this workspace repository.
- Commit one dependency lockfile.
- Protect the main release branch when the remote repository is configured.
- Require reviewed changes for production releases.
- Do not commit `.env` files containing values, private keys, tokens, exported personal data, or unlicensed assets.
- Add generated build output, local caches, screenshots, and test traces to ignore rules unless a specific artifact is intentionally retained.

## Required project scripts

The future application should expose commands equivalent to:

```text
dev          start local development
build        create production build
start        run production build locally
lint         run static code rules
typecheck    run TypeScript without output
test         run unit and component tests
test:e2e     run browser tests
test:a11y    run automated accessibility checks
validate     validate content and configuration
```

The exact package-manager prefix is selected during scaffold and documented in the project README.

## Continuous integration gates

Every proposed release must run:

1. Clean dependency installation from the lockfile.
2. Secret detection.
3. Dependency vulnerability check with an agreed severity policy.
4. Lint.
5. Type check.
6. Content and configuration validation.
7. Unit and component tests.
8. Production build.
9. Browser smoke tests against the built application.
10. Automated accessibility tests on representative English and Arabic routes.
11. Link and redirect validation.
12. Performance checks on agreed representative pages.

Critical failures block release. Exceptions require an owner, written reason, mitigation, and expiry date.

## Deployment strategy

- Produce an immutable build for each commit.
- Deploy the same tested artifact or reproducibly identical source commit to production.
- Record commit identifier, deployment time, operator or automation identity, and result.
- Run pre-deployment checks before traffic changes.
- Run smoke tests after deployment.
- Keep the prior known-good release available for rollback.
- Avoid database or content migrations that cannot be reversed without a tested restoration plan.

The application should remain compatible with a managed Next.js host or a containerized Node environment. Production selection depends on region, security, cost, support, and Kreston NBB ownership requirements.

## Domain and DNS

Client confirmation is required for:

- Registrar and DNS owner.
- Canonical host.
- Access and approval workflow.
- Required subdomains.
- Email records that must not be changed.
- Certificate management.
- Rollback TTL plan.

Before cutover:

- Inventory current A, AAAA, CNAME, MX, TXT, CAA, and verification records.
- Lower only the necessary TTL with approval.
- Verify the new origin before changing public records.
- Preserve email and third-party verification records.
- Confirm HTTPS and host redirects.
- Record the previous values for rollback.

## Secrets

- Store secrets in the selected platform's encrypted secret manager.
- Grant access by role and least privilege.
- Use separate values per environment.
- Rotate secrets after personnel or provider changes and after suspected exposure.
- Do not print secrets in build or runtime logs.
- Keep a documented owner and rotation procedure for each production secret.

## Observability

Collect only what supports availability and diagnosis:

- Request rate and error rate.
- Page and API latency.
- Build and deployment status.
- Form delivery success and typed failure counts.
- External-provider availability.
- Cache and revalidation failures.
- Client-side exceptions with redaction.
- Core Web Vitals in aggregate if approved.

Alerts should cover:

- Sustained 5xx errors.
- Form delivery failure.
- Site unavailable or certificate failure.
- Large increases in 404s.
- CMS webhook failure.
- Significant performance regression.
- Security events identified by the selected host or monitoring provider.

Do not include enquiry text, applicant data, or secrets in alert messages.

## Health checks

If the host requires a health endpoint, it should:

- Return a simple healthy or unhealthy status.
- Avoid exposing versions, environment variables, provider credentials, or internal topology.
- Check application readiness without making expensive external calls on every request.
- Use deeper synthetic monitoring separately for critical journeys.

## Backup and recovery

Production planning must cover:

- Source repository recovery.
- CMS content export and restoration.
- Asset-library backup.
- Redirect configuration.
- Environment configuration inventory.
- Form-delivery configuration.
- DNS record inventory.

Client and provider must agree recovery-point and recovery-time objectives. Run a restoration exercise before claiming the backup process is operational.

## Release runbook

### Before release

- Confirm approved commit and change summary.
- Confirm CI gates pass.
- Freeze or coordinate content changes that could conflict.
- Export or snapshot affected production content and configuration.
- Confirm the rollback target.
- Confirm form, analytics, and CMS provider status.
- Confirm responsible people are available during the release window.

### Release

- Deploy the approved artifact.
- Verify Home, Services, one service detail, About, Insights, Contact, English, and Arabic.
- Verify security headers, robots, sitemap, canonical, and hreflang.
- Perform a controlled form submission when live forms are included.
- Confirm analytics only after consent under the approved design.
- Record the result.

### After release

- Monitor errors, availability, form delivery, and 404s.
- Check search-engine access to robots and sitemap.
- Confirm no preview or staging origin is indexed.
- Review performance on real representative devices.
- Close the release only after the monitoring window passes.

## Rollback

Rollback when:

- Primary routes fail.
- Forms falsely report success or lose submissions.
- English or Arabic content becomes unavailable.
- A security or privacy defect exposes data.
- Metadata, redirects, or robots directives would materially harm the public site.
- A regression cannot be corrected safely within the approved release window.

Rollback steps:

1. Stop additional rollout.
2. Restore the prior application release.
3. Restore compatible configuration or content if the change included it.
4. Verify primary routes and critical integrations.
5. Communicate status to the approved owners.
6. Preserve logs and evidence without sensitive payloads.
7. Document cause and corrective action before retrying.

## Maintenance responsibilities

Assign named owners before production for:

- Application dependencies and security updates.
- Hosting and uptime.
- Domain and DNS.
- CMS administration.
- English content.
- Arabic content.
- Regulatory and credential review.
- Forms and enquiry routing.
- Recruitment content and applications.
- Analytics and consent.
- Accessibility review.
- Incident response.

## Maintenance cadence

Recommended minimum cadence:

| Frequency | Work |
|---|---|
| Continuous | Availability, certificate, and critical-form monitoring. |
| Weekly | Failed forms, application errors, and high-value 404 review. |
| Monthly | Dependency updates, access review, analytics quality, search coverage, broken links. |
| Quarterly | Accessibility sample, performance review, redirect review, content freshness. |
| At claim review date | Credentials, statistics, service claims, and regulatory copy. |
| Annually | Recovery test, policy review, full access review, browser-support review. |

Urgent security updates follow severity and exposure rather than the normal cadence.

## Incident handling

The production owner must maintain:

- Incident contact list.
- Severity levels.
- Triage and containment steps.
- Provider escalation routes.
- Privacy and legal notification decision process.
- Evidence preservation rules.
- Visitor communication authority.
- Post-incident review process.

The public website must not publish speculative incident details. Communication requires the approved business owner.

## Operational acceptance

Production operations are ready when:

- Hosting, DNS, deployment, security, and content owners are named.
- Staging and production are isolated.
- CI blocks failed quality gates.
- Secrets are stored outside source control.
- Monitoring detects page and form failure.
- Backups exist and restoration has been tested.
- Rollback is documented and exercised.
- Release and incident contacts are current.
- Maintenance cadence and service expectations are approved.
