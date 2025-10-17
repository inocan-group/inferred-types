# Converting Data Structures to String Literals

It can be very useful to _stringify_ data structures and while `string`, `number`, and `boolean` types are all exceptionally easy to make into strings more complex data structures and types can be more challenging.

This repo provides several utilities to help you with this:

## Overview

The `ToStringLiteral` family of utilities converts TypeScript types and runtime values into their string literal representations. This is useful for:

- **Type-level string representations** - Convert complex types to readable string literals at design time
- **Runtime stringification** - Mirror type-level behavior with runtime functions
- **Type documentation** - Generate human-readable type representations
- **Error messages** - Create descriptive type information in error contexts

## Type Utilities

### `ToStringLiteral<T, [Options]>`

The main type utility that converts any TypeScript type into a string literal representation.

```typescript
import type { ToStringLiteral } from "inferred-types/types";

// Scalars
type Num = ToStringLiteral<42>;              // "42"
type Str = ToStringLiteral<"hello">;         // "\"hello\""
type Bool = ToStringLiteral<true>;           // "true"
type Null = ToStringLiteral<null>;           // "null"
type Undef = ToStringLiteral<undefined>;     // "undefined"

// Wide types
type WideNum = ToStringLiteral<number>;      // "number"
type WideStr = ToStringLiteral<string>;      // "string"
type WideBool = ToStringLiteral<boolean>;    // "false | true"

// Objects
type Obj = ToStringLiteral<{ foo: 1; bar: "hi" }>;
// "{ foo: 1, bar: \"hi\" }"

// Optional properties
type ObjOpt = ToStringLiteral<{ foo: 1; bar?: 2 }>;
// "{ foo: 1, bar?: 2 }"

// Arrays
type Arr = ToStringLiteral<[1, 2, 3]>;       // "[ 1, 2, 3 ]"
type WideArr = ToStringLiteral<string[]>;    // "string[]"

// Union types
type Union = ToStringLiteral<1 | 2 | 3>;     // "1 | 2 | 3"

// Errors are preserved
type Err = ToStringLiteral<Error>;           // Error (unchanged)
```

### Options

The second parameter allows you to customize the output:

```typescript
type Options = {
    quote?: '"' | "'";      // Quote character (default: '"')
    encode?: boolean;       // HTML encode strings (default: false)
    tokensAllowed?: boolean; // Allow input tokens (default: false)
};

// Using single quotes
type Single = ToStringLiteral<{ foo: "bar" }, { quote: "'" }>;
// "{ foo: 'bar' }"
```

### Specialized Type Utilities

#### `ToStringLiteral__Scalar<T, [Options]>`

Converts scalar types (string, number, boolean, null, undefined, symbol) to string literals.

```typescript
type Str = ToStringLiteral__Scalar<"foo">;    // "\"foo\""
type Num = ToStringLiteral__Scalar<42>;       // "42"
type Bool = ToStringLiteral__Scalar<true>;    // "true"
```

#### `ToStringLiteral__Object<T, [Options]>`

Converts object types to string literal representations.

```typescript
type Obj = ToStringLiteral__Object<{
    id: 1;
    name: "Alice"
}>;
// "{ id: 1, name: \"Alice\" }"

// Nested objects
type Nested = ToStringLiteral__Object<{
    user: { id: 1; name: "Bob" };
    count: 42;
}>;
// "{ user: { id: 1, name: \"Bob\" }, count: 42 }"
```

#### `ToStringLiteral__Array<T, [Options]>`

Converts array and tuple types to string literals.

```typescript
// Literal tuples
type Tuple = ToStringLiteral__Array<[1, "foo", true]>;
// "[ 1, \"foo\", true ]"

// Wide arrays
type Arr = ToStringLiteral__Array<number[]>;
// "number[]"

// Optional elements
type Opt = ToStringLiteral__Array<[1, 2?, 3?]>;
// "[ 1, 2?, 3? ]"

// Multi-dimensional
type Matrix = ToStringLiteral__Array<[[1, 2], [3, 4]]>;
// "[ [ 1, 2 ], [ 3, 4 ] ]"
```

#### `ToStringLiteral__Union<T, [Options]>`

Converts union types to string literal representations.

```typescript
type Union = ToStringLiteral__Union<[1, 2, 3]>;
// "1 | 2 | 3"

type Mixed = ToStringLiteral__Union<[string, number, boolean]>;
// "string | number | boolean"
```

