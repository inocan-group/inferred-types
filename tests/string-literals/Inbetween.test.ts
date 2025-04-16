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
        Expect<Equal<Bar, "Bar">>,
        Expect<Equal<Bar2, "Bar">>,

        Expect<Equal<FirstMatch, "FooBar">>,
        Expect<Equal<Inclusive, "[foobar]">>,

        Expect<Equal<NoMatch, "">>,
        Expect<Equal<NoMatchExplicit, "no">>,
    ];
  });

});
