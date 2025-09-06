# HasIndexKeys<T>

## Overview

`HasIndexKeys<T>` is a type utility that detects whether a dictionary type has index signatures that allow arbitrary key-value pairs to be added. This includes wide index signatures (`string`, `number`, `symbol`) as well as template literal index patterns.

## Syntax

```typescript
type HasIndexKeys<T extends Dictionary>
```

## Parameters

- `T` - A dictionary type to check for index signatures

## Returns

- `true` if the type has any index signatures
- `false` if the type only has explicit keys
- `boolean` for wide/unknown dictionary types

## Examples

### Basic Usage

```typescript
import { HasIndexKeys } from "inferred-types/types";

// Objects with wide string indexes
type T1 = HasIndexKeys<{ [key: string]: unknown; foo: 1 }>;  // true
type T2 = HasIndexKeys<{ [key: string]: string }>;           // true

// Objects with numeric indexes
type T3 = HasIndexKeys<{ [key: number]: unknown; 0: "a" }>;  // true

// Objects with symbol indexes
type T4 = HasIndexKeys<{ [key: symbol]: unknown }>;          // true

// Objects with only explicit keys
type T5 = HasIndexKeys<{ foo: 1; bar: 2 }>;                  // false
type T6 = HasIndexKeys<{}>;                                   // false
```

### Template Literal Index Detection

```typescript
// Template literal indexes are detected
type T7 = HasIndexKeys<{ [key: `_${string}`]: number }>;     // true
type T8 = HasIndexKeys<{ [key: `id-${number}`]: string }>;   // true

// Mixed with explicit keys
type T9 = HasIndexKeys<{ 
  foo: 1; 
  [key: `_${string}`]: number 
}>;  // true
```

### Wide Dictionary Types

```typescript
// Wide types return boolean
type T10 = HasIndexKeys<Record<string, unknown>>;  // boolean
type T11 = HasIndexKeys<Dictionary>;                // boolean
type T12 = HasIndexKeys<Map<any, any>>;            // boolean
```

## Use Cases

### 1. Type Guard for Strict Objects

```typescript
type StrictObject<T> = HasIndexKeys<T> extends false 
  ? T 
  : never;

// Only accepts objects without index signatures
type Valid = StrictObject<{ foo: 1; bar: 2 }>;        // { foo: 1; bar: 2 }
type Invalid = StrictObject<{ [key: string]: any }>;  // never
```

### 2. Conditional Type Behavior

```typescript
type ProcessObject<T extends Dictionary> = 
  HasIndexKeys<T> extends true
    ? "Has dynamic keys"
    : "Has only static keys";

type T1 = ProcessObject<{ foo: 1 }>;                    // "Has only static keys"
type T2 = ProcessObject<{ [key: string]: unknown }>;    // "Has dynamic keys"
```

### 3. API Type Safety

```typescript
type RequiresExactShape<T extends Dictionary> = 
  HasIndexKeys<T> extends false
    ? T
    : Error<"Object must have exact shape, no index signatures allowed">;

function processData<T extends Dictionary>(
  data: RequiresExactShape<T>
): void {
  // Implementation
}

// Valid call
processData({ name: "John", age: 30 });

// Would error at type level
// processData({ name: "John", age: 30, [key: string]: any });
```

## Related Utilities

- [`RemoveIndexKeys<T>`](./remove-index-keys.md) - Removes index signatures from a type
- [`HasTemplateLiteral<T>`](./has-template-literal.md) - Checks for template literal types in arrays/objects
- [`Keys<T>`](./keys.md) - Gets all keys from a dictionary type

## Notes

- This utility can detect all forms of index signatures including template literal patterns
- Wide dictionary types (like `Dictionary` or `Record<string, unknown>`) return `boolean` since their index key status cannot be determined at compile time
- The utility is particularly useful for ensuring type safety when you need objects with a fixed, known shape

## Edge Cases

```typescript
// Empty object has no index keys
type E1 = HasIndexKeys<{}>;  // false

// Intersection types
type E2 = HasIndexKeys<{ foo: 1 } & { [key: string]: unknown }>;  // true

// Optional properties don't affect index detection
type E3 = HasIndexKeys<{ foo?: 1; bar?: 2 }>;  // false

// Any and never types
type E4 = HasIndexKeys<any>;    // Error: "invalid/has-index-keys"
type E5 = HasIndexKeys<never>;  // Error: "invalid/has-index-keys"
```