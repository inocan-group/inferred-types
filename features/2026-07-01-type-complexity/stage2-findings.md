---
source_feature: features/2026-07-01-type-complexity/spec.md
generated_during_phase: 5
date: 2026-07-01
---

# Stage 2 Type-Error Findings

Source spec: [`features/2026-07-01-type-complexity/spec.md`](./spec.md)
Phase 1–4 log: [`.ai/logs/type-complexity-phase1-isolation-log.md`](../.ai/logs/type-complexity-phase1-isolation-log.md)

## Table of Contents

- [Executive Summary](#executive-summary)
- [1. `tests/domains`](#1-testsdomains)
- [2. `tests/literals`](#2-testsliterals)
- [3. `tests/take`](#3-teststake)
- [4. `tests/interpolation`](#4-testsinterpolation)
- [5. `tests/type-conversions`](#5-teststype-conversions)
- [6. `tests/types`](#6-teststypes)
- [7. `tests/boolean-logic/combinators`](#7-testsboolean-logiccombinators)
- [8. `tests/datetime`](#8-testsdatetime)
- [9. `tests/boolean-logic/operators/datetime`](#9-testsboolean-logicoperatorsdatetime)
- [10. `tests/boolean-logic/operators/IsGreaterThan.test.ts`](#10-testsboolean-logicoperatorsisgreaterthantestts)
- [Cross-Cutting Root Causes](#cross-cutting-root-causes)
- [Recommended Phase 2 Sequencing](#recommended-phase-2-sequencing)

---

## Executive Summary

After Phase 4, `just test-types` completes without crashing. The remaining failures are **type errors** (Stage 2) spread across the original seven filters plus current root-suite failures in datetime and branded-comparison paths that were omitted from the first handoff. This document records the currently failing tests, candidate fixes, and recommended next steps so a follow-up Phase 2 feature can be scoped with explicit acceptance criteria.

The metrics below use the type-test runner summary phrasing, so "tests had errors" means failing test blocks rather than individual TypeScript diagnostics. Some failing test blocks produce more than one diagnostic.

Current root validation: `just test-types` completes without crashing and reports **77 of 3638 tests had errors** and **21 of 661 test files had errors**.

| Filter | Failing test files | Runner summary | Dominant error pattern |
|--------|-------------------|----------------|------------------------|
| `tests/domains` | 4 of 25 | 12 of 294 tests had errors | JSON object-property ordering + nesting-config helpers returning `never` / `[object Object]` diagnostics |
| `tests/literals` | 5 of 96 | 32 of 551 tests had errors | Branded-date utilities hit `TS2589` / leak `any`; string-literal nesting helpers return wrong shapes |
| `tests/take` | 1 of 12 | 1 of 100 tests had errors | `TakeDate<"01">` triggers `TS2589` (same file as `tests/literals`) |
| `tests/interpolation` | 2 of 12 | 2 of 49 tests had errors | Template-map helpers produce `[object Object]` diagnostics on custom/generated vocabularies |
| `tests/type-conversions` | 1 of 50 | 6 of 202 tests had errors | `toKeyValue(...)` returns `[]` / `never` instead of ordered `KeyValue` tuples |
| `tests/types` | 1 of 8 | 6 of 38 tests had errors | Same nesting-config helper failures seen in `tests/domains` |
| `tests/boolean-logic/combinators` | 1 of 10 | 1 of 87 tests had errors | `compare("sameYear", ...)` triggers `TS2589` |
| `tests/datetime` | 9 of 45 | 24 of 472 tests had errors | Date parsing/meta/month/day helpers trigger `TS2589`, leak `any`, or expose runtime/type test typing errors |
| `tests/boolean-logic/operators/datetime` | 4 of 21 | 6 of 233 tests had errors | Datetime predicates trigger `TS2589`; `IsSameMonthYear` returns `false` for mixed DateLike true cases |
| `tests/boolean-logic/operators/IsGreaterThan.test.ts` | 1 of 1 | 1 of 23 tests had errors | Branded `FourDigitYear` comparison triggers `TS2589` / `any` |

Three shared root causes account for most failures:

1. **Hierarchical / tuple nesting configurations are not correctly interpreted** by `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, and `IsNestingMatchEnd`. This surfaces in `tests/domains/nesting/helper-types.test.ts` and, because that file is matched by the `types` filter, in `tests/types` as well.
2. **Date-time branded/string-literal utilities (`FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeDate`) and parsing/meta consumers recurse too deeply** for certain literal inputs and collapse to `any`, causing downstream equality failures. This appears in `tests/literals/Brand.test.ts`, `tests/string-literals/take/TakeDate.test.ts`, `tests/datetime`, and `tests/boolean-logic/operators/datetime`.
3. **Unbalanced / error-shape types from nested-split utilities** no longer match the expected error objects, likely because the error type gained or lost properties (e.g. `stack` string format). This appears in `tests/domains/nesting/nesting.test.ts`, `tests/string-literals/NestedSplit.test.ts`, and the skipped new-syntax sections of `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts`.

Recommended Phase 2 sequencing:

1. Fix nesting-config helper types first (cross-cutting, blocks two directories).
2. Stabilize date-time branded/string-literal utilities and parsing/meta consumers second (cross-cutting, blocks literals + take + datetime + boolean-logic datetime operators + branded numeric comparison).
3. Align error-object shapes for nested-split utilities third.
4. Address the remaining isolated cases (`ToJsonObject`, `toKeyValue`, interpolation template maps, `compare sameYear`, `parseNumericDate` helper typing).

---

## 1. `tests/domains`

### 1.1 Description of type errors

Running `just test-types domains` reports **12 of 294 tests had errors** and **4 of 25 test files had errors**.

#### `tests/domains/JSON/ToJsonObject.test.ts` (1 error)

- **Test:** `object with an array property`
- **Line:** 56
- **Offending type:** `ToJsonObject<{ foo: [1, 2], bar: ["hey", "ho"] }>`
- **Actual:** `{ "bar": [ "hey", "ho" ], "foo": [ 1, 2 ] }`
- **Expected:** `{ "foo": [ 1, 2 ], "bar": [ "hey", "ho" ] }`
- **Diagnosis:** The type-level JSON serializer preserves the key/value associations but emits object properties in a different order than the equality assertion expects.

#### `tests/domains/JSON/toJson.test.ts` (2 errors)

- **Test:** `object values`
- **Lines:** 41, 45
- **Offending runtime call:** `toJSON({ foo: 1, bar: "hi" } as const)`
- **Actual (double-quoted):** `{ "bar": "hi", "foo": 1 }`
- **Expected (double-quoted):** `{ "foo": 1, "bar": "hi" }`
- **Actual (single-quoted):** `{ 'bar': 'hi', 'foo': 1 }`
- **Expected (single-quoted):** `{ 'foo': 1, 'bar': 'hi' }`
- **Diagnosis:** Same JSON string key-order mismatch as `ToJsonObject`. Runtime `expect(...).toEqual(...)` passes, so the runtime output is correct; only the return type assertion is wrong.

#### `tests/domains/nesting/helper-types.test.ts` (6 failing tests across 5 test groups; 36 type diagnostics)

Most failures share the same pattern: **hierarchical key-value configs return `never` instead of the expected token/config**. The hierarchical tuple cases currently surface opaque `[object Object]` diagnostics and are also failing.

| Test group | Lines | Expected (examples) | Actual |
|------------|-------|---------------------|--------|
| `GetNextLevelConfig<TChar, TNesting>` | 44, 47 | `{}`, `{ "{": "}" }` | `never` |
| `GetNextLevelConfig<TChar, TNesting>` | 57, 58 | third element / next-level config from hierarchical tuple cases | `[object Object]` diagnostics |
| `GetExitToken<TChar, TNesting>` | 92, 93 | `")"`, `"]"` | `never` |
| `IsEntryToken<TChar, TNesting>` | 143, 144, 147, 148 | `true`, `true`, `false`, `false` | `never` |
| `IsExitToken<TChar, TNesting>` | 195, 196, 199, 200 | `true`, `true`, `false`, `false` | `never` |
| `IsNestingMatchEnd<TChar, TStack, TNesting>` | 247, 248, 251 | `true`, `true`, `false` | `true` / mismatch |

Input config used:

```ts
type HierarchicalKeyValue = { "(": [")", {}]; "[": ["]", { "{": "}" }] };
```

- **Diagnosis:** The helper types do not recognize the tuple-valued hierarchical form `[exitToken, nextLevelConfig]` and have unresolved hierarchical tuple diagnostics. They likely expect a simpler `Record<entry, exit>` or a tuple-based config with a different shape, causing key-value lookups to fall through to `never`.

#### `tests/domains/nesting/nesting.test.ts` (1 failing test block; 11 type diagnostics)

- **Test:** `nesting() HOF`
- **Lines:** 72, 94, 95, 117, 118, 177, 178
- **Offending calls:** `api.split(...)` / `api.retainUntil(...)` using skipped "new syntax" named configs (`shallow-brackets`, `shallow-quotes`, `shallow-brackets-and-quotes`) and a hierarchical `NestingTuple` config.
- **Actual:** Lines 72, 94, 95, 117, and 118 infer `Unbalanced` error objects (e.g. `{ name: "Unbalanced"; type: "unbalanced"; subType: "nested-split"; ...; stack: "[ \"\"\", \"\"\" ]"; } & Error`). Lines 177 and 178 infer split tuples `["a", "(b", "c)", "d"]` and `["a", "[b", "c]", "d"]`.
- **Expected:** Tuple of split segments or retained strings. For the hierarchical tuple cases, lines 177 and 178 expect `["a", "(b,c)", "d"]` and `["a", "[b,c]", "d"]`.
- **Diagnosis:** The skipped describe blocks still type-check. The runtime code does not yet support the new shallow/hierarchical syntax, so some cases return `Unbalanced`; the hierarchical tuple split cases do run but split inside nested regions instead of preserving `"(b,c)"` / `"[b,c]"`.

### 1.2 Proposed solution / solution options

#### Option A: Fix the utility types to support hierarchical tuple configs

- Update `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, and `IsNestingMatchEnd` in `modules/types/src/.../nesting` to detect and destructure `[exitToken, nextLevelConfig]` values.
- **Pros:** Fixes the root cause; enables the new hierarchical syntax.
- **Cons:** Touches shared utilities; must preserve runtime/type parity with `nesting()` runtime function.

#### Option B: Narrow the test config shapes to what the utilities currently support

- Change `HierarchicalKeyValue` in the test to use the shape the utilities already understand (e.g. `{ "(": ")", "[": "]" }` for simple configs, or the documented tuple shape).
- **Pros:** Fast, test-only change.
- **Cons:** The intended feature (hierarchical configs) remains untested; may mask a real gap.

#### Option C: Split the skipped `nesting()` new-syntax tests into a separate pending file

- Move tests for `shallow-*` and hierarchical tuple configs out of the active test file until the feature is implemented.
- **Pros:** Immediately cleans `tests/domains/nesting/nesting.test.ts`.
- **Cons:** Does not fix `helper-types.test.ts`; defers feature validation.

### 1.3 Recommended next steps

1. **Primary:** Implement Option A for the five helper types. Add focused type tests that exercise each config shape independently before re-enabling the higher-level `nesting()` tests.
2. **Secondary:** Keep the skipped `nesting()` new-syntax tests in place as a target/acceptance test for the hierarchical syntax work; do not delete them.
3. **For JSON:** Decide whether `ToJsonObject` / `toJSON` should preserve object key order. If yes, fix the type-level key/value mapping in the JSON-string builder; if order is intentionally non-deterministic, change tests to `containsAll` instead of `equals`.

---

## 2. `tests/literals`

### 2.1 Description of type errors

Running `just test-types literals` reports **32 of 551 tests had errors** and **5 of 96 test files had errors**.

#### `tests/literals/Brand.test.ts` (11 failing tests; 33 type diagnostics)

All failures involve **date-time branded types** (`FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeYear`, `TakeMonth`, `TakeDate`) and their unbranding helpers.

Representative failures:

| Test | Line | Symptom |
|------|------|---------|
| `Direct Branding` | 10, 22, 23 | `TS2589: Type instantiation is excessively deep and possibly infinite`; result is `any` |
| `IsBranded<T>` | 30, 39 | `TS2589`; `IsBranded<"02">` resolves to `true` instead of `false` |
| `GetBrand<T>` | 58 | `GetBrand<...>` resolves to `any` instead of `"TwoDigitMonth"` |
| `Unbrand<T>` | 64, 65, 69, 70 | `TS2589`; `Unbrand<FourDigitYear<"1999">>` resolves to `any` |
| `UnbrandValues<T>` | 76, 84, 85 | `TS2589`; values stay branded instead of being stripped |
| `FourDigitYear` | 112 | `FourDigitYear<"224">` resolves to `any` instead of an invalid-type error |
| `TakeYear -> FourDigitYear` | 121 | `Unbrand<TakeYear<"2024">["take"]>` resolves to `any` |
| `TwoDigitMonth` | 132, 137 | `TS2589`; `TwoDigitMonth<"1">` resolves to `any` |
| `TakeMonth -> TwoDigitMonth` | 146 | `any` |
| `TwoDigitDate` | 153, 158 | `TS2589`; `TwoDigitDate<"1">` resolves to `any` |
| `TakeDate -> TwoDigitDate` | 164, 167 | `TS2589`; `any` |

- **Diagnosis:** The branded-date validators share a recursive string-literal / template-literal validation path. For certain literals the recursion exceeds TypeScript's instantiation depth and collapses to `any`. Once `any` appears, equality assertions fail with `invalid-test/any-type`, and boolean-returning helpers like `IsBranded` return unexpected truthy values.

#### `tests/string-literals/NestedSplit.test.ts` (1 error)

- **Test:** `shallow-quotes avoids splitting on delimiter inside quote`
- **Line:** 215
- **Offending type:** `NestedSplit<"1234, 4567, \"Bob, the quintessential idiot, did not care\"", ", ", "shallow-quotes">`
- **Actual:** `Unbalanced` error object
- **Expected:** `["1234", "4567", "\"Bob, the quintessential idiot, did not care\""]`
- **Diagnosis:** `"shallow-quotes"` is not (or only partially) implemented in `NestedSplit`. The type falls back to an unbalanced error instead of treating quoted regions as literal.

#### `tests/string-literals/RemainingChars.test.ts` (1 error)

- **Test:** `with string input`
- **Line:** 8
- **Offending type:** `AfterFirstChar<"Foobar">`
- **Actual:** `TS2589: Type instantiation is excessively deep and possibly infinite`
- **Expected:** `"oobar"`
- **Diagnosis:** `AfterFirstChar` recurses over the string literal for non-trivial inputs. The string `"Foobar"` should be short enough, suggesting the recursion has a bug (e.g. does not decrement / slice correctly) or the depth budget is exhausted by prior type instantiations in the same file.

#### `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts` (8 failing tests)

- **Tests:** Skipped describe blocks `RetainUntil__Nested<TStr,TFind,TNesting> using new syntax` and `retainUntil__Nested(str, find, incl, nesting) using new syntax`.
- **Live runner detail:** The focused run reports `8 of 27 tests had errors` and `1 of 1 test files had errors`, but the runner does not expand the skipped-block diagnostics into individual actual values.
- **Offending forms:** `RetainUntil__Nested<..., { config: "shallow-quotes" | "shallow-brackets" | "shallow-brackets-and-quotes" }>` and runtime calls using the same named configs plus hierarchical `{ "{": { exit: "}", config: {} } }` / `{ "{": ["}", { "[": "]" }] }`.
- **Expected:** Literal retained strings such as `"\"Hello, world!\", he said."`, `Array(1, 2, 3).`, `func(a, b).`, `data(x, y).`, `{a, b, c}.`, and `{inner, [nested. items]}.`.
- **Diagnosis:** Same as `NestedSplit` shallow/hierarchical config support. The skipped blocks still type-check and expose missing support, but live output should not be treated as line-level actual-vs-expected diagnostics for this file.

#### `tests/string-literals/take/TakeDate.test.ts` (1 error)

- **Test:** `valid dates 01-09`
- **Lines:** 10, 26
- **Offending type:** `TakeDate<"01">` / `Unbrand<TakeDate<"01">["take"]>`
- **Actual:** `TS2589` + `any`
- **Expected:** `{ take: TwoDigitDate<"01">, rest: "" }` / `"01"`
- **Diagnosis:** `TakeDate` delegates to `TwoDigitDate` branding, which hits the same deep-recursion issue as `Brand.test.ts`. Dates `10-31` do not fail, suggesting the recursion problem is specific to the `01-09` literal pattern (possibly the leading-zero handling).

### 2.2 Proposed solution / solution options

#### Option A: Redesign branded-date validators to avoid deep recursion

- Replace the recursive template-literal validation in `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate` (and the `Take*` wrappers) with bounded digit-range checks or direct regex-like template literals.
- **Pros:** Fixes `Brand.test.ts`, `TakeDate.test.ts`, and any other file using these utilities.
- **Cons:** Shared-utility change; must preserve the branded-type shape (`T & { [BrandSymbol]: ... }`) and runtime parity.

#### Option B: Add depth limits / bail-outs to the recursive validators

- Introduce an explicit recursion counter or a catch-all branch that returns `Error` instead of recursing when depth is exceeded.
- **Pros:** Minimal change; prevents `any` leakage.
- **Cons:** May still fail some equality assertions if the bail-out shape differs from expectations.

#### Option C: Temporarily disable the failing branded-date assertions

- Comment or skip the deepest assertions until Option A/B is implemented.
- **Pros:** Quick.
- **Cons:** Reduces test coverage; must be tracked and reverted.

#### Option D: Implement shallow/hierarchical nesting syntax

- Add support for `"shallow-quotes"`, `"shallow-brackets"`, and the hierarchical config shape in `NestedSplit` and `RetainUntil__Nested`.
- **Pros:** Enables the intended feature.
- **Cons:** Larger change; overlaps with `tests/domains/nesting` work.

### 2.3 Recommended next steps

1. **Primary:** Implement Option A for the branded-date utilities. This is the highest-impact fix because it unblocks `tests/literals`, `tests/take`, and any future date-time tests.
2. **Parallel:** Implement Option D for shallow/hierarchical nesting configs, reusing the helper-type work from `tests/domains` Section 1.
3. **For `AfterFirstChar`:** Debug the recursion in `modules/types/src/string-literals/.../AfterFirstChar.ts` with a minimal reproduction; the string `"Foobar"` should not exhaust TypeScript's depth limit.

---

## 3. `tests/take`

### 3.1 Description of type errors

Running `just test-types take` reports **1 of 100 tests had errors** and **1 of 12 test files had errors**.

#### `tests/string-literals/take/TakeDate.test.ts` (1 failing test; 2 type diagnostics)

- **Test:** `valid dates 01-09`
- **Lines:** 10, 26
- **Offending type:** `TakeDate<"01">` and `Unbrand<TakeDate<"01">["take"]>`
- **Actual:** `TS2589: Type instantiation is excessively deep and possibly infinite`; downstream `any`
- **Expected:** `{ take: TwoDigitDate<"01">, rest: "" }` and `"01"`

This is the **same failure** documented in `tests/literals` Section 2.1 (`TakeDate.test.ts`).

### 3.2 Proposed solution / solution options

See Section 2.2, Options A–C. The same branded-date / `TakeDate` root cause applies.

### 3.3 Recommended next steps

1. Resolve the `TakeDate` / `TwoDigitDate` recursion issue as part of the `tests/literals` work.
2. Once fixed, re-run `just test-types take` to confirm the directory is clean.

---

## 4. `tests/interpolation`

### 4.1 Description of type errors

Running `just test-types interpolation` reports **2 of 49 tests had errors** and **2 of 12 test files had errors**.

#### `tests/interpolation/AsLiteralTemplate.test.ts` (1 error)

- **Test:** `using TemplateMap_Generics as part of a string literal`
- **Line:** 46
- **Offending type:** `AsLiteralTemplate<"{{T}} is {{U}} years old", TemplateMap__Generics<G>>`
- **Actual:** `[object Object]` (diagnostic detail not expanded by CLI)
- **Expected:** `` `${string} is ${number} years old` ``
- **Diagnosis:** `TemplateMap__Generics<G>` does not produce a vocabulary shape that `AsLiteralTemplate` accepts when the template contains multiple placeholders. The isolated single-segment case on line 58 works, so the issue is specific to composing the generated map inside a larger string literal.

#### `tests/interpolation/AsStaticTemplate.test.ts` (1 error)

- **Test:** `using custom vocabulary`
- **Line:** 17
- **Offending type:** `AsStaticTemplate<"${T} was ${number} years old", Vocab>`
- **Actual:** `[object Object]`
- **Expected:** `"{{T}} was {{number}} years old"`
- **Diagnosis:** Custom vocabularies that extend `TemplateMap__Basic` with a union literal (`T: "foo" | "bar"`) are not being converted back to static template placeholders correctly.

### 4.2 Proposed solution / solution options

#### Option A: Fix `TemplateMap__Generics` and `AsStaticTemplate` utility types

- Ensure `TemplateMap__Generics<G>` produces the same normalized dictionary that `AsLiteralTemplate` expects.
- Ensure `AsStaticTemplate` correctly looks up custom tokens in the vocabulary and replaces them with `{{name}}` placeholders, even for union literals.
- **Pros:** Fixes root cause.
- **Cons:** Requires reading the template-map source utilities.

#### Option B: Relax the failing assertions

- Change the equality test to `extends` or allow a broader template-literal type.
- **Pros:** Fast.
- **Cons:** Loses specificity; not recommended unless the current expectation is wrong.

### 4.3 Recommended next steps

1. Read `modules/types/src/interpolation/TemplateMap*.ts` and `AsLiteralTemplate.ts` / `AsStaticTemplate.ts`.
2. Add minimal type tests for `TemplateMap__Generics` in isolation to confirm its output shape.
3. Fix the lookup/replacement logic and verify both interpolation files pass.

---

## 5. `tests/type-conversions`

### 5.1 Description of type errors

Running `just test-types type-conversions` reports **6 of 202 tests had errors** and **1 of 50 test files had errors**.

#### `tests/type-conversions/kv/toKeyValue.test.ts` (6 errors)

All failures are in the runtime-return-type assertions for `toKeyValue(...)`.

| Test | Lines | Expected | Actual |
|------|-------|----------|--------|
| `happy path` | 21 | `[{ key: "foo", value: 1, ... }, { key: "bar", value: "hi", ... }]` | `[]` |
| `forcing a key to start position` | 51 | ordered tuple starting with `"id"` | `[]` |
| `forcing a key to end position` | 74, 75 | `L` equals `"bar"`; `hasSameValues` against tuple | `never` / `[]` |
| `Forcing both start and end keys` | 119, 120 | `hasSameKeys` / `hasSameValues` against 7-element tuple | `[]` |
| `preserves order in start array` | 138 | ordered tuple `[c, a, b]` | `[]` |
| `single start key and array end` | 155 | ordered tuple `[b, a, c]` | `[]` |

- **Diagnosis:** The return type of `toKeyValue(...)` collapses to `[]` for all non-nested inputs, even though the runtime `expect(...).toEqual(...)` passes. `GetEach<typeof fooBar, "key">` therefore returns `never`, and `Last<...>` returns `never`. The type utility that converts an object to an ordered `KeyValue` tuple is not preserving keys/values.

### 5.2 Proposed solution / solution options

#### Option A: Fix the object-to-ordered-tuple utility

- Locate the type utility used by `toKeyValue` (likely `ToKeyValue<T, Start, End>` or similar) and ensure it maps object entries to `{ key, value, required }` tuples while respecting `start` / `end` options.
- **Pros:** Fixes root cause; runtime already correct.
- **Cons:** May touch shared KV utilities used elsewhere; verify `tests/type-conversions/kv/FromKv.test.ts`, `ToKv.test.ts`, etc.

#### Option B: Change tests to only assert runtime behavior

- Remove the type-equality assertions for `toKeyValue` return types until Option A is implemented.
- **Pros:** Fast.
- **Cons:** Loses type coverage for an exported runtime function.

### 5.3 Recommended next steps

1. Trace the type path from `toKeyValue` in `modules/runtime/src/...` to its return-type utility in `modules/types/src/...`.
2. Create a minimal reproduction that calls the utility directly on `{ foo: 1, bar: "hi" }`.
3. Fix the utility so the ordered tuple is produced; verify all KV tests pass.

---

## 6. `tests/types`

### 6.1 Description of type errors

Running `just test-types types` reports **6 of 38 tests had errors** and **1 of 8 test files had errors**.

#### `tests/domains/nesting/helper-types.test.ts` (6 failing tests; 36 type diagnostics)

The single failing file is the same file that fails under `tests/domains`. Because the `types` filter matches it (the file imports from `inferred-types/types`), its failures are reported here as well.

- `GetNextLevelConfig<TChar, TNesting>` — `never` instead of `{}` / `{ "{": "}" }`
- `GetExitToken<TChar, TNesting>` — `never` instead of `")"` / `"]"`
- `IsEntryToken<TChar, TNesting>` — `never` instead of `true` / `false`
- `IsExitToken<TChar, TNesting>` — `never` instead of `true` / `false`
- `IsNestingMatchEnd<TChar, TStack, TNesting>` — mismatched boolean results

See Section 1.1 (`tests/domains/nesting/helper-types.test.ts`) for full details.

### 6.2 Proposed solution / solution options

Same as Section 1.2.

### 6.3 Recommended next steps

1. Resolve the nesting helper types under `tests/domains`.
2. Re-run `just test-types types` to confirm this directory is clean.

---

## 7. `tests/boolean-logic/combinators`

### 7.1 Description of type errors

Running `just test-types boolean-logic/combinators` reports **1 of 87 tests had errors** and **1 of 10 test files had errors**.

#### `tests/boolean-logic/combinators/comparison/Compare.test.ts` (1 failing test; 4 reported type diagnostics)

- **Tests:** `compare() runtime function` and `DateTime operations → sameYear`
- **Lines:** 1124, 1126, 1127
- **Offending code:**

```ts
const sameYearAs = compare("sameYear", dateTime1);
const t1 = sameYearAs(dateTime1); // line 1124
const t3 = sameYearAs(dateTime3); // line 1126
const f1 = sameYearAs(dateTime4); // line 1127
```

- **Actual:** `TS2589: Type instantiation is excessively deep and possibly infinite`
- **Expected:** `boolean` literals inferred for each call.
- **Diagnosis:** The `compare()` higher-order function's overloads or the `Compare<...>` type utility for the `"sameYear"` operation recurse deeply when resolving the return type of a curried date-time comparison. `sameDay`, `sameMonth`, and `sameMonthYear` in the same file pass, so the issue is specific to the year-extraction path (likely `AsDateMeta` / `ParseDate` / year-literal recursion).

### 7.2 Proposed solution / solution options

#### Option A: Simplify the `Compare<...>` / `compare("sameYear", ...)` type path

- Add a dedicated overload for `"sameYear"` that short-circuits the generic comparison pipeline and returns `boolean` directly.
- **Pros:** Minimal, targeted fix.
- **Cons:** May require adding overloads for other datetime comparison ops for consistency.

#### Option B: Improve the efficiency of year extraction in date-time meta types

- Review `AsDateMeta` / year-extraction utilities so they do not trigger the same deep recursion seen in `tests/literals`.
- **Pros:** Fixes root cause shared with date-time branded utilities.
- **Cons:** Larger scope.

#### Option C: Broaden the assertion

- Assert that `typeof t1 extends boolean` instead of `equals true`.
- **Pros:** Fast.
- **Cons:** Loses the narrow `true`/`false` inference the test is intended to validate.

### 7.3 Recommended next steps

1. Start with Option A to unblock `Compare.test.ts` quickly.
2. Schedule Option B as part of the broader date-time type-effort (see Section 2.3).
3. Verify `just test-runtime` for the comparison module remains green.

---

## 8. `tests/datetime`

### 8.1 Description of type errors

Running `just test-types datetime` reports **24 of 472 tests had errors** and **9 of 45 test files had errors**.

The failing files observed in the current run are:

- `tests/datetime/AsDateMeta.test.ts`
- `tests/datetime/AsParsedDate.test.ts`
- `tests/datetime/ParseDate.test.ts`
- `tests/datetime/asTwoDigitMonth.test.ts`
- `tests/datetime/daysInMonth.test.ts`
- `tests/datetime/isDoubleLeap.test.ts`
- `tests/datetime/parseNumericDate.test.ts`
- `tests/boolean-logic/operators/datetime/IsSameMonthYear.test.ts`

The runner summary reports 9 failing files for the `datetime` filter; the file-level output consistently identifies the 8 paths above, with `IsSameMonthYear.test.ts` included because its path contains `datetime`. The dedicated `boolean-logic/operators/datetime` filter in Section 9 captures the additional operator-specific failures.

#### `tests/datetime/AsDateMeta.test.ts` (1 failing test)

- **Test:** `from a parsed date`
- **Line:** 7
- **Symptom:** `TS2589: Type instantiation is excessively deep and possibly infinite`
- **Diagnosis:** `AsDateMeta` recurses too deeply when consuming an already parsed date shape.

#### `tests/datetime/AsParsedDate.test.ts` (1 failing test)

- **Test:** `ISO Year Independent Date`
- **Line:** 15
- **Symptom:** `TS2589`
- **Diagnosis:** Year-independent ISO date parsing (`--MM-DD` style) takes a recursive path that does not terminate within TypeScript's instantiation budget.

#### `tests/datetime/ParseDate.test.ts` (2 failing test groups; 4 diagnostics)

- **Tests:** `YYYY-MM-DD and YYYYMMDD formats`, `edge cases`
- **Lines:** 12, 14, 186, 188
- **Symptom:** `TS2589`
- **Diagnosis:** Full ISO date and compact date parsing is still too expensive for selected literal inputs.

#### `tests/datetime/asTwoDigitMonth.test.ts` (multiple failing test groups; 42 diagnostics)

- **Tests:** `TwoDigitMonth`, `AsTwoDigitMonth<T>`, and `asTwoDigitMonth()` cases involving ISO date strings, ISO datetime strings, branded passthrough, partial ISO dates, and branded output.
- **Representative lines:** 40-49, 54-61, 68, 76-77, 94-103, 109, 117, 176-195, 255-263
- **Symptom:** `TS2589`, `invalid-test/any-type`, and one `true` where `false` is expected.
- **Diagnosis:** This is the runtime/helper-facing form of the `TwoDigitMonth` branded-date recursion problem described in Section 2. The type path leaks `any`, which then invalidates downstream equality assertions.

#### `tests/datetime/daysInMonth.test.ts` (4 failing tests)

- **Tests:** February leap-year cases, ISO date strings, ISO datetime strings, and partial date edge cases.
- **Representative lines:** 71, 78, 145-154, 164-166, 212
- **Symptom:** `TS2589` followed by `invalid-test/any-type` where numeric day counts such as `29`, `30`, and `31` are expected.
- **Diagnosis:** `DaysInMonth` depends on year/month parsing and leap/double-leap logic. Failures are likely downstream of the same date parser and `TwoDigitMonth` / year validation complexity.

#### `tests/datetime/isDoubleLeap.test.ts` (4 failing tests)

- **Representative lines:** 35-59, 64-70, 75-84, 120-123, 221
- **Symptom:** `TS2589` and `invalid-test/any-type` in type assertions for known double-leap and non-double-leap years.
- **Diagnosis:** Double-leap detection uses the same year/date parsing path as `DaysInMonth`; recursive year validation leaks `any`.

#### `tests/datetime/parseNumericDate.test.ts` (2 failing runtime/type test blocks)

- **Tests:** `parses current time (ms)`, `parses current time (s)`
- **Lines:** 64-65, 85-86
- **Symptoms:** `TS2345 [object Object]` and `TS2731: Implicit conversion of a 'symbol' to a 'string' will fail at runtime`
- **Diagnosis:** Unlike the other datetime failures, this appears to be a test-typing or runtime helper type issue around formatting a parse result that may include symbol-keyed data. It should be handled separately from the `TS2589` parser redesign.

#### `tests/boolean-logic/operators/datetime/IsSameMonthYear.test.ts` via `datetime` filter

See Section 9. This file is included by the `datetime` filter and must be part of Phase 2 acceptance.

### 8.2 Proposed solution / solution options

#### Option A: Stabilize shared date parser/meta utilities

- Redesign `ParseDate`, `AsParsedDate`, and `AsDateMeta` to avoid distributing through large date unions and to short-circuit wide or already-normalized inputs.
- **Pros:** Addresses the root `TS2589` source for many downstream helpers.
- **Cons:** Shared utility change; requires broad type-test verification across datetime, literals, take, and boolean datetime operators.

#### Option B: Reuse the branded-date validator redesign

- Treat `asTwoDigitMonth`, `DaysInMonth`, and `isDoubleLeap` as downstream consumers of the `FourDigitYear` / `TwoDigitMonth` / `TwoDigitDate` redesign described in Sections 2 and 3.
- **Pros:** Consolidates date complexity work into one coherent effort.
- **Cons:** May not address `parseNumericDate` and `IsSameMonthYear` correctness by itself.

#### Option C: Fix `parseNumericDate` test/helper typing separately

- Inspect the current-time parse result type and the assertion code at lines 64-65 and 85-86; ensure symbol-keyed metadata is not interpolated as a string unless explicitly converted.
- **Pros:** Separates a non-`TS2589` typing issue from parser complexity.
- **Cons:** Does not reduce date parser complexity.

### 8.3 Recommended next steps

1. Start by redesigning the shared date parser/meta path and branded validators together; verify each affected datetime file directly.
2. Treat `parseNumericDate.test.ts` as a separate focused fix after the `TS2589` family is under control.
3. Add Phase 2 acceptance criteria for `just test-types datetime` and for each failing datetime file listed above.

---

## 9. `tests/boolean-logic/operators/datetime`

### 9.1 Description of type errors

Running `just test-types boolean-logic/operators/datetime` reports **6 of 233 tests had errors** and **4 of 21 test files had errors**.

#### `tests/boolean-logic/operators/datetime/IsDateLike.test.ts` (3 failing tests)

- **Tests:** `valid ISO partial dates`, `ISO Full Date Strings`, `ISO DateTime Strings`
- **Lines:** 43, 62, 63, 79, 80
- **Symptom:** `TS2589`
- **Diagnosis:** `IsDateLike` delegates to ISO date/date-time validators that still recurse too deeply for literal string inputs.

#### `tests/boolean-logic/operators/datetime/IsIsoDateTime.test.ts` (1 failing test)

- **Test:** `Full ISO DateTime Strings`
- **Line:** 13
- **Symptom:** `TS2589`
- **Diagnosis:** Full ISO datetime validation remains too expensive for at least one canonical literal.

#### `tests/boolean-logic/operators/datetime/IsSameMonthYear.test.ts` (1 failing test; correctness failure)

- **Test:** `Mixed DateLike Types`
- **Lines:** 74, 75
- **Offending types:**

```ts
type T1 = IsSameMonthYear<"-2023-01", "2023-01-15">;
type T2 = IsSameMonthYear<"2023-01-15", "-2023-01">;
```

- **Actual:** `false`
- **Expected:** `true`
- **Diagnosis:** This is a type-level correctness failure, not only a complexity failure. Mixed DateLike comparisons between ISO year-month strings and full ISO date strings should compare the shared year/month fields and return `true` when both match.

#### `tests/boolean-logic/operators/datetime/IsSameYear.test.ts` (1 failing test)

- **Test:** `ISO Date string`
- **Lines:** 28, 30
- **Symptom:** `TS2589`
- **Diagnosis:** Same-year comparison triggers deep date parsing for full ISO date literals.

### 9.2 Proposed solution / solution options

#### Option A: Add efficient predicate-specific parsing paths

- Update `IsDateLike`, `IsIsoDateTime`, `IsSameYear`, and `IsSameMonthYear` to extract only the fields each predicate needs rather than invoking the full date parser/meta pipeline.
- **Pros:** Reduces complexity and preserves narrow boolean literals.
- **Cons:** Requires careful parity checks so predicate-specific parsers do not diverge from the canonical date parser.

#### Option B: Fix shared parser/meta utilities first

- Let the Section 8 parser/meta redesign resolve `TS2589` failures in `IsDateLike`, `IsIsoDateTime`, and `IsSameYear`.
- **Pros:** Avoids duplicating parsing logic.
- **Cons:** Does not guarantee the `IsSameMonthYear` mixed DateLike correctness failure is fixed.

#### Option C: Fix `IsSameMonthYear` mixed DateLike normalization directly

- Normalize ISO year-month (`-YYYY-MM`) and full ISO date (`YYYY-MM-DD`) inputs into comparable `{ year, month }` metadata before equality.
- **Pros:** Directly addresses the correctness failure called out by review.
- **Cons:** Still needs shared parser work for the `TS2589` operator failures.

### 9.3 Recommended next steps

1. Make `IsSameMonthYear` mixed DateLike correctness a P0 Phase 2 acceptance item.
2. Fix shared parser/meta complexity or add predicate-specific fast paths for the `TS2589` operator failures.
3. Verify `just test-types boolean-logic/operators/datetime` independently after `just test-types datetime`, because the two filters expose different failures.

---

## 10. `tests/boolean-logic/operators/IsGreaterThan.test.ts`

### 10.1 Description of type errors

Running `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` reports **1 of 23 tests had errors** and **1 of 1 test files had errors**.

#### `tests/boolean-logic/operators/IsGreaterThan.test.ts` (1 failing test)

- **Test:** `using branded values`
- **Lines:** 88, 92, 93
- **Offending types:**

```ts
type Y1 = FourDigitYear<"2012">;
type Y2 = FourDigitYear<"2020">;
type T1 = IsGreaterThan<Y2, Y1>;
type F1 = IsGreaterThan<Y1, Y2>;
```

- **Actual:** `TS2589`, followed by `invalid-test/any-type`
- **Expected:** `T1` resolves to `true`; `F1` resolves to `false`
- **Diagnosis:** `IsGreaterThan` handles unbranded numeric literals, decimals, negatives, large numbers, and wide types in this file. The only failing path is branded `FourDigitYear`, so this belongs to the same branded-date validator / unbranding complexity family described in Sections 2, 3, and 8.

### 10.2 Proposed solution / solution options

#### Option A: Fix `FourDigitYear` so numeric comparison can consume branded years

- Ensure `FourDigitYear<"2012">` and `FourDigitYear<"2020">` resolve without `TS2589` or `any`, and ensure `IsGreaterThan` can compare the unbranded numeric payload.
- **Pros:** Solves this failure through the shared branded-date redesign.
- **Cons:** Requires care to preserve the branded type shape.

#### Option B: Add an unbranding fast path to `IsGreaterThan`

- Normalize branded scalar inputs before the numeric comparison logic recurses.
- **Pros:** Useful for all branded numeric-like values.
- **Cons:** Should not be used as a substitute for fixing `FourDigitYear` if the brand itself still leaks `any`.

### 10.3 Recommended next steps

1. Treat this as an acceptance test for the branded-date validator redesign.
2. After `FourDigitYear` is stabilized, re-run `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` directly.

---

## Cross-Cutting Root Causes

Four utility families appear in multiple directories:

### A. Nesting config helpers (`GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, `IsNestingMatchEnd`)

- **Affected directories:** `tests/domains`, `tests/types`
- **Affected higher-level utilities:** `NestedSplit`, `RetainUntil__Nested`, `nesting()`
- **Symptom:** Hierarchical key-value configs return `never`; shallow/hierarchical named configs return `Unbalanced` errors.

### B. Date-time branded / string-literal validators (`FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeDate`, `TakeYear`, `TakeMonth`)

- **Affected directories:** `tests/literals`, `tests/take`, `tests/datetime`, `tests/boolean-logic/operators/datetime`, `tests/boolean-logic/combinators`, `tests/boolean-logic/operators/IsGreaterThan.test.ts`
- **Affected higher-level utilities:** `ParseDate`, `AsParsedDate`, `AsDateMeta`, `Compare` (`sameYear`), `IsDateLike`, `IsIsoDateTime`, `IsSameYear`, `IsSameMonthYear`, `IsGreaterThan`, `DaysInMonth`, `isDoubleLeap`
- **Symptom:** `TS2589` / `any` leakage for specific literal inputs (especially leading-zero dates and short years).

### C. Error-object shape types for nested-split failures

- **Affected directories:** `tests/domains/nesting/nesting.test.ts`, `tests/string-literals/NestedSplit.test.ts`, `tests/string-literals/sub-strings/RetainUntil__Nested.test.ts`
- **Symptom:** `Unbalanced` error objects no longer equal the expected split/retained tuples; the `stack` property format may differ.

### D. Date predicate field normalization (`IsSameMonthYear`, `IsSameYear`)

- **Affected directories:** `tests/boolean-logic/operators/datetime`, `tests/datetime`
- **Affected higher-level utilities:** `IsSameMonthYear`, `IsSameYear`, `compare("sameYear", ...)`
- **Symptom:** Some mixed DateLike comparisons infer `false` where the expected result is `true`, while others trigger `TS2589`.

---

## Recommended Phase 2 Sequencing

1. **P0 — Nesting config helpers (Sections 1 & 6)**
   - Fix `GetNextLevelConfig`, `GetExitToken`, `IsEntryToken`, `IsExitToken`, `IsNestingMatchEnd` to support hierarchical tuple configs.
   - Acceptance: `just test-types domains/nesting/helper-types` passes; `just test-types types` passes.

2. **P0 — Date-time branded validators and parser/meta consumers (Sections 2, 3, 8 & 9)**
   - Redesign `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeDate`, `ParseDate`, `AsParsedDate`, and `AsDateMeta` to avoid `TS2589` and `any` leakage.
   - Acceptance: `just test-types literals/Brand` passes; `just test-types string-literals/take/TakeDate.test.ts` passes; `just test-types take` passes; `just test-types datetime` passes.

3. **P1 — Shallow / hierarchical nesting syntax (Sections 1 & 2)**
   - Implement `"shallow-quotes"`, `"shallow-brackets"`, `"shallow-brackets-and-quotes"`, and explicit hierarchical configs in `NestedSplit` and `RetainUntil__Nested`.
   - Acceptance: skipped new-syntax tests can be un-skipped and pass.

4. **P1 — Date-time comparisons and predicates (Sections 7 & 9)**
   - Add a targeted overload or efficiency fix for `compare("sameYear", ...)`.
   - Fix `IsSameMonthYear` mixed DateLike field normalization so year-month/full-date comparisons infer `true` when the shared year/month match.
   - Acceptance: `just test-types boolean-logic/combinators/comparison/Compare.test.ts` passes; `just test-types boolean-logic/operators/datetime` passes.

5. **P1 — Branded numeric comparison (Section 10)**
   - Ensure `IsGreaterThan<FourDigitYear<"2020">, FourDigitYear<"2012">>` resolves to `true` without `TS2589` or `any`.
   - Acceptance: `just test-types tests/boolean-logic/operators/IsGreaterThan.test.ts` passes.

6. **P2 — Isolated fixes**
   - `ToJsonObject` / `toJSON` key ordering (Section 1).
   - `toKeyValue` return-type tuple (Section 5).
   - `AsLiteralTemplate` with `TemplateMap__Generics` and `AsStaticTemplate` custom vocabularies (Section 4).
   - `AfterFirstChar` recursion on `"Foobar"` (Section 2).

7. **Final validation**
   - `just test-types` at repo root exits normally with zero type errors.
   - `just test-runtime` remains green.
   - No assertions silently widened; all changes documented in the phase log.
