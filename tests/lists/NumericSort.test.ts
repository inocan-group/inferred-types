import { Equal, Expect } from "@type-challenges/utils";
import { NumericSort } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Sort<TValues,[TReverse]>", () => {

  it("happy path", () => {
    type S1 = NumericSort<[2,3,4,1]>;
    type S2 = NumericSort<[22,33,44,11,11]>;
    type S3 = NumericSort<[1,2,3,4]>;

    type SR1 = NumericSort<[2,3,4,1], true>;
    type SR2 = NumericSort<[22,33,44,11,11], true>;
    type SR3 = NumericSort<[1,2,3,4], true>;



    // @ts-ignore
    type cases = [
      Expect<Equal<S1, [1,2,3,4]>>,
      Expect<Equal<S2, [11,11,22,33,44]>>,
      Expect<Equal<S3, [1,2,3,4]>>,

      Expect<Equal<SR1, [4,3,2,1]>>,
      Expect<Equal<SR2, [44,33,22,11,11]>>,
      Expect<Equal<SR3, [4,3,2,1]>>,
    ];
  });

  it("with string literals", () => {
    type S1 = NumericSort<[`2`,`3`,`4`,1]>;
    type S2 = NumericSort<[22,`33`,44,11,11]>;
    type S3 = NumericSort<[1,2,3,`4`]>;

    type SR1 = NumericSort<[`2`,`3`,`4`,`1`], true>;
    type SR2 = NumericSort<[22,33,44,`11`,11], true>;
    type SR3 = NumericSort<[1,`2`,`3`,4], true>;

    // @ts-ignore
    type cases = [
      Expect<Equal<S1, [1,2,3,4]>>,
      Expect<Equal<S2, [11,11,22,33,44]>>,
      Expect<Equal<S3, [1,2,3,4]>>,

      Expect<Equal<SR1, [4,3,2,1]>>,
      Expect<Equal<SR2, [44,33,22,11,11]>>,
      Expect<Equal<SR3, [4,3,2,1]>>,
    ];
  });

});
