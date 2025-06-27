# Tokenization

This library provides the following primitives for creating a tokenization system:

## Runtime System

### `createToken(name, params,parser)`

A token's responsibility it to:

- provide it's name
- provide it's expectation about _parameters_ that might provide variants of the token
- a "base type" which should represent the widest native which it is based off of
- provide a parser function which will provide the discrete type for the token with all parameters passed in
- provides a _type guard_ for testing a value to be of this token's type

### `createTokenGrammar()`

A `TokenGrammar` acts as an _adaptor_ and helps to conform any set of tokens to work as part of a `Grammar`.

A `TokenGrammar` provides the `start`, `end` and `separator` text which will be used to mark the individual tokens. It also provides encoder/decoder functions for parameter values which ensure that these values do not interfere with the Grammar's own markers.

### `createGrammar(tg, ...tokens)`

A `Grammar` is defined by:

- a `TokenGrammar` to provide it's basic shape
- a set of `Token`'s which represent it's vocabulary

We'll create a simple example of creating a grammar here:

```ts
const tg = createTokenGrammar(
  "AngleBrackets",  // name
  "<<",             // start
  ">>",             // end
  "::",             // separator
  encode: { // note this is the default encoder/decoder config
      ["<<"]: "^(start)",
      [">>"]: "^(end)",
      ["::"]: "^(sep)",
      [" "]: nbsp
  }
)
const grammar = createGrammar(tg, token1, token2, token3, ...);
```

With these two elements combined the Grammar is able to provide the following:

- a _tokenizer_ which aids producing valid tokens from a type

    ```ts
    const { tokenizer } = grammar;

    // <<string>>
    const t1 = tokenizer("string");
    // <<string::foo::bar>>
    const t2 = tokenizer("string", "foo", "bar");
    ```

- a `isToken()` type guard, and a `asType()` typed token producer

    ```ts
    const {isToken} = grammar;
    // <<string::foo::bar>>
    const token = isToken("<<string::foo::bar>>" as unknown as "foo" | "bar");
    // "foo" | "bar"
    const typed = asType("<<string::foo::bar>>");
    ```

## Type System
