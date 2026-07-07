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
source_files:
  - features/2026-07-02-complex/perf-baseline.mjs
  - features/2026-07-02-complex/phase3-probes/Add.ts
  - features/2026-07-02-complex/phase3-probes/CSV.ts
  - features/2026-07-02-complex/phase3-probes/CompareNumbers.ts
  - features/2026-07-02-complex/phase3-probes/Decrement.ts
  - features/2026-07-02-complex/phase3-probes/Delta.ts
  - features/2026-07-02-complex/phase3-probes/Divide.ts
  - features/2026-07-02-complex/phase3-probes/FixedLengthArray.ts
  - features/2026-07-02-complex/phase3-probes/Increment.ts
  - features/2026-07-02-complex/phase3-probes/IsGreaterThan.ts
  - features/2026-07-02-complex/phase3-probes/IsLessThan.ts
  - features/2026-07-02-complex/phase3-probes/Mod.ts
  - features/2026-07-02-complex/phase3-probes/Multiply.ts
  - features/2026-07-02-complex/phase3-probes/ShiftDecimalPlace.ts
  - features/2026-07-02-complex/phase3-probes/Subtract.ts
  - features/2026-07-02-complex/phase3-probes/Sum.ts
  - features/2026-07-02-complex/phase3-probes/tsconfig.json
  - justfile
  - modules/constants/src/TypeComparisons.ts
  - modules/constants/tsconfig.check.json
  - modules/runtime/src/api/handleDoneFn.ts
  - modules/runtime/src/boolean-logic/ifArrayPartial.ts
  - modules/runtime/src/boolean-logic/ifScalar.ts
  - modules/runtime/src/css/createCssKeyframe.ts
  - modules/runtime/src/datetime/asDateTime.ts
  - modules/runtime/src/lists/joinWith.ts
  - modules/runtime/src/regex/createTemplateRegExp.ts
  - modules/runtime/src/runtime-check-shim.d.ts
  - modules/runtime/src/runtime-types/shape-helpers/functions.ts
  - modules/runtime/src/runtime-types/shape-helpers/wide-containers.ts
  - modules/runtime/src/runtime-types/tokens/asType.ts
  - modules/runtime/src/type-guards/comparison/hasValidComparator.ts
  - modules/runtime/src/type-guards/tokens/isInputToken__String.ts
  - modules/runtime/src/type-guards/tokens/isOutputToken.ts
  - modules/runtime/tsconfig.check.json
  - modules/types/src/api/api.ts
  - modules/types/src/assertions/Test.ts
  - modules/types/src/boolean-logic/branching/OnPass.ts
  - modules/types/src/boolean-logic/branching/When.ts
  - modules/types/src/boolean-logic/combinators/comparison/ComparisonAccept.ts
  - modules/types/src/boolean-logic/combinators/comparison/ComparisonDesc.ts
  - modules/types/src/boolean-logic/combinators/comparison/ComparisonFn.ts
  - modules/types/src/boolean-logic/combinators/comparison/GetComparisonParams.ts
  - modules/types/src/boolean-logic/combinators/comparison/GetOpConfig.ts
  - modules/types/src/boolean-logic/operators/compare/IsBalanced.ts
  - modules/types/src/boolean-logic/operators/containers/IsValidIndex.ts
  - modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts
  - modules/types/src/boolean-logic/operators/datetime/IsSameDay.ts
  - modules/types/src/boolean-logic/operators/datetime/IsSameMonthYear.ts
  - modules/types/src/boolean-logic/operators/datetime/IsSameYear.ts
  - modules/types/src/boolean-logic/operators/functions/HasEscapeFunction.ts
  - modules/types/src/boolean-logic/operators/literal/IsLiteralObject.ts
  - modules/types/src/boolean-logic/operators/literal/IsWideContainer.ts
  - modules/types/src/boolean-logic/operators/scalar/numeric/IsGreaterThan.ts
  - modules/types/src/boolean-logic/operators/scalar/numeric/IsLessThan.ts
  - modules/types/src/boolean-logic/operators/scalar/string/EndsWith.ts
  - modules/types/src/boolean-logic/operators/scalar/string/Network-operators.ts
  - modules/types/src/containers/OnlyRequired.ts
  - modules/types/src/datetime/AsFourDigitYear.ts
  - modules/types/src/datetime/AsRelativeDate.ts
  - modules/types/src/datetime/AsTwoDigitMonth.ts
  - modules/types/src/datetime/DaysInMonth.ts
  - modules/types/src/datetime/GetMonth.ts
  - modules/types/src/datetime/ParseDate.ts
  - modules/types/src/datetime/RenderTime.ts
  - modules/types/src/datetime/object-types/moment.ts
  - modules/types/src/dictionary/KeysWithError.ts
  - modules/types/src/dictionary/SharedKeys.ts
  - modules/types/src/dictionary/WithKeys.ts
  - modules/types/src/domains/nesting/helpers/IsEntryToken.ts
  - modules/types/src/domains/nesting/helpers/IsExitToken.ts
  - modules/types/src/domains/nesting/helpers/IsNestingMatchEnd.ts
  - modules/types/src/functions/AsFnMeta.ts
  - modules/types/src/functions/FnWithProps.ts
  - modules/types/src/globals/Object.ts
  - modules/types/src/interpolation/ApplyTemplate.ts
  - modules/types/src/interpolation/AsLiteralTemplate.ts
  - modules/types/src/interpolation/IsStaticTemplate.ts
  - modules/types/src/interpolation/IsTemplateLiteral.ts
  - modules/types/src/interpolation/StaticTemplateSections.ts
  - modules/types/src/interpolation/template-maps.ts
  - modules/types/src/kv/FromKv.ts
  - modules/types/src/kv/ToKv.ts
  - modules/types/src/lists/AsNumericArray.ts
  - modules/types/src/lists/BeforeLast.ts
  - modules/types/src/lists/FilterEmptyString.ts
  - modules/types/src/lists/IndexOf.ts
  - modules/types/src/lists/Longest.ts
  - modules/types/src/lists/MakeOptional.ts
  - modules/types/src/lists/Pop.ts
  - modules/types/src/lists/Shortest.ts
  - modules/types/src/lists/Slice.ts
  - modules/types/src/lists/TakeFirst.ts
  - modules/types/src/lists/TakeLast.ts
  - modules/types/src/lists/sort/StringSort.ts
  - modules/types/src/literals/Choices.ts
  - modules/types/src/literals/ExpandRecursively.ts
  - modules/types/src/numeric-literals/Add.ts
  - modules/types/src/numeric-literals/CSV.ts
  - modules/types/src/numeric-literals/CompareNumbers.ts
  - modules/types/src/numeric-literals/Decrement.ts
  - modules/types/src/numeric-literals/Delta.ts
  - modules/types/src/numeric-literals/Divide.ts
  - modules/types/src/numeric-literals/Increment.ts
  - modules/types/src/numeric-literals/Mod.ts
  - modules/types/src/numeric-literals/Multiply.ts
  - modules/types/src/numeric-literals/NextDigit.ts
  - modules/types/src/numeric-literals/PriorDigit.ts
  - modules/types/src/numeric-literals/ShiftDecimalPlace.ts
  - modules/types/src/numeric-literals/Subtract.ts
  - modules/types/src/numeric-literals/Sum.ts
  - modules/types/src/runtime-types/Type.ts
  - modules/types/src/runtime-types/tokens/OutputToken.ts
  - modules/types/src/runtime-types/type-defn/FromDefn.ts
  - modules/types/src/runtime-types/type-defn/input-tokens/FromInputToken.ts
  - modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeIntersection.ts
  - modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeParameters.ts
  - modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeUnion.ts
  - modules/types/src/runtime-types/type-defn/input-tokens/InputToken.ts
  - modules/types/src/string-literals/character-sets/html/tag.ts
  - modules/types/src/string-literals/character-sets/phone/PhoneNumber.ts
  - modules/types/src/string-literals/character-sets/tw/TwTarget.ts
  - modules/types/src/string-literals/character-sets/urls/Url.ts
  - modules/types/src/string-literals/finance/IsPercentage.ts
  - modules/types/src/string-literals/mutation/Join.ts
  - modules/types/src/string-literals/mutation/Nest.ts
  - modules/types/src/string-literals/mutation/NestedSplit.ts
  - modules/types/src/string-literals/mutation/Repeat.ts
  - modules/types/src/string-literals/mutation/Split.ts
  - modules/types/src/string-literals/mutation/Split2.ts
  - modules/types/src/string-literals/sub-strings/FillStringHole.ts
  - modules/types/src/string-literals/sub-strings/FilterByNestingLevel.ts
  - modules/types/src/string-literals/sub-strings/after/AfterFirstChar.ts
  - modules/types/src/tuples/FixedLengthArray.ts
  - modules/types/src/type-conversion/Merge.ts
  - modules/types/src/type-conversion/ReplaceFromTo.ts
  - modules/types/src/type-conversion/ToJson.ts
  - modules/types/src/type-conversion/ToStringLiteral.ts
  - modules/types/src/type-conversion/numeric/HexToDecimal.ts
  - modules/types/tsconfig.check.json
  - package.json
