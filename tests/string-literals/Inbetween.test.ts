import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Inbetween } from "inferred-types/types";

describe("Inbetween<T,S,E>", () => {

  it("happy path", () => {
    type Bar = Inbetween<"FooBarBaz", "Foo", "Baz">;
    type Bar2 = Inbetween<"  dfdFooBarBaz ,dfsdf", "Foo", "Baz">;

    type FirstMatch = Inbetween<"FooFooBarBazBaz", "Foo", "Baz">;
    type Inclusive = Inbetween<"  [foobar]  adfsd", "[", "]", { policy: "inclusive"}>;

    type NoMatch = Inbetween<"FooBar", "Baz", "Foo">;
    type NoMatchExplicit = Inbetween<"FooBar", "Baz", "Foo", { noMatch: "no"}>;

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
