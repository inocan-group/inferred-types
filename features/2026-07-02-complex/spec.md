---
title: Source Type-Complexity Inventory
status: draft
date: 2026-07-02
packages:
  - modules/types
  - modules/runtime
source_findings:
  - features/2026-07-01-type-complexity/stage2-findings.md
---

# Source Type-Complexity Inventory

## Purpose

Create a source-oriented inventory of the current TypeScript type-complexity failures, mapping each `TS2589` / excessive-instantiation symptom to the `modules/types` or `modules/runtime` symbol involved and the symbols that source file imports to do its work.

This spec is intentionally diagnostic only. It does not prescribe implementation changes beyond documenting where follow-up work should focus.

## Static Analysis Notes

The source audits themselves are part of the signal:

- `pnpm audit:types` started analysis of 1214 source files and then OOMed at the default Node heap after roughly three minutes.
- `pnpm audit:runtime` started analysis of 1738 source files and was also non-terminating at practical interactive times.
- A high-heap rerun with `NODE_OPTIONS=--max-old-space-size=16384` still did not produce localized diagnostics within several minutes.
- A targeted AST pass over `modules/types/src` and `modules/runtime/src` was used to map the known `TS2589` diagnostic seed set to current source declarations and import dependencies.

The diagnostic seed set comes from `features/2026-07-01-type-complexity/stage2-findings.md`, which captured the concrete `TS2589` type-test failures. The inventory below translates those failures into source-module ownership.

## Complexity Diagnostic Families

| Family | Diagnostic | Source symbols |
| --- | --- | --- |
| Branded date literals | `TS2589: Type instantiation is excessively deep and possibly infinite`; downstream `any` leakage | `Brand`, `IsBranded`, `GetBrand`, `Unbrand`, `UnbrandValues`, `FourDigitYear`, `TwoDigitMonth`, `TwoDigitDate`, `TakeYear`, `TakeMonth`, `TakeDate` |
| Date parser/meta | `TS2589` in date parsing, date metadata, month/day resolution, leap-year handling | `ParseDate`, `AsDateMeta`, `AsTwoDigitMonth`, `DaysInMonth`, `IsDoubleLeap`, `isDoubleLeap` |
| Datetime predicates | `TS2589` in date-like and ISO datetime predicate paths; one adjacent correctness failure in mixed year/month normalization | `IsDateLike`, `IsIsoDateTime`, `IsSameYear`, `IsSameMonthYear` |
| Numeric comparison with branded years | `TS2589` and `any` when comparing branded `FourDigitYear` values | `IsGreaterThan`, plus `FourDigitYear` / `Unbrand` dependency path |
| String-literal remaining chars | `TS2589` for `AfterFirstChar<"Foobar">` | `AfterFirstChar` |
| Nested string parsing | Valid shallow/hierarchical config cases resolve to error shapes instead of literal splits/retains; this is adjacent parser complexity, not always `TS2589` | `NestedSplit`, `RetainUntil__Nested` |

## Symbol Inventory

### `Brand`

- Source: `modules/types/src/literals/branding/Brand.ts`
- Diagnostic role: foundational brand wrapper used by the branded date literal family.
- Imports:
  - `types/base-types`: `Scalar`
  - `./BrandSymbol`: `BrandSymbol`

### `IsBranded`

- Source: `modules/types/src/literals/branding/IsBranded.ts`
- Diagnostic role: returns incorrect truthy behavior after branded date validation leaks `any`.
- Imports:
  - `./BrandSymbol`: `BrandSymbol`

### `GetBrand`

- Source: `modules/types/src/literals/branding/GetBrand.ts`
- Diagnostic role: receives `any` from branded date literals and loses the expected brand label.
- Imports:
  - `./BrandSymbol`: `BrandSymbol`

### `Unbrand`

- Source: `modules/types/src/literals/branding/Unbrand.ts`
- Diagnostic role: fails downstream when date brands resolve through excessive instantiation.
- Imports:
  - `./Brand`: `Brand`
  - `./BrandSymbol`: `BrandSymbol`

### `UnbrandValues`