documentation:
  - docs/type-performance.md
  - features/2026-07-02-complex/deferred.md
  - features/2026-07-02-complex/implementation-log.md
  - features/2026-07-02-complex/perf-baseline.json
  - features/2026-07-02-complex/plan.md
  - features/2026-07-02-complex/spec.md
  - features/2026-07-02-complex/types-module-diagnostics-2026-07-06.txt
skills: []
---

# Type Performance Stabilization — Implementation Plan

Baseline evidence, targets, and policies live in [`spec.md`](./spec.md). The raw
diagnostic inventory is `types-module-diagnostics-2026-07-06.txt` in this
directory. Do not begin any remediation phase (3–7) before Phase 1's regression
guard exists.

## Phase 1 — Measurement Foundation & Config Hygiene (W1)

**Goal:** every later phase can be measured cheaply and honestly; config
artifacts (TS6305 / TS5101) stop polluting diagnostics.

- [x] Create `tsconfig.check.json` in each of `modules/constants`, `modules/types`, `modules/runtime`:
      no `composite`, no `references`, no `baseUrl`, `noEmit: true`, `skipLibCheck: true`,
      `paths` mapped to **source** (`../types/src/index.ts` etc., matching the vitest aliases),
      includes limited to `src/**/*.ts` (drop the stray `"src/string-literals/character-sets/Opt"`-style entries
      and `.drop`/`.hold` files currently in the `include` arrays)
