import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  IfStringLiteral } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfStringLiteral<T,IF,ELSE>", () => {

  it("happy path", () => {
    type T1 = IfStringLiteral<"foo",true, false>;
    type T2 = IfStringLiteral<"foo" | "bar", true, false>;

    type F1 = IfStringLiteral<string, true, false>;
    type F2 = IfStringLiteral<null, true, false>;
    type F3 = IfStringLiteral<never, true, false>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
    const cases: cases = [
      true, true,
      false, false, false
    ];
  });

});
