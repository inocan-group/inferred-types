import { Equal, Expect } from "@type-challenges/utils";
import { FindFirstIndex, FindIndexes, FindLastIndex } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FindIndexes<TContent,TFind,[TOp]>, FindFirstIndex<...>, FindLastIndex<..>", () => {

  it("string content", () => {
    type FooBarBaz = FindIndexes<"foo,bar, baz", ",">;
    type Union = FindIndexes<"foo bar,baz", "," | " ">;
    type Many = FindIndexes<"red,blue, green, purple, black", ",">;

    type F_FooBarBaz = FindFirstIndex<"foo,bar, baz", ",">
    type L_FooBarBaz = FindLastIndex<"foo,bar, baz", ",">

    type F_Many = FindFirstIndex<"red,blue, green, purple, black", ",">
    type L_Many = FindLastIndex<"red,blue, green, purple, black", ",">

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBarBaz, [3,7]>>,
      Expect<Equal<Union, [3,7]>>,
      Expect<Equal<Many, [3,8,15,23]>>,

      Expect<Equal<F_FooBarBaz, 3>>,
      Expect<Equal<L_FooBarBaz, 7>>,

      Expect<Equal<F_Many, 3>>,
      Expect<Equal<L_Many, 23>>,
    ];
  });



  it("tuple content", () => {
    type Foo42 = FindIndexes<["foo","bar","baz", 0, 42], "foo" | 42>;


    // @ts-ignore
    type cases = [
      Expect<Equal<Foo42, [0,4]>>,
    ];

  });
});
