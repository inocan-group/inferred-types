import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { AreSameType, Dictionary, Tuple } from "src/types/index";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AreSameType<A,B>", () => {

  it("happy path", () => {
    type T1 = AreSameType<"foo","bar">;
    type T2 = AreSameType<42, 56>;
    type T3 = AreSameType<42, number>;
    type T4 = AreSameType<true, false>;
    type T5 = AreSameType<{foo:1}, {bar:2}>;
    type T6 = AreSameType<readonly string[], readonly (string | number)[]>;

    type F1 = AreSameType<"foo", 42>;
    type F2 = AreSameType<Dictionary, Tuple>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
    const cases: cases = [
      true,true, true, true,true, true,
      false, false
    ];
  });

});

