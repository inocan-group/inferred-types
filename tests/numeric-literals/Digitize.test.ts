import { Equal, Expect } from "@type-challenges/utils";
import { Digital, DigitalLiteral, DoesExtend } from "../../src/types/base";
import { Digitize } from "src/types/numeric-literals/Digitize";
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

    type Err = Digitize<number>;
    
    type cases = [
      Expect<Equal<Num, ["+", readonly [1,2,3]] & Digital>>,
      Expect<Equal<Str, ["+", readonly ["1","2","3"]] & DigitalLiteral>>,
      Expect<Equal<Neg, ["-", readonly [1,2,3]] & Digital>>,
      Expect<Equal<NegStr, ["-", readonly ["1","2","3"]] & DigitalLiteral>>,
      Expect<Equal<Err, never>>,

      // extends base type
      DoesExtend<Num, Digital>,
      DoesExtend<Str, DigitalLiteral>
    ];
    const cases: cases = [true, true, true, true, true, true, true ];
  });

});