## Runtime Functions

### `toStringLiteral(value, [options])`

The runtime equivalent that converts values into string literal representations.

```typescript
import { toStringLiteral } from "inferred-types/runtime";

// Scalars
const num = toStringLiteral(42);              // "42"
const str = toStringLiteral("hello");         // "\"hello\""
const bool = toStringLiteral(true);           // "true"

// Objects
const obj = toStringLiteral({
    foo: 1,
    bar: "hi"
});
// "{ foo: 1, bar: \"hi\" }"

// Arrays
const arr = toStringLiteral([1, 2, 3]);
// "[ 1, 2, 3 ]"

// With options
const single = toStringLiteral(
    { foo: "bar" },
    { quote: "'" }
);
// "{ foo: 'bar' }"
```

### Type Safety

The runtime function maintains type safety, returning the same type as the type utility:

```typescript
const obj = toStringLiteral({ foo: 1, bar: "hi" });

type Result = typeof obj;
// type Result = "{ foo: 1, bar: \"hi\" }"
```

## Error Handling

Both the type utility and runtime function properly handle Error types:

### Type-Level Error Handling

When an Error type is encountered, it's returned unchanged rather than being stringified:

```typescript
import type { Err } from "inferred-types/types";

// Error in object property
type ObjWithError = ToStringLiteral<{
    foo: string;
    bar: Err<"malformed-token">;
}>;
// Result: Err<"malformed-token"> (not stringified)
```

### Runtime Error Handling

At runtime, errors are propagated with enhanced context:

```typescript
import { toStringLiteral, err } from "inferred-types/runtime";

const obj = {
    foo: "valid",
    bar: err("malformed-token", "Invalid value")
};

const result = toStringLiteral(obj);
// Result is an Error with:
// - type: "malformed-token"
// - message: "Property 'bar' has a malformed token: Invalid value"
// - property: "bar"
// - token: { foo: "valid", bar: [Error] }
// - originalError: [Error]
```

### Error Propagation

Errors bubble up from nested structures:

```typescript
const nested = {
    outer: "valid",
    inner: {
        deep: err("malformed-token/literal", "Bad literal")
    }
};

const result = toStringLiteral(nested);
// Error type: "malformed-token"
// Error subType: "literal"
// property: "inner" (where the error was detected)
```

## Common Use Cases

### 1. Type Documentation

```typescript
type ApiResponse = {
    id: number;
    name: string;
    active: boolean;
};

type Doc = ToStringLiteral<ApiResponse>;
// "{ id: number, name: string, active: boolean }"
```

### 2. Type Comparison in Tests

```typescript
import { expect } from "vitest";
import type { Test, Expect } from "inferred-types/types";

type Result = SomeComplexType;
type Expected = { foo: 1; bar: 2 };

type cases = [
    Expect<Test<
        ToStringLiteral<Result>,
        "equals",
        ToStringLiteral<Expected>
    >>
];
```

### 3. Error Messages

```typescript
function validateType<T>(value: unknown): T {
    if (!isValid(value)) {
        const expected = toStringLiteral(value);
        throw new Error(`Expected ${expected}`);
    }
    return value as T;
}
```

### 4. Configuration Validation

```typescript
const config = {
    port: 3000,
    host: "localhost",
    options: {
        ssl: true,
        cors: false
    }
};

const stringified = toStringLiteral(config);
// "{ port: 3000, host: \"localhost\", options: { ssl: true, cors: false } }"
```

## Related Utilities

- **`ToJson`** - Similar to `ToStringLiteral` but produces JSON-compatible output
- **`FromInputToken`** - The inverse operation, parsing string tokens into types
- **`ToString`** - Simpler string conversion without literal formatting
- **`ToStringArray`** - Converts tuple values to string tuple

## Performance Considerations

- The type utilities work at compile time and have no runtime cost
- The runtime functions are optimized for common cases
- Deep object nesting may impact TypeScript compilation performance
- Error detection and propagation adds minimal overhead

## Limitations

1. **Circular References**: Circular object references are not supported
2. **Functions**: Function types stringify as their signature, not implementation
3. **Symbols**: Symbol values stringify as `"symbol"` or `"[symbol]"`
4. **Type Depth**: Very deep type nesting may hit TypeScript's recursion limits
