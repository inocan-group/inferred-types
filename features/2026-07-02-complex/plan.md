---
agent: "claude-code/claude-fable-5"
total_phases: 8
created: 2026-07-06
start_phase: 1
yolo: false
spec: features/2026-07-02-complex/spec.md
description: >
  Phased plan to reduce type-instantiation cost across the inferred-types
  monorepo — restoring default-heap tooling, eliminating the 75
  complexity-class source diagnostics, and preserving narrow type resolution —
  with a measurement foundation built first so every remediation phase is
  verified against hard numbers.
---

# Type Performance Stabilization — Implementation Plan

Baseline evidence, targets, and policies live in [`spec.md`](./spec.md). The raw
diagnostic inventory is `types-module-diagnostics-2026-07-06.txt` in this
directory. Do not begin any remediation phase (3–7) before Phase 1's regression
guard exists.

## Phase 1 — Measurement Foundation & Config Hygiene (W1)

**Goal:** every later phase can be measured cheaply and honestly; config
artifacts (TS6305 / TS5101) stop polluting diagnostics.

- [ ] Create `tsconfig.check.json` in each of `modules/constants`, `modules/types`, `modules/runtime`:
      no `composite`, no `references`, no `baseUrl`, `noEmit: true`, `skipLibCheck: true`,
      `paths` mapped to **source** (`../types/src/index.ts` etc., matching the vitest aliases),
      includes limited to `src/**/*.ts` (drop the stray `"src/string-literals/character-sets/Opt"`-style entries
      and `.drop`/`.hold` files currently in the `include` arrays)
- [ ] Verify: `tsc -p modules/constants/tsconfig.check.json` exits clean at default heap
- [ ] Verify: `tsc -p modules/types/tsconfig.check.json` runs to completion at 12 GB heap and the
      TS6305 count drops to zero; error totals otherwise match the 2026-07-06 inventory (re-baseline the file if not)
- [ ] Verify: `tsc -p modules/runtime/tsconfig.check.json` runs to completion (errors expected; captured, not fixed here)
- [ ] Add `just` recipes: `check-constants`, `check-types`, `check-runtime` (each: `NODE_OPTIONS=--max-old-space-size=12288 tsc -p <check-config> --noEmit --pretty false`), plus `check` running all three
- [ ] Add `just perf-baseline`: runs `typed test` under `/usr/bin/time -l`, captures wall/peak-RSS,
      per-file timings via `--metrics`, and complexity-diagnostic counts from `just check-types`,
      writing a JSON baseline (checked in; location per spec Open Question 3)
- [ ] Add `just perf-compare`: re-runs the same measurements and fails if any complexity-class
      diagnostic count rose, or suite peak RSS grew > 15 %
- [ ] Capture and commit the Phase-1 baseline JSON
- [ ] Document the scoped-tracing workflow (single file / single subdirectory only) in `docs/type-performance.md`,
      and remove/correct stale references there (`detect-regressions.sh`, `typed diagnostics`, etc.)
- [ ] Fix `pnpm test:types` so it survives today's peak until Phase 2 lowers it below the
      default heap: route the script through the same heap-raised invocation the justfile uses.
      This also unbreaks `just test` / `pnpm test`, whose `scripts/test-with-args.mjs`
      currently crashes in its type-test stage for exactly this reason
      (stopgap; G1 ultimately removes the need)

**Validation checkpoint:** `just check` produces localized diagnostics for all three modules;
`just perf-compare` runs green against the freshly captured baseline; `pnpm test:types` exits 0.

## Phase 2 — Runtime Return-Annotation Audit + Assertion & Idiom Cost (W2)

**Goal:** the proven highest-leverage fix class first, then the cheap multiplicative wins.
Root cause and exemplar evidence are in the spec's "Root cause confirmed by probes" section.

### 2a — Return-annotation audit (210 functions)

Inventory: `unannotated-runtime-functions-2026-07-06.txt`. Already done as exemplars
(measured, green): `daysInMonth()`, `increment()`, `decrement()`.

