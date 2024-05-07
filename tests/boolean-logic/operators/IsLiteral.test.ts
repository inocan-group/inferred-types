import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { IsLiteral } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsLiteral<T>", () => {

  it("Happy Path", () => {
    type T1 = IsLiteral<"foo">;
    type T2 = IsLiteral<42>;
    type T3 = IsLiteral<true>;
    type T4 = IsLiteral<{foo: 1; bar: 2}>;
    
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
