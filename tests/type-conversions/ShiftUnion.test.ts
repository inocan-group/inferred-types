import {  Expect } from "@type-challenges/utils";
import {  DoesExtend, UnionShift } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ShiftUnion<T>", () => {

  it("happy path", () => {
    type OneTwoThree = 1 | 2 | 3;
    type Once = UnionShift<OneTwoThree>;
    
    type cases = [
      Expect<DoesExtend<Once[0], OneTwoThree>>,
      Expect<DoesExtend<Once[1], OneTwoThree>>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});
