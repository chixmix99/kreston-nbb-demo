# Project Guidelines

## 1. Purpose

This document defines the backend development and architecture guidelines for the project.


The goal is to keep the codebase:

- Clean.
- Maintainable.
- Consistent.
- Testable.
- Production-aware.
- Easy to understand.
- Easy to extend.

These guidelines apply to all backend work unless the current task explicitly overrides them.


---

## 2. General backend philosophy

The project should follow clean, production-aware Spring Boot backend practices.

The goal is to keep the codebase:

- Easy to understand.
- Easy to maintain.
- Easy to extend.
- Easy to test.
- Safe from common backend mistakes.
- Consistent across services, repositories, DTOs, mappers, entities, and APIs.

The code should avoid unnecessary complexity, but it should not be careless.

Prefer simple, clear, and scalable solutions over clever or overly abstract implementations.

---

## 3. Technology decisions (not finalized)

The target technology stack and versions have not been decided. Do not treat any language, framework, database, library, or configuration format as an approved default.

For implementation work, inspect the checked-in build and configuration files to understand what currently exists. That describes the current codebase; it does not decide the target stack.

Potential options may be evaluated when a concrete requirement calls for a technology decision. This list is not an approved roadmap or a set of defaults:

- PostgreSQL.
- Liquibase.
- MapStruct.
- Springdoc / OpenAPI.
- Logback or equivalent structured logging.
- Spring Boot Actuator.
- Spring Data auditing where useful.
- Spring Specifications for complex dynamic filtering.
- Entity graphs, fetch joins, or projections for query-specific loading.
- Pagination for listing APIs.
- Scheduler locking for multi-instance scheduled jobs.
- Async execution and events only where justified.
- Kafka or equivalent durable messaging only for a concrete need.
- Keycloak or another OIDC/OAuth2 provider when authentication is in scope.
- UUIDv7 or another approved consistent identifier strategy.


---

## 4. Layering guidelines

The backend should follow a clean layered structure.

Controllers should handle HTTP concerns only.

Services should contain business logic.

Repositories should handle database access.

Mappers should handle DTO and entity transformation.

DTOs should represent API request and response models.

Entities should represent the database/domain model and should not be exposed directly through APIs.

Business logic should not be placed inside controllers.

Database access should not be placed inside controllers.

Mapping logic should not be repeated manually across services when MapStruct can handle it.

---

## 5. Controller guidelines

Controllers should stay thin and focused.

Controllers should mainly be responsible for:

- Defining endpoints.
- Receiving requests.
- Applying request validation.
- Calling the correct service method.
- Returning the response.

Controllers should not contain business rules.

Controllers should not directly use repositories.

Controllers should not expose entities directly.

Controllers should use request DTOs and response DTOs.

Controllers should use `@Valid` for request validation where applicable.

---

## 6. Service method return guidelines

Service method return types should be chosen based on the purpose and expected reuse of the method.

For highly reusable internal service methods, returning an entity is acceptable and sometimes preferred.


The reason is that internal service methods may need access to the full entity, its fields, its relationships, or its domain behavior. Returning DTOs from these internal methods can create unnecessary conversion from entity to DTO and back to entity.

For API-facing service methods, especially methods called directly by controllers, returning DTOs or response objects is preferred.

General rule:

- Internal reusable service method: returning an entity is acceptable.
- Controller-facing service method: returning a DTO is preferred.
- Do not expose entities directly from controllers.
- Avoid unnecessary DTO/entity conversion when the method is only used internally.
- Avoid returning entities from service methods that are clearly intended to produce API responses.
- Keep method purpose clear from the method name and return type.

---

## 7. DTO guidelines

DTOs should be used for API input and output.

Request DTOs should represent the shape of incoming API requests.

Response DTOs should represent the shape of outgoing API responses.

DTOs should not contain business logic.

DTOs should not expose internal entity structure unnecessarily.

DTOs should be designed based on API needs, not by blindly copying the entity.

Use separate DTOs when different API operations need different fields.

Avoid using one large generic DTO for every operation if it makes the API unclear.


---

## 8. Validation guidelines

Use Spring Validation at the DTO level for most basic validations.

Basic validation should usually be handled using validation annotations on request DTO fields.

This includes validation for:

