# Input and Output Tokens

## Input Tokens

The two primary types representing these tokens are:

1. `InputTokensLike` - represents the broad shapes which are allowed as input tokens and enables the type system to direct users to valid input tokens
2. `InputTokens` - a _branded_ type which has been run through runtime validation to ensure that the value is indeed a valid input token.

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
