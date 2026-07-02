---
title: Type Complexity Stabilization – Phase 2
status: ready for planning and implementation
reviewed: true
clarified: complete
date: 2026-07-01
sub-spec: true
depends-on: features/2026-07-01-type-complexity/spec.md
parent_feature: features/2026-07-01-type-complexity/spec.md
source_findings: features/2026-07-01-type-complexity/stage2-findings.md
packages:
  - modules/types
  - modules/runtime
source_files:
  - modules/types/src/boolean-logic/operators/datetime/validators/IsFourDigitYear.ts
  - modules/types/src/boolean-logic/operators/datetime/validators/IsTwoDigitDate.ts
  - modules/types/src/boolean-logic/operators/datetime/validators/IsTwoDigitMonth.ts
  - modules/types/src/datetime/general.ts
  - modules/types/src/domains/nesting/helpers/ExtractExitTokens.ts
  - modules/types/src/domains/nesting/helpers/GetExitToken.ts
  - modules/types/src/domains/nesting/helpers/GetNextLevelConfig.ts
  - modules/types/src/domains/nesting/helpers/IsExitToken.ts
  - modules/types/src/domains/nesting/helpers/IsNestingMatchEnd.ts
  - modules/types/src/domains/nesting/helpers/NormalizeNestingEntry.ts
  - modules/types/src/domains/nesting/primitives/NestingKeyValue.ts
  - modules/types/src/domains/nesting/primitives/NestingTuple.ts
  - modules/runtime/src/domain/nesting/assignNamedConfig.ts
  - modules/runtime/src/domain/nesting/isNestingEnd.ts
  - modules/runtime/src/domain/nesting/isNestingEndMatch.ts
  - modules/runtime/src/domain/nesting/isNestingKeyValue.ts
  - modules/runtime/src/domain/nesting/isNestingTuple.ts
  - modules/runtime/src/string-literals/split-and-join/nestedSplit.ts
  - modules/runtime/src/string-literals/sub-string/retain/retainUntil__Nested.ts
  - tests/domains/nesting/nesting.test.ts
  - tests/string-literals/NestedSplit.test.ts
  - tests/string-literals/sub-strings/RetainUntil__Nested.test.ts
  - modules/types/src/literals/branding/Brand.ts
  - modules/types/src/literals/branding/GetBrand.ts
  - modules/types/src/literals/branding/IsBranded.ts
  - modules/types/src/literals/branding/Unbrand.ts
  - modules/types/src/literals/branding/UnbrandValues.ts
  - modules/types/src/boolean-logic/operators/datetime/IsDoubleLeap.ts
  - modules/types/src/boolean-logic/operators/datetime/IsSameMonthYear.ts
  - modules/types/src/datetime/AsDateMeta.ts
  - modules/types/src/datetime/DaysInMonth.ts
  - modules/types/src/datetime/ParseDate.ts
  - tests/datetime/parseNumericDate.test.ts
  - justfile
  - modules/runtime/src/css/parseColor.ts
  - modules/runtime/src/type-conversion/stripParenthesis.ts
  - modules/runtime/src/type-conversion/toKeyValue.ts
  - modules/types/src/boolean-logic/combinators/comparison/Compare.ts
  - modules/types/src/interpolation/AsStaticTemplate.ts
  - modules/types/src/interpolation/template-maps.ts
  - modules/types/src/kv/ToKv.ts
  - modules/types/src/lists/SortByKey.ts
  - modules/types/src/string-literals/sub-strings/after/AfterFirstChar.ts
  - tests/domains/JSON/ToJsonObject.test.ts
  - tests/domains/JSON/toJson.test.ts
  - tests/regex/createMatchTemplate.test.ts
documentation:
  - features/2026-07-01-type-complexity-phase2/implementation-log.md
  - features/2026-07-01-type-complexity-phase2/plan.md
  - features/2026-07-01-type-complexity-phase2/spec.md
skills: []
---

# Type Complexity Stabilization – Phase 2

## Problem Statement

