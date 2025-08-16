# Grouping Literal _to_ Wide types into Categories

It is useful to be explicit about what we mean by "literal types" versus "wide types" and when we try to achieve this literal definition we find ourselves with some useful "in between" groups that can be useful too.

Let's review the groups this repo defines from _most_ exclusive to _least_.

## Literals

### Unit Primitives

The `IsUnitPrimitive<T>` utility provides us a way to test for the most exclusive subset of what we'll later call "literal". It includes:

- null, undefined
- literal string (not union)
- literal number (not union)
- literal bigint (not union)
- true, false
- unique symbols (not regular symbols)

### Tuple Literals

- A literal tuple is a tuple where ALL of it's _elements_ are "literal types".
- You can test for this type with the `IsLiteralTuple<T>` utility
- Literal tuples are a _subset_ of what we'll later call "literal types"
- a literal tuple must be literal in both _shape_ and _type_

### Object Literals

A literal object is an object definition which:

- **Does not** have an index signature
- Has a _finite_ and _known_ set of keys
- All _key values_ are considered "literal types"
- No functions are allowed (which _are_ a subtype of `object`)
- You can use `IsLiteralObject<T>` to test for this type

Beyond the `IsLiteralObject<T>` type we include a few boolean operators which test more specific _types_ of `object`:

- `IsLiteralDictionary<T>` - same as `IsLiteralObject<T>` but `T` must extend `Record<ObjectKey,any>`
- `IsLiteralMap<T>` - same as `IsLiteralObject<T>` but `T` must extend `Map<any,any>`
- `IsLiteralWeakMap<T>` - same as `IsLiteralObject<T>` but `T` must extend `WeakMap<any,any>`
- `IsLiteralSet<T>` - same as `IsLiteralObject<T>` but `T` must extend `Set<any>`

### Boundary Literals

- a boundary literal includes the types `any` and `never`.
- the `IsBoundaryLiteral<T>` is a boolean operator which tests for this.
- because these boundary literals are often reflective of a problem more than a type there may be times you want to treat them different than other literal subcategories.

### Literal Types

A literal type is the grouping of:

- Unit Primitives
- Tuple literals
- Object literals
- and _sometimes_ Boundary literals

You can use the `IsLiteral<T,[U]>` boolean operator to test for whether any given type fits into this exclusive category.

