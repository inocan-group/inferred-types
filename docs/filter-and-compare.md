# Filter and Compare Operations

In programming we often do _comparisons_ between two values resulting a boolean outcome. In this repo we provide ways to perform these comparisons while retaining the narrowest type possible.

This solution is comprised with both type and runtime utilities. We'll cover the type utilities first and then show you have the runtime utilities leverage this.

## Type Utilities

### `Compare<TVal, TOp, TParams>`

The most fundamental utility we'll cover is the `Compare` utility. `Compare` let's the caller do a single comparison between to a value and a "comparator" which is composed of and get back a boolean value.

All attempts are made to resolve the `true`/`false` outcome at _design-time_ rather than waiting for _run-time_ but where this isn't possible then the type utility will resolve to _boolean_ to allow the runtime to be the resolver.

A "comparator" is composed of:

- a comparison operation (`ComparisonOperation` is a union of valid operations) but this includes operations such as:
  - `equals`
  - `extends`
  - `startsWith`
  - `greaterThan`
  - etc.
- a tuple of parameters which round out the definition of the comparator
  - the parameters which are required are determined on a _per operation_ basis
  - for instance:
    - `isTruthy` requires NO parameters
    - `equals` requires a single parameter
    - `betweenInclusively` requires two numeric parameters
    - etc.
  - The parameters required can be found in the `ComparisonLookup` table which defines characteristics of each of the supported operation

#### Examples

Let's take a look at a few examples of how this utility works:

```ts
// false
type T1 = Compare<1, "greaterThan", 2>;
// true
type T2 = Compare<"foobar", "startsWith", "foo">;
// true
type T3 = Compare<"true", "truthy">;
```

In all of the examples above we see that we are able to resolve the type at design time. In contrast, here are a few examples where we appropriately resolve to a `boolean` type and defer to the run-time system:

```ts
// boolean
type T1 = Compare<string, "startsWith", "foo">;
// boolean
type T2 = Compare<Date, "sameDay", "2012-16-12">;
```

Because the value passed in is a "wide type" in the `startsWith` example, and because the `Date` object can't be compared effectively to and ISO Date in the type system.

#### Comparator Parameters

You may have noticed that the _parameters_ of a **comparator** were described as a "tuple" data structure (aka, a fixed length array) but in our examples of using `Compare` we're yet to see a tuple show up! Well that's just an API convenience because a lot of the comparison operations either have zero (e.g., truthy, falsy, etc.) or one (e.g., "equals", "extends", etc.) parameter.

What this means is that:

```ts
// perfectly valid (and convenient)
type T1 = Compare<1, "greaterThan", 2>;
// more formal but exactly the same in function
type T2 = Compare<1, "greaterThan", [2]>;
```

It also will help you get your head around those operations which require more than one parameter such as:

```ts
// true
type T1 = Compare<5, "betweenInclusively", [1,10]>;
// true
type T2 = Compare<"foo", "extendsSome", ["foo", "bar", "baz"]>;
```

In these multi-parameter operations there is no "shorthand" variant and you must express the parameters as a tuple.

> **Note:** for those wanting an idea of how this is done, look at the `modules/types/src/boolean-logic/combinators/GetComparisonParams.ts` file and type utilities defined there.

### `Filter<TVal, TOp, TParams>`

While the `Compare` utility was focused on making a _single_ boolean comparison, the `Filter` utility is intended to run this comparison on an array of values and retain only those which return a `true` value.

The signature, operations, and everything else is the same between `Compare` and `Filter` so we'll not repeat ourselves but instead just illustrate the utility of this type utility with a few examples:

#### Examples

```ts
// [2,3]
type T1 = Filter<[1,2,3], "greaterThan", 1>;
// [1,2]
type T2 = Filter<[1,2,"foo","bar"], "extends", number>;
```

### `NotFilter<TVal, TOp, TParams>`

Ok hopefully the _name_ of `NotFilter` gives away the functionality but in case it doesn't ... the `NotFilter` is _exactly_ the same as `Filter` but where `Filter` retains those values which return `true` on a comparison, the `NotFilter` utility retains those values which return `false` from the comparison.

#### Examples

```ts
// [1]
type T1 = NotFilter<[1,2,3], "greaterThan", 1>;
// ["foo","bar"]
type T2 = NotFilter<[1,2,"foo","bar"], "extends", number>;
```

## Runtime System

We've now covered all you'll likely to need to know about the type system's handling of _comparisons_ and _filter_ operations so in a moment we'll shift our focus to the **runtime** system and we can perform the same operations as we've seen in the type system but before we do let's cover a potentially "obvious" but still easily overlooked concept:

The concept we need to formalize is that "a _value_ is not a _type_". Let's explore this:

- in Typescript's _type system_ everything we express is a **type**
- in the runtime, however we are primarily dealing the _value_ of things
- in the runtime system, we typically can't even access what the variable's type is; we can get an approximation maybe through the `typeof` operator but it's crude.
- so if a "value is not a type" then what is the relationship between a "value" and a "type"?
  - A _type_ represents the "future value" of a value
    - Wide types:
      - when we say that a variable "color" is of the type "string" then we're saying that the `color` variable, when in scope, will always have a "string" type.
      - this sounds like the same thing and is the source of the confusion often, we'll need to look a literal type or a union type to understand how they vary.
    - Union types:
      - if we define the "color" variable to being:

        ```ts
        let color: "red" | "blue" | "green";
        ```

    - now the color variable in the runtime must be a "string" but not just _any_ string
      - the runtime system only cares that it's a string
      - the runtime system has no idea that string having _constraints_ being placed on it's value
      - but here, the Typescript system enforces the _future value_ of the color variable by not allowing it take on just _any_ string but instead ONLY those part of the type union.
    - The same concept applies to literal values like `foo${string}` which requires that the string value _start with_ the substring "foo"

You may still be a bit confused about our diatribe about the distinction between _types_ and _values_ but this will become more clear in the next section.


### The `compare()` function

In many ways the `compare()` function mimics the `Compare<TVal, TOp, TParams>` in it's API surface and utility but it's not identical. Let's start with a few examples which illustrate the similarities:

```ts
// true
const t1 = compare("foobar", "startsWith", "foo");
// false
const t2 = compare(1, "greaterThan", 2);
```

The signature looks the same. The resolved type (and now runtime value) are consistent. So what's different.

### Narrowing Powers and Limitations of the Runtime

Let's use this example for reference:

```ts
const t1 = compare("foobar" as string, "startsWith", "foo");
```

If our compare function were _just_ to mimic the type returned from `Compare` type utility we'd get:

```ts
// boolean
type T1 = Compare<string, "startsWith", "foo">;
```

- the runtime value of `t1` is "foobar"
- the type system type of `T1` can only resolve to `string` type as the literal type has been masked
- the return **value** of `t1` can't be "boolean" as the runtime system only knows about `true` and `false` values
-



### The `filter()` function

TBD


