# Sorting Utilities

The **inferred-types** library provides four powerful sorting utilities that share a unified design philosophy and feature set: `Sort`, `NumericSort`, `StringSort`, and `BooleanSort`. These utilities enable sophisticated array sorting with strong TypeScript typing while maintaining excellent performance.

## Overview

All sorting utilities provide:

- **Type-safe sorting** with full TypeScript inference
- **Container/offset sorting** using dotpath notation to sort by object properties
- **Flexible ordering** with ASC, DESC, and Natural modes
- **Element pinning** to beginning (`start`) or end (`end`) of sorted arrays
- **Performance optimization** with efficient comparison algorithms
- **Wide type handling** for broad types (e.g., `string`, `number`, `boolean`)

## Common Features

### Order Control

All utilities support three ordering modes:

- **`"ASC"`** (default): Ascending sort order
- **`"DESC"`**: Descending sort order
- **`"Natural"`**: Preserves original array order

### Element Pinning

Pin specific elements to the beginning or end of sorted arrays:

- **`start`**: Pin elements to the beginning (single value or array)
- **`end`**: Pin elements to the end (single value or array)

### Container/Offset Sorting

Sort arrays of objects by specifying a property path:

- **`offset`**: Property path to sort by (supports dot notation for nested properties)
- When `offset` is specified, the array must contain container objects
- Elements without the specified property are placed at the end

## Sort (Auto-Detection Utility)

The `Sort` utility is the most convenient sorting option as it automatically detects the appropriate sorting strategy based on the array's content type:

- **Pure string arrays** → Uses `StringSort`
- **Pure number arrays** → Uses `NumericSort`
- **Pure boolean arrays** → Uses `BooleanSort`
- **Mixed type arrays** → Falls back to `StringSort` with type conversion

### Basic Usage

```typescript
import { Sort } from "inferred-types/types";

// Automatically detects string array
type Strings = Sort<["zebra", "apple", "mango"]>;
//   ^? ["apple", "mango", "zebra"]

// Automatically detects number array
type Numbers = Sort<[42, 1, 99, 23]>;
//   ^? [1, 23, 42, 99]

// Automatically detects boolean array
type Booleans = Sort<[false, true, false, true]>;
//   ^? [true, true, false, false]
```

### Mixed Type Arrays

When arrays contain mixed types, `Sort` falls back to `StringSort` and converts all values to their string representations:

```typescript
// Mixed array with numbers, booleans, and strings
type Mixed = Sort<["zebra", 42, true, "apple", false, 1]>;
//   ^? [1, 42, "apple", false, true, "zebra"]
//      ^  ^    ^        ^      ^      ^
//      "1" "42" "apple" "false" "true" "zebra" (alphabetical)

// With ordering options
type MixedDesc = Sort<["zebra", 42, true, "apple"], { order: "DESC" }>;
//   ^? ["zebra", true, "apple", 42]
//      ^        ^      ^        ^
//      "zebra"  "true" "apple" "42" (reverse alphabetical)
```

### Container Sorting

The `Sort` utility supports all container sorting features:

```typescript
// Container sorting with automatic type detection
type Users = [
  { name: "John", age: 30, active: true },
  { name: "Alice", age: 25, active: false },
  { name: "Bob", age: 35, active: true }
];

// Sort by string property (automatically uses StringSort)
type ByName = Sort<Users, { offset: "name" }>;
//   ^? [
//        { name: "Alice", age: 25, active: false },
//        { name: "Bob", age: 35, active: true },
//        { name: "John", age: 30, active: true }
//      ]

// Sort by numeric property (automatically uses NumericSort)
type ByAge = Sort<Users, { offset: "age", order: "DESC" }>;
//   ^? [
//        { name: "Bob", age: 35, active: true },
//        { name: "John", age: 30, active: true },
//        { name: "Alice", age: 25, active: false }
//      ]

// Sort by boolean property (automatically uses BooleanSort)
type ByActive = Sort<Users, { offset: "active" }>;
//   ^? [
//        { name: "John", age: 30, active: true },
//        { name: "Bob", age: 35, active: true },
//        { name: "Alice", age: 25, active: false }
//      ]
```

### Advanced Features

The `Sort` utility supports all the advanced features of the individual sorting utilities:

```typescript
// Element pinning with mixed types
type WithPinning = Sort<["zebra", 42, true, "apple"], { 
  start: true, 
  end: "zebra" 
}>;
//   ^? [true, 42, "apple", "zebra"]

// Natural order (preserves original order)
type Natural = Sort<["zebra", 42, true, "apple"], { order: "Natural" }>;
//   ^? ["zebra", 42, true, "apple"]

// Complex container sorting with pinning
type ComplexSort = Sort<Products, {
  offset: "price",
  order: "ASC", 
  start: { name: "Featured", price: 99.99 }
}>;
```

### Type Detection Strategy

The `Sort` utility uses TypeScript's conditional types to detect the array content:

1. **First check**: `TList extends readonly string[]` → Use `StringSort`
2. **Second check**: `TList extends readonly number[]` → Use `NumericSort` 
3. **Third check**: `TList extends readonly boolean[]` → Use `BooleanSort`
4. **Default**: Fall back to `StringSort` for mixed types

