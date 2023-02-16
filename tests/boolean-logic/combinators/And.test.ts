import { Equal, Expect } from "@type-challenges/utils";
import { And } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("And<T>", () => {

  it("boolean values", () => {
    type T1 = And<[true, true, false, true]>; // false
    type T2 = And<[false, false, false, false]>; // false
    type T3 = And<[true]>; // true
    type T4 = And<readonly [true, true, true]>; // true
    type T5 = And<[true, boolean, true]>; // boolean
    
    type cases = [
      Expect<Equal<T1, false>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, boolean>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

  it("simple functions", () => {
    type T1 = And<[() => true, () => true, () => false, () => true]>; // false
    type T2 = And<[() => false, () => false, false, () => false]>; // false
    type T3 = And<[() => true]>; // true
    type T4 = And<[() => true, true, () => true]>; // true
    type T5 = And<[() => true, () => boolean, () => true]>; // boolean
    
    type cases = [
      Expect<Equal<T1, false>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, boolean>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

});
