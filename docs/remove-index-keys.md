# RemoveIndexKeys<T>

## Overview

`RemoveIndexKeys<T>` is a type utility that removes index signatures from dictionary and array types while preserving all explicitly defined key-value pairs. It can remove wide index signatures (`string`, `number`, `symbol`) but has limitations with template literal index patterns due to TypeScript's type system constraints.

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

### Array Usage

```typescript
// Arrays preserve explicit indices
type A1 = RemoveIndexKeys<["a", "b", "c"]>;
// Result: ["a", "b", "c"] (no change for tuple types)

// Arrays with index signatures
type A2 = RemoveIndexKeys<string[]>;
// Result: {} (removes the implicit numeric index signature)
```

### Mixed Index Types

```typescript
// Multiple index signature types
type Mixed = RemoveIndexKeys<{
  foo: 1;
  bar: 2;
  [key: string]: unknown;
  [key: number]: unknown;
  [key: symbol]: unknown;
}>;
// Result: { foo: 1; bar: 2 }
```

## TypeScript Limitations

### Template Literal Index Signatures

**Important**: Due to TypeScript's type system design, template literal index signatures cannot be completely removed from a type. They remain part of the type's structure even after filtering operations.

```typescript
// ❌ Cannot fully remove template literal indexes
type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number }>;
// Result: { foo: 1; bar: 2; [key: `_${string}`]: number }
//         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ - This remains

// ✅ Can detect them with HasIndexKeys
type T2 = HasIndexKeys<{ foo: 1; [key: `_${string}`]: number }>;
// Result: true
```

This is a fundamental limitation of TypeScript's structural type system, not a bug in the implementation.

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

The utility uses mapped types with conditional key filtering:

```typescript
type FilterDictKeys<T> = {
  [K in keyof T as 
    string extends K ? never :      // Remove wide string index
    number extends K ? never :      // Remove wide number index  
    symbol extends K ? never :      // Remove wide symbol index
    IsTemplateLiteral<K> extends true ? never :  // Attempt to filter template literals
    K                               // Keep the key
  ]: T[K]
};
```

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

The utility includes comprehensive tests for all supported index signature types. Template literal index signature tests are skipped with documentation explaining the TypeScript limitation:

```typescript
it.skip("literal indexes - TypeScript limitation", () => {
  // TypeScript cannot fully remove template literal index signatures
  // This is a known limitation of the type system
});
```