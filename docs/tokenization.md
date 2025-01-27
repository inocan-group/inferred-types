# Tokenization

This library provides the following primitives for creating a tokenization system:

## Runtime System

- `createTokenizer(start, end, delimiter)`

    This sets up the basic semantics of a tokenizer by providing the `start` and `end` delimiters of a token as well as an internal `delimiter` which can be used to provide variants of base tokens.

    ```ts
    const tokenizer = createTokenizer("<",">", "::");

    /** <string> */
    const t1 = tokenizer("string");

    /** <string::foo::bar> */
    const t2 = tokenizer("string","foo","bar");

    // readonly [ "string", ["foo", "bar"]]
    const serial = t2.serialize();
    ```

- `createTypeTokenizer(start, end, delimiter)`

    This sets up a tokenizer but one specifically geared to create _type_ tokenization.

    ```ts
    const tokenizer = createTypeTokenizer("<",">", "::");


    const t1 = tokenizer("string", t => t.string(),{

    });


    ```

## Type System
