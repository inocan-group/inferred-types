# Inferred Types Summary

## Purpose

`inferred-types` is a TypeScript monorepo focused on preserving narrow literal types while providing runtime helpers that mirror type-level behavior. The core value proposition is that values transformed or validated at runtime should retain as much compile-time precision as TypeScript can reasonably express.

That means a utility is usually judged on two axes:

- Does the runtime behavior produce the expected value?
- Does TypeScript infer the narrowest useful type for that value?

Type tests are therefore not secondary. In this repo, type-level correctness and runtime correctness are both part of the definition of "passing."

## Monorepo Shape

The workspace is split into four main packages:

- `modules/constants`: shared runtime constants and finite sets used by both runtime code and type definitions.
- `modules/types`: the main body of type utilities. This is the conceptual center of the project.
- `modules/runtime`: runtime functions, type guards, parsers, and helpers that try to preserve or recover narrow types.
- `modules/inferred-types`: a consolidation package that re-exports constants, runtime helpers, and type utilities for the published package.

The source taxonomy is broad but consistent. `modules/types/src` contains categories such as `string-literals`, `dictionary`, `datetime`, `runtime-types`, `boolean-logic`, `lists`, `tuples`, `numeric-literals`, `interpolation`, `type-conversion`, and `validation`. `modules/runtime/src` mirrors many of these categories and adds runtime-specific areas such as `type-guards`, `meta`, `initializers`, and runtime token parsing helpers.

Imports are intentionally strict. Most code should import from:

- `inferred-types/constants`
- `inferred-types/types`
- `inferred-types/runtime`

The `modules/inferred-types` package is the exception that re-exports from the internal `@inferred-types/*` package names.

## Narrow Type Strategy

The dominant pattern is "runtime mirror plus type utility." A type utility defines the compile-time transformation, while a runtime function performs the same transformation on actual values and casts the output to the corresponding type.

For example:

- `EnsureLeading<TContent, TLeading>` computes the prefixed type.
- `ensureLeading(content, ensure)` performs the runtime prefixing and returns `EnsureLeading<T, U>`.

This pattern appears in string utilities, casing utilities, dictionary filtering, date/time conversion, token parsing, and type guards. The goal is not just to avoid widening, but to actively transform the type when the runtime value is transformed.

Representative examples:

- `EnsureLeading<"Bar", "Foo">` resolves to `"FooBar"`.
- `ensureLeading("Bar", "Foo")` returns the value `"FooBar"` with type `"FooBar"`.
- `PascalCase<"one-two-three">` resolves to `"OneTwoThree"`.
- `toPascalCase("one-two-three")` returns `"OneTwoThree"` with that literal type.
- `WithValue<TObj, string>` filters an object type to keys whose values extend `string`.
- `withValue("string")(obj)` filters the runtime object and returns the correspondingly reduced object type.

## Runtime Functions

Runtime functions are written to preserve literal information through generic parameters, `const` inference, and type-level return types. Many are higher-order functions where the first call captures a selector or operation and the second call applies it to data.

Common runtime categories include:

- String normalization: `ensureLeading`, `ensureTrailing`, `ensureSurround`, `toPascalCase`, `toCamelCase`, `toSnakeCase`, `toKebabCase`.
- Dictionary/object utilities: `defineObj`, `keysOf`, `valuesOf`, `withKeys`, `withoutKeys`, `withValue`, `withoutValue`, `withDefaults`.
- Date/time helpers: `asIsoDate`, `asIsoDateTime`, `parseDate`, `parseIsoDate`, `getTomorrow`, `isToday`, `isBefore`, and related utilities.
- Type guards: guards for primitives, objects, arrays, network strings, date/time strings, CSS values, errors, runtime tokens, and other domains.
- Runtime type parsing: `fromInputToken`, `asInputToken`, `asType`, `createToken`, `createGrammar`, `shape`, and related token helpers.

Many runtime helpers use a pragmatic type assertion at the boundary after runtime logic has done the real work. This is normal for the repo: TypeScript cannot prove many value-level transformations, so the implementation is responsible for keeping the runtime behavior aligned with the declared type utility.

