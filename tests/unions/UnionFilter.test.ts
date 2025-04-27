import { Expect, Test, UnionFilter } from "inferred-types/types";
import { describe, it } from "vitest";



describe("UnionFilter", () => {

  it("happy path", () => {
    type FooBarBaz = "foo" | "bar" | "baz";
    type OneTwoThree = 1 | 2 | 3;

    type FooBar = UnionFilter<FooBarBaz, "baz">;
    type FooBaz = UnionFilter<FooBarBaz, "bar">;
    type Foo = UnionFilter<FooBarBaz, "bar" | "baz">;

    type Num = UnionFilter<FooBarBaz | OneTwoThree, FooBarBaz>;
    type Str = UnionFilter<FooBarBaz | OneTwoThree, OneTwoThree>;

    type Empty = UnionFilter<FooBarBaz, FooBarBaz>;

    type cases = [
      Expect<Test<FooBar, "equals",  "foo" | "bar">>,
      Expect<Test<FooBaz, "equals",  "foo" | "baz">>,
      Expect<Test<Foo, "equals",  "foo">>,

      Expect<Test<Num, "equals",  OneTwoThree>>,
      Expect<Test<Str, "equals",  FooBarBaz>>,

      Expect<Test<Empty, "equals",  never>>
    ];
  });

});
