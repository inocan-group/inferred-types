# Nesting Functionality

The **inferred-types** library provides comprehensive support for parsing and working with nested string structures through a collection of type utilities and runtime functions. This functionality is essential for handling strings that contain hierarchical structures like code, markup, or any text with paired delimiters.

## Overview

Nesting functionality allows you to:

- Parse strings into structured representations that understand nested relationships
- Split strings while respecting nesting boundaries
- Extract substrings up to specific delimiters while maintaining nesting context
- Convert between flat strings and nested data structures

## Core Types and Configuration

### Nesting Configuration Types

The library supports two primary nesting configuration approaches:

#### 1. NestingKeyValue

A key-value mapping where keys are opening characters and values are closing characters:

```typescript
type ExampleNesting = {
  "{": "}",
  "(": ")",
  "[": "]",
  "<": ">"
}
```

#### 2. NestingTuple

A two-element tuple `[start, end]` for more complex scenarios:

```typescript
type ExampleTuple = [
  readonly string[], // start characters
  readonly string[] | undefined // end characters (undefined means same as start)
]
```

### Named Configurations

Three built-in configurations are available:

- **`"default"` / `"brackets"`**: Includes `{}`, `[]`, `()`, `<>`
- **`"quotes"`**: Includes `"`, `'`, `` ` ``

### Core Data Structure

The `NestedString` type represents parsed nested content:

```typescript
type NestedString = {
  content: string;        // Text content at this level
  enterChar: string | null; // Opening character (null for root level)
  exitChar: string | null;  // Closing character (null for root level)
  children: NestedString[]; // Nested structures within this level
  level: number;           // Nesting depth (0 = root)
}
```

## Type System Utilities

### Nest<TContent, TNesting>

Parses a string into a nested structure based on nesting configuration.

```typescript
type Example = Nest<"function(param) { body }">;
// Result: Array of NestedString objects representing the parsed structure

type CustomExample = Nest<"array[index]", { "[": "]" }>;
// Only recognizes square brackets as nesting
```

### FromNesting`<TNest>`

Reconstructs the original string from a nested structure (inverse of `Nest`).

```typescript
type Original = "function(param) { body }";
type Nested = Nest<Original>;
type Reconstructed = FromNesting<Nested>;
// Reconstructed === Original (roundtrip compatibility)
```

### NestedSplit<TContent, TSplit, TNesting, TPolicy>

Splits a string by delimiters while respecting nesting boundaries. Only splits at nesting level 0.

```typescript
// Basic usage
type Result1 = NestedSplit<"foo,bar,baz", ",">;
// Result: ["foo", "bar", "baz"]

// With nesting protection
type Result2 = NestedSplit<"func(a,b), other", ",", { "(": ")" }>;
// Result: ["func(a,b)", " other"] - comma inside parentheses ignored

// Multi-character splits (enhanced feature)
type Result3 = NestedSplit<"foo and bar and baz", "and">;
// Result: ["foo ", " bar ", " baz"]
```

#### Split Policies

The `TPolicy` parameter controls how split characters are handled:

- **`"omit"`** (default): Removes split characters entirely
- **`"inline"`**: Includes split characters as separate array elements
- **`"before"`**: Prepends split character to following segment
- **`"after"`**: Appends split character to preceding segment

```typescript
type Omit = NestedSplit<"a,b,c", ",", DefaultNesting, "omit">;
// Result: ["a", "b", "c"]

type Inline = NestedSplit<"a,b,c", ",", DefaultNesting, "inline">;
// Result: ["a", ",", "b", ",", "c"]

type Before = NestedSplit<"a,b,c", ",", DefaultNesting, "before">;
// Result: ["a", ",b", ",c"]

type After = NestedSplit<"a,b,c", ",", DefaultNesting, "after">;
// Result: ["a,", "b,", "c"]
```

## Runtime Functions

### nestedSplit(content, split, nesting?, policy?)

Runtime implementation of `NestedSplit` with full type inference.

```typescript
import { nestedSplit } from "inferred-types/runtime";

// Basic splitting
const result1 = nestedSplit("foo,bar,baz", ",");
// Runtime: ["foo", "bar", "baz"]
// Type: ["foo", "bar", "baz"]

