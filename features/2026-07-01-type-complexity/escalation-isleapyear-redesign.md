---
status: open
type: design-review-escalation
parent_feature: features/2026-07-01-type-complexity/spec.md
source: modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts
---

# Escalation: Redesign `IsLeapYear` Type Utility

## Background

During Phase 2 of the Type Complexity Stabilization feature, the type utility `IsLeapYear` in `modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts` was modified with a minimal stop-gap fix to prevent test crashes. The original implementation used `Or`/`And`/`Not` boolean combinators combined with template-literal divisibility checks (`DivBy4`, `DivBy100`, `DivBy400`) that caused a combinatorial explosion in TypeScript's type checker for literal year inputs.

## Minimal Change Applied

- Replaced the `Or`/`And`/`Not`-based leap-year detection with a direct digit-extraction `Detect` helper.
- The new helper infers the first/last two characters of the year string and applies the divisibility rules directly.
- Public API and return types (`true`, `false`, `boolean`, `Error`) remain unchanged.
- Runtime parity preserved: `modules/runtime/src/datetime/isLeapYear.ts` was not modified.

## Underlying Root Cause

The original formulation distributed a union of year literals across recursive template-literal matching and boolean combinators. For a large set of literal year inputs, TypeScript expanded the conditional types into a very large (possibly unbounded) type graph before summarizing the result, leading to V8 OOM or hang.

## Design-Review Task

1. Evaluate whether the digit-extraction approach should become the canonical implementation, or whether a cleaner recursive/numeric formulation can be designed that terminates efficiently for literal unions.
2. Ensure any redesign preserves:
   - Public API (`IsLeapYear<T>`)
   - Return-type semantics (`true` | `false` | `boolean` | `Error`)
   - Runtime/type parity with `isLeapYear()`
3. Add targeted type-performance benchmarks for leap-year and related datetime utilities.
4. Consider whether `IsDoubleLeap`, `DaysInMonth`, and other datetime utilities that depend on `IsLeapYear` should be reviewed for similar recursion patterns.

## Acceptance Criteria for Resolution

- [ ] A design decision is recorded for the preferred `IsLeapYear` implementation strategy.
- [ ] The chosen implementation passes `just test-types tests/boolean-logic/operators/datetime/IsLeapYear.test.ts` without crash.
- [ ] The chosen implementation passes `just test-types tests/datetime/daysInMonth.test.ts` without crash.
- [ ] `just test-runtime` remains green.
- [ ] No assertions in the affected test files are silently widened; any necessary changes are documented.
- [ ] Type-performance benchmarks are added or updated.

## Related

- Phase 1 crash inventory: `.ai/logs/type-complexity-phase1-isolation-log.md`
- Phase 2 stabilization notes: same log, `## Phase 2 Stabilization Notes`
