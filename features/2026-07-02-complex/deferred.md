# Deferred Items

No runtime whole-module source-check item is deferred. `just check-runtime`
now completes with the runtime check-mode config.

## Tracked Complexity Suppressions

The following entries are the complete set of accepted complexity-class
`@ts-expect-error` suppressions in source. Each suppression must remain paired
with a local explanatory comment, and `just perf-compare` fails if a
complexity-class suppression appears in `modules/{types,runtime,constants}/src`
without being represented by one of the source paths below.

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