- [x] Verify: `tsc -p modules/constants/tsconfig.check.json` exits clean at default heap
- [x] Verify: `tsc -p modules/types/tsconfig.check.json` runs to completion at 12 GB heap and the
      TS6305 count drops to zero; error totals otherwise match the 2026-07-06 inventory (re-baseline the file if not)
- [ ] Verify: `tsc -p modules/runtime/tsconfig.check.json` runs to completion (errors expected; captured, not fixed here)
- [x] Add `just` recipes: `check-constants`, `check-types`, `check-runtime` (each: `NODE_OPTIONS=--max-old-space-size=12288 tsc -p <check-config> --noEmit --pretty false`), plus `check` running all three
- [x] Add `just perf-baseline`: runs `typed test` under `/usr/bin/time -l`, captures wall/peak-RSS,
      per-file timings via `--metrics`, and complexity-diagnostic counts from `just check-types`,
      writing a JSON baseline (checked in; location per spec Open Question 3)
- [x] Add `just perf-compare`: re-runs the same measurements and fails if any complexity-class
      diagnostic count rose, or suite peak RSS grew > 15 %
- [x] Capture and commit the Phase-1 baseline JSON
- [x] Document the scoped-tracing workflow (single file / single subdirectory only) in `docs/type-performance.md`,
      and remove/correct stale references there (`detect-regressions.sh`, `typed diagnostics`, etc.)