## Type Utilities

The `types` package contains small primitive helpers and large composed utilities. Important patterns include:

- Conditional type branching with explicit handling for wide types such as `string`, `number`, and `boolean`.
- Template literal parsing and rendering for strings, dates, times, token grammars, interpolation templates, and URL-like structures.
- Tuple recursion for list transformations, argument extraction, token streams, and parser state.
- Object mapped types for filtering, key transformations, optional/required key analysis, and value-based selection.
- Error-producing types using `Err<...>` when type-level parsing or validation fails.
- Complexity management helpers such as `As`, `ExpandRecursively`, `IsWideType`, and bailout limits in recursive utilities.

The type layer is not just modeling static shapes. It often behaves like a compile-time parser or evaluator.

## Runtime Type Parsing

The `runtime-types` and `take` areas are among the most advanced parts of the repo. They support a string-based type description language where inputs such as `"string"`, `"42"`, `"string[]"`, `"number | String(bar)"`, function signatures, object definitions, tuple definitions, and container forms can be parsed into TypeScript types.

At the type level, utilities such as `GetInputToken` and `FromInputToken` turn token syntax into concrete types or typed errors. At runtime, helpers such as `fromInputToken` normalize token values and expose a value-level counterpart to the type-level parser.

This area demonstrates the core ambition of the project: a shared vocabulary between runtime strings, runtime values, and compile-time types.

## Type Tests

Type tests live under `tests/` alongside runtime tests and usually use Vitest for organization. A test file often contains both:

- Runtime assertions with `expect(...)`.
- Type assertions in a `type cases = [...]` tuple.

Common assertion forms include:

```ts
import type { Expect, Test } from "inferred-types/types";

type cases = [
    Expect<Test<Actual, "equals", Expected>>,
    Expect<Test<Actual, "extends", Base>>,
];
```

Newer tests also use assertion helpers such as `AssertEqual`, `AssertExtends`, `AssertTrue`, `AssertFalse`, `AssertSameValues`, and `AssertContains`.

For runtime mirror functions, the strongest tests check both the value and the inferred type:

```ts
const result = ensureLeading("Bar", "Foo");

expect(result).toEqual("FooBar");

type cases = [
    Expect<Test<typeof result, "equals", "FooBar">>,
];
```

The custom type-test runner is `typed`. In normal work this is run with commands such as `typed test` or `pnpm test:types`, but tests were intentionally not run while preparing this summary because the repo currently has known overly complex type areas.

## Type Complexity Risk

The main technical risk is TypeScript type explosion. This shows up most often in:

- Template literal distribution across large unions.
- Date/time types where hour, minute, second, millisecond, and timezone unions combine multiplicatively.
- Recursive parser types for input tokens, string interpolation, nesting, and function signatures.
- Cross-module type resolution where TypeScript behaves differently after types are exported and consumed through package boundaries.

The repo already documents and experiments with this in `docs/type-performance.md` and `tests/type-performance/`. The benchmark files show concrete examples such as full time rendering producing very large combinations, especially when seconds, milliseconds, and strong timezone unions are involved.

Useful mitigation patterns already present in the codebase include:

- Detect wide inputs and return wide output early.
- Split parsing into smaller phases instead of one huge conditional.
- Use `As<...>` to constrain and simplify intermediate results.
- Add recursion depth limits or bailout behavior where exactness becomes too expensive.
- Prefer static template token forms such as `{{string}}` where they avoid unwanted TypeScript literal union expansion.
- Test type performance separately from ordinary behavior tests.

## Development Implications

When adding or changing a utility, the expected standard is:

- Preserve narrow inference wherever practical.
- Keep runtime behavior and type-level behavior aligned.
- Add type tests for type utilities.
- Add both runtime and type assertions for runtime mirror functions.
- Watch for union expansion and "complex and possibly infinite" failure modes.
- Avoid pass-through placeholder types and broad `any` escapes.
- Follow the repo import rules so the package remains publishable across npm, JSR, and GitHub Packages.

The best mental model is that this repo is both a runtime utility library and a compile-time language toolkit. Changes should be evaluated through both lenses.
