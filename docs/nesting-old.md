# Nesting

We have a number of runtime and design-time utilities which help you deal with implicitly _nested_ structures which are "typed" as string literals.

## Nesting Configuration

The runtime function `createNestingConfig()` and the types `Nesting`, `NestingKeyValue`, and `NestingTuple` are all about making sure you can configure you're nesting rules to what you need.

### Types

> source: `/modules/types/src/domains/nesting.ts`

The `Nesting` type is just a union of the two variants of configuration you can choose from:

- `NestingKeyValue<T>`

    This type of configuration sets you up with a symmetric group of _opening_ and _closing_ tags by allowing you pass in a dictionary object where:

    - the **keys** represent the _opening_ characters
    - the **values** are the _closing_ characters

- `NestingTuple<T>`

    This variant of configuration is a tuple of the structure:

    ```ts
    [ open: string, close: string | undefined ]
    ```

    - The **first element** references the _opening_ characters and typically is a union of string characters.
    - The **second element** can be:
      - a union of _closing_ characters
        - this creates both _opening_ and _closing_ characters like the `NestingKeyValue<T>` variant
        - but instead of having a `1:1` relationship of opening/closing pairs, this configuration is a `M:M` mapping where _any_ of the closing characters can close any of the starting characters.
      - an `undefined` value
        - when the second parameter is left _undefined_ the behavior shifts
        - all opening characters are used to start the matching process
        - and the matches _end_ comes when the first character is _not_ an opening character.
        - one use case for this could be matching on numeric characters (as a "for instance")

Of these two available configuration variants, the `NestingKeyValue<T>` is the more common and is used to form the `DefaultNesting` type which other utilities can use as a sensible default setting.

### Runtime Configuration

The runtime provides the `createNestingConfig()` which makes creating a configuration quite simple and type safe.

Ultimately, this function allows you to choose your configuration one of three ways:

1. KeyValue Definition

    If you start by creating an object with the `{` character you'll move into KeyValue definition. This just sets up a `NestingKeyValue` configuration.

2. Tuple Definition

    If you start by creating a tuple with the `[` character you'll move into configuring a `NestingTuple<T>` type.

3. Named Defaults

    There are a number of sensible defaults which are provided with string names:

    - `default` / `brackets`
      - this will give you the aforementioned `DefaultNesting` type which bring all bracket characters into scope as opening and closing characters (e.g., `{ → }`, `[ → ]`, `( → )`, `< → >`)
      - there is no difference between using `default` or `brackets`
    - `quotes`
      - this will give you quote characters as matched pairs
      - `" → "`, `' → '`, '` → `'
      - so in essence whatever you quote character you _start_ with you will _end_ with.

## Utilities using Nesting

The following utilities use nesting to provide more contextual parsing;

- [`retainUntil__Nested()`](./sub-strings.md)
- [`nestedSplit()`](./splits-and-joins.md)


---

## Other Docs

- [README](../README.md)
- [Filter and Compare](./filter-and-compare.md)
- [Input Tokens](./input-and-output-tokens.md)
- [Networking](./networking.md)
- **String Literals**
  - [Split and Join](./splits-and-joins.md)
  - [String Casing](./string-casing.md)
  - [sub-strings](./sub-strings.md)
- [Type Guards](./type-guards.md)
- [Metrics](./metrics.md)
- **Nesting** _(you are here)_