- [x] Fix `pnpm test:types` so it survives today's peak until Phase 2 lowers it below the
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
- [x] Triage the remaining 207 into three buckets: (a) simple — body casts to a single
      utility type, annotate mechanically; (b) HOF/curried or overloaded — annotation needs
      per-function care (the returned *function* type is the boundary to annotate);
      (c) intentionally inferred — document why, if any
- [x] Work bucket (a) in directory-sized batches (`boolean-logic/`, `dictionary/`, `datetime/`,
      `lists/`, `type-guards/`, …); after each batch run the matching `typed test` filter +
      vitest filter — assertions must be byte-for-byte unchanged
- [x] Work bucket (b) individually, worst-first as ranked by the Phase-1 per-file metrics
- [x] Add a lint guard so the class of bug cannot return: require explicit return types on
      exported generic functions in `modules/runtime` (ESLint `explicit-module-boundary-types`
      or a scoped variant; align with the repo's `@antfu/eslint-config` setup)
- [x] Re-run full suite; record wall/RSS (expected to drop well below 4 GB, likely meeting G1 early)

Phase 2 closeout sample: `/usr/bin/time -l just test-types` passed in 21.60 s wall
with 4,504,748,032 bytes maximum resident set size. `just perf-compare` was attempted
but stopped after several minutes of no output; the required package gates are recorded
below and pass.

### 2b — Assertion & conditional-branch idiom cost

- [x] `modules/types/src/assertions/Test.ts`: restructure so `Assert<TTest, TOp, TExpected>` is
      instantiated **once** (bind via `extends infer R`, then run the `IsAny`/`IsNever` guards and
      result mapping against `R`); land isolated with full-suite before/after and zero outcome changes
- [x] `modules/types/src/string-literals/take/TakeDate.ts` (`WithContext`): bind `Take<T>` once via `infer`
- [x] `modules/types/src/runtime-types/type-defn/input-tokens/GetInputToken.ts` (`Iterate`): bind each
      `Process<IT_Take*<T>>` result once; 14 handlers currently instantiate twice each
- [x] Grep-audit the same pattern across `modules/types/src`; fix instances on Phase-1-measured hot paths,
      list the rest in the phase log
- [x] Re-measure the remaining slow files (`FromInputToken`, `isTailwindColorClass`, `PhoneNumbers`,
      `AsDateMeta`); record deltas

Slow-file samples with `pnpm exec typed test <file>`:
`FromInputToken` 5.03 s / 1,213,612,032 bytes RSS;
`isTailwindColorClass` 3.10 s / 828,833,792 bytes RSS;
`PhoneNumbers` 2.87 s / 1,118,814,208 bytes RSS;
`AsDateMeta` 3.46 s / 951,910,400 bytes RSS.

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
- [x] Fix `FixedLengthArray` first (shared primitive; `TS2589` at line ~37) — wide-input early return and/or
      bounded doubling without the `any[]` cap leaking
- [x] Rework the arithmetic utilities against the spec's preferred patterns (wide-input early return,
      bind-once, phase-split); shared digit/char helpers may be consolidated but must remain internal
- [x] Fix the comparison operators (`IsLessThan`, `IsGreaterThan`) including branded-number paths
      (regression risk: `tests/boolean-logic/operators/IsGreaterThan.test.ts` branded cases)
- [ ] `just check-types`: numeric-literals + tuples + numeric operators contribute **zero** complexity-class diagnostics
      (note: the `Increment`/`Decrement` **test files** were already fixed by Phase 2a annotations;
      this phase owns the *module-context* TS2589s that remain in the arithmetic sources themselves)
- [x] Full runtime suite (`pnpm test:runtime numeric`) green; full type suite green with unchanged assertions