- [x] `daysInMonth()` — 29.3 s / 4.1 GB → 4.4 s / 0.86 GB, 97 assertions unchanged
- [x] `increment()` — 10.4 M → 6.8 k instantiations
- [x] `decrement()` — 11.2 s → 0.35 s
- [ ] Triage the remaining 207 into three buckets: (a) simple — body casts to a single
      utility type, annotate mechanically; (b) HOF/curried or overloaded — annotation needs
      per-function care (the returned *function* type is the boundary to annotate);
      (c) intentionally inferred — document why, if any
- [ ] Work bucket (a) in directory-sized batches (`boolean-logic/`, `dictionary/`, `datetime/`,
      `lists/`, `type-guards/`, …); after each batch run the matching `typed test` filter +
      vitest filter — assertions must be byte-for-byte unchanged
- [ ] Work bucket (b) individually, worst-first as ranked by the Phase-1 per-file metrics
- [ ] Add a lint guard so the class of bug cannot return: require explicit return types on
      exported generic functions in `modules/runtime` (ESLint `explicit-module-boundary-types`
      or a scoped variant; align with the repo's `@antfu/eslint-config` setup)
- [ ] Re-run full suite; record wall/RSS (expected to drop well below 4 GB, likely meeting G1 early)

### 2b — Assertion & conditional-branch idiom cost

- [ ] `modules/types/src/assertions/Test.ts`: restructure so `Assert<TTest, TOp, TExpected>` is
      instantiated **once** (bind via `extends infer R`, then run the `IsAny`/`IsNever` guards and
      result mapping against `R`); land isolated with full-suite before/after and zero outcome changes
- [ ] `modules/types/src/string-literals/take/TakeDate.ts` (`WithContext`): bind `Take<T>` once via `infer`
- [ ] `modules/types/src/runtime-types/type-defn/input-tokens/GetInputToken.ts` (`Iterate`): bind each
      `Process<IT_Take*<T>>` result once; 14 handlers currently instantiate twice each
- [ ] Grep-audit the same pattern across `modules/types/src`; fix instances on Phase-1-measured hot paths,
      list the rest in the phase log
- [ ] Re-measure the remaining slow files (`FromInputToken`, `isTailwindColorClass`, `PhoneNumbers`,
      `AsDateMeta`); record deltas

**Validation checkpoint:** full `typed test` green with unchanged outcomes; suite peak RSS
below default heap (G1 gate attempted here); `just perf-compare` green.

## Phase 3 — Numeric-Literal Arithmetic Cluster (W3)

**Goal:** clear the densest complexity-error cluster (24 diagnostics) and fix the
`Increment`/`Decrement` slow files.

Targets: `Mod`, `Multiply`, `Divide`, `Add`, `Sum`, `Subtract`, `Delta`, `Increment`,
`Decrement`, `ShiftDecimalPlace`, `CompareNumbers`, `CSV` (numeric-literals);
`IsLessThan`, `IsGreaterThan` (operators); `FixedLengthArray` (tuples).

- [ ] Reproduce each file's diagnostics in isolation with a scoped `tsc` probe (one probe file per utility;
      keep probes under this feature directory or scratch — not in `tests/`)
- [ ] Fix `FixedLengthArray` first (shared primitive; `TS2589` at line ~37) — wide-input early return and/or
      bounded doubling without the `any[]` cap leaking
- [ ] Rework the arithmetic utilities against the spec's preferred patterns (wide-input early return,
      bind-once, phase-split); shared digit/char helpers may be consolidated but must remain internal
- [ ] Fix the comparison operators (`IsLessThan`, `IsGreaterThan`) including branded-number paths
      (regression risk: `tests/boolean-logic/operators/IsGreaterThan.test.ts` branded cases)
- [ ] `just check-types`: numeric-literals + tuples + numeric operators contribute **zero** complexity-class diagnostics
      (note: the `Increment`/`Decrement` **test files** were already fixed by Phase 2a annotations;
      this phase owns the *module-context* TS2589s that remain in the arithmetic sources themselves)
