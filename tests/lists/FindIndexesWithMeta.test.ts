import { Equal, Expect } from "@type-challenges/utils";
import { FindFirstIndex,  FindIndexesWithMeta, FindLastIndex } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FindIndexesWithMeta<TContent,TFind,[TOp]>, FindFirstIndexMeta<..>, FindLastIndexMeta<..>", () => {

  it("string content", () => {
    type FooBarBaz = FindIndexesWithMeta<"foo,bar, baz", ",">;
    type FooBar = FindIndexesWithMeta<"foo, bar", ", ">;

    type Union = FindIndexesWithMeta<"foo bar,baz", "," | " ">;

    type F_FooBarBaz = FindFirstIndex<"foo,bar, baz", ",">
    type L_FooBarBaz = FindLastIndex<"foo,bar, baz", ",">


    // @ts-ignore
    type cases = [
      Expect<Equal<FooBarBaz, [
        {start: 3; end: 4; break: ","},
        {start: 7; end: 8; break: ","}
      ]>>,
      Expect<Equal<Union, [
        {start: 3; end: 4; break: " "},
        {start: 7; end: 8; break: ","}
      ]>>,

      Expect<Equal<F_FooBarBaz, 3>>,
      Expect<Equal<L_FooBarBaz, 7>>,

    ];
  });



  it("tuple content", () => {
    type Foo42 = FindIndexesWithMeta<["foo","bar","baz", 0, 42], "foo" | 42>;


    // @ts-ignore
    type cases = [
      Expect<Equal<Foo42, [
        {index: 0; break:"foo"},
        {index: 4; break: 42}
      ]>>,
    ];

  });
});
