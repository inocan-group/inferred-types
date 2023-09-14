import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AllowNonTupleWhenSingular, AsArray, ErrorCondition, IsEqual } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AllowNonTupleWhenSingular<TTuple>", () => {

  it("happy path", () => {
    type Yup = AllowNonTupleWhenSingular<["foo"]>;
    type Nope = AllowNonTupleWhenSingular<["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<Yup, "foo" | ["foo"]>>,
      Expect<Equal<Nope, ["foo", "bar"]>>
    ];
    const cases: cases = [ true, true ];
  });

  
  it("exception when the singular value is an ErrorCondition", () => {
    type Err = AllowNonTupleWhenSingular<[ErrorCondition<"oops">]>;

    type cases = [
      ExpectTrue<IsEqual<Err, ErrorCondition<"oops">>>
    ];
    const cases: cases = [ true ];
  });

  
  it("handling a multidimensional tuple", () => {
    type T = AllowNonTupleWhenSingular<[readonly unknown[]]>;
    type T2 = AsArray<T>;
    
    type cases = [
      Expect<Equal<T, readonly unknown[] | [readonly unknown[]]>>,
      Expect<Equal<T2, [readonly unknown[]]>>
    ];
    const cases: cases = [ true, true ];
    
  });
  
  

});
