import { describe, it } from "vitest";
import type { Expect, InBetween, Test } from "inferred-types/types";

describe("InBetween<T,S,E>", () => {

  it("happy path", () => {
    type Bar = InBetween<"FooBarBaz", "Foo", "Baz">;
    type Bar2 = InBetween<"  dfdFooBarBaz ,dfsdf", "Foo", "Baz">;

    type FirstMatch = InBetween<"FooFooBarBazBaz", "Foo", "Baz">;
    type Inclusive = InBetween<"  [foobar]  adfsd", "[", "]", { policy: "inclusive"}>;

    type NoMatch = InBetween<"FooBar", "Baz", "Foo">;
    type NoMatchExplicit = InBetween<"FooBar", "Baz", "Foo", { noMatch: "no"}>;

    type cases = [
        Expect<Test<Bar, "equals",  "Bar">>,
        Expect<Test<Bar2, "equals",  "Bar">>,

        Expect<Test<FirstMatch, "equals",  "FooBar">>,
        Expect<Test<Inclusive, "equals",  "[foobar]">>,

        Expect<Test<NoMatch, "equals",  "">>,
        Expect<Test<NoMatchExplicit, "equals",  "no">>,
    ];
  });

});