- [ ] Full runtime suite (`pnpm test:runtime numeric`) green; full type suite green with unchanged assertions

**Validation checkpoint:** `just perf-compare` green; cluster diagnostic count 24 → 0.

## Phase 4 — Datetime Family (W4)

**Goal:** clear the 7 datetime complexity diagnostics without re-breaking the phase-2
(July-1) fixes. (The `daysInMonth` **test-file** blow-up is already resolved by the Phase-2a
annotation — 29.3 s / 4.1 GB → 4.4 s / 0.86 GB with no precision loss — so this phase is
about module-context health, and its profiling tasks apply only if the file regresses.)

Targets: `DaysInMonth`, `ParseDate` → `TakeYear`/`TakeMonth`/`TakeDate` chain,
`IsLeapYear`/`IsDoubleLeap` (80-member `IsoModernDoubleLeap` union), `IsSameYear`,
`IsSameMonthYear`, `AsTwoDigitMonth`, `AsFourDigitYear`, `AsRelativeDate`, `AsDateMeta`.

- [ ] Profile `daysInMonth.test.ts` with a scoped trace to rank which input forms dominate
      (agent survey predicts full ISO datetime inputs via `ParseDateTime` → `Split` → `ParseTime`)
- [ ] Flatten `DaysInMonth`'s ~10-level dispatch: extract only the fields it needs (year, month) via
      bounded helpers instead of full `ParseDate` where inputs allow
- [ ] Replace `IsoModernDoubleLeap` union-membership testing with a cheaper bounded check if profiling
      shows it matters (80 members may be acceptable — measure first)