**Validation checkpoint:** `just perf-compare` green; cluster diagnostic count 24 → 0.

## Phase 4 — Datetime Family (W4)

**Goal:** clear the 7 datetime complexity diagnostics without re-breaking the phase-2
(July-1) fixes. (The `daysInMonth` **test-file** blow-up is already resolved by the Phase-2a
annotation — 29.3 s / 4.1 GB → 4.4 s / 0.86 GB with no precision loss — so this phase is
about module-context health, and its profiling tasks apply only if the file regresses.)

Targets: `DaysInMonth`, `ParseDate` → `TakeYear`/`TakeMonth`/`TakeDate` chain,
`IsLeapYear`/`IsDoubleLeap` (80-member `IsoModernDoubleLeap` union), `IsSameYear`,
`IsSameMonthYear`, `AsTwoDigitMonth`, `AsFourDigitYear`, `AsRelativeDate`, `AsDateMeta`.

- [x] Profile `daysInMonth.test.ts` with a scoped trace to rank which input forms dominate
      (agent survey predicts full ISO datetime inputs via `ParseDateTime` → `Split` → `ParseTime`)
- [x] Flatten `DaysInMonth`'s ~10-level dispatch: extract only the fields it needs (year, month) via
      bounded helpers instead of full `ParseDate` where inputs allow
- [x] Replace `IsoModernDoubleLeap` union-membership testing with a cheaper bounded check if profiling
      shows it matters (80 members may be acceptable — measure first)
