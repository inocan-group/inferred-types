import { Equal, Expect } from "@type-challenges/utils";
import { UnionRetain } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionRetain", () => {

  it("happy path", () => {
    type FooBarBaz = "foo" | "bar" | "baz";
    type OneTwoThree = 1 | 2 | 3;

    type FooBar = UnionRetain<FooBarBaz, "foo" | "bar">;
    type FooBaz = UnionRetain<FooBarBaz, "foo" | "baz">;
    type Foo = UnionRetain<FooBarBaz, "foo">;

    type Num = UnionRetain<FooBarBaz | OneTwoThree, OneTwoThree>;
    type Str = UnionRetain<FooBarBaz | OneTwoThree, FooBarBaz>;

    type All = UnionRetain<FooBarBaz, FooBarBaz>;

    type cases = [
      Expect<Equal<FooBar, "foo" | "bar">>,
      Expect<Equal<FooBaz, "foo" | "baz">>,
      Expect<Equal<Foo, "foo">>,

      Expect<Equal<Num, OneTwoThree>>,
      Expect<Equal<Str, FooBarBaz>>,

      Expect<Equal<All, FooBarBaz>>
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true
    ];
  });

});
