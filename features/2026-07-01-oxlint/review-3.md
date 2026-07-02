---
ready: false
agent: codex/default
created: 2026-07-01T15:13:46
---

# Review: Oxlint Migration, Iteration 3

## Findings

### High: `isInUnion` wide-token runtime support is not type-aligned

`modules/runtime/src/type-guards/higher-order/isInUnion.ts:32` documents string tokens such as `"string"`, `"number"`, `"Array<string>"`, and `"Dict"` as wide-type selectors. Runtime support for these tokens is now covered at `tests/type-guards/isInUnion.test.ts:32`, and those value assertions pass.

The returned type guard still narrows to `TOptions[number]` at `modules/runtime/src/type-guards/higher-order/isInUnion.ts:45`. That means `isInUnion("string")` is typed as a guard for the literal `"string"`, even though runtime accepts any string. Similarly, `isInUnion("Array<string>")` is typed as a guard for the literal `"Array<string>"`, while runtime accepts `string[]`.

This is a runtime-to-type alignment failure in a type guard whose public API explicitly treats tokens as type descriptions. The strongest current evidence for wide tokens is Level 1 only: `tests/type-guards/isInUnion.test.ts:32` through `tests/type-guards/isInUnion.test.ts:68` checks runtime behavior, while `pnpm test:types isInUnion` reports only one type assertion, for the literal numeric guard at `tests/type-guards/isInUnion.test.ts:13`.

Recommendation: map token members through the existing simple-token type machinery instead of returning `TOptions[number]` directly. For example, derive the predicate target from each option as `T extends SimpleToken ? SimpleType<T> : T`, union the mapped tuple members, and assert Level 3 examples for `"string"`, `"number"`, `"boolean"`, `"Array<string>"`, `"Array<number>"`, `"Array<boolean>"`, `"Array<Dict>"`, `"Dict"`, and mixed literal-plus-token unions.

DECISION: this sounds like the WRONG IDEA; we never want to widen types!

## Notes

- The prior `IsDayJs` blocker is fixed. `tests/boolean-logic/operators/datetime/IsDayJs.test.ts:18` now covers true shapes, primitives, `any`, `unknown`, `never`, unions, and non-DayJS dictionaries with Level 2 type assertions.
- The prior `isInUnion` runtime blocker is fixed at Level 1. The new runtime tests verify wide-token positives and cross-token negatives, including the fallthrough regressions called out in iteration 2.
- ESLint removal and package script changes match the final-phase migration shape. `package.json`, `pnpm-workspace.yaml`, and `modules/*/package.json` no longer contain ESLint dependency or `lint:eslint` script references.
- `.oxlintrc.json:3` keeps `respectEslintDisableDirectives: true` and `reportUnusedDisableDirectives: "warn"`, matching the transition requirement for existing inline disables.
- I did not find new TODO/FIXME/XXX/HACK markers introduced in Oxlint implementation files. Existing source TODOs remain outside this feature's changed implementation surface.

## Verification

- `pnpm lint`: passed with expected unused `eslint-disable` warnings.
- `pnpm test:runtime tests/type-guards/isInUnion.test.ts`: passed.
- `pnpm test:types IsDayJs`: passed, 24 type assertions.
- `pnpm test:types isInUnion`: passed, but only one type assertion was present and it does not cover wide-token inference.
- `rg -n "eslint|@typescript-eslint|antfu|lint:eslint" package.json pnpm-workspace.yaml modules/*/package.json .oxlintrc.json features/2026-07-01-oxlint/spec.md`: no remaining ESLint dependency or script references in package manifests; expected references remain in the spec and `.oxlintrc.json` ignore/options.

## Production Readiness

Not ready for production. The Oxlint toolchain migration is mostly in shape, and the previous iteration's concrete test gaps were addressed, but the touched `isInUnion` wide-token API now has proven runtime behavior without matching type-level narrowing. In this repository, that is a high-severity release blocker.