### Performance Notes

- **Pure type arrays**: Identical performance to using the specific sort utility directly
- **Mixed type arrays**: Uses `StringSort` with implicit type conversion for optimal performance
- **Container sorting**: Automatically selects the most efficient sorting strategy based on the target property type

### When to Use Sort vs Specific Utilities

**Use `Sort` when:**
- You want maximum convenience and don't care about the specific sorting algorithm
- Working with mixed-type arrays that need string conversion
- Building generic utilities that handle various array types
- You want automatic type detection without manual specification

**Use specific utilities when:**
- You need precise control over the sorting algorithm 
- Working with pure type arrays and want explicit type guarantees
- Building performance-critical type utilities
- The sorting behavior needs to be predictable regardless of input type

## NumericSort

Sorts arrays of numbers or numeric string literals with advanced numeric comparison.

### Basic Usage

```typescript
import { NumericSort } from "inferred-types/types";

// Basic ascending sort (default)
type Ascending = NumericSort<[3, 1, 4, 2]>;
//   ^? [1, 2, 3, 4]

// Descending sort
type Descending = NumericSort<[3, 1, 4, 2], { order: "DESC" }>;
//   ^? [4, 3, 2, 1]

// Mixed numeric types
type Mixed = NumericSort<[3, "1", 4, "2"]>;
//   ^? [1, 2, 3, 4]
```

### Container Sorting

```typescript
type Products = [
  { name: "Widget", price: 25.99 },
  { name: "Gadget", price: 12.50 },
  { name: "Tool", price: 45.00 }
];

type SortedByPrice = NumericSort<Products, { 
  offset: "price", 
  order: "DESC" 
}>;
//   ^? [
//        { name: "Tool", price: 45.00 },
//        { name: "Widget", price: 25.99 },
//        { name: "Gadget", price: 12.50 }
//      ]
```

### Element Pinning

```typescript
// Single element pinning
type StartPin = NumericSort<[5, 2, 8, 1], { start: 8 }>;
//   ^? [8, 1, 2, 5]

type EndPin = NumericSort<[5, 2, 8, 1], { end: 2 }>;
//   ^? [1, 5, 8, 2]

// Multiple element pinning
type MultiPin = NumericSort<[5, 2, 8, 1, 9], { 
  start: [8, 2], 
  end: 9 
}>;
//   ^? [8, 2, 1, 5, 9]
```

### Natural Order

```typescript
type Natural = NumericSort<[5, 2, 8, 1], { order: "Natural" }>;
//   ^? [5, 2, 8, 1]  // Original order preserved

// Natural with pinning
type NaturalWithPin = NumericSort<[5, 2, 8, 1], { 
  order: "Natural", 
  start: 8 
}>;
//   ^? [8, 5, 2, 1]  // Only pinning applied
```

## StringSort

Sorts arrays of strings using lexicographic comparison with special handling for wide string types.

### Basic Usage

```typescript
import { StringSort } from "inferred-types/types";

// Basic string sorting
type Fruits = StringSort<["Orange", "Apple", "Peach", "Banana"]>;
//   ^? ["Apple", "Banana", "Orange", "Peach"]

// Descending order
type Descending = StringSort<["Orange", "Apple", "Peach"], { order: "DESC" }>;
//   ^? ["Peach", "Orange", "Apple"]
```

### Wide String Handling

Wide string types (`string`) are always placed at the end:

```typescript
type WithWide = StringSort<["Banana", string, "Apple"]>;
//   ^? ["Apple", "Banana", string]  // Wide string at end
```

### Container Sorting

```typescript
type Users = [
  { name: "John", email: "john@example.com" },
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" }
];

type SortedByName = StringSort<Users, { offset: "name" }>;
//   ^? [
//        { name: "Alice", email: "alice@example.com" },
//        { name: "Bob", email: "bob@example.com" },
//        { name: "John", email: "john@example.com" }
//      ]
```

### Nested Property Sorting

```typescript
type ComplexData = [
  { user: { profile: { displayName: "John" } }, id: 1 },
  { user: { profile: { displayName: "Alice" } }, id: 2 },
  { user: { profile: { displayName: "Bob" } }, id: 3 }
];

type Sorted = StringSort<ComplexData, { 
  offset: "user.profile.displayName" 
}>;
//   ^? Sorted by nested displayName property
```

## BooleanSort

Sorts arrays of boolean values with special ordering rules and wide boolean handling.

### Basic Usage

```typescript
import { BooleanSort } from "inferred-types/types";

// Basic boolean sorting (ASC: true before false)
type Basic = BooleanSort<[false, true, false, true]>;
//   ^? [true, true, false, false]

// Descending order (DESC: false before true)
type Descending = BooleanSort<[true, false, true], { order: "DESC" }>;
//   ^? [false, true, true]
```

### Sort Order Rules

- **ASC (default)**: `true` → `false` → `boolean` (wide type)
- **DESC**: `false` → `true` → `boolean` (wide type)
- Wide boolean types are always placed at the end

