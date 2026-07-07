---
ready: true
agent: codex/default
created: 2026-07-07T06:41:43
spec: 2026-07-02-complex/spec.md
iteration: 4
description: Production-ready; performance and source-check gates pass, with remaining runtime/source complexity debt exactly inventoried and guarded.
---

# Review 4: Complex

The feature is ready for production. The blockers from review 3 have been addressed: the performance guard now passes on the current tree, the runtime source-check wrapper emits machine-readable diagnostic counts from the measured path, and runtime deferred diagnostics are exact-matched against both the generated inventory and the documentation table in `deferred.md`.

## Findings

No blocking findings.

## Verification

- `just perf-compare`: passed.
  - Type tests: 20.55 s, 3557 MiB RSS.
  - G1 limits: <= 60 s and <= 3584 MiB RSS.
  - Slowest measured type-test files: `tests/runtime/input-tokens/FromInputToken.test.ts` 1542 ms, `tests/datetime/AsDateMeta.test.ts` 758 ms, `tests/api/GetUrlDynamics.test.ts` 466 ms.
  - Source checks: `check-constants=0`, `check-types=0`, `check-runtime=0`.
  - Complexity diagnostics: 7, all from the tracked runtime deferred inventory.
  - Tracked source complexity suppressions: 22.
- `/usr/bin/time -l pnpm test`: passed at the default heap.
  - Runtime tests: 682 files passed, 3853 tests passed.
  - Type tests: no errors, 3252 of 3638 tests with type tests, 10243 assertions.
  - Whole command: 49.13 s, 3614425088 bytes max RSS.
- `/usr/bin/time -l just check-types`: passed in 129.36 s, under the spec's 180 s `modules/types` ceiling.
- `just check-runtime`: passed with `RUNTIME_SOURCE_DIAGNOSTICS` status `matched-deferred-inventory`.
  - Deferred runtime diagnostics: 491.
  - Runtime complexity diagnostics: 7 TS2589.
- Forbidden package import scan found no implementation/test imports from `@inferred-types/*`; the only match was documentation text in `tests/globals-and-transpiled/README.md`.
- Forbidden marker scan over source and relevant feature files found no committed `TODO`/`FIXME`/`XXX`/`HACK` marker comments. The two lowercase `xxx` matches are string/type literal content, not work markers.

## Notes

The feature still carries accepted debt, but it is now explicit and guarded rather than hidden:

- `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt` is the exact runtime diagnostic inventory.
- `features/2026-07-02-complex/deferred.md` documents the runtime diagnostic-bearing files with counts, code distributions, and justifications.
- `scripts/check-runtime-source.mjs` fails on inventory drift or documentation drift, and `perf-baseline.mjs` consumes the emitted runtime diagnostic summary.

The runtime check facade in `modules/runtime/src/runtime-check-types.d.ts` remains a check-mode approximation rather than the real exported type graph. That is acceptable for this feature because the spec's G4/G7 target is a working source-check path with explicit deferral for remaining source debt, and the exact deferred inventory is enforced. It should not be treated as a substitute for consumer-side declaration checks in a future release-quality pass.

## Production Readiness

Production ready. The user-observable acceptance gates for this stabilization feature pass, and the remaining type-complexity/runtime-source debt is documented with exact regression guards.
