---
agent: "/"
total_phases: 7
created: 2026-07-02
start_phase: 1
yolo: "true"
packages:
  - modules/types
  - modules/runtime
source_spec:
  - features/2026-07-01-type-complexity-phase2/spec.md
source_findings:
  - features/2026-07-01-type-complexity/stage2-findings.md
source_files:
  - modules/types/src/boolean-logic/operators/datetime/validators/IsFourDigitYear.ts
  - modules/types/src/boolean-logic/operators/datetime/validators/IsTwoDigitDate.ts
  - modules/types/src/boolean-logic/operators/datetime/validators/IsTwoDigitMonth.ts
  - modules/types/src/datetime/general.ts
  - modules/types/src/domains/nesting/helpers/ExtractExitTokens.ts
  - modules/types/src/domains/nesting/helpers/GetExitToken.ts
  - modules/types/src/domains/nesting/helpers/GetNextLevelConfig.ts
  - modules/types/src/domains/nesting/helpers/IsExitToken.ts
  - modules/types/src/domains/nesting/helpers/IsNestingMatchEnd.ts
  - modules/types/src/domains/nesting/helpers/NormalizeNestingEntry.ts
  - modules/types/src/domains/nesting/primitives/NestingKeyValue.ts
  - modules/types/src/domains/nesting/primitives/NestingTuple.ts
  - modules/runtime/src/domain/nesting/assignNamedConfig.ts
  - modules/runtime/src/domain/nesting/isNestingEnd.ts
  - modules/runtime/src/domain/nesting/isNestingEndMatch.ts
  - modules/runtime/src/domain/nesting/isNestingKeyValue.ts
  - modules/runtime/src/domain/nesting/isNestingTuple.ts
  - modules/runtime/src/string-literals/split-and-join/nestedSplit.ts
  - modules/runtime/src/string-literals/sub-string/retain/retainUntil__Nested.ts
  - tests/domains/nesting/nesting.test.ts
  - tests/string-literals/NestedSplit.test.ts
  - tests/string-literals/sub-strings/RetainUntil__Nested.test.ts
  - modules/types/src/literals/branding/Brand.ts
  - modules/types/src/literals/branding/GetBrand.ts
  - modules/types/src/literals/branding/IsBranded.ts
  - modules/types/src/literals/branding/Unbrand.ts
  - modules/types/src/literals/branding/UnbrandValues.ts
  - modules/types/src/boolean-logic/operators/datetime/IsDoubleLeap.ts
  - modules/types/src/boolean-logic/operators/datetime/IsSameMonthYear.ts
  - modules/types/src/datetime/AsDateMeta.ts
  - modules/types/src/datetime/DaysInMonth.ts
  - modules/types/src/datetime/ParseDate.ts
  - tests/datetime/parseNumericDate.test.ts
  - justfile
  - modules/runtime/src/css/parseColor.ts
  - modules/runtime/src/type-conversion/stripParenthesis.ts
  - modules/runtime/src/type-conversion/toKeyValue.ts
  - modules/types/src/boolean-logic/combinators/comparison/Compare.ts
  - modules/types/src/interpolation/AsStaticTemplate.ts
  - modules/types/src/interpolation/template-maps.ts
  - modules/types/src/kv/ToKv.ts
  - modules/types/src/lists/SortByKey.ts
  - modules/types/src/string-literals/sub-strings/after/AfterFirstChar.ts
  - tests/domains/JSON/ToJsonObject.test.ts
  - tests/domains/JSON/toJson.test.ts
  - tests/regex/createMatchTemplate.test.ts
documentation:
  - features/2026-07-01-type-complexity-phase2/implementation-log.md
  - features/2026-07-01-type-complexity-phase2/plan.md
  - features/2026-07-01-type-complexity-phase2/spec.md
skills: []
---

# Execution Plan - Type Complexity Stabilization Phase 2

Source spec: [`spec.md`](./spec.md)

## Plan-Level Context

