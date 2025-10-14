# Type Assertions

Type assertions in `inferred-types` provide a comprehensive framework for testing TypeScript types at compile-time. This testing capability is essential for ensuring type utilities behave correctly and maintain type safety throughout complex type transformations.

## Overview

The assertion framework consists of two layers:

1. **Core Testing Utilities** - Generic, flexible test utilities (`Test` and `Expect`)
2. **Specialized Assertions** - Focused assertion utilities for specific comparison operations

## Core Testing Utilities

### `Test<TTest, TOp, TExpected>`

The primary type testing utility that compares `TTest` against `TExpected` using the specified operation `TOp`.

**Features:**

- Validates that neither `TTest` nor `TExpected` are `any` or `never` types
- Provides detailed `AssertionError` objects when tests fail
- Returns `true` when tests pass
- Protects against silent type errors

**Example:**

```typescript
import { Test, Expect } from "inferred-types/types";

type cases = [
    Expect<Test<"hello", "equals", "hello">>,        // passes
    Expect<Test<string, "extends", unknown>>,         // passes
    Expect<Test<[1, 2, 3], "hasSameValues", [1, 2, 3]>> // passes
];
```

### `Expect<T extends true>`

A wrapper utility that enforces test results must be `true`.

**Usage:**

- Typically used with `Test` to create test case arrays
- Provides immediate feedback when a test doesn't evaluate to `true`
- Prevents accidental acceptance of `any` or `never` results

**Example:**

```typescript
type cases = [
    Expect<Test<ActualType, "equals", ExpectedType>>
];
```

## Assertion Operations

The `AssertionOp` type defines all available comparison operations:

### `equals`

Tests exact type equality between `TTest` and `TExpected`.

```typescript
Test<{ foo: string }, "equals", { foo: string }>  // true
Test<string, "equals", string | number>           // false
```

### `extends`

Tests whether `TTest` extends `TExpected`.

```typescript
Test<"hello", "extends", string>              // true
Test<string, "extends", "hello">              // false
```

### `doesNotExtend`

Tests whether `TTest` does NOT extend `TExpected`.

```typescript
Test<string, "doesNotExtend", number>         // true
Test<"hello", "doesNotExtend", string>        // false
```

### `hasSameKeys`

Tests whether two container types have the same keys (order-independent).

```typescript
Test<{ a: 1; b: 2 }, "hasSameKeys", { b: 99; a: 55 }>  // true
Test<{ a: 1 }, "hasSameKeys", { a: 1; b: 2 }>          // false
```

### `hasSameValues`

Tests whether two container types have the same values (order-independent for objects, order-dependent for arrays).

```typescript
Test<[1, 2, 3], "hasSameValues", [1, 2, 3]>    // true
Test<[1, 2, 3], "hasSameValues", [3, 2, 1]>    // false
```

### `isError`

Tests whether `TTest` is an Error type, optionally checking specific error type/subtype.

**Modes:**

- **Any Error**: Pass `null`, `undefined`, or `true` as expected type
- **Specific Error Type**: Pass a string literal for the error's `type` property
- **Type and Subtype**: Pass a string in format `"type/subtype"`
- **Error Class**: Pass a specific Error class

```typescript
Test<Error, "isError", true>                        // matches any error
Test<Err<"validation">, "isError", "validation">    // matches error type
Test<Err<"validation/required">, "isError", "validation/required"> // matches type/subtype
```

### `containsAll`

Tests whether a string type contains all specified substrings.

```typescript
Test<"hello world", "containsAll", ["hello", "world"]>  // true
Test<"hello", "containsAll", ["hello", "goodbye"]>      // false
```

## Specialized Assertion Utilities

These utilities provide focused assertion capabilities with cleaner syntax for specific use cases.

### `AssertEquals<TTest, TExpected>`

Asserts exact type equality. Alias: `AssertEqual`

```typescript
type T1 = AssertEquals<string, string>;          // true
type T2 = AssertEquals<string, number>;          // false
```

**Source:** `modules/types/src/assertions/AssertEquals.ts:8`

### `AssertExtends<TTest, TBase>`

Asserts that `TTest` extends `TBase`.

```typescript
type T1 = AssertExtends<"hello", string>;        // true
type T2 = AssertExtends<string, "hello">;        // false
```

**Source:** `modules/types/src/assertions/AssertExtends.ts:8`

### `AssertTrue<TTest>`

Asserts that `TTest` is exactly `true`.

```typescript
type T1 = AssertTrue<true>;                      // true
type T2 = AssertTrue<boolean>;                   // false
```

**Source:** `modules/types/src/assertions/AssertTrue.ts:8`

### `AssertFalse<TTest>`

Asserts that `TTest` is exactly `false`.

```typescript
type T1 = AssertFalse<false>;                    // true
type T2 = AssertFalse<boolean>;                  // false
```

**Source:** `modules/types/src/assertions/AssertFalse.ts:8`

### `AssertNotEqual<TTest, TExpected>`

Asserts that `TTest` does NOT equal `TExpected`.

```typescript
type T1 = AssertNotEqual<string, number>;        // true
type T2 = AssertNotEqual<string, string>;        // false
```

**Source:** `modules/types/src/assertions/AssertNotEqual.ts:8`

### `AssertError<TTest, [TType], [TSubType]>`

Asserts that `TTest` is an Error, with optional type/subtype validation.

