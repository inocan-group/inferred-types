# RemoveIndexKeys<T>

## Overview

`RemoveIndexKeys<T>` is a type utility that removes index signatures from dictionary and array types while preserving all explicitly defined key-value pairs. It can remove wide index signatures (`string`, `number`, `symbol`) as well as template literal index patterns through a clever multi-step reconstruction approach.

## Syntax

```typescript
type RemoveIndexKeys<T>
```

## Parameters

- `T` - A dictionary or array type from which to remove index signatures

## Returns

- For dictionaries: A new type with only explicit keys preserved
- For arrays: A new type with only explicit numeric indices preserved  
- `never` for non-dictionary, non-array types

## Examples

### Basic Dictionary Usage

```typescript
import { RemoveIndexKeys } from "inferred-types/types";

// Wide string index removal
type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: string]: unknown }>;
// Result: { foo: 1; bar: 2 }

type T2 = RemoveIndexKeys<{ [key: string]: string }>;
// Result: {}

// Wide numeric index removal
type T3 = RemoveIndexKeys<{ 0: "a"; 1: "b"; [key: number]: string }>;
// Result: { 0: "a"; 1: "b" }

// Wide symbol index removal  
type T4 = RemoveIndexKeys<{ foo: 1; [key: symbol]: unknown }>;
// Result: { foo: 1 }

// No index signatures to remove
type T5 = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
// Result: { foo: 1; bar: 2 }
```

### Template Literal Index Removal

```typescript
// Template literal indexes are successfully removed
type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number }>;
// Result: { foo: 1; bar: 2 }

type T2 = RemoveIndexKeys<{ [key: `id-${number}`]: string; name: "test" }>;
// Result: { name: "test" }

type T3 = RemoveIndexKeys<{ [key: `${string}-suffix`]: boolean; active: true }>;
// Result: { active: true }
```

### Array Usage

```typescript
// Array handling has limitations due to TypeScript's complex array type structure
type A1 = RemoveIndexKeys<["a", "b", "c"]>;
// Result: Complex type preserving explicit indices

// Arrays with only index signatures
type A2 = RemoveIndexKeys<string[]>;
// Result: Type with length property but no numeric index signature
```

### Mixed Index Types

```typescript
// Multiple index signature types including template literals
type Mixed = RemoveIndexKeys<{
  foo: 1;
  bar: 2;
  [key: string]: unknown;
  [key: number]: unknown;
  [key: symbol]: unknown;
  [key: `_${string}`]: number;
}>;
// Result: { foo: 1; bar: 2 }
```

## Complex Template Literal Patterns

The utility successfully handles even complex template literal index patterns:

```typescript
// Multi-interpolation patterns
type Complex1 = RemoveIndexKeys<{
  id: number;
  [key: `${string}_${string}`]: string;
  [key: `prefix-${number}-suffix`]: boolean;
}>;
// Result: { id: number }

type Complex2 = RemoveIndexKeys<{
  data: object;
  [key: `${string}:${string}:${string}`]: any;
  [key: `route/${string}`]: Function;
}>;
// Result: { data: object }
```

## Implementation Approach

The utility uses a clever multi-step approach to successfully remove template literal index signatures:

1. **FilterDictKeys<T>** - Creates a filtered type (template literals remain structurally but are marked for removal)
2. **ObjectKeys<FilterDictKeys<T>>** - Extracts only the actual available keys (excludes template literal keys)
3. **WithKeys<T, Keys>** - Reconstructs the type using only the extracted explicit keys

This approach overcomes TypeScript's structural type system limitations by reconstructing the type rather than trying to filter template literal signatures directly.

## Use Cases

### 1. Creating Strict Object Types

```typescript
type MakeStrict<T> = RemoveIndexKeys<T>;

type LooseApi = {
  name: string;
  age: number;
  [key: string]: unknown;
};

type StrictApi = MakeStrict<LooseApi>;
// Result: { name: string; age: number }
```

### 2. Type Safety for Configuration Objects

```typescript
type Config = {
  host: string;
  port: number;
  [key: string]: unknown; // Allows arbitrary additional properties
};

type StrictConfig = RemoveIndexKeys<Config>;
// Result: { host: string; port: number }

function validateConfig(config: StrictConfig): boolean {
  // Only validates known properties
  return typeof config.host === "string" && typeof config.port === "number";
}
```

### 3. Filtering Third-Party Types

```typescript
// Clean up types from external libraries
type CleanApiResponse<T> = RemoveIndexKeys<T>;

type ExternalType = {
  data: string;
  meta: { version: number };
  [key: string]: any; // From external lib
};

type CleanType = CleanApiResponse<ExternalType>;
// Result: { data: string; meta: { version: number } }
```

## Related Utilities

- [`HasIndexKeys<T>`](./has-index-keys.md) - Detects if a type has index signatures
- [`WithKeys<T, K>`](./with-keys.md) - Picks specific keys from an object
- [`Keys<T>`](./keys.md) - Gets all keys from a dictionary type
- [`IsTemplateLiteral<T>`](./is-template-literal.md) - Checks for template literal types

## Implementation Details

The utility uses a sophisticated multi-step reconstruction approach:

```typescript
// Step 1: Filter dictionary keys (marks template literals for removal)
type FilterDictKeys<T> = {
  [K in keyof T as 
    string extends K ? never :      // Remove wide string index
    number extends K ? never :      // Remove wide number index  
    symbol extends K ? never :      // Remove wide symbol index
    IsTemplateLiteral<K> extends true ? never :  // Filter template literals
    K                               // Keep the key
  ]: T[K]
};

// Step 2: Main implementation using reconstruction
export type RemoveIndexKeys<T> = T extends Dictionary
  ? HasIndexKeys<T> extends true
    ? Required<ObjectKeys<FilterDictKeys<T>>> extends infer Keys extends readonly PropertyKey[]
      ? WithKeys<T,Keys>  // Step 3: Reconstruct using only explicit keys
      : never
    : T
  : T extends readonly any[]
    ? Arr<T>  // Array handling (complex due to TypeScript limitations)
    : never;
```

This approach successfully removes all types of index signatures, including template literal patterns that were previously thought impossible to remove.

## Edge Cases

```typescript
// Empty objects remain empty
type E1 = RemoveIndexKeys<{}>;  // {}

// Objects with only index signatures become empty
type E2 = RemoveIndexKeys<{ [key: string]: any }>;  // {}

// Intersection types
type E3 = RemoveIndexKeys<{ foo: 1 } & { [key: string]: unknown }>;
// Result: { foo: 1 }

// Union types are handled per branch
type E4 = RemoveIndexKeys<{ foo: 1 } | { bar: 2; [key: string]: unknown }>;
// Result: { foo: 1 } | { bar: 2 }
```

## Testing Notes

The utility includes comprehensive tests for all supported index signature types, including:

- Wide string, number, and symbol index signatures
- Template literal index patterns of various complexity
- Mixed index signature combinations
- Complex template literal patterns with multiple interpolations
- Edge cases and union/intersection types

```typescript
it("template literal indexes", () => {
  type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}>;
  type T2 = RemoveIndexKeys<{ [key: `id-${number}`]: string; name: "test" }>;
  
  type cases = [
    Expect<Test<T1, "equals", { foo: 1; bar: 2 }>>,
    Expect<Test<T2, "equals", { name: "test" }>>,
  ];
});
```

All tests pass, confirming that the utility successfully removes all types of index signatures including template literal patterns.