- **Scope:** Resolve every Stage 2 type-error directory identified by Phase 1: `tests/domains`, `tests/literals`, `tests/take`, `tests/interpolation`, `tests/type-conversions`, `tests/types`, `tests/boolean-logic/combinators`, `tests/datetime`, `tests/boolean-logic/operators/datetime`, and `tests/boolean-logic/operators/IsGreaterThan.test.ts`.
- **Strategy:** Fix shared root causes first, then higher-level consumers, then isolated failures. Prefer root-cause changes in `modules/types/src/`, `modules/runtime/src/`, or shared test helpers when the Stage 2 diagnosis points there.
- **Policy:** Preserve runtime/type parity, existing public contracts, and narrow literal inference. Test-only fixes are allowed only for stale assertions, unsupported ordering assumptions, or unrelated harness diagnostics.
- **Escalation rule:** Stop the current slice and create a design-review task in this feature directory before adding a public API, materially broadening a public contract, intentionally losing narrow inference, or changing runtime behavior beyond parity with the existing type contract.
- **Assertion rule:** Existing assertions are the floor. Any unavoidable widening must be recorded in the phase log with the old assertion, new assertion, and justification.
- **Validation command convention:** Use the smallest failing file/filter first, then expand to the affected directory/filter, then run final root validation.

## Dependency Graph

```text
Phase 1 (baseline + work log)
   |
   |-- Phase 2 (nesting helper config normalization)
   |      |
   |      v
   |   Phase 5 (shallow/hierarchical nesting syntax)
   |
   |-- Phase 3 (date brand validators + TakeDate)
          |
          v
       Phase 4 (date parser/meta consumers)
          |
          v
       Phase 6 (boolean datetime + sameYear + branded comparison)

Phase 7 (isolated fixes + full validation) depends on Phases 2-6.
```

Phases 2 and 3 are parallelizable after Phase 1 because nesting helpers and date-brand validators touch separate root causes. Phase 5 depends on Phase 2. Phases 4 and 6 depend on Phase 3. The isolated fixes in Phase 7 can be split across implementers once shared date and nesting work is stable.

---

## Phase 1 - Baseline, Ownership, and Phase Log

**Goal:** Reconfirm the current failing surface without changing behavior, identify touched files before editing, and create the implementation log required by the spec.

**Parallelizable:** Partially. Baseline commands are sequential; source/test file discovery for each failure family can be done in parallel after the baseline is captured.

### Tasks

- [x] Run `git status --short` and record all pre-existing modified files so implementation does not overwrite user-owned work.
- [x] Run `just test-types` from repo root and record the current summary, including total failing tests/files and whether the command exits normally.
- [x] Run focused baseline filters: `just test-types domains`, `just test-types literals`, `just test-types take`, `just test-types interpolation`, `just test-types type-conversions`, `just test-types types`, `just test-types boolean-logic/combinators`, `just test-types datetime`, `just test-types boolean-logic/operators/datetime`, and `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts`.
- [x] Create or update the Phase 2 implementation log in `features/2026-07-01-type-complexity-phase2/` with sections for baseline summaries, per-phase changed files, assertion widenings, escalations, and final validation.
- [x] Locate the source utilities and tests named by Stage 2 findings for nesting, branded date validators, date parser/meta consumers, boolean datetime operators, comparison combinators, interpolation templates, JSON serialization, key-value conversion, `AfterFirstChar`, and `parseNumericDate`.
- [x] For every target file that is already modified before implementation, create a stashed/reference copy of the relevant function or type before changing it, following the repository instruction.
- [x] Confirm no blocking open questions remain in `spec.md`; if a wider public-contract issue is discovered during baseline, add it to the log and defer that slice until design review.

### Validation Checkpoint

- [x] Baseline command results are recorded with exact filters and summaries.
- [x] The implementation log exists and has placeholders for every phase and every required widening/escalation record.
- [x] All pre-existing dirty files are identified, and no source files have been edited in this phase except the log.

---

## Phase 2 - Nesting Helper Config Normalization

**Goal:** Fix the shared nesting helper types so flat records, tuple-valued hierarchical configs, and next-level configs are interpreted consistently.

**Parallelizable:** Yes with Phase 3. Within this phase, source changes to the shared helper normalization should be centralized to avoid conflicting edits.

