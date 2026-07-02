---
title: Type Complexity Stabilization – Phase 2
status: draft
clarified: pending
date: 2026-07-01
parent_feature: features/2026-07-01-type-complexity/spec.md
source_findings: features/2026-07-01-type-complexity/stage2-findings.md
packages:
  - modules/types
  - modules/runtime
---

# Type Complexity Stabilization – Phase 2

## Problem Statement

Phase 1 of the Type Complexity Stabilization feature restored `just test-types` to a non-crashing state and produced a detailed diagnosis of the remaining type errors. This Phase 2 feature implements the fixes identified in [`features/2026-07-01-type-complexity/stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md) so that the type-test suite eventually exits with zero type errors while preserving the library's narrow-type guarantees and runtime/type parity.

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

- First attempt the fix at the test-file level (e.g., simplify or split test cases).
- If the root cause is clearly in `modules/types/src/` or another shared utility, a test-level fix may be applied to stop a crash or error, but a separate design-review task/escalation must be created to address the underlying utility.
- Runtime/type parity must be preserved for any utility changes.
- Test-only fixes are preferred when they avoid masking real bugs.

### Existing-assertions floor (Q3)

- Any change that breaks an existing assertion is unacceptable unless the assertion is explicitly updated and documented.
- Widening is allowed only when unavoidable, and must be recorded as an explicit test/expectation change with a clear justification.
- A type-complexity budget remains out-of-scope unless proposed as a separate architectural task.

## Current State

`just test-types` completes without crashing but currently reports **77 of 3638 tests had errors** and **21 of 661 test files had errors**. The root causes are grouped into cross-cutting families plus several isolated issues, including the datetime and boolean-logic datetime-operator failures added after Review 2. See [`stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md) for the full per-directory diagnosis.

## Work Plan

### P0 — Nesting config helpers

Fix `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, and `IsNestingMatchEnd` so they correctly interpret hierarchical tuple configs of the shape `{ "(": [")", {}]; "[": ["]", { "{": "}" }] }`.

### P0 — Date-time branded / string-literal validators

Redesign `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, and the `TakeDate` / `TakeYear` / `TakeMonth` wrappers so they terminate efficiently for literal inputs and no longer collapse to `any` via `TS2589`.

### P0 — Date parser/meta consumers

Stabilize `ParseDate`, `AsParsedDate`, `AsDateMeta`, `AsTwoDigitMonth`, `DaysInMonth`, and `isDoubleLeap` type paths so the current `tests/datetime` failures resolve without `TS2589` or `any` leakage.

### P0 — Date predicate correctness

Fix `IsSameMonthYear` mixed DateLike normalization so year-month/full-date comparisons infer `true` when the shared year and month match. This is a correctness failure, not only a type-complexity failure.

### P1 — Shallow / hierarchical nesting syntax

Implement named configs `"shallow-quotes"`, `"shallow-brackets"`, `"shallow-brackets-and-quotes"`, and explicit hierarchical configs in `NestedSplit` and `RetainUntil__Nested`, reusing the helper-type work above.

### P1 — Date-time comparison `sameYear`

Add a targeted overload or efficiency fix for `compare("sameYear", ...)` so `Compare.test.ts` resolves without `TS2589`.

### P1 — Boolean datetime operators

Fix `IsDateLike`, `IsIsoDateTime`, and `IsSameYear` so `just test-types boolean-logic/operators/datetime` passes without deep-instantiation failures.

### P1 — Branded numeric comparison

Ensure `IsGreaterThan` can compare branded `FourDigitYear` values without triggering `TS2589` or `any`.

### P2 — Isolated fixes

- `ToJsonObject` / `toJSON` key ordering.
- `toKeyValue` ordered-tuple return type.
- `AsLiteralTemplate` with `TemplateMap__Generics` and `AsStaticTemplate` custom vocabularies.
- `AfterFirstChar` recursion on `"Foobar"`.
- `parseNumericDate` current-time test/helper typing around symbol-keyed parse result data.

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

### Shallow / hierarchical nesting syntax

- [ ] `NestedSplit<"1234, 4567, \"Bob, the quintessential idiot, did not care\"", ", ", "shallow-quotes">` resolves to the expected tuple.
- [ ] Skipped new-syntax describe blocks in `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts` can be un-skipped and pass.
- [ ] `tests/domains/nesting/nesting.test.ts` hierarchical and shallow config cases return literal results instead of `Unbalanced` error objects.

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

### Final validation

- [ ] `just test-types` at the repo root exits normally with zero type errors.
- [ ] `just test-runtime` remains green.
- [ ] `just lint` passes.
- [ ] No TODO/FIXME/XXX/HACK markers are introduced.
- [ ] Any shared-utility changes that go beyond a test-file fix are escalated via a design-review document in `features/2026-07-01-type-complexity-phase2/`.

## Boundaries

- Fixes are limited to the Stage 2 type errors documented in [`stage2-findings.md`](../2026-07-01-type-complexity/stage2-findings.md).
- No new runtime features or public APIs should be introduced unless required to fix a type error.
- Performance benchmarking is out-of-scope unless a utility redesign makes it necessary for acceptance.

## Success Criteria

- `just test-types` at the repo root completes with zero type errors.
- All previously failing Stage 2 assertions pass without silent widening.
- `just test-runtime` remains green.

## Definition of Done

1. All acceptance criteria above are satisfied.
2. The Phase 2 plan and log document the fix strategy per directory and any widenings with justification.
3. No TODO/FIXME/XXX/HACK markers are introduced.
4. This spec's frontmatter is updated with `clarified: complete` when done.
