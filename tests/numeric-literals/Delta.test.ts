import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Delta } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Delta<A,B>", () => {

  it("with numbers", () => {
    type T1a = Delta<1,2>;
    type T1b = Delta<2,1>;
    type T5a = Delta<10,5>;
    type T5b = Delta<5,10>;

    type cases = [
      Expect<Equal<T1a, 1>>,
      Expect<Equal<T1b, 1>>,
      Expect<Equal<T5a, 5>>,
      Expect<Equal<T5b, 5>>,

    ];
    const cases: cases = [
      true, true, true, true,
    ];
  });

  it("with string numerics", () => {
    type T1a = Delta<"1","2">;
    type T1b = Delta<"2","1">;
    type T5a = Delta<"10","5">;
    type T5b = Delta<"5","10">;

    type cases = [
      Expect<Equal<T1a, "1">>,
      Expect<Equal<T1b, "1">>,
      Expect<Equal<T5a, "5">>,
      Expect<Equal<T5b, "5">>,

    ];
    const cases: cases = [
      true, true, true, true,
    ];
  });


  it("positive and negative", () => {
    type Six = Delta<1,-5>;
    type SixAlt = Delta<-5, 1>;

    type cases = [
      Expect<Equal<Six, 6>>,
      Expect<Equal<SixAlt, 6>>,

    ];
    const cases: cases = [
      true, true
    ];

  });


});
