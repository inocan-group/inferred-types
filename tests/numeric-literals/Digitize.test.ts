import { Equal, Expect } from "@type-challenges/utils";
import { Digital, DigitalLiteral, DoesExtend, Digitize, NumericSign, Digit, NumericChar } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Digitize<T>", () => {

  it("happy path", () => {
    type Num = Digitize<123>;
    type Str = Digitize<"123">;
    type Neg = Digitize<-123>;
    type NegStr = Digitize<"-123">;

    type WideNum = Digitize<number>;
    type WideStr = Digitize<`${number}`>;

    type cases = [
      Expect<Equal<Num, ["+",  [1,2,3]] >>,
      Expect<Equal<Str, ["+",  ["1","2","3"]] >>,
      Expect<Equal<Neg, ["-",  [1,2,3]] >>,
      Expect<Equal<NegStr, ["-",  ["1","2","3"]] >>,

      Expect<Equal<WideNum, [ NumericSign, Digit[]]>>,
      Expect<Equal<WideStr, [ NumericSign, NumericChar[]]>>,

      // extends base type
      DoesExtend<Num, Digital>,
      DoesExtend<Str, DigitalLiteral>
    ];
    const cases: cases = [
      true, true, true, true,
      true, true,
      true, true
    ];
  });

});
