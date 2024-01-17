import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Not } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Not<T>", () => {

  it("with singular value", () => {
    type False = Not<true>;
    type True = Not<false>;
    type Bool = Not<boolean>;
    type Never = Not<never>;

    type cases = [
      Expect<Equal<False, false>>,
      Expect<Equal<True, true>>,
      Expect<Equal<Bool, boolean>>,
      Expect<Equal<Never, never>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  
  it("with tuple value", () => {
    type Tuple1 = [true, true, false, boolean, false ];
    type Tuple2 = [true, true, false, never, boolean, false, never ];

    type T1 = Not<Tuple1>;
    type T2 = Not<Tuple2>;
    
    type cases = [
      Expect<Equal<T1, [false, false, true, boolean, true ]>>,
      Expect<Equal<T2, [false, false, true, never, boolean, true, never ]>>
    ];
    const cases: cases = [ true, true ];
  });
  
});
