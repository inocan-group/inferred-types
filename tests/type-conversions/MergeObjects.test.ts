import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { MergeObjects } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeObjects<A,B>", () => {
  type FooBar = { foo: 1; bar: 2 };
  type BarBaz = { bar: 4; baz: "howdy" };
  type Wide = { foo: number; bar: number; baz: string; extra: boolean };

  it("happy path", () => {
    type T1 = MergeObjects<FooBar, BarBaz>;
    type T2 = MergeObjects<BarBaz, FooBar>;

    type WideDefault = MergeObjects<Wide, FooBar>;
    type WideOverride = MergeObjects<FooBar, Wide>;
    
    type cases = [
      Expect<Equal<T1, {foo: 1; bar: 4; baz: "howdy"}>>,
      Expect<Equal<T2, {foo: 1; bar: 2; baz: "howdy"}>>,

      Expect<Equal<WideDefault, { foo: 1; bar: 2; baz: string; extra: boolean }>>,
      Expect<Equal<WideOverride, { foo: 1; bar: 2; baz: string; extra: boolean }>>,

    ];

    const cases: cases = [ 
      true, true,
      true, true
    ];
  });

});