### Wide Boolean Handling

```typescript
type WithWide = BooleanSort<[false, boolean, true]>;
//   ^? [true, false, boolean]  // Wide boolean at end
```

### Container Sorting

```typescript
type UserData = [
  { username: "john", active: false },
  { username: "alice", active: true },
  { username: "bob", active: false }
];

type SortedByActive = BooleanSort<UserData, { offset: "active" }>;
//   ^? [
//        { username: "alice", active: true },
//        { username: "john", active: false },
//        { username: "bob", active: false }
//      ]
```

### Complex Nested Sorting

```typescript
type Settings = [
  { user: { preferences: { notifications: false } }, id: 1 },
  { user: { preferences: { notifications: true } }, id: 2 },
  { user: { preferences: { notifications: false } }, id: 3 }
];

type Sorted = BooleanSort<Settings, { 
  offset: "user.preferences.notifications" 
}>;
//   ^? Sorted by nested boolean property
```

## Advanced Examples

### Combining All Features

```typescript
// Complex numeric sorting with all features
type ComplexNumeric = NumericSort<[
  { product: "A", score: 85, featured: true },
  { product: "B", score: 92, featured: false },
  { product: "C", score: 78, featured: true },
  { product: "D", score: 95, featured: false }
], {
  offset: "score",
  order: "DESC",
  start: { product: "C", score: 78, featured: true }
}>;
// Featured product "C" pinned to start, rest sorted by score DESC

// Multi-level container sorting
type Inventory = [
  { item: { name: "Widget", category: "tools" }, stock: 15 },
  { item: { name: "Gadget", category: "electronics" }, stock: 8 },
  { item: { name: "Tool", category: "tools" }, stock: 23 }
];

type SortedByCategory = StringSort<Inventory, { 
  offset: "item.category" 
}>;
// Sorted by nested category property

// Natural order with complex pinning
type NaturalWithPins = NumericSort<[9, 7, 1, 4, 2, 6], {
  order: "Natural",
  start: [1, 7], 
  end: [9, 2]
}>;
//   ^? [1, 7, 4, 6, 9, 2]
//      ^     ^     ^  ^
//    start  mid   end
```

### Performance Considerations

All three utilities are optimized for TypeScript compiler performance:

- **NumericSort**: Uses string-based comparison for faster numeric evaluation
- **StringSort**: Implements efficient character-by-character comparison
- **BooleanSort**: Optimized boolean comparison with minimal recursion
- **Natural mode**: Bypasses sorting entirely for maximum speed
- **Container sorting**: Uses efficient property extraction with `Get<T, U>`

### Error Handling

The utilities include built-in error handling:

- **Missing properties**: Elements without the specified offset property are placed at the end
- **Type mismatches**: Non-container types with offset specification result in type errors
- **Wide types**: Wide types (`string`, `number`, `boolean`) are consistently handled

### Type Safety

All utilities maintain strict type safety:

```typescript
// Type error: cannot use offset with non-container array
type Invalid = StringSort<["a", "b", "c"], { offset: "name" }>;
//   ^? Type error

// Type error: offset property must exist
type AlsoInvalid = NumericSort<[{id: 1}, {id: 2}], { offset: "missing" }>;
//   ^? Type error

// Correct usage with proper container types
type Valid = StringSort<[{name: "a"}, {name: "b"}], { offset: "name" }>;
//   ^? Valid and type-safe
```

## Options Interface

All three utilities share a consistent options interface pattern:

```typescript
interface SortOptions<
  TOrder extends "ASC" | "DESC" | "Natural" | undefined,
  TOffset extends string | undefined
> {
  order?: TOrder;     // Sort direction
  offset?: TOffset;   // Property path for container sorting
  start?: unknown;    // Pin elements to beginning
  end?: unknown;      // Pin elements to end
}
```

## Best Practices

1. **Use Natural order** for maximum performance when you only need pinning
2. **Specify container types explicitly** when using offset to ensure type safety
3. **Prefer single-level properties** over deeply nested paths when possible
4. **Use start/end pinning** sparingly as it adds complexity to the sort logic
5. **Test edge cases** like empty arrays, single elements, and duplicate values
6. **Consider wide types** in your sorting logic as they have special placement rules

## Migration from Basic Sorting

If you're upgrading from basic array sorting:

```typescript
// Old approach with basic array methods (runtime only)
const sorted = [3, 1, 4, 2].sort((a, b) => a - b);

// New approach with type-level sorting
type Sorted = NumericSort<[3, 1, 4, 2]>;
//   ^? [1, 2, 3, 4] - Known at compile time!

// Or use the auto-detection utility
type AutoSorted = Sort<[3, 1, 4, 2]>;
//   ^? [1, 2, 3, 4] - Automatically detects numeric sort!

// Works with mixed types too
type MixedSorted = Sort<["banana", 42, true, "apple"]>;
//   ^? [42, "apple", "banana", true] - String conversion fallback
```

The inferred-types sorting utilities provide compile-time sorting with full type inference, enabling more sophisticated type-level programming while maintaining runtime compatibility.