- Source: `modules/types/src/literals/branding/UnbrandValues.ts`
- Diagnostic role: object-value unbranding inherits `Unbrand` failures.
- Imports:
  - `inferred-types/types`: `Container`, `Dictionary`, `Expand`, `FromKv`, `KeyValue`, `ToKv`
  - `./Brand`: `Brand`
  - `./Unbrand`: `Unbrand`

### `FourDigitYear`

- Source: `modules/types/src/datetime/general.ts`
- Diagnostic role: branded year validator involved in direct brand tests, `TakeYear`, `ParseDate`, `DaysInMonth`, `isDoubleLeap`, and branded numeric comparison.
- Imports:
  - `inferred-types/constants`: `ISO_DATE_30`, `ISO_DATE_31`
  - `types/errors`: `Err`
  - `types/literals`: `Brand`
  - `types/string-literals`: `NumericChar`, `NumericChar__NonZero`, `NumericChar__ZeroToFive`

### `TwoDigitMonth`

- Source: `modules/types/src/datetime/general.ts`
- Diagnostic role: branded month validator involved in `TakeMonth`, `AsTwoDigitMonth`, `ParseDate`, and month/day helpers.
- Imports:
  - `inferred-types/constants`: `ISO_DATE_30`, `ISO_DATE_31`
  - `types/errors`: `Err`
  - `types/literals`: `Brand`
  - `types/string-literals`: `NumericChar`, `NumericChar__NonZero`, `NumericChar__ZeroToFive`

### `TwoDigitDate`

- Source: `modules/types/src/datetime/general.ts`
- Diagnostic role: branded date validator involved in `TakeDate` and `ParseDate`, especially leading-zero literals.
- Imports:
  - `inferred-types/constants`: `ISO_DATE_30`, `ISO_DATE_31`
  - `types/errors`: `Err`
  - `types/literals`: `Brand`
  - `types/string-literals`: `NumericChar`, `NumericChar__NonZero`, `NumericChar__ZeroToFive`

### `TakeYear`

- Source: `modules/types/src/string-literals/take/TakeYear.ts`
- Diagnostic role: delegates to `FourDigitYear`; inherits branded year complexity.
- Imports:
  - `types/boolean-logic`: `As`
  - `types/datetime`: `FourDigitYear`
  - `types/errors`: `Err`
  - `types/interpolation`: `StartsWithTemplateLiteral`
  - `types/string-literals`: `NumericChar`, `StripLeading`

### `TakeMonth`

- Source: `modules/types/src/string-literals/take/TakeMonth.ts`
- Diagnostic role: delegates to `TwoDigitMonth`; inherits branded month complexity.
- Imports:
  - `inferred-types/types`: `As`, `Err`, `NumericChar`, `StartsWithTemplateLiteral`, `StripLeading`, `TwoDigitMonth`

### `TakeDate`

- Source: `modules/types/src/string-literals/take/TakeDate.ts`
- Diagnostic role: delegates to `TwoDigitDate`; known failing form is `TakeDate<"01">`.
- Imports:
  - `types/boolean-logic`: `IsLeapYear`
  - `types/datetime`: `TwoDigitDate`
  - `types/errors`: `Err`
  - `types/interpolation`: `StartsWithTemplateLiteral`
  - `types/literals`: `Unbrand`
  - `types/string-literals`: `NumericChar`, `StripLeading`

### `ParseDate`

- Source: `modules/types/src/datetime/ParseDate.ts`
- Diagnostic role: shared date parser used by date metadata, date-like predicates, and downstream helpers.
- Imports:
  - `inferred-types/types`: `Unbrand`
  - `types/boolean-logic`: `As`, `IsFourDigitYear`
  - `types/datetime`: `FourDigitYear`, `ParsedTime`, `ParseTime`, `TwoDigitDate`, `TwoDigitMonth`
  - `types/errors`: `Err`, `ErrContext`
  - `types/string-literals`: `Split`, `StrLen`, `TakeDate`, `TakeMonth`, `TakeYear`

### `AsDateMeta`