- Required values.
- Text length.
- Number ranges.
- Email format.
- Pattern format.
- Collection size.
- Nullability.
- Blank strings.

Service-level validation should still be used for business rules.

Business validation includes:

- Checking if a related entity exists.
- Checking permissions or ownership when security becomes in scope.
- Checking status transitions.
- Checking database uniqueness.
- Checking workflow rules.
- Checking cross-field conditions.
- Checking rules that depend on current database state.

Do not manually repeat simple DTO validations in the service layer unless there is a specific reason.

---

## 9. MapStruct guidelines

MapStruct should be used for DTO and entity mapping.

Avoid repetitive manual mapping when MapStruct can handle the mapping clearly.

Mappers should be focused, readable, and reusable.

Use MapStruct annotations properly and intentionally.

Pay attention to MapStruct features such as:

- Spring component model.
- Field mappings.
- Ignored fields.
- Mapping targets.
- Null value handling.
- Update mapping into existing entities.
- Custom mapping methods.
- Nested mapping.
- Collection mapping.
- Qualified mapping methods.
- After-mapping logic when truly needed.

For update operations, prefer updating the existing entity rather than blindly creating a new entity.

Be careful when mapping IDs to entity references.

Use entity references only when the entity does not need to be fully loaded.

Load the entity when validation or actual field access is required.

Avoid creating fake partial entities carelessly if that could lead to confusion later.

Keep business logic out of mappers.

---

## 10. Repository guidelines

Repositories should only handle data access.

Do not put business logic in repositories.

Use Spring Data repository methods for simple queries.

Use Specifications for dynamic filtering and complex search screens.

Use custom queries only when needed.

Use projections or DTO queries when a read-only use case does not require full entities.

Avoid queries inside loops.

Avoid loading more data than needed.

Be careful with repository methods that trigger unnecessary relationship loading.

Repository method names should be clear and not excessively long.

---

## 11. Query and performance guidelines

Always avoid queries inside loops.

Always watch for N+1 query problems.

Be careful when mapping entities to DTOs, because DTO mapping can accidentally trigger lazy loading.

Use bulk queries when retrieving multiple records.

Use pagination for large or potentially large result sets.

Avoid returning huge unpaginated lists.

Avoid loading unnecessary relationships.

Avoid making relationships eager just to fix one lazy loading problem.

Prefer controlled relationship loading using entity graphs, fetch joins, projections, or query-specific solutions.

Heavy queries should be reviewed carefully.

Frequently filtered and sorted columns should be indexed where appropriate.

Foreign keys should generally have indexes when they are frequently used for lookup, filtering, or joins.


- Meal-template and dietary-tag filtering.
- Search and listing APIs that may grow over time.

---

## 12. Specification guidelines

Use Spring Specifications when an API has many optional filters or complex dynamic query conditions.

Specifications are preferred for:

- Search screens.
- Admin listing pages when admin becomes in scope.
- Dynamic filters.
- Date range filters.
- Status filters.
- Keyword filters.
- Multi-condition filtering.

Specification code should be broken into small reusable methods.

Avoid putting all filter logic into one large method.

Specifications should remain readable and composable.

Do not use Specifications for simple queries when a normal repository method is clearer.

---

## 12.1 Search API guidelines

Use GET for simple browse, detail, lookup, hierarchy, and lightly filtered paginated APIs.

Use POST `/search` for advanced structured search when filters become complex, nested, array-based, compatibility-aware, location-aware, or awkward to express safely in query parameters.

Do not use GET request bodies. If a request body is needed for search, use POST.

Frontend routes may remain bookmarkable and shareable even when backend search uses POST; frontend route state and backend API shape are separate concerns.

---

## 13. Entity relationship guidelines

Entity relationships should be modeled carefully.

Pay attention to:

- Correct relationship ownership.
- Correct cardinality.
- Correct join columns.
- Correct fetch type.
- Correct cascade usage.
- Correct orphan removal usage.
- Avoiding unnecessary bidirectional relationships.
- Avoiding accidental deletes.
- Avoiding accidental large object loading.

Default preference:

- Use lazy loading for most relationships.
- Use eager loading only when there is a strong reason.
- Do not use cascade blindly.
- Do not use `CascadeType.ALL` unless the child lifecycle truly belongs to the parent.
- Do not add bidirectional relationships unless they are actually needed.
- Keep entity relationships clear and intentional.