### Tasks

- [x] Reproduce `tests/domains/nesting/helper-types.test.ts` and record the current failures for `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, and `IsNestingMatchEnd`.
- [x] Inspect the nesting helper source under `modules/types/src/` and identify the current supported config shapes and fallback branches that return `never` or mismatched booleans.
- [x] Add a private normalization helper for nesting config entries that accepts existing flat record values and tuple-valued hierarchical entries of the form `[exitToken, nextLevelConfig]`.
- [x] Update `GetNextLevelConfig` to return `{}` or the nested config object for tuple-valued hierarchical entries without changing the public config syntax.
- [x] Update `GetExitToken` to return the exit token from both flat and hierarchical tuple entries.
- [x] Update `IsEntryToken` and `IsExitToken` to return literal `true` or `false` for hierarchical configs instead of `never`.
- [x] Update `IsNestingMatchEnd` so stack/end-token matching uses the same normalized config interpretation as the other helpers.
- [x] Add or update focused type assertions for flat record configs, tuple-valued hierarchical configs, and negative token cases without widening existing expected results.
- [x] Verify runtime `nesting()` assumptions are not contradicted by the helper-type behavior before higher-level syntax tests are un-skipped in Phase 5.

### Validation Checkpoint

- [x] `just test-types tests/domains/nesting/helper-types.test.ts` exits with zero type errors.
- [x] `just test-types types` exits with zero type errors or only failures unrelated to nesting helpers are documented.
- [x] Hierarchical tuple configs produce the expected `{}`, `")"`, `"]"`, `true`, and `false` results from the spec.
- [x] Any unavoidable assertion change is recorded in the phase log with old assertion, new assertion, and justification.

---

## Phase 3 - Branded Date Validators and Take Wrappers

**Goal:** Replace deep-recursive branded date validation paths with bounded checks that preserve brand shape, invalid/error return shapes, and wide-input bailouts.

**Parallelizable:** Yes with Phase 2. This phase should be completed before Phases 4 and 6 because most date/parser/operator failures depend on these primitives.

### Tasks

- [x] Reproduce `tests/literals/Brand.test.ts`, `tests/string-literals/take/TakeDate.test.ts`, `just test-types take`, and `tests/boolean-logic/operators/IsGreaterThan.test.ts` to confirm current `TS2589` and `any` leakage.
- [x] Inspect `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeYear`, `TakeMonth`, `TakeDate`, brand/unbrand helpers, and related runtime guards.
- [x] Replace recursive digit exploration in `FourDigitYear` with bounded string-shape and explicit range checks that return the existing branded success type or invalid/error type.
- [x] Replace recursive digit exploration in `TwoDigitMonth` with bounded checks for `"01"` through `"12"` and deterministic invalid/error handling for bad literals.
- [x] Replace recursive digit exploration in `TwoDigitDate` with bounded checks for `"01"` through `"31"` and deterministic invalid/error handling for bad literals.
- [x] Update `TakeYear`, `TakeMonth`, and `TakeDate` wrappers so valid takes return branded values and invalid/partial takes do not leak `any`, `never`, or wide primitives.
- [x] Preserve wide-input conventions for `string` and other non-literal inputs without distributing through all possible dates.
- [x] Verify `IsBranded`, `GetBrand`, `Unbrand`, and `UnbrandValues` still work for the revised branded date outputs.
- [x] Verify runtime/type parity for `isFourDigitYear()`, `isTwoDigitMonth()`, `isTwoDigitDate()`, `asTwoDigitMonth()`, and related runtime guards impacted by the brand changes.
- [x] If branded scalar comparison still fails after brand fixes, add a narrow unbranding fast path for `IsGreaterThan` that preserves existing non-branded numeric behavior.

### Validation Checkpoint

- [x] `just test-types tests/literals/Brand.test.ts` exits with zero type errors.
- [x] `just test-types tests/string-literals/take/TakeDate.test.ts` exits with zero type errors.
- [x] `just test-types take` exits with zero type errors.
- [x] `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` exits with zero type errors for branded `FourDigitYear` comparisons.
- [x] `FourDigitYear<"224">`, `TwoDigitMonth<"1">`, `TwoDigitDate<"1">`, and `TakeDate<"01">` resolve without `TS2589` and without leaking `any`.
- [x] `IsGreaterThan<FourDigitYear<"2020">, FourDigitYear<"2012">>` resolves to `true`, and the inverse resolves to `false`.

---

## Phase 4 - Date Parser and Date Meta Consumers

**Goal:** Stabilize the shared date parsing/meta pipeline and direct consumers without expanding large date/time/timezone unions.

**Parallelizable:** Partially. `ParseDate`, `AsParsedDate`, and `AsDateMeta` changes should be coordinated. Consumer-specific fixes for `asTwoDigitMonth`, `DaysInMonth`, `isDoubleLeap`, and `parseNumericDate` can split after the shared path is stable.

### Tasks

- [x] Reproduce focused failures for `tests/datetime/AsDateMeta.test.ts`, `AsParsedDate.test.ts`, `ParseDate.test.ts`, `asTwoDigitMonth.test.ts`, `daysInMonth.test.ts`, `isDoubleLeap.test.ts`, and `parseNumericDate.test.ts`.
- [x] Inspect `ParseDate`, `AsParsedDate`, `AsDateMeta`, `AsTwoDigitMonth`, `DaysInMonth`, `isDoubleLeap`, `parseNumericDate`, and related runtime helpers.
- [x] Add early-return handling for already-parsed date metadata so `AsDateMeta` does not re-enter the full parser.
- [x] Refactor year-independent, full ISO date, compact date, and ISO datetime parsing to use bounded field-specific extraction rather than broad date/time union expansion.
- [x] Ensure consumers that need only year/month/day fields extract only those fields and do not force time, millisecond, or timezone validation.
- [x] Update `AsTwoDigitMonth` and `asTwoDigitMonth()` type paths to reuse the Phase 3 month-brand result without revalidating through an expensive parser.
- [x] Update `DaysInMonth` to resolve February leap/double-leap, ISO date, ISO datetime, and month-day partial cases without `any`.
- [x] Update `isDoubleLeap` type logic to use bounded year extraction and avoid recursive year validation.
- [x] Fix `parseNumericDate` current-time test/helper typing so symbol-keyed parse result data is not implicitly interpolated as a string.
- [x] Add representative type assertions for ISO full dates, compact dates, ISO datetimes, ISO year-month strings, year-independent partial dates, and already-parsed metadata.

### Validation Checkpoint

- [x] `just test-types datetime` exits with zero type errors or only downstream boolean datetime failures already assigned to Phase 6 are documented.
- [x] Each targeted datetime file from this phase exits with zero type errors when run individually.
- [x] `ParseDate`, `AsParsedDate`, and `AsDateMeta` resolve representative full-date, compact-date, year-independent, and already-parsed inputs without `TS2589`.
- [x] `DaysInMonth` and `isDoubleLeap` do not leak `any` for known leap, double-leap, and non-leap cases.
- [x] `parseNumericDate` current-time tests no longer emit `TS2345 [object Object]` or `TS2731` symbol-to-string diagnostics.

---

## Phase 5 - Shallow and Hierarchical Nesting Syntax

**Goal:** Implement higher-level named shallow configs and explicit hierarchical configs in `NestedSplit`, `RetainUntil__Nested`, and runtime `nesting()` using the helper semantics from Phase 2.

**Parallelizable:** Partially. Type-level `NestedSplit` and `RetainUntil__Nested` work can split from runtime `nesting()` work after shared config normalization is agreed.

### Tasks

- [x] Reproduce `tests/string-literals/NestedSplit.test.ts`, `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts`, and `tests/domains/nesting/nesting.test.ts` to identify remaining shallow/hierarchical failures after Phase 2.
- [x] Locate named config resolution for `"shallow-quotes"`, `"shallow-brackets"`, and `"shallow-brackets-and-quotes"` in both type-level and runtime paths.
- [x] Implement or correct named config mapping so the same internal config object is used by type-level utilities and runtime `nesting()` helpers.
- [x] Update `NestedSplit` so `"shallow-quotes"` avoids splitting on delimiters inside quoted regions and returns the expected literal tuple.
- [x] Update `RetainUntil__Nested` so skipped new-syntax blocks can be un-skipped and produce expected retained literal strings.
- [x] Update explicit hierarchical config handling so nested delimiters such as `"(b,c)"` and `"[b,c]"` are preserved as single segments.
- [x] Preserve valid `Unbalanced` error object behavior for genuinely unbalanced inputs; do not use error-shape changes to explain valid shallow/hierarchical config failures.
- [x] Verify runtime `nesting()` helper output and type-level output agree for the named shallow configs and explicit hierarchical configs.

### Validation Checkpoint

- [x] `NestedSplit<"1234, 4567, \"Bob, the quintessential idiot, did not care\"", ", ", "shallow-quotes">` resolves to the expected tuple.
- [x] Skipped new-syntax describe blocks in `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts` are un-skipped and pass.
- [x] `tests/domains/nesting/nesting.test.ts` hierarchical and shallow config cases return literal results instead of `Unbalanced` error objects.
- [x] Named shallow configs and explicit hierarchical configs behave consistently in type-level utilities and runtime `nesting()` helpers.
- [x] `just test-types domains` and `just test-types literals` no longer report nesting-related type errors.

---

## Phase 6 - Boolean Datetime Operators, `compare("sameYear")`, and Branded Comparison

**Goal:** Fix date predicate correctness and remaining date-comparison type complexity using bounded field extraction and targeted fast paths.

**Parallelizable:** Partially. `IsSameMonthYear` correctness can be handled independently from `compare("sameYear")` after Phase 4 exposes stable year/month extraction helpers.

### Tasks

- [x] Reproduce `tests/boolean-logic/operators/datetime/IsDateLike.test.ts`, `IsIsoDateTime.test.ts`, `IsSameMonthYear.test.ts`, `IsSameYear.test.ts`, `tests/boolean-logic/combinators/comparison/Compare.test.ts`, and `tests/boolean-logic/operators/IsGreaterThan.test.ts`.
- [x] Inspect `IsDateLike`, `IsIsoDateTime`, `IsSameYear`, `IsSameMonthYear`, `Compare`, runtime `compare()`, and any shared datetime comparison helpers.
- [x] Fix `IsSameMonthYear` by normalizing both operands to comparable `{ year, month }` metadata for ISO year-month, ISO full date, ISO datetime, and year-independent partial inputs.
- [x] Preserve literal `true` and `false` outputs for mixed DateLike cases rather than widening to `boolean`.
- [x] Add predicate-specific private parsing for `IsDateLike`, `IsIsoDateTime`, and `IsSameYear` where the shared parser remains too expensive for the predicate's field needs.
- [x] Ensure `IsIsoDateTime` validates canonical full ISO datetime strings without expanding a full ISO datetime union.
- [x] Add a targeted overload or internal fast path for `compare("sameYear", ...)` that returns narrow boolean literals for literal date-time inputs.
- [x] Keep the public `compare()` call shape unchanged and verify same-day, same-month, and same-month-year comparisons are not regressed.
- [x] Confirm Phase 3's branded `FourDigitYear` comparison remains green; if not, apply the branded scalar comparison fallback described in Phase 3.

### Validation Checkpoint

- [x] `just test-types boolean-logic/operators/datetime` exits with zero type errors.
- [x] `just test-types tests/boolean-logic/combinators/comparison/Compare.test.ts` exits with zero type errors.
- [x] `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` exits with zero type errors.
- [x] `IsSameMonthYear<"-2023-01", "2023-01-15">` and the reversed input resolve to `true`.
- [x] `IsSameMonthYear<"2023-01-15", "2023-01-15T12:30:00Z">` remains `true`, and `IsSameMonthYear<"-2024-01", "2023-01-15">` remains `false`.
- [x] `compare("sameYear", dateTime1)(dateTime1)`, `compare("sameYear", dateTime1)(dateTime3)`, and `compare("sameYear", dateTime1)(dateTime4)` infer narrow boolean literals without `TS2589`.
- [x] Runtime comparison tests remain green for the changed comparison module.

---

## Phase 7 - Isolated Fixes and Final Validation

**Goal:** Resolve remaining isolated Stage 2 failures, then prove the full Phase 2 feature is complete.

**Parallelizable:** Yes. JSON ordering, key-value conversion, interpolation templates, `AfterFirstChar`, and final documentation/log updates can be handled by separate implementers once shared phases are complete.

### Tasks

- [x] Reproduce `tests/domains/JSON/ToJsonObject.test.ts` and `tests/domains/JSON/toJson.test.ts`; inspect type-level JSON serialization and runtime `toJSON` return type declarations.
- [x] Fix `ToJsonObject` / `toJSON` type-level key ordering for ordinary string keys so it mirrors `Object.keys()` / `Object.entries()` ordering without changing runtime output.
- [x] Reproduce `tests/type-conversions/kv/toKeyValue.test.ts`; trace the runtime return type to the object-to-ordered-`KeyValue` tuple utility.
- [x] Fix `toKeyValue` return typing so object literals produce ordered `KeyValue` tuples and respect start/end ordering options.
- [x] Reproduce `tests/interpolation/AsLiteralTemplate.test.ts` and `tests/interpolation/AsStaticTemplate.test.ts`; inspect `TemplateMap__Generics`, `AsLiteralTemplate`, `AsStaticTemplate`, and vocabulary normalization.
- [x] Fix `AsLiteralTemplate` with `TemplateMap__Generics` so composed placeholders resolve to the expected template literal.
- [x] Fix `AsStaticTemplate` with custom vocabularies and union literals so matching placeholders are restored to `{{name}}` form.
- [x] Reproduce `tests/string-literals/RemainingChars.test.ts`; inspect `AfterFirstChar`.
- [x] Fix `AfterFirstChar<"Foobar">` so it resolves to `"oobar"` without recursive depth errors.
- [x] Run all Stage 2 focused filters again and update the phase log with results and any assertion changes.
- [x] Run `rg -i "TODO|FIXME|XXX|HACK" modules/ tests/ features/2026-07-01-type-complexity-phase2/` and remove any newly introduced forbidden markers.
- [x] Run `just test-types` at repo root.
- [x] Run `just test-runtime`.
- [x] Run `just lint`.
- [x] Update the implementation log with final changed files, validation results, assertion widenings, escalations, and any open follow-up questions.

### Validation Checkpoint

- [x] `ToJsonObject<{ foo: [1, 2], bar: ["hey", "ho"] }>` preserves key/value association and expected string-key order.
- [x] `toKeyValue({ foo: 1, bar: "hi" } as const)` returns an ordered `KeyValue` tuple type matching runtime output.
- [x] `AsLiteralTemplate<"{{T}} is {{U}} years old", TemplateMap__Generics<G>>` resolves to `` `${string} is ${number} years old` ``.
- [x] `AsStaticTemplate<"${T} was ${number} years old", Vocab>` resolves to `"{{T}} was {{number}} years old"` for custom vocabularies with union literals.
- [x] `AfterFirstChar<"Foobar">` resolves to `"oobar"` without `TS2589`.
- [x] `just test-types` exits normally with zero type errors.
- [x] `just test-runtime` remains green.
- [x] `just lint` passes.
- [x] No TODO/FIXME/XXX/HACK markers are introduced.
- [x] Any shared-utility change outside the spec's public-contract decisions has a design-review document in `features/2026-07-01-type-complexity-phase2/`.
- [x] Any assertion widening is documented in the phase log with the old assertion, new assertion, and justification.

---

## Completion Criteria

- [x] All seven phases are complete and every task checkbox that applies to implementation is checked.
- [x] The final root `just test-types` run exits normally with zero type errors.
- [x] The final `just test-runtime` run is green.
- [x] The final `just lint` run passes.
- [x] The implementation log documents the fix strategy per directory and every widening or escalation.
- [x] The spec remains within its reviewed scope: no new public APIs, no unapproved contract broadening, and no silent loss of narrow inference.
