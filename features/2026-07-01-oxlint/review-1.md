---
ready: false
implemented: true
agent: codex/default
created: 2026-07-01T14:16:10
---

# Review: Oxlint Migration

## Findings

### High: unused-variable lint coverage was dropped

The migration disables unused-variable checking in `.oxlintrc.json`:

- `.oxlintrc.json:281` sets `"no-unused-vars": "off"`.
- I could not find a replacement `typescript/no-unused-vars` rule in the config.

This violates the spec's rule-mapping requirement that `ts/no-unused-vars` be mapped to an Oxlint equivalent, preserved through a compatible fallback, or explicitly accepted as only a slight behavior difference (`features/2026-07-01-oxlint/spec.md:276`). The current behavior is not a slight difference: a probe file containing `const unused = 1` exits cleanly under `pnpm exec oxlint`.

For this repo, unused variables/imports are not only style noise. They often indicate stale type-test `cases`, abandoned parser branches, or dead runtime code. Dropping the rule weakens the stated migration goal of preserving common correctness and import/runtime hygiene.

Recommendation: enable Oxlint's TypeScript unused-vars rule with the existing ignore behavior for `_` and `cases`, or keep an explicit parity fallback until the unsupported behavior is documented and accepted.

### High: required impacted type-test validation fails

The spec requires filtered type tests for source areas changed by lint fixes (`features/2026-07-01-oxlint/spec.md:354`). This feature changes several datetime files, including:

- `modules/runtime/src/datetime/asIsoDate.ts`
- `modules/runtime/src/datetime/dateObjectToIso.ts`
- `modules/runtime/src/datetime/parseIsoDate.ts`
- `modules/runtime/src/datetime/toIsoDateString.ts`

I ran:

```sh
NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types datetime
```

It failed with multiple `TS2589` "Type instantiation is excessively deep and possibly infinite" errors and type assertion failures, including `tests/datetime/AsDateMeta.test.ts`, `tests/datetime/ParseDate.test.ts`, `tests/datetime/asTwoDigitMonth.test.ts`, `tests/datetime/isDoubleLeap.test.ts`, `tests/datetime/parseNumericDate.test.ts`, and `tests/boolean-logic/operators/datetime/IsSameMonthYear.test.ts`.

The combined impacted filter:

```sh
NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types datetime dictionary string-literals take boolean-logic
```

also exhausted the 8 GB Node heap and exited 134.

The spec explicitly calls out this repo's type-complexity risk and still requires filtered validation for touched areas (`features/2026-07-01-oxlint/spec.md:361`). Without a documented pre-existing baseline or a narrower passing replacement filter for the changed datetime files, the migration has not proven that lint-driven source edits preserved type-level behavior.

Recommendation: either prove these datetime failures are pre-existing with a baseline from before the Oxlint edits, or reduce/revert datetime lint edits until the relevant filtered type tests pass.

DECISION: this is a pre-existing problem

## Notes

- Import discipline: no new forbidden `@inferred-types/*` imports were introduced outside the expected `modules/inferred-types/src/index.ts` re-export surface.
- Runtime/type alignment: this feature is primarily infrastructure. The source edits are mostly lint-driven formatting/refactors; runtime behavior was covered by the full Vitest run, but the datetime type-test failures block production readiness.
- The migration removed ESLint and `eslint.config.ts`; that is acceptable only after parity gaps are accepted. The committed plan records parity decisions, but the unused-vars drop above still leaves a material correctness gap.

## Verification

- `pnpm install --frozen-lockfile`: passed.
- `pnpm lint`: passed with 25 `Unused eslint-disable directive` warnings.
- `pnpm lint:ox`: passed with the same 25 warnings.
- `pnpm test:runtime`: passed, 680 files passed and 8 skipped.
- `pnpm build`: passed.
- `git diff --check`: passed.
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types dictionary`: passed.
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types datetime`: failed.
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types datetime dictionary string-literals take boolean-logic`: failed with heap exhaustion.

## Production Readiness

Not ready for production. The lint contract drops unused-variable coverage, and the required type-level validation for impacted datetime areas is failing or unable to complete.
