import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsLessThan } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsLessThan<A,B>", () => {

  it("happy path", () => {
    type T1 = IsLessThan<0,1>;
    type T2 = IsLessThan<0,1000>;

    type F1 = IsLessThan<1,0>;
    type F2 = IsLessThan<1000,0>;
    type F3 = IsLessThan<1,1>;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
    ];
    const cases: cases = [
      true, true,
      true, true, true
    ];
  });

});