// With nesting protection
const result2 = nestedSplit("func(a,b), other", ",", { "(": ")" });
// Runtime: ["func(a,b)", " other"]
// Type: ["func(a,b)", " other"]

// Using named configurations
const result3 = nestedSplit("text 'with, comma' and more", ",", "quotes");
// Protects content within quotes
```

### retainUntil__Nested(str, find, include?, nesting?)

Extracts substring up to a specified character, but only when that character appears at nesting level 0.

```typescript
import { retainUntil__Nested } from "inferred-types/runtime";

const result = retainUntil__Nested(
  "function(param, other) { body }",
  "{",
  false, // exclude the found character
  { "(": ")", "{": "}" }
);
// Result: "function(param, other) "
// The comma inside parentheses is ignored
```

### retainUntil(content, ...find)

Simple substring extraction without nesting awareness (for comparison).

```typescript
import { retainUntil } from "inferred-types/runtime";

const simple = retainUntil("hello world", " ");
// Result: "hello"
```

### createNestingConfig(config)

Higher-order function for creating nesting configurations.

```typescript
import { createNestingConfig } from "inferred-types/runtime";

// Using named configurations
const brackets = createNestingConfig("brackets");
// Returns: { "{": "}", "[": "]", "(": ")", "<": ">" }

const quotes = createNestingConfig("quotes");
// Returns: { "\"": "\"", "'": "'", "`": "`" }

// Pass-through for custom configurations
const custom = createNestingConfig({ "[": "]", "<": ">" });
// Returns: { "[": "]", "<": ">" }
```

## Practical Examples

### Parsing Code-like Structures

```typescript
// TypeScript function signature
type FuncSig = "function doSomething(name: string, options: {debug: boolean}) { ... }";
type Parsed = Nest<FuncSig>;
// Creates structured representation understanding parameter lists and body blocks

// Splitting method calls
type MethodChain = "obj.method(a, b).other(c).final()";
type Methods = NestedSplit<MethodChain, ".", { "(": ")" }>;
// Result: ["obj", "method(a, b)", "other(c)", "final()"]
```

### Template Processing

```typescript
// HTML-like content
type Template = "<div class='container'>Hello <span>world</span></div>";
type Segments = NestedSplit<Template, " ", { "<": ">", "'": "'" }>;
// Splits on spaces but protects content within tags and quotes
```

### Configuration Parsing

```typescript
// CSS-like syntax
type Styles = "color: red; background: rgba(255, 0, 0, 0.5); margin: 10px;";
type Properties = NestedSplit<Styles, ";", { "(": ")" }>;
// Splits on semicolons but protects function calls like rgba()
```

## Error Handling

The nesting system includes comprehensive error handling:

### Unbalanced Nesting

```typescript
type Error1 = NestedSplit<"unbalanced(content", ",", { "(": ")" }>;
// Returns: Error<"unbalanced/nested-split", ...>
```

### Invalid Configurations

```typescript
type Error2 = NestedSplit<"content", ",", { "invalid": "too-long" }>;
// Returns: Error<"invalid-nesting/key-value", ...>
```

## Performance Considerations

- **Single vs Multi-character splits**: Single-character splits use optimized character-by-character processing
- **Multi-character splits**: Use pattern matching for splits longer than 1 character
- **Nesting depth**: Performance scales linearly with content length and nesting depth
- **Type complexity**: Deep nesting may approach TypeScript's recursion limits

## Integration with Other Utilities

Nesting functionality integrates seamlessly with other inferred-types utilities:

```typescript
// Combine with string manipulation
type ProcessedContent = EnsureLeading<
  NestedSplit<"path/to/file", "/", DefaultNesting>[0],
  "/"
>;

// Use with conditional types
type HasNesting<T extends string> = Nest<T> extends [NestedString]
  ? Nest<T>[0]["children"] extends []
    ? false
    : true
  : true;
```

## Testing and Validation

The nesting system includes comprehensive test coverage:

- **Roundtrip tests**: Ensure `FromNesting<Nest<T>>` equals `T`
- **Edge cases**: Empty strings, unbalanced input, complex nesting
- **Policy validation**: All split policies work correctly
- **Multi-character support**: Full compatibility with complex split patterns

This nesting functionality provides a robust foundation for parsing and manipulating structured text content while maintaining strong TypeScript typing throughout the process.
