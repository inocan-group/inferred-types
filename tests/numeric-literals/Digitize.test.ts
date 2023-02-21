import { Equal, Expect } from "@type-challenges/utils";
import { DoesExtend, ErrorCondition } from "src/types";
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

    type Err = Digitize<number>;
    
    type cases = [
      Expect<Equal<Num, ["+", readonly [1,2,3]]>>,
      Expect<Equal<Str, ["+", readonly ["1","2","3"]]>>,
      DoesExtend<Err, ErrorCondition<"invalid-non-literal">>
    ];
    const cases: cases = [true, true, true];
  });

});