- by default the boundary types are **not** included
- if you want to include them you may set the `U` generic to:
    - `include-boundary` - includes both `never` and `any`
    - `include-any` - include `any` but avoid `never`
    - `include-never` - include `never` but avoid `any

## `LiteralLike` types

Beyond the pure literal types, it is often useful to define a group which includes all (or at least _almost all_) pure literals but allows in a few more members before we start calling the group "wide". We will call this `LiteralLike`.

The types from `Literals` that _exclude_ by default from `LiteralLike` are the boundary types:

- `never` - this type represents a zero inhabitant type which typically should be removed from a container or represents an error in some prior type utility
- `any` - modern typescript projects should avoid `any` like the plague it is an anti-pattern as a defined type (it still has some uses when combined with _extends_ in library code) but as a type it spells bad news.

Unless otherwise mentioned, the boundary literal types will **not** be included in `LiteralLike` types.

### Literal-like Tuples

- the `IsLiteralLikeTuple<T>` utility is used to test for a slightly widened literal tuple.
- unlike the `LiteralTuple<T>` utility which requires that `T` be literal with regard to both _type_ and _shape_ here we're focused only on shape.

For example:

```ts
type TupLike = [ string, number, "foo" | "bar" ];
// false
type T1 = IsLiteralTuple<TupLike>;
// true
type T2 = IsLiteralLikeTuple<TupLike>;
```

- the _elements_ of `TupLike` are not all literals but the _shape_ allows no variants
- no "optional" elements are allowed in this type (e.g., elements which are defined using the `?` modifier to indicate they do not have to be included)
- the "literal-like tuple" will be rolled into the `LiteralLike` type

### Literal-like Arrays

- there is a more permissive utility called `IsLiteralLikeArray<T>` which extends the set of types which `IsLiteralLikeTuple<T>` accept.
- it's main variation is that it _does_ allow variadic types so long as there are at least one (or more) fixed types defined and if that variadic tail is removed that the remaining elements are `LiteralLike`.
- it _does not allow_ any "optional" parameters to be defined
    - because of this, this type is NOT included in the broader `IsLiteralLike<T>` definition

For instance:

```ts
// true
type T1 = IsLiteralLikeArray<[ string, number, "foo" | "bar", ...string[] ]>;
// false
type T1 = IsLiteralLikeArray<[ string, number, "foo" | "bar", number?, ...string[] ]>;
// false
type T3 = IsLiteralLikeArray<[ ...string[] ]>;
```

#### An Optional Variation

Should you want to include all types which `IsLiteralLikeTuple<T>` but you _also_ want to match on types which include an optional parameter then you can do that by supplying the optional `U` generic as set to false. This means results in:

```ts
// true
type T1 = IsLiteralLikeArray<[ string, number, "foo" | "bar", ...string[] ], true>;
// true
type T1 = IsLiteralLikeArray<[ string, number, "foo" | "bar", number?, ...string[] ], true>;
// false
type T3 = IsLiteralLikeArray<[ ...string[] ], true>;
```

- no variant of `U` (aka, `true`, `false`, `boolean`) is considered to be part of `IsLiteralLike<T>` but they still represent a useful type group

### LiteralLike Objects

- the primary difference between a _literal_ object and a _literal-like_ object is that the type's **shape** be literal but there is no requirement that it's **type** be.

- that means that the `IsLiteralLikeObject<T>` evaluates like so:

    ```ts
    // true
    type T1 = IsLiteralLikeObject<{ foo: 1; bar: string }>;
    // true
    type T2 = IsLiteralLikeObject<{ foo: number; bar: string }>;
    // true
    type T3 = IsLiteralLikeObject<Record<"foo" | "bar" | "baz", string>>;
    // false
    type T4 = IsLiteralLikeObject<object>;
    // false
    type T5 = IsLiteralLikeObject<Record<string, string>>;
    ```

- the big question is how to handle "optional" keys
    - it's not all that common to have optional parameters in an array but it is _very_ common to have that in an object
    - because of this we typically _do_ want to group up object's with or without optional keys.
    - for that reason we provide an optional generic `U` which let's you explicitly switch between allowing or disallowing but the default is to allow optional keys:

        ```ts
        // true
        type T1 = IsLiteralLikeObject<{ foo: 1; bar?: string }>;
        type T2 = IsLiteralLikeObject<{ foo: 1; bar?: string }, true>;
        // false
        type T3 = IsLiteralLikeObject<{ foo: 1; bar?: string }, false>;
        ```

### Literal Unions

A "literal union" is a _union_ type who's members are all literal types. So for instance:

```ts
// true
type T1 = IsLiteralUnion<"foo" | "bar">;
// false
type T2 = IsLiteralUnion<"foo" | "bar" | number>;
```

The main question here is around _containers_ and whether their literal type or their literal-like should be included in this group.

- we have added an optional `U` generic to explicitly decide this behavior but we _default to_ **not** including literal-like containers.
- if you want to override this default behavior you can set `U` to `literal-like-containers`

This means that:

```ts
type Obj = `{ foo: 1; bar: string }`;

// false
type T1 = IsLiteralUnion<Obj>;
// true
type T2 = IsLiteralUnion<Obj, "literal-like-containers">;
```

> **Note:** the availability of "optional" value types is set to `true` for objects but `false` for tuples. If you want both container categories to be set to `true` or `false` you will need to set `U` as `[ "literal-like-containers", "allow-optional" ]` or `[ "literal-like-containers", "no-optional" ]` respectfully.

### `IsLiteralLike<T>` operator

This boolean operator `IsLiteralLike<T>` results in `true` when any of the following are `true`:

- `IsLiteral<T>` _is_ **true**
- `IsLiteralLikeObject<T>` _is_ **true**
- `IsLiteralLikeTuple<T>` _is_ **true**
- `IsLiteralUnion<T>` _is_ **true**

## Widening the Net

We have defined _literal_ and _literal-like_ groupings we will now start at the other end of the spectrum: **Wide** types. However, before we hit on that other extreme let's talk about "mixed types".

### Mixed Types

For now the only _mixed_ type we will have are a `MixedUnion` type which has a boolean operator called `IsMixedUnion<T>` which determines if `T` is a member of this group:

- this utility will result in `true` if _some_ of the elements in the union are literal values but others are others are wide.
- there is one _variant_ of this utility which is defined by the `U` generic:
    - by default, or when `U` is set to `null`, this utility will only consider _container_ types which are truly literal types as `true` but reject component types which are _literal-like_.
    - if `U` is set to `literal-like-containers`, then contains only need to match the _literal like_ bar to qualify

### Wide Types

- the primary utility for determining is a "wide type" is the `IsWideType<T>` utility
- we also have utilities which isolate to a particular type category:
    - `IsWideObject<T>`
    - `IsWideArray<T>`
    - `IsWideString<T>`
    - `IsWideNumber<T>`
    - `IsWideBoolean<T>`
