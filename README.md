# Inferred Types

A collection of Typescript utilities which try to preserve as much strong and narrow typing as is possible. The repo's `src/` directory ia broken into a set of **runtime** utilities as well as pure **design-time** type utilities.

All utilities are tested for runtime and design-time correctness.

Below you'll find a cursory set of examples of both _type_ and _runtime_ utilities which are provided. For a complete list always refer to the fully typed symbols exported from this repo or the tests (both runtime and type tests) which should describe expected behavior.

## Type Utilities

### String Literals

1. Change casing:

    - use `PascalCase<T>`, `CamelCase<T>`, `SnakeCase<T>`, and `KebabCase<T>` to convert a string to a particular string naming convention.
    - ensure the _leading_ or _trailing_ part of a string is known:

        ```ts
        import type { EnsureLeading } from "inferred-types";
        // "start-${string}"
        type T1 = EnsureLeading<string, "start-">;
        // "start-with"
        type T2 = EnsureLeading<"start-with", "start-">;
        ```

        - you can also use `EnsureTrailing` for the end of the string
        - use `StripLeading`/`StripTrailing` to perform the opposite functionality

2. Work with string length:

    ```ts
    // 5
    type L = StrLen<"hello">;
    ```

3. Concatenate strings:

    ```ts
    // "Hello world"
    type C = Concat<["Hello ", "world"]>;
    // "one, two, three"
    type J = Join<["one", "two", "three"], ", ">;
    ```

4. Repeat a character a given number of times:

    ```ts
    // "1111"
    type N = Repeat<"1", 4>;
    ```

### Object / Dictionaries

1. Based on an object's entity values:

    Assume a base type of `Obj`:

    ```ts
    type Obj = {
        n1: number;
        n2: 2;
        n3: 3;
        success: true;
        s1: string;
        s2: "hello";
    }
    ```

    We can get a union of string literals representing the _keys_ on the object whose value _extends_ some value:

    ```ts
    import type { KeysWithValue, KeysWithoutValue } from "inferred-types";
    // "s1" | "s2"
    type S = KeysWithValue<Obj, string>;
    // "success" | "n1" | "n2"
    type N = KeysWithoutValue<Obj, string>;
    ```

    > though less used, you can also use `KeysEqualValue` and `KeysNotEqualValue` for equality matching

    If you'd prefer to mutate the object's type rather than just identify the _keys_ which extend a value you can do this with: `WithValue` and `WithoutValue`:

     ```ts
     import type { WithValue, WithoutValue } from "inferred-types";
     // { s1: string; s2: "hello" }
     type S = WithValue<Obj, string>;
     // { success: true; n1: number; n2: 2; n3: 3 }
     type N = WithoutValue<Obj, string>;
     ```

## Runtime Utilities

### String Literals

Many runtime utilities matchup well to their _type utility_ siblings. A good case in point is in converting a variable to a standardized naming convention. Whereas the type utility only changes the type, the runtime utility will ensure both runtime value and type are changed:

```ts
import { toCamelCase, toSnakeCase } from "inferred-types";

// "camelCase"
const camel = toCamelCase("camel-case");
// "snake_case"
const snake = toSnakeCase("snake-case");
```

You can also leverage the `pluralize()` function to change a variable to the plural version of the word (type and runtime value):

```ts
// "people"
const people = pluralize("person");
```

Also the common operations of `split` and `join` are supported as well:

```ts
// ["one","two","three"]
const parts = split("one, two, three", ", ");
// "one, two, three"
const joined = join(parts, ", ");
```

You can also ensure that a given string _is_ or _is not_ included in a string literal:

```ts
// "bar"
const bar = stripLeading("foobar", "foo");
const bar2 = stripLeading("bar", "foo");
// "foobar"
const foobar = ensureLeading("bar", "foo");
const foobar2 = ensureLeading("foobar", "foo");
```
