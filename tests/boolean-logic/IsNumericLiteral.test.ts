import { Equal, Expect } from "@type-challenges/utils";
import { IsNumericLiteral } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsNumericLiteral<T>", () => {

  it("happy path", () => {
    type T1 = IsNumericLiteral<1>;
    type T2 = IsNumericLiteral<1 | 2>;
    type F1 = IsNumericLiteral<number>;
    type F2 = IsNumericLiteral<"foo">;

    type Never = IsNumericLiteral<never>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<Never, never>>,
    ];
    const cases: cases = [ true, true, true, true, true];
  });

});