- Source: `modules/types/src/datetime/AsDateMeta.ts`
- Diagnostic role: consumes parsed date shapes and can trigger excessive instantiation for already-parsed inputs.
- Imports:
  - `types/boolean-logic`: `As`, `Extends`, `IsNull`, `Or`
  - `types/datetime`: `DateMeta`, `ParseDate`, `ParsedDate`, `ParsedTime`

### `AsTwoDigitMonth`

- Source: `modules/types/src/datetime/AsTwoDigitMonth.ts`
- Diagnostic role: runtime/helper-facing month coercion; inherits `TwoDigitMonth` and parser complexity.
- Imports:
  - `inferred-types/types`: `As`, `DateLike`, `Err`, `IsBetweenInclusively`, `IsBranded`, `IsFloat`, `IsInteger`, `IsNegativeNumber`, `IsTrue`, `PadStart`, `ParseDate`, `ParsedDate`, `TwoDigitMonth`, `Unbrand`

### `DaysInMonth`

- Source: `modules/types/src/datetime/DaysInMonth.ts`
- Diagnostic role: depends on parser, branded year/month values, and leap/double-leap logic.
- Imports:
  - `inferred-types/types`: `As`, `AsFourDigitYear`, `AsTwoDigitMonth`, `DateLike`, `Err`, `FourDigitYear`, `GetMonthNumber`, `IsBetweenInclusively`, `IsDoubleLeap`, `IsInteger`, `IsLeapYear`, `IsoDate30`, `IsUndefined`, `MonthAbbrev`, `MonthName`, `NumberLike`, `ParseDate`, `ParsedDate`, `TwoDigitMonth`, `Unbrand`

### `IsDoubleLeap`

- Source: `modules/types/src/boolean-logic/operators/datetime/IsDoubleLeap.ts`
- Diagnostic role: type-level double-leap predicate; inherits year/date complexity.
- Imports:
  - `inferred-types/types`: `Unbrand`
  - `types/datetime`: `IsoModernDoubleLeap`

### `isDoubleLeap`

- Source: `modules/runtime/src/datetime/isDoubleLeap.ts`
- Diagnostic role: runtime mirror whose return type depends on type-level `IsDoubleLeap`.
- Imports:
  - `inferred-types/types`: `DateLike`, `IsDoubleLeap`
  - `inferred-types/constants`: `DOUBLE_LEAP_MODERN`
  - `inferred-types/runtime`: `asDate`

### `IsDateLike`

- Source: `modules/types/src/boolean-logic/operators/datetime/IsDateLike.ts`
- Diagnostic role: broad date-like predicate; delegates through many ISO/date/runtime-shape predicates.
- Imports:
  - `inferred-types/types`: `Every`, `IsAny`, `IsDayJs`, `IsInteger`, `IsIsoDate`, `IsIsoDateTime`, `IsIsoFullDate`, `IsIsoMonthDate`, `IsIsoYear`, `IsIsoYearMonth`, `IsJsDate`, `IsLuxonDateTime`, `IsMoment`, `IsNegativeNumber`, `IsNever`, `IsString`, `IsUnion`, `IsUnknown`, `Some`, `UnionToTuple`

### `IsIsoDateTime`

- Source: `modules/types/src/boolean-logic/operators/datetime/IsIsoDateTime.ts`
- Diagnostic role: full ISO datetime validation; currently routes through `AsDateMeta` / large ISO datetime types.
- Imports:
  - `inferred-types/types`: `AsDateMeta`, `DateMeta`, `IsBoolean`, `IsNull`, `IsoDateTime`, `IsUnion`, `UnionToTuple`

### `IsSameYear`

- Source: `modules/types/src/boolean-logic/operators/datetime/IsSameYear.ts`
- Diagnostic role: same-year comparison for full ISO date literals can trigger deep parsing.
- Imports:
  - `inferred-types/types`: `Abs`, `And`, `As`, `AsDateMeta`, `DateLike`, `DateMeta`, `Delta`, `Err`, `IsEpochInMilliseconds`, `IsEpochInSeconds`, `IsEqual`, `IsFloat`, `IsGreaterThan`, `IsNegativeNumber`, `IsNull`, `IsNumber`

### `IsSameMonthYear`

