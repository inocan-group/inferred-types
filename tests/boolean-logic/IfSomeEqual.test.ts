import { Equal, Expect } from "@type-challenges/utils";
import { SomeEqual } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfSomeEqual & SomeEqual", () => {

  it("SomeEqual", () => {
    type OneTwo = [1,2];
    type FooBar = ["foo", "bar"];
    type Never = [never];
    type NeverFoo = [never, "foo"];
    type Wide = [ string, number ];
    
    type cases = [
      // numeric literals
      Expect<Equal<SomeEqual<1, OneTwo>, true>>,
      Expect<Equal<SomeEqual<2, OneTwo>, true>>,
      Expect<Equal<SomeEqual<3, OneTwo>, false>>,

      // string literals
      Expect<Equal<SomeEqual<"foo", FooBar>, true>>,
      Expect<Equal<SomeEqual<"bar", FooBar>, true>>,
      Expect<Equal<SomeEqual<"baz", FooBar>, false>>,

      // never
      Expect<Equal<SomeEqual<"foo", NeverFoo>, true>>,
      Expect<Equal<SomeEqual<never, Never>, true>>,
      Expect<Equal<SomeEqual<"foo", Never>, false>>,

      // wide types
      Expect<Equal<SomeEqual<"foo", Wide>, false>>,
      Expect<Equal<SomeEqual<42, Wide>, false>>,
      Expect<Equal<SomeEqual<number, Wide>, true>>,

    ];
    const cases: cases = [
      true, true, true,
      true, true, true,
      true, true, true,
      true, true, true
    ];
  });

});