Phase 1 of the Type Complexity Stabilization feature restored `just test-types` to a non-crashing state and produced a detailed diagnosis of the remaining type errors. This Phase 2 feature implements the fixes identified in [`features/2026-07-01-type-complexity/stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md) so that the type-test suite eventually exits with zero type errors while preserving the library's narrow-type guarantees and runtime/type parity.

This is a sub-spec of [`features/2026-07-01-type-complexity/spec.md`](../2026-07-01-type-complexity/spec.md). Phase 2 assumes Phase 1 is complete before implementation starts, including the Stage 2 findings report and the non-crashing `just test-types` baseline.

## Scope

Address every type-error directory identified in Phase 1 Stage 2:

- `tests/domains`
- `tests/literals`
- `tests/take`
- `tests/interpolation`
- `tests/type-conversions`
- `tests/types`
- `tests/boolean-logic/combinators`
- `tests/datetime`
- `tests/boolean-logic/operators/datetime`
- `tests/boolean-logic/operators/IsGreaterThan.test.ts`

## Inherited Policies (from Phase 1)

### Hybrid-with-escalation (Q1)

- First attempt to confirm the failure with the smallest relevant test-file reproduction.
- For the failures already diagnosed in Stage 2, Phase 2 should fix the root cause in `modules/types/src/`, `modules/runtime/src/`, or the shared test helper when the diagnosis points there. A test-only fix is appropriate only when the existing assertion is stale, order-sensitive in a way the library does not promise, or the test harness is producing unrelated diagnostics.
- If implementation reveals a broader public-contract change than this spec describes, stop that slice and create a separate design-review task/escalation before changing the contract.
- Runtime/type parity must be preserved for any utility changes.
- Test-only fixes are preferred only when they avoid masking real bugs and do not reduce coverage of a documented Stage 2 root cause.

### Existing-assertions floor (Q3)

- Any change that breaks an existing assertion is unacceptable unless the assertion is explicitly updated and documented.
- Widening is allowed only when unavoidable, and must be recorded as an explicit test/expectation change with a clear justification.
- A type-complexity budget remains out-of-scope unless proposed as a separate architectural task.

## Design Decisions Added During Review

### Root-cause fixes are in scope for Phase 2

Phase 1 preferred test-file edits because the immediate goal was to stop crashes. Phase 2 has a different goal: resolving the documented type errors. Therefore, shared type utility changes are not automatically escalations when they directly implement the Stage 2 recommendations and preserve existing public contracts.

Escalation is required only when a fix needs one of the following:

- a new public API;
- a materially broader type contract than the current tests imply;
- intentional loss of narrow inference in an exported utility;
- a change to runtime behavior rather than runtime/type parity.

### Date parsing strategy

Date-related fixes should prefer bounded, field-specific parsing over large union expansion. For example, predicates such as `IsSameYear` and `IsSameMonthYear` should extract only the year/month fields they need instead of forcing the full date parser/meta pipeline when a cheaper path can preserve the same observable semantics.

Reader note: this is an intended implementation constraint, not a request to invent a second public date parser. Any private fast path must stay semantically aligned with the canonical date parser and be covered by representative type tests for ISO full dates, ISO datetimes, ISO year-month strings, and year-independent partial dates.

### Branded date validator strategy

`FourDigitYear`, `TwoDigitMonth`, and `TwoDigitDate` should not validate by recursively exploring broad digit unions. Use bounded string-shape checks and explicit range checks so invalid literals return the existing invalid/error shape rather than `any`.

This decision is meant to preserve the current brand shape and public guard behavior while removing the `TS2589` failure path.

### JSON and key-value ordering

For object literals with ordinary string keys, type-level JSON and key-value conversion should mirror the runtime enumeration order used by `Object.keys()` / `Object.entries()` as closely as TypeScript can represent it. The current Stage 2 failures are therefore treated as type-level ordering bugs, not as permission to loosen assertions.

The implementation does not need to promise stable ordering for symbol keys or JavaScript's integer-like key reordering unless existing tests already assert those cases. If those edge cases are encountered during implementation, document them in the phase log and add them to Open Questions rather than widening the current string-key expectations silently.

### Error-shape alignment for nesting utilities

Nested split/retain utilities should return successful literal tuples for the documented shallow and hierarchical configs. Existing `Unbalanced` error object expectations should only be updated when the input is genuinely unbalanced; error-shape drift must not be used to explain away valid shallow/hierarchical config failures.

## Current State

`just test-types` completes without crashing but currently reports **77 of 3638 tests had errors** and **21 of 661 test files had errors**. The root causes are grouped into cross-cutting families plus several isolated issues, including the datetime and boolean-logic datetime-operator failures added after Review 2. See [`stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md) for the full per-directory diagnosis.

