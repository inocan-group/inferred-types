import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IfEqual, IsEqual, IsNotEqual } from "../../src/types/boolean-logic/equivalency";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsEqual", () => {

  it("happy path", () => {
    type T1 = IsEqual<1,1>;
    type T2 = IsEqual<1,2>;
    type T3 = IsEqual<1, number>;
    type T4 = IsEqual<number, 1>;
    type T5 = IsEqual<number, number>;

    type cases = [
      //
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, false>>,
      Expect<Equal<T4, false>>,
      Expect<Equal<T5, true>>,
    ];
    const cases: cases = [true, true,true,true,true];
  });
});
describe("IsNotEqual", () => {

  it("happy path", () => {
    type T1 = IsNotEqual<1,1>;
    type T2 = IsNotEqual<1,2>;
    type T3 = IsNotEqual<1, number>;
    type T4 = IsNotEqual<number, 1>;
    type T5 = IsNotEqual<number, number>;

    type cases = [
      //
      Expect<Equal<T1, false>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<T5, false>>,
    ];
    const cases: cases = [true, true,true,true,true];
  });

});

describe("IfEqual", () => {

  it("happy path", () => {
    type Eq = IfEqual<1,1, "equal", "not">;
    type NotEq = IfEqual<1,0, "equal", "not">;

    type cases = [
      //
      Expect<Equal<Eq, "equal">>,
      Expect<Equal<NotEq, "not">>,
    ];
    
    const cases: cases = [ true, true ];
  });

});