Use proper entity references when connecting entities.

When only the foreign key reference is needed, an entity reference may be enough.

When the related entity must be validated or its fields are needed, load the entity properly.

PostgreSQL constraints are the source of truth for integrity.

Do not invent relationships that are not part of the design or task.

---

## 14. EntityGraph and lazy loading guidelines

Use entity graphs when a specific query needs related data and lazy loading would otherwise cause extra queries or lazy initialization issues.

Entity graphs are useful when:

- A details API needs specific relationships.
- A listing API needs specific related data.
- DTO mapping would trigger repeated lazy loading.
- A query needs controlled relationship loading.
- N+1 problems need to be avoided without changing the global entity fetch type.

Do not solve lazy loading problems by making all relationships eager.

Use query-specific loading strategies instead.

---

## 15. Pagination guidelines

Use pagination for listing APIs unless there is a strong reason not to.

Pagination should be used for:

- Tables.
- Search results.
- Reference data lists that may grow.
- Reports.
- Large collections.
- Any endpoint that may grow over time.

The project should have a consistent pagination strategy.

Use a pagination utility class where useful.

Pagination handling should standardize:

- Page number handling.
- Page size handling.
- Maximum allowed page size.
- Default page size.
- Default sorting.
- Sort direction handling.
- Custom allowed sort columns.
- Mapping frontend sort names to backend entity fields.

Do not blindly accept any frontend-provided sort field.

Sort fields should be validated against allowed sort columns.

---

## 16. Constants guidelines

Use constants where they improve consistency and reduce duplication.

Constants should be used for:

- Error message keys.
- Validation message keys.
- Role names when security becomes in scope.
- Permission names when authorization becomes in scope.
- Header names.
- Repeated configuration keys.
- Module limits.
- Status values where applicable.
- Event names where applicable.
- Repeated string values that must remain consistent.

Error message keys should always be constants.

Avoid hardcoding the same error key in multiple places.

Each module may have its own constants class when appropriate.

Do not create constants for values used only once unless the value has clear business meaning.

---

## 17. Error handling guidelines

Use consistent error handling across the project.

Business errors should use consistent error keys.

Validation errors should be clear and predictable.

Do not throw generic runtime exceptions for expected business cases.

Error responses should be consistent across APIs.

Avoid leaking internal implementation details in API errors.

Error keys should be stable and reusable.

Error messages should be easy to translate or customize later if needed.

---

## 18. Clean code guidelines

Code should be clean, readable, and easy to follow.

Avoid large methods that do too many things.

Break big methods into smaller helper methods when it improves readability.

A service method should read like a clear business workflow.

Avoid deeply nested logic.

Avoid duplicated logic.

Avoid unclear shortcuts.

Avoid overly clever code.

Avoid unnecessary abstraction.

Prefer readable code over compact code.

Private helper methods should have meaningful names.

Reusable logic should be extracted when it is used in multiple places.

Keep comments minimal. Prefer good names and clear structure.

---

## 19. Method reuse guidelines

Reuse methods where it makes sense.

Common operations should not be duplicated across services.

Reusable service methods should be clearly named and intentionally designed.

Shared helper logic can be extracted into:

- Private helper methods.
- Shared service methods.
- Utility classes.
- Mapper methods.
- Strategy classes.
- Resolver classes.
- Factory classes.

Do not create shared abstractions too early if the logic is not actually repeated or likely to grow.

---

## 20. Variable naming guidelines

Variable names should be clear and meaningful.

Avoid names that are too short and unclear.

Avoid names that are too long and noisy.

Avoid generic names unless the context makes them very clear.

Prefer names that explain the business meaning of the value.

Avoid unclear abbreviations.

Do not use names like `ctx` when `context` is clearer.

Use consistent naming across the project.

Boolean variables should be named clearly.

Collections should have plural names.

Methods should use action-based names.

Repository methods should clearly describe what they retrieve.

Service methods should clearly describe the business operation.

---

## 21. Design pattern guidelines

Use design patterns when they simplify the code and improve maintainability.

Useful patterns include:

- Strategy pattern.
- Factory pattern.
- Resolver pattern.
- Builder pattern.
- Template method pattern.
- Adapter pattern where integration boundaries need it.