- [ ] Apply bind-once/early-return fixes through the `Take*` chain (beyond Phase 2's `TakeDate` fix)
      where the trace shows repeated instantiation
- [ ] Fix the datetime complexity diagnostics from the inventory (`IsSameYear`, `IsSameMonthYear`,
      `IsLeapYear`, `AsTwoDigitMonth`, `AsFourDigitYear`, `AsRelativeDate`, `DaysInMonth`)
- [ ] Regression sweep: `just test-types datetime`, `just test-types boolean-logic/operators/datetime`,
      `just test-types take`, `just test-types literals` — all green with unchanged assertions
- [ ] `typed test tests/datetime/daysInMonth.test.ts` ≤ 5 s / ≤ 1.5 GB; `AsDateMeta.test.ts` ≤ 2 s

**Validation checkpoint:** `just perf-compare` green; datetime cluster diagnostics 7 → 0;
no July-1 phase-2 assertion regressions.

## Phase 5 — Generated Template-Literal Unions (W5) *(parallelizable with Phase 4)*

**Goal:** stop materializing cartesian unions nobody can afford.

Targets: Tailwind (`TwColor`/`TwTarget`/`FullTailwindColorClass`, ~2,440-member union),
`PhoneNumber` family, `Url.ts`, `html/tag.ts`, `Network-operators.ts`, `IsPercentage`,
interpolation (`StaticTemplateSections`, `ApplyTemplate`).

- [ ] Tailwind: replace membership-in-materialized-union with a validation-shaped conditional
      (parse target/color/luminosity/opacity/modifiers structurally); keep the *narrow* guard result type
      for valid literal inputs
- [ ] Confirm `isTailwindColorClass` runtime guard + type tests unchanged in outcome; file ≤ 2 s individually
- [ ] PhoneNumber: resolve spec Open Question 2 (default assumption: restore **bounded** validation);
      either way remove the dead commented-out validator block and make the shape's cost proportional
      to what it validates
- [ ] Fix `Url.ts`, `html/tag.ts`, `Network-operators.ts`, `IsPercentage`, and the two interpolation files'
      complexity diagnostics with the same structural-validation approach
- [ ] Regression sweep: `just test-types tw`, `just test-types PhoneNumber`, `just test-types urls`,
      `just test-types interpolation` (adjust filters to actual paths) — green, unchanged assertions

**Validation checkpoint:** `just perf-compare` green; cluster diagnostics 4+ → 0;
`PhoneNumbers.test.ts` and `isTailwindColorClass.test.ts` both ≤ 2 s individually.

## Phase 6 — Lists & String-Mutation Recursion (W6) *(parallelizable with Phase 5; after Phase 3 because of shared tuple primitives)*

**Goal:** clear the remaining recursion-heavy clusters (11 + 11 diagnostics).

Targets: `TakeFirst`, `Slice`, `IndexOf`, `Longest`, `BeforeLast`, `AsNumericArray`,
`IsValidIndex` (lists); `NestedSplit`, `Repeat`, `Split`, `Split2`, `ReplaceFromTo`,
`HexToDecimal` (string mutation); `domains/nesting/helpers/IsEntryToken`.

- [ ] Reproduce each diagnostic with a scoped probe; classify: genuine deep recursion vs.
      constraint-context blow-up (`TS2344` companions in the same files often point at the latter)
- [ ] Apply wide-input early returns and bind-once through the list utilities; where a utility
      recurses element-by-element over tuples, cap with the established bailout pattern rather than `any`
- [ ] `NestedSplit` / `Split2` / `ReplaceFromTo`: verify against the July-1 phase-2 nesting work —
      these share helpers with `RetainUntil__Nested`; run the full nesting/domains filters after changes
- [ ] `HexToDecimal`: fix both the TS2589s and the accompanying `As<...>` constraint error
- [ ] Regression sweep: `just test-types lists`, `just test-types string-literals`,
      `just test-types domains` — green, unchanged assertions

**Validation checkpoint:** `just perf-compare` green; both clusters' complexity diagnostics → 0.

## Phase 7 — Source-Error Burn-Down & Runtime Checkability (W7)

**Goal:** make G4's "clean whole-module check" true for all three modules.

- [ ] Work through the remaining non-complexity errors in `modules/types`
      (~118: TS2344 constraint violations, TS2304 missing names, TS2536 index errors, TS2300 duplicates,
      TS2322 assignability, `ToJson`, `ValidateLength`, `TakeYear` constraint errors, etc.);
      each is a real latent bug or a stale internal contract — fix or defer per spec G3/G4 rules
- [ ] Fix `modules/runtime` real errors starting with `src/api/handleDoneFn.ts` (TS2339/TS2349)
- [ ] `just check-runtime` reaches zero errors at default heap
- [ ] `just check-types` reaches zero errors; runs at default heap in ≤ 180 s (G4)
- [ ] Point `pnpm audit:types` / `audit:runtime` / `audit:constants` at the working `just check-*`
      path (or equivalent tsc invocation) so the package scripts stop invoking the non-viable
      `typed source` configuration (G7); leave `typed source` itself to the tooling exercise
- [ ] If any deferrals were used, create `deferred.md` (≤ 5 entries, per-symbol justification)

**Validation checkpoint:** `just check` — all three modules clean (or documented deferrals);
full runtime + type suites green.

## Phase 8 — Final Validation & Closeout

- [ ] `pnpm test:types` at **default heap**: exit 0, peak RSS ≤ 3.5 GB, wall ≤ 60 s (G1) —
      remove the Phase-1 heap-raising stopgap
- [ ] Per-file sweep: no test file > 5 s / 1.5 GB individually (G2); runner's slow-file list re-checked
- [ ] `just check-types 2>&1 | grep -cE "error TS(2589|2590|2859|2321)"` → **0** (G3)
- [ ] `just check` clean for all modules at documented budgets (G4, G7)
- [ ] Diff review of all assertion changes across phases: every widening documented (G5)
- [ ] Refresh the checked-in perf baseline; `just perf-compare` green (G6)
- [ ] Forbidden-marker scan: `rg -i "TODO|FIXME|XXX|HACK" modules/` clean
- [ ] Update `docs/type-performance.md` with the final workflow and numbers; write the implementation
      log for this feature directory

**Exit criteria:** all spec goals G1–G7 demonstrably met by the commands in the spec's
Verification section, run in a single sitting on baseline hardware.
