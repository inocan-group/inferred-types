import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IfOr, Or } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Or<T>", () => {

  it("boolean literals", () => {
    type T1 = Or<[true, false, true]>; // true
    type T2 = Or<[false, false, false]>; //false
    type T3 = Or<[]>; // false
    type T4 = Or<[true, false, boolean]>; // true
    type T5 = Or<[false, false, boolean]>; // boolean
    type T6 = Or<never>;
    
    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, false>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, boolean>>,
      Expect<Equal<T6, false>>,
    ];
    const cases: cases = [true, true, true, true, true, true];
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

  it.skip("functions with params", () => {
    // const fn = <V extends boolean>(v: V) => v;
    // type T0 = Or<[typeof fn]>; // boolean
    // type T1 = Or<[typeof fn], [true]>; // true
    // type T2 = Or<[typeof fn], [false]>; // false
    // // type T3 = Or<() => readonly boolean[] >; // never
    // // type T4 = Or<[() => true, () => false, () => boolean]>; // true
    // // type T5 = Or<[() => false, () => false, () => boolean]>; // boolean
    
  
    // type cases = [
    //   // TODO: try to get these types narrowed
    //   Expect<Equal<T1, boolean>>, //
    //   Expect<Equal<T2, boolean>>,
    //   // Expect<Equal<T3, never>>,
    //   // Expect<Equal<T4, true>>,
    //   // Expect<Equal<T5, boolean>>,
    // ];
    // const cases: cases = [true, true];
  });

});
describe("IfOr<T>", () => {

  it("happy path", () => {
    type Falsy = IfOr<[ false, () => false, false ]>;
    type Truthy = IfOr<[ false, () => false, true ]>;

    type cases = [
      ExpectFalse<Falsy>, //
      ExpectTrue<Truthy>
    ];
    const cases: cases = [ false, true ];
  });

});