- Source: `modules/types/src/boolean-logic/operators/datetime/IsSameMonthYear.ts`
- Diagnostic role: adjacent to complexity failures and has a mixed DateLike correctness failure.
- Imports:
  - `inferred-types/types`: `Abs`, `And`, `DateLike`, `Delta`, `Err`, `IsDayJs`, `IsEpochInMilliseconds`, `IsEpochInSeconds`, `IsEqual`, `IsGreaterThan`, `IsInteger`, `IsJsDate`, `IsLuxonDateTime`, `IsMoment`, `IsNumber`, `IsNumericLiteral`, `IsString`, `Not`, `Or`

### `IsGreaterThan`

- Source: `modules/types/src/boolean-logic/operators/scalar/numeric/IsGreaterThan.ts`
- Diagnostic role: branded `FourDigitYear` comparison fails after branded year resolution leaks `any`.
- Imports:
  - `inferred-types/types`: `AsNumber`, `GreaterThan`, `GreaterThanOrEqual`, `NumberLike`

### `AfterFirstChar`

- Source: `modules/types/src/string-literals/sub-strings/after/AfterFirstChar.ts`
- Diagnostic role: `AfterFirstChar<"Foobar">` was reported as `TS2589`.
- Imports:
  - `inferred-types/types`: `AsArray`

### `NestedSplit`

- Source: `modules/types/src/string-literals/mutation/NestedSplit.ts`
- Diagnostic role: nested/shallow parser family; known shallow quote config resolves to an error shape instead of the expected literal split.
- Imports:
  - `inferred-types/types`: `AfterFirst`, `AllLengthOf`, `And`, `AsNestingConfig`, `Chars`, `DefaultNesting`, `Err`, `First`, `GetNextLevelConfig`, `GetParentConfig`, `IsEntryToken`, `IsNestingMatchEnd`, `KnownNestingConfig`, `Last`, `Nesting`, `Pop`, `StrLen`, `ToStringLiteral`, `ToStringLiteral__Array`

### `RetainUntil__Nested`

- Source: `modules/types/src/string-literals/sub-strings/retain/RetainUntil__Nested.ts`
- Diagnostic role: same nested/shallow config family as `NestedSplit`; skipped blocks still type-check.
- Imports:
  - `inferred-types/types`: `AfterFirst`, `And`, `As`, `AsNestingConfig`, `BracketNesting`, `Chars`, `EmptyObject`, `Err`, `First`, `GetNextLevelConfig`, `GetParentConfig`, `IsEntryToken`, `IsExitToken`, `IsGreaterThan`, `IsNestingMatchEnd`, `IsNestingTuple`, `Join`, `Last`, `Nesting`, `Pop`, `ToStringLiteral`

## Stale Or Renamed Diagnostic Seeds

`AsParsedDate` appears in the July 1 findings as a diagnostic name, but there is no current `AsParsedDate` declaration in `modules/types/src` or `modules/runtime/src`. Treat that seed as covered by the current `ParseDate` / `ParsedDate` / `AsDateMeta` source path unless a future run finds a renamed declaration.

## Verification Commands

Use these commands to reproduce or refine the inventory:

```sh
pnpm audit:types
pnpm audit:runtime
just test-types datetime
just test-types boolean-logic/operators/datetime
just test-types literals take boolean-logic/operators/IsGreaterThan.test.ts
```

When running whole-module audits, use a larger heap if the goal is diagnostics rather than proving the current OOM behavior:

```sh
NODE_OPTIONS=--max-old-space-size=16384 pnpm audit:types
NODE_OPTIONS=--max-old-space-size=16384 pnpm audit:runtime
```

## Acceptance Criteria For Follow-Up Work

- Each source symbol above either resolves the documented `TS2589` path or has a narrower follow-up spec explaining why it is not the root cause.
- Branded date validators terminate for representative valid and invalid literals without leaking `any`.
- Parser and predicate helpers avoid full date parsing when a bounded field extraction preserves the same public semantics.
- Runtime mirror functions keep return types aligned with their type-level counterparts.
- Whole-module source audits complete or fail with localized diagnostics instead of OOMing before emitting useful findings.
