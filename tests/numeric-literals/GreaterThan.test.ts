import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { GreaterThan } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("GreaterThan<A,B>", () => {

  it("happy path", () => {
    type T1 = GreaterThan<1,0>;
    type T2 = GreaterThan<1000,0>;

    type F1 = GreaterThan<0,1>;
    type F2 = GreaterThan<0,1000>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