## Work Plan

### P0 — Nesting config helpers

Fix `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, and `IsNestingMatchEnd` so they correctly interpret hierarchical tuple configs of the shape `{ "(": [")", {}]; "[": ["]", { "{": "}" }] }`.

Implementation notes:

- Support the existing flat record form and the tuple-valued hierarchical form without changing the public config syntax.
- Normalize config values through a small private helper before branching, so entry-token, exit-token, next-level, and match-end logic all interpret config shapes consistently.
- Keep runtime `nesting()` semantics aligned with the type-level helper behavior before un-skipping higher-level syntax tests.

### P0 — Date-time branded / string-literal validators

Redesign `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, and the `TakeDate` / `TakeYear` / `TakeMonth` wrappers so they terminate efficiently for literal inputs and no longer collapse to `any` via `TS2589`.

Implementation notes:

- Preserve the existing brand representation and invalid/error return shapes.
- Invalid literal inputs must return a deterministic invalid/error type, not `any`, `never`, or a wide primitive.
- Wide inputs such as `string` should use the repository's existing wide-type bailout conventions rather than distributing through all possible date strings.

### P0 — Date parser/meta consumers

Stabilize `ParseDate`, `AsParsedDate`, `AsDateMeta`, `AsTwoDigitMonth`, `DaysInMonth`, and `isDoubleLeap` type paths so the current `tests/datetime` failures resolve without `TS2589` or `any` leakage.

Implementation notes:

- Treat already-parsed date metadata as an early-return case.
- Avoid cross-multiplying year, month, day, time, millisecond, and timezone unions when the consumer only needs a subset of fields.
- Keep type-level and runtime helper behavior aligned for `asTwoDigitMonth()`, `parseNumericDate()`, and related guards.

### P0 — Date predicate correctness

Fix `IsSameMonthYear` mixed DateLike normalization so year-month/full-date comparisons infer `true` when the shared year and month match. This is a correctness failure, not only a type-complexity failure.

Implementation notes:

- Normalize both operands to comparable `{ year, month }` metadata before equality.
- Preserve existing `false` cases where either shared field differs.
- Do not widen expected literal `true` / `false` results to `boolean` unless an Open Question is added and accepted first.

### P1 — Shallow / hierarchical nesting syntax

Implement named configs `"shallow-quotes"`, `"shallow-brackets"`, `"shallow-brackets-and-quotes"`, and explicit hierarchical configs in `NestedSplit` and `RetainUntil__Nested`, reusing the helper-type work above.

Implementation notes:

- Named configs should resolve to documented internal config objects in both runtime and type-level paths.
- Skipped new-syntax blocks may be un-skipped only after type-level and runtime paths agree on the config interpretation.

### P1 — Date-time comparison `sameYear`

Add a targeted overload or efficiency fix for `compare("sameYear", ...)` so `Compare.test.ts` resolves without `TS2589`.

Implementation notes:

- Prefer a targeted internal fast path that returns narrow boolean literals for literal inputs.
- Keep the public `compare()` call shape unchanged.
- Do not make `"sameYear"` less precise than passing date-time comparison operators unless documented in Open Questions.

### P1 — Boolean datetime operators

Fix `IsDateLike`, `IsIsoDateTime`, and `IsSameYear` so `just test-types boolean-logic/operators/datetime` passes without deep-instantiation failures.

Implementation notes:

- Predicate-specific parsing is acceptable when it is private and covered against the canonical parser's observable behavior.
- `IsIsoDateTime` should not validate by expanding a full ISO datetime union.

### P1 — Branded numeric comparison

Ensure `IsGreaterThan` can compare branded `FourDigitYear` values without triggering `TS2589` or `any`.

Implementation notes:

- Prefer fixing `FourDigitYear` first; add an `IsGreaterThan` unbranding fast path only if branded scalar comparison remains inefficient after the brand no longer leaks `any`.

### P2 — Isolated fixes

