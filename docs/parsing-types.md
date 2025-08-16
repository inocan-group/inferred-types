# Parsing Types

In this repo we have two systems for parsing Typescript types from a string. Why two? Well one for the runtime system and one for the type system.

## The Goal

The goal is to be able to parse a string like this:

- `true | { status: boolean, message: string }`

into the **type** which this string represents.

## The Benefits

- being able to be "type aware" at runtime when we need to
- provide the tools to have your runtime library's let people define _types_ (versus just _values_).
- allows preservation -- or reconstitution -- of very narrow types
- allows serialization of types and better reuse across repos

## The Type System

In this repo we refer to string tokens like `true | { status: boolean, message: string }` as **Input Tokens** and the primary type utility you need to be aware of is the `FromInputToken<T>` parser which converts these tokens into a _type_.

```ts
// string | number
type Union = FromInputToken<"string | number">;
// "foo" | "bar" | 42
type LiteralUnion = FromInputToken<"String(foo) | String(bar) | Number(42)">;
```

The source file for `FromInputToken` can be found here:

- `/modules/types/src/runtime-types/type-defn/FromInputToken.ts`

Looking at the implementation we can see that the mechanism that the type system uses to achieve this goal is:

- uses a set of **take** based utilities which try to find a particular "type category" and covert it into a type.
- each time the parse calls a take function it uses the `Trim<T>` utility to remove meaningless whitespace on the two extremities of the parse string
- each take function looks at the HEAD of the string being parsed to find it's token category
  - when a given take function sees it particular type category at the HEAD of the parse string it converts it to a type and drops the type onto the stack
  - when the take functions _doesn't_ see it's type category it returns the type `Unset` as a safe token to say "I can't do anything"

### Typescript's Type Structure

Some aspects of token-to-type conversion are quite straight forward and have a static mapping:

  - "string" -> string
  - "number" -> number
  - etc.

We refer to these simple tokens as **Atomic Types**. They have a single mapping with no variance.

The next easiest to discuss are what we call **Literal Types** and are an infinite set of _string_ and _numeric_ literals. Things like:

- `foo`, `bar`, `baz`
- `42`, `99`, etc.

> **Note:** we treat `boolean`, `true`, and `false` as "atomic tokens" as they enumerable and no variant options.

The other _categories_ fit into the following groups:

1. Containers

    - `Map`, `Set`, `WeakMap`
    - dictionary key/value objects
    - arrays and tuples
      - we distinguish arrays and tuples not strictly on whether they have a _fixed_ number of elements but instead on whether their _type_ is defined at the positional level versus a type for the entire array:
        - array:
          - `(string | number | boolean)[]`
          - `Array<string | number | boolean>`
        - tuple:
          - fixed length: `[string, number, boolean]`
          - variable length `[string, number, ...boolean[]]`

2. Functions

    - All functions have _parameters_ and a _return type_
    - Generator functions also have a _yield_ and _next_ type which must be considered
    - both normal and generator functions also have enumerated variance on:
      - **sync** _vs_ **async**
      - **named** _vs_ **anonymous**
    - as well as an unbounded variance on key/value pairs stored at the same root as the function

3. Set Operations

    - Typescript provides two set operations: _union_ and _intersection_.
    - These unary ops are expressed as the `|` and `&` characters respectively
    - These operations must have a _type_ on both sides of them but can strung together in any number of op/type pairings.
      - valid: `[type, op, type, op, type]`
      - invalid: `[type, op, type, op]`

4. Groups

    - Typescript allows parenthesis to act as a grouping construct
    - Their main utility is establishing transitory rules for combining sets of types together in a reasonable fashion:
      - you can take this union `42 | 99 | "foo" | "bar"`
      - and represent it identically like `(42 | 99) | ("foo" | "bar")`
        - here, there is no _type_ rationale for grouping these these items but it is legal
      - however, imagine the type `(string | number | boolean)[]`
        - here, we have a strong use of the grouping function
        - the parentheses create a union type _first_
        - and then this union is applied to the `[]` symbol for array
        - NOTE: this requires that the `[]` operator to be _backward_ looking and is why many feel the `Array<a|b|c>` syntax is possibly better.

## The Runtime System

The runtime's system is not fully built out yet but is imagined to operate similarly to this:

```ts
// RuntimeType<"string | number", string | number>
const myType = fromInputToken("string | number");
```

The `RuntimeType` type represents a key/value surface that provides a runtime with:

- `token` property - a string literal of the "token" used
- `type` property - the _type_ represented by the token
- `doesExtend(val)` property - a type guard which validates whether a given `val` passed in _extends_ the type represented by the token

### What Is Done?

There are utilities which have been already built on the runtime side which should aid us in completing this functionality:

1. Nesting aware type utilities
    - `nesting("split" | "retainUtil")` is a higher order function which provides access to the _nesting-aware_ functions in the runtime. Right now these functions are:
      - `retainUntil__Nested()`
      - `nestedSplit()`
2. Take Functions
    - Builders
      - We've create builder functions to aid the quick development of high quality _take_ functions
        - Static
          - static take functions will be useful for Atomic tokens as it's intended to look for static/non-variant tokens and do a one-for-one replacement onto the _type stack_
        - Start/End
          - these take functions have a defined set of start/end characters which book-end the token but they must be _nesting aware_ so that they don't mistakenly find the end token inside another _contained_ type definition.
        - While
          - these take functions have a valid set of characters defined and match on these characters until an invalid character is encountered
          - this would be highly effective for numeric literals as we can simply:
            - start when a valid prefix character (e.g., whitespace, `|`, `&`, and `)` characters) is followed by a numeric character
            - end when the stream of numeric characters ends
    - Take Instances
      - `takeAtomicToken()` - extracts an **Atomic** token
      - `takeExplicitStringToken()` - extracts a string literal like `String(foo)`
      - `takeQuotedStringToken()` - extracts a string literal like `"foo"`

    For more information see: [Take Functions](./take-functions.md)

3. Parser Shell

    - the `inputTokenParser()` function exists at `/modules/runtime/src/runtime-types/inputTokenParser.ts`
    - it currently is just a shell of a function; in essence a TODO item
    - conceptually, it's functional goal is:
      - pass through the "token string" left to right once
      - this should result in either:
        - a single element item _type_
        - a grammar of alternating _type_ and _operation_ tokens
          - if the pattern isn't [type, operation, type, ...[type, operation]] then we return an error
          - if the tokens are valid structurally we need to test that all _operations_ (either intersection or union) are the SAME
            - if not we return an error
            - if they are the same Op then we just wrap the _underlying_ types into the set operation
