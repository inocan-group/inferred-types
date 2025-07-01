# Filter and Compare Operations

In programming we often do _comparisons_ between two values resulting a boolean outcome. In this repo we provide ways to perform these comparisons while retaining the narrowest type possible.

This solution is comprised with both type and runtime utilities. We'll cover the type utilities first and then show you have the runtime utilities leverage this.

## Type Utilities

### `Compare<TVal, TOp, TParams>`

The most fundamental utility we'll cover is the `Compare` utility. `Compare` let's the caller do a single comparison between to a value and a "comparator" which is composed of the "operation" and a tuple of "parameters".

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
type T1 = Compare<1, "greaterThan", [2]>;
// true
type T2 = Compare<"foobar", "startsWith", ["foo"]>;
// true
type T3 = Compare<"true", "truthy">;
```

In all of the examples above we see that we are able to resolve the type at design time. In contrast, here are a few examples where we appropriately resolve to a `boolean` type and defer to the run-time system:

```ts
// boolean
type T1 = Compare<string, "startsWith", ["foo"]>;
// boolean
type T2 = Compare<Date, "sameDay", ["2012-16-12"]>;
```

Because the value passed in is a "wide type" in the `startsWith` example, and because the `Date` object can't be compared effectively to and ISO Date in the type system.

**Note:** for `DateTime` types the ISO strings offer more "insight" at design time than any object based representation such as a JS Date or 3rd party libraries like DateFNS, Moment, etc.


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

### `Find<TVal, TOp, TParams`

The `Find` type utility operates in nearly the same way as the `Filter` utility but rather than _reducing_ the incoming array to only those which return `true`, the `Find` utility returns the first match where the comparison results in `true.

- if `Find` doesn't match on any items in the passed in array, an `undefined` value is returned.

## Runtime System

We've now covered all you'll likely to need to know about the type system's handling of _comparisons_ and _filter_/_find_  operations but as is often the case in this repo, there are corresponding runtime functions made available too.

### The `compare()` function

> source: `/modules/runtime/src/combinators/compare.ts`
> tests: `/tests/boolean-logic/combinators/Compare.test.ts` (both type util and runtime)

The `compare()` function mimics the `Compare<TVal, TOp, TParams>` in functional goals and has a _similar_ but not _identical_ signature. Both API surfaces share the same parameters but the ordering is different as the runtime system takes advantage of a higher order function.

in it's API surface and utility but it's not identical. Let's start with a few examples which illustrate the similarities:

```ts
const startWithFoo = compare("startsWithSome", "foo", "bar");
// true
const test = startWithFoo("foobar");
```

- the first call to `compare()` defines the _comparator_ by receiving the "operation" and any parameters associated with that operation.
- the second call can be made as often as you like to perform that comparison operation

The signature is very similar to the type utility but you may notice that the _parameters_ are not enclosed as an array. Well, under the covers the runtime function _is_ treating the parameters as an array but it is using the `...` operator to read the parameters inline. That means that:

> Note: when configuring the _comparator_ in the first call you may have noticed that our example had two parameters -- `[ "foo", "bar" ]` -- but they were not enclosed into an array. This is by design, the runtime receives all parameters inline using the `...` operator after it receives the operation as it's first parameter.

#### Maintaining Type Narrowness

Just like the type utility, the goal for the `compare()` function is to be able to resolve the `true`/`false` literal values whenever possible.

### The `filter()` function

> source: `/modules/runtime/src/lists/filter.ts`
> tests: `/tests/lists/Filter.test.ts`

Where the `compare()` function is about making a single comparison resulting in a `true` or `false`, the **filter** function is intended to take an array of values and filter down to only those which -- when _compared_ -- resolve to a `true` value.

- just like the `compare()` function this function is setup as a higher order function

#### Example

```ts
const startWithFoo = filter("startsWithSome", "foo", "bar");
// [ "foobar", "barbar" ]
const test = startWithFoo(["hi", "foobar", "bye", "barbar"])
```

### The `find()` function

The `find()` function is exactly what you think it is.

- searches for first match and returns (if found); otherwise returns _undefined_
- also organized as a higher order function

#### Example

```ts
const startWithFoo = find("startsWithSome", "foo", "bar");
// "foobar"
const test = startWithFoo(["hi", "foobar", "bye", "barbar"])
```

