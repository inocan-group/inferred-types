# Type Testing

This repo is all about getting as much narrow, high quality types out of the type system as is possible. With that backdrop it may not be surprising that **testing** types is super important here.

- all type utilities (e.g., a type with generics passed in to create variant outputs) MUST be thoroughly tested to ensure they are performing their intended function and not hitting the dreaded `the type X is complex and possibly infinite`

- most runtime functions should not only be unit tested for their runtime output but also for their types
  - these types must always be _aligned_ with one another
  - a functions parameter types can often break the use of strongly typed functions if the intended types are deviated from.

At the end of the day, we value **type tests** at least as much as we do our **runtime tests**!

## Executing Type Tests

You can test all the type tests by running:

```ts
typed test
```

But you'll often want to scope down testing to just a single file or some subset by using glob patterns like so:

```ts
typed test --filter datetime
```

The above example will find all test files with `datetime` in the name and test only those.

## What is a Type Test

Type tests mimic what you might see on something like the [Type Challenges](https://github.com/type-challenges/type-challenges) site/repo.

A type test will look something like this:

```ts
import { describe, it } from "vitest";
import { Expect, Intersect, Test } from "inferred-types/types";

describe("Intersect<TList>", () => {

    it("happy path", () => {
        type FooBar = Intersect<[
            { foo: 1 },
            { bar: 2 }
        ]>

        type cases = [
            Expect<Test<FooBar, "equals",  { foo: 1 } & { bar: 2 }>>,
        ];
    });

});
```

> **Note:** this test is limited to just one test for brevities sake, real tests files and test blocks will have many tests with the aim of providing nearly 100% test coverage.

In the above test let's mention the key takeaways:

- The `Expect` utility expect all test assertions to result in a `true` value and specifically looks for "false positives" like `never` and `any` and rejects those too.
- The `Test` utility  is used to compare between the _expected_ and _actual_ types.
  - in this example we are testing for **equality** but the `Test` utility provides the following comparisons:
    - `extends`
    - `hasSameKeys` - useful mainly for dictionary objects to ensure that key's are the same.
    - `hasSameValues` - useful when you want to test that all values of a container are the same but the order is not important
    - `isError<T>`
      - this tests if the value is _extended_ from `Error`
      - if you put `null`,`undefined` or `true` in the "expected" value then it will simply check that it's _any_ error
      - if you add the Error itself then it will check for that error;
      - alternatively if you are testing an error from `err()` / `Err<T>` utilities which set the type (and optionally subtype) properties then you can simply put in a string literal representing the error type you're expecting to see (e.g., "parse/object" would look for a "type" of "parse" and a "subtype" of "object")
      - here you would either pass in the Error or a string representing the "type" of error
  - We expect the set of type tests being assigned to a given `it()` test block to reside in the type `cases` which should resolve to a tuple of **true** values.

Please remember that while the above example shows us testing a type utility we expect type testing for runtime functions too. Here's an example of that:

```ts
describe("filter()", () => {
    it("equals operation", () => {
        const findFoo = filter("equals", 42);
        const literal = findFoo(["foo", "" as string, 42, "bar", 99]);

        // runtime test
        expect(literal).toEqual([42]);

        // type test
        type cases = [
            Expect<Test<typeof literal, "equals", [42]>>
        ];
    });

    it("startsWith operation", () => {
        const findFoo = filter("startsWith", "foo");
        const t = findFoo(["fooBar", "barBar", "baz", "boot", "foo"]);
        type T = typeof t;

        // runtime test
        expect(t).toEqual(["fooBar", "foo"]);

        // type test
        type cases = [
            Expect<Test<T, "equals", ["fooBar", "foo"]>>
        ];
    });

    it("endsWith operation", () => {
        const findFoo = filter("endsWith", "r");
        const t = findFoo(["fooBar", "barBar", "baz", "boot", "foo"]);
        type T = typeof t;

        expect(t).toEqual(["fooBar", "barBar"]);

        // type test
        type cases = [
            Expect<Test<T, "equals", ["fooBar", "barBar"]>>
        ];
    });
});
```

