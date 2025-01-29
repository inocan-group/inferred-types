# Find and Replace Operations

## Type Utilities

- `Replace` and `ReplaceAll`

    These operations do sort of what you'd expect and are leveraged by other type utils in this library to address more complex type changes.

    ```ts
    // bar is an abstract placeholder but we love foo none-the-less
    type FooToBar = Replace<
      "foo is an abstract placeholder but we love foo none-the-less",
      "foo", "bar"
    >;

    // bar is an abstract placeholder but we love bar none-the-less
    type FooToBar = ReplaceAll<
      "foo is an abstract placeholder but we love foo none-the-less",
      "foo", "bar"
    >;
    ```

- `ReplaceFromTo` and `ReplaceAllFromTo`

    These mirror the functionality of `Replace` and `ReplaceAll` respectively but they offer the ability to pass in an array of [`FromTo`](../modules/types/src/type-conversion/FromTo.ts) objects which describe the various transforms you would like to take place.

    ```ts
    // "foo-is-an-abstract-placeholder-but-we-love-foo-none-the-less"
    type FooToBar = ReplaceAll<
      "foo is an abstract placeholder but we love foo none-the-less",
      "foo"
      [
        { from: "foo"; to: "bar" },
        { from: " "; to: "-" }
      ]
    >;
    ```

- `RenameKey` and `ReplaceKeys`

    Both **RenameKey** and **MapKeys** utilities are designed to replace the keys in an object with alternatives.

  - `RenameKey<TObj,TFrom,TTo, TAll = true>`

      This is the more basic of the two and simply looks for a key called `TFrom` and replaces it with `TTo`.

  - `MapKeys<TObj,TMap,TAll = true>`

      The **MapKeys** utility can map a _set_ of keys to another discrete set of keys. This is done the generic `TMap` extending the `FromTo[]` type:

      ```ts
      type Replacements = [
        { from: "foo"; to: "bar" },
        { from: "bar"; to: "baz" },
        { from: "baz"; to: "bax" }
      ];
      type Obj = { foo: 1; bar: 2; baz: 3 };

      // { bar: 1; baz: 2; bax: 3 }
      type NewObj = MapKeys<Obj, Replacements>;
      ```
