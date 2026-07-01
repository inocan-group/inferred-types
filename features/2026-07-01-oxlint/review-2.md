---
ready: false
implemented: true
agent: codex/default
created: 2026-07-01T14:27:40
---

# Review: Oxlint Migration, Iteration 2

## Findings

### High: changed `IsDayJs` type utility has no Level 2 type-test evidence

`modules/types/src/boolean-logic/operators/datetime/IsDayJs.ts:1` changes the utility's structural callable fields from `Function` to `AnyFunction`, and the utility still contains the repo-sensitive `any`, `unknown`, `never`, union, and dictionary branches at `modules/types/src/boolean-logic/operators/datetime/IsDayJs.ts:20`.

I could not find a matching `tests/**/IsDayJs.test.ts`, and `pnpm test:types takeStart IsJsDate IsDayJs IsMoment IsLuxonDateTime` did not run an `IsDayJs` file. It ran `takeStart`, `IsJsDate`, `IsLuxonDateTime`, and `IsMoment`, but not `IsDayJs`.

Per this review rubric, a changed type-only utility requires Level 2 coverage. This is especially important here because the feature was allowed to use filtered type tests for impacted areas (`features/2026-07-01-oxlint/spec.md:361`), and `IsDayJs` is an impacted type-level symbol.

Recommendation: add `tests/boolean-logic/operators/datetime/IsDayJs.test.ts` with assertions for true DayJS-like shapes, primitives, `any`, `unknown`, `never`, unions, and non-DayJS dictionary shapes. Then include that filter in the Phase 6 validation notes.

### High: `isInUnion` wide-token behavior changed without Level 1 coverage

`modules/runtime/src/type-guards/higher-order/isInUnion.ts:58` now returns `acc` from every non-matching switch case. Before this lint fix, cases fell through. For example, `isInUnion("Array")({})` previously reached the `"Dict"` branch and could return `true`; now it returns `false`. That is probably the correct behavior, but it is still a source behavior change.

The current test file only verifies literal unions (`tests/type-guards/isInUnion.test.ts:8` and `tests/type-guards/isInUnion.test.ts:18`). It does not cover any of the wide-token paths changed at `modules/runtime/src/type-guards/higher-order/isInUnion.ts:58`, including `"Array"`, `"Array<string>"`, `"Dict"`, `"Dict<string, unknown>"`, primitive tokens, or negative cross-token cases.

This misses the spec acceptance criterion that lint migration should not introduce source behavior changes without validation (`features/2026-07-01-oxlint/spec.md:371`). Since this is a plain runtime function with changed runtime behavior, it needs at least Level 1 coverage for the changed wide-token semantics.

Recommendation: add runtime assertions for every supported wide token and at least the fallthrough-regression negatives, such as `"Array"` rejecting `{}`, `"Array<string>"` rejecting `[1]`, `"Dict"` rejecting arrays, and primitive tokens rejecting neighboring primitive types.

## Notes

- The prior unused-variable finding appears fixed. `.oxlintrc.json` enables `no-unused-vars` with `_` and `cases` ignore patterns, and a direct probe reports `const unused = 1` as an Oxlint error while allowing `_unused` and `cases`.
- ESLint removal and `eslint.config.ts` deletion match the final-phase shape once parity gaps are accepted.
- Import discipline was clean for the reviewed source changes; no new forbidden `@inferred-types/*` source imports were introduced outside package metadata and the expected `modules/inferred-types` re-export surface.
- Broad filtered type tests still hit known type-complexity failures, so the review relies on narrower impacted filters where possible and calls out the missing `IsDayJs` evidence explicitly.

## Verification

- `pnpm install --frozen-lockfile`: passed.
- `pnpm lint`: passed with expected unused `eslint-disable` warnings.
- `pnpm exec oxlint -c .oxlintrc.json /tmp/probe.ts` with `const unused = 1`: failed as expected on `no-unused-vars`.
- `pnpm exec oxlint -c .oxlintrc.json /tmp/probe.ts` with `_unused` and `cases`: passed.
- `pnpm test:runtime tests/string-literals/infer.test.ts tests/datetime/toIsoDateString.test.ts tests/type-guards/datetime/isoDateTimeTypeGuards.test.ts`: passed.
- `pnpm test:runtime tests/type-guards tests/take tests/runtime-types`: passed.
- `pnpm test:runtime tests/type-guards/isInUnion.test.ts`: passed, but it only covers literal unions.
- `pnpm test:types infer iso-date-and-time`: passed.
- `pnpm test:types takeStart IsJsDate IsDayJs IsMoment IsLuxonDateTime`: passed for matching files, but no `IsDayJs` test file was found or run.
- `pnpm test:types take boolean-logic/operators/datetime/IsJsDate boolean-logic/operators/datetime/IsDayJs`: failed in pre-existing `tests/string-literals/take/TakeDate.test.ts` with TS2589/TS2344.
- `pnpm -r build`: passed.
- `git diff --check`: passed.

## Production Readiness

Not ready for production. The lint migration itself is mostly in shape, but two changed symbols lack the required evidence: `IsDayJs` has no type-level tests, and `isInUnion` has untested runtime behavior changes for wide tokens.
