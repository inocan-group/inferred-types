# Arrays and Tuples

## Concepts and Background

### Tuple versus Array

Before we dive in let's distinguish the key characteristics of an **array** versus a **tuple**:

- An **array** is an _unbounded_ array of elements.
- A **tuple** is a _bounded_ array of elements.

This may seem simple enough and types like `string[]`, or `number[]` _being_ array's seems rather unsurprising. Even a union typed array of like `(string | number)[]` would clearly represent an array to most folks.

These arrays have _any_ number of elements in them. So at "design time" we really known nothing about the length of this array and if you were to check the "length" property you'd get the wide type of `number`.

Now what might not be as clear to folks is that a type such as that below is also an array not a Tuple:

```ts
type Something = [string, number, ...boolean[]];
```

- at design time we _know_ that it must contain at least two elements (a string and a number)
- but after that it is fully _unbounded_ with any length of boolean values making it an array

Now what about this type:

```ts
type SomethingElse = [ string, number ] | [ string, number, number ];
```

This is more of a gray zone.

- If you were to check the length of this type you'd find that it is the union type of `2 | 3`. - So it doesn't have a **single** fixed length but it does have an _enumerable_ number of fixed lengths.
- In this case at design time we know that the variable will have 1 of two lengths and we know all the possible _type variants_ at this time.

### Readonly versus Not

This is a tricky topic in part because Javascript started without types and Typescript has some quirkiness sometimes.

- our runtime functions will gain a lot more narrowness/specificity if we take in if we express them as _readonly_ even if their being **truely** readonly is not really a concern

## Type Utilties

### `Arr<T>` Type Utility

Create an Array type.

```ts
// readonly unknown[]
type Base = Arr;
// readonly string[]
type Str = Arr<string>;
// readonly [unknown, ...unknown[]]
type Explicit = Arr<unknown, { min: 1, readonly: true }>;
// [string, string, ...string[]]
type Explicit = Arr<string, {min: 2}>;
type Explicit2 = Arr<string, 2>;
```

The first two examples may not be all that useful but the

### `Tuple<T>` Type Utility

Create a Tuple type.

```ts
// readonly [unknown, unknown, unknown, unknown]
type Four = Tuple<4>;
// readonly [string, string, string, string]
type Str = Tuple<4, string>;
// readonly [number] | readonly [number, number]
type VarLen = Tuple<1|2, number>;
// readonly [number]
//    | [number, number]
//    | [number, number, number]
//    | [number, number, number, number]
type Range = Tuple<[1,4], number>;

// readonly [(string | number), (string | number)]
type Union = Tuple<2, number | string>;
// readonly [ string, number ] | [ string, number, boolean ]
type OptLast = Tuple<0|1, [string, number, boolean]>
```

### `MultiArrayType<T>` Type Utility

This type helps us unwrap multi-dimensional arrays to understand what the underlying data type is.

```ts
type Data = Array<Array<Array<number>>>;
// number
type Underlying = MultiArrayType<Data>;
```

### `TypeReplace` Type Utility

Though the `Replace` utility can be used on strings, numbers, and Objects, it can also be used with tuples and arrays only for those types _known_ at design time.

```ts
// [ "foo", `${number}`, true ]
type Changed = TypeReplace<["foo", 42, true], number, `${number}`>
```

Note that the `replace()` runtime utility will be able to ensure both runtime and design time types are changed.
