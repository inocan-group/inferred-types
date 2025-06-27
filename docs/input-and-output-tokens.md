# Input and Output Tokens

## Input Tokens

The two primary types representing these tokens are:

1. `InputTokensLike` - represents the broad shapes which are allowed as input tokens and enables the type system to direct users to valid input tokens
2. `InputTokens` - is a _branded_ type which has been run through runtime validation to ensure that the value is indeed a valid input token and that it has been converted to a string variant of `InputTokensLike`

**Notes:**

- while it is encouraged for input tokens to be **string** representations of types, there are other non-string representations which are allowed for type convenience.
- while you _can_ use non-string representations, there should always be a _string_ representation to represent any type.

### `FromInputToken` - from Token to Type

- source: `modules/types/runtime-types/type-defn/FromInputToken.ts`
- tests: `tests/runtime/FromInputToken.test.ts`

The `FromInputToken<T>` utility is responsible for evaluating a token and converting that into the "type" the token represents (or an Error if it's not a valid token).

```ts
// "foo" | "bar" | "baz"
type union = FromInputToken<`String(foo) | String(bar) | String(baz)`>
// { id: number; name: string }
type obj = FromInputToken<`{ id: number, name: string }`>;
// Non-string token
// { id: number; name: string }
type obj = FromInputToken<{ id: "number", name: "string" }>:
```

The big part of the way that `FromInputToken<T>` works is by _taking_ the first recognizable part of the string token, classifying it, and then processing the remaining part of the string literal until there is no string literal left.

There are type utilities such as:

- IT_TakeAtomic (source: `/modules/types/src/runtime-types/type-defn/input-tokens/atomics.ts`)
- IT_TakeArray (source: `/modules/types/src/runtime-types/type-defn/input-tokens/array.ts`)
- IT_TakeFunction (source: `/modules/types/src/runtime-types/type-defn/input-tokens/functions.ts`)
- IT_TakeGenerator (source: `/modules/types/src/runtime-types/type-defn/input-tokens/generators.ts`)
- IT_TakeMap (source: `/modules/types/src/runtime-types/type-defn/input-tokens/maps.ts`)
- etc.

They are each responsible for taking their target structure (e.g., a function, a scalar, a Map, etc.) from the front of the string. They do this where there pattern exists or return `Unset` if they don't see the pattern they're responsible at the front of the string.

The approaches each one takes is moderately varied but as I've learned how to do it better I try to keep them consistent but there is almost surely some more generalization that could benefit these various utilities.

### The Runtime System

Like many things in this repo, we have a pure _type story_ with strong type utilities but we then also have a runtime counterpart. Input Tokens are no exception.

#### Using Types in Runtime

A useful use case that engages the runtime system but really relies entirely on the type system is

```ts
import { fromInputToken } from "inferred-types";
// boolean[]
const t = fromInputToken("Array<boolean>");
// string | number
const u = fromInputToken("string | number");
```

Here we've changed the _type_ of `t` to be the type the token -- `Array<boolean>` -- refers to. Similarly the _type_ of `u` is seen as `string | number`.

By having this capability, you allow yourself the ability to ask at runtime for someone to define a "type" which can be quite handy.

#### Runtime Maturity

The runtime is less mature than the type utilities but we'd like to address this.

Needed Features:

- `doesExtend(token)(val)`
  - this would provide a highly valuable type-guard which bring the _extends_ concept to the runtime.
  - it is has a starting implementation but it's currently hitting the dreaded `Type instantiation is excessive and possibly infinite`.
- `toStringToken()`
  - This is intended to take non-string variants of an `InputTokenLike` and get the runtime value converted to a string.
  - It does exist but I'm not fully confident in it yet and it needs a bunch of unit tests to prove it works in all situations.
- I'm wondering if there might be a parsing function needed to convert a string token to a type; we seem to be ok with just using the type utilities but I'm thinking there may be a more type efficient manner to do this in the runtime.


## Output Tokens

This is future work and we don't need to focus on this for now.