```typescript
type T1 = AssertError<Error>;                                 // true
type T2 = AssertError<Err<"validation">, "validation">;       // true
type T3 = AssertError<Err<"validation/required">, "validation", "required">; // true
type F1 = AssertError<string>;                                // false
```

**Source:** `modules/types/src/assertions/AssertError.ts:37`

### `AssertAssertionError<TTest, [TType], [TSubType]>`

Asserts that `TTest` is an `AssertionError` from the testing framework itself, with optional classification checking.

```typescript
type T1 = AssertAssertionError<AssertionError<any, any, any>>;  // true
type T2 = AssertAssertionError<Error>;                          // false
```

**Source:** `modules/types/src/assertions/AssertAssertionError.ts:31`

### `AssertSameValues<TTest, TExpected>`

Asserts that two container types have the same values.

```typescript
type T1 = AssertSameValues<[1, 2, 3], [1, 2, 3]>;  // true
type T2 = AssertSameValues<[1, 2], [1, 2, 3]>;     // false
```

**Source:** `modules/types/src/assertions/AssertSameValues.ts:8`

### `AssertContains<TTest, TExpected>`

Asserts that a string or array type contains the expected element.

```typescript
type T1 = AssertContains<"hello world", "hello">;   // true
type T2 = AssertContains<[1, 2, 3], 2>;             // true
```

**Source:** `modules/types/src/assertions/AssertContains.ts:9`

## Error Handling

### `AssertionError<TType, TMsg, TContext>`

All failed assertions return an `AssertionError` object with detailed information:

```typescript
{
    kind: "AssertionError";
    classification: TType;        // e.g., "failed/equals" or "invalid-test/any-type"
    message: TMsg;                // Human-readable error message
    testType: TContext["test"];   // The type being tested
    expectedType: TContext["expected"]; // The expected type
    ctx: { ... };                 // Additional context (varies by assertion)
}
```

**Error Classifications:**

- `invalid-test/any-type` - Test or expected type is `any`
- `invalid-test/never-type` - Test evaluated to `never`
- `failed/equals` - Equality test failed
- `failed/extends` - Extension test failed
- `failed/doesNotExtend` - Negative extension test failed
- `failed/hasSameKeys` - Key comparison failed
- `failed/hasSameValues` - Value comparison failed
- `failed/isError` - Error type test failed
- `failed/containsAll` - Substring containment test failed

**Source:** `modules/types/src/assertions/TypeError.ts:14`

## Validation Layer

### `AssertValidation<TTest, TOp, TExpected>`

An internal utility that validates test inputs before running assertions:

- Detects `any`, `never`, and `unknown` types
- Provides early error detection
- Returns `AssertionError` for invalid inputs
- Returns `undefined` for valid inputs (allowing the assertion to proceed)

This validation layer ensures that type tests fail explicitly rather than silently when encountering problematic types.

**Source:** `modules/types/src/assertions/AssertValidation.ts:9`

## Best Practices

### 1. Always Use `Expect` Wrapper

```typescript
// Good
type cases = [
    Expect<Test<MyType, "equals", ExpectedType>>
];

// Avoid - may silently fail
type cases = [
    Test<MyType, "equals", ExpectedType>
];
```

### 2. Prefer Specialized Assertions for Readability

```typescript
// Good - clear intent
type T1 = AssertEquals<string, string>;

// Also good, but more verbose
type T2 = Expect<Test<string, "equals", string>>;
```

### 3. Use Type-Specific Operations

Match the assertion operation to what you're testing:

- Use `equals` for exact type matches
- Use `extends` for subtype relationships
- Use `hasSameKeys` for structural comparisons
- Use `isError` for error type validation

### 4. Test Edge Cases

Always test edge cases like `never`, `any`, and `unknown`:

```typescript
type cases = [
    Expect<AssertAssertionError<AssertError<never>>>,
    Expect<AssertAssertionError<AssertError<any>>>,
    Expect<AssertAssertionError<AssertError<unknown>>>
];
```

### 5. Organize Tests by Feature

Group related test cases together in test arrays:

```typescript
describe("MyUtility", () => {
    it("handles basic types", () => {
        type cases = [
            Expect<Test<Result1, "equals", Expected1>>,
            Expect<Test<Result2, "equals", Expected2>>
        ];
    });

    it("handles edge cases", () => {
        type cases = [
            Expect<Test<EdgeCase1, "equals", Expected1>>
        ];
    });
});
```

## Testing Framework Integration

Type assertions integrate with the `typed test` CLI tool and Vitest:

```bash
# Run type tests
pnpm test:types

# Run filtered type tests
pnpm test:types assertions

# Run with Vitest (runtime + type tests)
pnpm test
```

## Related Documentation

- [Type Testing Guide](./type-testing.md) - Overview of testing philosophy
- [Test Utilities](/modules/types/src/assertions/) - Source code for all assertion utilities
- [CLAUDE.md](/CLAUDE.md) - Project development guidelines

## Summary

The type assertion framework in `inferred-types` provides:

- **Comprehensive Testing**: Multiple assertion operations for different testing needs
- **Error Safety**: Explicit `AssertionError` objects with detailed context
- **Validation**: Built-in protection against `any`, `never`, and `unknown` types
- **Flexibility**: Both generic `Test` utility and specialized assertion utilities
- **Integration**: Seamless integration with testing frameworks

This framework ensures type utilities maintain correctness and provides clear feedback when types don't behave as expected.
