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

A key-value mapping where keys are opening characters and values are either:

- **Simple**: closing characters (string)
- **Hierarchical**: tuple of `[exit, nextLevel]` where `nextLevel` is the nesting config for inside

```typescript
// Simple form
type SimpleNesting = {
  "{": "}",
  "(": ")",
  "[": "]",
  "<": ">"
}

// Hierarchical form
type HierarchicalNesting = {
  '"': ['"', {}],              // quotes - no nesting inside
  "(": [")", { "[": "]" }]     // parens - only brackets nest inside
}
```

#### 2. NestingTuple

A tuple `[start, end]` or `[start, end, nextLevel]` for more complex scenarios:

```typescript
// Simple tuple (backward compatible)
type SimpleTuple = [
  readonly string[], // start characters
  readonly string[] | undefined // end characters (undefined means same as start)
]

// Hierarchical tuple (new)
type HierarchicalTuple = [
  readonly string[], // start characters
  readonly string[] | undefined, // end characters
  Nesting // next-level nesting config (optional)
]
```

### Named Configurations

Six built-in configurations are available:

**Deep Nesting (Recursive):**

- **`"default"` / `"brackets"`**: Includes `{}`, `[]`, `()`, `<>` - nesting applies at all levels
- **`"quotes"`**: Includes `"`, `'`, `` ` `` - quotes nest at all levels
- **`"brackets-and-quotes"`**: Combines brackets and quotes - both nest at all levels

**Shallow Nesting (Non-Recursive):**

- **`"shallow-brackets"`**: Brackets recognized at level 0 only - no nesting inside brackets
- **`"shallow-quotes"`**: Quotes recognized at level 0 only - no nesting inside quotes
- **`"shallow-brackets-and-quotes"`**: Both recognized at level 0 only - no nesting inside either

### Hierarchical Nesting Configuration (NEW)

The library now supports **hierarchical nesting** where each nesting level can specify different token configurations for the next level. This enables sophisticated parsing scenarios and eliminates special-case handling.

#### Hierarchical NestingKeyValue

Values can be either simple strings or tuples `[exit, nextLevel]`:

```typescript
// Simple form (backward compatible)
type Simple = { "(": ")" }

// Hierarchical form - empty config inside quotes (shallow nesting)
type ShallowQuotes = {
  '"': ['"', {}]  // Inside quotes, no further nesting
}

// Hierarchical form - different tokens at different levels
type MultiLevel = {
  "(": [")", { "[": "]" }]  // Inside parens, only brackets nest
}
```

#### Hierarchical NestingTuple

Tuples can include an optional third element for next-level configuration:

```typescript
// Simple tuple (backward compatible)
type SimpleTuple = [["(", "["], [")", "]"]]

// Hierarchical tuple - specify next level config
type HierarchicalTuple = [
  ["(", "["],           // start tokens
  [")", "]"],           // end tokens
  { "{": "}" }          // next level config (only braces inside parens/brackets)
]
```

#### Shallow Nesting Configurations

The library provides three pre-configured shallow nesting strategies that are perfect for common use cases:

**SHALLOW_BRACKET_NESTING**

```typescript
import { SHALLOW_BRACKET_NESTING } from "inferred-types/constants";
// Equivalent to:
{
  "(": [")", {}],
  "[": ["]", {}],
  "{": ["}", {}],
  "<": [">", {}]
}
```

**SHALLOW_QUOTE_NESTING**

```typescript
import { SHALLOW_QUOTE_NESTING } from "inferred-types/constants";
// Equivalent to:
{
  '"': ['"', {}],
  "'": ["'", {}],
  "`": ["`", {}]
}
```

**SHALLOW_BRACKET_AND_QUOTE_NESTING**

```typescript
import { SHALLOW_BRACKET_AND_QUOTE_NESTING } from "inferred-types/constants";
// Combines both shallow bracket and shallow quote nesting
```

**When to Use Shallow vs. Deep Nesting:**

Use **shallow nesting** when:

- You only care about the root level (e.g., splitting CSV with quoted values)
- You want to treat nested content as opaque/literal
- You want to avoid "unbalanced" errors from content inside delimiters
- Performance is critical (shallow configs are slightly faster)

Use **deep nesting** when:

- You need to parse multiple levels of structure
- You're building AST-like representations
- You need to validate balanced delimiters at all levels

**Examples:**

```typescript
// Shallow: Split CSV with quoted commas
type CSV = NestedSplit<'name,"last, first",age', ",", "shallow-quotes">;
// Result: ["name", '"last, first"', "age"]
// The comma inside quotes is NOT a split point

