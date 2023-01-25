import { Equal, Expect } from "@type-challenges/utils";
import { Flatten } from "types/lists/Flatten";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Flatten<T>", () => {

  it("first test", () => {
    type A1 = ["foo", "bar"];
    type A2 = [1,2];
    type A3 = [A1, [A2]];

    type R1 = readonly ["foo", "bar"];
    type R2 = readonly [1,2];
    type R3 = readonly [R1, [R2]];

    type Flat = Flatten<[A1,A2]>;
    type Flat_RO = Flatten<[R1,R2]>;

    type DeepFlat = Flatten<[A3, A2]>;
    type DeepFlat_RO = Flatten<[R3, R2]>;
    

    
    type cases = [
      Expect<Equal<Flat, readonly ["foo", "bar", 1, 2]>>,
      Expect<Equal<Flat_RO, readonly ["foo", "bar", 1, 2]>>,

      Expect<Equal<DeepFlat, readonly ["foo", "bar", 1, 2, 1, 2]>>,
      Expect<Equal<DeepFlat_RO, readonly ["foo", "bar", 1, 2, 1, 2]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
