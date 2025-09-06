# NumericSort

The `NumericSort` utility provides advanced sorting capabilities for arrays of numbers, numeric strings, and container objects with numeric properties. It offers precise control over sort order while maintaining strong TypeScript typing.

## Basic Usage

```typescript
import { NumericSort } from "inferred-types/types";

// Basic ascending sort (default)
type Ascending = NumericSort<[3, 1, 4, 2]>;
//   ^? [1, 2, 3, 4]

// Descending sort
type Descending = NumericSort<[3, 1, 4, 2], { order: "DESC" }>;
//   ^? [4, 3, 2, 1]

// Preserve original order
type Natural = NumericSort<[3, 1, 4, 2], { order: "Natural" }>;
//   ^? [3, 1, 4, 2]
```

## Options

The `NumericSort` utility accepts an options object with the following properties:

### `order`: Sort Direction

- **`"ASC"`** (default): Ascending order (1, 2, 3...)
- **`"DESC"`**: Descending order (3, 2, 1...)  
- **`"Natural"`**: Preserves original array order

```typescript
type Asc = NumericSort<[5, 2, 8], { order: "ASC" }>;
//   ^? [2, 5, 8]

type Desc = NumericSort<[5, 2, 8], { order: "DESC" }>;
//   ^? [8, 5, 2]

type Natural = NumericSort<[5, 2, 8], { order: "Natural" }>;
//   ^? [5, 2, 8]
```

### `start`: Pin Elements to Beginning

Pin specific elements to the start of the sorted array. Elements are pinned in the order specified.

```typescript
// Pin single element to start
type StartSingle = NumericSort<[5, 2, 8, 1], { start: 8 }>;
//   ^? [8, 1, 2, 5]

// Pin multiple elements to start
type StartMultiple = NumericSort<[5, 2, 8, 1], { start: [8, 2] }>;
//   ^? [8, 2, 1, 5]
```

### `end`: Pin Elements to End

Pin specific elements to the end of the sorted array. Elements are pinned in the order specified.

```typescript
// Pin single element to end
type EndSingle = NumericSort<[5, 2, 8, 1], { end: 2 }>;
//   ^? [1, 5, 8, 2]

// Pin multiple elements to end
type EndMultiple = NumericSort<[5, 2, 8, 1], { end: [8, 5] }>;
//   ^? [1, 2, 8, 5]
```

### Combining `start` and `end`

You can use both `start` and `end` options together:

```typescript
type Combined = NumericSort<[5, 2, 8, 1, 9], { start: 8, end: 2 }>;
//   ^? [8, 1, 5, 9, 2]

// With Natural order - only pinning applied
type NaturalCombined = NumericSort<[5, 2, 8, 1, 9], { 
  order: "Natural", 
  start: 8, 
  end: 2 
}>;
//   ^? [8, 5, 1, 9, 2]
```

### `offset`: Sort by Object Properties

When working with container objects, use `offset` to specify which property to sort by:

```typescript
type Data = [
  { id: "a", value: 3 },
  { id: "b", value: 1 },
  { id: "c", value: 2 }
];

type SortedByValue = NumericSort<Data, { offset: "value" }>;
//   ^? [
//        { id: "b", value: 1 },
//        { id: "c", value: 2 },
//        { id: "a", value: 3 }
//      ]

// Natural order preserves original positions
type NaturalOffset = NumericSort<Data, { 
  offset: "value", 
  order: "Natural" 
}>;
//   ^? [
//        { id: "a", value: 3 },
//        { id: "b", value: 1 },
//        { id: "c", value: 2 }
//      ]
```

## Working with Mixed Types

`NumericSort` handles both number literals and numeric string literals:

```typescript
type Mixed = NumericSort<[3, "1", 4, "2"]>;
//   ^? [1, 2, 3, 4]

type MixedWithStart = NumericSort<[3, "1", 4, "2"], { start: "1" }>;
//   ^? [1, 2, 3, 4]
```

## Duplicate Handling

The utility correctly handles duplicate values:

```typescript
type WithDuplicates = NumericSort<[3, 1, 3, 2, 1]>;
//   ^? [1, 1, 2, 3, 3]

// Duplicates are handled in start/end pinning
type DuplicatePin = NumericSort<[3, 1, 3, 2, 1], { start: 1 }>;
//   ^? [1, 1, 2, 3, 3]
```

## Edge Cases

```typescript
// Empty arrays
type Empty = NumericSort<[]>;
//   ^? []

// Single element
type Single = NumericSort<[42]>;
//   ^? [42]

// Elements not in array (ignored)
type NotFound = NumericSort<[1, 2, 3], { start: 99 }>;
//   ^? [1, 2, 3]  // 99 not found, normal sort applied

// Empty start/end arrays
type EmptyPin = NumericSort<[1, 2, 3], { start: [] }>;
//   ^? [1, 2, 3]  // Empty pin arrays ignored
```

## Performance Notes

- Uses efficient string-based numeric comparison internally
- Optimized quicksort implementation for better TypeScript compiler performance
- Natural order bypasses sorting entirely for maximum performance
- Type-safe with full TypeScript inference

## Advanced Examples

### Complex Pinning with Natural Order

```typescript
type Complex = NumericSort<[9, 7, 1, 4, 2, 6], {
  order: "Natural",
  start: [1, 7], 
  end: [9, 2]
}>;
//   ^? [1, 7, 4, 6, 9, 2]
//      ^     ^     ^  ^
//    start  mid   end
```

### Sorting Container Arrays with Offset

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

## Type Signature

```typescript
export type NumericSort<
  TValues extends readonly unknown[],
  TOpt extends NumericSortOptions = NumericSortOptions
> = // ... implementation

export interface NumericSortOptions<
  TOrder extends "ASC" | "DESC" | "Natural" | undefined = "ASC" | "DESC" | "Natural" | undefined,
  TOffset extends string | undefined = string | undefined
> {
  order?: TOrder;
  offset?: TOffset;
  start?: unknown;
  end?: unknown;
}
```