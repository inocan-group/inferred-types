# Runtime Parsing

## Take Functions

In the `/modules/runtime/src/take` directory you'll find two kinds of functions:

1. Builders

    These functions are higher level functions which are meant to _aid_ in creating good **Take Functions**. They are utilities to produce take functions rather than take functions themselves.

    Use of the builders should always start by using the `createTakeFunction(kind)` which simply requires the _caller_ to identify which variant they would like to use and then this higher level function will hand over the appropriate variant for the caller to configure.

    There are currently the following builder variants:

    - Static Block

        Used to pull an enumerated set of static strings off the HEAD of the parse string.

        - this is very useful for things which are sometimes called "Atomic" tokens in this repo (e.g., "null", "undefined", "true", etc.).
        - this can also be used for some of the `RuntimeTypeOp`'s we will have.

    - Start/End Block

        The most common builder is one which has a set of _start_ and _end_ characters which define the text block which can be removed. There are two
        sub-variants here:

        - symmetric
          - each _start_ token is matched to a discrete _end_ token
        - asymmetric
          - _start_ and _end_ tokens are unrelated; any _start_ token starts the block and any _end_ token ends the block.

        > **Note:** it may be worth noting that this symmetric and asymmetric pattern is also found in the type and runtime utilities found in the [nesting](./nesting.md) utilities.

    - While Block

        This builder defines a set of _start_ characters which not only must be matched to start but also are then checked for each following character and when the "start" characters have stopped being received this is deemed the "end" of the token block.



2. Take Functions

    A "take function" is a function whose responsibility is to:

    - take a string based "token" as input, along with a tuple of `RuntimeType`, `RuntimeTypeGroup` or `RuntimeTypeOp` definitions:
      - the input structure is a `LexerState` object:

        ```ts
        type LexerState<T,U> = {
            /** the _remaining_ part of the string token we are parsing */
            token: string;
            /** the _types_ which have been extracted from the string token so far */
            types: (RuntimeType<T,U> | RuntimeTypeGroup | RuntimeTypeOp )[];
        }
        ```

    - each Take function has it's own definition of:
      - **start** token:
        - what character or characters represent the beginning of it's scope
      - **end** token:
        - either:
          - what character or characters represent an ending state for it's scope
          - or, what character or characters -- when NOT matched -- represent the ending state
      - optionally, a Take function can define the following two traits:
        - `mustFollow` - expresses that the _end_ token is valid only when the following character _does extend_ the `mustFollow` character set.
        - `avoidFollow` - expresses that the _end_ token is valid only when the following character _does not extend_ the `avoidFollow` character set.

    - a Take function will return one of the following:

      - `false`
        - if a take function can not take from the HEAD of the token string it simply returns a _false_ value to indicate it's inability to act
      - `Err<parse/xxx>`
        - if the take function is able to _start_ lexing the token string but runs into an error during this process then it should return an error of type `parse` and a subtype with a name relating to the take functions name (e.g., `takeObject()` would emit a `parse/object` error)
      - `LexerState<T,U>`
          - if the take function is successfully able to extract it's token from the HEAD of the token string then it returns an updated `LexerState` which has a _reduced_ string token but an additional element in the `types` property.

## Parser

The runtime parser is not yet implemented fully but there is a file located at `/modules/runtime/inputTokenParser.ts` which has a skeletal implementation which should give some idea of imagined structure. This is a rough draft, however, so if better designed are thought to exist one can definitely deviate.


