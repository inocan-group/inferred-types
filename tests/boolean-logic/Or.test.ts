import { Equal, Expect } from "@type-challenges/utils";
import { Or } from "../../src/types/boolean-logic/Or";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Or<T>", () => {

  it("boolean literals", () => {
    type T1 = Or<[true, false, true]>; // true
    type T2 = Or<[false, false, false]>; //false
    type T3 = Or<[]>; // never
    type T4 = Or<[true, false, boolean]>; // true
    type T5 = Or<[false, false, boolean]>; // boolean
    
    
    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, never>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, boolean>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

  it("functions no params", () => {
    type T1 = Or<[() => true, () => false, () => true]>; // true
    type T2 = Or<[() => false, () => false, () => false]>; //false
    // type T3 = Or<() => readonly boolean[] >; // never
    type T4 = Or<[() => true, () => false, () => boolean]>; // true
    type T5 = Or<[() => false, () => false, () => boolean]>; // boolean
    
  
    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      // Expect<Equal<T3, never>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, boolean>>,
    ];
    const cases: cases = [true, true, true, true];
  });

  it("functions with params", () => {
    const fn = <V extends boolean>(v: V) => v;
    type T1 = Or<[typeof fn], [true]>; // true
    type T2 = Or<[typeof fn], [false]>; // false
    // type T3 = Or<() => readonly boolean[] >; // never
    // type T4 = Or<[() => true, () => false, () => boolean]>; // true
    // type T5 = Or<[() => false, () => false, () => boolean]>; // boolean
    
  
    type cases = [
      // TODO: try to get these types narrowed
      Expect<Equal<T1, boolean>>, //
      Expect<Equal<T2, boolean>>,
      // Expect<Equal<T3, never>>,
      // Expect<Equal<T4, true>>,
      // Expect<Equal<T5, boolean>>,
    ];
    const cases: cases = [true, true];
  });

});