Avoid large `if / else if / else` blocks when the logic is expected to grow.

If behavior changes based on type, status, provider, channel, or workflow, consider a strategy or resolver pattern.

Use factories when object creation becomes conditional or complex.

Use patterns only when they improve the code.

Do not overengineer simple logic with unnecessary patterns.

---

## 22. Auditing guidelines

Use auditing where it provides real value.

Common audit fields include:

- Created at.
- Created by.
- Last modified at.
- Last modified by.

Use Spring Data auditing annotations where applicable.

Auditing is useful for entities that represent business records, user actions, workflows, requests, transactions, or important configuration.


Do not add auditing blindly to every table if it provides no value.

Audit fields should be handled consistently across entities.

Avoid conflicting auditing patterns.

---

## 23. Soft delete guidelines

Use soft delete only when appropriate.

Soft delete is useful when:

- Historical records must be preserved.
- Data recovery may be needed.
- Records should be hidden but not physically removed.
- Business or audit requirements require retaining deleted records.

Soft delete should not be used blindly for every table.

When soft delete is used, consider tracking:

- Deleted at.
- Deleted by.
- Delete reason, if needed.

Queries should consistently exclude soft-deleted records unless explicitly required.

Soft delete behavior should be clear and predictable.


---

## 24. Transaction guidelines

Use transactions at the service layer.

Write operations should usually be transactional.

Read operations may use read-only transactions where useful.

Do not place transaction boundaries randomly.

Do not rely on transactions in controllers.

Be careful with lazy loading outside a transaction.

Use transaction events for work that should happen only after a successful commit.

Post-commit work may include:

- Sending notifications.
- Publishing events.
- Triggering async processing.
- Calling external systems when the operation depends on committed data.

Do not place long-running external calls inside large transactions without explicit justification.

---

## 25. Async and event guidelines

Use async processing when it improves responsiveness or separates non-critical work.

Use event listeners when different parts of the system should react to business events.

Use after-commit event listeners when the event depends on data being successfully committed.

Do not use async processing to hide broken transaction design.

Async methods should have clear error handling and logging.

Events should represent meaningful business actions.

Avoid publishing vague or overly technical events when a business event name would be clearer.


---

## 26. Logging guidelines

Logging should be useful and consistent.

Logs should help diagnose real issues.

Avoid excessive noisy logs.

Avoid logging sensitive data.

Errors should include enough context to diagnose the issue.

Important business operations may have clear informational logs.

External integration failures should be logged clearly.

Unexpected exceptions should be logged with stack traces.

Use structured logging where applicable.

Use MDC or request correlation identifiers where appropriate.

---

## 27. Liquibase guidelines

Use Liquibase for database migrations.

Every database schema change should be represented in a Liquibase changeset.

Avoid manual database changes that are not tracked in Liquibase.

Liquibase changesets should be:

- Small.
- Clear.
- Reviewable.
- Ordered.
- Safe for repeated deployments.
- Consistent with the entity model.

Use indexes where needed.

Do not add unnecessary indexes blindly.

Consider indexes for:

- Foreign keys.
- Frequently filtered columns.
- Frequently sorted columns.
- Search fields.
- Status fields.
- Date fields.
- Common combinations used in filtering and sorting.

---

## 28. API documentation guidelines

Use OpenAPI documentation where applicable.

APIs should be easy to understand from their request and response models.

Endpoint names should be clear.

Request DTOs should describe what the endpoint expects.

Response DTOs should describe what the endpoint returns.

Avoid unclear generic API names.

API documentation should stay aligned with the actual implementation.

---

## 29. Security guidelines

Authentication and authorization should be handled consistently when they become part of project scope.

Use a proper identity provider when the project requires authentication.

Authorization checks should be clear and centralized where possible.

Do not rely only on frontend checks.

Do not expose internal fields unnecessarily in API responses.

Do not log sensitive information.

Validate user permissions before performing protected actions.

Security logic should be easy to understand and audit.


---

## 30. Scheduling guidelines

Use scheduled jobs only when needed.

When the application may run on multiple instances, scheduled jobs should use scheduler locking.

Scheduled jobs should be safe to retry where possible.

Scheduled jobs should log meaningful start, success, and failure information.

Long-running scheduled jobs should process data in batches where applicable.

