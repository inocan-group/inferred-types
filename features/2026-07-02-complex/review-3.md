---
ready: false
agent: codex/default
created: 2026-07-07T00:31:37
spec: 2026-07-02-complex/spec.md
iteration: 3
description: The feature still misses G1/G2 performance limits and the runtime source-check path hides real diagnostics behind a successful wrapper and unknown-type facade.
---

# Review 3: Complex

The feature is not ready for production. Review 2's exact suppression-tracking issue is fixed in the types source path, and the old five-entry ceiling has been removed from the spec. The remaining blockers are now in the feature's own acceptance gates and runtime check architecture.

## Findings

### Critical: `just perf-compare` fails G1 and G2 today

The spec requires the full type-test run to complete at the default heap in <= 60s and every individually checked slow file to complete in <= 5s (`features/2026-07-02-complex/spec.md:302` and `features/2026-07-02-complex/spec.md:303`). The guard encodes those exact limits (`features/2026-07-02-complex/perf-baseline.mjs:13` through `features/2026-07-02-complex/perf-baseline.mjs:30`) and runs `pnpm test:types` with `NODE_OPTIONS` cleared (`features/2026-07-02-complex/perf-baseline.mjs:234` through `features/2026-07-02-complex/perf-baseline.mjs:237`).

Verification result:

```text
just perf-compare
perf regression: type-test wall time 81.61s exceeds G1 limit 60s
perf regression: tests/api/GetUrlDynamics.test.ts wall time 9.33s exceeds G2 limit 5s
perf regression: tests/runtime/input-tokens/FromInputToken.test.ts wall time 6.24s exceeds G2 limit 5s
```

This directly violates the production-readiness gates. The checked-in baseline's faster timing is not enough; the comparison command has to pass on the review run.

Required fix: bring `pnpm test:types` wall time back under 60s at default heap and reduce the slow-file candidates so every individual `typed test <file>` run is <= 5s and <= 1.5 GiB, then refresh the baseline only after the current guard passes.

### High: `check-runtime` hides 807 source diagnostics behind exit 0, so G4/G6/G7 are not actually enforced

The spec requires source checks for all modules and requires the regression guard to capture complexity-diagnostic counts (`features/2026-07-02-complex/spec.md:305` through `features/2026-07-02-complex/spec.md:308`). The current runtime wrapper catches `tsc` failures and converts them into a string (`scripts/check-runtime-source.mjs:14` through `scripts/check-runtime-source.mjs:31`), writes the diagnostics to `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt`, then only prints a summary without exiting non-zero (`scripts/check-runtime-source.mjs:59` through `scripts/check-runtime-source.mjs:62`).

The artifact currently contains 807 diagnostics, including the explicitly named `handleDoneFn` failure at `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt:6` and seven TS2589 complexity diagnostics at `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt:411` through `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt:416` and `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt:522`.

Because `perf-baseline.mjs` measures the wrapper status and counts complexity diagnostics only from the wrapper's stdout/stderr (`features/2026-07-02-complex/perf-baseline.mjs:276` through `features/2026-07-02-complex/perf-baseline.mjs:290`), those seven runtime TS2589 diagnostics are reported as zero by the guard.

Required fix: make `check-runtime` produce machine-readable diagnostics in the measured command path. Either fail on non-deferred runtime diagnostics and count deferred complexity diagnostics explicitly, or make the guard parse the generated diagnostics artifact and compare it against an exact runtime deferred inventory.

### High: runtime source checking replaces the real `types` package with `unknown` aliases

`modules/runtime/tsconfig.check.json` maps `inferred-types/types` to `modules/runtime/src/runtime-check-types.d.ts` (`modules/runtime/tsconfig.check.json:7` through `modules/runtime/tsconfig.check.json:9`). That facade replaces exported type utilities with `unknown` aliases, for example `Abs`, `Add`, `AsDateMeta`, and `AsOutputToken` (`modules/runtime/src/runtime-check-types.d.ts:3` through `modules/runtime/src/runtime-check-types.d.ts:35`).

That makes the runtime check cheaper, but it also stops the runtime module from being checked against the real type-level contracts that runtime mirror functions claim to return. For this repo, that is not a harmless implementation detail: runtime/type parity is one of the inherited constraints, and G4 is meant to make whole-module checking meaningful rather than just suppress the expensive side of the graph.

Required fix: either check runtime source against the real `inferred-types/types` declarations, or split the runtime check into documented shards that keep real exported contracts at the boundaries while isolating only proven pathological internals.

### High: runtime deferral is not documented at the same rigor as the accepted type suppressions

G4 says all non-complexity errors are fixed or explicitly deferred under the same rules as G3 (`features/2026-07-02-complex/spec.md:305`). G3 requires per-symbol justification for individual diagnostics and exact enforcement for accepted complexity suppressions (`features/2026-07-02-complex/spec.md:304`).

The type-source suppressions now have exact identity rows in `features/2026-07-02-complex/deferred.md`, but the runtime side is documented only as a generated bulk diagnostics file. It has hundreds of errors across many modules and no per-symbol justification or exact identity enforcement comparable to `deferred.md#tracked-complexity-suppressions`.

Required fix: reduce runtime diagnostics substantially, then document any accepted runtime source-check debt with explicit per-symbol/per-diagnostic justification and wire the guard to enforce that inventory.

## Verification

- `just perf-compare`: failed. G1 wall-time limit exceeded, and two G2 slow-file wall-time limits exceeded.
- Import discipline scan: no forbidden `@inferred-types/*` imports found in `modules/{constants,types,runtime}/src` or tests, apart from documentation text.
- Forbidden marker scan across feature/source paths found no source TODO/FIXME/XXX/HACK markers; matches in feature review/plan prose were not implementation markers.
- Runtime diagnostics artifact inspection: 807 total runtime source diagnostics, including 7 TS2589 complexity diagnostics.

## Production Readiness

Not production ready. The implementation may be closer than review 2, but the feature cannot close while its own performance guard fails and while runtime source checking is both weakened by `unknown` aliases and excluded from real diagnostic enforcement.
