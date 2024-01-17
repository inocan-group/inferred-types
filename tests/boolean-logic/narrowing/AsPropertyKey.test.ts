import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AsPropertyKey, EmptyObject } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsPropertyKey<T,[C]>", () => {

  it("without container", () => {
    type Foo = AsPropertyKey<"foo">;
    type One = AsPropertyKey<1>;
    type Err = AsPropertyKey<true>;
    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<One, 1>>,
      Expect<Equal<Err, "ERR">>
    ];
    const cases: cases = [
      true, true,
      true
    ];
  });

  
  it("object container", () => {
    type Base = { ERR_1: "oops" };

    type Foo = AsPropertyKey<"foo", EmptyObject>;
    type Foo2 = AsPropertyKey<"foo", Base>;
    type FromNothing = AsPropertyKey<false, EmptyObject>;
    type FromBase = AsPropertyKey<false, Base>;
    
    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Foo2, "foo">>,
      
      Expect<Equal<FromNothing, "ERR_1">>,
      Expect<Equal<FromBase, "ERR_2">>,

    ];
    const cases: cases = [
      true, true,
      true, true
    ];
  });
});
