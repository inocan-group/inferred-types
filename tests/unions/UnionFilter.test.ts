import { Equal, Expect } from "@type-challenges/utils";
import { UnionFilter } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<FooBar, "foo" | "bar">>,
      Expect<Equal<FooBaz, "foo" | "baz">>,
      Expect<Equal<Foo, "foo">>,

      Expect<Equal<Num, OneTwoThree>>,
      Expect<Equal<Str, FooBarBaz>>,

      Expect<Equal<Empty, never>>
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true
    ];
  });

});