- `ToJsonObject` / `toJSON` key ordering.
- `toKeyValue` ordered-tuple return type.
- `AsLiteralTemplate` with `TemplateMap__Generics` and `AsStaticTemplate` custom vocabularies.
- `AfterFirstChar` recursion on `"Foobar"`.
- `parseNumericDate` current-time test/helper typing around symbol-keyed parse result data.

Implementation notes:

- Keep these isolated; do not bundle them into the date or nesting redesign unless they share a proven root cause.
- For `parseNumericDate`, fix symbol-keyed metadata handling directly instead of masking diagnostics with broad string coercion.

## Acceptance Criteria

### Nesting config helpers

- [ ] `just test-types tests/domains/nesting/helper-types.test.ts` exits with zero type errors.
- [ ] `just test-types types` exits with zero type errors.
- [ ] Hierarchical tuple configs produce the expected `{}`, `")"`, `"]"`, `true`, `false` results documented in [`stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md) Section 1.1.
- [ ] No assertions in `tests/domains/nesting/helper-types.test.ts` are silently widened; any unavoidable changes are documented in the phase log with justification.

### Date-time branded validators

- [ ] `just test-types tests/literals/Brand.test.ts` exits with zero type errors.
- [ ] `just test-types tests/string-literals/take/TakeDate.test.ts` exits with zero type errors.
- [ ] `just test-types take` exits with zero type errors.
- [ ] `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` exits with zero type errors for branded `FourDigitYear` comparisons.
- [ ] `FourDigitYear<"224">` returns a well-defined invalid/error type instead of `any`.
- [ ] `IsGreaterThan<FourDigitYear<"2020">, FourDigitYear<"2012">>` resolves to `true` without `TS2589` or `any`.
- [ ] `IsGreaterThan<FourDigitYear<"2012">, FourDigitYear<"2020">>` resolves to `false` without `TS2589` or `any`.
- [ ] `TwoDigitMonth<"1">`, `TwoDigitDate<"1">`, and `TakeDate<"01">` resolve without `TS2589` and without leaking `any`.
- [ ] Runtime/type parity preserved for `isFourDigitYear()`, `isTwoDigitMonth()`, `isTwoDigitDate()`, and related runtime guards.
- [ ] No date brand utility returns `any` for valid, invalid, or wide string inputs.
- [ ] Invalid date-brand literals preserve the repository's existing invalid/error type conventions.

### Date parser/meta consumers

- [ ] `just test-types datetime` exits with zero type errors.
- [ ] `just test-types tests/datetime/AsDateMeta.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/AsParsedDate.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/ParseDate.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/asTwoDigitMonth.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/daysInMonth.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/isDoubleLeap.test.ts` exits with zero type errors.
- [ ] `just test-types tests/datetime/parseNumericDate.test.ts` exits with zero type errors.
- [ ] `ParseDate`, `AsParsedDate`, and `AsDateMeta` resolve representative full-date, compact-date, year-independent, and already-parsed date inputs without `TS2589`.
- [ ] `DaysInMonth` resolves February leap/double-leap, ISO date, ISO datetime, and month-day partial date cases without leaking `any`.
- [ ] Already-parsed date metadata inputs short-circuit without re-parsing through the full string parser.
- [ ] Date consumers that only need year/month/day fields do not depend on full time/timezone union expansion.

### Shallow / hierarchical nesting syntax

- [ ] `NestedSplit<"1234, 4567, \"Bob, the quintessential idiot, did not care\"", ", ", "shallow-quotes">` resolves to the expected tuple.
- [ ] Skipped new-syntax describe blocks in `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts` can be un-skipped and pass.
- [ ] `tests/domains/nesting/nesting.test.ts` hierarchical and shallow config cases return literal results instead of `Unbalanced` error objects.
- [ ] Named shallow configs and explicit hierarchical configs behave consistently in both type-level utilities and runtime `nesting()` helpers.

### Date-time comparison `sameYear`

- [ ] `just test-types tests/boolean-logic/combinators/comparison/Compare.test.ts` exits with zero type errors.
- [ ] `compare("sameYear", dateTime1)(dateTime1)`, `compare("sameYear", dateTime1)(dateTime3)`, and `compare("sameYear", dateTime1)(dateTime4)` infer narrow `boolean` literals without `TS2589`.
- [ ] `just test-runtime` for the comparison module remains green.

### Boolean datetime operators

- [ ] `just test-types boolean-logic/operators/datetime` exits with zero type errors.
- [ ] `just test-types tests/boolean-logic/operators/datetime/IsDateLike.test.ts` exits with zero type errors.
- [ ] `just test-types tests/boolean-logic/operators/datetime/IsIsoDateTime.test.ts` exits with zero type errors.
- [ ] `just test-types tests/boolean-logic/operators/datetime/IsSameMonthYear.test.ts` exits with zero type errors.
- [ ] `just test-types tests/boolean-logic/operators/datetime/IsSameYear.test.ts` exits with zero type errors.
- [ ] `IsSameMonthYear<"-2023-01", "2023-01-15">` resolves to `true`.
- [ ] `IsSameMonthYear<"2023-01-15", "-2023-01">` resolves to `true`.
- [ ] `IsSameMonthYear<"2023-01-15", "2023-01-15T12:30:00Z">` continues to resolve to `true`.
- [ ] `IsSameMonthYear<"-2024-01", "2023-01-15">` continues to resolve to `false`.
- [ ] `IsDateLike`, `IsIsoDateTime`, and `IsSameYear` resolve the failing ISO partial/full/datetime literals documented in Stage 2 without `TS2589`.

### Isolated fixes

- [ ] `ToJsonObject<{ foo: [1, 2], bar: ["hey", "ho"] }>` preserves key/value association and returns `{ "foo": [1, 2], "bar": ["hey", "ho"] }`.
- [ ] `toKeyValue({ foo: 1, bar: "hi" } as const)` returns an ordered `KeyValue` tuple type matching runtime output.
- [ ] `AsLiteralTemplate<"{{T}} is {{U}} years old", TemplateMap__Generics<G>>` resolves to `` `${string} is ${number} years old` ``.
- [ ] `AsStaticTemplate<"${T} was ${number} years old", Vocab>` resolves to `"{{T}} was {{number}} years old"` for custom vocabularies with union literals.
- [ ] `AfterFirstChar<"Foobar">` resolves to `"oobar"` without `TS2589`.
- [ ] `parseNumericDate` current-time test cases no longer emit `TS2345 [object Object]` or `TS2731` symbol-to-string diagnostics.
- [ ] String-key ordering fixes do not change runtime output and do not introduce a broader ordering contract for symbol keys or integer-like object keys.

### Final validation

- [ ] `just test-types` at the repo root exits normally with zero type errors.
- [ ] `just test-runtime` remains green.
- [ ] `just lint` passes.
- [ ] No TODO/FIXME/XXX/HACK markers are introduced.
- [ ] Any shared-utility changes that go beyond the public-contract decisions in this spec are escalated via a design-review document in `features/2026-07-01-type-complexity-phase2/`.
- [ ] Any assertion widening is documented in the phase log with the old assertion, new assertion, and justification.

## Open Questions

No blocking open questions remain after review. The decisions above are intended to make this spec ready for planning and implementation.

If implementation reveals a wider public-contract issue, add it here before proceeding with that slice. Each added question should include 2-3 solution options with pros/cons and a recommended option.

## Boundaries

- Fixes are limited to the Stage 2 type errors documented in [`stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md).
- No new runtime features or public APIs should be introduced unless required to fix a type error.
- Performance benchmarking is out-of-scope unless a utility redesign makes it necessary for acceptance.
- Do not remove or skip existing assertions as a substitute for fixing a documented root cause.
- Do not introduce a formal type-complexity budget in this phase; if needed, propose it as a follow-up architectural feature.

## Success Criteria

- `just test-types` at the repo root completes with zero type errors.
- All previously failing Stage 2 assertions pass without silent widening.
- `just test-runtime` remains green.

## Definition of Done

1. All acceptance criteria above are satisfied.
2. The Phase 2 plan and log document the fix strategy per directory and any widenings with justification.
3. No TODO/FIXME/XXX/HACK markers are introduced.
4. This spec's frontmatter has `reviewed: true`, `clarified: complete`, and `status: ready for planning and implementation`.
