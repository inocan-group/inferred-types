import { Equal, Expect } from "@type-challenges/utils";
import { ReturnValues } from "src/types/type-conversion/ReturnValues";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ReturnValues<T>", () => {

  it("happy path", () => {
    type T1 = ReturnValues<[]>;
    type T2 = ReturnValues<["foo","bar","baz"]>;
    type T3 = ReturnValues<["foo", () => false, () => true]>;
    type T4 = ReturnValues<["foo", () => false, () => boolean]>;
    type T5 = ReturnValues<["foo", () => false, () => "blue"]>;
    
    type cases = [
      Expect<Equal<T1, []>>, //
      Expect<Equal<T2, []>>,
      Expect <Equal<T3, [false, true]>>,
      Expect <Equal<T4, [false, boolean]>>,
      Expect <Equal<T5, [false, "blue"]>>,
    ];
    const cases: cases = [ true, true, true, true, true];
  });

});
