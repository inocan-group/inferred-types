# Deferred Items

Runtime whole-module source checking now runs plain `tsc` through
`modules/runtime/tsconfig.check.json` with no `noCheck` override. The remaining
runtime diagnostics, including seven full-graph complexity diagnostics, are
captured by `just check-runtime` in
`features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt` and are
deferred as runtime source strictness debt.

## Tracked Complexity Suppressions

The following entries are the complete set of accepted complexity-class
`@ts-expect-error` suppressions in source. Each suppression must remain paired
with a local explanatory comment, and `just perf-compare` fails if a
complexity-class suppression appears in `modules/{types,runtime,constants}/src`
without being represented exactly by one of the identity rows below. Duplicate
rows are intentional where the same file carries multiple suppressions with the
same diagnostic code and comment text.

### 1. Numeric literal arithmetic

These utilities keep narrow results for small literal inputs and intentionally
fall back to `number` or typed errors for wide, unsupported, or unsafe cases.
The suppressed source-context instantiations occur before those public guards
can fully narrow unresolved generic parameters.

- `modules/types/src/numeric-literals/Mod.ts`
  - `Process`: tuple modulus over `SmallInt` values is bounded by the local
    recursion guard and covered by `Mod` type tests.
  - `Mod`: generic string/number dispatch preserves existing literal modulus
    behavior while bailing out to `number` outside the bounded range.
- `modules/types/src/numeric-literals/Divide.ts`
  - `Process`: tuple division over `SmallInt` values is bounded and preserves
    existing literal division behavior for tested values.
- `modules/types/src/numeric-literals/Delta.ts`
  - `Delta`: composes bounded numeric utilities and preserves narrow distance
    results for covered literal inputs.
- `modules/types/src/numeric-literals/CompareNumbers.ts`
  - `CompareNumbers`: source-context comparison over unresolved `NumberLike`
    constraints remains expensive, while concrete numeric comparisons are
    covered by type tests.
- `modules/types/src/numeric-literals/CSV.ts`
  - `CSV`: CSV tuple/union recursion is depth-capped and preserves existing
    comma-separated numeric literal behavior.
- `modules/types/src/numeric-literals/ShiftDecimalPlace.ts`
  - `ShiftDecimalPlace`: decimal-position shifting retains existing literal
    movement behavior, with source-context generic recursion bounded by guards.
- `modules/types/src/numeric-literals/Sum.ts`
  - `Sum`: tuple summation is depth-capped and preserves tested narrow sums.

### 2. Tuple, list, and recursive expansion helpers

These helpers preserve tuple shape for concrete callers. Their generic
source-context suppressions are accepted because replacing them with wider
aliases would lose documented tuple resolution.

- `modules/types/src/literals/ExpandRecursively.ts`
  - `ExpandRecursively`: recursively expands tuple/object literals for concrete
    callers while retaining the existing source-context recursion guard.
- `modules/types/src/lists/MakeOptional.ts`
  - `Process`: optionalizes tuple suffixes while preserving the required prefix
    for tested concrete tuples.
- `modules/types/src/lists/Pop.ts`
  - `Pop`: removes optional tuple elements while preserving existing tuple
    behavior in covered cases.
- `modules/types/src/lists/Shortest.ts`
  - `Shortest`: recursively compares generic string tuples and preserves the
    shortest-string result for concrete tuple inputs.

### 3. Token rendering and literal stringification

These utilities render type-level values into string-token forms. The tracked
suppressions avoid replacing precise token/literal output with broad `string`
for concrete inputs.

- `modules/types/src/runtime-types/tokens/OutputToken.ts`
  - `AsOutputToken`: object-token JSON rendering can produce a broad source
    expansion for unresolved generic objects, while concrete token behavior is
    covered by runtime-token tests.
- `modules/types/src/type-conversion/ToStringLiteral.ts`
  - `ToStringLiteral`: recursive literal stringification preserves concrete
    scalar/container string output and is covered by conversion tests.

### 4. Runtime type and nesting parsers

These parser utilities are recursive by design and already carry depth or shape
guards. Their suppressions preserve existing parse precision for concrete input
strings and nesting configurations.

- `modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeIntersection.ts`
  - `IT_TakeIntersection`: intersection-token parsing remains precise for
    concrete inputs and is covered by input-token parser tests.
- `modules/types/src/domains/nesting/helpers/IsExitToken.ts`
  - `IsExitToken`: recursive nesting configuration lookup is guarded by
    concrete configuration coverage in nesting tests.
- `modules/types/src/string-literals/mutation/Nest.ts`
  - `TakeNestedString`: nested-string parsing is depth-capped and preserves
    existing concrete nesting parse results.

### Exact suppression identities

Each row is `file | diagnostic | suppression line text`.

- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/type-conversion/ToStringLiteral.ts` | `TS2589` | `// @ts-expect-error TS2589: generic literal stringification recursion is source-context expensive; concrete conversions are covered by tests.`
- `modules/types/src/numeric-literals/CompareNumbers.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context comparison over generic NumberLike constraints; concrete behavior is covered by CompareNumbers tests.`
- `modules/types/src/numeric-literals/Sum.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple summation is depth-capped and covered by Sum tests.`
- `modules/types/src/numeric-literals/CSV.ts` | `TS2589` | `// @ts-expect-error TS2589: CSV union recursion is depth-capped and covered by CSV tests.`
- `modules/types/src/lists/Pop.ts` | `TS2589` | `// @ts-expect-error TS2589: optional tuple pop recursion is covered by Pop tests.`
- `modules/types/src/runtime-types/tokens/OutputToken.ts` | `TS2590` | `// @ts-expect-error TS2590: generic object-token JSON expansion is too broad in source context; concrete behavior is covered by token tests.`
- `modules/types/src/numeric-literals/Divide.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple division helper is bounded to SmallInt; concrete behavior is covered by Divide tests.`
- `modules/types/src/numeric-literals/Divide.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple division helper is bounded to SmallInt; concrete behavior is covered by Divide tests.`
- `modules/types/src/numeric-literals/ShiftDecimalPlace.ts` | `TS2589` | `// @ts-expect-error TS2589: generic decimal shifting is source-context expensive; concrete behavior is covered by ShiftDecimalPlace tests.`
- `modules/types/src/numeric-literals/Delta.ts` | `TS2589` | `// @ts-expect-error TS2589: generic delta composes bounded numeric utilities; concrete behavior is covered by Delta tests.`
- `modules/types/src/domains/nesting/helpers/IsExitToken.ts` | `TS2589` | `// @ts-expect-error TS2589/TS2344: generic nesting configs recurse deeply in source context; concrete configs are covered by nesting tests.`
- `modules/types/src/lists/Shortest.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context recursion over generic string tuples; concrete behavior is covered by Shortest tests.`
- `modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeIntersection.ts` | `TS2589` | `// @ts-expect-error TS2589: generic intersection parsing is source-context expensive; concrete behavior is covered by IT_TakeIntersection tests.`
- `modules/types/src/lists/MakeOptional.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context recursion over generic tuple optionalization; concrete behavior is covered by MakeOptional tests.`
- `modules/types/src/literals/ExpandRecursively.ts` | `TS2589` | `// @ts-expect-error TS2589: generic tuple expansion is recursive by design; concrete callers are covered by type tests.`
- `modules/types/src/string-literals/mutation/Nest.ts` | `TS2589` | `// @ts-expect-error TS2589: recursive nesting parser is depth-capped; concrete behavior is covered by Nest tests.`
