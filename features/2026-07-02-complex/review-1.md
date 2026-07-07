---
ready: false
implemented: true
agent: codex/default
created: "2026-07-06T21:20:17"
spec: 2026-07-02-complex/spec.md
iteration: 1
description: Runtime source checking remains deferred, source complexity errors are suppressed rather than eliminated, and the regression guard does not enforce all acceptance gates.
---

# Review 1: Complex

## Verdict

Not production ready.

The implementation makes real progress: default-heap type tests pass, runtime tests pass, lint passes, import validation is clean, `just check-types` is clean, and `just perf-compare` reports zero complexity diagnostics. However, the feature's own acceptance criteria are stricter than those results. G4/G7 still do not close, and G3 is currently satisfied by hiding source-context complexity diagnostics with `@ts-expect-error` suppressions rather than eliminating or formally deferring them.

## Findings

### High: G4/G7 runtime source checking is still deferred

- Evidence:
  - `features/2026-07-02-complex/spec.md:304` requires whole-module checking to complete for `constants`, `types`, and `runtime` at the default Node heap.
  - `features/2026-07-02-complex/spec.md:307` requires `just` recipes that produce localized source diagnostics for each module in <= 5 minutes at <= 8 GB heap.
  - `features/2026-07-02-complex/deferred.md:5` explicitly defers `modules/runtime` whole-module `tsc` checking.
  - `features/2026-07-02-complex/implementation-log.md:12` also says `just check-runtime` remains deferred.
  - I ran `timeout 90s just check-runtime`; it did not complete and was terminated.

This is a direct acceptance-gate miss. A feature whose purpose is restoring usable standard tooling cannot be production-ready while one of the three module source-check paths is knowingly not working.

Required fix: make `just check-runtime` complete within the G4/G7 bounds, or revise the spec before review. The current deferred item may be useful tracking, but it does not satisfy the acceptance criterion.

### High: G3 complexity diagnostics are suppressed in source instead of eliminated or formally deferred

- Evidence:
  - `features/2026-07-02-complex/spec.md:303` requires `TS2589 + TS2590 + TS2859 + TS2321` across `modules/types` source to go from 75 to 0. Any diagnostic that cannot be eliminated must be listed in `deferred.md`, and the list may not exceed five entries.
  - `rg -n "@ts-expect-error TS(2589|2590|2859|2321)" modules/types/src modules/runtime/src modules/constants/src` finds 22 suppressions.
  - Examples:
    - `modules/types/src/numeric-literals/Mod.ts:54`
    - `modules/types/src/numeric-literals/Mod.ts:72`
    - `modules/types/src/runtime-types/tokens/OutputToken.ts:50`
    - `modules/types/src/lists/MakeOptional.ts:13`
    - `modules/types/src/string-literals/mutation/Nest.ts:47`
  - `features/2026-07-02-complex/deferred.md` only documents the runtime whole-module source check, not these suppressed type-complexity sites.

`just check-types` returning zero diagnostics is therefore not enough evidence that the source complexity has been eliminated. It proves the compiler output is clean after suppressions. That is materially different from the spec's target, and it also weakens the regression guard because suppressed source-context complexity can no longer reappear as a diagnostic.

Required fix: remove the complexity-class `@ts-expect-error` suppressions by implementing cheaper/bounded types, or list the irreducible cases in `deferred.md` with per-symbol justification while respecting the five-entry ceiling. If the intended policy is "suppression with a local comment is acceptable", the spec needs to say that explicitly.

### High: G6 regression guard does not cover all required gates

- Evidence:
  - `features/2026-07-02-complex/spec.md:306` requires a guard that captures suite wall time, peak RSS, per-file timings, and complexity-diagnostic counts.
  - `features/2026-07-02-complex/perf-baseline.mjs:80` only measures the type-test suite and `just check-types`.
  - `features/2026-07-02-complex/perf-baseline.mjs:84` runs typed under `--max-old-space-size=12288`, so the guard does not exercise the no-heap-flag path required by G1.
  - The guard does not check `just check-runtime` or `just check-constants`, so it cannot catch the G4/G7 runtime source-check failure.
  - The guard counts emitted complexity diagnostics, but the 22 source `@ts-expect-error` suppressions prevent those diagnostics from being emitted.

The current `just perf-compare` result is useful, but it is not a production regression guard for this spec. It can pass while core acceptance criteria remain false.

Required fix: make the guard execute the default-heap type-test path, include all required source-check recipes, and fail on complexity-class `@ts-expect-error` suppressions unless those suppressions are explicitly accepted and tracked by policy.

### Medium: G1 memory evidence is borderline and not enforced by the guard

- Evidence:
  - `features/2026-07-02-complex/spec.md:301` requires full type-test peak RSS <= 3.5 GB and wall time <= 60 s at the default heap.
  - I ran `/usr/bin/time -l pnpm test:types`; it passed in 20.32 seconds with 3,661,332,480 bytes peak RSS.
  - `features/2026-07-02-complex/perf-baseline.json:10` records 3,821,944,832 bytes / 3645 MiB under the 12 GB heap measurement.
  - `just perf-compare` reported 20.99 seconds and 4021 MB RSS in my run.

The default-heap command now passes, which is a major improvement, but the absolute memory target is either missed or close enough to require a clearer measurement convention. The regression script currently allows >3.5 GB because it only compares against baseline + 15%.

Required fix: decide whether the G1 cap is decimal GB or GiB, then enforce that cap directly in the regression guard.

## Verification Performed

- `pnpm test:types`: pass, 10,240 type assertions.
- `/usr/bin/time -l pnpm test:types`: pass, 20.32 real seconds, 3,661,332,480 bytes peak RSS.
- `pnpm test:runtime`: pass, 681 files passed, 3852 tests passed.
- `pnpm test`: pass, runtime stage plus type-test stage completed.
- `pnpm lint`: pass.
- `pnpm test:imports`: pass; no invalid import sections reported entries.
- `just check-constants`: pass.
- `just check-types`: pass.
- `just perf-compare`: pass; reported 20.99 seconds, 4021 MB RSS, zero complexity diagnostics.
- `timeout 90s just check-runtime`: did not complete; terminated by timeout.
- Marker scan over `modules`: no incomplete-work marker comments found; the naive search does match legitimate string literals in unrelated code.
- `rg -n "@ts-expect-error TS(2589|2590|2859|2321)" modules/types/src modules/runtime/src modules/constants/src`: 22 suppressions found.

## Test Rigor Map

- G1 default-heap type-test execution: partially verified. `pnpm test:types` and `pnpm test` pass, but memory cap enforcement is unclear and not included in the guard.
- G2 pathological per-file timing: partially verified. `typed --metrics` in the baseline shows no file above 5 seconds by wall timing; per-file peak RSS is not captured, so the 1.5 GB per-file requirement is not fully verified.
- G3 source complexity diagnostics: not verified as implemented. Emitted diagnostics are zero, but 22 complexity-class suppressions remain in source and are not listed in `deferred.md`.
- G4 whole-module checking: failed/incomplete. `constants` and `types` pass; `runtime` is deferred and did not complete within a bounded check.
- G5 resolution retained: mostly verified by the unchanged passing type-test suite, but the review did not independently prove every public output type is unchanged from the pre-feature baseline.
- G6 regression guard: incomplete. It covers type-test timing/RSS and `check-types` diagnostic counts, but not the default-heap path, runtime/constants source checks, per-file RSS, or suppressed complexity sites.
- G7 audit paths: incomplete because `just check-runtime` does not currently provide bounded runtime diagnostics.
