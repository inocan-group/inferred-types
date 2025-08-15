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
pnpm typed
```

But you'll often want to scope down testing to just a single file or some subset by using glob patterns like so:

```ts
pnpm typed datetime
```

**NOTE**: this is NOT an `npm` command so do not try running it via **npm**.

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



### Best Practices

- the number of generic parameters a type utility takes is irrelevant to the overall complexity of the type utilities resolution; never penalize a type utility for having a lot of parameters
- template literal distribution can be OK for some situations but it is combinatorial so beware of exploding union types when using this
- always try to find a way to reduce union members where you can
  - this includes using conditional operations to split one union into a subset union before working on it
- deeply nested conditional in a type utility are generally OK so long as you keep any union types in control
  - but a large union type moving through deeply nested conditional utility is likely not efficient at all and should be avoided
- use the `As` type utility within conditionals to help reduce complexity:

    ```ts
    /**
     * **As**`<TContent,TType>`
     *
     * Ensures that `TContent` _extends_ `TType` or turns type to `never`.
     */
    export type As<
        TContent,
        TType,
    > = [TContent] extends [TType]
        ? TContent
        : never;
    ```

    - this utility can be added to take a complex union type and reduce it to a more manageable union; for instance:

        Imagine we want to test for a **valid** IsoYear, IsoYearMonth, or IsoMonthDate type.

        - we want to return `false` if these types meet the meager type patterns that `T` is looking for but the string passed in is actually NOT a valid ISO Date string.

        ```ts
        type AsIsoPartial<
            T extends `--${number}${string}` | `-${number}${string}`
        > = As<
            string extends T
            ? boolean
            : T extends `--${number}${string}` // lots of false positives
                ? T extends `--${TwoDigitMonth}${TwoDigitDate}` // validated
                    ? true
                    : false
            : T extends `-${number}${string}` // lots of false positives
                ? T extends `-${FourDigitYear}${string}` // further validate
                    ? T extends `-${number}-${TwoDigitMonth}` // finish validation
                        ? T & `-${FourDigitYear}${TwoDigitMonth}`
                        : Err<`iso-partial/month-date`>
                    : Err<`iso-partial/month-date`>
            : Err<`iso-partial`>,

            `--${number}${string}` | `-${number}${string}` | Error
        >
        ```

        - this shows two key strategies:
          - the wrapping `As<..., \`--${number}${string}\` | \`-${number}${string}\` | Error>` allows consumers of this utility to see simple union type while maintaining literals
          - the inspect of the string in _parts_ rather than as one single comparison reduces the union complexity in favor of conditional complexity (a benefit 99% of the time).

- When type testing runtime functions:

  - A common mistake is to create tests like this:

       ```ts
       it("basic integer comparisons", () => {
         const gt5 = isGreaterThan(5); // partial application

         expect(gt5(10)).toBe(true);
         expect(gt5(6)).toBe(true);
         expect(gt5(5)).toBe(false);
         expect(gt5(4)).toBe(false);
         expect(gt5(0)).toBe(false);

         // Type testing
         type TestGt5_10 = ReturnType<typeof gt5<10>>;
         type TestGt5_5 = ReturnType<typeof gt5<5>>;

         type cases = [
             Expect<Test<TestGt5_10, "equals", true>>,
             Expect<Test<TestGt5_5, "equals", false>>,
         ];
     });
     ```

     The critical mistake is that the types `TestGt5_10` and `TestGt5_5` have made **assumptions** about the runtime which they should not!
     Specifically they have assumed that the function is able to extract the literal value passed in as a parameter. This should not be assumed.

     Here is how this type of test SHOULD be written:

     ```ts
     it("basic integer comparisons", () => {
         const gt5 = isGreaterThan(5); // partial application

         const ten = gt5(10);
         const five = gt5(5);

         expect(ten).toBe(true);
         expect(five).toBe(false);

         type cases = [
             Expect<typeof ten, "equals", true>>,
             Expect<typeof five, "equals", false>>,
         ];
     });
     ```

- The `cases` test block
  - You do not need to (nor should you) add an instruction such as `@ts-ignore` etc above this block
  - You also do not need to use the `case` type anywhere in the file as this is an exception made for this variable name in the
