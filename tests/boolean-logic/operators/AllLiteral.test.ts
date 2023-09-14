import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AllLiteral } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AllLiteral<T>", () => {

  it("happy path", () => {
    type T1 = AllLiteral<[1,2,3]>;
    type T2 = AllLiteral<["foo", "bar", "baz"]>;
    type T3 = AllLiteral<[{foo: 1; bar: number}]>;

    type F1 = AllLiteral<[1,2,number]>;
    type F2 = AllLiteral<[string, string, string]>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
    const cases: cases = [
      true,true,true,
      false,false
    ];
  });

});