- [x] Apply bind-once/early-return fixes through the `Take*` chain (beyond Phase 2's `TakeDate` fix)
      where the trace shows repeated instantiation
- [x] Fix the datetime complexity diagnostics from the inventory (`IsSameYear`, `IsSameMonthYear`,
      `IsLeapYear`, `AsTwoDigitMonth`, `AsFourDigitYear`, `AsRelativeDate`, `DaysInMonth`)
- [x] Regression sweep: `just test-types datetime`, `just test-types boolean-logic/operators/datetime`,
      `just test-types take`, `just test-types literals` — all green with unchanged assertions
- [x] `typed test tests/datetime/daysInMonth.test.ts` ≤ 5 s / ≤ 1.5 GB; `AsDateMeta.test.ts` ≤ 2 s

**Validation checkpoint:** `just perf-compare` green; datetime cluster diagnostics 7 → 0;
no July-1 phase-2 assertion regressions.

## Phase 5 — Generated Template-Literal Unions (W5) *(parallelizable with Phase 4)*

**Goal:** stop materializing cartesian unions nobody can afford.

Targets: Tailwind (`TwColor`/`TwTarget`/`FullTailwindColorClass`, ~2,440-member union),
`PhoneNumber` family, `Url.ts`, `html/tag.ts`, `Network-operators.ts`, `IsPercentage`,
interpolation (`StaticTemplateSections`, `ApplyTemplate`).

- [x] Tailwind: replace membership-in-materialized-union with a validation-shaped conditional
      (parse target/color/luminosity/opacity/modifiers structurally); keep the *narrow* guard result type
      for valid literal inputs
- [x] Confirm `isTailwindColorClass` runtime guard + type tests unchanged in outcome; file ≤ 2 s individually
- [x] PhoneNumber: resolve spec Open Question 2 (default assumption: restore **bounded** validation);
      either way remove the dead commented-out validator block and make the shape's cost proportional
      to what it validates
- [x] Fix `Url.ts`, `html/tag.ts`, `Network-operators.ts`, `IsPercentage`, and the two interpolation files'
      complexity diagnostics with the same structural-validation approach
- [x] Regression sweep: `just test-types tw`, `just test-types PhoneNumber`, `just test-types urls`,
      `just test-types interpolation` (adjust filters to actual paths) — green, unchanged assertions

**Validation checkpoint:** `just perf-compare` green; cluster diagnostics 4+ → 0;
`PhoneNumbers.test.ts` and `isTailwindColorClass.test.ts` both ≤ 2 s individually.

## Phase 6 — Lists & String-Mutation Recursion (W6) *(parallelizable with Phase 5; after Phase 3 because of shared tuple primitives)*

**Goal:** clear the remaining recursion-heavy clusters (11 + 11 diagnostics).

Targets: `TakeFirst`, `Slice`, `IndexOf`, `Longest`, `BeforeLast`, `AsNumericArray`,
`IsValidIndex` (lists); `NestedSplit`, `Repeat`, `Split`, `Split2`, `ReplaceFromTo`,
`HexToDecimal` (string mutation); `domains/nesting/helpers/IsEntryToken`.

- [x] Reproduce each diagnostic with a scoped probe; classify: genuine deep recursion vs.
      constraint-context blow-up (`TS2344` companions in the same files often point at the latter)
- [x] Apply wide-input early returns and bind-once through the list utilities; where a utility
      recurses element-by-element over tuples, cap with the established bailout pattern rather than `any`
- [x] `NestedSplit` / `Split2` / `ReplaceFromTo`: verify against the July-1 phase-2 nesting work —
      these share helpers with `RetainUntil__Nested`; run the full nesting/domains filters after changes
- [x] `HexToDecimal`: fix both the TS2589s and the accompanying `As<...>` constraint error
- [x] Regression sweep: `just test-types lists`, `just test-types string-literals`,
      `just test-types domains` — green, unchanged assertions

**Validation checkpoint:** `just perf-compare` green; both clusters' complexity diagnostics → 0.

## Phase 7 — Source-Error Burn-Down & Runtime Checkability (W7)

**Goal:** make G4's "clean whole-module check" true for all three modules.

- [x] Work through the remaining non-complexity errors in `modules/types`
      (~118: TS2344 constraint violations, TS2304 missing names, TS2536 index errors, TS2300 duplicates,
      TS2322 assignability, `ToJson`, `ValidateLength`, `TakeYear` constraint errors, etc.);
      each is a real latent bug or a stale internal contract — fix or defer per spec G3/G4 rules
- [ ] Fix `modules/runtime` real errors starting with `src/api/handleDoneFn.ts` (TS2339/TS2349)
- [ ] `just check-runtime` reaches zero errors at default heap
- [x] `just check-types` reaches zero errors; runs at default heap in ≤ 180 s (G4)
- [x] Point `pnpm audit:types` / `audit:runtime` / `audit:constants` at the working `just check-*`
      path (or equivalent tsc invocation) so the package scripts stop invoking the non-viable
      `typed source` configuration (G7); leave `typed source` itself to the tooling exercise
- [x] If any deferrals were used, create `deferred.md` (≤ 5 entries, per-symbol justification)

**Validation checkpoint:** `just check` — all three modules clean (or documented deferrals);
full runtime + type suites green.

## Phase 8 — Final Validation & Closeout

- [x] `pnpm test:types` at **default heap**: exit 0, peak RSS ≤ 3.5 GB, wall ≤ 60 s (G1) —
      remove the Phase-1 heap-raising stopgap
- [x] Per-file sweep: no test file > 5 s / 1.5 GB individually (G2); runner's slow-file list re-checked
- [x] `just check-types 2>&1 | grep -cE "error TS(2589|2590|2859|2321)"` → **0** (G3)
- [ ] `just check` clean for all modules at documented budgets (G4, G7)
- [x] Diff review of all assertion changes across phases: every widening documented (G5)
- [x] Refresh the checked-in perf baseline; `just perf-compare` green (G6)
- [x] Forbidden-marker scan: `rg -i "TODO|FIXME|XXX|HACK" modules/` clean
- [x] Update `docs/type-performance.md` with the final workflow and numbers; write the implementation
      log for this feature directory

**Exit criteria:** all spec goals G1–G7 demonstrably met by the commands in the spec's
Verification section, run in a single sitting on baseline hardware.
