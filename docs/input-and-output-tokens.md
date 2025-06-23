# Input and Output Tokens

## Input Tokens

The two primary types representing these tokens are:

1. `InputTokensLike` - represents the broad shapes which are allowed as input tokens and enables the type system to direct users to valid input tokens
2. `InputTokens` - is a _branded_ type which has been run through runtime validation to ensure that the value is indeed a valid input token and that it has been converted to a string variant of `InputTokensLike`

### `FromInputToken` - from Token to Type

- source: `modules/types/runtime-types/type-defn/FromInputToken.ts`
- tests: `tests/runtime/FromInputToken.test.ts`

The `FromInputToken<T>` utility is responsible for evaluating a token and converting that into the "type" the token represents (or an Error if it's not a valid token).

```ts
// "foo" | "bar" | "baz"
type union = FromInputToken<`String(foo) | String(bar) | String(baz)`>
// { id: number; name: string }
type obj = FromInputToken<`{ id: number, name: string }`>;
```

The big part of the way that `FromInputToken<T>` works is by _taking_ the first recognizable part of the string token, classifying it, and then processing the remaining part of the string literal until there is no string literal left.

There are type utilities such as:

- IT_TakeArray
- IT_TakeAtomic (source: `/modules/types/src/runtime-types/type-defn/input-tokens/atomics.ts`)
- IT_TakeFunction (source: `/modules/types/src/runtime-types/type-defn/input-tokens/functions.ts`)
- IT_TakeGenerator (source: `/modules/types/src/runtime-types/type-defn/input-tokens/generators.ts`)
- IT_TakeMap (source: `/modules/types/src/runtime-types/type-defn/input-tokens/maps.ts`)
- etc.

Which

**Notes:**

- while it is encouraged for input tokens to be **string** representations of types, there are other non-string representations which are allowed for type convenience.
- while you _can_ use non-string representations, there should always be a _string_ representation to represent any type.

## Output Tokens

An output token is **always** a string literal and is as much of a direct translation from in _input token_ as is possible. The goals of an output token are to provide:

- a compact and string based and serializable representation of a type
- a string which has almost zero chance of overlapping with text/string values in the wild

### Shape Characteristics

- all output tokens take the general shape of `<<${string}>>`
- the _interior_ string literal is an **encoded** variant of the valid input token (in string form)
- encoding is done to:
  - make parsing of the token easier at both design-time and runtime
  - ensure that the string does not intersect accidentally with "text in the wild"

### Encoding and Decoding

The encoding used is done with the help of:

- at design time with `SafeEncode` and `SafeDecode` utilities
- at runtime with the `createEncoder()` utility

The encodig strategy operates on all "string" based values and _encodes_:

- spaces
- quotation marks (single, double, and grave marks)
- and brackets (paraenthesis, square and curly brackets)
