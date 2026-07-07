---
ready: false
implemented: true
agent: codex/default
created: "2026-07-06T22:31:26"
spec: 2026-07-02-complex/spec.md
iteration: 2
description: Runtime source checking is disabled by noCheck, tracked complexity suppressions exceed the spec cap, and the suppression guard is too coarse.
---

# Review 2: Complex

## Verdict

Not production ready.

The implementation is much closer than review 1: default-heap type tests pass, `just check-types` passes, `just perf-compare` passes in an isolated run, lint passes, and runtime source checking has a recipe. The blocker is that the runtime recipe is not actually checking runtime source: the check-mode tsconfig sets `noCheck: true` and routes imports through an `any` shim. There are also still too many accepted complexity suppressions for the spec's cap, and the regression guard can miss new suppressions in already-listed files.

## Findings

### Critical: G4/G7 runtime source checking is green only because type checking is disabled

- Evidence:
  - `features/2026-07-02-complex/spec.md:305` requires `tsc --noEmit` to complete for `runtime` at the default heap and requires non-complexity errors, including `modules/runtime/src/api/handleDoneFn.ts`, to be fixed or explicitly deferred.
  - `features/2026-07-02-complex/spec.md:308` requires audit recipes using the W1 check-mode tsconfigs with plain `tsc`.
  - `modules/runtime/tsconfig.check.json:28` sets `"noCheck": true`.
  - `modules/runtime/tsconfig.check.json:7` and `modules/runtime/tsconfig.check.json:13` map `inferred-types/types` and `inferred-types/runtime` to `modules/runtime/src/runtime-check-shim.d.ts`.
  - `modules/runtime/src/runtime-check-shim.d.ts:2` starts a generated shim where exported types are `any`; later exports such as runtime helpers are also declared as `any`.
  - I ran `./node_modules/.bin/tsc -p modules/runtime/tsconfig.check.json --noEmit --pretty false --noCheck false`; it failed immediately with hundreds of diagnostics, including `modules/runtime/src/api/handleDoneFn.ts(18,43): error TS18046: 'val' is of type 'unknown'.`

`just check-runtime` completing in ~1.4s does not satisfy G4/G7 because it does not type-check the source. It also means `just perf-compare` cannot catch runtime source regressions or prove the previously named runtime errors were burned down.

Required fix: remove `noCheck`, replace the `any` shim with a real check-mode import strategy, and make `just check-runtime` pass under actual type checking. If some runtime diagnostics must remain deferred, list them under the same G3/G4 policy instead of hiding them behind `noCheck`.

### High: G3 accepts 22 complexity suppressions despite the spec's five-entry ceiling

- Evidence:
  - `features/2026-07-02-complex/spec.md:304` says the deferred list may not exceed five entries.
  - `rg -n "@ts-expect-error TS(2589|2590|2859|2321)" modules/types/src modules/runtime/src modules/constants/src` finds 22 suppressions.
  - `features/2026-07-02-complex/deferred.md:21` through `features/2026-07-02-complex/deferred.md:90` document 16 source files / symbols across numeric arithmetic, tuple/list helpers, token rendering, and parsers.
  - `features/2026-07-02-complex/perf-baseline.json` records `"total": 22` tracked complexity suppressions.

The current documentation is materially better than review 1, but it changes the acceptance bar from "no more than five" to "all current suppressions are documented." That is not the same contract.

Required fix: reduce tracked complexity suppressions to at most five entries, or revise the spec before claiming readiness.

### High: G6 suppression enforcement is file-level, so new same-file suppressions can slip through

- Evidence:
  - `features/2026-07-02-complex/spec.md:307` defines a regression as any undocumented complexity-class suppression appearing in source.
  - `features/2026-07-02-complex/perf-baseline.mjs:144` validates suppressions by reading `deferred.md`.
  - `features/2026-07-02-complex/perf-baseline.mjs:148` only checks `deferred.includes(suppression.file)`.
  - `features/2026-07-02-complex/deferred.md:21` lists `modules/types/src/numeric-literals/Mod.ts`, while the source currently has six separate suppressions in that file.

A new `@ts-expect-error TS2589` anywhere in `Mod.ts`, `Divide.ts`, or another already-listed file would be treated as documented even if the symbol, line, and justification were missing. That does not enforce the "complete set" described in `deferred.md:8` or the G6 undocumented-suppression gate.

Required fix: validate exact suppression identities. At minimum, compare file plus line plus diagnostic code; preferably compare file plus nearby symbol/name plus diagnostic code and require the deferred entry to enumerate each suppression.

### Medium: G2 peak RSS per slow file is still not verified by the guard

- Evidence:
  - `features/2026-07-02-complex/spec.md:303` requires no individual `typed test <file>` run to exceed 5s wall or 1.5 GB peak RSS.
  - `features/2026-07-02-complex/perf-baseline.mjs:64` parses per-file timings from the aggregate `typed test --metrics` output.
  - The guard never runs `/usr/bin/time -l typed test <file>` for individual files, so it has no per-file RSS evidence.

The current aggregate metrics are useful for spotting slow files, but they do not prove the per-file memory half of G2.

Required fix: make the guard time the known slow files individually, or add a separate checked baseline that records per-file peak RSS for the G2 candidate set.

## Verification Performed

- `pnpm test:types --metrics --show-passing`: pass, 10,243 assertions, 27.81s wall, 3,738,681,344 bytes peak RSS. This is under the G1 3.5 GiB cap of 3,758,096,384 bytes.
- `just check-constants`: pass.
- `just check-types`: pass.
- `just check-runtime`: pass, but invalid as G4/G7 evidence because `modules/runtime/tsconfig.check.json` has `noCheck: true`.
- `./node_modules/.bin/tsc -p modules/runtime/tsconfig.check.json --noEmit --pretty false --noCheck false`: fail with hundreds of runtime diagnostics.
- `just perf-compare`: pass in isolated run; reported type tests 19.9s / 3513 MiB RSS, source checks 120.08s / 3606 MiB peak RSS, zero emitted complexity diagnostics, 22 tracked suppressions.
- `pnpm lint`: pass.
- `pnpm test:runtime tests/containers/freeze.test.ts`: pass.
- Import scan found only expected `@inferred-types/*` references in the aggregate `modules/inferred-types` package and package metadata.

## Test Rigor Map

- G1 default-heap type-test execution: verified at Level 2 for the type-test suite and enforced by `just perf-compare`.
- G2 pathological files: partially verified. Aggregate per-file wall timings are captured; individual per-file peak RSS is not.
- G3 source complexity diagnostics: partially verified. Emitted diagnostics are zero, but 22 tracked suppressions exceed the spec cap.
- G4 whole-module checking: failed for runtime. The recipe passes only with `noCheck: true`; actual runtime type checking still fails.
- G5 resolution retained: mostly verified by passing type tests; I did not independently diff every public output type against the pre-feature baseline.
- G6 regression guard: incomplete because suppression validation is file-level and the runtime check it runs does not type-check.
- G7 audit paths: failed for runtime for the same reason as G4.