// Deep: Same with regular quotes (would fail or split incorrectly)
type CSVDeep = NestedSplit<'name,"last, first",age', ",", "quotes">;
// Less predictable - quotes nest inside quotes, causing issues

// Shallow: Split function calls at root level only
type Calls = NestedSplit<"foo(bar(baz)),qux()", ",", "shallow-brackets">;
// Result: ["foo(bar(baz))", "qux()"]
// Inner parentheses don't affect split
```

#### Use Cases for Hierarchical Nesting

**Shallow Nesting**: Parse quotes without nesting inside them

```typescript
// Split on commas, but not inside quotes
type Result = NestedSplit<'a,"b,c",d', ",", { '"': ['"', {}] }>;
// Result: ["a", '"b,c"', "d"] - comma inside quotes is preserved
```

**Multi-Level Parsing**: Different tokens at different levels

```typescript
type Config = {
  "(": [")", { "[": ["]", {}] }]  // parens -> brackets -> nothing
}
type Result = NestedSplit<"fn(arr[a,b])", ",", Config>;
// Splits respect both parentheses and brackets hierarchy
```

**Language Parsing**: Model actual language nesting rules

```typescript
type JSXLike = {
  "<": [">", { "{": "}" }]  // JSX tags can contain expressions in braces
}
```

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

### nesting(config)

Higher-order function that creates an API surface for working with nesting. Returns an object with `split()` and `retainUntil()` methods that use your specified nesting configuration.

```typescript
import { nesting } from "inferred-types/runtime";

// Using named configurations
const api = nesting("shallow-quotes");

// Use the returned API
const result1 = api.split('a,"b,c",d', ",");
// Result: ["a", '"b,c"', "d"] - comma inside quotes is protected

const result2 = api.retainUntil("foo'bar'baz", "z");
// Result: "foo'bar'baz" - finds 'z' at root level

// With custom hierarchical config
const customApi = nesting({
  "(": [")", {}],  // Shallow parens
  "[": "]"         // Deep brackets
});

customApi.split("a,(b,c),d", ",");
// Result: ["a", "(b,c)", "d"]
```

**Supported Named Configurations:**

- `"default"` / `"brackets"` - All bracket types with deep nesting
- `"quotes"` - All quote types with deep nesting
- `"brackets-and-quotes"` - Combined brackets and quotes with deep nesting
- `"shallow-brackets"` - Brackets with shallow nesting (NEW)
- `"shallow-quotes"` - Quotes with shallow nesting (NEW)
- `"shallow-brackets-and-quotes"` - Combined with shallow nesting (NEW)

**When to use `nesting()` vs direct functions:**

- Use `nesting()` when you need to reuse the same configuration multiple times
- Use `nesting()` for cleaner code when working with custom hierarchical configs
- Use direct functions (`nestedSplit`, `retainUntil__Nested`) for one-off operations

```typescript
// Reusable API - better when used multiple times
const csv = nesting("shallow-quotes");
const data1 = csv.split('name,"last, first",age', ",");
const data2 = csv.split('title,"description, long",price', ",");

// Direct call - better for one-off operations
const data3 = nestedSplit('one,two,three', ",", "shallow-quotes");
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