Scheduled jobs should avoid loading huge datasets into memory.

---

## 31. Integration guidelines

External integrations should be isolated behind clear service classes or clients.

Do not scatter integration logic across the codebase.

Integration errors should be handled clearly.

Retries should be used carefully and only where appropriate.

Timeouts should be configured where applicable.

External calls should not happen inside loops without careful consideration.

Integration DTOs should be separated from internal domain DTOs when the external model is different.


---

## 32. Testing guidelines

Code should be written in a way that is testable.

Business logic should be placed in services so it can be tested without HTTP concerns.

Large methods should be broken down to make testing easier.

Validation rules should be testable.

Mapping behavior should be testable when mappings are complex.

Critical business flows should have tests where applicable.

Repository queries should be tested when they are complex or custom.

Do not remove or weaken existing tests unless explicitly requested.

---

## 33. File and package organization



Within each module, keep controllers, DTOs, services, repositories, mappers, constants, and adapters close to the feature unless they are truly shared.

Do not place unrelated classes in generic packages.

Do not turn utility or common packages into dumping grounds.

Configuration should be grouped clearly, and external clients or adapters must remain isolated.

---

## 34. Utility class guidelines

Utility classes should be used carefully.

A utility class is appropriate for stateless, reusable helper logic.

Do not place business logic in utility classes.

Do not turn utility classes into dumping grounds.

Prefer services when logic has business meaning or dependencies.

Utility methods should be clear, focused, and stable.

---

## 35. Entity design guidelines

Entities should represent database/domain structure.

Entities should not be designed only around API response needs.

Entities should avoid unnecessary logic, but simple domain behavior is acceptable when it belongs to the entity.

Avoid exposing entities directly through API responses.

Avoid putting API-specific annotations in entities unless there is a strong reason.

Entity fields and relationships should match the database design clearly.


---

## 36. DTO mapping and entity loading guidelines

Be careful when mapping entities to DTOs.

Mapping should not accidentally trigger many lazy-loaded queries.

Before mapping, decide what related data is needed.

Use entity graphs, fetch joins, projections, or dedicated queries to load required data efficiently.

Do not rely on random lazy loading during mapping.

Do not make all relationships eager to make mapping easier.

Mapping should be intentional and performance-aware.

---

## 37. Business rule guidelines

Business rules should be explicit and easy to find.

Business rules should usually live in services or dedicated domain/helper classes.

Do not hide business rules inside mappers, controllers, or repositories.

Validation that depends on business state should be handled in the service layer.

Repeated business rules should be extracted and reused.

Complex workflow rules should be broken into readable methods.


---

## 38. Status and workflow guidelines

Status changes should be handled carefully.

Validate status transitions before changing status.

Avoid scattering status transition rules across many services.

Use constants, enums, or dedicated workflow helpers where appropriate.

Status names should be clear and business-friendly.

Avoid magic strings for statuses.

---

## 39. Configuration guidelines

Configuration values should not be hardcoded when they may change per environment.

Use application configuration properties for environment-specific values.

Use typed configuration properties classes where appropriate.

Do not duplicate configuration keys across the project.

Sensitive values should not be committed to source control.

---

## 40. Final development rules

Default to clean, simple, and maintainable code.

Avoid query-in-loop patterns.

Avoid N+1 problems.

Use DTO validation for basic validations.

Use service-level validation for business rules.

Use MapStruct properly.

Use Specifications for complex dynamic filters.

Use entity graphs when specific relationship loading is needed.

Use pagination for growing lists.

Use constants for error keys and repeated important values.

Use clear variable names.

Break large methods into smaller methods.

Reuse methods where it improves maintainability.

Use design patterns when they reduce complexity.

Avoid large `if / else if / else` blocks when a strategy or resolver would be cleaner.

Use auditing where applicable.

Use soft delete only where appropriate.

Use Liquibase for database changes.

Keep controllers thin.

Keep services focused.

Keep repositories focused on data access.

Keep mapping logic in mappers.

Do not expose entities directly from APIs.


Do not expand into unrelated future domains unless explicitly requested.

When there is a tradeoff, prefer the option that is:

1. Easier to understand.
2. Safer for future changes.
3. Less likely to cause hidden performance problems.
4. More consistent with the rest of the codebase.

---

